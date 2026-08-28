'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';

export function BeforeAfter() {
  const [position, setPosition] = useState(52);
  const [detail, setDetail] = useState('finish');
  const details: Record<string, [string, string]> = {
    finish: ['FINISH', 'Architectural shingle pattern, clean valleys, and deliberate edge lines.'],
    water: ['WATER CONTROL', 'Flashing, underlayment, and drainage details do the invisible work.'],
    air: ['ATTIC AIRFLOW', 'Intake and exhaust are balanced to manage heat and moisture.'],
    closeout: ['CLOSEOUT', 'Photos, cleanup, warranty records, and one final walkthrough.'],
  };

  return <section className="comparison-section"><div className="shell comparison-shell">
    <header><div><p className="eyebrow light">DRAG TO COMPARE</p><h2>See the change.<br/>Inspect the system.</h2></div><p>Move the handle to compare a worn roof with a clean replacement concept. Then open each field checkpoint to see what good roofing must solve beyond curb appeal.</p></header>
    <div className="comparison-workspace">
      <div className="comparison-frame" style={{ '--compare': `${position}%` } as CSSProperties}>
        <img src="/roof-before-prototype-v1.png" alt="Worn North Atlanta residential roof before replacement concept"/>
        <div className="after-layer"><img src="/roof-after-prototype-v1.png" alt="Same residential roof after replacement concept"/></div>
        <span className="compare-label before">BEFORE</span><span className="compare-label after">AFTER</span><i className="compare-line"/><b className="compare-handle" aria-hidden="true">↔</b>
        <input aria-label="Reveal the after-roof image" type="range" min="3" max="97" value={position} onChange={(e) => setPosition(Number(e.target.value))}/>
      </div>
      <aside><small>FIELD CHECKPOINTS</small><div>{Object.keys(details).map((key, index) => <button className={detail === key ? 'active' : ''} key={key} onClick={() => setDetail(key)}><i>0{index + 1}</i><span>{details[key][0]}</span><b>{detail === key ? '−' : '+'}</b></button>)}</div><article><small>WHY IT MATTERS</small><h3>{details[detail][0]}</h3><p>{details[detail][1]}</p><a href="/quality">OPEN THE QUALITY STANDARD →</a></article></aside>
    </div>
    <footer>VISUAL PLANNING EXAMPLE · GENERATED FOR THIS PROTOTYPE · NOT PRESENTED AS A CUSTOMER PROJECT</footer>
  </div></section>;
}
