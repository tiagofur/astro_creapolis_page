---
title: "Guía Completa para Convertir JSON a Modelos y Modelos a JSON en Flutter: Desde lo Básico hasta el Uso de Freezed"
description: "JSON (JavaScript Object Notation) es uno de los formatos de intercambio de datos más comunes y utilizados en el desarrollo de aplicaciones móviles. Cuando trabajamos con Flutter…"
pubDate: "2024-10-08"
author: "tiagofur"
tags: ["mobile", "estado", "ciclo vida", "dart", "desktop", "web", "flutter", "json", "model"]
categories: ["Flutter - Intermedio"]
slug: "guia-completa-para-convertir-json-a-modelos-y-modelos-a-json-en-flutter-desde-lo-basico-hasta-el-uso-de-freezed"
originalUrl: "https://creapolis.dev/guia-completa-para-convertir-json-a-modelos-y-modelos-a-json-en-flutter-desde-lo-basico-hasta-el-uso-de-freezed/"
draft: false
---

### 1. Introducción a JSON en Flutter

JSON (JavaScript Object Notation) es uno de los formatos de intercambio de datos más comunes y utilizados en el desarrollo de aplicaciones móviles. Cuando trabajamos con Flutter, es muy probable que necesitemos convertir datos JSON en modelos de objetos para manipularlos fácilmente y viceversa. En este artículo, cubriremos desde las conversiones básicas hasta los métodos avanzados usando paquetes como `json_serializable` y `freezed`.

#### 1.1 ¿Qué es JSON?

JSON es un formato de texto ligero utilizado para almacenar y transportar datos. Es fácil de leer y escribir para los humanos, y fácil de interpretar y generar para las máquinas. La estructura básica de JSON utiliza pares clave-valor, que se asemejan a los mapas o diccionarios en la mayoría de los lenguajes de programación.

```
{
  "nombre": "Carlos",
  "edad": 30,
  "email": "carlos@example.com"
}
```

#### 1.2 ¿Por qué JSON es popular?

JSON se ha convertido en un estándar de facto para la transmisión de datos debido a su simplicidad y compatibilidad con la mayoría de los lenguajes de programación. En Flutter, usamos JSON principalmente cuando interactuamos con APIs que nos devuelven datos que necesitamos manipular en nuestras aplicaciones.

---

### 2. Modelado de datos en Flutter

#### 2.1 ¿Qué es un modelo de datos?

Un modelo de datos es una representación estructurada de los datos en forma de objetos. En Flutter, generalmente creamos modelos de datos usando clases, y estas clases definen la estructura que coincide con los datos JSON que recibimos de las APIs o que queremos enviar.

#### 2.2 Modelos en Flutter

Para crear un modelo básico en Flutter, definimos una clase con los campos correspondientes a las claves del JSON. Por ejemplo:

```
class Usuario {
  final String nombre;
  final int edad;
  final String email;

  Usuario({required this.nombre, required this.edad, required this.email});
}
```

---

### 3. Conversión básica de JSON a un modelo

Cuando obtenemos datos JSON, necesitamos convertirlos a objetos de Dart para poder manipularlos fácilmente. Flutter proporciona herramientas nativas para esto.

#### 3.1 Uso de la clase `jsonDecode`

Flutter proporciona el método `jsonDecode()` para convertir una cadena de JSON en un objeto de Dart, como un `Map<String, dynamic>`.

```
import 'dart:convert';

final jsonString = '{"nombre": "Carlos", "edad": 30, "email": "carlos@example.com"}';
final Map<String, dynamic> parsedJson = jsonDecode(jsonString);
```

#### 3.2 Convertir JSON a un modelo manualmente

Una vez que tenemos el JSON en un `Map`, podemos pasarlo a nuestro modelo:

```
class Usuario {
  final String nombre;
  final int edad;
  final String email;

  Usuario({required this.nombre, required this.edad, required this.email});

  factory Usuario.fromJson(Map<String, dynamic> json) {
    return Usuario(
      nombre: json['nombre'],
      edad: json['edad'],
      email: json['email'],
    );
  }
}

final usuario = Usuario.fromJson(parsedJson);
```

---

### 4. Conversión básica de un modelo a JSON

Del mismo modo que convertimos un JSON a un modelo, podemos convertir un objeto de Dart a JSON.

#### 4.1 Uso de la clase `jsonEncode`

La función `jsonEncode()` convierte un objeto de Dart a una cadena JSON.

```
final jsonString = jsonEncode(usuario);
```

#### 4.2 Convertir un modelo a JSON manualmente

Podemos agregar un método `toJson()` en nuestro modelo para convertirlo fácilmente:

```
class Usuario {
  final String nombre;
  final int edad;
  final String email;

  Usuario({required this.nombre, required this.edad, required this.email});

  factory Usuario.fromJson(Map<String, dynamic> json) {
    return Usuario(
      nombre: json['nombre'],
      edad: json['edad'],
      email: json['email'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'nombre': nombre,
      'edad': edad,
      'email': email,
    };
  }
}

final jsonString = jsonEncode(usuario.toJson());
```

---

### 5. Uso de paquetes automáticos para la conversión

En aplicaciones más complejas, hacer estas conversiones manuales puede ser tedioso. Para facilitar esto, existen paquetes como `json_serializable` y `freezed`.

#### 5.1 json\_serializable

El paquete `json_serializable` automatiza la generación de código para la conversión de JSON a objetos y viceversa. Se utiliza en conjunto con `build_runner`.

