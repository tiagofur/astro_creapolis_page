---
title: "NestJS: Autenticación y Autorización desde Cero (JWT)"
description: "En nuestra guía anterior, construimos una API de Tareas completamente funcional con NestJS y TypeORM. ¡Un gran logro! Sin embargo, nuestra API tiene una vulnerabilidad crítica, un…"
pubDate: "2025-10-17"
author: "tiagofur"
tags: []
categories: ["Backend - NestJs"]
slug: "nestjs-autenticacion-y-autorizacion-desde-cero-jwt"
originalUrl: "https://creapolis.dev/nestjs-autenticacion-y-autorizacion-desde-cero-jwt/"
draft: false
---

## 1. **Introducción**

En nuestra [guía anterior](https://creapolis.dev/guia-completa-de-guia-completa-de-nestjs-para-desa/), construimos una API de Tareas completamente funcional con NestJS y TypeORM. ¡Un gran logro! Sin embargo, nuestra API tiene una vulnerabilidad crítica, un problema de seguridad tan grande como una puerta de castillo sin guardias: es **totalmente anónima**.

Actualmente, cualquier persona que conozca la URL de nuestra API puede crear, leer, actualizar y, lo más alarmante, **eliminar las tareas de todos los demás**. En una aplicación del mundo real, esto es impensable. Necesitamos un sistema que pueda responder a dos preguntas fundamentales:

1. **Autenticación:** ¿Quién eres? (Verificar la identidad de un usuario).
2. **Autorización:** ¿Qué tienes permitido hacer? (Verificar si ese usuario tiene permiso para realizar una acción específica, como borrar una tarea que no es suya).

Aquí es donde entra en juego la seguridad a nivel de aplicación. En este tutorial, vamos a blindar nuestra API utilizando herramientas estándar de la industria, increíblemente bien integradas en el ecosistema de NestJS:

- **Passport.js:** Es una librería de autenticación para Node.js extremadamente flexible. No impone una forma de hacer las cosas, sino que utiliza "Estrategias" modulares. Nosotros usaremos su estrategia para validar JSON Web Tokens.
- **JSON Web Tokens (JWT):** Imagínalo como un pase de acceso digital, una credencial segura y compacta que un usuario recibe al iniciar sesión. Este "pase" se enviará en cada petición para demostrar quién es, sin necesidad de enviar su contraseña una y otra vez.

**¿El objetivo final?** Vamos a transformar nuestra API de Tareas. Dejaremos de tener una lista global de tareas para convertirla en una aplicación personal y segura, donde cada usuario solo podrá gestionar sus propias tareas. ¡Prepárate para llevar tu aplicación al siguiente nivel de profesionalismo!

## **2. Cimientos de la Seguridad: Módulo de Autenticación y Entidad de Usuario**

Antes de poder registrar o loguear a un usuario, necesitamos las herramientas adecuadas y un lugar donde guardar su información. En esta sección, instalaremos las dependencias de seguridad, crearemos un módulo dedicado a la autenticación y definiremos la estructura de nuestra tabla de usuarios en la base de datos.

### **Paso 1: Instalando el Arsenal de Seguridad 📦**

NestJS se integra perfectamente con librerías estándar de la comunidad de Node.js. Para la autenticación, nuestro "arsenal" se compone de varios paquetes clave.

Abre tu terminal en la raíz del proyecto y ejecuta el siguiente comando:

Bash

```
npm install @nestjs/passport passport passport-jwt @nestjs/jwt bcrypt
npm install --save-dev @types/passport-jwt @types/bcrypt
```

Desglosemos los más importantes:

- `@nestjs/passport` y `passport`: El núcleo para manejar las estrategias de autenticación.
- `@nestjs/jwt` y `passport-jwt`: Herramientas para crear y validar los **JSON Web Tokens (JWT)**.
- `bcrypt`: Una librería fundamental para **hashear** (encriptar de forma segura) las contraseñas de los usuarios.
- Los paquetes con `@types/` son las definiciones de TypeScript para darnos un excelente autocompletado y seguridad de tipos.

### **Paso 2: Generando el Módulo de Autenticación**

Al igual que creamos un `TasksModule` para todo lo relacionado con las tareas, crearemos un `AuthModule` para encapsular toda nuestra lógica de autenticación. Esto mantiene nuestro código limpio y organizado.

Usa el CLI de NestJS para generar el módulo y el servicio:

Bash

```
nest generate module auth
nest generate service auth
```

Este comando crea una nueva carpeta `src/auth`, genera los archivos `auth.module.ts` y `auth.service.ts`, y automáticamente registra el `AuthModule` en nuestro módulo principal (`app.module.ts`). ¡Magia!

### **Paso 3: Creando la Entidad `User` 👤**

Necesitamos una tabla en nuestra base de datos para almacenar a los usuarios. Usando TypeORM, esto se traduce en crear una nueva "Entidad".

Dentro de la carpeta `src/auth`, crea una nueva carpeta llamada `entities` y, dentro de ella, un archivo llamado `user.entity.ts`:

TypeScript

```
// src/auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['username']) // Nos aseguramos de que no haya dos usuarios con el mismo nombre
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
```

Este código define una tabla `user` con tres columnas:

- `id`: Un identificador único para cada usuario.
- `username`: El nombre de usuario, que hemos marcado como **único** para evitar duplicados.
- `password`: Donde almacenaremos la contraseña del usuario.

Por último, no olvides registrar esta nueva entidad en nuestro `TypeOrmModule.forRoot` dentro de `app.module.ts` para que TypeORM la reconozca y cree la tabla.

### **Paso 4: La Regla de Oro - NUNCA Guardes Contraseñas en Texto Plano 🔑**

La columna `password` que acabamos de crear es la más sensible de toda nuestra base de datos. Si un atacante lograra acceder a ella, no debería poder leer las contraseñas de nuestros usuarios.

Aquí es donde entra el **hashing de contraseñas**.

- **¿Qué es?** Es un proceso unidireccional que convierte una contraseña (ej: `"password123"`) en una cadena de caracteres larga y aparentemente aleatoria (ej: `"$2b$10$..."`).
- **¿Por qué "unidireccional"?** Porque es computacionalmente casi imposible revertir el proceso. No se puede "des-hashear" para obtener la contraseña original.
- **¿Cómo funciona la validación?** Cuando un usuario intenta iniciar sesión, no comparamos las contraseñas directamente. En su lugar, hasheamos la contraseña que nos envía y comparamos ese nuevo hash con el que tenemos guardado en la base de datos. Si coinciden, la contraseña es correcta.

La librería **bcrypt**, que ya instalamos, es el estándar de la industria para este proceso. Nos encargaremos de implementarla en el siguiente paso, al crear nuestro servicio de registro.

## 3. El Portal de Entrada: Flujo de Registro y Login

Con nuestros cimientos listos, vamos a crear los endpoints que permitirán a los usuarios registrarse e iniciar sesión. Aquí es donde `bcrypt` y `JWT` entran en acción para asegurar nuestras credenciales y gestionar las sesiones.

### **Paso 1:** Registro (Sign-Up): Creando un Nuevo Usuario ✍️

El primer paso es permitir que los usuarios creen una cuenta. Este flujo consiste en recibir sus credenciales, asegurar la contraseña y guardarla en la base de datos.

**1. Crear el DTO de Registro**

Necesitamos un **DTO (Data Transfer Object)** para validar los datos que llegan. En `src/auth`, crea una carpeta `dto` y dentro un archivo `auth-credentials.dto.ts`.

TypeScript

```
// src/auth/dto/auth-credentials.dto.ts
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(20, { message: 'La contraseña no puede tener más de 20 caracteres.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña es muy débil. Debe contener mayúsculas, minúsculas y un número o símbolo.',
  })
  password: string;
}
```

Usamos `class-validator` para establecer reglas claras para el `username` y la `password`, incluyendo una expresión regular para asegurar una contraseña fuerte.

**2. Implementar la Lógica de Registro en `AuthService`**

Ahora, en `src/auth/auth.service.ts`, crearemos el método `signUp`. Necesitaremos inyectar el repositorio de `User`.

Primero, modifica `auth.module.ts` para que tenga acceso a la entidad `User`.

TypeScript

```
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importar la entidad User
  providers: [AuthService],
})
export class AuthModule {}
```

Ahora sí, implementamos el servicio.

TypeScript

```
// src/auth/auth.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // 1. Hashear la contraseña
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Crear el nuevo usuario
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      // 3. Guardar el usuario en la base de datos
      await this.usersRepository.save(user);
    } catch (error) {
      // Manejar el error de username duplicado
      if (error.code === '23505') { // Código de error para violación de constraint UNIQUE
        throw new ConflictException('El nombre de usuario ya existe.');
      } else {
        throw error;
      }
    }
  }
}
```

**Puntos clave:**

- **Inyección del Repositorio:** Inyectamos el `Repository<User>` para poder interactuar con la tabla de usuarios.
- **Hashing:** Usamos `bcrypt` para generar un `salt` (una cadena aleatoria para hacer el hash más seguro) y luego hashear la contraseña.
- **Manejo de Errores:** Capturamos un posible error en caso de que el `username` ya exista (gracias al `@Unique` en nuestra entidad) y devolvemos un error `409 Conflict` claro.

**3. Crear el Endpoint en `AuthController`**

Finalmente, creamos el controlador para exponer esta funcionalidad a través de una ruta HTTP.

Bash

```
nest generate controller auth
```

Y ahora, en `src/auth/auth.controller.ts`:

TypeScript

```
// src/auth/auth.controller.ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
```

¡Listo! Ya tenemos un endpoint `POST /auth/signup` que recibe credenciales, las valida y crea un nuevo usuario de forma segura.

---

### **Paso 2:** Inicio de Sesión (Login): Validando Credenciales 🔑

Una vez registrado, el usuario necesita una forma de iniciar sesión. Este flujo validará sus credenciales y, si son correctas, le devolverá un **JWT** para usarlo en futuras peticiones.

**1. Configurar el Módulo de Autenticación con JWT**

Necesitamos configurar `AuthModule` para que conozca y pueda usar el `JwtModule`.

TypeScript

```
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // Importar AuthController
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'miPalabraSecretaSuperSegura123', // ¡NUNCA pongas esto en código! Usa variables de entorno.
      signOptions: {
        expiresIn: 3600, // El token expira en 1 hora (3600 segundos)
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService],
  controllers: [AuthController], // Registrar el controlador
})
export class AuthModule {}
```

**Advertencia de Seguridad:** El `secret` es la clave con la que se firman tus tokens. Debe ser larga, compleja y **nunca** debe estar visible en el código. En una aplicación real, la cargarías desde una variable de entorno.

**2. Implementar la Lógica de Login en `AuthService`**

Añadimos el método `signIn` a nuestro `auth.service.ts`.

TypeScript

```
// src/auth/auth.service.ts
// ... (imports existentes)
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, // Inyectar JwtService
  ) {}

  // ... (método signUp)

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Si el usuario existe y la contraseña es correcta, generar el token
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }
  }
}
```

**Puntos clave:**

- **`bcrypt.compare`:** Comparamos de forma segura la contraseña enviada con el hash guardado en la DB.
- **`JwtService`:** Si la validación es exitosa, usamos `jwtService.sign()` para crear el token.
- **Payload:** El *payload* es la información que guardamos dentro del JWT. Lo mantenemos mínimo: solo el `username`, que es suficiente para identificar al usuario después.

**3. Crear el Endpoint de Login**

Finalmente, añadimos la ruta en `auth.controller.ts`.

TypeScript

```
// src/auth/auth.controller.ts
// ... (imports existentes)

@Controller('auth')
export class AuthController {
  // ... (constructor y método signUp)

  @Post('/login')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
```

¡Lo tenemos! Ahora, un usuario puede enviar una petición `POST` a `/auth/login` con sus credenciales. Si son correctas, recibirá a cambio un `accessToken`. Este token es la llave maestra que usará para acceder a las partes protegidas de nuestra API.

## 4. Levantando la Muralla: Protegiendo Endpoints con Guards y Estrategias

Hasta ahora, hemos creado un sistema para que los usuarios se registren y obtengan un token de acceso (JWT). Sin embargo, nuestra API de tareas sigue siendo completamente pública. Es el momento de usar ese token para restringir el acceso.

---

### 4.1. ¿Qué es Passport.js y cómo funciona con "Estrategias"?

Imagina que tu aplicación es un edificio seguro. **Passport.js** es el jefe de seguridad. No se encarga de revisar cada identificación personalmente, sino que contrata a especialistas para cada tipo de credencial.

Estos especialistas son las **"Estrategias"**. Hay estrategias para todo:

- Una para verificar logins con usuario y contraseña (`passport-local`).
- Una para verificar inicios de sesión con Google o Facebook (`passport-google-oauth20`).
- Y la que nos interesa: una para verificar los pases de acceso digitales, nuestros JWTs (`passport-jwt`).

Nosotros le diremos a Passport: "Para esta aplicación, contrata al especialista en JWTs. Cada vez que alguien intente entrar a una zona protegida, pídele a este especialista que valide su pase".

---

### 4.2. Creando nuestra `JwtStrategy`: El Especialista en Tokens

Nuestra `JwtStrategy` será esa clase especialista. Su única misión será:

1. Recibir el JWT enviado en la cabecera de una petición.
2. Verificar que el token sea válido (que no haya sido modificado y que no haya expirado) usando la palabra secreta que definimos.
3. Si es válido, extraer la información del usuario (el *payload*) y buscar a ese usuario en nuestra base de datos.
4. Si el usuario existe, adjuntarlo al objeto de la petición (`request`) para que podamos usarlo más adelante en nuestros controladores.

Vamos a crear el archivo `src/auth/jwt.strategy.ts`.

TypeScript

```
// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'miPalabraSecretaSuperSegura123', // ¡La misma que en auth.module!
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { username: string }): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

**Puntos Clave:**

- **`constructor()`:** Aquí configuramos a nuestro especialista. Le decimos dónde encontrar el token (`fromAuthHeaderAsBearerToken`, que busca en la cabecera `Authorization: Bearer <token>`) y le damos la clave secreta para verificarlo.
- **`validate(payload)`:** Este es el método más importante. Una vez que Passport verifica la firma del token, este método recibe el payload decodificado. Nosotros lo usamos para buscar al usuario. Lo que retornemos aquí será inyectado por NestJS en el objeto `request` de cualquier ruta protegida.

Finalmente, debemos registrar esta estrategia como un `provider` en nuestro `AuthModule`.

TypeScript

```
// src/auth/auth.module.ts
// ... (imports)
import { JwtStrategy } from './jwt.strategy';

@Module({
  // ... (imports del módulo)
  providers: [AuthService, JwtStrategy], // Añadir JwtStrategy aquí
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule], // Exportar para que otros módulos puedan usar el guard
})
export class AuthModule {}
```

**Importante:** Exportamos `JwtStrategy` y `PassportModule` para que el `AuthGuard` que usaremos en `TasksModule` pueda localizarlos y utilizarlos.

---

### 4.3. Introducción a los Guards de NestJS: Los Guardianes de la Puerta 💂

Un **Guard** en NestJS es exactamente lo que su nombre indica: un guardián que se para frente a una ruta y decide si la petición tiene permiso para continuar.

NestJS provee un `AuthGuard` que se integra a la perfección con Passport. Cuando aplicamos `AuthGuard('jwt')`, le estamos diciendo a NestJS: "Pon un guardián en esta puerta que use la estrategia JWT que acabamos de crear". El guardián ejecutará toda la lógica de nuestra `JwtStrategy` automáticamente.

---

### 4.4. Aplicando el Guard para Proteger el `TasksController`

Ahora, vamos a poner al guardián a trabajar en nuestro `TasksController`. Queremos que **todas las rutas** de tareas estén protegidas.

Simplemente necesitamos añadir un decorador a nivel de clase en `src/tasks/tasks.controller.ts`.

TypeScript

```
// src/tasks/tasks.controller.ts
import { Controller, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard()) // ¡Toda la clase está ahora protegida!
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // ... (todos los métodos GET, POST, DELETE, etc.)
}
```

¡Y eso es todo! Con una sola línea de código, hemos protegido todos los endpoints del controlador de tareas.

**¿Qué sucede ahora?**

- Si intentas hacer una petición a `GET /tasks` **sin** un token, recibirás un error `401 Unauthorized`.
- Si envías un token **inválido o expirado**, recibirás el mismo error.
- Solo si envías una petición con una cabecera `Authorization: Bearer <token_válido>` podrás acceder a los endpoints.

## **5. Autorización: "Esto es Mío y de Nadie Más"**

Hemos construido una muralla y puesto un guardia. Ahora, un usuario autenticado puede entrar, pero una vez dentro, tiene acceso a todo el castillo. La **autorización** es el siguiente nivel de seguridad: define a qué habitaciones puede entrar ese usuario. En nuestro caso, nos aseguraremos de que un usuario solo pueda ver y gestionar las tareas que él mismo ha creado.

---

### **5.1. La Conexión: Relacionando Tareas con Usuarios**

Primero, necesitamos que nuestra base de datos entienda que existe una relación entre un `User` y una `Task`. Es una relación de **"Uno a Muchos" (One-to-Many)**: un usuario puede tener muchas tareas, pero cada tarea pertenece a un único usuario.

Vamos a modificar nuestras entidades de TypeORM.

**1. Modificar la Entidad `Task`**

Añade una relación que apunte desde la tarea hacia el usuario.

TypeScript

```
// src/tasks/entities/task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

