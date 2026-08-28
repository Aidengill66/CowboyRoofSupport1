'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';

type ChatMessage = { from: 'bot' | 'user'; text: string; href?: string; label?: string };
type Reply = { text: string; href: string; label: string };

const routeContext: Record<string, { label: string; intro: string; prompts: string[] }> = {
  '/': { label: 'HOME GUIDE', intro: 'Tell me what is happening with the roof. I’ll route you to the shortest useful next step.', prompts: ['I have a leak', 'Compare materials', 'What changes price?'] },
  '/start': { label: 'PROJECT GUIDE', intro: 'I can explain the project choices, planning ranges, or which trail fits your situation.', prompts: ['Which system fits?', 'Why is it a range?', 'I need help now'] },
  '/roof-advisor': { label: 'SYSTEM GUIDE', intro: 'Ask me about the advisor result, material tradeoffs, ventilation, or storm exposure.', prompts: ['Metal vs shingles', 'Explain ventilation', 'Storm-resistant system'] },
  '/customize': { label: 'DESIGN GUIDE', intro: 'I can help with roof shape, material, finish, upgrades, or what affects the planning range.', prompts: ['Best overall value', 'Longest-life system', 'Which upgrades matter?'] },
  '/marketplace': { label: 'SHOP GUIDE', intro: 'I can help build a complete roof-system list or find the right Cowboy gear.', prompts: ['Build a roof system', 'Show performance upgrades', 'Shop hats and boots'] },
  '/legal': { label: 'TRUST GUIDE', intro: 'I can route you through contracts, insurance boundaries, communication consent, or current tax-readiness checks.', prompts: ['What belongs in my contract?', 'Can you handle my claim?', 'Are roof tax credits available?'] },
  '/project-center': { label: 'PROJECT GUIDE', intro: 'I can help route the job, prepare for an inspection, or explain the complete project path.', prompts: ['I have an active leak', 'How should I prepare?', 'What happens after inspection?'] },
  '/quality': { label: 'QUALITY GUIDE', intro: 'Ask about quality checkpoints, property protection, storm records, or insurance documents.', prompts: ['How is work checked?', 'Show insurance details', 'How do you protect my yard?'] },
  '/services': { label: 'SERVICE GUIDE', intro: 'Describe the property or problem and I’ll point to the right service path.', prompts: ['Residential replacement', 'Commercial roof', 'Storm inspection'] },
  '/guides': { label: 'ROOF EXPLAINER', intro: 'Ask a plain-language roofing question. I’ll keep the answer short and point to the useful section.', prompts: ['Explain roof layers', 'What moves price?', 'Storm checklist'] },
  '/library': { label: 'LIBRARY GUIDE', intro: 'Tell me the roof question and I’ll route you to the most useful cabinet and technical file.', prompts: ['Explain roof layers', 'Standing seam metal', 'Storm documentation'] },
  '/transformations': { label: 'TRANSFORMATION GUIDE', intro: 'Ask about the mansion concepts, premium materials, estate planning, or the hidden details behind the finish.', prompts: ['Designer shingles', 'Standing seam metal', 'Estate roof planning'] },
  '/free-inspection': { label: 'INSPECTION GUIDE', intro: 'I can explain what belongs in an inspection request, how the visit works, or what to do during an active leak.', prompts: ['What will you inspect?', 'I have an active leak', 'How should I prepare?'] },
};

function getContext(path: string) {
  return routeContext[path] || { label: 'COWBOY GUIDE', intro: 'Ask me about roofing, products, quality, pricing, or the next step.', prompts: ['Start a project', 'Book inspection', 'Compare roof systems'] };
}

