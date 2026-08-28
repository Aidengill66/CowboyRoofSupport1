'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type IssueKey = 'active' | 'stain' | 'storm' | 'visible' | 'planning';
type DangerKey = 'none' | 'electric' | 'sagging' | 'tree';
type ClueKey = 'unknown' | 'shingle' | 'pipe' | 'chimney' | 'skylight' | 'valley';
type AgeKey = 'newer' | 'mid' | 'older' | 'late' | 'unknown';
type SpreadKey = 'single' | 'several' | 'broad';
type MaterialKey = 'shingle' | 'metal' | 'low-slope' | 'unknown';

const issues: { key: IssueKey; label: string; detail: string; signal: string }[] = [
  { key: 'active', label: 'Water is entering now', detail: 'Dripping, running, or actively wet.', signal: 'ACTIVE LEAK' },
  { key: 'stain', label: 'Stain or recurring spot', detail: 'Dry now, but evidence is visible.', signal: 'WATER TRACE' },
  { key: 'storm', label: 'Recent wind or storm', detail: 'New symptoms after severe weather.', signal: 'STORM CHECK' },
  { key: 'visible', label: 'Visible exterior damage', detail: 'Missing, lifted, cracked, or loose.', signal: 'FIELD DAMAGE' },
  { key: 'planning', label: 'I am planning ahead', detail: 'No urgent symptom; check condition.', signal: 'ROOF CHECK' },
];

const dangers: { key: DangerKey; label: string }[] = [
  { key: 'none', label: 'None of these' },
  { key: 'electric', label: 'Water near electricity' },
  { key: 'sagging', label: 'Ceiling is sagging' },
  { key: 'tree', label: 'Tree or structural impact' },
];

const clues: { key: ClueKey; label: string; source: string }[] = [
  { key: 'unknown', label: 'Not sure', source: 'Water-path tracing from roof to interior' },
  { key: 'shingle', label: 'Roof field / shingles', source: 'Field material, fasteners, seals, and underlayment' },
  { key: 'pipe', label: 'Pipe or roof vent', source: 'Boot, flange, seal, and surrounding roof field' },
  { key: 'chimney', label: 'Chimney or wall', source: 'Step, counter, apron, and kick-out flashing' },
  { key: 'skylight', label: 'Skylight', source: 'Flashing kit, curb, glazing, and condensation clues' },
  { key: 'valley', label: 'Valley or roof transition', source: 'Valley lining, laps, debris, and water concentration' },
];

const ages: { key: AgeKey; label: string; weight: number }[] = [
  { key: 'newer', label: '0–7 years', weight: 0 },
  { key: 'mid', label: '8–15 years', weight: 0 },
  { key: 'older', label: '16–22 years', weight: 1 },
  { key: 'late', label: '23+ years', weight: 2 },
  { key: 'unknown', label: 'Not sure', weight: 1 },
];

const materials: { key: MaterialKey; label: string }[] = [
  { key: 'shingle', label: 'Asphalt shingle' },
  { key: 'metal', label: 'Metal' },
  { key: 'low-slope', label: 'Flat / low-slope' },
  { key: 'unknown', label: 'Not sure' },
];

function choiceLabel<T extends string>(items: { key: T; label: string }[], key: T) {
  return items.find((item) => item.key === key)?.label || key;
}

