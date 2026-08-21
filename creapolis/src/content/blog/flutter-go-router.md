---
title: "Navegación Eficiente en Flutter con go_router y Rutas Anidadas"
description: "La navegación es un aspecto fundamental en cualquier aplicación Flutter, ya que permite a los usuarios moverse entre diferentes pantallas o vistas de forma fluida e intuitiva. En…"
pubDate: "2024-10-27"
author: "tiagofur"
tags: ["dart", "deep linking", "desarrollo", "flutter", "estado", "go_router", "goroute", "navegación", "navegación declarativa", "nested routes", "parámetros de ruta", "redirección", "routing", "rutas", "rutas anidadas", "shellroute", "ui", "urls"]
categories: ["Mobile"]
slug: "navegacion-eficiente-en-flutter-con-go_router-y-rutas-anidadas"
originalUrl: "https://creapolis.dev/navegacion-eficiente-en-flutter-con-go_router-y-rutas-anidadas/"
draft: false
---

### Introducción a la navegación en Flutter

La navegación es un aspecto fundamental en cualquier aplicación Flutter, ya que permite a los usuarios moverse entre diferentes pantallas o vistas de forma fluida e intuitiva. En Flutter, la navegación se basa en el concepto de una **pila de rutas**, donde cada pantalla se representa como una ruta en la pila. Cuando un usuario navega a una nueva pantalla, la nueva ruta se "empuja" a la pila, y cuando regresa a la pantalla anterior, la ruta actual se "desapila".

Flutter ofrece un widget fundamental para la gestión de la navegación: **`Navigator`**. Este widget proporciona métodos para navegar entre rutas, como `push()` para agregar una nueva ruta a la pila y `pop()` para eliminar la ruta actual.

#### Navegación en apps móviles vs. Flutter web

Aunque el concepto de pila de rutas se aplica tanto a aplicaciones móviles como a aplicaciones web desarrolladas con Flutter, existen algunas diferencias clave en la forma en que se implementa la navegación:

- **Apps móviles:** En las apps móviles, la navegación generalmente se realiza mediante transiciones animadas entre pantallas. Flutter ofrece una variedad de widgets para crear transiciones personalizadas y proporcionar una experiencia de usuario atractiva.
- **Flutter web:** En las aplicaciones web, la navegación se asemeja más al comportamiento de un navegador web tradicional. Las rutas se asocian con URLs, lo que permite a los usuarios utilizar las funciones de navegación del navegador, como el botón "atrás" y la barra de direcciones. Además, es importante tener en cuenta el historial de navegación y la posibilidad de que los usuarios accedan directamente a una URL específica.

#### Limitaciones del `Navigator` por defecto

Si bien el widget `Navigator` ofrece una funcionalidad básica para la navegación, puede volverse complejo de manejar en aplicaciones con múltiples rutas y flujos de navegación complejos. Algunas de las limitaciones que podemos encontrar son:

- **Gestión manual de rutas:** Definir y gestionar las rutas manualmente puede resultar tedioso y propenso a errores, especialmente en aplicaciones grandes.
- **Dificultad para pasar datos entre pantallas:** Si bien `Navigator` permite pasar argumentos entre rutas, la gestión de estos datos puede complicarse a medida que la aplicación crece.
- **Limitaciones en la gestión del historial:** `Navigator` no ofrece un control granular sobre el historial de navegación, lo que puede dificultar la implementación de funciones como la navegación profunda o la gestión de rutas anidadas.

Para superar estas limitaciones, podemos utilizar paquetes de terceros que simplifican la gestión de la navegación en Flutter. En este artículo, nos centraremos en `go_router`, un paquete que ofrece una forma declarativa y eficiente de definir y gestionar rutas, facilitando la creación de aplicaciones con una navegación robusta y escalable.

En la siguiente sección, exploraremos en detalle las ventajas de `go_router` y cómo podemos utilizarlo para construir una aplicación de lista de tareas con una navegación eficiente y bien organizada.

### `go_router` para una navegación eficiente

Como mencionamos anteriormente, `go_router` es un paquete que simplifica la gestión de rutas en Flutter, especialmente en aplicaciones con una navegación compleja. A diferencia del `Navigator` por defecto, `go_router` ofrece un enfoque declarativo, lo que significa que definimos las rutas de nuestra aplicación de forma descriptiva, en lugar de tener que gestionarlas manualmente con `push()` y `pop()`.

#### Ventajas de usar `go_router`

