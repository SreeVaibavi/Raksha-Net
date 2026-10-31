const D=[[0,1,2,3,4,5,6,7,8,9],[1,2,3,4,0,6,7,8,9,5],[2,3,4,0,1,7,8,9,5,6],[3,4,0,1,2,8,9,5,6,7],[4,0,1,2,3,9,5,6,7,8],[5,9,8,7,6,0,4,3,2,1],[6,5,9,8,7,1,0,4,3,2],[7,6,5,9,8,2,1,0,4,3],[8,7,6,5,9,3,2,1,0,4],[9,8,7,6,5,4,3,2,1,0]];
const P=[[0,1,2,3,4,5,6,7,8,9],[1,5,7,6,2,8,3,0,9,4],[5,8,0,3,7,9,6,1,4,2],[8,9,1,6,0,4,3,5,2,7],[9,4,5,3,1,2,6,8,7,0],[4,2,8,6,5,7,3,9,0,1],[2,7,9,3,8,0,6,4,1,5],[7,0,4,6,9,1,3,2,5,8]];

export function verifyVerhoeff(input){
  const s=String(input||'').replace(/\s/g,'');
  if(!/^\d{12}$/.test(s))return false;
  let c=0;
  const a=s.split('').reverse().map(Number);
  for(let i=0;i<a.length;i++)c=D[c][P[i%8][a[i]]];
  return c===0;
}

const disposable=new Set(['mailinator.com','tempmail.com','10minutemail.com','guerrillamail.com','yopmail.com','example.com','example.org','test.com']);

export function validateSignup(x){
  const name=String(x.fullName||'').trim(),aadhaar=String(x.aadhaar||'').trim(),mobile=String(x.mobile||'').replace(/[\s()-]/g,''),email=String(x.email||'').trim().toLowerCase(),password=String(x.password||'');
  if(name.length<2||name.length>100)return{ok:false,error:'Enter your full name'};
  if(!verifyVerhoeff(aadhaar))return{ok:false,error:'Aadhaar number must be 12 digits with a valid Verhoeff checksum'};
  if(!/^\+?[1-9]\d{7,14}$/.test(mobile))return{ok:false,error:'Enter a valid mobile number with country code'};
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return{ok:false,error:'Enter a valid email address'};
  if(disposable.has(email.split('@')[1]))return{ok:false,error:'Disposable email addresses are not accepted'};
  if(password.length<10||!/[A-Z]/.test(password)||!/[a-z]/.test(password)||!/[0-9]/.test(password)||!/[\W_]/.test(password))return{ok:false,error:'Use 10+ characters with uppercase, lowercase, number and symbol'};
  if(password!==String(x.confirmPassword||''))return{ok:false,error:'Passwords do not match'};
  return{ok:true};
}

export function clusterLevel(n,injury=false,evidence=false,verified=false){
  if(verified)return'Critical - Officer Verified';
  if(n>=5)return'High Priority Cluster (12→1 Deduplicated)';
  if(n>=3&&(injury||evidence))return'Level 3 - Tactical Review Priority';
  if(n>=2)return'Level 2 - Multi-Source Corroborated';
  return'Level 1 - Unverified Field Report';
}

export function calculateTrustScore(count, hasInjury, hasEvidence, verified, isRecent){
  if(verified) return 99;
  let score = 52;
  if(count >= 10) score += 34;
  else if(count >= 5) score += 26;
  else if(count >= 2) score += 18;
  if(hasInjury) score += 7;
  if(hasEvidence) score += 8;
  if(isRecent) score += 5;
  return Math.min(96, Math.max(35, score));
}

export function recommendAgency(category, injuryLevel){
  // Immediate medical & casualty evacuation
  if(['Serious','Critical'].includes(injuryLevel) || category === 'Medical emergency'){
    return 'Military Field Hospital & Emergency Ambulance (Dial 108)';
  }
  if(category === 'Gunshot-like sound'){
    return 'Border Security Force (BSF) & Army Tactical Unit';
  }
  if(category === 'Explosion-like sound'){
    return 'Military Bomb Disposal Squad (BDDS) & Artillery Surveillance';
  }
  if(category === 'Border-area emergency'){
    return 'Frontier Defence Command & Army Forward Detachment';
  }
  if(category === 'Suspicious unattended object'){
    return 'Bomb Detection & Disposal Squad (BDDS)';
  }
  if(category === 'Suspicious activity'){
    return 'Border Intelligence & Sector Reconnaissance Patrol';
  }
  if(category === 'Violence or attack'){
    return 'Armed Police Battalions & Law Enforcement Taskforce (Dial 100)';
  }
  if(category === 'Fire'){
    return 'Fire & Emergency Rescue Services (Dial 101)';
  }
  if(category === 'Flood'){
    return 'National Disaster Response Force (NDRF / SDRF Flood Unit)';
  }
  if(category === 'Landslide'){
    return 'Border Roads Organisation (BRO) & Disaster Taskforce (Dial 1077)';
  }
  if(category === 'Stranded citizens'){
    return 'Civil Defence Corps & High-Altitude Rescue Detachment';
  }
  if(category === 'Road blockage'){
    return 'Border Roads Organisation (BRO) & Highway Patrol';
  }
  if(category === 'Missing person'){
    return 'Sector Search & Rescue Detachment (SAR) & Frontier Police (Dial 100)';
  }
  if(category === 'Protest or crowd panic'){
    return 'District Executive Magistrate & Civil Law Enforcement (Dial 100)';
  }
  if(category === 'Unsafe route'){
    return 'Frontier Traffic Control & Route Reconnaissance Patrol';
  }
  return 'District Emergency Control Room (Dial 1077 / 100)';
}

