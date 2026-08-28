'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type CenterView = 'overview' | 'timeline' | 'selections' | 'documents' | 'messages';
type ProjectState = {
  customer: string;
  project: string;
  city: string;
  propertyType: string;
  stage: number;
  tasks: string[];
  system: string;
  color: string;
  priority: string;
  upgrades: string[];
  documents: string[];
  contact: string;
};

const storageKey = 'crs-customer-project-center';

const initialState: ProjectState = {
  customer: 'Demo Homeowner',
  project: 'North Atlanta Roof Project',
  city: 'Alpharetta',
  propertyType: 'Two-story home',
  stage: 1,
  tasks: ['confirm-contact'],
  system: 'Class 4 architectural shingle',
  color: 'Weathered charcoal',
  priority: 'Balanced value + storm readiness',
  upgrades: ['Water-control package'],
  documents: ['request-summary'],
  contact: 'Text first',
};

const milestones = [
  { label: 'Request', status: 'Project brief organized', copy: 'Need, property, contact preference, and inspection request are organized for human review.', deliverable: 'Request summary', next: 'Crew confirms the inspection path.' },
  { label: 'Inspection', status: 'Field facts documented', copy: 'Roof zones, access, drainage, visible conditions, attic clues when appropriate, and system details are recorded.', deliverable: 'Inspection findings', next: 'Review findings and decide the scope path.' },
  { label: 'Scope', status: 'Options made comparable', copy: 'Repair or replacement logic, inclusions, allowances, exclusions, upgrades, and written assumptions become visible.', deliverable: 'Written proposal', next: 'Approve, revise, or ask questions.' },
  { label: 'Selections', status: 'The roof system is locked', copy: 'Material, color, accessories, ventilation, water control, responsibilities, and communication preferences are confirmed.', deliverable: 'Signed selections', next: 'Team confirms materials and scheduling.' },
  { label: 'Build', status: 'Quality checkpoints are active', copy: 'Protection, removal, deck review, dry-in, flashing, installation, ventilation, cleanup, and photos are controlled.', deliverable: 'Progress record', next: 'Complete final quality and property review.' },
  { label: 'Closeout', status: 'The permanent record is delivered', copy: 'Final walkthrough, invoice, completion photos, care guidance, and applicable written warranties are gathered.', deliverable: 'Closeout packet', next: 'Store records and follow the care plan.' },
];

const taskCatalog = [
  { id: 'confirm-contact', label: 'Confirm the best contact method', detail: 'Choose whether the team should text, call, or email first.' },
  { id: 'property-access', label: 'Prepare property access notes', detail: 'Gate, pets, parking, tenants, attic access, and sensitive areas.' },
  { id: 'roof-history', label: 'Gather known roof history', detail: 'Age, prior repairs, invoices, warranties, or known leak locations.' },
  { id: 'decision-maker', label: 'Identify the decision-maker', detail: 'Know who can review scope, selections, and documented changes.' },
  { id: 'questions', label: 'Write down the top three questions', detail: 'Use the message desk so important questions do not get lost.' },
];

const systems = [
  ['Class 4 architectural shingle', 'Practical North Atlanta balance', 'Storm-conscious option, dimensional curb appeal, broad color range.'],
  ['Premium designer shingle', 'Maximum profile and depth', 'High-definition roofline for visible and custom homes.'],
  ['24-gauge standing seam metal', 'Long-life precision system', 'Concealed-fastener path with custom detailing and clean lines.'],
  ['Low-slope membrane system', 'Water control for low slope', 'Seams, drainage, penetrations, and substrate lead the decision.'],
];

const colors = [
  ['Weathered charcoal', '#3d403e'], ['Appalachian bronze', '#5a4434'], ['Pewter gray', '#737772'], ['Deep evergreen', '#31483a'], ['Estate black', '#181b19'], ['Warm cedar', '#765241'],
];

