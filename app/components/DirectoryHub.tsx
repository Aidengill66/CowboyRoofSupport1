import Link from 'next/link';
import type { NavigationGroup } from '../site-directory';

export function DirectoryHub({ group }: { group: NavigationGroup }) {
  const branches = group.children || [];
  const fileCount = branches.reduce((total, branch) => total + (branch.children?.length || 0), 0);
  const splitCount = branches.reduce((total, branch) => total + (branch.children || []).reduce((subTotal, file) => subTotal + (file.children?.length || 0), 0), 0);

  return <main className={`directory-hub directory-hub-${group.id}`}>
    <section className="directory-hub-hero">
      <div className="shell">
        <nav aria-label="Breadcrumb"><Link href="/">HOME</Link><span>→</span><Link href="/directory">ALL FILES</Link><span>→</span><b>{group.label.toUpperCase()}</b></nav>
        <div className="directory-hub-title">
          <div><p className="eyebrow light">{group.eyebrow}</p><h1>{group.label}<br/><em>directory.</em></h1></div>
          <div><p>{group.description}</p><div><span><small>CABINETS</small><b>{branches.length}</b></span><span><small>FILES</small><b>{fileCount}</b></span><span><small>DEEP SPLITS</small><b>{splitCount}</b></span></div></div>
        </div>
        <div className="directory-hub-actions"><Link href="/directory">EXPLORE THE INFINITE DIRECTORY →</Link><Link href="/">⌂ RETURN HOME</Link></div>
      </div>
    </section>

    <section className="hub-cabinet-map shell">
      <header><div><p className="eyebrow">CLICK A CABINET. KEEP GOING.</p><h2>Every decision has<br/>a deeper file.</h2></div><p>Open the cabinet itself, choose a focused file inside it, or continue into the smaller routes attached to that file.</p></header>
      <div className="hub-cabinet-grid">
        {branches.map((branch, branchIndex) => <article key={branch.id}>
          <header><small>{branch.eyebrow || `CABINET ${String(branchIndex + 1).padStart(2, '0')}`}</small><span>{branch.children?.length || 0} FILES</span></header>
          <Link className="hub-cabinet-title" href={branch.href}><h3>{branch.label}</h3><p>{branch.description}</p><b>OPEN CABINET →</b></Link>
          <div className="hub-file-list">
            {(branch.children || []).map((file, fileIndex) => <section key={file.id}>
              <Link href={file.href}><small>{String(branchIndex + 1).padStart(2, '0')}.{String(fileIndex + 1).padStart(2, '0')}</small><span><b>{file.label}</b><em>{file.description}</em></span><i>→</i></Link>
              {!!file.children?.length && <div>{file.children.map((subfile) => <Link href={subfile.href} key={subfile.id}><span>{subfile.label}</span><i>↗</i></Link>)}</div>}
            </section>)}
          </div>
        </article>)}
      </div>
    </section>

    <section className="hub-crossroads">
      <div className="shell">
        <div><p className="eyebrow light">YOU ARE NEVER STUCK</p><h2>Go deeper—or go home.</h2></div>
        <div><Link href="/">HOME <span>⌂</span></Link><Link href="/directory">ALL FILES <span>∞</span></Link><Link href="/free-inspection">FREE INSPECTION <span>→</span></Link></div>
      </div>
    </section>
  </main>;
}
