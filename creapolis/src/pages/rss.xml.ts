import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  // Sort by pubDate descending, take the latest 50
  const sorted = posts
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .slice(0, 50);

  return rss({
    title: 'Blog — Creapolis',
    description:
      'Artículos sobre desarrollo de software, tecnología y mejores prácticas.',
    site: context.site!,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Use canonical URL: /es/blog/slug (Spanish is the default locale)
      // post.id includes .md extension — strip it
      link: `/es/blog/${post.id.replace(/\.md$/, '')}/`,
    })),
    customData: '<language>es</language>',
  });
}
