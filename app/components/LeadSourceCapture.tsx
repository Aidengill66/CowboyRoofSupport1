'use client';

import { useEffect } from 'react';

export type LeadAttribution = {
  ref: string;
  source: string;
  medium: string;
  campaign: string;
  landingPath: string;
};

const storageKey = 'cowboy_lead_source';

export function captureLeadAttribution(): LeadAttribution | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const incoming = {
    ref: params.get('ref') || '',
    source: params.get('utm_source') || '',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
    landingPath: window.location.pathname,
  };

  if (incoming.ref || incoming.source || incoming.campaign) {
    try { window.localStorage.setItem(storageKey, JSON.stringify(incoming)); } catch { /* Storage can be blocked; the current-page source still works. */ }
    return incoming;
  }

  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) as LeadAttribution : null;
  } catch {
    return null;
  }
}

export function attributionLabel(attribution: LeadAttribution | null) {
  if (!attribution) return '';
  if (attribution.ref === 'family-facebook') return 'Cowboy family Facebook post';
  if (attribution.ref === 'neighbor-referral') return 'North Atlanta neighbor referral';
  return attribution.ref || attribution.source || 'Direct website visit';
}

export function LeadSourceCapture() {
  useEffect(() => { captureLeadAttribution(); }, []);
  return null;
}
