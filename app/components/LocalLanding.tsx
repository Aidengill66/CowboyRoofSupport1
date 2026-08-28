import Link from 'next/link';

type LocalLandingProps = { city: string; headline: string; intro: string; localNotes: [string, string][] };

export function LocalLanding({ city, headline, intro, localNotes }: LocalLandingProps) {
  return <main className="local-landing">
    <section className="local-hero"><div className="shell"><div><p className="eyebrow light">{city.toUpperCase()} · NORTH ATLANTA</p><h1>{headline}</h1><p>{intro}</p><div className="actions"><a className="primary signal-button" href="/#hero-estimate">FREE INSPECTION <span>→</span></a><a className="service-call" href="tel:+14708342519">CALL (470) 834-2519</a></div></div><aside><small>AREA ROUTER</small><strong>{city}</strong><span>RESIDENTIAL · REPAIR · STORM</span><i>LOCAL PAGE · CREW READY</i></aside></div></section>
    <section className="local-signals shell"><header><p className="eyebrow">LOCAL ROOF LOGIC</p><h2>Plan for the<br/>property in front of us.</h2></header><div>{localNotes.map(([name, copy], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{copy}</p></article>)}</div></section>
    <section className="local-services"><div className="shell"><header><p className="eyebrow light">CHOOSE THE JOB</p><h2>What does the roof need?</h2></header><div>{[['ROOF REPAIR','Leaks, flashing, penetrations, and targeted repairs.','/roof-repair'],['STORM DAMAGE','Document conditions, make safe, and plan next steps.','/storm-damage'],['ROOF REPLACEMENT','System selection, ventilation, scope, and closeout.','/services'],['COMMERCIAL','Low-slope and complex property planning.','/commercial-roofing']].map(([name, copy, href]) => <Link href={href} key={name}><small>{name}</small><p>{copy}</p><b>OPEN SERVICE →</b></Link>)}</div></div></section>
    <section className="local-proof shell"><div><p className="eyebrow">PROOF BEFORE PROMISE</p><h2>Good work leaves a trail.</h2><p>Expect a written scope, material-system logic, property protection, progress documentation, and a closeout package. License, insurance, manufacturer, and review badges publish only after their records are verified.</p></div><Link href="/quality">SEE THE QUALITY STANDARD →</Link></section>
    <section className="final-cta"><p className="eyebrow">READY IN {city.toUpperCase()}?</p><h2>Start with the roof.</h2><a className="primary" href="/#hero-estimate">REQUEST A FREE INSPECTION <span>→</span></a></section>
  </main>;
}
