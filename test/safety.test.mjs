import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyVerhoeff, validateSignup, clusterLevel, groupReports, classifyThreatPriority, detectDuplicateReport, recommendAgency, PRIORITY_LEVELS } from '../src/safety.mjs';
function withCheckDigit(stem){for(let n=0;n<10;n++){const x=stem+n;if(verifyVerhoeff(x))return x}throw Error('test digit not found')}
const syntheticAadhaar=withCheckDigit('12345678901');
test('Verhoeff accepts a checksummed 12-digit identifier',()=>assert.equal(verifyVerhoeff(syntheticAadhaar),true));
test('Verhoeff rejects a changed check digit and malformed input',()=>{assert.equal(verifyVerhoeff(syntheticAadhaar.slice(0,11)+'9'),false);assert.equal(verifyVerhoeff('abc'),false)});
test('signup accepts correct fields and compliant password',()=>assert.equal(validateSignup({fullName:'Test Citizen',aadhaar:syntheticAadhaar,mobile:'+919876543210',email:'person@example.net',password:'SafePass!2046',confirmPassword:'SafePass!2046'}).ok,true));
test('signup rejects weak or mismatched passwords',()=>{const base={fullName:'Test Citizen',aadhaar:syntheticAadhaar,mobile:'+919876543210',email:'person@example.net',password:'weak',confirmPassword:'weak'};assert.match(validateSignup(base).error,/10\+ characters/);base.password='SafePass!2046';base.confirmPassword='OtherPass!2046';assert.match(validateSignup(base).error,/do not match/)});
test('signup rejects disposable email addresses and invalid aadhaar checksum',()=>{const base={fullName:'Test Citizen',aadhaar:syntheticAadhaar,mobile:'+919876543210',email:'x@mailinator.com',password:'SafePass!2046',confirmPassword:'SafePass!2046'};assert.match(validateSignup(base).error,/Disposable/);base.email='person@example.net';base.aadhaar='123456789012';assert.match(validateSignup(base).error,/checksum/)});
test('matrix labels remain officer-review suggestions until verified',()=>{assert.match(clusterLevel(1),/Level 1/);assert.match(clusterLevel(2),/Level 2/);assert.match(clusterLevel(3,true),/Level 3/);assert.match(clusterLevel(1,false,false,true),/Critical/)});
test('same category and district within fifteen minutes group into one counted entry',()=>{const now=Date.now(),r=i=>({id:String(i),category:'Fire',state:'Assam',district:'Dibrugarh',createdAt:new Date(now-i*60000).toISOString(),status:'Received by control room',injuryLevel:'None'});const g=groupReports([r(0),r(3),r(18)],now);assert.equal(g.length,1);assert.equal(g[0].count,2);assert.match(g[0].level,/Level 2/)});
test('different districts are kept in separate groups',()=>{const now=Date.now(),base={category:'Fire',state:'Assam',createdAt:new Date(now).toISOString(),status:'Received by control room',injuryLevel:'None'};assert.equal(groupReports([{...base,id:'1',district:'Dibrugarh'},{...base,id:'2',district:'Tinsukia'}],now).length,2)});
test('false and older reports are excluded from active groups',()=>{const now=Date.now(),base={category:'Fire',state:'Assam',district:'Dibrugarh',injuryLevel:'None'};assert.equal(groupReports([{...base,id:'1',createdAt:new Date(now).toISOString(),status:'Marked false'},{...base,id:'2',createdAt:new Date(now-20*60000).toISOString(),status:'Received'}],now).length,0)});

// Section 3 & 4 tests
test('classifyThreatPriority assigns HIGH priority to gunshots, explosions, and soldier tactical bursts', () => {
  const gunshot = classifyThreatPriority({ category: 'Gunshot-like sound', details: 'Rounds fired near fence' });
  assert.equal(gunshot.priority, PRIORITY_LEVELS.HIGH);
  assert.equal(gunshot.reviewRequired, true);
  assert.match(gunshot.reason, /weapon discharge|gunfire/i);

  const explosion = classifyThreatPriority({ category: 'Explosion-like sound', details: 'Loud mortar shell impact' });
  assert.equal(explosion.priority, PRIORITY_LEVELS.HIGH);

  const soldier = classifyThreatPriority({ category: 'Border-area emergency', source: 'soldier_tactical_transponder' });
  assert.equal(soldier.priority, PRIORITY_LEVELS.HIGH);
  assert.match(soldier.reason, /frontline military/i);
});

test('classifyThreatPriority assigns MEDIUM priority to suspicious perimeter activity and fires', () => {
  const suspicious = classifyThreatPriority({ category: 'Suspicious activity', details: 'Drone hovering along ridge' });
  assert.equal(suspicious.priority, PRIORITY_LEVELS.MEDIUM);
  assert.equal(suspicious.reviewRequired, true);

  const fire = classifyThreatPriority({ category: 'Fire', details: 'Brush fire along perimeter wire' });
  assert.equal(fire.priority, PRIORITY_LEVELS.MEDIUM);
});

