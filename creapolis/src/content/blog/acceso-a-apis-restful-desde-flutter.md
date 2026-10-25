---
title: "Acceso a APIs RESTful desde Flutter"
description: "El acceso a APIs RESTful desde Flutter es una habilidad esencial para cualquier desarrollador que desee crear aplicaciones que interactúen con servidores, ya sea para obtener…"
pubDate: "2024-09-19"
author: "tiagofur"
tags: ["mobile", "backend", "dart", "desktop", "web", "flutter"]
categories: ["Mobile"]
slug: "acceso-a-apis-restful-desde-flutter"
originalUrl: "https://creapolis.dev/acceso-a-apis-restful-desde-flutter/"
draft: false
---

### 1. Introducción a las APIs RESTful

El acceso a APIs RESTful desde Flutter es una habilidad esencial para cualquier desarrollador que desee crear aplicaciones que interactúen con servidores, ya sea para obtener datos o enviar información. En esta guía, te mostraré cómo consumir y mostrar datos de APIs utilizando Flutter, y cómo manejar errores, loaders, y caching para mejorar la experiencia del usuario.

### 2. ¿Qué es una API RESTful y cómo funciona?

Una API (Application Programming Interface) RESTful es un conjunto de reglas que permiten la comunicación entre un cliente (tu aplicación Flutter) y un servidor. Las APIs RESTful siguen el protocolo HTTP y permiten realizar las operaciones CRUD (Crear, Leer, Actualizar y Eliminar) mediante los métodos HTTP como GET, POST, PUT, DELETE, entre otros.

#### Características clave de una API RESTful:

- **Sin estado:** Cada solicitud del cliente contiene toda la información necesaria para entender la solicitud.
- **Escalabilidad:** Permite múltiples clientes interactuando simultáneamente.
- **Caché:** Las respuestas pueden ser almacenadas en caché para mejorar el rendimiento.

### 3. Conceptos básicos de Flutter

Antes de sumergirnos en la implementación, repasemos algunos conceptos clave de Flutter:

- **Widgets:** Todo en Flutter es un widget, ya sea un botón, un texto o incluso una pantalla.
- **StatefulWidget:** Para manejar el estado, usaremos widgets con estado que permiten actualizar la interfaz de usuario en función de los datos que obtenemos de las APIs.
- **Paquetes:** Flutter tiene una amplia gama de paquetes disponibles en `pub.dev` que nos ayudan a integrar funcionalidades adicionales como el acceso a APIs.

### 4. Paquetes populares para el consumo de APIs en Flutter

Para interactuar con APIs en Flutter, los paquetes más comunes son `http` y `dio`. Ambos son herramientas poderosas y populares que simplifican el proceso de realizar peticiones HTTP.

#### http

El paquete `http` es simple y fácil de usar. Te permite hacer peticiones HTTP, y manejar los datos de las respuestas de manera eficiente.

#### dio

El paquete `dio` es más avanzado y cuenta con características adicionales como la gestión automática de cookies, interceptores para manejar peticiones y respuestas, y soporte para multipart/form-data (ideal para subir archivos).

### 5. Preparación del proyecto

Antes de comenzar, asegúrate de tener Flutter instalado. Si no lo has hecho, puedes seguir la guía oficial aquí. Luego, crea un nuevo proyecto ejecutando:

```
flutter create consumo_api
cd consumo_api
```

Ahora, abre el archivo `pubspec.yaml` y añade las dependencias:

```
dependencies:
  http: ^0.13.4
  dio: ^5.0.2
```

Ejecuta el comando `flutter pub get` para descargar las dependencias.

### 6. Configuración del paquete http

#### Realizando una petición GET con http

El método GET se utiliza para obtener datos de la API. En Flutter, puedes usar el paquete `http` para realizar una petición GET de la siguiente manera:

```
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<List<dynamic>> fetchUsers() async {
  final response = await http.get(Uri.parse('https://jsonplaceholder.typicode.com/users'));

  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  } else {
    throw Exception('Error al cargar los usuarios');
  }
}
```

#### Realizando una petición POST con http

El método POST se utiliza para enviar datos al servidor. Aquí hay un ejemplo:

```
Future<http.Response> createUser(String name, String email) {
  return http.post(
    Uri.parse('https://jsonplaceholder.typicode.com/users'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'name': name,
      'email': email,
    }),
  );
}
```

### 7. Configuración del paquete dio

#### Realizando una petición GET con dio

El paquete `dio` permite realizar peticiones de una manera más avanzada. Aquí te muestro cómo hacer una petición GET:

```
import 'package:dio/dio.dart';

Future<List<dynamic>> fetchUsersDio() async {
  Dio dio = Dio();
  final response = await dio.get('https://jsonplaceholder.typicode.com/users');

  if (response.statusCode == 200) {
    return response.data;
  } else {
    throw Exception('Error al cargar los usuarios');
  }
}
```

