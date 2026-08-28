'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CustomerProjectCenter } from '../components/CustomerProjectCenter';

type Mode = 'route' | 'schedule' | 'prepare' | 'status';

const needs = {
  leak: { label: 'ACTIVE LEAK', team: 'Repair inspection', step: 'Protect the interior and document the leak location.', response: 'Priority triage request', icon: '◆' },
  storm: { label: 'STORM DAMAGE', team: 'Storm documentation', step: 'Photograph conditions safely from the ground. Do not climb the roof.', response: 'Priority inspection request', icon: '↯' },
  replacement: { label: 'REPLACEMENT', team: 'Roof system advisor', step: 'Gather roof age, known repairs, and your material priorities.', response: 'Standard planning request', icon: '⌂' },
  maintenance: { label: 'MAINTENANCE', team: 'Roof health review', step: 'Note drainage, tree cover, attic concerns, and visible wear.', response: 'Routine inspection request', icon: '◎' },
  commercial: { label: 'LARGE PROPERTY', team: 'Commercial capability team', step: 'Prepare roof access, occupancy, safety, and scheduling constraints.', response: 'Capability review request', icon: '▦' },
};

const cities = [
  ['Alpharetta','CORE SERVICE AREA'],['Roswell','CORE SERVICE AREA'],['Milton','CORE SERVICE AREA'],['Johns Creek','CORE SERVICE AREA'],['Cumming','CORE SERVICE AREA'],['Woodstock','CORE SERVICE AREA'],['Canton','CORE SERVICE AREA'],
  ['Sandy Springs','EXTENDED NORTH ATLANTA'],['Dunwoody','EXTENDED NORTH ATLANTA'],['Marietta','EXTENDED NORTH ATLANTA'],['Suwanee','EXTENDED NORTH ATLANTA'],['Other','CREW CONFIRMATION NEEDED'],
];

const prepItems = [
  ['Clear the driveway','Move vehicles, trailers, and fragile items away from the work and ladder areas.'],
  ['Secure pets and gates','Keep pets inside and tell the crew about gates, animals, pools, or access restrictions.'],
  ['Mark sensitive landscaping','Point out irrigation, lighting, gardens, septic areas, and anything that needs extra protection.'],
  ['Prepare attic access','If interior or ventilation review is needed, make the attic entrance reachable and identify moisture areas.'],
  ['Save roof information','Collect prior invoices, warranty documents, insurer correspondence, and known repair history.'],
  ['Choose one decision-maker','Identify who can approve selections, scope questions, and documented changes.'],
];

const stages = [
  ['REQUEST RECEIVED','Project brief organized','Crew reviews need, location, timing, and requested system.'],
  ['INSPECTION','Conditions documented','Photos, measurements, access, layers, drainage, flashing, deck signals, and ventilation.'],
  ['SCOPE + OPTIONS','One clear proposal','System, price, allowances, exclusions, upgrades, schedule assumptions, and warranties.'],
  ['APPROVED','Selections locked','Contract, colors, materials, permit responsibility, deposit, and contact preferences.'],
  ['BUILD','Quality checkpoints active','Protection, tear-off, deck review, water control, flashing, ventilation, cleanup, and photos.'],
  ['CLOSEOUT','Final packet delivered','Final walkthrough, invoice, warranty records, photos, and promised closeout documents.'],
];

