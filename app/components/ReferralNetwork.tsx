'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type PartnerStage = 'idea' | 'invited' | 'active' | 'paused';

type Partner = {
  id: string;
  name: string;
  type: string;
  city: string;
  code: string;
  stage: PartnerStage;
  preferredChannel: string;
  notes: string;
  createdAt: string;
};

type PartnerDraft = Omit<Partner, 'id' | 'code' | 'createdAt'> & { code: string };

const storageKey = 'cowboy_referral_network';

const stages: Array<{ id: PartnerStage; label: string }> = [
  { id: 'idea', label: 'Potential' },
  { id: 'invited', label: 'Invited' },
  { id: 'active', label: 'Active' },
  { id: 'paused', label: 'Paused' },
];

const emptyPartner: PartnerDraft = {
  name: '',
  type: 'Family supporter',
  city: 'North Atlanta',
  code: '',
  stage: 'idea',
  preferredChannel: 'Facebook',
  notes: '',
};

const citySlugs: Record<string, string> = {
  'North Atlanta': 'north-atlanta',
  Alpharetta: 'alpharetta',
  Roswell: 'roswell',
  Milton: 'milton',
  'Johns Creek': 'johns-creek',
  Cumming: 'cumming',
};

const cleanCode = (value: string) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 42);

export function ReferralNetwork() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [draft, setDraft] = useState<PartnerDraft>(emptyPartner);
  const [loaded, setLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [topic, setTopic] = useState('general');
  const [copied, setCopied] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setPartners(JSON.parse(saved) as Partner[]);
      } catch {
        setPartners([]);
      } finally {
        setLoaded(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(partners));
    } catch {
      window.setTimeout(() => setNotice('Browser storage is unavailable. Network changes will last only for this visit.'), 0);
    }
  }, [loaded, partners]);

  const selected = partners.find((partner) => partner.id === selectedId) || null;
  const citySlug = selected ? citySlugs[selected.city] || 'north-atlanta' : 'north-atlanta';
  const path = citySlug === 'north-atlanta' ? '/neighbors' : `/neighbors/${citySlug}`;
  const partnerLink = useMemo(() => {
    if (!selected) return '';
    const params = new URLSearchParams({
      ref: selected.code,
      utm_source: cleanCode(selected.type) || 'referral-partner',
      utm_medium: 'organic_referral',
      utm_campaign: `${citySlug}_${topic}`,
      service: topic,
    });
    return `https://cowboy-roof-support.dotsmsatellite730.chatgpt.site${path}?${params.toString()}`;
  }, [citySlug, path, selected, topic]);

  const onboardingMessage = selected
    ? `Hi ${selected.name} — thank you for being willing to introduce Cowboy Roof Support when someone genuinely needs roof help. Here is your ${selected.city} referral link: ${partnerLink} It opens a no-pressure roof-check page and preserves your referral code in the prepared request. Please share it only in useful, expected conversations.`
    : '';

  const activeCount = partners.filter((partner) => partner.stage === 'active').length;
  const invitedCount = partners.filter((partner) => partner.stage === 'invited').length;
  const cityCount = new Set(partners.map((partner) => partner.city)).size;

  const updateDraft = <K extends keyof PartnerDraft>(key: K, value: PartnerDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const submitPartner = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (draft.name.trim().length < 2) {
      setNotice('Add the supporter or partner name.');
      return;
    }
    const code = cleanCode(draft.code || draft.name);
    if (!code) {
      setNotice('Create a short referral code.');
      return;
    }
    if (partners.some((partner) => partner.code === code)) {
      setNotice('That referral code already exists on this device.');
      return;
    }
    const record: Partner = {
      ...draft,
      code,
      id: `partner-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    setPartners((current) => [record, ...current]);
    setSelectedId(record.id);
    setDraft(emptyPartner);
    setNotice('Referral partner saved on this device.');
  };

  const updatePartner = <K extends keyof Partner>(key: K, value: Partner[K]) => {
    setPartners((current) => current.map((partner) => partner.id === selectedId ? { ...partner, [key]: value } : partner));
  };

  const deletePartner = (partner: Partner) => {
    if (!window.confirm(`Remove “${partner.name}” from this device-local network?`)) return;
    setPartners((current) => current.filter((item) => item.id !== partner.id));
    setSelectedId('');
    setNotice('Local partner record removed.');
  };

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(''), 1800);
    } catch {
      setNotice('Clipboard access is unavailable on this device.');
    }
  };

  return <section className="network-center">
    <header className="network-header">
      <div><span><i/>LOCAL REFERRAL NETWORK</span><h2>Partner Trail Builder</h2></div>
      <div>
        <span><small>TOTAL RECORDS</small>{partners.length}</span>
        <span><small>ACTIVE</small>{activeCount}</span>
        <span><small>INVITED</small>{invitedCount}</span>
        <span><small>MARKETS</small>{cityCount}</span>
      </div>
    </header>

    {notice && <div className="network-notice" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice('')}>DISMISS</button></div>}

    <div className="network-workspace">
      <form className="partner-form" onSubmit={submitPartner}>
        <header><small>01 · ADD A RELATIONSHIP</small><h3>Build the partner file.</h3><p>Use this for family supporters, realtors, customers, property professionals, and legitimate local relationships.</p></header>
        <label>NAME<input required value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} placeholder="Person or organization"/></label>
        <label>RELATIONSHIP TYPE<select value={draft.type} onChange={(event) => updateDraft('type', event.target.value)}><option>Family supporter</option><option>Past customer</option><option>Realtor</option><option>Property manager</option><option>Insurance professional</option><option>HOA contact</option><option>Pressure-washing client</option><option>Local business</option><option>Other trusted partner</option></select></label>
        <label>PRIMARY MARKET<select value={draft.city} onChange={(event) => updateDraft('city', event.target.value)}>{Object.keys(citySlugs).map((city) => <option value={city} key={city}>{city}</option>)}</select></label>
        <label>REFERRAL CODE<input value={draft.code} onChange={(event) => updateDraft('code', cleanCode(event.target.value))} placeholder={cleanCode(draft.name) || 'short-unique-code'}/></label>
        <label>PREFERRED CHANNEL<select value={draft.preferredChannel} onChange={(event) => updateDraft('preferredChannel', event.target.value)}><option>Facebook</option><option>Text message</option><option>Email</option><option>Phone</option><option>In person</option></select></label>
        <label>STARTING STAGE<select value={draft.stage} onChange={(event) => updateDraft('stage', event.target.value as PartnerStage)}>{stages.map((stage) => <option value={stage.id} key={stage.id}>{stage.label}</option>)}</select></label>
        <label>NOTES<textarea value={draft.notes} onChange={(event) => updateDraft('notes', event.target.value)} placeholder="How you know them, permission, useful context, and next action."/></label>
        <button type="submit">SAVE PARTNER LOCALLY →</button>
      </form>

      <section className="partner-roster">
        <header><div><small>02 · NETWORK ROSTER</small><h3>Choose a partner.</h3></div><span>{partners.length} LOCAL</span></header>
        {!partners.length && <div className="partner-empty"><b>NO LOCAL PARTNERS</b><p>Add the first real relationship. The network is intentionally empty instead of inventing business connections.</p></div>}
        <div className="partner-list">
          {partners.map((partner) => <button type="button" className={selectedId === partner.id ? 'active' : ''} key={partner.id} onClick={() => setSelectedId(partner.id)}>
            <span><i className={`stage-${partner.stage}`}/>{stages.find((stage) => stage.id === partner.stage)?.label}</span>
            <h4>{partner.name}</h4>
            <p>{partner.type}</p>
            <footer><small>{partner.city}</small><b>{partner.code}</b></footer>
          </button>)}
        </div>
      </section>

      <section className="partner-console">
        {!selected && <div className="partner-console-empty"><small>03 · PARTNER CONSOLE</small><h3>Select a relationship.</h3><p>The custom link, onboarding message, stage controls, and partner record will appear here.</p></div>}
        {selected && <>
          <header><div><small>03 · ACTIVE PARTNER FILE</small><h3>{selected.name}</h3></div><span>{selected.code}</span></header>
          <div className="partner-edit-grid">
            <label>STAGE<select value={selected.stage} onChange={(event) => updatePartner('stage', event.target.value as PartnerStage)}>{stages.map((stage) => <option value={stage.id} key={stage.id}>{stage.label}</option>)}</select></label>
            <label>MARKET<select value={selected.city} onChange={(event) => updatePartner('city', event.target.value)}>{Object.keys(citySlugs).map((city) => <option value={city} key={city}>{city}</option>)}</select></label>
            <label>CHANNEL<select value={selected.preferredChannel} onChange={(event) => updatePartner('preferredChannel', event.target.value)}><option>Facebook</option><option>Text message</option><option>Email</option><option>Phone</option><option>In person</option></select></label>
            <label>CAMPAIGN TOPIC<select value={topic} onChange={(event) => setTopic(event.target.value)}><option value="general">General roof check</option><option value="repair">Leak or repair</option><option value="storm">Storm concern</option><option value="replacement">Replacement planning</option></select></label>
            <label className="wide">NOTES<textarea value={selected.notes} onChange={(event) => updatePartner('notes', event.target.value)}/></label>
          </div>
          <div className="partner-link-box"><small>CUSTOM ORGANIC LINK</small><p>{partnerLink}</p><div><button type="button" onClick={() => copy(partnerLink, 'link')}>{copied === 'link' ? 'COPIED ✓' : 'COPY LINK'}</button><a href={partnerLink} target="_blank" rel="noreferrer">PREVIEW ↗</a></div></div>
          <div className="partner-message-box"><small>ONBOARDING MESSAGE</small><p>{onboardingMessage}</p><button type="button" onClick={() => copy(onboardingMessage, 'message')}>{copied === 'message' ? 'COPIED ✓' : 'COPY MESSAGE →'}</button></div>
          <footer><button type="button" onClick={() => deletePartner(selected)}>REMOVE LOCAL PARTNER</button><Link href="/leads">OPEN LEAD DESK →</Link></footer>
        </>}
      </section>
    </div>

    <section className="network-standards">
      {[
        ['01', 'ASK FIRST', 'Confirm the person is comfortable receiving and sharing a distinct referral link.'],
        ['02', 'NO SPAM', 'Use warm, expected introductions and useful local posts—not unsolicited bulk messages.'],
        ['03', 'NO FAKE REWARDS', 'Do not promise referral compensation until written terms, eligibility, and tax treatment are finalized.'],
        ['04', 'CLOSE THE LOOP', 'Thank the introducer without disclosing private project information.'],
      ].map(([number, title, copy]) => <article key={number}><small>{number}</small><h3>{title}</h3><p>{copy}</p></article>)}
    </section>

    <footer className="network-footer"><span>DEVICE-LOCAL PROTOTYPE · RELATIONSHIPS REQUIRE PERMISSION</span><div><Link href="/growth">GROWTH COMMAND</Link><Link href="/share">CAMPAIGN BUILDER</Link><Link href="/privacy">PRIVACY</Link></div></footer>
  </section>;
}
