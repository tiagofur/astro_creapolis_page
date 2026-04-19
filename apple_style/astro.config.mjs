import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://creapolis.dev',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
  },
});