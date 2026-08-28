'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CowboyCopilot } from './CowboyCopilot';

const groups = [
  {
    label: 'Roofing', kicker: 'PLAN · PROTECT · BUILD',
    feature: { name: 'Roofing Library', href: '/library', desc: 'The complete cabinet: services, materials, storm files, estate planning, and guides.' },
    links: [
      { name: 'Roof replacement', href: '/roof-replacement', desc: 'Scope, system selection, pricing drivers, installation, and closeout.' },
      { name: 'Roof repair', href: '/roof-repair', desc: 'Diagnose leaks, flashing, wind damage, and repairability.' },
      { name: 'Storm damage', href: '/storm-damage', desc: 'Priority triage, condition records, and claim-safe guidance.' },
      { name: 'Commercial roofing', href: '/commercial-roofing', desc: 'Facility-first planning for low-slope and complex properties.' },
      { name: 'Transformation gallery', href: '/transformations', desc: 'Interactive mansion, estate, and luxury-home roof concepts.' },
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
      { name: 'Roof systems', href: '/roof-systems', desc: 'Architectural, designer, metal, slate-look, and low-slope systems.' },
      { name: 'Performance upgrades', href: '/performance-upgrades', desc: 'Water barriers, ventilation, gutters, and storm-readiness files.' },
      { name: 'Cowboy field goods', href: '/field-goods', desc: 'Hats, boots, tees, buckles, and limited drops on their own shelf.' },
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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const path = usePathname();
  useEffect(() => { setOpen(false); setActiveMenu(null); }, [path]);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setActiveMenu(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveMenu(null); };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);
  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };
  const leave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
  };
  return <>
    <div className="utility"><span>NORTH ATLANTA ROOFING</span><span>LEAK OR STORM? PRIORITY TRIAGE AVAILABLE</span><a href="tel:+14708342519">CALL (470) 834-2519 →</a></div>
    <header className="header" ref={headerRef} onMouseLeave={leave}>
      <Link className="brand" href="/"><BrandMark/><span>COWBOY<small>ROOF SUPPORT</small></span></Link>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? 'CLOSE' : 'MENU'}</button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation" onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}>
        {groups.map((group) => <div className={activeMenu === group.label ? 'dropdown is-open' : 'dropdown'} key={group.label} onMouseEnter={() => enter(group.label)} onMouseLeave={leave}>
          <button className="menu-trigger" type="button" aria-expanded={activeMenu === group.label} aria-controls={`menu-${group.label.toLowerCase()}`} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); enter(group.label); } }} onClick={() => enter(group.label)}>{group.label} <span>⌄</span></button>
          <div id={`menu-${group.label.toLowerCase()}`} className="drop-panel mega-v2"><div className="drop-feature"><small>{group.kicker}</small><Link href={group.feature.href}><span className="drop-number">C</span><b>{group.feature.name}</b><p>{group.feature.desc}</p><strong>OPEN →</strong></Link></div><div className="drop-links">{group.links.map((item) => <Link key={item.href + item.name} href={item.href}><span><b>{item.name}</b><small>{item.desc}</small></span><i>→</i></Link>)}</div></div>
        </div>)}
        <Link className="ai-nav-link" href="/roof-advisor"><i/>AI Advisor</Link>
      </nav>
      <Link className="nav-cta" href="/free-inspection">FREE INSPECTION <span>→</span></Link>
    </header>
    {path !== '/start' && <div className="quick-dock" aria-label="Quick actions"><Link href="/start"><small>READY TO MOVE?</small><b>START PROJECT</b></Link><Link href="/project-center"><span>COMMAND CENTER</span></Link><Link href="/marketplace"><span>SHOP</span></Link></div>}
    <div className="mobile-contact-bar" aria-label="Mobile contact actions"><a href="tel:+14708342519"><small>LEAK OR STORM?</small><b>CALL NOW</b></a><Link href="/free-inspection"><small>60-SECOND START</small><b>FREE QUOTE</b></Link></div>
    <CowboyCopilot path={path}/>
  </>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="footer-main">
    <div><Link className="brand inverse" href="/"><BrandMark/><span>COWBOY<small>ROOF SUPPORT</small></span></Link><p>Home-first roofing with the capability to go far beyond it. Built for North Atlanta.</p></div>
    <div><small>START</small><Link href="/free-inspection">Free inspection</Link><a href="tel:+14708342519">Call (470) 834-2519</a><Link href="/project-center">Roof Command Center</Link><Link href="/roof-advisor">Smart Roof Advisor</Link><Link href="/customize">Customize</Link></div>
    <div><small>SERVICES</small><Link href="/roof-replacement">Roof replacement</Link><Link href="/roof-repair">Roof repair</Link><Link href="/storm-damage">Storm damage</Link><Link href="/commercial-roofing">Commercial roofing</Link><Link href="/transformations">Transformations</Link><Link href="/service-areas">Service areas</Link></div>
    <div><small>LIBRARY + TRUST</small><Link href="/library">Roofing Library</Link><Link href="/quality">Quality & Protection</Link><Link href="/legal">Legal & tax readiness</Link><Link href="/privacy">Privacy</Link><Link href="/accessibility">Accessibility</Link><Link href="/terms">Terms</Link><Link href="/family">Family companies</Link></div>
  </div><div className="footer-base"><span>© 2026 COWBOY ROOF SUPPORT</span><span><Link href="/terms">TERMS</Link> · <Link href="/privacy">PRIVACY</Link> · ROOFED RIGHT. COWBOY BUILT.</span></div></footer>;
}
