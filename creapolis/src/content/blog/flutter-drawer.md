---
title: "Cómo Crear un Drawer Personalizado en Flutter (Guía Paso a Paso)"
description: "El Drawer en Flutter es un componente clave que permite agregar un menú lateral deslizante en una aplicación. Este patrón de diseño es común en aplicaciones móviles, donde las…"
pubDate: "2024-03-07"
author: "tiagofur"
tags: ["mobile", "dart", "desktop", "web", "flutter", "ui"]
categories: ["Mobile"]
slug: "explorando-el-drawer-en-flutter-navegacion-lateral-con-elegancia"
originalUrl: "https://creapolis.dev/explorando-el-drawer-en-flutter-navegacion-lateral-con-elegancia/"
draft: false
---

### 1. Introducción al Drawer en Flutter

El `Drawer` en Flutter es un componente clave que permite agregar un menú lateral deslizante en una aplicación. Este patrón de diseño es común en aplicaciones móviles, donde las opciones de navegación están ocultas en un menú que se desliza desde el borde de la pantalla. El uso del `Drawer` permite maximizar el espacio de la pantalla para el contenido principal de la aplicación, mientras que el menú de navegación permanece fuera de la vista hasta que el usuario lo necesite.

El `Drawer` se integra fácilmente en el widget `Scaffold`, que es el contenedor base de muchas aplicaciones en Flutter. Esto facilita su implementación y personalización para adaptarse a diferentes necesidades y estilos.

---

### 2. **El concepto del Drawer en Flutter**

#### Ventajas del uso de Drawer

El Drawer ofrece varias ventajas en aplicaciones móviles y web:

- **Ahorro de espacio**: permite ocultar el menú de navegación, mostrándolo solo cuando sea necesario.
- **Mejora la organización**: facilita agrupar los elementos de navegación y ofrece una interfaz más limpia.
- **Familiaridad del usuario**: el patrón del Drawer es ampliamente utilizado, por lo que los usuarios se sienten cómodos al interactuar con él.

---

### 3. **Estructura básica de un Drawer**

#### Widgets principales involucrados

El `Drawer` en Flutter está contenido dentro del widget `Scaffold`, que proporciona la estructura de diseño para la mayoría de las pantallas. El `Drawer` en sí es un widget que se desliza desde un lado de la pantalla, generalmente el izquierdo, y puede contener cualquier otro widget, aunque se usa comúnmente un `ListView` para organizar los elementos de manera vertical.

#### Cómo construir un Drawer básico

A continuación, un ejemplo de un Drawer básico con un `DrawerHeader` y varios elementos de navegación:

```
Scaffold(
  appBar: AppBar(
    title: Text('Mi Aplicación'),
  ),
  drawer: Drawer(
    child: ListView(
      padding: EdgeInsets.zero,
      children: <Widget>[
        DrawerHeader(
          decoration: BoxDecoration(
            color: Colors.blue,
          ),
          child: Text(
            'Encabezado del Drawer',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
            ),
          ),
        ),
        ListTile(
          leading: Icon(Icons.home),
          title: Text('Inicio'),
          onTap: () {
            // Acción al hacer clic
          },
        ),
        ListTile(
          leading: Icon(Icons.settings),
          title: Text('Configuración'),
          onTap: () {
            // Acción al hacer clic
          },
        ),
      ],
    ),
  ),
  body: Center(
    child: Text('Contenido Principal'),
  ),
);
```

En este ejemplo, se utiliza un `ListView` para organizar los elementos del Drawer, con `ListTile` para cada opción de navegación. Cada `ListTile` puede tener un icono, un título y una función `onTap` que define lo que sucede cuando se selecciona.

![](/assets/blog/2024/03/flutter-drawer-basico.png)

---

### 4. **Customización del Drawer**

#### Personalización del diseño

Una de las mayores fortalezas de Flutter es la capacidad de personalizar los widgets a fondo. Puedes modificar el diseño del Drawer con facilidad, cambiando colores, formas o el contenido. A continuación, un ejemplo de cómo agregar más estilo al Drawer:

```
Drawer(
  child: Column(
    children: [
      Container(
        height: 200,
        color: Colors.blue,
        child: Center(
          child: Text(
            'Encabezado personalizado',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
            ),
          ),
        ),
      ),
      ListTile(
        leading: Icon(Icons.account_circle),
        title: Text('Perfil'),
        onTap: () {
          // Navegación al perfil
        },
      ),
      ListTile(
        leading: Icon(Icons.message),
        title: Text('Mensajes'),
        onTap: () {
          // Navegación a los mensajes
        },
      ),
    ],
  ),
);
```

