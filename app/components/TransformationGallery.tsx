'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { CSSProperties } from 'react';

const projects = [
  { id: 'milton-estate', city: 'MILTON ESTATE', system: 'PREMIUM ARCHITECTURAL', title: 'European estate renewal', before: '/estate-before-v1.png', after: '/estate-after-v1.png', file: '/library/estate-roof-planning', note: 'Complex valleys, four chimneys, dormers, copper drainage, and a unified charcoal finish.' },
  { id: 'lake-metal', city: 'CUMMING LAKE HOUSE', system: '24-GAUGE STANDING SEAM', title: 'Modern metal precision', before: '/lake-metal-before-v1.png', after: '/lake-metal-after-v1.png', file: '/library/standing-seam-metal', note: 'Low-profile geometry, skylight curbs, long panel runs, edge metal, and transition discipline.' },
  { id: 'georgian', city: 'ALPHARETTA MANSION', system: 'DESIGNER SLATE-LOOK', title: 'Classic Georgian upgrade', before: '/georgian-before-v1.png', after: '/georgian-after-v1.png', file: '/library/designer-shingles', note: 'Broad fields, dormers, twin chimneys, refined shadow lines, and sharp ridge definition.' },
];

export function TransformationGallery({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(52);
  const project = projects[active];
  const choose = (index: number) => { setActive(index); setPosition(52); };

  return <div className={compact ? 'transformation-gallery compact' : 'transformation-gallery'}>
    <div className="transformation-tabs" role="tablist" aria-label="Choose a transformation concept">{projects.map((item, index) => <button key={item.id} role="tab" aria-selected={active === index} className={active === index ? 'active' : ''} onClick={() => choose(index)}><small>0{index + 1} · {item.city}</small><span>{item.title}</span><i>{active === index ? 'VIEWING' : 'OPEN'}</i></button>)}</div>
    <div className="transformation-stage">
      <div className="comparison-frame mansion-frame" style={{ '--compare': `${position}%` } as CSSProperties}>
        <img src={project.before} alt={`${project.city.toLowerCase()} roof before conceptual replacement`}/>
        <div className="after-layer"><img src={project.after} alt={`${project.city.toLowerCase()} roof after conceptual replacement`}/></div>
        <span className="compare-label before">BEFORE</span><span className="compare-label after">AFTER</span><i className="compare-line"/><b className="compare-handle" aria-hidden="true">↔</b>
        <input aria-label={`Reveal the after image for ${project.city}`} type="range" min="3" max="97" value={position} onInput={(event) => setPosition(Number(event.currentTarget.value))} onChange={(event) => setPosition(Number(event.currentTarget.value))}/>
      </div>
      <aside><small>{project.city}</small><h3>{project.system}</h3><p>{project.note}</p><div><span><small>VIEW</small>ELEVATED 3/4</span><span><small>FOCUS</small>ROOF SYSTEM</span></div><Link href={project.file}>OPEN THE TECHNICAL FILE →</Link></aside>
    </div>
    <footer><span>GENERATED PLANNING CONCEPTS · NOT PRESENTED AS COMPLETED CUSTOMER PROJECTS</span>{compact && <Link href="/transformations">OPEN THE FULL TRANSFORMATION GALLERY →</Link>}</footer>
  </div>;
}
