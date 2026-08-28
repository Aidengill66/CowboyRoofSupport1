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
