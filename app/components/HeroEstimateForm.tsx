'use client';

import { FormEvent, useEffect, useState } from 'react';
import { attributionLabel, captureLeadAttribution, type LeadAttribution } from './LeadSourceCapture';

type Estimate = {
  name: string;
  phone: string;
  email: string;
  service: string;
  roof: string;
  address: string;
};

const emptyEstimate: Estimate = { name: '', phone: '', email: '', service: '', roof: '', address: '' };

const serviceFromParam: Record<string, string> = { general: 'Not sure — advise me', repair: 'Leak / roof repair', storm: 'Storm damage inspection', replacement: 'Roof replacement', inspection: 'Free roof inspection', commercial: 'Commercial roofing' };

export function HeroEstimateForm({ defaultCity = '' }: { defaultCity?: string }) {
  const [form, setForm] = useState<Estimate>(emptyEstimate);
  const [errors, setErrors] = useState<Partial<Record<keyof Estimate | 'photo', string>>>({});
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [complete, setComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [attribution, setAttribution] = useState<LeadAttribution | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAttribution(captureLeadAttribution());
      const service = serviceFromParam[new URLSearchParams(window.location.search).get('service') || ''];
      if (service) setForm((current) => ({ ...current, service }));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const update = (key: keyof Estimate, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const summary = [
    'Cowboy Roof Support inspection request',
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Service: ${form.service}`,
    `Roof / pitch: ${form.roof || 'Not sure'}`,
    `Property: ${form.address}`,
    `Photo selected: ${photo ? `${photo.name} (attach manually)` : 'No'}`,
    `Lead source: ${attributionLabel(attribution) || 'Direct / not provided'}`,
    attribution?.campaign ? `Campaign: ${attribution.campaign}` : '',
    attribution?.landingPath ? `Landing page: ${attribution.landingPath}` : '',
  ].filter(Boolean).join('\n');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your name.';
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a 10-digit phone number.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.service) next.service = 'Choose the service you need.';
    if (form.address.trim().length < 5) next.address = 'Enter the property address.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setComplete(true);
  };

  const choosePhoto = (file?: File) => {
    if (preview) URL.revokeObjectURL(preview);
    if (!file) { setPhoto(null); setPreview(''); return; }
    if (file.size > 8 * 1024 * 1024) {
      setErrors((current) => ({ ...current, photo: 'Use a JPG, PNG, or WebP under 8 MB.' }));
      setPhoto(null);
      setPreview('');
      return;
    }
    setErrors((current) => ({ ...current, photo: undefined }));
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  };

  return <>
    <form id="hero-estimate" className="hero-estimate-panel" onSubmit={submit} noValidate>
      <header><span>FREE INSPECTION REQUEST</span><i>CREW ROUTER · READY</i></header>
      <div className="estimate-intro"><small>60-SECOND START</small><h2>Show us the roof.</h2><p>We will turn the basics into one crew-ready request.</p></div>
      {attributionLabel(attribution) && <div className="referral-receipt"><span>REFERRED HERE BY</span><b>{attributionLabel(attribution)}</b><i>✓ SOURCE SAVED</i></div>}
      <div className="estimate-grid">
        <label>NAME<input value={form.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" placeholder="First and last" aria-invalid={!!errors.name}/>{errors.name && <em>{errors.name}</em>}</label>
        <label>PHONE<input value={form.phone} onChange={(e) => update('phone', e.target.value)} type="tel" autoComplete="tel" placeholder="(470) 000-0000" aria-invalid={!!errors.phone}/>{errors.phone && <em>{errors.phone}</em>}</label>
        <label>EMAIL<input value={form.email} onChange={(e) => update('email', e.target.value)} type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email}/>{errors.email && <em>{errors.email}</em>}</label>
        <label>SERVICE<select value={form.service} onChange={(e) => update('service', e.target.value)} aria-invalid={!!errors.service}><option value="">Choose one</option><option>Free roof inspection</option><option>Leak / roof repair</option><option>Storm damage inspection</option><option>Roof replacement</option><option>Commercial roofing</option><option>Not sure — advise me</option></select>{errors.service && <em>{errors.service}</em>}</label>
        <label className="wide">ROOF / PITCH<select value={form.roof} onChange={(e) => update('roof', e.target.value)}><option value="">Not sure — inspect it</option><option>Asphalt shingles · walkable</option><option>Asphalt shingles · steep</option><option>Metal roof</option><option>Flat / low-slope</option><option>Tile, slate, or specialty</option></select></label>
        <label className="wide">PROPERTY ADDRESS<input value={form.address} onChange={(e) => update('address', e.target.value)} autoComplete="street-address" placeholder={defaultCity ? `Street address, ${defaultCity}, GA` : 'Street address, city, GA'} aria-invalid={!!errors.address}/>{errors.address && <em>{errors.address}</em>}</label>
        <label className="photo-field wide"><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => choosePhoto(e.target.files?.[0])}/>{preview ? <img src={preview} alt="Selected roof damage preview"/> : <span><b>+ ADD A ROOF PHOTO</b><small>Optional · JPG, PNG, or WebP · 8 MB max</small></span>}{errors.photo && <em>{errors.photo}</em>}</label>
      </div>
      <button className="estimate-submit" type="submit">PREPARE MY FREE INSPECTION <span>→</span></button>
      <small className="estimate-note">Prototype-safe: review the request before you email or call. Nothing is silently uploaded.</small>
    </form>
    {complete && <div className="estimate-modal" role="dialog" aria-modal="true" aria-labelledby="estimate-success-title" onMouseDown={(e) => { if (e.currentTarget === e.target) setComplete(false); }}>
      <article><button className="modal-close" onClick={() => setComplete(false)} aria-label="Close">×</button><span className="modal-check">✓</span><small>REQUEST CHECKED</small><h2 id="estimate-success-title">Your inspection brief is ready.</h2><p>Choose how to hand it to the Cowboy team. If you selected a photo, attach it to the email before sending.</p><pre>{summary}</pre><div><a href={`mailto:hello@cowboyroofsupport.com?subject=${encodeURIComponent(`${form.service} request`)}&body=${encodeURIComponent(summary)}`}>EMAIL THE REQUEST →</a><a className="call-action" href="tel:+14708342519">CALL (470) 834-2519</a><button onClick={copy}>{copied ? 'COPIED ✓' : 'COPY BRIEF'}</button></div><small className="modal-fine">A preferred time is not an appointment until a crew member confirms it.</small></article>
    </div>}
  </>;
}
