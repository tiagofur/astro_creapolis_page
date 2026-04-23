import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const pages = [
  { src: '/tmp/orig_index.astro', dest: '/Users/tiagofur/dev/astro_creapolis/creapolis/src/pages/[lang]/index.astro', deep: 1 },
  { src: '/tmp/orig_servicios.astro', dest: '/Users/tiagofur/dev/astro_creapolis/creapolis/src/pages/[lang]/servicios.astro', deep: 1 },
  { src: '/tmp/orig_sobre.astro', dest: '/Users/tiagofur/dev/astro_creapolis/creapolis/src/pages/[lang]/sobre.astro', deep: 1 },
  { src: '/tmp/orig_contacto.astro', dest: '/Users/tiagofur/dev/astro_creapolis/creapolis/src/pages/[lang]/contacto.astro', deep: 1 },
  { src: '/tmp/orig_solennix.astro', dest: '/Users/tiagofur/dev/astro_creapolis/creapolis/src/pages/[lang]/solennix.astro', deep: 1 },
  { src: '/tmp/orig_blog_index.astro', dest: '/Users/tiagofur/dev/astro_creapolis/creapolis/src/pages/[lang]/blog/index.astro', deep: 2 },
  { src: '/tmp/orig_proyectos_index.astro', dest: '/Users/tiagofur/dev/astro_creapolis/creapolis/src/pages/[lang]/proyectos/index.astro', deep: 2 },
  { src: '/tmp/orig_proyectos_slug.astro', dest: '/Users/tiagofur/dev/astro_creapolis/creapolis/src/pages/[lang]/proyectos/[slug].astro', deep: 2 },
];

const gspSimple = `export function getStaticPaths() {
  return [{ params: { lang: 'es' } }, { params: { lang: 'en' } }];
}

const lang = Astro.params.lang as import('../../i18n/ui').Lang;`;

const gspBlogIndex = `export function getStaticPaths() {
  return [{ params: { lang: 'es' } }, { params: { lang: 'en' } }];
}

const lang = Astro.params.lang as import('../../../i18n/ui').Lang;`;

const gspProyectosSlug = `export async function getStaticPaths() {
  const langs: import('../../../i18n/ui').Lang[] = ['es', 'en'];
  const slugs = ['pepinillo', 'peliculas'];
  return langs.flatMap(l => slugs.map(s => ({ params: { lang: l, slug: s } })));
}

const lang = Astro.params.lang as import('../../../i18n/ui').Lang;`;

for (const page of pages) {
  let content = readFileSync(page.src, 'utf-8');
  const deep = page.deep;

  const prefix = '../'.repeat(deep + 1);

  content = content.replace(/^---\n/, `---\n${page.src.includes('[slug]') ? gspProyectosSlug : (deep === 2 ? gspBlogIndex : gspSimple)}\n\n`);

  content = content.replace(/from '\.\.\/layouts\/Layout\.astro'/g, `from '${prefix}layouts/Layout.astro'`);
  content = content.replace(/from '\.\.\/\.\.\/layouts\/Layout\.astro'/g, `from '${prefix}layouts/Layout.astro'`);
  content = content.replace(/from '\.\.\/components\/Nav\.astro'/g, `from '${prefix}components/Nav.astro'`);
  content = content.replace(/from '\.\.\/\.\.\/components\/Nav\.astro'/g, `from '${prefix}components/Nav.astro'`);
  content = content.replace(/from '\.\.\/components\/Footer\.astro'/g, `from '${prefix}components/Footer.astro'`);
  content = content.replace(/from '\.\.\/\.\.\/components\/Footer\.astro'/g, `from '${prefix}components/Footer.astro'`);
  content = content.replace(/from '\.\.\/components\/Ribbon\.astro'/g, `from '${prefix}components/Ribbon.astro'`);
  content = content.replace(/from '\.\.\/\.\.\/components\/Ribbon\.astro'/g, `from '${prefix}components/Ribbon.astro'`);
  content = content.replace(/from '\.\.\/utils\/post'/g, `from '${prefix}utils/post'`);
  content = content.replace(/from '\.\.\/\.\.\/utils\/post'/g, `from '${prefix}utils/post'`);
  content = content.replace(/from '\.\.\/components\/LegalPrivacyEN\.astro'/g, `from '${prefix}components/LegalPrivacyEN.astro'`);

  content = content.replace(/<Nav\s*\/>/g, '<Nav lang={lang} />');
  content = content.replace(/<Nav\s+([^>]*?)\/>/g, '<Nav lang={lang} $1/>');
  content = content.replace(/<Footer\s*\/>/g, '<Footer lang={lang} />');

  content = content.replace(/<Layout(\s[^>]*)?>/g, (match, attrs) => {
    if (attrs && attrs.includes('lang=')) return match;
    if (attrs) return `<Layout lang={lang}${attrs}>`;
    return '<Layout lang={lang}>';
  });

  content = content.replace(/href="\//g, (match, offset, str) => {
    const afterHref = str.slice(offset + 6, offset + 12);
    if (['/es/', '/en/', '/priv', '/term', '/dele', '/elim', '/mail', 'http', '/#ap', '/rss', '/api'].some(p => afterHref.startsWith(p))) return match;
    return `href="/${'$'}{lang}/`;
  });

  content = content.replace(/href='\//g, (match, offset, str) => {
    const afterHref = str.slice(offset + 6, offset + 12);
    if (['/es/', '/en/', '/priv', '/term', '/dele', '/elim', '/mail', 'http', '/#ap', '/rss', '/api'].some(p => afterHref.startsWith(p))) return match;
    return `href='/${'$'}{lang}/`;
  });

  content = content.replace("new Intl.DateTimeFormat('es-ES'", "new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-ES'");

  mkdirSync(dirname(page.dest), { recursive: true });
  writeFileSync(page.dest, content);
  console.log(`Created: ${page.dest}`);
}
