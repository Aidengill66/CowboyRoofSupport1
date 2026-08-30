'use client';

import { useEffect, useState } from 'react';

type Side = 'a' | 'b';
type Proposal = { name: string; total: string; checks: string[]; notes: string };
type CompareState = { a: Proposal; b: Proposal };

const storageKey = 'crs-proposal-compare';
const blank: CompareState = {
  a: { name: 'Proposal A', total: '', checks: [], notes: '' },
  b: { name: 'Proposal B', total: '', checks: [], notes: '' },
};

const scope = [
  { id: 'system', label: 'Exact roof system', detail: 'Manufacturer, product line, profile, color path, and accessory compatibility.', weight: 2 },
  { id: 'tearoff', label: 'Tear-off + disposal', detail: 'Layer assumptions, removal, hauling, disposal, and site protection.', weight: 2 },
  { id: 'deck', label: 'Deck repair terms', detail: 'Included quantity or unit price, approval path, and photo documentation.', weight: 2 },
  { id: 'water', label: 'Water-control details', detail: 'Eaves, valleys, walls, penetrations, crickets, kickouts, and transitions.', weight: 2 },
  { id: 'flashing', label: 'Flashing scope', detail: 'What is replaced, reused, fabricated, excluded, or separately priced.', weight: 2 },
  { id: 'ventilation', label: 'Ventilation method', detail: 'Measured intake, exhaust, pathway, bath routing, and stated limitations.', weight: 1 },
  { id: 'permit', label: 'Permit + code responsibility', detail: 'Who verifies requirements, obtains permits, schedules inspections, and pays fees.', weight: 1 },
  { id: 'protection', label: 'Property protection + cleanup', detail: 'Landscaping, siding, driveways, magnets, debris, and damage reporting.', weight: 1 },
  { id: 'changes', label: 'Change-order rules', detail: 'Written authorization, allowance use, concealed conditions, and stop points.', weight: 2 },
  { id: 'warranty', label: 'Written warranty terms', detail: 'Workmanship party, manufacturer path, exclusions, registration, and transfer.', weight: 2 },
];

function loadState() {
  try {
    const value = window.localStorage.getItem(storageKey);
    if (!value) return blank;
    const parsed = JSON.parse(value) as Partial<CompareState>;
    return { a: { ...blank.a, ...parsed.a }, b: { ...blank.b, ...parsed.b } };
  } catch { return blank; }
}

function money(value: string) {
  const number = Number(value.replace(/[^0-9.]/g, ''));
  return Number.isFinite(number) && number > 0 ? number : 0;
}

