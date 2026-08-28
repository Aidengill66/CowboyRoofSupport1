'use client';

import Link from 'next/link';
import { type CSSProperties, useEffect, useMemo, useState } from 'react';

type View = 'funnel' | 'plan' | 'priority' | 'content';

type FunnelState = {
  reach: number;
  clickRate: number;
  leadRate: number;
  appointmentRate: number;
  closeRate: number;
  averageJob: number;
};

type LeadState = {
  service: 'repair' | 'storm' | 'replacement' | 'inspection';
  urgency: 'active' | 'soon' | 'planning';
  referred: boolean;
  homeowner: boolean;
  roofAge: number;
  detail: 'clear' | 'partial' | 'minimal';
};

const views: Array<{ id: View; label: string; number: string }> = [
  { id: 'funnel', label: 'Funnel Lab', number: '01' },
  { id: 'plan', label: '30-Day Trail', number: '02' },
  { id: 'priority', label: 'Lead Priority', number: '03' },
  { id: 'content', label: 'Content Forge', number: '04' },
];

const planTasks = [
  { id: 'w1-profile', week: 'WEEK 01', title: 'Tighten the family profile', detail: 'Use one clear description, North Atlanta service area, phone number, and the trackable Share Desk link.' },
  { id: 'w1-intro', week: 'WEEK 01', title: 'Publish the personal introduction', detail: 'Explain the family connection and why you trust the roofing team before asking anyone to click.' },
  { id: 'w1-cities', week: 'WEEK 01', title: 'Create five city links', detail: 'Generate a separate campaign for Alpharetta, Roswell, Milton, Johns Creek, and Cumming.' },
  { id: 'w1-response', week: 'WEEK 01', title: 'Write the response standard', detail: 'Prepare a friendly first reply for comments, messages, calls, and prepared inspection briefs.' },
  { id: 'w2-tip', week: 'WEEK 02', title: 'Post one safety tip', detail: 'Teach neighbors what not to do after wind, rain, hail, or an active leak.' },
  { id: 'w2-library', week: 'WEEK 02', title: 'Share a technical file', detail: 'Choose a useful roofing-library page and explain why the detail matters to a homeowner.' },
  { id: 'w2-question', week: 'WEEK 02', title: 'Ask a real question', detail: 'Invite neighbors to name the roof issue they find most confusing, then answer without pressure.' },
  { id: 'w2-followup', week: 'WEEK 02', title: 'Follow up with warm replies', detail: 'Respond quickly to every useful comment or message while the introduction is still fresh.' },
  { id: 'w3-storm', week: 'WEEK 03', title: 'Prepare the storm version', detail: 'Generate a campaign that routes wind and hail concerns into the storm inspection starting service.' },
  { id: 'w3-proof', week: 'WEEK 03', title: 'Publish one verified proof item', detail: 'Use only a real review, credential, job photo, or process detail that can be substantiated.' },
  { id: 'w3-partner', week: 'WEEK 03', title: 'Create a partner code', detail: 'Give a realtor, property manager, pressure-washing client, or family contact a distinct referral code.' },
  { id: 'w3-repost', week: 'WEEK 03', title: 'Repost the short version', detail: 'Use the concise template in one relevant group instead of repeating the long introduction.' },
  { id: 'w4-review', week: 'WEEK 04', title: 'Review the source labels', detail: 'Check prepared briefs and note which referrers, cities, and roof concerns created real conversations.' },
  { id: 'w4-double', week: 'WEEK 04', title: 'Repeat the useful winner', detail: 'Reuse the topic and city combination that produced the strongest conversations.' },
  { id: 'w4-thank', week: 'WEEK 04', title: 'Thank the introducers', detail: 'Close the loop with every family member, customer, or partner who created a warm introduction.' },
  { id: 'w4-next', week: 'WEEK 04', title: 'Build next month', detail: 'Carry forward the winning campaigns and replace activities that produced no useful engagement.' },
];

