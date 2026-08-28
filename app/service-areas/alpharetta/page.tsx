import type { Metadata } from 'next';
import { LocalLanding } from '../../components/LocalLanding';

export const metadata: Metadata = { title: 'Roofing in Alpharetta, GA', description: 'Roof inspections, repairs, storm response, replacements, and roof-system planning for Alpharetta homes and properties.' };
export default function Page() { return <LocalLanding city="Alpharetta" headline="A smarter roof trail for Alpharetta." intro="From neighborhood homes to complex rooflines, we organize the inspection, material choices, property protections, and next decision around the actual building." localNotes={[["Complex rooflines","Valleys, sidewalls, dormers, penetrations, and transitions need deliberate water-control details."],["HOA selections","Colors and profiles may need architectural review before ordering or scheduling."],["Tree exposure","Shade, debris, and branches can change maintenance, drainage, and ventilation priorities."]]}/>; }
