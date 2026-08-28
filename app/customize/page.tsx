'use client';

import { useMemo, useState } from 'react';

const materials = [
  { id: 'architectural', name: 'Architectural shingle', rate: 5.5, life: '25–30 yr' },
  { id: 'designer', name: 'Designer shingle', rate: 7.5, life: '30–40 yr' },
  { id: 'metal', name: 'Standing seam metal', rate: 12.5, life: '40–60 yr' },
  { id: 'solar', name: 'Solar-ready metal', rate: 16.5, life: '40–60 yr' },
];
const upgrades = [
  { name: 'Ice & water shield', cost: 850, detail: 'Extra protection at valleys and vulnerable edges' },
  { name: 'High-flow ventilation', cost: 1200, detail: 'Balanced intake and ridge exhaust planning' },
  { name: 'Copper flashing', cost: 1800, detail: 'Premium detail work at transitions and masonry' },
  { name: 'Seamless gutters', cost: 2400, detail: 'A coordinated drainage system for the new roof' },
];

export default function CustomizePage() {
  const [shape, setShape] = useState('gable');
  const [sqft, setSqft] = useState(2400);
  const [stories, setStories] = useState(2);
  const [material, setMaterial] = useState('architectural');
  const [color, setColor] = useState('charcoal');
  const [selected, setSelected] = useState<string[]>(['Ice & water shield']);
  const quote = useMemo(() => {
    const rate = materials.find((m) => m.id === material)?.rate || 5.5;
    const factor = ({ gable: 1, hip: 1.08, flat: .96, complex: 1.2 } as Record<string,number>)[shape];
    const extras = upgrades.filter((u) => selected.includes(u.name)).reduce((sum,u) => sum + u.cost, 0);
    const midpoint = sqft * rate * factor * (1 + (stories - 1) * .07) + extras;
    return [Math.round(midpoint * .88 / 500) * 500, Math.round(midpoint * 1.12 / 500) * 500];
  }, [shape, sqft, stories, material, selected]);
  const toggle = (name:string) => setSelected((now) => now.includes(name) ? now.filter((x) => x !== name) : [...now,name]);
  return <main className="config-page">
    <section className="config-intro shell"><div><p className="eyebrow">ROOF CONFIGURATOR / 01—05</p><h1>Build the roof<br/>before we build it.</h1></div><p>Explore form, material, color, protection, and a realistic planning range. Your selections create a visual project brief for a free on-roof inspection.</p></section>
    <section className="config-shell shell">
      <aside className="config-steps"><a href="#shape"><span>01</span>ROOF FORM</a><a href="#material"><span>02</span>MATERIAL</a><a href="#color"><span>03</span>COLOR</a><a href="#upgrades"><span>04</span>UPGRADES</a><a href="#range"><span>05</span>PLAN RANGE</a></aside>
      <div className="config-builder">
        <section id="shape" className="config-block"><div className="block-head"><span>01</span><div><small>START WITH THE STRUCTURE</small><h2>Roof form & scale</h2></div></div><div className="blueprint-stage"><div className={`roof-blueprint ${shape} tone-${color}`}><span className="bp-roof"/><span className="bp-house"/><i className="dimension d1">{sqft.toLocaleString()} SQ FT</i><i className="dimension d2">{stories} {stories === 1 ? 'STORY' : 'STORIES'}</i></div><div className="bp-meta"><span>CONCEPT BLUEPRINT</span><span>NOT FOR CONSTRUCTION</span></div></div><div className="option-grid four">{[['gable','Gable'],['hip','Hip'],['flat','Low slope'],['complex','Complex']].map(([id,name]) => <button key={id} className={shape===id?'selected':''} onClick={()=>setShape(id)}><i className={`shape-icon ${id}`}/><b>{name}</b></button>)}</div><label className="range-label"><span>ESTIMATED ROOF AREA <b>{sqft.toLocaleString()} sq ft</b></span><input type="range" min="1200" max="5000" step="100" value={sqft} onChange={(e)=>setSqft(Number(e.target.value))}/></label><div className="story-row"><span>STORIES</span>{[1,2,3].map(n=><button key={n} className={stories===n?'selected':''} onClick={()=>setStories(n)}>{n}</button>)}</div></section>
        <section id="material" className="config-block"><div className="block-head"><span>02</span><div><small>PERFORMANCE + PROFILE</small><h2>Choose your material</h2></div></div><div className="material-options">{materials.map((m)=><button key={m.id} className={material===m.id?'selected':''} onClick={()=>setMaterial(m.id)}><span className={`material-swatch ${m.id}`}/><small>{m.life} EXPECTED SERVICE</small><b>{m.name}</b><i>${m.rate.toFixed(2)} / SQ FT PLANNING BASE</i></button>)}</div></section>
        <section id="color" className="config-block"><div className="block-head"><span>03</span><div><small>CURB APPEAL</small><h2>Finish the roofline</h2></div></div><div className="color-row">{[['charcoal','Storm charcoal'],['bronze','Burnished bronze'],['weathered','Weathered gray'],['terra','Georgia clay']].map(([id,name])=><button key={id} className={color===id?'selected':''} onClick={()=>setColor(id)}><i className={id}/><span>{name}</span></button>)}</div></section>
        <section id="upgrades" className="config-block"><div className="block-head"><span>04</span><div><small>GO ABOVE STANDARD</small><h2>System upgrades</h2></div></div><div className="upgrade-list">{upgrades.map((u)=><button key={u.name} onClick={()=>toggle(u.name)} className={selected.includes(u.name)?'selected':''}><i>{selected.includes(u.name)?'✓':'+'}</i><span><b>{u.name}</b><small>{u.detail}</small></span><strong>+ ${u.cost.toLocaleString()}</strong></button>)}</div></section>
        <section id="range" className="price-panel"><div><p className="eyebrow light">05 / PROJECT PLANNING RANGE</p><h2>${quote[0].toLocaleString()} <small>—</small> ${quote[1].toLocaleString()}</h2><p>A practical early range based on your roof area, form, stories, material, and selected upgrades.</p></div><div className="brief"><span><small>FORM</small>{shape}</span><span><small>SYSTEM</small>{materials.find(m=>m.id===material)?.name}</span><span><small>FINISH</small>{color}</span><span><small>UPGRADES</small>{selected.length}</span><a href="mailto:hello@cowboyroofsupport.com?subject=My Cowboy roof plan">SEND MY PLAN →</a></div><small className="disclaimer">Planning estimate only—not a quote or offer. Pitch, access, tear-off, decking, permits, code requirements, and field conditions are confirmed during a free inspection.</small></section>
      </div>
    </section>
    <section className="easy-steps"><div className="shell"><p className="eyebrow light">WHAT HAPPENS NEXT</p><h2>From blueprint to boots on the roof.</h2><div>{[['01','Save your concept','Bring your material, color, and system preferences.'],['02','Free inspection','We measure, photograph, and check the complete roof system.'],['03','Final scope','You receive real options, a firm written proposal, and a clear schedule.'],['04','Cowboy build','Protection, installation, cleanup, and a final walkthrough.']].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></div></section>
  </main>;
}
