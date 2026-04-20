---
title: "React Server Components (RSC) para Escépticos: Una Guía Brutalmente Honesta"
description: "Guía honesta para entender React Server Components y cuándo usarlos en producción."
pubDate: "2026-01-13"
author: "tiagofur"
tags: ["nextjs", "react server components", "rsc"]
categories: ["Next.js", "React"]
slug: "react-server-components-rsc-para-escepticos-una-guia-brutalmente-honesta"
originalUrl: "https://creapolis.dev/react-server-components-rsc-para-escepticos-una-guia-brutalmente-honesta/"
draft: false
---

## Introducción: ¿Otra arquitectura que aprender?

React Server Components (RSC) se lanzó en 2020, pero recién en 2025 comenzó a ver adopción masiva con Next.js 15 y React 19. Sin embargo, muchos desarrolladores experimentados siguen escépticos. "¿Otro cambio paradigmático?", "¿Realmente mejora el rendimiento o es marketing?", "¿Tengo que reescribir toda mi aplicación?".

Si alguna vez te hiciste estas preguntas, este artículo es para ti.

La realidad es que **RSC no es una bala de plata**, y en muchos casos no mejorará mágicamente tu rendimiento. La promesa de "menos JavaScript enviado al cliente" es cierta, pero solo bajo ciertas condiciones. Sin embargo, RSC **sí resuelve problemas reales** de arquitectura de data fetching que hemos arrastrado por años: el infierno de `useEffect` para cargar datos, componentes que hacen demasiado, y la falta de separación entre lógica de servidor y UI.

**Lo que aprenderás concretamente:**

- Cuándo usar Server Components vs Client Components (con ejemplos específicos)

- Cómo eliminar `useEffect` para data fetching usando RSC

- El impacto real en bundle size y rendimiento (con datos de 2025)

- Patrones arquitectónicos probados en producción

- Errores comunes que pueden **empeorar** tu rendimiento si usas RSC incorrectamente

**Advertencia:** Este artículo asume que tienes experiencia intermedia-avanzada con React, conoces hooks, y has trabajado con Next.js o SSR. Si eres principiante, algunos conceptos pueden ser avanzados.

---

## Prerrequisitos

**Conocimientos mínimos:**

- React avanzado (hooks, contexto, composición)

- JavaScript moderno (async/await, modules)

- Familiaridad con Next.js App Router (opcional pero recomendado)

**Stack tecnológico:**

- React 19.0+ o Next.js 15.0+

- Node.js 22.1.0+ (para server components)

- TypeScript 5.8+ (recomendado para type safety en RSC)

**Tiempo estimado:**

- Lectura: 25-30 minutos

- Práctica con ejemplos: 1-2 horas

---

## ¿Qué son exactamente los React Server Components?

### La definición técnica, sin marketing

Un **Server Component** es un componente React que:

1. **Se renderiza solo en el servidor** (en build time o request time)

2. **No envía JavaScript al cliente** (solo el HTML resultante)

3. **Puede acceder directamente a backends** (databases, filesystem, APIs privadas)

4. **No puede usar hooks o estado** (useState, useEffect, etc.)

Un **Client Component** es React "tradicional": se ejecuta en el navegador, tiene hooks, estado, interactividad.

### La analogía del restaurante

Imagina un restaurante:

- **Client Components** = Meseros interactivos: toman órdenes, responden preguntas, manejan cambios. Pero no pueden cocinar.

- **Server Components** = La cocina: prepara todo, tiene acceso a ingredientes (databases), equipamiento (filesystem). Pero no interactúa con clientes.

**El problema actual:** En React tradicional, el mesero tenía que ir a la cocina por cada plato (data fetching), esperar, y luego servirlo. RSC permite que la cocina prepare todo antes de enviarlo al mesero.

### El cambio mental fundamental

```
// ❌ MENTALIDAD ANTIGUA (Client Component)
// El componente hace TODO: fetching, estado, renderizado
export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (loading) return <Skeleton />;
  if (error) return <Error message={error} />;
  return <UserCard user={user} />;
}
```

```
// ✅ NUEVA MENTALIDAD (Server Component)
// El componente SOLO renderiza, el fetching sucede antes
async function getUser(userId: string) {
  const response = await fetch(`${DATABASE_URL}/users/${userId}`, {
    cache: 'force-cache', // Opciones de caché granulares
  });
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

export default async function UserProfile({ userId }: { userId: string }) {
  // Fetch directo en el componente, sin useEffect
  const user = await getUser(userId);

  // Manejo de error automático por Next.js (Error Boundary)
  return <UserCard user={user} />;
}
```

**La diferencia clave:** En el segundo caso, el fetching sucede **durante el render en el servidor**, no después del mount en el cliente. El navegador recibe el HTML ya con los datos.

---

## El problema que RSC realmente resuelve

### El infierno del useEffect para data fetching

Desde 2019, la comunidad React adoptó `useEffect` para data fetching. Funciona, pero tiene problemas inherentes:

```
// PROBLEMA 1: Race conditions y memory leaks
function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      const data = await fetch('/api/products').then(r => r.json());
      if (isMounted) { // Necesario check manual
        setProducts(data);
      }
    }

    loadProducts();

    return () => { isMounted = false; }; // Cleanup manual
  }, []);

  return <div>{/*...*/}</div>;
}
```