export function RepairCommandCenter() {
  const [step, setStep] = useState(1);
  const [issue, setIssue] = useState<IssueKey>('active');
  const [danger, setDanger] = useState<DangerKey>('none');
  const [clue, setClue] = useState<ClueKey>('unknown');
  const [age, setAge] = useState<AgeKey>('unknown');
  const [spread, setSpread] = useState<SpreadKey>('single');
  const [material, setMaterial] = useState<MaterialKey>('shingle');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const immediateDanger = danger !== 'none';
    const ageWeight = ages.find((item) => item.key === age)?.weight || 0;
    const scopeWeight = spread === 'broad' ? 2 : spread === 'several' ? 1 : 0;
    const conditionWeight = issue === 'storm' ? 1 : issue === 'visible' ? 1 : 0;
    const replacementScore = ageWeight + scopeWeight + conditionWeight;
    const source = clues.find((item) => item.key === clue)?.source || clues[0].source;

    let priority = 'ROUTINE ROOF CHECK';
    let priorityCopy = 'Schedule a documented inspection and keep monitoring from the ground.';
    if (issue === 'active') {
      priority = 'PRIORITY LEAK TRIAGE';
      priorityCopy = 'Protect the interior if it is safe, then call for the fastest human routing.';
    } else if (issue === 'storm' || issue === 'visible') {
      priority = 'PROMPT FIELD INSPECTION';
      priorityCopy = 'Document what you can safely see from the ground and avoid disturbing evidence.';
    } else if (issue === 'stain') {
      priority = 'TRACE BEFORE IT RETURNS';
      priorityCopy = 'A dry stain can still mark an active pathway. Inspect before the next hard rain.';
    }
    if (immediateDanger) {
      priority = 'SAFETY OVERRIDE';
      priorityCopy = 'Keep people away from the affected area. If there is immediate danger, contact emergency services; do not enter the attic or climb onto the roof.';
    }

    let path = 'REPAIR-FIRST INSPECTION';
    let pathCopy = 'The inputs support isolating the failed detail and preserving the serviceable roof around it.';
    let scope = 'TARGETED DETAIL';
    if (replacementScore >= 4) {
      path = 'COMPARE REPAIR + REPLACEMENT';
      pathCopy = 'Age and spread make a repair-only decision risky. Ask for both a defensible repair scope and whole-system planning.';
      scope = 'SYSTEM-LEVEL REVIEW';
    } else if (replacementScore >= 2) {
      path = 'CONDITION-LED DECISION';
      pathCopy = 'A repair may still be practical, but adjacent materials and remaining service life need to be visible in the decision.';
      scope = 'MULTI-DETAIL REVIEW';
    }

    const materialNote: Record<MaterialKey, string> = {
      shingle: 'Match shingle exposure, profile, color, fastening, and surrounding seal integrity.',
      metal: 'Verify panel profile, finish compatibility, attachment, seams, and detail-specific flashing.',
      'low-slope': 'Trace seams, drains, penetrations, edge details, ponding, and membrane compatibility.',
      unknown: 'Identify the installed system before selecting repair materials or sealants.',
    };

    return { immediateDanger, priority, priorityCopy, path, pathCopy, scope, source, materialNote: materialNote[material] };
  }, [age, clue, danger, issue, material, spread]);

  const requestHref = `/free-inspection?service=roof-repair&issue=${issue}&priority=${result.priority.toLowerCase().replaceAll(' ', '-')}`;
  const selectedIssue = issues.find((item) => item.key === issue) || issues[0];
  const progress = step === 1 ? 33 : step === 2 ? 67 : 100;

  const copyPlan = async () => {
    const plan = [
      'COWBOY ROOF REPAIR BRIEF',
      `Symptom: ${selectedIssue.label}`,
      `Safety flag: ${choiceLabel(dangers, danger)}`,
      `Likely area: ${choiceLabel(clues, clue)}`,
      `Roof age: ${choiceLabel(ages, age)}`,
      `Material: ${choiceLabel(materials, material)}`,
      `Recommended routing: ${result.priority}`,
      `Decision path: ${result.path}`,
      'This is a planning brief, not a roof diagnosis or quote.',
    ].join('\n');
    try {
      await navigator.clipboard.writeText(plan);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return <section className="repair-command" aria-labelledby="repair-command-title">
    <div className="repair-command-shell shell">
      <header className="repair-command-head">
        <div><p className="eyebrow light">INTERACTIVE REPAIR COMMAND CENTER</p><h2 id="repair-command-title">Tell us what the<br/>roof is doing.</h2></div>
        <p>Build a concise field brief in about a minute. This tool prioritizes safety, organizes useful clues, and shows the inspection path—without pretending a screen can diagnose a roof.</p>
      </header>

      <div className="repair-progress" aria-label={`Step ${step} of 3`}>
        <i><b style={{ width: `${progress}%` }} /></i>
        {[['01','SYMPTOM'],['02','ROOF CONTEXT'],['03','CREW BRIEF']].map(([number, label], index) => <button type="button" key={number} className={step === index + 1 ? 'active' : step > index + 1 ? 'complete' : ''} onClick={() => setStep(index + 1)}><small>{number}</small><span>{label}</span></button>)}
      </div>

      <div className="repair-workbench">
        <div className="repair-controls">
          {step === 1 && <div className="repair-step-panel">
            <div className="repair-step-title"><span>01</span><div><small>START WITH THE SIGNAL</small><h3>What are you seeing?</h3></div></div>
            <div className="repair-issue-grid">{issues.map((item) => <button type="button" key={item.key} className={issue === item.key ? 'selected' : ''} aria-pressed={issue === item.key} onClick={() => setIssue(item.key)}><i/><span><b>{item.label}</b><small>{item.detail}</small></span><em>{item.signal}</em></button>)}</div>
            <fieldset className="repair-safety"><legend>SAFETY CHECK · SELECT ANY CURRENT DANGER</legend><div>{dangers.map((item) => <button type="button" key={item.key} className={danger === item.key ? 'selected' : ''} aria-pressed={danger === item.key} onClick={() => setDanger(item.key)}>{item.label}<span>{danger === item.key ? '✓' : '+'}</span></button>)}</div></fieldset>
            <div className="repair-panel-nav"><span>Never climb onto a wet or storm-damaged roof.</span><button type="button" onClick={() => setStep(2)}>ADD ROOF CONTEXT <b>→</b></button></div>
          </div>}

          {step === 2 && <div className="repair-step-panel">
            <div className="repair-step-title"><span>02</span><div><small>HELP THE CREW LOOK IN THE RIGHT PLACES</small><h3>What do you know?</h3></div></div>
            <label className="repair-field"><span>WHERE DOES IT SEEM CLOSEST?</span><select value={clue} onChange={(event) => setClue(event.target.value as ClueKey)}>{clues.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select><small>Interior water can travel. This is a clue, not a diagnosis.</small></label>
            <label className="repair-field"><span>APPROXIMATE ROOF AGE</span><select value={age} onChange={(event) => setAge(event.target.value as AgeKey)}>{ages.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label>
            <label className="repair-field"><span>ROOF MATERIAL</span><select value={material} onChange={(event) => setMaterial(event.target.value as MaterialKey)}>{materials.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label>
            <fieldset className="repair-spread"><legend>HOW SPREAD OUT IS THE CONCERN?</legend><div>{([['single','One area'],['several','Several areas'],['broad','Widespread']] as [SpreadKey,string][]).map(([key, label]) => <button type="button" key={key} className={spread === key ? 'selected' : ''} aria-pressed={spread === key} onClick={() => setSpread(key)}><i/>{label}</button>)}</div></fieldset>
            <div className="repair-panel-nav"><button className="back" type="button" onClick={() => setStep(1)}>← BACK</button><button type="button" onClick={() => setStep(3)}>BUILD CREW BRIEF <b>→</b></button></div>
          </div>}

          {step === 3 && <div className="repair-step-panel repair-ready-panel">
            <div className="repair-step-title"><span>03</span><div><small>READY FOR A HUMAN HANDOFF</small><h3>Your crew brief.</h3></div></div>
            <div className="repair-brief-grid">
              <span><small>SYMPTOM</small><b>{selectedIssue.label}</b></span>
              <span><small>SAFETY FLAG</small><b>{choiceLabel(dangers, danger)}</b></span>
              <span><small>LIKELY AREA</small><b>{choiceLabel(clues, clue)}</b></span>
              <span><small>ROOF</small><b>{choiceLabel(ages, age)} · {choiceLabel(materials, material)}</b></span>
            </div>
            <div className="repair-arrival"><small>BEFORE THE CREW ARRIVES</small><ol><li><b>01</b><span>Move valuables only if the area is safe.</span></li><li><b>02</b><span>Photograph interior evidence and safe ground-level views.</span></li><li><b>03</b><span>Note when it started and whether wind direction or rain intensity changes it.</span></li><li><b>04</b><span>Keep attic, gate, and driveway access notes ready.</span></li></ol></div>
            <div className="repair-brief-actions"><Link href={requestHref}>SEND TO FREE INSPECTION <span>→</span></Link><button type="button" onClick={copyPlan}>{copied ? 'BRIEF COPIED ✓' : 'COPY MY BRIEF'}</button></div>
            <button className="repair-edit" type="button" onClick={() => setStep(1)}>← EDIT ANSWERS</button>
          </div>}
        </div>

        <aside className={`repair-readout${result.immediateDanger ? ' danger' : ''}`} aria-live="polite">
          <div className="repair-readout-top"><span><i/> LIVE ROOFER READOUT</span><b>{result.immediateDanger ? 'SAFETY FIRST' : selectedIssue.signal}</b></div>
          <section><small>RECOMMENDED ROUTING</small><h3>{result.priority}</h3><p>{result.priorityCopy}</p></section>
          <div className="repair-decision"><span><small>LIKELY DECISION PATH</small><b>{result.path}</b><p>{result.pathCopy}</p></span><span><small>SCOPE SIGNAL</small><b>{result.scope}</b></span></div>
          <div className="repair-focus"><small>CREW FOCUS</small><b>{result.source}</b><p>{result.materialNote}</p></div>
          <div className="repair-readout-actions">{result.immediateDanger || issue === 'active' ? <a href="tel:+14708342519">CALL (470) 834-2519 <span>→</span></a> : <Link href={requestHref}>REQUEST INSPECTION <span>→</span></Link>}<button type="button" onClick={() => setStep(3)}>VIEW CREW BRIEF</button></div>
          <p className="repair-disclaimer">Planning guidance only. Final cause, repairability, materials, scope, schedule, and price require safe field inspection and written confirmation.</p>
        </aside>
      </div>
    </div>
  </section>;
}