En este caso, se ha personalizado el encabezado del Drawer para que ocupe un área mayor y se centra un texto en el interior.

![](/assets/blog/2024/03/flutter-drawer-personalizado.png)

#### Añadir íconos, imágenes y texto

Agregar íconos e imágenes a los elementos del Drawer es muy sencillo con el uso de `ListTile` y `leading`, que te permite colocar un ícono antes del texto:

```
ListTile(
  leading: Icon(Icons.photo),
  title: Text('Galería'),
  onTap: () {
    // Navegación a la galería
  },
),
```

![](/assets/blog/2024/03/flutter-drawer-icono.texto_.png)

Puedes incluso añadir imágenes de perfil o avatares:

```
CircleAvatar(
  backgroundImage: NetworkImage('https://example.com/avatar.jpg'),
),
```

![](/assets/blog/2024/03/flutter-drawer-avatar.png)

---

### 5. **Navegación dentro del Drawer**

#### Integración del Drawer con rutas

El Drawer generalmente se utiliza para la navegación entre diferentes pantallas. Flutter permite manejar rutas de manera muy eficiente, y puedes integrar el Drawer con rutas fácilmente utilizando `Navigator.push` o `Navigator.pushNamed`.

#### Cambiar pantallas usando el Drawer

Para que el Drawer cambie de pantalla al seleccionar un elemento, solo necesitas usar el siguiente código:

```
ListTile(
  leading: Icon(Icons.dashboard),
  title: Text('Dashboard'),
  onTap: () {
    Navigator.pushNamed(context, '/dashboard');
  },
),
```

![](/assets/blog/2024/03/flutter-drawer-navigacion.png)

---

### 6. **Drawer con múltiples secciones**

#### Agrupación de elementos

En aplicaciones más complejas, es posible que desees dividir el Drawer en diferentes secciones. Esto se puede hacer añadiendo divisores o encabezados.

```
ListView(
  children: [
    DrawerHeader(
      child: Text('Opciones'),
    ),
    ListTile(
      title: Text('Perfil'),
      onTap: () {},
    ),
    Divider(),
    ListTile(
      title: Text('Configuración'),
      onTap: () {},
    ),
  ],
),
```

![](/assets/blog/2024/03/flutter-drawer-multi-secciones.png)

#### Menús y submenús

Si tu aplicación requiere de submenús, puedes usar el widget `ExpansionTile` dentro del Drawer para mostrar y ocultar opciones de navegación adicionales.

```
ExpansionTile(
  leading: Icon(Icons.settings),
  title: Text('Ajustes'),
  children: <Widget>[
    ListTile(
      title: Text('Ajustes de cuenta'),
      onTap: () {},
    ),
    ListTile(
      title: Text('Ajustes de notificaciones'),
      onTap: () {},
    ),
  ],
),
```

![](/assets/blog/2024/03/flutter-drawer-menu-expandible-cerrado.png)

![](/assets/blog/2024/03/flutter-drawer-menu-expandible-abierto.png)

---

### 7. **Implementación de Drawer con Provider**

#### Uso del patrón Provider con Drawer

Si tu aplicación utiliza `Provider` para la gestión de estado, puedes combinarlo con el Drawer para mostrar elementos de navegación según el estado actual.

#### Gestión de estado con Drawer

Por ejemplo, puedes mostrar diferentes opciones de navegación según si el usuario está autenticado o no:

```
Consumer<AuthProvider>(
  builder: (context, auth, child) {
    return Drawer(
      child: ListView(
        children: [
          if (auth.isAuthenticated) ...[
            ListTile(
              title: Text('Perfil'),
              onTap: () {},
            ),
            ListTile(
              title: Text('Cerrar sesión'),
              onTap: () {
                auth.logout();
              },
            ),
          ] else ...[
            ListTile(
              title: Text('Iniciar sesión'),
              onTap: () {},
            ),
          ]
        ],
      ),
    );
  },
);
```

---

### 8. **Drawer dinámico**

#### Creación de un Drawer que cambia según el estado

El ejemplo anterior muestra cómo puedes cambiar el contenido del Drawer dinámicamente según el estado de autenticación del usuario. Esta técnica se puede ampliar para mostrar o esconder opciones en función de otros estados.

#### Drawer basado en usuarios o roles

