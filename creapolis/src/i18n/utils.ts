import { ui, defaultLang, type Lang, type UIKey } from './ui';

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

export function getLocalizedPath(lang: Lang, path: string): string {
  return `/${lang}${path}`;
}

export function getAlternateLink(url: URL): { lang: Lang; href: string }[] {
  const lang = getLangFromUrl(url);
  const pathWithoutLang = url.pathname.replace(`/${lang}`, '') || '/';
  const otherLang: Lang = lang === 'es' ? 'en' : 'es';

  return [
    { lang, href: url.pathname },
    { lang: otherLang, href: `/${otherLang}${pathWithoutLang}` },
  ];
}

export function formatDate(date: Date, lang: Lang): string {
  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}
