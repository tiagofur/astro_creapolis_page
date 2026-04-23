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
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/privacidad') && !page.includes('/terminos') && !page.includes('/eliminar-cuenta') && !page.includes('/privacy-policy') && !page.includes('/delete-account'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});