test('classifyThreatPriority assigns LOW priority to non-hostile environmental and weather events', () => {
  const flood = classifyThreatPriority({ category: 'Flood / Landslide', details: 'River water level rising' });
  assert.equal(flood.priority, PRIORITY_LEVELS.LOW);
  assert.equal(flood.reviewRequired, false);
});

test('detectDuplicateReport identifies repeat submissions without deleting records', () => {
  const now = Date.now();
  const existing = [
    {
      id: 'rpt-existing-1',
      userId: 'user-42',
      state: 'Jammu And Kashmir',
      district: 'Kupwara',
      category: 'Gunshot-like sound',
      details: 'Automatic gunfire heard near border',
      createdAt: new Date(now - 4 * 60000).toISOString()
    }
  ];

  // Repeat submission from same user in same sector within 15 min
  const dupCheck1 = detectDuplicateReport({
    id: 'rpt-new-1',
    userId: 'user-42',
    state: 'Jammu And Kashmir',
    district: 'Kupwara',
    category: 'Gunshot-like sound',
    details: 'Another report from me',
    createdAt: new Date(now).toISOString()
  }, existing);

  assert.equal(dupCheck1.isDuplicate, true);
  assert.equal(dupCheck1.primaryReportId, 'rpt-existing-1');

  // Independent report from different user with different text -> NOT a duplicate
  const independent = detectDuplicateReport({
    id: 'rpt-independent-2',
    userId: 'user-99',
    state: 'Jammu And Kashmir',
    district: 'Kupwara',
    category: 'Gunshot-like sound',
    details: 'Different witness account from eastern orchard',
    createdAt: new Date(now).toISOString()
  }, existing);

  assert.equal(independent.isDuplicate, false);
});

// Section 5 tests: On-device ML acoustic inference verification
test('on-device ML classifier produces genuine gunshot classification from acoustic transient', async () => {
  const { createRequire } = await import('node:module');
  const require = createRequire(import.meta.url);
  const classifier = require('../public/ondevice-classifier.js');

  const gunshotWave = classifier.createSyntheticWaveform('gunshot');
  const result = classifier.analyzeAudioSignal(gunshotWave);

  assert.equal(result.status, 'classified');
  assert.equal(result.category, 'Gunshot-like sound');
  assert.equal(result.priority, 'HIGH');
  assert.ok(result.confidence >= 0.70, `Expected confidence >= 0.70, got ${result.confidence}`);
  assert.ok(result.features.crestFactorDb > 12.0, `Expected crest factor > 12dB, got ${result.features.crestFactorDb}`);
  assert.ok(result.features.riseTimeMs < 15.0, `Expected rise time < 15ms, got ${result.features.riseTimeMs}`);
  assert.equal(result.quality, 'adequate');
});

test('on-device ML classifier handles low SNR and ambient silence without fabricating gunshot detection', async () => {
  const { createRequire } = await import('node:module');
  const require = createRequire(import.meta.url);
  const classifier = require('../public/ondevice-classifier.js');

  const silenceWave = new Float32Array(44100); // Complete silence
  const result = classifier.analyzeAudioSignal(silenceWave);

  assert.equal(result.status, 'low_signal');
  assert.equal(result.quality, 'low_snr');
  assert.notEqual(result.category, 'Gunshot-like sound');
  assert.equal(result.priority, 'LOW');
  assert.equal(result.reviewRequired, true);
});

test('recommendAgency assigns differentiated, category-specific defense and response agencies', () => {
  assert.match(recommendAgency('Gunshot-like sound', 'None'), /Border Security Force|Army Tactical Unit/i);
  assert.match(recommendAgency('Explosion-like sound', 'None'), /Bomb Disposal Squad/i);
  assert.match(recommendAgency('Border-area emergency', 'None'), /Frontier Defence Command/i);
  assert.match(recommendAgency('Suspicious activity', 'None'), /Border Intelligence/i);
  assert.match(recommendAgency('Fire', 'None'), /Fire & Emergency Rescue/i);
  assert.match(recommendAgency('Flood', 'None'), /National Disaster Response Force/i);
  assert.match(recommendAgency('Landslide', 'None'), /Border Roads Organisation/i);
  assert.match(recommendAgency('Violence or attack', 'None'), /Armed Police Battalions/i);
  assert.match(recommendAgency('Medical emergency', 'None'), /Military Field Hospital/i);
  assert.match(recommendAgency('Gunshot-like sound', 'Critical'), /Military Field Hospital & Emergency Ambulance/i);
});
