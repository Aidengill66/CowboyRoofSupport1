'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type SelectOption = { value: string; label: string };
const issues: SelectOption[] = [
  { value: 'planning', label: 'Planning ahead' },
  { value: 'leak', label: 'Active or recurring leak' },
  { value: 'storm', label: 'Wind or hail concern' },
  { value: 'wear', label: 'Widespread aging or wear' },
];
const priorities: SelectOption[] = [
  { value: 'value', label: 'Best overall value' },
  { value: 'storm', label: 'Storm resilience' },
  { value: 'longevity', label: 'Longest service life' },
  { value: 'design', label: 'Premium curb appeal' },
  { value: 'efficiency', label: 'Heat and energy performance' },
];

export default function RoofAdvisorPage() {
  const [age, setAge] = useState(17);
  const [issue, setIssue] = useState('planning');
  const [priority, setPriority] = useState('value');
  const [slope, setSlope] = useState('standard');
  const [attic, setAttic] = useState('hot');
  const [trees, setTrees] = useState('some');

  const advice = useMemo(() => {
    const replace = age >= 22 || issue === 'wear';
    let system = 'Class 4 impact-rated architectural shingle';
    let profile = 'The North Atlanta all-rounder';
    let why = 'Strong value, dimensional curb appeal, and an impact-rated option for storm-conscious homeowners.';
    if (slope === 'low') {
      system = 'High-performance single-ply membrane';
      profile = 'The correct system for low slope';
      why = 'Low-slope areas need a continuous membrane selected around drainage, penetrations, and rooftop traffic—not conventional shingles.';
    } else if (priority === 'longevity' || priority === 'efficiency') {
      system = '24-gauge standing seam metal';
      profile = priority === 'efficiency' ? 'The heat-smart long-life system' : 'The long-haul system';
      why = 'Concealed fasteners, repairable panels, and finish options that can support a long service life when detailing and ventilation are correct.';
    } else if (priority === 'design') {
      system = 'Premium designer laminated shingle';
      profile = 'The high-definition roofline';
      why = 'A heavier dimensional profile gives custom homes a slate- or shake-inspired look without moving to natural stone or wood.';
    } else if (priority === 'storm') {
      system = 'Class 4 impact-rated laminated shingle';
      profile = 'The storm-forward shingle system';
      why = 'Impact resistance is only one layer; sealed valleys, correct flashing, edge metal, and attachment details complete the system.';
    }
    const action = issue === 'leak' ? 'Inspect promptly' : issue === 'storm' ? 'Document and inspect' : replace ? 'Plan replacement' : age >= 15 ? 'Inspect and budget' : 'Maintain and monitor';
    const ventilation = attic === 'hot' ? 'Measure intake and exhaust as one balanced system; do not add exhaust without confirming intake.' : attic === 'moisture' ? 'Inspect bath exhaust routing, air sealing, insulation, and roof ventilation before replacing materials.' : 'Confirm net-free ventilation area and keep the existing balance if field measurements support it.';
    const water = trees === 'heavy' ? 'Use self-adhered protection at valleys, eaves, penetrations, and debris-prone transitions; build a maintenance plan for valleys and gutters.' : 'Use self-adhered protection at valleys, eaves, penetrations, and vulnerable transitions—not as a substitute for correct flashing.';
    return { replace, system, profile, why, action, ventilation, water };
  }, [age, issue, priority, slope, attic, trees]);

  return <main className="advisor-page">
    <section className="advisor-hero"><div className="shell"><div><p className="eyebrow light">COWBOY ROOF INTELLIGENCE</p><h1>Cowboy instinct.<br/><em>Roofer intelligence.</em></h1><p>Tell us how the roof is built, what it is doing, and what matters most. The advisor combines your six field inputs while Cowboy AI remembers details, handles common typos, and routes deeper questions through a curated North Atlanta roofing knowledge base.</p></div><div className="advisor-badge intelligence-badge"><img src="/cowboy-roof-logo-v2-256.png" alt="Cowboy Roof Support hat, roof, and boots emblem"/><span>NO EXTERNAL API</span><small>CURATED ROOF LOGIC<br/>PRIVATE SESSION</small></div></div></section>
    <section className="advisor-protocol shell" aria-label="Advisor accuracy protocol">
      <header><p className="eyebrow">HOW IT STAYS ACCURATE</p><h2>Smart enough to help.<br/>Honest enough to stop.</h2><p>This prototype does not pretend it can see the roof, current weather, codes, policy coverage, or live schedules. It organizes the decision, explains the system, and sends field-only questions to an inspection.</p></header>
      <div>
        <article><span>01</span><small>SAFETY GATE</small><h3>Danger comes first.</h3><p>Sagging ceilings, water near electricity, active leaks, and storm hazards override sales routing.</p></article>
        <article><span>02</span><small>CONTEXT MEMORY</small><h3>Each answer gets sharper.</h3><p>Roof age, symptom, property type, material, city, and priorities stay in the current private chat.</p></article>
        <article><span>03</span><small>FIELD TRUTH</small><h3>No fake certainty.</h3><p>Diagnosis, price, code, coverage, and final scope remain clearly marked for field or professional verification.</p></article>
      </div>
    </section>
    <section className="advisor-workbench shell">
      <div className="advisor-controls"><div className="advisor-heading"><span>01</span><div><small>TELL US ABOUT THE ROOF</small><h2>Field questions first.</h2></div></div>
        <label className="advisor-age"><span>APPROXIMATE ROOF AGE <b>{age} YEARS</b></span><input type="range" min="0" max="35" value={age} onChange={(e)=>setAge(Number(e.target.value))}/><i><small>NEW</small><small>PLAN AHEAD</small><small>REPLACEMENT RANGE</small></i></label>
        <label>WHAT ARE YOU SEEING?<select value={issue} onChange={(e)=>setIssue(e.target.value)}>{issues.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></label>
        <label>YOUR TOP PRIORITY<select value={priority} onChange={(e)=>setPriority(e.target.value)}>{priorities.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></label>
        <div className="advisor-choice"><span>ROOF SLOPE</span><div>{[['standard','Standard'],['steep','Steep'],['low','Low slope']].map(x=><button className={slope===x[0]?'selected':''} key={x[0]} onClick={()=>setSlope(x[0])}>{x[1]}</button>)}</div></div>
        <div className="advisor-choice"><span>ATTIC SIGNAL</span><div>{[['clear','No known issue'],['hot','Runs very hot'],['moisture','Moisture / odor']].map(x=><button className={attic===x[0]?'selected':''} key={x[0]} onClick={()=>setAttic(x[0])}>{x[1]}</button>)}</div></div>
        <div className="advisor-choice"><span>TREE COVER</span><div>{[['open','Open sun'],['some','Some trees'],['heavy','Heavy canopy']].map(x=><button className={trees===x[0]?'selected':''} key={x[0]} onClick={()=>setTrees(x[0])}>{x[1]}</button>)}</div></div>
      </div>
      <div className="advisor-result"><div className="result-top"><span>LIVE ROOFER READOUT</span><b>{advice.action.toUpperCase()}</b></div><div className="result-main"><small>PRIMARY SYSTEM MATCH</small><h2>{advice.system}</h2><strong>{advice.profile}</strong><p>{advice.why}</p></div><div className="result-call"><span><small>LIKELY PATH</small>{advice.replace ? 'Replacement planning' : 'Inspection-led maintenance'}</span><span><small>CLIMATE EMPHASIS</small>Heat · wind · hard rain</span></div><div className="result-actions"><Link href="/customize">BUILD THIS SYSTEM →</Link><Link href="/free-inspection">BOOK A FREE INSPECTION</Link></div><small className="result-note">This is a planning recommendation, not a diagnosis. Decking, flashing, code, ventilation, pitch, and damage must be verified on site.</small></div>
    </section>
    <section className="assembly-section"><div className="shell"><div className="assembly-copy"><p className="eyebrow light">02 / THE COMPLETE ASSEMBLY</p><h2>The best material fails in the wrong system.</h2><p>Expert roofing means treating every layer and transition as part of one water, heat, and wind-management assembly.</p></div><div className="assembly-stack">{[
      ['06','FINISH',advice.system],['05','FLASHING','Compatible metal at walls, chimneys, valleys, and kickouts'],['04','WATER BARRIER',advice.water],['03','UNDERLAYMENT',priority==='longevity'?'High-temperature synthetic selected for metal':'Premium synthetic underlayment'],['02','DECK + FASTENING','Field-verified deck, fastening pattern, edge metal, and manufacturer details'],['01','AIR + HEAT',advice.ventilation]
    ].map(x=><article key={x[0]}><span>{x[0]}</span><div><small>{x[1]}</small><p>{x[2]}</p></div></article>)}</div></div></section>
    <section className="material-lab shell"><div className="material-lab-head"><div><p className="eyebrow">03 / PREMIUM MATERIAL LAB</p><h2>“Best” depends on the roof.</h2></div><p>A smart recommendation matches material, slope, geometry, climate, maintenance expectations, and budget. These are premium starting specifications—not brand endorsements.</p></div><div className="expert-materials">{[
      ['BEST VALUE','Class 4 architectural shingle','Impact-rated option · algae-resistant granules · high-wind installation path','Most North Atlanta homes'],
      ['BEST DESIGN','Designer laminated shingle','Heavy dimensional profile · premium shadow lines · enhanced curb appeal','Custom and high-visibility homes'],
      ['LONGEST-LIFE PATH','24-ga standing seam metal','Concealed clips · mechanically seamed option · high-performance coating','Owners planning for decades'],
      ['LOW-SLOPE EXPERT','Premium single-ply membrane','Heat-welded seams · tapered drainage plan · penetration detailing','Porches, additions, and low-slope roofs']
    ].map((x,i)=><article key={x[0]}><span>0{i+1}</span><small>{x[0]}</small><h3>{x[1]}</h3><p>{x[2]}</p><b>BEST FOR: {x[3]}</b></article>)}</div><div className="material-rule"><b>THE COWBOY RULE</b><p>Never choose a roof from the shingle sample alone. Choose the assembly, the installer, the details, and the maintenance plan.</p></div></section>
    <section className="red-flag-section"><div className="shell"><div><p className="eyebrow light">04 / EXPERT RED FLAGS</p><h2>Five details we refuse to gloss over.</h2></div><ol><li><b>Reusing tired flashing</b><span>Transitions often fail before the field material.</span></li><li><b>Ventilation by guesswork</b><span>More exhaust is not automatically better.</span></li><li><b>No decking allowance</b><span>The deck condition is fully visible only after tear-off.</span></li><li><b>One material on every slope</b><span>Low-slope areas require a roof designed for low-slope drainage.</span></li><li><b>A warranty without a system</b><span>Coverage depends on products, installation, ventilation, and documentation.</span></li></ol></div></section>
    <section className="advisor-final"><p className="eyebrow">FROM SMART PLAN TO FIELD TRUTH</p><h2>Let the roof tell us<br/>what it needs.</h2><div><Link className="primary" href="/free-inspection">START WITH A FREE INSPECTION →</Link><Link className="text-link" href="/guides">READ THE EASY GUIDES</Link></div></section>
  </main>;
}