const contentTopics = {
  inspection: {
    label: 'General roof check',
    opening: 'Not sure what your roof needs? You do not need roofing vocabulary to start.',
    service: 'general',
  },
  repair: {
    label: 'Leak or repair',
    opening: 'A ceiling stain does not always reveal where water entered. Start with the facts you can safely see.',
    service: 'repair',
  },
  storm: {
    label: 'Wind or storm',
    opening: 'After wind, hail, or falling debris, protect people first and stay off a wet or damaged roof.',
    service: 'storm',
  },
  replacement: {
    label: 'Older roof',
    opening: 'An older roof deserves a condition-based decision—not an automatic replacement pitch.',
    service: 'replacement',
  },
};

const cityNames: Record<string, string> = {
  'north-atlanta': 'North Atlanta',
  alpharetta: 'Alpharetta',
  roswell: 'Roswell',
  milton: 'Milton',
  'johns-creek': 'Johns Creek',
  cumming: 'Cumming',
};

const channelRows = [
  ['FAMILY PROFILE', 'Trust-rich introductions', '1–2 useful posts weekly', 'Personal story + short link'],
  ['NEIGHBOR GROUPS', 'City and subdivision relevance', 'Post only when genuinely useful', 'City page + specific concern'],
  ['PAST CUSTOMERS', 'Warm follow-up and referrals', 'After successful service moments', 'Thank-you + neighbor link'],
  ['LOCAL PARTNERS', 'Realtors and property contacts', 'One distinct code per partner', 'Partner code + inspection path'],
  ['TEXT MESSAGE', 'Direct one-to-one handoff', 'Only to people expecting it', 'Short copy + exact landing page'],
];

const formatMoney = (value: number) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format(value);

