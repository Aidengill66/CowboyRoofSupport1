import type { Metadata } from 'next';
import Link from 'next/link';
import { CompliancePlanner } from '../components/CompliancePlanner';

export const metadata: Metadata = {
  title: 'Trust, Legal & Tax Readiness',
  description: 'Customer protections, privacy, communications consent, insurance boundaries, tax readiness, and operating controls for Cowboy Roof Support.',
};

const sources = [
  ['GEORGIA CONTRACTOR LICENSING', 'https://sos.ga.gov/page/residential-and-commercial-general-contractors-frequently-asked-questions'],
  ['GEORGIA CONTRACTOR TAX FAQ', 'https://dor.georgia.gov/contractor-faqs'],
  ['GEORGIA CONTRACT CANCELLATION', 'https://consumer.georgia.gov/consumer-topics/canceling-contract'],
  ['GEORGIA PUBLIC ADJUSTERS', 'https://oci.georgia.gov/agents-agency-licensing/licensed-adjusters-public-adjusters-counselors-surplus-lines-brokers'],
  ['IRS ENERGY CREDIT CHANGES', 'https://www.irs.gov/newsroom/faqs-for-modification-of-sections-25c-25d-25e-30c-30d-45l-45w-and-179d-under-public-law-119-21-139-stat-72-july-4-2025-commonly-known-as-the-one-big-beautiful-bill-obbb'],
  ['IRS SECTION 179D', 'https://www.irs.gov/instructions/i7205'],
  ['FTC EMAIL COMPLIANCE', 'https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business'],
  ['DOJ WEB ACCESSIBILITY', 'https://www.ada.gov/resources/web-guidance/'],
];

