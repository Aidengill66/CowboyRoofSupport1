import type { Metadata } from 'next';
import { RoofOperationsCenter } from '../components/RoofOperationsCenter';

export const metadata: Metadata = {
  title: 'Roofing Operations Center',
  description: 'A device-local planning workspace for roof intake, material allowances, scope outlines, crew-day controls, and closeout checks.',
};

export default function OperationsPage() {
  return <main className="operations-page">
    <section className="internal-hero operations-hero">
      <div className="shell">
        <div>
          <p className="eyebrow light">COWBOY FIELD OS · BUILT FOR THE HANDOFF</p>
          <h1>Plan the roof.<br/>Control the details.</h1>
        </div>
        <div>
          <p>Move from project facts to material allowances, a readable scope, crew-day checks, and disciplined closeout—all in one device-local working surface.</p>
          <span><i/>PLANNING TOOL · VERIFY IN THE FIELD</span>
        </div>
      </div>
    </section>
    <section className="internal-workspace shell">
      <RoofOperationsCenter />
    </section>
  </main>;
}
