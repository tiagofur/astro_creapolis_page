---
title: "Cómo Escribir Tests en NestJS con Jest (Unit &amp; E2E)"
description: "Si has seguido esta serie, has logrado algo impresionante. Tienes una API de NestJS con un CRUD funcional, un sistema de autenticación robusto, relaciones de base de datos…"
pubDate: "2025-10-20"
author: "tiagofur"
tags: []
categories: ["Mobile"]
slug: "como-escribir-tests-en-nestjs-con-jest-unit-e2e"
originalUrl: "https://creapolis.dev/como-escribir-tests-en-nestjs-con-jest-unit-e2e/"
draft: false
---

### **1. Introducción**

Si has seguido esta serie, has logrado algo impresionante. Tienes una [API de NestJS](https://creapolis.dev/guia-completa-de-guia-completa-de-nestjs-para-desa/) con un CRUD funcional, un sistema de [autenticación robusto](https://creapolis.dev/nestjs-autenticacion-y-autorizacion-desde-cero-jwt/), relaciones de [base de datos](https://creapolis.dev/nestjs-typeorm-advanced-relationships-transactions/) complejas y transacciones seguras. Has construido una aplicación backend con todas las de la ley.

Pero ahora enfrentamos un nuevo desafío, uno que todo desarrollador profesional encara a medida que un proyecto crece: **el miedo al cambio**. ¿Cómo puedes añadir una nueva funcionalidad o refactorizar un servicio con la confianza de que no has roto algo en otra parte de la aplicación sin darte cuenta? ¿Cómo garantizas que la lógica que escribiste hace un mes sigue funcionando exactamente como esperas?

La respuesta no es la esperanza, ni las pruebas manuales repetitivas. La solución es una **red de seguridad automatizada**.

Bienvenidos al mundo de las **pruebas automatizadas**. En el ecosistema de NestJS, esta red de seguridad se construye principalmente con **Jest**, un framework de testing de JavaScript increíblemente potente y fácil de usar, que viene preconfigurado en cada nuevo proyecto de NestJS.

**Nuestro objetivo:** En esta guía, desmitificaremos el testing. Aprenderás a escribir dos tipos de pruebas fundamentales que blindarán tu aplicación:

- **Tests Unitarios (Unit Tests):** Para inspeccionar las piezas más pequeñas de tu lógica de negocio (los métodos de tus servicios) de forma aislada.
- **Tests de Extremo a Extremo (E2E Tests):** Para simular peticiones HTTP reales y verificar que todo el flujo de tu aplicación, desde la ruta hasta la base de datos, funciona en perfecta armonía.

Al final, no solo tendrás una aplicación funcional, sino una aplicación **fiable, mantenible y a prueba de balas**.

### **2. Preparando el Terreno: Configuración de Jest en NestJS**

Una de las grandes ventajas de NestJS es que viene con una configuración de pruebas robusta y lista para usar desde el primer momento. No necesitas instalar ni configurar un framework de testing; **Jest** ya está integrado y optimizado para el ecosistema de NestJS.

---

#### **Archivos de Configuración Clave ⚙️**

Cuando creas un proyecto con el CLI de Nest, se generan dos archivos principales para Jest en la raíz de tu proyecto:

1. **`jest.config.js`**: Este es el archivo de configuración para las **pruebas unitarias**. Le dice a Jest cómo encontrar y ejecutar los archivos terminados en `.spec.ts`. Está configurado para usar `ts-jest`, un transformador que permite a Jest entender TypeScript.
2. **`jest-e2e.json`**: Esta es una configuración separada y específica para las **pruebas de extremo a extremo (E2E)**. Define que los archivos de prueba son los que terminan en `.e2e-spec.ts` y establece un entorno de prueba diferente para simular una aplicación real.

---

#### **Los Comandos de Prueba 📜**

Tu archivo `package.json` ya incluye los scripts necesarios para ejecutar las pruebas:

- **`npm run test`**: Este comando ejecuta Jest usando la configuración de **pruebas unitarias**. Buscará todos los archivos `*.spec.ts` en tu proyecto y los correrá. Es el comando que usarás con más frecuencia durante el desarrollo para verificar la lógica de negocio.
- **`npm run test:e2e`**: Este comando ejecuta las **pruebas de extremo a extremo**. Inicia una instancia completa de tu aplicación en memoria y corre los archivos `*.e2e-spec.ts`, que simulan peticiones HTTP reales a tus endpoints.
- **`npm run test:cov`**: Este comando ejecuta las pruebas unitarias y, además, genera un **reporte de cobertura de código** (code coverage). Este reporte te muestra qué porcentaje de tu código está siendo probado por tus tests, ayudándote a identificar áreas no cubiertas.

---

#### **Convenciones de Nomenclatura ✍️**

La organización de las pruebas en NestJS se basa en una simple convención de nombres:

- **`nombre-del-archivo.spec.ts`**: Este es el archivo de prueba unitaria para el archivo `nombre-del-archivo.ts`. Por ejemplo, la lógica de `tasks.service.ts` se prueba en `tasks.service.spec.ts`. La palabra "spec" es una abreviatura de "specification" (especificación).
- **`nombre-del-archivo.e2e-spec.ts`**: Este es el archivo de prueba de extremo a extremo. Generalmente, hay un archivo E2E por cada módulo o controlador principal, como `app.e2e-spec.ts` o `tasks.e2e-spec.ts`.

Jest está configurado para encontrar y ejecutar automáticamente estos archivos basándose en sus sufijos, por lo que seguir esta convención es clave.

Con este conocimiento del terreno, estamos listos para ensuciarnos las manos y escribir nuestra primera prueba unitaria.

### **3. El Micro-Inspector: Unit Testing para Servicios**

Aquí es donde comienza el verdadero testing. Nos enfocaremos en probar las piezas más críticas y lógicas de nuestra aplicación: los **servicios**.

---

#### **¿Qué es el Unit Testing? 🔬**

El **Unit Testing** (Prueba Unitaria) consiste en probar la unidad de código más pequeña posible de forma **totalmente aislada**. En nuestro caso, una "unidad" es un método dentro de un servicio, como `getTaskById` en `TasksService`.

El objetivo es simple: verificar que un método específico hace exactamente lo que se supone que debe hacer, sin preocuparse por el resto de la aplicación (controladores, base de datos, etc.).

---

#### **El Desafío: Las Dependencias**

Si abres `tasks.service.ts`, verás que depende del repositorio de TypeORM:

TypeScript

```
constructor(
  @InjectRepository(Task)
  private tasksRepository: Repository<Task>,
) {}
```

Para una prueba unitaria, **no queremos conectarnos a una base de datos real**. Sería lento, frágil y rompería el principio de "aislamiento". Entonces, ¿cómo probamos un método que necesita un repositorio para funcionar?

---

#### **La Solución: Mocks (Simulaciones) 🎭**

La solución es usar un **mock**. Un mock es una versión falsa y controlada de una dependencia. Crearemos un "falso" `tasksRepository` que no se conecta a ninguna base de datos. En su lugar, nosotros le diremos exactamente qué debe hacer y qué debe devolver cuando uno de sus métodos (`findOne`, `save`, etc.) sea llamado.

Jest nos proporciona la función `jest.fn()` para crear estas funciones falsas.

---

#### **Ejemplo Práctico: Escribiendo Tests para `TasksService`**

Vamos a escribir pruebas para nuestro `TasksService`. Abre el archivo `src/tasks/tasks.service.spec.ts` (NestJS ya crea un esqueleto por nosotros).

**1. Configuración del Módulo de Pruebas**

Primero, usamos `Test.createTestingModule` para crear un módulo de NestJS específicamente para nuestra prueba. Aquí es donde proporcionamos nuestro mock del repositorio.

TypeScript

```
// src/tasks/tasks.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TaskStatus } from './entities/task.entity';

// Un objeto mock para simular el repositorio
const mockTasksRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

// Un usuario mock para usar en las pruebas
const mockUser = { id: 'some-uuid', username: 'testuser', tasks: [] };

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository, // Usamos nuestro mock en lugar del repositorio real
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

**2. Probando `getTaskById`**

Ahora, añadamos nuestros casos de prueba dentro del `describe`.

**Caso de Éxito: La tarea se encuentra**

TypeScript

```
// ... dentro del describe('TasksService', ...)

describe('getTaskById', () => {
  it('debería encontrar y devolver una tarea por su ID', async () => {
    // Arrange: Preparamos el escenario
    const mockTask = { id: 'task-id', title: 'Test Task', description: 'Test Desc', status: TaskStatus.OPEN, user: mockUser };
    mockTasksRepository.findOne.mockResolvedValue(mockTask); // Le decimos al mock qué devolver

    // Act: Ejecutamos el método que queremos probar
    const result = await service.getTaskById('task-id', mockUser);

    // Assert: Verificamos que el resultado es el esperado
    expect(result).toEqual(mockTask);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'task-id', user: mockUser } });
  });

  it('debería lanzar una excepción si la tarea no se encuentra', async () => {
    // Arrange
    mockTasksRepository.findOne.mockResolvedValue(null); // Simulamos que no se encontró nada

    // Act & Assert
    await expect(service.getTaskById('non-existent-id', mockUser)).rejects.toThrow(NotFoundException);
  });
});
```

**3. Probando `createTaskWithTags` (un ejemplo simple)**

TypeScript

```
// ... dentro del describe('TasksService', ...)

