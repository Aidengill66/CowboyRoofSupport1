'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type NeedId = 'leak' | 'storm' | 'replace' | 'plan' | 'commercial';
type TimingId = 'today' | 'soon' | 'research';
type PropertyId = 'home' | 'estate' | 'commercial';

const needs: Array<{ id: NeedId; label: string; detail: string }> = [
  { id: 'leak', label: 'Leak or damage', detail: 'Water, stain, missing shingle, flashing, or active concern' },
  { id: 'storm', label: 'Storm check', detail: 'Wind, hail, fallen debris, or documentation after weather' },
  { id: 'replace', label: 'Roof replacement', detail: 'Aging system, broad wear, resale, or full upgrade' },
  { id: 'plan', label: 'I need advice', detail: 'Compare materials, lifespan, price bands, and priorities' },
  { id: 'commercial', label: 'Large property', detail: 'Office, multifamily, estate, high-rise, or specialty roof' },
];

const timings: Array<{ id: TimingId; label: string; detail: string }> = [
  { id: 'today', label: 'Active / urgent', detail: 'Safety and property protection come first' },
  { id: 'soon', label: 'Within 30 days', detail: 'Prepare an inspection-ready project trail' },
  { id: 'research', label: 'Planning ahead', detail: 'Compare systems before making a commitment' },
];

const properties: Array<{ id: PropertyId; label: string; detail: string }> = [
  { id: 'home', label: 'Home', detail: 'Primary residence, rental, or neighborhood property' },
  { id: 'estate', label: 'Estate / complex', detail: 'Large roof, steep access, detached structures, or specialty details' },
  { id: 'commercial', label: 'Commercial', detail: 'Business, multifamily, low-slope, or managed portfolio' },
];

const routeByNeed = {
  leak: {
    code: 'REPAIR / TRIAGE', title: 'Stop the symptom. Trace the cause.',
    summary: 'Start with moisture entry, flashing, penetrations, drainage, and the surrounding roof field before deciding whether this is a focused repair or a larger system issue.',
    service: 'repair', file: '/roof-repair', fileLabel: 'OPEN REPAIR COMMAND',
    steps: ['Map the interior symptom', 'Inspect the likely entry path', 'Write the repair-or-replace decision'],
  },
  storm: {
    code: 'STORM / DOCUMENT', title: 'Make the property safe. Build the record.',
    summary: 'Separate urgent protection from the inspection record. Document visible conditions without climbing, then let a field inspection confirm the roof, flashing, drainage, and collateral areas.',
    service: 'storm', file: '/storm-damage', fileLabel: 'OPEN STORM DAMAGE FILE',
    steps: ['Protect people and interiors', 'Document visible conditions', 'Schedule a field inspection'],
  },
  replace: {
    code: 'SYSTEM / REPLACE', title: 'Replace the roof as one complete system.',
    summary: 'Compare deck conditions, underlayment, flashing, ventilation, drainage, fasteners, finish materials, and warranty paths together—not as disconnected upgrades.',
    service: 'replacement', file: '/roof-replacement', fileLabel: 'OPEN REPLACEMENT PAGE',
    steps: ['Measure the existing assembly', 'Compare complete roof systems', 'Build scope, range, and schedule'],
  },
  plan: {
    code: 'ADVISOR / PLAN', title: 'Turn priorities into a short list.',
    summary: 'Use roof age, symptoms, slope, attic behavior, tree cover, and your priorities to narrow the next move. The result is planning guidance, not a substitute for a field inspection.',
    service: 'general', file: '/roof-advisor', fileLabel: 'RUN THE ROOF ADVISOR',
    steps: ['Answer the six roof signals', 'Compare the system matches', 'Carry the result into inspection'],
  },
  commercial: {
    code: 'COMMERCIAL / SCOPE', title: 'Start with access, occupancy, and system risk.',
    summary: 'Large properties need a controlled investigation: roof zones, access, drainage, penetrations, tenant or business continuity, documentation, and phased decision-making.',
    service: 'commercial', file: '/commercial-roofing', fileLabel: 'OPEN COMMERCIAL CAPABILITY',
    steps: ['Define roof zones and access', 'Prioritize active risk', 'Build a phased property scope'],
  },
} satisfies Record<NeedId, { code: string; title: string; summary: string; service: string; file: string; fileLabel: string; steps: string[] }>;

