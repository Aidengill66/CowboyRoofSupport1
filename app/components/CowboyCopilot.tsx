'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  AdvisorReply,
  RoofProfile,
  answerRoofQuestion,
  getAdvisorContext,
  summarizeProfile,
} from '../cowboy-knowledge';

type ChatMessage = {
  from: 'bot' | 'user';
  text: string;
  reply?: AdvisorReply;
};

export function CowboyCopilot({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [profile, setProfile] = useState<RoofProfile>({});
  const context = getAdvisorContext(path);
  const [suggestions, setSuggestions] = useState(context.prompts);
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: 'bot', text: context.intro }]);
  const feedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const nextContext = getAdvisorContext(path);
    const timer = window.setTimeout(() => {
      setMessages([{ from: 'bot', text: nextContext.intro }]);
      setSuggestions(nextContext.prompts);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [path]);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const ask = (question: string) => {
    const reply = answerRoofQuestion(question, profile);
    setProfile(reply.profile);
    setSuggestions(reply.followUps);
    setMessages((now) => [
      ...now,
      { from: 'user', text: question },
      { from: 'bot', text: reply.text, reply },
    ]);
    setInput('');
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (input.trim()) ask(input.trim());
  };

  const reset = () => {
    setProfile({});
    setSuggestions(context.prompts);
    setMessages([{ from: 'bot', text: context.intro }]);
    inputRef.current?.focus();
  };

  return <div className={`copilot${open ? ' open' : ''}`}>
    <button className="copilot-launch" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="cowboy-copilot">
      <img src="/cowboy-roof-logo-v2-256.png" alt="" />
      <span><small>NO-API ROOF INTELLIGENCE</small><b>{open ? 'CLOSE' : 'ASK COWBOY AI'}</b></span>
      <strong>{open ? '×' : '↗'}</strong>
    </button>
    {open && <aside id="cowboy-copilot" className="copilot-panel copilot-v2" aria-label="Cowboy Roof Copilot">
      <header>
        <div><img src="/cowboy-roof-logo-v2-256.png" alt="" /><span><small>ROOF COPILOT / {context.label}</small><b><i /> CURATED LOGIC · NO API · PRIVATE SESSION</b></span></div>
        <div className="copilot-header-actions"><button onClick={reset} aria-label="Clear conversation">RESET</button><button onClick={() => setOpen(false)} aria-label="Close Roof Copilot">×</button></div>
      </header>
      <div className="copilot-memory"><small>ROOF MEMORY</small><b>{summarizeProfile(profile)}</b></div>
      <div className="copilot-feed" ref={feedRef} aria-live="polite">
        {messages.map((message, index) => <div key={index} className={`chat-message ${message.from}`}>
          <small>{message.from === 'bot' ? 'COWBOY AI' : 'YOU'}</small>
          {message.reply && <div className="reply-readout"><span>{message.reply.category}</span><b>{message.reply.confidence}</b></div>}
          <p>{message.text}</p>
          {!!message.reply?.steps?.length && <ol>{message.reply.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
          {message.reply?.href && <Link href={message.reply.href}>{message.reply.label} →</Link>}
        </div>)}
      </div>
      <div className="copilot-prompts"><small>{messages.length > 1 ? 'SMART FOLLOW-UPS' : 'CURATED FOR THIS PAGE'}</small><div>{suggestions.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}<span>+</span></button>)}</div></div>
      <form onSubmit={submit}>
        <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Try: my 18-year roof leaks by the chimney" aria-label="Ask Cowboy AI" autoComplete="off" />
        <button aria-label="Send question" disabled={!input.trim()}>→</button>
      </form>
      <footer><span>SAFE ROUTING</span><i>•</i><span>TYPO TOLERANCE</span><i>•</i><span>FIELD CHECKS STAY REQUIRED</span></footer>
    </aside>}
  </div>;
}
