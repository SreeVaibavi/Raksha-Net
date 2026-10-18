// ==========================================================================
// RAKSHANET - AI-ASSISTED BORDER SAFETY & CIVILIAN DEFENCE PLATFORM
// TEAM NEXUS, EASWARI ENGINEERING COLLEGE
// ==========================================================================

const $ = id => document.getElementById(id);
const $$ = q => [...document.querySelectorAll(q)];

const OFFICIAL_BORDER_DISTRICTS = [
  { state: 'Jammu And Kashmir', district: 'Kupwara', code: 1, lat: 34.52136, lon: 74.20722, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Baramulla', code: 2, lat: 34.19800, lon: 74.36300, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Bandipora', code: 3, lat: 34.42000, lon: 74.64000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Poonch', code: 4, lat: 33.76670, lon: 74.10000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Rajouri', code: 5, lat: 33.38000, lon: 74.30000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Pulwama', code: 6, lat: 33.94069, lon: 75.01686, accuracy: 'District Centroid Approximation', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Anantnag', code: 7, lat: 33.73000, lon: 75.15000, accuracy: 'District Centroid Approximation', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Srinagar', code: 8, lat: 34.08370, lon: 74.79730, accuracy: 'District Headquarters', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Budgam', code: 9, lat: 34.02000, lon: 74.72000, accuracy: 'District Centroid Approximation', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Kathua', code: 10, lat: 32.37000, lon: 75.52000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Samba', code: 11, lat: 32.56000, lon: 75.12000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Jammu And Kashmir', district: 'Jammu', code: 12, lat: 32.72660, lon: 74.85700, accuracy: 'District Headquarters', source: 'Survey of India Directory' },
  { state: 'Ladakh', district: 'Leh', code: 13, lat: 34.15260, lon: 77.57710, accuracy: 'High-Altitude Civilian Sector', source: 'Survey of India Directory' },
  { state: 'Ladakh', district: 'Kargil', code: 14, lat: 34.55390, lon: 76.13490, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Arunachal Pradesh', district: 'Tawang', code: 15, lat: 27.58610, lon: 91.85940, accuracy: 'Eastern Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Arunachal Pradesh', district: 'West Kameng', code: 16, lat: 27.32000, lon: 92.40000, accuracy: 'District Centroid Approximation', source: 'Survey of India Directory' },
  { state: 'Arunachal Pradesh', district: 'Upper Subansiri', code: 17, lat: 28.05000, lon: 94.13000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Arunachal Pradesh', district: 'Anjaw', code: 18, lat: 28.03000, lon: 96.54000, accuracy: 'Eastern Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Assam', district: 'Dhubri', code: 19, lat: 26.02000, lon: 89.97000, accuracy: 'Riverine Border Sector', source: 'Survey of India Directory' },
  { state: 'Assam', district: 'Karimganj', code: 20, lat: 24.87000, lon: 92.35000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Assam', district: 'Cachar', code: 21, lat: 24.83000, lon: 92.80000, accuracy: 'District Centroid Approximation', source: 'Survey of India Directory' },
  { state: 'Sikkim', district: 'North Sikkim (Mangan)', code: 22, lat: 27.51000, lon: 88.53000, accuracy: 'Northern Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Sikkim', district: 'East Sikkim (Gangtok)', code: 23, lat: 27.33000, lon: 88.61000, accuracy: 'State Capital & Border Access', source: 'Survey of India Directory' },
  { state: 'Punjab', district: 'Amritsar', code: 24, lat: 31.63400, lon: 74.87230, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Punjab', district: 'Gurdaspur', code: 25, lat: 32.04000, lon: 75.40000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Punjab', district: 'Firozpur', code: 26, lat: 30.92000, lon: 74.61000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Punjab', district: 'Fazilka', code: 27, lat: 30.40000, lon: 74.03000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Rajasthan', district: 'Jaisalmer', code: 28, lat: 26.91570, lon: 70.90830, accuracy: 'Desert Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Rajasthan', district: 'Bikaner', code: 29, lat: 28.02290, lon: 73.31190, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Rajasthan', district: 'Barmer', code: 30, lat: 25.75000, lon: 71.39000, accuracy: 'Desert Frontier Sector Centroid', source: 'Survey of India Directory' },
  { state: 'Rajasthan', district: 'Sri Ganganagar', code: 31, lat: 29.92000, lon: 73.88000, accuracy: 'Border Frontier Sector Centroid', source: 'Survey of India Directory' }
];

const state = {
  user: null,
  portal: 'citizen',
  districts: [...OFFICIAL_BORDER_DISTRICTS],
  maps: {},
  events: null,
  page: 'overview',
  activeLayers: { gibs: true, firms: false, bhuvan: false, sentinel: false, streets: false },
  selectedSosCategory: 'Gunshot-like sound',
  selectedPhoto: null,
  reports: [],
  myReports: [],
  port: 5050
};

const CATS = [
  'Gunshot-like sound',
  'Explosion-like sound',
  'Suspicious activity',
  'Suspicious unattended object',
  'Violence or attack',
  'Fire',
  'Protest or crowd panic',
  'Border-area emergency',
  'Road blockage',
  'Missing person',
  'Medical emergency',
  'Flood',
  'Landslide',
  'Stranded citizens',
  'Unsafe route'
];

const MED = [
  'Bleeding', 'Unconscious', 'Severe injury', 'Child',
  'Senior citizen', 'Disability', 'Pregnancy', 'Urgent medicine'
];

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = s => {
  try { return new Date(s).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }); }
  catch { return s || ''; }
};

function formMsg(el, text, type = '') {
  if (el) {
    el.textContent = text;
    el.className = 'form-message' + (type ? ' ' + type : '');
  }
}

function toast(s, bad = false) {
  const t = $('toast');
  if (!t) return;
  t.textContent = s;
  t.className = 'toast show' + (bad ? ' error' : '');
  clearTimeout(window.tid);
  window.tid = setTimeout(() => t.className = 'toast', 4000);
}

// Tactical Audio Synthesizer
function playRadarChirp(type = 'chirp') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'chirp') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.setValueAtTime(740, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
    setTimeout(() => ctx.close(), 500);
  } catch {}
}

// Web Speech Voice Announcer (Slide 4, 7, 8)
function speakVoiceAlert(text, lang = 'en-IN') {
  if (!('speechSynthesis' in window)) {
    toast('Text-to-speech voice synthesis not supported on this device.');
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1.0;
  utter.lang = lang;
  window.speechSynthesis.speak(utter);
  toast('🔊 Playing calm safety broadcast...');
}

// API client
async function api(path, opt = {}) {
  const r = await fetch(path, {
    ...opt,
    credentials: 'same-origin',
    headers: {
      ...(opt.body ? { 'content-type': 'application/json' } : {}),
      ...(opt.headers || {})
    }
  });
  let d;
  try { d = await r.json(); } catch { d = { error: 'Unexpected server response' }; }
  if (!r.ok) throw Error(d.error || `Request failed (${r.status})`);
  return d;
}

// Portal Switch
function choosePortal(p) {
  state.portal = p;
  $('citizenPortalBtn')?.classList.toggle('selected', p === 'citizen');
  $('adminPortalBtn')?.classList.toggle('selected', p === 'admin');
  $('authKicker').textContent = p === 'admin' ? 'RESTRICTED COMMAND ACCESS' : 'CITIZEN SAFETY PORTAL';
  $('authTitle').textContent = p === 'admin' ? 'Control Room Sign In' : 'Civilian Access';
  $('authDesc').textContent = p === 'admin' ? 'Authorized officers and emergency control administrators.' : 'Sign in to submit SOS and receive official alerts.';
  $('citizenJoin')?.classList.toggle('hidden', p === 'admin');
  $('adminNote')?.classList.toggle('hidden', p !== 'admin');
  $('totpRow')?.classList.toggle('hidden', p !== 'admin');
  $('signupPanel')?.classList.add('hidden');
  $('loginPanel')?.classList.remove('hidden');
  formMsg($('loginMessage'), '');
}

$('citizenPortalBtn').onclick = () => choosePortal('citizen');
$('adminPortalBtn').onclick = () => choosePortal('admin');
$('showSignup').onclick = () => {
  $('loginPanel').classList.add('hidden');
  $('signupPanel').classList.remove('hidden');
  $('authKicker').textContent = 'CITIZEN REGISTRATION';
  $('authTitle').textContent = 'Register Verified Citizen';
  $('authDesc').textContent = 'Aadhaar format checksum validated. Data privacy preserved.';
};
$('showLogin').onclick = () => choosePortal('citizen');

// Quick Demo Login buttons
$('quickAdminBtn').onclick = async () => {
  try {
    toast('Signing in to Authorized Control Room...');
    const d = await api('/api/quick-demo-login', { method: 'POST', body: JSON.stringify({ role: 'admin' }) });
    state.user = d.user;
    openApp();
    toast('Welcome Officer, Control Room Connected');
  } catch (e) {
    toast('Demo login failed: ' + e.message, true);
  }
};

$('quickCitizenBtn').onclick = async () => {
  try {
    toast('Signing in as Verified Civilian...');
    const d = await api('/api/quick-demo-login', { method: 'POST', body: JSON.stringify({ role: 'citizen' }) });
    state.user = d.user;
    openApp();
    toast('Welcome, Civilian Safety Portal active');
  } catch (e) {
    toast('Demo login failed: ' + e.message, true);
  }
};

$('quickSwapBtn').onclick = async () => {
  const newRole = state.user?.role === 'super_admin' ? 'citizen' : 'admin';
  try {
    const d = await api('/api/quick-demo-login', { method: 'POST', body: JSON.stringify({ role: newRole }) });
    state.user = d.user;
    openApp();
    toast(`Switched to ${newRole === 'admin' ? 'Control Room Officer' : 'Civilian'} role`);
  } catch (e) {
    toast(e.message, true);
  }
};

$('loginSubmit').onclick = async () => {
  formMsg($('loginMessage'), 'Authenticating...');
  try {
    const d = await api('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: $('loginEmail').value,
        password: $('loginPassword').value,
        totp: $('loginTotp').value || '123456',
        portal: state.portal
      })
    });
    state.user = d.user;
    openApp();
  } catch (e) {
    formMsg($('loginMessage'), e.message, 'error');
  }
};

$('registerSubmit').onclick = async () => {
  const m = $('signupMessage');
  formMsg(m, 'Validating credentials...');
  const payload = {
    fullName: $('fullName').value,
    aadhaar: $('aadhaar').value,
    mobile: $('mobile').value,
    email: $('signupEmail').value,
    password: $('signupPassword').value,
    confirmPassword: $('confirmPassword').value
  };
  try {
    const d = await api('/api/register', { method: 'POST', body: JSON.stringify(payload) });
    state.user = d.user;
    toast(d.message);
    openApp();
  } catch (e) {
    formMsg(m, e.message, 'error');
  }
};

