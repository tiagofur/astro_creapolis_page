/**
 * privacy.ts — Per-product privacy appendices.
 *
 * Each product declares its actual data practices. Claims are verifiable
 * and product-specific — no generic compliance promises.
 *
 * RULES:
 *   - Only declare what you can prove from the codebase.
 *   - Guardian's zero-server claims stay specific to Guardian.
 *   - No compliance promises (LFPDPPP/RGPD/CCPA) without legal review.
 *   - Empty appendices = product has no unique data practices beyond the global policy.
 */

export interface DataCategory {
  /** What data is collected. */
  collected: string[];
  /** Where it's stored (device, cloud, third-party). */
  stored: string[];
  /** Who can access it. */
  access: string[];
}

export interface ThirdPartyService {
  name: string;
  purpose: string;
  dataShared: string[];
  /** URL to the service's privacy policy. */
  privacyUrl: string;
  /** Whether data leaves the user's device. */
  leavesDevice: boolean;
}

export interface DeletionProcess {
  /** How the user can delete their data. */
  methods: string[];
  /** What happens after deletion request. */
  afterDeletion: string;
  /** Timeline for deletion. */
  timeline: string;
}

export interface PrivacyAppendix {
  /** Product slug. */
  slug: string;

  /** Whether this product requires a privacy appendix (has unique data practices). */
  hasAppendix: boolean;

  /** Data categories collected by this specific product. */
  dataCategories: {
    account: DataCategory;
    operational: DataCategory;
    technical: DataCategory;
  };

  /** Third-party services used by this product. */
  thirdParties: ThirdPartyService[];

  /** How data deletion works for this product. */
  deletion: DeletionProcess;

  /** Product-specific claims that differ from the global policy. */
  specificClaims: string[];

  /** What this product does NOT do (explicit exclusions). */
  exclusions: string[];

  /** Legal note — when compliance review is needed. */
  legalNote: string | null;
}

// ─── Solennix ───────────────────────────────────────────────────

const solennixAppendix: PrivacyAppendix = {
  slug: 'solennix',
  hasAppendix: true,
  dataCategories: {
    account: {
      collected: [
        'Nombre y correo electrónico (registro o OAuth)',
        'Contraseña cifrada (bcrypt/Argon2)',
        'Teléfono (opcional)',
      ],
      stored: [
        'Servidores cloud (Firebase/Google Cloud)',
        'Cifrado en tránsito (TLS 1.2+)',
      ],
      access: [
        'Creapolis (personal autorizado)',
        'Firebase (proveedor de infraestructura)',
      ],
    },
    operational: {
      collected: [
        'Eventos: títulos, fechas, horas, ubicaciones, notas',
        'Contactos CRM: nombres, teléfonos, correos, direcciones',
        'Cotizaciones: conceptos, precios, condiciones',
        'Inventario: artículos, cantidades, estados',
        'Fotos y archivos adjuntos',
      ],
      stored: [
        'Dispositivo local (Keychain/EncryptedSharedPreferences)',
        'Cloud sync (si activado)',
      ],
      access: ['Solo el usuario', 'Creapolis (soporte, bajo consentimiento)'],
    },
    technical: {
      collected: [
        'Modelo de dispositivo, SO, versión, idioma, zona horaria',
        'Crash reports (Firebase Crashlytics) — sin PII',
        'Analytics anonimizado: pantallas, frecuencia, funcionalidades',
      ],
      stored: ['Firebase (Google)', 'Máximo 90 días'],
      access: [
        'Firebase (Google)',
        'Creapolis (agregado, sin identificación individual)',
      ],
    },
  },
  thirdParties: [
    {
      name: 'Firebase (Google)',
      purpose: 'Crashlytics + Analytics',
      dataShared: [
        'Información del dispositivo',
        'Patrones de uso anonimizados',
      ],
      privacyUrl: 'https://policies.google.com/privacy',
      leavesDevice: true,
    },
    {
      name: 'Google Play / Apple App Store',
      purpose: 'Procesamiento de pagos',
      dataShared: ['Datos de transacción (procesados por la plataforma)'],
      privacyUrl: 'https://policies.google.com/privacy',
      leavesDevice: true,
    },
  ],
  deletion: {
    methods: [
      'Desde la app: Configuración → Cuenta → Eliminar cuenta',
      'Por email: hola@creapolis.dev',
    ],
    afterDeletion:
      'Todos los datos operativos se borran. Datos anónimos agregados pueden conservarse.',
    timeline: 'Dentro de 30 días hábiles',
  },
  specificClaims: [
    'Datos de eventos y CRM se almacenan cifrados en el dispositivo',
    'Cloud sync usa cifrado TLS 1.2+',
    'Crashlytics no envía información personal identificable',
  ],
  exclusions: [
    'No accede a contactos del teléfono sin consentimiento explícito',
    'No recopilación de ubicación en tiempo real',
    'No venta ni alquiler de datos personales',
  ],
  legalNote: 'Cumplimiento LFPDPPP/RGPD/CCPA sujeto a revisión legal.',
};

