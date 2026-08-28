'use client';

import { useState } from 'react';

type Product = { name: string; category: string; tone: string; eyebrow: string; desc: string; warranty: string; price: string };

const products: Product[] = [
  { name: 'The Ranch', category: 'Shingles', tone: 'charcoal', eyebrow: 'ARCHITECTURAL SHINGLE', desc: 'Dimensional curb appeal with dependable everyday performance.', warranty: 'Limited lifetime', price: '$$' },
  { name: 'Blue Ridge', category: 'Shingles', tone: 'slate', eyebrow: 'PREMIUM SHINGLE', desc: 'A deeper profile inspired by North Georgia slate and shadow lines.', warranty: 'Limited lifetime', price: '$$$' },
  { name: 'The Stockman', category: 'Metal', tone: 'metal', eyebrow: 'STANDING SEAM METAL', desc: 'Clean vertical lines, excellent water shedding, and long service life.', warranty: 'Up to 40 years', price: '$$$$' },
  { name: 'Copper Creek', category: 'Metal', tone: 'copper', eyebrow: 'DESIGNER METAL', desc: 'Warm modern metal with a refined, heritage-inspired finish.', warranty: 'Up to 40 years', price: '$$$$' },
  { name: 'High Noon', category: 'Solar', tone: 'solar', eyebrow: 'SOLAR-READY SYSTEM', desc: 'A roof plan prepared for clean solar integration now or later.', warranty: 'System specific', price: '$$$$' },
  { name: 'Trail Guard', category: 'Protection', tone: 'membrane', eyebrow: 'ROOF PROTECTION', desc: 'Underlayment, ventilation, flashing, and water-barrier essentials.', warranty: 'System specific', price: '$' },
];