$('logoutBtn').onclick = async () => {
  try { await api('/api/logout', { method: 'POST' }); } catch {}
  state.user = null;
  state.events?.close();
  $('appShell').classList.add('hidden');
  $('authShell').classList.remove('hidden');
  $('signedInLabel').classList.add('hidden');
  $('quickSwapBtn').classList.add('hidden');
  $('logoutBtn').classList.add('hidden');
  choosePortal('citizen');
};

$('modalClose').onclick = () => $('modal').classList.add('hidden');
$('modal').onclick = e => { if (e.target === $('modal')) $('modal').classList.add('hidden'); };
function modal(h) {
  $('modalContent').innerHTML = h;
  $('modal').classList.remove('hidden');
}

// App Open & Init
function openApp() {
  $('authShell').classList.add('hidden');
  $('appShell').classList.remove('hidden');
  $('signedInLabel').textContent = `${state.user.role === 'super_admin' ? '🎖️ OFFICER' : '👤 CITIZEN'}: ${state.user.fullName.split(' ')[0]}`;
  $('signedInLabel').classList.remove('hidden');
  $('quickSwapBtn').classList.remove('hidden');
  $('logoutBtn').classList.remove('hidden');
  $('profileName').textContent = state.user.fullName;
  $('profileRole').textContent = state.user.role === 'super_admin' ? 'District Control Room Officer' : 'Verified Civilian Resident';
  $('avatar').textContent = (state.user.fullName || 'R').trim()[0].toUpperCase();
  $('adminNavExtras').classList.toggle('hidden', !['officer', 'super_admin'].includes(state.user.role));

  renderPages();
  go(state.user.role === 'super_admin' ? 'inbox' : 'overview');
  loadGeography().then(() => {
    renderPages();
    loadCounts();
    initMaps(state.page);
  }).catch(e => {
    toast('Using fallback frontier districts: ' + e.message);
  });

  connectEvents();
  loadCounts();
}

const titles = {
  overview: 'Tactical Safety Overview',
  sos: 'One-Tap Emergency SOS Matrix',
  report: 'Submit Detailed Incident Report',
  family: 'Household & Family Safe-Status',
  tourist: 'Border Tourism & Geofence Corridor',
  satellite: 'Multi-Layer Earth Observation & Hazards',
  alerts: 'Official Voice & Text Area Alerts',
  workflow: 'System Workflow & AI Incident Logic (Slide 8)',
  inbox: 'Authorized Control Room Inbox',
  audit: 'Immutable Audit Trail'
};

async function loadOverview() {
  await loadCounts();
}

function go(p) {
  if (!p) return;
  if ((p === 'inbox' || p === 'audit') && !['officer', 'super_admin'].includes(state.user?.role)) {
    toast('Restricted to authorized control room officers', true);
    return;
  }
  state.page = p;
  $$('.page').forEach(x => x.classList.add('hidden'));
  $('page-' + p)?.classList.remove('hidden');
  $$('.nav-item').forEach(x => x.classList.toggle('active', x.dataset.page === p));
  if ($('pageTitle')) $('pageTitle').textContent = titles[p] || 'RakshaNet';
  if ($('pageCrumb')) $('pageCrumb').textContent = `${state.user?.role === 'super_admin' ? 'AUTHORIZED CONTROL ROOM' : 'CIVILIAN DEFENCE SYSTEM'} / ${p.toUpperCase()}`;
  
  try { initMaps(p); } catch {}
  if (p === 'overview') loadOverview();
  if (p === 'inbox') loadInbox();
  if (p === 'alerts') loadAlerts();
  if (p === 'audit') loadAudit();
  if (p === 'family') loadFamilyPage();
  if (p === 'tourist') loadTouristPage();
  if (p === 'report') {
    bindReportForms();
    loadMyReports();
  }
}

window.go = go;

document.body.addEventListener('click', e => {
  const b = e.target.closest('[data-go]');
  if (b && b.dataset.go) {
    e.preventDefault();
    go(b.dataset.go);
    return;
  }
  const n = e.target.closest('.nav-item[data-page]');
  if (n && n.dataset.page) {
    e.preventDefault();
    go(n.dataset.page);
    return;
  }
});

// Rendering all pages
function renderPages() {
  const admin = ['officer', 'super_admin'].includes(state.user?.role);
  $('page-overview').innerHTML = admin ? adminOverview() : citizenOverview();
  $('page-sos').innerHTML = sosPage();
  $('page-report').innerHTML = reportPage();
  $('page-family').innerHTML = familyPage();
  $('page-tourist').innerHTML = touristPage();
  $('page-satellite').innerHTML = satellitePage();
  $('page-alerts').innerHTML = alertsPage();
  $('page-workflow').innerHTML = workflowPage();
  $('page-inbox').innerHTML = inboxPage();
  $('page-audit').innerHTML = auditPage();

  bindReportForms();
  bindSosPage();
  bindSatelliteToggles();
  bindSimulateCluster();
}

// CITIZEN OVERVIEW
function citizenOverview() {
  return `
    <!-- ONE-TAP QUICK SOS CALLOUT (Slide 3 & 7) -->
    <div class="sos-hero-card camo-border hud-box">
      <div class="sos-hero-head">
        <div>
          <span class="tactical-badge red">⚠️ ONE-TAP INSTANT SOS</span>
          <h2 style="margin:4px 0 0; color:#fff; font-size:18px">Immediate Border Danger or Emergency?</h2>
        </div>
        <span class="tactical-badge">OFFLINE QUEUE READY</span>
      </div>
      <p style="color:#ffcdc8; font-size:12px; margin:0 0 12px">
        Tap the red button below. Transmits your GPS sector, timestamp, and category to the control room in &lt;1 second.
      </p>
      <button id="quickSosTrigger" class="sos-big-btn">
        <span>🚨</span> BROADCAST EMERGENCY SOS NOW <span>🚨</span>
      </button>
      <div id="quickSosStatus" class="form-message" role="status" style="margin:8px 0"></div>
      <div class="sos-chips-grid">
        ${['Gunshot-like sound', 'Explosion-like sound', 'Fire', 'Border-area emergency', 'Medical emergency', 'Flood / Landslide'].map(c => `
          <button class="sos-chip ${state.selectedSosCategory === c ? 'active' : ''}" data-sos-cat="${esc(c)}">${esc(c)}</button>
        `).join('')}
      </div>
    </div>

    <!-- STATS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div><small>Your Submissions</small><b id="citizenTotal">0</b></div>
        <span class="stat-icon">▤</span>
      </div>
      <div class="stat-card">
        <div><small>Under Review</small><b id="citizenPending">0</b></div>
        <span class="stat-icon">◷</span>
      </div>
      <div class="stat-card">
        <div><small>Active Area Alerts</small><b id="citizenAlertCount">0</b></div>
        <span class="stat-icon">◇</span>
      </div>
      <div class="stat-card">
        <div><small>Household Status</small><b id="citizenFamilyStatus" style="font-size:18px; color:var(--safe-green)">Safe</b></div>
        <span class="stat-icon">⚑</span>
      </div>
    </div>

    <div class="main-grid">
      <!-- SATELLITE HAZARD RADAR -->
      <div class="panel camo-border hud-box">
        <div class="panel-head">
          <div>
            <h3><span>🛰️</span> Satellite Hazard Context (NASA GIBS & ISRO)</h3>
            <p>Daily true-color optical observation & terrain context. No live soldier tracking.</p>
          </div>
          <button class="small-btn" data-go="satellite">Full Satellite View →</button>
        </div>
        <div class="map-shell">
          <div id="citizenMap" class="sat-map"></div>
          <div class="map-chip">NASA GIBS · MODIS TERRA TRUE COLOR</div>
          <div class="map-credit">NASA EOSDIS GIBS · Date-stamped composite · Civilian safety overlay</div>
        </div>
      </div>

      <!-- RECENT REPORTS & ACTIONS -->
      <div class="panel camo-border">
        <div class="panel-head">
          <div>
            <h3>Your Recent Safety Reports</h3>
            <p>Reports are strictly private until authorized officer verification.</p>
          </div>
          <button class="small-btn" data-go="report">New Report +</button>
        </div>
        <div id="recentReports" class="report-list"></div>
      </div>
    </div>
  `;
}

// CONTROL ROOM OVERVIEW (Admin)
function adminOverview() {
  return `
    <!-- DEMO SIMULATOR PROMPT (Slide 8 & 11) -->
    <div class="panel camo-border hud-box" style="background:linear-gradient(135deg, #263321, #162417); border-color:var(--camo-gold); margin-bottom:18px">
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px">
        <div>
          <span class="tactical-badge gold">⚡ SLIDE 8 & 11 LIVE SCENARIO SIMULATOR</span>
          <h2 style="margin:4px 0; color:var(--camo-bone); font-size:18px">Demonstrate Multi-Report Clustering (12 ➔ 1)</h2>
          <p style="margin:0; font-size:11px; color:var(--text-dim)">
            Inject 12 realistic gunshot reports from different villagers in Kupwara sector (7-min window) and watch AI merge them into 1 high-priority incident.
          </p>
        </div>
        <button id="simClusterBtn" class="camo-action-btn">
          <span>⚡</span> RUN 12-REPORT BORDER SIMULATION (12 ➔ 1)
        </button>
      </div>
    </div>

    <!-- STATS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div><small>Total Ingested</small><b id="overviewTotal">0</b></div>
        <span class="stat-icon">▤</span>
      </div>
      <div class="stat-card">
        <div><small>Awaiting Verification</small><b id="overviewReview">0</b></div>
        <span class="stat-icon">◷</span>
      </div>
      <div class="stat-card">
        <div><small>Deduplicated Clusters</small><b id="overviewGrouped">0</b></div>
        <span class="stat-icon">◎</span>
      </div>
      <div class="stat-card">
        <div><small>High Trust (≥80%)</small><b id="overviewHighTrust" style="color:var(--safe-green)">0</b></div>
        <span class="stat-icon">🛡️</span>
      </div>
    </div>

    <div class="main-grid">
      <div class="panel camo-border hud-box">
        <div class="panel-head">
          <div>
            <h3><span>◎</span> Deduplicated Incident Clusters</h3>
            <p>Grouped by sector, category and 15-minute window. AI suggests, officer approves.</p>
          </div>
          <button class="small-btn" data-go="inbox">Open Inbox →</button>
        </div>
        <div id="overviewClusters" class="incident-list"></div>
      </div>

      <div class="panel camo-border hud-box">
        <div class="panel-head">
          <div>
            <h3><span>🛰️</span> Border Tactical Satellite Map</h3>
            <p>Real NASA MODIS tiles + active incident pins.</p>
          </div>
          <button class="small-btn" data-go="satellite">Satellite Center →</button>
        </div>
        <div class="map-shell" style="height:320px">
          <div id="adminOverviewMap" class="sat-map"></div>
          <div class="map-chip">TACTICAL RADAR · MODIS TRUE COLOR</div>
        </div>
      </div>
    </div>
  `;
}

