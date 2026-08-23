---
title: "Olvídate de Reiniciar: Persistencia de Datos en Flutter con Shared Preferences"
description: "En el mundo del desarrollo móvil, la capacidad de una aplicación para recordar las preferencias del usuario es crucial para brindar una experiencia personalizada y atractiva…"
pubDate: "2024-11-19"
author: "tiagofur"
tags: ["datos", "mobile", "tutorial", "clave-valor", "dart", "datos de aplicación", "desarrollo", "flutter", "guardar datos", "key-value", "preferencias de usuario", "shared preferences", "ui"]
categories: ["Mobile"]
slug: "olvidate-de-reiniciar-persistencia-de-datos-en-flutter-con-shared-preferences"
originalUrl: "https://creapolis.dev/olvidate-de-reiniciar-persistencia-de-datos-en-flutter-con-shared-preferences/"
draft: false
---

### **1. Introducción**

En el mundo del desarrollo móvil, la capacidad de una aplicación para recordar las preferencias del usuario es crucial para brindar una experiencia personalizada y atractiva. Imagina una aplicación que olvida tu configuración cada vez que la cierras: ¡sería frustrante! Aquí es donde entra en juego la persistencia de datos, y en Flutter, `shared_preferences` es una herramienta fundamental para lograrlo.

`Shared_preferences` nos proporciona una forma sencilla de almacenar datos clave-valor de forma persistente en el dispositivo del usuario. Esto significa que podemos guardar información como el nombre de usuario, la configuración del idioma, o en nuestro caso, ¡la preferencia de tema de la aplicación!

En este artículo, exploraremos a fondo el funcionamiento de `shared_preferences`. Aprenderemos cómo guardar y cargar datos, y cómo manejar valores por defecto cuando el usuario utiliza la aplicación por primera vez. Para ilustrar estos conceptos, construiremos una aplicación de ejemplo que permite al usuario cambiar entre un tema claro y uno oscuro, guardando su preferencia para que se aplique cada vez que abra la aplicación.

¡Prepárate para dominar `shared_preferences` y llevar tus habilidades de desarrollo Flutter al siguiente nivel!

### **2. Configuración del Proyecto**

¡Manos a la obra! Empecemos configurando nuestro proyecto Flutter para poder utilizar `shared_preferences`. Sigue estos sencillos pasos:

#### **Paso 1: Crear un nuevo proyecto Flutter**

Si aún no lo has hecho, crea un nuevo proyecto Flutter. Puedes hacerlo desde tu IDE o desde la terminal con el siguiente comando:

Bash

```
flutter create mi_app_con_temas
```

Reemplaza `mi_app_con_temas` con el nombre que desees para tu proyecto.

#### **Paso 2: Añadir la dependencia `shared_preferences`**

Abre el archivo `pubspec.yaml` en la raíz de tu proyecto. Este archivo es donde se gestionan las dependencias de tu aplicación. Dentro de la sección `dependencies`, añade la siguiente línea:

YAML

```
dependencies:
  flutter:
    sdk: flutter
  shared_preferences: ^2.0.15 # Asegúrate de usar la última versión
```

#### **Paso 3: Instalar la dependencia**

Guarda el archivo `pubspec.yaml`. Flutter detectará automáticamente los cambios y descargará la dependencia `shared_preferences`. También puedes ejecutar el siguiente comando en la terminal para instalar la dependencia:

Bash

```
flutter pub get
```

¡Listo! Con estos pasos, ya tienes todo lo necesario para empezar a usar `shared_preferences` en tu aplicación. En el siguiente tópico, veremos cómo guardar las preferencias del usuario.

### **3. Guardando Preferencias con Shared Preferences**

Para que una aplicación móvil sea realmente útil y agradable de usar, debe recordar las preferencias del usuario. Imagina que cada vez que abres tu app de correo electrónico tienes que volver a iniciar sesión y configurar tus notificaciones. ¡Sería una experiencia terrible! Afortunadamente, Flutter nos proporciona herramientas para evitar esto.

