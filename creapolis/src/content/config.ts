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
    // Campos legacy de la exportación desde WordPress — se ignoran en render
    // pero permitimos su presencia para no invalidar posts.
    slug: z.string().optional(),
    originalUrl: z.string().optional(),
    categories: z.array(z.string()).optional(),
  }),
});

// Nota: los proyectos viven hardcoded en src/pages/proyectos/[slug].astro
// por ahora. Cuando se migren a markdown, reactivar esta collection.

export const collections = { blog };
