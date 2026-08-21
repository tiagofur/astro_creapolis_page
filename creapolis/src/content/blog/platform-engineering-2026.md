---
title: "De DevOps a Platform Engineering: El Sucesor del Full-Stack en 2026"
description: "Hace 10 años, desplegar significaba \"copiar archivos por FTP\". Hoy implica Terraform, Helm Charts, IAM Roles, Security Policies, Observability Agents y Service Meshes."
pubDate: "2026-01-22"
author: "tiagofur"
tags: ["backstage", "devex", "idp", "devops"]
categories: ["Platform Engineering"]
slug: "de-devops-a-platform-engineering-el-sucesor-del-full-stack-en-2026"
originalUrl: "https://creapolis.dev/de-devops-a-platform-engineering-el-sucesor-del-full-stack-en-2026/"
draft: false
---

## 1. Introducción

- **Gancho:** Durante años celebramos al "Full-Stack Developer Hero": esa persona capaz de maquetar CSS, diseñar una API REST y configurar un clúster de Kubernetes. En 2026, este modelo se ha vuelto insostenible.
- **Problema que resuelve:** La explosión de complejidad en la nube (CNCF landscape) ha saturado la **carga cognitiva** de los desarrolladores. Pedirles que dominen todo solo genera burnout, entregas lentas e infraestructura insegura.
- **Qué aprenderá el lector:** Entenderás qué es realmente la Ingeniería de Plataforma, cómo implementar "Golden Paths" para acelerar a tu equipo y verás cómo configurar un componente básico en Backstage (el estándar de IDP).

## 2. Prerrequisitos

- **Conocimientos previos:** Entendimiento del ciclo de vida de desarrollo de software (SDLC) y familiaridad con conceptos DevOps (CI/CD, IaC).
- **Herramientas/Software:** Nada específico para instalar hoy, pero conocer herramientas como Docker, Kubernetes y Git es útil para entender los ejemplos.

### 4.1. El Problema: La Crisis de la Carga Cognitiva

Hace 10 años, desplegar significaba "copiar archivos por FTP". Hoy implica Terraform, Helm Charts, IAM Roles, Security Policies, Observability Agents y Service Meshes.

Según la teoría de **Team Topologies**, cada equipo tiene un límite de carga cognitiva. Si obligas a un equipo de producto (Stream-aligned team) a gestionar toda esa complejidad de infraestructura, **dejan de programar lógica de negocio**.

El resultado:

1. **Shadow IT:** Los devs crean infraestructura "a su manera" para evadir procesos.
2. **Burnout:** Nadie puede ser experto en la última versión de React \_y\_ en la última API de AWS a la vez.
3. **Lentitud:** Cada nuevo proyecto tarda semanas en tener un "Hello World" en producción.

### 4.2. La Solución: Platform Engineering y Golden Paths

Aquí nace el **Platform Engineer**. Su misión no es operar la app por ti (eso es el viejo SysAdmin), sino **construir un producto** interno que te permita a ti operarla fácilmente.

**Golden Paths (Caminos Pavimentados):**

En lugar de decir "usa lo que quieras", la plataforma ofrece rutas pre-configuradas y opinionadas.

- \_¿Quieres un microservicio Spring Boot?\_ -> Aquí tienes un template con CI/CD, base de datos y monitoreo ya cableado.
- \_¿Quieres usar algo fuera del estándar?\_ -> Puedes, pero vas sin "rueditas de entrenamiento" (sin soporte oficial).

### 4.3. El IDP (Internal Developer Portal)

El IDP es la interfaz de usuario de tu plataforma. Es la "App Store" interna de la empresa.

El líder indiscutible en 2026 sigue siendo **Backstage** (creado por Spotify), aunque alternativas SaaS como **Port** o **Cortex** ganan terreno por su simplicidad.

#### Ejemplo Práctico: Modelando un Servicio en Backstage

En Backstage, todo se define como código junto a tu repositorio. Aquí tienes cómo se ve un archivo `catalog-info.yaml` que registra un servicio en el portal.

##### catalog-info.yaml

