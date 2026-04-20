---
title: "Cómo Crear y Personalizar un AppBar en un Scaffold en Flutter"
description: "En Flutter, el AppBar es un componente clave dentro del diseño de una aplicación, ya que actúa como la barra superior de la interfaz, donde se suele mostrar el título de la…"
pubDate: "2024-03-07"
author: "tiagofur"
tags: ["mobile", "dart", "desktop", "web", "flutter", "ui"]
categories: ["Flutter - Widgets"]
slug: "como-crear-y-personalizar-un-appbar-en-un-scaffold-en-flutter"
originalUrl: "https://creapolis.dev/como-crear-y-personalizar-un-appbar-en-un-scaffold-en-flutter/"
draft: false
---

### 1. Introducción a AppBar y Scaffold en Flutter

#### ¿Qué es un AppBar?

En Flutter, el `AppBar` es un componente clave dentro del diseño de una aplicación, ya que actúa como la barra superior de la interfaz, donde se suele mostrar el título de la pantalla, botones de acción y otros elementos interactivos. Es muy flexible y se puede personalizar de diferentes formas para adaptarlo a las necesidades de la app.

#### ¿Qué es un Scaffold?

El `Scaffold` es un widget que proporciona una estructura básica para las interfaces en Flutter, incluyendo elementos como el `AppBar`, el `Drawer`, el `BottomNavigationBar`, entre otros. Es el contenedor que organiza la pantalla y permite integrar componentes de diseño comunes en las aplicaciones móviles.

---

### 2. Estructura básica de un Scaffold con AppBar

#### Creación de un Scaffold en Flutter

El `Scaffold` es el widget que envuelve toda la estructura de la pantalla. Para utilizar un `AppBar`, primero necesitamos crear un `Scaffold` en el método `build()` de nuestro `StatelessWidget` o `StatefulWidget`.

```
Scaffold(
  appBar: AppBar(
    title: Text('Mi App'),
  ),
  body: Center(
    child: Text('Contenido de la app'),
  ),
);
```

#### Añadir un AppBar al Scaffold

En el ejemplo anterior, vemos cómo el `AppBar` se añade como una propiedad del `Scaffold`. El `title` es un widget, lo que significa que puedes personalizarlo con cualquier widget, no solo texto.

---

### 3. Propiedades esenciales del AppBar

#### `title`

La propiedad `title` es esencial en el `AppBar` ya que define el contenido principal mostrado en el centro de la barra superior. Generalmente, es un `Text`, pero también puede ser cualquier otro widget.

```
AppBar(
  title: Text('Página Principal'),
)
```

#### `leading`

La propiedad `leading` define el widget que aparece a la izquierda del `AppBar`. Puede ser un ícono, un botón de regreso o cualquier otro elemento interactivo.

```
AppBar(
  leading: Icon(Icons.menu),
)
```

#### `actions`

La propiedad `actions` es una lista de widgets que aparecen en el lado derecho del `AppBar`, típicamente íconos de acciones rápidas como búsqueda, configuración o notificaciones.

```
AppBar(
  actions: [
    IconButton(
      icon: Icon(Icons.search),
      onPressed: () {
        // Acción de búsqueda
      },
    ),
    IconButton(
      icon: Icon(Icons.more_vert),
      onPressed: () {
        // Acción de más opciones
      },
    ),
  ],
)
```

---

### 4. Personalización básica del AppBar

#### Cambiar color de fondo

El `backgroundColor` permite modificar el color de fondo del `AppBar`. Puedes usar colores predeterminados o definir un color personalizado.

```
AppBar(
  backgroundColor: Colors.blueAccent,
)
```

#### Cambiar el color de los íconos y textos

El color de los íconos y textos se define con la propiedad `iconTheme` y `textTheme` respectivamente.

```
AppBar(
  iconTheme: IconThemeData(color: Colors.white),
  titleTextStyle: TextStyle(color: Colors.white, fontSize: 20),
)
```

---

### 5. Añadir íconos y botones en el AppBar

#### Botón de regreso (`back button`)

Cuando navegas entre pantallas, Flutter automáticamente coloca un botón de regreso (flecha) si el `Navigator` tiene una pila de rutas. Sin embargo, puedes personalizar este ícono.

```
AppBar(
  leading: IconButton(
    icon: Icon(Icons.arrow_back),
    onPressed: () {
      Navigator.pop(context);
    },
  ),
)
```

#### Añadir varios íconos a `actions`

Puedes añadir múltiples íconos en la propiedad `actions`. Estos íconos se mostrarán alineados a la derecha.

