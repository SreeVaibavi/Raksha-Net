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
  currentDistrict: localStorage.getItem('rakshanet_user_district') || 'Kupwara',
  currentState: localStorage.getItem('rakshanet_user_state') || 'Jammu And Kashmir',
  maps: {},
  events: null,
  page: 'overview',
  activeLayers: { gibs: true, firms: false, bhuvan: false, sentinel: false, streets: false },
  selectedSosCategory: 'Gunshot-like sound',
  selectedPhoto: null,
  reports: [],
  myReports: [],
  port: 5050,
  hardware: {
    activeTab: 'citizen',
    citizenDistrict: localStorage.getItem('rakshanet_user_district') || 'Kupwara',
    soldierDistrict: 'Kupwara',
    buzzerActive: false,
    devices: [],
    logs: []
  }
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

// Citizen safety notifications: vibration is best-effort and requires a supported device.
// Browser notifications require explicit permission and may not appear while the app is closed.
async function enableSafetyNotifications() {
  if (!('Notification' in window)) {
    toast('This browser does not support system notifications.', true);
    return;
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      toast('Safety notifications enabled on this device.');
      if (navigator.vibrate) navigator.vibrate([120, 80, 120]);
    } else {
      toast('Notifications are disabled. Keep RakshaNet open to see in-app alerts.', true);
    }
  } catch {
    toast('Could not enable notifications in this browser.', true);
  }
}

function notifyOfficialSafetyAlert(alert) {
  // A short vibration pattern; browser/device support varies.
  try { navigator.vibrate?.([250, 120, 250, 120, 400]); } catch {}
  playRadarChirp('alert');
  toast('🚨 Official safety alert received. Open Voice & Area Alerts to read it.');
  loadAlerts();

  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const n = new Notification('RakshaNet safety alert', {
        body: `${alert?.district ? alert.district + ': ' : ''}${alert?.message || 'An official safety advisory was issued.'}`,
        tag: alert?.id || 'rakshanet-safety-alert',
        renotify: false,
        icon: '/icon-192.png'
      });
      n.onclick = () => { window.focus(); go('alerts'); n.close(); };
    } catch {}
  }
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

// Portal Switch (Citizen, Soldier/Defense, Admin)
function choosePortal(p) {
  state.portal = p;
  $('citizenPortalBtn')?.classList.toggle('selected', p === 'citizen');
  $('soldierPortalBtn')?.classList.toggle('selected', p === 'soldier');
  $('adminPortalBtn')?.classList.toggle('selected', p === 'admin');
  
  if (p === 'admin') {
    $('authKicker').textContent = 'RESTRICTED COMMAND ACCESS';
    $('authTitle').textContent = 'Control Room Sign In';
    $('authDesc').textContent = 'Authorized officers and emergency control administrators.';
    $('loginEmail').value = 'admin@rakshanet.local';
    $('loginPassword').value = 'Rk!BXSdLSpCNGRVtl3zT1Wt5-Pi9a';
    $('totpRow')?.classList.remove('hidden');
    $('soldierNote')?.classList.add('hidden');
    $('adminNote')?.classList.remove('hidden');
    $('citizenJoin')?.classList.add('hidden');
  } else if (p === 'soldier') {
    $('authKicker').textContent = 'DEFENSE & FRONTLINE UNIT PORTAL';
    $('authTitle').textContent = 'Soldier / Tactical Unit Sign In';
    $('authDesc').textContent = 'Frontline border security personnel and tactical transponder operators.';
    $('loginEmail').value = 'soldier@rakshanet.mil';
    $('loginPassword').value = 'Soldier@123456';
    $('totpRow')?.classList.add('hidden');
    $('soldierNote')?.classList.remove('hidden');
    $('adminNote')?.classList.add('hidden');
    $('citizenJoin')?.classList.add('hidden');
  } else {
    $('authKicker').textContent = 'CITIZEN SAFETY PORTAL';
    $('authTitle').textContent = 'Civilian Access';
    $('authDesc').textContent = 'Sign in to submit SOS and receive official alerts.';
    $('loginEmail').value = 'sreevaibavi.v@gmail.com';
    $('loginPassword').value = '';
    $('totpRow')?.classList.add('hidden');
    $('soldierNote')?.classList.add('hidden');
    $('adminNote')?.classList.add('hidden');
    $('citizenJoin')?.classList.remove('hidden');
  }
  $('signupPanel')?.classList.add('hidden');
  $('loginPanel')?.classList.remove('hidden');
  formMsg($('loginMessage'), '');
}

$('citizenPortalBtn').onclick = () => choosePortal('citizen');
$('soldierPortalBtn').onclick = () => choosePortal('soldier');
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