// ─── Pepinillo ──────────────────────────────────────────────────

const pepinilloAppendix: PrivacyAppendix = {
  slug: 'pepinillo',
  hasAppendix: true,
  dataCategories: {
    account: {
      collected: [
        'Nombre y correo electrónico (registro o OAuth)',
        'Contraseña cifrada',
        'Teléfono (opcional)',
      ],
      stored: [
        'Servidores cloud (Firebase/Google Cloud)',
        'Cifrado en tránsito (TLS 1.2+)',
      ],
      access: [
        'Creapolis (personal autorizado)',
        'Firebase (proveedor de infraestructura)',
      ],
    },
    operational: {
      collected: [
        'Tareas y sesiones de enfoque',
        'Estadísticas de productividad',
        'Configuración de la app (tema, notificaciones)',
        'Datos de Apple Watch (si vinculado)',
      ],
      stored: [
        'Dispositivo local (Keychain/EncryptedSharedPreferences)',
        'iCloud sync (si activado, solo en iOS)',
      ],
      access: ['Solo el usuario', 'iCloud (Apple, si sync activado)'],
    },
    technical: {
      collected: [
        'Modelo de dispositivo, SO, versión, idioma',
        'Crash reports (Firebase Crashlytics) — sin PII',
        'Analytics anonimizado',
      ],
      stored: ['Firebase (Google)', 'Máximo 90 días'],
      access: ['Firebase (Google)', 'Creapolis (agregado)'],
    },
  },
  thirdParties: [
    {
      name: 'Firebase (Google)',
      purpose: 'Crashlytics + Analytics',
      dataShared: [
        'Información del dispositivo',
        'Patrones de uso anonimizados',
      ],
      privacyUrl: 'https://policies.google.com/privacy',
      leavesDevice: true,
    },
    {
      name: 'Apple iCloud',
      purpose: 'Sincronización entre dispositivos (iOS)',
      dataShared: ['Datos de tareas y configuración (cifrados)'],
      privacyUrl: 'https://www.apple.com/legal/privacy/',
      leavesDevice: true,
    },
    {
      name: 'Google Play / Apple App Store',
      purpose: 'Procesamiento de pagos',
      dataShared: ['Datos de transacción (procesados por la plataforma)'],
      privacyUrl: 'https://policies.google.com/privacy',
      leavesDevice: true,
    },
  ],
  deletion: {
    methods: [
      'Desde la app: Configuración → Cuenta → Eliminar cuenta',
      'Por email: hola@creapolis.dev',
    ],
    afterDeletion:
      'Todos los datos operativos se borran. iCloud sync se detiene.',
    timeline: 'Dentro de 30 días hábiles',
  },
  specificClaims: [
    'iCloud sync es end-to-end cifrado (Apple)',
    'Datos de productividad se almacenan localmente por defecto',
    'Crashlytics no envía información personal identificable',
  ],
  exclusions: [
    'No accede a contactos del teléfono',
    'No recopilación de ubicación',
    'No uso de datos de salud (Apple Health es opt-in)',
  ],
  legalNote: 'Cumplimiento LFPDPPP/RGPD/CCPA sujeto a revisión legal.',
};

// ─── Películas ──────────────────────────────────────────────────

