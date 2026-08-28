import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Roof Systems', description: 'Compare architectural shingles, designer shingles, standing seam metal, and low-slope roofing systems for North Atlanta properties.' };
const systems = [
  ['01','ARCHITECTURAL SHINGLES','Balanced performance, dimensional appearance, availability, and practical replacement planning.','/library/architectural-shingles','BEST ALL-ROUNDER'],
  ['02','DESIGNER SHINGLES','Luxury scale, deeper shadow, slate-inspired profiles, and estate-level visual presence.','/library/designer-shingles','PREMIUM CURB APPEAL'],
  ['03','STANDING SEAM METAL','Custom panels, concealed attachment, precise transitions, and long-horizon planning.','/library/standing-seam-metal','PRECISION + LONG LIFE'],
  ['04','LOW-SLOPE SYSTEMS','Membrane, insulation, drainage, penetrations, and facility-focused roof-zone planning.','/commercial-roofing','COMMERCIAL + COMPLEX'],
] as const;
export default function RoofSystemsPage() { return <main className="category-page"><section className="category-hero"><div className="shell"><div><p className="eyebrow light">SYSTEM CABINET · MATERIALS</p><h1>Choose the roof<br/>as a whole.</h1></div><p>The finish matters. So do the layers, flashing, ventilation, fasteners, drainage, access, geometry, and owner priorities underneath the choice.</p></div></section><section className="system-shelves shell">{systems.map(([n,title,copy,href,best]) => <Link href={href} key={title}><small>{n} · {best}</small><h2>{title}</h2><p>{copy}</p><b>OPEN SYSTEM FILE →</b></Link>)}</section><section className="category-actions"><div className="shell"><Link href="/customize"><small>INTERACTIVE</small><h3>BUILD YOUR ROOF</h3><span>Configure shape, size, finish, upgrades, and planning range →</span></Link><Link href="/transformations"><small>VISUAL</small><h3>VIEW TRANSFORMATIONS</h3><span>Drag through mansion-scale system concepts →</span></Link><Link href="/free-inspection"><small>FIELD</small><h3>REQUEST AN INSPECTION</h3><span>Turn the property into a crew-ready brief →</span></Link></div></section></main>; }
