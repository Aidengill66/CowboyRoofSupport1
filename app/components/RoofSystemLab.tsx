'use client';

import Link from 'next/link';
import { useState } from 'react';

type SystemKey = 'architectural' | 'designer' | 'metal' | 'membrane';
type PriorityKey = 'value' | 'storm' | 'design' | 'longevity' | 'low-slope';

const systems: Record<SystemKey, {
  name: string;
  eyebrow: string;
  range: string;
  service: string;
  pitch: string;
  fit: string;
  scores: [string, number][];
}> = {
  architectural: {
    name: 'Class 4 Architectural', eyebrow: 'THE NORTH ATLANTA ALL-ROUNDER', range: '$5.50–$7.50 / SQ FT', service: '25–30 YR PLANNING', pitch: '3:12+ SLOPE',
    fit: 'A strong home-first balance of curb appeal, impact resistance, availability, and practical replacement cost.',
    scores: [['STORM', 92], ['VALUE', 94], ['DESIGN', 78], ['LONGEVITY', 72]],
  },
  designer: {
    name: 'Premium Designer', eyebrow: 'DEPTH, SHADOW, AND CURB APPEAL', range: '$7.50–$10 / SQ FT', service: '30–40 YR PLANNING', pitch: '4:12+ IDEAL',
    fit: 'For statement homes where dimensional texture, specialty colors, and architectural character lead the decision.',
    scores: [['STORM', 86], ['VALUE', 74], ['DESIGN', 98], ['LONGEVITY', 84]],
  },
  metal: {
    name: '24-Gauge Standing Seam', eyebrow: 'LONG-LIFE HIGH-PERFORMANCE SYSTEM', range: '$12–$17 / SQ FT', service: '40–60 YR PLANNING', pitch: '2:12+ SYSTEM',
    fit: 'A premium mechanical system with clean lines, strong water shedding, heat reflectivity, and long planning life.',
    scores: [['STORM', 94], ['VALUE', 68], ['DESIGN', 91], ['LONGEVITY', 99]],
  },
  membrane: {
    name: 'Premium Single-Ply', eyebrow: 'LOW-SLOPE WATER CONTROL', range: '$9–$14 / SQ FT', service: '20–30 YR PLANNING', pitch: 'LOW-SLOPE',
    fit: 'Purpose-built for flat and low-slope roof areas where seams, drainage, flashing, and attachment method matter most.',
    scores: [['WATER', 96], ['VALUE', 76], ['DESIGN', 62], ['LONGEVITY', 83]],
  },
};

const priorities: { key: PriorityKey; label: string; system: SystemKey }[] = [
  { key: 'value', label: 'BEST VALUE', system: 'architectural' },
  { key: 'storm', label: 'STORM READY', system: 'architectural' },
  { key: 'design', label: 'CURB APPEAL', system: 'designer' },
  { key: 'longevity', label: 'LONG LIFE', system: 'metal' },
  { key: 'low-slope', label: 'LOW SLOPE', system: 'membrane' },
];

export function RoofSystemLab() {
  const [priority, setPriority] = useState<PriorityKey>('value');
  const [selected, setSelected] = useState<SystemKey>('architectural');
  const active = systems[selected];

  const choosePriority = (key: PriorityKey, system: SystemKey) => {
    setPriority(key);
    setSelected(system);
  };

  return <section className="system-lab" aria-labelledby="system-lab-title">
    <div className="lab-shell shell">
      <header className="lab-head">
        <div><p className="eyebrow light">INTERACTIVE ROOF SYSTEM LAB</p><h2 id="system-lab-title">Match the roof<br/>to the mission.</h2></div>
        <p>Choose what matters most. The lab recommends a system, then lets you inspect the tradeoffs before you build a full roof plan.</p>
      </header>

      <div className="priority-tabs" aria-label="Choose your main priority">
        {priorities.map((item, index) => <button key={item.key} type="button" className={priority === item.key ? 'active' : ''} aria-pressed={priority === item.key} onClick={() => choosePriority(item.key, item.system)}>
          <small>0{index + 1}</small><span>{item.label}</span>
        </button>)}
      </div>

      <div className="lab-workspace">
        <div className="lab-selector" aria-label="Compare roof systems">
          <small>COMPARE SYSTEMS</small>
          {(Object.keys(systems) as SystemKey[]).map((key, index) => <button type="button" key={key} className={selected === key ? 'active' : ''} aria-pressed={selected === key} onClick={() => setSelected(key)}>
            <span>0{index + 1}</span><b>{systems[key].name}</b><i>→</i>
          </button>)}
        </div>

        <div className={`lab-visual ${selected}`} aria-hidden="true">
          <div className="lab-grid" />
          <div className="lab-sun" />
          <div className="lab-roof"><i/><i/><i/><i/><i/></div>
          <div className="lab-scan"><span>ANALYZING ASSEMBLY</span><b /></div>
          <div className="lab-visual-label"><span>LIVE SYSTEM VIEW</span><strong>{active.pitch}</strong></div>
        </div>

        <article className="lab-details" aria-live="polite">
          <div className="lab-status"><i/> RECOMMENDED MATCH</div>
          <small>{active.eyebrow}</small>
          <h3>{active.name}</h3>
          <p>{active.fit}</p>
          <div className="lab-data"><span><small>PLANNING RANGE</small><b>{active.range}</b></span><span><small>SERVICE-LIFE TARGET</small><b>{active.service}</b></span></div>
          <div className="lab-scores">{active.scores.map(([label, score]) => <div key={label}><span><small>{label}</small><b>{score}</b></span><i><em style={{ width: `${score}%` }} /></i></div>)}</div>
          <div className="lab-actions"><Link href={`/customize?system=${selected}`}>CUSTOMIZE THIS SYSTEM <span>→</span></Link><Link href="/start">REQUEST AN INSPECTION</Link></div>
          <p className="lab-note">Planning ranges vary with access, tear-off, deck condition, geometry, code, and final specifications. Inspection confirms the right assembly.</p>
        </article>
      </div>
    </div>
  </section>;
}