export function GrowthCommandCenter() {
  const [view, setView] = useState<View>('funnel');
  const [funnel, setFunnel] = useState<FunnelState>({
    reach: 6000,
    clickRate: 2.5,
    leadRate: 12,
    appointmentRate: 65,
    closeRate: 28,
    averageJob: 14500,
  });
  const [completed, setCompleted] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [lead, setLead] = useState<LeadState>({
    service: 'inspection',
    urgency: 'planning',
    referred: true,
    homeowner: true,
    roofAge: 12,
    detail: 'partial',
  });
  const [contentCity, setContentCity] = useState('north-atlanta');
  const [contentTopic, setContentTopic] = useState<keyof typeof contentTopics>('inspection');
  const [contentTone, setContentTone] = useState<'personal' | 'direct' | 'educational'>('personal');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('cowboy_growth_plan');
      if (saved) setCompleted(JSON.parse(saved) as string[]);
    } catch {
      setCompleted([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem('cowboy_growth_plan', JSON.stringify(completed));
    } catch {
      // The checklist still works for the current visit when browser storage is unavailable.
    }
  }, [completed, loaded]);

  const funnelResults = useMemo(() => {
    const clicks = Math.round(funnel.reach * funnel.clickRate / 100);
    const leads = Math.round(clicks * funnel.leadRate / 100);
    const appointments = Math.round(leads * funnel.appointmentRate / 100);
    const jobs = Math.round(appointments * funnel.closeRate / 100);
    const projectedRevenue = jobs * funnel.averageJob;
    return { clicks, leads, appointments, jobs, projectedRevenue };
  }, [funnel]);

  const leadScore = useMemo(() => {
    let score = 0;
    score += { repair: 18, storm: 22, replacement: 25, inspection: 12 }[lead.service];
    score += { active: 25, soon: 16, planning: 7 }[lead.urgency];
    score += lead.referred ? 18 : 5;
    score += lead.homeowner ? 15 : 6;
    score += Math.min(Math.max(lead.roofAge, 0), 30) * 0.5;
    score += { clear: 10, partial: 6, minimal: 2 }[lead.detail];
    return Math.min(100, Math.round(score));
  }, [lead]);

  const priority = leadScore >= 75
    ? { label: 'PRIORITY 1', action: 'Respond now', detail: 'Confirm safety, contact information, property, availability, and the immediate next step.' }
    : leadScore >= 52
      ? { label: 'PRIORITY 2', action: 'Respond today', detail: 'Clarify the roof concern and move the homeowner toward a confirmed inspection conversation.' }
      : { label: 'NURTURE', action: 'Be useful first', detail: 'Answer the question, share the right guide, and schedule a respectful follow-up.' };

  const contentPost = useMemo(() => {
    const topic = contentTopics[contentTopic];
    const city = cityNames[contentCity];
    const path = contentCity === 'north-atlanta' ? '/neighbors' : `/neighbors/${contentCity}`;
    const params = new URLSearchParams({
      ref: 'growth-command',
      utm_source: 'facebook',
      utm_medium: 'organic_social',
      utm_campaign: `${contentCity}_${contentTopic}`,
      service: topic.service,
    });
    const url = `https://cowboy-roof-support.dotsmsatellite730.chatgpt.site${path}?${params.toString()}`;
    const introductions = {
      personal: `${city} friends and neighbors — our family roofing team built a straightforward way to ask for help without a high-pressure sales pitch.`,
      direct: `Need roof help in ${city}? Start with the condition and the right next step.`,
      educational: `One useful roof reminder for ${city} homeowners: safe observations are more valuable than risky guesses from the roof.` ,
    };
    return `${introductions[contentTone]} ${topic.opening} Start a free roof-check request here: ${url}`;
  }, [contentCity, contentTopic, contentTone]);

  const updateFunnel = (key: keyof FunnelState, value: number) => {
    setFunnel((current) => ({ ...current, [key]: value }));
  };

  const toggleTask = (id: string) => {
    setCompleted((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  };

  const copyPost = async () => {
    try {
      await navigator.clipboard.writeText(contentPost);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const progress = Math.round(completed.length / planTasks.length * 100);

  return <section className="growth-command">
    <header className="growth-command-header">
      <div>
        <span><i/>ORGANIC ENGINE ONLINE</span>
        <h2>Growth Command Center</h2>
      </div>
      <div className="growth-live-stats">
        <span><small>ACTIVE MARKET</small>NORTH ATLANTA</span>
        <span><small>PAID MEDIA</small>OFF</span>
        <span><small>PRIMARY TRAIL</small>REFERRALS</span>
      </div>
    </header>

    <nav className="growth-tabs" role="tablist" aria-label="Growth tools">
      {views.map((item) => <button
        key={item.id}
        type="button"
        role="tab"
        aria-selected={view === item.id}
        className={view === item.id ? 'active' : ''}
        onClick={() => setView(item.id)}
      >
        <small>{item.number}</small>
        <span>{item.label}</span>
      </button>)}
    </nav>

    {view === 'funnel' && <section className="growth-panel funnel-panel" role="tabpanel">
      <div className="panel-intro">
        <small>ORGANIC FUNNEL LAB</small>
        <h3>Model the trail before you scale it.</h3>
        <p>Adjust realistic assumptions for monthly reach, link activity, prepared requests, confirmed inspections, and won work.</p>
      </div>
      <div className="funnel-controls">
        <label>
          <span>MONTHLY ORGANIC REACH <b>{funnel.reach.toLocaleString()}</b></span>
          <input type="range" min="500" max="30000" step="500" value={funnel.reach} onChange={(event) => updateFunnel('reach', Number(event.target.value))}/>
        </label>
        <label>
          <span>LINK CLICK RATE <b>{funnel.clickRate.toFixed(1)}%</b></span>
          <input type="range" min="0.5" max="10" step="0.5" value={funnel.clickRate} onChange={(event) => updateFunnel('clickRate', Number(event.target.value))}/>
        </label>
        <label>
          <span>REQUEST RATE <b>{funnel.leadRate}%</b></span>
          <input type="range" min="2" max="35" step="1" value={funnel.leadRate} onChange={(event) => updateFunnel('leadRate', Number(event.target.value))}/>
        </label>
        <label>
          <span>INSPECTION CONFIRMATION <b>{funnel.appointmentRate}%</b></span>
          <input type="range" min="20" max="95" step="5" value={funnel.appointmentRate} onChange={(event) => updateFunnel('appointmentRate', Number(event.target.value))}/>
        </label>
        <label>
          <span>PROJECT CLOSE RATE <b>{funnel.closeRate}%</b></span>
          <input type="range" min="5" max="70" step="1" value={funnel.closeRate} onChange={(event) => updateFunnel('closeRate', Number(event.target.value))}/>
        </label>
        <label>
          <span>AVERAGE WON PROJECT <b>{formatMoney(funnel.averageJob)}</b></span>
          <input type="range" min="1000" max="30000" step="500" value={funnel.averageJob} onChange={(event) => updateFunnel('averageJob', Number(event.target.value))}/>
        </label>
      </div>
      <div className="funnel-readout">
        {[
          ['01', 'REACH', funnel.reach],
          ['02', 'LINK VISITS', funnelResults.clicks],
          ['03', 'PREPARED LEADS', funnelResults.leads],
          ['04', 'INSPECTIONS', funnelResults.appointments],
          ['05', 'WON PROJECTS', funnelResults.jobs],
        ].map(([number, label, value], index) => <article key={String(label)}>
          <small>{number}</small>
          <span>{label}</span>
          <b>{Number(value).toLocaleString()}</b>
          {index < 4 && <i>→</i>}
        </article>)}
      </div>
      <div className="revenue-readout">
        <div>
          <small>MODELED WON REVENUE</small>
          <strong>{formatMoney(funnelResults.projectedRevenue)}</strong>
        </div>
        <p>Planning model only. These are adjustable scenarios—not forecasts, guarantees, financial advice, or evidence of past performance.</p>
      </div>
    </section>}

    {view === 'plan' && <section className="growth-panel plan-panel" role="tabpanel">
      <div className="plan-top">
        <div className="panel-intro">
          <small>DEVICE-SAVED FIELD PLAN</small>
          <h3>Thirty days of useful visibility.</h3>
          <p>The checklist saves on this device. It does not create an account or sync activity across your team.</p>
        </div>
        <div className="plan-progress" style={{ '--progress': `${progress * 3.6}deg` } as CSSProperties}>
          <strong>{progress}%</strong>
          <span>{completed.length} / {planTasks.length} DONE</span>
          <button type="button" onClick={() => setCompleted([])}>RESET LOCAL PLAN</button>
        </div>
      </div>
      <div className="plan-weeks">
        {['WEEK 01', 'WEEK 02', 'WEEK 03', 'WEEK 04'].map((week) => <section key={week}>
          <header><small>{week}</small><span>{planTasks.filter((task) => task.week === week && completed.includes(task.id)).length} / 4</span></header>
          {planTasks.filter((task) => task.week === week).map((task) => <label key={task.id} className={completed.includes(task.id) ? 'complete' : ''}>
            <input type="checkbox" checked={completed.includes(task.id)} onChange={() => toggleTask(task.id)}/>
            <span>
              <b>{task.title}</b>
              <small>{task.detail}</small>
            </span>
            <i>{completed.includes(task.id) ? '✓' : '+'}</i>
          </label>)}
        </section>)}
      </div>
    </section>}

    {view === 'priority' && <section className="growth-panel priority-panel" role="tabpanel">
      <div className="priority-inputs">
        <div className="panel-intro">
          <small>RESPONSE ROUTER</small>
          <h3>Who needs help first?</h3>
          <p>Use operational facts to choose response speed. Never use this score to decide who deserves service or different pricing.</p>
        </div>
        <label>SERVICE
          <select value={lead.service} onChange={(event) => setLead((current) => ({ ...current, service: event.target.value as LeadState['service'] }))}>
            <option value="inspection">General inspection</option>
            <option value="repair">Leak or repair</option>
            <option value="storm">Storm concern</option>
            <option value="replacement">Replacement planning</option>
          </select>
        </label>
        <label>URGENCY
          <select value={lead.urgency} onChange={(event) => setLead((current) => ({ ...current, urgency: event.target.value as LeadState['urgency'] }))}>
            <option value="active">Active leak or urgent condition</option>
            <option value="soon">Needs help within 30 days</option>
            <option value="planning">Planning and learning</option>
          </select>
        </label>
        <label>ROOF AGE <span>{lead.roofAge} YEARS</span>
          <input type="range" min="0" max="30" value={lead.roofAge} onChange={(event) => setLead((current) => ({ ...current, roofAge: Number(event.target.value) }))}/>
        </label>
        <label>REQUEST DETAIL
          <select value={lead.detail} onChange={(event) => setLead((current) => ({ ...current, detail: event.target.value as LeadState['detail'] }))}>
            <option value="clear">Clear concern and property details</option>
            <option value="partial">Some useful information</option>
            <option value="minimal">Minimal information</option>
          </select>
        </label>
        <div className="priority-checks">
          <label><input type="checkbox" checked={lead.referred} onChange={(event) => setLead((current) => ({ ...current, referred: event.target.checked }))}/><span>Warm referral source</span></label>
          <label><input type="checkbox" checked={lead.homeowner} onChange={(event) => setLead((current) => ({ ...current, homeowner: event.target.checked }))}/><span>Property decision-maker confirmed</span></label>
        </div>
      </div>
      <div className="priority-result">
        <small>WORKFLOW SCORE</small>
        <strong>{leadScore}</strong>
        <span>/ 100</span>
        <div className="priority-meter"><i style={{ width: `${leadScore}%` }}/></div>
        <h3>{priority.label}</h3>
        <b>{priority.action}</b>
        <p>{priority.detail}</p>
        <ol>
          <li>Confirm immediate safety and active water.</li>
          <li>Verify contact, property, and service area.</li>
          <li>Set the next human response expectation.</li>
          <li>Document the source and conversation.</li>
        </ol>
        <Link href="/project-center">OPEN PROJECT ROUTER →</Link>
      </div>
    </section>}

    {view === 'content' && <section className="growth-panel content-panel" role="tabpanel">
      <div className="content-forge-controls">
        <div className="panel-intro">
          <small>LOCAL CONTENT FORGE</small>
          <h3>Write the useful post.</h3>
          <p>Choose the market, topic, and tone. The post carries a trackable organic link into the correct neighbor funnel.</p>
        </div>
        <label>MARKET
          <select value={contentCity} onChange={(event) => setContentCity(event.target.value)}>
            {Object.entries(cityNames).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
        </label>
        <label>ROOF TOPIC
          <select value={contentTopic} onChange={(event) => setContentTopic(event.target.value as keyof typeof contentTopics)}>
            {Object.entries(contentTopics).map(([value, topic]) => <option value={value} key={value}>{topic.label}</option>)}
          </select>
        </label>
        <label>TONE
          <select value={contentTone} onChange={(event) => setContentTone(event.target.value as typeof contentTone)}>
            <option value="personal">Personal introduction</option>
            <option value="direct">Direct and concise</option>
            <option value="educational">Educational first</option>
          </select>
        </label>
      </div>
      <div className="content-output">
        <header><span><i/>POST READY</span><small>{contentPost.length} CHARACTERS</small></header>
        <textarea readOnly value={contentPost} aria-label="Generated organic social post"/>
        <div>
          <button type="button" onClick={copyPost}>{copied ? 'COPIED ✓' : 'COPY POST →'}</button>
          <Link href="/share">OPEN ADVANCED SHARE DESK</Link>
        </div>
        <p>Review every post before publishing. Use only accurate service, credential, testimonial, and project claims.</p>
      </div>
      <div className="channel-matrix">
        <header><small>CHANNEL</small><small>WHY IT WORKS</small><small>HEALTHY CADENCE</small><small>BEST HANDOFF</small></header>
        {channelRows.map((row) => <article key={row[0]}>{row.map((cell, index) => index === 0 ? <b key={cell}>{cell}</b> : <span key={cell}>{cell}</span>)}</article>)}
      </div>
    </section>}

    <footer className="growth-command-footer">
      <span>DEVICE-LOCAL PLANNING · NO HIDDEN CRM · NO AD PIXEL</span>
      <div>
        <Link href="/share">BUILD A CAMPAIGN</Link>
        <Link href="/neighbors">OPEN CUSTOMER FUNNEL</Link>
      </div>
    </footer>
  </section>;
}