Si tu aplicación tiene diferentes tipos de usuarios (p. ej., administradores o usuarios normales), puedes usar el patrón Provider para mostrar un menú personalizado basado en el

#### Drawer basado en usuarios o roles

Si tienes roles de usuarios diferenciados, puedes condicionar el contenido del `Drawer` según el rol que tenga el usuario autenticado. Aquí te muestro un ejemplo usando `Provider` para detectar el rol del usuario y mostrar opciones específicas.

```
Consumer<AuthProvider>(
  builder: (context, auth, child) {
    return Drawer(
      child: ListView(
        children: [
          if (auth.userRole == 'admin') ...[
            ListTile(
              leading: Icon(Icons.admin_panel_settings),
              title: Text('Panel de Administración'),
              onTap: () {
                Navigator.pushNamed(context, '/admin');
              },
            ),
            ListTile(
              leading: Icon(Icons.analytics),
              title: Text('Reportes'),
              onTap: () {
                Navigator.pushNamed(context, '/reports');
              },
            ),
          ] else if (auth.userRole == 'user') ...[
            ListTile(
              leading: Icon(Icons.home),
              title: Text('Inicio'),
              onTap: () {
                Navigator.pushNamed(context, '/home');
              },
            ),
            ListTile(
              leading: Icon(Icons.shopping_cart),
              title: Text('Mis Compras'),
              onTap: () {
                Navigator.pushNamed(context, '/purchases');
              },
            ),
          ]
        ],
      ),
    );
  },
);
```

Con este enfoque, puedes ofrecer una experiencia de usuario personalizada y asegurar que cada tipo de usuario solo vea las opciones relevantes para su rol.

---

### 9. **Drawer con animaciones**

#### Añadiendo animaciones al Drawer

Para mejorar la experiencia de usuario, puedes integrar animaciones en tu `Drawer`, tanto al abrirlo como al interactuar con sus elementos. Si bien el propio Drawer tiene una animación de deslizamiento incorporada, puedes enriquecer el diseño utilizando widgets como `AnimatedContainer` o `AnimatedOpacity`.

Por ejemplo, podrías cambiar el color de fondo de un `ListTile` cuando el usuario interactúa con él:

```
ListTile(
  leading: Icon(Icons.settings),
  title: Text('Configuración'),
  onTap: () {
    // Navegar a la pantalla de configuración
  },
  tileColor: Colors.blue.withOpacity(0.5),
),
```

![](/assets/blog/2024/03/flutter-drawer-animacion.png)

#### Transiciones suaves y fluidas

Otra manera de añadir animaciones es utilizando el widget `Hero` para transiciones entre pantallas. Si tienes imágenes o íconos en el `Drawer`, puedes hacer que se animen suavemente al pasar de una pantalla a otra.

---

### 10. **Integración de otros Widgets dentro del Drawer**

#### ListView y otros widgets en el Drawer

El `Drawer` no está limitado a contener solo un `ListView` con `ListTile`. Puedes incluir cualquier tipo de widget dentro de él. Por ejemplo, podrías añadir un formulario para que el usuario complete sus datos directamente desde el `Drawer`.

#### Agregar formularios, listas y botones

```
Drawer(
  child: Column(
    children: [
      TextFormField(
        decoration: InputDecoration(
          labelText: 'Buscar',
        ),
      ),
      ListTile(
        title: Text('Inicio'),
        onTap: () {},
      ),
    ],
  ),
);
```

![](/assets/blog/2024/03/flutter-drawer-textformfield.png)

Incluir botones de acción dentro del `Drawer` también es muy útil. Por ejemplo, puedes agregar un botón que permita cerrar sesión de manera rápida o iniciar una búsqueda.

```
ElevatedButton(
  onPressed: () {
    // Acción de cerrar sesión
  },
  child: Text('Cerrar sesión'),
),
```

![](/assets/blog/2024/03/flutter-drawer-button.png)

---

### 11. **Buenas prácticas en el uso de Drawer**

#### Mantener la simplicidad y la usabilidad

Es importante no sobrecargar el `Drawer` con demasiados elementos. La simplicidad es clave para garantizar una experiencia de usuario fluida. Si tienes muchas opciones de navegación, considera agruparlas en submenús o dividirlas entre distintas pantallas.

#### Accesibilidad en Drawer

No te olvides de la accesibilidad. Asegúrate de que los elementos del `Drawer` sean fáciles de usar con lectores de pantalla y asegúrate de que los colores tengan un contraste adecuado. Utilizar descripciones accesibles (`semanticLabel`) para los íconos es una buena práctica.

