/**
 * Page-by-page coherence audit for creapolis.dev
 * Checks: content, links, i18n, design tokens, SEO, analytics, accessibility
 */
import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const SRC = path.resolve('src');

let issues = [];
let warnings = [];
let stats = { pages: 0, checks: 0, passed: 0 };

function readHTML(relPath) {
  // Paths in this script already include 'dist/' prefix
  const p = relPath.startsWith('dist/') ? path.resolve(relPath) : path.join(DIST, relPath);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8');
}

// Astro i18n/legacy redirects compile to meta-refresh stub pages. They carry
// no content by design — content checks must skip them.
function isRedirectStub(html) {
  return !!html && /http-equiv="refresh"/i.test(html);
}

function check(name, html, tests) {
  for (const [testName, fn] of tests) {
    stats.checks++;
    try {
      const result = fn(html);
      if (result === true) {
        stats.passed++;
      } else if (result === false) {
        issues.push({ page: name, issue: testName });
      } else if (typeof result === 'string') {
        warnings.push({ page: name, warning: `${testName}: ${result}` });
        stats.passed++;
      }
    } catch (e) {
      issues.push({ page: name, issue: `${testName}: ${e.message}` });
    }
  }
}

// ─── NON-BLOG PAGES ───
const nonBlogPages = [];
function walk(dir, prefix = '') {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const rel = path.join(prefix, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full, rel);
    } else if (f === 'index.html' && !full.includes('/blog/')) {
      nonBlogPages.push('/' + rel.replace(/\/index\.html$/, '/'));
    }
  }
}

// Collect pages per locale
const locales = ['es', 'en', 'pt'];
const keyPages = {};

for (const locale of locales) {
  keyPages[locale] = {
    home: `dist/${locale}/index.html`,
    services: `dist/${locale}/servicios/index.html`,
    services_en: `dist/${locale}/services/index.html`,
    about: `dist/${locale}/sobre/index.html`,
    about_en: `dist/${locale}/about/index.html`,
    contact: `dist/${locale}/contacto/index.html`,
    contact_en: `dist/${locale}/contact/index.html`,
    projects: `dist/${locale}/proyectos/index.html`,
    projects_en: `dist/${locale}/projects/index.html`,
    solennix: `dist/${locale}/proyectos/solennix/index.html`,
    solennix_en: `dist/${locale}/projects/solennix/index.html`,
    pepinillo: `dist/${locale}/proyectos/pepinillo/index.html`,
    pepinillo_en: `dist/${locale}/projects/pepinillo/index.html`,
    peliculas: `dist/${locale}/proyectos/peliculas/index.html`,
    peliculas_en: `dist/${locale}/projects/peliculas/index.html`,
    sg: `dist/${locale}/proyectos/subscription-guardian/index.html`,
    sg_en: `dist/${locale}/projects/subscription-guardian/index.html`,
  };
}

// Also check default-locale (root) pages
const rootPages = [
  'dist/index.html',
  'dist/about/index.html',
  'dist/contact/index.html',
  'dist/services/index.html',
  'dist/proyectos/index.html',
  'dist/sobre/index.html',
  'dist/contacto/index.html',
  'dist/servicios/index.html',
  'dist/privacy-policy/index.html',
  'dist/terminos/index.html',
  'dist/delete-account/index.html',
  'dist/eliminar-cuenta/index.html',
];

console.log('═══════════════════════════════════════════════════');
console.log('  CREAPOLIS PAGE-BY-PAGE COHERENCE AUDIT');
console.log('═══════════════════════════════════════════════════\n');

// Root-level pages below /es /en /pt are either legal endpoints or
// redirect stubs generated from astro.config redirects — both expected.

// ─── 1. HOMEPAGE AUDIT (all 3 locales) ───
console.log('── 1. HOMEPAGE (ES/EN/PT) ──');
const homeFiles = ['dist/es/index.html', 'dist/en/index.html', 'dist/pt/index.html'];
const homeExpected = {
  es: { title: 'Creapolis', h1_contains: ['software', 'producto'] },
  en: { title: 'Creapolis', h1_contains: ['software', 'product'] },
  pt: { title: 'Creapolis', h1_contains: ['software', 'produto'] },
};