```
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: payment-service-v2
  description: Servicio central de procesamiento de pagos y tokenización.
  tags:
    - payments
    - nestjs
    - finops
  annotations:
    # Vinculación automática con el código fuente
    github.com/project-slug: fintech-org/payment-service
    # Enlace a la documentación técnica (TechDocs)
    backstage.io/techdocs-ref: dir:.
    # Integración con herramientas externas
    sentry.io/project-slug: fintech-org/payment-service
    pagerduty.com/integration-key: "xxxxxxxxxxxxxxxx"
spec:
  type: service
  lifecycle: production
  owner: team-checkout # Define quién recibe las alertas (Team Topologies)
  system: core-banking # A qué sistema mayor pertenece
  providesApis:
    - payment-grpc-api # Interfaz que expone
  dependsOn:
    - resource:postgres-payments-db
    - component:fraud-detection-service
```

Al hacer push de este archivo, el IDP visualiza automáticamente:

1. Quién es el dueño (para contactarlo).
2. El estado de sus últimas builds (CI/CD).
3. Sus dependencias (Grafo de arquitectura).
4. Su documentación técnica centralizada.

### 4.4. Platform as a Product (PaaP)

El error #1 al implementar esto es construir cosas que nadie usa. La plataforma debe tratarse como un **Producto**.

- **Tus usuarios:** Los desarrolladores de la empresa.
- **Tu métrica:** No es "uptime del servidor", es "Time-to-Hello-World" (cuánto tarda un dev nuevo en hacer su primer deploy) y NPS (Net Promoter Score) interno.

### 4.5. Métricas de Platform Engineering

Para que la plataforma no sea un "centro de costo" sino un activo medible, necesitas rastrear:

#### 4.5.1. Developer Experience Metrics

| Métrica | Descripción | Objetivo 2026 |
| --- | --- | --- |
| \*\*Time-to-Hello-World\*\* | Tiempo desde clonar repo hasta primer deploy en dev | <15 minutos |
| \*\*Deployment Frequency\*\* | Despliegues por día por equipo | >10/día |
| \*\*Change Failure Rate\*\* | Porcentaje de deploys que causan incidentes | <5% |
| \*\*Lead Time for Changes\*\* | Tiempo desde commit hasta producción | <1 hora |
| \*\*Developer NPS\*\* | Satisfacción del desarrollador (encuesta) | >50 |

#### 4.5.2. Plataforma Health Metrics

##### metrics/prometheus-rules.yml

```
groups:
  - name: platform_health
    rules:
      - alert: HighTimeToFirstDeploy
        expr: platform_time_to_first_deploy_p95 > 1800  # 30 minutos
        for: 1h
        labels:
          severity: warning
          category: developer_experience
        annotations:
          summary: "Los nuevos devs tardan >30min en hacer primer deploy"
          description: "El Golden Path tiene fricciones que eliminar"

      - alert: LowPlatformAdoption
        expr: |
          (platform_services_total / platform_services_golden_path) < 0.7
        labels:
          severity: info
        annotations:
          summary: "Solo 70% de servicios usan Golden Paths"
```

### 4.6. Caso de Estudio: Configurando un Golden Path

Vamos a crear un Golden Path completo para un microservicio Node.js con Backstage.

#### 4.6.1. Template del Servicio

##### templates/scaffolder-template/nodejs-service/template.yaml

```
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: nodejs-service-template
  title: Node.js Service (Golden Path)
  description: Plantilla Golden Path para microservicios Node.js con observabilidad completa
spec:
  owner: platform-team
  type: service

  parameters:
    - title: Nombre del Servicio
      name: service_name
      type: string
      required: true

    - title: Descripción
      name: description
      type: string
      required: true

    - title: Owner Team
      name: owner
      type: string
      enum: ['team-billing', 'team-checkout', 'team-inventory']

  steps:
    # Paso 1: Crear repositorio en GitHub
    - id: create-repo
      name: Create GitHub Repo
      action: github:repo:create
      input:
        allowedOrganizations: ['mycompany']
        description: ${{ parameters.description }}
        name: ${{ parameters.service_name }}
        private: true

    # Paso 2: Crear estructura del proyecto
    - id: fetch-template
      name: Fetch Base Template
      action: fetch:template
      input:
        url: ./skeleton
        values:
          serviceName: ${{ parameters.service_name }}
          description: ${{ parameters.description }}
          owner: ${{ parameters.owner }}

    # Paso 3: Publicar en el catálogo de Backstage
    - id: register-catalog
      name: Register in Catalog
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps['create-repo'].output.repoContentsUrl }}
        catalogInfoPath: '/catalog-info.yaml'

    # Paso 4: Crear pipeline de CI/CD
    - id: create-pipeline
      name: Create CI/CD Pipeline
      action: publish:github
      input:
        allowedOrganizations: ['mycompany']
        description: 'CI/CD Pipeline for ${{ parameters.service_name }}'
        name: ${{ parameters.service_name }}-pipeline
        branch: main

  output:
    links:
      - title: Repository
        url: ${{ steps['create-repo'].output.remoteUrl }}
      - title: Open in catalog
        icon: catalog
        entityRef: ${{ steps['register-catalog'].output.entityRef }}
```

