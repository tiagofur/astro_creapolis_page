#!/usr/bin/env node

/**
 * CWV Monitor — creapolis.dev
 * 
 * Measures estimated Core Web Vitals from the built static output.
 * For real-world CWV data, use Chrome UX Report (CrUX) or web-vitals library.
 * 
 * Usage: node scripts/monitor-cwv.mjs
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(import.meta.dirname, '..', 'dist');

// ── Helpers ──────────────────────────────────────────────────────────────────

function readHTML(path) {
  const full = join(DIST, path);
  return existsSync(full) ? readFileSync(full, 'utf-8') : null;
}

function count(html, pattern) {
  return html ? (html.match(new RegExp(pattern, 'g')) || []).length : 0;
}

function size(html) {
  return html ? Buffer.byteLength(html) : 0;
}

// ── Metrics ──────────────────────────────────────────────────────────────────

const pages = [
  { path: 'es/index.html', name: 'ES Homepage' },
  { path: 'en/index.html', name: 'EN Homepage' },
  { path: 'pt/index.html', name: 'PT Homepage' },
  { path: 'es/servicios/index.html', name: 'ES Services' },
  { path: 'en/services/index.html', name: 'EN Services' },
  { path: 'es/contacto/index.html', name: 'ES Contact' },
  { path: 'en/contact/index.html', name: 'EN Contact' },
  { path: 'es/blog/index.html', name: 'ES Blog Index' },
];

let passed = 0;
let failed = 0;
let warnings = 0;

function check(name, condition, detail = '') {
  if (condition) {
    console.log(`  ✓ ${name}${detail ? ' — ' + detail : ''}`);
    passed++;
  } else {
    console.log(`  ✗ ${name}${detail ? ' — ' + detail : ''}`);
    failed++;
  }
}

function warn(name, detail = '') {
  console.log(`  ! ${name}${detail ? ' — ' + detail : ''}`);
  warnings++;
}

// ── Analysis ─────────────────────────────────────────────────────────────────

console.log('\n═══════════════════════════════════════════════');
console.log('  CREAPOLIS CWV MONITOR  v1.0');
console.log('═══════════════════════════════════════════════\n');

// 1. Font Loading (LCP impact)
console.log('▸ 1. Font Loading (LCP Impact)');
let totalFonts = 0;
let nonBlockingFonts = 0;
let fontDisplayOk = 0;

for (const page of pages) {
  const html = readHTML(page.path);
  if (!html) continue;
  
  const fonts = count(html, 'font-family');
  const nonBlocking = count(html, 'media="print" onload');
  const display = count(html, 'font-display');
  
  totalFonts += fonts;
  nonBlockingFonts += nonBlocking;
  fontDisplayOk += display;
}

check('Font loading non-blocking', nonBlockingFonts > 0, `${nonBlockingFonts} fonts use media="print"`);
if (nonBlockingFonts === 0) {
  warn('No non-blocking fonts found — fonts may block LCP');
}

// 2. Image Optimization (LCP/CLS impact)
console.log('\n▸ 2. Image Optimization (LCP/CLS Impact)');
let lazyImages = 0;
let eagerImages = 0;
let webpImages = 0;
let avifImages = 0;
let svgImages = 0;

for (const page of pages) {
  const html = readHTML(page.path);
  if (!html) continue;
  
  lazyImages += count(html, 'loading="lazy"');
  eagerImages += count(html, 'loading="eager"');
  webpImages += count(html, '.webp');
  avifImages += count(html, '.avif');
  svgImages += count(html, '.svg');
}

check('Lazy loading enabled', lazyImages > 0, `${lazyImages} images lazy-loaded`);
const optimizedFormats = webpImages + avifImages + svgImages;
check('Optimized image formats', optimizedFormats > 0, `${webpImages} WebP, ${avifImages} AVIF, ${svgImages} SVG`);

if (lazyImages === 0) {
  warn('No lazy-loaded images — may impact LCP/CLS');
}

// 3. JavaScript Impact (INP/CLS)
console.log('\n▸ 3. JavaScript Impact (INP/CLS)');
let totalScripts = 0;
let moduleScripts = 0;
let inlineScripts = 0;
let deferScripts = 0;
let ldJsonScripts = 0;

for (const page of pages) {
  const html = readHTML(page.path);
  if (!html) continue;
  
  totalScripts += (html.match(/<script[\s>]/g) || []).length;
  moduleScripts += (html.match(/type="module"/g) || []).length;
  inlineScripts += (html.match(/<script>\s*[^<]+\s*<\/script>/g) || []).length;
  deferScripts += (html.match(/ defer/g) || []).length;
  ldJsonScripts += (html.match(/type="application\/ld\+json"/g) || []).length;
}

const blockingScripts = totalScripts - moduleScripts - ldJsonScripts - inlineScripts;

check('Module scripts (async)', moduleScripts > 0, `${moduleScripts} type="module" scripts`);
check('No render-blocking scripts', blockingScripts === 0, blockingScripts === 0 ? 'all scripts async' : `${blockingScripts} blocking scripts`);

if (inlineScripts > 5) {
  warn('High inline script count — may impact INP', `${inlineScripts} inline scripts`);
}

// 4. Layout Shift Prevention (CLS)
console.log('\n▸ 4. Layout Shift Prevention (CLS)');
let explicitDimensions = 0;
let fontMetrics = 0;

for (const page of pages) {
  const html = readHTML(page.path);
  if (!html) continue;
  
  explicitDimensions += count(html, 'width="\\d');
  explicitDimensions += count(html, 'height="\\d');
  fontMetrics += count(html, 'size-adjust');
  fontMetrics += count(html, 'ascent-override');
}

check('Explicit image dimensions', explicitDimensions > 0, `${explicitDimensions} dimensions found`);
if (fontMetrics > 0) {
  check('Font metrics fallback', true, `${fontMetrics} font metrics overrides`);
} else {
  warn('No font metrics fallback — may cause CLS on font load');
}

// 5. Third-Party Impact
console.log('\n▸ 5. Third-Party Impact');
let externalResources = 0;
let preconnects = 0;

for (const page of pages) {
  const html = readHTML(page.path);
  if (!html) continue;
  
  externalResources += count(html, 'https?://[^"\']+');
  preconnects += count(html, 'rel="preconnect"');
}

check('Preconnect hints', preconnects > 0, `${preconnects} preconnect hints`);

// 6. Page Size
console.log('\n▸ 6. Page Size');
for (const page of pages.slice(0, 4)) {
  const html = readHTML(page.path);
  if (!html) continue;
  
  const bytes = size(html);
  const kb = (bytes / 1024).toFixed(1);
  
  check(`${page.name} size`, bytes < 100 * 1024, `${kb} KB`);
  if (bytes > 50 * 1024) {
    warn(`${page.name} is large`, `${kb} KB — consider code splitting`);
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────

console.log('\n═══════════════════════════════════════════════');
console.log(`  RESULTS: ${passed} passed, ${failed} failed, ${warnings} warnings`);
console.log('═══════════════════════════════════════════════\n');

if (failed > 0) {
  console.log('⚠️  Some CWV checks failed. Review the issues above.');
  console.log('   For real-world data, use Chrome UX Report (CrUX).');
  process.exit(1);
} else if (warnings > 0) {
  console.log('✅ All critical checks passed, but there are warnings.');
  console.log('   Consider addressing warnings for optimal performance.');
} else {
  console.log('✅ All CWV checks passed! Site is optimized for performance.');
}
