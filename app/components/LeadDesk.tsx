'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type LeadStatus = 'new' | 'contacted' | 'inspection' | 'estimate' | 'won' | 'lost';
type LeadUrgency = 'active' | 'soon' | 'planning';

type LeadRecord = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  source: string;
  urgency: LeadUrgency;
  status: LeadStatus;
  nextDate: string;
  planningValue: number;
  notes: string;
  createdAt: string;
};

type LeadDraft = Omit<LeadRecord, 'id' | 'createdAt'>;

const storageKey = 'cowboy_local_lead_desk';

const statuses: Array<{ id: LeadStatus; label: string; short: string }> = [
  { id: 'new', label: 'New', short: 'NEW' },
  { id: 'contacted', label: 'Contacted', short: 'CONTACT' },
  { id: 'inspection', label: 'Inspection', short: 'INSPECT' },
  { id: 'estimate', label: 'Estimate', short: 'ESTIMATE' },
  { id: 'won', label: 'Won', short: 'WON' },
  { id: 'lost', label: 'Closed / Lost', short: 'CLOSED' },
];

const emptyDraft: LeadDraft = {
  name: '',
  phone: '',
  email: '',
  city: 'Alpharetta',
  service: 'Free roof inspection',
  source: 'family-facebook',
  urgency: 'planning',
  status: 'new',
  nextDate: '',
  planningValue: 0,
  notes: '',
};

const demoLeads: LeadRecord[] = [
  {
    id: 'demo-01',
    name: 'DEMO · Milton storm inquiry',
    phone: '',
    email: '',
    city: 'Milton',
    service: 'Storm damage inspection',
    source: 'family-facebook',
    urgency: 'active',
    status: 'new',
    nextDate: '',
    planningValue: 0,
    notes: 'Example record only. Replace it with a real permission-based inquiry.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-02',
    name: 'DEMO · Roswell repair question',
    phone: '',
    email: '',
    city: 'Roswell',
    service: 'Leak / roof repair',
    source: 'neighbor-referral',
    urgency: 'soon',
    status: 'contacted',
    nextDate: '',
    planningValue: 0,
    notes: 'Example record only. No real customer information is included.',
    createdAt: new Date().toISOString(),
  },
];

const todayString = () => new Date().toISOString().slice(0, 10);

const cleanCsv = (value: string | number) => {
  const text = String(value ?? '').replaceAll('"', '""');
  return `"${text}"`;
};

const formatMoney = (value: number) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format(value);

function urgencyLabel(urgency: LeadUrgency) {
  if (urgency === 'active') return 'ACTIVE / URGENT';
  if (urgency === 'soon') return 'WITHIN 30 DAYS';
  return 'PLANNING';
}

