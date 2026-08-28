import type { Metadata } from 'next';
import Link from 'next/link';
import { DirectoryExplorer } from '../components/DirectoryExplorer';

export const metadata: Metadata = {
  title: 'All Files Directory',
  description: 'Explore every Cowboy Roof Support hub, cabinet, folder, technical file, marketplace department, and company system.',
};

export default function DirectoryPage() {
  return <main className="directory-page">
    <section className="directory-page-hero">
      <div className="shell">
        <nav aria-label="Breadcrumb"><Link href="/">HOME</Link><span>→</span><b>ALL FILES</b></nav>
        <div><p className="eyebrow light">THE WHOLE COWBOY WAREHOUSE</p><h1>Open a folder.<br/><em>Find another.</em></h1></div>
        <p>One searchable, expandable map for every roofing route, product department, company system, local handoff, and technical file—with Home always one click away.</p>
      </div>
    </section>
    <section className="directory-workspace shell"><DirectoryExplorer /></section>
  </main>;
}