const upgrades = [
  ['Water-control package', 'Valleys, eaves, penetrations, and vulnerable transitions.'],
  ['Ventilation balance review', 'Measure intake, exhaust, pathway, and building conditions.'],
  ['Premium edge + flashing package', 'Coordinate visible and high-risk metal details.'],
  ['Gutter + drainage coordination', 'Control where roof runoff leaves the property.'],
];

const documentCatalog = [
  ['request-summary', 'Request summary', 'Your original need, property, and contact path.'],
  ['inspection-findings', 'Inspection findings', 'Observed conditions, photos, and field notes.'],
  ['proposal', 'Written proposal', 'Scope, inclusions, options, allowances, and exclusions.'],
  ['selections', 'Selection record', 'System, color, upgrades, and approved details.'],
  ['contract', 'Signed agreement', 'The controlling written project terms.'],
  ['progress', 'Progress photos', 'Useful project-stage documentation.'],
  ['invoice', 'Final invoice', 'The final financial record for completed work.'],
  ['warranty', 'Warranty information', 'Applicable workmanship and manufacturer records.'],
];

const messageTemplates = [
  ['Ask about findings', 'Could you walk me through the most important inspection findings and show me which details are repairable versus system-level concerns?'],
  ['Compare options', 'Please explain the tradeoffs between the proposed roof options, including system details, expected maintenance, and what is excluded.'],
  ['Confirm preparation', 'Please confirm what I should move, unlock, protect, or make accessible before the crew arrives.'],
  ['Request closeout list', 'Please confirm which photos, invoices, warranty records, and care instructions will be included in the closeout packet.'],
];

function loadProject(): ProjectState {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return initialState;
    const parsed = JSON.parse(stored) as Partial<ProjectState>;
    return { ...initialState, ...parsed };
  } catch {
    return initialState;
  }
}

