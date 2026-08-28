import type { Metadata } from 'next';
import { LocalLanding } from '../../components/LocalLanding';

export const metadata: Metadata = { title: 'Roofing in Milton, GA', description: 'Roof inspections, repairs, replacements, and property-aware roof planning for Milton homes, estates, and detached structures.' };
export default function Page() { return <LocalLanding city="Milton" headline="Big roofs. Careful planning." intro="Larger properties can multiply the impact of access, slope, material quantity, detached structures, trees, and weather exposure. We turn those variables into one organized scope." localNotes={[["Roof area and access","Larger fields, steeper sections, long drives, and staging zones shape production planning."],["Detached structures","Garages, shops, barns, and guest buildings should be inventoried rather than assumed."],["Tree and wind exposure","Open areas and wooded edges can create different inspection priorities across one property."]]}/>; }