// ... (TaskStatus enum)

@Entity()
export class Task {
  // ... (id, title, description, status columns)

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
```

- **`@ManyToOne`**: Este decorador establece la relación. Le dice a TypeORM que muchas tareas pueden pertenecer a un usuario.
- **`eager: false`**: Es una optimización. Le indicamos que no cargue automáticamente la información del usuario cada vez que consultemos una tarea.

**2. Modificar la Entidad `User`**

Ahora, establecemos el otro lado de la relación.

TypeScript

```
// src/auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
@Unique(['username'])
export class User {
  // ... (id, username, password columns)

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
```

- **`@OneToMany`**: Le dice a TypeORM que un usuario puede tener un arreglo de tareas (`Task[]`).
- **`eager: true`**: Aquí sí queremos que, al cargar un usuario, se traigan todas sus tareas asociadas.

Al reiniciar la aplicación, TypeORM (gracias a `synchronize: true`) añadirá automáticamente una columna `userId` a tu tabla de tareas.

---

### **5.2. La Pertenencia: Asignando Tareas a su Dueño**

Ahora que la relación existe, debemos asegurarnos de que, cuando se crea una nueva tarea, se asigne al usuario que está actualmente logueado.

**1. Obtener el Usuario Logueado (La Forma Elegante)**

Nuestra `JwtStrategy` ya valida y recupera el objeto `User` de la base de datos, y Passport lo adjunta al objeto de la petición. Para acceder a él de forma limpia en nuestros controladores, crearemos un **decorador personalizado**.

Crea el archivo `src/auth/get-user.decorator.ts`:

TypeScript

```
// src/auth/get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './entities/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
```

**2. Modificar el Controlador y el Servicio de Tareas**

Ahora usamos este decorador en `tasks.controller.ts` para pasar el usuario al servicio.

TypeScript

```
// src/tasks/tasks.controller.ts
// ... (imports)
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User, // <-- ¡Aquí está la magia!
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }
  // ... resto de métodos
}
```

Y finalmente, en `tasks.service.ts`, aceptamos ese usuario y lo asignamos.

TypeScript

```
// src/tasks/tasks.service.ts
// ... (imports)
import { User } from '../auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user, // <-- Asignamos el dueño
    });

    await this.tasksRepository.save(task);
    return task;
  }
  // ... resto de métodos
}
```

---

### **5.3. El Filtro: Asegurando que solo veas lo tuyo**

El paso final es modificar todos los métodos que leen, actualizan o borran datos para que siempre filtren por el usuario logueado.

Vamos a actualizar el `TasksService` y el `TasksController` por completo.

**En `tasks.service.ts`:**

TypeScript

```
// src/tasks/tasks.service.ts