const peliculasAppendix: PrivacyAppendix = {
  slug: 'peliculas',
  hasAppendix: true,
  dataCategories: {
    account: {
      collected: ['No se recopilan datos de cuenta (sin registro)'],
      stored: ['N/A'],
      access: ['N/A'],
    },
    operational: {
      collected: [
        'Listas de películas guardadas (local)',
        'Preferencias de visualización (local)',
      ],
      stored: ['Solo en el dispositivo (Room数据库)'],
      access: ['Solo el usuario'],
    },
    technical: {
      collected: [
        'Modelo de dispositivo, SO, versión',
        'Sin analytics ni crash reporting',
      ],
      stored: ['Solo en el dispositivo'],
      access: ['Ninguno'],
    },
  },
  thirdParties: [
    {
      name: 'TMDB (The Movie Database)',
      purpose: 'Catálogo de películas, pósters, sinopsis',
      dataShared: ['Ningún dato personal (solo solicitudes HTTP anónimas)'],
      privacyUrl: 'https://www.themoviedb.org/documentation/api',
      leavesDevice: false,
    },
  ],
  deletion: {
    methods: [
      'Desinstalar la app elimina todos los datos locales',
      'No hay cuenta que eliminar',
    ],
    afterDeletion: 'Todos los datos se eliminan con la app',
    timeline: 'Inmediato al desinstalar',
  },
  specificClaims: [
    'No requiere cuenta ni registro',
    'Sin analytics, sin crash reporting',
    'TMDB solo recibe requests HTTP anónimos (sin identificación)',
    '100% offline después de la carga inicial',
  ],
  exclusions: [
    'No hay sincronización cloud',
    'No hay cuenta de usuario',
    'No hay datos personales recopilados',
    'No hay terceros que procesen datos personales',
  ],
  legalNote: null, // No unique compliance concerns — no PII collected
};

// ─── Subscription Guardian ──────────────────────────────────────

const sgAppendix: PrivacyAppendix = {
  slug: 'subscription-guardian',
  hasAppendix: true,
  dataCategories: {
    account: {
      collected: ['No se recopilan datos de cuenta (sin registro, sin login)'],
      stored: ['N/A'],
      access: ['N/A'],
    },
    operational: {
      collected: [
        'Información de suscripciones (nombre, monto, fecha de cobro)',
        'Preferencias de alertas',
        'Categorías y presets de suscripciones',
      ],
      stored: [
        'Solo en el dispositivo (SwiftData)',
        'CloudKit (iCloud, si activado — cifrado E2E)',
      ],
      access: ['Solo el usuario'],
    },
    technical: {
      collected: [
        'Modelo de dispositivo, SO, versión',
        'Sin analytics, sin crash reporting',
      ],
      stored: ['Solo en el dispositivo'],
      access: ['Ninguno'],
    },
  },
  thirdParties: [
    {
      name: 'Apple iCloud (CloudKit)',
      purpose: 'Sincronización entre dispositivos (opt-in)',
      dataShared: ['Datos de suscripciones (cifrados E2E)'],
      privacyUrl: 'https://www.apple.com/legal/privacy/',
      leavesDevice: true,
    },
  ],
  deletion: {
    methods: [
      'Desde la app: Configuración → Eliminar todos los datos',
      'Desinstalar la app elimina todos los datos locales',
    ],
    afterDeletion:
      'Todos los datos locales se eliminan. CloudKit sync se detiene.',
    timeline: 'Inmediato',
  },
  specificClaims: [
    'Sin servidores propios — cero datos en infraestructura de Creapolis',
    'Sin registro, sin login, sin contraseña',
    'Sin analytics, sin crash reporting',
    'CloudKit es end-to-end cifrado (Apple)',
    'Face ID protege el acceso a la app',
    'Datos de suscripciones nunca salen del dispositivo sin consentimiento explícito',
  ],
  exclusions: [
    'No hay cuenta de usuario',
    'No hay servidores de Creapolis',
    'No hay analytics ni tracking',
    'No hay terceros que procesen datos personales (excepto iCloud sync opt-in)',
    'No se vende ni comparte datos con nadie',
  ],
  legalNote:
    'Las afirmaciones de privacidad de SG son verificables desde el código fuente. Cumplimiento formal sujeto a revisión legal.',
};

// ─── Database ───────────────────────────────────────────────────

export const privacyAppendices: Record<string, PrivacyAppendix> = {
  solennix: solennixAppendix,
  pepinillo: pepinilloAppendix,
  peliculas: peliculasAppendix,
  'subscription-guardian': sgAppendix,
};

/** Get privacy appendix for a product. */
export function getPrivacyAppendix(slug: string): PrivacyAppendix | undefined {
  return privacyAppendices[slug];
}

/** Check if a product has a privacy appendix. */
export function hasPrivacyAppendix(slug: string): boolean {
  const appendix = privacyAppendices[slug];
  return !!appendix && appendix.hasAppendix;
}