`Shared_preferences` es un plugin que nos permite almacenar pequeñas cantidades de datos de forma persistente en el dispositivo del usuario. Estos datos se almacenan como pares clave-valor, donde la clave es un `String` que usamos para identificar el dato, y el valor puede ser de diferentes tipos como `String`, `int`, `bool`, etc.

#### **Accediendo a Shared Preferences**

Antes de poder guardar cualquier dato, necesitamos obtener una instancia de la clase `SharedPreferences`. Piensa en esto como abrir la caja donde guardaremos nuestras preferencias. Este proceso es asíncrono, ya que `shared_preferences` necesita acceder al almacenamiento del dispositivo, lo cual puede tomar un poco de tiempo.

Dart

```
SharedPreferences prefs = await SharedPreferences.getInstance();
```

Con este código, `prefs` se convierte en nuestra "caja" de preferencias, lista para ser utilizada.

#### **Guardando diferentes tipos de datos**

Una vez que tenemos la instancia `prefs`, podemos usar sus métodos para guardar diferentes tipos de datos. Cada método se especializa en un tipo de dato específico:

- `setString(String key, String value)`: Ideal para guardar el nombre de usuario, una dirección de correo electrónico, o cualquier texto. Dart`await prefs.setString('nombre_usuario', 'Ana'); await prefs.setString('email', 'ana@ejemplo.com');`
- `setInt(String key, int value)`: Perfecto para guardar la edad del usuario, una puntuación en un juego, o cualquier número entero. Dart`await prefs.setInt('edad_usuario', 30); await prefs.setInt('puntuacion_maxima', 1500);`
- `setBool(String key, bool value)`: Útil para guardar preferencias como "mostrar notificaciones" o "reproducir sonido". Dart`await prefs.setBool('notificaciones_activadas', true); await prefs.setBool('sonido_activado', false);`
- `setDouble(String key, double value)`: Se utiliza para guardar números con decimales, como la temperatura, el precio de un producto, o coordenadas GPS. Dart`await prefs.setDouble('temperatura', 25.5); await prefs.setDouble('precio', 19.99);`
- `setStringList(String key, List<String> value)`: Permite guardar una lista de cadenas de texto, por ejemplo, una lista de la compra o los intereses del usuario. Dart`await prefs.setStringList('lista_compra', ['Leche', 'Pan', 'Huevos']);`

#### **Ejemplo: Guardar la preferencia del tema**

En nuestra aplicación de cambio de tema, usaremos `setBool` para guardar si el usuario prefiere el tema oscuro ( `true`) o claro (`false`).

Dart

```
// Guardar la preferencia del tema oscuro (true) o claro (false)
await prefs.setBool('tema_oscuro', true);
```

Para facilitar el uso de esta funcionalidad en nuestra aplicación, podemos crear una función que encapsule este código:

Dart

```
Future<void> guardarTema(bool esTemaOscuro) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setBool('tema_oscuro', esTemaOscuro);
}
```

¡Con esto, ya sabemos cómo guardar las preferencias del usuario! En el siguiente tópico, aprenderemos a cargar estas preferencias cuando la aplicación se inicie.

### **4. Cargando Preferencias al Iniciar la Aplicación: Reconstruyendo la Experiencia del Usuario**

En el desarrollo de aplicaciones móviles, la persistencia de datos juega un papel crucial en la creación de una experiencia de usuario fluida y personalizada. No queremos que nuestros usuarios sientan que empiezan de cero cada vez que abren la aplicación. `Shared_preferences` nos da el poder de recordar sus elecciones y preferencias, haciendo que la interacción con nuestra app sea más intuitiva y agradable.

Hemos visto cómo guardar datos con `shared_preferences`, pero ahora viene la parte importante: ¿cómo recuperamos esa información cuando la aplicación se inicia?