// ... (createTask ya está listo)

async getAllTasks(user: User): Promise<Task[]> {
  // Solo encuentra las tareas donde el usuario coincida
  return this.tasksRepository.find({ where: { user } });
}

async getTaskById(id: string, user: User): Promise<Task> {
  // Busca por ID Y por usuario para asegurar que no acceda a tareas de otros
  const found = await this.tasksRepository.findOne({ where: { id, user } });

  if (!found) {
    throw new NotFoundException(`La tarea con el ID "${id}" no fue encontrada.`);
  }
  return found;
}

async deleteTask(id: string, user: User): Promise<void> {
  const result = await this.tasksRepository.delete({ id, user });

  if (result.affected === 0) {
    throw new NotFoundException(`La tarea con el ID "${id}" no fue encontrada.`);
  }
}

async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
  const task = await this.getTaskById(id, user); // Reutilizamos la búsqueda segura
  task.status = status;
  await this.tasksRepository.save(task);
  return task;
}
```

**Y en `tasks.controller.ts` para pasar el usuario a cada método:**

TypeScript

```
// src/tasks/tasks.controller.ts

// ... (createTask ya está listo)

@Get()
getAllTasks(@GetUser() user: User): Promise<Task[]> {
  return this.tasksService.getAllTasks(user);
}