export default function LegalPage() {
  return <main className="legal-page">
    <section className="legal-hero"><div className="shell"><div><p className="eyebrow light">TRUST · COMPLIANCE · EFFICIENCY</p><h1>Built clean.<br/><em>Run clean.</em></h1><p>A serious roofing company needs more than shingles and swagger. This control center organizes customer protection, claims boundaries, communication consent, tax readiness, and closeout discipline.</p><div className="actions"><a className="primary" href="#control-center">OPEN CONTROL CENTER <span>↓</span></a><Link className="text-link" href="/start">START A PROJECT</Link></div></div><aside><span><small>LEGAL FRAMEWORK</small>PLAIN-LANGUAGE TERMS</span><span><small>COMMUNICATIONS</small>SEPARATE OPT-IN CONTROLS</span><span><small>TAX POSITION</small>CURRENT-DATE CHECKS</span><span><small>OPERATIONS</small>ONE PROJECT RECORD</span><b>REVIEWED AGAINST OFFICIAL SOURCES · AUG 28, 2026</b></aside></div></section>

    <section className="trust-band"><span><i/>NO CLAIM-APPROVAL PROMISES</span><span><i/>NO FAKE TAX-CREDIT HYPE</span><span><i/>NO PRE-CHECKED MARKETING CONSENT</span><span><i/>NO HIDDEN PROJECT SCOPE</span></section>

    <div id="control-center"><CompliancePlanner /></div>

    <section className="efficiency-system shell"><header><p className="eyebrow">ONE PROJECT RECORD</p><h2>Faster because<br/>nothing gets lost.</h2><p>Every handoff has an owner, a required output, and a customer-visible checkpoint.</p></header><div className="efficiency-flow">{[
      ['01','LEAD','Need · property · permission'],['02','INSPECT','Photos · measurements · conditions'],['03','SCOPE','System · exclusions · allowances'],['04','APPROVE','Contract · selections · deposit'],['05','BUILD','Schedule · protection · quality'],['06','CLOSE','Photos · invoice · warranties · waivers'],
    ].map((item)=><article key={item[0]}><small>{item[0]}</small><b>{item[1]}</b><span>{item[2]}</span></article>)}</div><div className="efficiency-rules"><span><b>ONE SOURCE OF TRUTH</b><small>No information trapped in texts or one person&apos;s phone.</small></span><span><b>SIGNED CHANGE ORDERS</b><small>Price and schedule changes are approved before the work changes.</small></span><span><b>CLOSEOUT PACKET</b><small>The customer leaves with final photos, invoice, warranty records, and promised documents.</small></span></div></section>

    <section id="customer-terms" className="policy-section"><div className="shell policy-layout"><aside><p className="eyebrow light">CUSTOMER TERMS</p><h2>Plain English.<br/>No fine-print rodeo.</h2><p>Effective August 28, 2026. These website terms organize the online experience. A signed project agreement controls actual roofing work.</p></aside><div className="policy-accordions">
      <details open><summary>Website estimates and Roof Advisor <span>+</span></summary><p>Online ranges, system matches, scores, calculators, chat responses, and guides are preliminary planning information. They are not a bid, insurance opinion, engineering report, warranty, or offer to perform work. Field conditions, code, access, deck condition, product availability, and a signed scope control the project.</p></details>
      <details><summary>Roofing services and changes <span>+</span></summary><p>Services begin only under a separate written agreement identifying the parties, work, price, payment schedule, materials, exclusions, schedule assumptions, warranties, permits, and change-order method. Website content does not expand a signed warranty or contract.</p></details>
      <details><summary>Storm and insurance information <span>+</span></summary><p>We may document roof conditions and prepare construction scopes. We do not promise claim approval, determine policy coverage, or act as an attorney or public adjuster unless that service is separately identified and legally licensed. Customers remain responsible for their insurer relationship, deductible, and policy obligations.</p></details>
      <details><summary>Marketplace and rewards <span>+</span></summary><p>The current marketplace, rewards, game, product lists, and price displays are prototype planning features. No online purchase is completed until checkout, fulfillment, returns, taxes, shipping, sponsorship disclosures, and program rules are activated and shown before payment.</p></details>
      <details><summary>Acceptable use and governing rules <span>+</span></summary><p>Do not misuse the site, interfere with its operation, submit unlawful material, or copy protected brand assets. Georgia law applies where permitted, but nothing here waives non-waivable customer protections or rights supplied by applicable law.</p></details>
    </div></div></section>

    <section id="privacy" className="policy-section light-policy"><div className="shell policy-layout"><aside><p className="eyebrow">PRIVACY + CONTACT CHOICES</p><h2>Your information<br/>is not a product.</h2><p>The current prototype prepares project information for the visitor to review, copy, or send through their own email client. It does not silently submit that form data.</p></aside><div className="privacy-grid">
      <article><small>01 / DATA</small><h3>What may be provided</h3><p>Name, contact details, city or property information, roof concerns, project selections, appointment details, and communication preferences when a connected service is intentionally used.</p></article>
      <article><small>02 / PURPOSE</small><h3>Why it is used</h3><p>To answer requests, schedule or service projects, produce estimates, keep required records, protect the site, and send optional marketing only when the visitor makes that choice.</p></article>
      <article><small>03 / SHARING</small><h3>Who may assist</h3><p>Approved service providers may support hosting, scheduling, messaging, payments, measurement, and project delivery. Information may also be used when legally required. We do not promise to sell personal data.</p></article>
      <article><small>04 / CONTROL</small><h3>Your choices</h3><p>Ask to review, correct, or delete applicable records; unsubscribe from marketing email; reply STOP to optional texts; or request an accessible alternative. Project and legal records may need to be retained.</p></article>
      <article><small>05 / SECURITY</small><h3>Minimum necessary</h3><p>Collect only useful data, limit staff access, use approved vendors, avoid sensitive claim documents in unsecured channels, and set a written retention schedule before activating live submissions.</p></article>
      <article><small>06 / CONTACT</small><h3>Reach the privacy team</h3><p>Email <a href="mailto:hello@cowboyroofsupport.com">hello@cowboyroofsupport.com</a>. The policy must be updated before new analytics, payments, live accounts, or notification services are activated.</p></article>
    </div></div></section>

    <section id="accessibility" className="accessibility-section"><div className="shell"><div><p className="eyebrow light">ACCESSIBILITY</p><h2>Every trail needs<br/>a usable entrance.</h2><p>We aim for keyboard access, visible focus, readable contrast, useful labels, responsive zoom, reduced-motion support, and plain-language form instructions. If something blocks you, email us for help or an alternative way to receive the same information.</p><a href="mailto:hello@cowboyroofsupport.com?subject=Accessibility%20help">REPORT AN ACCESSIBILITY ISSUE →</a></div><div className="access-checks"><span><i>✓</i>KEYBOARD NAVIGATION</span><span><i>✓</i>VISIBLE FOCUS STATES</span><span><i>✓</i>REDUCED-MOTION SUPPORT</span><span><i>✓</i>FORM LABELS + INSTRUCTIONS</span><span><i>✓</i>RESPONSIVE TEXT + TOUCH</span><span><i>↻</i>ONGOING HUMAN REVIEW</span></div></div></section>

    <section id="official-sources" className="source-section shell"><header><p className="eyebrow">CURRENT-DATE SOURCE LEDGER</p><h2>Official sources.<br/>Not cowboy math.</h2><p>Rules change. Re-check these sources with Georgia counsel and a construction-focused CPA before launch, before a new campaign, and before relying on any tax position.</p></header><div>{sources.map((source,index)=><a key={source[0]} href={source[1]} target="_blank" rel="noreferrer"><small>0{index+1}</small><b>{source[0]}</b><span>OPEN OFFICIAL SOURCE ↗</span></a>)}</div></section>

    <section className="legal-final"><p className="eyebrow light">THE REAL EFFICIENCY PLAY</p><h2>Do it once.<br/>Document it right.</h2><p>This framework should be finalized with the company&apos;s exact legal entity, physical address, license or exemption basis, insurance, warranty language, payment rules, and professional advisors before a public launch.</p><Link className="primary" href="/start">BUILD A CLEAN PROJECT REQUEST <span>→</span></Link></section>
  </main>;
}
