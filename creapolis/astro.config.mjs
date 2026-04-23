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
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
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
    '/solennix': '/es/solennix',
    '/pepinillo': '/es/proyectos/pepinillo',
    '/pepinillo/guide': '/en/projects/pepinillo/guide',
    '/pepinillo/tips': '/en/projects/pepinillo/tips',
    '/pepinillo/feedback': '/en/projects/pepinillo/feedback',
    '/proyectos/pepinillo': '/es/proyectos/pepinillo',
    '/proyectos/pepinillo/guide': '/es/proyectos/pepinillo/guide',
    '/proyectos/pepinillo/tips': '/es/proyectos/pepinillo/tips',
    '/proyectos/pepinillo/feedback': '/es/proyectos/pepinillo/feedback',
    '/proyectos/peliculas': '/es/proyectos/peliculas',
  },
  integrations: [
    sitemap({
      i18n: {
        locales: { es: 'es-ES', en: 'en-US' },
        defaultLocale: 'es',
      },
      filter: (page) => !page.includes('/privacidad') && !page.includes('/terminos') && !page.includes('/eliminar-cuenta') && !page.includes('/privacy-policy') && !page.includes('/delete-account'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});