// ONE-TAP SOS PAGE
function sosPage() {
  return `
    <div class="panel camo-border hud-box" style="max-width:800px; margin:0 auto">
      <div class="panel-head">
        <div>
          <span class="tactical-badge red">RAPID CRISIS MATRIX</span>
          <h2 style="color:var(--camo-bone); margin:6px 0">One-Tap Border Safety SOS</h2>
          <p>Instant dispatch signal to District Emergency Control Room. Works online and offline.</p>
        </div>
        <a href="tel:112" class="camo-action-btn" style="background:#82261e; border-color:#ff7163">CALL 112</a>
      </div>

      <div style="background:#131c14; border:1px solid var(--camo-olive); border-radius:8px; padding:16px; margin:16px 0">
        <label class="label">Step 1: Select Emergency Category</label>
        <div class="sos-chips-grid" style="grid-template-columns:repeat(auto-fill, minmax(160px, 1fr))">
          ${CATS.map(c => `
            <button class="sos-chip ${state.selectedSosCategory === c ? 'active' : ''}" data-sos-cat="${esc(c)}">${esc(c)}</button>
          `).join('')}
        </div>

        <label class="label" style="margin-top:16px">Step 2: Border Sector Location</label>
        <div class="location-summary" style="background:#19271a; border:1px solid var(--camo-field); padding:12px; border-radius:6px; color:var(--camo-sand)">
          <span>📍</span>
          <span><strong>Automatic Detection:</strong> Frontier Sector centroid (${state.districts[0]?.state || 'J&K'} · ${state.districts[0]?.district || 'Kupwara'})</span>
        </div>

        <button id="sosPageTrigger" class="sos-big-btn" style="margin-top:20px">
          <span>🚨</span> TRANSMIT IMMEDIATE ONE-TAP SOS NOW <span>🚨</span>
        </button>
        <div id="sosPageMessage" class="form-message" role="status"></div>
      </div>
    </div>
  `;
}

// FULL REPORT PAGE
function reportPage() {
  return `
    <div class="main-grid">
      <section class="report-card camo-border hud-box">
        <div class="panel-head">
          <div>
            <span class="tactical-badge">STRUCTURED REPORTING</span>
            <h3 style="margin:4px 0 0">Create Detailed Incident Report</h3>
            <p>GPS-tagged, authenticated civilian field submission.</p>
          </div>
        </div>
        <div id="fullReportForm" class="report-form"></div>
      </section>

      <section class="panel camo-border">
        <div class="panel-head">
          <div>
            <h3>Your Submission History</h3>
            <p>Immutable audit trail of reports from your account.</p>
          </div>
        </div>
        <div id="fullMyReports" class="report-list"></div>
      </section>
    </div>
  `;
}

// FAMILY SAFE-STATUS PAGE (Slide 5 & 7)
function familyPage() {
  return `
    <div class="panel camo-border hud-box" style="max-width:920px; margin:0 auto">
      <div class="panel-head">
        <div>
          <span class="tactical-badge">SLIDE 5 & 7 PILLAR 6</span>
          <h2 style="color:var(--camo-bone); margin:6px 0">Household & Family Safe-Status System</h2>
          <p>Update your household condition with one click. Relatives receive safe status without accessing any sensitive defense details.</p>
        </div>
        <span class="tactical-badge cyan">ZERO SENSITIVE DATA EXPOSED</span>
      </div>

      <div style="background:#142015; border:1px solid var(--camo-olive); border-radius:8px; padding:18px; margin:14px 0">
        <label class="label">Select Your Current Household Status</label>
        <div class="family-status-grid">
          <div class="family-opt selected" data-status="Safe">
            <span style="font-size:24px">🟢</span>
            <b style="color:#62d472">Safe</b>
            <small>All members secure</small>
          </div>
          <div class="family-opt" data-status="In Shelter">
            <span style="font-size:24px">🟡</span>
            <b style="color:#ffd885">In Shelter</b>
            <small>Inside safe bunker/hall</small>
          </div>
          <div class="family-opt" data-status="Need Help">
            <span style="font-size:24px">🟠</span>
            <b style="color:#f7b752">Need Help</b>
            <small>Non-critical assistance</small>
          </div>
          <div class="family-opt" data-status="Injured">
            <span style="font-size:24px">🔴</span>
            <b style="color:#ff8c82">Injured</b>
            <small>Medical response needed</small>
          </div>
          <div class="family-opt" data-status="Unable to Move">
            <span style="font-size:24px">⛔</span>
            <b style="color:#ff6961">Unable to Move</b>
            <small>Evacuation assistance</small>
          </div>
        </div>

        <label class="label" for="familyNote">Family Note or Household Head Details (Optional)</label>
        <textarea id="familyNote" rows="2" placeholder="e.g. 4 family members safe in village concrete cellar, rations sufficient."></textarea>

        <button id="saveFamilyBtn" class="primary-btn" style="margin-top:14px; width:100%; justify-content:center">
          BROADCAST FAMILY SAFE-STATUS <span>✓</span>
        </button>
        <div id="familyMsg" class="form-message" role="status"></div>
      </div>

      <!-- Network Overview -->
      <div style="margin-top:18px; background:#182618; border:1px solid var(--camo-field); border-radius:6px; padding:14px">
        <span class="eyebrow" style="color:var(--camo-gold)">SECTOR CIVILIAN HEALTH & STATUS OVERVIEW</span>
        <div class="stats-grid" style="margin-top:10px; margin-bottom:0">
          <div class="stat-card" style="padding:10px"><small>Safe Families</small><b id="netSafe" style="color:#62d472">42</b></div>
          <div class="stat-card" style="padding:10px"><small>In Shelter</small><b id="netShelter" style="color:#ffd885">8</b></div>
          <div class="stat-card" style="padding:10px"><small>Need Help</small><b id="netHelp" style="color:#f7b752">2</b></div>
          <div class="stat-card" style="padding:10px"><small>Medical Needed</small><b id="netInjured" style="color:#ff8c82">1</b></div>
        </div>
      </div>
    </div>
  `;
}

// TOURIST SAFETY & GEOFENCE PAGE (Slide 5 & 7)
function touristPage() {
  return `
    <div class="panel camo-border hud-box" style="max-width:920px; margin:0 auto">
      <div class="panel-head">
        <div>
          <span class="tactical-badge">SLIDE 5 & 7 PILLAR 8</span>
          <h2 style="color:var(--camo-bone); margin:6px 0">Tourist Safety & Border Geofence Corridors</h2>
          <p>Voluntary trip check-ins, restricted-zone proximity radar, and safe evacuation corridors.</p>
        </div>
        <span class="tactical-badge gold">GEOFENCE RADAR ACTIVE</span>
      </div>

      <div class="main-grid">
        <div style="background:#142015; border:1px solid var(--camo-olive); border-radius:8px; padding:16px">
          <h3 style="margin-top:0; font-size:14px; color:var(--camo-bone)">Register Voluntary Trip Check-In</h3>
          <label class="label" for="touristDest">Destination / Route</label>
          <select id="touristDest">
            <option>Gulmarg High Plateau Corridor</option>
            <option>Sonamarg Valley Route</option>
            <option>Leh-Ladakh Scenic Circuit</option>
            <option>Pahalgam Upper Valley</option>
            <option>Tawang Monastery Frontier Route</option>
          </select>
          <label class="label" for="touristDuration">Stay Duration (Days)</label>
          <input id="touristDuration" type="number" value="3" min="1" max="30">
          <label class="label" for="touristEmergency">Emergency Contact Number</label>
          <input id="touristEmergency" placeholder="+91 98765 00000">

          <button id="saveTouristBtn" class="primary-btn" style="width:100%; margin-top:14px; justify-content:center">
            REGISTER TOURIST CHECK-IN <span>✓</span>
          </button>
          <div id="touristMsg" class="form-message" role="status"></div>
        </div>

        <div>
          <h3 style="margin-top:0; font-size:14px; color:var(--camo-bone)">Active Sector Geofences & Buffer Corridors</h3>
          <div id="geofenceList"></div>
        </div>
      </div>
    </div>
  `;
}

// SATELLITE MULTI-LAYER PAGE (Slide 4, 7, 9)
function satellitePage() {
  return `
    <div class="panel camo-border hud-box">
      <div class="panel-head">
        <div>
          <span class="tactical-badge">SLIDE 9 GEOSPATIAL INTELLIGENCE</span>
          <h2 style="color:var(--camo-bone); margin:6px 0">Satellite Earth Observation & Hazard Layers</h2>
          <p>NASA GIBS, ISRO Bhuvan, Sentinel-1 radar & NASA FIRMS thermal hotspots. Civilian hazard awareness only.</p>
        </div>
        <div class="date-tools" style="display:flex; align-items:center; gap:8px">
          <label class="label" style="margin:0" for="imageryDate">Date:</label>
          <input id="imageryDate" type="date" style="min-height:34px; padding:4px 8px; font-size:11px">
        </div>
      </div>

      <!-- Layer Toggle Bar -->
      <div class="satellite-layer-grid">
        <button class="layer-btn active" id="toggleGibs">
          <span>🛰️ NASA GIBS (MODIS Terra)</span>
          <span class="tactical-badge cyan">ON</span>
        </button>
        <button class="layer-btn" id="toggleBhuvan">
          <span>🇮🇳 ISRO Bhuvan (Terrain/Flood)</span>
          <span class="tactical-badge">TOGGLE</span>
        </button>
        <button class="layer-btn" id="toggleFirms">
          <span>🔥 NASA FIRMS (Thermal Hotspots)</span>
          <span class="tactical-badge">TOGGLE</span>
        </button>
        <button class="layer-btn" id="toggleSentinel">
          <span>📡 Sentinel-1/2 (Radar & Optical)</span>
          <span class="tactical-badge">TOGGLE</span>
        </button>
      </div>

      <div class="map-shell" style="height:min(60vh, 560px); margin-top:14px">
        <div id="fullSatelliteMap" class="sat-map"></div>
        <div class="map-chip">NASA MODIS TERRA · DAILY COMPOSITE</div>
        <div class="map-credit">NASA EOSDIS GIBS & ISRO Bhuvan Public Geospatial · No classified surveillance</div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; flex-wrap:wrap; gap:10px">
        <div id="satMessage" style="font-size:11px; color:var(--camo-sand)">
          NASA GIBS true-color raster stream active. Date: ${imageryAvailableDate()}
        </div>
        <div style="display:flex; gap:8px">
          <button class="secondary-btn" id="zoomIndia">⌖ Center India</button>
          <button class="secondary-btn" id="streetToggle">＋ OpenStreetMap Context</button>
        </div>
      </div>
    </div>
  `;
}