#### **Accediendo a la Memoria de la Aplicación**

Para acceder a las preferencias guardadas, necesitamos obtener una instancia de `SharedPreferences`. Piensa en esto como abrir la puerta al almacén donde guardamos la información del usuario. Este proceso es asíncrono, ya que la aplicación necesita acceder al almacenamiento del dispositivo, lo que puede tomar un poco de tiempo.

Dart

```
SharedPreferences prefs = await SharedPreferences.getInstance();
```

Con este código, `prefs` se convierte en nuestra llave para acceder a las preferencias guardadas, listo para ser utilizada.

#### **Recuperando los Datos: Métodos `get`**

Una vez que tenemos la instancia `prefs`, podemos usar sus métodos `get` para recuperar los datos guardados. Es fundamental utilizar el método `get` que corresponda al tipo de dato que guardamos previamente. `Shared_preferences` nos ofrece una variedad de métodos para recuperar diferentes tipos de datos:

- `getString('clave')`: Si guardamos un nombre de usuario con `setString('nombre_usuario', 'Ana')`, usaremos `getString('nombre_usuario')` para recuperarlo.
- `getInt('clave')`: Si guardamos la puntuación máxima en un juego con `setInt('puntuacion_maxima', 1500)`, la recuperaremos con `getInt('puntuacion_maxima')`.
- `getBool('clave')`: Para recuperar una preferencia booleana, como `setBool('notificaciones_activadas', true)`, usaremos `getBool('notificaciones_activadas')`.
- `getDouble('clave')`: Si guardamos la temperatura con `setDouble('temperatura', 25.5)`, la recuperaremos con `getDouble('temperatura')`.
- `getStringList('clave')`: Para obtener la lista de la compra que guardamos con `setStringList('lista_compra', ['Leche', 'Pan', 'Huevos'])`, usaremos `getStringList('lista_compra')`.

#### **Valores por Defecto: Anticipando la Primera Vez**

Es crucial considerar el escenario en el que el usuario abre la aplicación por primera vez. En este caso, no habrá preferencias guardadas, y los métodos `get` devolverán `null`. Para evitar errores y asegurar una experiencia fluida, debemos proporcionar un valor por defecto.

Por ejemplo, si nuestra aplicación permite personalizar el idioma, podemos asumir que el idioma por defecto es el español:

Dart

```
String idioma = prefs.getString('idioma') ?? 'español';
```

El operador `??` es nuestro salvavidas: si `prefs.getString('idioma')` devuelve `null` (porque el usuario aún no ha elegido un idioma), se asignará el valor `'español'` a la variable `idioma`.

#### **Ejemplo: Cargando la Preferencia del Tema**

Volviendo a nuestra aplicación de cambio de tema, podemos crear una función que cargue la preferencia del usuario al iniciar la aplicación:

Dart

```
Future<bool> cargarTema() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  return prefs.getBool('tema_oscuro') ?? false; // Tema claro por defecto
}
```

Esta función encapsula la lógica de obtener la preferencia del tema y, en caso de que no exista, retorna `false`, indicando que el tema por defecto es el tema claro.

Con esto, hemos aprendido a cargar las preferencias del usuario de forma segura y eficiente. En el siguiente tópico, veremos cómo integrar `shared_preferences` con Provider para gestionar el estado del tema de nuestra aplicación y mantener la interfaz de usuario sincronizada con las preferencias del usuario.

### **5. Implementando Provider para el Cambio de Tema: Una Solución Elegante y Escalable**

Ya dominamos el arte de guardar y cargar las preferencias del usuario con `shared_preferences`, ¡pero nuestra aventura no termina aquí! Para que nuestra aplicación reaccione a los cambios de tema y actualice la interfaz de usuario de forma dinámica, necesitamos un mecanismo eficiente para gestionar el estado de la aplicación. En este punto, Provider emerge como el héroe que necesitamos, un paquete popular en Flutter que simplifica la gestión de estados y facilita la comunicación entre diferentes partes de la aplicación.

