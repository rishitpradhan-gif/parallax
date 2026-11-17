import * as sat from 'satellite.js';
export const IDS=[25544,25994,27424,39084,49260,40697,42063,60989,39634];
export function validateElements(raw){
 if(!Array.isArray(raw)||!raw.length||raw.length>100)throw Error('Use 1–100 OMM JSON records.');const seen=new Set();
 return raw.map(r=>{if(!r||typeof r.OBJECT_NAME!=='string'||!r.OBJECT_NAME.trim()||r.OBJECT_NAME.length>100)throw Error('Each spacecraft needs a name.');
 const limits={NORAD_CAT_ID:[1,999999999],MEAN_MOTION:[.1,20],ECCENTRICITY:[0,.99],INCLINATION:[0,180],RA_OF_ASC_NODE:[0,360],ARG_OF_PERICENTER:[0,360],MEAN_ANOMALY:[0,360],BSTAR:[-10,10],MEAN_MOTION_DOT:[-10,10],MEAN_MOTION_DDOT:[-10,10]};
 for(const [key,[lo,hi]] of Object.entries(limits))if(typeof r[key]!=='number'||!Number.isFinite(r[key])||r[key]<lo||r[key]>hi)throw Error(`Invalid OMM field: ${key}.`);
 if(!Number.isSafeInteger(r.NORAD_CAT_ID)||seen.has(r.NORAD_CAT_ID))throw Error('Catalog IDs must be unique integers.');seen.add(r.NORAD_CAT_ID);
 if(typeof r.EPOCH!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/.test(r.EPOCH)||!Number.isFinite(+epochDate(r)))throw Error('Invalid UTC element epoch.');
 for(const [key,value] of [['CENTER_NAME','EARTH'],['REF_FRAME','TEME'],['TIME_SYSTEM','UTC'],['MEAN_ELEMENT_THEORY','SGP4']])if(r[key]!==undefined&&r[key]!==value)throw Error(`Unsupported ${key}.`);
 return structuredClone(r);});
}
export const epochDate=r=>new Date(r.EPOCH.endsWith('Z')?r.EPOCH:r.EPOCH+'Z');
export function lookAt(rec,date,lat,lon){const pv=sat.propagate(rec,date);if(!pv||!pv.position||rec.error)throw Error('Orbit could not be propagated.');const ecf=sat.eciToEcf(pv.position,sat.gstime(date));const look=sat.ecfToLookAngles({latitude:lat*Math.PI/180,longitude:lon*Math.PI/180,height:0},ecf);const geo=sat.eciToGeodetic(pv.position,sat.gstime(date));return {elevation:look.elevation*180/Math.PI,azimuth:look.azimuth*180/Math.PI,range:look.rangeSat,latitude:geo.latitude*180/Math.PI,longitude:geo.longitude*180/Math.PI,height:geo.height};}
export function calculate(raw,{lat,lon,start,threshold=10,step=10,hours=24,refine=true}={}){
 const elements=validateElements(raw);start=new Date(start);if(!Number.isFinite(+start)||!Number.isFinite(lat)||lat< -90||lat>90||!Number.isFinite(lon)||lon< -180||lon>180||!Number.isFinite(threshold)||threshold<1||threshold>80||![2,10,30].includes(step)||hours!==24)throw Error('Invalid location, date, elevation, or sample interval.');
 const rows=[],excluded=[];
 function finish(pass,rec){if(refine){let a=Math.max(+new Date(pass.start),+new Date(pass.peak_time)-step*1000),b=Math.min(+new Date(pass.end),+new Date(pass.peak_time)+step*1000);for(let i=0;i<26&&b-a>10;i++){const c=a+(b-a)/3,d=b-(b-a)/3;if(lookAt(rec,new Date(c),lat,lon).elevation<lookAt(rec,new Date(d),lat,lon).elevation)a=c;else b=d;}const ms=Math.round((a+b)/2),point=lookAt(rec,new Date(ms),lat,lon);if(point.elevation>pass.peak)Object.assign(pass,{peak:point.elevation,peak_time:new Date(ms).toISOString(),az:point.azimuth,range:point.range});}rows.push(pass);}
const end=+start+hours*3600000;
 for(const record of elements){const epoch=epochDate(record);if(Math.max(Math.abs(+start-epoch),Math.abs(end-epoch))>7*86400000){excluded.push({id:record.NORAD_CAT_ID,reason:'Outside seven-day element freshness window'});continue;}
 const rec=sat.json2satrec(record);let pass=null,failed=false;
 try{for(let ms=+start;ms<=end;ms+=step*1000){const point=lookAt(rec,new Date(ms),lat,lon);if(point.elevation>=threshold){if(!pass)pass={name:record.OBJECT_NAME,id:record.NORAD_CAT_ID,epoch:epoch.toISOString(),start:new Date(ms).toISOString(),end:new Date(ms).toISOString(),peak:point.elevation,peak_time:new Date(ms).toISOString(),az:point.azimuth,range:point.range,clipped_start:ms===+start,clipped_end:false};pass.end=new Date(ms).toISOString();if(point.elevation>pass.peak)Object.assign(pass,{peak:point.elevation,peak_time:new Date(ms).toISOString(),az:point.azimuth,range:point.range});}else if(pass){finish(pass,rec);pass=null;}}}catch{failed=true;excluded.push({id:record.NORAD_CAT_ID,reason:'Propagation failed; all passes for this spacecraft excluded'});}
 if(failed){for(let i=rows.length-1;i>=0;i--)if(rows[i].id===record.NORAD_CAT_ID)rows.splice(i,1);}else if(pass){pass.clipped_end=true;finish(pass,rec);}
 }
 rows.sort((a,b)=>a.start.localeCompare(b.start)||a.id-b.id);return {rows,excluded,settings:{lat,lon,start:start.toISOString(),threshold,step,hours,refine},scope:'Geometric access only. No cloud, terrain, illumination, sensor pointing, or acquisition guarantee.'};
}
export function groundTrack(record,peak){const rec=sat.json2satrec(record),points=[];for(let t=-45*60;t<=45*60;t+=60){const p=lookAt(rec,new Date(+new Date(peak)+t*1000),0,0);points.push([p.longitude,p.latitude]);}return points;}
export function csv(report){const keys=['name','id','epoch','start','end','peak_time','peak','az','range','clipped_start','clipped_end'];const quote=v=>'"'+String(v??'').replaceAll('"','""')+'"';return [keys.join(','),...report.rows.map(r=>keys.map(k=>quote(r[k])).join(','))].join('\r\n');}
