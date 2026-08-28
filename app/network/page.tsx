import type { Metadata } from 'next';
import { ReferralNetwork } from '../components/ReferralNetwork';

export const metadata: Metadata = {
  title: 'Referral Partner Network',
  description: 'A device-local prototype for organizing trusted organic referral relationships and trackable neighborhood links.',
};

export default function NetworkPage() {
  return <main className="network-page">
    <section className="internal-hero network-hero">
      <div className="shell">
        <div><p className="eyebrow light">COWBOY NETWORK OS · TRUST FIRST</p><h1>Build the circle.<br/>Respect the relationship.</h1></div>
        <div><p>Give each legitimate supporter or partner a distinct local trail, a clear onboarding message, and a record that stays on the current device.</p><span><i/>NO SPAM · NO INVENTED PARTNERS</span></div>
      </div>
    </section>
    <section className="internal-workspace shell"><ReferralNetwork /></section>
  </main>;
}
