/**
 * Auto-instrument analytics events across the site.
 * Uses data-track-* attributes on HTML elements.
 *
 * Usage in Astro templates:
 *   <a data-track-event="start_project_click" ...>
 *   <a data-track-event="linkedin_click" ...>
 *   <form data-track-event="contact_form_completed" ...>
 *   <div data-track-event="project_viewed" data-track-slug="pepinillo" ...>
 */

import { type AnalyticsEvent, trackEvent } from './analytics';

function initTrackers(): void {
  // Page-load events: fire once on load for [data-track-pageview]
  document
    .querySelectorAll<HTMLElement>('[data-track-pageview]')
    .forEach((el) => {
      const eventName = el.getAttribute(
        'data-track-pageview',
      ) as AnalyticsEvent;
      if (!eventName) return;
      const props: Record<string, string> = {};
      const slug = el.getAttribute('data-track-slug');
      if (slug) props.slug = slug;
      const label = el.getAttribute('data-track-label');
      if (label) props.label = label;
      trackEvent(eventName, props);
    });

  // Click-based events: data-track-event on clickable elements
  document.querySelectorAll<HTMLElement>('[data-track-event]').forEach((el) => {
    el.addEventListener('click', () => {
      const eventName = el.getAttribute('data-track-event') as AnalyticsEvent;
      if (!eventName) return;
      const props: Record<string, string> = {};
      const slug = el.getAttribute('data-track-slug');
      if (slug) props.slug = slug;
      const label = el.getAttribute('data-track-label');
      if (label) props.label = label;
      trackEvent(eventName, props);
    });
  });

  // Contact form: track "started" on first focus
  document
    .querySelectorAll<HTMLFormElement>('[data-track-form]')
    .forEach((form) => {
      let started = false;
      form.addEventListener('focusin', () => {
        if (!started) {
          started = true;
          trackEvent('contact_form_started');
        }
      });
    });

  // Language switch: track via MutationObserver on <html lang>
  const langEl = document.documentElement;
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === 'lang') {
        trackEvent('language_changed');
      }
    }
  });
  observer.observe(langEl, { attributes: true, attributeFilter: ['lang'] });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTrackers);
} else {
  initTrackers();
}
