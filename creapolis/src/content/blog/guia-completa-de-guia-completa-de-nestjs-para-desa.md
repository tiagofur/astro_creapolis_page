---
title: "Guía Completa de NestJS para Principiantes (2025)"
description: "Aprende guía completa de guía completa de nestjs para desarrolladores 2025 para desarrolladores 2025 con esta guía completa para desarrolladores. Ejemplos prácticos y mejores prácticas."
pubDate: "2025-10-17"
author: "tiagofur"
tags: ["desarrollo", "ejemplos", "tutorial"]
categories: ["Backend - NestJs"]
slug: "guia-completa-de-guia-completa-de-nestjs-para-desa"
originalUrl: "https://creapolis.dev/guia-completa-de-guia-completa-de-nestjs-para-desa/"
draft: false
---

## 1. **Introducción**

Si eres un desarrollador de Node.js, es probable que hayas experimentado la increíble libertad que ofrece su ecosistema. Frameworks como Express te permiten construir un servidor en cuestión de minutos. Sin embargo, esa misma libertad puede convertirse en un arma de doble filo a medida que tus proyectos crecen. ¿Dónde va la lógica de negocio? ¿Cómo estructuramos las rutas de forma coherente? ¿Cómo garantizamos que el código sea mantenible y escalable cuando un equipo entero trabaja en él?

Aquí es donde NestJS entra en escena y brilla con luz propia.

**¿Qué es NestJS y por qué está ganando tanta popularidad en 2025?**

NestJS es un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes, fiables y escalables. A diferencia de las librerías minimalistas, NestJS es un framework "opinado", lo que significa que proporciona una arquitectura de aplicación lista para usar que te guía hacia las mejores prácticas de desarrollo desde el primer momento.

Construido con y para **TypeScript**, aprovecha al máximo la seguridad de tipos y las características de la programación orientada a objetos (como clases, decoradores e inyección de dependencias). Su popularidad en 2025 no es casualidad; responde a la creciente necesidad de la industria de tener aplicaciones backend robustas, bien organizadas y fáciles de mantener, especialmente a nivel empresarial.

**Ventajas clave sobre otros frameworks de Node.js (como Express)**

Aunque NestJS utiliza frameworks como Express (o Fastify, si lo prefieres) bajo el capó, no es simplemente una capa sobre ellos. Les añade una estructura poderosa inspirada en la arquitectura de frameworks de frontend maduros como Angular.

Las ventajas más significativas para un principiante son:

- **Arquitectura Clara:** Olvídate del caos. NestJS te "obliga" de buena manera a organizar tu código en Módulos, Controladores y Servicios, haciendo que tus aplicaciones sean comprensibles y consistentes.
- **TypeScript por Defecto:** Reduce errores en tiempo de ejecución gracias al tipado estático, y mejora la experiencia de desarrollo con un autocompletado inteligente.
- **Inyección de Dependencias (DI):** Un concepto que puede sonar intimidante, pero que NestJS hace increíblemente simple. Te permite escribir código más limpio, desacoplado y, sobre todo, mucho más fácil de probar.
- **Ecosistema Escalable:** NestJS está diseñado para crecer. Ya sea que necesites integrar bases de datos, implementar autenticación, manejar WebSockets o incluso construir microservicios, NestJS tiene módulos dedicados para facilitar el proceso.

**¿Qué construiremos en esta guía?**

Para poner en práctica estos conceptos, no hay nada mejor que construir algo real. A lo largo de esta guía, desarrollaremos paso a paso una **API RESTful para gestionar una lista de tareas (un "To-Do list")**.

Crearemos los endpoints necesarios para realizar las operaciones básicas de un CRUD:

- `Crear` una nueva tarea.
- `Leer` todas las tareas o una tarea específica.
- `Actualizar` el estado de una tarea.
- `Eliminar` una tarea.

Empezaremos con una lógica simple en memoria y luego la evolucionaremos para conectarla a una base de datos real. ¡Prepárate para llevar tus habilidades de backend al siguiente nivel!

## **2. Preparando el Terreno: Configuración e Instalación**

Antes de sumergirnos en el código, necesitamos asegurarnos de que nuestro entorno de desarrollo esté listo. Esta sección te guiará a través de la instalación de NestJS y la creación de la estructura inicial de nuestro proyecto. Es un proceso rápido y sencillo gracias a la fantástica Interfaz de Línea de Comandos (CLI) de NestJS.

### **Requisitos Previos**