#### Realizando una petición POST con dio

Para realizar una petición POST con `dio`, sigue este ejemplo:

```
Future<Response> createUserDio(String name, String email) {
  Dio dio = Dio();
  return dio.post(
    'https://jsonplaceholder.typicode.com/users',
    data: {
      'name': name,
      'email': email,
    },
  );
}
```

### 8. Manejo de errores

#### Errores comunes en el consumo de APIs

Al consumir APIs, es común encontrarse con errores como:

- **404 Not Found:** Cuando la URL de la API no es válida.
- **500 Internal Server Error:** Problemas en el servidor.
- **Timeouts:** La conexión tarda demasiado.

#### Implementación de try-catch

Para manejar estos errores, es recomendable utilizar bloques `try-catch`:

```
try {
  final response = await http.get(Uri.parse('https://jsonplaceholder.typicode.com/users'));
} catch (e) {
  print('Error: $e');
}
```

### 9. Mostrando datos en la UI

#### ListView y GridView

Los datos obtenidos de una API pueden mostrarse en una lista utilizando un `ListView` o un `GridView` en Flutter.

```
ListView.builder(
  itemCount: users.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(users[index]['name']),
      subtitle: Text(users[index]['email']),
    );
  },
);
```

#### Manejo de estados con FutureBuilder

El widget `FutureBuilder` permite manejar el estado de las peticiones asíncronas:

```
FutureBuilder<List<dynamic>>(
  future: fetchUsers(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return CircularProgressIndicator();
    } else if (snapshot.hasError) {
      return Text('Error: ${snapshot.error}');
    } else {
      return ListView.builder(
        itemCount: snapshot.data!.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(snapshot.data![index]['name']),
            subtitle: Text(snapshot.data![index]['email']),
          );
        },
      );
    }
  },
);
```

### 10. Manejo de Loaders y Spinners

Mientras se espera la respuesta de la API, es buena práctica mostrar un `loader` o `spinner` para indicar al usuario que la aplicación está procesando. Utiliza `CircularProgressIndicator()` dentro de un `FutureBuilder` para este propósito.

### 11. Caching de datos

El caching es importante para evitar hacer peticiones repetidas a la API, mejorando así el rendimiento de la app.

#### Cacheando respuestas API

Puedes implementar caching almacenando los datos obtenidos de la API en el almacenamiento local.

#### Uso del paquete shared\_preferences

El paquete `shared_preferences` permite guardar pequeños datos como preferencias del usuario o respuestas de APIs. Aquí un ejemplo básico:

```
import 'package:shared_preferences/shared_preferences.dart';

void saveData(String data) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  prefs.setString('apiData', data);
}

String? loadData() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  return prefs.getString('apiData');
}
```

### 12. Mejores prácticas en el consumo de APIs

- Usa siempre `try-catch` para manejar errores.
- Implementa loaders para mejorar la experiencia de usuario.
- Evita hacer múltiples peticiones seguidas a la misma API utilizando caching.
- Mantén separada la lógica de la UI para un código más limpio y fácil de mantener.

### 13. Preguntas frecuentes

1. **¿Es necesario usar siempre un paquete como `http` o `dio`?** Sí, estos paquetes gestionan las complejidades del protocolo HTTP.
2. **¿Cómo manejar errores cuando la API no está disponible?** Utiliza bloques `try-catch` para capturar y gestionar los errores.
3. **¿Puedo hacer peticiones a APIs en segundo plano?** Sí, puedes usar `Isolates` o `compute` para manejar tareas en segundo plano.
4. **¿Cómo optimizo el consumo de APIs en una aplicación grande?** Usa técnicas como la paginación y el caching de datos.
5. **¿Cuál es la diferencia entre `http` y `dio`?** `dio` ofrece características adicionales como interceptores, manejo avanzado de errores y soporte para multipart.

### 14. Puntos clave

- Utiliza los paquetes `http` y `dio` para consumir APIs en Flutter.
- Maneja los errores adecuadamente utilizando bloques `try-catch`.
- Muestra loaders mientras los datos se están cargando.
- Implementa caching para mejorar el rendimiento de tu aplicación.
- Mantén tu código organizado separando la lógica de negocio de la UI.

### 15. Conclusión

Consumir y mostrar datos de APIs RESTful en Flutter es una habilidad fundamental para crear aplicaciones modernas y dinámicas. Con los paquetes `http` y `dio`, puedes realizar peticiones a servidores y manejar respuestas de manera eficiente. Recuerda siempre manejar errores, mostrar loaders mientras se cargan los datos, e implementar técnicas de caching para optimizar el rendimiento de tu aplicación.

### 16. Bibliografía

1. MARTIN, Robert C. *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall, 2008.
2. LAKOS, John. *Large-Scale C++ Software Design*. Addison-Wesley, 1996.
3. FREEMAN, Eric. *Head First Design Patterns*. O'Reilly Media, 2004.