export function groupReports(reports,now=Date.now()){
  const cutoff=now-15*60_000,groups=new Map();
  for(const r of reports){
    if(Date.parse(r.createdAt)<cutoff||r.status==='Marked false')continue;
    const key=[r.category,r.state,r.district].join('|');
    if(!groups.has(key))groups.set(key,[]);
    groups.get(key).push(r);
  }
  return [...groups.values()].map(g=>{
    const verified = g.some(x=>x.verified);
    const hasInjury = g.some(x=>x.injuryLevel!=='None');
    const hasEvidence = g.some(x=>x.hasEvidence);
    const count = g.length;
    const firstAt = g.at(-1).createdAt;
    const lastAt = g[0].createdAt;
    const timeSpanMin = Math.max(1, Math.round((new Date(lastAt) - new Date(firstAt))/60000));
    const trustScore = calculateTrustScore(count, hasInjury, hasEvidence, verified, true);
    const assignedAgency = recommendAgency(g[0].category, g.find(x=>x.injuryLevel!=='None')?.injuryLevel || 'None');
    
    return {
      id: g.map(x=>x.id).join(','),
      category: g[0].category,
      state: g[0].state,
      district: g[0].district,
      lat: g[0].lat,
      lon: g[0].lon,
      count,
      timeSpanMin,
      firstAt,
      lastAt,
      trustScore,
      trustLabel: trustScore >= 80 ? 'High Confidence' : trustScore >= 60 ? 'Medium Confidence' : 'Uncorroborated',
      confidenceLabel: count > 1 
        ? `${count} reports merged (${timeSpanMin} min window) · ${trustScore}% Trust Score`
        : 'Single report · Awaiting nearby corroboration',
      level: clusterLevel(count, hasInjury, hasEvidence, verified),
      stage: g.every(x=>x.status==='Resolved') ? 'Resolved' 
           : verified ? 'Officer Verified' 
           : count >= 2 ? 'Multi-Report Clustered' 
           : 'Reported',
      assignedAgency,
      reportIds: g.map(x=>x.id),
      totalInjuries: g.filter(x=>['Minor','Serious','Critical'].includes(x.injuryLevel)).length,
      totalAffected: g.reduce((sum,x)=>sum + (Number(x.affectedCount)||1), 0),
      reports: g.map(r=>({
        id: r.id,
        userName: r.userName,
        createdAt: r.createdAt,
        details: r.details,
        injuryLevel: r.injuryLevel,
        status: r.status,
        verified: r.verified
      }))
    };
  });
}

export const CONFIDENCE_THRESHOLDS = {
  HIGH_CONFIDENCE: 0.85,
  MEDIUM_CONFIDENCE: 0.60,
  REVIEW_REQUIRED: 0.50
};

export const PRIORITY_LEVELS = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
};

/**
 * Centralized Threat-Priority Classification (Section 3).
 * Evaluates incident category, notes, evidence, source, and casualty level.
 * High priority indicates prompt review needed; does NOT imply pre-verification.
 */
