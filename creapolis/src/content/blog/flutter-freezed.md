---
title: "Freezed: El Arma Secreta para Modelos Inmutables y JSON en Flutter"
description: "https://spotifyanchor-web.app.link/e/Pq0VNQRPoOb"
pubDate: "2024-11-06"
author: "tiagofur"
tags: ["tutorial", "build_runner", "arquitectura", "copywith", "dart", "data classes", "desarrollo", "deserialización", "flutter", "freezed", "ia", "inmutabilidad", "json", "json_serializable", "modelos de datos", "serialización", "union types"]
categories: ["Mobile"]
slug: "freezed-el-arma-secreta-para-modelos-inmutables-y-json-en-flutter"
originalUrl: "https://creapolis.dev/freezed-el-arma-secreta-para-modelos-inmutables-y-json-en-flutter/"
draft: false
---

https://spotifyanchor-web.app.link/e/Pq0VNQRPoOb

### Introducción: El Poder de la Inmutabilidad y la Elegancia de Freezed

En el mundo del desarrollo de software, la inmutabilidad se ha convertido en un pilar fundamental para construir aplicaciones robustas, predecibles y fáciles de mantener. Y en el ecosistema Flutter, Freezed emerge como una herramienta excepcional que nos permite abrazar este paradigma de forma elegante y eficiente.

Pero, ¿qué es exactamente la inmutabilidad y por qué es tan importante? En esencia, la inmutabilidad se refiere a la creación de objetos que, una vez inicializados, no pueden ser modificados. Esto contrasta con el enfoque tradicional de la programación orientada a objetos, donde los objetos son mutables y sus propiedades pueden cambiar a lo largo del tiempo.

La inmutabilidad trae consigo una serie de beneficios significativos:

- **Predictibilidad:** Al no poder ser modificados, los objetos inmutables se comportan de manera consistente, lo que facilita la comprensión y el razonamiento sobre el código.
- **Concurrencia:** La inmutabilidad elimina los problemas de condición de carrera que pueden surgir en entornos concurrentes, donde múltiples hilos acceden y modifican un mismo objeto.
- **Depuración:** Rastrear errores se vuelve más sencillo cuando sabemos que los objetos no cambian inesperadamente.
- **Mantenibilidad:** El código que utiliza objetos inmutables es más fácil de entender, modificar y extender, lo que reduce el tiempo y el esfuerzo de mantenimiento.

Freezed, una librería construida sobre la base de la generación de código, nos proporciona una forma concisa y declarativa de crear clases inmutables en Dart. Con Freezed, podemos definir nuestros modelos de datos de forma clara y concisa, y la librería se encarga de generar automáticamente el código necesario para hacerlos inmutables, junto con una serie de funcionalidades adicionales que simplifican el desarrollo.

**¿Qué nos ofrece Freezed?**

- **Inmutabilidad sin complicaciones:** Freezed se encarga de generar todo el código boilerplate necesario para hacer que tus clases sean inmutables, liberándote de esa tarea tediosa.
- **Generación de código:** Freezed utiliza `build_runner` para generar código automáticamente, lo que te ahorra tiempo y esfuerzo.
- **Manejo de estados:** Freezed se integra perfectamente con `StateNotifier` y `Riverpod`, facilitando la gestión de estados en tus aplicaciones Flutter.
- **Unión de tipos (Unions):** Freezed te permite definir uniones de tipos, lo que es ideal para modelar diferentes estados o variantes de un objeto.
- **Serialización/Deserialización:** Freezed simplifica la conversión entre objetos y JSON, lo que es crucial para interactuar con APIs.
- **y mucho más:** Freezed ofrece muchas otras funcionalidades, como la copia y modificación de objetos inmutables con `copyWith`, validación de datos, y la posibilidad de personalizar la generación de código.

En este artículo, nos adentraremos en el mundo de la programación funcional con Freezed, explorando sus características, beneficios y cómo utilizarlo para crear aplicaciones Flutter más robustas y mantenibles. ¡Prepárate para un viaje fascinante!

### Conceptos Clave de la Programación Funcional en Dart

Antes de sumergirnos en el mundo de Freezed, es esencial comprender algunos conceptos fundamentales de la programación funcional en Dart. Estos conceptos son la base sobre la que se construye Freezed y te ayudarán a apreciar plenamente su poder y elegancia.

**1. Inmutabilidad: La Piedra Angular**

Como ya mencionamos en la introducción, la inmutabilidad se refiere a la creación de objetos que no pueden ser modificados después de su creación. En Dart, podemos lograr la inmutabilidad utilizando la palabra clave `final` para declarar variables y los constructores `const` para crear objetos inmutables.

