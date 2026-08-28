import type { Metadata } from 'next';
import Link from 'next/link';
import { GrowthCommandCenter } from '../components/GrowthCommandCenter';

export const metadata: Metadata = {
  title: 'Organic Growth Command Center',
  description: 'Plan, model, prioritize, and operate the Cowboy Roof Support organic referral funnel without paid advertising.',
};

export default function GrowthPage() {
  return <main className="growth-page">
    <section className="growth-hero">
      <div className="shell">
        <div>
          <p className="eyebrow light">COWBOY GROWTH OS · ORGANIC FIRST</p>
          <h1>Turn trust into<br/><em>repeatable growth.</em></h1>
        </div>
        <div>
          <p>Plan the posts, model the funnel, route warm leads, and keep the monthly field work moving—without pretending a prototype has live company-wide analytics.</p>
          <div>
            <span><b>01</b>MODEL</span>
            <span><b>02</b>OPERATE</span>
            <span><b>03</b>FOLLOW UP</span>
          </div>
        </div>
      </div>
    </section>
    <section className="growth-workspace shell">
      <GrowthCommandCenter />
    </section>
    <section className="growth-system-bridge">
      <div className="shell">
        <header>
          <p className="eyebrow">CONNECTED WORKSPACES</p>
          <h2>Move the signal through the company.</h2>
          <p>Organic attention becomes a permission-based lead, a real relationship becomes a distinct referral trail, and an approved job moves into a disciplined planning file.</p>
        </header>
        <div>
          <Link href="/leads"><small>01 · ACQUIRE</small><h3>Local Lead Desk</h3><p>Organize inquiries, response status, follow-up dates, planning values, and outcomes on this device.</p><b>OPEN LEAD DESK →</b></Link>
          <Link href="/network"><small>02 · MULTIPLY TRUST</small><h3>Referral Network</h3><p>Create clean local links and useful onboarding messages for legitimate supporters and partners.</p><b>OPEN NETWORK →</b></Link>
          <Link href="/operations"><small>03 · DELIVER</small><h3>Roof Operations</h3><p>Build the intake, material allowances, work outline, crew-day checks, and closeout organizer.</p><b>OPEN OPERATIONS →</b></Link>
        </div>
      </div>
    </section>
    <section className="growth-boundary">
      <div className="shell">
        <div>
          <p className="eyebrow light">WHAT THIS SYSTEM DOES</p>
          <h2>Clarity before complexity.</h2>
        </div>
        <div>
          <p>This version models scenarios, prepares campaigns, saves a device-local plan, and improves human follow-up. It does not claim to be a shared CRM or real analytics platform.</p>
          <Link href="/privacy">READ THE DATA BOUNDARY →</Link>
        </div>
      </div>
    </section>
  </main>;
}
