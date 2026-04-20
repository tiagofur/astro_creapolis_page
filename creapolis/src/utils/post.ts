import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

const MAX_DESCRIPTION_LENGTH = 180;

/**
 * Devuelve una descripción usable para un post:
 *  - Si el frontmatter tiene `description` no vacía → la usa.
 *  - Si no, extrae el primer párrafo significativo del body markdown
 *    (descartando headings, bloques de código, imágenes, líneas vacías).
 */
export function getPostDescription(post: BlogPost): string {
  const explicit = post.data.description?.trim();
  if (explicit) return explicit;

  const body = post.body ?? '';
  const firstParagraph = extractFirstParagraph(body);
  if (!firstParagraph) return '';

  return truncate(firstParagraph, MAX_DESCRIPTION_LENGTH);
}

function extractFirstParagraph(markdown: string): string {
  const lines = markdown.split('\n');
  const paragraphLines: string[] = [];
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    if (!line) {
      if (paragraphLines.length > 0) break;
      continue;
    }

    if (line.startsWith('#')) continue;
    if (line.startsWith('>')) continue;
    if (line.startsWith('- ') || line.startsWith('* ')) continue;
    if (/^\d+\.\s/.test(line)) continue;
    if (line.startsWith('![')) continue;
    if (line.startsWith('|')) continue;
    if (line === '---' || line === '***' || line === '===') continue;

    paragraphLines.push(line);
  }

  return stripInlineMarkdown(paragraphLines.join(' '));
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${cut.replace(/[,;:.!?]+$/, '')}…`;
}