export function LeadDesk() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [draft, setDraft] = useState<LeadDraft>(emptyDraft);
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [selectedId, setSelectedId] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setLeads(JSON.parse(saved) as LeadRecord[]);
      } catch {
        setLeads([]);
      } finally {
        setLoaded(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(leads));
    } catch {
      window.setTimeout(() => setNotice('Browser storage is unavailable. Changes will last only for this visit.'), 0);
    }
  }, [leads, loaded]);

  const filteredLeads = useMemo(() => {
    const search = query.toLowerCase().trim();
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesCity = cityFilter === 'all' || lead.city === cityFilter;
      const haystack = `${lead.name} ${lead.phone} ${lead.email} ${lead.city} ${lead.service} ${lead.source} ${lead.notes}`.toLowerCase();
      return matchesStatus && matchesCity && (!search || haystack.includes(search));
    });
  }, [cityFilter, leads, query, statusFilter]);

  const summary = useMemo(() => {
    const open = leads.filter((lead) => !['won', 'lost'].includes(lead.status));
    const urgent = open.filter((lead) => lead.urgency === 'active').length;
    const due = open.filter((lead) => lead.nextDate && lead.nextDate <= todayString()).length;
    const pipeline = leads
      .filter((lead) => ['inspection', 'estimate'].includes(lead.status))
      .reduce((total, lead) => total + lead.planningValue, 0);
    const won = leads
      .filter((lead) => lead.status === 'won')
      .reduce((total, lead) => total + lead.planningValue, 0);
    return { open: open.length, urgent, due, pipeline, won };
  }, [leads]);

  const selected = leads.find((lead) => lead.id === selectedId) || null;
  const cities = Array.from(new Set(leads.map((lead) => lead.city))).sort();

  const updateDraft = <K extends keyof LeadDraft>(key: K, value: LeadDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (draft.name.trim().length < 2) {
      setNotice('Add a name or clear identifying label before saving.');
      return;
    }
    const record: LeadRecord = {
      ...draft,
      id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    setLeads((current) => [record, ...current]);
    setDraft(emptyDraft);
    setShowForm(false);
    setSelectedId(record.id);
    setNotice('Lead saved on this device.');
  };

  const moveLead = (id: string, direction: -1 | 1) => {
    setLeads((current) => current.map((lead) => {
      if (lead.id !== id) return lead;
      const currentIndex = statuses.findIndex((status) => status.id === lead.status);
      const nextIndex = Math.min(statuses.length - 1, Math.max(0, currentIndex + direction));
      return { ...lead, status: statuses[nextIndex].id };
    }));
  };

  const setLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, status } : lead));
  };

  const updateSelected = <K extends keyof LeadRecord>(key: K, value: LeadRecord[K]) => {
    setLeads((current) => current.map((lead) => lead.id === selectedId ? { ...lead, [key]: value } : lead));
  };

  const deleteLead = (id: string) => {
    const lead = leads.find((item) => item.id === id);
    if (!lead) return;
    if (!window.confirm(`Remove “${lead.name}” from this device-local desk?`)) return;
    setLeads((current) => current.filter((item) => item.id !== id));
    if (selectedId === id) setSelectedId('');
    setNotice('Local lead removed.');
  };

  const loadDemo = () => {
    const currentIds = new Set(leads.map((lead) => lead.id));
    setLeads((current) => [...demoLeads.filter((lead) => !currentIds.has(lead.id)), ...current]);
    setNotice('Two clearly labeled demo records were added.');
  };

  const clearDemos = () => {
    setLeads((current) => current.filter((lead) => !lead.id.startsWith('demo-')));
    setNotice('Demo records removed.');
  };

  const exportCsv = () => {
    const headers = ['name', 'phone', 'email', 'city', 'service', 'source', 'urgency', 'status', 'next_date', 'planning_value', 'notes', 'created_at'];
    const rows = leads.map((lead) => [
      lead.name,
      lead.phone,
      lead.email,
      lead.city,
      lead.service,
      lead.source,
      lead.urgency,
      lead.status,
      lead.nextDate,
      lead.planningValue,
      lead.notes,
      lead.createdAt,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(cleanCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `cowboy-local-leads-${todayString()}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice('CSV export prepared from this device.');
  };

  return <section className="lead-desk">
    <header className="lead-desk-header">
      <div>
        <span><i/>DEVICE-LOCAL LEAD DESK</span>
        <h2>Acquisition Pipeline</h2>
      </div>
      <div className="lead-desk-actions">
        <button type="button" onClick={() => setShowForm((current) => !current)}>{showForm ? 'CLOSE FORM' : '+ ADD LEAD'}</button>
        <button type="button" onClick={exportCsv} disabled={!leads.length}>EXPORT CSV</button>
        <button type="button" onClick={loadDemo}>LOAD DEMO</button>
        <button type="button" onClick={clearDemos}>CLEAR DEMO</button>
      </div>
    </header>

    <div className="lead-desk-summary">
      <article><small>OPEN LEADS</small><b>{summary.open}</b><span>needs an outcome</span></article>
      <article><small>ACTIVE / URGENT</small><b>{summary.urgent}</b><span>respond first</span></article>
      <article><small>FOLLOW-UP DUE</small><b>{summary.due}</b><span>today or overdue</span></article>
      <article><small>PLANNING PIPELINE</small><b>{formatMoney(summary.pipeline)}</b><span>inspection + estimate</span></article>
      <article><small>DEVICE-RECORDED WON</small><b>{formatMoney(summary.won)}</b><span>not accounting revenue</span></article>
    </div>

    {notice && <div className="lead-notice" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice('')}>DISMISS</button></div>}

    {showForm && <form className="lead-entry-form" onSubmit={submitLead}>
      <header><div><small>MANUAL INTAKE</small><h3>Add a permission-based lead.</h3></div><p>Only enter information the person provided for a legitimate roofing conversation. This prototype stores it in this browser.</p></header>
      <div className="lead-form-grid">
        <label>NAME OR CLEAR LABEL<input required value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} placeholder="Customer name or inquiry label"/></label>
        <label>PHONE<input value={draft.phone} onChange={(event) => updateDraft('phone', event.target.value)} type="tel" autoComplete="tel" placeholder="(470) 000-0000"/></label>
        <label>EMAIL<input value={draft.email} onChange={(event) => updateDraft('email', event.target.value)} type="email" autoComplete="email" placeholder="name@example.com"/></label>
        <label>CITY<select value={draft.city} onChange={(event) => updateDraft('city', event.target.value)}><option>Alpharetta</option><option>Roswell</option><option>Milton</option><option>Johns Creek</option><option>Cumming</option><option>Woodstock</option><option>Other North Atlanta</option></select></label>
        <label>SERVICE<select value={draft.service} onChange={(event) => updateDraft('service', event.target.value)}><option>Free roof inspection</option><option>Leak / roof repair</option><option>Storm damage inspection</option><option>Roof replacement</option><option>Commercial roofing</option><option>Not sure — advise me</option></select></label>
        <label>SOURCE<input value={draft.source} onChange={(event) => updateDraft('source', event.target.value)} placeholder="family-facebook"/></label>
        <label>URGENCY<select value={draft.urgency} onChange={(event) => updateDraft('urgency', event.target.value as LeadUrgency)}><option value="active">Active / urgent</option><option value="soon">Within 30 days</option><option value="planning">Planning</option></select></label>
        <label>STARTING STATUS<select value={draft.status} onChange={(event) => updateDraft('status', event.target.value as LeadStatus)}>{statuses.map((status) => <option value={status.id} key={status.id}>{status.label}</option>)}</select></label>
        <label>NEXT FOLLOW-UP<input value={draft.nextDate} onChange={(event) => updateDraft('nextDate', event.target.value)} type="date"/></label>
        <label>PLANNING VALUE<input value={draft.planningValue || ''} onChange={(event) => updateDraft('planningValue', Number(event.target.value))} type="number" min="0" step="500" placeholder="0"/></label>
        <label className="wide">NOTES<textarea value={draft.notes} onChange={(event) => updateDraft('notes', event.target.value)} placeholder="Concern, timing, property detail, permission, and next action."/></label>
      </div>
      <div className="lead-form-consent"><span>LOCAL RECORD ONLY</span><p>This does not email the lead, confirm an appointment, sync with other devices, or create a company CRM record.</p><button type="submit">SAVE TO THIS DEVICE →</button></div>
    </form>}

    <section className="lead-toolbar">
      <label>SEARCH<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, city, service, source, notes"/></label>
      <label>STATUS<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | LeadStatus)}><option value="all">All statuses</option>{statuses.map((status) => <option value={status.id} key={status.id}>{status.label}</option>)}</select></label>
      <label>CITY<select value={cityFilter} onChange={(event) => setCityFilter(event.target.value)}><option value="all">All cities</option>{cities.map((city) => <option value={city} key={city}>{city}</option>)}</select></label>
      <span>{filteredLeads.length} MATCHING RECORD{filteredLeads.length === 1 ? '' : 'S'}</span>
    </section>

    {!leads.length && <section className="lead-empty">
      <small>NO LOCAL RECORDS YET</small>
      <h3>Start clean.</h3>
      <p>Add a permission-based inquiry, or load two clearly labeled examples to see how the pipeline works.</p>
      <div><button type="button" onClick={() => setShowForm(true)}>ADD THE FIRST LEAD →</button><button type="button" onClick={loadDemo}>LOAD DEMO RECORDS</button></div>
    </section>}

    {!!leads.length && <section className="lead-board" aria-label="Local lead pipeline">
      {statuses.map((status, statusIndex) => {
        const columnLeads = filteredLeads.filter((lead) => lead.status === status.id);
        return <section className={`lead-column status-${status.id}`} key={status.id}>
          <header><div><small>0{statusIndex + 1}</small><h3>{status.label}</h3></div><b>{columnLeads.length}</b></header>
          <div>
            {columnLeads.map((lead) => <article className={selectedId === lead.id ? 'selected' : ''} key={lead.id}>
              <button type="button" className="lead-card-main" onClick={() => setSelectedId(lead.id)}>
                <span><i className={`urgency-${lead.urgency}`}/>{urgencyLabel(lead.urgency)}</span>
                <h4>{lead.name}</h4>
                <p>{lead.service}</p>
                <div><small>{lead.city}</small><small>{lead.source || 'direct'}</small></div>
                {lead.nextDate && <b className={lead.nextDate <= todayString() ? 'due' : ''}>FOLLOW-UP · {lead.nextDate}</b>}
                {!!lead.planningValue && <strong>{formatMoney(lead.planningValue)} PLANNING</strong>}
              </button>
              <footer>
                <button type="button" onClick={() => moveLead(lead.id, -1)} disabled={statusIndex === 0} aria-label={`Move ${lead.name} backward`}>←</button>
                <button type="button" onClick={() => moveLead(lead.id, 1)} disabled={statusIndex === statuses.length - 1} aria-label={`Move ${lead.name} forward`}>→</button>
              </footer>
            </article>)}
            {!columnLeads.length && <p className="lead-column-empty">NO MATCHING RECORDS</p>}
          </div>
        </section>;
      })}
    </section>}

    {selected && <section className="lead-detail">
      <header><div><small>LOCAL LEAD FILE</small><h3>{selected.name}</h3></div><button type="button" onClick={() => setSelectedId('')}>CLOSE ×</button></header>
      <div className="lead-detail-grid">
        <label>STATUS<select value={selected.status} onChange={(event) => setLeadStatus(selected.id, event.target.value as LeadStatus)}>{statuses.map((status) => <option value={status.id} key={status.id}>{status.label}</option>)}</select></label>
        <label>URGENCY<select value={selected.urgency} onChange={(event) => updateSelected('urgency', event.target.value as LeadUrgency)}><option value="active">Active / urgent</option><option value="soon">Within 30 days</option><option value="planning">Planning</option></select></label>
        <label>PHONE<input value={selected.phone} onChange={(event) => updateSelected('phone', event.target.value)} type="tel"/></label>
        <label>EMAIL<input value={selected.email} onChange={(event) => updateSelected('email', event.target.value)} type="email"/></label>
        <label>CITY<input value={selected.city} onChange={(event) => updateSelected('city', event.target.value)}/></label>
        <label>SOURCE<input value={selected.source} onChange={(event) => updateSelected('source', event.target.value)}/></label>
        <label>NEXT FOLLOW-UP<input value={selected.nextDate} onChange={(event) => updateSelected('nextDate', event.target.value)} type="date"/></label>
        <label>PLANNING VALUE<input value={selected.planningValue || ''} onChange={(event) => updateSelected('planningValue', Number(event.target.value))} type="number" min="0" step="500"/></label>
        <label className="wide">NOTES<textarea value={selected.notes} onChange={(event) => updateSelected('notes', event.target.value)}/></label>
      </div>
      <div className="lead-contact-actions">
        {selected.phone ? <a href={`tel:${selected.phone}`}>CALL LEAD →</a> : <span>NO PHONE</span>}
        {selected.email ? <a href={`mailto:${selected.email}?subject=${encodeURIComponent('Cowboy Roof Support follow-up')}`}>EMAIL LEAD →</a> : <span>NO EMAIL</span>}
        <Link href="/project-center">OPEN PROJECT ROUTER →</Link>
        <button type="button" onClick={() => deleteLead(selected.id)}>REMOVE LOCAL RECORD</button>
      </div>
    </section>}

    <footer className="lead-desk-footer">
      <span>LOCAL PROTOTYPE · NOT A SHARED CRM · VERIFY CONSENT BEFORE CONTACT</span>
      <div><Link href="/growth">GROWTH COMMAND</Link><Link href="/share">SHARE DESK</Link><Link href="/privacy">PRIVACY BOUNDARY</Link></div>
    </footer>
  </section>;
}
