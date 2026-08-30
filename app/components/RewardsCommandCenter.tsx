'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Wallet = { points: number; completed: string[]; catches: number; history: Array<{ label: string; points: number }> };
const initialWallet: Wallet = { points: 250, completed: [], catches: 0, history: [{ label: 'Prototype wallet opened', points: 250 }] };
const walletKey = 'cowboy-rewards-wallet-v2';
const marketKey = 'cowboy-marketplace-build-v2';
const marketPoints: Record<string, number> = { ranch:750,'blue-ridge':1200,stockman:1800,'high-noon':1600,'trail-guard':150,'air-rider':200,'rain-boss':250,'estate-detail':350,'storm-kit':75,'property-kit':180,'trail-boss-hat':125,ridgewalker:190,'high-country-tee':40,'roofline-buckle':75 };
const tiers = [{ name:'Ranch Hand', floor:0, perk:'Early field-drop previews' },{ name:'Trail Boss', floor:1000, perk:'Annual roof-check concept + gear perk' },{ name:'High Country', floor:2500, perk:'Priority storm-request concept' },{ name:'Founders Circle', floor:5000, perk:'Signature gift + family-network concept' }];
const missions = [
  { id:'roof-iq', label:'Complete Roof IQ', copy:'Answer the safety-first roof question.', points:75, action:'PLAY BELOW' },
  { id:'advisor', label:'Run a roof plan', copy:'Explore the six-signal Roof Advisor.', points:50, href:'/roof-advisor', action:'OPEN ADVISOR' },
  { id:'market', label:'Build a market list', copy:'Compare roof systems or field goods.', points:100, href:'/marketplace', action:'OPEN MARKET' },
  { id:'neighbor', label:'Prepare a neighbor intro', copy:'Open the consent-aware referral studio.', points:250, href:'/share', action:'OPEN SHARE DESK' },
];
const targetPositions = [[18,18],[68,16],[43,31],[76,45],[25,52],[57,62],[12,70],[82,72]];