@Get('/:id')
getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
  return this.tasksService.getTaskById(id, user);
}

@Delete('/:id')
@HttpCode(204)
deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
  return this.tasksService.deleteTask(id, user);
}

@Patch('/:id/status')
updateTaskStatus(
  @Param('id') id: string,
  @Body('status') status: TaskStatus, // Aquí podríamos añadir un DTO de validación
  @GetUser() user: User,
): Promise<Task> {
  return this.tasksService.updateTaskStatus(id, status, user);
}
```

¡Misión cumplida! Ahora nuestra API no solo verifica *quién* eres (autenticación), sino también *qué te pertenece* (autorización). Un usuario solo puede interactuar con las tareas que ha creado, haciendo la aplicación segura y verdaderamente multiusuario.

## **6. Preguntas y Respuestas (FAQ)**

Aquí respondemos a las dudas más comunes que surgen al trabajar con autenticación y autorización por primera vez.

**1. ¿Cuál es la diferencia exacta entre Autenticación y Autorización?**

**Respuesta:** Es simple:

- **Autenticación** es el proceso de verificar **quién eres**. Es como mostrar tu identificación para entrar a un edificio. Nuestro flujo de `login` con usuario y contraseña es autenticación.
- **Autorización** es el proceso de verificar **qué tienes permiso para hacer** una vez que estás dentro. Es como la llave de tu oficina, que solo abre tu puerta y no la de los demás. Cuando filtramos las tareas por `userId`, estamos aplicando autorización.

---

**2. ¿Por qué usamos JWT en lugar de sesiones tradicionales con cookies?**

**Respuesta:** Los JWTs son ideales para APIs modernas y desacopladas (como las que se comunican con aplicaciones de una sola página - SPAs - o aplicaciones móviles). La razón principal es que son **stateless** (sin estado). El servidor no necesita guardar información de la sesión; toda la información necesaria (quién es el usuario) viaja dentro del propio token en cada petición. Esto facilita enormemente la escalabilidad de las aplicaciones.

---

**3. ¿Cómo manejo la expiración de un token? Mencionaste "Refresh Tokens".**

**Respuesta:** El `accessToken` que creamos tiene una vida corta (una hora en nuestro ejemplo) por seguridad. Cuando expira, el usuario tendría que volver a iniciar sesión. Para evitar esto, se usa un **Refresh Token**. Es un segundo token, de vida mucho más larga (días o semanas), que se guarda de forma segura y se usa únicamente para solicitar un nuevo `accessToken` cuando el actual caduca, manteniendo la sesión del usuario activa sin pedirle sus credenciales constantemente.

---

**4. ¿Dónde debería guardar el JWT en el frontend: `localStorage` o `cookies`?**

**Respuesta:** Este es un debate clásico.

- **`localStorage`**: Es más fácil de implementar, pero es vulnerable a ataques de Cross-Site Scripting (XSS), donde un script malicioso en la página podría robar el token.
- **`HttpOnly Cookies`**: Es la opción **más segura**. La cookie es enviada automáticamente por el navegador en cada petición, pero no puede ser accedida por JavaScript en el cliente, protegiéndola de ataques XSS. Requiere una configuración un poco más compleja en el backend para establecer la cookie.

Para empezar, `localStorage` es aceptable, pero para aplicaciones en producción, `HttpOnly Cookies` es la práctica recomendada.

---

**5. ¿Qué pasa si alguien roba un JWT?**

**Respuesta:** Si un `accessToken` es robado, el atacante puede hacerse pasar por el usuario hasta que el token expire. Por eso los `accessTokens` tienen una vida corta. Para una seguridad aún mayor, las aplicaciones pueden implementar un sistema de **lista de revocación (blocklist)**. Cuando un usuario cierra sesión, su token se añade a esta lista, y la `JwtStrategy` se modifica para comprobar no solo la validez del token, sino también si está en la lista de revocación antes de conceder el acceso.

---

## **7. Puntos Relevantes a Recordar**

Si debes quedarte con cinco ideas clave de esta guía de seguridad, que sean estas:

1. **Hashea Siempre las Contraseñas:** Es la regla número uno de la seguridad de usuarios. Nunca, bajo ninguna circunstancia, guardes una contraseña en texto plano. Usa siempre una librería robusta como `bcrypt`.
2. **JWT es tu Pase de Acceso sin Estado:** Un JWT (JSON Web Token) es la forma moderna de gestionar sesiones en APIs. Contiene la identidad del usuario y es verificado en cada petición, permitiendo que tu aplicación sea escalable.
3. **Passport y los Guards son tus Guardianes:** Passport.js maneja la lógica de autenticación a través de "Estrategias" (`JwtStrategy`), y los `AuthGuard` de NestJS son los porteros que ejecutan esa lógica para proteger tus rutas con una sola línea de código.
4. **Los Decoradores Personalizados Simplifican tu Código:** Crear un decorador como `@GetUser` es una práctica limpia y elegante en NestJS para acceder al usuario autenticado en tus controladores, manteniendo la lógica encapsulada y reutilizable.
5. **La Autorización se Basa en la Pertenencia:** La verdadera seguridad multiusuario se logra al final, cuando filtras cada consulta a la base de datos basándote en el usuario que realiza la petición (`...where: { user }`). Esto asegura que los usuarios solo puedan acceder a sus propios datos.

## **8. Conclusión**

¡Felicidades! Has realizado una de las transformaciones más críticas en el ciclo de vida de una aplicación: has pasado de tener una API abierta y vulnerable a una plataforma segura, robusta y multiusuario. El proyecto de Tareas ya no es un tablón de anuncios público, sino una aplicación personal donde los datos de cada usuario están protegidos y aislados.

Has implementado un flujo de autenticación profesional usando **JWT y Passport**, y has aprendido la diferencia fundamental entre saber *quién es* un usuario y saber *qué le pertenece*. Este conocimiento no es solo una característica más; es un pilar fundamental de la ingeniería de software moderna. Entender cómo proteger los datos y controlar el acceso te distingue como un desarrollador consciente de la seguridad y listo para construir aplicaciones del mundo real.

---

## **9. Recursos Adicionales**

Este es solo el comienzo de tu viaje en la seguridad de aplicaciones. Para profundizar, la documentación oficial es siempre tu mejor aliada.

- **[Documentación de Autenticación en NestJS](https://docs.nestjs.com/security/authentication):** 🛡️ La guía oficial que cubre la integración con Passport.js y los conceptos que hemos visto.
- **[Documentación sobre Guards](https://docs.nestjs.com/guards):** 💂‍♂️ Aprende más sobre cómo funcionan los guardianes de rutas y cómo puedes crear lógicas de autorización más complejas.
- **[Librería `@nestjs/jwt`](https://www.google.com/search?q=%5Bhttps://github.com/nestjs/jwt%5D(https://github.com/nestjs/jwt)):** 🔑 Explora todas las opciones de configuración para la firma y verificación de tokens.

---

## **10. Sugerencias de Siguientes Pasos**

Ahora que dominas la autenticación básica, ¿cuál es el siguiente nivel? Aquí tienes tres ideas para convertirte en un experto en seguridad con NestJS:

1. **Implementar Autorización Basada en Roles (RBAC):** Añade una propiedad `role` (ej: `'admin'`, `'user'`) a tu entidad `User`. Luego, crea un `RolesGuard` personalizado que proteja ciertas rutas (como un panel de administración) para que solo los usuarios con el rol de `admin` puedan acceder.
2. **Añadir un Flujo de Refresh Tokens:** Como mencionamos en el FAQ, los `accessTokens` de corta duración son seguros pero inconvenientes. Investiga cómo implementar un endpoint `/auth/refresh` que reciba un **Refresh Token** de larga duración y devuelva un nuevo `accessToken`, manteniendo al usuario logueado de forma transparente y segura.
3. **Integrar Login Social con OAuth2:** Permite que tus usuarios se registren e inicien sesión con un solo clic usando sus cuentas de Google, GitHub o Facebook. Investiga cómo añadir nuevas estrategias de Passport (`passport-google-oauth20`, por ejemplo) a tu aplicación.

---

## **11. Invitación a la Acción 💪**

Has completado la guía, pero el verdadero aprendizaje comienza ahora. La mejor manera de consolidar estas habilidades es aplicándolas.

**¡Ahora es tu turno!**

No te detengas aquí. Toma el código que hemos construido y hazlo tuyo. Intenta implementar una de las sugerencias anteriores. Añade un campo "nombre completo" al perfil del usuario. Crea un endpoint `/auth/me` que devuelva la información del perfil del usuario logueado.

La seguridad es un campo fascinante y esencial. Al construir tus propias aplicaciones con estas bases, no solo estarás creando software funcional, sino también software fiable y digno de confianza.

**¡Feliz codificación segura!**
