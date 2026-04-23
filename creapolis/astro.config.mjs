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