export function classifyThreatPriority(incident) {
  if (!incident) {
    return { priority: 'LOW', reason: 'Unspecified submission', reviewRequired: true };
  }

  const cat = String(incident.category || '').toLowerCase();
  const title = String(incident.title || '').toLowerCase();
  const details = String(incident.details || '').toLowerCase();
  const source = String(incident.source || '').toLowerCase();
  const injury = String(incident.injuryLevel || '').toLowerCase();
  const ml = incident.mlInference || null;

  // 1. HIGH PRIORITY:
  // - Gunshot detections or credible reports of active gunfire
  // - Explosions, mortar, artillery, shelling
  // - Armed infiltration / ambush / violence
  // - Frontline soldier tactical transponder distress
  // - Critical life-threatening injuries
  // - On-device ML acoustic gunfire match with >=0.75 confidence
  const isGunfire = cat.includes('gunshot') || title.includes('gunshot') || details.includes('gunshot') || details.includes('gunfire') || details.includes('firing');
  const isExplosion = cat.includes('explosion') || title.includes('explosion') || details.includes('blast') || details.includes('shelling') || details.includes('artillery') || details.includes('mortar');
  const isAmbushOrViolence = cat.includes('violence') || title.includes('ambush') || details.includes('ambush') || details.includes('attack');
  const isSoldierDistress = source.includes('soldier') || source.includes('tactical');
  const isCriticalCasualty = injury === 'critical';
  const isHighMlGunshot = Boolean(ml && ml.confidence >= 0.75 && (String(ml.category).toLowerCase().includes('gunshot') || String(ml.category).toLowerCase().includes('explosion')));

  if (isGunfire || isExplosion || isAmbushOrViolence || isSoldierDistress || isCriticalCasualty || isHighMlGunshot) {
    let reason = 'Acoustic / visual gunfire detection or critical threat indicator';
    if (isSoldierDistress) {
      reason = 'Frontline military unit tactical distress burst (high operational priority)';
    } else if (isHighMlGunshot) {
      reason = `On-device acoustic transient classifier detected high-energy impulse (${Math.round((ml.confidence || 0) * 100)}% signature fit)`;
    } else if (isGunfire) {
      reason = 'Credible report of active weapon discharge / gunfire in frontier sector';
    } else if (isExplosion) {
      reason = 'Acoustic / visual blast detonation or heavy ordnance indicator';
    } else if (isCriticalCasualty) {
      reason = 'Critical life-threatening casualty reported in border zone';
    }

    return {
      priority: PRIORITY_LEVELS.HIGH,
      reason,
      reviewRequired: true
    };
  }

  // 2. MEDIUM PRIORITY:
  // - Suspicious activity warranting investigation (perimeter intrusion, drone, unattended object)
  // - Border-area emergency without confirmed weapon fire
  // - Munition fire / brush hazard
  // - Serious or minor injuries
  const isSuspicious = cat.includes('suspicious') || title.includes('suspicious') || details.includes('drone') || details.includes('perimeter') || details.includes('intrusion') || details.includes('unattended');
  const isBorderEmergency = cat.includes('border-area emergency');
  const isFireHazard = cat.includes('fire');
  const isInjured = injury === 'serious' || injury === 'minor';

  if (isSuspicious || isBorderEmergency || isFireHazard || isInjured) {
    let reason = 'Unverified frontier activity or perimeter hazard requiring investigation patrol';
    if (isSuspicious) reason = 'Suspicious perimeter movement or drone sighting reported near boundary';
    else if (isFireHazard) reason = 'Fire hazard or munition combustion risk approaching settlements';
    else if (isInjured) reason = 'Civilian casualty requiring medical response coordination';

    return {
      priority: PRIORITY_LEVELS.MEDIUM,
      reason,
      reviewRequired: true
    };
  }

  // 3. LOW PRIORITY:
  // - Other reported activities (floods, landslides, general environmental alerts, administrative inquiries)
  return {
    priority: PRIORITY_LEVELS.LOW,
    reason: 'Civilian non-hostile report (environmental, weather hazard, or routine inquiry)',
    reviewRequired: false
  };
}

/**
 * False-Positive & Duplicate Detection (Section 4).
 * Identifies duplicate submissions in same sector without deleting the record.
 */
export function detectDuplicateReport(newReport, existingReports = [], timeWindowMs = 15 * 60 * 1000) {
  if (!newReport || !Array.isArray(existingReports)) {
    return { isDuplicate: false, primaryReportId: null, reason: null };
  }

  const newTime = new Date(newReport.createdAt || Date.now()).getTime();

  for (const r of existingReports) {
    if (r.id === newReport.id) continue;
    const rTime = new Date(r.createdAt).getTime();
    if (Math.abs(newTime - rTime) > timeWindowMs) continue;

    // Must match sector and category
    const sameSector = r.district === newReport.district && r.state === newReport.state;
    const sameCat = r.category === newReport.category;

    if (sameSector && sameCat) {
      // Condition A: Same user ID within 15 min window
      if (newReport.userId && r.userId === newReport.userId) {
        return {
          isDuplicate: true,
          primaryReportId: r.id,
          reason: `Repeat submission from same reporter in ${r.district} sector within 15 minutes (Ref #${r.id.slice(0, 8)})`
        };
      }

      // Condition B: Identical detail text within 5 min window
      const textA = String(r.details || '').trim();
      const textB = String(newReport.details || '').trim();
      if (textA && textA === textB && Math.abs(newTime - rTime) <= 5 * 60 * 1000) {
        return {
          isDuplicate: true,
          primaryReportId: r.id,
          reason: `Identical text submitted in ${r.district} sector within 5 minutes (Ref #${r.id.slice(0, 8)})`
        };
      }
    }
  }

  return { isDuplicate: false, primaryReportId: null, reason: null };
}