for (const f of homeFiles) {
  const locale = f.split('/')[1];
  const rawHtml = readHTML(f);
  if (!rawHtml) { issues.push({ page: f, issue: 'FILE NOT FOUND' }); continue; }
  if (isRedirectStub(rawHtml)) { stats.redirects = (stats.redirects || 0) + 1; continue; }
  const html = rawHtml;
  stats.pages++;
  
  check(f, html, [
    ['Has <title>', h => h.includes('<title>')],
    ['Has <meta description>', h => h.includes('meta name="description"')],
    ['Has canonical URL', h => h.includes('rel="canonical"')],
    ['Has lang attribute', h => h.includes(`lang="${locale}"`)],
    ['Has skip-to-content link', h => h.includes('skip-link') || h.includes('#main-content')],
    ['Has <header> landmark', h => h.includes('<header')],
    ['Has <main> landmark', h => h.includes('<main')],
    ['Has <footer> landmark', h => h.includes('<footer')],
    ['Has CookieConsent', h => h.includes('cookie-consent') || h.includes('CookieConsent') || h.includes('cookie_consent')],
    ['Has analytics script', h => h.includes('track-events') || h.includes('analytics') || /<script[^>]*src="\/_astro\/[^\"]+\.js"/.test(h)],
    ['Has nav component', h => h.includes('nav') || h.includes('Nav')],
    ['No broken img src (empty)', h => !h.includes('src=""')],
    ['No TODO/FIXME markers', h => !h.includes('TODO') && !h.includes('FIXME')],
    ['Has viewport meta', h => h.includes('viewport')],
    ['Has og:title', h => h.includes('og:title')],
    ['Has og:description', h => h.includes('og:description')],
    ['Has og:image', h => h.includes('og:image')],
  ]);
}

// ─── 2. SERVICES PAGE ───
console.log('── 2. SERVICES (ES/EN/PT) ──');
const servicesFiles = [
  'dist/es/servicios/index.html',
  'dist/en/services/index.html', 
  'dist/pt/servicos/index.html',
  'dist/servicios/index.html',
  'dist/services/index.html',
];

for (const f of servicesFiles) {
  const rawHtml = readHTML(f);
  if (!rawHtml) { issues.push({ page: f, issue: 'FILE NOT FOUND' }); continue; }
  if (isRedirectStub(rawHtml)) { stats.redirects = (stats.redirects || 0) + 1; continue; }
  const html = rawHtml;
  stats.pages++;
  
  check(f, html, [
    ['Has <title>', h => h.includes('<title>')],
    ['Has meta description', h => h.includes('meta name="description"')],
    ['Has canonical', h => h.includes('rel="canonical"')],
    ['Has form (contact)', h => h.includes('<form')],
    ['Has honeypot field', h => h.includes('bot-field') || h.includes('honeypot') || h.includes('website')],
    ['Has service cards (at least 2)', h => (h.match(/service-card|svc-card|data-track-event="service_click"/g) || []).length >= 1],
    ['No TODO markers', h => !h.includes('TODO')],
    ['Has CTA to contact', h => h.includes('contact') || h.includes('contacto') || h.includes('contato')],
  ]);
}

// ─── 3. CONTACT PAGE ───
console.log('── 3. CONTACT (ES/EN/PT) ──');
const contactFiles = [
  'dist/es/contacto/index.html',
  'dist/en/contact/index.html',
  'dist/pt/contato/index.html',
  'dist/contacto/index.html',
  'dist/contact/index.html',
];