#### **¿Por qué Provider es la Elección Ideal?**

Provider no es solo una moda pasajera, es una herramienta poderosa que implementa el patrón de diseño "Inyección de Dependencias" de una manera sencilla y eficiente. Imagina que Provider es un sistema de entrega a domicilio para tus widgets: les proporciona los datos que necesitan, justo cuando los necesitan, y se asegura de que siempre tengan la información más actualizada. Esto es perfecto para nuestra aplicación de cambio de tema, ya que queremos que la interfaz de usuario se actualice automáticamente cuando el usuario cambie entre el tema claro y oscuro, ¡sin tener que escribir código complejo para manejar las actualizaciones!

#### **Modelando el Tema con ChangeNotifier**

Para usar Provider, primero necesitamos crear un modelo de datos que contenga la información del tema y notifique a los widgets cuando esta información cambie. La clase `ChangeNotifier` es nuestra aliada en esta misión:

Dart

```
class ThemeModel extends ChangeNotifier {
  bool _isDarkMode = false; // Valor por defecto: tema claro

  ThemeModel() {
    _cargarTema(); // Cargar la preferencia al iniciar
  }

  bool get isDarkMode => _isDarkMode;

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    _guardarTema();
    notifyListeners(); // Notificar a los widgets del cambio
  }

  Future<void> _cargarTema() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    _isDarkMode = prefs.getBool('tema_oscuro') ?? false;
    notifyListeners(); // Notificar después de cargar
  }

  Future<void> _guardarTema() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setBool('tema_oscuro', _isDarkMode);
  }
}
```

Analicemos este código:

- `_isDarkMode`: Esta variable privada es como un interruptor que guarda el estado actual del tema (encendido para oscuro, apagado para claro).
- `ThemeModel()`: El constructor se asegura de que, al iniciar la aplicación, se cargue la preferencia del usuario desde `shared_preferences`.
- `isDarkMode`: Un getter que permite a otros widgets acceder al estado actual del tema.
- `toggleTheme()`: Esta función es la encargada de cambiar el tema, guardar la nueva preferencia con `shared_preferences` y, lo más importante, ¡notificar a los widgets que el tema ha cambiado!
- `notifyListeners()`: Este método es la clave de la magia de Provider. Es como una señal que se envía a todos los widgets que están "escuchando" a `ThemeModel`, avisándoles que deben actualizarse para reflejar el nuevo tema.
- `_cargarTema()` y `_guardarTema()`: Estas funciones encapsulan la lógica de interactuar con `shared_preferences`, manteniendo el código organizado y fácil de entender.

#### **Provider: El Proveedor de Temas para tu Aplicación**

Ahora que tenemos nuestro modelo de datos, necesitamos "proveerlo" a nuestra aplicación, como si fuera un servicio esencial. Para esto, usaremos `ChangeNotifierProvider`:

Dart

```
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => ThemeModel(),
      child: MyApp(),
    ),
  );
}
```

Con este código, `ChangeNotifierProvider` se convierte en el proveedor oficial de `ThemeModel` para toda la aplicación. Cualquier widget dentro de `MyApp` podrá acceder al `ThemeModel` y disfrutar de la información del tema actualizada.

#### **Widgets que se Adaptan al Tema**

Finalmente, podemos acceder al `ThemeModel` en cualquier widget usando `Provider.of<ThemeModel>(context)`. Veamos un ejemplo con un `Switch` que permite al usuario cambiar el tema:

Dart

```
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final themeModel = Provider.of<ThemeModel>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Ejemplo de Tema'),
      ),
      body: Center(
        child: Switch(
          value: themeModel.isDarkMode,
          onChanged: (value) {
            themeModel.toggleTheme(); 
          },
        ),
      ),
    );
  }
}
```

