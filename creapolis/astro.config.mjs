import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://creapolis.dev',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  redirects: {
    '/servicios': '/es/servicios',
    '/services': '/en/services',
    '/contacto': '/es/contacto',
    '/contact': '/en/contact',
    '/sobre': '/es/sobre',
    '/about': '/en/about',
    '/proyectos': '/es/proyectos',
    '/projects': '/en/projects',
    '/blog': '/es/blog',
    '/solennix': '/es/proyectos/solennix',
    '/solennix/guide': '/es/proyectos/solennix/guide',
    '/solennix/tips': '/es/proyectos/solennix/tips',
    '/solennix/feedback': '/es/proyectos/solennix/feedback',
    '/pepinillo': '/es/proyectos/pepinillo',
    '/pepinillo/guide': '/en/projects/pepinillo/guide',
    '/pepinillo/tips': '/en/projects/pepinillo/tips',
    '/pepinillo/feedback': '/en/projects/pepinillo/feedback',
    '/proyectos/pepinillo': '/es/proyectos/pepinillo',
    '/proyectos/pepinillo/guide': '/es/proyectos/pepinillo/guide',
    '/proyectos/pepinillo/tips': '/es/proyectos/pepinillo/tips',
    '/proyectos/pepinillo/feedback': '/es/proyectos/pepinillo/feedback',
    '/proyectos/peliculas': '/es/proyectos/peliculas',
    '/proyectos/solennix': '/es/proyectos/solennix',
    '/proyectos/solennix/guide': '/es/proyectos/solennix/guide',
    '/proyectos/solennix/tips': '/es/proyectos/solennix/tips',
    '/proyectos/solennix/feedback': '/es/proyectos/solennix/feedback',
    // EN/PT translated product routes → canonical /proyectos/ routes
    '/en/projects/solennix': '/en/proyectos/solennix',
    '/en/projects/solennix/guide': '/en/proyectos/solennix/guide',
    '/en/projects/solennix/tips': '/en/proyectos/solennix/tips',
    '/en/projects/solennix/feedback': '/en/proyectos/solennix/feedback',
    '/pt/projetos/solennix': '/pt/proyectos/solennix',
    '/pt/projetos/solennix/guide': '/pt/proyectos/solennix/guide',
    '/pt/projetos/solennix/tips': '/pt/proyectos/solennix/tips',
    '/pt/projetos/solennix/feedback': '/pt/proyectos/solennix/feedback',
  },
  integrations: [
    sitemap({
      i18n: {
        locales: { es: 'es-ES', en: 'en-US', pt: 'pt-BR' },
        defaultLocale: 'es',
      },
      filter: (page) => !page.includes('/404') && !page.includes('/privacidad') && !page.includes('/terminos') && !page.includes('/eliminar-cuenta') && !page.includes('/privacy-policy') && !page.includes('/delete-account') && !page.includes('/terms-of-use'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});