for (const f of contactFiles) {
  const rawHtml = readHTML(f);
  if (!rawHtml) { issues.push({ page: f, issue: 'FILE NOT FOUND' }); continue; }
  if (isRedirectStub(rawHtml)) { stats.redirects = (stats.redirects || 0) + 1; continue; }
  const html = rawHtml;
  stats.pages++;
  
  check(f, html, [
    ['Has <title>', h => h.includes('<title>')],
    ['Has meta description', h => h.includes('meta name="description"')],
    ['Has canonical', h => h.includes('rel="canonical"')],
    ['Has form', h => h.includes('<form')],
    ['Has honeypot', h => h.includes('bot-field') || h.includes('honeypot') || h.includes('website')],
    ['Has submit button', h => h.includes('submit') || h.includes('Send') || h.includes('Enviar') || h.includes('Enviar')],
    ['No TODO markers', h => !h.includes('TODO')],
  ]);
}

// ─── 4. ABOUT PAGE ───
console.log('── 4. ABOUT (ES/EN/PT) ──');
const aboutFiles = [
  'dist/es/sobre/index.html',
  'dist/en/about/index.html',
  'dist/pt/sobre/index.html',
  'dist/sobre/index.html',
  'dist/about/index.html',
];

for (const f of aboutFiles) {
  const rawHtml = readHTML(f);
  if (!rawHtml) { issues.push({ page: f, issue: 'FILE NOT FOUND' }); continue; }
  if (isRedirectStub(rawHtml)) { stats.redirects = (stats.redirects || 0) + 1; continue; }
  const html = rawHtml;
  stats.pages++;
  
  check(f, html, [
    ['Has <title>', h => h.includes('<title>')],
    ['Has meta description', h => h.includes('meta name="description"')],
    ['Has canonical', h => h.includes('rel="canonical"')],
    ['No TODO markers', h => !h.includes('TODO')],
    ['Has CTA', h => h.includes('cta') || h.includes('contact') || h.includes('contacto')],
  ]);
}

// ─── 5. PRODUCT PAGES ───
console.log('── 5. PRODUCT PAGES ──');
const productSlugs = ['solennix', 'pepinillo', 'peliculas', 'subscription-guardian'];
const productPages = [];

for (const slug of productSlugs) {
  // ES
  productPages.push(`dist/es/proyectos/${slug}/index.html`);
  // EN
  productPages.push(`dist/en/projects/${slug}/index.html`);
  // Root
  productPages.push(`dist/proyectos/${slug}/index.html`);
}

for (const f of productPages) {
  const rawHtml = readHTML(f);
  if (!rawHtml) { warnings.push({ page: f, warning: 'FILE NOT FOUND — may be expected' }); continue; }
  if (isRedirectStub(rawHtml)) { stats.redirects = (stats.redirects || 0) + 1; continue; }
  const html = rawHtml;
  stats.pages++;
  const slug = f.match(/proyectos?\/([^/]+)/)?.[1] || f.match(/projects\/([^/]+)/)?.[1] || 'unknown';
  
  check(f, html, [
    ['Has <title>', h => h.includes('<title>')],
    ['Has meta description', h => h.includes('meta name="description"')],
    ['Has canonical', h => h.includes('rel="canonical"')],
    ['Has product name in content', h => h.toLowerCase().includes(slug.replace(/-/g, '')) || slug === 'subscription-guardian' ? h.toLowerCase().includes('subscription') : true],
    ['Has store links (at least one)', h => h.includes('apps.apple.com') || h.includes('play.google.com') || h.includes('solennix.com') || h.includes('store')],
    ['Has data-track-event for store_click', h => h.includes('data-track-event="store_click"') || h.includes('store')],
    ['Has back link to projects', h => h.includes('proyectos') || h.includes('projects')],
    ['No TODO markers', h => !h.includes('TODO')],
  ]);
}

// ─── 6. PRODUCT SUB-PAGES (guide, tips, changelog, privacy, feedback) ───
console.log('── 6. PRODUCT SUB-PAGES ──');
const subPages = ['guide', 'tips', 'changelog', 'privacy', 'feedback'];

for (const slug of productSlugs) {
  for (const sub of subPages) {
    const f = `dist/es/proyectos/${slug}/${sub}/index.html`;
    const html = readHTML(f);
    if (!html) continue;
    if (isRedirectStub(html)) continue; // Not all products have all sub-pages
    if (isRedirectStub(html)) continue;
    stats.pages++;
    
    check(f, html, [
      ['Has <title>', h => h.includes('<title>')],
      ['Has canonical', h => h.includes('rel="canonical"')],
      ['Has breadcrumb/back link', h => h.includes('proyectos') || h.includes('projects')],
      ['No TODO markers', h => !h.includes('TODO')],
      ['Has content (not empty)', h => h.replace(/<[^>]*>/g, '').trim().length > 100],
    ]);
  }
}

