/**
 * products.ts — Single source of truth for all product data.
 *
 * Every product is defined once here with its canonical (locale-independent) data.
 * Locale-specific copy (tagline, description, features, story) lives in the
 * corresponding product pages and is derived from this schema via helpers.
 *
 * This file replaces the scattered product data previously in:
 * - projects.ts (ProjectDataEntry)
 * - home.ts (HomeApps)
 * - solennix.ts (pricing, features)
 * - pepinillo-support.ts / sg-support.ts / solennix-support.ts
 */

// ─── Enums ──────────────────────────────────────────────────────

export type ProductStatus =
  | 'live'
  | 'pre_production'
  | 'coming_soon'
  | 'archived';
export type Platform =
  | 'ios'
  | 'android'
  | 'web'
  | 'macos'
  | 'windows'
  | 'linux'
  | 'watchos'
  | 'wearos';
export type PricingType =
  | 'free'
  | 'freemium'
  | 'one_time'
  | 'subscription'
  | 'custom';
export type PricingCurrency = 'USD' | 'MXN' | 'EUR';

// ─── Core Types ─────────────────────────────────────────────────

export interface ProductPricing {
  type: PricingType;
  /** Price amount. Null for free tiers. */
  amount: number | null;
  /** Currency code. Required when amount is not null. */
  currency: PricingCurrency | null;
  /** Billing period for subscriptions: 'monthly' | 'annual'. */
  billingPeriod?: 'monthly' | 'annual';
  /** Free tier description (e.g., "Funciones esenciales, hasta 3 eventos"). */
  freeTierDescription?: string;
}

export interface ProductStore {
  platform: Platform;
  url: string;
  /** Whether the store listing is live and accessible. */
  verified: boolean;
  /** Name as shown in the store (may differ from product name). */
  storeName?: string;
}

export interface ProductPlatform {
  id: Platform;
  /** Whether the product is available on this platform. */
  available: boolean;
  /** Minimum OS version required, if known. */
  minVersion?: string;
  /** Notable platform-specific features. */
  features?: string[];
}

// ─── Product Schema ─────────────────────────────────────────────

export interface Product {
  /** Stable slug used in URLs. Never changes. */
  slug: string;

  /** Canonical product name (as shown in stores and branding). */
  name: string;

  /** Current production status. */
  status: ProductStatus;

  /** Product category for classification. */
  category: string;

  /** Primary accent color (CSS variable or hex). */
  color: string;

  /** Soft variant of accent color for backgrounds. */
  colorSoft: string;

  /** Gradient ribbon stops for visual identity. */
  ribbonStops: { offset: string; color: string; opacity: string }[];

  /** Pricing information. */
  pricing: ProductPricing;

  /** Platform availability. */
  platforms: ProductPlatform[];

  /** Store listings. Only includes stores that exist. */
  stores: ProductStore[];

  /** Tech stack used to build the product. */
  tech: string[];

  /** Development progress percentage (0-100). Only for non-live products. */
  progress?: number;

  /** Whether the product has a case study page. */
  hasCaseStudy: boolean;

  /** Resources (guide, tips, support) available for this product. */
  resources: ProductResource[];

  /** SEO metadata for the product page. */
  seo: ProductSEO;
}

export interface ProductResource {
  type: 'guide' | 'tips' | 'support' | 'changelog' | 'privacy';
  icon: string;
  available: boolean;
}

export interface ProductSEO {
  /** Page title template: "{product} — Creapolis" or custom. */
  title: string;
  /** Meta description. */
  description: string;
  /** OG image path (relative to public/). */
  ogImage: string;
}

// ─── Product Database ───────────────────────────────────────────