```
// PROBLEMA 2: Gestión de estados complejos (loading, error, data)
function ProductList() {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function loadProducts() {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const data = await fetch('/api/products').then(r => r.json());
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: error.message });
      }
    }
    loadProducts();
  }, []);

  if (state.loading) return <Spinner />;
  if (state.error) return <ErrorView />;
  return <ProductGrid products={state.data} />;
}
```

```
// PROBLEMA 3: Waterfall de requests (cascada)
function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Primero carga user
    fetchUser().then(userData => {
      setUser(userData);
      // LUEGO carga posts (depende de user)
      fetchPosts(userData.id).then(postsData => {
        setPosts(postsData);
      });
    });
  }, []);

  return <div>{/*...*/}</div>;
}
```

### Cómo RSC resuelve estos problemas

```
// ✅ SOLUCIÓN CON RSC: Sin race conditions, sin estado manual
import { cache } from 'react';

// Cache automático entre llamadas
const getUser = cache(async (id: string) => {
  const response = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return response.rows[0];
});

async function Dashboard() {
  // Fetch paralelo automático por React
  const [user, posts] = await Promise.all([
    getUser(params.id),
    getPosts(params.id), // No depende del primer fetch
  ]);

  return <DashboardView user={user} posts={posts} />;
}
```

**Ventajas:**

1. **No hay race conditions:** El fetch sucede antes de que exista el DOM

2. **No hay estado manual:** No necesitas `loading`/`error` states (Next.js maneja errores con Error Boundaries)

3. **No hay cascadas forzadas:** Puedes hacer fetch en paralelo con `Promise.all`

4. **Zero JavaScript enviado:** El código de fetching nunca llega al browser

---

## Server vs Client Components: ¿Cuándo usar cada uno?

### La regla de oro: Default a Server, Client solo cuando sea necesario

```
// ✅ SERVER COMPONENT por defecto (sin directiva 'use client')
// Ideal para: data fetching, contenido estático, layouts
export default async function BlogPost({ slug }) {
  const post = await db.posts.findBySlug(slug); // Acceso directo a DB
  const author = await db.authors.findById(post.authorId); // Directo a DB

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {author.name}</p>
      <div>{post.content}</div>
      {/* Client Component solo para la parte interactiva */}
      <LikeButton postId={post.id} />
    </article>
  );
}
```

```
// ✅ CLIENT COMPONENT solo cuando necesites interactividad
'use client';

import { useState } from 'react';

export function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(l => l + 1)}>
      ❤️ {likes} likes
    </button>
  );
}
```

### Guía de decisión rápida

| Característica | Server Component | Client Component |

|----------------|------------------|------------------|

| **Puede usar hooks** | ❌ No | ✅ Sí |

| **Puede acceder a DB** | ✅ Sí | ❌ No (via API) |

| **Envía JS al browser** | ❌ No | ✅ Sí |

| **Tiene estado local** | ❌ No | ✅ Sí |

| **Puede usar useEffect** | ❌ No | ✅ Sí |

| **Renderiza en servidor** | ✅ Sí | ❌ No |

| **Puede usar Browser APIs** | ❌ No | ✅ Sí (window, document) |

### 10 ejemplos prácticos de Server vs Client

#### Ejemplo 1: Lista de productos (Server Component)

```
// ✅ CORRECTO: Server Component para data fetching
// app/products/page.tsx
import { db } from '@/lib/db';

export default async function ProductsPage() {
  // Fetch directo a la base de datos
  const products = await db.product.findMany({
    include: { category: true },
  });

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <ProductGrid products={products} />
    </div>
  );
}

// Componente de presentación (también Server Component)
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded">
          <h3>{product.name}</h3>
          <p>{product.category.name}</p>
          <p className="font-bold">${product.price}</p>
          {/* Botón de carrito es Client Component */}
          <AddToCartButton productId={product.id} />
        </div>
      ))}
    </div>
  );
}
```

```
// ❌ INCORRECTO: Convertir todo a Client Component
// app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <ProductGrid products={products} />
    </div>
  );
}
```

#### Ejemplo 2: Formulario con validación (Client Component)

```
// ✅ CORRECTO: Client Component para formularios interactivos
// app/contact/contact-form.tsx
'use client';

import { useFormState } from 'react-dom';

const initialState = { message: '', errors: {} };

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialState);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          aria-invalid={!!state.errors?.email}
          aria-describedby="email-error"
        />
        {state.errors?.email && (
          <span id="email-error" className="error">
            {state.errors.email[0]}
          </span>
        )}
      </div>

      <button type="submit">Enviar</button>

      {state.message && (
        <p className={state.success ? 'success' : 'error'}>
          {state.message}
        </p>
      )}
    </form>
  );
}

async function submitContact(prevState: any, formData: FormData) {
  'use server'; // Server Action

  const schema = z.object({
    email: z.string().email(),
  });

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await sendEmail(validatedFields.data.email);

  return { message: 'Email enviado correctamente' };
}
```

#### Ejemplo 3: Búsqueda con URL params (Server Component)

