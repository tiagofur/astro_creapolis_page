# 🧩 Component API

> Referencia rápida de los componentes compartidos en `src/components/`.
> Actualizado: Abril 2026

---

## 📐 Filosofía

Sólo 3 componentes extraídos. El resto del UI vive inline en las páginas (cards, forms, heroes) porque son únicos por contexto. Si un patrón empieza a repetirse en 3+ páginas, vale extraerlo.

---

## 🧭 `<Nav />`

Nav pill flotante con logo, links configurables, CTA y toggle mobile.

### Archivo

[Nav.astro](../src/components/Nav.astro)

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `links` | `{ label: string; href: string }[]` | ver abajo | Array de links del menú |
| `cta` | `{ text: string; href: string }` | `{ text: 'Iniciar proyecto', href: '/contacto' }` | Botón principal |

### Defaults

```astro
links = [
  { label: 'Apps',      href: '/#apps' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proceso',   href: '/#proceso' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Contacto',  href: '/contacto' },
]
cta = { text: 'Iniciar proyecto', href: '/contacto' }
```

### Uso

```astro
<!-- Default: usa los links y CTA de arriba -->
<Nav />

<!-- Custom: página con secciones locales -->
<Nav
  links={[
    { label: 'Apps',     href: '#apps' },
    { label: 'Servicios', href: '#services' },
    { label: 'Proceso',  href: '#proceso' },
    { label: 'Notas',    href: '/blog' },
    { label: 'Contacto', href: '#contact' },
  ]}
  cta={{ text: 'Iniciar proyecto', href: '#contact' }}
/>
```

### Reglas

- **Usa paths absolutos** (`/servicios`) cuando navegas a otra página — así funciona desde cualquier ruta.
- **Usa anchors** (`#apps`) sólo dentro de la misma página.
- Logo siempre va a `/`. Hardcoded.
- El mobile toggle ya está. El menú mobile se muestra con clase `.mobile-menu.open` (se maneja desde el script global de Layout).

---

## 🦶 `<Footer />`

Footer con brand, links y copyright dinámico.

### Archivo

[Footer.astro](../src/components/Footer.astro)

### Props

**Ninguna.** Es estático por diseño — todos los links son globales.

### Contenido fijo

- Brand: `C` logo mark + "Creapolis"
- Links: `Apps` / `Servicios` / `Proyectos` / `Blog` / `Privacidad` / `Términos`
- Año: dinámico con `new Date().getFullYear()`

### Uso

```astro
<Footer />
```

### Si necesitás variar

No aceptes PRs que pasen props al Footer sin discusión. Si querés un footer distinto para una landing específica, creá un componente nuevo (`FooterLanding.astro`) — no rompas el contrato compartido.

---

## 🎗️ `<Ribbon />`

SVG decorativo flow con gradiente oklch multi-hue (coral → iris → lime). Es la firma visual de Creapolis.

### Archivo

[Ribbon.astro](../src/components/Ribbon.astro)

### Props

**Ninguna (todavía).** El docstring menciona un prop `class`, pero **no está implementado**. Si lo necesitás, extendé el componente.

### Uso

```astro
<header class="hero">
  <Ribbon />
  <!-- contenido del hero -->
</header>
```

### Reglas

- El ribbon usa `position: absolute; inset: 0` — el contenedor padre **debe** tener `position: relative`.
- `pointer-events: none`, `aria-hidden="true"` — decorativo puro.
- `mix-blend-mode: multiply` para que se integre con el fondo.
- Usarlo máximo **una vez** por hero. Más de un ribbon por sección es ruido visual.
- Si querés un ribbon con gradiente distinto (ej: en mission section dark), usá el patrón inline SVG del `index.astro` (`#rib2`), no el componente.

---

## 📚 Patrones no componentizados (intencional)

Estos patrones se repiten pero **no** están extraídos — revisá el source inline antes de crear algo nuevo:

| Patrón | Dónde buscar |
|--------|--------------|
| `.btn-primary` / `.btn-ghost` / `.btn-lg` | `src/styles/global.css` |
| `.chip` con status live/beta/dev/soon | `src/styles/global.css` + `index.astro` |
| `.eyebrow` | `src/styles/global.css` |
| `.serif` (Instrument Serif italic) | `src/styles/global.css` |
| `.reveal` + `.reveal-delay-1..3` | `src/styles/global.css` + script en `Layout.astro` |
| Formulario de contacto | inline en `contacto.astro` e `index.astro` (son diferentes) |
| Card de producto con device mockup | inline en `index.astro` (sección apps) |
| Blog card | inline en `blog/index.astro` e `index.astro` (sección notas) |

---

## ➕ Cuándo crear un componente nuevo

Checklist antes de extraer:

1. ¿El patrón se usa en **3 o más** lugares sin variación significativa? Si no → dejalo inline.
2. ¿Las variaciones se pueden expresar con props simples (2–3 props)? Si necesitás 6+ props, el componente es el problema.
3. ¿Va a cambiar el patrón al mismo tiempo en todos los lugares? Si a veces querés que una instancia sea distinta → dejalo inline.

Si cumple las 3 → extraé. Si no → no compliques el árbol.

---

## 🏷️ Tags

#components #api #creapolis-v2 #reference