export function ProposalCompare({ projectName, customer }: { projectName: string; customer: string }) {
  const [state, setState] = useState<CompareState>(blank);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const totalWeight = scope.reduce((sum, item) => sum + item.weight, 0);

  useEffect(() => { const timer = window.setTimeout(() => { setState(loadState()); setHydrated(true); }, 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { if (!hydrated) return; const timer = window.setTimeout(() => window.localStorage.setItem(storageKey, JSON.stringify(state)), 180); return () => window.clearTimeout(timer); }, [hydrated, state]);

  const update = (side: Side, key: keyof Proposal, value: string | string[]) => setState((current) => ({ ...current, [side]: { ...current[side], [key]: value } }));
  const toggle = (side: Side, id: string) => update(side, 'checks', state[side].checks.includes(id) ? state[side].checks.filter((item) => item !== id) : [...state[side].checks, id]);
  const score = (side: Side) => Math.round(scope.filter((item) => state[side].checks.includes(item.id)).reduce((sum, item) => sum + item.weight, 0) / totalWeight * 100);
  const missing = (side: Side) => scope.filter((item) => !state[side].checks.includes(item.id));
  const aTotal = money(state.a.total); const bTotal = money(state.b.total);
  const difference = aTotal && bTotal ? Math.abs(aTotal - bTotal) : 0;
  const lower = aTotal && bTotal ? (aTotal < bTotal ? 'A' : bTotal < aTotal ? 'B' : 'SAME') : '';

  const brief = (() => {
    const lines = (side: Side) => [
      `${state[side].name}: ${state[side].total || 'Total not entered'}`,
      `Written-scope completeness: ${score(side)}%`,
      `Present: ${scope.filter((item) => state[side].checks.includes(item.id)).map((item) => item.label).join(', ') || 'None marked'}`,
      `Clarify: ${missing(side).map((item) => item.label).join(', ') || 'No checklist gaps marked'}`,
      `Notes: ${state[side].notes || 'None'}`,
    ];
    return ['COWBOY ROOF SUPPORT · PROPOSAL CHECK', `Project: ${projectName}`, `Customer: ${customer}`, '', ...lines('a'), '', ...lines('b'), '', difference ? `Entered-price difference: $${difference.toLocaleString()} · lower entered total: ${lower}` : 'Enter both totals to calculate the price difference.', '', 'This checklist measures visible written scope—not contractor quality, code compliance, product suitability, hidden conditions, or final value. Verify every controlling document before signing.'].join('\n');
  })();

  const questions = (() => {
    const gaps = Array.from(new Set([...missing('a'), ...missing('b')].map((item) => item.label)));
    return `Please help me compare the written scope for ${projectName}.\n\n${gaps.length ? `Please clarify these items where they are missing or unclear: ${gaps.join('; ')}.` : 'The checklist is fully marked, but please confirm that each item is included in the controlling proposal and identify any exclusions.'}\n\nPlease also explain allowances, change orders, exclusions, payment milestones, and which written warranty terms control. I understand the lower total is not automatically the better value.`;
  })();

  const copy = async () => { try { await navigator.clipboard.writeText(brief); setCopied(true); window.setTimeout(() => setCopied(false), 1700); } catch { setCopied(false); } };
  const reset = () => { if (!window.confirm('Clear both device-local proposal checklists?')) return; window.localStorage.removeItem(storageKey); setState(blank); };

  return <div className="customer-view proposal-compare">
    <header className="customer-view-intro"><div><small>WRITTEN SCOPE BEFORE PRICE</small><h3>Compare the bids you actually have.</h3></div><p>Mark an item only when it is clear in the written proposal. A completeness score exposes document gaps; it does not rank workmanship or choose a contractor.</p></header>
    <section className="proposal-readout"><article><small>PROPOSAL A</small><b>{score('a')}%</b><span>WRITTEN-SCOPE COMPLETENESS</span><i><em style={{ width: `${score('a')}%` }} /></i></article><article><small>ENTERED PRICE DIFFERENCE</small><b>{difference ? `$${difference.toLocaleString()}` : '—'}</b><span>{lower ? `${lower} HAS THE LOWER ENTERED TOTAL` : 'ENTER BOTH TOTALS'}</span></article><article><small>PROPOSAL B</small><b>{score('b')}%</b><span>WRITTEN-SCOPE COMPLETENESS</span><i><em style={{ width: `${score('b')}%` }} /></i></article></section>
    <div className="proposal-columns">{(['a','b'] as Side[]).map((side) => <section key={side} className={`proposal-side proposal-${side}`}><header><span>{side.toUpperCase()}</span><div><label>PROPOSAL NAME<input value={state[side].name} onChange={(event) => update(side, 'name', event.target.value)} /></label><label>ENTERED TOTAL<input inputMode="decimal" value={state[side].total} onChange={(event) => update(side, 'total', event.target.value)} placeholder="$0" /></label></div></header><div className="proposal-checks">{scope.map((item, index) => <button type="button" key={item.id} className={state[side].checks.includes(item.id) ? 'present' : ''} onClick={() => toggle(side, item.id)}><i>{state[side].checks.includes(item.id) ? '✓' : String(index + 1).padStart(2, '0')}</i><span><b>{item.label}</b><small>{item.detail}</small></span><strong>{state[side].checks.includes(item.id) ? 'WRITTEN' : 'CLARIFY'}</strong></button>)}</div><label className="proposal-notes">PROPOSAL NOTES<textarea value={state[side].notes} onChange={(event) => update(side, 'notes', event.target.value)} placeholder="Allowances, exclusions, payment terms, questions, or unusual language…" maxLength={900}/><small>{state[side].notes.length}/900</small></label></section>)}</div>
    <section className="proposal-questions"><div><small>AUTOMATIC FOLLOW-UP</small><h3>Turn gaps into one clear question.</h3><p>The question builder combines missing items across both columns, so the customer can request comparable written answers.</p></div><pre>{questions}</pre><div><a href={`mailto:hello@cowboyroofsupport.com?subject=${encodeURIComponent(`${projectName} proposal questions`)}&body=${encodeURIComponent(questions)}`}>EMAIL QUESTIONS →</a><button type="button" onClick={copy}>{copied ? 'COMPARISON COPIED ✓' : 'COPY COMPARISON'}</button><button type="button" onClick={reset}>RESET DESK</button></div></section>
    <footer className="proposal-boundary"><b>WHAT THIS TOOL DOES</b><span>Checks whether important scope topics appear clear in the documents you reviewed.</span><b>WHAT IT DOES NOT DO</b><span>Authenticate contractors, inspect the roof, interpret law, verify code, validate warranties, or determine the best value.</span></footer>
  </div>;
}
