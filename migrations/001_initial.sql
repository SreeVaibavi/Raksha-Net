-- RakshaNet hosted Supabase/Postgres schema starter.
-- Apply only to a new Supabase project after reviewing the policies for your deployment.
create extension if not exists postgis with schema extensions;
create type public.app_role as enum ('citizen','officer','security_liaison','super_admin');
create type public.report_status as enum ('new','verifying','verified','marked_false','resolved','closed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'citizen',
  full_name text not null check (char_length(full_name) between 2 and 100),
  mobile text,
  aadhaar_hash text,
  aadhaar_last4 char(4),
  email_confirmed boolean not null default false,
  mobile_verified boolean not null default false,
  identity_status text not null default 'Format-validated (prototype)',
  suspended boolean not null default false,
  created_at timestamptz not null default now(),
  constraint aadhaar_hash_not_raw check (aadhaar_hash is null or aadhaar_hash !~ '^\d{12}$')
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  category text not null,
  details text not null default '' check (char_length(details) <= 1000),
  state text not null,
  district text not null,
  location extensions.geography(point,4326) not null,
  location_accuracy text not null default 'District centroid approximation',
  injury_level text not null default 'None',
  medical_needs text[] not null default '{}',
  affected_count smallint not null default 1 check (affected_count between 1 and 100),
  trust_score smallint not null default 0 check (trust_score between 0 and 100),
  status public.report_status not null default 'new',
  cluster_id uuid,
  client_uuid uuid not null,
  verified_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  unique(user_id,client_uuid)
);
create index reports_location_gix on public.reports using gist(location);
create index reports_created_category_idx on public.reports(category,created_at desc);
create index reports_admin_area_idx on public.reports(state,district,created_at desc);

create table public.clusters (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  state text not null,
  district text not null,
  centroid extensions.geography(point,4326) not null,
  report_count integer not null default 1 check(report_count>0),
  confidence smallint not null default 0 check(confidence between 0 and 100),
  matrix_level text not null default 'Level 1 - unverified report',
  stage text not null default 'new',
  assigned_agency text,
  verified_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index clusters_centroid_gix on public.clusters using gist(centroid);

create table public.report_media (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  storage_path text not null unique,
  media_type text not null,
  created_at timestamptz not null default now()
);

create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id),
  state text not null,
  district text not null,
  message text not null check (char_length(message) between 20 and 500),
  approved_by uuid not null references public.profiles(id),
  sent_at timestamptz not null default now(),
  official boolean not null default true
);

create table public.escalations (
  id uuid primary key default gen_random_uuid(),
  cluster_id uuid not null references public.clusters(id),
  zone text not null,
  level text not null,
  summary text not null check(char_length(summary)<=500),
  sent_by uuid not null references public.profiles(id),
  sent_to_liaisons uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.hazard_zones (
  id uuid primary key default gen_random_uuid(),
  hazard_type text not null,
  area extensions.geography(multipolygon,4326) not null,
  source text not null,
  published_by uuid references public.profiles(id),
  valid_until timestamptz,
  created_at timestamptz not null default now()
);
create index hazard_zones_area_gix on public.hazard_zones using gist(area);

create table public.satellite_detections (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  kind text not null,
  location extensions.geography(point,4326) not null,
  acquired_at timestamptz not null,
  ingested_at timestamptz not null default now(),
  source_confidence text
);
create index satellite_detections_location_gix on public.satellite_detections using gist(location);
create index satellite_detections_acquired_idx on public.satellite_detections(acquired_at desc);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor uuid not null references public.profiles(id),
  action text not null,
  entity text not null,
  entity_id uuid not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create or replace function public.current_role()
returns public.app_role language sql stable security definer set search_path=public
as $$ select role from public.profiles where id=auth.uid() and not suspended $$;
create or replace function public.is_control_room()
returns boolean language sql stable security definer set search_path=public
as $$ select coalesce(public.current_role() in ('officer','super_admin'),false) $$;

alter table public.profiles enable row level security;
alter table public.reports enable row level security;
alter table public.clusters enable row level security;
alter table public.report_media enable row level security;
alter table public.alerts enable row level security;
alter table public.escalations enable row level security;
alter table public.hazard_zones enable row level security;
alter table public.satellite_detections enable row level security;
alter table public.audit_log enable row level security;

create policy profile_self_or_admin_read on public.profiles for select using(id=auth.uid() or public.current_role()='super_admin' or public.current_role()='officer');
create policy citizen_create_own_report on public.reports for insert with check(user_id=auth.uid() and exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='citizen' and p.email_confirmed and p.mobile_verified and not p.suspended));
create policy citizen_own_or_officer_read_reports on public.reports for select using(user_id=auth.uid() or public.is_control_room());
create policy officer_update_reports on public.reports for update using(public.is_control_room()) with check(public.is_control_room());
create policy control_room_manage_clusters on public.clusters for all using(public.is_control_room()) with check(public.is_control_room());
create policy report_media_own_or_officer_read on public.report_media for select using(exists(select 1 from public.reports r where r.id=report_id and (r.user_id=auth.uid() or public.is_control_room())));
create policy report_media_own_insert on public.report_media for insert with check(exists(select 1 from public.reports r where r.id=report_id and r.user_id=auth.uid()));
create policy officer_publish_alert on public.alerts for insert with check(public.is_control_room() and approved_by=auth.uid() and exists(select 1 from public.reports r where r.id=report_id and r.status='verified'));
create policy citizen_read_area_alerts on public.alerts for select using(public.current_role()='citizen' and official);
create policy liaison_read_escalations on public.escalations for select using(public.current_role()='security_liaison' and auth.uid()=any(sent_to_liaisons));
create policy officer_send_escalation on public.escalations for insert with check(public.is_control_room() and sent_by=auth.uid());
create policy public_hazard_read on public.hazard_zones for select to authenticated using(valid_until is null or valid_until>now());
create policy officer_publish_hazard on public.hazard_zones for insert with check(public.is_control_room() and published_by=auth.uid());
create policy satellite_read_authenticated on public.satellite_detections for select to authenticated using(true);
create policy satellite_ingest_service_role on public.satellite_detections for insert to service_role with check(true);
create policy audit_read_super_admin on public.audit_log for select using(public.current_role()='super_admin');
create policy audit_insert_authenticated_actor on public.audit_log for insert with check(actor=auth.uid() and public.current_role() in ('officer','super_admin'));
revoke update,delete on public.audit_log from authenticated;

-- Private storage bucket configuration is deployment-specific; do not make evidence public.
-- Local demo server is separate from this hosted schema and does not claim RLS enforcement.