**Ejemplo:**

Dart

```
final nombre = 'Ana';
const edad = 30;

// Intentar modificar las variables resultará en un error
nombre = 'Juan'; // Error!
edad = 40; // Error!
```

**Beneficios de la inmutabilidad:**

- **Predictibilidad:** Los objetos inmutables siempre mantienen el mismo estado, lo que facilita el razonamiento sobre el código.
- **Seguridad:** La inmutabilidad previene modificaciones accidentales, lo que reduce la posibilidad de errores.
- **Concurrencia:** Los objetos inmutables son seguros para usar en entornos concurrentes, ya que no hay riesgo de que múltiples hilos los modifiquen simultáneamente.

**2. Funciones Puras: Predictibilidad y Reusabilidad**

Una función pura es aquella que, dado un conjunto de entradas, siempre produce la misma salida, sin efectos secundarios. Esto significa que una función pura no modifica ningún estado externo ni depende de él.

**Ejemplo:**

Dart

```
int sumar(int a, int b) {
  return a + b;
}
```

La función `sumar` es pura porque siempre devuelve el mismo resultado para los mismos valores de `a` y `b`, sin modificar ningún estado externo.

**Beneficios de las funciones puras:**

- **Facilidad de prueba:** Las funciones puras son fáciles de probar, ya que su comportamiento es predecible.
- **Reusabilidad:** Las funciones puras se pueden reutilizar en diferentes partes del código sin preocuparse por efectos secundarios no deseados.
- **Composición:** Las funciones puras se pueden componer para crear funciones más complejas, lo que promueve la modularidad y la reutilización del código.

**3. Clases Abstractas y Métodos Factory: La Base de Freezed**

Las clases abstractas en Dart son clases que no se pueden instanciar directamente. En su lugar, se utilizan como plantillas para crear subclases. Los métodos factory son métodos especiales que se utilizan para crear instancias de una clase.

Freezed utiliza clases abstractas y métodos factory para generar clases inmutables. Al definir una clase abstracta con Freezed, la librería genera automáticamente una subclase concreta con un constructor factory que se encarga de crear instancias inmutables.

**Ejemplo:**

Dart

```
@freezed
class Usuario with _$Usuario {
  const factory Usuario({required String nombre, required int edad}) = _Usuario;
}
```

En este ejemplo, `Usuario` es una clase abstracta definida con Freezed. La librería generará una subclase `_Usuario` con un constructor factory que crea instancias inmutables de `Usuario`.

**En resumen:**

La inmutabilidad, las funciones puras y las clases abstractas con métodos factory son conceptos clave en la programación funcional en Dart. Freezed aprovecha estos conceptos para simplificar la creación de clases inmutables, promoviendo un código más limpio, predecible y mantenible.

### Freezed en Acción: Creando Models Inmutables

¡Es hora de poner manos a la obra y ver a Freezed en acción! En esta sección, aprenderemos cómo utilizar esta poderosa librería para crear modelos inmutables en nuestras aplicaciones Flutter.

**1. Instalación y Configuración**

Primero, debemos agregar las dependencias necesarias a nuestro proyecto `pubspec.yaml`:

YAML

```
dependencies:
  freezed_annotation: ^2.2.0 
  flutter:
    sdk: flutter

dev_dependencies:
  freezed: ^2.2.0
  build_runner: ^2.2.0
```

Luego, ejecutamos el siguiente comando en la terminal para instalar las dependencias:

Bash

```
flutter pub get
```

**2. Definiendo nuestros primeros modelos con Freezed**

Para crear un modelo inmutable con Freezed, simplemente debemos definir una clase abstracta y anotarla con `@freezed`. Dentro de la clase, definimos los atributos del modelo utilizando la palabra clave `factory` y el constructor `const`.

**Ejemplo: Un modelo simple para un libro**

Dart

```
import 'package:freezed_annotation/freezed_annotation.dart';

part 'libro.freezed.dart';

@freezed
class Libro with _$Libro {
  const factory Libro({
    required String titulo,
    required String autor,
    required int anioPublicacion,
  }) = _Libro;
}
```

En este ejemplo, hemos definido un modelo `Libro` con tres atributos: `titulo`, `autor` y `anioPublicacion`. La anotación `@freezed` indica a Freezed que debe generar el código necesario para hacer que esta clase sea inmutable. La línea `part 'libro.freezed.dart';` es necesaria para que Freezed pueda generar el código en un archivo separado.

**3. Generando código con Freezed: `build_runner` al rescate**