- **Definición declarativa de rutas:** `go_router` permite definir las rutas utilizando una sintaxis clara y concisa, lo que facilita la lectura y el mantenimiento del código.
- **Manejo de rutas anidadas:** `go_router` simplifica la implementación de rutas anidadas, lo que es ideal para aplicaciones con jerarquías de navegación complejas.
- **Integración con la web:** `go_router` se integra perfectamente con Flutter web, generando URLs que se ajustan a las convenciones de la web y permitiendo el uso de funciones del navegador como el botón "atrás".
- **Manejo de parámetros de ruta:** `go_router` facilita la extracción y el uso de parámetros de ruta, lo que permite pasar información entre pantallas de forma eficiente.
- **Redirecciones:** `go_router` permite definir redirecciones basadas en condiciones, como el estado de autenticación del usuario o la presencia de datos específicos.

#### Implementación básica de `go_router`

Para comenzar a usar `go_router`, primero debemos agregarlo como dependencia en nuestro archivo `pubspec.yaml`:

```
dependencies:
  go_router: ^7.1.1  # O la versión más reciente
```

Luego, debemos crear una instancia de `GoRouter` y definir las rutas de nuestra aplicación. Veamos un ejemplo simple:

```
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({Key? key}) : super(key: key);

  // Definimos el GoRouter
  final _router = GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/detalles',
        builder: (context, state) => const DetallesScreen(),
      ),
    ],
  );

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () => context.go('/detalles'),
          child: const Text('Ir a Detalles'),
        ),
      ),
    );
  }
}

class DetallesScreen extends StatelessWidget {
  const DetallesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalles'),
      ),
    );
  }
}
```

En este ejemplo, hemos definido dos rutas: `/` para la pantalla principal (`HomeScreen`) y `/detalles` para la pantalla de detalles (`DetallesScreen`). Utilizamos el método `context.go()` para navegar a la ruta `/detalles` desde la pantalla principal.

En la siguiente sección, aplicaremos estos conceptos para construir nuestra aplicación de lista de tareas con `go_router` y rutas anidadas.

### Construyendo una app de lista de tareas con `go_router` y rutas anidadas

¡Manos a la obra! Ahora que ya conocemos los fundamentos de la navegación en Flutter y las ventajas de `go_router`, vamos a construir nuestra aplicación de lista de tareas. Para ello, utilizaremos rutas anidadas para mostrar los detalles de una tarea al hacer clic en ella en la lista principal. Además, incluiremos un botón flotante para agregar nuevas tareas.

#### Estructura del proyecto

Para mantener nuestro código organizado y facilitar su mantenimiento, seguiremos una estructura de carpetas basada en características:

```
lib/
  - main.dart
  - features/
    - task_list/
      - presentation/
        - screens/
          - task_list_screen.dart
          - task_details_screen.dart
        - widgets/
          - task_item.dart
      - data/
        - models/
          - task.dart
      - routes/
        - task_list_routes.dart
```

En esta estructura, la carpeta `features` contendrá las diferentes funcionalidades de nuestra aplicación. En este caso, tendremos la carpeta `task_list` para la funcionalidad de la lista de tareas. Dentro de `task_list`, tendremos carpetas para la presentación (`presentation`), los datos (`data`) y las rutas (`routes`).

#### Definiendo las rutas con `go_router`

En el archivo `task_list_routes.dart`, definiremos las rutas para nuestra funcionalidad de lista de tareas utilizando `go_router`:

```
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_app_navigation/features/task_list/presentation/screens/task_details_screen.dart';
import 'package:flutter_app_navigation/features/task_list/presentation/screens/task_list_screen.dart';

// Definimos las rutas para la lista de tareas
final taskListRoutes = GoRoute(
  path: '/',
  name: 'taskList',
  builder: (context, state) => const TaskListScreen(),
  routes: [
    GoRoute(
      path: 'details/:taskId', // Ruta anidada para los detalles de la tarea
      name: 'taskDetails',
      builder: (context, state) {
        final taskId = state.params['taskId']!;
        return TaskDetailsScreen(taskId: taskId);
      },
    ),
  ],
);
```

En este código, hemos definido dos rutas:

- **`taskList`:** La ruta principal (`/`) que muestra la lista de tareas (`TaskListScreen`).
- **`taskDetails`:** Una ruta anidada (`/details/:taskId`) que muestra los detalles de una tarea (`TaskDetailsScreen`). Observamos que la ruta incluye un parámetro `taskId` que utilizaremos para identificar la tarea a mostrar.

#### Implementando las pantallas

Ahora, vamos a implementar las pantallas `TaskListScreen` y `TaskDetailsScreen`.

**`task_list_screen.dart`:**

```
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class TaskListScreen extends StatelessWidget {
  const TaskListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lista de Tareas'),
      ),
      body: ListView.builder(
        itemCount: 10, // Número de tareas
        itemBuilder: (context, index) {
          return ListTile(
            title: Text('Tarea ${index + 1}'),
            onTap: () => context.goNamed(
              'taskDetails',
              params: {'taskId': (index + 1).toString()},
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: Implementar la navegación para agregar una nueva tarea
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

En esta pantalla, mostramos una lista de tareas utilizando `ListView.builder`. Al hacer clic en una tarea, utilizamos `context.goNamed()` para navegar a la ruta `taskDetails`, pasando el `taskId` como parámetro.

**`task_details_screen.dart`:**

```
import 'package:flutter/material.dart';