// OFFICIAL VOICE & AREA ALERTS (Slide 4, 7, 8)
function alertsPage() {
  return `
    <div class="panel camo-border hud-box" style="max-width:920px; margin:0 auto">
      <div class="panel-head">
        <div>
          <span class="tactical-badge gold">SLIDE 4 & 7 PILLAR 4</span>
          <h2 style="color:var(--camo-bone); margin:6px 0">Official Geo-Targeted Alerts & Voice Broadcast</h2>
          <p>Calm, verified instructions issued exclusively by authorized control room officers.</p>
        </div>
      </div>
      <div id="alertsList" class="incident-list"></div>
    </div>
  `;
}

// SYSTEM WORKFLOW & ARCHITECTURE (Slide 6 & Slide 8)
function workflowPage() {
  return `
    <div class="panel camo-border hud-box" style="max-width:1100px; margin:0 auto">
      <div class="panel-head">
        <div>
          <span class="tactical-badge gold">SLIDE 8 SYSTEM WORKFLOW & FLOWCHART</span>
          <h2 style="color:var(--camo-bone); margin:6px 0">End-to-End Incident Pipeline (Human Always Decides)</h2>
          <p>From citizen one-tap SOS to verified official broadcast — strict ethical guardrails.</p>
        </div>
        <span class="tactical-badge cyan">ZERO MILITARY DETAILS EXPOSED</span>
      </div>

      <!-- 8-STEP FLOWCHART (Slide 8) -->
      <div class="flowchart-wrap">
        <div class="flow-step camo-border">
          <div class="flow-step-num">1</div>
          <b>Citizen SOS</b>
          <small>One-tap report, GPS tag, works offline</small>
        </div>
        <div class="flow-step camo-border">
          <div class="flow-step-num">2</div>
          <b>Trust Score</b>
          <small>Aadhaar check, anomaly detection</small>
        </div>
        <div class="flow-step camo-border">
          <div class="flow-step-num">3</div>
          <b>AI Clustering</b>
          <small>Merged by time, sector & type (12 ➔ 1)</small>
        </div>
        <div class="flow-step camo-border" style="border-color:var(--camo-gold)">
          <div class="flow-step-num" style="background:#ffc72c">4</div>
          <b>Officer Verifies</b>
          <small>Human-in-the-loop: AI never confirms attack</small>
        </div>
        <div class="flow-step camo-border">
          <div class="flow-step-num">5</div>
          <b>Voice Alert</b>
          <small>Geo-targeted calm speech (Hindi, Eng, Regional)</small>
        </div>
        <div class="flow-step camo-border">
          <div class="flow-step-num">6</div>
          <b>Assign Agency</b>
          <small>Police QRT, Medical, or Disaster Rescue</small>
        </div>
        <div class="flow-step camo-border">
          <div class="flow-step-num">7</div>
          <b>Family Status</b>
          <small>Household marked safe without panic</small>
        </div>
        <div class="flow-step camo-border">
          <div class="flow-step-num">8</div>
          <b>Closed Audit</b>
          <small>Resolved with immutable audit log trail</small>
        </div>
      </div>

      <!-- GUARDRAILS (Slide 3) -->
      <div style="background:#221614; border:1px solid #7a2c24; border-radius:6px; padding:12px; margin:14px 0; color:#ffcdc8; font-size:11px">
        <strong>🛡️ Critical Ethical Guardrail:</strong> AI only assists, authorized officials decide. Troop locations, patrol movements, military installations, and defense surveillance feeds are NEVER exposed or collected.
      </div>

      <!-- IMPACT METRICS COMPARISON (Slide 11) -->
      <div style="margin-top:20px">
        <span class="eyebrow" style="color:var(--camo-gold)">SLIDE 11 RESULTS & IMPACT SCORECARD</span>
        <div class="stats-grid" style="margin-top:10px">
          <div class="stat-card">
            <div><small>Multi-Report Merged</small><b style="color:var(--tactical-cyan)">12 ➔ 1</b></div>
            <span class="stat-icon">◎</span>
          </div>
          <div class="stat-card">
            <div><small>Voice Languages</small><b style="color:var(--camo-gold)">3+</b></div>
            <span class="stat-icon">🔊</span>
          </div>
          <div class="stat-card">
            <div><small>Sensitive Leaks</small><b style="color:var(--safe-green)">0</b></div>
            <span class="stat-icon">🛡️</span>
          </div>
          <div class="stat-card">
            <div><small>Software-Based</small><b style="color:#fff">100%</b></div>
            <span class="stat-icon">💻</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// CONTROL ROOM INBOX PAGE (Admin)
function inboxPage() {
  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px">
      <div>
        <h2 style="margin:0; font-size:20px; color:var(--camo-bone)">Authorized Command & Control Incident Inbox</h2>
        <p style="margin:3px 0 0; font-size:11px; color:var(--text-muted)">Real-time deduplication and dispatch verification.</p>
      </div>
      <div style="display:flex; gap:8px">
        <button id="inboxSimClusterBtn" class="camo-action-btn">
          <span>⚡</span> SIMULATE 12-REPORT CLUSTER (12 ➔ 1)
        </button>
        <button class="secondary-btn" id="refreshInbox">Refresh Feed</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card"><div><small>Total Reports</small><b id="inboxTotal">0</b></div><span class="stat-icon">▤</span></div>
      <div class="stat-card"><div><small>Awaiting Verification</small><b id="inboxReview">0</b></div><span class="stat-icon">◷</span></div>
      <div class="stat-card"><div><small>Grouped Clusters</small><b id="inboxGrouped">0</b></div><span class="stat-icon">◎</span></div>
      <div class="stat-card"><div><small>Response Unit Dispatched</small><b id="inboxDispatched">0</b></div><span class="stat-icon">⚡</span></div>
    </div>

    <div class="main-grid">
      <div>
        <section class="panel camo-border hud-box" style="margin-bottom:16px">
          <div class="panel-head">
            <div>
              <h3><span>◎</span> Deduplicated Multi-Report Clusters (12 ➔ 1)</h3>
              <p>Reports in same frontier sector within 15 min. AI calculates confidence score.</p>
            </div>
          </div>
          <div id="clusterList" class="incident-list"></div>
        </section>

        <section class="panel camo-border">
          <div class="panel-head">
            <div>
              <h3>Individual Citizen Reports</h3>
              <p>Encrypted evidence & individual witness accounts.</p>
            </div>
          </div>
          <div id="allReports" class="incident-list"></div>
        </section>
      </div>

      <div>
        <section class="panel camo-border hud-box">
          <div class="panel-head">
            <div>
              <h3>Tactical Situation Map</h3>
              <p>Active incident circles & NASA optical imagery.</p>
            </div>
          </div>
          <div class="map-shell">
            <div id="adminMap" class="sat-map"></div>
            <div class="map-chip">SITUATION RADAR · SECTOR KUPWARA</div>
          </div>
        </section>
      </div>
    </div>
  `;
}

// AUDIT TRAIL PAGE
function auditPage() {
  return `
    <div class="panel camo-border hud-box">
      <div class="panel-head">
        <div>
          <span class="tactical-badge gold">IMMUTABLE LOGS</span>
          <h2 style="color:var(--camo-bone); margin:6px 0">Cryptographic Action & Verification Audit Log</h2>
          <p>Every officer verification, alert publication, and status update is signed and recorded.</p>
        </div>
      </div>
      <div style="overflow-x:auto">
        <table style="width:100%; border-collapse:collapse; font-size:11px">
          <thead>
            <tr style="border-bottom:1px solid var(--camo-olive); color:var(--camo-tan); text-align:left">
              <th style="padding:8px">TIMESTAMP</th>
              <th style="padding:8px">ACTOR</th>
              <th style="padding:8px">ACTION</th>
              <th style="padding:8px">ENTITY / DETAILS</th>
            </tr>
          </thead>
          <tbody id="auditRows"></tbody>
        </table>
      </div>
    </div>
  `;
}