export function RewardsCommandCenter(){
  const [wallet,setWallet]=useState<Wallet>(initialWallet);
  const [hydrated,setHydrated]=useState(false);
  const [marketProjection,setMarketProjection]=useState(0);
  const [quizChoice,setQuizChoice]=useState('');
  const [quizMessage,setQuizMessage]=useState('');
  const [roundActive,setRoundActive]=useState(false);
  const [roundCatches,setRoundCatches]=useState(0);
  const [redeem,setRedeem]=useState<string|null>(null);

  useEffect(()=>{const timer=window.setTimeout(()=>{try{const stored=JSON.parse(window.localStorage.getItem(walletKey)||'null');if(stored&&typeof stored.points==='number')setWallet(stored);const build=JSON.parse(window.localStorage.getItem(marketKey)||'[]');if(Array.isArray(build))setMarketProjection(build.reduce((sum:number,id:string)=>sum+(marketPoints[id]||0),0));}catch{/* Device data is optional. */}setHydrated(true)},0);return()=>window.clearTimeout(timer)},[]);
  useEffect(()=>{if(!hydrated)return;try{window.localStorage.setItem(walletKey,JSON.stringify(wallet))}catch{/* Device data is optional. */}},[wallet,hydrated]);

  const currentTier=[...tiers].reverse().find((tier)=>wallet.points>=tier.floor)||tiers[0];
  const nextTier=tiers.find((tier)=>tier.floor>wallet.points);
  const progress=nextTier?Math.max(0,Math.min(100,((wallet.points-currentTier.floor)/(nextTier.floor-currentTier.floor))*100)):100;
  const award=(id:string,label:string,points:number)=>setWallet((current)=>current.completed.includes(id)?current:{...current,points:current.points+points,completed:[...current.completed,id],history:[{label,points},...current.history].slice(0,8)});
  const answerQuiz=(choice:string)=>{setQuizChoice(choice);if(choice==='safe'){setQuizMessage('Correct. Stay off the roof, protect people and interiors, and document only from a safe location.');award('roof-iq','Roof IQ safety challenge',75)}else setQuizMessage('Not quite. Never climb onto a wet, storm-damaged, or uncertain roof.')};
  const catchDrop=()=>{if(!roundActive)return;const next=roundCatches+1;setRoundCatches(next);setWallet((current)=>({...current,catches:current.catches+1}));if(next>=8){setRoundActive(false);award(`wrangler-${wallet.catches+1}`,'Leak Wrangler field round',100)}};
  const resetDemo=()=>{setWallet(initialWallet);setRoundCatches(0);setRoundActive(false);setQuizChoice('');setQuizMessage('');setRedeem(null)};
  const achievements=useMemo(()=>[
    {name:'First Trail',done:wallet.points>=250,copy:'Open the prototype wallet'},
    {name:'Roof Smart',done:wallet.completed.includes('roof-iq'),copy:'Finish Roof IQ'},
    {name:'Leak Wrangler',done:wallet.catches>=8,copy:'Catch eight drops'},
    {name:'Market Scout',done:marketProjection>0,copy:'Save a marketplace build'},
    {name:'Trail Boss',done:wallet.points>=1000,copy:'Reach 1,000 points'},
    {name:'High Country',done:wallet.points>=2500,copy:'Reach 2,500 points'},
  ],[wallet,marketProjection]);
  const target=targetPositions[roundCatches%targetPositions.length];

  return <>
    <section className="rewards-command-hero"><div className="shell"><div><p className="eyebrow light">COWBOY REWARDS · DEVICE-SAVED PROTOTYPE</p><h1>Earn the trail.<br/><em>Know the roof.</em></h1><p>Useful learning, safer preparation, marketplace planning, and neighbor support come together in one transparent prototype wallet.</p><div><a href="#reward-wallet">OPEN MY WALLET ↓</a><Link href="/marketplace">SHOP MARKETPLACE</Link></div></div><aside><small>CURRENT BALANCE</small><strong>{wallet.points.toLocaleString()}</strong><b>PROTOTYPE POINTS</b><span>{currentTier.name.toUpperCase()}</span><footer><i/> SAVED ON THIS DEVICE</footer></aside></div></section>
    <section id="reward-wallet" className="reward-wallet-section"><div className="shell"><header><div><p className="eyebrow">THE REWARD COMMAND CENTER</p><h2>Your progress.<br/>One clean ledger.</h2></div><p>This wallet is a working demonstration. No real purchase, inspection, referral, or reward is created until program rules, identity, fraud controls, inventory, and benefit terms launch.</p></header><div className="reward-dashboard">
      <aside className="wallet-card"><header><span>CRS REWARD WALLET</span><i>DEMO</i></header><div className="wallet-balance"><small>AVAILABLE BALANCE</small><strong>{wallet.points.toLocaleString()}</strong><b>PTS</b></div><div className="wallet-tier"><span><small>CURRENT TIER</small><b>{currentTier.name}</b></span><span><small>{nextTier?'NEXT TIER':'TOP TIER'}</small><b>{nextTier?nextTier.name:'Complete'}</b></span><div><i style={{width:`${progress}%`}}/></div><p>{nextTier?`${(nextTier.floor-wallet.points).toLocaleString()} points to ${nextTier.name}`:'Highest prototype tier reached'}</p></div><div className="wallet-market"><small>MARKETPLACE BUILD PROJECTION</small><b>+{marketProjection.toLocaleString()} PTS</b><span>Projected only · not credited</span><Link href="/marketplace">OPEN SAVED BUILD →</Link></div><button type="button" onClick={resetDemo}>RESET DEVICE DEMO</button></aside>
      <div className="reward-main"><section className="mission-board"><header><div><small>ACTIVE MISSIONS</small><h3>Useful moves, clearly valued.</h3></div><span>{wallet.completed.length}/{missions.length} COMPLETE</span></header><div>{missions.map((mission,index)=><article className={wallet.completed.includes(mission.id)?'complete':''} key={mission.id}><small>0{index+1}</small><span><b>{mission.label}</b><p>{mission.copy}</p></span><strong>+{mission.points}</strong>{mission.href?<Link href={mission.href}>{wallet.completed.includes(mission.id)?'EXPLORED ✓':mission.action}</Link>:<a href="#roof-iq">{wallet.completed.includes(mission.id)?'COMPLETE ✓':mission.action}</a>}</article>)}</div><footer>Exploration links do not automatically claim real points. The live program will require verified completion events.</footer></section>
        <section className="reward-ledger"><header><small>RECENT DEVICE ACTIVITY</small><b>{wallet.history.length} RECORDS</b></header>{wallet.history.map((entry,index)=><span key={`${entry.label}-${index}`}><i>{String(index+1).padStart(2,'0')}</i><b>{entry.label}</b><strong>+{entry.points} PTS</strong></span>)}</section>
      </div></div></div></section>
    <section className="reward-playground"><div className="shell"><header><div><p className="eyebrow light">ROOF IQ + LEAK WRANGLER</p><h2>Play smart.<br/>Learn safe.</h2></div><p>The game teaches one serious rule: roof problems are inspected from safe positions until a trained, properly equipped field professional takes over.</p></header><div className="playground-grid">
      <article id="roof-iq" className="roof-quiz"><header><span>CHALLENGE 01</span><b>+75 PTS · ONCE</b></header><small>ROOF IQ / SAFETY</small><h3>After a storm, what is the smartest first move?</h3><div>{[['climb','Climb up and look for damage'],['hose','Use a hose to find the leak'],['safe','Stay off, protect people, document safely'],['wait','Ignore it until the next rain']].map(([id,label])=><button type="button" key={id} className={quizChoice===id?(id==='safe'?'correct':'wrong'):''} onClick={()=>answerQuiz(id)}><i>{quizChoice===id?(id==='safe'?'✓':'×'):'→'}</i>{label}</button>)}</div>{quizMessage&&<p className="quiz-message" role="status">{quizMessage}</p>}</article>
      <article className="wrangler-game"><header><span>CHALLENGE 02</span><b>8 TARGET ROUND · +100 PTS</b></header><div className="wrangler-field"><div className="roof-zone"><span>SAFE DOCUMENTATION ZONE</span></div>{roundActive&&<button type="button" className="wrangler-target" style={{left:`${target[0]}%`,top:`${target[1]}%`}} onClick={catchDrop} aria-label="Catch the leak signal">◆</button>}<div className="wrangler-readout"><span><small>ROUND</small>{roundActive?'ACTIVE':'READY'}</span><span><small>CAUGHT</small>{roundCatches}/8</span><span><small>ALL TIME</small>{wallet.catches}</span></div></div><footer><p>Catch eight moving leak signals. Keyboard users can keep focus on the target and press Enter or Space.</p><button type="button" onClick={()=>{setRoundCatches(0);setRoundActive(true)}}>{roundActive?'RESTART ROUND':'START FIELD ROUND →'}</button></footer></article>
    </div></div></section>
    <section className="achievement-section"><div className="shell"><header><p className="eyebrow">BADGE CABINET</p><h2>Progress you can inspect.</h2></header><div>{achievements.map((item,index)=><article className={item.done?'unlocked':''} key={item.name}><span>{item.done?'✓':String(index+1).padStart(2,'0')}</span><small>{item.done?'UNLOCKED':'LOCKED'}</small><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div></div></section>
    <section className="reward-tier-trail"><div className="shell"><header><p className="eyebrow light">THE TIER TRAIL</p><h2>Every mile opens a better perk.</h2></header><div>{tiers.map((tier,index)=><article className={wallet.points>=tier.floor?'reached':''} key={tier.name}><small>0{index+1} · {tier.floor.toLocaleString()} PTS</small><h3>{tier.name}</h3><p>{tier.perk}</p><button type="button" disabled={wallet.points<tier.floor} onClick={()=>setRedeem(tier.name)}>{wallet.points>=tier.floor?'PREPARE REDEMPTION':'LOCKED'}</button></article>)}</div><footer>Prototype benefits only. Final eligibility, expiration, transfer, referral, scheduling, inventory, tax, and redemption rules will be published before launch.</footer></div></section>
    {redeem&&<div className="reward-modal" role="dialog" aria-modal="true" aria-labelledby="reward-modal-title" onMouseDown={(event)=>{if(event.currentTarget===event.target)setRedeem(null)}}><article><button onClick={()=>setRedeem(null)} aria-label="Close">×</button><span>✓</span><small>PROTOTYPE REDEMPTION</small><h2 id="reward-modal-title">{redeem} request prepared.</h2><p>This demonstrates the redemption handoff. Nothing has been redeemed, reserved, purchased, or scheduled.</p><a href={`mailto:hello@cowboyroofsupport.com?subject=${encodeURIComponent(`${redeem} prototype reward request`)}&body=${encodeURIComponent(`Prototype wallet balance: ${wallet.points} points. Please explain future eligibility and program terms.`)}`}>EMAIL THE REWARD QUESTION →</a></article></div>}
  </>;
}