describe('createTaskWithTags', () => {
  it('debería crear y guardar una nueva tarea', async () => {
    // Arrange
    const createTaskDto = { title: 'New Task', description: 'New Desc' };
    const newTask = {
      id: 'new-task-id',
      ...createTaskDto,
      status: TaskStatus.OPEN,
      user: mockUser,
      tags: [],
    };
    
    // El queryRunner y el manager también deben ser simulados
    const mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        create: jest.fn().mockReturnValue(newTask),
        save: jest.fn().mockResolvedValue(newTask),
      },
    };
    
    // Simulamos el dataSource para devolver nuestro queryRunner falso
    // (Esto requeriría inyectar DataSource y mockearlo en el beforeEach)
    // Para simplificar, nos enfocaremos en la lógica principal.

    // Act: Llamamos al método
    // Para un test real, necesitaríamos mockear el dataSource como se describe arriba
    // const result = await service.createTaskWithTags(createTaskDto, mockUser);
    
    // Assert:
    // expect(result).toEqual(newTask);
    // expect(mockQueryRunner.manager.save).toHaveBeenCalledWith(newTask);
  });
});
```

*Nota: Probar un método con transacciones es más complejo porque requiere mockear `DataSource` y `QueryRunner`, lo cual es un tema avanzado. El principio, sin embargo, es el mismo: controlar lo que hacen las dependencias y verificar el resultado.*

---

Al escribir estas pruebas, has verificado la lógica de tu servicio en un entorno controlado y predecible. Ahora tienes una red de seguridad: si alguien modifica `TasksService` y rompe algo, estas pruebas fallarán inmediatamente, avisándote del problema antes de que llegue a producción.

### **4. El Flujo Completo: E2E Testing para Controladores**

Si las pruebas unitarias son como revisar el motor de un coche en un taller, las pruebas de **extremo a extremo (E2E)** son como sacar el coche a la carretera y probarlo en condiciones reales. Verificamos todo el recorrido: desde que el usuario gira la llave (hace una petición HTTP) hasta que el coche llega a su destino (la base de datos responde y se envía un resultado).

---

#### **4.1. ¿Qué es E2E Testing? 🚗**

Una prueba **E2E** en NestJS simula una petición HTTP real a uno de tus endpoints (`/tasks`, por ejemplo) e inspecciona la respuesta. Inicia una versión completa de tu aplicación en memoria, incluyendo controladores, servicios, pipes, guards y la conexión a una base de datos de prueba.

El objetivo es confirmar que todos los componentes de tu aplicación se integran y colaboran correctamente para producir el resultado esperado.

---

#### **4.2. Configuración del Entorno de Test**

NestJS nos facilita enormemente la creación de este entorno de prueba. La magia sucede en el archivo `*.e2e-spec.ts`.

- **`Test.createTestingModule()`**: Al igual que en las pruebas unitarias, usamos esto para construir un módulo de NestJS. Pero esta vez, importaremos los módulos reales de nuestra aplicación (`AppModule`, `TasksModule`, etc.) para crear una réplica funcional de la misma.
- **`Supertest`**: Es una librería que nos permite hacer peticiones HTTP a nuestra aplicación de prueba de una forma muy sencilla y encadenable. Es el estándar para pruebas E2E en el ecosistema de Node.js.

---

#### **4.3. Ejemplo Práctico: Escribiendo Tests para `TasksController`**

Vamos a crear un nuevo archivo de prueba, `src/tasks/tasks.e2e-spec.ts`, para probar nuestro controlador de tareas.

**1. Configuración Inicial**

TypeScript

```
// src/tasks/tasks.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module'; // Importamos el módulo principal

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Usamos el módulo de nuestra aplicación real
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Aplicamos el mismo pipe que en producción
    await app.init();
  });

  afterAll(async () => {
    await app.close(); // Cerramos la aplicación al final
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(401); // Esperamos un 401 porque la ruta está protegida
  });
});
```

Si ejecutas `npm run test:e2e`, verás que esta prueba pasa. ¡Acabas de verificar que tu `AuthGuard` funciona correctamente!

**2. El Desafío: Manejando la Autenticación**

Para probar los endpoints protegidos, necesitamos un token JWT válido. La estrategia es simple:

1. Crear un usuario de prueba en la base de datos.
2. Hacer una petición al endpoint de login (`/auth/login`) para obtener un token.
3. Usar ese token en las cabeceras de las siguientes peticiones.

TypeScript

```
// ... (continuación de tasks.e2e-spec.ts)
describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    // ... (configuración de la app)
    
    // Crear un usuario y obtener el token
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username: 'e2etestuser', password: 'Password123!' });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'e2etestuser', password: 'Password123!' });
    
    authToken = loginResponse.body.accessToken;
  });
  
  // ... (afterAll)
  
  it('debería obtener las tareas de un usuario autenticado', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${authToken}`) // Usamos el token
      .expect(200)
      .expect([]); // Esperamos un array vacío al principio
  });

  it('debería crear una nueva tarea para un usuario autenticado', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'E2E Test Task', description: 'From test' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toEqual('E2E Test Task');
  });

  it('no debería permitir crear una tarea con datos inválidos', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: '' }) // Título vacío, debería fallar la validación
      .expect(400); // Bad Request
  });
});
```

Con estas pruebas, no solo estás verificando tu lógica, sino también el `ValidationPipe`, el `AuthGuard`, la interacción con la base de datos y la estructura de la respuesta HTTP. Has construido una red de seguridad completa para tu API.

---

Ahora que manejas los dos pilares del testing, podemos discutir algunas consideraciones más avanzadas para llevar tus pruebas al siguiente nivel de profesionalismo.

### **5. Más Allá de lo Básico: Consideraciones Avanzadas en Testing**

Ya sabes cómo escribir pruebas unitarias y E2E. Ahora, vamos a pulir tu estrategia con tres conceptos profesionales que garantizan que tu suite de pruebas sea robusta, medible y mantenible a largo plazo.

---

#### **Limpieza de la Base de Datos 🧹**

**El Problema:** Tus pruebas E2E escriben en la base de datos. Si una prueba crea un usuario con el nombre `testuser`, la siguiente vez que se ejecute la prueba, fallará debido a la restricción de `username` único. Los tests deben ser independientes y repetibles, sin importar el orden en que se ejecuten.

**La Solución:** Limpiar la base de datos (o las tablas relevantes) antes o después de cada ejecución de prueba E2E. Esto asegura que cada prueba comience en un estado limpio y predecible.

**Cómo hacerlo:** En tu archivo `*.e2e-spec.ts`, puedes obtener una instancia de tus repositorios y ejecutar una operación de limpieza en un hook `beforeEach`.

TypeScript

```
// En tu tasks.e2e-spec.ts
import { Repository } from 'typeorm';
import { Task } from '../src/tasks/entities/task.entity';
import { User } from '../src/auth/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let taskRepository: Repository<Task>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    // ... tu configuración del módulo
    app = moduleFixture.createNestApplication();
    taskRepository = moduleFixture.get<Repository<Task>>(getRepositoryToken(Task));
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    await app.init();
  });

  // Este hook se ejecuta antes de cada 'it'
  beforeEach(async () => {
    // Borra en el orden correcto para evitar errores de foreign key
    await taskRepository.delete({});
    await userRepository.delete({});
  });
  
  // ... tus tests
});
```

---

#### **Cobertura de Código 📊**

**El Concepto:** La cobertura de código (o *code coverage*) es una métrica que te dice **qué porcentaje de tu código fuente es ejecutado por tus pruebas**. No mide la calidad de tus pruebas, pero es una herramienta fantástica para encontrar partes de tu aplicación que no están siendo probadas en absoluto.

**Cómo ejecutarla:** NestJS te lo pone fácil con el comando: `npm run test:cov`

Al ejecutarlo, se generará una carpeta `coverage` en tu proyecto. Dentro, encontrarás un informe HTML interactivo que te muestra, línea por línea, qué partes de tu código están cubiertas (`covered`) y cuáles no (`uncovered`).

**¿Cuánto es "suficiente"?** No te obsesiones con el 100%. Un objetivo saludable y común en la industria es alcanzar entre un **80% y 90% de cobertura**, especialmente en la lógica de negocio crítica (tus servicios). Usa el informe como una guía para descubrir puntos ciegos, como bloques `catch` de errores o condicionales `if/else` que nunca se ejecutan en tus pruebas.

---

#### **Tests de Integración 🔗**

**El Concepto:** Los tests de integración son el término medio entre las pruebas unitarias y las E2E.

- **Unit Test:** Prueba un método de servicio con **dependencias simuladas (mocks)**. Es rápido pero no prueba la conexión real, por ejemplo, con la base de datos.
- **E2E Test:** Prueba un **flujo HTTP completo**, desde el controlador hasta la base de datos. Da mucha confianza pero es más lento.
- **Integration Test:** Prueba un método de servicio interactuando con una **dependencia real** (como una base de datos de prueba), pero **sin el controlador ni la capa HTTP**.

Son perfectos para probar lógicas complejas que dependen fuertemente de la base de datos (como una consulta con `QueryBuilder`) de una forma más rápida y directa que una prueba E2E.

---

Ahora que hemos cubierto estos conceptos avanzados, estás equipado no solo para escribir pruebas, sino para diseñar una estrategia de testing completa y profesional.

### **6. Preguntas y Respuestas (FAQ)**

**1. ¿Cuál es la diferencia real entre Unit, Integration y E2E tests?**

**Respuesta:** Imagina que estás construyendo un coche:

- **Unit Test (Prueba Unitaria):** Pruebas cada pieza por separado. ¿Funciona el pistón? ¿Gira bien el engranaje? Aísla cada componente.
- **Integration Test (Prueba de Integración):** Pruebas cómo funcionan varias piezas juntas. ¿El motor (unión de pistones, engranajes, etc.) arranca y funciona correctamente al conectarlo a la transmisión?
- **E2E Test (Prueba de Extremo a Extremo):** Pruebas la experiencia completa del usuario. ¿Puedes meter la llave, arrancar el coche, ponerlo en marcha y conducir hasta tu destino? Pruebas todo el sistema funcionando en conjunto.

---

**2. ¿Cuánto porcentaje de cobertura de código es "bueno"?**

**Respuesta:** No existe un número mágico, y el 100% a menudo no es práctico ni rentable. Un objetivo común y saludable en la industria es **entre un 80% y 90%**, especialmente en la lógica de negocio crítica (servicios). Usa la cobertura como una **guía para encontrar puntos ciegos**, no como un objetivo final. Es más valioso tener pruebas de calidad que cubran el 80% de tu código, que tener pruebas mediocres que cubran el 100%.

---

**3. ¿Debo probar los DTOs, las entidades o los módulos?**

**Respuesta:** Generalmente, no. Los **DTOs y las entidades** son principalmente clases que definen una estructura de datos; no contienen lógica compleja que necesite ser probada. Los **módulos** son para la organización. Tu enfoque debe estar en probar las clases que **contienen lógica**: **Servicios** (lógica de negocio), **Controladores** (manejo de rutas), **Pipes** (transformación/validación) y **Guards** (lógica de autorización).

---

**4. ¿Por qué es importante el "aislamiento" en los tests unitarios?**

**Respuesta:** El aislamiento es clave por tres razones:

1. **Velocidad:** Los tests que no dependen de la red o de una base de datos se ejecutan en milisegundos.
2. **Fiabilidad:** Un test aislado no fallará porque un servicio externo o la base de datos estén caídos.
3. **Precisión:** Si un test unitario falla, sabes **exactamente** qué pieza de código está rota, sin tener que adivinar si el problema está en la base de datos, en otro servicio o en la red.

---

**5. ¿Cómo se prueban los `Guards` y `Pipes` en NestJS?**

**Respuesta:** Se prueban de forma muy similar a los servicios, usando pruebas unitarias. Para un `Guard` o un `Pipe`, crearías un **mock del `ExecutionContext`**, que es el objeto que reciben sus métodos (`canActivate` o `transform`). Al controlar lo que devuelve este mock (por ejemplo, un `request` con o sin usuario), puedes probar fácilmente todos los caminos lógicos de tu Guard o Pipe.

---

### **7. Puntos Relevantes a Recordar**

Si debes quedarte con cinco ideas clave sobre testing en NestJS, que sean estas:

1. **Dos Pilares: Unit y E2E:** Las **pruebas unitarias** son para la lógica aislada de tus **servicios**, mientras que las **pruebas E2E** son para validar los flujos HTTP completos a través de tus **controladores**.
2. **Los Mocks son tus Mejores Amigos:** En las pruebas unitarias, **simula (mockea)** todas las dependencias externas (como los repositorios de TypeORM) para lograr un aislamiento total, velocidad y fiabilidad.
3. **Las Pruebas E2E Simulan la Realidad:** Usa **Supertest** para hacer peticiones HTTP reales a tu aplicación de prueba. No olvides manejar la autenticación obteniendo un token válido para probar tus rutas protegidas.
4. **Un Entorno de Prueba Limpio es Crucial:** Asegúrate de que tus pruebas E2E limpien la base de datos antes de cada ejecución. Esto garantiza que los tests sean independientes y que sus resultados sean consistentes.
5. **Los Tests son una Red de Seguridad:** El objetivo final del testing no es solo encontrar bugs, sino construir una red de seguridad que te permita **refactorizar y añadir nuevas funcionalidades con confianza**, sabiendo que si rompes algo, tus pruebas te lo dirán al instante.

### **8. Conclusión**

¡Felicidades! Has instalado la red de seguridad definitiva para tu aplicación. Tu API ya no solo es funcional, compleja y segura, sino que ahora también es **fiable**. Has adquirido una de las habilidades más importantes que distinguen a un desarrollador profesional: la capacidad de escribir pruebas que garantizan la calidad y la estabilidad de tu código.

Has aprendido a usar **tests unitarios** para validar la lógica de negocio en el nivel más micro y **tests E2E** para asegurar que todos los componentes de tu sistema colaboran armoniosamente. Esta práctica transformará tu forma de desarrollar. El miedo a refactorizar o a añadir nuevas funcionalidades desaparecerá, reemplazado por la confianza que te da una suite de pruebas robusta.

Recuerda siempre que los tests no son un gasto de tiempo; son una **inversión** en la mantenibilidad, la calidad y la longevidad de tu proyecto.

---

### **9. Recursos Adicionales**

Para profundizar en el mundo del testing en NestJS, la documentación oficial es tu mejor punto de partida.

- **[Documentación de Testing en NestJS](https://www.google.com/search?q=https://docs.nestjs.com/testing):** 🧪 La guía oficial que cubre todo, desde pruebas unitarias hasta E2E, con ejemplos detallados.
- **[Documentación de Jest](https://jestjs.io/docs/getting-started):** 🃏 El sitio oficial del framework Jest. Explora su potente API de aserciones (`expect`), sus capacidades de mocking y mucho más.
- **[Librería `Supertest`](https://www.google.com/search?q=%5Bhttps://github.com/ladjs/supertest%5D(https://github.com/ladjs/supertest)):** 🚀 La documentación de la librería que usamos para las peticiones HTTP en nuestras pruebas E2E.

---

### **10. Sugerencias de Siguientes Pasos**

Ahora que tienes una base sólida en testing, puedes expandir tus habilidades en estas áreas:

1. **Implementar Pruebas para el `AuthModule`:** Desafíate a escribir pruebas unitarias para el `AuthService` (probando el hasheo de contraseñas y la firma de JWTs con mocks) y pruebas E2E para los endpoints de `/signup` y `/login`.
2. **Integrar CI/CD (Integración Continua / Despliegue Continuo):** Configura un servicio como GitHub Actions o GitLab CI para que ejecute automáticamente tu suite de pruebas (`npm run test`) cada vez que subas nuevo código a tu repositorio. Esto asegura que ningún cambio que rompa la aplicación llegue a la rama principal.
3. **Explorar Librerías para Mocking Avanzado:** Investiga herramientas como `jest-mock-extended`. Estas librerías pueden facilitar la creación de mocks complejos, especialmente para repositorios de TypeORM, haciendo tus archivos de prueba aún más limpios y fáciles de mantener.

---

### **11. Invitación a la Acción 💪**

Has aprendido la teoría y has visto los ejemplos. Ahora, el verdadero aprendizaje comienza con la práctica.

**¡Hazlo un hábito!**

A partir de hoy, cada vez que añadas una nueva ruta a un controlador o un nuevo método a un servicio, pregúntate: "¿Cómo puedo probar esto?". Escribe la prueba, ya sea unitaria o E2E. Al principio puede parecer que ralentiza tu desarrollo, pero rápidamente descubrirás que la confianza y el tiempo que te ahorra a largo plazo en la depuración de errores es invaluable.

Abre tu proyecto, elige una pieza de lógica que aún no esté cubierta y escribe tu primer test sin seguir un tutorial. Ese es el momento en que el conocimiento se convierte en habilidad.

**¡Feliz testing!**
