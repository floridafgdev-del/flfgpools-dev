'use client';

/**
 * Pushes a `generate_lead` event to the GTM dataLayer when a lead form is
 * submitted successfully. Configure triggers/tags on `generate_lead` in GTM
 * (GA4 recommended event name for lead conversion).
 */
export function trackGenerateLead(form: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'generate_lead', form });
}