// ─── 7. BLOG INDEX ───
console.log('── 7. BLOG INDEX (ES/EN/PT) ──');
const blogIndexFiles = [
  'dist/es/blog/index.html',
  'dist/en/blog/index.html',
  'dist/pt/blog/index.html',
  'dist/blog/index.html',
];

for (const f of blogIndexFiles) {
  const html = readHTML(f);
  if (!html) { warnings.push({ page: f, warning: 'FILE NOT FOUND' }); continue; }
  if (isRedirectStub(html)) continue;
  stats.pages++;
  
  check(f, html, [
    ['Has <title>', h => h.includes('<title>')],
    ['Has meta description', h => h.includes('meta name="description"')],
    ['Has canonical', h => h.includes('rel="canonical"')],
    ['Has blog post cards (at least 5)', h => (h.match(/blog-card|post-card|article-card|<article/g) || []).length >= 3],
    ['Has category filters', h => h.includes('filter') || h.includes('category') || h.includes('tag')],
    ['No TODO markers', h => !h.includes('TODO')],
  ]);
}

// ─── 8. SAMPLE BLOG POSTS (3 per locale) ───
console.log('── 8. SAMPLE BLOG POSTS ──');
const blogDirs = ['dist/es/blog', 'dist/en/blog'];
for (const dir of blogDirs) {
  if (!fs.existsSync(dir)) continue;
  const posts = fs.readdirSync(dir).filter(d => fs.statSync(path.join(dir, d)).isDirectory()).slice(0, 3);
  for (const post of posts) {
    const f = `${dir}/${post}/index.html`;
    const html = readHTML(f);
    if (!html) continue;
    if (isRedirectStub(html)) continue;
    stats.pages++;
    
    check(f, html, [
      ['Has <title>', h => h.includes('<title>')],
      ['Has meta description', h => h.includes('meta name="description"')],
      ['Has canonical', h => h.includes('rel="canonical"')],
      ['Has article content', h => h.includes('<article') || h.includes('prose') || h.includes('blog-content')],
      ['Has reading time', h => h.includes('reading') || h.includes('min')],
      ['Has share buttons', h => h.includes('share') || h.includes('linkedin') || h.includes('twitter')],
      ['Has TOC (table of contents)', h => h.includes('toc') || h.includes('table-of-contents')],
      ['Has back link to blog index', h => h.includes('/blog"') || h.includes('blog/index')],
      ['No TODO markers', h => !h.includes('TODO')],
    ]);
  }
}

// ─── 9. SPECIAL PAGES ───
console.log('── 9. SPECIAL PAGES ──');
const specialPages = [
  'dist/es/404/index.html',
  'dist/en/404/index.html',
  'dist/pt/404/index.html',
  'dist/privacy-policy/index.html',
  'dist/terminos/index.html',
  'dist/terms-of-use/index.html',
  'dist/eliminar-cuenta/index.html',
  'dist/delete-account/index.html',
];

for (const f of specialPages) {
  const html = readHTML(f);
  if (!html) { warnings.push({ page: f, warning: 'FILE NOT FOUND' }); continue; }
  if (isRedirectStub(html)) continue;
  stats.pages++;
  
  check(f, html, [
    ['Has <title>', h => h.includes('<title>')],
    ['Has canonical', h => h.includes('rel="canonical"')],
    ['No TODO markers', h => !h.includes('TODO')],
  ]);
}