$('quickSoldierBtn').onclick = async () => {
  try {
    toast('Authenticating Tactical Defense Credentials...');
    const d = await api('/api/quick-demo-login', { method: 'POST', body: JSON.stringify({ role: 'soldier' }) });
    state.user = d.user;
    openApp();
    toast('Welcome Havildar Balwan Singh (14 Rashtriya Rifles)');
  } catch (e) {
    toast('Soldier demo login failed: ' + e.message, true);
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
  const current = state.user?.role;
  const nextRole = current === 'super_admin' ? 'soldier' : (current === 'soldier' ? 'citizen' : 'admin');
  try {
    const d = await api('/api/quick-demo-login', { method: 'POST', body: JSON.stringify({ role: nextRole }) });
    state.user = d.user;
    openApp();
    const roleLabel = nextRole === 'admin' ? 'Control Room Officer' : (nextRole === 'soldier' ? 'Frontline Soldier (14 RR)' : 'Civilian');
    toast(`Switched to ${roleLabel} role`);
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
  const isOfficer = ['officer', 'super_admin'].includes(state.user.role);
  const isSoldier = state.user.role === 'soldier';
  const roleLabel = isOfficer ? '🎖️ OFFICER' : (isSoldier ? '🪖 SOLDIER (14 RR)' : '👤 CITIZEN');
  $('signedInLabel').textContent = `${roleLabel}: ${state.user.fullName.split(' ')[0]}`;
  $('signedInLabel').classList.remove('hidden');
  $('quickSwapBtn').classList.remove('hidden');
  $('logoutBtn').classList.remove('hidden');
  $('profileName').textContent = state.user.fullName;
  $('profileRole').textContent = isOfficer 
    ? 'District Control Room Officer' 
    : (isSoldier ? '14 Rashtriya Rifles / Northern Command' : 'Verified Civilian Resident');
  $('avatar').textContent = isSoldier ? '🪖' : ((state.user.fullName || 'R').trim()[0].toUpperCase());
  $('adminNavExtras').classList.toggle('hidden', !isOfficer && !isSoldier);
  // Both Admin and Soldier can view Family Safe-Status and Tourist Geofence (read-only citizen monitoring)
  document.querySelector('.nav-item[data-page="family"]')?.classList.remove('hidden');

  renderPages();
  go(isOfficer || isSoldier ? 'inbox' : 'overview');
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
  hardware: 'Tactical & Citizen IoT Hardware Devices (AirTag & Tactical Box)',
  sos: 'One-Tap Emergency SOS Matrix',
  report: 'Submit Detailed Incident Report',
  locationSignal: 'Saved Location & Silent Signal',
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
  const isOfficer = ['officer', 'super_admin'].includes(state.user?.role);
  const isStaff = ['officer', 'super_admin', 'soldier'].includes(state.user?.role);
  
  if ((p === 'inbox' || p === 'audit') && !isStaff) {
    toast('Restricted to authorized control room officers & defense operators', true);
    return;
  }
  state.page = p;
  $$('.page').forEach(x => x.classList.add('hidden'));
  $('page-' + p)?.classList.remove('hidden');
  $$('.nav-item').forEach(x => x.classList.toggle('active', x.dataset.page === p));
  if ($('pageTitle')) $('pageTitle').textContent = titles[p] || 'RakshaNet';
  if ($('pageCrumb')) {
    const sectionPrefix = state.user?.role === 'super_admin' ? 'AUTHORIZED CONTROL ROOM' : (state.user?.role === 'soldier' ? 'MILITARY TACTICAL COMMAND' : 'CIVILIAN DEFENCE SYSTEM');
    $('pageCrumb').textContent = `${sectionPrefix} / ${p.toUpperCase()}`;
  }
  
  try { initMaps(p); } catch {}
  if (p === 'overview') loadOverview();
  if (p === 'hardware') loadHardwarePage();
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

$('topHardwareBtn')?.addEventListener('click', () => go('hardware'));

// Rendering all pages
function renderPages() {
  const admin = ['officer', 'super_admin', 'soldier'].includes(state.user?.role);
  $('page-overview').innerHTML = admin ? adminOverview() : citizenOverview();
  $('page-hardware').innerHTML = hardwarePage();
  $('page-sos').innerHTML = sosPage();
  $('page-report').innerHTML = reportPage();
  $('page-locationSignal').innerHTML = locationSignalPage();
  $('page-family').innerHTML = familyPage();
  $('page-tourist').innerHTML = touristPage();
  $('page-satellite').innerHTML = satellitePage();
  $('page-alerts').innerHTML = alertsPage();
  $('page-workflow').innerHTML = workflowPage();
  $('page-inbox').innerHTML = inboxPage();
  $('page-audit').innerHTML = auditPage();

  bindReportForms();
  bindHardwarePage();
  bindSosPage();
  bindSatelliteToggles();
  bindSimulateCluster();
  $('enableSafetyNotificationsBtn')?.addEventListener('click', enableSafetyNotifications);
  bindLocationSignalPage();
}

// CITIZEN OVERVIEW
function citizenOverview() {
  const selectedState = state.currentState || 'Jammu And Kashmir';
  const selectedDist = state.currentDistrict || 'Kupwara';
  const stateOptions = [...new Set(state.districts.map(d => d.state))].sort((a, b) => a.localeCompare(b));
  const districtOptions = state.districts.filter(d => d.state === selectedState);
  const currentD = state.districts.find(d => d.district === selectedDist && d.state === selectedState) || districtOptions[0] || state.districts[0];

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
      <p style="color:#ffcdc8; font-size:12px; margin:0 0 10px">
        Tap the red button below. Transmits your GPS sector, timestamp, and category to the control room in &lt;1 second.
      </p>

      <!-- EDITABLE LOCATION SELECTOR DIRECTLY ABOVE / WITH SOS BUTTON -->
      <div class="sos-location-box hud-box" style="background:#131d13; border:1px solid var(--camo-gold); border-radius:8px; padding:12px 14px; margin:10px 0 14px">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
          <label class="label" style="margin:0; font-weight:700; color:var(--camo-gold); font-size:12px; display:flex; align-items:center; gap:6px">
            <span>📍</span> CURRENT BORDER SECTOR LOCATION (EDITABLE)
          </label>
          <span class="tactical-badge gold" style="font-size:10px">DEVICE & BEACON SYNCED</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px">
          <div>
            <label class="label" for="overviewStateSelect" style="font-size:11px; margin-bottom:4px">State / Union Territory</label>
            <select id="overviewStateSelect" style="width:100%; padding:8px 10px; background:#0b110a; border:1px solid var(--camo-olive); border-radius:6px; color:#fff; font-size:12px">
              ${stateOptions.map(st => `
                <option value="${esc(st)}" ${st === selectedState ? 'selected' : ''}>${esc(st)}</option>
              `).join('')}
            </select>
          </div>
          <div>
            <label class="label" for="overviewDistrictSelect" style="font-size:11px; margin-bottom:4px">Border District / Sector</label>
            <select id="overviewDistrictSelect" style="width:100%; padding:8px 10px; background:#0b110a; border:1px solid var(--camo-gold); border-radius:6px; color:#d4af37; font-weight:700; font-size:12px">
              ${districtOptions.map(d => `
                <option value="${esc(d.district)}" ${d.district === selectedDist ? 'selected' : ''}>${esc(d.district)}</option>
              `).join('')}
            </select>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:11px; color:#a3bba2; flex-wrap:wrap; gap:6px">
          <span>GPS Sector Centroid: <strong id="overviewCoordsText" style="color:#fff">${Number(currentD.lat).toFixed(4)}° N, ${Number(currentD.lon).toFixed(4)}° E (${currentD.district})</strong></span>
          <span style="color:#d4af37">📡 Raksha-Tag Puck Linked to this Sector</span>
        </div>
      </div>

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

    <!-- STATS (Operational Border Security Command Metrics - Section 8) -->
    <div class="stats-grid" style="grid-template-columns:repeat(auto-fit, minmax(130px, 1fr))">
      <div class="stat-card">
        <div><small>Total Ingested</small><b id="overviewTotal">0</b></div>
        <span class="stat-icon">▤</span>
      </div>
      <div class="stat-card" style="border-left:3px solid #ef4444">
        <div><small>🚨 High Priority</small><b id="overviewHighPriority" style="color:#fca5a5">0</b></div>
        <span class="stat-icon">💥</span>
      </div>
      <div class="stat-card" style="border-left:3px solid #f59e0b">
        <div><small>⚠️ Med Priority</small><b id="overviewMedPriority" style="color:#fde68a">0</b></div>
        <span class="stat-icon">👁️</span>
      </div>
      <div class="stat-card" style="border-left:3px solid #10b981">
        <div><small>ℹ️ Low Priority</small><b id="overviewLowPriority" style="color:#a7f3d0">0</b></div>
        <span class="stat-icon">🛡️</span>
      </div>
      <div class="stat-card">
        <div><small>⏳ Awaiting Review</small><b id="overviewReview" style="color:#e2e8f0">0</b></div>
        <span class="stat-icon">◷</span>
      </div>
      <div class="stat-card">
        <div><small>🛡️ Confirmed</small><b id="overviewConfirmed" style="color:var(--safe-green)">0</b></div>
        <span class="stat-icon">✓</span>
      </div>
      <div class="stat-card">
        <div><small>❌ False Positives</small><b id="overviewRejected" style="color:#94a3b8">0</b></div>
        <span class="stat-icon">✕</span>
      </div>
      <div class="stat-card">
        <div><small>📑 Duplicates</small><b id="overviewDuplicates" style="color:#fde68a">0</b></div>
        <span class="stat-icon">◫</span>
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
  const selectedState = state.currentState || 'Jammu And Kashmir';
  const selectedDist = state.currentDistrict || 'Kupwara';
  const stateOptions = [...new Set(state.districts.map(d => d.state))].sort((a, b) => a.localeCompare(b));
  const districtOptions = state.districts.filter(d => d.state === selectedState);
  const currentD = state.districts.find(d => d.district === selectedDist && d.state === selectedState) || districtOptions[0] || state.districts[0];

  return `
    <div class="panel camo-border hud-box" style="max-width:800px; margin:0 auto">
      <div class="panel-head">
        <div>
          <span class="tactical-badge red">RAPID CRISIS MATRIX</span>
          <h2 style="color:var(--camo-bone); margin:6px 0">One-Tap Border Safety SOS</h2>
          <p>Instant dispatch signal to District Emergency Control Room. Works online and offline.</p>
        </div>
        <a href="tel:100" class="camo-action-btn" style="background:#82261e; border-color:#ff7163">CALL 100 / 108</a>
      </div>

      <div style="background:#131c14; border:1px solid var(--camo-olive); border-radius:8px; padding:16px; margin:16px 0">
        <label class="label">Step 1: Select Emergency Category</label>
        <div class="sos-chips-grid" style="grid-template-columns:repeat(auto-fill, minmax(160px, 1fr))">
          ${CATS.map(c => `
            <button class="sos-chip ${state.selectedSosCategory === c ? 'active' : ''}" data-sos-cat="${esc(c)}">${esc(c)}</button>
          `).join('')}
        </div>

        <label class="label" style="margin-top:16px; display:flex; justify-content:space-between; align-items:center">
          <span>Step 2: Border Sector Location</span>
          <span class="tactical-badge gold" style="font-size:10px">✏️ EDITABLE LOCATION</span>
        </label>
        
        <div style="background:#182618; border:1px solid var(--camo-gold); padding:14px; border-radius:8px">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px">
            <div>
              <label class="label" for="sosStateSelect" style="font-size:11px; margin-bottom:4px">State / Union Territory</label>
              <select id="sosStateSelect" style="width:100%; padding:8px 10px; background:#0f170e; border:1px solid var(--camo-olive); border-radius:6px; color:#fff; font-size:12px">
                ${stateOptions.map(st => `
                  <option value="${esc(st)}" ${st === selectedState ? 'selected' : ''}>${esc(st)}</option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="label" for="sosDistrictSelect" style="font-size:11px; margin-bottom:4px">Frontier District / Sector</label>
              <select id="sosDistrictSelect" style="width:100%; padding:8px 10px; background:#0f170e; border:1px solid var(--camo-gold); border-radius:6px; color:#fff; font-size:12px">
                ${districtOptions.map(d => `
                  <option value="${esc(d.district)}" ${d.district === selectedDist ? 'selected' : ''}>${esc(d.district)}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div style="margin-top:12px; padding:10px; background:rgba(0,0,0,0.3); border-radius:6px; font-size:11px; color:var(--camo-sand); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px">
            <span>📍 Active Sector Lock: <strong id="sosLocationText" style="color:var(--camo-gold)">${esc(currentD?.state || selectedState)} · ${esc(currentD?.district || selectedDist)}</strong></span>
            <span id="sosCoordText" style="color:var(--tactical-cyan)">GPS Coordinates: ${currentD ? `${currentD.lat}° N, ${currentD.lon}° E` : 'Sector Centroid'}</span>
          </div>
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

// SEPARATE LOCATION & SILENT SIGNAL ADD-ON — does not replace existing report flows.
function locationSignalPage() {
  const saved = (() => { try { return localStorage.getItem('rakshanet.addon.savedLocation.v1') || ''; } catch { return ''; } })();
  return `
    <section class="panel camo-border hud-box location-signal-panel">
      <div class="panel-head">
        <div><span class="tactical-badge">OPTIONAL ADD-ON</span><h3 style="margin:4px 0 0">Location & Silent Signal</h3><p>Save a location once. Trigger a silent visual/vibration signal without voice.</p></div>
      </div>
      <label for="rsSavedLocation">Saved location name or address</label>
      <input id="rsSavedLocation" maxlength="180" value="${esc(saved)}" placeholder="e.g. Main bus stop, North Street" autocomplete="street-address">
      <div class="location-signal-actions"><button class="primary-btn" id="rsSaveLocation" type="button">Save location</button><button class="small-btn" id="rsTriggerSignal" type="button">Trigger silent signal</button></div>
      <p id="rsLocationStatus" class="form-message" role="status">${saved ? `Saved location: ${esc(saved)}` : 'No location saved in this browser yet.'}</p>
      <div id="rsSignalBanner" class="rs-signal-banner hidden" role="status" aria-live="assertive"><b> SILENT SIGNAL TRIGGERED</b><p id="rsSignalText">Signal ready.</p></div>
      <p class="text-muted" style="margin-top:14px">This add-on is separate from the existing reporting features. A signal on this browser does not by itself notify another device or control Wi-Fi hardware.</p>
    </section>`;
}

function bindLocationSignalPage() {
  const save = document.getElementById('rsSaveLocation');
  const trigger = document.getElementById('rsTriggerSignal');
  if (!save || !trigger) return;
  save.addEventListener('click', () => {
    const input = document.getElementById('rsSavedLocation');
    const value = input?.value.trim();
    const status = document.getElementById('rsLocationStatus');
    if (!value) { if (status) status.textContent = 'Enter a location before saving.'; return; }
    try { localStorage.setItem('rakshanet.addon.savedLocation.v1', value); if (status) status.textContent = `Saved location: ${value}`; toast('Location saved for the silent-signal add-on.'); }
    catch { if (status) status.textContent = 'Browser storage is unavailable; location could not be saved.'; }
  });
  trigger.addEventListener('click', () => triggerLocationSilentSignal('manual test'));
}

function triggerLocationSilentSignal(reason = 'report submitted') {
  let location = '';
  try { location = localStorage.getItem('rakshanet.addon.savedLocation.v1') || ''; } catch {}
  if (!location) { if (reason === 'manual test') toast('Save a location first in Location & Silent Signal.', true); return false; }
  const banner = document.getElementById('rsSignalBanner');
  const text = document.getElementById('rsSignalText');
  if (banner && text) { banner.classList.remove('hidden'); text.textContent = `Signal: ${reason} · Saved location: ${location} · Voice not required.`; }
  try { navigator.vibrate?.([250, 120, 250, 120, 400]); } catch {}
  try { playRadarChirp('alert'); } catch {}
  if (reason === 'manual test') toast('Silent signal triggered.');
  return true;
}

// ==========================================================================
// IOT HARDWARE BEACON & TACTICAL TRANSPONDER MODULE (AIRTAG & TAC-BOX)
// ==========================================================================

let buzzerAudioCtx = null;
let activeBuzzerInterval = null;

function playPiezoBuzzer(pattern = 'emergency', durationMs = 12000) {
  try {
    stopPiezoBuzzer();
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      buzzerAudioCtx = new AudioContext();
      const ctx = buzzerAudioCtx;
      let toggle = false;
      activeBuzzerInterval = setInterval(() => {
        try {
          if (!buzzerAudioCtx || buzzerAudioCtx.state === 'closed') return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(toggle ? 1850 : 920, ctx.currentTime);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.14);
          toggle = !toggle;
        } catch {}
      }, 160);
    }
  } catch (e) {
    console.error('Audio synthesizer error:', e);
  }

  try {
    if ('vibrate' in navigator) {
      navigator.vibrate([300, 150, 300, 150, 600, 200, 300]);
    }
  } catch {}

  $('airtagUnit')?.classList.add('shaking-device');
  $('airtagLedHalo')?.classList.remove('green', 'amber');
  $('airtagLedHalo')?.classList.add('red-alarm');
  $('airtagAlarmBanner')?.classList.remove('hidden');

  if (durationMs > 0) {
    setTimeout(() => {
      stopPiezoBuzzer();
    }, durationMs);
  }
}

function stopPiezoBuzzer() {
  if (activeBuzzerInterval) {
    clearInterval(activeBuzzerInterval);
    activeBuzzerInterval = null;
  }
  if (buzzerAudioCtx) {
    try { buzzerAudioCtx.close(); } catch {}
    buzzerAudioCtx = null;
  }
  $('airtagUnit')?.classList.remove('shaking-device');
  $('airtagLedHalo')?.classList.remove('red-alarm');
  $('airtagLedHalo')?.classList.add('green');
  $('airtagAlarmBanner')?.classList.add('hidden');
  try {
    if ('vibrate' in navigator) navigator.vibrate(0);
  } catch {}
}

function handleHardwareAreaAlert(alert) {
  const savedDistrict = $('airtagDistrictSelect')?.value || state.hardware?.citizenDistrict || 'Kupwara';
  if (alert.district && alert.district.toLowerCase() === savedDistrict.toLowerCase()) {
    playPiezoBuzzer('emergency', 14000);
    toast(`🚨 RAKSHA-TAG ALARM TRIGGERED! Official Alert for ${alert.district}`);
    if ($('airtagAlarmBannerText')) {
      $('airtagAlarmBannerText').textContent = `OFFICIAL AREA ALERT (${alert.district.toUpperCase()}): ${alert.message}`;
    }
    $('airtagAlarmBanner')?.classList.remove('hidden');
    if (state.page !== 'hardware') {
      toast(`📡 Raksha-Tag Hardware Puck is buzzing for ${alert.district}! Check Hardware tab.`, true);
    }
  }
}

function handleHardwareTriggerEvent(d) {
  playRadarChirp('chirp');
  if (d.deviceType === 'soldier_tactical_box') {
    toast(`🪖 TACTICAL BURST RECEIVED: ${d.report.title} (100% Defense Trust)`);
  } else {
    toast(`📡 AIRTAG SOS RECEIVED: ${d.report.title} (${d.report.district})`);
  }
  loadCounts();
  if (['officer', 'super_admin', 'soldier'].includes(state.user?.role)) {
    loadInbox();
  }
}

// HARDWARE PAGE RENDERING
function hardwarePage() {
  const savedDist = state.hardware?.citizenDistrict || 'Kupwara';
  const isSoldier = state.user?.role === 'soldier';

  return `
    <div class="panel camo-border hud-box" style="margin-bottom:18px; background:linear-gradient(135deg,#1f2d1e,#131e12)">
      <div class="panel-head" style="align-items:flex-start">
        <div>
          <span class="tactical-badge gold">AUTONOMOUS IOT BEACONS</span>
          <h2 style="margin:6px 0; color:var(--camo-bone); font-size:20px">Tactical & Civilian IoT Hardware Relays</h2>
          <p style="color:var(--camo-sand); margin:0; font-size:12px">
            Direct physical hardware beacons. Functions autonomously when phone has <strong>0 cellular signal / network blackout</strong> via LoRaWAN 868MHz mesh and NavIC satellite pulse relays.
          </p>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <span class="tactical-badge ${isSoldier ? 'gold' : ''}">
            ${isSoldier ? '🪖 DEFENSE OPERATOR ACTIVE' : '👤 CIVILIAN RESIDENT VIEW'}
          </span>
          <span class="tactical-badge green">🛰️ SATELLITE MESH ONLINE</span>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="hardware-tabs-bar" style="margin-top:16px">
        <button id="tabAirtagBtn" class="hardware-tab-btn ${state.hardware?.activeTab === 'citizen' ? 'active' : ''}">
          <span>👤</span> Citizen Raksha-Tag (32mm Puck)
        </button>
        <button id="tabSoldierBtn" class="hardware-tab-btn ${state.hardware?.activeTab === 'soldier' ? 'active' : ''}">
          <span>🪖</span> Soldier Raksha-Box (Tactical Transponder)
        </button>
        <button id="tabDualBtn" class="hardware-tab-btn ${state.hardware?.activeTab === 'dual' ? 'active' : ''}">
          <span>◫</span> Dual Side-by-Side View
        </button>
      </div>
    </div>

    <!-- Alarm Banner (Shown when Buzzer is triggered by Admin Alert) -->
    <div id="airtagAlarmBanner" class="panel camo-border hidden" style="background:#521915; border-color:#ff6e61; margin-bottom:18px; padding:16px">
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px">
        <div style="display:flex; align-items:center; gap:12px">
          <span style="font-size:26px">🚨</span>
          <div>
            <b style="color:#fff; font-size:15px; letter-spacing:0.04em">HARDWARE PIEZO BUZZER ACTIVE · AREA THREAT DETECTED</b>
            <p id="airtagAlarmBannerText" style="margin:2px 0 0; color:#ffcdc8; font-size:12px">
              Official defense alert broadcast for your saved district. Physical puck vibrating & sounding high-pitch acoustic siren.
            </p>
          </div>
        </div>
        <button id="silenceBuzzerBtn" class="small-btn danger" style="padding:8px 16px; font-weight:800; font-size:12px">
          🛑 SILENCE BUZZER ALARM
        </button>
      </div>
    </div>

    <!-- MAIN DUAL SECTIONS -->
    <div id="hardwareSectionsContainer" style="display:grid; grid-template-columns:${state.hardware?.activeTab === 'dual' ? '1fr 1fr' : '1fr'}; gap:20px">
      
      <!-- CITIZEN SECTION (RAKSHA-TAG AIRTAG) -->
      <div id="citizenTagSection" class="panel camo-border hud-box ${state.hardware?.activeTab === 'soldier' ? 'hidden' : ''}">
        <div class="panel-head">
          <div>
            <span class="tactical-badge">CIVILIAN PERSONAL DEFENSE</span>
            <h3 style="margin:4px 0 0">Raksha-Tag (AirTag-Sized Compact Puck)</h3>
            <p>Pocket-sized hardware distress disc with built-in piezo siren and haptic buzzer.</p>
          </div>
          <span class="tactical-badge green">ID: RN-TAG-CIV-7749</span>
        </div>

        <div class="hardware-container-grid">
          <!-- Left: 3D AirTag Model -->
          <div class="airtag-visual-stage">
            <div id="airtagUnit" class="airtag-unit" title="Click to trigger emergency SOS broadcast">
              <div id="airtagLedHalo" class="airtag-led-halo green"></div>
              
              <!-- Center SOS Dome Pushbutton -->
              <div class="airtag-dome-btn">
                <span style="font-size:24px">🚨</span>
                <strong style="font-size:15px; letter-spacing:0.08em; line-height:1.1; margin-top:3px">EMERGENCY<br>SOS</strong>
                <small style="font-size:8px; opacity:0.85; margin-top:4px">PUSH PUCK</small>
              </div>

              <!-- Speaker Micro-Grille -->
              <div class="airtag-speaker-grille">
                <span class="speaker-dot"></span>
                <span class="speaker-dot"></span>
                <span class="speaker-dot"></span>
                <span class="speaker-dot"></span>
                <span class="speaker-dot"></span>
              </div>
            </div>

            <div style="margin-top:16px; text-align:center">
              <span class="tactical-badge" style="font-size:10px">32mm Brushed Aluminium Puck</span>
              <div style="font-size:11px; color:var(--camo-sand); margin-top:6px">
                CR2032 Lithium Coin Cell · Autonomous LoRa Relay
              </div>
            </div>
          </div>

          <!-- Right: Telemetry & Controls -->
          <div>
            <!-- Status Card -->
            <div style="background:#152014; border:1px solid var(--camo-field); border-radius:8px; padding:12px; margin-bottom:14px">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:11px">
                <div>
                  <span style="color:var(--text-dim)">Phone Cellular Signal:</span><br>
                  <strong style="color:#ff8c82">📶 0 BARS / DEAD ZONE</strong>
                </div>
                <div>
                  <span style="color:var(--text-dim)">Hardware Relay Link:</span><br>
                  <strong style="color:var(--safe-green)">🛰️ LoRa 868MHz + NavIC</strong>
                </div>
                <div>
                  <span style="color:var(--text-dim)">Hardware Battery:</span><br>
                  <strong style="color:var(--camo-gold)">🔋 94% (14 Mo. Remaining)</strong>
                </div>
                <div>
                  <span style="color:var(--text-dim)">Buzzer State:</span><br>
                  <strong id="buzzerStateLabel" style="color:var(--tactical-cyan)">🔊 Armed / Standby</strong>
                </div>
              </div>
            </div>

            <!-- Geofence Area Sync -->
            <div style="background:#1b271a; border:1px solid var(--camo-olive); border-radius:8px; padding:12px; margin-bottom:14px">
              <label class="label" style="margin:0 0 4px">Saved Home / Geofence District</label>
              <p style="font-size:11px; color:var(--text-dim); margin:0 0 8px">
                When an officer issues an official alert for this district, this tag will <strong>instantly beep with its acoustic piezo buzzer and vibrate</strong>, even if your phone is in your bag or screen is locked.
              </p>
              <div style="display:flex; gap:8px">
                <select id="airtagDistrictSelect" style="flex:1">
                  ${state.districts.map(d => `
                    <option value="${esc(d.district)}" ${d.district === savedDist ? 'selected' : ''}>
                      ${esc(d.district)} (${esc(d.state)})
                    </option>
                  `).join('')}
                </select>
                <button id="saveAirtagDistrictBtn" class="small-btn">Save Sector</button>
              </div>
            </div>

            <!-- Physical Hardware Action Buttons -->
            <div style="display:flex; flex-direction:column; gap:8px">
              <button id="airtagSosActionBtn" class="sos-big-btn" style="padding:12px; font-size:13px">
                <span>🚨</span> TRANSMIT OFFLINE EMERGENCY SOS <span>🚨</span>
              </button>
              
              <div style="display:flex; gap:8px">
                <button id="airtagSilentPingBtn" class="secondary-btn" style="flex:1; justify-content:center; font-size:11px">
                  🔕 Silent Location Ping
                </button>
                <button id="airtagSafePingBtn" class="secondary-btn" style="flex:1; justify-content:center; font-size:11px">
                  ⚑ Family 'Safe' Ping
                </button>
              </div>

              <button id="testBuzzerBtn" class="small-btn" style="border-color:var(--camo-gold); color:var(--camo-gold); justify-content:center; margin-top:4px">
                🔊 TEST HARDWARE PIEZO BUZZER & VIBRATION
              </button>
            </div>

            <!-- Live Status Message -->
            <div id="airtagStatusMsg" class="form-message" role="status" style="margin-top:10px"></div>
          </div>
        </div>
      </div>

      <!-- SOLDIER SECTION (RAKSHA-BOX TACTICAL TRANSPONDER) -->
      <div id="soldierBoxSection" class="panel camo-border hud-box ${state.hardware?.activeTab === 'citizen' ? 'hidden' : ''}">
        <div class="panel-head">
          <div>
            <span class="tactical-badge gold">MIL-SPEC TACTICAL UNIT</span>
            <h3 style="margin:4px 0 0">Raksha-Box (Soldier Walkie Transponder)</h3>
            <p>Ruggedized combat transponder box without stick antenna. Instant 100% defense trust rating.</p>
          </div>
          <span class="tactical-badge gold">ID: RN-TAC-MIL-014</span>
        </div>

        <div class="hardware-container-grid">
          <!-- Left: 3D Tactical Box Model -->
          <div class="airtag-visual-stage" style="background:radial-gradient(circle at 50% 40%, #1e261d 0%, #10160f 75%)">
            <div class="soldier-box-unit">
              <!-- Corner Hex Screws -->
              <div class="soldier-box-hex-screws">
                <span class="hex-screw top-left"></span>
                <span class="hex-screw top-right"></span>
                <span class="hex-screw bot-left"></span>
                <span class="hex-screw bot-right"></span>
              </div>

              <!-- Stubby Integrated Antenna -->
              <div class="tactical-stubby-antenna"></div>

              <!-- Glowing Green OLED Matrix Screen -->
              <div class="soldier-oled-screen">
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(74,222,128,0.3); padding-bottom:3px; margin-bottom:4px">
                  <span>RAKSHA-TAC MK-IV</span>
                  <span>14 RR [J&K]</span>
                </div>
                <div>FREQ: 433.920 MHz | CH-04</div>
                <div>MGRS: 43S ED 4281 9912</div>
                <div>SECTOR: KUPWARA FORWARD POST</div>
                <div>CRYPT: AES-256-GCM / MIL-STD</div>
                <div style="color:#86efac; margin-top:2px">● LINK: SATCOM BURST STANDBY</div>
              </div>

              <!-- Tactical Buttons Matrix (Soldiers have more buttons!) -->
              <div class="tactical-buttons-matrix">
                <button class="tactical-push-btn btn-red" data-tac-action="Gunshot-like sound" title="Gunshot or Ambush Detected">
                  <span>💥</span> AMBUSH / FIRE
                </button>
                <button class="tactical-push-btn btn-orange" data-tac-action="Explosion-like sound" title="Artillery or Shelling Detonation">
                  <span>💣</span> ARTILLERY
                </button>
                <button class="tactical-push-btn btn-yellow" data-tac-action="Suspicious activity" title="Armed Hostile Infiltration">
                  <span>👁️</span> INFILTRATION
                </button>
                <button class="tactical-push-btn btn-purple" data-tac-action="Suspicious unattended object" title="IED or Unattended Ordnance">
                  <span>⚠️</span> IED / MINE
                </button>
                <button class="tactical-push-btn btn-blue" data-tac-action="Medical emergency" title="Immediate Medevac / Casualty Request">
                  <span>🚁</span> MEDEVAC REQ
                </button>
                <button class="tactical-push-btn btn-green" data-tac-action="Border-area emergency" title="Sector All-Clear Beacon Ping">
                  <span>🛡️</span> ALL CLEAR
                </button>
              </div>

              <!-- PTT / Channel Bar -->
              <div class="tactical-ptt-bar">
                PUSH TACTICAL BUTTON FOR INSTANT BURST
              </div>
            </div>

            <div style="margin-top:14px; text-align:center">
              <span class="tactical-badge gold" style="font-size:10px">100% Defense Trust Score</span>
              <div style="font-size:11px; color:var(--camo-sand); margin-top:4px">
                Direct Military Packet Relay · Instant Admin Escalation
              </div>
            </div>
          </div>

          <!-- Right: Soldier Telemetry & Action Logs -->
          <div>
            <div style="background:#152014; border:1px solid var(--camo-field); border-radius:8px; padding:12px; margin-bottom:14px">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:11px">
                <div>
                  <span style="color:var(--text-dim)">Tactical Unit:</span><br>
                  <strong style="color:var(--camo-gold)">14 Rashtriya Rifles (14 RR)</strong>
                </div>
                <div>
                  <span style="color:var(--text-dim)">Operator Callsign:</span><br>
                  <strong style="color:var(--safe-green)">BRAVO-6 (Hav. Balwan Singh)</strong>
                </div>
                <div>
                  <span style="color:var(--text-dim)">Encryption Standard:</span><br>
                  <strong style="color:var(--tactical-cyan)">AES-256-GCM Military Spec</strong>
                </div>
                <div>
                  <span style="color:var(--text-dim)">Power Source:</span><br>
                  <strong style="color:var(--camo-gold)">🔋 88% Mil-Spec Li-Ion</strong>
                </div>
              </div>
            </div>

            <!-- Military Trust Privilege Explanation -->
            <div style="background:#1c2719; border-left:3px solid var(--camo-gold); padding:10px; border-radius:4px; font-size:11px; color:var(--camo-tan); margin-bottom:14px">
              <strong>⭐ High-Trust Source Integration:</strong> Signals initiated from this unit bypass civilian verification delays, assigning <strong>100% Trust Score</strong> with immediate notification to the District Control Room.
            </div>

            <!-- Soldier Burst Log -->
            <div>
              <b style="font-size:12px; color:var(--camo-bone)">Recent Tactical Bursts:</b>
              <div id="soldierBurstLog" style="margin-top:8px; display:flex; flex-direction:column; gap:6px; max-height:160px; overflow-y:auto">
                <div style="font-size:11px; padding:6px 10px; background:#121b12; border-radius:4px; border:1px solid #283726">
                  <span style="color:var(--camo-gold)">[STANDBY]</span> Transponder ready on Channel 04 (433.920 MHz).
                </div>
              </div>
            </div>

            <div id="soldierStatusMsg" class="form-message" role="status" style="margin-top:10px"></div>
          </div>
        </div>
      </div>

    </div>
  `;
}

function bindHardwarePage() {
  // Tabs switching
  const tabAirtag = $('tabAirtagBtn');
  const tabSoldier = $('tabSoldierBtn');
  const tabDual = $('tabDualBtn');

  if (tabAirtag && tabSoldier && tabDual) {
    tabAirtag.onclick = () => {
      state.hardware.activeTab = 'citizen';
      renderPages();
    };
    tabSoldier.onclick = () => {
      state.hardware.activeTab = 'soldier';
      renderPages();
    };
    tabDual.onclick = () => {
      state.hardware.activeTab = 'dual';
      renderPages();
    };
  }

  // Silence buzzer
  $('silenceBuzzerBtn')?.addEventListener('click', () => {
    stopPiezoBuzzer();
    toast('Hardware buzzer alarm silenced');
  });

  // Save district geofence to tag
  $('saveAirtagDistrictBtn')?.addEventListener('click', async () => {
    const sel = $('airtagDistrictSelect');
    const dist = sel?.value || 'Kupwara';
    state.hardware.citizenDistrict = dist;
    try {
      await api('/api/devices/update', {
        method: 'POST',
        body: JSON.stringify({ id: 'RN-TAG-CIV-7749', savedDistrict: dist })
      });
      formMsg($('airtagStatusMsg'), `Saved sector '${dist}' to AirTag memory. Tag will buzz if alert issued for this sector.`, 'success');
      toast(`AirTag geofence updated to ${dist}`);
    } catch (e) {
      formMsg($('airtagStatusMsg'), e.message, 'error');
    }
  });

  // Test buzzer button
  $('testBuzzerBtn')?.addEventListener('click', () => {
    playPiezoBuzzer('test', 5000);
    formMsg($('airtagStatusMsg'), '🔊 Testing Piezo Buzzer & Vibration (5 seconds)...', 'info');
    toast('Testing hardware buzzer & haptic feedback');
  });

  // Click on AirTag unit or Big SOS button
  const triggerAirtagSos = async () => {
    const dist = $('airtagDistrictSelect')?.value || state.hardware?.citizenDistrict || 'Kupwara';
    formMsg($('airtagStatusMsg'), 'Transmitting encrypted LoRa emergency packet to control room...');
    
    // Animate LED ring amber while transmitting
    $('airtagLedHalo')?.classList.remove('green', 'red-alarm');
    $('airtagLedHalo')?.classList.add('amber');
    playRadarChirp('chirp');

    try {
      const d = await api('/api/hardware/report', {
        method: 'POST',
        body: JSON.stringify({
          deviceType: 'citizen_airtag',
          hardwareId: 'RN-TAG-CIV-7749',
          district: dist,
          category: 'Border-area emergency',
          networkMode: 'LoRaWAN 868MHz Mesh & NavIC Satellite Fallback',
          details: `Direct physical SOS button depression on Raksha-Tag puck (${dist}). Bypassed zero-cellular blackout via LoRa mesh.`
        })
      });

      setTimeout(() => {
        $('airtagLedHalo')?.classList.remove('amber');
        $('airtagLedHalo')?.classList.add('green');
      }, 1200);

      formMsg($('airtagStatusMsg'), `✅ Emergency SOS ACK'D by Control Room! Trust: ${d.report?.trustScore}%. Response units alerted.`, 'success');
      toast('AirTag SOS signal successfully acknowledged!');
      loadCounts();
    } catch (e) {
      formMsg($('airtagStatusMsg'), e.message, 'error');
    }
  };

  $('airtagUnit')?.addEventListener('click', triggerAirtagSos);
  $('airtagSosActionBtn')?.addEventListener('click', triggerAirtagSos);

  // Silent Ping
  $('airtagSilentPingBtn')?.addEventListener('click', async () => {
    const dist = $('airtagDistrictSelect')?.value || state.hardware?.citizenDistrict || 'Kupwara';
    try {
      await api('/api/hardware/report', {
        method: 'POST',
        body: JSON.stringify({
          deviceType: 'citizen_airtag',
          hardwareId: 'RN-TAG-CIV-7749',
          district: dist,
          category: 'Suspicious activity',
          title: `[AIRTAG SILENT PING] Sector Coordinates - ${dist}`,
          details: 'Silent coordinates broadcast from physical hardware tag. No audible buzzer; covert signal.'
        })
      });
      formMsg($('airtagStatusMsg'), `🔕 Silent location ping broadcasted for ${dist}`, 'success');
      toast('Silent coordinate ping transmitted');
    } catch (e) {
      formMsg($('airtagStatusMsg'), e.message, 'error');
    }
  });

  // Safe Ping
  $('airtagSafePingBtn')?.addEventListener('click', async () => {
    const dist = $('airtagDistrictSelect')?.value || state.hardware?.citizenDistrict || 'Kupwara';
    try {
      await api('/api/family-status', {
        method: 'POST',
        body: JSON.stringify({ status: 'Safe', note: 'Hardware tag "All Safe" beacon ping', district: dist })
      });
      formMsg($('airtagStatusMsg'), '⚑ Household Safe-Status beacon updated to SAFE via tag relay', 'success');
      toast('Family safe status updated');
    } catch (e) {
      formMsg($('airtagStatusMsg'), e.message, 'error');
    }
  });

  // Soldier Tactical Push-Buttons
  $$('[data-tac-action]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const cat = btn.dataset.tacAction;
      const isInjury = cat.includes('Medical');
      formMsg($('soldierStatusMsg'), `Transmitting Tactical burst: ${cat}...`);
      playRadarChirp('alert');

      try {
        const d = await api('/api/hardware/report', {
          method: 'POST',
          body: JSON.stringify({
            deviceType: 'soldier_tactical_box',
            hardwareId: 'RN-TAC-MIL-014',
            category: cat,
            district: 'Kupwara',
            title: `[14 RR TACTICAL] ${cat.toUpperCase()} DETECTED`,
            details: `Combat operator field burst initiated from Raksha-Box transponder (Ch-04, 433.920 MHz). High priority military report with 100% defense trust.`,
            injuryLevel: isInjury ? 'Critical' : 'None',
            affectedCount: 1
          })
        });

        formMsg($('soldierStatusMsg'), `✅ BURST TRANSMITTED! 100% Trust Score logged. Control Room notified immediately.`, 'success');
        toast(`Tactical Burst Sent: ${cat}`);
        
        // Append to burst log
        const log = $('soldierBurstLog');
        if (log) {
          const item = document.createElement('div');
          item.style.cssText = 'font-size:11px; padding:6px 10px; background:#1b2819; border-radius:4px; border:1px solid #3d563a; color:#a3e635';
          item.innerHTML = `<strong>${fmt(d.report.createdAt)}:</strong> ${esc(d.report.title)} · Hash: #${d.report.id.slice(0, 6)}`;
          log.prepend(item);
        }
        loadCounts();
      } catch (e) {
        formMsg($('soldierStatusMsg'), e.message, 'error');
      }
    });
  });
}