class TaskDetailsScreen extends StatelessWidget {
  final String taskId;

  const TaskDetailsScreen({Key? key, required this.taskId}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalles de la Tarea'),
      ),
      body: Center(
        child: Text('Detalles de la tarea $taskId'),
      ),
    );
  }
}
```

En esta pantalla, simplemente mostramos el `taskId` que recibimos como parámetro.

En la siguiente sección, completaremos la funcionalidad de agregar nuevas tareas y aplicaremos principios de clean code para organizar nuestro código.

### Manejo de estado y clean code

Para completar nuestra aplicación, necesitamos implementar la lógica para guardar las nuevas tareas y actualizar la lista en la pantalla principal. Para ello, utilizaremos un enfoque simple de manejo de estado con `setState` y aplicaremos principios de clean code para mantener nuestro código organizado.

**Actualizando `TaskListScreen`:**

```
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class TaskListScreen extends StatefulWidget {
  const TaskListScreen({Key? key}) : super(key: key);

  @override
  State<TaskListScreen> createState() => _TaskListScreenState();
}

class _TaskListScreenState extends State<TaskListScreen>    {
  List<String> _tasks    = []; // Lista para almacenar las tareas

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lista de Tareas'),
      ),
      body: ListView.builder(
        itemCount:    _tasks.length,
        itemBuilder: (context, index) {
          final task = _tasks[index];
          return ListTile(
            title: Text(task),   
            onTap: () => context.goNamed(
              'taskDetails',
              params: {'taskId': (index + 1).toString()},
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.goNamed('addTask'), // Navegar a la pantalla para agregar tareas
        child: const Icon(Icons.add),
      ),
    );
  }

  // Función para agregar una nueva tarea
  void _addTask(String taskName) {
    setState(() {
      _tasks.add(taskName);
    });
  }
}
```

Usa el código [con precaución.](/faq#coding)

Hemos agregado la función `_addTask` para actualizar la lista de tareas y llamar a `setState` para reconstruir la pantalla.

**Actualizando `AddTaskScreen`:**

```
// ... (código anterior) ...

ElevatedButton(
  onPressed: () {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      // Llamamos a la función _addTask en TaskListScreen
      context.read<TaskListScreen>()._addTask(_taskName);
      context.pop(); // Regresar a la lista de tareas
    }
  },
  child: const Text('Agregar'),
),

