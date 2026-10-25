/**
 * changelog.ts — Release notes data model.
 *
 * Each product may have zero or more releases. A release requires:
 *   - version: semver string (e.g., "1.2.0")
 *   - date: ISO 8601 date string
 *   - changes: categorized list of changes per locale
 *
 * RULES:
 *   - Only products with REAL releases add entries here.
 *   - No fictional content. If a product has no releases, omit it.
 *   - Empty changelogs are valid — the sidebar link won't appear.
 */

export type ChangeCategory =
  | 'added'
  | 'improved'
  | 'fixed'
  | 'removed'
  | 'security';

export interface ChangeEntry {
  category: ChangeCategory;
  text: string;
}

export interface ChangelogRelease {
  /** Semver version string. */
  version: string;
  /** ISO 8601 date. */
  date: string;
  /** Changes keyed by locale. Every supported locale must have an entry. */
  changes: {
    es: ChangeEntry[];
    en: ChangeEntry[];
    pt: ChangeEntry[];
  };
}

/**
 * Full changelog per product slug.
 * Products without releases are simply absent — no empty arrays.
 */
export type ChangelogDB = Record<string, ChangelogRelease[]>;

/**
 * Releases for Solennix.
 * TODO: Add real releases here when they ship.
 */
const solennixReleases: ChangelogRelease[] = [];

/**
 * Releases for Pepinillo.
 * TODO: Add real releases here when they ship.
 */
const pepinilloReleases: ChangelogRelease[] = [];

/**
 * Releases for Películas.
 * TODO: Add real releases here when they ship.
 */
const peliculasReleases: ChangelogRelease[] = [];

/**
 * Releases for Subscription Guardian.
 * TODO: Add real releases here when they ship.
 */
const sgReleases: ChangelogRelease[] = [];

// ─── Database ───────────────────────────────────────────────────

export const changelogs: ChangelogDB = {
  solennix: solennixReleases,
  pepinillo: pepinilloReleases,
  peliculas: peliculasReleases,
  'subscription-guardian': sgReleases,
};

// ─── Helpers ────────────────────────────────────────────────────

/** Check if a product has any real releases. */
export function hasReleases(slug: string): boolean {
  const releases = changelogs[slug];
  return !!releases && releases.length > 0;
}

/** Get releases for a product, sorted newest first. Returns empty array if none. */
export function getReleases(slug: string): ChangelogRelease[] {
  const releases = changelogs[slug] ?? [];
  return [...releases].sort((a, b) => b.date.localeCompare(a.date));
}

/** Get a specific release by version. */
export function getRelease(
  slug: string,
  version: string,
): ChangelogRelease | undefined {
  return (changelogs[slug] ?? []).find((r) => r.version === version);
}

/** Category icons for UI rendering. */
export const categoryIcons: Record<ChangeCategory, string> = {
  added: '✨',
  improved: '⚡',
  fixed: '🐛',
  removed: '🗑️',
  security: '🔒',
};

/** Category labels per locale. */
export const categoryLabels: Record<string, Record<ChangeCategory, string>> = {
  es: {
    added: 'Agregado',
    improved: 'Mejorado',
    fixed: 'Corregido',
    removed: 'Eliminado',
    security: 'Seguridad',
  },
  en: {
    added: 'Added',
    improved: 'Improved',
    fixed: 'Fixed',
    removed: 'Removed',
    security: 'Security',
  },
  pt: {
    added: 'Adicionado',
    improved: 'Melhorado',
    fixed: 'Corrigido',
    removed: 'Removido',
    security: 'Segurança',
  },
};
