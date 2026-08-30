'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { attributionLabel, captureLeadAttribution, type LeadAttribution } from './LeadSourceCapture';

type Draft = {
  service: string;
  urgency: string;
  concern: string;
  address: string;
  city: string;
  propertyType: string;
  stories: string;
  roof: string;
  age: string;
  access: string;
  name: string;
  phone: string;
  email: string;
  preferredDay: string;
  preferredWindow: string;
  contactMethod: string;
  notes: string;
  permission: boolean;
};

type DraftKey = keyof Draft;
type PhotoRecord = { file: File; url: string };
type AdvisorTransfer = {
  version: number;
  createdAt: string;
  input: { age: number; issue: string; material: string; slope: string; attic: string; property: string; priority: string; horizon: string };
  action: string;
  confidence: number;
  repair: number;
  replace: number;
  system: string;
  brief: string;
};

const emptyDraft: Draft = {
  service: '', urgency: 'Planning / no active leak', concern: '', address: '', city: '', propertyType: 'Single-family home', stories: '2 stories', roof: 'Not sure — inspect it', age: 'Not sure', access: 'Standard access', name: '', phone: '', email: '', preferredDay: 'First available', preferredWindow: 'Any time', contactMethod: 'Text first', notes: '', permission: false,
};

const serviceMap: Record<string, string> = {
  general: 'Not sure — advise me', repair: 'Leak / roof repair', 'roof-repair': 'Leak / roof repair', storm: 'Storm damage inspection', replacement: 'Roof replacement', inspection: 'Free roof inspection', commercial: 'Commercial roofing',
};

const issueMap: Record<string, string> = {
  active: 'Water is entering now.', stain: 'Interior stain or recurring wet spot.', storm: 'New concern after recent wind or storm.', visible: 'Visible missing, lifted, cracked, or loose roof material.', planning: 'Planning ahead; no urgent symptom.',
};

const stages = [
  ['01', 'NEED'], ['02', 'PROPERTY'], ['03', 'EVIDENCE'], ['04', 'CONTACT'], ['05', 'REVIEW'],
];

function safeSavedDraft(value: string | null): Partial<Draft> {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value) as Partial<Draft>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function safeAdvisorTransfer(value: string | null): AdvisorTransfer | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as AdvisorTransfer;
    return parsed?.version === 1 && parsed.input && typeof parsed.action === 'string' ? parsed : null;
  } catch {
    return null;
  }
}

const advisorRoofMap: Record<string, string> = {
  shingle: 'Asphalt shingles', metal: 'Standing seam or exposed-fastener metal', membrane: 'Flat / low-slope membrane', tile: 'Tile, slate, shake, or specialty', unknown: 'Not sure — inspect it',
};
const advisorPropertyMap: Record<string, string> = { home: 'Single-family home', estate: 'Single-family home', commercial: 'Office / retail building' };
const advisorConcernMap: Record<string, string> = {
  planning: 'Planning ahead; no urgent symptom.', active: 'Water is entering now.', recurring: 'Interior stain or recurring wet spot.', storm: 'New concern after recent wind or storm.', wear: 'Visible widespread wear or aging roof material.',
};

function advisorAge(age: number) {
  if (age <= 7) return '0–7 years';
  if (age <= 15) return '8–15 years';
  if (age <= 22) return '16–22 years';
  return '23+ years';
}

