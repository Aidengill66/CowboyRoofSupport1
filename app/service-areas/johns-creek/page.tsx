import type { Metadata } from 'next';
import { LocalLanding } from '../../components/LocalLanding';

export const metadata: Metadata = { title: 'Roofing in Johns Creek, GA', description: 'Roof inspections, leak repair, storm response, and replacement planning for Johns Creek homes and properties.' };
export default function Page() { return <LocalLanding city="Johns Creek" headline="Clean decisions for a complex roof." intro="Multi-plane elevations, neighborhood standards, attic airflow, and property protection all belong in the same plan—not in separate surprises after work begins." localNotes={[["Multi-plane drainage","Valleys, crickets, gutters, and roof-to-wall paths need to work as one water-management system."],["Ventilation balance","Exhaust products only work when intake, attic volume, insulation, and air pathways are considered together."],["Property protection","Driveways, landscaping, siding, outdoor living areas, and neighbors belong in the daily work plan."]]}/>; }