export const products: Product[] = [
  {
    slug: 'solennix',
    name: 'Solennix',
    status: 'live',
    category: 'Gestión de eventos',
    color: 'var(--c-cyan)',
    colorSoft: 'var(--iris-soft)',
    ribbonStops: [
      { offset: '0%', color: 'oklch(0.72 0.14 235)', opacity: '0.4' },
      { offset: '100%', color: 'oklch(0.62 0.2 285)', opacity: '0.3' },
    ],
    pricing: {
      type: 'freemium',
      amount: 149,
      currency: 'MXN',
      billingPeriod: 'monthly',
      freeTierDescription: 'Funciones esenciales, hasta 3 eventos',
    },
    platforms: [
      { id: 'ios', available: true },
      { id: 'android', available: true },
      { id: 'web', available: true },
    ],
    stores: [
      {
        platform: 'ios',
        url: 'https://apps.apple.com/mx/app/solennix/id6760874129',
        verified: true,
        storeName: 'Solennix',
      },
      {
        platform: 'android',
        url: 'https://play.google.com/store/apps/details?id=com.solennix.app',
        verified: true,
        storeName: 'Solennix',
      },
      {
        platform: 'web',
        url: 'https://solennix.com',
        verified: true,
        storeName: 'Solennix Web',
      },
    ],
    tech: [
      'React Native',
      'Node.js',
      'PostgreSQL',
      'Push Notifications',
      'Offline-first',
    ],
    hasCaseStudy: true,
    resources: [
      { type: 'guide', icon: '📖', available: true },
      { type: 'tips', icon: '💡', available: true },
      { type: 'support', icon: '💬', available: false },
      { type: 'changelog', icon: '📋', available: true },
      { type: 'privacy', icon: '🔒', available: true },
    ],
    seo: {
      title: 'Solennix — Gestión de eventos profesional',
      description:
        'CRM, cotizaciones, inventario y dashboard para organizadores profesionales en Latinoamérica.',
      ogImage: '/og-default.webp',
    },
  },

  {
    slug: 'pepinillo',
    name: 'Pepinillo',
    status: 'live',
    category: 'Productividad',
    color: 'var(--c-yellow)',
    colorSoft: 'var(--lime-soft)',
    ribbonStops: [
      { offset: '0%', color: 'oklch(0.84 0.18 128)', opacity: '0.4' },
      { offset: '100%', color: 'oklch(0.72 0.14 235)', opacity: '0.3' },
    ],
    pricing: {
      type: 'freemium',
      amount: null,
      currency: null,
      freeTierDescription: 'Gratis con Premium disponible como compra in-app',
    },
    platforms: [
      {
        id: 'android',
        available: true,
        features: [
          'Pomodoro',
          'Flowtime',
          'Time Block',
          'Cronómetro',
          'Wear OS',
        ],
      },
      {
        id: 'ios',
        available: true,
        minVersion: 'iOS 17',
        features: [
          'Live Activities',
          'Dynamic Island',
          'iCloud Sync',
          'Apple Watch',
          'Siri Shortcuts',
          'Apple Health',
        ],
      },
      { id: 'macos', available: true },
    ],
    stores: [
      {
        platform: 'android',
        url: 'https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo',
        verified: true,
        storeName: 'Pikle - Pomodoro & Tasks',
      },
      {
        platform: 'ios',
        url: 'https://apps.apple.com/mx/app/pepinillo-timer-de-enfoque/id6760687424',
        verified: true,
        storeName: 'Pepinillo — Timer de Enfoque',
      },
    ],
    tech: [
      'Kotlin',
      'Jetpack Compose',
      'Room',
      'Coroutines',
      'Material You',
      'WorkManager',
      'Firebase Crashlytics',
      'Swift',
      'SwiftUI',
    ],
    hasCaseStudy: true,
    resources: [
      { type: 'guide', icon: '📖', available: true },
      { type: 'tips', icon: '🧠', available: true },
      { type: 'support', icon: '💬', available: false },
      { type: 'changelog', icon: '📋', available: true },
      { type: 'privacy', icon: '🔒', available: true },
    ],
    seo: {
      title: 'Pepinillo — Timer de enfoque y productividad',
      description:
        'Productividad sin fricción: Pomodoro, tareas con prioridades, calendario, timer y estadísticas.',
      ogImage: '/og-default.webp',
    },
  },

  {
    slug: 'peliculas',
    name: 'Películas',
    status: 'live',
    category: 'Entretenimiento',
    color: 'var(--c-magenta)',
    colorSoft: 'var(--coral-soft)',
    ribbonStops: [
      { offset: '0%', color: 'oklch(0.72 0.18 32)', opacity: '0.4' },
      { offset: '100%', color: 'oklch(0.78 0.16 70)', opacity: '0.3' },
    ],
    pricing: {
      type: 'free',
      amount: null,
      currency: null,
    },
    platforms: [{ id: 'android', available: true }],
    stores: [
      {
        platform: 'android',
        url: 'https://play.google.com/store/apps/details?id=mx.creapolis.peliculas',
        verified: true,
        storeName: 'Peliculas',
      },
    ],
    tech: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Coil', 'Room', 'Hilt'],
    hasCaseStudy: false,
    resources: [
      { type: 'changelog', icon: '📋', available: false },
      { type: 'privacy', icon: '🔒', available: true },
    ],
    seo: {
      title: 'Películas — Tu cine, a tu manera',
      description:
        'Catálogo de películas y series, listas personalizadas, búsqueda avanzada y recomendaciones.',
      ogImage: '/og-default.webp',
    },
  },

  {
    slug: 'subscription-guardian',
    name: 'Subscription Guardian',
    status: 'pre_production',
    category: 'Finanzas',
    color: 'var(--key)',
    colorSoft: 'var(--sky-soft)',
    ribbonStops: [
      { offset: '0%', color: 'oklch(0.72 0.14 235)', opacity: '0.4' },
      { offset: '100%', color: 'oklch(0.62 0.2 285)', opacity: '0.3' },
    ],
    pricing: {
      type: 'one_time',
      amount: 4.99,
      currency: 'USD',
    },
    platforms: [
      {
        id: 'ios',
        available: true,
        features: [
          'Sentinel Alerts',
          'Burn Rate Dashboard',
          'Smart Presets',
          'iCloud Sync',
          'Lock Screen Widgets',
          'Face ID',
        ],
      },
    ],
    stores: [],
    tech: [
      'Swift',
      'SwiftUI',
      'SwiftData',
      'CloudKit',
      'WidgetKit',
      'UserNotifications',
      'Charts',
      'SF Symbols',
    ],
    progress: 70,
    hasCaseStudy: true,
    resources: [
      { type: 'guide', icon: '📖', available: true },
      { type: 'tips', icon: '💡', available: true },
      { type: 'support', icon: '💬', available: false },
      { type: 'changelog', icon: '📋', available: false },
      { type: 'privacy', icon: '🔒', available: true },
    ],
    seo: {
      title: 'Subscription Guardian — Control de suscripciones para iOS',
      description:
        'Alertas antes de cada cobro, dashboard de gastos y privacidad total. Compra única USD $4.99.',
      ogImage: '/og-default.webp',
    },
  },
];

