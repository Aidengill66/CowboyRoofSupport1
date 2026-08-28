import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLibraryFile, libraryFiles } from '../content';

export function generateStaticParams() { return libraryFiles.map((file) => ({ slug: file.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const file = getLibraryFile((await params).slug);
  return file ? { title: `${file.title} | Roofing Library`, description: file.intro } : { title: 'Roofing Library File' };
}

export default async function LibraryFilePage({ params }: { params: Promise<{ slug: string }> }) {
  const file = getLibraryFile((await params).slug);
  if (!file) notFound();
  const related = libraryFiles.filter((item) => item.cabinet === file.cabinet && item.slug !== file.slug).slice(0, 3);
  return <main className="file-page"><section className="file-hero"><div className="shell"><div><p className="eyebrow light">{file.cabinet} · {file.code}</p><h1>{file.title}</h1><p>{file.subtitle}</p></div><aside><small>OPEN FILE</small><strong>{file.code}</strong><span>ROOFING LIBRARY</span><Link href="/library">← BACK TO CABINETS</Link></aside></div></section><section className="file-intro shell"><span>FIELD BRIEF</span><p>{file.intro}</p></section><section className="file-signals shell"><header><p className="eyebrow">WHAT BELONGS IN THIS FILE</p><h2>Four things<br/>to inspect.</h2></header><div>{file.signals.map(([title, copy], index) => <article key={title}><small>0{index + 1}</small><h3>{title}</h3><p>{copy}</p></article>)}</div></section><section className="file-decisions"><div className="shell"><header><p className="eyebrow light">DECISION POINTS</p><h2>What changes<br/>the recommendation.</h2></header><div>{file.decisions.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section><section className="file-process shell"><header><p className="eyebrow">USE THE FILE</p><h2>From information<br/>to action.</h2></header><div>{file.steps.map(([title, copy], index) => <article key={title}><span>STEP 0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section><section className="file-related"><div className="shell"><header><p className="eyebrow light">SAME CABINET</p><h2>Related folders.</h2></header><div>{related.map((item) => <Link href={`/library/${item.slug}`} key={item.slug}><small>{item.code}</small><h3>{item.title}</h3><p>{item.subtitle}</p><b>OPEN FILE →</b></Link>)}</div></div></section><section className="file-next"><div><p className="eyebrow">READY FOR THE NEXT STEP?</p><h2>{file.nextLabel.toLowerCase()}.</h2></div><Link className="primary" href={file.nextHref}>{file.nextLabel} <span>→</span></Link></section></main>;
}