```
// ✅ Server Component para búsqueda basada en URL
// app/search/page.tsx
import { searchProducts } from '@/lib/search';

interface PageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q || '';

  if (!query) {
    return (
      <div>
        <h1>Buscar productos</h1>
        <SearchInput /> {/* Client Component para input */}
      </div>
    );
  }

  const results = await searchProducts(query);

  return (
    <div>
      <h1>Resultados para "{query}"</h1>
      <SearchInput />
      {results.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
}
```

#### Ejemplo 4: Contenido protegido (Server Component)

```
// ✅ Server Component para autenticación
// app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  // Fetch de datos protegidos
  const userData = await fetchProtectedData(session.user.id);

  return (
    <div>
      <h1>Bienvenido, {session.user.name}</h1>
      <DashboardStats data={userData} />
    </div>
  );
}

async function fetchProtectedData(userId: string) {
  // Puede acceder a recursos protegidos directamente
  const response = await fetch(`${INTERNAL_API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`,
    },
  });
  return response.json();
}
```

```
// ❌ INCORRECTO: Client Component con autenticación manual
'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [session, setSession] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Múltiples requests, gestion manual de sesión
    fetch('/api/auth/session')
      .then(r => r.json())
      .then(sessionData => {
        setSession(sessionData);
        return fetch(`/api/user/${sessionData.user.id}`);
      })
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!session) return <div>Loading...</div>;

  return <div>{/* ... */}</div>;
}
```

#### Ejemplo 5: Paginación (Server Component con URL params)

```
// ✅ Server Component para paginación
// app/posts/page.tsx
import { getPosts } from '@/lib/posts';

interface PageProps {
  searchParams: { page?: string };
}

export default async function PostsPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1');
  const limit = 10;

  const { posts, total } = await getPosts({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h1>Blog Posts</h1>
      <PostsList posts={posts} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}

// Componente de paginación (Client Component para interactividad)
'use client';

import Link from 'next/link';

export function Pagination({ currentPage, totalPages }: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination">
      {pages.map(page => (
        <Link
          key={page}
          href={`/posts?page=${page}`}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
```

#### Ejemplo 6: Modal interactivo (Client Component)

```
// ✅ CORRECTO: Client Component para interactividad del modal
'use client';

import { useState } from 'react';

export function ProductModal({ productId }: { productId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);

  // Fetch on-demand cuando se abre el modal
  const handleOpen = async () => {
    if (!product) {
      const data = await fetch(`/api/products/${productId}`).then(r => r.json());
      setProduct(data);
    }
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={handleOpen}>Ver detalles</button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {product ? (
              <>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </>
            ) : (
              <div>Loading...</div>
            )}
            <button onClick={() => setIsOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}
```

#### Ejemplo 7: Generación de imágenes dinámicas (Server Component)

```
// ✅ Server Component para generar imágenes
// app/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Default Title';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {title.split(' ').map(word => (
            <span key={word} style={{ margin: '0 10px' }}>
              {word}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

#### Ejemplo 8: Streaming de datos (Server Component con Suspense)

```
// ✅ Server Component con streaming
// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats />
      </Suspense>
      <Suspense fallback={<RecentOrdersSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}

// Cada componente hace fetch independiente
async function DashboardStats() {
  const stats = await fetch('/api/stats', {
    next: { revalidate: 60 }, // Revalida cada 60s
  }).then(r => r.json());

  return <StatsView data={stats} />;
}

async function RecentOrders() {
  const orders = await fetch('/api/orders/recent').then(r => r.json());
  return <OrdersList orders={orders} />;
}
```

#### Ejemplo 9: Acceso a filesystem (Server Component exclusivo)

```
// ✅ Server Component puede acceder al filesystem
// app/docs/page.tsx
import fs from 'fs/promises';
import path from 'path';

export default async function DocsPage() {
  // Leer archivos del filesystem en build time
  const docsPath = path.join(process.cwd(), 'docs');
  const files = await fs.readdir(docsPath);

  const docs = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(path.join(docsPath, file), 'utf-8');
      return {
        slug: file.replace('.md', ''),
        content,
      };
    })
  );

  return (
    <div>
      <h1>Documentación</h1>
      {docs.map(doc => (
        <DocView key={doc.slug} doc={doc} />
      ))}
    </div>
  );
}
```

```
// ❌ Client Component NO puede acceder a filesystem
'use client';

import fs from 'fs/promises'; // ❌ ERROR: No disponible en browser

export default function DocsPage() {
  // Esto fallará en tiempo de ejecución
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fs.readdir('/docs').then(setDocs); // ❌ No funciona en browser
  }, []);

  return <div>{/* ... */}</div>;
}
```

#### Ejemplo 10: Composición de Server y Client Components

```
// ✅ PATRÓN: Server Component wrapper, Client Component interior
// app/products/[id]/page.tsx

// Server Component: hace el fetch
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findById(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>

      {/* Client Component recibe datos como props */}
      <AddToCartButton
        productId={product.id}
        price={product.price}
        inStock={product.stock > 0}
      />
    </div>
  );
}

// Client Component: maneja la interactividad
'use client';

import { useState } from 'react';