Para trabajar con NestJS, lo único que realmente necesitas tener instalado en tu sistema es **Node.js**. NestJS se construye sobre Node.js, por lo que es un requisito indispensable.

- **Node.js:** Te recomendamos utilizar la última versión LTS (Long-Term Support). A fecha de 2025, cualquier versión superior a la 18.x.x será perfecta. Puedes verificar si ya lo tienes instalado y qué versión estás usando abriendo tu terminal y ejecutando:Bash`node -v` Si no lo tienes instalado, puedes descargarlo desde el [sitio web oficial de Node.js](https://nodejs.org/). Al instalar Node.js, también se instalará automáticamente **npm** (Node Package Manager), que usaremos para manejar las dependencias de nuestro proyecto.

### **Instalación del CLI de NestJS**

La herramienta más poderosa de nuestro arsenal será el **NestJS CLI**. Nos permite crear proyectos, generar archivos (módulos, controladores, servicios), y ejecutar la aplicación con simples comandos.

Para instalar el CLI de forma global en tu sistema, abre tu terminal y ejecuta el siguiente comando de npm:

Bash

```
npm install -g @nestjs/cli
```

La bandera `-g` es importante, ya que instala el paquete globalmente, permitiéndote usar el comando `nest` desde cualquier directorio en tu terminal.

### **Creando Nuestro Primer Proyecto**

Con el CLI instalado, crear una nueva aplicación es tan simple como ejecutar un comando. Navega en tu terminal hasta el directorio donde guardas tus proyectos y ejecuta:

Bash

```
nest new api-tareas
```

El CLI te hará una pregunta: "**Which package manager would you like to use?**" (¿Qué gestor de paquetes te gustaría usar?). Puedes elegir `npm` o `yarn`. Para esta guía, seguiremos usando `npm`.

Este comando creará un nuevo directorio llamado `api-tareas`, instalará todas las dependencias necesarias y generará una estructura de proyecto base con todo lo que necesitas para empezar.

Una vez que termine, puedes entrar al directorio y arrancar la aplicación en modo de desarrollo:

Bash

```
cd api-tareas
npm run start:dev
```

Este comando compila y ejecuta la aplicación. Además, gracias al modo de desarrollo (`:dev`), se quedará observando los cambios en tus archivos y se reiniciará automáticamente cada vez que guardes. Si abres tu navegador y visitas `http://localhost:3000`, deberías ver un amistoso "**Hello World!**".

¡Felicidades, ya tienes una aplicación de NestJS funcionando!

### **Anatomía de un Proyecto NestJS**

Ahora, abramos la carpeta `api-tareas` en nuestro editor de código (como Visual Studio Code). Verás varios archivos y carpetas, pero los más importantes para nosotros ahora mismo están dentro de la carpeta `src` (source/código fuente).

Plaintext

```
src
├── app.controller.spec.ts  // Pruebas para el controlador
├── app.controller.ts       // Un controlador básico de ejemplo
├── app.module.ts           // El módulo raíz de la aplicación
├── app.service.ts          // Un servicio básico de ejemplo
└── main.ts                 // El punto de entrada de la aplicación
```

- `main.ts`: Este es el archivo que arranca toda la aplicación. Aquí se instancia la aplicación de Nest y se le indica que escuche en un puerto específico (por defecto, el 3000). Rara vez necesitarás modificarlo.
- `app.module.ts`: Es el módulo principal o "raíz". NestJS organiza el código en módulos, y este es el punto de partida que registrará todos los demás "bloques" de nuestra aplicación (controladores, servicios, otros módulos, etc.).
- `app.controller.ts`: Un controlador es el responsable de recibir las peticiones web y enviar las respuestas. El controlador de ejemplo que se genera tiene una única ruta que responde con "Hello World!".
- `app.service.ts`: Un servicio está diseñado para contener la lógica de negocio. El controlador debería ser simple y delegar las tareas complejas (como obtener datos de una base de datos) al servicio.

No te preocupes si estos conceptos aún no están 100% claros. En la siguiente sección, profundizaremos en cada uno de ellos, que son los pilares fundamentales de cualquier aplicación NestJS.

## **3. Los 3 Pilares Fundamentales de NestJS**

Para entender cómo funciona NestJS, debes familiarizarte con sus tres componentes arquitectónicos principales: **Controladores**, **Proveedores (o Servicios)** y **Módulos**. Piénsalo como el funcionamiento de un restaurante de alta cocina:

- **Controladores (Controllers):** Son los *camareros*. Toman las órdenes (peticiones HTTP) de los clientes, se aseguran de que la orden sea válida y la pasan a la cocina. No cocinan, solo gestionan la comunicación.
- **Proveedores (Providers/Services):** Son los *chefs* en la cocina. Reciben la orden del camarero y se encargan de toda la lógica compleja: preparar los ingredientes, cocinarlos y entregar el plato terminado.
- **Módulos (Modules):** Son las *secciones del restaurante* (la cocina, el comedor, la barra). Agrupan a camareros y chefs que trabajan juntos en una misma área para mantener todo organizado y eficiente.

Ahora, profundicemos en cada uno de estos pilares con ejemplos de código.

---

### **Controladores (Controllers): El punto de entrada de las solicitudes**

Un controlador tiene una única responsabilidad: **recibir peticiones entrantes y devolver una respuesta al cliente**. En NestJS, los controladores se definen como clases de TypeScript decoradas con `@Controller()`.

El decorador `@Controller('tasks')` le dice a NestJS que esta clase manejará todas las rutas que empiecen con el prefijo `/tasks`.

**Decoradores de Rutas y Manejo de Parámetros**

Dentro de la clase, usamos decoradores de método para asociar funciones específicas a verbos HTTP y rutas concretas.

TypeScript

```
// src/app.controller.ts (Ejemplo ilustrativo)
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

  // GET /tasks
  @Get()
  findAll(@Query('status') status: string) {
    // Este método se activará con una petición GET a /tasks
    // Por ejemplo: /tasks?status=pending
    return `Buscando todas las tareas con estado: ${status || 'todos'}`;
  }

  // GET /tasks/123
  @Get(':id')
  findOne(@Param('id') id: string) {
    // Este método se activará con una petición GET a /tasks/un-id
    // El decorador @Param('id') extrae el 'id' de la URL
    return { message: `Obteniendo la tarea con ID: ${id}` };
  }

  // POST /tasks
  @Post()
  create(@Body() taskData: any) {
    // Este método se activará con una petición POST a /tasks
    // El decorador @Body() extrae todo el cuerpo (payload) de la petición
    console.log('Datos recibidos:', taskData);
    return { message: 'Tarea creada', data: taskData };
  }
}
```

Como puedes ver, los decoradores hacen el código increíblemente declarativo y fácil de leer:

- `@Get()`, `@Post()`, `@Put()`, `@Delete()`: Asocian un método a un verbo HTTP.
- `@Param('key')`: Extrae un parámetro de la ruta (ej: `/tasks/:key`).
- `@Body()`: Extrae el `body` completo de una petición `POST` o `PUT`.
- `@Query('key')`: Extrae un parámetro de la query string (ej: `/tasks?key=value`).

---

### **Proveedores (Providers/Services): La lógica de negocio**

Un controlador nunca debería contener lógica de negocio compleja. Su trabajo es delegar. Aquí es donde entran los **Servicios**. Un servicio es una clase marcada con el decorador `@Injectable()` que encapsula la lógica de negocio (por ejemplo, interactuar con una base de datos, realizar cálculos, etc.).

**La importancia de separar la lógica en servicios**

Esta separación (conocida como *Separation of Concerns*) hace que tu código sea:

1. **Más legible:** Sabes exactamente dónde encontrar la lógica de una funcionalidad.
2. **Más reutilizable:** El mismo servicio puede ser utilizado por diferentes controladores.
3. **Más fácil de probar (testear):** Puedes probar la lógica de negocio de forma aislada sin necesidad de simular peticiones HTTP.

**El Decorador `@Injectable` y la Inyección de Dependencias**

El decorador `@Injectable()` le dice al sistema de **Inyección de Dependencias (DI)** de NestJS que esta clase puede ser gestionada por él.

La **Inyección de Dependencias** es el "superpoder" de NestJS. En lugar de que el controlador cree una instancia del servicio (`const service = new TasksService()`), simplemente lo declara como una dependencia en su constructor, y NestJS se encarga de crearlo y "inyectarlo" automáticamente.

Veamos cómo el controlador delega el trabajo al servicio:

TypeScript

```
// src/tasks.service.ts (Un nuevo archivo para nuestro servicio)
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private readonly tasks = []; // Usaremos un array simple por ahora

  findAll() {
    return this.tasks;
  }

  create(taskData: any) {
    this.tasks.push(taskData);
    return taskData;
  }
}

// src/tasks.controller.ts (Modificado para usar el servicio)
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // Aquí ocurre la magia de la Inyección de Dependencias
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    // El controlador solo llama al método, no sabe cómo funciona por dentro
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() taskData: any) {
    return this.tasksService.create(taskData);
  }
}
```

Observa el `constructor` del `TasksController`. Al declarar `private readonly tasksService: TasksService`, le estamos diciendo a NestJS: "Oye, para que este controlador funcione, necesito una instancia de `TasksService`. Por favor, provéemela". Y NestJS lo hace.

---

### **Módulos (Modules): La arquitectura de la aplicación**

Finalmente, los **Módulos** son la pieza que une todo. Un módulo es una clase con el decorador `@Module()` que sirve para organizar el código de nuestra aplicación en dominios o funcionalidades coherentes.

El decorador `@Module()` toma un objeto que describe el módulo:

- `controllers`: Una lista de los controladores que pertenecen a este módulo.
- `providers`: Una lista de los servicios que este módulo necesita. NestJS los instanciará y los hará disponibles para la inyección de dependencias dentro de este módulo.
- `imports`: Una lista de otros módulos que este módulo necesita.
- `exports`: Una lista de los `providers` de este módulo que quieres hacer públicos para que otros módulos puedan usarlos.

Para que nuestro `TasksController` pueda inyectar `TasksService`, ambos deben ser declarados en el mismo módulo:

TypeScript

```
// src/tasks.module.ts (Un nuevo archivo para agrupar todo lo relacionado con Tareas)
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController], // Declaramos el controlador
  providers: [TasksService],    // Declaramos el servicio para que sea inyectable
})
export class TasksModule {}
```

Y finalmente, este `TasksModule` debe ser importado en nuestro módulo raíz, el `AppModule`, para que la aplicación lo reconozca.

TypeScript

```
// src/app.module.ts (El módulo raíz de la aplicación)
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module'; // 1. Importamos nuestro nuevo módulo

@Module({
  imports: [TasksModule], // 2. Lo añadimos a la lista de imports
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Con estos tres pilares, NestJS nos proporciona una estructura sólida y escalable desde el principio. Ahora que entendemos la teoría, ¡es hora de ponerla en práctica!

## **4. Manos a la Obra: Construyendo una API REST de Tareas (CRUD)**

Llegó el momento de aplicar todo lo que hemos aprendido. En esta sección, construiremos nuestra API de gestión de tareas desde cero. Verás en acción cómo los Módulos, Controladores y Servicios trabajan en perfecta armonía. Para agilizar la creación de archivos, usaremos intensivamente el CLI de NestJS.

### **Paso 1: Definiendo la Estructura de Nuestra Tarea**

Antes que nada, necesitamos definir qué es una "Tarea". ¿Qué propiedades tendrá? Crearemos una `interface` de TypeScript para definir la "forma" de nuestros objetos de tarea y un `enum` para los posibles estados.

Dentro de la carpeta `src`, crea un nuevo directorio llamado `tasks`. Dentro de `tasks`, crea un archivo llamado `task.model.ts`:

TypeScript

```
// src/tasks/task.model.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
```

- `interface Task`: Define que cada tarea debe tener un `id`, `title`, `description` y un `status`. Esto nos ayuda a evitar errores y a que nuestro código sea más predecible.
- `enum TaskStatus`: Limita los posibles valores para el estado de una tarea, evitando que se puedan asignar valores arbitrarios como `"finished"` o `"completed"`.

### **Paso 2: Generando el Módulo de Tareas con el CLI**

Ahora, en lugar de crear los archivos del módulo, controlador y servicio manualmente, dejaremos que el CLI de NestJS haga el trabajo pesado. Abre tu terminal en la raíz del proyecto y ejecuta el siguiente comando:

Bash

```
nest generate resource tasks
```

El CLI te hará un par de preguntas:

1. **"What transport layer do you want to support?"**: Elige **REST API**.
2. **"Would you like to generate CRUD entry points?"**: Escribe **yes** (o simplemente `y`).

¡Y listo! El CLI ha hecho magia por nosotros:

- Ha creado la carpeta `src/tasks`.
- Ha generado `tasks.module.ts`, `tasks.controller.ts` y `tasks.service.ts` con todo el código base para un CRUD.
- Ha creado una carpeta `dto` (Data Transfer Object) y una carpeta `entities`.
- **¡Muy importante!** Ha importado automáticamente `TasksModule` dentro del array `imports` de nuestro `app.module.ts`.

Este comando es uno de los más útiles y te ahorrará muchísimo tiempo.

### **Paso 3: Implementando la Lógica en `TasksService`**

Vamos a abrir `src/tasks/tasks.service.ts` y a llenarlo con nuestra lógica de negocio. Por ahora, guardaremos las tareas en un simple array en memoria.

Primero, instalemos un paquete para generar IDs únicos:

Bash

```
npm install uuid
```

Ahora, modifica tu `tasks.service.ts`:

TypeScript

```
// src/tasks/tasks.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  // Hacemos el array privado para que solo se pueda modificar desde dentro de la clase
  private tasks: Task[] = [];

  // Método para obtener todas las tareas
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Método para obtener una tarea por su ID
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      // NestJS tiene excepciones HTTP integradas muy útiles
      throw new NotFoundException(`La tarea con el ID "${id}" no fue encontrada.`);
    }

    return found;
  }

  // Método para crear una nueva tarea
  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(), // Generamos un ID único
      title,
      description,
      status: TaskStatus.OPEN, // Estado por defecto
    };

    this.tasks.push(task);
    return task;
  }

  // Método para eliminar una tarea
  deleteTask(id: string): void {
    const found = this.getTaskById(id); // Reutilizamos el método para verificar si existe
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  // Método para actualizar el estado de una tarea
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id); // Reutilizamos de nuevo
    task.status = status;
    return task;
  }
}
```

### **Paso 4: Conectando las Rutas en `TasksController`**

Ahora que la lógica está lista en el servicio, vamos al `src/tasks/tasks.controller.ts` para conectar cada endpoint HTTP con su método correspondiente del servicio. El controlador se vuelve muy simple y legible.

TypeScript

```
// src/tasks/tasks.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
```

¡En este punto, ya tienes una API CRUD completamente funcional! Puedes probarla con herramientas como Postman o Insomnia.

### **Paso 5: Validación de Datos con DTOs y Pipes (¡Haciéndolo Robusto!)**

Nuestra API funciona, pero es frágil. ¿Qué pasa si un usuario intenta crear una tarea sin título? O con un título vacío. Necesitamos validar los datos de entrada.

**¿Qué es un DTO (Data Transfer Object)?** Es un objeto simple cuyo único propósito es definir la estructura de los datos que se transfieren a través de la red. En nuestro caso, crearemos un DTO para la creación de tareas.

**¿Qué es un Pipe?** Un Pipe en NestJS es una clase que transforma o valida los datos de entrada antes de que lleguen al manejador de la ruta. Usaremos el `ValidationPipe` integrado para automatizar la validación.

Primero, instalemos los paquetes necesarios:

Bash

```
npm install class-validator class-transformer
```

Ahora, vamos al archivo `src/tasks/dto/create-task.dto.ts` (que el CLI generó por nosotros) y lo modificamos:

TypeScript

```
// src/tasks/dto/create-task.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El título no puede estar vacío.' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @IsString()
  description: string;
}
```

Estos decoradores le dicen a `class-validator` qué reglas deben cumplir las propiedades.

A continuación, modificamos el método `createTask` en nuestro `TasksController` para que use el DTO:

TypeScript

```
// src/tasks/tasks.controller.ts (solo el método createTask)
// ... importamos el CreateTaskDto
import { CreateTaskDto } from './dto/create-task.dto';

