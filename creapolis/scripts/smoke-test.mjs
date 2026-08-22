#!/usr/bin/env node
/**
 * Production Smoke Suite — F059
 *
 * Run against the `dist/` output after build:
 *   node scripts/smoke-test.mjs
 *
 * Covers:
 *   1. Critical routes (all locales, products, blog, legal)
 *   2. Asset integrity (CSS, JS, images, fonts)
 *   3. Analytics instrumentation (data-track-* attributes)
 *   4. Accessibility landmarks (<main>, lang, skip-link)
 *   5. SEO basics (title, meta description, canonical)
 *   6. Forms present and functional markers
 *   7. Redirect pages (root index → /es)
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(import.meta.dirname, '..', 'dist');
let passed = 0;
let failed = 0;
let warnings = 0;
const failures = [];
const warns = [];

// ─── Helpers ───

function check(name, condition, detail = '') {
  if (condition) {
    passed++;
  } else {
    failed++;
    failures.push({ name, detail });
    console.error(`  ✗ ${name}${detail ? ' — ' + detail : ''}`);
  }
}

function warn(name, detail = '') {
  warnings++;
  warns.push({ name, detail });
  console.warn(`  ⚠ ${name}${detail ? ' — ' + detail : ''}`);
}

function readHTML(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return null;
  }
}

function fileExists(path) {
  return existsSync(path);
}

function countOccurrences(str, pattern) {
  return (str.match(new RegExp(pattern, 'g')) || []).length;
}

// ─── Test Suites ───

console.log('\n═══════════════════════════════════════════════');
console.log('  CREAPOLIS.SMOKE.SUITE  v1.0');
console.log('═══════════════════════════════════════════════\n');

// ─── 1. CRITICAL ROUTES ───
console.log('▸ 1. Critical Routes');

const criticalRoutes = [
  // Root redirect
  { path: 'index.html', name: 'Root redirect' },
  // ES
  { path: 'es/index.html', name: 'ES Homepage' },
  { path: 'es/servicios/index.html', name: 'ES Services' },
  { path: 'es/sobre/index.html', name: 'ES About' },
  { path: 'es/contacto/index.html', name: 'ES Contact' },
  { path: 'es/blog/index.html', name: 'ES Blog index' },
  { path: 'es/proyectos/index.html', name: 'ES Projects list' },
  { path: 'es/proyectos/pepinillo/index.html', name: 'ES Pepinillo' },
  { path: 'es/proyectos/peliculas/index.html', name: 'ES Películas' },
  { path: 'es/proyectos/solennix/index.html', name: 'ES Solennix' },
  { path: 'es/proyectos/subscription-guardian/index.html', name: 'ES Subscription Guardian' },
  // EN
  { path: 'en/index.html', name: 'EN Homepage' },
  { path: 'en/services/index.html', name: 'EN Services' },
  { path: 'en/about/index.html', name: 'EN About' },
  { path: 'en/contact/index.html', name: 'EN Contact' },
  { path: 'en/blog/index.html', name: 'EN Blog index' },
  { path: 'en/projects/index.html', name: 'EN Projects list' },
  { path: 'en/projects/pepinillo/index.html', name: 'EN Pepinillo' },
  { path: 'en/projects/solennix/index.html', name: 'EN Solennix' },
  // PT
  { path: 'pt/index.html', name: 'PT Homepage' },
  { path: 'pt/servicos/index.html', name: 'PT Services' },
  { path: 'pt/sobre/index.html', name: 'PT About' },
  { path: 'pt/contato/index.html', name: 'PT Contact' },
  { path: 'pt/blog/index.html', name: 'PT Blog index' },
  { path: 'pt/projetos/index.html', name: 'PT Projects list' },
  { path: 'pt/projetos/pepinillo/index.html', name: 'PT Pepinillo' },
  { path: 'pt/projetos/solennix/index.html', name: 'PT Solennix' },
  // Legal pages
  { path: 'terminos/index.html', name: 'Terms (ES)' },
  { path: 'terms-of-use/index.html', name: 'Terms of Use (EN)' },
  { path: 'privacidad/index.html', name: 'Privacy (ES)' },
  { path: 'privacy-policy/index.html', name: 'Privacy Policy (EN)' },
  { path: 'eliminar-cuenta/index.html', name: 'Delete Account (ES)' },
  { path: 'delete-account/index.html', name: 'Delete Account (EN)' },
  // 404
  { path: 'es/404/index.html', name: 'ES 404' },
  { path: 'en/404/index.html', name: 'EN 404' },
  { path: 'pt/404/index.html', name: 'PT 404' },
];

for (const route of criticalRoutes) {
  const fullPath = join(DIST, route.path);
  check(route.name, fileExists(fullPath), `Missing: ${route.path}`);
}

// ─── 2. BLOG POSTS ───
console.log('\n▸ 2. Blog Posts (sample)');

const blogDir = join(DIST, 'es', 'blog');
if (existsSync(blogDir)) {
  const blogPosts = readdirSync(blogDir).filter(d => statSync(join(blogDir, d)).isDirectory());
  check('Blog posts exist', blogPosts.length > 50, `Found ${blogPosts.length} posts`);

  // Check a sample of blog posts for basic structure
  const sample = blogPosts.slice(0, 5);
  for (const slug of sample) {
    const html = readHTML(join(blogDir, slug, 'index.html'));
    if (html) {
      check(`Blog "${slug}" has <title>`, /<title>[^<]+<\/title>/.test(html));
      check(`Blog "${slug}" has meta description`, /meta name="description"/.test(html));
      check(`Blog "${slug}" has <main>`, /<main/.test(html));
      check(`Blog "${slug}" has lang attribute`, /lang="es"/.test(html));
      check(`Blog "${slug}" has blog_read tracking`, /data-track-pageview="blog_read"/.test(html));
    }
  }
} else {
  warn('Blog directory not found');
}

// ─── 3. ANALYTICS INSTRUMENTATION ───
console.log('\n▸ 3. Analytics Instrumentation');

const analyticsChecks = [
  { path: 'es/index.html', name: 'ES Home', events: ['start_project_click', 'language_changed'] },
  { path: 'es/servicios/index.html', name: 'ES Services', events: ['service_click'] },
  { path: 'es/contacto/index.html', name: 'ES Contact', events: ['contact_form_started'] },
  { path: 'es/proyectos/pepinillo/index.html', name: 'ES Pepinillo', events: ['project_viewed', 'store_click'] },
  { path: 'es/proyectos/solennix/index.html', name: 'ES Solennix', events: ['project_viewed', 'store_click'] },
  { path: 'en/services/index.html', name: 'EN Services', events: ['service_click'] },
  { path: 'en/contact/index.html', name: 'EN Contact', events: ['contact_form_started'] },
  { path: 'pt/servicos/index.html', name: 'PT Services', events: ['service_click'] },
  { path: 'pt/contato/index.html', name: 'PT Contact', events: ['contact_form_started'] },
  { path: 'es/404/index.html', name: 'ES 404', events: ['404_viewed'] },
];

for (const checkItem of analyticsChecks) {
  const html = readHTML(join(DIST, checkItem.path));
  if (html) {
    for (const event of checkItem.events) {
      const hasEvent = html.includes(`data-track-event="${event}"`) || html.includes(`data-track-pageview="${event}"`) || html.includes(`data-track-form="${event}"`);
      check(`${checkItem.name}: ${event}`, hasEvent);
    }
    // Cookie consent banner
    check(`${checkItem.name}: cookie consent`, /cookie-consent/.test(html));
  }
}

// ─── 4. ACCESSIBILITY LANDMARKS ───
console.log('\n▸ 4. Accessibility Landmarks');

const landmarkPages = [
  'es/index.html',
  'es/servicios/index.html',
  'es/sobre/index.html',
  'es/contacto/index.html',
  'en/services/index.html',
  'en/about/index.html',
  'en/contact/index.html',
  'pt/servicos/index.html',
  'pt/sobre/index.html',
  'pt/contato/index.html',
];

for (const page of landmarkPages) {
  const html = readHTML(join(DIST, page));
  if (html) {
    check(`${page}: has <main>`, /<main/.test(html));
    check(`${page}: has skip-link`, /skip-link/.test(html));
    check(`${page}: has correct lang`, /lang="(es|en|pt)"/.test(html));
    check(`${page}: has <header>`, /<header/.test(html));
    check(`${page}: has <footer>`, /<footer/.test(html));
  }
}

// ─── 5. SEO BASICS ───
console.log('\n▸ 5. SEO Basics');

const seoPages = [
  { path: 'es/index.html', name: 'ES Home', titlePattern: /Creapolis/i, descPattern: /meta name="description"/ },
  { path: 'es/servicios/index.html', name: 'ES Services', titlePattern: /Servicios/i, descPattern: /meta name="description"/ },
  { path: 'es/contacto/index.html', name: 'ES Contact', titlePattern: /Contacto/i, descPattern: /meta name="description"/ },
  { path: 'en/services/index.html', name: 'EN Services', titlePattern: /Services/i, descPattern: /meta name="description"/ },
  { path: 'en/contact/index.html', name: 'EN Contact', titlePattern: /Contact/i, descPattern: /meta name="description"/ },
  { path: 'pt/servicos/index.html', name: 'PT Services', titlePattern: /Serviços|Servicos/i, descPattern: /meta name="description"/ },
];

for (const seo of seoPages) {
  const html = readHTML(join(DIST, seo.path));
  if (html) {
    check(`${seo.name}: has <title>`, /<title>[^<]+<\/title>/.test(html));
    check(`${seo.name}: title matches`, seo.titlePattern.test(html));
    check(`${seo.name}: has meta description`, seo.descPattern.test(html));
    check(`${seo.name}: has canonical`, /rel="canonical"/.test(html));
  }
}

// ─── 6. FORMS ───
console.log('\n▸ 6. Forms');

const formPages = [
  { path: 'es/contacto/index.html', name: 'ES Contact', formId: 'contact-form' },
  { path: 'en/contact/index.html', name: 'EN Contact', formId: 'contact-form' },
  { path: 'pt/contato/index.html', name: 'PT Contact', formId: 'contact-form' },
  { path: 'es/servicios/index.html', name: 'ES Services', formId: 'svc-contact-form' },
];

for (const form of formPages) {
  const html = readHTML(join(DIST, form.path));
  if (html) {
    check(`${form.name}: form present`, html.includes(`id="${form.formId}"`));
    check(`${form.name}: honeypot field`, /hp-field|honeypot/.test(html));
    check(`${form.name}: timestamp field`, /timestamp/.test(html));
    check(`${form.name}: aria-live on message`, /aria-live/.test(html));
  }
}

// ─── 7. ASSETS ───
console.log('\n▸ 7. Assets');

const astroDir = join(DIST, '_astro');
if (existsSync(astroDir)) {
  const cssFiles = readdirSync(astroDir).filter(f => f.endsWith('.css'));
  const jsFiles = readdirSync(astroDir).filter(f => f.endsWith('.js'));
  check('CSS files exist', cssFiles.length > 0, `Found ${cssFiles.length} CSS files`);
  check('JS files exist', jsFiles.length > 0, `Found ${jsFiles.length} JS files`);

  // Check total JS size
  let totalJS = 0;
  for (const f of jsFiles) {
    totalJS += statSync(join(astroDir, f)).size;
  }
  check(`JS budget (< 10KB)`, totalJS < 10240, `Total JS: ${totalJS} bytes`);

  // Check OG images
  const ogDir = join(DIST, 'og');
  if (existsSync(ogDir)) {
    const ogImages = readdirSync(ogDir).filter(f => f.endsWith('.svg'));
    check('OG images exist', ogImages.length > 0, `Found ${ogImages.length} OG images`);
  }
} else {
  warn('_astro directory not found');
}

// ─── 8. SITEMAP & RSS ───
console.log('\n▸ 8. Sitemap & RSS');

check('sitemap-index.xml exists', fileExists(join(DIST, 'sitemap-index.xml')));
check('robots.txt exists', fileExists(join(DIST, 'robots.txt')));
check('rss.xml exists', fileExists(join(DIST, 'rss.xml')));

const sitemap = readHTML(join(DIST, 'sitemap-index.xml'));
if (sitemap) {
  check('sitemap contains URLs', /<loc>/.test(sitemap));
}

const rss = readXML(join(DIST, 'rss.xml'));
if (rss) {
  check('RSS has items', /<item>/.test(rss));
  check('RSS has correct URLs', /creapolis\.dev\/es\/blog\//.test(rss));
}

function readXML(path) {
  try { return readFileSync(path, 'utf8'); } catch { return null; }
}

// ─── SUMMARY ───
console.log('\n═══════════════════════════════════════════════');
console.log(`  RESULTS: ${passed} passed, ${failed} failed, ${warnings} warnings`);
console.log('═══════════════════════════════════════════════\n');

if (failures.length > 0) {
  console.log('FAILURES:');
  for (const f of failures) {
    console.log(`  ✗ ${f.name}${f.detail ? ' — ' + f.detail : ''}`);
  }
  console.log('');
}

if (warns.length > 0) {
  console.log('WARNINGS:');
  for (const w of warns) {
    console.log(`  ⚠ ${w.name}${w.detail ? ' — ' + w.detail : ''}`);
  }
  console.log('');
}

// Exit with error code if any failures
process.exit(failed > 0 ? 1 : 0);