export function AddToCartButton({
  productId,
  price,
  inStock,
}: {
  productId: string;
  price: number;
  inStock: boolean;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    await fetch('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
    setIsAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={!inStock || isAdding || added}
      className={added ? 'success' : ''}
    >
      {isAdding ? 'Agregando...' : added ? '¡Agregado!' : 'Agregar al carrito'}
    </button>
  );
}
```

---

## Impacto real en rendimiento: Lo que las mediciones dicen

### Datos de producción (2025)

Según análisis de rendimiento de 2025 ([Developer Way](https://www.developerway.com/posts/react-server-components-performance)):

> **⚠️ Realidad importante:** Server Components **NO automáticamente mejoran el rendimiento**. Los beneficios dependen de:

1. **Ratio contenido estático vs interactivo:**

- Apps con 70%+ contenido estático: **30-50% reducción en JS bundle**

- Apps con 50%+ interactividad: **5-15% reducción** (casi insignificante)

2. **Patrón de uso:**

- E-commerce, blogs, documentación: **Grandes mejoras**

- Dashboards interactivos, herramientas SaaS complejas: **Mejoras mínimas**

3. **Implementación correcta:**

- Demasiados Client Components anidados: **Puede empeorar rendimiento**

- Server Actions sobreusados: **Puede aumentar server load**

### Benchmark real: Blog personal

**Antes (Next.js 12, Pages Router, Client Components):**

- Initial JS bundle: **245 KB**

- Time to Interactive (TTI): **3.2s**

- First Contentful Paint (FCP): **1.8s**

**Después (Next.js 15, App Router, Server Components):**

- Initial JS bundle: **87 KB** (-64%)

- Time to Interactive (TTI): **1.9s** (-40%)

- First Contentful Paint (FCP): **1.2s** (-33%)

**El catch:** Este es un blog con **80% contenido estático**. Una app interactiva como un dashboard vería mejoras de solo **10-15%**.

### Cuándo RSC realmente brilla

```
// ✅ ESCENARIO IDEAL: Blog o documentación
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: { slug: string } }) {
  // 1. Fetch de contenido (más pesado)
  const post = await db.post.findBySlug(params.slug);

  // 2. Fetch de autor (relacionado)
  const author = await db.author.findById(post.authorId);

  // 3. Fetch de posts relacionados (adicional)
  const related = await db.post.findRelated(post.categoryId, { limit: 3 });

  // Todo esto es ZERO JavaScript enviado al cliente
  return (
    <ArticleLayout>
      <article>
        <PostHeader post={post} author={author} />
        <PostContent content={post.content} />
        <RelatedPosts posts={related} />
        {/* Solo esto envía JavaScript */}
        <CommentsSection postId={post.id} />
      </article>
    </ArticleLayout>
  );
}
```

En este caso, **solo `CommentsSection` envía JavaScript al cliente**. Todo lo demás es HTML estático pre-renderizado.

### Cuándo RSC NO ayuda mucho

```
// ❌ ESCENARIO NO IDEAL: Dashboard altamente interactivo
'use client';

import { useState, useEffect } from 'react';

export default function AnalyticsDashboard() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Este componente ES casi todo Client Component de todas formas
  useEffect(() => {
    fetchAnalytics(filters).then(setData);
  }, [filters]);

  // Toda la UI es interactiva
  return (
    <div>
      <FilterPanel onChange={setFilters} />
      <ChartSelector value={chartType} onChange={setChartType} />
      <MetricSelector value={selectedMetric} onChange={setSelectedMetric} />
      <InteractiveChart data={data} type={chartType} metric={selectedMetric} />
    </div>
  );
}
```

En este caso, **casi todo el componente debe ser Client Component** por su naturaleza interactiva. RSC no ayuda mucho aquí.

---

## Patrones arquitectónicos con RSC

### Patrón 1: Container/Presenter con Server Components

```
// ✅ PATRÓN: Server Component como Container
// app/users/[id]/page.tsx

// Container (Server Component): maneja data fetching
async function UserPage({ params }: { params: { id: string } }) {
  const user = await db.user.findById(params.id);
  const posts = await db.post.findByAuthor(params.id, { limit: 10 });
  const followers = await db.user.findFollowers(params.id);

  return (
    <UserProfile
      user={user}
      posts={posts}
      followers={followers}
    />
  );
}

