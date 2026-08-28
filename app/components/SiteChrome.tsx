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
      { name: 'Roof repair', href: '/roof-repair', desc: 'Diagnose leaks, flashing, wind damage, and repairability.' },
      { name: 'Storm damage', href: '/storm-damage', desc: 'Priority triage, condition records, and claim-safe guidance.' },
      { name: 'Commercial roofing', href: '/commercial-roofing', desc: 'Facility-first planning for low-slope and complex properties.' },
      { name: 'Smart Roof Advisor', href: '/roof-advisor', desc: 'Get a system recommendation from six roof facts.' },
      { name: 'Roof Command Center', href: '/project-center', desc: 'Route the job, plan an inspection, prepare the property, and follow the project path.' },
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
      { name: 'Trust, legal & tax readiness', href: '/legal', desc: 'Customer terms, claims boundaries, consent, tax facts, and operating controls.' },
      { name: 'Family companies', href: '/family', desc: 'Airoze, pressure washing, and the wider network.' },
      { name: 'Service areas', href: '/service-areas', desc: 'Alpharetta, Roswell, Milton, Johns Creek, Cumming, and nearby.' },
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
    <div className="utility"><span>NORTH ATLANTA ROOFING</span><span>LEAK OR STORM? PRIORITY TRIAGE AVAILABLE</span><a href="tel:+14708342519">CALL (470) 834-2519 →</a></div>
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
      <Link className="nav-cta" href="/#hero-estimate">FREE INSPECTION <span>→</span></Link>
    </header>
    {path !== '/start' && <div className="quick-dock" aria-label="Quick actions"><Link href="/start"><small>READY TO MOVE?</small><b>START PROJECT</b></Link><Link href="/project-center"><span>COMMAND CENTER</span></Link><Link href="/marketplace"><span>SHOP</span></Link></div>}
    <div className="mobile-contact-bar" aria-label="Mobile contact actions"><a href="tel:+14708342519"><small>LEAK OR STORM?</small><b>CALL NOW</b></a><Link href="/#hero-estimate"><small>60-SECOND START</small><b>FREE QUOTE</b></Link></div>
    <CowboyCopilot path={path}/>
  </>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="footer-main">
    <div><Link className="brand inverse" href="/"><BrandMark/><span>COWBOY<small>ROOF SUPPORT</small></span></Link><p>Home-first roofing with the capability to go far beyond it. Built for North Atlanta.</p></div>
    <div><small>START</small><Link href="/#hero-estimate">Free inspection</Link><a href="tel:+14708342519">Call (470) 834-2519</a><Link href="/project-center">Roof Command Center</Link><Link href="/roof-advisor">Smart Roof Advisor</Link><Link href="/customize">Customize</Link></div>
    <div><small>SERVICES</small><Link href="/roof-repair">Roof repair</Link><Link href="/storm-damage">Storm damage</Link><Link href="/commercial-roofing">Commercial roofing</Link><Link href="/services">All services</Link><Link href="/service-areas">Service areas</Link></div>
    <div><small>TRUST + NETWORK</small><Link href="/quality">Quality & Protection</Link><Link href="/legal">Legal & tax readiness</Link><Link href="/legal#privacy">Privacy</Link><Link href="/legal#accessibility">Accessibility</Link><Link href="/family">Family companies</Link><a href="https://airoze.com" target="_blank" rel="noreferrer">Airoze ↗</a></div>
  </div><div className="footer-base"><span>© 2026 COWBOY ROOF SUPPORT</span><span><Link href="/legal#customer-terms">TERMS</Link> · <Link href="/legal#privacy">PRIVACY</Link> · ROOFED RIGHT. COWBOY BUILT.</span></div></footer>;
}