// ─── Helpers ────────────────────────────────────────────────────

/** Get a product by its slug. */
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get all live products. */
export function getLiveProducts(): Product[] {
  return products.filter((p) => p.status === 'live');
}

/** Get all products available on a given platform. */
export function getProductsByPlatform(platform: Platform): Product[] {
  return products.filter((p) =>
    p.platforms.some((pl) => pl.id === platform && pl.available),
  );
}

/** Get all verified store URLs for a product. */
export function getStoreUrls(
  slug: string,
): { platform: Platform; url: string }[] {
  const product = getProduct(slug);
  if (!product) return [];
  return product.stores
    .filter((s) => s.verified)
    .map((s) => ({ platform: s.platform, url: s.url }));
}

/** Get products with active store listings. */
export function getPublishedProductSlugs(): string[] {
  return products
    .filter((p) => p.status === 'live' && p.stores.some((s) => s.verified))
    .map((p) => p.slug);
}

/** Count of published products (live with verified stores). */
export function getPublishedCount(): number {
  return getPublishedProductSlugs().length;
}

/** Get total count of live products (regardless of store verification). */
export function getLiveCount(): number {
  return products.filter((p) => p.status === 'live').length;
}

/** Validate product data integrity. Returns array of issues. */
export function validateProduct(product: Product): string[] {
  const issues: string[] = [];

  if (!product.slug) issues.push('Missing slug');
  if (!product.name) issues.push('Missing name');
  if (!product.status) issues.push('Missing status');

  // Pricing validation
  // 'free' and 'freemium' can have null amount (base is free)
  if (
    !['free', 'freemium'].includes(product.pricing.type) &&
    product.pricing.amount === null
  ) {
    issues.push(`Pricing type is "${product.pricing.type}" but amount is null`);
  }
  if (product.pricing.amount !== null && product.pricing.amount < 0) {
    issues.push('Pricing amount cannot be negative');
  }
  if (
    product.pricing.amount !== null &&
    product.pricing.amount > 0 &&
    !product.pricing.currency
  ) {
    issues.push('Pricing has amount but no currency');
  }

  // Platform/store consistency
  const availablePlatforms = product.platforms
    .filter((p) => p.available)
    .map((p) => p.id);
  const storePlatforms = product.stores.map((s) => s.platform);
  for (const sp of storePlatforms) {
    if (!availablePlatforms.includes(sp)) {
      issues.push(`Store listed for ${sp} but platform not marked available`);
    }
  }

  // Pre-production should not have verified stores
  if (
    product.status === 'pre_production' &&
    product.stores.some((s) => s.verified)
  ) {
    issues.push(
      'Pre-production product has verified store URLs — status may be incorrect',
    );
  }

  return issues;
}