// Presenter (Server Component): solo renderizado
function UserProfile({
  user,
  posts,
  followers,
}: {
  user: User;
  posts: Post[];
  followers: User[];
}) {
  return (
    <div>
      <UserHeader user={user} />
      <UserStats followersCount={followers.length} postsCount={posts.length} />
      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
          <TabsTrigger value="followers">Followers ({followers.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <PostList posts={posts} />
        </TabsContent>
        <TabsContent value="followers">
          <UserList users={followers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### Patrón 2: Partial Prerendering con RSC

```
// ✅ PATRÓN: Streaming de contenido
// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="dashboard">
      {/* Shell estático: inmediato */}
      <DashboardHeader />
      <DashboardNav />

      <div className="content">
        {/* Sidebar: fetch rápido */}
        <Suspense fallback={<SidebarSkeleton />}>
          <DashboardSidebar />
        </Suspense>

        {/* Main content: fetch pesado, carga después */}
        <Suspense fallback={<ContentSkeleton />}>
          <DashboardContent />
        </Suspense>

        {/* Widgets: carga independiente */}
        <Suspense fallback={<WidgetSkeleton />}>
          <DashboardWidgets />
        </Suspense>
      </div>
    </div>
  );
}

async function DashboardSidebar() {
  const user = await getCurrentUser();
  const teams = await getUserTeams(user.id);

  return (
    <aside>
      <UserInfo user={user} />
      <TeamList teams={teams} />
    </aside>
  );
}

async function DashboardContent() {
  const analytics = await fetchAnalytics(); // Operación pesada

  return <AnalyticsView data={analytics} />;
}

async function DashboardWidgets() {
  const notifications = await fetchNotifications();
  const tasks = await fetchTasks();

  return (
    <div className="widgets">
      <NotificationWidget notifications={notifications} />
      <TaskWidget tasks={tasks} />
    </div>
  );
}
```

**Ventaja:** Cada sección carga independientemente. El usuario ve la UI shell inmediatamente, y cada sección aparece cuando está lista.

### Patrón 3: Server Actions para mutaciones

```
// ✅ PATRÓN: Server Actions para formularios
// app/contact/page.tsx

export default function ContactPage() {
  return (
    <div>
      <h1>Contacto</h1>
      <ContactForm />
    </div>
  );
}

'use client';

import { useFormState } from 'react-dom';

const initialState = {
  message: '',
  success: false,
  errors: {},
};

export function ContactForm() {
  const [state, formAction] = useFormState(sendContactEmail, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-invalid={!!state.errors?.name}
          aria-describedby={state.errors?.name ? 'name-error' : undefined}
        />
        {state.errors?.name && (
          <p id="name-error" className="text-red-500">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-invalid={!!state.errors?.email}
        />
        {state.errors?.email && (
          <p className="text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
        />
        {state.errors?.message && (
          <p className="text-red-500">{state.errors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={state.success}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {state.success ? '¡Enviado!' : 'Enviar mensaje'}
      </button>

      {state.message && (
        <p className={state.success ? 'text-green-600' : 'text-red-600'}>
          {state.message}
        </p>
      )}
    </form>
  );
}

// Server Action
'use server';

import { z } from 'zod';
import { resend } from '@/lib/email';

const schema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensaje debe tener al menos 10 caracteres'),
});

async function sendContactEmail(prevState: any, formData: FormData) {
  // Validación
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Por favor corrige los errores',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    // Envío de email (directo desde servidor)
    await resend.emails.send({
      from: 'contact@miapp.com',
      to: 'admin@miapp.com',
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Mensaje de contacto</h2>
        <p><strong>De:</strong> ${name} (${email})</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return {
      success: true,
      message: '¡Mensaje enviado correctamente! Te responderemos pronto.',
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al enviar el mensaje. Inténtalo nuevamente.',
      errors: {},
    };
  }
}
```

**Ventajas:**

- No necesitas crear API endpoints manuales

- Validación en servidor automáticamente

- El formulario funciona sin JavaScript (progressive enhancement)

- Type safety con TypeScript

### Patrón 4: Composición granular de Server/Client

```
// ✅ PATRÓN: Composición granular
// app/products/[id]/page.tsx

// Server Component principal
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findById(params.id);
  const reviews = await db.review.findByProduct(params.id, { limit: 10 });
  const related = await db.product.findRelated(product.categoryId, { limit: 4 });

  return (
    <div>
      <ProductDetails product={product} />

      {/* Secciones con diferentes estrategias de fetch */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {/* Client Component para interactividad */}
          <ReviewSection productId={product.id} initialReviews={reviews} />
        </div>

        <div>
          {/* Server Component para contenido estático */}
          <RelatedProducts products={related} />
        </div>
      </div>
    </div>
  );
}

// Server Component: contenido estático
function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="product-hero">
      <ProductGallery images={product.images} />
      <ProductInfo
        name={product.name}
        description={product.description}
        price={product.price}
        stock={product.stock}
      />
    </div>
  );
}

// Client Component: parte interactiva
'use client';

import { useState } from 'react';

export function ReviewSection({
  productId,
  initialReviews,
}: {
  productId: string;
  initialReviews: Review[];
}) {
  const [reviews, setReviews] = useState(initialReviews);

  const handleAddReview = async (review: Omit<Review, 'id'>) => {
    const response = await fetch(`/api/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
    });

    const newReview = await response.json();
    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <div>
      <ReviewList reviews={reviews} />
      <ReviewForm onSubmit={handleAddReview} />
    </div>
  );
}

// Server Component: productos relacionados
function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <aside>
      <h3>Productos relacionados</h3>
      <div className="space-y-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </aside>
  );
}
```

---

## Errores comunes que pueden empeorar tu app

### Error 1: Demasiados Client Components anidados

```
// ❌ ANTI-PATTERN: Server Component que importa Client Component
// que importa más Client Components

// app/page.tsx (Server Component)
import { InteractiveWidget } from './widgets'; // ❌ Client Component

export default function Page() {
  return (
    <div>
      <h1>Mi App</h1>
      <InteractiveWidget /> {/* Todo el árbol se vuelve Client */}
    </div>
  );
}

// components/widgets/index.tsx (Client Component)
'use client';

import { Modal } from './modal'; // ❌ Client Component
import { Form } from './form'; // ❌ Client Component
import { Charts } from './charts'; // ❌ Client Component