En este ejemplo:

- `Provider.of<ThemeModel>(context)`: Esta línea es la que conecta nuestro widget con el `ThemeModel` proporcionado por `ChangeNotifierProvider`. Ahora `themeModel` tiene acceso al estado del tema y puede escuchar los cambios.
- `value: themeModel.isDarkMode`: El valor del `Switch` refleja el estado actual del tema.
- `onChanged: (value) { themeModel.toggleTheme(); }`: Cuando el usuario interactúa con el `Switch`, se llama a la función `toggleTheme()` del `ThemeModel`, que cambia el tema, lo guarda en `shared_preferences` y notifica a todos los widgets que escuchan.

¡Con esto, hemos integrado `shared_preferences` y Provider para crear una aplicación que recuerda y aplica la preferencia de tema del usuario de forma eficiente y elegante! En el siguiente tópico, veremos cómo aplicar el tema a la interfaz de usuario usando `ThemeData` para crear una experiencia visual impactante.

### **6. Construyendo la Interfaz de Usuario: El Tema Cobra Vida con ThemeData**

¡Es hora de dar rienda suelta a la creatividad y vestir nuestra aplicación con un estilo propio! Con `shared_preferences` y Provider como cimientos, podemos construir una interfaz de usuario dinámica que se ajuste a las preferencias del usuario. `ThemeData` será nuestro pincel, permitiéndonos pintar cada rincón de la aplicación con los colores y estilos elegidos.

#### **ThemeData: El Maestro de la Estética**

`ThemeData` es la herramienta que nos da el control total sobre la apariencia de nuestra aplicación. Podemos personalizar casi cualquier aspecto visual, desde los colores de fondo y la tipografía hasta la forma de los botones y las animaciones de transición.

En nuestra aplicación de cambio de tema, definiremos dos `ThemeData` distintos, uno para el tema claro y otro para el tema oscuro:

Dart

```
ThemeData temaClaro = ThemeData(
  brightness: Brightness.light,
  primaryColor: Colors.blue,
  accentColor: Colors.amber,
  scaffoldBackgroundColor: Colors.white,
  fontFamily: 'Roboto', // Definir la fuente para el tema claro
  textTheme: TextTheme(
    bodyText1: TextStyle(fontSize: 16.0, color: Colors.black), // Estilo del cuerpo del texto
    headline6: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold), // Estilo para títulos
  ),
  buttonTheme: ButtonThemeData(
    buttonColor: Colors.blue, // Color de fondo de los botones
    textTheme: ButtonTextTheme.primary, // Estilo del texto de los botones
  ),
  // ... otros estilos para el tema claro ...
);

ThemeData temaOscuro = ThemeData(
  brightness: Brightness.dark,
  primaryColor: Colors.grey[800],
  accentColor: Colors.greenAccent,
  scaffoldBackgroundColor: Colors.grey[900],
  fontFamily: 'Open Sans', // Definir una fuente diferente para el tema oscuro
  textTheme: TextTheme(
    bodyText1: TextStyle(fontSize: 16.0, color: Colors.white),
    headline6: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.greenAccent),
  ),
  buttonTheme: ButtonThemeData(
    buttonColor: Colors.grey[800],
    textTheme: ButtonTextTheme.primary,
  ),
  // ... otros estilos para el tema oscuro ...
);
```

Observa cómo hemos añadido más propiedades a `ThemeData`:

- `fontFamily`: Permite definir la fuente que se utilizará en toda la aplicación.
- `textTheme`: Nos da control sobre los estilos de texto, como el tamaño, color y grosor de la fuente.
- `buttonTheme`: Personaliza la apariencia de los botones, incluyendo el color de fondo y el estilo del texto.

### **Aplicando el Tema con Elegancia**

Para aplicar el tema correcto, utilizaremos el `ThemeModel` que creamos con Provider y el operador ternario:

Dart

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final themeModel = Provider.of<ThemeModel>(context);

    return MaterialApp(
      title: 'Ejemplo de Tema',
      theme: themeModel.isDarkMode ? temaOscuro : temaClaro, 
      home: MyHomePage(),
    );
  }
}
```

Este código se encarga de seleccionar el tema adecuado en función del estado del `ThemeModel`.

#### **Un Switch para la Transformación**

El `Switch` que creamos en el tópico anterior es el elemento que permite al usuario cambiar entre los dos temas:

Dart

```
Switch(
  value: themeModel.isDarkMode,
  onChanged: (value) {
    themeModel.toggleTheme(); 
  },
)
```

Al interactuar con el `Switch`, se activa la función `toggleTheme()` en el `ThemeModel`, que no solo cambia el estado del tema y lo guarda con `shared_preferences`, sino que también notifica a la aplicación para que se reconstruya con el nuevo tema, creando una transición fluida y agradable para el usuario.

#### **Más Allá de lo Básico**

Para enriquecer aún más la experiencia del usuario, podemos utilizar `ThemeData` para personalizar otros aspectos de la interfaz:

- **Estilos de los `AppBar`**: Define colores, sombras y estilos de texto para las barras de aplicación.
- **Iconos**: Utiliza iconos con colores que se adapten al tema actual.
- **Widgets personalizados**: Crea tus propios widgets y adáptalos al tema de la aplicación.
- **Animaciones**: Crea transiciones animadas entre los temas para una experiencia más dinámica.

Con `ThemeData` como nuestro aliado, las posibilidades de diseño son infinitas. ¡Deja volar tu imaginación y crea una aplicación que no solo sea funcional, sino también visualmente impactante!

### **7. Preguntas y Respuestas**

A lo largo de este artículo, hemos explorado el poder de `shared_preferences` para la persistencia de datos y cómo combinarlo con Provider para crear una aplicación Flutter con cambio de tema. Ahora, es momento de responder a algunas preguntas frecuentes que pueden surgir al trabajar con estas herramientas.

**1. ¿Cuáles son las limitaciones de `shared_preferences`?**

Si bien `shared_preferences` es una herramienta muy útil, es importante tener en cuenta sus limitaciones. No está diseñada para almacenar grandes cantidades de datos o información sensible. Su uso principal es para guardar pequeñas configuraciones y preferencias del usuario. Para datos más complejos o sensibles, se recomienda explorar otras opciones de persistencia como Hive, Moor o sqflite.

**2. ¿Qué tipos de datos se pueden almacenar en `shared_preferences`?**

`Shared_preferences` admite los siguientes tipos de datos:

- `String`
- `int`
- `double`
- `bool`
- `List<String>`

No se pueden almacenar directamente objetos complejos, pero se pueden serializar a `String` (por ejemplo, usando JSON) antes de guardarlos.

**3. ¿Es seguro almacenar información sensible en `shared_preferences`?**

No se recomienda almacenar información sensible como contraseñas o datos bancarios en `shared_preferences`, ya que no ofrece ningún tipo de cifrado. Si necesitas almacenar este tipo de información, considera usar soluciones más seguras como Flutter Secure Storage.

**4. ¿Cómo puedo eliminar datos guardados con `shared_preferences`?**

`Shared_preferences` ofrece varios métodos para eliminar datos:

- `remove('clave')`: Elimina el dato asociado a la clave especificada.
- `clear()`: Elimina todos los datos almacenados en `shared_preferences`.

**5. ¿Existen alternativas a `shared_preferences` para la persistencia de datos en Flutter?**

Sí, existen diversas alternativas a `shared_preferences`, cada una con sus propias ventajas y desventajas:

- **Hive:** Una base de datos NoSQL ligera y rápida, ideal para almacenar datos más complejos.
- **Moor:** Un wrapper de SQLite que facilita el trabajo con bases de datos relacionales en Flutter.
- **sqflite:** Un plugin que permite usar SQLite directamente en Flutter.
- **Firebase:** Una plataforma de desarrollo móvil de Google que ofrece servicios de base de datos en la nube.

La elección de la mejor opción dependerá de las necesidades específicas de tu aplicación.

### **8. Puntos Relevantes**

A lo largo de este viaje por el mundo de `shared_preferences`, Provider y `ThemeData`, hemos aprendido a construir una aplicación Flutter que no solo es funcional, sino también personalizable y atractiva. Recapitulemos los puntos clave que nos han guiado en esta aventura:

1. **`Shared_preferences` como base:** `Shared_preferences` nos proporciona una forma sencilla y eficiente de almacenar las preferencias del usuario, como el tema de la aplicación, de forma persistente en el dispositivo.
2. **Provider para la gestión de estados:** Provider simplifica la gestión del estado del tema, permitiendo que los widgets se actualicen automáticamente cuando el usuario cambia la configuración.
3. **`ThemeData` para la personalización visual:** `ThemeData` nos da el poder de crear una experiencia visual impactante, definiendo colores, estilos de texto y otros aspectos de la interfaz.
4. **Manejo de valores por defecto:** Es fundamental considerar el escenario en el que el usuario abre la aplicación por primera vez y proporcionar valores por defecto para evitar errores.
5. **Encapsulación para un código limpio:** Crear funciones para guardar, cargar y cambiar el tema ayuda a mantener el código organizado y fácil de entender.

Con estos puntos en mente, estás listo para crear aplicaciones Flutter que recuerden las preferencias del usuario y se adapten a su estilo, ¡brindando una experiencia personalizada y memorable!

### **9. Conclusión**

Hemos llegado al final de este viaje a través del fascinante mundo de la persistencia de datos y la personalización de temas en Flutter. A lo largo del camino, hemos aprendido a dominar `shared_preferences` para guardar y cargar las preferencias del usuario, a utilizar Provider para gestionar el estado del tema de forma eficiente, y a dar vida a nuestra interfaz de usuario con `ThemeData`.

Recuerda que la capacidad de una aplicación para recordar las elecciones del usuario y adaptarse a su estilo es fundamental para brindar una experiencia agradable y memorable. Con las herramientas que hemos explorado, estás listo para crear aplicaciones Flutter que no solo sean funcionales, sino también intuitivas y atractivas.

¡Sigue explorando, experimentando y creando! El mundo de Flutter está lleno de posibilidades, y la persistencia de datos es solo una de las muchas áreas que puedes dominar para convertirte en un desarrollador experto.

### **10. Recursos adicionales**

- Documentación oficial de `shared_preferences`: [https://pub.dev/documentation/shared\_preferences/latest/](https://www.google.com/url?sa=E&source=gmail&q=https://pub.dev/documentation/shared_preferences/latest/)
- Documentación de Provider: [https://pub.dev/documentation/provider/latest/](https://www.google.com/url?sa=%3C0%3EE&source=gmail&q=https://pub.dev/documentation/provider/latest/)
- Ejemplos de código en GitHub: [https://github.com/flutter/plugins/tree/main/packages/shared\_preferences/shared\_preferences](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/flutter/plugins/tree/main/packages/shared_preferences/shared_preferences)

### **11. Sugerencias de siguientes pasos**

- Explora otras opciones de persistencia de datos como Hive, Moor o sqflite para manejar datos más complejos.
- Profundiza en el uso de Provider para la gestión de estados en aplicaciones Flutter más avanzadas.
- Aprende sobre la inyección de dependencias y cómo aplicarla en tus proyectos Flutter.

### **12. Invitación a la acción**

Ahora que tienes el conocimiento, ¡es hora de ponerlo en práctica! Crea tu propia aplicación Flutter con cambio de tema, experimenta con diferentes estilos y personalizaciones, y comparte tu creación con el mundo. ¡El límite es tu imaginación!
