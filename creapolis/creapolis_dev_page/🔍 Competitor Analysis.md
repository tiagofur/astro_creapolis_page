# 🔍 Competitor Analysis — Creapolis v2

> Análisis de referencias: Apple, Google, agencias, y el prototipo `inspirations/`
> **Actualizado**: Abril 2026

---

## 🎯 Sources de Inspiración

### Apple — apple.com

Lo que TOMAMOS:

| Aspecto | Qué copiamos |
|---------|-------------|
| Whitespace generoso | Secciones con `clamp(80px, 10vw, 140px)` padding |
| Tipografía como héroe | h1 a `clamp(3rem, 8vw, 6.2rem)` weight 500 |
| Product-focused | Dejar que el producto hable (mockups, no abstracciones) |
| Transiciones sutiles | No todo tiene que ser animación loca |
| Consistencia visual | Design system riguroso con tokens |

Lo que NO copiamos:

| Aspecto | Por qué no |
|---------|-----------|
| Un solo accent azul | Apple es monocromática. Nosotros somos multi-hue |
| System fonts solo | Nosotros usamos Geist + Instrument Serif con propósito |
| Hero centrado siempre | Nosotros usamos grid 2 cols con showcase visual |
| Seriedad corporativa | Creapolis es un estudio, tiene más personalidad |

---

### Google — developers.google.com / pixel.google.com

Lo que TOMAMOS:

| Aspecto | Qué copiamos |
|---------|-------------|
| Color bold en momentos clave | Los 5 acentos oklch dan alegría visual |
| Movimiento y animación | GSAP ScrollTrigger, counters, stagger reveals |
| Ilustraciones/visual | Cards con glow, device mockups, no solo texto |
| Tono conversacional | Copy más humano, menos "agencia" |
| Bento grids | Layouts asimétricos, no todo grilla uniforme |

---

### Stripe — stripe.com

| Aspecto | Qué nos inspira |
|---------|----------------|
| Gradient effects | Nuestros ribbons SVG con gradientes multi-hue |
| Pricing cards | Card featured dark con badge "Más popular" |
| Motion guía atención | Hover effects que guían el ojo |

---

### Linear — linear.app

| Aspecto | Qué nos inspira |
|---------|----------------|
| Serif + Sans combination | Nuestro Instrument Serif + Geist es exactamente esto |
| Dark sections | Mission section en `var(--ink)` con stats |
| Understated premium | Minimalismo que no es aburrido |

---

## 🏢 Agencias Similares

### Top Agencies Reviewed

| Agencia | Fortalezas | Url |
|---------|------------|-----|
| **Fueled** | Case studies profundos con métricas | fueled.com |
| **Savvy Apps** | UX focus, blog activo, contenido útil | savvyapps.com |
| **Raizlab** | Animaciones creativas, identidad fuerte | raizlab.com |
| **Willow Tree** | Product thinking, enterprise focus | willowtreeapps.com |
| **Vercel** | Developer experience, design system público | vercel.com |

---

## 📱 Prototipo Inspirations — Auto-análisis

### Qué hicimos bien en `inspirations/`

| Elemento | Por qué funciona |
|----------|-----------------|
| Paleta oklch multi-hue | 5 colores con cromancia igual = armonía |
| Serif italic en headings | Contraste visual instantáneo, personalidad |
| Ribbon SVG motif | Elemento de marca único, no es genérico |
| Nav pill flotante | Más moderno que full-width bar |
| Marquee trust strip | Comunicación de valores sin ocupar espacio |
| Product shelf con progress | Muestra el pipeline, transparencia |
| Chip system (live/beta/dev/soon) | Status visual inmediato |
| Showcase cards (hero) | Phone + stat + chart = demuestra capacidad |
| Eyebrow labels (mono) | Contexto rápido antes de headings |
| Warm off-white base | No es blanco puro = más acogedor |

### Qué falta en `inspirations/`

| Gap | Por qué importa |
|-----|----------------|
| No es Astro | No hay routing, collections, build |
| No hay backend | Formulario es solo `preventDefault` |
| No hay mobile menu | Nav links se esconden sin burger |
| No hay dark mode | Variables preparadas pero no implementadas |
| No hay blog | Solo 3 páginas estáticas |
| No hay SEO | Cero OG, schema, sitemap |
| Copy genérico | Parece plantilla premium, no estudio con alma |

---

## 🎯 Lo que Creapolis v2 DEBE ser

### Identidad propia (no copia de nadie)

```
No somos Apple — somos más coloridos
No somos Google — somos más premium
No somos Stripe — somos más cálidos
Somos Creapolis — warm-minimal + multi-hue + ribbon motif
```

### Principios de diseño v2

1. **Warm-minimal** — Off-white, no blanco puro. Sombra con tinte, no negra
2. **Multi-hue con propósito** — Iris para tech, coral para featured, lime para live, sky para info, amber para premium
3. **Serif como firma** — Instrument Serif italic solo en keywords de headings
4. **Ribbon como marca** — SVG curvo como background decorativo recurrente
5. **Movimiento con moderación** — Animaciones que guían, no que distraen
6. **Copy con personalidad** — "Hacemos apps que la gente de verdad usa", no "transformamos ideas"

---

## 📊 Feature Comparison vs Competidores

| Feature | Apple | Google | Stripe | Linear | Creapolis v2 |
|---------|-------|--------|--------|--------|-------------|
| Multi-hue palette | ❌ | ✅ | ❌ | ✅ | ✅ 5 colores |
| Serif accent | ❌ | ❌ | ❌ | ✅ | ✅ Instrument Serif |
| Animated background | ❌ | ✅ | ✅ | ❌ | ✅ Ribbon SVG |
| Product showcase | ✅ | ✅ | ✅ | ❌ | ✅ Cards con mockup |
| Blog integrado | ✅ | ✅ | ✅ | ✅ | ✅ Astro collections |
| Dark mode | ✅ | ✅ | ✅ | ✅ | 🔲 Pendiente |
| Mobile menu | ✅ | ✅ | ✅ | ✅ | ✅ (en Astro) |
| Contact form | ✅ | ✅ | ✅ | ✅ | ✅ Go backend |

---

## ✅ Action Items

### Tomado de Google

- [ ] Bento layouts en secciones clave
- [ ] Counter animation en stats
- [ ] Copy más humano y divertido
- [ ] Scroll storytelling

### Tomado de Apple

- [ ] Product shots reales (mockups, no CSS abstracto)
- [ ] Typografía premium como hero
- [ ] Whitespace abundante
- [ ] Transiciones sutiles entre secciones

### Propio de Creapolis

- [ ] Ribbon SVG como marca registrada
- [ ] Serif italic como firma visual
- [ ] Chip system para status
- [ ] Marquee strip para valores

---

## 📎 Links

- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines)
- [Material Design 3](https://m3.material.io/)
- [Linear](https://linear.app)
- [Stripe](https://stripe.com)
- [oklch Color Picker](https://oklch.com)

---

## Tags

#competitor-analysis #design-inspiration #apple #google #linear #creapolis-v2 #year-2026
