import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quality & Protection',
  description: 'Meet the Cowboy quality standard: friendly people, documented workmanship, property protection, honest insurance information, and a cleaner roofing experience.',
};

export default function QualityPage() {
  return <main className="quality-page">
    <section className="quality-hero"><div className="quality-photo"><img src="/cowboy-crew-v1.png" alt="A friendly roofing crew speaking with a homeowner outside a North Atlanta home"/><span>REAL HELP · NO ROOFING RIDDLES</span></div><div className="quality-hero-copy"><p className="eyebrow light">THE COWBOY QUALITY STANDARD</p><div className="quality-crest" aria-hidden="true"><i className="qc-hat"/><i className="qc-roof"/><i className="qc-boot one"/><i className="qc-boot two"/></div><h1>Nice people.<br/>Serious roofs.</h1><p>Helpful humans, sharp workmanship, clean communication—and just enough cowboy personality to make a roof replacement less painful.</p><Link className="outline-light" href="/services#inspection">MEET US AT A FREE INSPECTION →</Link></div></section>
    <section className="cowboy-code shell"><div className="quality-title"><p className="eyebrow">01 / THE COWBOY CODE</p><h2>We save the tall tales<br/>for the campfire.</h2><p>Quality is what happens before, during, and after the shingles go down. These are the behaviors a homeowner should actually be able to see.</p></div><div className="code-grid">{[
      ['NO VANISHING ACT','Calls returned. Arrival windows confirmed. Updates delivered before you have to chase them.'],
      ['NO SHINGLE SNAKE OIL','We explain good, better, and best—and where premium materials do or do not earn their price.'],
      ['NO MYSTERY NAILS','Ground protection, magnetic sweeps, gutter checks, and a final cleanup walk.'],
      ['NO ROOFING RIDDLES','Photos, plain-language findings, clear allowances, and written change decisions.'],
      ['NO RODEO ON YOUR ROOF','Fall protection, controlled access, weather calls, and a crew plan before tear-off.'],
      ['NO SUNSET ESCAPE','Final walkthrough, closeout photos, care guidance, and a real path for follow-up.']
    ].map((x,i)=><article key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>
    <section className="assurance-section"><div className="shell"><div className="assurance-copy"><p className="eyebrow light">02 / QUALITY ASSURANCE</p><h2>Eight checkpoints.<br/>One accountable build.</h2><p>A roof is verified in stages, when details are still visible and correctable—not just admired from the driveway at the end.</p></div><div className="checkpoint-list">{[
      ['PRE-JOB','Scope, materials, access, weather, safety, landscaping, and delivery plan'],
      ['TEAR-OFF','Deck exposed in controlled areas; concealed conditions photographed'],
      ['DECK','Soft, spaced, or damaged sheathing identified before covering'],
      ['WATER CONTROL','Drip edge, self-adhered membrane, underlayment, and valley detail checked'],
      ['FLASHING','Walls, chimneys, penetrations, kickouts, and compatible metals reviewed'],
      ['VENTILATION','Intake and exhaust confirmed as a balanced system'],
      ['FINISH','Fastening, courses, ridge, seal lines, transitions, and manufacturer details reviewed'],
      ['CLOSEOUT','Cleanup, magnetic sweep, gutter check, photos, walkthrough, and care notes']
    ].map((x,i)=><article key={x[0]}><span>{String(i+1).padStart(2,'0')}</span><div><b>{x[0]}</b><p>{x[1]}</p></div><i>✓</i></article>)}</div></div></section>
    <section className="protection-section shell"><div className="protection-card insurance-card"><span>DOCUMENT 01</span><h2>Insurance & credentials</h2><p>The production site should show current, verified company documents—not decorative badges or invented policy numbers.</p><div className="document-status"><i/><span><small>PROTOTYPE STATUS</small>READY FOR VERIFIED COMPANY DOCUMENTS</span></div><ul><li>Current certificate of insurance</li><li>General liability limits</li><li>Workers’ compensation documentation</li><li>Applicable local or trade credentials</li><li>Carrier and certificate contact information</li></ul><small className="honesty-note">These details remain intentionally unclaimed until the company supplies current documents.</small></div><div className="protection-card claims-card"><span>DOCUMENT 02</span><h2>Storm documentation</h2><p>We can inspect, photograph, explain roof conditions, and keep a clean job record. We do not promise coverage or pretend to be the insurance carrier.</p><div className="claim-flow"><b>INSPECT</b><i>→</i><b>PHOTOGRAPH</b><i>→</i><b>DOCUMENT</b><i>→</i><b>BUILD</b></div><ul><li>Condition photos and measurements</li><li>Material and scope documentation</li><li>Clear change records during construction</li><li>Coverage decisions remain with the insurer</li></ul><Link href="/guides">READ THE STORM GUIDE →</Link></div></section>
    <section className="people-section"><div className="shell"><div className="people-copy"><p className="eyebrow light">03 / PEOPLE YOU CAN TALK TO</p><h2>A crew should feel like help arrived.</h2><p>No fake staff names for the prototype. Instead, every customer gets clear ownership at each stage.</p></div><div className="people-roles"><article><span>01</span><h3>Your project guide</h3><p>Explains findings, choices, timing, and next steps in normal language.</p></article><article><span>02</span><h3>Your field lead</h3><p>Owns the site plan, quality checkpoints, safety, and daily updates.</p></article><article><span>03</span><h3>Your protection crew</h3><p>Looks after landscaping, access, debris control, cleanup, and the final sweep.</p></article></div></div></section>
    <section className="quality-final"><p className="eyebrow">EXCELLENT ROOFERS · UNNECESSARILY GOOD HAT</p><h2>Friendly at the door.<br/>Exact on the roof.</h2><div><Link className="primary" href="/services#inspection">START WITH A FREE INSPECTION →</Link><Link className="text-link" href="/roof-advisor">ASK THE ROOF ADVISOR</Link></div></section>
  </main>;
}
