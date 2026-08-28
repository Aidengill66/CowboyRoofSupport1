'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CSSProperties, ReactNode } from 'react';
import { resolvePageIdentity } from '../page-identities';
import { PageNavigator } from './PageNavigator';
import { SiteCommandCenter } from './SiteCommandCenter';

type IdentityStyle = CSSProperties & {
  '--page-accent': string;
  '--page-watermark': string;
};

export function PageIdentityLayer({ children }: { children: ReactNode }) {
  const path = usePathname();
  const identity = resolvePageIdentity(path);
  const style: IdentityStyle = {
    '--page-accent': identity.accent,
    '--page-watermark': `"${identity.code}"`,
  };

  return <div className={`route-canvas motif-${identity.motif}${path === '/' ? ' route-home' : ''}`} style={style}>
    {identity.showRail !== false && <aside className="purpose-rail" aria-label={`${identity.title} page purpose`}>
      <div className="purpose-rail-pattern" aria-hidden="true" />
      <div className="purpose-rail-inner">
        <div className="purpose-code"><span>{identity.code}</span><small>DEDICATED PAGE</small></div>
        <div className="purpose-statement">
          <small>{identity.collection}</small>
          <strong>{identity.title}</strong>
          <p>{identity.purpose}</p>
        </div>
        <div className="purpose-outcomes">
          <small>THIS PAGE DELIVERS</small>
          <ol>{identity.outcomes.map((outcome, index) => <li key={outcome}><b>0{index + 1}</b>{outcome}</li>)}</ol>
        </div>
        <Link className="purpose-action" href={identity.action.href}><small>PRIMARY ACTION</small><b>{identity.action.label}</b><span>↗</span></Link>
      </div>
      <nav className="purpose-path" aria-label="Page location"><Link href="/">HOME</Link><i>/</i><Link href="/directory">ALL FILES</Link><i>/</i><span>{identity.title.toUpperCase()}</span></nav>
    </aside>}
    <PageNavigator />
    {children}
    <SiteCommandCenter />
  </div>;
}
