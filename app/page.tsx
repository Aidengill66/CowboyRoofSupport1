const services = [
  ['Roof repair', 'Leaks, missing shingles, flashing failures, and the small problems that can turn expensive fast.'],
  ['Roof replacement', 'A clear, no-pressure plan for a durable roof that fits your home and your budget.'],
  ['Storm response', 'Fast help after hail, wind, and heavy weather—plus guidance through the insurance process.'],
];

export default function Home() {
  return (
    <main>
      <div className="topbar">Storm damage? We’re ready to help. <a href="#quote">Request an inspection →</a></div>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Cowboy Roof Support home"><span className="brand-mark">CR</span><span>COWBOY <small>ROOF SUPPORT</small></span></a>
        <div className="navlinks"><a href="#services">Services</a><a href="#process">Our process</a><a href="#about">Why us</a></div>
        <a className="button button-small" href="#quote">Free estimate</a>
      </nav>
      <section className="hero" id="top">
        <div className="hero-grid shell">
          <div className="hero-copy"><p className="eyebrow">ROOFING DONE THE COWBOY WAY</p><h1>We’ve got your roof<br/><em>covered.</em></h1><p className="lead">Straight answers. Solid workmanship. No runaround. Cowboy Roof Support protects the place you call home.</p><div className="actions"><a className="button" href="#quote">Get my free estimate <span>→</span></a><a className="text-link" href="#services">Explore our services ↓</a></div><div className="trust-row"><span>✓ Clear estimates</span><span>✓ Quality materials</span><span>✓ Built to last</span></div></div>
          <div className="hero-art" aria-label="Stylized illustration of a protected home roof"><div className="sun"/><div className="cloud cloud-one"/><div className="cloud cloud-two"/><div className="roof"><div className="chimney"/><div className="roof-line"/></div><div className="house"><div className="window"/><div className="door"/></div><div className="badge"><b>DEPENDABLE</b><span>FROM RIDGE TO GUTTER</span></div></div>
        </div>
        <div className="hero-footer shell"><span>Residential roofing</span><span>•</span><span>Repairs & replacements</span><span>•</span><span>Storm damage support</span></div>
      </section>
      <section className="services shell" id="services"><div className="section-heading"><div><p className="eyebrow">HOW WE CAN HELP</p><h2>Hardworking roofs.<br/>Honest service.</h2></div><p>From the first inspection to the final cleanup, you’ll always know what’s happening and why.</p></div><div className="service-grid">{services.map((service, i) => <article className="service-card" key={service[0]}><span className="service-no">0{i + 1}</span><div className={`service-icon icon-${i}`}><span/></div><h3>{service[0]}</h3><p>{service[1]}</p><a href="#quote">Talk to a roofer →</a></article>)}</div></section>
      <section className="process" id="process"><div className="shell process-grid"><div><p className="eyebrow light">A BETTER ROOFING EXPERIENCE</p><h2>Simple from<br/>start to finish.</h2><p className="process-copy">Good roofing starts with good communication. We keep the process clear and your property respected.</p></div><ol><li><b>01</b><div><h3>We take a look</h3><p>A thorough roof inspection and an honest explanation of what we find.</p></div></li><li><b>02</b><div><h3>You get a clear plan</h3><p>Options, materials, timeline, and pricing—laid out without the fine-print rodeo.</p></div></li><li><b>03</b><div><h3>We get it done right</h3><p>Careful installation, a clean jobsite, and a final walk-through with you.</p></div></li></ol></div></section>
      <section className="about shell" id="about"><div className="about-art"><span>YOUR HOME<br/>DESERVES<br/><b>THE GOOD STUFF.</b></span></div><div><p className="eyebrow">WHY COWBOY ROOF SUPPORT</p><h2>No gimmicks.<br/>Just a roof you trust.</h2><p>We believe a roofing company should show up, tell the truth, and stand behind the work. That’s the whole idea behind Cowboy Roof Support.</p><div className="proof"><div><b>Clear</b><span>communication</span></div><div><b>Careful</b><span>property protection</span></div><div><b>Clean</b><span>final walkthrough</span></div></div></div></section>
      <section className="quote" id="quote"><div className="shell quote-grid"><div><p className="eyebrow light">LET’S TALK ABOUT YOUR ROOF</p><h2>Ready to get<br/>this handled?</h2><p>Tell us what’s going on. We’ll follow up to schedule your free roof assessment.</p></div><form><label>Name<input name="name" placeholder="Your name" required/></label><label>Phone or email<input name="contact" placeholder="How should we reach you?" required/></label><label>What do you need?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Roof repair</option><option>Roof replacement</option><option>Storm damage inspection</option><option>Not sure yet</option></select></label><button className="button" type="submit">Request my free estimate →</button><small>Prototype form — connect this to your preferred inbox or CRM before launch.</small></form></div></section>
      <footer className="shell"><a className="brand" href="#top"><span className="brand-mark">CR</span><span>COWBOY <small>ROOF SUPPORT</small></span></a><p>Built on straight talk and solid work.</p><p>© 2026 Cowboy Roof Support</p></footer>
    </main>
  );
}
