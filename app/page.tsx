'use client';

import { useMemo, useState } from 'react';

const jobs = [
  { icon: '⌁', name: 'Roof repair', note: 'Leaks, flashing & shingles', price: 'From $350', tag: 'Most booked' },
  { icon: '⌂', name: 'New roof', note: 'Full replacement options', price: 'Free quote', tag: 'Best value' },
  { icon: 'ϟ', name: 'Storm check', note: 'Hail & wind inspection', price: 'Free check', tag: 'Fast response' },
  { icon: '◫', name: 'Gutters', note: 'Repair, clean or replace', price: 'From $225', tag: 'Easy add-on' },
];

const towns = ['Alpharetta', 'Roswell', 'Cumming', 'Milton', 'Johns Creek', 'Woodstock'];

export default function Home() {
  const [selected, setSelected] = useState('Roof repair');
  const [town, setTown] = useState('Alpharetta');
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const job = useMemo(() => jobs.find((item) => item.name === selected)!, [selected]);

  return (
    <main>
      <header className="nav wrap">
        <a className="brand" href="#top"><span className="brand-stamp">CRS</span><span>COWBOY<small>ROOF SUPPORT</small></span></a>
        <div className="area-pill"><span>●</span> Serving North Atlanta</div>
        <a className="pro-link" href="#pros">Roofers: join the crew →</a>
      </header>

      <section className="hero" id="top">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker">THE NORTH ATLANTA ROOFING MARKETPLACE</p>
            <h1>Round up the right<br/><em>roofing help.</em></h1>
            <p className="lede">Pick the job. Tell us where. Get a clear path forward from local roofing pros—without chasing down five companies.</p>
            <div className="quick-proof"><span>✓ Local crews</span><span>✓ Clear next steps</span><span>✓ No-pressure help</span></div>
          </div>

          <div className="matcher" aria-label="Roofing service matcher">
            <div className="matcher-head"><span>JOB BOARD</span><b>{step} / 2</b></div>
            {!submitted ? <>
              {step === 1 ? <div className="match-body"><h2>What needs wranglin’?</h2><p>Choose the closest match. You can add details later.</p><div className="job-picks">{jobs.map((item) => <button key={item.name} className={selected === item.name ? 'active' : ''} onClick={() => setSelected(item.name)}><span>{item.icon}</span><b>{item.name}</b></button>)}</div><button className="primary" onClick={() => setStep(2)}>Next: your area →</button></div>
              : <div className="match-body"><button className="back" onClick={() => setStep(1)}>← Back</button><h2>Where’s the homestead?</h2><p>We’re focused on North Atlanta and nearby communities.</p><label>Choose your city<select value={town} onChange={(e) => setTown(e.target.value)}>{towns.map((item) => <option key={item}>{item}</option>)}</select></label><div className="match-summary"><span>{job.icon}</span><div><small>YOUR REQUEST</small><b>{selected} in {town}</b></div><strong>{job.price}</strong></div><button className="primary" onClick={() => setSubmitted(true)}>Find my roofing help →</button></div>}
            </> : <div className="match-body success"><div className="lasso">✓</div><p className="kicker">REQUEST ROUNDED UP</p><h2>You’re on the board.</h2><p>Your {selected.toLowerCase()} request for {town} is ready. The full marketplace will connect this step to local availability and quotes.</p><button className="secondary" onClick={() => {setSubmitted(false);setStep(1)}}>Start another request</button></div>}
          </div>
        </div>
      </section>

      <section className="market wrap" id="market">
        <div className="section-title"><div><p className="kicker">SHOP ROOFING SERVICES</p><h2>Pick a job.<br/>We’ll help saddle it.</h2></div><p>Simple starting points for the work North Atlanta homeowners request most.</p></div>
        <div className="cards">{jobs.map((item) => <article key={item.name}><div className="card-top"><span className="job-icon">{item.icon}</span><span className="tag">{item.tag}</span></div><h3>{item.name}</h3><p>{item.note}</p><div className="card-foot"><b>{item.price}</b><button onClick={() => {setSelected(item.name);setStep(2);setSubmitted(false);document.getElementById('top')?.scrollIntoView()}}>Choose job →</button></div></article>)}</div>
      </section>

      <section className="how"><div className="wrap how-grid"><div><p className="kicker gold">HOW THE TRAIL WORKS</p><h2>Three steps.<br/>No rodeo.</h2></div><div className="trail"><div><b>1</b><span><strong>Post the job</strong><small>Tell us what the roof is doing.</small></span></div><i>→</i><div><b>2</b><span><strong>See your options</strong><small>Compare the right kind of help.</small></span></div><i>→</i><div><b>3</b><span><strong>Get it handled</strong><small>Choose your next step with confidence.</small></span></div></div></div></section>

      <section className="local wrap"><div className="local-copy"><p className="kicker">OUR HOME RANGE</p><h2>North Atlanta,<br/>we ride for you.</h2><p>Built for homeowners across the northern arc of metro Atlanta—from Roswell rooftops to growing neighborhoods in Cumming.</p></div><div className="town-board">{towns.map((item, i) => <button key={item} onClick={() => {setTown(item);setStep(2);document.getElementById('top')?.scrollIntoView()}}><span>0{i + 1}</span>{item}<b>→</b></button>)}</div></section>

      <section className="pros" id="pros"><div className="wrap pro-grid"><div className="brand-stamp large">CRS</div><div><p className="kicker gold">FOR NORTH ATLANTA ROOFERS</p><h2>Good crews belong on the board.</h2><p>The marketplace side of Cowboy Roof Support can help qualified local roofing teams find the right jobs—not just more noise.</p></div><button className="light-button">Join the founding crew →</button></div></section>
      <footer className="wrap"><span>© 2026 Cowboy Roof Support</span><b>North Atlanta’s roofing job board</b><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