export default function ProjectCenterPage() {
  const [mode, setMode] = useState<Mode>('route');
  const [need, setNeed] = useState<keyof typeof needs>('replacement');
  const [property, setProperty] = useState('home');
  const [city, setCity] = useState('Alpharetta');
  const [timing, setTiming] = useState('Planning ahead');
  const [day, setDay] = useState(1);
  const [window, setWindow] = useState('Morning · 8–11');
  const [access, setAccess] = useState<string[]>([]);
  const [prep, setPrep] = useState<number[]>([]);
  const [stage, setStage] = useState(0);
  const [copied, setCopied] = useState(false);

  const days = useMemo(() => Array.from({ length: 6 }, (_, index) => {
    const date = new Date(); date.setDate(date.getDate() + index + 1);
    return { long: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }), short: date.toLocaleDateString('en-US', { weekday: 'short' }), date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
  }), []);
  const selectedCity = cities.find((item) => item[0] === city)!;
  const activeNeed = needs[need];
  const brief = `Cowboy Roof Support inspection preference\nNeed: ${activeNeed.label}\nProperty: ${property}\nCity: ${city}\nTiming: ${timing}\nPreferred window: ${days[day].long}, ${window}\nAccess notes: ${access.length ? access.join(', ') : 'None selected'}\n\nThis is a requested window and needs crew confirmation.`;
  const toggleAccess = (item: string) => setAccess((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  const togglePrep = (index: number) => setPrep((current) => current.includes(index) ? current.filter((value) => value !== index) : [...current, index]);
  const copyBrief = async () => { await navigator.clipboard.writeText(brief); setCopied(true); };

  return <main className="command-page">
    <section className="command-intro"><div className="shell"><div><p className="eyebrow light">COWBOY ROOF COMMAND CENTER</p><h1>One place.<br/><em>Every next step.</em></h1><p>Route the job, check the service area, request an inspection window, prepare the property, or understand exactly where a project stands.</p></div><aside><i/><span><small>SYSTEM</small>READY</span><span><small>REGION</small>NORTH ATLANTA</span><span><small>HANDOFFS</small>6 CONTROLLED STAGES</span></aside></div></section>

    <CustomerProjectCenter />

    <section id="command-workspace" className="command-app shell">
      <nav aria-label="Project center tools">{[
        ['route','ROUTE MY JOB','Find the right crew and next action'],['schedule','PLAN INSPECTION','Choose a preferred window'],['prepare','PREP PROPERTY','Build a visit-ready checklist'],['status','PROJECT PATH','Understand every stage'],
      ].map((item,index)=><button type="button" key={item[0]} className={mode===item[0]?'active':''} aria-pressed={mode===item[0]} onClick={()=>setMode(item[0] as Mode)}><small>0{index+1}</small><span><b>{item[1]}</b><i>{item[2]}</i></span><strong>→</strong></button>)}</nav>

      {mode==='route'&&<div className="route-tool command-panel"><header><p className="eyebrow">SMART JOB ROUTER</p><h2>Tell us the situation.</h2><span>Four inputs create one useful path.</span></header><div className="router-layout"><div className="router-inputs"><fieldset><legend>01 / WHAT IS HAPPENING?</legend><div className="command-option-grid">{(Object.keys(needs) as (keyof typeof needs)[]).map(key=><button type="button" key={key} className={need===key?'selected':''} onClick={()=>setNeed(key)}><i>{needs[key].icon}</i><span>{needs[key].label}</span></button>)}</div></fieldset><fieldset><legend>02 / PROPERTY</legend><div className="segmented">{['home','townhome / HOA','commercial','multi-family'].map(item=><button type="button" key={item} className={property===item?'selected':''} onClick={()=>setProperty(item)}>{item}</button>)}</div></fieldset><div className="router-row"><label>03 / CITY<select value={city} onChange={(event)=>setCity(event.target.value)}>{cities.map(item=><option key={item[0]}>{item[0]}</option>)}</select></label><label>04 / TIMING<select value={timing} onChange={(event)=>setTiming(event.target.value)}><option>Active emergency</option><option>Within 7 days</option><option>Within 30 days</option><option>Planning ahead</option></select></label></div></div><aside className="route-result"><small>YOUR ROUTE</small><i>{activeNeed.icon}</i><h3>{activeNeed.team}</h3><p>{activeNeed.step}</p><div><span><small>SERVICE AREA</small><b>{selectedCity[1]}</b></span><span><small>QUEUE</small><b>{activeNeed.response}</b></span><span><small>PROPERTY</small><b>{property}</b></span></div><button type="button" onClick={()=>setMode('schedule')}>PLAN THE INSPECTION <span>→</span></button><p className="route-note">Routing is a planning result, not a guaranteed appointment or emergency-dispatch promise.</p></aside></div></div>}

      {mode==='schedule'&&<div className="schedule-tool command-panel"><header><p className="eyebrow">PREFERRED INSPECTION WINDOW</p><h2>Choose what works.</h2><span>The crew confirms availability before the window becomes an appointment.</span></header><div className="schedule-layout"><div><fieldset><legend>01 / PREFERRED DAY</legend><div className="day-grid">{days.map((item,index)=><button type="button" key={item.long} className={day===index?'selected':''} onClick={()=>setDay(index)}><small>{item.short}</small><b>{item.date}</b></button>)}</div></fieldset><fieldset><legend>02 / PREFERRED WINDOW</legend><div className="window-grid">{['Morning · 8–11','Midday · 11–2','Afternoon · 2–5','Flexible · crew choice'].map(item=><button type="button" key={item} className={window===item?'selected':''} onClick={()=>setWindow(item)}>{item}</button>)}</div></fieldset><fieldset><legend>03 / ACCESS NOTES</legend><div className="access-grid">{['Gated property','Pets on site','Attic access needed','Occupied business','HOA coordination','Steep / limited access'].map(item=><button type="button" key={item} className={access.includes(item)?'selected':''} onClick={()=>toggleAccess(item)}><i>{access.includes(item)?'✓':'+'}</i>{item}</button>)}</div></fieldset></div><aside className="schedule-brief"><small>REQUEST SUMMARY</small><h3>{days[day].long}</h3><b>{window}</b><pre>{brief}</pre><div><a href={`mailto:hello@cowboyroofsupport.com?subject=${encodeURIComponent(`${activeNeed.label} inspection preference`)}&body=${encodeURIComponent(brief)}`}>EMAIL REQUEST →</a><button type="button" onClick={copyBrief}>{copied?'COPIED ✓':'COPY BRIEF'}</button></div><p>Submitting a preference does not create a confirmed appointment. A real team member confirms the date, arrival window, and property access.</p></aside></div></div>}

      {mode==='prepare'&&<div className="prepare-tool command-panel"><header><p className="eyebrow">PROPERTY PREP</p><h2>Make the visit count.</h2><span>A little preparation means better access, better documentation, and fewer follow-up questions.</span></header><div className="prep-layout"><div className="prep-list">{prepItems.map((item,index)=><button type="button" key={item[0]} className={prep.includes(index)?'complete':''} onClick={()=>togglePrep(index)}><i>{prep.includes(index)?'✓':`0${index+1}`}</i><span><b>{item[0]}</b><small>{item[1]}</small></span><strong>{prep.includes(index)?'READY':'CHECK'}</strong></button>)}</div><aside><small>READINESS</small><strong>{Math.round(prep.length/prepItems.length*100)}<i>%</i></strong><div><span style={{height:`${prep.length/prepItems.length*100}%`}}/></div><h3>{prep.length===prepItems.length?'Ready for the crew.':prep.length>=3?'Halfway there.':'Start with access.'}</h3><p>{prep.length===prepItems.length?'You have covered the practical handoff points. Keep sensitive documents ready but do not send them through unsecured channels.':'Tap each completed item. Your progress stays only in this page session.'}</p><button type="button" onClick={()=>setPrep([])}>RESET CHECKLIST</button></aside></div></div>}

      {mode==='status'&&<div className="status-tool command-panel"><header><p className="eyebrow">PROJECT PATH</p><h2>Know where the job stands.</h2><span>Select a stage to see the customer deliverable and the crew&apos;s active work.</span></header><div className="status-layout"><div className="stage-rail">{stages.map((item,index)=><button type="button" key={item[0]} className={stage===index?'active':''} onClick={()=>setStage(index)}><i>{stage>index?'✓':`0${index+1}`}</i><span><b>{item[0]}</b><small>{item[1]}</small></span></button>)}</div><aside><small>STAGE 0{stage+1}</small><h3>{stages[stage][0]}</h3><b>{stages[stage][1]}</b><p>{stages[stage][2]}</p><div><span><small>CUSTOMER SHOULD HAVE</small>{['Request summary','Inspection findings','Written proposal','Signed selections','Progress updates','Closeout packet'][stage]}</span><span><small>NEXT CONTROL POINT</small>{['Confirmed visit','Scope decision','Approval or revision','Material + schedule confirmation','Final quality review','Warranty and record retention'][stage]}</span></div><Link href="/start">CONTACT THE PROJECT TEAM →</Link></aside></div></div>}
    </section>

    <section className="emergency-guide"><div className="shell"><div><p className="eyebrow light">ACTIVE WATER ENTRY?</p><h2>Protect people first.</h2><p>Stay off the roof. Avoid wet electrical fixtures and sagging ceilings. Move belongings only when safe, contain water, photograph interior conditions, and call emergency services when there is electrical, structural, fire, or life-safety danger.</p></div><div><span><small>01</small>KEEP PEOPLE AWAY</span><span><small>02</small>CONTAIN WATER SAFELY</span><span><small>03</small>DOCUMENT THE INTERIOR</span><span><small>04</small>REQUEST PRIORITY TRIAGE</span><Link href="/start">START AN URGENT REQUEST →</Link></div></div></section>

    <section className="command-final"><p className="eyebrow">NO RUNAROUND</p><h2>Right team.<br/>Right information.</h2><p>The Command Center turns a vague roofing problem into a crew-ready request without pretending a prototype is a confirmed booking system.</p><Link className="primary" href="/start">CREATE THE FULL PROJECT REQUEST <span>→</span></Link></section>
  </main>;
}
