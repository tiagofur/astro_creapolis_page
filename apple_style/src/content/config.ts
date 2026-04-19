import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Creapolis'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const proyectos = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    desc: z.string(),
    platform: z.string(),
    color: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, proyectos };