const propertyNotes: Record<PropertyId, string> = {
  home: 'Prioritize clean communication, landscaping protection, household access, and a simple owner-ready closeout.',
  estate: 'Add steep-slope access, complex valleys, chimneys, copper or specialty details, detached structures, and longer material movement paths.',
  commercial: 'Add occupancy coordination, roof-zone mapping, low-slope drainage, penetration inventory, safety planning, and phased documentation.',
};

const timingNotes: Record<TimingId, string> = {
  today: 'Active concern selected: avoid the roof, protect people and interiors, and use the priority line when immediate help is needed.',
  soon: 'Near-term project selected: prepare photos, access notes, decision-makers, and preferred inspection windows.',
  research: 'Planning mode selected: compare assemblies and lifecycle tradeoffs before requesting a field-verified scope.',
};

export function RoofTrailFinder() {
  const [need, setNeed] = useState<NeedId>('leak');
  const [timing, setTiming] = useState<TimingId>('soon');
  const [property, setProperty] = useState<PropertyId>('home');
  const result = routeByNeed[need];
  const inspectionHref = useMemo(() => `/free-inspection?service=${encodeURIComponent(result.service)}&property=${property}&timing=${timing}`, [property, result.service, timing]);

  return <section id="roof-trail" className="roof-trail-section">
    <div className="shell">
      <header className="roof-trail-heading">
        <div><p className="eyebrow light">YOUR ROOF · ONE CLEAR TRAIL</p><h2>Start with what<br/>you actually know.</h2></div>
        <p>Three quick choices turn a vague roofing problem into a focused place to begin. Change any answer and your route updates instantly.</p>
      </header>
      <div className="roof-trail-console">
        <header><span><i/> COWBOY ROUTE ENGINE</span><b>3 INPUTS · LIVE RESULT</b><small>FIELD CHECK STILL REQUIRED</small></header>
        <div className="roof-trail-workspace">
          <div className="roof-trail-controls">
            <fieldset><legend><span>01</span><b>WHAT IS HAPPENING?</b></legend>{needs.map((item) => <button type="button" key={item.id} className={need === item.id ? 'active' : ''} onClick={() => setNeed(item.id)} aria-pressed={need === item.id}><i>{need === item.id ? '✓' : '→'}</i><span><b>{item.label}</b><small>{item.detail}</small></span></button>)}</fieldset>
            <fieldset><legend><span>02</span><b>WHEN DO YOU NEED A MOVE?</b></legend>{timings.map((item) => <button type="button" key={item.id} className={timing === item.id ? 'active' : ''} onClick={() => setTiming(item.id)} aria-pressed={timing === item.id}><i>{timing === item.id ? '✓' : '→'}</i><span><b>{item.label}</b><small>{item.detail}</small></span></button>)}</fieldset>
            <fieldset><legend><span>03</span><b>WHAT KIND OF PROPERTY?</b></legend>{properties.map((item) => <button type="button" key={item.id} className={property === item.id ? 'active' : ''} onClick={() => setProperty(item.id)} aria-pressed={property === item.id}><i>{property === item.id ? '✓' : '→'}</i><span><b>{item.label}</b><small>{item.detail}</small></span></button>)}</fieldset>
          </div>
          <article className="roof-trail-result" aria-live="polite">
            <div className="route-radar" aria-hidden="true"><span/><span/><span/><i>CRS</i><b>ROUTE LOCKED</b></div>
            <div className="route-status"><span><i/> MATCHED PATH</span><b>3 / 3 SIGNALS</b></div>
            <small>{result.code}</small>
            <h3>{result.title}</h3>
            <p>{result.summary}</p>
            <div className="route-notes"><span><small>PROPERTY LOGIC</small>{propertyNotes[property]}</span><span className={timing === 'today' ? 'urgent' : ''}><small>TIMING LOGIC</small>{timingNotes[timing]}</span></div>
            <ol>{result.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><b>{step}</b></li>)}</ol>
            <div className="route-actions"><Link href={inspectionHref}>PREPARE FREE INSPECTION <span>→</span></Link><Link href={result.file}>{result.fileLabel}</Link>{timing === 'today' && <a href="tel:+14708342519">CALL PRIORITY LINE · (470) 834-2519</a>}</div>
            <footer>PLANNING GUIDANCE ONLY · THE ROOF ASSEMBLY AND DAMAGE CONDITIONS MUST BE FIELD-VERIFIED</footer>
          </article>
        </div>
      </div>
    </div>
  </section>;
}
