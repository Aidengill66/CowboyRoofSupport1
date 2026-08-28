'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function InteractionLayer() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? Math.min((window.scrollY / maximum) * 100, 100) : 0);
      setShowTop(window.scrollY > 700);
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let observer: IntersectionObserver | undefined;
    const frame = window.requestAnimationFrame(() => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section'));
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

      sections.forEach((section, index) => {
        section.classList.add('reveal-ready');
        section.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 55}ms`);
        observer?.observe(section);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return <>
    <div className="scroll-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
    {showTop && <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
      <span>↑</span><small>TOP</small>
    </button>}
  </>;
}
