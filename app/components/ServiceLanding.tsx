import Link from 'next/link';

type ServiceLandingProps = {
  eyebrow: string;
  title: string;
  intro: string;
  signal: string;
  problems: [string, string][];
  steps: [string, string][];
  faqs: [string, string][];
};

export function ServiceLanding({ eyebrow, title, intro, signal, problems, steps, faqs }: ServiceLandingProps) {
  return <main className="service-landing">
    <section className="service-landing-hero"><div className="shell"><div><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{intro}</p><div className="actions"><a className="primary signal-button" href="/#hero-estimate">GET A FREE INSPECTION <span>→</span></a><a className="service-call" href="tel:+14708342519">CALL (470) 834-2519</a></div></div><aside><small>CREW SIGNAL</small><strong>{signal}</strong><span><i/> NORTH ATLANTA ROUTING</span><span><i/> PHOTO-DOCUMENTED SCOPE</span><span><i/> HUMAN CONFIRMATION</span></aside></div></section>
    <section className="service-problems shell"><header><p className="eyebrow">WHAT WE LOOK FOR</p><h2>Find the cause.<br/>Scope the right fix.</h2></header><div>{problems.map(([name, copy], index) => <article key={name}><small>0{index + 1}</small><h3>{name}</h3><p>{copy}</p></article>)}</div></section>
    <section className="service-process"><div className="shell"><header><p className="eyebrow light">THE COWBOY WORKFLOW</p><h2>Clear at every handoff.</h2></header><div>{steps.map(([name, copy], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="service-faq shell"><header><p className="eyebrow">STRAIGHT ANSWERS</p><h2>Before you book.</h2></header><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="service-area-links"><div className="shell"><div><p className="eyebrow light">LOCAL CREW ROUTING</p><h2>North Atlanta,<br/>one clear trail.</h2><p>Explore city-specific planning pages or check the entire service area.</p></div><div>{[['ALPHARETTA','/service-areas/alpharetta'],['ROSWELL','/service-areas/roswell'],['MILTON','/service-areas/milton'],['JOHNS CREEK','/service-areas/johns-creek'],['CUMMING','/service-areas/cumming'],['ALL AREAS','/service-areas']].map(([label, href]) => <Link href={href} key={href}><span>{label}</span><b>→</b></Link>)}</div></div></section>
    <section className="final-cta"><p className="eyebrow">THE NEXT STEP IS SIMPLE</p><h2>Put eyes on the roof.</h2><a className="primary" href="/#hero-estimate">REQUEST MY FREE INSPECTION <span>→</span></a></section>
  </main>;
}
