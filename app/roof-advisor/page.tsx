import type { Metadata } from 'next';
import { AdvancedRoofAdvisor } from '../components/AdvancedRoofAdvisor';

export const metadata: Metadata = {
  title: 'Advanced Roof Advisor',
  description: 'Build an explainable roof planning report with repair-versus-replacement signals, ranked system matches, red flags, and field-verification questions.',
};

export default function RoofAdvisorPage(){return <main className="advisor-v2-page"><AdvancedRoofAdvisor/></main>}