#### 4.6.2. Estructura del Template

```
templates/scaffolder-template/nodejs-service/skeleton/
├── catalog-info.yaml          # Metadatos del servicio
├── .github/
│   └── workflows/
│       ├── ci.yml             # Tests + Linting
│       └── cd.yml             # Deploy automático
├── src/
│   ├── controllers/
│   ├── services/
│   └── config/
├── test/
├── Dockerfile                 # Optimizado multi-stage
├── package.json
├── tsconfig.json
├── .eslintrc.js               # Reglas de linting estrictas
├── .prettierrc                # Formato de código automático
├── jest.config.js             # Testing
├── infra/
│   ├── terraform/
│   │   └── main.tf            # Infraestructura como código
│   └── helm/
│       └── Chart.yaml         # Chart de Kubernetes
└── docs/
    └── index.md               # TechDocs
```

### 4.7. Self-Service: Scorecards y Governance

Backstage permite definir **Scorecards** para verificar que tus servicios cumplan estándares de governance corporativo:

##### templates/scorecard/service-checklist.yaml

```
apiVersion: backstage.io/v1alpha1
kind: Scorecard
metadata:
  name: service-standard-checklist
spec:
  rules:
    - id: security-scan
      title: Security Scan Passing
      description: El servicio debe pasar todos los checks de seguridad
      rule: |
        all(
          securityScan.exists(),
          securityScan.latestBuild.status == 'PASS'
        )

    - id: documentation-complete
      title: Documentation Complete
      description: TechDocs debe estar actualizado
      rule: |
        techdocsExists.exists() &&
        techdocsLastUpdated < ago(7d)

    - id: test-coverage
      title: Test Coverage > 80%
      description: Cobertura de pruebas mayor al 80%
      rule: |
        testCoverage > 0.8

    - id: sre-checks
      title: SRE Best Practices
      description: Debe tener SLI/SLO definidos
      rule: |
        hasSLI.exists() && hasSLO.exists()

    - id: gdpr-compliance
      title: GDPR Compliance
      description: Servicios que manejan datos de usuario deben tener DPIA
      rule: |
        !hasUserData.exists() || dpiaDocument.exists()
```

#### 4.7.1. Implementación de Governance con Políticas

Las organizaciones reguladas (banca, salud) necesitan enforce políticas estrictas:

##### policies/security-policy.yaml

##### policies/catalog-info.yaml

```
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: security-policies
spec:
  targets:
    - ./policies/catalog-info.yaml

---
apiVersion: backstage.io/v1alpha1
kind: Resource
metadata:
  name: security-gate
  description: Policy Enforcement Point
spec:
  type: security-policy
  owner: platform-team
  checks:
    - type: Trivy
      name: Container Vulnerability Scan
      description: Imágenes Docker no pueden tener vulnerabilidades CRITICAL
      threshold:
        critical: 0

    - type: OPA
      name: Terraform Policy
      description: Infraestructura no puede crear recursos públicos sin aprobación
      rego: |
        package terraform

        deny[reason] {
          input.resource.aws_s3_bucket
          input.resource.aws_s3_bucket.acl == "public-read"
          reason := "S3 buckets cannot be public"
        }

    - type: Checkov
      name: IaC Security
      description: Terraform/Kubernetes deben pasar checks de seguridad
      framework:
        - terraform
        - kubernetes
      threshold:
        failed_checks: 0
```

### 4.8. Integración con Observabilidad

El IDP debe centralizar la observabilidad de todos los servicios en un solo lugar:

