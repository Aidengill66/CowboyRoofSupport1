'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { resolvePageIdentity } from '../page-identities';
import { openSiteCommandCenter } from './SiteCommandCenter';

type PageSection = { id: string; label: string };

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 58) || 'section';
}

export function PageNavigator() {
  const path = usePathname();
  const identity = resolvePageIdentity(path);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [active, setActive] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const headings = Array.from(document.querySelectorAll<HTMLElement>('.route-canvas > main section h2'));
      const used = new Set<string>();
      const next = headings.flatMap((heading) => {
        const label = heading.textContent?.replace(/\s+/g, ' ').trim();
        if (!label || used.has(label) || heading.closest('[hidden]')) return [];
        used.add(label);
        const base = heading.id || slugify(label);
        let id = base;
        let suffix = 2;
        while (document.getElementById(id) && document.getElementById(id) !== heading) id = `${base}-${suffix++}`;
        heading.id = id;
        heading.classList.add('page-nav-target');
        return [{ id, label }];
      }).slice(0, 8);
      setSections(next);
      setActive(next[0]?.id || '');
    }, 80);
    return () => window.clearTimeout(timer);
  }, [path]);

  useEffect(() => {
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive((visible[0].target as HTMLElement).id);
    }, { rootMargin: '-22% 0px -67% 0px', threshold: 0 });
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const update = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? Math.min(100, Math.max(0, (window.scrollY / maximum) * 100)) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [path]);

  if (!sections.length) return null;

  return <nav className="page-navigator" aria-label="On this page">
    <div className="page-nav-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
    <div className="page-nav-inner">
      <div className="page-nav-title"><small>ON THIS PAGE</small><b>{identity.title}</b></div>
      <div className="page-nav-links">
        {sections.map((section, index) => <a href={`#${section.id}`} key={section.id} className={active === section.id ? 'active' : ''}><small>0{index + 1}</small>{section.label}</a>)}
      </div>
      <button type="button" className="page-nav-search" onClick={openSiteCommandCenter}><span>⌕</span><small>FIND ANYTHING</small><kbd>⌘K</kbd></button>
      <Link className="page-nav-action" href={identity.action.href}>{identity.action.label}<span>→</span></Link>
    </div>
  </nav>;
}