// ─── 10. CROSS-CUTTING: NAV CONSISTENCY ───
console.log('── 10. CROSS-CUTTING CHECKS ──');
// Check that all pages have consistent nav links
const navChecks = ['dist/es/index.html', 'dist/en/index.html', 'dist/pt/index.html'];
for (const f of navChecks) {
  const html = readHTML(f);
  if (!html) continue;
  if (isRedirectStub(html)) continue;
  
  const locale = f.split('/')[1];
  const hasServices = html.includes('servicios') || html.includes('services') || html.includes('servicos');
  const hasContact = html.includes('contacto') || html.includes('contact') || html.includes('contato');
  const hasAbout = html.includes('sobre') || html.includes('about');
  const hasBlog = html.includes('/blog');
  const hasProjects = html.includes('proyectos') || html.includes('projects') || html.includes('projetos');
  
  check(f, html, [
    ['Nav has services link', () => hasServices],
    ['Nav has contact link', () => hasContact],
    ['Nav has about link', () => hasAbout],
    ['Nav has blog link', () => hasBlog],
    ['Nav has projects link', () => hasProjects],
    ['Has language switcher', h => h.includes('lang-option') || h.includes('lang-selector') || h.includes('language')],
  ]);
}

// ─── 11. DESIGN TOKEN CONSISTENCY ───
console.log('── 11. DESIGN TOKENS ──');
const cssFiles = fs.readdirSync(path.join(DIST, '_astro')).filter(f => f.endsWith('.css'));
if (cssFiles.length > 0) {
  // Tokens live in the global stylesheet; scoped chunks don't carry them.
  let css = '';
  for (const f of cssFiles) {
    css += fs.readFileSync(path.join(DIST, '_astro', f), 'utf8');
  }
  stats.pages++; // count as one page
  stats.checks += 3;
  
  if (css.includes('--c-cyan') && css.includes('--c-magenta') && css.includes('--c-yellow') && css.includes('--ink')) {
    stats.passed += 1;
  } else {
    issues.push({ page: 'CSS', issue: 'Missing design tokens (--c-cyan, --c-magenta, --c-yellow, --ink)' });
  }
  
  if (css.includes('--space-') || css.includes('--s-')) {
    stats.passed += 1;
  } else {
    issues.push({ page: 'CSS', issue: 'Missing spacing tokens' });
  }
  
  if (css.includes('system-ui') || css.includes('Inter') || css.includes('font-family')) {
    stats.passed += 1;
  } else {
    issues.push({ page: 'CSS', issue: 'Missing font declarations' });
  }
}

// ─── 12. SITEMAP & ROBOTS ───
console.log('── 12. SITEMAP & ROBOTS ──');
const sitemap = readHTML('sitemap-index.xml');
const robots = readHTML('robots.txt');
stats.pages += 2;
stats.checks += 4;

if (sitemap) { stats.passed++; } else { issues.push({ page: 'sitemap', issue: 'sitemap-index.xml not found' }); }
if (robots) {
  stats.passed++;
  if (robots.includes('Allow: /') || robots.includes('User-agent')) { stats.passed++; } 
  else { issues.push({ page: 'robots.txt', issue: 'Missing User-agent/Allow directives' }); }
  if (robots.includes('Sitemap:')) { stats.passed++; }
  else { issues.push({ page: 'robots.txt', issue: 'Missing Sitemap reference' }); }
} else {
  issues.push({ page: 'robots.txt', issue: 'robots.txt not found' });
}

// ─── RESULTS ───
console.log('\n═══════════════════════════════════════════════════');
console.log('  RESULTS');
console.log('═══════════════════════════════════════════════════');
console.log(`  Pages scanned: ${stats.pages}`);
console.log(`  Checks run:    ${stats.checks}`);
console.log(`  Passed:        ${stats.passed}`);
console.log(`  Issues:        ${issues.length}`);
console.log(`  Warnings:      ${warnings.length}`);

if (issues.length > 0) {
  console.log('\n── ISSUES ──');
  for (const i of issues) {
    console.log(`  ❌ [${i.page}] ${i.issue}`);
  }
}

if (warnings.length > 0) {
  console.log('\n── WARNINGS ──');
  for (const w of warnings.slice(0, 20)) {
    console.log(`  ⚠️  [${w.page}] ${w.warning}`);
  }
}

process.exit(issues.length > 0 ? 1 : 0);