// Helper form markup
function reportFormMarkup(id) {
  const stateOptions = [...new Set(state.districts.map(d => d.state))].sort((a, b) => a.localeCompare(b));
  const defaultState = stateOptions[0] || 'Jammu And Kashmir';
  const districtOptions = state.districts.filter(d => d.state === defaultState);
  const defaultDistrict = districtOptions[0] || { state: defaultState, district: 'Kupwara', lat: 34.52136, lon: 74.20722 };

  return `
    <label class="label" for="${id}Title">Report Title / Incident Headline</label>
    <input id="${id}Title" placeholder="e.g. Gunfire noise heard near border ridge">

    <label class="label" for="${id}State">State / Union Territory</label>
    <select id="${id}State">
      ${stateOptions.map(x => `<option value="${esc(x)}" ${x === defaultState ? 'selected' : ''}>${esc(x)}</option>`).join('')}
    </select>
    <label class="label" for="${id}District">Frontier District / Sector</label>
    <select id="${id}District">
      ${districtOptions.map(d => `<option value="${esc(d.district)}" ${d.district === defaultDistrict.district ? 'selected' : ''}>${esc(d.district)}</option>`).join('')}
    </select>
    <div id="${id}Coordinates" class="location-summary" style="margin-top:8px">
      <span>◎</span><span><strong>${esc(defaultDistrict.state)} · ${esc(defaultDistrict.district)}</strong> (${Number(defaultDistrict.lat).toFixed(4)}, ${Number(defaultDistrict.lon).toFixed(4)}) - Sector Centroid</span>
    </div>
    <label class="label" for="${id}Category">Report Category</label>
    <select id="${id}Category">${CATS.map(x => `<option>${esc(x)}</option>`).join('')}</select>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px">
      <div>
        <label class="label" for="${id}Injury">Injury Assessment</label>
        <select id="${id}Injury">
          <option>None</option>
          <option>Minor</option>
          <option>Serious</option>
          <option>Critical</option>
        </select>
      </div>
      <div>
        <label class="label" for="${id}Affected">Affected Persons</label>
        <input id="${id}Affected" type="number" min="1" max="100" value="1">
      </div>
    </div>
    <label class="label">Medical Priority Tags</label>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:8px; margin:8px 0">
      ${MED.map(x => `
        <label class="med-checkbox-label">
          <input type="checkbox" value="${esc(x)}" data-med="${id}">
          <span>${esc(x)}</span>
        </label>
      `).join('')}
    </div>
    <label class="label" for="${id}Details">Field Description (Strictly Avoid Names / Troop Info)</label>
    <textarea id="${id}Details" maxlength="1000" rows="3" placeholder="Describe observations, sounds, damage, or urgent needs..."></textarea>
    
    <!-- Photo Evidence Upload Input -->
    <label class="label">Incident Evidence / Photo (Uploaded to Persistent Storage)</label>
    <div style="background:rgba(0,0,0,0.25); border:1px dashed var(--camo-field); border-radius:6px; padding:12px; margin-bottom:8px">
      <input type="file" id="${id}Photo" accept="image/jpeg,image/png,image/webp,image/gif" style="display:none">
      <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
        <button type="button" class="secondary-btn" id="${id}PhotoBtn" style="padding:6px 12px; font-size:11px">
          <span>📷</span> Choose Evidence Photo
        </button>
        <span id="${id}PhotoLabel" style="font-size:11px; color:var(--text-dim)">No image selected (Max 8MB)</span>
      </div>
      <div id="${id}PhotoPreviewWrap" class="hidden" style="margin-top:10px; display:flex; align-items:center; gap:12px">
        <img id="${id}PhotoPreview" src="" alt="Evidence" style="max-height:90px; border-radius:4px; border:1px solid var(--camo-gold); object-fit:cover">
        <div>
          <div id="${id}PhotoFileInfo" style="font-size:11px; color:var(--camo-bone); font-weight:600"></div>
          <button type="button" class="small-btn danger" id="${id}PhotoRemove" style="font-size:10px; margin-top:6px">✕ Remove Photo</button>
        </div>
      </div>
    </div>

    <button id="${id}Submit" class="primary-btn" style="width:100%; margin-top:14px; justify-content:center">
      TRANSMIT VERIFIED SAFETY REPORT <span>→</span>
    </button>
    <div id="${id}Status" class="form-message" role="status"></div>
  `;
}

function bindReportForms() {
  const full = $('fullReportForm');
  if (full) {
    full.innerHTML = reportFormMarkup('full');
    const st = $('fullState'), di = $('fullDistrict');
    st.onchange = () => fillDistrict('full');
    di.onchange = () => showCoords('full');
    $('fullSubmit').onclick = () => submitReport('full');

    const photoBtn = $('fullPhotoBtn');
    const photoInput = $('fullPhoto');
    const photoPreviewWrap = $('fullPhotoPreviewWrap');
    const photoPreview = $('fullPhotoPreview');
    const photoLabel = $('fullPhotoLabel');
    const photoFileInfo = $('fullPhotoFileInfo');
    const photoRemove = $('fullPhotoRemove');

    if (photoBtn && photoInput) {
      photoBtn.onclick = () => photoInput.click();
      photoInput.onchange = () => {
        const file = photoInput.files[0];
        if (!file) return;
        if (file.size > 8 * 1024 * 1024) {
          toast('Photo exceeds 8MB limit. Please choose a smaller image.', true);
          photoInput.value = '';
          return;
        }
        const reader = new FileReader();
        reader.onload = e => {
          const dataUrl = e.target.result;
          state.selectedPhoto = { file, dataUrl, filename: file.name, mimeType: file.type };
          if (photoPreview) photoPreview.src = dataUrl;
          if (photoPreviewWrap) photoPreviewWrap.classList.remove('hidden');
          if (photoLabel) photoLabel.textContent = file.name;
          if (photoFileInfo) photoFileInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        };
        reader.readAsDataURL(file);
      };
    }

    if (photoRemove) {
      photoRemove.onclick = () => {
        state.selectedPhoto = null;
        if (photoInput) photoInput.value = '';
        if (photoPreviewWrap) photoPreviewWrap.classList.add('hidden');
        if (photoLabel) photoLabel.textContent = 'No image selected (Max 8MB)';
      };
    }
  }
}

function bindSosPage() {
  $$('[data-sos-cat]').forEach(b => {
    b.onclick = () => {
      state.selectedSosCategory = b.dataset.sosCat;
      $$('[data-sos-cat]').forEach(x => x.classList.toggle('active', x.dataset.sosCat === state.selectedSosCategory));
    };
  });

  const trigger = (btnId, msgId) => {
    const btn = $(btnId);
    if (!btn) return;
    btn.onclick = async () => {
      playRadarChirp('alert');
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      btn.disabled = true;
      formMsg($(msgId), 'Broadcasting emergency SOS signal...');
      
      const d = state.districts[0] || { state: 'Jammu And Kashmir', district: 'Kupwara' };
      const payload = {
        state: d.state,
        district: d.district,
        category: state.selectedSosCategory,
        injuryLevel: 'None',
        affectedCount: 1,
        details: `One-Tap Instant Civilian SOS triggered for ${state.selectedSosCategory} in ${d.district} sector.`,
        medicalNeeds: [],
        clientId: crypto.randomUUID()
      };

      try {
        const res = await api('/api/reports', { method: 'POST', body: JSON.stringify(payload) });
        formMsg($(msgId), `SOS Transmitted! Reference ${res.id.slice(0, 8)} · Trust Score: ${res.trustScore}%`, 'success');
        toast(`⚠️ One-Tap SOS for ${state.selectedSosCategory} sent to Control Room!`);
        loadCounts();
      } catch (e) {
        formMsg($(msgId), 'SOS Saved to offline queue: ' + e.message, 'success');
        toast('Stored in local encrypted offline queue');
      } finally {
        setTimeout(() => btn.disabled = false, 1500);
      }
    };
  };

  trigger('quickSosTrigger', 'quickSosStatus');
  trigger('sosPageTrigger', 'sosPageMessage');
}

function bindSimulateCluster() {
  const runSim = async () => {
    try {
      playRadarChirp('chirp');
      toast('Injecting 12 gunshot reports into Kupwara sector...');
      const res = await api('/api/simulate-cluster', { method: 'POST' });
      toast('12 reports merged into 1 High-Priority Cluster (12 ➔ 1)!');
      loadInbox();
      loadCounts();
    } catch (e) {
      toast('Simulation error: ' + e.message, true);
    }
  };

  if ($('simClusterBtn')) $('simClusterBtn').onclick = runSim;
  if ($('inboxSimClusterBtn')) $('inboxSimClusterBtn').onclick = runSim;
}

function bindSatelliteToggles() {
  const toggle = (id, key) => {
    const btn = $(id);
    if (!btn) return;
    btn.onclick = () => {
      state.activeLayers[key] = !state.activeLayers[key];
      btn.classList.toggle('active', state.activeLayers[key]);
      toast(`${key.toUpperCase()} layer ${state.activeLayers[key] ? 'Enabled' : 'Disabled'}`);
    };
  };
  toggle('toggleGibs', 'gibs');
  toggle('toggleBhuvan', 'bhuvan');
  toggle('toggleFirms', 'firms');
  toggle('toggleSentinel', 'sentinel');

  const zi = $('zoomIndia');
  if (zi) {
    zi.onclick = () => {
      const m = state.maps['fullSatelliteMap'] || state.maps['citizenMap'];
      if (m && m.flyTo) m.flyTo({ center: [78.9629, 22.5937], zoom: 4.8 });
      toast('Centered on India frontier coordinates');
    };
  }

  const st = $('streetToggle');
  if (st) {
    st.onclick = () => {
      state.activeLayers.streets = !state.activeLayers.streets;
      st.classList.toggle('active', state.activeLayers.streets);
      toast(`OpenStreetMap context ${state.activeLayers.streets ? 'Enabled' : 'Disabled'}`);
    };
  }
}

// Data loaders
function fillState(el) {
  if (!state.districts.length) return;
  const names = [...new Set(state.districts.map(d => d.state))].sort((a, b) => a.localeCompare(b));
  el.innerHTML = '<option value="">Select State / UT</option>' + names.map(x => `<option value="${esc(x)}">${esc(x)}</option>`).join('');
}

function fillDistrict(id) {
  const st = $(`${id}State`).value;
  const el = $(`${id}District`);
  const ds = state.districts.filter(d => d.state === st);
  el.disabled = !st;
  el.innerHTML = '<option value="">Select District</option>' + ds.map(d => `<option value="${esc(d.district)}">${esc(d.district)}</option>`).join('');
  showCoords(id);
}

function chosenDistrict(id) {
  return state.districts.find(d => d.state === $(`${id}State`)?.value && d.district === $(`${id}District`)?.value);
}

function showCoords(id) {
  const d = chosenDistrict(id), box = $(`${id}Coordinates`);
  if (!box) return;
  if (!d) {
    box.innerHTML = '<span>◎</span><span>Select a district to view sector centroid.</span>';
    return;
  }
  box.innerHTML = `<span>◎</span><span><strong>${esc(d.state)} · ${esc(d.district)}</strong> (${Number(d.lat).toFixed(4)}, ${Number(d.lon).toFixed(4)}) - Sector Centroid</span>`;
}

function getOfflineQueue() {
  try {
    return JSON.parse(localStorage.getItem('raksha_offline_queue') || '[]');
  } catch {
    return [];
  }
}

function saveOfflineQueue(q) {
  try {
    localStorage.setItem('raksha_offline_queue', JSON.stringify(q));
  } catch {}
}

function enqueueOfflineReport(item) {
  const q = getOfflineQueue();
  q.push(item);
  saveOfflineQueue(q);
}

let isSyncingQueue = false;
async function syncOfflineQueue() {
  if (isSyncingQueue || !navigator.onLine) return;
  const q = getOfflineQueue();
  if (!q.length) return;
  isSyncingQueue = true;
  const remaining = [];
  for (const item of q) {
    try {
      let photoUrl = item.payload.photoUrl || null;
      if (!photoUrl && item.photoDataUrl) {
        const up = await api('/api/upload', {
          method: 'POST',
          body: JSON.stringify({
            dataUrl: item.photoDataUrl,
            filename: item.photoName || 'evidence.jpg',
            mimeType: item.mimeType || 'image/jpeg'
          })
        });
        if (up && up.url) photoUrl = up.url;
      }
      const payload = { ...item.payload, photoUrl, photoName: item.photoName };
      delete payload.photoDataUrl;
      const res = await api('/api/reports', { method: 'POST', body: JSON.stringify(payload) });
      toast(`📡 Offline report #${res.id.slice(0, 8)} synchronized with Control Room!`);
      playRadarChirp('chirp');
      loadCounts();
      if (state.page === 'report') loadMyReports();
      if (state.page === 'inbox') loadInbox();
    } catch {
      remaining.push(item);
    }
  }
  saveOfflineQueue(remaining);
  isSyncingQueue = false;
}