---

### 12. **Drawer con otras opciones de navegación**

#### Comparativa con BottomNavigationBar

El `Drawer` es solo una de las muchas opciones para la navegación en Flutter. Otra alternativa común es el `BottomNavigationBar`, que presenta las opciones de navegación en la parte inferior de la pantalla. ¿Cuándo deberías elegir una opción sobre la otra?

- **Drawer**: Es ideal cuando tienes muchas opciones de navegación o cuando las opciones no son las principales funciones de la aplicación.
- **BottomNavigationBar**: Adecuado para aplicaciones con 3 a 5 opciones principales, que el usuario utilizará frecuentemente.

#### Cuándo usar Drawer y cuándo otras opciones

Usa un `Drawer` cuando quieras ofrecer una navegación secundaria o accesos directos sin desorganizar la pantalla principal. Si solo tienes unas pocas pantallas clave, el `BottomNavigationBar` o `TabBar` pueden ser más apropiados para no requerir la interacción de deslizar para abrir el menú.

---

### 13. **Errores comunes y cómo evitarlos**

#### Problemas frecuentes en la implementación

Uno de los problemas comunes al trabajar con `Drawer` es olvidarse de cerrarlo después de la navegación. Esto puede crear una experiencia incómoda para el usuario si el Drawer permanece abierto.

#### Soluciones para errores típicos

Para asegurarte de que el Drawer se cierra automáticamente después de la navegación, puedes usar `Navigator.pop(context)` en el `onTap` de cada `ListTile`:

```
ListTile(
  title: Text('Pantalla 1'),
  onTap: () {
    Navigator.pop(context);  // Cierra el Drawer
    Navigator.pushNamed(context, '/pantalla1');
  },
),
```

Esto garantiza que el Drawer se cierre correctamente antes de redirigir al usuario a la nueva pantalla.

---

### 14. **Ejemplo completo: Creación de un Drawer personalizado**

A continuación, te dejo un ejemplo completo de un `Drawer` que incluye íconos, una imagen de perfil, y rutas personalizadas utilizando `Navigator`:

```
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
      routes: {
        '/home': (context) => HomeScreen(),
        '/profile': (context) => ProfileScreen(),
        '/settings': (context) => SettingsScreen(),
      },
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Inicio'),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            UserAccountsDrawerHeader(
              accountName: Text("Juan Pérez"),
              accountEmail: Text("juan.perez@gmail.com"),
              currentAccountPicture: CircleAvatar(
                backgroundImage: NetworkImage(
                  "https://example.com/avatar.jpg",
                ),
              ),
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
            ),
            ListTile(
              leading: Icon(Icons.home),
              title: Text('Inicio'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/home');
              },
            ),
            ListTile(
              leading: Icon(Icons.person),
              title: Text('Perfil'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/profile');
              },
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text('Configuración'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/settings');
              },
            ),
            Divider(),
            ListTile(
              leading: Icon(Icons.exit_to_app),
              title: Text('Cerrar sesión'),
              onTap: () {
                Navigator.pop(context);
                // Lógica para cerrar sesión
              },
            ),
          ],
        ),
      ),
      body: Center(
        child: Text('Bienvenido a la pantalla de inicio'),
      ),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Perfil'),
      ),
      body: Center(
        child: Text('Esta es la pantalla de perfil'),
      ),
    );
  }
}

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Configuración'),
      ),
      body: Center(
        child: Text('Esta es la pantalla de configuración'),
      ),
    );
  }
}
```

![](/assets/blog/2024/03/flutter-drawer-ejemplo-completo.png)

Este código muestra un `Drawer` con un encabezado personalizado que incluye la imagen de perfil del usuario, así como varias opciones de navegación. Cada `ListTile` lleva a una pantalla diferente, y el `Drawer` se cierra automáticamente tras seleccionar una opción.

---

### 15. **Conclusión**

El `Drawer` en Flutter es una herramienta poderosa para manejar la navegación lateral en tu aplicación, permitiendo que mantengas la interfaz limpia y accesible. Con la capacidad de personalizarlo ampliamente, agregar animaciones, gestionar el estado con `Provider` y combinarlo con otras opciones de navegación, el `Drawer` se convierte en un componente esencial en el desarrollo de apps modernas.

---

### **5 preguntas comunes sobre el Drawer en Flutter**

1. ¿Cómo cierro el Drawer automáticamente después de seleccionar una opción?

2. **¿Cómo cierro el Drawer automáticamente después de seleccionar una opción?**

