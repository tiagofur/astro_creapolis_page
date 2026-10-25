import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    author: z.string().default('tiagofur'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Cover image — relative to public/ or external URL.
    // Falls back to og-default.png if not set.
    cover: z.string().optional(),
    // SEO metadata — overrides global defaults per post.
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        ogImage: z.string().optional(),
      })
      .optional(),
    // Canonical URL — set when content was originally published elsewhere.
    canonical: z.string().url().optional(),
    // Locale — the language this post was written in.
    // All existing posts are 'es'. EN/PT pages show a notice.
    locale: z.enum(['es', 'en', 'pt']).default('es'),
    // Campos legacy de la exportación desde WordPress — se ignoran en render
    // pero permitimos su presencia para no invalidar posts.
    slug: z.string().optional(),
    originalUrl: z.string().optional(),
    categories: z.array(z.string()).optional(),
  }),
});

// Nota: los proyectos viven hardcoded en src/pages/proyectos/[slug].astro
// por ahora. Cuando se migren a markdown, reactivar esta collection.

// Build Notes — short-form updates, changelogs, lab experiments.
// Only create pages when there's real content to show.
const buildNotes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    type: z
      .enum(['update', 'changelog', 'experiment', 'thought'])
      .default('update'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Related product slug (optional) — links note to a specific product
    product: z.string().optional(),
  }),
});

export const collections = { blog, 'build-notes': buildNotes };