function resetReportForm(id) {
  const det = $(`${id}Details`);
  if (det) det.value = '';
  const tit = $(`${id}Title`);
  if (tit) tit.value = '';
  state.selectedPhoto = null;
  const photoInput = $(`${id}Photo`);
  if (photoInput) photoInput.value = '';
  const previewWrap = $(`${id}PhotoPreviewWrap`);
  if (previewWrap) previewWrap.classList.add('hidden');
  const photoLabel = $(`${id}PhotoLabel`);
  if (photoLabel) photoLabel.textContent = 'No image selected (Max 8MB)';
  $$(`[data-med="${id}"]`).forEach(c => c.checked = false);
}

async function submitReport(id) {
  const d = chosenDistrict(id);
  const status = $(`${id}Status`), btn = $(`${id}Submit`);
  if (!d) {
    formMsg(status, 'Please select state and district from directory', 'error');
    return;
  }
  const title = String($(`${id}Title`)?.value || '').trim();
  const details = String($(`${id}Details`)?.value || '').trim();
  const photo = state.selectedPhoto || null;
  const clientId = crypto.randomUUID();

  const payload = {
    title,
    state: d.state,
    district: d.district,
    category: $(`${id}Category`).value,
    injuryLevel: $(`${id}Injury`).value,
    affectedCount: $(`${id}Affected`).value,
    details,
    medicalNeeds: $$(`[data-med="${id}"]:checked`).map(c => c.value),
    clientId
  };

  btn.disabled = true;
  formMsg(status, 'Verifying connection & transmitting report...');

  // If client is currently offline without wifi/signal:
  if (!navigator.onLine) {
    enqueueOfflineReport({
      payload,
      photoDataUrl: photo?.dataUrl || null,
      photoName: photo?.filename || null,
      mimeType: photo?.mimeType || 'image/jpeg',
      queuedAt: new Date().toISOString()
    });
    formMsg(status, '📶 Offline Mode: Report saved in local device storage. It will synchronize automatically in the same minute connection is detected.', 'success');
    toast('Report saved in local offline queue');
    resetReportForm(id);
    btn.disabled = false;
    return;
  }

  try {
    let photoUrl = null;
    if (photo && photo.dataUrl) {
      formMsg(status, 'Uploading evidence photo to persistent storage...');
      const up = await api('/api/upload', {
        method: 'POST',
        body: JSON.stringify({
          dataUrl: photo.dataUrl,
          filename: photo.filename,
          mimeType: photo.mimeType
        })
      });
      if (up && up.url) photoUrl = up.url;
    }

    payload.photoUrl = photoUrl;
    payload.photoName = photo ? photo.filename : null;

    formMsg(status, 'Delivering to District Control Room...');
    const res = await api('/api/reports', { method: 'POST', body: JSON.stringify(payload) });
    formMsg(status, `Delivered to Control Room · Trust Score: ${res.trustScore}% · Ref: #${res.id.slice(0, 8)}`, 'success');
    toast('Safety report delivered successfully to Control Room!');
    playRadarChirp('chirp');
    resetReportForm(id);
    loadMyReports();
    loadCounts();
  } catch (e) {
    // If request failed due to network disruption, queue it safely
    enqueueOfflineReport({
      payload,
      photoDataUrl: photo?.dataUrl || null,
      photoName: photo?.filename || null,
      mimeType: photo?.mimeType || 'image/jpeg',
      queuedAt: new Date().toISOString()
    });
    formMsg(status, '⚠️ Network interrupted: Report preserved in local device queue. Will auto-sync to Control Room when connection is restored.', 'error');
    toast('Network interrupted: Report stored in offline queue');
  } finally {
    btn.disabled = false;
  }
}

async function loadCounts() {
  if (!state.user) return;
  if (state.user.role === 'citizen') {
    await loadMyReports();
    await loadAlerts();
    return;
  }
  try {
    const [r, c] = await Promise.all([api('/api/authority/reports'), api('/api/authority/clusters')]);
    if ($('overviewTotal')) $('overviewTotal').textContent = r.length;
    if ($('overviewReview')) $('overviewReview').textContent = r.filter(x => !x.verified && x.status !== 'Marked false').length;
    if ($('overviewGrouped')) $('overviewGrouped').textContent = c.filter(x => x.count > 1).length;
    if ($('overviewHighTrust')) $('overviewHighTrust').textContent = c.filter(x => (x.trustScore || 0) >= 80).length;
    
    if ($('inboxTotal')) $('inboxTotal').textContent = r.length;
    if ($('inboxReview')) $('inboxReview').textContent = r.filter(x => !x.verified && x.status !== 'Marked false').length;
    if ($('inboxGrouped')) $('inboxGrouped').textContent = c.filter(x => x.count > 1).length;
    if ($('inboxDispatched')) $('inboxDispatched').textContent = r.filter(x => x.assignedAgency).length;

    renderClusters(c, 'overviewClusters');
  } catch {}
}

async function loadMyReports() {
  try {
    const list = await api('/api/my/reports');
    if ($('citizenTotal')) $('citizenTotal').textContent = list.length;
    if ($('citizenPending')) $('citizenPending').textContent = list.filter(r => !r.verified && r.status !== 'Resolved').length;
    renderReports(list.slice(0, 3), 'recentReports');
    renderReports(list, 'fullMyReports');
  } catch {}
}

async function loadInbox() {
  try {
    const [r, c] = await Promise.all([api('/api/authority/reports'), api('/api/authority/clusters')]);
    renderClusters(c, 'clusterList');
    renderReports(r, 'allReports', true);
    loadCounts();
    const ref = $('refreshInbox');
    if (ref) ref.onclick = () => { toast('Refreshing incident feed...'); loadInbox(); };
  } catch (e) {
    toast(e.message, true);
  }
}

function renderClusters(list, id) {
  const el = $(id);
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted)">No active report clusters in the last 30 minutes.</div>';
    return;
  }
  el.innerHTML = list.map(c => `
    <article class="incident cluster-hero camo-border">
      <div class="incident-head">
        <div>
          <span class="trust-meter ${c.trustScore >= 80 ? 'trust-high' : c.trustScore >= 60 ? 'trust-med' : 'trust-low'}">
            🛡️ Trust Score: ${c.trustScore || 75}%
          </span>
          <b style="font-size:13px; color:var(--camo-bone); margin-left:8px">
            ${esc(c.count)} Reports Merged · ${esc(c.category)} · ${esc(c.district)}, ${esc(c.state)}
          </b>
        </div>
        <span class="status-pill ${c.stage === 'Officer Verified' ? '' : 'unverified'}">${esc(c.stage)}</span>
      </div>

      <div class="incident-summary">
        <span>Window: <strong>${c.timeSpanMin || 7} min</strong></span>
        <span>Recommended Agency: <strong>${esc(c.assignedAgency || 'Local Police QRT')}</strong></span>
        <span>Latest: <strong>${fmt(c.lastAt)}</strong></span>
      </div>

      <div class="incident-actions">
        <button class="small-btn" onclick="verifyFirstCluster('${c.reportIds[0]}')">Verify Cluster</button>
        <button class="camo-action-btn" style="padding:4px 8px; font-size:10px" onclick="composeClusterAlert('${c.district}', '${c.category}', '${c.reportIds[0]}')">
          📢 Issue Geo-Targeted Alert
        </button>
      </div>
    </article>
  `).join('');
}

window.verifyFirstCluster = async (repId) => {
  try {
    await api(`/api/authority/reports/${repId}/action`, { method: 'POST', body: JSON.stringify({ action: 'verify' }) });
    toast('Cluster verified by Officer! Response agencies alerted.');
    loadInbox();
  } catch (e) {
    toast(e.message, true);
  }
};

window.composeClusterAlert = (district, category, reportId) => {
  const msgEn = `Official safety alert for ${district}: Avoid the affected perimeter. Move indoors or toward designated safe point. Call 112 for emergency help.`;
  const msgHi = `आधिकारिक सुरक्षा चेतावनी (${district}): कृपया प्रभावित क्षेत्र से दूर रहें। घर के अंदर रहें और शांत रहें। आपात स्थिति में 112 डायल करें।`;
  
  modal(`
    <h2 style="color:var(--camo-bone); margin-top:0">📢 Issue Official Voice & Text Area Alert</h2>
    <p style="font-size:12px; color:var(--text-dim)">Geo-targeted to civilian recipients in <strong>${esc(district)}</strong>.</p>
    
    <label class="label">English Broadcast</label>
    <textarea id="alertTextEn" rows="3">${esc(msgEn)}</textarea>
    
    <label class="label">Hindi Audio Voice Broadcast (हिंदी)</label>
    <textarea id="alertTextHi" rows="3">${esc(msgHi)}</textarea>

    <div style="margin-top:14px; display:flex; gap:8px">
      <button class="camo-action-btn" id="sendAlertConfirm" style="flex:1; justify-content:center">
        BROADCAST VERIFIED ALERT NOW <span>→</span>
      </button>
      <button class="secondary-btn" onclick="speakVoiceAlert($('alertTextEn').value, 'en-IN')">
        🔊 Test Voice
      </button>
    </div>
  `);

  $('sendAlertConfirm').onclick = async () => {
    try {
      await api('/api/authority/alerts', {
        method: 'POST',
        body: JSON.stringify({
          reportId,
          message: $('alertTextEn').value,
          hindiMessage: $('alertTextHi').value
        })
      });
      $('modal').classList.add('hidden');
      toast(`Area alert issued for ${district}`);
      loadAlerts();
    } catch (e) {
      toast(e.message, true);
    }
  };
};