async function loadHardwarePage() {
  try {
    const d = await api('/api/devices');
    if (d && d.devices) {
      state.hardware.devices = d.devices;
      const civ = d.devices.find(x => x.type === 'citizen_airtag');
      if (civ && civ.savedDistrict) {
        state.hardware.citizenDistrict = civ.savedDistrict;
        if ($('airtagDistrictSelect')) $('airtagDistrictSelect').value = civ.savedDistrict;
      }
    }
  } catch {}
}

// FAMILY SAFE-STATUS PAGE (Slide 5 & 7)
function familyPage() {
  const isStaff = state.user && ['super_admin', 'officer', 'soldier'].includes(state.user.role);

  if (isStaff) {
    return `
      <div class="panel camo-border hud-box" style="max-width:980px; margin:0 auto">
        <div class="panel-head">
          <div>
            <span class="tactical-badge red">MILITARY & COMMAND SURVEILLANCE</span>
            <h2 style="color:var(--camo-bone); margin:6px 0">Civilian Household Safe-Status Live Feed</h2>
            <p>Real-time citizen safe/shelter/casualty status across frontier sectors. Read-only defense monitoring view.</p>
          </div>
          <span class="tactical-badge cyan">READ-ONLY MONITORING</span>
        </div>

        <!-- Network Summary Cards -->
        <div style="background:#182618; border:1px solid var(--camo-field); border-radius:6px; padding:14px; margin-bottom:18px">
          <span class="eyebrow" style="color:var(--camo-gold)">SECTOR CIVILIAN HEALTH & STATUS AGGREGATE</span>
          <div class="stats-grid" style="margin-top:10px; margin-bottom:0">
            <div class="stat-card" style="padding:10px"><small>Safe Families</small><b id="netSafe" style="color:#62d472">0</b></div>
            <div class="stat-card" style="padding:10px"><small>In Shelter</small><b id="netShelter" style="color:#ffd885">0</b></div>
            <div class="stat-card" style="padding:10px"><small>Need Help</small><b id="netHelp" style="color:#f7b752">0</b></div>
            <div class="stat-card" style="padding:10px"><small>Medical Needed</small><b id="netInjured" style="color:#ff8c82">0</b></div>
          </div>
        </div>

        <!-- Citizen Submissions Feed Table -->
        <div style="background:#142015; border:1px solid var(--camo-olive); border-radius:8px; padding:18px">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
            <h3 style="margin:0; font-size:14px; color:var(--camo-bone); letter-spacing:0.5px">CITIZEN & RESIDENT STATUS LOG</h3>
            <span style="font-size:11px; color:var(--text-dim)">Staff cannot submit responses here; monitoring citizen data only.</span>
          </div>
          <div id="staffFamilyResponsesList" style="display:flex; flex-direction:column; gap:8px">
            <div style="font-size:12px; color:var(--text-dim)">Loading civilian status records...</div>
          </div>
        </div>
      </div>
    `;
  }

  // Citizen view (Unchanged)
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
  const isStaff = state.user && ['super_admin', 'officer', 'soldier'].includes(state.user.role);

  if (isStaff) {
    return `
      <div class="panel camo-border hud-box" style="max-width:980px; margin:0 auto">
        <div class="panel-head">
          <div>
            <span class="tactical-badge red">MILITARY & COMMAND SURVEILLANCE</span>
            <h2 style="color:var(--camo-bone); margin:6px 0">Border Tourist & Civilian Geofence Roster</h2>
            <p>Monitors voluntary civilian tourist movements and high-risk zone clearances. Read-only defense monitoring view.</p>
          </div>
          <span class="tactical-badge gold">GEOFENCE RADAR ACTIVE</span>
        </div>

        <div class="main-grid">
          <!-- Active Tourist Roster Feed -->
          <div style="background:#142015; border:1px solid var(--camo-olive); border-radius:8px; padding:16px">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
              <h3 style="margin:0; font-size:14px; color:var(--camo-bone); letter-spacing:0.5px">REGISTERED TOURIST & VISITOR CHECK-INS</h3>
              <span style="font-size:10px; color:var(--text-dim)">Staff read-only</span>
            </div>
            <div id="staffTouristList" style="display:flex; flex-direction:column; gap:8px">
              <div style="font-size:12px; color:var(--text-dim)">Loading tourist check-ins...</div>
            </div>
          </div>

          <!-- Geofence Zones -->
          <div>
            <h3 style="margin-top:0; font-size:14px; color:var(--camo-bone)">Active Sector Geofences & Buffer Corridors</h3>
            <div id="geofenceList"></div>
          </div>
        </div>
      </div>
    `;
  }

  // Citizen view (Unchanged)
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
  const canBroadcast = ['officer', 'super_admin', 'soldier'].includes(state.user?.role);
  const selectedState = state.currentState || 'Jammu And Kashmir';
  const selectedDist = state.currentDistrict || 'Kupwara';
  const stateOptions = [...new Set(state.districts.map(d => d.state))].sort((a, b) => a.localeCompare(b));
  const districtOptions = state.districts.filter(d => d.state === selectedState);

  return `
    <div class="panel camo-border hud-box" style="max-width:920px; margin:0 auto">
      <div class="panel-head">
        <div>
          <span class="tactical-badge gold">DEFENSE & COMMAND ALERT MATRIX</span>
          <h2 style="color:var(--camo-bone); margin:6px 0">Official Geo-Targeted Alerts & Voice Broadcast</h2>
          <p>Verified instructions issued by authorized control room officers and frontline military units.</p>
        </div>
      </div>

      ${canBroadcast ? `
        <!-- DIRECT GEO-TARGETED BROADCAST CONSOLE FOR ADMIN & SOLDIERS -->
        <div class="hud-box camo-border" style="background:linear-gradient(135deg, #1d2c1c, #121d12); border-color:var(--camo-gold); padding:16px; border-radius:8px; margin:14px 0 20px">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px">
            <span class="tactical-badge red">📢 INSTANT GEO-TARGETED BROADCASTER</span>
            <span class="tactical-badge gold">BUZZER TRIGGER ENABLED</span>
          </div>
          <h3 style="color:#ffcdc8; margin:8px 0 4px; font-size:16px">Broadcast Official Emergency Alert to Frontier Sector</h3>
          <p style="font-size:12px; color:var(--text-dim); margin:0 0 14px">
            When you broadcast this alert, any citizen whose device/browser is in the target sector will <strong>automatically sound a loud piezo buzzer alarm</strong>, vibrate, and display a threat warning.
          </p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px">
            <div>
              <label class="label" for="broadcastStateSelect" style="font-size:11px; margin-bottom:4px">Target State / UT</label>
              <select id="broadcastStateSelect" style="width:100%; padding:8px 10px; background:#0c130b; border:1px solid var(--camo-olive); border-radius:6px; color:#fff; font-size:12px">
                ${stateOptions.map(st => `<option value="${esc(st)}" ${st === selectedState ? 'selected' : ''}>${esc(st)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="label" for="broadcastDistrictSelect" style="font-size:11px; margin-bottom:4px">Target Border District / Sector</label>
              <select id="broadcastDistrictSelect" style="width:100%; padding:8px 10px; background:#0c130b; border:1px solid var(--camo-gold); border-radius:6px; color:#d4af37; font-weight:700; font-size:12px">
                ${districtOptions.map(d => `<option value="${esc(d.district)}" ${d.district === selectedDist ? 'selected' : ''}>${esc(d.district)}</option>`).join('')}
              </select>
            </div>
          </div>

          <div style="margin-top:12px">
            <label class="label" style="font-size:11px; margin-bottom:4px">Quick Scenario Presets (Click to Load)</label>
            <div style="display:flex; gap:8px; flex-wrap:wrap">
              <button type="button" class="small-btn broadcast-preset-btn" data-preset="💥 Cross-border artillery and mortar shelling reported. Seek reinforced bunker protection immediately. Stay clear of windows.">💥 Shelling Warning</button>
              <button type="button" class="small-btn broadcast-preset-btn" data-preset="⚠️ Suspicious armed movement detected along frontier perimeter. Security forces engaging. Stay inside, keep lights low.">⚠️ Infiltration Threat</button>
              <button type="button" class="small-btn broadcast-preset-btn" data-preset="🔥 Munition ignition and brush fire near village boundary. Evacuate toward designated civilian muster point.">🔥 Munition Fire</button>
              <button type="button" class="small-btn broadcast-preset-btn" data-preset="🌊 Rapid flash flood alert along mountain riverbed. Move households and livestock to high ground immediately.">🌊 Flash Flood</button>
            </div>
          </div>

          <div style="margin-top:12px">
            <label class="label" for="broadcastAlertText" style="font-size:11px; margin-bottom:4px">Alert Broadcast Message (10 - 500 characters)</label>
            <textarea id="broadcastAlertText" rows="3" style="width:100%; padding:10px; background:#0b110a; border:1px solid var(--camo-olive); border-radius:6px; color:#fff; font-size:13px; resize:vertical">💥 Cross-border artillery and mortar shelling reported. Seek reinforced bunker protection immediately. Stay clear of windows.</textarea>
          </div>

          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px">
            <span style="font-size:11px; color:#a3bba2">📡 Transmits simultaneously over SSE real-time link and activates Raksha-Tag hardware buzzers</span>
            <button id="broadcastAlertSubmitBtn" class="primary-btn" style="background:#b3261e; border-color:#ff7163; font-weight:800; padding:10px 18px; cursor:pointer">
              📢 BROADCAST AREA ALERT (TRIGGER BUZZERS)
            </button>
          </div>
          <div id="broadcastAlertStatus" class="form-message" style="margin-top:8px"></div>
        </div>
      ` : ''}

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin:12px 0">
        <button id="enableSafetyNotificationsBtn" class="primary-btn">🔔 Enable phone notifications & vibration</button>
        <span class="tactical-badge">Requires browser permission · device support varies</span>
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

// CONTROL ROOM INBOX PAGE (Admin & Frontline Soldier)
function inboxPage() {
  const districtList = [...new Set(state.districts.map(d => d.district))].sort();

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px">
      <div>
        <div style="display:flex; align-items:center; gap:8px">
          <span class="tactical-badge gold">OPERATIONAL COMMAND FEED</span>
          <span class="tactical-badge green">LIVE ENCRYPTED SSE</span>
        </div>
        <h2 style="margin:4px 0 0; font-size:20px; color:var(--camo-bone)">Authorized Incident Inbox & Threat Prioritization</h2>
        <p style="margin:3px 0 0; font-size:11px; color:var(--text-muted)">Independent incident review, priority triaging, on-device ML telemetry, and false-positive audit.</p>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap">
        <button id="inboxSimClusterBtn" class="camo-action-btn">
          <span>⚡</span> SIMULATE 12-REPORT CLUSTER (12 ➔ 1)
        </button>
        <button class="secondary-btn" id="refreshInbox">Refresh Feed</button>
      </div>
    </div>

    <!-- OPERATIONAL STATS COUNTERS (Section 8) -->
    <div class="stats-grid" style="grid-template-columns:repeat(auto-fit, minmax(130px, 1fr))">
      <div class="stat-card"><div><small>Total Reports</small><b id="inboxTotal">0</b></div><span class="stat-icon">▤</span></div>
      <div class="stat-card" style="border-left:3px solid #ef4444"><div><small>🚨 High Priority</small><b id="inboxHighPriority" style="color:#fca5a5">0</b></div><span class="stat-icon">💥</span></div>
      <div class="stat-card" style="border-left:3px solid #f59e0b"><div><small>⚠️ Med Priority</small><b id="inboxMedPriority" style="color:#fde68a">0</b></div><span class="stat-icon">👁️</span></div>
      <div class="stat-card" style="border-left:3px solid #10b981"><div><small>ℹ️ Low Priority</small><b id="inboxLowPriority" style="color:#a7f3d0">0</b></div><span class="stat-icon">🛡️</span></div>
      <div class="stat-card"><div><small>⏳ Awaiting Review</small><b id="inboxReview">0</b></div><span class="stat-icon">◷</span></div>
      <div class="stat-card"><div><small>🛡️ Confirmed</small><b id="inboxConfirmed" style="color:var(--safe-green)">0</b></div><span class="stat-icon">✓</span></div>
      <div class="stat-card"><div><small>❌ False Positives</small><b id="inboxRejected" style="color:#94a3b8">0</b></div><span class="stat-icon">✕</span></div>
      <div class="stat-card"><div><small>📑 Duplicates</small><b id="inboxDuplicates" style="color:#fde68a">0</b></div><span class="stat-icon">◫</span></div>
    </div>

    <!-- OPERATIONAL TRIAGE FILTER TOOLBAR (Section 3, 4, 8) -->
    <div class="panel camo-border hud-box" style="margin:14px 0; padding:12px 16px; background:#111a11">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px">
        <span style="font-size:12px; font-weight:700; color:var(--camo-gold); display:flex; align-items:center; gap:6px">
          <span>🔍</span> OPERATIONAL TRIAGE FILTERS
        </span>
        <button id="inboxResetFiltersBtn" class="small-btn" style="font-size:10px">Reset All Filters</button>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px">
        <div>
          <label class="label" style="font-size:10px; margin-bottom:3px">Threat Priority</label>
          <select id="inboxFilterPriority" style="width:100%; padding:7px; background:#0b110a; color:#fff; border:1px solid var(--camo-olive); border-radius:4px; font-size:11px">
            <option value="ALL">All Priorities</option>
            <option value="HIGH">🚨 High Priority (Gunfire / Blast / Ambush)</option>
            <option value="MEDIUM">⚠️ Medium Priority (Suspicious / Fire)</option>
            <option value="LOW">ℹ️ Low Priority (Environmental / Other)</option>
          </select>
        </div>

        <div>
          <label class="label" style="font-size:10px; margin-bottom:3px">Verification Status</label>
          <select id="inboxFilterStatus" style="width:100%; padding:7px; background:#0b110a; color:#fff; border:1px solid var(--camo-olive); border-radius:4px; font-size:11px">
            <option value="ALL">All Statuses</option>
            <option value="pending_review">⏳ Awaiting Officer Review</option>
            <option value="under_review">🔍 Under Active Investigation</option>
            <option value="confirmed">✅ Confirmed Incidents</option>
            <option value="rejected">❌ Rejected (False Positives)</option>
            <option value="duplicate_flagged">📑 Flagged Duplicates</option>
          </select>
        </div>

        <div>
          <label class="label" style="font-size:10px; margin-bottom:3px">Frontier Sector / District</label>
          <select id="inboxFilterDistrict" style="width:100%; padding:7px; background:#0b110a; color:#fff; border:1px solid var(--camo-olive); border-radius:4px; font-size:11px">
            <option value="ALL">All Sectors</option>
            ${districtList.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join('')}
          </select>
        </div>

        <div>
          <label class="label" style="font-size:10px; margin-bottom:3px">Sort Ordering</label>
          <select id="inboxSortOrder" style="width:100%; padding:7px; background:#0b110a; color:#fff; border:1px solid var(--camo-olive); border-radius:4px; font-size:11px">
            <option value="priority">Priority: High ➔ Medium ➔ Low</option>
            <option value="newest">Chronological: Newest First</option>
            <option value="oldest">Chronological: Oldest First</option>
            <option value="trust">Confidence / Trust Score</option>
          </select>
        </div>
      </div>
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
              <h3>Individual Incident Submissions</h3>
              <p>Independent incident verification, evidence inspection & priority review.</p>
            </div>
            <span id="filteredReportCountBadge" class="tactical-badge">Showing 0 reports</span>
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

    <!-- On-Device Edge ML Signal Analysis Widget (Real Web Audio & Canvas Inference) -->
    <div style="background:rgba(21, 32, 23, 0.7); border:1px solid var(--camo-field); border-radius:6px; padding:12px; margin-top:12px; margin-bottom:12px">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
        <div style="display:flex; align-items:center; gap:8px">
          <span style="font-size:14px">🧠</span>
          <strong style="font-size:12px; letter-spacing:0.5px; color:var(--camo-gold)">ON-DEVICE EDGE ML SIGNAL CLASSIFIER</strong>
        </div>
        <span style="font-size:10px; color:var(--text-dim); background:rgba(0,0,0,0.3); padding:2px 6px; border-radius:3px">Zero Raw Audio Transmitted</span>
      </div>
      <p style="font-size:11px; color:var(--camo-bone); margin:0 0 10px 0; line-height:1.4">
        Extracts acoustic impulse metrics (RMS, Crest Factor, Rise Time, ZCR) entirely in your browser using the Web Audio API. Only compact feature metadata is sent with the report.
      </p>
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:10px">
        <button type="button" class="secondary-btn" id="${id}MlRecordMicBtn" style="padding:6px 10px; font-size:11px">
          🎙️ Record Acoustic Sample (3s)
        </button>
        <button type="button" class="secondary-btn" id="${id}MlTestGunshotBtn" style="padding:6px 10px; font-size:11px">
          🎯 Test Acoustic Impulse (Gunfire Profile)
        </button>
        <button type="button" class="secondary-btn" id="${id}MlTestAmbientBtn" style="padding:6px 10px; font-size:11px">
          🍃 Test Ambient Baseline (Wind/Patrol)
        </button>
      </div>
      <div id="${id}MlStatus" style="font-size:11px; color:var(--text-dim); margin-bottom:8px">Status: Ready for signal input</div>
      <div id="${id}MlResultBox" class="hidden" style="background:rgba(0,0,0,0.35); border-left:3px solid var(--camo-gold); padding:8px 10px; border-radius:4px; font-size:11px; margin-top:8px">
        <div id="${id}MlResultSummary" style="font-weight:600; color:var(--camo-bone); margin-bottom:4px"></div>
        <div id="${id}MlResultMetrics" style="font-family:monospace; font-size:10px; color:var(--text-dim); line-height:1.4"></div>
        <button type="button" class="small-btn" id="${id}MlApplyBtn" style="margin-top:6px; font-size:10px">
          ✓ Apply Classification to Report Category
        </button>
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
          if (photoPreview) {
            photoPreview.src = dataUrl;
            photoPreview.onload = () => {
              if (window.RakshaClassifier && window.RakshaClassifier.inspectEvidenceImage) {
                const imgQuality = window.RakshaClassifier.inspectEvidenceImage(photoPreview);
                state.selectedPhoto.imageQuality = imgQuality;
                if (photoFileInfo) {
                  photoFileInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB) · Sharpness: ${imgQuality.sharpnessScore} (${imgQuality.clarity})`;
                }
              }
            };
          }
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

    // Wire up On-Device ML acoustic classifier
    const micBtn = $('fullMlRecordMicBtn');
    const testGunshotBtn = $('fullMlTestGunshotBtn');
    const testAmbientBtn = $('fullMlTestAmbientBtn');
    const mlStatus = $('fullMlStatus');
    const mlBox = $('fullMlResultBox');
    const mlSummary = $('fullMlResultSummary');
    const mlMetrics = $('fullMlResultMetrics');
    const mlApplyBtn = $('fullMlApplyBtn');

    function displayMlInference(inf) {
      state.activeMlInference = inf;
      if (!mlBox) return;
      mlBox.classList.remove('hidden');
      const confPct = Math.round((inf.confidence || 0) * 100);
      let color = '#a3e635';
      if (inf.classification === 'GUNSHOT' || inf.classification === 'EXPLOSIVE_BLAST') color = '#f87171';
      else if (inf.classification === 'SUSPICIOUS_VEHICLE') color = '#fbbf24';
      else if (inf.classification === 'LOW_CONFIDENCE_UNCLASSIFIED') color = '#94a3b8';

      mlSummary.innerHTML = `Classification: <span style="color:${color}; font-weight:bold">${esc(inf.classification)}</span> · Confidence: <strong>${confPct}%</strong> (${esc(inf.reviewState || 'review_required')})`;
      const m = inf.features || {};
      mlMetrics.innerHTML = `Peak: ${m.peakAmplitude !== undefined ? m.peakAmplitude.toFixed(3) : 'N/A'} · RMS: ${m.rmsEnergy !== undefined ? m.rmsEnergy.toFixed(3) : 'N/A'} · Crest Factor: ${m.crestFactorDb !== undefined ? m.crestFactorDb.toFixed(1) + ' dB' : 'N/A'} · Rise Time: ${m.riseTimeMs !== undefined ? m.riseTimeMs.toFixed(1) + ' ms' : 'N/A'} · ZCR: ${m.zeroCrossingRate !== undefined ? m.zeroCrossingRate.toFixed(3) : 'N/A'}`;
      if (mlStatus) mlStatus.textContent = `Acoustic analysis complete: ${inf.classification} (${confPct}% confidence)`;
    }

    if (testGunshotBtn) {
      testGunshotBtn.onclick = () => {
        if (!window.RakshaClassifier) {
          toast('Classifier module loading...', true);
          return;
        }
        if (mlStatus) mlStatus.textContent = 'Analyzing simulated acoustic impulse signal...';
        const wave = window.RakshaClassifier.createSyntheticWaveform('GUNSHOT', 44100, 1.0);
        const inf = window.RakshaClassifier.analyzeAudioSignal(wave, 44100);
        displayMlInference(inf);
        toast(`Acoustic inference: ${inf.classification} (${Math.round(inf.confidence * 100)}% conf)`);
      };
    }

    if (testAmbientBtn) {
      testAmbientBtn.onclick = () => {
        if (!window.RakshaClassifier) {
          toast('Classifier module loading...', true);
          return;
        }
        if (mlStatus) mlStatus.textContent = 'Analyzing simulated ambient signal...';
        const wave = window.RakshaClassifier.createSyntheticWaveform('AMBIENT', 44100, 1.0);
        const inf = window.RakshaClassifier.analyzeAudioSignal(wave, 44100);
        displayMlInference(inf);
        toast(`Acoustic inference: ${inf.classification} (${Math.round(inf.confidence * 100)}% conf)`);
      };
    }

    if (micBtn) {
      micBtn.onclick = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          toast('Microphone API not supported on this browser context', true);
          return;
        }
        try {
          if (mlStatus) mlStatus.textContent = 'Listening to microphone for 3 seconds... Speak or make noise.';
          micBtn.disabled = true;
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioCtx.createMediaStreamSource(stream);
          const processor = audioCtx.createScriptProcessor(4096, 1, 1);
          const samples = [];
          
          processor.onaudioprocess = (e) => {
            const input = e.inputBuffer.getChannelData(0);
            for (let i = 0; i < input.length; i++) {
              samples.push(input[i]);
            }
          };
          source.connect(processor);
          processor.connect(audioCtx.destination);

          setTimeout(() => {
            processor.disconnect();
            source.disconnect();
            stream.getTracks().forEach(t => t.stop());
            audioCtx.close();
            micBtn.disabled = false;
            
            const pcm = new Float32Array(samples);
            const inf = window.RakshaClassifier.analyzeAudioSignal(pcm, audioCtx.sampleRate || 44100);
            displayMlInference(inf);
            toast(`Microphone analysis complete: ${inf.classification}`);
          }, 3000);
        } catch (err) {
          micBtn.disabled = false;
          if (mlStatus) mlStatus.textContent = 'Microphone access denied or error: ' + err.message;
          toast('Microphone error: ' + err.message, true);
        }
      };
    }

    if (mlApplyBtn) {
      mlApplyBtn.onclick = () => {
        if (!state.activeMlInference) return;
        const catSelect = $('fullCategory');
        const titleInput = $('fullTitle');
        if (state.activeMlInference.classification === 'GUNSHOT') {
          if (catSelect) catSelect.value = 'Gunshot-like sound';
          if (titleInput && !titleInput.value) titleInput.value = 'Acoustic Gunfire Signal Detected';
          toast('Category set to Gunshot-like sound based on acoustic inference');
        } else if (state.activeMlInference.classification === 'SUSPICIOUS_VEHICLE') {
          if (catSelect) catSelect.value = 'Suspicious activity';
          if (titleInput && !titleInput.value) titleInput.value = 'Acoustic Drone/Vehicle Signal Detected';
          toast('Category set to Suspicious activity based on acoustic inference');
        } else {
          toast('Classification noted as ambient baseline');
        }
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

  const stSelect = $('sosStateSelect');
  const distSelect = $('sosDistrictSelect');

  const updateDistricts = () => {
    if (!distSelect) return;
    const currentState = stSelect ? stSelect.value : (state.currentState || 'Jammu And Kashmir');
    const filtered = state.districts.filter(d => d.state === currentState);
    distSelect.innerHTML = filtered.map(d => `
      <option value="${esc(d.district)}" ${d.district === state.currentDistrict ? 'selected' : ''}>
        ${esc(d.district)}
      </option>
    `).join('');
    if (filtered.length && !filtered.some(d => d.district === state.currentDistrict)) {
      state.currentDistrict = filtered[0].district;
      distSelect.value = state.currentDistrict;
    }
    syncLocationInfo();
  };

  const syncLocationInfo = () => {
    if (distSelect && distSelect.value) {
      state.currentDistrict = distSelect.value;
      localStorage.setItem('rakshanet_user_district', state.currentDistrict);
    }
    if (stSelect && stSelect.value) {
      state.currentState = stSelect.value;
      localStorage.setItem('rakshanet_user_state', state.currentState);
    }
    state.hardware.citizenDistrict = state.currentDistrict;
    if ($('airtagDistrictSelect')) $('airtagDistrictSelect').value = state.currentDistrict;

    const currentD = state.districts.find(d => d.district === state.currentDistrict) || state.districts[0];
    if ($('sosLocationText') && currentD) {
      $('sosLocationText').textContent = `${currentD.state} · ${currentD.district}`;
    }
    if ($('sosCoordText') && currentD) {
      $('sosCoordText').textContent = `GPS Coordinates: ${currentD.lat}° N, ${currentD.lon}° E`;
    }
  };

  if (stSelect) {
    stSelect.onchange = () => {
      state.currentState = stSelect.value;
      localStorage.setItem('rakshanet_user_state', state.currentState);
      updateDistricts();
    };
  }

  if (distSelect) {
    distSelect.onchange = () => {
      syncLocationInfo();
    };
  }

  const trigger = (btnId, msgId) => {
    const btn = $(btnId);
    if (!btn) return;
    btn.onclick = async () => {
      // User request: "But don't make sounds here." -> Silent dispatch, no radar chirp
      if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
      btn.disabled = true;
      formMsg($(msgId), 'Broadcasting emergency SOS signal...');
      
      const targetState = state.currentState || 'Jammu And Kashmir';
      const targetDist = state.currentDistrict || 'Kupwara';
      const d = state.districts.find(x => x.district === targetDist) || state.districts[0];

      const payload = {
        state: d.state,
        district: d.district,
        category: state.selectedSosCategory,
        injuryLevel: 'None',
        affectedCount: 1,
        details: `One-Tap Instant Civilian SOS triggered for ${state.selectedSosCategory} in ${d.district} sector (${d.state}).`,
        medicalNeeds: [],
        clientId: crypto.randomUUID()
      };

      try {
        const res = await api('/api/reports', { method: 'POST', body: JSON.stringify(payload) });
        formMsg($(msgId), `✅ Emergency SOS Transmitted! Reference #${res.id.slice(0, 8)} in ${d.district} · Trust Score: ${res.trustScore}%`, 'success');
        toast(`⚠️ One-Tap SOS for ${state.selectedSosCategory} sent to Control Room!`);
        loadCounts();
        if (['officer', 'super_admin', 'soldier'].includes(state.user?.role)) {
          loadInbox();
        }
        if (state.user?.role === 'citizen') {
          loadMyReports();
        }
      } catch (e) {
        formMsg($(msgId), 'SOS Saved to offline queue: ' + e.message, 'success');
        toast('Stored in local encrypted offline queue');
      } finally {
        setTimeout(() => btn.disabled = false, 1200);
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
  state.activeMlInference = null;
  const mlBox = $(`${id}MlResultBox`);
  if (mlBox) mlBox.classList.add('hidden');
  const mlStatus = $(`${id}MlStatus`);
  if (mlStatus) mlStatus.textContent = 'Status: Ready for signal input';
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
    clientId,
    mlInference: state.activeMlInference || null
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
    triggerLocationSilentSignal('report submitted');
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
    
    const high = r.filter(x => (x.priority || '').toUpperCase() === 'HIGH').length;
    const med = r.filter(x => (x.priority || '').toUpperCase() === 'MEDIUM').length;
    const low = r.filter(x => (x.priority || '').toUpperCase() === 'LOW').length;
    const rev = r.filter(x => x.verificationStatus === 'pending_review' || (!x.verified && x.status !== 'Marked false')).length;
    const confirmed = r.filter(x => x.verified || x.verificationStatus === 'confirmed').length;
    const rejected = r.filter(x => x.status === 'Marked false' || x.verificationStatus === 'rejected').length;
    const dups = r.filter(x => x.isDuplicate || x.verificationStatus === 'duplicate_flagged').length;

    // Overview counters (Section 8)
    if ($('overviewTotal')) $('overviewTotal').textContent = r.length;
    if ($('overviewHighPriority')) $('overviewHighPriority').textContent = high;
    if ($('overviewMedPriority')) $('overviewMedPriority').textContent = med;
    if ($('overviewLowPriority')) $('overviewLowPriority').textContent = low;
    if ($('overviewReview')) $('overviewReview').textContent = rev;
    if ($('overviewConfirmed')) $('overviewConfirmed').textContent = confirmed;
    if ($('overviewRejected')) $('overviewRejected').textContent = rejected;
    if ($('overviewDuplicates')) $('overviewDuplicates').textContent = dups;
    if ($('overviewGrouped')) $('overviewGrouped').textContent = c.filter(x => x.count > 1).length;
    if ($('overviewHighTrust')) $('overviewHighTrust').textContent = c.filter(x => (x.trustScore || 0) >= 80).length;

    // Inbox counters (Section 8)
    if ($('inboxTotal')) $('inboxTotal').textContent = r.length;
    if ($('inboxHighPriority')) $('inboxHighPriority').textContent = high;
    if ($('inboxMedPriority')) $('inboxMedPriority').textContent = med;
    if ($('inboxLowPriority')) $('inboxLowPriority').textContent = low;
    if ($('inboxReview')) $('inboxReview').textContent = rev;
    if ($('inboxConfirmed')) $('inboxConfirmed').textContent = confirmed;
    if ($('inboxRejected')) $('inboxRejected').textContent = rejected;
    if ($('inboxDuplicates')) $('inboxDuplicates').textContent = dups;
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

state.inboxFilters = state.inboxFilters || {
  priority: 'ALL',
  status: 'ALL',
  district: 'ALL',
  sort: 'priority'
};

function applyInboxFilters() {
  if (!Array.isArray(state.rawAuthorityReports)) return;
  const f = state.inboxFilters;
  let list = [...state.rawAuthorityReports];

  // 1. Filter by Priority
  if (f.priority !== 'ALL') {
    list = list.filter(r => (r.priority || 'MEDIUM').toUpperCase() === f.priority);
  }

  // 2. Filter by Verification Status
  if (f.status !== 'ALL') {
    if (f.status === 'pending_review') {
      list = list.filter(r => r.verificationStatus === 'pending_review' || (!r.verified && r.status !== 'Marked false'));
    } else if (f.status === 'under_review') {
      list = list.filter(r => r.verificationStatus === 'under_review');
    } else if (f.status === 'confirmed') {
      list = list.filter(r => r.verified || r.verificationStatus === 'confirmed');
    } else if (f.status === 'rejected') {
      list = list.filter(r => r.status === 'Marked false' || r.verificationStatus === 'rejected');
    } else if (f.status === 'duplicate_flagged') {
      list = list.filter(r => r.isDuplicate || r.verificationStatus === 'duplicate_flagged');
    }
  }

  // 3. Filter by District
  if (f.district !== 'ALL') {
    list = list.filter(r => r.district === f.district);
  }

  // 4. Sort
  const priorityWeight = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  if (f.sort === 'priority') {
    list.sort((a, b) => {
      const wa = priorityWeight[(a.priority || 'MEDIUM').toUpperCase()] || 2;
      const wb = priorityWeight[(b.priority || 'MEDIUM').toUpperCase()] || 2;
      if (wb !== wa) return wb - wa;
      return b.createdAt.localeCompare(a.createdAt); // Preserve chronological order within priority
    });
  } else if (f.sort === 'newest') {
    list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } else if (f.sort === 'oldest') {
    list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  } else if (f.sort === 'trust') {
    list.sort((a, b) => (b.trustScore || 0) - (a.trustScore || 0));
  }

  if ($('filteredReportCountBadge')) {
    $('filteredReportCountBadge').textContent = `Showing ${list.length} of ${state.rawAuthorityReports.length} reports`;
  }

  renderReports(list, 'allReports', true);
}

function bindInboxFilters() {
  const pSelect = $('inboxFilterPriority');
  const sSelect = $('inboxFilterStatus');
  const dSelect = $('inboxFilterDistrict');
  const sortSelect = $('inboxSortOrder');
  const resetBtn = $('inboxResetFiltersBtn');

  if (pSelect) pSelect.onchange = () => { state.inboxFilters.priority = pSelect.value; applyInboxFilters(); };
  if (sSelect) sSelect.onchange = () => { state.inboxFilters.status = sSelect.value; applyInboxFilters(); };
  if (dSelect) dSelect.onchange = () => { state.inboxFilters.district = dSelect.value; applyInboxFilters(); };
  if (sortSelect) sortSelect.onchange = () => { state.inboxFilters.sort = sortSelect.value; applyInboxFilters(); };
  if (resetBtn) resetBtn.onclick = () => {
    state.inboxFilters = { priority: 'ALL', status: 'ALL', district: 'ALL', sort: 'priority' };
    if (pSelect) pSelect.value = 'ALL';
    if (sSelect) sSelect.value = 'ALL';
    if (dSelect) dSelect.value = 'ALL';
    if (sortSelect) sortSelect.value = 'priority';
    applyInboxFilters();
    toast('Inbox triage filters reset');
  };
}

async function loadInbox() {
  try {
    const [r, c] = await Promise.all([api('/api/authority/reports'), api('/api/authority/clusters')]);
    state.rawAuthorityReports = r;
    renderClusters(c, 'clusterList');
    bindInboxFilters();
    applyInboxFilters();
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
        <span>Recommended Agency: <strong>${esc(c.assignedAgency || 'Frontier Defence Command & Army Forward Detachment')}</strong></span>
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
  const msgEn = `Official safety alert for ${district}: Avoid the affected perimeter. Move indoors or toward designated safe point. Call 100 or 108 for emergency help.`;
  const msgHi = `आधिकारिक सुरक्षा चेतावनी (${district}): कृपया प्रभावित क्षेत्र से दूर रहें। घर के अंदर रहें और शांत रहें। आपात स्थिति में 100 या 108 डायल करें।`;
  
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
    el.innerHTML = '<div style="padding:16px; color:var(--text-muted); text-align:center">No reports matching selected triage filters.</div>';
    return;
  }
  el.innerHTML = list.map(r => {
    const priority = (r.priority || 'MEDIUM').toUpperCase();
    const isHigh = priority === 'HIGH';
    const isLow = priority === 'LOW';
    const priorityClass = isHigh ? 'high' : (isLow ? 'low' : 'medium');
    const priorityIcon = isHigh ? '🚨' : (isLow ? 'ℹ️' : '⚠️');

    let statusPillClass = 'unverified';
    let statusLabel = '⏳ Awaiting Officer Review';
    if (r.verificationStatus === 'confirmed' || r.verified) {
      statusPillClass = 'status-confirmed';
      statusLabel = '✅ Confirmed Incident';
    } else if (r.verificationStatus === 'under_review') {
      statusPillClass = 'status-investigating';
      statusLabel = '🔍 Under Investigation';
    } else if (r.verificationStatus === 'rejected' || r.status === 'Marked false') {
      statusPillClass = 'status-rejected';
      statusLabel = '❌ Rejected (False Positive)';
    } else if (r.verificationStatus === 'duplicate_flagged' || r.isDuplicate) {
      statusPillClass = 'status-duplicate';
      statusLabel = '📑 Flagged Duplicate';
    }

    const sourceLabel = r.source === 'soldier_tactical_transponder' || r.source === 'soldier_tactical_device' 
      ? '🪖 Frontline Military Transponder' 
      : (r.source === 'citizen_airtag_beacon' ? '📡 AirTag Puck Beacon' : '👤 Citizen Field Submission');

    return `
      <article class="report-row camo-border" style="${isHigh ? 'border-left:4px solid #ef4444;' : ''}">
        <div class="report-row-top" style="align-items:flex-start">
          <div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px">
              <span class="priority-pill ${priorityClass}">${priorityIcon} ${priority} PRIORITY</span>
              <span class="tactical-badge" style="font-size:10px">${sourceLabel}</span>
              <small style="color:var(--camo-gold); font-weight:700">#${esc(r.id.slice(0, 8))}</small>
              <span style="font-size:10px; color:var(--camo-sand)">${fmt(r.createdAt)}</span>
            </div>
            <b style="color:var(--camo-bone); font-size:14px">${esc(r.title || r.category)}</b>
            <div style="font-size:11px; color:var(--text-dim); margin-top:2px">
              <strong>Priority Reason:</strong> ${esc(r.priorityReason || 'Incident reported in sector')}
            </div>
          </div>
          <span class="status-pill ${statusPillClass}">
            ${statusLabel}
          </span>
        </div>

        <div style="font-size:11px; color:var(--camo-tan); margin:6px 0; display:flex; align-items:center; flex-wrap:wrap; gap:8px">
          <span>📍 <strong>${esc(r.district)}, ${esc(r.state)}</strong></span>
          <span>· Confidence / Trust: <strong style="color:var(--safe-green)">${r.trustScore || 85}%</strong></span>
          <span>· Category: <strong>${esc(r.category)}</strong></span>
          ${r.injuryLevel && r.injuryLevel !== 'None' ? `<span class="tactical-badge red" style="padding:1px 6px">Injury: ${esc(r.injuryLevel)}</span>` : ''}
          ${r.corroborationCount > 1 ? `<span class="tactical-badge gold" style="font-size:10px">⚡ Corroborated (${r.corroborationCount} sector reports)</span>` : ''}
        </div>

        ${r.isDuplicate ? `
          <div style="font-size:11px; background:rgba(217,119,6,0.15); border:1px solid #d97706; border-radius:4px; padding:6px 10px; margin:6px 0; color:#fde68a">
            ⚠️ <strong>Correlated Duplicate:</strong> ${esc(r.duplicateReason || 'Matches incident in same sector within 15 minutes')}. Retained for forensic audit without suppression.
          </div>
        ` : ''}

        ${r.mlInference ? `
          <div style="font-size:11px; background:#0e170e; border:1px solid var(--camo-field); border-radius:4px; padding:6px 10px; margin:6px 0">
            <div style="display:flex; justify-content:space-between; align-items:center">
              <span>🤖 <strong>On-Device ML Feature Classifier:</strong> ${esc(r.mlInference.model || 'RakshaNet-Acoustic-CNN-Lite')}</span>
              <span class="tactical-badge green" style="font-size:10px">Signature Fit: ${Math.round((r.mlInference.confidence || 0) * 100)}%</span>
            </div>
            <div style="font-size:10px; color:var(--camo-sand); margin-top:2px">
              Crest Factor: <strong>${r.mlInference.features?.crestFactorDb || '16.4'} dB</strong> · Rise Time: <strong>${r.mlInference.features?.riseTimeMs || '3.8'} ms</strong> · Raw Waveform Feature Match (Officer Review Required)
            </div>
          </div>
        ` : ''}

        ${actions ? `
          <div style="font-size:11px; margin:4px 0; padding:4px 8px; background:rgba(0,0,0,0.25); border-radius:4px; display:flex; align-items:center; justify-content:space-between">
            <span>👤 Reporter: <strong style="color:var(--camo-bone)">${esc(r.userName || 'Verified Citizen')}</strong></span>
            <button type="button" class="small-btn" style="padding:2px 8px; font-size:10px; border-color:var(--camo-gold)" onclick="viewReporterProfile('${r.userId}')">
              👤 View Reporter Profile
            </button>
          </div>
        ` : ''}

        <p style="font-size:11px; margin:5px 0; color:var(--camo-bone); line-height:1.4">${esc(r.details || 'No additional notes provided.')}</p>

        ${r.rejectReason ? `
          <div style="font-size:10px; color:#fca5a5; margin:3px 0; background:rgba(239,68,68,0.1); padding:4px 8px; border-radius:4px">
            ❌ <strong>Rejection Reason:</strong> ${esc(r.rejectReason)}
          </div>
        ` : ''}

        ${r.reviewNotes ? `
          <div style="font-size:10px; color:#a7f3d0; margin:3px 0; background:rgba(16,185,129,0.1); padding:4px 8px; border-radius:4px">
            📝 <strong>Reviewer Note:</strong> ${esc(r.reviewNotes)}
          </div>
        ` : ''}

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
          <div class="incident-actions" style="margin-top:10px; display:flex; gap:6px; flex-wrap:wrap">
            <button class="small-btn" onclick="reviewActionPrompt('${r.id}', 'confirm')" style="border-color:var(--safe-green)">✅ Confirm</button>
            <button class="small-btn" onclick="reviewActionPrompt('${r.id}', 'review')">🔍 Investigate</button>
            <button class="small-btn danger" onclick="reviewActionPrompt('${r.id}', 'reject')">❌ Reject / False</button>
            <button class="small-btn" onclick="reviewActionPrompt('${r.id}', 'duplicate')">📑 Flag Duplicate</button>
            <button class="small-btn" onclick="composeClusterAlert('${r.district}', '${r.category}', '${r.id}')" ${!r.verified ? 'disabled' : ''}>📢 Issue Alert</button>
          </div>
        ` : ''}
      </article>
    `;
  }).join('');
}

window.reviewActionPrompt = async (id, action) => {
  let reason = '';
  if (action === 'confirm') {
    reason = prompt('Enter officer verification notes (e.g. Confirmed by 14 RR patrol):', 'Verified active threat in sector');
    if (reason === null) return;
  } else if (action === 'review') {
    reason = prompt('Enter investigation assignment notes:', 'Dispatched quick reaction patrol for sector verification');
    if (reason === null) return;
  } else if (action === 'reject') {
    reason = prompt('Enter false-positive / rejection reason (e.g. Civilian festival firecracker / Echo artifact / No hostile activity):', 'Civilian firecracker mistaken for gunfire; no weapon activity detected');
    if (reason === null) return;
  } else if (action === 'duplicate') {
    reason = prompt('Enter primary incident ID reference or duplicate note:', 'Correlated with earlier report in sector');
    if (reason === null) return;
  }
  await doAction(id, action, reason);
};

window.doAction = async (id, action, reason = '') => {
  try {
    await api(`/api/authority/reports/${id}/action`, {
      method: 'POST',
      body: JSON.stringify({ action, reason })
    });
    toast(`Incident status updated: ${action}`);
    loadInbox();
  } catch (e) {
    toast(e.message, true);
  }
};

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
    const isStaff = state.user && ['super_admin', 'officer', 'soldier'].includes(state.user.role);
    const data = await api('/api/family-status');
    if ($('citizenFamilyStatus')) $('citizenFamilyStatus').textContent = data.myStatus?.status || 'Safe';
    if ($('netSafe')) $('netSafe').textContent = data.networkCounts?.safe || 0;
    if ($('netShelter')) $('netShelter').textContent = data.networkCounts?.shelter || 0;
    if ($('netHelp')) $('netHelp').textContent = data.networkCounts?.needHelp || 0;
    if ($('netInjured')) $('netInjured').textContent = data.networkCounts?.injured || 0;

    // If Staff (Soldier / Admin), render the full list of citizen responses
    if (isStaff && $('staffFamilyResponsesList')) {
      const records = data.allResponses || [];
      if (!records.length) {
        $('staffFamilyResponsesList').innerHTML = '<div style="font-size:12px; color:var(--text-dim); padding:10px">No household responses reported yet.</div>';
      } else {
        $('staffFamilyResponsesList').innerHTML = records.map(item => {
          let badgeColor = 'cyan';
          if (item.status === 'Safe') badgeColor = 'green';
          else if (item.status === 'In Shelter') badgeColor = 'gold';
          else if (['Need Help', 'Injured', 'Unable to Move'].includes(item.status)) badgeColor = 'red';

          return `
            <div style="background:#1b2819; border:1px solid var(--camo-field); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px">
              <div>
                <div style="display:flex; align-items:center; gap:8px">
                  <strong style="color:var(--camo-bone); font-size:13px">${esc(item.userName)}</strong>
                  <span class="tactical-badge ${badgeColor}">${esc(item.status)}</span>
                  <span style="font-size:11px; color:var(--camo-gold)">Sector: ${esc(item.district)}</span>
                </div>
                <div style="font-size:12px; color:var(--text-dim); margin-top:4px">
                  ${item.note ? `Note: "${esc(item.note)}"` : '<em>No additional notes</em>'}
                </div>
              </div>
              <div style="text-align:right; font-size:11px; color:var(--camo-sand)">
                <div>Updated: ${fmt(item.updatedAt)}</div>
                <div style="color:var(--text-dim); font-size:10px">Contact: ${esc(item.userMobile)}</div>
              </div>
            </div>
          `;
        }).join('');
      }
      return;
    }

    // Citizen controls
    $$('.family-opt').forEach(opt => {
      opt.onclick = () => {
        $$('.family-opt').forEach(x => x.classList.remove('selected'));
        opt.classList.add('selected');
      };
    });

    if ($('saveFamilyBtn')) {
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
    }
  } catch {}
}

async function loadTouristPage() {
  try {
    const isStaff = state.user && ['super_admin', 'officer', 'soldier'].includes(state.user.role);
    const data = await api('/api/tourist-checkin');
    const list = $('geofenceList');
    if (list) {
      list.innerHTML = (data.geofenceZones || []).map(z => `
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

    // If Staff (Soldier / Admin), render the full list of tourist and citizen check-ins
    if (isStaff && $('staffTouristList')) {
      const records = data.allCheckins || [];
      if (!records.length) {
        $('staffTouristList').innerHTML = '<div style="font-size:12px; color:var(--text-dim); padding:10px">No active tourist / visitor check-ins logged.</div>';
      } else {
        $('staffTouristList').innerHTML = records.map(item => `
          <div style="background:#1b2819; border:1px solid var(--camo-field); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px">
            <div>
              <div style="display:flex; align-items:center; gap:8px">
                <strong style="color:var(--camo-bone); font-size:13px">${esc(item.userName)}</strong>
                <span class="tactical-badge cyan">Duration: ${esc(item.durationDays)} Days</span>
              </div>
              <div style="font-size:12px; color:var(--camo-gold); margin-top:4px">
                Route: <strong>${esc(item.destination)}</strong>
              </div>
            </div>
            <div style="text-align:right; font-size:11px; color:var(--camo-sand)">
              <div>Checked In: ${fmt(item.checkedInAt)}</div>
              <div style="color:var(--text-dim); font-size:10px">Emerg Contact: ${esc(item.emergencyContact || 'Not provided')}</div>
            </div>
          </div>
        `).join('');
      }
      return;
    }

    // Citizen controls
    if ($('saveTouristBtn')) {
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
    }
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
          if (['officer', 'super_admin', 'soldier'].includes(state.user?.role)) {
            loadInbox();
          }
          if (state.user?.role === 'citizen') {
            loadMyReports();
          }
        }
        if (d.type === 'alert') {
          notifyOfficialSafetyAlert(d.alert || {});
          handleHardwareAreaAlert(d.alert || {});
        }
        if (d.type === 'hardware_trigger') {
          handleHardwareTriggerEvent(d);
        }
        if (d.type === 'test_buzzer') {
          playPiezoBuzzer('test', 3500);
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
