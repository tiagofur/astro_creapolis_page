#!/usr/bin/env node
/**
 * normalize-blog.mjs
 *
 * Uso:
 *   node scripts/normalize-blog.mjs          → aplica cambios
 *   node scripts/normalize-blog.mjs --dry    → solo reporta qué cambiaría
 *
 * Qué hace:
 *   - Agrega `description` cuando falta (extrae primer párrafo real del body).
 *   - Normaliza `author` a "tiagofur".
 *   - Normaliza tags: lowercase, trim, dedupe, saca vacíos.
 *   - Asegura que `pubDate` esté entre comillas.
 *   - Reordena el frontmatter en un orden canónico.
 *   - Preserva campos legacy (slug, originalUrl, categories).
 *   - Idempotente: correrlo dos veces no rompe nada.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BLOG_DIR = path.resolve(__dirname, '../src/content/blog');
const DRY_RUN = process.argv.includes('--dry');

const MAX_DESC = 180;

// Orden canónico en el que escribir el frontmatter.
const FIELD_ORDER = [
  'title',
  'description',
  'pubDate',
  'author',
  'tags',
  'categories',
  'slug',
  'originalUrl',
  'draft',
];

// ─── Remapeo de tags a set canónico ─────────────────────────────
// Las claves deben estar en lowercase (se comparan contra tags ya lowercased).
// Valor: tag canónico destino, o null para descartar.
const TAG_REMAP = {
  // mobile
  'android': 'mobile',
  'ios': 'mobile',
  'iphone': 'mobile',
  'desarrollomobile': 'mobile',
  'desarrollo mobile': 'mobile',
  'desarrollo móvil': 'mobile',
  'desarrollo movil': 'mobile',
  'cross-platform': 'mobile',
  'crossplatform': 'mobile',
  'desarrollomultiplataforma': 'mobile',
  'desarrollo multiplataforma': 'mobile',
  'multiplataforma': 'mobile',

  // desktop
  'desarrollodesktop': 'desktop',
  'desarrollo desktop': 'desktop',
  'macos': 'desktop',
  'windows': 'desktop',
  'linux': 'desktop',

  // web
  'desarrolloweb': 'web',
  'desarrollo web': 'web',

  // flutter
  'google flutter': 'flutter',
  'guía flutter': 'flutter',
  'guia flutter': 'flutter',
  'tutorial flutter': 'flutter',
  'scafold': 'flutter',
  'cupertino': 'flutter',
  'flame': 'flutter',

  // dart
  'null safety': 'dart',

  // react
  'react native': 'react-native',
  'reactnative': 'react-native',

  // nextjs
  'next.js': 'nextjs',
  'next js': 'nextjs',
  'server components': 'nextjs',

  // ui/ux
  'ui/ux': 'ui',
  'ui ux': 'ui',
  'widgets': 'ui',
  'interfaz de usuario': 'ui',
  'diseño de interfaz': 'ui',
  'diseño visual': 'ui',
  'diseño de aplicaciones': 'ui',
  'componentes de ui': 'ui',
  'construcción de ui': 'ui',
  'construccion de ui': 'ui',
  'animaciones': 'ui',
  'diseño ui/ux': 'ui',
  'material design': 'ui',
  'material 3': 'ui',
  'layout': 'ui',
  'diseño responsivo': 'ui',
  'responsive': 'ui',
  'responsivo': 'ui',
  'apariencia visual': 'ui',
  'sombras': 'ui',
  'borderradius': 'ui',
  'boxshadow': 'ui',
  'gradientes': 'ui',

  // desarrollo (genérico)
  'desarrollo de apps': 'desarrollo',
  'programación': 'desarrollo',
  'programacion': 'desarrollo',
  'código': 'desarrollo',
  'codigo': 'desarrollo',
  'tecnología': 'desarrollo',
  'tecnologia': 'desarrollo',

  // tutorial
  'guía': 'tutorial',
  'guia': 'tutorial',
  'tips': 'tutorial',
  'buenas prácticas': 'tutorial',
  'buenas practicas': 'tutorial',

  // testing
  'pruebas': 'testing',

  // ia
  'inteligencia artificial': 'ia',
  'github copilot': 'ia',
  'copilot': 'ia',
  'generación de código': 'ia',
  'generacion de codigo': 'ia',
  'gemini': 'ia',
  'llm': 'ia',
  'agentic': 'ia',
  'agentes': 'ia',
  'vibe code': 'ia',

  // automatizacion
  'automatización': 'automatizacion',

  // arquitectura
  'arquitectura de software': 'arquitectura',
  'patrones de diseño': 'arquitectura',
  'patrones': 'arquitectura',
  'código limpio': 'arquitectura',
  'codigo limpio': 'arquitectura',
  'clean code': 'arquitectura',
  'clean architecture': 'arquitectura',
  'hexagonal': 'arquitectura',
  'solid': 'arquitectura',
  'monolitos': 'arquitectura',

  // estado
  'gestion de estado': 'estado',
  'gestión de estado': 'estado',
  'gerencia estado': 'estado',
  'manejo de estado': 'estado',
  'provider': 'estado',
  'bloc': 'estado',
  'riverpod': 'estado',

  // performance
  'rendimiento': 'performance',
  'optimización': 'performance',
  'optimizacion': 'performance',

  // seguridad
  'ciberseguridad': 'seguridad',
  'security': 'seguridad',
  'devsecops': 'seguridad',
  'shift-left': 'seguridad',

  // datos
  'data': 'datos',
  'base de datos': 'datos',
  'database': 'datos',
  'persistencia': 'datos',
  'persistencia de datos': 'datos',
  'almacenamiento local': 'datos',
  'local-first': 'datos',

  // devops
  'platform engineering': 'devops',
  'ci/cd': 'devops',
  'cicd': 'devops',
  'docker': 'devops',

  // backend
  'nestjs': 'backend',
  'node.js': 'backend',
  'nodejs': 'backend',
  'api': 'backend',
  'api restful': 'backend',
  'rest': 'backend',
  'graphql': 'backend',
  'microservicios': 'backend',
  'typeorm': 'backend',

  // herramientas
  'google': 'herramientas',
  'vscode': 'herramientas',
  'vs code': 'herramientas',
  'cursor': 'herramientas',
  'windsurf': 'herramientas',
  'git': 'herramientas',
  'github': 'herramientas',
  'biome': 'herramientas',
  'eslint': 'herramientas',
  'prettier': 'herramientas',
  'turborepo': 'herramientas',
  'monorepo': 'herramientas',

  // nativo
  'native': 'nativo',

  // pricing / negocio
  'precio': 'pricing',
  'precios': 'pricing',
  'presupuesto': 'pricing',

  // DROP — redundante o ruido
  'creapolis': null,
  'blog': null,
  'post': null,
  'articulo': null,
  'artículo': null,
};

// ─── Parser mínimo de frontmatter ─────────────────────────────
function splitFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: null, body: raw };
  return { frontmatter: match[1], body: match[2] };
}

function parseValue(str) {
  const trimmed = str.trim();
  if (trimmed === '') return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null' || trimmed === '~') return null;

  // Array JSON-like single line: ["a", "b"]
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      const inner = trimmed.slice(1, -1).trim();
      if (!inner) return [];
      return inner
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    }
  }

  // String con comillas dobles — usa JSON.parse para desescapar
  // correctamente (\", \\, \n etc.) y evitar doble-escapado en re-runs.
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  // String con comillas simples — sin escape, literal
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }

  // Número
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

  // String pelado
  return trimmed;
}

function parseFrontmatter(block) {
  const out = {};
  if (!block) return out;
  const lines = block.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }

    const m = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!m) {
      i++;
      continue;
    }

    const key = m[1];
    let rest = m[2];

    // Array multilínea:
    //   tags:
    //     - a
    //     - b
    if (rest === '' && i + 1 < lines.length && /^\s+-\s/.test(lines[i + 1])) {
      const arr = [];
      i++;
      while (i < lines.length && /^\s+-\s/.test(lines[i])) {
        arr.push(parseValue(lines[i].replace(/^\s+-\s/, '')));
        i++;
      }
      out[key] = arr;
      continue;
    }

    out[key] = parseValue(rest);
    i++;
  }
  return out;
}

// ─── Serializador mínimo en el orden canónico ───────────────────
function serializeValue(v) {
  if (Array.isArray(v)) {
    return `[${v.map((x) => `"${String(x).replace(/"/g, '\\"')}"`).join(', ')}]`;
  }
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  if (v === null || v === undefined) return '';
  const s = String(v);
  // Fechas/strings simples: ponemos comillas dobles y escapamos las internas.
  return `"${s.replace(/"/g, '\\"')}"`;
}

function serializeFrontmatter(data) {
  const keys = [
    ...FIELD_ORDER.filter((k) => k in data),
    ...Object.keys(data).filter((k) => !FIELD_ORDER.includes(k)),
  ];
  const lines = keys.map((k) => `${k}: ${serializeValue(data[k])}`);
  return `---\n${lines.join('\n')}\n---`;
}

// ─── Extracción del primer párrafo real del body ────────────────
function firstParagraph(markdown) {
  const lines = markdown.split('\n');
  const acc = [];
  let inCode = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    if (!line) {
      if (acc.length > 0) break;
      continue;
    }
    if (line.startsWith('#')) continue;
    if (line.startsWith('>')) continue;
    if (line.startsWith('- ') || line.startsWith('* ')) continue;
    if (/^\d+\.\s/.test(line)) continue;
    if (line.startsWith('![')) continue;
    if (line.startsWith('|')) continue;
    if (line === '---' || line === '***' || line === '===') continue;
    acc.push(line);
  }
  return stripInline(acc.join(' '));
}

function stripInline(text) {
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

function truncate(text, max) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${cut.replace(/[,;:.!?]+$/, '')}…`;
}

// ─── Transformaciones ───────────────────────────────────────────
function normalizeTags(tags) {
  if (!Array.isArray(tags)) return tags;
  const seen = new Set();
  const out = [];
  for (const t of tags) {
    if (t === null || t === undefined) continue;
    const clean = String(t).trim().toLowerCase();
    if (!clean) continue;

    // Aplicar remap canónico. undefined = conservar tal cual; null = descartar.
    const mapped = clean in TAG_REMAP ? TAG_REMAP[clean] : clean;
    if (mapped === null) continue;

    if (seen.has(mapped)) continue;
    seen.add(mapped);
    out.push(mapped);
  }
  return out;
}

function normalizePost(data, body) {
  const changes = [];
  const next = { ...data };

  // description
  if (!next.description || String(next.description).trim() === '') {
    const extracted = firstParagraph(body);
    if (extracted) {
      next.description = truncate(extracted, MAX_DESC);
      changes.push('description (auto)');
    }
  }

  // author
  if (next.author === 'Creapolis' || !next.author) {
    if (next.author !== 'tiagofur') {
      next.author = 'tiagofur';
      changes.push('author');
    }
  }

  // tags
  if (Array.isArray(next.tags)) {
    const normalized = normalizeTags(next.tags);
    const before = JSON.stringify(next.tags);
    const after = JSON.stringify(normalized);
    if (before !== after) {
      next.tags = normalized;
      changes.push('tags');
    }
  } else if (next.tags === undefined) {
    next.tags = [];
    changes.push('tags (empty)');
  }

  return { data: next, changes };
}

// ─── Main ───────────────────────────────────────────────────────
function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  let modified = 0;
  let scanned = 0;
  const problems = [];

  for (const file of files) {
    scanned++;
    const full = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(full, 'utf8');
    const { frontmatter, body } = splitFrontmatter(raw);

    if (frontmatter === null) {
      problems.push(`${file}: sin frontmatter`);
      continue;
    }

    const data = parseFrontmatter(frontmatter);
    if (!data.title) {
      problems.push(`${file}: sin title`);
      continue;
    }

    const { data: nextData, changes } = normalizePost(data, body);

    if (changes.length === 0) continue;

    modified++;
    const newFrontmatter = serializeFrontmatter(nextData);
    const newFile = `${newFrontmatter}\n${body.startsWith('\n') ? body : '\n' + body}`;

    if (DRY_RUN) {
      console.log(`  ${file} → ${changes.join(', ')}`);
    } else {
      fs.writeFileSync(full, newFile, 'utf8');
    }
  }

  console.log('');
  console.log(`Archivos escaneados: ${scanned}`);
  console.log(`Archivos ${DRY_RUN ? 'a modificar' : 'modificados'}: ${modified}`);
  if (problems.length) {
    console.log('');
    console.log('Problemas:');
    problems.forEach((p) => console.log(`  - ${p}`));
  }
  if (DRY_RUN) {
    console.log('');
    console.log('Dry run — ningún archivo fue escrito. Corré sin --dry para aplicar.');
  }
}

main();