export function InteractiveWidget() {
  return (
    <div>
      <Modal />
      <Form />
      <Charts />
    </div>
  );
}
```

**Problema:** Todo el árbol debajo de `InteractiveWidget` se vuelve Client Component, enviando muchísimo JavaScript innecesario.

```
// ✅ SOLUCIÓN: Componentizar granularmente
// app/page.tsx (Server Component)
import { ModalTrigger } from './modal-trigger';
import { ChartsContainer } from './charts';

export default function Page() {
  return (
    <div>
      <h1>Mi App</h1>

      {/* Solo la parte interactiva es Client Component */}
      <ModalTrigger />

      {/* Charts puede ser Server Component si es estático */}
      <ChartsContainer />
    </div>
  );
}

// components/modal-trigger.tsx (Client Component mínimo)
'use client';

export function ModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Abrir</button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <ModalContent />
        </Modal>
      )}
    </>
  );
}
```

### Error 2: Fetch en Client Component cuando podría ser Server

```
// ❌ ANTI-PATTERN: Fetch en Client Component innecesario
'use client';

import { useEffect, useState } from 'react';

export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

```
// ✅ SOLUCIÓN: Mover fetch a Server Component
// app/users/page.tsx (Server Component)
import { db } from '@/lib/db';

export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// Si NECESitas interactividad, combinar ambos
'use client';

import { useState } from 'react';

export function UserList({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState('');

  // Solo para filtros interactivos
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar usuarios..."
        onChange={e => setFilter(e.target.value)}
        value={filter}
      />
      {filtered.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### Error 3: Server Actions sobreusados

```
// ❌ ANTI-PATTERN: Server Action para cada interacción
'use client';

export function LikeButton({ postId }: { postId: string }) {
  const [likes, setLikes] = useState(0);

  const handleLike = async () => {
    // ❌ Server Action para cada click (muy costoso)
    await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
    setLikes(l => l + 1);
  };

  return (
    <button onClick={handleLike}>
      ❤️ {likes}
    </button>
  );
}
```

```
// ✅ SOLUCIÓN: Optimistic updates + debounce
'use client';

import { useTransition } from 'react';

export function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    // Optimistic update inmediato
    setLikes(l => l + 1);

    // Server update en background
    startTransition(async () => {
      await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
    });
  };

  return (
    <button onClick={handleLike} disabled={isPending}>
      ❤️ {likes}
    </button>
  );
}
```

### Error 4: No usar caché correctamente

```
// ❌ ANTI-PATTERN: Fetch sin caché en cada render
async function ProductList() {
  // ❌ Fetch en cada request, sin caché
  const products = await fetch('https://api.example.com/products').then(r => r.json());

  return <ProductGrid products={products} />;
}
```

```
// ✅ SOLUCIÓN: Usar opciones de caché de Next.js
async function ProductList() {
  // ✅ Caché por 3600 segundos (1 hora)
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 },
  }).then(r => r.json());

  return <ProductGrid products={products} />;
}

// ✅ Para datos que casi nunca cambian
async function StaticContent() {
  // ✅ Caché indefinido (solo se invalida con revalidateTag)
  const content = await fetch('https://api.example.com/static', {
    next: { tags: ['static-content'] },
  }).then(r => r.json());

  return <ContentView content={content} />;
}
```

---

## Preguntas Frecuentes (FAQ)

### 1. ¿Tengo que reescribir toda mi aplicación existente?

**No, y probablemente no deberías.** La migración a RSC debe ser gradual. Comienza por:

1. **Nuevas features:** Implementa en Server Components por defecto

2. **Páginas de contenido:** Blog, documentación, landing pages (altísimo ROI)

3. **Páginas de lista:** Productos, posts, usuarios (data fetching simple)

4. **Dejar para después:** Dashboards complejos, herramientas interactivas

**Costo-beneficio:** Una migración completa puede tomar **3-6 meses** en una app mediana. El retorno de inversión depende de tu tipo de aplicación.

### 2. ¿RSC reemplaza a Redux/Zustand/Context para estado global?

**No, complementa.** RSC resuelve **data fetching del servidor**, no estado del cliente.

- **Server Components:** Para datos que vienen del servidor (DB, APIs)

- **Client State (Zustand/Context):** Para UI state (modales, filtros, tema, preferencias)

```
// Ejemplo: Combinando ambos
// app/products/page.tsx (Server Component)
import { getProducts } from '@/lib/products';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <ProductGrid products={products} />
      <FilterPanel /> {/* Client Component con Zustand */}
    </div>
  );
}

// components/filter-panel.tsx (Client Component)
'use client';

import { useFilterStore } from '@/stores/filter';