const serviceAreas = ['Alpharetta', 'Roswell', 'Milton', 'Johns Creek', 'Cumming', 'Woodstock'];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [saved, setSaved] = useState<string[]>([]);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [service, setService] = useState('Replace my roof');
  const [city, setCity] = useState('Alpharetta');
  const [estimateDone, setEstimateDone] = useState(false);
  const visibleProducts = filter === 'All' ? products : products.filter((p) => p.category === filter);
  const toggleSaved = (name: string) => setSaved((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);

  return <main>
    <div className="announcement"><span>Now serving North Atlanta</span><p>Complimentary roof assessments available this week</p><a href="#estimate">Book yours <b>↗</b></a></div>
    <header className="site-header">
      <div className="nav-shell">
        <a className="logo" href="#top"><span className="logo-icon">C</span><span>COWBOY<small>ROOF SUPPORT</small></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button>
        <nav className={menuOpen ? 'nav-menu open' : 'nav-menu'} aria-label="Main navigation">
          <details className="nav-drop"><summary>Roofing <span>⌄</span></summary><div className="mega-menu"><div><small>ROOFING SERVICES</small><a href="#estimate"><b>Roof replacement</b><span>Build a complete new roof system</span></a><a href="#estimate"><b>Roof repair</b><span>Leaks, flashing, shingles and more</span></a><a href="#estimate"><b>Storm restoration</b><span>Hail and wind damage support</span></a></div><div><small>POPULAR RESOURCES</small><a href="#process"><b>How it works</b><span>Your project from assessment to cleanup</span></a><a href="#areas"><b>Service areas</b><span>Explore our North Atlanta coverage</span></a></div></div></details>
          <details className="nav-drop products-drop"><summary>Products <span>⌄</span></summary><div className="mega-menu"><div><small>SHOP BY MATERIAL</small><a href="#products" onClick={() => setFilter('Shingles')}><b>Architectural shingles</b><span>Classic, dimensional and designer options</span></a><a href="#products" onClick={() => setFilter('Metal')}><b>Metal roofing</b><span>Standing seam and premium finishes</span></a></div><div className="featured-nav"><span className="mini-roof metal"/><small>FEATURED SYSTEM</small><b>The Stockman</b><p>Modern standing seam, built for the long haul.</p><a href="#products">Explore the system →</a></div></div></details>
          <a href="#products">Marketplace</a><a href="#process">How it works</a>
          <details className="nav-drop"><summary>Company <span>⌄</span></summary><div className="small-menu"><a href="#story">Our story</a><a href="#areas">North Atlanta</a><a href="#pros">For roofers</a></div></details>
        </nav>
        <div className="nav-actions"><button className="saved-button" onClick={() => document.getElementById('products')?.scrollIntoView()} aria-label={`${saved.length} saved products`}>♡ <span>{saved.length}</span></button><a className="nav-cta" href="#estimate">Get an estimate</a></div>
      </div>
    </header>

    <section className="hero-modern" id="top"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="hero-content">
      <div className="hero-text"><p className="overline">NORTH ATLANTA ROOFING, REIMAGINED</p><h1>Your roof.<br/>Your way.<span>Built better.</span></h1><p>Explore premium roof systems, compare materials, and connect with trusted local crews—all in one polished experience.</p><div className="hero-actions"><a className="dark-cta" href="#products">Explore roof systems <b>→</b></a><a className="ghost-cta" href="#estimate">Start your project</a></div><div className="hero-meta"><div><strong>North Atlanta</strong><span>Locally focused</span></div><div><strong>Curated systems</strong><span>Built for Georgia</span></div><div><strong>Clear process</strong><span>No pressure</span></div></div></div>
      <div className="roof-visual"><div className="visual-toolbar"><span>THE RANCH</span><b>01 / 04</b></div><div className="sky"><div className="visual-sun"/><div className="modern-house"><div className="modern-roof"/><div className="house-face"><span/><span/><i/></div></div></div><div className="visual-caption"><div><small>FEATURED ROOF SYSTEM</small><b>Architectural Charcoal</b></div><button onClick={() => setQuickView(products[0])}>View details ↗</button></div></div>
    </div></section>

    <section className="product-section" id="products"><div className="content-shell"><div className="section-head"><div><p className="overline">THE ROOF SHOP</p><h2>Systems designed<br/>for the way you live.</h2></div><p>Browse complete roof directions—not an overwhelming wall of samples. Save what you like and bring it to your estimate.</p></div>
      <div className="filter-row"><div>{['All','Shingles','Metal','Solar','Protection'].map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><span>{visibleProducts.length} systems</span></div>
      <div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.name}><div className={`product-image ${product.tone}`}><span className="material-lines"/><button className={saved.includes(product.name) ? 'heart saved' : 'heart'} onClick={() => toggleSaved(product.name)} aria-label={`Save ${product.name}`}>{saved.includes(product.name) ? '♥' : '♡'}</button><span className="price-level">{product.price}</span></div><div className="product-info"><p>{product.eyebrow}</p><div><h3>{product.name}</h3><button onClick={() => setQuickView(product)}>↗</button></div><span>{product.desc}</span><small>{product.warranty} warranty</small></div></article>)}</div>
      <div className="saved-bar"><span>{saved.length ? `${saved.length} roof system${saved.length > 1 ? 's' : ''} saved to your project` : 'Tap the heart to build your shortlist'}</span><button onClick={() => setFilter('All')}>View all systems →</button></div>
    </div></section>

    <section className="process-modern" id="process"><div className="content-shell"><div className="process-intro"><p className="overline light">A SIMPLER WAY TO ROOF</p><h2>From “maybe” to<br/>move-in ready.</h2><p>We bring product discovery, project planning, and local roofing support under one roof.</p></div><div className="process-list"><article><span>01</span><div><h3>Explore</h3><p>Compare curated roof systems and save your favorites.</p></div><i>⌄</i></article><article><span>02</span><div><h3>Plan</h3><p>Tell us about your home, priorities, and timeline.</p></div><i>⌄</i></article><article><span>03</span><div><h3>Connect</h3><p>Meet the right local roofing support for your project.</p></div><i>⌄</i></article><article><span>04</span><div><h3>Build</h3><p>Move forward with a clear scope and confident next steps.</p></div><i>⌄</i></article></div></div></section>

    <section className="estimate" id="estimate"><div className="estimate-shell"><div className="estimate-copy"><p className="overline">START YOUR PROJECT</p><h2>A better roof begins with a few details.</h2><p>Build a starter brief in under a minute. No commitment, no hard sell.</p><div className="estimate-quote"><span>“</span><p>Designed to make the first step feel as considered as the finished roof.</p></div></div><div className="estimate-card">{!estimateDone ? <><div className="estimate-progress"><span/><span/><span/></div><p>PROJECT BUILDER</p><h3>What can we help with?</h3><label>Project type<select value={service} onChange={(e) => setService(e.target.value)}><option>Replace my roof</option><option>Repair a roof issue</option><option>Inspect storm damage</option><option>Explore materials</option></select></label><label>Home location<select value={city} onChange={(e) => setCity(e.target.value)}>{serviceAreas.map((area) => <option key={area}>{area}</option>)}</select></label><label>When are you thinking?<div className="choice-row"><button>ASAP</button><button>1–3 months</button><button>Just exploring</button></div></label><button className="form-cta" onClick={() => setEstimateDone(true)}>Build my project brief →</button></> : <div className="estimate-success"><div>✓</div><p className="overline">BRIEF CREATED</p><h3>Your project has a starting point.</h3><p>{service} in {city}. This prototype can next connect your brief to product selections, contractor matches, and real scheduling.</p><button className="form-cta" onClick={() => setEstimateDone(false)}>Edit project</button></div>}</div></div></section>

    <section className="areas" id="areas"><div className="content-shell"><div className="section-head compact"><div><p className="overline">PROUDLY LOCAL</p><h2>North Atlanta is home.</h2></div><p>Focused service means better local knowledge, faster coordination, and roof systems selected for Georgia weather.</p></div><div className="area-grid">{serviceAreas.map((area) => <button key={area} onClick={() => {setCity(area);document.getElementById('estimate')?.scrollIntoView()}}><span>{area}</span><b>Explore service →</b></button>)}</div></div></section>

    <section className="brand-story" id="story"><div className="story-mark">C</div><div><p className="overline light">MODERN SERVICE. COWBOY VALUES.</p><h2>Show up. Be clear.<br/>Stand behind the work.</h2></div><p>Cowboy Roof Support pairs a more modern way to shop for roofing with the timeless stuff that matters: straight talk, good hands, and respect for your home.</p></section>
    <section className="pro-banner" id="pros"><div><span>FOR LOCAL ROOFING PROFESSIONALS</span><h2>Join the North Atlanta network.</h2></div><a href="#estimate">Apply to the network ↗</a></section>
    <footer><div className="footer-main"><a className="logo footer-logo" href="#top"><span className="logo-icon">C</span><span>COWBOY<small>ROOF SUPPORT</small></span></a><div><small>EXPLORE</small><a href="#products">Roof systems</a><a href="#process">How it works</a><a href="#areas">Service areas</a></div><div><small>PROJECTS</small><a href="#estimate">Get an estimate</a><a href="#products">Saved products ({saved.length})</a><a href="#pros">For roofers</a></div><div><small>SERVICE AREA</small><p>North Atlanta, Georgia</p><p>Alpharetta · Roswell · Milton<br/>Cumming · Johns Creek · Woodstock</p></div></div><div className="footer-bottom"><span>© 2026 Cowboy Roof Support</span><span>Built for North Atlanta</span><a href="#top">Back to top ↑</a></div></footer>

    {quickView && <div className="drawer-wrap" role="dialog" aria-modal="true" aria-label={`${quickView.name} details`}><button className="drawer-shade" onClick={() => setQuickView(null)} aria-label="Close details"/><aside className="product-drawer"><button className="drawer-close" onClick={() => setQuickView(null)}>×</button><div className={`drawer-image ${quickView.tone}`}><span className="material-lines"/></div><p className="overline">{quickView.eyebrow}</p><h2>{quickView.name}</h2><p>{quickView.desc}</p><dl><div><dt>Investment</dt><dd>{quickView.price}</dd></div><div><dt>Warranty</dt><dd>{quickView.warranty}</dd></div><div><dt>Best for</dt><dd>North Atlanta homes</dd></div></dl><button className="form-cta" onClick={() => {toggleSaved(quickView.name);setQuickView(null)}}>{saved.includes(quickView.name) ? 'Remove from project' : 'Save to my project'} →</button></aside></div>}
  </main>;
}
