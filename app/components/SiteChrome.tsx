'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CowboyCopilot } from './CowboyCopilot';
import { navigationGroups } from '../site-directory';

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><img src="/cowboy-roof-logo-v2-256.png" alt="" /></span>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeBranches, setActiveBranches] = useState<Record<string, string>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const path = usePathname();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(false);
      setActiveMenu(null);
      setActiveBranches({});
    }, 0);
    return () => window.clearTimeout(timer);
  }, [path]);
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
  const selectBranch = (groupId: string, branchId: string) => {
    setActiveBranches((current) => ({ ...current, [groupId]: branchId }));
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
        <Link className="nav-home-link" href="/"><i aria-hidden="true">⌂</i>HOME</Link>
        {navigationGroups.map((group) => {
          const branches = group.children || [];
          const selectedBranch = branches.find((branch) => branch.id === activeBranches[group.id]) || branches[0];
          return <div className={activeMenu === group.id ? 'dropdown is-open' : 'dropdown'} data-menu={group.id} key={group.id} onMouseEnter={() => enter(group.id)} onMouseLeave={leave}>
            <div className="menu-root">
              <Link className="menu-root-link" href={group.href} onFocus={() => enter(group.id)}>{group.label}</Link>
              <button
                className="menu-trigger"
                type="button"
                aria-label={`Open ${group.label} directory`}
                aria-expanded={activeMenu === group.id}
                aria-controls={`menu-${group.id}`}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    enter(group.id);
                  }
                }}
                onClick={() => setActiveMenu((current) => current === group.id ? null : group.id)}
              ><span>⌄</span></button>
            </div>
            <div id={`menu-${group.id}`} className="drop-panel mega-v3">
              <div className="drop-feature">
                <small>{group.eyebrow}</small>
                <Link href={group.href}>
                  <span className="drop-number">{group.id.slice(0, 1).toUpperCase()}</span>
                  <b>{group.label} Hub</b>
                  <p>{group.description}</p>
                  <strong>{group.featureLabel} →</strong>
                </Link>
                <Link className="drop-all-files" href="/directory">ALL FILES · INFINITE DIRECTORY →</Link>
              </div>
              <div className="drop-branches">
                <header><small>{group.kicker}</small><b>CHOOSE A CABINET</b></header>
                {branches.map((branch, index) => <div className={selectedBranch?.id === branch.id ? 'active' : ''} key={branch.id} onMouseEnter={() => selectBranch(group.id, branch.id)}>
                  <Link href={branch.href} onFocus={() => selectBranch(group.id, branch.id)}>
                    <small>0{index + 1}</small>
                    <span><b>{branch.label}</b><em>{branch.description}</em></span>
                  </Link>
                  {!!branch.children?.length && <button type="button" aria-label={`Open ${branch.label} folders`} onClick={() => selectBranch(group.id, branch.id)}>›</button>}
                </div>)}
              </div>
              <div className="drop-depth">
                {selectedBranch && <>
                  <header>
                    <div><small>{selectedBranch.eyebrow || 'NEXT DIRECTORY'}</small><b>{selectedBranch.label}</b></div>
                    <Link href={selectedBranch.href}>OPEN CABINET →</Link>
                  </header>
                  <div className="drop-depth-files">
                    {(selectedBranch.children || []).map((file, index) => <article key={file.id}>
                      <Link className="depth-file" href={file.href}>
                        <small>FILE {String(index + 1).padStart(2, '0')}</small>
                        <b>{file.label}</b>
                        <p>{file.description}</p>
                        <strong>OPEN PAGE →</strong>
                      </Link>
                      {!!file.children?.length && <div className="depth-subfiles">
                        <span>MORE SPLITS</span>
                        {file.children.map((subfile) => <Link href={subfile.href} key={subfile.id}><b>{subfile.label}</b><small>{subfile.description}</small><i>→</i></Link>)}
                      </div>}
                    </article>)}
                  </div>
                </>}
              </div>
            </div>
          </div>;
        })}
        <Link className="nav-directory-link" href="/directory"><i/>All files</Link>
        <button className="site-search-trigger" type="button" onClick={() => window.dispatchEvent(new CustomEvent('crs:open-search'))} aria-label="Search the entire Cowboy Roof Support site"><span>⌕</span>FIND<kbd>⌘K</kbd></button>
        <Link className="ai-nav-link" href="/roof-advisor"><i/>Roof Copilot</Link>
      </nav>
      <Link className="nav-cta" href="/free-inspection">FREE INSPECTION <span>→</span></Link>
    </header>
    {path !== '/start' && <div className="quick-dock" aria-label="Quick actions"><Link href="/start"><small>READY TO MOVE?</small><b>START PROJECT</b></Link><Link href="/growth"><span>GROWTH</span></Link><Link href="/leads"><span>LEADS</span></Link><Link href="/network"><span>NETWORK</span></Link><Link href="/operations"><span>OPERATIONS</span></Link><Link href="/marketplace"><span>SHOP</span></Link></div>}
    <div className="mobile-contact-bar" aria-label="Mobile contact actions"><a href="tel:+14708342519"><small>LEAK OR STORM?</small><b>CALL NOW</b></a><Link href="/free-inspection"><small>60-SECOND START</small><b>FREE QUOTE</b></Link></div>
    <CowboyCopilot path={path}/>
  </>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="footer-main">
    <div><Link className="brand inverse" href="/"><BrandMark/><span>COWBOY<small>ROOF SUPPORT</small></span></Link><p>Home-first roofing with the capability to go far beyond it. Built for North Atlanta.</p></div>
    <div><small>START</small><Link href="/free-inspection">Free inspection</Link><a href="tel:+14708342519">Call (470) 834-2519</a><Link href="/neighbors">Neighbor roof check</Link><Link href="/share">Family Share Desk</Link><Link href="/growth">Growth Command Center</Link><Link href="/leads">Local Lead Desk</Link><Link href="/network">Referral Partner Network</Link><Link href="/operations">Roofing Operations Center</Link><Link href="/project-center">Roof Command Center</Link><Link href="/roof-advisor">Smart Roof Advisor</Link><Link href="/customize">Customize</Link></div>
    <div><small>SERVICES</small><Link href="/roof-replacement">Roof replacement</Link><Link href="/roof-repair">Roof repair</Link><Link href="/storm-damage">Storm damage</Link><Link href="/commercial-roofing">Commercial roofing</Link><Link href="/transformations">Transformations</Link><Link href="/service-areas">Service areas</Link></div>
    <div><small>LIBRARY + TRUST</small><Link href="/">Home</Link><Link href="/directory">All Files Directory</Link><Link href="/roofing">Roofing Hub</Link><Link href="/shop">Shop Hub</Link><Link href="/company">Company Hub</Link><Link href="/library">Roofing Library</Link><Link href="/quality">Quality & Protection</Link><Link href="/legal">Legal & tax readiness</Link><Link href="/privacy">Privacy</Link><Link href="/accessibility">Accessibility</Link><Link href="/terms">Terms</Link><Link href="/family">Family companies</Link></div>
  </div><div className="footer-base"><span>© 2026 COWBOY ROOF SUPPORT</span><span><Link href="/terms">TERMS</Link> · <Link href="/privacy">PRIVACY</Link> · ROOFED RIGHT. COWBOY BUILT.</span></div></footer>;
}
