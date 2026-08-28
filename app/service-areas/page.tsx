import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'North Atlanta Roofing Service Areas', description: 'Explore Cowboy Roof Support roofing service pages for Alpharetta, Roswell, Milton, Johns Creek, Cumming, and nearby North Atlanta communities.' };

const areas = [
  ['Alpharetta', 'Complex rooflines, HOA coordination, trees, and premium system choices.', '/service-areas/alpharetta'],
  ['Roswell', 'Established homes, chimneys, flashing details, mature trees, and repairs.', '/service-areas/roswell'],
  ['Milton', 'Large roof areas, detached structures, tree exposure, and system planning.', '/service-areas/milton'],
  ['Johns Creek', 'Multi-plane homes, ventilation balance, storm readiness, and clean closeout.', '/service-areas/johns-creek'],
  ['Cumming', 'Fast-growing neighborhoods, mixed roof ages, lake-area moisture, and storms.', '/service-areas/cumming'],
] as const;

export default function ServiceAreasPage() {
  return <main className="areas-page"><section className="areas-hero"><div className="shell"><div><p className="eyebrow light">SERVICE AREA · NORTH ATLANTA</p><h1>Local pages.<br/>One standard.</h1></div><p>City-specific roof planning without the keyword clutter. Choose your area, choose the job, and go straight to a useful next step.</p></div></section><section className="areas-grid shell">{areas.map(([city, copy, href], index) => <Link href={href} key={city}><small>0{index + 1} · NORTH ATLANTA</small><h2>{city}</h2><p>{copy}</p><b>OPEN LOCAL PAGE →</b></Link>)}</section><section className="coverage-note"><div className="shell"><div><p className="eyebrow light">NEARBY BUT NOT LISTED?</p><h2>Let the crew route it.</h2><p>Service availability depends on crew capacity, property type, and project scope. Call or prepare an inspection request and the team can confirm coverage.</p></div><div><a href="tel:+14708342519">CALL (470) 834-2519</a><a href="/free-inspection">FREE INSPECTION →</a></div></div></section></main>;
}