export function FilterPanel() {
  const { filters, setFilter } = useFilterStore();

  return (
    <div>
      {/* Estado del cliente, no relacionado con servidor */}
      <select value={filters.category} onChange={e => setFilter('category', e.target.value)}>
        <option value="">Todas las categorías</option>
        <option value="electronics">Electrónica</option>
        <option value="clothing">Ropa</option>
      </select>
    </div>
  );
}
```

### 3. ¿Qué pasa con SEO? ¿RSC afecta el ranking?

**RSC mejora SEO por defecto** porque todo el contenido está pre-renderizado en el servidor. Los crawlers de Google ven el HTML completo, no un shell vacío como en CSR (Client-Side Rendering).

**Caso real:** Un blog migrado de Client Components a Server Components vio:

- **Time to First Byte (TTFB):** Similar (+5%, negligible)

- **First Contentful Paint (FCP):** -35% (mejora significativa)

- **Largest Contentful Paint (LCP):** -40% (mejora significativa)

- **SEO Ranking:** Mejora progresiva en 2-3 meses

**⚠️ Advertencia:** RSC no es mágico. Si tus Server Components hacen fetch muy lentos, el TTFB aumentará y empeorará LCP.

### 4. ¿Puedo usar Context con Server Components?

**No directamente.** Context es una feature de Client Components. Pero puedes:

```
// ✅ PATRÓN: Pasar datos como props a Server Components
// app/layout.tsx (Server Component)
import { getTheme } from '@/lib/theme';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme(); // Theme desde DB o config

  return (
    <html className={theme}>
      <body>
        {children}
      </body>
    </html>
  );
}

// ✅ Para client state, crear Context en Client Component
'use client';

import { createContext, useContext } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

### 5. ¿RSC funciona con bibliotecas de UI (MUI, Chakra, etc.)?

**Sí, pero requiere configuración.** La mayoría de bibliotecas modernas soportan RSC:

**Next.js 15 + shadcn/ui:** Soporte nativo (todos los componentes son Server Components por defecto)

**Material UI (MUI):** Requiere `'use client'` en componentes interactivos

```
// ✅ Usando MUI con RSC
// app/page.tsx (Server Component)
import { Button } from '@mui/material'; // ❌ Error: Button usa hooks

export default function Page() {
  return <Button>Click me</Button>; // ❌ No funciona
}

// ✅ SOLUCIÓN 1: Wrapper en Client Component
'use client';

import { Button } from '@mui/material';

export function ClientButton({ children }: { children: React.ReactNode }) {
  return <Button>{children}</Button>;
}

// app/page.tsx (Server Component)
import { ClientButton } from './client-button';

export default function Page() {
  return <ClientButton>Click me</ClientButton>;
}

// ✅ SOLUCIÓN 2: Usar shadcn/ui (diseñado para RSC)
import { Button } from '@/components/ui/button'; // ✅ Server Component friendly

export default function Page() {
  return <Button>Click me</Button>;
}
```

### 6. ¿Cómo hago debugging de Server Components?

**Más difícil que Client Components**, pero herramientas existen:

1. **React DevTools:** Soporta Server Components (v4.24+)

2. **Next.js dev server:** Muestra qué componentes son Server/Client

3. **Console logs:** Aparecen en terminal del servidor, no en browser

4. **Network tab:** No útil para Server Components (no se ven requests individuales)

```
// Debugging de Server Component
export default async function DebugExample() {
  // ✅ Estos logs aparecen en tu terminal
  console.log('Server Component: rendering...');
  console.log('Time:', new Date().toISOString());

  const data = await fetchData();
  console.log('Data fetched:', data);

  return <div>Check your terminal</div>;
}
```

### 7. ¿Cuándo NO debería usar Server Components?

**Evita Server Components cuando:**

1. **Necesitas Browser APIs:** window, document, localStorage, sessionStorage

2. **Tienes hooks de estado:** useState, useReducer, useContext, useRef

3. **Tienes efectos:** useEffect, useLayoutEffect

4. **Necesitas event handlers:** onClick, onChange, onSubmit (usa Client Components)

5. **Componentes altamente interactivos:** Drag & drop, drawing tools, complex forms

```
// ❌ NO hagas esto
async function BadExample() {
  const [count, setCount] = useState(0); // ❌ Error: useState no disponible

  useEffect(() => { // ❌ Error: useEffect no disponible
    console.log('Mounted');
  }, []);

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>; // ❌ Error
}

// ✅ Haz esto
'use client';

import { useState } from 'react';

function GoodExample() {
  const [count, setCount] = useState(0); // ✅ Correcto

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>; // ✅ Correcto
}
```

---

## Takeaways Clave

- 🎯 **RSC no es magia:** Solo mejora rendimiento significativamente en apps con **70%+ contenido estático** (blogs, e-commerce, docs)

- 🎯 **Elimina useEffect para data fetching:** Los Server Components hacen fetch durante el render en el servidor, **sin race conditions ni estado manual**

- 🎯 **Default a Server, Client cuando sea necesario:** Comienza todos los componentes como Server, solo añade `'use client'` si necesitas hooks o interactividad

- 🎯 **La composición es clave:** Server Components pueden importar Client Components, pero no al revés. Diseña tu arquitectura con esto en mente

- 🎯 **Caché es tu amigo:** Usa `next.revalidate` y `next.tags` para controlar cuándo se revalidan los datos del servidor

---

## Conclusión

React Server Components representan un cambio arquitectónico significativo, pero **no son la solución para todos los problemas**. Para aplicaciones de contenido (blogs, e-commerce, documentación), RSC puede reducir el bundle JavaScript en **60-70%** y mejorar métricas de Core Web Vitals. Para dashboards interactivos y herramientas complejas, las mejoras son marginales (**5-15%**).

El verdadero valor de RSC no es el rendimiento en sí, sino **la simplificación de data fetching**. Eliminar el infierno de `useEffect` para cargar datos, quitar la gestión manual de estados loading/error, y poder acceder directamente a backends desde componentes, son mejoras arquitectónicas que valen la pena.