1. Añadir dependencias al `pubspec.yaml`:

```
dependencies:
  json_annotation: ^4.0.1

dev_dependencies:
  build_runner: ^2.1.2
  json_serializable: ^5.0.2
```

2. Definir el modelo:

```
import 'package:json_annotation/json_annotation.dart';

part 'usuario.g.dart';

@JsonSerializable()
class Usuario {
  final String nombre;
  final int edad;
  final String email;

  Usuario({required this.nombre, required this.edad, required this.email});

  factory Usuario.fromJson(Map<String, dynamic> json) => _$UsuarioFromJson(json);

  Map<String, dynamic> toJson() => _$UsuarioToJson(this);
}
```

3. Ejecutar `build_runner`:

```
flutter pub run build_runner build
```

Esto generará automáticamente el código necesario para las conversiones.

#### 5.2 freezed

El paquete `freezed` no solo facilita la conversión de JSON, sino que también nos permite crear clases inmutables, lo que es útil para manejar datos de forma más eficiente.

1. Añadir dependencias al `pubspec.yaml`:

```
dependencies:
  freezed_annotation: ^2.0.0

dev_dependencies:
  build_runner: ^2.1.2
  freezed: ^2.0.0
```

2. Definir el modelo usando `freezed`:

```
import 'package:freezed_annotation/freezed_annotation.dart';

part 'usuario.freezed.dart';
part 'usuario.g.dart';

@freezed
class Usuario with _$Usuario {
  const factory Usuario({
    required String nombre,
    required int edad,
    required String email,
  }) = _Usuario;

  factory Usuario.fromJson(Map<String, dynamic> json) => _$UsuarioFromJson(json);
}
```

3. Generar el código:

```
flutter pub run build_runner build
```

#### 5.3 Comparación entre json\_serializable y freezed

- **json\_serializable**: Es más ligero y directo, ideal para cuando solo necesitas la conversión JSON.
- **freezed**: Proporciona más características como clases inmutables, métodos de copia, y es útil en escenarios más complejos.

---

### 6. Convertir JSON a modelos avanzados

#### 6.1 Conversión de listas JSON

Muchas veces recibimos listas de objetos en JSON. Para convertir una lista JSON a una lista de modelos, podemos hacerlo de la siguiente manera:

```
final List<dynamic> jsonList = jsonDecode(jsonString);
final usuarios = jsonList.map((json) => Usuario.fromJson(json)).toList();
```

#### 6.2 Anidación de modelos

Si el JSON tiene modelos anidados, podemos convertirlos creando clases que representen cada uno de esos modelos.

```
{
  "nombre": "Carlos",
  "direccion": {
    "calle": "Av. Principal",
    "numero": 123
  }
}
```

```
class Direccion {
  final String calle;
  final int numero;

  Direccion({required this.calle, required this.numero});

  factory Direccion.fromJson(Map<String, dynamic> json) {
    return Direccion(
      calle: json['calle'],
      numero: json['numero'],
    );
  }
}

class Usuario {
  final String nombre;
  final Direccion direccion;

  Usuario({required this.nombre, required this.direccion});

  factory Usuario.fromJson(Map<String, dynamic> json) {
    return Usuario(
      nombre: json['nombre'],
      direccion: Direccion.fromJson(json['direccion']),
    );
  }
}
```

#### 6.3 Manejo de tipos complejos

Cuando trabajamos con tipos como `DateTime`, es importante convertirlos correctamente:

```
class Evento {
  final DateTime fecha;

  Evento({required this.fecha});

  factory Evento.fromJson(Map<String, dynamic> json) {
    return Evento(
      fecha: DateTime.parse(json['fecha']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'fecha': fecha.toIso8601String(),
    };
  }
}
```

---

### 7. Mejores prácticas al trabajar con JSON y modelos en Flutter

#### 7.1 Evitar errores comunes

Es común cometer errores al manejar conversiones entre JSON y modelos, como:

- Olvidar marcar los campos opcionales como `nullable`.
- No manejar adecuadamente listas vacías o valores nulos.

#### 7.2 Manejo de errores y excepciones

Es recomendable manejar posibles errores al parsear JSON:

```
try {
  final usuario = Usuario.fromJson(parsedJson);
} catch (e) {
  print('Error al convertir el JSON: $e');
}
```

---

### 8. Preguntas comunes sobre JSON en Flutter

1. ¿Cómo convierto un JSON con claves dinámicas a un modelo?
2. ¿Es posible ignorar campos del JSON al convertirlo a un modelo?
3. ¿Cuál es la mejor opción para manejar listas de objetos en JSON?
4. ¿Cómo convertir un JSON anidado a un modelo?
5. ¿Qué paquete es más eficiente para la conversión de JSON, `freezed` o `json_serializable`?

---

### 9. Conclusión

La conversión de JSON a modelos en Flutter es fundamental para interactuar con APIs. Aunque puede hacerse manualmente, usar paquetes como `json_serializable` y `freezed` simplifica el proceso y mejora la eficiencia. En aplicaciones más avanzadas, el manejo de listas y la anidación de modelos requiere atención a los detalles y el uso de buenas prácticas.

---

### 10. Bibliografía

1. J. Bloch. *Effective Dart*. Pearson, 2019.
2. S. Freeman, N. Pryce. *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley, 2010.
3. R. Johnson. *Flutter Complete Reference*. O'Reilly Media, 2021.
