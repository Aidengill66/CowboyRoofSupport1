'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CowboyCopilot } from './CowboyCopilot';

const groups = [
  {
    label: 'Roofing', kicker: 'PLAN · PROTECT · BUILD',
    feature: { name: 'Start my project', href: '/start', desc: 'One simple path from problem to project request.' },
    links: [
      { name: 'Smart Roof Advisor', href: '/roof-advisor', desc: 'Get a system recommendation from six roof facts.' },
      { name: 'Customize your roof', href: '/customize', desc: 'Compare materials, colors, upgrades, and price ranges.' },
      { name: 'Services', href: '/services', desc: 'Repairs, replacement, storms, commercial, and property care.' },
      { name: 'Quality & Protection', href: '/quality', desc: 'See checkpoints, cleanup, documentation, and crew care.' },
      { name: 'Blueprints & guides', href: '/guides', desc: 'Understand every layer before you buy.' },
    ],
  },
  {
    label: 'Shop', kicker: 'SYSTEMS · UPGRADES · FIELD GOODS',
    feature: { name: 'Cowboy Marketplace', href: '/marketplace', desc: 'Build a project list or browse the current gear drop.' },
    links: [
      { name: 'Roof systems', href: '/marketplace', desc: 'Architectural, designer, metal, and solar-ready options.' },
      { name: 'Performance upgrades', href: '/marketplace', desc: 'Water barriers, ventilation, gutters, and storm gear.' },
      { name: 'Cowboy field goods', href: '/marketplace', desc: 'Hats, boots, tees, buckles, and limited drops.' },
      { name: 'Rewards', href: '/rewards', desc: 'Points, levels, perks, and the Leak Wrangler game.' },
    ],
  },
  {
    label: 'Company', kicker: 'PEOPLE · CAPABILITY · FAMILY',
    feature: { name: 'Meet the Cowboy standard', href: '/quality', desc: 'Nice people, serious roofs, no roofing riddles.' },
    links: [
      { name: 'Our quality', href: '/quality', desc: 'How every job is protected and checked.' },
      { name: 'Large-scale services', href: '/services#commercial', desc: 'Commercial, complex, arena, and high-rise capability.' },
      { name: 'Family companies', href: '/family', desc: 'Airoze, pressure washing, and the wider network.' },
      { name: 'Service area', href: '/services#inspection', desc: 'North Atlanta homes and larger regional projects.' },
    ],
  },
];

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i className="crest-hat"/><i className="crest-roof"/><i className="crest-boot left"/><i className="crest-boot right"/></span>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  return <>
    <div className="utility"><span>NORTH ATLANTA ROOFING</span><span>EXPERT MATERIALS · SMARTER ROOF SYSTEMS</span><Link href="/start">START MY PROJECT →</Link></div>
    <header className="header">
      <Link className="brand" href="/"><BrandMark/><span>COWBOY<small>ROOF SUPPORT</small></span></Link>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? 'CLOSE' : 'MENU'}</button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
        {groups.map((group) => <details className="dropdown" key={group.label}>
          <summary>{group.label} <span>⌄</span></summary>
          <div className="drop-panel mega-v2"><div className="drop-feature"><small>{group.kicker}</small><Link href={group.feature.href}><span className="drop-number">C</span><b>{group.feature.name}</b><p>{group.feature.desc}</p><strong>OPEN →</strong></Link></div><div className="drop-links">{group.links.map((item) => <Link key={item.href + item.name} href={item.href}><span><b>{item.name}</b><small>{item.desc}</small></span><i>→</i></Link>)}</div></div>
        </details>)}
        <Link className="ai-nav-link" href="/roof-advisor"><i/>AI Advisor</Link>
      </nav>
      <Link className="nav-cta" href="/start">START PROJECT <span>→</span></Link>
    </header>
    {path !== '/start' && <div className="quick-dock" aria-label="Quick actions"><Link href="/start"><small>READY TO MOVE?</small><b>START PROJECT</b></Link><Link href="/services#inspection"><span>FREE INSPECTION</span></Link><Link href="/marketplace"><span>SHOP</span></Link></div>}
    <CowboyCopilot path={path}/>
  </>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="footer-main">
    <div><Link className="brand inverse" href="/"><BrandMark/><span>COWBOY<small>ROOF SUPPORT</small></span></Link><p>Home-first roofing with the capability to go far beyond it. Built for North Atlanta.</p></div>
    <div><small>START</small><Link href="/start">Start a project</Link><Link href="/roof-advisor">Smart Roof Advisor</Link><Link href="/customize">Customize</Link><Link href="/services#inspection">Free inspection</Link></div>
    <div><small>EXPLORE</small><Link href="/services">Services</Link><Link href="/quality">Quality & Protection</Link><Link href="/guides">Guides</Link><Link href="/marketplace">Marketplace</Link></div>
    <div><small>NETWORK</small><Link href="/rewards">Rewards</Link><Link href="/family">Family companies</Link><a href="https://airoze.com" target="_blank" rel="noreferrer">Airoze ↗</a></div>
  </div><div className="footer-base"><span>© 2026 COWBOY ROOF SUPPORT</span><span>ROOFED RIGHT. COWBOY BUILT.</span></div></footer>;
}
