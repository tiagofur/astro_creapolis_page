import { defineMiddleware } from 'astro:middleware';

const LEGACY_PATHS = new Set([
  '/servicios',
  '/sobre',
  '/contacto',
  '/proyectos',
  '/solennix',
  '/blog',
]);

const LEGACY_PREFIXES = ['/blog/', '/proyectos/'];

const LEGACY_SKIP = new Set([
  '/privacy-policy',
  '/terms-of-use',
  '/delete-account',
  '/privacidad',
  '/terminos',
  '/eliminar-cuenta',
  '/favicon.svg',
  '/og-default.png',
  '/rss.xml',
]);

function detectLang(request: Request): 'es' | 'en' {
  const accept = request.headers.get('accept-language') || '';
  const preferred = accept.split(',').map((l) => l.split(';')[0].trim().toLowerCase());
  for (const lang of preferred) {
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('pt')) return 'es';
  }
  return 'en';
}

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  if (pathname.startsWith('/es/') || pathname.startsWith('/en/')) {
    return next();
  }

  if (pathname === '/' || pathname === '') {
    return context.redirect(`/${detectLang(context.request)}/`, 302);
  }

  if (LEGACY_SKIP.has(pathname)) {
    return next();
  }

  if (pathname.startsWith('/_astro/') || pathname.startsWith('/api/')) {
    return next();
  }

  if (pathname.includes('.')) {
    return next();
  }

  if (LEGACY_PATHS.has(pathname)) {
    const lang = detectLang(context.request);
    return context.redirect(`/${lang}${pathname}`, 301);
  }

  for (const prefix of LEGACY_PREFIXES) {
    if (pathname.startsWith(prefix)) {
      const lang = detectLang(context.request);
      return context.redirect(`/${lang}${pathname}`, 301);
    }
  }

  const lang = detectLang(context.request);
  return context.redirect(`/${lang}${pathname}`, 301);
});
