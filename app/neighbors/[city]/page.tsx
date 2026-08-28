import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HeroEstimateForm } from '../../components/HeroEstimateForm';
import { getNeighborCity, neighborCities } from '../content';

export function generateStaticParams() { return neighborCities.map((city) => ({ city: city.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const city = getNeighborCity((await params).city);
  if (!city) return { title: 'North Atlanta Neighbor Roof Check' };
  const title = `${city.name} Neighbor Roof Check`;
  const description = `A friendly, no-pressure roof inspection starting point for ${city.name} homeowners referred by family, friends, and neighbors.`;
  return { title, description, openGraph: { title, description, images: ['/cowboy-crew-v1.png'] }, twitter: { card: 'summary_large_image', title, description, images: ['/cowboy-crew-v1.png'] } };
}

export default async function NeighborCityPage({ params }: { params: Promise<{ city: string }> }) {
  const city = getNeighborCity((await params).city);
  if (!city) notFound();
  return <main className="neighbors-page"><section className="neighbor-hero city-neighbor-hero"><div className="neighbor-story"><p className="eyebrow light">SHARED BY A {city.name.toUpperCase()} NEIGHBOR</p><h1>{city.name}<br/>roof help.</h1><p>{city.note}</p><div className="neighbor-proof"><span><b>FREE</b>INSPECTION REQUEST</span><span><b>LOCAL</b>{city.name.toUpperCase()}</span><span><b>HUMAN</b>FOLLOW-UP</span></div><div className="city-signal-list">{city.signals.map((signal, index) => <span key={signal}><b>0{index + 1}</b>{signal}</span>)}</div></div><HeroEstimateForm defaultCity={city.name} /></section><section className="city-handoff shell"><div><p className="eyebrow">LOCAL ROUTE · ONE REQUEST</p><h2>Start here.<br/>We sort the rest.</h2><p>You do not need measurements, roofing vocabulary, or a diagnosis. Share what you see, where the property is, and how quickly you need help.</p></div><div>{[['01','PREPARE','Complete the short request and add an optional roof photo.'],['02','HAND OFF','Choose email or phone after reviewing the prepared information.'],['03','CONFIRM','A team member confirms availability; the form itself is not an appointment.'],['04','INSPECT','The field review determines condition, options, and the next decision.']].map(([n,title,copy]) => <article key={n}><small>{n}</small><h3>{title}</h3><p>{copy}</p></article>)}</div></section><section className="city-neighbor-links"><div className="shell"><Link href={`/service-areas/${city.slug}`}>OPEN THE {city.name.toUpperCase()} SERVICE FILE →</Link><Link href="/neighbors">VIEW THE NORTH ATLANTA NEIGHBOR PAGE →</Link></div></section></main>;
}
