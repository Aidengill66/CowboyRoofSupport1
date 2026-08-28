import Link from 'next/link';

export default function Home() {
  return <main>
    <section className="home-hero">
      <div className="hero-copy"><p className="eyebrow">NORTH ATLANTA · BUILT ABOVE STANDARD</p><h1>A better roof.<br/><em>Built your way.</em></h1><p>Clear choices, real planning tools, and a hands-on crew—from the home over your head to the biggest roof in the skyline.</p><div className="actions"><Link className="primary" href="/customize">CUSTOMIZE YOUR ROOF <span>→</span></Link><Link className="text-link" href="/services">EXPLORE SERVICES</Link></div></div>
      <div className="hero-architecture"><div className="arch-label"><span>01 / ROOF SYSTEM</span><span>INTERACTIVE PLANNING</span></div><div className="house-art"><span className="sun"/><span className="roof-plane one"/><span className="roof-plane two"/><span className="house-block"><i/><i/><i/></span><b>THE NORTH RANGE</b></div><div className="arch-data"><span><small>ROOF TYPE</small>ARCHITECTURAL</span><span><small>REGION</small>NORTH ATLANTA</span><Link href="/customize">OPEN CONFIGURATOR ↗</Link></div></div>
    </section>
    <section className="promise-strip"><span>FREE INSPECTION</span><i>✦</i><span>BLUEPRINT-FIRST PLANNING</span><i>✦</i><span>RESIDENTIAL + COMMERCIAL</span><i>✦</i><span>COWBOY FOLLOW-THROUGH</span></section>
    <section className="route-section shell"><div className="section-intro"><p className="eyebrow">ONE CLEAR PLACE FOR EVERY JOB</p><h2>Choose your trail.</h2><p>The old one-page site is now divided into focused sections. Go deep when you want detail. Get answers fast when you do not.</p></div><div className="route-grid">
      <Link className="route-card dark-card" href="/customize"><span>01</span><small>INTERACTIVE TOOL</small><h3>Customize<br/>your roof.</h3><p>Shape, size, materials, colors, upgrades, blueprint, and a live planning range.</p><b>START BUILDING →</b></Link>
      <Link className="route-card blueprint-card" href="/guides"><span>02</span><small>KNOW YOUR SYSTEM</small><h3>Blueprints<br/>& easy guides.</h3><div className="mini-blueprint"><i/><i/><i/></div><b>LEARN THE ROOF →</b></Link>
      <Link className="route-card copper-card" href="/marketplace"><span>03</span><small>ROOF + FIELD GOODS</small><h3>Shop the<br/>marketplace.</h3><p>Roof systems, upgrades, storm gear, hats, boots, and limited drops.</p><b>ENTER MARKETPLACE →</b></Link>
    </div></section>
    <section className="scale-section"><div className="scale-copy"><p className="eyebrow light">HOME ROOFS COME FIRST</p><h2>Small enough to care.<br/>Built to go big.</h2><p>Replacement, repair, ventilation, gutters, storm response—and dedicated planning for complex commercial roofs, high-rises, arenas, and large properties.</p><Link className="outline-light" href="/services">SEE EVERY CAPABILITY →</Link></div><div className="skyline-art"><span/><span/><span/><i/><b>HOME → COMPLEX → SKYLINE</b></div></section>
    <section className="final-cta"><p className="eyebrow">YOUR ROOF. YOUR PLAN.</p><h2>Ready to build it?</h2><Link className="primary" href="/customize">OPEN THE CONFIGURATOR <span>→</span></Link></section>
  </main>;
}