function answer(input: string): Reply {
  const q = input.toLowerCase();
  if (q.includes('leak') || q.includes('help now') || q.includes('urgent')) return { text: 'If water is active, move valuables, contain it safely, and stay off the roof. The right next step is a prompt documented inspection—not a blind repair quote.', href: '/start', label: 'START URGENT REQUEST' };
  if (q.includes('storm')) return { text: 'Start with safe ground-level photos, note interior moisture, and request a roof inspection. We document conditions; the insurer decides coverage.', href: '/storm-damage', label: 'OPEN STORM INSPECTION' };
  if (q.includes('metal') || q.includes('longest')) return { text: 'Standing seam metal is the long-life path when slope, deck, clips, underlayment, flashing compatibility, and ventilation are designed together. It costs more upfront than shingles.', href: '/library/standing-seam-metal', label: 'OPEN METAL FILE' };
  if (q.includes('shingle') || q.includes('value') || q.includes('material')) return { text: 'For many North Atlanta homes, an architectural shingle is the strongest value starting point. Designer shingles favor curb appeal; metal favors long ownership.', href: '/roof-systems', label: 'COMPARE MATERIALS' };
  if (q.includes('price') || q.includes('range') || q.includes('cost')) return { text: 'Area, pitch, roof form, access, tear-off, decking, flashing, material, and code requirements move the final price. The online range is for planning; the inspected proposal is the real number.', href: '/start', label: 'BUILD A PLANNING RANGE' };
  if (q.includes('vent')) return { text: 'Ventilation must balance intake and exhaust. Adding a larger ridge vent without enough intake can make performance worse, so we measure the complete attic and roof system.', href: '/guides', label: 'SEE ROOF LAYERS' };
  if (q.includes('upgrade') || q.includes('performance')) return { text: 'Prioritize correct flashing and water barriers first, then balanced ventilation and drainage. Premium finishes matter only after the hidden system is right.', href: '/performance-upgrades', label: 'VIEW PERFORMANCE UPGRADES' };
  if (q.includes('insurance') || q.includes('credential')) return { text: 'The prototype does not invent policy numbers. Current certificates, limits, and applicable credentials should be published only after company documents are verified.', href: '/quality', label: 'OPEN PROTECTION DETAILS' };
  if (q.includes('yard') || q.includes('protect') || q.includes('quality') || q.includes('checked')) return { text: 'The quality plan covers delivery, landscaping, controlled tear-off, deck photos, water control, flashing, ventilation, cleanup, magnetic sweep, and final walkthrough.', href: '/quality', label: 'SEE 8 CHECKPOINTS' };
  if (q.includes('commercial') || q.includes('large')) return { text: 'Large projects begin with access, safety, staging, drainage, occupied-space protection, and schedule coordination—not a residential price formula.', href: '/commercial-roofing', label: 'VIEW LARGE-SCALE WORK' };
  if (q.includes('tax') || q.includes('credit') || q.includes('incentive') || q.includes('deduction')) return { text: 'Tax rules changed sharply: federal residential Sections 25C and 25D ended after 2025, and Section 179D now has a construction-start cutoff. We organize the project records, but a CPA must confirm eligibility for the exact taxpayer and tax year.', href: '/legal#official-sources', label: 'OPEN TAX READINESS' };
  if (q.includes('insurance') || q.includes('claim') || q.includes('adjuster')) return { text: 'We can inspect, photograph, measure, and price the construction scope. The insurer and licensed adjusters decide coverage; we do not promise claim approval or impersonate a public adjuster.', href: '/legal#control-center', label: 'SEE CLAIM BOUNDARIES' };
  if (q.includes('privacy') || q.includes('legal') || q.includes('contract') || q.includes('consent')) return { text: 'A clean project packet states the exact scope, materials, price, change-order method, warranties, cancellation notice when applicable, and separate communication choices.', href: '/legal', label: 'OPEN TRUST CENTER' };
  if (q.includes('appointment') || q.includes('schedule') || q.includes('prepare') || q.includes('status') || q.includes('next step')) return { text: 'The Roof Command Center routes the job, checks the service area, builds a preferred inspection window, creates a property-prep checklist, and explains every stage from request through closeout.', href: '/project-center', label: 'OPEN COMMAND CENTER' };
  if (q.includes('hat') || q.includes('boot') || q.includes('gear')) return { text: 'The Marketplace separates field goods from roof systems, so you can build a gear list without mixing merchandise into a roofing estimate.', href: '/field-goods', label: 'OPEN FIELD GOODS' };
  if (q.includes('layer')) return { text: 'A complete roof is deck, fastening, underlayment, water barriers, flashing, ventilation, drainage, and finish material. The visible shingle is only the top layer.', href: '/library/roof-anatomy', label: 'OPEN ROOF ANATOMY FILE' };
  if (q.includes('inspect') || q.includes('book')) return { text: 'A free inspection is the cleanest starting point when the roof condition is uncertain. It should cover surface, flashing, penetrations, attic signals, ventilation, and drainage.', href: '/free-inspection', label: 'SEE THE INSPECTION' };
  return { text: 'The fastest path is to choose the job, timing, and system preference. That creates a concise project brief you can review before sending.', href: '/start', label: 'START MY PROJECT' };
}

export function CowboyCopilot({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const context = getContext(path);
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: 'bot', text: context.intro }]);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMessages([{ from: 'bot', text: getContext(path).intro }]), [path]);
  useEffect(() => feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' }), [messages]);

  const ask = (question: string) => {
    const reply = answer(question);
    setMessages(now => [...now, { from: 'user', text: question }, { from: 'bot', ...reply }]);
    setInput('');
  };
  const submit = (e: FormEvent) => { e.preventDefault(); if (input.trim()) ask(input.trim()); };

  return <div className={`copilot${open ? ' open' : ''}`}>
    <button className="copilot-launch" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="cowboy-copilot"><i/><span><small>COWBOY AI</small><b>{open ? 'CLOSE' : 'ASK A ROOF QUESTION'}</b></span><strong>{open ? '×' : '↗'}</strong></button>
    {open && <aside id="cowboy-copilot" className="copilot-panel" aria-label="Cowboy Roof Copilot">
      <header><div><i/><span><small>ROOF COPILOT / {context.label}</small><b>ONLINE · PROTOTYPE LOGIC</b></span></div><button onClick={() => setOpen(false)} aria-label="Close Roof Copilot">×</button></header>
      <div className="copilot-feed" ref={feedRef} aria-live="polite">{messages.map((message,index)=><div key={index} className={`chat-message ${message.from}`}><small>{message.from === 'bot' ? 'COWBOY AI' : 'YOU'}</small><p>{message.text}</p>{message.href&&<Link href={message.href}>{message.label} →</Link>}</div>)}</div>
      <div className="copilot-prompts"><small>CURATED FOR THIS PAGE</small><div>{context.prompts.map(prompt=><button key={prompt} onClick={()=>ask(prompt)}>{prompt}<span>+</span></button>)}</div></div>
      <form onSubmit={submit}><input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask about leaks, materials, price..." aria-label="Ask Cowboy AI"/><button aria-label="Send question">→</button></form>
      <footer>FAST ROUTING · PLAIN LANGUAGE · INSPECTION STILL REQUIRED</footer>
    </aside>}
  </div>;
}