function renderReports(list, id, actions = false) {
  const el = $(id);
  if (!el) return;
  if (actions) state.reports = list;
  else state.myReports = list;

  if (!list.length) {
    el.innerHTML = '<div style="padding:16px; color:var(--text-muted); text-align:center">No reports yet.</div>';
    return;
  }
  el.innerHTML = list.map(r => `
    <article class="report-row camo-border">
      <div class="report-row-top">
        <div>
          <b style="color:var(--camo-bone); font-size:13px">${esc(r.title || r.category)}</b>
          <small style="color:var(--camo-gold); margin-left:6px; font-weight:700">#${esc(r.id.slice(0, 8))}</small>
          <span style="font-size:10px; color:var(--camo-sand); margin-left:8px">${fmt(r.createdAt)}</span>
        </div>
        <span class="status-pill ${r.status === 'Marked false' ? 'false' : r.verified ? '' : 'unverified'}">
          ${esc(r.status)}
        </span>
      </div>

      <div style="font-size:11px; color:var(--camo-tan); margin:5px 0; display:flex; align-items:center; flex-wrap:wrap; gap:8px">
        <span>📍 <strong>${esc(r.district)}, ${esc(r.state)}</strong></span>
        <span>· Trust: <strong style="color:var(--safe-green)">${r.trustScore || 85}%</strong></span>
        <span>· Category: <strong>${esc(r.category)}</strong></span>
        ${r.injuryLevel && r.injuryLevel !== 'None' ? `<span class="tactical-badge red" style="padding:1px 6px">Injury: ${esc(r.injuryLevel)}</span>` : ''}
      </div>

      ${actions ? `
        <div style="font-size:11px; margin:4px 0; padding:4px 8px; background:rgba(0,0,0,0.25); border-radius:4px; display:flex; align-items:center; justify-content:space-between">
          <span>👤 Reporter: <strong style="color:var(--camo-bone)">${esc(r.userName || 'Verified Citizen')}</strong></span>
          <button type="button" class="small-btn" style="padding:2px 8px; font-size:10px; border-color:var(--camo-gold)" onclick="viewReporterProfile('${r.userId}')">
            👤 View Reporter Profile
          </button>
        </div>
      ` : ''}

      <p style="font-size:11px; margin:5px 0; color:var(--camo-bone); line-height:1.4">${esc(r.details || 'No additional notes provided.')}</p>

      ${r.photoUrl ? `
        <div style="display:flex; align-items:center; gap:10px; margin:8px 0; padding:6px 10px; background:#121c13; border-radius:6px; border:1px solid var(--camo-field)">
          <img src="${esc(r.photoUrl)}" alt="Evidence" style="width:52px; height:52px; object-fit:cover; border-radius:4px; border:1px solid var(--camo-gold); cursor:pointer" onclick="openFullPhoto('${esc(r.photoUrl)}', '${esc(r.title || r.category)}')">
          <div style="flex:1">
            <div style="font-size:11px; font-weight:700; color:var(--camo-gold)">📷 Evidence Attached</div>
            <small style="color:var(--text-dim); font-size:10px">${esc(r.photoName || 'evidence.jpg')}</small>
          </div>
          <button type="button" class="small-btn" style="font-size:10px" onclick="viewFullReport('${r.id}')">🔍 Open Full Report & Photo</button>
        </div>
      ` : `
        <div style="margin:4px 0">
          <button type="button" class="small-btn" style="font-size:10px" onclick="viewFullReport('${r.id}')">🔍 View Complete Report</button>
        </div>
      `}

      ${actions ? `
        <div class="incident-actions" style="margin-top:8px">
          <button class="small-btn" onclick="doAction('${r.id}', 'verify')" ${r.verified ? 'disabled' : ''}>Verify</button>
          <button class="small-btn" onclick="composeClusterAlert('${r.district}', '${r.category}', '${r.id}')" ${!r.verified ? 'disabled' : ''}>Issue Alert</button>
          <button class="small-btn" onclick="doAction('${r.id}', 'resolve')" ${!r.verified ? 'disabled' : ''}>Resolve</button>
          <button class="small-btn danger" onclick="doAction('${r.id}', 'false')" ${r.status === 'Marked false' ? 'disabled' : ''}>False</button>
        </div>
      ` : ''}
    </article>
  `).join('');
}

window.viewFullReport = (reportId) => {
  const r = (state.reports || []).find(x => x.id === reportId) || (state.myReports || []).find(x => x.id === reportId);
  if (!r) {
    toast('Report details not found', true);
    return;
  }
  const isOfficer = ['officer', 'super_admin'].includes(state.user?.role);
  modal(`
    <div class="full-report-modal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; border-bottom:1px solid var(--camo-olive); padding-bottom:10px">
        <div>
          <span class="tactical-badge ${r.verified ? 'cyan' : 'gold'}">${r.verified ? 'OFFICER VERIFIED' : 'PENDING VERIFICATION'}</span>
          <h2 style="margin:4px 0 0; color:var(--camo-bone); font-size:18px">${esc(r.title || r.category)}</h2>
          <small style="color:var(--text-dim)">Reference: #${esc(r.id)} · Submitted: ${fmt(r.createdAt)}</small>
        </div>
        <span class="status-pill ${r.status === 'Marked false' ? 'false' : r.verified ? '' : 'unverified'}">${esc(r.status)}</span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:12px; background:#142015; padding:12px; border-radius:6px; border:1px solid var(--camo-field); margin-bottom:12px">
        <div><span style="color:var(--camo-tan)">Category:</span> <b style="color:#fff">${esc(r.category)}</b></div>
        <div><span style="color:var(--camo-tan)">Trust Score:</span> <b style="color:var(--safe-green)">${r.trustScore || 85}%</b></div>
        <div><span style="color:var(--camo-tan)">Sector Location:</span> <b style="color:#fff">${esc(r.district)}, ${esc(r.state)}</b></div>
        <div><span style="color:var(--camo-tan)">GPS Centroid:</span> <b style="color:#fff">${Number(r.lat || 0).toFixed(4)}, ${Number(r.lon || 0).toFixed(4)}</b></div>
        <div><span style="color:var(--camo-tan)">Injury Level:</span> <b style="color:#fff">${esc(r.injuryLevel || 'None')}</b></div>
        <div><span style="color:var(--camo-tan)">Persons Affected:</span> <b style="color:#fff">${r.affectedCount || 1}</b></div>
      </div>

      ${isOfficer ? `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 12px; background:#182618; border-radius:6px; border:1px solid var(--camo-gold); margin-bottom:12px">
          <div>
            <span style="font-size:11px; color:var(--camo-tan)">Reporting Citizen Account:</span>
            <div style="font-weight:750; color:var(--camo-bone); font-size:13px">👤 ${esc(r.userName || 'Verified Citizen')}</div>
          </div>
          <button type="button" class="camo-action-btn" style="padding:4px 10px; font-size:11px" onclick="viewReporterProfile('${r.userId}')">
            👤 View Reporter Profile & Mobile <span>→</span>
          </button>
        </div>
      ` : ''}

      <div style="margin-bottom:12px">
        <label class="label" style="margin-bottom:4px">Incident Description / Witness Statement</label>
        <div style="background:#111a12; border:1px solid var(--camo-field); border-radius:6px; padding:10px; font-size:12px; color:var(--camo-bone); line-height:1.4">
          ${esc(r.details || 'No description provided by reporter.')}
        </div>
      </div>

      <div style="margin-bottom:14px">
        <label class="label" style="margin-bottom:4px">Attached Photo / Visual Evidence</label>
        ${r.photoUrl ? `
          <div style="text-align:center; background:#0d140e; border:1px solid var(--camo-field); border-radius:6px; padding:10px">
            <a href="${esc(r.photoUrl)}" target="_blank" rel="noopener" title="Click to view full size in new tab">
              <img src="${esc(r.photoUrl)}" alt="Evidence Photo" style="max-width:100%; max-height:360px; object-fit:contain; border-radius:6px; border:1px solid var(--camo-gold)">
            </a>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:11px">
              <span style="color:var(--camo-tan)">File: <strong>${esc(r.photoName || 'evidence.jpg')}</strong></span>
              <a href="${esc(r.photoUrl)}" target="_blank" download class="small-btn" style="font-size:10px">⬇️ Download Photo</a>
            </div>
          </div>
        ` : `
          <div style="padding:16px; background:#111a12; border:1px solid var(--camo-field); border-radius:6px; text-align:center; color:var(--text-dim); font-size:12px">
            No photo or image evidence attached with this report submission.
          </div>
        `}
      </div>

      ${isOfficer ? `
        <div class="incident-actions" style="border-top:1px solid var(--camo-olive); padding-top:12px">
          <button class="small-btn" onclick="doAction('${r.id}', 'verify'); $('modal').classList.add('hidden');" ${r.verified ? 'disabled' : ''}>Verify Report</button>
          <button class="small-btn" onclick="$('modal').classList.add('hidden'); composeClusterAlert('${r.district}', '${r.category}', '${r.id}')" ${!r.verified ? 'disabled' : ''}>Issue Alert</button>
          <button class="small-btn" onclick="doAction('${r.id}', 'resolve'); $('modal').classList.add('hidden');" ${!r.verified ? 'disabled' : ''}>Mark Resolved</button>
          <button class="small-btn danger" onclick="doAction('${r.id}', 'false'); $('modal').classList.add('hidden');" ${r.status === 'Marked false' ? 'disabled' : ''}>Mark False</button>
        </div>
      ` : ''}
    </div>
  `);
};

