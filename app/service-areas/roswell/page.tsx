import type { Metadata } from 'next';
import { LocalLanding } from '../../components/LocalLanding';

export const metadata: Metadata = { title: 'Roofing in Roswell, GA', description: 'Roof repair, storm inspections, replacements, and practical roof planning for Roswell homes and properties.' };
export default function Page() { return <LocalLanding city="Roswell" headline="Roof work that respects the details." intro="Established homes often bring a mix of roof ages, additions, masonry, mature trees, and older flashing details. The inspection should make that complexity understandable." localNotes={[["Flashing transitions","Chimneys, walls, additions, and roof-to-roof connections deserve close inspection."],["Mature trees","Leaves, shade, branches, and clogged drainage can concentrate wear in specific zones."],["Repair matching","Existing profiles and weathering affect whether a repair can be practical and visually compatible."]]}/>; }