Una vez que hemos definido nuestro modelo, necesitamos ejecutar `build_runner` para que Freezed genere el código inmutable. Para ello, ejecutamos el siguiente comando en la terminal:

Bash

```
flutter pub run build_runner build
```

Este comando generará un archivo `libro.freezed.dart` que contendrá la implementación inmutable de la clase `Libro`.

**4. Unión de tipos (Unions): Modelando diferentes estados**

Freezed también nos permite definir uniones de tipos, lo que es muy útil para modelar diferentes estados o variantes de un objeto.

**Ejemplo: Un modelo para el estado de una conexión de red**

Dart

```
@freezed
class EstadoConexion with _$EstadoConexion {
  const factory EstadoConexion.conectado() = Conectado;
  const factory EstadoConexion.desconectado() = Desconectado;
  const factory EstadoConexion.cargando() = Cargando;
}
```

En este ejemplo, `EstadoConexion` puede estar en tres estados diferentes: `Conectado`, `Desconectado` o `Cargando`. Freezed generará el código necesario para manejar estas diferentes variantes.

**5. Ejemplo práctico: Creando un modelo de usuario**

Veamos un ejemplo más completo de cómo crear un modelo de usuario con Freezed:

Dart

```
import 'package:freezed_annotation/freezed_annotation.dart';

part 'usuario.freezed.dart';

@freezed
class Usuario with _$Usuario {
  const factory Usuario({
    required String nombre,
    required String correoElectronico,
    int? edad,
    @Default([]) List<String> roles,
  }) = _Usuario;
}
```

En este ejemplo, el modelo `Usuario` tiene los atributos `nombre`, `correoElectronico`, `edad` (opcional) y `roles` (una lista de strings con un valor por defecto vacío).

**¡Y eso es todo!** Con estos sencillos pasos, hemos creado un modelo inmutable con Freezed. En la siguiente sección, veremos cómo podemos utilizar Freezed para serializar y deserializar datos JSON.

### Freezed y JSON: Una Combinación Poderosa

En el desarrollo moderno de aplicaciones Flutter, es común interactuar con APIs que devuelven datos en formato JSON. Freezed, además de simplificar la creación de modelos inmutables, también nos proporciona una forma elegante y eficiente de serializar y deserializar datos JSON.

**1. Serialización y Deserialización con Freezed**

Para habilitar la serialización y deserialización JSON en nuestros modelos Freezed, necesitamos agregar la dependencia `json_serializable` a nuestro proyecto y usar la anotación `@JsonSerializable` en nuestras clases.

**Ejemplo:**

Dart

```
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:json_annotation/json_annotation.dart';

part 'usuario.freezed.dart';
part 'usuario.g.dart'; // Nuevo archivo para la serialización JSON

@freezed
@JsonSerializable() // Anotamos la clase con @JsonSerializable
class Usuario with _$Usuario {
  const factory Usuario({
    required String nombre,
    required String correoElectronico,
    int? edad,
    @Default([]) List<String> roles,
  }) = _Usuario;

  factory Usuario.fromJson(Map<String, dynamic> json) => _$UsuarioFromJson(json);
}
```

Hemos agregado `@JsonSerializable()` a la definición de la clase `Usuario` y la línea `part 'usuario.g.dart';` para indicar que se generará un nuevo archivo con el código de serialización.

**2. Generando el código de serialización**

Para generar el código de serialización, debemos ejecutar el siguiente comando en la terminal:

Bash

```
flutter pub run build_runner build
```

Esto generará el archivo `usuario.g.dart` con las funciones `fromJson` y `toJson` que nos permitirán convertir entre objetos `Usuario` y JSON.

**3. `fromJson` y `toJson`: Convirtiendo entre JSON y objetos**

Ahora podemos usar las funciones generadas para serializar y deserializar nuestros modelos:

Dart

```
// Deserializar un objeto Usuario desde JSON
final json = '{"nombre": "Ana", "correoElectronico": "ana@ejemplo.com", "edad": 30}';
final usuario = Usuario.fromJson(jsonDecode(json));

// Serializar un objeto Usuario a JSON
final usuarioJson = jsonEncode(usuario.toJson());
```

**4. Manejo de errores en la serialización/deserialización**

Es importante tener en cuenta que la serialización y deserialización pueden fallar si el JSON no tiene la estructura esperada. Podemos usar bloques `try-catch` para manejar estos errores:

Dart

```
try {
  final usuario = Usuario.fromJson(jsonDecode(json));
} catch (e) {
  // Manejar el error de deserialización
  print('Error al deserializar el JSON: $e');
}
```

**5. Ejemplo práctico: Consumiendo una API REST**

