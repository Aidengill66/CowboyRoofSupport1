'use client';

import { useMemo, useState } from 'react';

type TrackKey = 'customer' | 'insurance' | 'communications' | 'tax';

const tracks: Record<TrackKey, {
  label: string;
  kicker: string;
  result: string;
  items: { title: string; detail: string }[];
}> = {
  customer: {
    label: 'CUSTOMER CONTRACT',
    kicker: 'BEFORE A SIGNATURE OR DEPOSIT',
    result: 'A complete contract packet, not a handshake and a mystery.',
    items: [
      { title: 'Identity is verifiable', detail: 'Use the exact legal business name, physical address, responsible contractor or qualifying agent where required, and current insurance information.' },
      { title: 'Scope is roof-specific', detail: 'List roof areas, tear-off layers, deck allowance, flashing, ventilation, drainage, permits, protection, cleanup, exclusions, and material specifications.' },
      { title: 'Money has rules', detail: 'State the contract price, deposit, payment milestones, financing terms, change-order process, and when lien waivers or closeout documents are delivered.' },
      { title: 'Cancellation is handled correctly', detail: 'When a Georgia home-solicitation cancellation right applies, provide the required notice and copies. Do not claim every contract has the same cancellation window.' },
    ],
  },
  insurance: {
    label: 'INSURANCE CLAIM',
    kicker: 'DOCUMENT THE ROOF · RESPECT THE LINE',
    result: 'A factual roof scope that supports the customer without pretending to control coverage.',
    items: [
      { title: 'Document observed conditions', detail: 'Capture date-stamped photos, test squares where appropriate, measurements, affected components, emergency mitigation, and a clear repair or replacement scope.' },
      { title: 'Coverage stays with licensed parties', detail: 'The insurer and its adjuster decide coverage. A roofer explains construction scope and pricing; it does not guarantee approval or act as a public adjuster unless separately licensed.' },
      { title: 'The customer controls the claim', detail: 'The property owner receives the documents, selects who may communicate, and can verify any adjuster through the Georgia insurance regulator.' },
      { title: 'Promises stay measurable', detail: 'Promise documentation, workmanship, communication, and agreed scope—not a claim result, settlement amount, or insurer payment date.' },
    ],
  },
  communications: {
    label: 'EMAIL + TEXT',
    kicker: 'USEFUL ALERTS WITHOUT THE SPAM',
    result: 'Project messages stay separate from optional marketing, with a visible exit every time.',
    items: [
      { title: 'Service contact is specific', detail: 'Permission to respond about an inspection or active project is separate from permission for recurring promotional texts, gear drops, or newsletters.' },
      { title: 'Marketing is optional', detail: 'Use an unchecked opt-in, name the sending company, explain message frequency may vary, note message and data rates, and state that consent is not a condition of purchase.' },
      { title: 'Every exit works', detail: 'Honor email unsubscribes and reasonable automated call or text revocations. STOP and similar replies must route into a suppression list.' },
      { title: 'Vendors do not erase responsibility', detail: 'Approved email, CRM, and texting vendors need written controls, but Cowboy Roof Support remains responsible for campaigns sent on its behalf.' },
    ],
  },
  tax: {
    label: 'TAX + INCENTIVES',
    kicker: 'LEGITIMATE SAVINGS · CLEAN RECORDS',
    result: 'Tax efficiency comes from classification, timing, documentation, and professional review—not fake roof-credit hype.',
    items: [
      { title: 'Georgia contractor tax is job-based', detail: 'Register for a Georgia sales/use tax number, treat installed materials under the contractor rules, track where materials are used, and file required returns even for zero-activity periods.' },
      { title: 'Invoices separate the story', detail: 'Keep material, installation or repair labor, fabrication, permit, disposal, and subcontractor records distinct so the CPA can apply the correct treatment.' },
      { title: 'Energy incentives need current dates', detail: 'Federal residential Sections 25C and 25D ended after 2025. Section 179D may remain relevant only for qualifying commercial projects that meet its construction-start, certification, and building-envelope rules.' },
      { title: 'The books prove the deduction', detail: 'Job-cost every property, preserve invoices and receipts, classify workers correctly, reconcile monthly, and plan estimated tax payments with a construction-focused CPA.' },
    ],
  },
};

export function CompliancePlanner() {
  const [track, setTrack] = useState<TrackKey>('customer');
  const [complete, setComplete] = useState<Record<string, boolean>>({});
  const active = tracks[track];
  const count = useMemo(() => active.items.filter((_, index) => complete[`${track}-${index}`]).length, [active.items, complete, track]);

  const toggle = (index: number) => {
    const key = `${track}-${index}`;
    setComplete((current) => ({ ...current, [key]: !current[key] }));
  };

  return <section className="compliance-planner" aria-labelledby="planner-title">
    <div className="shell">
      <header className="compliance-head"><div><p className="eyebrow light">INTERACTIVE CONTROL CENTER</p><h2 id="planner-title">Pick a risk.<br/>Close the gaps.</h2></div><p>This is a planning system for counsel, CPA, insurance, and operations review—not a replacement for their advice. Select a track and use the live checklist to prepare the right packet.</p></header>
      <div className="compliance-app">
        <nav aria-label="Compliance track">
          {(Object.keys(tracks) as TrackKey[]).map((key, index) => <button type="button" key={key} className={track === key ? 'active' : ''} aria-pressed={track === key} onClick={() => setTrack(key)}><small>0{index + 1}</small><span>{tracks[key].label}</span><i>→</i></button>)}
        </nav>
        <div className="compliance-workspace" aria-live="polite">
          <header><div><small>{active.kicker}</small><h3>{active.label}</h3></div><strong><span>{count}</span> / {active.items.length} READY</strong></header>
          <div className="compliance-meter"><i style={{ width: `${count / active.items.length * 100}%` }} /></div>
          <div className="control-list">{active.items.map((item, index) => {
            const checked = Boolean(complete[`${track}-${index}`]);
            return <button type="button" key={item.title} className={checked ? 'complete' : ''} aria-pressed={checked} onClick={() => toggle(index)}><i>{checked ? '✓' : index + 1}</i><span><b>{item.title}</b><small>{item.detail}</small></span><strong>{checked ? 'READY' : 'REVIEW'}</strong></button>;
          })}</div>
          <footer><small>DESIRED OUTPUT</small><p>{active.result}</p><button type="button" onClick={() => setComplete((current) => Object.fromEntries(Object.entries(current).filter(([key]) => !key.startsWith(`${track}-`))))}>RESET THIS TRACK</button></footer>
        </div>
      </div>
    </div>
  </section>;
}