// ... dentro de la clase TasksController
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto.title, createTaskDto.description);
  }
//...
```

Ahora el `@Body()` completo será validado contra las reglas de `CreateTaskDto`.

El último paso es decirle a NestJS que use el `ValidationPipe` en toda nuestra aplicación. Abre el archivo `src/main.ts` y añade una línea:

TypeScript

```
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 1. Importar

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 2. Activar globalmente
  await app.listen(3000);
}
bootstrap();
```

Ahora, si intentas hacer una petición `POST` a `/tasks` con un cuerpo vacío o sin el título, NestJS automáticamente responderá con un error `400 Bad Request`, indicando exactamente qué campo falló la validación. ¡Hemos hecho nuestra API mucho más robusta con muy poco esfuerzo!

## **5. Dando el Siguiente Paso: Introducción a la Base de Datos con TypeORM**

Nuestra API es funcional, pero tiene una limitación fundamental: los datos viven en un array en memoria. Si reiniciamos la aplicación, ¡todas nuestras tareas desaparecen! Para solucionar esto, necesitamos una base de datos. En esta sección, integraremos **TypeORM**, el ORM (Object-Relational Mapper) más maduro y recomendado para trabajar con NestJS.

### **¿Qué es un ORM y por qué usarlo?**

Un ORM es una herramienta que crea un puente entre nuestro código orientado a objetos (clases, objetos en TypeScript) y una base de datos relacional (tablas, filas, columnas en SQL). En lugar de escribir consultas SQL a mano como `INSERT INTO tasks...`, podemos usar métodos de JavaScript/TypeScript como `tasksRepository.save(newTask)`.

Ventajas de usar un ORM como TypeORM:

- **Abstracción:** No necesitas ser un experto en SQL para empezar.
- **Productividad:** Escribes menos código y es más legible.
- **Seguridad:** Ayuda a prevenir ataques comunes como la inyección SQL.
- **Portabilidad:** Cambiar de una base de datos (ej: de SQLite a PostgreSQL) es mucho más sencillo.

### **Paso 1: Instalando las Dependencias**

Primero, necesitamos instalar el paquete de NestJS para TypeORM, el propio TypeORM y el driver para la base de datos que usaremos, que en nuestro caso será `sqlite3`.

Abre tu terminal y ejecuta:

Bash

```
npm install @nestjs/typeorm typeorm sqlite3
```

### **Paso 2: Configurando el `TypeOrmModule` en la Aplicación**

Ahora debemos decirle a nuestra aplicación cómo conectarse a la base de datos. Configuraremos esto en nuestro módulo raíz, `app.module.ts`.

Modifica el archivo `src/app.module.ts` de la siguiente manera:

TypeScript

```
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. Importar TypeOrmModule
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    // 2. Configurar la conexión a la base de datos
    TypeOrmModule.forRoot({
      type: 'sqlite', // Tipo de base de datos
      database: 'db.sqlite', // Nombre del archivo que contendrá la DB
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Dónde encontrar las entidades
      synchronize: true, // ¡Solo para desarrollo! Sincroniza el esquema de la DB con las entidades
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

**¡Importante!** La opción `synchronize: true` es fantástica para el desarrollo, ya que crea y actualiza automáticamente las tablas de la base de datos basándose en tus entidades. Sin embargo, **nunca debe usarse en producción**, ya que podría llevar a la pérdida de datos. En producción, se usan "migraciones".

### **Paso 3: Creando nuestra Entidad `Task`**

Una **Entidad** es una clase que mapea directamente a una tabla de la base de datos. Vamos a reemplazar nuestra `interface` `Task` por una clase `Task` que será nuestra entidad de TypeORM.

Elimina el archivo `src/tasks/task.model.ts` y modifica el archivo `src/tasks/entities/task.entity.ts` (que el CLI creó para nosotros) de la siguiente forma:

TypeScript

```
// src/tasks/entities/task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Enum para los estados, lo mantenemos aquí
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity() // Le dice a TypeORM que esta clase es una tabla en la DB
export class Task {
  @PrimaryGeneratedColumn('uuid') // Columna primaria, autogenerada como UUID
  id: string;

  @Column() // Columna de texto normal
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
```

Estos decoradores le indican a TypeORM cómo debe crear la tabla `task` en la base de datos.

### **Paso 4: Adaptando `TasksModule` y `TasksService`**

El último paso es refactorizar nuestro servicio para que utilice la base de datos en lugar del array.

Primero, necesitamos que `TasksModule` le dé a `TasksService` acceso al "repositorio" de la entidad `Task`. Un repositorio es un objeto que nos proporciona métodos para interactuar con la tabla de la base de datos (`find`, `save`, `delete`, etc.).

Modifica `src/tasks/tasks.module.ts`:

TypeScript

```
// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. Importar
import { Task } from './entities/task.entity'; // 2. Importar la entidad

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // 3. Registrar la entidad Task en este módulo
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
```

Finalmente, vamos a la parte más emocionante. Modifiquemos `src/tasks/tasks.service.ts` para usar el repositorio inyectado. Todas las operaciones de base de datos son asíncronas, por lo que usaremos `async/await`.

TypeScript

```
// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  // Inyectamos el Repositorio de la entidad Task
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Los métodos ahora deben ser asíncronos (devuelven una Promesa)
  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`La tarea con el ID "${id}" no fue encontrada.`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`La tarea con el ID "${id}" no fue encontrada.`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
```

También necesitamos hacer un pequeño ajuste en `tasks.controller.ts` para pasar el DTO completo al servicio de creación y para manejar las promesas, aunque NestJS lo hace mayormente transparente.

TypeScript

```
// src/tasks/tasks.controller.ts (extractos modificados)
// ...
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
// ...

// Método Create
@Post()
createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
  // Pasamos el DTO completo al servicio
  return this.tasksService.createTask(createTaskDto);
}

// Método Delete (no devuelve contenido, así que el decorador @HttpCode es buena práctica)
@Delete('/:id')
@HttpCode(204) // Devuelve "204 No Content" en lugar de "200 OK"
deleteTask(@Param('id') id: string): Promise<void> {
  return this.tasksService.deleteTask(id);
}

// Los demás métodos también devuelven promesas ahora
// ...
```

¡Y eso es todo! Si reinicias tu aplicación (`npm run start:dev`), verás que se ha creado un archivo `db.sqlite` en la raíz de tu proyecto. Ahora, cada vez que crees una tarea, se guardará permanentemente en ese archivo. ¡Tu API ahora tiene memoria a largo plazo!

## **6. Preguntas y Respuestas (FAQ)**

Es natural tener preguntas después de asimilar tantos conceptos nuevos. Aquí tienes las respuestas a algunas de las dudas más comunes que surgen al empezar con NestJS.

**1. ¿Puedo usar JavaScript en lugar de TypeScript con NestJS?**

**Respuesta:** Sí, técnicamente es posible. NestJS transpila el TypeScript a JavaScript para su ejecución. Sin embargo, no es recomendable. El framework está diseñado desde su núcleo para aprovechar las características de TypeScript, como los decoradores (`@Controller`, `@Injectable`) y el tipado estático. Usar JavaScript te haría perder las mayores ventajas de NestJS: la seguridad de tipos, el autocompletado y una arquitectura fuertemente tipada que previene errores.

---

**2. ¿NestJS reemplaza a Express.js?**

**Respuesta:** No, lo potencia. Por defecto, NestJS utiliza Express como el motor HTTP subyacente. Piensa en ello de esta manera: Express es una librería minimalista y sin estructura definida (una caja de herramientas), mientras que NestJS es un framework completo que usa esas herramientas para construir una casa con una arquitectura bien definida (planos, cimientos, habitaciones). NestJS añade una capa de organización y estructura sobre Express (o Fastify, si lo prefieres) para crear aplicaciones escalables.

---

**3. ¿Es difícil aprender NestJS si no sé Angular?**

**Respuesta:** Para nada. Aunque NestJS se inspiró en la arquitectura de Angular (módulos, inyección de dependencias, decoradores), no necesitas saber nada de Angular para ser productivo con NestJS. Los conceptos son universales en el mundo del software empresarial. Si vienes de otros lenguajes orientados a objetos como Java (con Spring) o C# (con .NET), te sentirás como en casa. Y si solo conoces JavaScript/Node.js, esta guía te ha dado toda la base que necesitas.

---

**4. ¿Qué es la Inyección de Dependencias y por qué es tan importante?**

**Respuesta:** La Inyección de Dependencias (DI) es un patrón de diseño que invierte el control. En lugar de que una clase cree sus propias dependencias (ej. `const service = new TasksService()` dentro del controlador), simplemente las declara en su constructor (`constructor(private tasksService: TasksService)`). El "inyector" de NestJS se encarga de crear y proporcionar esa instancia. Su importancia radica en que **desacopla** el código, haciéndolo mucho más fácil de mantener, reutilizar y, sobre todo, de **probar** (testear) de forma aislada.

---

**5. ¿Cuándo debería crear un nuevo módulo en mi aplicación?**

**Respuesta:** La regla de oro es crear un nuevo módulo para cada **dominio o funcionalidad principal** de tu aplicación. En nuestro ejemplo, todo lo relacionado con "Tareas" (su controlador, servicio, entidad) pertenece al `TasksModule`. Si luego añadieras autenticación de usuarios, crearías un `AuthModule` y un `UsersModule`. Si añadieras un sistema de pagos, un `PaymentsModule`. Esta separación mantiene tu código organizado y evita que la aplicación se convierta en un monolito inmanejable.

## **7. Puntos Relevantes a Recordar**

Si tuvieras que quedarte con solo cinco ideas clave de esta guía, serían estas:

1. **La Arquitectura es lo Primero:** NestJS te guía para que estructures tu código en tres pilares: **Controladores** (manejan peticiones), **Servicios** (ejecutan la lógica) y **Módulos** (organizan el código). Esta separación es la clave para crear aplicaciones mantenibles.
2. **TypeScript es tu Aliado:** Aprovecha la seguridad de tipos y los decoradores. Son el corazón de la sintaxis declarativa de NestJS y te ayudarán a escribir un código más robusto y con menos errores.
3. **La Inyección de Dependencias Simplifica Todo:** Acostúmbrate a "pedir" tus dependencias en el constructor en lugar de crearlas tú mismo. Esto hará que tu código sea más limpio, flexible y fácil de probar.
4. **El CLI es tu Mejor Amigo:** Usa `nest g resource` y otros comandos del CLI para generar código base. Acelera drásticamente el desarrollo y asegura que sigas las convenciones del framework.
5. **Las Entidades y Repositorios son el Puente a tu DB:** Cuando necesites persistencia, define tus tablas como **Entidades** de TypeORM y usa los **Repositorios** inyectados en tus servicios para interactuar con la base de datos de una forma segura y orientada a objetos.

### **8. Conclusión**

¡Lo has logrado! Has viajado desde los fundamentos teóricos de NestJS hasta la construcción de una API REST funcional, robusta y conectada a una base de datos. Has visto de primera mano cómo la arquitectura "opinada" de NestJS, lejos de ser una restricción, es en realidad una guía poderosa que fomenta las buenas prácticas, la organización y la escalabilidad desde la primera línea de código.

La verdadera belleza de NestJS no reside solo en lo que hace, sino en cómo te hace pensar. Te impulsa a separar responsabilidades, a estructurar tu lógica en módulos cohesivos y a escribir un código más limpio y fácil de probar. Las habilidades que has practicado hoy no son solo para NestJS; son principios de ingeniería de software que te harán un mejor desarrollador, sin importar el framework que uses mañana.

---

### **9. Recursos Adicionales**

El aprendizaje nunca se detiene. Para profundizar en los temas que hemos cubierto y explorar el vasto ecosistema de NestJS, te recomiendo encarecidamente que consultes las fuentes oficiales. Son tu fuente de verdad más fiable y actualizada.

- **[Documentación Oficial de NestJS](https://docs.nestjs.com/):** 📖 Tu punto de partida para cualquier duda. Es una de las mejores documentaciones que existen, con explicaciones claras y ejemplos para casi todo.
- **[Documentación Oficial de TypeORM](https://typeorm.io/):** 🗃️ Imprescindible para entender todas las opciones de configuración, decoradores de entidades y patrones de repositorio avanzados.
- **[Librería `class-validator`](https://www.google.com/search?q=%5Bhttps://github.com/typestack/class-validator%5D(https://github.com/typestack/class-validator)):** ✅ Explora la lista completa de decoradores de validación disponibles para proteger tus DTOs.

---

### **10. Sugerencias de Siguientes Pasos**

Ahora que tienes una base sólida, ¿hacia dónde puedes ir? Aquí tienes tres áreas lógicas para expandir tus conocimientos y hacer tu API aún más profesional:

1. **Implementar Autenticación y Autorización:** Ninguna aplicación real está completa sin un sistema de usuarios. Investiga cómo usar el módulo `@nestjs/passport` con estrategias como JWT (JSON Web Tokens) para proteger tus rutas y asegurarte de que solo los usuarios autorizados puedan acceder o modificar los datos.
2. **Manejo de Configuración:** En nuestro ejemplo, la configuración de la base de datos está escrita directamente en el código. En un proyecto real, esto es una mala práctica. Aprende a usar el módulo `@nestjs/config` para gestionar variables de entorno (`.env`) de forma segura y eficiente.
3. **Manejo de Errores con Filtros de Excepción:** Aunque NestJS maneja muchas excepciones por ti, a menudo querrás personalizar el formato de las respuestas de error. Aprende sobre los "Exception Filters" para capturar excepciones y devolver respuestas de error consistentes y bien formateadas a tus clientes.

---

### **11. Invitación a la Acción 💪**

La teoría es importante, pero la verdadera maestría se consigue con la práctica. Ahora te toca a ti. No dejes que este proyecto se quede solo en un tutorial completado.

**¡Experimenta!**

- Añade un nuevo campo a tu entidad `Task`, como una fecha de vencimiento (`dueDate`).
- Crea un nuevo endpoint `PATCH` para actualizar el título o la descripción de una tarea.
- Implementa la capacidad de filtrar las tareas por estado o de buscar por una palabra clave.

Toma lo que has aprendido, empieza un proyecto completamente nuevo que te apasione y aplica estos patrones. Construye, rompe, arregla y, sobre todo, diviértete en el proceso. Has dado el primer paso para dominar uno de los frameworks de backend más potentes y demandados del ecosistema Node.js.

**¡Feliz codificación!**
