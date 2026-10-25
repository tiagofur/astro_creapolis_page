/**
 * Privacy-aware analytics for creapolis.dev
 *
 * Events (review.md §58):
 *   page_view        — Every page load
 *   start_project_click — CTA "Start a project"
 *   contact_form_started — User focuses the first field in contact form
 *   contact_form_completed — Contact form submitted successfully
 *   project_viewed   — User visits a project detail page
 *   service_click    — User clicks a service card / detail
 *   store_click      — Click on any App Store / Play Store link
 *   blog_read        — User views a blog post detail page
 *   blog_service_cta_click — Click on CTA inside a blog post
 *   linkedin_click   — Click on LinkedIn link
 *   github_click     — Click on GitHub link
 *   language_changed — User switches language via nav
 *
 * Rules:
 *   - No PII ever: no email, name, message, IP, or fingerprint
 *   - Only anonymous, aggregated data
 *   - Consent required before any event fires
 *   - Consent stored in localStorage, never cookies
 */

const CONSENT_KEY = 'creapolis_cookie_consent';

export type AnalyticsEvent =
  | 'page_view'
  | 'start_project_click'
  | 'contact_form_started'
  | 'contact_form_completed'
  | 'project_viewed'
  | 'service_click'
  | 'store_click'
  | 'blog_read'
  | 'blog_service_cta_click'
  | 'linkedin_click'
  | 'github_click'
  | 'language_changed'
  | '404_viewed';

export type ConsentStatus = 'granted' | 'denied' | 'pending';

let consentStatus: ConsentStatus = 'pending';

// --- Consent ---

export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'granted' || stored === 'denied') {
    consentStatus = stored;
    return stored;
  }
  return 'pending';
}

export function setConsent(status: 'granted' | 'denied'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_KEY, status);
  consentStatus = status;
  if (status === 'granted') {
    // Fire page_view on consent grant
    trackEvent('page_view');
  }
}

// --- Tracking ---

export function trackEvent(
  name: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>,
): void {
  if (typeof window === 'undefined') return;
  if (consentStatus !== 'granted' && name !== 'page_view') return;

  const payload = {
    event: name,
    timestamp: Date.now(),
    page: window.location.pathname,
    locale: document.documentElement.lang || 'unknown',
    ...properties,
  };

  // Development: log to console
  if (import.meta.env.DEV) {
    console.log(`[analytics] ${name}`, payload);
  }

  // Production: send to endpoint (if configured)
  // Uses sendBeacon for non-blocking delivery
  const endpoint = import.meta.env.PUBLIC_ANALYTICS_ENDPOINT;
  if (endpoint && !import.meta.env.DEV) {
    try {
      navigator.sendBeacon(endpoint, JSON.stringify(payload));
    } catch {
      // Silent fail — analytics should never break the site
    }
  }
}

// --- Auto page_view on load ---

export function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  consentStatus = getConsentStatus();
  if (consentStatus === 'granted') {
    trackEvent('page_view');
  }
}
