'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const groups = [
  { label: 'Roofing', links: [['Smart Roof Advisor', '/roof-advisor'], ['Quality & Protection', '/quality'], ['Services', '/services'], ['Customize your roof', '/customize'], ['Blueprints & guides', '/guides']] },
  { label: 'Explore', links: [['Marketplace', '/marketplace'], ['Cowboy Rewards', '/rewards'], ['Family companies', '/family']] },
];

function BrandMark({ large = false }: { large?: boolean }) {
  return <span className={`brand-mark${large ? ' large' : ''}`} aria-hidden="true"><i className="crest-hat"/><i className="crest-roof"/><i className="crest-boot left"/><i className="crest-boot right"/></span>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  return <>
    <div className="utility"><span>NORTH ATLANTA ROOFING</span><span>EXPERT MATERIALS · SMARTER ROOF SYSTEMS</span><Link href="/roof-advisor">ASK THE ROOF ADVISOR →</Link></div>
    <header className="header">
      <Link className="brand" href="/"><BrandMark/><span>COWBOY<small>ROOF SUPPORT</small></span></Link>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? 'CLOSE' : 'MENU'}</button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
        {groups.map((group) => <details className="dropdown" key={group.label}>
          <summary>{group.label} <span>⌄</span></summary>
          <div className="drop-panel"><small>EXPLORE COWBOY</small>{group.links.map(([name, href]) => <Link key={href} href={href}><b>{name}</b><span>{name === 'Customize your roof' ? 'Build a system, view a blueprint, plan a range' : 'Open the full section'}</span></Link>)}</div>
        </details>)}
        <Link href="/quality">Our Quality</Link><Link href="/family">Our Network</Link>
      </nav>
      <Link className="nav-cta" href="/roof-advisor">ROOF ADVISOR <span>→</span></Link>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="footer-main">
    <div><Link className="brand inverse" href="/"><BrandMark/><span>COWBOY<small>ROOF SUPPORT</small></span></Link><p>Home-first roofing with the capability to go far beyond it. Built for North Atlanta.</p></div>
    <div><small>ROOFING</small><Link href="/roof-advisor">Smart Roof Advisor</Link><Link href="/quality">Quality & Protection</Link><Link href="/customize">Customize</Link><Link href="/services">Services</Link><Link href="/guides">Guides</Link></div>
    <div><small>EXPLORE</small><Link href="/marketplace">Marketplace</Link><Link href="/rewards">Rewards</Link><Link href="/family">Family companies</Link></div>
    <div><small>START</small><Link href="/customize">Build a roof plan</Link><Link href="/services#inspection">Free inspection</Link><a href="https://airoze.com" target="_blank" rel="noreferrer">Airoze ↗</a></div>
  </div><div className="footer-base"><span>© 2026 COWBOY ROOF SUPPORT</span><span>ROOFED RIGHT. COWBOY BUILT.</span></div></footer>;
}