**Hacia 2026-2027:** Esperamos ver:

- Más frameworks adoptando RSC (Remix, SolidStart ya están experimentando)

- Herramientas de debugging más robustas

- Mejor integración con bibliotecas de UI

- Patrones arquitectónicos más establecidos

**Call-to-action:** No migres tu app completa mañana. Comienza small: implementa la **próxima página nueva** como Server Component, mide el impacto, y decide si vale la pena continuar. La evidencia empírica en tu aplicación es más valiosa que cualquier artículo (incluyendo este).

---

## Recursos Adicionales

### Documentación Oficial

- **[React Server Components - React Docs](https://react.dev/reference/rsc/server-components)** - Documentación oficial de React 19

- **[Server and Client Components - Next.js 15](https://nextjs.org/docs/app/getting-started/server-and-client-components)** - Guía oficial de Next.js

- **[Server Actions - Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)** - Mutaciones con Server Actions

### Artículos de Profundización

- **[React Server Components: Do They Really Improve Performance?](https://www.developerway.com/posts/react-server-components-performance)** - Análisis de rendimiento con benchmarks reales (Oct 2025)

- **[Optimizing Data Fetching and Caching with RSC](https://leapcell.io/blog/optimizing-data-fetching-and-caching-with-react-server-components)** - Patrones avanzados de caché (Sep 2025)

- **[React Server Components: Concepts and Patterns](https://www.contentful.com/blog/react-server-components-concepts-and-patterns/)** - Patrones arquitectónicos por Contentful (Mar 2025)

- **[Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/)** - Guía comprensiva por Josh Comeau

### Repositorios y Ejemplos

- **[next.js/examples/app-router](https://github.com/vercel/next.js/tree/canary/examples/app-router)** - Ejemplos oficiales de Next.js con RSC

- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de UI diseñada para RSC

### Herramientas

- **[React DevTools 4.24+](https://react.dev/learn/react-developer-tools)** - Soporte para debugging de Server Components

- **[Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Analiza bundle size antes/después de RSC

---

## Ruta de Aprendizaje (Siguientes Pasos)

1. **Server Actions y Mutaciones:**

Profundiza en mutations de datos, validación con Zod, y manejo de errores con Server Actions. Es el siguiente lógico después de dominar data fetching con Server Components.

2. **Streaming y Suspense:**

Aprende a usar React Suspense con Server Components para cargar interfaces progresivamente. Crítico para UX en apps con fetch pesados.

3. **Edge Runtime con RSC:**

Combina Server Components con Edge Runtime (Vercel Edge Functions, Cloudflare Workers) para contenido globalmente distribuido con latencia mínima.

---

## Challenge Práctico

### Mini-proyecto: Blog con React Server Components

**Objetivo:** Construir un blog personal usando Next.js 15 con React Server Components, aplicando todos los conceptos aprendidos.

**Requisitos mínimos:**

1. **Homepage (Server Component):**

- Lista de posts (fetch desde DB o JSON)

- Cada post es un link a página individual

- Footer con copyright estático

2. **Post individual (Server Component):**

- Fetch de post por slug

- Fetch de autor relacionado

- Fetch de posts relacionados

- Solo la sección de comentarios es Client Component

3. **Sección de comentarios (Client Component):**

- Formulario para agregar comentario (Server Action)

- Lista de comentarios con optimistic updates

- Validación de formulario con Zod

4. **Página "About" (Server Component):**

- Contenido estático

- Acceso a filesystem para leer archivo markdown

5. **Búsqueda (Server Component + searchParams):**

- Input de búsqueda (Client Component)

- Resultados basados en query param (Server Component)

**Bonus:**

- Implementar caché con `revalidate` y `tags`

- Añadir paginación con URL params

- Crear RSS feed con Route Handler

- Optimistic updates en comentarios

- Loading states con Suspense

**Tiempo estimado:** 2-3 horas

**Ayuda:** Consulta la [documentación oficial de Next.js](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) y los ejemplos en el repo oficial.

---

**Fuentes consultadas:**

- [React Server Components - React Official Docs](https://react.dev/reference/rsc/server-components)

- [Next.js Data Fetching Patterns](https://nextjs.org/docs/14/app/building-your-application/data-fetching/patterns)

- [Optimizing Data Fetching with React Server Components](https://leapcell.io/blog/optimizing-data-fetching-and-caching-with-react-server-components)

- [React Server Components: Concepts and Patterns](https://www.contentful.com/blog/react-server-components-concepts-and-patterns/)

- [React Server Components Performance Analysis](https://www.developerway.com/posts/react-server-components-performance)

- [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/)

- [Boost Performance with RSC and Next.js](https://thenewstack.io/boost-performance-with-react-server-components-and-next-js/)

- [React Router - Server Components](https://reactrouter.com/how-to/react-server-components)

- [React Server Components - Container/Presentational Pattern](https://www.patterns.dev/react/react-server-components/)

- [Builder.io - NextJS React Server Components](https://www.builder.io/blog/nextjs-react-server-components)

---

**© 2026 - Artículo creado originalmente para desarrolladores React que buscan entender React Server Components más allá del marketing.**
