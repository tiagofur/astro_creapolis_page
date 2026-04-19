# Creapolis — Apple Style Website

## Overview

Professional corporate website for Creapolis, built with Astro. Design inspired by Apple and Google: minimal, clean, professional.

## Tech Stack

- **Framework**: Astro v5
- **Styling**: Vanilla CSS with CSS Variables (no Tailwind)
- **Content**: Markdown with Astro Content Collections
- **Build**: Static Site Generation (SSG)

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#FFFFFF` | Main backgrounds |
| Background Alt | `#F5F5F7` | Alternating sections |
| Text | `#1D1D1F` | Headings, primary text |
| Text Secondary | `#6E6E73` | Body text |
| Accent | `#0071E3` | CTAs, links |
| Border | `#E8E8ED` | Dividers, cards |

## Project Structure

```
apple_style/
├── src/
│   ├── content/
│   │   ├── blog/           # Blog posts (Markdown)
│   │   └── config.ts      # Content collections schema
│   ├── layouts/
│   │   └── Layout.astro   # Base layout
│   ├── pages/
│   │   ├── index.astro    # Home page
│   │   ├── blog/
│   │   │   ├── index.astro    # Blog listing
│   │   │   └── [slug].astro   # Individual post
│   │   ├── proyectos/
│   │   │   ├── index.astro    # Projects listing
│   │   │   └── [slug].astro   # Individual project
│   │   ├── privacidad.astro
│   │   └── terminos.astro
│   └── styles/
│       └── global.css     # Design system
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Adding Blog Posts

Create markdown files in `src/content/blog/`:

```markdown
---
title: "Título del artículo"
description: "Breve descripción"
pubDate: 2024-12-01
author: "Creapolis"
tags: ["tag1", "tag2"]
draft: false
---

# Contenido
```

## Adding Projects

Projects are defined in `src/pages/proyectos/[slug].astro` via `getStaticPaths`. To add new projects, edit the `projectsData` object.

## Design Principles

1. **Minimal** — Only essential colors, no decorative elements
2. **Typography-driven** — Type is the hero
3. **Whitespace** — Generous spacing between elements
4. **System fonts** — Use `-apple-system` for native feel
5. **Subtle interactions** — No flashy animations, just smooth transitions