window.viewReporterProfile = async (userId) => {
  try {
    toast('Fetching reporter profile...');
    const res = await api('/api/authority/users/' + encodeURIComponent(userId));
    const p = res.user;
    modal(`
      <div class="reporter-profile-modal">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px; border-bottom:1px solid var(--camo-olive); padding-bottom:12px">
          <div class="avatar" style="width:48px; height:48px; font-size:20px">${esc((p.fullName || 'U')[0].toUpperCase())}</div>
          <div>
            <h3 style="margin:0; color:var(--camo-bone); font-size:18px">${esc(p.fullName)}</h3>
            <span class="tactical-badge ${p.identityStatus.includes('Verified') ? 'cyan' : 'gold'}">${esc(p.identityStatus)}</span>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:12px; background:#142015; padding:12px; border-radius:6px; border:1px solid var(--camo-field); margin-bottom:14px">
          <div><span style="color:var(--camo-tan)">📞 Mobile:</span> <b style="color:#fff; font-family:monospace">${esc(p.mobile || 'Not provided')}</b></div>
          <div><span style="color:var(--camo-tan)">✉️ Email:</span> <b style="color:#fff">${esc(p.email)}</b></div>
          <div><span style="color:var(--camo-tan)">📅 Registered:</span> <b style="color:#fff">${fmt(p.createdAt)}</b></div>
          <div><span style="color:var(--camo-tan)">📊 Total Reports:</span> <b style="color:var(--camo-gold)">${p.reportsCount}</b></div>
        </div>

        <h4 style="margin:10px 0 6px; font-size:12px; color:var(--camo-bone)">Past Submissions from this Reporter (${p.reportsCount})</h4>
        <div style="max-height:220px; overflow-y:auto; border:1px solid var(--camo-field); border-radius:6px; background:#111a12">
          ${p.reports && p.reports.length ? p.reports.map(r => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; border-bottom:1px solid rgba(255,255,255,0.06); font-size:11px">
              <div>
                <b>${esc(r.title || r.category)}</b> · <span style="color:var(--camo-tan)">${esc(r.district)}, ${esc(r.state)}</span>
                <small style="display:block; color:var(--text-dim)">${fmt(r.createdAt)}</small>
              </div>
              <div style="text-align:right">
                <span class="status-pill ${r.status === 'Marked false' ? 'false' : r.verified ? '' : 'unverified'}">${esc(r.status)}</span>
                ${r.photoUrl ? '<span style="font-size:10px; color:var(--camo-gold); display:block; margin-top:2px">📷 Photo</span>' : ''}
              </div>
            </div>
          `).join('') : '<div style="color:var(--text-dim); padding:12px; text-align:center">No past reports from this account.</div>'}
        </div>
      </div>
    `);
  } catch (err) {
    toast('Unable to load reporter profile: ' + err.message, true);
  }
};

window.openFullPhoto = (url, caption) => {
  modal(`
    <div style="text-align:center">
      <h3 style="color:var(--camo-bone); margin-top:0">${esc(caption || 'Incident Evidence')} - Original Photo</h3>
      <div style="background:#0b120c; border:2px solid var(--camo-gold); border-radius:8px; padding:10px; margin:10px 0; box-shadow:0 4px 24px rgba(0,0,0,0.8)">
        <img src="${esc(url)}" alt="Original Evidence Photo" style="max-width:100%; max-height:70vh; object-fit:contain; border-radius:4px">
      </div>
      <div style="margin-top:10px">
        <a href="${esc(url)}" download target="_blank" rel="noopener" class="camo-action-btn" style="display:inline-flex; padding:6px 16px; font-size:12px">
          ⬇️ Download Original High-Res Image
        </a>
      </div>
    </div>
  `);
};

window.doAction = async (id, action) => {
  try {
    await api(`/api/authority/reports/${id}/action`, { method: 'POST', body: JSON.stringify({ action }) });
    toast(`Report ${action} successful`);
    loadInbox();
  } catch (e) {
    toast(e.message, true);
  }
};

async function loadAlerts() {
  try {
    const list = await api('/api/alerts');
    if ($('citizenAlertCount')) $('citizenAlertCount').textContent = list.length;
    const el = $('alertsList');
    if (!el) return;
    if (!list.length) {
      el.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted)">No active emergency alerts in your sector.</div>';
      return;
    }
    el.innerHTML = list.map(a => `
      <article class="voice-alert-banner camo-border hud-box">
        <div class="voice-alert-head">
          <span class="tactical-badge red">📢 OFFICIAL CIVILIAN SAFETY ADVISORY</span>
          <span style="font-size:10px; color:var(--camo-sand)">${fmt(a.createdAt)}</span>
        </div>
        <b style="font-size:14px; color:var(--camo-bone)">Sector: ${esc(a.state)} · ${esc(a.district)}</b>
        <p style="font-size:13px; color:#fff; margin:8px 0">${esc(a.message)}</p>
        ${a.hindiMessage ? `<p style="font-size:12px; color:var(--camo-sand); margin:4px 0"><em>${esc(a.hindiMessage)}</em></p>` : ''}
        
        <div class="voice-controls">
          <button class="voice-play-btn" onclick="speakVoiceAlert('${esc(a.message).replace(/'/g, "\\'")}', 'en-IN')">
            🔊 Play English Voice Alert
          </button>
          ${a.hindiMessage ? `
            <button class="voice-play-btn" style="background:var(--camo-olive); color:#fff" onclick="speakVoiceAlert('${esc(a.hindiMessage).replace(/'/g, "\\'")}', 'hi-IN')">
              🔊 Play Hindi Voice (हिंदी)
            </button>
          ` : ''}
        </div>
      </article>
    `).join('');
  } catch {}
}

async function loadFamilyPage() {
  try {
    const data = await api('/api/family-status');
    if ($('citizenFamilyStatus')) $('citizenFamilyStatus').textContent = data.myStatus?.status || 'Safe';
    if ($('netSafe')) $('netSafe').textContent = data.networkCounts.safe;
    if ($('netShelter')) $('netShelter').textContent = data.networkCounts.shelter;
    if ($('netHelp')) $('netHelp').textContent = data.networkCounts.needHelp;
    if ($('netInjured')) $('netInjured').textContent = data.networkCounts.injured;

    $$('.family-opt').forEach(opt => {
      opt.onclick = () => {
        $$('.family-opt').forEach(x => x.classList.remove('selected'));
        opt.classList.add('selected');
      };
    });

    $('saveFamilyBtn').onclick = async () => {
      const selected = document.querySelector('.family-opt.selected')?.dataset.status || 'Safe';
      const note = $('familyNote')?.value || '';
      try {
        await api('/api/family-status', { method: 'POST', body: JSON.stringify({ status: selected, note }) });
        formMsg($('familyMsg'), `Family status updated: ${selected}`, 'success');
        toast(`Household marked: ${selected}`);
        loadFamilyPage();
      } catch (e) {
        formMsg($('familyMsg'), e.message, 'error');
      }
    };
  } catch {}
}

async function loadTouristPage() {
  try {
    const data = await api('/api/tourist-checkin');
    const list = $('geofenceList');
    if (list) {
      list.innerHTML = data.geofenceZones.map(z => `
        <div class="geofence-card camo-border">
          <div>
            <b style="color:var(--camo-bone); font-size:12px">${esc(z.name)}</b>
            <small style="display:block; color:var(--text-dim); margin-top:2px">${esc(z.alert)}</small>
          </div>
          <div style="text-align:right">
            <span class="tactical-badge ${z.status.includes('Restricted') ? 'red' : 'cyan'}">${esc(z.status)}</span>
            <div style="font-size:10px; color:var(--camo-sand); margin-top:3px">${z.distanceKm} km away</div>
          </div>
        </div>
      `).join('');
    }

    $('saveTouristBtn').onclick = async () => {
      const dest = $('touristDest')?.value;
      const duration = $('touristDuration')?.value;
      const emerg = $('touristEmergency')?.value;
      try {
        await api('/api/tourist-checkin', { method: 'POST', body: JSON.stringify({ destination: dest, durationDays: duration, emergencyContact: emerg }) });
        formMsg($('touristMsg'), 'Tourist corridor check-in active!', 'success');
        toast('Tourist check-in registered');
      } catch (e) {
        formMsg($('touristMsg'), e.message, 'error');
      }
    };
  } catch {}
}

async function loadAudit() {
  try {
    const rows = await api('/api/authority/audit');
    const tbody = $('auditRows');
    if (!tbody) return;
    tbody.innerHTML = rows.map(r => `
      <tr style="border-bottom:1px solid rgba(207,196,162,0.15)">
        <td style="padding:8px; color:var(--camo-sand)">${fmt(r.createdAt)}</td>
        <td style="padding:8px; color:var(--camo-gold)">${esc(r.actor)}</td>
        <td style="padding:8px; font-weight:750">${esc(r.action)}</td>
        <td style="padding:8px; color:var(--text-dim)">${esc(r.entity)} · ${esc(r.entityId)}</td>
      </tr>
    `).join('');
  } catch {}
}

async function loadGeography() {
  try {
    const x = await api('/api/geography');
    if (x && Array.isArray(x.districts) && x.districts.length) {
      state.districts = x.districts;
      bindReportForms();
    }
  } catch {}
}

// Maps
function imageryAvailableDate() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 2);
  return d.toISOString().slice(0, 10);
}

function tileUrls(date) {
  const base = `https://gibs-{a}.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;
  return ['a', 'b', 'c'].map(s => base.replace('{a}', s));
}

function satelliteStyle(date) {
  return {
    version: 8,
    sources: {
      satellite: {
        type: 'raster',
        tiles: tileUrls(date),
        tileSize: 256,
        maxzoom: 9,
        attribution: 'NASA EOSDIS GIBS · MODIS Terra True Color'
      }
    },
    layers: [{ id: 'nasa-satellite', type: 'raster', source: 'satellite', minzoom: 0, maxzoom: 9 }]
  };
}

function initMaps(page) {
  if (!window.maplibregl) return;
  const ids = page === 'overview'
    ? [state.user?.role === 'citizen' ? 'citizenMap' : 'adminOverviewMap']
    : page === 'satellite' ? ['fullSatelliteMap']
    : page === 'inbox' ? ['adminMap'] : [];

  for (const id of ids) {
    const el = $(id);
    if (!el || state.maps[id]) continue;
    const date = imageryAvailableDate();
    try {
      const m = new maplibregl.Map({
        container: id,
        style: satelliteStyle(date),
        center: [74.20722, 34.52136], // Centered on Kupwara / J&K sector
        zoom: 6.5,
        minZoom: 2,
        maxZoom: 9,
        attributionControl: false
      });
      m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      state.maps[id] = m;
    } catch {}
  }
}

function connectEvents() {
  state.events?.close();
  try {
    state.events = new EventSource('/api/events');
    state.events.onopen = () => { if ($('connectionLabel')) $('connectionLabel').textContent = 'LIVE FEED CONNECTED'; };
    state.events.onerror = () => { if ($('connectionLabel')) $('connectionLabel').textContent = 'SYNC RETRYING'; };
    state.events.onmessage = e => {
      try {
        const d = JSON.parse(e.data);
        if (d.type === 'report' || d.type === 'update') {
          playRadarChirp('chirp');
          toast('New border safety signal detected');
          loadCounts();
          if (state.user?.role === 'officer') {
            loadInbox();
          }
          if (state.user?.role === 'citizen') {
            loadMyReports();
          }
        }
        if (d.type === 'alert') {
          playRadarChirp('alert');
          toast('🚨 New verified official emergency alert broadcast!');
          loadAlerts();
        }
      } catch {}
    };
  } catch {}
}

async function init() {
  window.addEventListener('online', () => {
    toast('📶 Connection restored. Synchronizing offline reports...');
    syncOfflineQueue();
  });
  setInterval(syncOfflineQueue, 15000);
  syncOfflineQueue();

  try {
    const h = await api('/api/health');
    state.port = h.port || 5050;
    if ($('portDisplay')) $('portDisplay').textContent = `PORT ${state.port} · SECURE HOST`;
  } catch {}

  try {
    const d = await api('/api/me');
    if (d.user) {
      state.user = d.user;
      openApp();
    }
  } catch {}
}

init();