export function CustomerProjectCenter() {
  const [view, setView] = useState<CenterView>('overview');
  const [project, setProject] = useState<ProjectState>(initialState);
  const [timelineStage, setTimelineStage] = useState(1);
  const [message, setMessage] = useState(messageTemplates[0][1]);
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = loadProject();
      setProject(stored);
      setTimelineStage(stored.stage);
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const timer = window.setTimeout(() => window.localStorage.setItem(storageKey, JSON.stringify(project)), 180);
    return () => window.clearTimeout(timer);
  }, [hydrated, project]);

  const progress = Math.round(((project.stage + 1) / milestones.length) * 100);
  const taskProgress = Math.round((project.tasks.length / taskCatalog.length) * 100);
  const activeMilestone = milestones[project.stage];
  const selectedMilestone = milestones[timelineStage];
  const documentProgress = Math.round((project.documents.length / documentCatalog.length) * 100);
  const currentColor = colors.find(([label]) => label === project.color)?.[1] || colors[0][1];

  const projectSummary = useMemo(() => [
    'COWBOY ROOF SUPPORT · MY ROOF SUMMARY',
    `Customer: ${project.customer}`,
    `Project: ${project.project}`,
    `Property: ${project.propertyType} · ${project.city}, GA`,
    `Current stage: ${activeMilestone.label} — ${activeMilestone.status}`,
    `Roof system: ${project.system}`,
    `Color direction: ${project.color}`,
    `Priority: ${project.priority}`,
    `Upgrades: ${project.upgrades.length ? project.upgrades.join(', ') : 'None selected'}`,
    `Preparation: ${project.tasks.length}/${taskCatalog.length} tasks marked complete`,
    `Documents: ${project.documents.length}/${documentCatalog.length} marked received`,
    `Contact preference: ${project.contact}`,
    '',
    'Device-local prototype summary. Status, scheduling, selections, and documents require confirmation from Cowboy Roof Support.',
  ].join('\n'), [activeMilestone, project]);

  const update = <K extends keyof ProjectState>(key: K, value: ProjectState[K]) => setProject((current) => ({ ...current, [key]: value }));
  const toggleArray = (key: 'tasks' | 'upgrades' | 'documents', value: string) => setProject((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));

  const copy = async (value = projectSummary) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1700);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    if (!window.confirm('Reset this device-local demo project?')) return;
    window.localStorage.removeItem(storageKey);
    setProject(initialState);
    setTimelineStage(initialState.stage);
    setView('overview');
  };

  return <section id="my-roof" className="customer-center" aria-labelledby="customer-center-title">
    <div className="customer-center-shell shell">
      <header className="customer-center-header">
        <div className="customer-project-id"><span>◆</span><div><small>MY ROOF · DEVICE-LOCAL PROTOTYPE</small><h2 id="customer-center-title">{project.project}</h2><p>{project.propertyType} · {project.city}, Georgia</p></div></div>
        <div className="customer-stage-signal"><small>CURRENT CONTROL POINT</small><b>{activeMilestone.label}</b><span><i/> {activeMilestone.status}</span></div>
        <div className="customer-header-actions"><button type="button" onClick={() => copy()}>{copied ? 'COPIED ✓' : 'COPY SUMMARY'}</button><a href="tel:+14708342519">CALL TEAM</a></div>
      </header>

      <div className="customer-prototype-note"><span><i/> EXPLORABLE DEMO</span><p>This workspace saves only on this device. It is not connected to a customer account, live schedule, document server, or crew system yet.</p><button type="button" onClick={reset}>RESET DEMO</button></div>

      <nav className="customer-center-tabs" aria-label="My Roof project tools">
        {([['overview','Overview','Next action'],['timeline','Timeline','Six milestones'],['selections','Selections','System decisions'],['documents','Documents','Project record'],['messages','Message desk','Clear handoffs']] as [CenterView,string,string][]).map(([key, label, detail], index) => <button type="button" key={key} className={view === key ? 'active' : ''} onClick={() => setView(key)}><small>0{index + 1}</small><span><b>{label}</b><i>{detail}</i></span></button>)}
      </nav>

      <div className="customer-center-workspace">
        {view === 'overview' && <div className="customer-view customer-overview">
          <section className="customer-next-action"><div><small>THE ONE NEXT ACTION</small><h3>{project.stage === 0 ? 'Confirm the inspection.' : project.stage === 1 ? 'Review the field findings.' : project.stage === 2 ? 'Compare scope and options.' : project.stage === 3 ? 'Lock selections and responsibilities.' : project.stage === 4 ? 'Follow build checkpoints.' : 'Store the permanent roof record.'}</h3><p>{activeMilestone.next}</p></div><Link href={project.stage < 2 ? '/free-inspection' : '/start'}>OPEN NEXT ACTION <span>→</span></Link></section>
          <section className="customer-progress-card"><header><div><small>PROJECT PROGRESS</small><b>{progress}%</b></div><span>STAGE {String(project.stage + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}</span></header><div className="customer-progress-track"><i style={{ width: `${progress}%` }} /></div><ol>{milestones.map((item, index) => <li key={item.label} className={project.stage === index ? 'active' : project.stage > index ? 'complete' : ''}><button type="button" onClick={() => { setTimelineStage(index); setView('timeline'); }}><span>{project.stage > index ? '✓' : `0${index + 1}`}</span><b>{item.label}</b><small>{item.status}</small></button></li>)}</ol></section>
          <section className="customer-prep-card"><header><div><small>PROPERTY READINESS</small><h3>Make the next visit count.</h3></div><b>{taskProgress}%</b></header><div>{taskCatalog.map((task) => <button type="button" key={task.id} className={project.tasks.includes(task.id) ? 'complete' : ''} onClick={() => toggleArray('tasks', task.id)}><i>{project.tasks.includes(task.id) ? '✓' : '+'}</i><span><b>{task.label}</b><small>{task.detail}</small></span></button>)}</div></section>
          <section className="customer-profile-card"><header><small>PROJECT IDENTITY</small><button type="button" onClick={() => setView('selections')}>OPEN SELECTIONS →</button></header><div><label>CUSTOMER<input value={project.customer} onChange={(event) => update('customer', event.target.value)} /></label><label>PROJECT NAME<input value={project.project} onChange={(event) => update('project', event.target.value)} /></label><label>CITY<select value={project.city} onChange={(event) => update('city', event.target.value)}><option>Alpharetta</option><option>Roswell</option><option>Milton</option><option>Johns Creek</option><option>Cumming</option><option>Other North Atlanta</option></select></label><label>CONTACT<select value={project.contact} onChange={(event) => update('contact', event.target.value)}><option>Text first</option><option>Call first</option><option>Email first</option></select></label></div><p>These values stay in this browser. Editing them does not update a crew record.</p></section>
        </div>}

        {view === 'timeline' && <div className="customer-view customer-timeline">
          <header className="customer-view-intro"><div><small>THE SIX CONTROLLED HANDOFFS</small><h3>Every stage earns a deliverable.</h3></div><p>Select a milestone to understand what the team is doing, what the customer should receive, and what moves the project forward.</p></header>
          <div className="customer-timeline-layout"><ol>{milestones.map((item, index) => <li key={item.label}><button type="button" className={timelineStage === index ? 'active' : ''} onClick={() => setTimelineStage(index)}><i>{project.stage > index ? '✓' : `0${index + 1}`}</i><span><b>{item.label}</b><small>{item.status}</small></span><em>{project.stage === index ? 'CURRENT' : project.stage > index ? 'PASSED' : 'AHEAD'}</em></button></li>)}</ol><aside><small>STAGE {String(timelineStage + 1).padStart(2, '0')}</small><h3>{selectedMilestone.label}</h3><strong>{selectedMilestone.status}</strong><p>{selectedMilestone.copy}</p><div><span><small>CUSTOMER DELIVERABLE</small><b>{selectedMilestone.deliverable}</b></span><span><small>NEXT CONTROL POINT</small><b>{selectedMilestone.next}</b></span></div><button type="button" onClick={() => update('stage', timelineStage)}>SET AS DEMO CURRENT STAGE <span>→</span></button><p className="customer-field-note">Changing the demo stage does not represent a real project update. Live status must come from the project team.</p></aside></div>
        </div>}

        {view === 'selections' && <div className="customer-view customer-selections">
          <header className="customer-view-intro"><div><small>ROOF SYSTEM DECISION BOARD</small><h3>Choose the assembly, not a sample.</h3></div><p>Use this board to organize questions and preferences. Final products, compatibility, quantities, colors, availability, and price require written confirmation.</p></header>
          <section className="customer-system-picker"><small>01 · SYSTEM DIRECTION</small><div>{systems.map(([name, eyebrow, copy], index) => <button type="button" key={name} className={project.system === name ? 'selected' : ''} onClick={() => update('system', name)}><span>0{index + 1}</span><small>{eyebrow}</small><b>{name}</b><p>{copy}</p><i>{project.system === name ? 'SELECTED ✓' : 'COMPARE'}</i></button>)}</div></section>
          <section className="customer-color-picker"><div><small>02 · COLOR DIRECTION</small><h4>{project.color}</h4><p>Screen color is a planning direction only. Approve physical samples and project-specific availability.</p></div><div>{colors.map(([name, value]) => <button type="button" key={name} className={project.color === name ? 'selected' : ''} onClick={() => update('color', name)} aria-label={`Choose ${name}`}><i style={{ background: value }} /><span>{name}</span></button>)}</div></section>
          <section className="customer-priority-picker"><small>03 · DECISION PRIORITY</small><div>{['Balanced value + storm readiness','Longest service-life path','Maximum curb appeal','Lowest responsible near-term scope'].map((value) => <button type="button" key={value} className={project.priority === value ? 'selected' : ''} onClick={() => update('priority', value)}><i>{project.priority === value ? '✓' : '+'}</i>{value}</button>)}</div></section>
          <section className="customer-upgrade-picker"><small>04 · PERFORMANCE QUESTIONS</small><div>{upgrades.map(([name, copy]) => <button type="button" key={name} className={project.upgrades.includes(name) ? 'selected' : ''} onClick={() => toggleArray('upgrades', name)}><i>{project.upgrades.includes(name) ? '✓' : '+'}</i><span><b>{name}</b><small>{copy}</small></span></button>)}</div></section>
          <aside className="customer-selection-summary"><div className="customer-selection-swatch" style={{ '--selection-color': currentColor } as React.CSSProperties}><i/><span>COLOR DIRECTION</span></div><div><small>MY CURRENT DIRECTION</small><h3>{project.system}</h3><b>{project.color}</b><p>{project.priority}</p><ul>{project.upgrades.map((item) => <li key={item}>{item}</li>)}</ul><Link href={`/customize?system=${encodeURIComponent(project.system)}&color=${encodeURIComponent(project.color)}`}>OPEN FULL ROOF CONFIGURATOR →</Link></div></aside>
        </div>}

        {view === 'documents' && <div className="customer-view customer-documents">
          <header className="customer-view-intro"><div><small>PERMANENT ROOF RECORD</small><h3>Know what you should have.</h3></div><p>This prototype tracks whether you marked a document received. It does not upload, store, verify, or display actual documents.</p></header>
          <div className="customer-document-meter"><div><small>DOCUMENT READINESS</small><b>{documentProgress}%</b></div><i><span style={{ width: `${documentProgress}%` }} /></i><p>{project.documents.length} of {documentCatalog.length} records marked received</p></div>
          <div className="customer-document-grid">{documentCatalog.map(([id, name, copy], index) => <button type="button" key={id} className={project.documents.includes(id) ? 'received' : ''} onClick={() => toggleArray('documents', id)}><span>FILE {String(index + 1).padStart(2, '0')}</span><i>{project.documents.includes(id) ? '✓' : '+'}</i><b>{name}</b><p>{copy}</p><strong>{project.documents.includes(id) ? 'MARKED RECEIVED' : 'NOT MARKED'}</strong></button>)}</div>
          <section className="customer-record-rules"><div><small>THE RECORD RULE</small><h3>Written beats remembered.</h3><p>Keep the controlling agreement, approved changes, invoices, useful photos, product information, and applicable warranty terms together. Coverage always depends on the actual written documents.</p></div><div><Link href="/quality">OPEN QUALITY STANDARD →</Link><Link href="/legal">OPEN TRUST CENTER →</Link><Link href="/library/inspection-checklist">OPEN INSPECTION FILE →</Link></div></section>
        </div>}

        {view === 'messages' && <div className="customer-view customer-messages">
          <header className="customer-view-intro"><div><small>CLEAR QUESTION · CLEAR RECORD</small><h3>Prepare the message before sending.</h3></div><p>Choose a useful prompt, personalize it, then explicitly email, call, or copy. Nothing is transmitted silently.</p></header>
          <div className="customer-message-layout"><section><small>MESSAGE STARTERS</small><div>{messageTemplates.map(([label, value], index) => <button type="button" key={label} onClick={() => setMessage(value)}><i>0{index + 1}</i><span><b>{label}</b><small>{value}</small></span><strong>USE →</strong></button>)}</div></section><aside><small>MESSAGE TO PROJECT TEAM</small><textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={1200}/><div><span>{message.length}/1200</span><select value={project.contact} onChange={(event) => update('contact', event.target.value)}><option>Text first</option><option>Call first</option><option>Email first</option></select></div><a href={`mailto:hello@cowboyroofsupport.com?subject=${encodeURIComponent(`${project.project} question`)}&body=${encodeURIComponent(`${message}\n\nProject: ${project.project}\nCustomer: ${project.customer}\nCity: ${project.city}\nPreferred contact: ${project.contact}`)}`}>OPEN EMAIL HANDOFF <span>→</span></a><button type="button" onClick={() => copy(message)}>{copied ? 'MESSAGE COPIED ✓' : 'COPY MESSAGE'}</button><a className="customer-call" href="tel:+14708342519">CALL (470) 834-2519</a><p>Opening an email does not guarantee delivery or create a project update. The team must receive and confirm the message.</p></aside></div>
        </div>}
      </div>
    </div>
  </section>;
}
