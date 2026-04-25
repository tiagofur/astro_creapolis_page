import { ui, defaultLang, type Lang, type UIKey } from './ui';

/**
 * Slug translation map: canonical key → localized slug per language.
 * The canonical key is always the Spanish slug (matches the ES filename).
 * Used by getLocalizedPath() and getAlternateLink() to generate correct URLs.
 */
const slugMap: Record<string, Record<Lang, string>> = {
  contacto: { es: 'contacto', en: 'contact', pt: 'contato' },
  servicios: { es: 'servicios', en: 'services', pt: 'servicos' },
  sobre: { es: 'sobre', en: 'about', pt: 'sobre' },
  proyectos: { es: 'proyectos', en: 'projects', pt: 'projetos' },
};

// Reverse map: localized slug → canonical key, per language (dynamically built)
const reverseSlugMap: Record<string, Record<string, string>> = {};
for (const [canonical, translations] of Object.entries(slugMap)) {
  for (const [lang, slug] of Object.entries(translations)) {
    if (!reverseSlugMap[lang]) reverseSlugMap[lang] = {};
    reverseSlugMap[lang][slug] = canonical;
  }
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Translates a path segment to the given language.
 * e.g. translateSlug('contacto', 'en') → 'contact'
 */
export function translateSlug(slug: string, lang: Lang): string {
  return slugMap[slug]?.[lang] ?? slug;
}

/**
 * Gets the canonical (Spanish) slug from a localized slug.
 * e.g. canonicalSlug('contact', 'en') → 'contacto'
 */
export function canonicalSlug(slug: string, lang: Lang): string {
  return reverseSlugMap[lang]?.[slug] ?? slug;
}

/**
 * Builds a localized path: translates slugs and prefixes with language.
 * e.g. getLocalizedPath('en', '/contacto') → '/en/contact'
 * e.g. getLocalizedPath('es', '/proyectos/pepinillo') → '/es/proyectos/pepinillo'
 */
export function getLocalizedPath(lang: Lang, path: string): string {
  const segments = path.split('/').filter(Boolean);
  const translated = segments.map(s => translateSlug(s, lang));
  return `/${lang}${translated.length ? '/' + translated.join('/') : ''}`;
}

/**
 * Builds the alternate language link for hreflang.
 * Translates slugs between languages.
 */
export function getAlternateLink(url: URL): { lang: Lang; href: string }[] {
  const currentLang = getLangFromUrl(url);
  const segments = url.pathname.split('/').filter(Boolean).slice(1); // remove lang prefix

  // Convert current slugs to canonical
  const canonicalSegments = segments.map(s => canonicalSlug(s, currentLang));

  // Generate links for all languages
  return (Object.keys(ui) as Lang[]).map(lang => {
    if (lang === currentLang) return { lang, href: url.pathname };
    const translated = canonicalSegments.map(s => translateSlug(s, lang));
    const path = translated.length ? '/' + translated.join('/') : '';
    return { lang, href: `/${lang}${path}` };
  });
}

export function formatDate(date: Date, lang: Lang): string {
  const locale = lang === 'en' ? 'en-US' : lang === 'pt' ? 'pt-BR' : 'es-ES';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}