Veamos un ejemplo de cómo usar Freezed y `json_serializable` para consumir una API REST y mapear la respuesta a un modelo:

Dart

```
import 'package:http/http.dart' as http;

Future<Usuario> obtenerUsuario(int id) async {
  final respuesta = await http.get(Uri.parse('https://api.ejemplo.com/usuarios/$id'));

  if (respuesta.statusCode == 200) {
    return Usuario.fromJson(jsonDecode(respuesta.body));
  } else {
    throw Exception('Error al obtener el usuario');
  }
}
```

En este ejemplo, la función `obtenerUsuario` realiza una petición a una API REST y utiliza `Usuario.fromJson` para convertir la respuesta JSON en un objeto `Usuario`.

**En resumen:**

Freezed, en combinación con `json_serializable`, simplifica enormemente el proceso de serializar y deserializar datos JSON en nuestras aplicaciones Flutter. Al automatizar la generación de código, Freezed nos permite enfocarnos en la lógica de nuestra aplicación, mientras que `json_serializable` se encarga de la conversión entre JSON y nuestros modelos.

### Freezed: Más Allá de lo Básico

Freezed no se limita solo a la creación de modelos inmutables y la serialización JSON. Esta poderosa librería ofrece un conjunto de funcionalidades avanzadas que pueden llevar tus habilidades de desarrollo en Flutter al siguiente nivel.

**1. Copiar y modificar objetos inmutables con `copyWith`**

Uno de los mayores beneficios de Freezed es la capacidad de copiar y modificar objetos inmutables de forma sencilla y eficiente. La función `copyWith` generada automáticamente por Freezed te permite crear una nueva instancia de un objeto inmutable con algunas propiedades modificadas, sin alterar el objeto original.

**Ejemplo:**

Dart

```
final usuario = Usuario(nombre: 'Ana', correoElectronico: 'ana@ejemplo.com', edad: 30);

// Crear una nueva instancia con la edad modificada
final usuarioActualizado = usuario.copyWith(edad: 31); 

print(usuario.edad); // 30
print(usuarioActualizado.edad); // 31
```

En este ejemplo, `usuarioActualizado` es una nueva instancia de `Usuario` con la edad modificada a 31, mientras que el `usuario` original permanece inalterado.

**2. Validación de datos con Freezed**

Freezed te permite agregar validaciones a tus modelos para asegurar la integridad de los datos. Puedes usar anotaciones como `@Assert` para especificar reglas de validación.

**Ejemplo:**

Dart

```
@freezed
class Usuario with _$Usuario {
  const factory Usuario({
    required String nombre,
    required String correoElectronico,
    @Assert('edad > 18') int? edad, 
  }) = _Usuario;
}
```

En este ejemplo, la anotación `@Assert('edad > 18')` asegura que la edad del usuario sea mayor a 18. Si se intenta crear un `Usuario` con una edad menor a 18, se lanzará una excepción.

**3. Integración con otros paquetes**

Freezed se integra fluidamente con otros paquetes del ecosistema Flutter, como `json_serializable` (como ya vimos) y `flutter_bloc`. Esta integración facilita la creación de aplicaciones robustas y escalables.

**4. Patrones de diseño con Freezed**

Freezed puede ser utilizado para implementar diferentes patrones de diseño, como el patrón Factory o el patrón Builder. Esto te permite escribir código más modular, reutilizable y mantenible.

**Ejemplo: Patrón Factory con Freezed**

Dart

```
@freezed
class Forma with _$Forma {
  const factory Forma.circulo({required double radio}) = Circulo;
  const factory Forma.rectangulo({required double ancho, required double alto}) = Rectangulo;

  double calcularArea() {
    return when(
      circulo: (radio) => 3.14159 * radio * radio,
      rectangulo: (ancho, alto) => ancho * alto,
    );
  }
}
```

En este ejemplo, `Forma` es una clase abstracta con dos subclases: `Circulo` y `Rectangulo`. El método `calcularArea` utiliza el método `when` de Freezed para calcular el área de la forma específica.

**En resumen:**

Freezed ofrece un conjunto de funcionalidades avanzadas que van más allá de la simple creación de modelos inmutables. `copyWith`, validación de datos, integración con otros paquetes y la posibilidad de implementar patrones de diseño hacen de Freezed una herramienta indispensable para cualquier desarrollador Flutter que busque escribir código de alta calidad.

### Preguntas y Respuestas

**1. ¿Cómo puedo manejar campos opcionales en mis modelos con Freezed?**

Para manejar campos opcionales en tus modelos Freezed, simplemente agrega un signo de interrogación (`?`) después del tipo de dato en la definición del atributo.

