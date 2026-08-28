import type { Metadata } from 'next';
import { LocalLanding } from '../../components/LocalLanding';

export const metadata: Metadata = { title: 'Roofing in Cumming, GA', description: 'Roof inspections, storm damage checks, repairs, and replacement planning for Cumming homes and properties.' };
export default function Page() { return <LocalLanding city="Cumming" headline="Roof guidance built for what is next." intro="Growing neighborhoods and established lake-area properties can have very different roof ages, drainage patterns, materials, and storm exposure. Start with the building facts." localNotes={[["Mixed roof ages","Similar-looking homes may have different installation dates, repair histories, and ventilation assemblies."],["Moisture and drainage","Humidity, shade, gutters, valleys, and slope all influence the inspection picture."],["Storm readiness","Wind-facing edges, penetrations, trees, and emergency access should be considered before severe weather arrives."]]}/>; }
