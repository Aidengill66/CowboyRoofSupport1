'use client';

import { useMemo, useState } from 'react';

const liveBase = 'https://cowboy-roof-support.dotsmsatellite730.chatgpt.site';
const cities = [
  ['north-atlanta', 'North Atlanta'],
  ['alpharetta', 'Alpharetta'],
  ['roswell', 'Roswell'],
  ['milton', 'Milton'],
  ['johns-creek', 'Johns Creek'],
  ['cumming', 'Cumming'],
];
const concerns = [
  ['general', 'General roof check', 'Not sure — advise me'],
  ['repair', 'Leak or roof repair', 'Leak / roof repair'],
  ['storm', 'Wind or storm concern', 'Storm damage inspection'],
  ['replacement', 'Older roof or replacement', 'Roof replacement'],
];

const cleanSlug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 42);

export function ReferralStudio() {
  const [copied, setCopied] = useState('');
  const [referrer, setReferrer] = useState('family-facebook');
  const [city, setCity] = useState('north-atlanta');
  const [concern, setConcern] = useState('general');

  const cityName = cities.find(([value]) => value === city)?.[1] || 'North Atlanta';
  const concernRecord = concerns.find(([value]) => value === concern) || concerns[0];
  const refCode = cleanSlug(referrer) || 'family-facebook';
  const shareUrl = useMemo(() => {
    const path = city === 'north-atlanta' ? '/neighbors' : `/neighbors/${city}`;
    const params = new URLSearchParams({ ref: refCode, utm_source: 'facebook', utm_medium: 'organic_social', utm_campaign: `${city}_${concern}`, service: concern });
    return `${liveBase}${path}?${params.toString()}`;
  }, [city, concern, refCode]);

  const messages = useMemo(() => {
    const topic = concern === 'storm' ? `If the recent wind or rain left you worried about your roof, please do not climb up there.` : concern === 'repair' ? `If you have a leak, ceiling stain, missing shingle, or flashing concern, our family roofing team can help trace the next step.` : concern === 'replacement' ? `If your roof is getting older and you are unsure whether it needs repair or replacement, our family team can help you understand the condition first.` : `If you are unsure what your roof needs, our family roofing team built a quick, no-pressure way to start.`;
    return [
      { label: 'PERSONAL INTRO', title: 'Warm and familiar', copy: `${cityName} friends and neighbors — ${topic} Start with a free roof check here: ${shareUrl}` },
      { label: 'HELPFUL + DIRECT', title: 'Problem-first post', copy: `${topic} Cowboy Roof Support serves ${cityName} with free inspection requests and straightforward explanations. Start here: ${shareUrl}` },
      { label: 'SHORT VERSION', title: 'Quick group post', copy: `Need trusted roof help in ${cityName}? Free, no-pressure roof check: ${shareUrl}` },
    ];
  }, [cityName, concern, shareUrl]);

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(''), 1800);
    } catch { setCopied(''); }
  };

  const share = async () => {
    const data = { title: 'Cowboy Roof Support', text: messages[0].copy.replace(` ${shareUrl}`, ''), url: shareUrl };
    try {
      if (navigator.share) await navigator.share(data);
      else await copy(`${data.text} ${data.url}`, 'share');
    } catch { /* Closing the share sheet is a normal cancellation. */ }
  };

  return <>
    <section className="campaign-builder" aria-labelledby="campaign-builder-title">
      <header><div><small>CAMPAIGN BUILDER · LIVE</small><h2 id="campaign-builder-title">Build the exact trail.</h2></div><span><i/>NO AD PIXEL</span></header>
      <div className="campaign-controls">
        <label>WHO IS SHARING?<input value={referrer} onChange={(event) => setReferrer(event.target.value)} placeholder="family-facebook"/><small>Use a short name, team member, HOA, or partner code.</small></label>
        <label>NEIGHBORHOOD<select value={city} onChange={(event) => setCity(event.target.value)}>{cities.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><small>The link opens that city&apos;s focused page.</small></label>
        <label>WHAT IS THE POST ABOUT?<select value={concern} onChange={(event) => setConcern(event.target.value)}>{concerns.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><small>The inspection form opens with this service selected.</small></label>
      </div>
      <div className="campaign-output"><span><small>REFERRAL CODE</small>{refCode}</span><span><small>MARKET</small>{cityName}</span><span><small>STARTING SERVICE</small>{concernRecord[2]}</span><span><small>CAMPAIGN</small>{city}_{concern}</span></div>
    </section>
    <section className="share-console">
      <div className="share-console-head"><span><i/>ORGANIC REFERRAL TRAIL</span><b>CUSTOM · TRACKABLE</b></div>
      <div className="share-link-readout"><small>YOUR READY-TO-SHARE LINK</small><p>{shareUrl}</p></div>
      <div className="share-actions five">
        <button type="button" onClick={share}>{copied === 'share' ? 'LINK COPIED ✓' : 'SHARE FROM DEVICE →'}</button>
        <button type="button" onClick={() => copy(shareUrl, 'link')}>{copied === 'link' ? 'COPIED ✓' : 'COPY LINK'}</button>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">FACEBOOK ↗</a>
        <a className="sms-share" href={`sms:?&body=${encodeURIComponent(messages[2].copy)}`}>TEXT IT ↗</a>
        <a className="preview-share" href={shareUrl} target="_blank" rel="noreferrer">PREVIEW ↗</a>
      </div>
      <footer><span>POST</span><i>→</i><span>CITY PAGE</span><i>→</i><span>PREFILLED SERVICE</span><i>→</i><span>INSPECTION BRIEF</span><i>→</i><span>SOURCE SAVED</span></footer>
    </section>
    <section className="post-shelf">
      {messages.map((post, index) => <article key={post.label}><small>0{index + 1} · {post.label}</small><h2>{post.title}</h2><p>{post.copy}</p><button type="button" onClick={() => copy(post.copy, post.label)}>{copied === post.label ? 'POST COPIED ✓' : 'COPY THIS POST →'}</button></article>)}
    </section>
  </>;
}