Dart

```
@freezed
class Usuario with _$Usuario {
  const factory Usuario({
    required String nombre,
    required String correoElectronico,
    int? edad, // Campo opcional
  }) = _Usuario;
}
```

**2. ¿Cuál es la diferencia entre `@freezed` y `@unfreezed`?**

`@freezed` se utiliza para generar clases inmutables, mientras que `@unfreezed` genera clases mutables. En general, se recomienda usar `@freezed` para aprovechar los beneficios de la inmutabilidad.

**3. ¿Cómo puedo personalizar la generación de código de Freezed?**

Puedes personalizar la generación de código de Freezed utilizando anotaciones como `@Freezed(copyWith: true, equal: true)` para habilitar o deshabilitar la generación de métodos `copyWith` y `equal`. También puedes usar la opción `unionKey` para cambiar el nombre de la clave utilizada para las uniones.

**4. ¿Freezed es adecuado para cualquier tipo de proyecto Flutter?**

Freezed es una excelente opción para la mayoría de los proyectos Flutter, especialmente aquellos que se benefician de la inmutabilidad, como aplicaciones con una lógica compleja o que manejan grandes cantidades de datos. Sin embargo, para proyectos muy pequeños, la sobrecarga de configuración de Freezed podría no ser justificada.

**5. ¿Qué alternativas existen a Freezed?**

Existen algunas alternativas a Freezed, como `built_value` y `equatable`. Sin embargo, Freezed se destaca por su sintaxis concisa, su integración con `json_serializable` y su capacidad para generar uniones de tipos.

### Puntos Relevantes

- Freezed simplifica la creación de modelos inmutables en Flutter.
- La inmutabilidad mejora la predictibilidad y la mantenibilidad del código.
- Freezed facilita la serialización y deserialización de datos JSON.
- `copyWith` permite modificar objetos inmutables de forma eficiente.
- Freezed ofrece funcionalidades avanzadas como validación de datos y patrones de diseño.

### Conclusión: Abrazando la Inmutabilidad con Freezed

A lo largo de este artículo, hemos explorado el poder de Freezed para crear aplicaciones Flutter más robustas, mantenibles y escalables. Freezed, con su enfoque en la inmutabilidad y la generación de código, nos libera de la tediosa tarea de escribir código boilerplate y nos permite concentrarnos en la lógica esencial de nuestra aplicación.

La inmutabilidad, como hemos visto, ofrece una serie de beneficios cruciales, como la predictibilidad, la seguridad en entornos concurrentes y la facilidad de depuración. Freezed facilita la adopción de este paradigma en nuestros proyectos Flutter, simplificando la creación de modelos inmutables y proporcionando herramientas para su manejo eficiente.

Desde la creación de modelos simples hasta la serialización JSON, el manejo de diferentes estados con uniones y la copia y modificación de objetos con `copyWith`, Freezed se posiciona como una herramienta indispensable en el arsenal de cualquier desarrollador Flutter.

Te invito a explorar más a fondo Freezed y la programación funcional en Dart. Experimenta con las funcionalidades avanzadas que ofrece, como la validación de datos y la implementación de patrones de diseño. ¡Las posibilidades son infinitas!

### Recursos Adicionales

- **Documentación oficial de Freezed:** [https://pub.dev/packages/freezed](https://www.google.com/url?sa=E&source=gmail&q=https://pub.dev/packages/freezed)
- **Ejemplos de Freezed:** [se quitó una URL no válida]
- **Artículo sobre programación funcional en Dart:** [se quitó una URL no válida]

### Sugerencias de Siguientes Pasos

- **Implementar un ejemplo de aplicación con Freezed y Riverpod para el manejo de estado.** Explora cómo Freezed se integra con Riverpod para una gestión de estado eficiente y escalable.
- **Explorar el uso de Freezed con StateNotifier para una gestión de estado más avanzada.** Aprende a combinar Freezed con StateNotifier para crear una arquitectura de manejo de estado robusta y flexible.
- **Investigar sobre el uso de Freezed en la arquitectura BLoC.** Descubre cómo Freezed puede simplificar la implementación de la arquitectura BLoC en tus aplicaciones Flutter.

### Invitación a la Acción

Ahora que has descubierto el poder de Freezed, ¡es hora de ponerlo en práctica! Crea una aplicación simple, como una lista de tareas o una aplicación para tomar notas, utilizando Freezed para modelar tus datos. Experimenta con las diferentes funcionalidades que ofrece Freezed y descubre cómo puede mejorar tu flujo de trabajo y la calidad de tu código.

¡El mundo de la programación funcional en Flutter te espera!
