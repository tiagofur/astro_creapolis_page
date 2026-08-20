/**
 * navigation.ts — Single source of truth for all navigation links.
 *
 * Nav and Footer both derive their links from this file.
 * Social links are defined here (set to null if not configured).
 */

import type { Lang } from '../ui';
import { getLocalizedPath } from '../utils';

// ─── Types ──────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string | null;
  label: string;
  icon: string;
}

// ─── Navigation Links ───────────────────────────────────────────

export function getNavLinks(lang: Lang): NavLink[] {
  const t = (key: string) => {
    const strings: Record<Lang, Record<string, string>> = {
      es: {
        projects: 'Proyectos',
        services: 'Servicios',
        about: 'Sobre',
        blog: 'Blog',
        contact: 'Contacto',
      },
      en: {
        projects: 'Projects',
        services: 'Services',
        about: 'About',
        blog: 'Blog',
        contact: 'Contact',
      },
      pt: {
        projects: 'Projetos',
        services: 'Serviços',
        about: 'Sobre',
        blog: 'Blog',
        contact: 'Contato',
      },
    };
    return strings[lang]?.[key] ?? key;
  };

  return [
    { label: t('projects'), href: getLocalizedPath(lang, '/proyectos') },
    { label: t('services'), href: getLocalizedPath(lang, '/servicios') },
    { label: t('about'), href: getLocalizedPath(lang, '/sobre') },
    { label: t('blog'), href: getLocalizedPath(lang, '/blog') },
    { label: t('contact'), href: getLocalizedPath(lang, '/contacto') },
  ];
}

export function getNavCTA(lang: Lang): NavLink {
  const text =
    lang === 'es'
      ? 'Iniciar proyecto'
      : lang === 'pt'
        ? 'Iniciar projeto'
        : 'Start a project';
  return { text, href: getLocalizedPath(lang, '/contacto') };
}

// ─── Footer Links ───────────────────────────────────────────────

export function getFooterSiteLinks(lang: Lang): NavLink[] {
  const t = (key: string) => {
    const strings: Record<Lang, Record<string, string>> = {
      es: {
        home: 'Inicio',
        apps: 'Apps',
        services: 'Servicios',
        about: 'Sobre',
        blog: 'Blog',
      },
      en: {
        home: 'Home',
        apps: 'Apps',
        services: 'Services',
        about: 'About',
        blog: 'Blog',
      },
      pt: {
        home: 'Início',
        apps: 'Apps',
        services: 'Serviços',
        about: 'Sobre',
        blog: 'Blog',
      },
    };
    return strings[lang]?.[key] ?? key;
  };

  return [
    { label: t('home'), href: getLocalizedPath(lang, '/') },
    { label: t('apps'), href: getLocalizedPath(lang, '/#apps') },
    { label: t('services'), href: getLocalizedPath(lang, '/servicios') },
    { label: t('about'), href: getLocalizedPath(lang, '/sobre') },
    { label: t('blog'), href: getLocalizedPath(lang, '/blog') },
  ];
}

export function getFooterContactLinks(lang: Lang): NavLink[] {
  const label =
    lang === 'es'
      ? 'Formulario'
      : lang === 'pt'
        ? 'Formulário'
        : 'Contact form';
  return [{ label, href: getLocalizedPath(lang, '/contacto') }];
}

// ─── Legal Links ────────────────────────────────────────────────

export interface LegalLink {
  label: string;
  href: string;
}

export function getLegalLinks(lang: Lang): LegalLink[] {
  if (lang === 'en') {
    return [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms', href: '/terms-of-use' },
      { label: 'Delete Account', href: '/delete-account' },
    ];
  }
  if (lang === 'pt') {
    return [
      { label: 'Política de Privacidade', href: '/privacy-policy' },
      { label: 'Termos', href: '/terms-of-use' },
      { label: 'Excluir conta', href: '/delete-account' },
    ];
  }
  // ES
  return [
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Términos', href: '/terminos' },
    { label: 'Eliminar cuenta', href: '/eliminar-cuenta' },
  ];
}

// ─── Social Links ───────────────────────────────────────────────

export function getSocialLinks(): SocialLink[] {
  return [
    { platform: 'linkedin', url: null, label: 'LinkedIn', icon: 'linkedin' },
    { platform: 'github', url: null, label: 'GitHub', icon: 'github' },
    { platform: 'twitter', url: null, label: 'X / Twitter', icon: 'twitter' },
  ];
}