```
AppBar(
  actions: [
    Icon(Icons.share),
    Icon(Icons.settings),
  ],
)
```

---

### 6. Cambiar la altura del AppBar

#### Usar la propiedad `toolbarHeight`

El `AppBar` tiene una altura predeterminada, pero si deseas modificarla, puedes usar `toolbarHeight` para establecer una altura personalizada.

```
AppBar(
  toolbarHeight: 100.0,
)
```

---

### 7. Añadir una imagen o logo en el AppBar

#### Usar un widget personalizado en `title`

Para personalizar el `AppBar` y añadir un logo o imagen, puedes usar un widget en la propiedad `title`.

```
AppBar(
  title: Image.asset('assets/logo.png', height: 50),
)
```

---

### 8. Usar un fondo con gradiente en el AppBar

Para lograr un fondo con gradiente en el `AppBar`, necesitas un widget que envuelva su fondo. El paquete `flutter_gradients` te permite hacerlo fácilmente.

```
AppBar(
  flexibleSpace: Container(
    decoration: BoxDecoration(
      gradient: LinearGradient(
        colors: [Colors.blue, Colors.purple],
      ),
    ),
  ),
)
```

---

### 9. Hacer que el AppBar sea transparente

#### Propiedad `elevation`

La propiedad `elevation` permite definir la sombra del `AppBar`. Si la defines a `0.0`, eliminarás esa sombra.

```
AppBar(
  elevation: 0.0,
)
```

#### Propiedad `backgroundColor`

Si defines el `backgroundColor` con un valor transparente, puedes hacer que el `AppBar` parezca invisible.

```
AppBar(
  backgroundColor: Colors.transparent,
  elevation: 0.0,
)
```

---

### 10. Añadir pestañas al AppBar con `TabBar`

#### Implementación de `DefaultTabController`

Un `AppBar` puede incluir pestañas si lo combinamos con un `TabBar`. Para hacer esto, debemos envolver el widget principal en un `DefaultTabController`.

```
DefaultTabController(
  length: 3,
  child: Scaffold(
    appBar: AppBar(
      bottom: TabBar(
        tabs: [
          Tab(icon: Icon(Icons.home)),
          Tab(icon: Icon(Icons.star)),
          Tab(icon: Icon(Icons.person)),
        ],
      ),
    ),
    body: TabBarView(
      children: [
        Icon(Icons.home),
        Icon(Icons.star),
        Icon(Icons.person),
      ],
    ),
  ),
)
```

---

### 11. Crear un AppBar desplazable (sliverAppBar)

#### Implementación de `SliverAppBar`

El `SliverAppBar` es una versión avanzada del `AppBar` que permite hacer que la barra superior se desplace al hacer scroll en la página.

```
SliverAppBar(
  expandedHeight: 200.0,
  flexibleSpace: FlexibleSpaceBar(
    title: Text('Desplazable'),
    background: Image.asset('assets/background.jpg', fit: BoxFit.cover),
  ),
)
```

---

### 12. Crear un AppBar con animaciones

#### Uso de `FlexibleSpaceBar`

El `FlexibleSpaceBar` permite animaciones en el contenido del `AppBar` al hacer scroll.

```
AppBar(
  flexibleSpace: FlexibleSpaceBar(
    title: Text('Mi AppBar con animaciones'),
    background: Image.asset(
      'assets/fondo_animated.jpg',
      fit: BoxFit.cover,
    ),
  ),
)
```

El widget `FlexibleSpaceBar` permite que el contenido del `AppBar` se expanda y contraiga mientras el usuario desplaza la página. Esto es particularmente útil cuando quieres añadir elementos visuales dinámicos, como una imagen de fondo que se mueve a medida que se hace scroll.

---

### 13. Personalizar el texto y el estilo del AppBar

#### Uso de `TextTheme`

Para cambiar el estilo del texto dentro del `AppBar`, podemos usar `TextTheme` dentro del tema de la aplicación. Esto afectará el título del `AppBar` globalmente.

```
MaterialApp(
  theme: ThemeData(
    appBarTheme: AppBarTheme(
      titleTextStyle: TextStyle(
        color: Colors.white,
        fontSize: 24,
        fontWeight: FontWeight.bold,
      ),
    ),
  ),
)
```

#### Cambiar la fuente y el tamaño del texto

Para personalizar el estilo de texto del `AppBar` de forma específica, puedes usar la propiedad `titleTextStyle` dentro de cada `AppBar`.

```
AppBar(
  title: Text(
    'Personalizado',
    style: TextStyle(
      fontSize: 22,
      fontWeight: FontWeight.w600,
      color: Colors.amber,
    ),
  ),
)
```