export function InspectionProjectBuilder() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [errors, setErrors] = useState<Partial<Record<DraftKey | 'photos', string>>>({});
  const [photos, setPhotos] = useState<PhotoRecord[]>([]);
  const [photoDragging, setPhotoDragging] = useState(false);
  const [attribution, setAttribution] = useState<LeadAttribution | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [complete, setComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [advisorContext, setAdvisorContext] = useState<AdvisorTransfer | null>(null);
  const photoUrls = useRef<string[]>([]);

  useEffect(() => {
    const stored = safeSavedDraft(window.localStorage.getItem('crs-inspection-draft'));
    const params = new URLSearchParams(window.location.search);
    const service = serviceMap[params.get('service') || ''];
    const issue = issueMap[params.get('issue') || ''];
    const city = params.get('city') || '';
    const advisor = params.get('source') === 'advisor' ? safeAdvisorTransfer(window.localStorage.getItem('cowboy-roof-advisor-transfer')) : null;
    const advisorDraft: Partial<Draft> = advisor ? {
      concern: advisorConcernMap[advisor.input.issue] || '',
      propertyType: advisorPropertyMap[advisor.input.property] || emptyDraft.propertyType,
      roof: advisorRoofMap[advisor.input.material] || emptyDraft.roof,
      age: advisorAge(advisor.input.age),
    } : {};
    const timer = window.setTimeout(() => {
      setDraft((current) => ({ ...current, ...advisorDraft, ...stored, ...(service ? { service } : {}), ...(issue ? { concern: issue } : {}), ...(city ? { city } : {}) }));
      setAdvisorContext(advisor);
      setAttribution(captureLeadAttribution());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated || complete) return;
    const timer = window.setTimeout(() => {
      const textOnly = { ...draft };
      window.localStorage.setItem('crs-inspection-draft', JSON.stringify(textOnly));
    }, 220);
    return () => window.clearTimeout(timer);
  }, [complete, draft, hydrated]);

  useEffect(() => () => photoUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const update = <K extends DraftKey>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const score = useMemo(() => {
    const essentials = [draft.service, draft.urgency, draft.address, draft.city, draft.name, draft.phone, draft.email];
    const filled = essentials.filter((value) => value.trim()).length;
    const extras = [draft.concern, draft.roof, draft.age, draft.access, draft.preferredDay, draft.preferredWindow, draft.notes].filter((value) => value.trim()).length;
    return Math.min(100, Math.round((filled / essentials.length) * 75 + (extras / 7) * 20 + (photos.length ? 5 : 0)));
  }, [draft, photos.length]);

  const safetyPriority = draft.urgency === 'Active leak now' || /water is entering now/i.test(draft.concern);
  const referral = attributionLabel(attribution);
  const location = [draft.address, draft.city && `${draft.city}, GA`].filter(Boolean).join(', ');
  const summary = useMemo(() => [
    `COWBOY ROOF SUPPORT · INSPECTION FILE${requestId ? ` · ${requestId}` : ''}`,
    '',
    'NEED',
    `Service: ${draft.service || 'Not selected'}`,
    `Urgency: ${draft.urgency}`,
    `Concern: ${draft.concern || 'No additional detail provided'}`,
    '',
    'PROPERTY',
    `Address: ${location || 'Not entered'}`,
    `Property: ${draft.propertyType} · ${draft.stories}`,
    `Roof: ${draft.roof} · ${draft.age}`,
    `Access: ${draft.access}`,
    '',
    'CONTACT + ROUTING',
    `Customer: ${draft.name || 'Not entered'}`,
    `Phone: ${draft.phone || 'Not entered'}`,
    `Email: ${draft.email || 'Not entered'}`,
    `Preference: ${draft.preferredDay} · ${draft.preferredWindow} · ${draft.contactMethod}`,
    `Notes: ${draft.notes || 'None'}`,
    `Photos prepared: ${photos.length}${photos.length ? ' (attach manually to email)' : ''}`,
    `Lead source: ${referral || 'Direct / not provided'}`,
    ...(advisorContext ? ['', 'ROOF ADVISOR CONTEXT', `Likely path: ${advisorContext.action}`, `Primary system match: ${advisorContext.system}`, `Repair / replacement signal: ${advisorContext.repair}% / ${advisorContext.replace}%`, `Advisor input confidence: ${advisorContext.confidence}%`] : []),
    '',
    'No appointment exists until a Cowboy Roof Support team member confirms it.',
  ].join('\n'), [advisorContext, draft, location, photos.length, referral, requestId]);

  const validate = (targetStep = step) => {
    const next: typeof errors = {};
    if (targetStep === 1) {
      if (!draft.service) next.service = 'Choose the closest service.';
      if (!draft.urgency) next.urgency = 'Choose the urgency.';
    }
    if (targetStep === 2) {
      if (draft.address.trim().length < 5) next.address = 'Enter the property street address.';
      if (draft.city.trim().length < 2) next.city = 'Enter the North Atlanta city.';
    }
    if (targetStep === 4) {
      if (draft.name.trim().length < 2) next.name = 'Enter your name.';
      if (draft.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a 10-digit phone number.';
      if (!/^\S+@\S+\.\S+$/.test(draft.email)) next.email = 'Enter a valid email address.';
      if (!draft.permission) next.permission = 'Confirm that the team may contact you about this request.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validate()) return;
    setStep((current) => Math.min(5, current + 1));
  };

  const goTo = (target: number) => {
    if (target <= step || target === step + 1 && validate()) setStep(target);
  };

  const addPhotos = (files: FileList | File[]) => {
    const incoming = Array.from(files);
    const available = Math.max(0, 4 - photos.length);
    const accepted: PhotoRecord[] = [];
    let error = '';
    incoming.slice(0, available).forEach((file) => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        error = 'Use JPG, PNG, or WebP photos.';
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        error = 'Each photo must be under 8 MB.';
        return;
      }
      const url = URL.createObjectURL(file);
      photoUrls.current.push(url);
      accepted.push({ file, url });
    });
    if (incoming.length > available) error = 'Up to four roof photos can be prepared here.';
    setPhotos((current) => [...current, ...accepted]);
    setErrors((current) => ({ ...current, photos: error || undefined }));
  };

  const removePhoto = (url: string) => {
    URL.revokeObjectURL(url);
    photoUrls.current = photoUrls.current.filter((item) => item !== url);
    setPhotos((current) => current.filter((item) => item.url !== url));
  };

  const finish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(4)) {
      setStep(4);
      return;
    }
    const now = new Date();
    const date = now.toISOString().slice(2, 10).replaceAll('-', '');
    setRequestId(`CRS-${date}-${String(now.getTime()).slice(-4)}`);
    setComplete(true);
    window.localStorage.removeItem('crs-inspection-draft');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    photoUrls.current = [];
    window.localStorage.removeItem('crs-inspection-draft');
    setDraft(emptyDraft);
    setPhotos([]);
    setErrors({});
    setComplete(false);
    setRequestId('');
    setStep(1);
  };

  if (complete) return <section className="inspection-builder inspection-complete" aria-live="polite">
    <div className="inspection-complete-mark">✓</div>
    <small>INSPECTION FILE PREPARED</small>
    <h2>Your roof brief<br/>is ready to hand off.</h2>
    <p>The request is prepared, but it has not been emailed or scheduled automatically. Choose one clear next action.</p>
    <div className="inspection-file-id"><span>PROJECT FILE</span><b>{requestId}</b><i>{score}% COMPLETE</i></div>
    <pre>{summary}</pre>
    {!!photos.length && <div className="inspection-photo-reminder"><b>{photos.length} PHOTO{photos.length === 1 ? '' : 'S'} READY</b><span>Attach these manually when your email opens.</span></div>}
    <div className="inspection-complete-actions">
      <a href={`mailto:hello@cowboyroofsupport.com?subject=${encodeURIComponent(`${draft.service} · ${requestId}`)}&body=${encodeURIComponent(summary)}`}>OPEN EMAIL HANDOFF <span>→</span></a>
      <a href="tel:+14708342519">CALL (470) 834-2519</a>
      <button type="button" onClick={copySummary}>{copied ? 'COPIED ✓' : 'COPY FULL BRIEF'}</button>
    </div>
    <small className="inspection-confirmation-note">A team member must confirm availability and the appointment window. Email attachments, delivery, and scheduling happen outside this prototype.</small>
    <button className="inspection-reset" type="button" onClick={reset}>START A NEW PROJECT FILE</button>
  </section>;

  return <form className="inspection-builder" onSubmit={finish} noValidate>
    <header className="inspection-builder-top">
      <div><small>COWBOY CREW ROUTER</small><b>FREE INSPECTION FILE</b></div>
      <span><i/> {hydrated ? 'DRAFT SAVED LOCALLY' : 'OPENING PROJECT FILE'}</span>
    </header>

    <nav className="inspection-stage-nav" aria-label="Inspection request stages">
      {stages.map(([number, label], index) => <button type="button" key={number} className={step === index + 1 ? 'active' : step > index + 1 ? 'complete' : ''} onClick={() => goTo(index + 1)}><small>{step > index + 1 ? '✓' : number}</small><span>{label}</span></button>)}
    </nav>

    <div className="inspection-builder-body">
      <div className="inspection-stage">
        {step === 1 && <section className="inspection-stage-panel">
          <header><span>01</span><div><small>START WITH THE JOB</small><h2>What does the roof need?</h2><p>Choose the closest fit. The inspection—not this form—confirms the actual scope.</p></div></header>
          {advisorContext && <div className="inspection-advisor-import"><div><small>ROOF ADVISOR CONNECTED</small><b>{advisorContext.action}</b><span>{advisorContext.system}</span></div><strong>{advisorContext.confidence}%<small>INPUT CONFIDENCE</small></strong><button type="button" onClick={() => { window.localStorage.removeItem('cowboy-roof-advisor-transfer'); setAdvisorContext(null); }}>REMOVE</button></div>}
          {referral && <div className="inspection-referral"><small>REFERRED HERE BY</small><b>{referral}</b><span>✓ SOURCE REMEMBERED</span></div>}
          <fieldset className="inspection-options"><legend>SERVICE PATH</legend><div>{['Free roof inspection','Leak / roof repair','Storm damage inspection','Roof replacement','Commercial roofing','Not sure — advise me'].map((value) => <button type="button" key={value} className={draft.service === value ? 'selected' : ''} onClick={() => update('service', value)}><i/>{value}<span>{draft.service === value ? '✓' : '+'}</span></button>)}</div>{errors.service && <em>{errors.service}</em>}</fieldset>
          <fieldset className="inspection-options urgency-options"><legend>URGENCY</legend><div>{['Active leak now','Within 24–48 hours','This week','Planning / no active leak'].map((value) => <button type="button" key={value} className={draft.urgency === value ? 'selected' : ''} onClick={() => update('urgency', value)}><i/>{value}</button>)}</div>{errors.urgency && <em>{errors.urgency}</em>}</fieldset>
          <label className="inspection-textarea"><span>WHAT ARE YOU SEEING?</span><textarea value={draft.concern} onChange={(event) => update('concern', event.target.value)} placeholder="Where is it, when did it start, and what changed?" maxLength={650}/><small>{draft.concern.length}/650 · A short description helps the crew prepare.</small></label>
        </section>}

        {step === 2 && <section className="inspection-stage-panel">
          <header><span>02</span><div><small>PROPERTY + ROOF CONTEXT</small><h2>Help us arrive prepared.</h2><p>Address, access, geometry, and material all shape safe inspection routing.</p></div></header>
          <div className="inspection-form-grid">
            <label className="wide">STREET ADDRESS<input value={draft.address} onChange={(event) => update('address', event.target.value)} autoComplete="street-address" placeholder="123 Example Road" aria-invalid={!!errors.address}/>{errors.address && <em>{errors.address}</em>}</label>
            <label>CITY<input value={draft.city} onChange={(event) => update('city', event.target.value)} autoComplete="address-level2" placeholder="Alpharetta" aria-invalid={!!errors.city}/>{errors.city && <em>{errors.city}</em>}</label>
            <label>PROPERTY TYPE<select value={draft.propertyType} onChange={(event) => update('propertyType', event.target.value)}><option>Single-family home</option><option>Townhome / attached</option><option>Multi-family property</option><option>Office / retail building</option><option>Industrial / warehouse</option><option>Other property</option></select></label>
            <label>HEIGHT<select value={draft.stories} onChange={(event) => update('stories', event.target.value)}><option>1 story</option><option>2 stories</option><option>3+ stories</option><option>High-rise / specialty access</option></select></label>
            <label>ROOF MATERIAL<select value={draft.roof} onChange={(event) => update('roof', event.target.value)}><option>Not sure — inspect it</option><option>Asphalt shingles</option><option>Standing seam or exposed-fastener metal</option><option>Flat / low-slope membrane</option><option>Tile, slate, shake, or specialty</option><option>Mixed roof systems</option></select></label>
            <label>APPROXIMATE AGE<select value={draft.age} onChange={(event) => update('age', event.target.value)}><option>Not sure</option><option>0–7 years</option><option>8–15 years</option><option>16–22 years</option><option>23+ years</option></select></label>
            <label>ACCESS NOTES<select value={draft.access} onChange={(event) => update('access', event.target.value)}><option>Standard access</option><option>Gated property</option><option>Pets on property</option><option>Limited driveway / parking</option><option>Tenant or manager coordination</option><option>Specialty safety access</option></select></label>
          </div>
          <div className="inspection-area-check"><span><i/> NORTH ATLANTA ROUTING</span><p>Primary local planning includes Alpharetta, Roswell, Milton, Johns Creek, Cumming, and surrounding communities. The team confirms the final service area.</p><Link href="/service-areas">CHECK SERVICE AREAS →</Link></div>
        </section>}

        {step === 3 && <section className="inspection-stage-panel">
          <header><span>03</span><div><small>OPTIONAL PHOTO PREP</small><h2>Show safe, useful clues.</h2><p>Ground-level and interior photos can help prepare the visit. Never climb for a picture.</p></div></header>
          <label className={`inspection-dropzone${photoDragging ? ' dragging' : ''}`} onDragEnter={(event) => { event.preventDefault(); setPhotoDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setPhotoDragging(false)} onDrop={(event) => { event.preventDefault(); setPhotoDragging(false); addPhotos(event.dataTransfer.files); }}>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { if (event.target.files) addPhotos(event.target.files); event.target.value = ''; }}/>
            <span>+</span><b>DROP PHOTOS OR CHOOSE FILES</b><small>Up to 4 · JPG, PNG, or WebP · 8 MB each</small>
          </label>
          {errors.photos && <em className="inspection-photo-error">{errors.photos}</em>}
          {!!photos.length && <div className="inspection-photo-grid">{photos.map((photo, index) => <article key={photo.url}><div role="img" aria-label={`Selected roof photo ${index + 1}`} style={{ backgroundImage: `url(${photo.url})` }}/><span><small>PHOTO {String(index + 1).padStart(2, '0')}</small><b>{photo.file.name}</b></span><button type="button" onClick={() => removePhoto(photo.url)} aria-label={`Remove ${photo.file.name}`}>×</button></article>)}</div>}
          <div className="inspection-photo-guides"><article><b>GOOD</b><span>Interior stain with surrounding ceiling visible</span></article><article><b>GOOD</b><span>Ground-level view of the affected roof area</span></article><article><b>GOOD</b><span>Close safe view of debris or fallen material</span></article><article><b>SKIP</b><span>Anything requiring a ladder or wet-roof access</span></article></div>
          <p className="inspection-local-note">Photos are previewed locally in this browser and are not uploaded by this prototype. Attach them yourself when the email handoff opens.</p>
        </section>}

        {step === 4 && <section className="inspection-stage-panel">
          <header><span>04</span><div><small>CONTACT + TIMING</small><h2>How should we reach you?</h2><p>Preferences help routing, but no appointment exists until a human confirms it.</p></div></header>
          <div className="inspection-form-grid contact-grid">
            <label>NAME<input value={draft.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" placeholder="First and last" aria-invalid={!!errors.name}/>{errors.name && <em>{errors.name}</em>}</label>
            <label>PHONE<input value={draft.phone} onChange={(event) => update('phone', event.target.value)} type="tel" autoComplete="tel" placeholder="(470) 000-0000" aria-invalid={!!errors.phone}/>{errors.phone && <em>{errors.phone}</em>}</label>
            <label className="wide">EMAIL<input value={draft.email} onChange={(event) => update('email', event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email}/>{errors.email && <em>{errors.email}</em>}</label>
            <label>PREFERRED DAY<select value={draft.preferredDay} onChange={(event) => update('preferredDay', event.target.value)}><option>First available</option><option>Weekday</option><option>Saturday if available</option><option>Need to coordinate</option></select></label>
            <label>TIME WINDOW<select value={draft.preferredWindow} onChange={(event) => update('preferredWindow', event.target.value)}><option>Any time</option><option>Morning</option><option>Midday</option><option>Afternoon</option><option>After-work coordination</option></select></label>
            <label className="wide">CONTACT METHOD<select value={draft.contactMethod} onChange={(event) => update('contactMethod', event.target.value)}><option>Text first</option><option>Call first</option><option>Email first</option></select></label>
          </div>
          <label className="inspection-textarea"><span>ACCESS, TENANT, OR SCHEDULING NOTES</span><textarea value={draft.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Gate code coordination, pets, tenant contact, parking limits, or anything the team should know." maxLength={650}/><small>{draft.notes.length}/650</small></label>
          <label className={`inspection-permission${errors.permission ? ' error' : ''}`}><input type="checkbox" checked={draft.permission} onChange={(event) => update('permission', event.target.checked)}/><span><b>I give Cowboy Roof Support permission to contact me about this request.</b><small>This does not create an appointment, authorize work, or promise insurance coverage.</small></span></label>
          {errors.permission && <em className="inspection-permission-error">{errors.permission}</em>}
        </section>}

        {step === 5 && <section className="inspection-stage-panel inspection-review">
          <header><span>05</span><div><small>FINAL HUMAN-READABLE REVIEW</small><h2>Check the whole project file.</h2><p>Edit any cabinet before preparing the handoff.</p></div></header>
          <div className="inspection-review-grid">
            <article><header><small>01 · NEED</small><button type="button" onClick={() => setStep(1)}>EDIT</button></header><b>{draft.service}</b><span>{draft.urgency}</span><p>{draft.concern || 'No additional symptom detail.'}</p></article>
            <article><header><small>02 · PROPERTY</small><button type="button" onClick={() => setStep(2)}>EDIT</button></header><b>{location}</b><span>{draft.propertyType} · {draft.stories}</span><p>{draft.roof} · {draft.age} · {draft.access}</p></article>
            <article><header><small>03 · EVIDENCE</small><button type="button" onClick={() => setStep(3)}>EDIT</button></header><b>{photos.length} photo{photos.length === 1 ? '' : 's'} prepared</b><span>Local preview only</span><p>{photos.length ? 'Remember to attach them manually to the email.' : 'Photos are optional; the crew can still inspect.'}</p></article>
            <article><header><small>04 · CONTACT</small><button type="button" onClick={() => setStep(4)}>EDIT</button></header><b>{draft.name}</b><span>{draft.phone} · {draft.email}</span><p>{draft.preferredDay} · {draft.preferredWindow} · {draft.contactMethod}</p></article>
          </div>
          <button className="inspection-prepare" type="submit">PREPARE MY INSPECTION HANDOFF <span>→</span></button>
          <small className="inspection-submit-note">This prepares your file. You still choose whether to email or call the team on the next screen.</small>
        </section>}

        {step < 5 && <footer className="inspection-stage-actions"><button className="back" type="button" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1}>← BACK</button><span>STEP {step} OF 5</span><button className="next" type="button" onClick={goNext}>{step === 4 ? 'REVIEW PROJECT FILE' : 'SAVE + CONTINUE'} <b>→</b></button></footer>}
      </div>

      <aside className={`inspection-readiness${safetyPriority ? ' urgent' : ''}`}>
        <div className="inspection-readiness-top"><small>PROJECT READINESS</small><b>{score}%</b></div>
        <div className="inspection-score"><i><b style={{ width: `${score}%` }} /></i><span>{score < 45 ? 'STARTED' : score < 80 ? 'CREW CONTEXT BUILDING' : 'HANDOFF READY'}</span></div>
        {safetyPriority && <div className="inspection-urgent-card"><small>ACTIVE-LEAK PRIORITY</small><b>Protect people first.</b><p>Move valuables only if safe. Stay away from sagging ceilings, water near electricity, and damaged roof areas. Call emergency services for immediate danger.</p><a href="tel:+14708342519">CALL (470) 834-2519 →</a></div>}
        <section><small>LIVE PROJECT FILE</small><dl><div><dt>SERVICE</dt><dd>{draft.service || 'Not selected'}</dd></div><div><dt>PROPERTY</dt><dd>{draft.city || 'City not entered'} · {draft.propertyType}</dd></div><div><dt>ROOF</dt><dd>{draft.roof}</dd></div><div><dt>EVIDENCE</dt><dd>{photos.length ? `${photos.length} photo${photos.length === 1 ? '' : 's'} ready` : 'No photos yet'}</dd></div><div><dt>ROUTING</dt><dd>{draft.preferredDay} · {draft.contactMethod}</dd></div></dl></section>
        {advisorContext && <div className="inspection-readiness-advisor"><small>ADVISOR HANDOFF</small><b>{advisorContext.action}</b><span>{advisorContext.system}</span><i>Planning context only · field verification required</i></div>}
        <div className="inspection-trust-stack"><span><i>✓</i><b>TEXT DRAFT SAVED ON THIS DEVICE</b></span><span><i>✓</i><b>PHOTOS STAY LOCAL UNTIL YOU ATTACH</b></span><span><i>✓</i><b>HUMAN APPOINTMENT CONFIRMATION</b></span><span><i>✓</i><b>NO INSURANCE OR PRICE PROMISES</b></span></div>
        <p className="inspection-readiness-note">Close and return on this device to continue the text draft. Selected photos cannot be restored after closing or refreshing.</p>
      </aside>
    </div>
  </form>;
}
