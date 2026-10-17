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
  if(['Gunshot-like sound','Explosion-like sound','Violence or attack','Suspicious activity','Border-area emergency'].includes(category)){
    return 'Local Police Quick Reaction Team (QRT)';
  }
  if(['Medical emergency'].includes(category) || ['Serious','Critical'].includes(injuryLevel)){
    return 'Civilian Hospital & Emergency Medical Team';
  }
  if(['Fire','Flood','Landslide','Stranded citizens'].includes(category)){
    return 'Disaster Management & Rescue Taskforce';
  }
  return 'District Emergency Control Room (112)';
}

export function groupReports(reports,now=Date.now()){
  const cutoff=now-30*60_000,groups=new Map();
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
