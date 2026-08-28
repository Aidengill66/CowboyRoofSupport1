'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { directoryRoots, flattenDirectory } from '../site-directory';

type SearchRecord = {
  label: string;
  href: string;
  description: string;
  trail: string;
  eyebrow: string;
};

type RecentPage = { label: string; href: string };

const index = (() => {
  const seen = new Set<string>();
  return flattenDirectory(directoryRoots).flatMap(({ node, parents }) => {
    const key = `${node.href}|${node.label}`;
    if (seen.has(key)) return [];
    seen.add(key);
    return [{
      label: node.label,
      href: node.href,
      description: node.description,
      trail: parents.map((parent) => parent.label).filter((label) => label !== 'Home').join(' / '),
      eyebrow: node.eyebrow || parents.at(-1)?.eyebrow || 'COWBOY FILE',
    } satisfies SearchRecord];
  });
})();

const quickActions: SearchRecord[] = [
  { label: 'Start a roof project', href: '/start', description: 'Choose the need, urgency, system, and contact path.', trail: 'Fast action', eyebrow: 'START HERE' },
  { label: 'Active leak or repair', href: '/roof-repair', description: 'Open safety-first repair and leak guidance.', trail: 'Roofing / Repair', eyebrow: 'PRIORITY PATH' },
  { label: 'Run the Roof Advisor', href: '/roof-advisor', description: 'Use six field factors to build a starting recommendation.', trail: 'Roof intelligence', eyebrow: 'SMART TOOL' },
  { label: 'Request a free inspection', href: '/free-inspection', description: 'Prepare a concise request and choose the human handoff.', trail: 'Field handoff', eyebrow: 'FREE INSPECTION' },
  { label: 'Search every file', href: '/directory', description: 'Open the complete cabinet, folder, and file directory.', trail: 'Information warehouse', eyebrow: 'ALL FILES' },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function score(record: SearchRecord, query: string) {
  const label = normalize(record.label);
  const description = normalize(record.description);
  const trail = normalize(record.trail);
  const words = normalize(query).split(' ').filter(Boolean);
  return words.reduce((total, word) => {
    if (label === word) return total + 20;
    if (label.startsWith(word)) return total + 11;
    if (label.includes(word)) return total + 8;
    if (trail.includes(word)) return total + 4;
    if (description.includes(word)) return total + 2;
    return total - 5;
  }, 0);
}

export function openSiteCommandCenter() {
  window.dispatchEvent(new CustomEvent('crs:open-search'));
}

export function SiteCommandCenter() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<RecentPage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const path = usePathname();
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return quickActions;
    return index
      .map((record) => ({ record, score: score(record, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.record.label.localeCompare(b.record.label))
      .slice(0, 12)
      .map((item) => item.record);
  }, [query]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('crs:open-search', handler);
    return () => window.removeEventListener('crs:open-search', handler);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem('crs-recent-pages');
    let timer: number | undefined;
    if (stored) {
      try {
        const saved = JSON.parse(stored) as RecentPage[];
        timer = window.setTimeout(() => setRecent(saved), 0);
      } catch {
        window.localStorage.removeItem('crs-recent-pages');
      }
    }
    return () => { if (timer) window.clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const record = index.find((item) => item.href.split('?')[0] === path) || quickActions.find((item) => item.href === path);
    if (!record || path === '/') return;
    const stored = window.localStorage.getItem('crs-recent-pages');
    let current: RecentPage[] = [];
    if (stored) {
      try { current = JSON.parse(stored) as RecentPage[]; } catch { current = []; }
    }
    const next = [{ label: record.label, href: path }, ...current.filter((item) => item.href !== path)].slice(0, 4);
    window.localStorage.setItem('crs-recent-pages', JSON.stringify(next));
    const timer = window.setTimeout(() => setRecent(next), 0);
    return () => window.clearTimeout(timer);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => {
    const handler = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches('input, textarea, select, [contenteditable="true"]');
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === '/' && !typing && !open) {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const navigate = (record: SearchRecord) => {
    setOpen(false);
    setQuery('');
    router.push(record.href);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((value) => Math.min(value + 1, Math.max(results.length - 1, 0)));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, 0));
    }
    if (event.key === 'Enter' && results[active]) {
      event.preventDefault();
      navigate(results[active]);
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (results[active]) navigate(results[active]);
  };

  if (!open) return null;

  return <div className="command-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
    <section className="command-palette" role="dialog" aria-modal="true" aria-label="Search Cowboy Roof Support">
      <header>
        <div><span>⌕</span><small>THE WHOLE COWBOY WAREHOUSE</small><b>Find any service, tool, product, city, or technical file.</b></div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close search">ESC</button>
      </header>
      <form onSubmit={submit}>
        <span aria-hidden="true">⌕</span>
        <input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={onInputKeyDown} placeholder="Try “active leak,” “metal roof,” “Alpharetta,” or “operations”" aria-label="Search the entire site" autoComplete="off" />
        {query && <button type="button" onClick={() => setQuery('')}>CLEAR</button>}
      </form>
      <div className="command-results" role="listbox" aria-label="Search results">
        <div className="command-results-label"><small>{query ? `${results.length} BEST MATCHES` : 'FASTEST TRAILS'}</small><span>{index.length} INDEXED FILES</span></div>
        {results.map((record, indexPosition) => <button type="button" key={`${record.href}-${record.label}`} className={active === indexPosition ? 'active' : ''} onMouseEnter={() => setActive(indexPosition)} onClick={() => navigate(record)} role="option" aria-selected={active === indexPosition}>
          <span className="command-result-index">{String(indexPosition + 1).padStart(2, '0')}</span>
          <span className="command-result-copy"><small>{record.eyebrow}</small><b>{record.label}</b><em>{record.description}</em></span>
          <span className="command-result-trail">{record.trail || 'FRONT DOOR'}</span>
          <i>→</i>
        </button>)}
        {!results.length && <div className="command-empty"><span>NO EXACT FILE</span><b>Try the roof problem, material, city, or next action.</b><Link href="/directory" onClick={() => setOpen(false)}>OPEN ALL FILES →</Link></div>}
      </div>
      {!!recent.length && !query && <footer><small>RECENTLY OPENED</small><div>{recent.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}<span>↗</span></Link>)}</div></footer>}
      <div className="command-help"><span><kbd>↑</kbd><kbd>↓</kbd> MOVE</span><span><kbd>ENTER</kbd> OPEN</span><span><kbd>ESC</kbd> CLOSE</span><b>NO DEAD ENDS</b></div>
    </section>
  </div>;
}
