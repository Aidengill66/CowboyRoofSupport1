import type { Metadata } from 'next';
import { LeadDesk } from '../components/LeadDesk';

export const metadata: Metadata = {
  title: 'Local Lead Desk',
  description: 'A device-local prototype for organizing permission-based Cowboy Roof Support inquiries from referral to outcome.',
};

export default function LeadsPage() {
  return <main className="leads-page">
    <section className="internal-hero leads-hero">
      <div className="shell">
        <div>
          <p className="eyebrow light">COWBOY LEAD OS · DEVICE LOCAL</p>
          <h1>Every introduction.<br/>One clear next step.</h1>
        </div>
        <div>
          <p>Capture permission-based inquiries, organize response status, schedule the next follow-up, and export a local working file without pretending this prototype is a deployed CRM.</p>
          <span><i/>PRIVATE WORKING SURFACE</span>
        </div>
      </div>
    </section>
    <section className="internal-workspace shell">
      <LeadDesk />
    </section>
  </main>;
}