// ... (código restante) ...
```

Usa el código [con precaución.](/faq#coding)

Utilizamos `context.read()` para obtener una referencia a `TaskListScreen` y llamar a la función `_addTask` para agregar la nueva tarea.

**Mejorando la organización con clean code:**

- **Separación de responsabilidades:** Hemos separado la lógica de la navegación en `task_list_routes.dart`, la presentación en las pantallas y la gestión del estado en `TaskListScreen`.
- **Widgets reutilizables:** Podríamos crear un widget personalizado para la lista de tareas, mejorando la reusabilidad del código.
- **Manejo de estado más avanzado:** Para aplicaciones más complejas, podríamos utilizar un paquete de manejo de estado como `provider` o `riverpod`.

Con esto, hemos completado nuestra aplicación de lista de tareas con `go_router` y rutas anidadas, aplicando principios de clean code para una mejor organización. En la siguiente sección, responderemos a algunas preguntas frecuentes sobre la navegación en Flutter y el uso de `go_router`.

¡De acuerdo! Continuemos con las 5 preguntas frecuentes, los 5 puntos relevantes y algunas sugerencias de estudio para enriquecer nuestro artículo sobre navegación en Flutter.

### Preguntas y Respuestas

**1. ¿Cuál es la diferencia entre `context.go()` y `context.goNamed()` en `go_router`?**

`context.go()` navega a una ruta utilizando su **path**, mientras que `context.goNamed()` utiliza el **nombre** de la ruta. `goNamed()` es generalmente preferible porque permite una navegación más robusta, ya que si cambiamos el path de una ruta en la configuración de `go_router`, no necesitamos actualizar todas las llamadas a `goNamed()` en nuestro código.

**2. ¿Cómo puedo pasar datos adicionales a una ruta al navegar con `go_router`?**

Puedes pasar datos adicionales utilizando el parámetro `extra` en `context.go()` o `context.goNamed()`. Por ejemplo:

```
context.goNamed('taskDetails', params: {'taskId': '1'}, extra: {'isEditing': true});
```

En la pantalla de destino, puedes acceder a estos datos utilizando `state.extra`:

```
final isEditing = state.extra as bool?;
```

**3. ¿Cómo puedo manejar rutas protegidas o redirecciones basadas en condiciones con `go_router`?**

`go_router` ofrece la propiedad `redirect` en la configuración de las rutas. Esta propiedad recibe una función que te permite definir condiciones para redirigir a otra ruta. Por ejemplo, para proteger una ruta que requiere autenticación:

```
GoRoute(
  path: '/perfil',
  name: 'perfil',
  builder: (context, state) => const PerfilScreen(),
  redirect: (context, state) {
    // Redirigir a la pantalla de inicio de sesión si el usuario no está autenticado
    if (!estaAutenticado) return '/';
    return null; // No redirigir si el usuario está autenticado
  },
),
```

Usa el código [con precaución.](/faq#coding)

**4. ¿Cómo puedo acceder a los parámetros de una ruta en la pantalla de destino?**

Puedes acceder a los parámetros de la ruta utilizando `state.params`. Por ejemplo, en nuestra aplicación de lista de tareas, accedemos al `taskId` en `TaskDetailsScreen` con `state.params['taskId']`.

**5. ¿Cómo puedo personalizar las transiciones de navegación con `go_router`?**

Puedes personalizar las transiciones utilizando la propiedad `pageBuilder` en la configuración de las rutas. `pageBuilder` te permite construir un `CustomTransitionPage` con una transición personalizada. Flutter ofrece varias transiciones predefinidas, como `FadeTransition`, `SlideTransition` y `ScaleTransition`.

### Puntos Relevantes

1. **`go_router` simplifica la navegación:** Ofrece un enfoque declarativo para definir rutas, facilitando la gestión de la navegación, especialmente en aplicaciones complejas.
2. **Rutas anidadas para una mejor organización:** `go_router` facilita la implementación de rutas anidadas, lo que permite crear jerarquías de navegación claras y organizadas.
3. **Clean code para un código mantenible:** Aplicar principios de clean code, como la separación de responsabilidades y la creación de widgets reutilizables, es fundamental para mantener un código legible y escalable.
4. **Flexibilidad en la gestión de rutas:** `go_router` ofrece funciones avanzadas como redirecciones basadas en condiciones y la capacidad de pasar datos adicionales entre rutas.
5. **Integración con Flutter web:** `go_router` se integra perfectamente con Flutter web, generando URLs amigables y permitiendo el uso de funciones del navegador.

### Sugerencias de Estudio

- **Documentación oficial de `go_router`:** La documentación oficial es un excelente recurso para profundizar en las funcionalidades de `go_router`.
- **Ejemplos de `go_router`:** Explora ejemplos de código en GitHub para comprender cómo utilizar `go_router` en diferentes escenarios.
- **Artículos y tutoriales:** Busca artículos y tutoriales sobre navegación en Flutter y `go_router` para obtener diferentes perspectivas y ejemplos prácticos.
- **Cursos online:** Considera tomar cursos online sobre Flutter que cubran la navegación en profundidad.
- **Experimentación:** La mejor forma de aprender es practicando. Crea tus propias aplicaciones y experimenta con diferentes enfoques de navegación.

### Conclusión

En este artículo, hemos explorado en detalle la navegación en Flutter, desde los conceptos básicos hasta la implementación de una aplicación de lista de tareas con rutas anidadas utilizando `go_router`. Hemos visto cómo este paquete simplifica la gestión de rutas, especialmente en aplicaciones con una navegación compleja, ofreciendo un enfoque declarativo y una integración perfecta con Flutter web.

Además, hemos destacado la importancia de aplicar principios de clean code para mantener un código organizado, legible y escalable. La separación de responsabilidades, la creación de widgets reutilizables y el uso de un enfoque adecuado para el manejo de estado son cruciales para construir aplicaciones Flutter robustas y fáciles de mantener.

La navegación es un aspecto fundamental en cualquier aplicación, y dominarla es esencial para crear experiencias de usuario fluidas e intuitivas. `go_router` se presenta como una herramienta poderosa para simplificar este proceso, permitiéndonos enfocarnos en la lógica de nuestra aplicación y en la creación de interfaces atractivas.

Animamos a los lectores a seguir explorando las funcionalidades de `go_router` y a experimentar con diferentes enfoques de navegación en sus propios proyectos. La práctica constante y la búsqueda de nuevas herramientas y técnicas son claves para el crecimiento como desarrolladores Flutter.

### Recursos Adicionales

- Documentación oficial de `go_router`: <https://pub.dev/documentation/go_router/latest/>
- Ejemplos de `go_router`: <https://github.com/flutter/packages/tree/main/packages/go_router/example>
- Artículos y tutoriales sobre navegación en Flutter: <https://flutter.dev/docs/cookbook/navigation>

¡Esperamos que este artículo haya sido de utilidad!