---

### 14. Ejemplos avanzados de personalización de AppBar

#### AppBar con búsqueda

Un caso común en las aplicaciones es tener un `AppBar` que incluya una barra de búsqueda. Esto se puede lograr mediante la creación de un campo de búsqueda dentro del `AppBar` o utilizando un `IconButton` que al presionarse muestre el campo de búsqueda.

```
class AppBarSearchExample extends StatefulWidget {
  @override
  _AppBarSearchExampleState createState() => _AppBarSearchExampleState();
}

class _AppBarSearchExampleState extends State<AppBarSearchExample> {
  bool _isSearching = false;
  final TextEditingController _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: _isSearching
            ? TextField(
                controller: _searchController,
                style: TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'Buscar...',
                  hintStyle: TextStyle(color: Colors.white),
                ),
              )
            : Text('App con Búsqueda'),
        actions: [
          IconButton(
            icon: Icon(_isSearching ? Icons.close : Icons.search),
            onPressed: () {
              setState(() {
                _isSearching = !_isSearching;
              });
            },
          ),
        ],
      ),
      body: Center(
        child: Text('Contenido de la app'),
      ),
    );
  }
}
```

#### AppBar con título animado

También es posible animar el título del `AppBar` utilizando el widget `AnimatedSwitcher`. Este widget permite realizar transiciones animadas cuando se cambia el contenido del `AppBar`.

```
class AnimatedAppBarTitle extends StatefulWidget {
  @override
  _AnimatedAppBarTitleState createState() => _AnimatedAppBarTitleState();
}

class _AnimatedAppBarTitleState extends State<AnimatedAppBarTitle> {
  bool _toggle = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: AnimatedSwitcher(
          duration: Duration(seconds: 1),
          child: _toggle
              ? Text('Primero', key: ValueKey(1))
              : Text('Segundo', key: ValueKey(2)),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: () {
              setState(() {
                _toggle = !_toggle;
              });
            },
          ),
        ],
      ),
      body: Center(
        child: Text('Contenido animado'),
      ),
    );
  }
}
```

---

### 15. Conclusión y mejores prácticas

El `AppBar` en Flutter es un componente extremadamente flexible y altamente personalizable. Ya sea que estés construyendo una interfaz simple con un título o necesites una barra superior compleja con animaciones, imágenes y acciones, el `AppBar` puede adaptarse a tus necesidades. Las mejores prácticas incluyen:

- **Optimización:** No sobrecargar el `AppBar` con demasiados elementos para mantener una interfaz limpia.
- **Diseño adaptable:** Asegúrate de que el `AppBar` se vea bien en dispositivos con pantallas de diferentes tamaños y orientaciones.
- **Uso adecuado de animaciones:** Las animaciones pueden mejorar la experiencia del usuario, pero deben ser fluidas y no afectar el rendimiento.

---

### 5 Preguntas Comunes

1. ¿Cómo puedo hacer que el `AppBar` sea transparente?
2. ¿Cómo añadir múltiples botones de acción en el `AppBar`?
3. ¿Es posible personalizar la altura del `AppBar`?
4. ¿Cómo puedo añadir un buscador dentro del `AppBar`?
5. ¿Qué es un `SliverAppBar` y en qué se diferencia del `AppBar` estándar?

---

### 5 Puntos Relevantes

1. El `AppBar` es un componente clave para el diseño superior de una aplicación en Flutter.
2. Puedes personalizar prácticamente todos los aspectos del `AppBar`, desde los colores hasta la altura y el contenido.
3. La propiedad `actions` te permite añadir íconos interactivos en el lado derecho del `AppBar`.
4. Con el `SliverAppBar`, puedes crear una barra superior desplazable y flexible.
5. Las animaciones dentro del `AppBar` pueden mejorar significativamente la experiencia del usuario.

---

### Conclusión

Crear y personalizar un `AppBar` en Flutter es sencillo y ofrece un nivel de flexibilidad que permite adaptarlo a las necesidades de cada aplicación. Desde la adición de botones de acción hasta la creación de títulos animados, el `AppBar` es esencial para garantizar una experiencia de usuario amigable e intuitiva.

---

### Bibliografía

1. FLUTTER. *Flutter: AppBar Widget*. Disponible en: https://docs.flutter.dev.
2. GOYAL, S.; SHAW, M. *Flutter Complete Reference*. Packt Publishing, 2021.
3. TORRES, J. *Mastering Flutter: A Developer's Guide*. Manning Publications, 2022.