```
// plugins/observability/src/components/ServiceHealthCard.tsx
import React from 'react';

export const ServiceHealthCard = ({ entity }) => {
  // Datos agregados de diferentes herramientas
  const { data, loading } = useEntityHealth({
    entity,
    sources: [
      'datadog',      // APM traces
      'grafana',      // Dashboards
      'pagerduty',    // On-call status
      'sentry',       // Error tracking
      'prometheus',   // SLI/SLO metrics
    ]
  });

  if (loading) return <Skeleton />;

  return (
    <Card>
      <CardHeader title="Service Health" />
      <CardContent>
        <HealthIndicator status={data.overallHealth} />
        <ErrorRate value={data.errorRate} threshold={0.01} />
        <Latency p95={data.latency.p95} target={500} />
        <Saturation cpu={data.cpuUsage} />
        <AlertsOnCall count={data.activeAlerts} />
      </CardContent>
    </Card>
  );
};
```

#### 4.8.1. Dashboard Unificado de SLIs/SLOs

```
// plugins/slo/src/components/ServiceSLOCard.tsx
import { useEntity } from '@backstage/plugin-catalog-react';

export const ServiceSLOCard = () => {
  const { entity } = useEntity();

  // Consultar SLI/SLO desde Prometheus/DataDog
  const { data: sloData } = useFetch(
    `https://prometheus.company.com/api/v1/query?query=service_sli:error_budget{service="${entity.metadata.name}"}`
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>SLI</TableCell>
          <TableCell>SLO Target</TableCell>
          <TableCell>Current</TableCell>
          <TableCell>Error Budget</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sloData?.map(slo => (
          <TableRow key={slo.name}>
            <TableCell>{slo.name}</TableCell>
            <TableCell>{slo.target}%</TableCell>
            <TableCell>{slo.current}%</TableCell>
            <TableCell>
              <ProgressBar
                value={slo.error_budget_remaining}
                color={slo.error_budget_remaining < 10 ? 'red' : 'green'}
              />
            </TableCell>
            <TableCell>
              <Chip
                label={slo.status}
                color={slo.status === 'HEALTHY' ? 'success' : 'error'}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### 4.9. Caso de Estudio Real: Spotify en 2022

Spotify fue la empresa que creó Backstage en 2016. En 2022, tenían:

- **+300 microservicios** gestionados a través de Backstage
- **+2,000 desarrolladores** usando el IDP diariamente
- **>150 Golden Paths** para diferentes tipos de servicios
- **Reducción del 70%** en tiempo de onboarding de nuevos devs

**El problema que resolvieron**:

Antes de Backstage (2015):

- Un nuevo dev tardaba **6 semanas** en hacer su primer deploy
- Cada equipo había documentado su stack en wikis desactualizados
- No existía inventario centralizado de servicios

Después de Backstage (2018):

- Time-to-Hello-World: **2 horas** (reducción de 98%)
- Inventario automático: Todo servicio debe tener `catalog-info.yaml`
- Documentación integrada: TechDocs se genera desde el repo

### 4.10. Caso de Estudio: American Express (2024)

American Express implementó un IDP basado en Backstage en 2023 para gestionar **+5,000 repositorios**.

**Resultados después de 12 meses**:

| Métrica | Antes | Después | Mejora |
| --- | --- | --- | --- |
| Time-to-First-Deploy | 5 días | 4 horas | 97% |
| Shadow IT Services | 35% | 8% | 77% |
| Incidentes por configuración errónea | 15/mes | 3/mes | 80% |
| Satisfacción de desarrolladores (NPS) | 20 | 65 | 225% |

**Lecciones clave**:

1. **No empieces con cero templates**: Comienza con 2-3 Golden Paths, no con 20
2. **Hazlo opinionated**: Solo soporta 1 stack por tipo de servicio (ej: solo NestJS para APIs)
3. **Métricas primero**: Antes de construir, define cómo medirás el éxito

---

## 5. Team Topologies y Platform Engineering

### 5.1. Los 4 Tipos de Equipos

Según el libro **Team Topologies** (Matthew Skelton & Manuel Pais), existen 4 tipos de equipos:

| Tipo | Responsabilidad | Ejemplo |
| --- | --- | --- |
| \*\*Stream-aligned\*\* | Entregar valor de negocio continuo | Team Checkout, Team Payments |
| \*\*Platform\*\* | Habilitar rapidez a stream-aligned | Platform Team |
| \*\*Enabling\*\* | Resolver problemas técnicos transitorios | Serverless Migration Team |
| \*\*Subsystem\*\* | Componentes críticos compartidos | Database Platform Team |

### 5.2. Interacciones entre Equipos

**Colaboración Mode: "Platform as a Service"**

```
Stream-aligned Team → Pregunta "¿Cómo deployo?"
       ↓
Platform Team → Responde "Usa el Golden Path"
       ↓
Resultado: Stream-aligned hace deploy solo en 15 minutos
```

**Anti-patrón: "I-Tickets"**

```
Stream-aligned Team → Abre JIRA ticket "Necesito base de datos"
       ↓ (espera 3 días)
Platform Team → Crea DB manualmente
       ↓
Resultado: Frustración, lentitud, bottleneck
```

### 5.3. Reducción de Carga Cognitiva

**El problema del Full-Stack Solitario**:

Un desarrollador en 2026 necesitaría ser experto en:

- Frontend: React/Vue, Tailwind, State Management
- Backend: Node.js/Go/Java, REST/GraphQL
- Infraestructura: Docker, Kubernetes, Terraform
- Observabilidad: Prometheus, Grafana, Jaeger
- Seguridad: OAuth2, JWT, Network Policies
- Testing: Unit, Integration, E2E, Chaos Engineering

**Resultado**: Imposible. Nadie domina todo.

**La solución Platform Engineering**:

El Platform Team abstrae la complejidad:

```
ANTES (Full-Stack Hero):
Dev → Debe saber Kubernetes + Helm + Terraform + ...

DESPUÉS (Platform):
Dev → "Quiero un servicio"
Platform → "Usa el template de Node.js"
Dev → Deploy listo en 15 min
```

### 5.4. Team Topologies en la Práctica

##### Ejemplo de configuración en Backstage

```
apiVersion: backstage.io/v1alpha1
kind: Group
metadata:
  name: platform-team
  description: Equipo de Platform Engineering
spec:
  type: platform
  profile:
    displayName: Platform Team
    email: platform@mycompany.com
  children:
    - group:team-billing
    - group:team-checkout
    - group:team-inventory
    - group:team-fraud-detection

---
apiVersion: backstage.io/v1alpha1
kind: Group
metadata:
  name: team-billing
spec:
  type: stream-aligned
  profile:
    displayName: Billing Team
  parent: platform-team
```

---

## 6. El Futuro de Platform Engineering

### 6.1. Tendencias 2026-2027

1. **IDPs Multi-Cloud**

- Un solo Backstage gestionando servicios en AWS, GCP y Azure
- Abstracción de "vendor lock-in"

1. **AI-Powered Platform**

- Copilot integrado que te ayuda a elegir el Golden Path correcto
- Chatbot que responde "¿Cómo configuro Redis?" basado en tu documentación

1. **Golden Paths Autogenerados**

- IA que analiza tus servicios existentes
- Genera automáticamente templates recomendados

1. **Internal Developer Portals for Edge**

- Despliegue en Cloudflare Workers, Fastly, Vercel Edge
- Todo gestionado desde el mismo IDP

### 6.2. Métricas de Éxito

Un Platform Team exitoso en 2026 logra:

| Métrica | Antes (2023) | Después (2026) | Mejora |
| --- | --- | --- | --- |
| \*\*Time-to-First-Deploy\*\* | 2 días | 30 minutos | 96x más rápido |
| \*\*Shadow IT\*\* | 40% de servicios no estándar | <5% | 87% reducción |
| \*\*Onboarding Time\*\* | 2 semanas | 2 días | 7x más rápido |
| \*\*Ticket Backlog\*\* | 50 tickets pendientes | <5 tickets | 90% reducción |

---

## 7. Conclusión

### 7.1. Resumen Ejecutivo

Platform Engineering no es "otra capa de infraestructura". Es un **cambio de mentalidad**:

- **Antes**: "Los devs son infra-experts heroicos"
- **Ahora**: "Los devs se enfocan en lógica de negocio, la plataforma les da herramientas"

### 7.2. Llamada a la Acción

**Esta semana**:

1. Instala Backstage localmente
2. Registra tu primer servicio en el catálogo
3. Define tus primeros Golden Paths

**Este mes**:

1. Crea un template de scaffolding
2. Configura CI/CD automático para el template
3. Mide Time-to-Hello-World

**Este trimestre**:

1. Implementa Scorecards
2. Integra observabilidad centralizada
3. Entrena a tu equipo en el uso del IDP

---

## 8. Recursos Adicionales

- [Team Topologies Book](https://teamtopologies.com/)
- [Backstage Documentation](https://backstage.io/)
- [Humanitec Platform Engineering Maturity Model](https://humanitec.com/blog/platform-engineering-maturity-model)

---

## 9. Ruta de Aprendizaje

1. **Libro**: Team Topologies (leer completo)
2. **Tutorial**: [Backstage Getting Started](https://backstage.io/docs/getting-started/)
3. **Video**: [Spotify's RBC interview](https://www.youtube.com/watch?v=9j-_2qPMk-c)

---

## 10. Challenge Práctico

### 🎯 Challenge: "Crea tu primer IDP"

**Objetivo**: Instalar Backstage localmente y registrar 3 servicios.

**Pasos**:

1. `npx @backstage/create-app@latest`
2. Configurar GitHub auth
3. Registrar 3 servicios de tu empresa
4. Crear un Scorecard simple
5. Publicar un template de scaffolding

**Resultado**: Tu primera plataforma interna funcionando.

## 5. Preguntas y Respuestas (FAQ)

1. **¿Platform Engineering mata a DevOps?**

No. DevOps es la cultura (colaboración). Platform Engineering es la estructura organizacional para escalar esa cultura sin que todos tengan que ser expertos en todo.

1. **¿Necesito esto si somos 5 desarrolladores?**

Probablemente no. Platform Engineering tiene sentido cuando la complejidad de comunicación supera la capacidad de ejecución (generalmente +20-30 ingenieros). Para equipos pequeños, un "Full Stack Senior" sigue funcionando bien.

1. **¿Backstage es difícil de mantener?**

Sí. Backstage es un "portal framework", no un portal listo. Tienes que escribir código TypeScript/React para mantenerlo. Si no tienes capacidad para mantener la herramienta, usa opciones SaaS como Port.

1. **¿Esto significa que los devs ya no tocan Kubernetes?**

Ese es el ideal para la mayoría. Deberían interactuar con abstracciones de alto nivel (el IDP), no editando YAMLs de Kubernetes a mano en cada deploy.

1. **¿Qué pasa con la creatividad del desarrollador?**

Los \_Golden Paths\_ estandarizan lo aburrido (pipelines, networking, logs) para liberar tiempo creativo enfocado en la lógica de negocio única de tu empresa.

## 6. Puntos Relevantes (Resumen)

1. **Carga Cognitiva:** El enemigo silencioso de la productividad moderna. Platform Engineering existe para reducirla.
2. **Self-Service:** La clave no es pedir tickets a Ops, es tener un portal donde el dev se auto-abastece.
3. **Golden Paths:** Ofrece el camino de menor resistencia. Haz que "hacer lo correcto" sea también "lo más fácil".
4. **Team Topologies:** Estructura tus equipos en "Stream-aligned" (valor) y "Platform" (soporte).
5. **Producto, no Proyecto:** La plataforma nunca se "termina", evoluciona con las necesidades de tus desarrolladores internos.

## 7. Conclusión

- **Cierre:** El mito del desarrollador que lo sabe "todo" ha muerto, y es algo bueno. Al especializar roles nuevamente, permitimos que cada uno brille en su área. La Ingeniería de Plataforma es la empatía convertida en infraestructura.
- **Perspectiva a futuro:** En 2026/2027, los IDPs integrarán AI/ML de IA que no solo crearán infraestructura, sino que sugerirán optimizaciones de costos y seguridad proactivamente.

## 8. Recursos Adicionales

- [Team Topologies (Libro y conceptos)](https://teamtopologies.com/)
- [Backstage.io (Spotify)](https://backstage.io/)
- [Platform Engineering Community](https://platformengineering.org/)

## 9. Siguientes Pasos (Ruta de aprendizaje)

1. Leer el libro "Team Topologies" para entender la teoría organizacional.
2. Probar una demo de **Backstage** localmente (`npx @backstage/create-app`).
3. Definir cuál sería el "Golden Path" de una API en tu empresa actual y documentarlo.

## 10. Llamada a la Acción (Challenge)

- **Reto:** "El Mapa de Dependencias"

Sin instalar nada complejo: Crea un archivo YAML manual que describa uno de tus proyectos actuales siguiendo el formato de `catalog-info` de arriba (Dueño, Dependencias, APIs, Docs).

¿Te has dado cuenta de que no sabías quién era el dueño de alguna dependencia? Ese es el primer paso para entender el valor de un IDP.