Puedes cerrar el Drawer manualmente utilizando `Navigator.pop(context)` dentro del `onTap` de cada elemento del Drawer. Esto garantiza que el Drawer se cierre antes de redirigir al usuario a la nueva pantalla.

```
ListTile(
  title: Text('Pantalla 1'),
  onTap: () {
    Navigator.pop(context);  // Cierra el Drawer
    Navigator.pushNamed(context, '/pantalla1');
  },
);
```

---

3. **¿Cómo puedo personalizar el diseño del Drawer?**

El `Drawer` es muy flexible y se puede personalizar utilizando widgets como `Container`, `Text`, `Image`, `ListTile`, entre otros. Puedes agregar encabezados personalizados, íconos, colores, imágenes de fondo e incluso widgets interactivos como formularios o botones.

---

4. **¿Cómo gestiono el estado en un Drawer?**

Puedes gestionar el estado dentro del Drawer utilizando `Provider` o cualquier otro patrón de gestión de estado como `setState`, `Bloc`, etc. Esto te permite cambiar el contenido del Drawer dinámicamente, por ejemplo, mostrando diferentes opciones según el rol del usuario o su estado de autenticación.

---

5. **¿Cuál es la diferencia entre un Drawer y un BottomNavigationBar?**

El `Drawer` es ideal para aplicaciones con muchas opciones de navegación, o para aquellas donde las opciones no son las más utilizadas, ya que mantiene el menú oculto hasta que se desliza para abrir. El `BottomNavigationBar`, en cambio, es más adecuado para aplicaciones con pocas pantallas clave, donde las opciones principales deben estar siempre accesibles.

---

6. **¿Cómo añado submenús dentro del Drawer?**

Puedes usar el widget `ExpansionTile` para agregar submenús dentro de tu `Drawer`. Esto permite que las opciones de navegación se expandan y contraigan según sea necesario.

```
ExpansionTile(
  leading: Icon(Icons.settings),
  title: Text('Ajustes'),
  children: <Widget>[
    ListTile(
      title: Text('Ajustes de cuenta'),
      onTap: () {},
    ),
    ListTile(
      title: Text('Ajustes de notificaciones'),
      onTap: () {},
    ),
  ],
);
```

---

### **5 puntos clave sobre el uso del Drawer en Flutter**

1. **Personalización y flexibilidad**: El `Drawer` te permite personalizar su contenido completamente, desde la apariencia hasta el comportamiento, integrando múltiples widgets como imágenes, formularios o listas.
2. **Integración con rutas**: Navegar entre pantallas dentro de un `Drawer` es sencillo utilizando `Navigator.pushNamed`, lo que hace que sea fácil cambiar de pantalla desde cualquier opción del menú.
3. **Gestión de estado**: Con herramientas como `Provider`, puedes mostrar diferentes opciones de navegación dependiendo del estado del usuario, como mostrar un menú de administrador solo para ciertos roles.
4. **Optimización para pantallas pequeñas**: El `Drawer` es ideal para dispositivos móviles, ya que aprovecha al máximo el espacio de la pantalla al mantener el menú de navegación oculto hasta que se necesita.
5. **Combina el Drawer con otros widgets de navegación**: El `Drawer` se puede combinar con otras opciones de navegación, como `BottomNavigationBar` o `TabBar`, para ofrecer una experiencia más completa y adaptada a la aplicación.

---

### **Conclusión**

El `Drawer` en Flutter es un componente crucial cuando se trata de navegación lateral. Su versatilidad permite que se adapte a aplicaciones de todo tipo, desde simples menús con unas pocas opciones hasta complejas interfaces personalizadas con múltiples roles de usuario. Al implementarlo, puedes mantener tu aplicación organizada y fácil de navegar, maximizando el espacio de la interfaz de usuario. La capacidad de integración con rutas y otras herramientas de Flutter lo convierten en un recurso esencial para desarrollar aplicaciones modernas, rápidas y altamente interactivas.

---

### **Bibliografía recomendada (Normas ABNT)**

1. RUBY, David. *Flutter in Action*. 1. ed. Manning Publications, 2019.
2. MILEVSKI, D. *Flutter Cookbook: Over 100 Proven Techniques and Solutions for App Development with Flutter 2.x and Dart*. 1. ed. Packt Publishing, 2021.
3. GUEDES, Eric. *Flutter: Desenvolvendo aplicativos móveis nativos*. 1. ed. Novatec Editora, 2020.
