'use client';

import { useState } from 'react';

const shareUrl = 'https://cowboy-roof-support.dotsmsatellite730.chatgpt.site/neighbors?ref=family-facebook&utm_source=facebook&utm_medium=organic_social&utm_campaign=north_atlanta_roof_check';

const posts = [
  {
    label: 'THE PERSONAL INTRO',
    title: 'For friends and neighbors',
    copy: `North Atlanta friends — if your roof has a leak, storm damage, missing shingles, or is simply getting older, our family roofing team can help you understand what it needs. Start with a free roof check here: ${shareUrl}`,
  },
  {
    label: 'AFTER A STORM',
    title: 'For timely local help',
    copy: `If last night's wind or rain left you worried about your roof, please do not climb up there. Cowboy Roof Support can document the condition and explain the next step without making insurance promises. Request a free North Atlanta roof check: ${shareUrl}`,
  },
  {
    label: 'THE NEIGHBOR CHECK',
    title: 'For an easy evergreen post',
    copy: `Not sure whether your roof needs a repair or replacement? Our family team built a quick, no-pressure way to start. Tell us what you see and we will help route the right inspection: ${shareUrl}`,
  },
];

export function ReferralStudio() {
  const [copied, setCopied] = useState('');

  const copy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(''), 1800);
  };

  const share = async () => {
    const data = { title: 'Cowboy Roof Support', text: 'Need a trusted North Atlanta roof check? Start here.', url: shareUrl };
    try {
      if (navigator.share) await navigator.share(data);
      else await copy(`${data.text} ${data.url}`, 'share');
    } catch { /* Closing the device share sheet is a normal cancellation. */ }
  };

  return <>
    <section className="share-console">
      <div className="share-console-head"><span><i/>FAMILY FACEBOOK TRAIL</span><b>ORGANIC · TRACKABLE</b></div>
      <div className="share-link-readout"><small>YOUR READY-TO-SHARE LINK</small><p>{shareUrl}</p></div>
      <div className="share-actions">
        <button type="button" onClick={share}>{copied === 'share' ? 'LINK COPIED ✓' : 'SHARE FROM THIS DEVICE →'}</button>
        <button type="button" onClick={() => copy(shareUrl, 'link')}>{copied === 'link' ? 'COPIED ✓' : 'COPY THE LINK'}</button>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">OPEN FACEBOOK ↗</a>
      </div>
      <footer><span>FACEBOOK POST</span><i>→</i><span>NEIGHBOR PAGE</span><i>→</i><span>INSPECTION BRIEF</span><i>→</i><span>SOURCE SAVED</span></footer>
    </section>
    <section className="post-shelf">
      {posts.map((post, index) => <article key={post.label}><small>0{index + 1} · {post.label}</small><h2>{post.title}</h2><p>{post.copy}</p><button type="button" onClick={() => copy(post.copy, post.label)}>{copied === post.label ? 'POST COPIED ✓' : 'COPY THIS POST →'}</button></article>)}
    </section>
  </>;
}
