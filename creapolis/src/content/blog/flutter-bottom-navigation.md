---
title: "BottomNavigationBar: Dominando la Navegación Inteligente para Apps Elegantes en Flutter"
description: "El BottomNavigationBar es uno de los widgets más comunes en Flutter para la navegación entre diferentes secciones de una aplicación. Al proporcionar un conjunto de íconos o texto…"
pubDate: "2024-10-03"
author: "tiagofur"
tags: ["mobile", "bottomnavigationbar", "dart", "desktop", "web", "efecto carga", "flutter", "ui"]
categories: ["Mobile"]
slug: "bottomnavigationbar-dominando-la-navegacion-inteligente-para-apps-elegantes-en-flutter"
originalUrl: "https://creapolis.dev/bottomnavigationbar-dominando-la-navegacion-inteligente-para-apps-elegantes-en-flutter/"
draft: false
---

### **1. Introducción**

El `BottomNavigationBar` es uno de los widgets más comunes en Flutter para la navegación entre diferentes secciones de una aplicación. Al proporcionar un conjunto de íconos o texto en la parte inferior de la pantalla, este componente permite que los usuarios naveguen rápidamente entre las secciones principales de una app sin sobrecargar la interfaz con demasiados elementos visibles al mismo tiempo. En este artículo, vamos a explorar cómo implementar y personalizar el `BottomNavigationBar` en Flutter, sus ventajas y cómo usarlo correctamente.

---

### **2. ¿Qué es el BottomNavigationBar?**

El `BottomNavigationBar` es un widget que generalmente aparece en la parte inferior de la pantalla de una aplicación móvil. Está compuesto por un conjunto de ítems (normalmente entre 3 y 5) que permiten a los usuarios cambiar entre diferentes secciones de la app con un solo toque. Cada ítem está representado por un ícono, un texto o ambos, y es una excelente solución para aplicaciones que requieren navegación rápida entre varias páginas clave.

---

### **3. Ventajas de utilizar BottomNavigationBar**

- **Facilidad de acceso:** Al estar siempre visible en la parte inferior de la pantalla, permite que el usuario cambie de sección sin necesidad de realizar varios pasos.
- **Simplicidad en el diseño:** Es ideal para aplicaciones que tienen de 3 a 5 secciones principales.
- **Consistencia:** Ofrece una experiencia de usuario uniforme, ya que muchas apps populares utilizan este patrón de navegación.
- **Optimización de espacio:** A diferencia del `Drawer`, que requiere más interacción del usuario, el `BottomNavigationBar` no oculta la pantalla ni interfiere con el contenido visualizado.

---

### **4. Cómo implementar BottomNavigationBar en Flutter**

#### **Código básico**

Aquí te presento un ejemplo básico de cómo implementar un `BottomNavigationBar` en Flutter:

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
    );
  }
}

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  static const List<Widget> _widgetOptions = <Widget>[
    Text('Página de Inicio'),
    Text('Página de Búsqueda'),
    Text('Página de Perfil'),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ejemplo de BottomNavigationBar'),
      ),
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Inicio',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Buscar',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Perfil',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blue,
        onTap: _onItemTapped,
      ),
    );
  }
}
```

![](/assets/blog/2024/10/flutter-bottomNavigationBar-basico.png)

#### **Propiedades del BottomNavigationBar**

Algunas propiedades importantes del `BottomNavigationBar` incluyen:

- `items`: Lista de `BottomNavigationBarItem`, donde defines cada ítem con un ícono y una etiqueta.
- `currentIndex`: El índice del ítem actualmente seleccionado.
- `onTap`: Función que se ejecuta cuando un ítem es seleccionado.
- `selectedItemColor`: Color del ítem seleccionado.

---

### **5. Ejemplos avanzados con BottomNavigationBar**

#### **BottomNavigationBar con más de tres ítems**

En este ejemplo se agrega un cuarto ítem al `BottomNavigationBar`. Flutter recomienda tener entre 3 y 5 ítems, ya que agregar más puede afectar la usabilidad.

```
bottomNavigationBar: BottomNavigationBar(
  items: const <BottomNavigationBarItem>[
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Inicio',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.search),
      label: 'Buscar',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.person),
      label: 'Perfil',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.settings),
      label: 'Ajustes',
    ),
  ],
  currentIndex: _selectedIndex,
  selectedItemColor: Colors.blue,
  onTap: _onItemTapped,
),
```

![](/assets/blog/2024/10/flutter-bottomNavigationBar-custon.png)

#### **BottomNavigationBar con íconos personalizados**

Puedes utilizar cualquier widget personalizado como ícono en cada ítem del `BottomNavigationBar`. Aquí te muestro cómo utilizar imágenes en lugar de íconos predeterminados:

```
bottomNavigationBar: BottomNavigationBar(
  items: <BottomNavigationBarItem>[
    BottomNavigationBarItem(
      icon: Image.asset('assets/icon_home.png'),
      label: 'Inicio',
    ),
    BottomNavigationBarItem(
      icon: Image.asset('assets/icon_search.png'),
      label: 'Buscar',
    ),
    BottomNavigationBarItem(
      icon: Image.asset('assets/icon_profile.png'),
      label: 'Perfil',
    ),
  ],
  currentIndex: _selectedIndex,
  onTap: _onItemTapped,
),
```

---

### **6. Integración con `Navigator` para cambiar entre pantallas**

#### **Usando `Navigator.push`**

El `BottomNavigationBar` se utiliza normalmente para cambiar entre vistas o pantallas. Una forma simple de lograr esto es utilizando el `Navigator.push` para cargar nuevas pantallas:

```
onTap: (index) {
  switch (index) {
    case 0:
      Navigator.push(context, MaterialPageRoute(builder: (context) => HomeScreen()));
      break;
    case 1:
      Navigator.push(context, MaterialPageRoute(builder: (context) => SearchScreen()));
      break;
    case 2:
      Navigator.push(context, MaterialPageRoute(builder: (context) => ProfileScreen()));
      break;
  }
},
```

#### **Usando `IndexedStack` para mantener el estado**

Si deseas que las pantallas mantengan su estado al navegar entre ellas, una solución eficiente es usar un `IndexedStack`, que mantiene las vistas en memoria sin reconstruirlas cada vez que el usuario navega.

```
IndexedStack(
  index: _selectedIndex,
  children: [
    HomeScreen(),
    SearchScreen(),
    ProfileScreen(),
  ],
),
```

---

### **7. Personalización del BottomNavigationBar**

#### **Cambiando colores y temas**

Personalizar el color de fondo o de los ítems del `BottomNavigationBar` es sencillo. Aquí un ejemplo de cómo cambiar el color del fondo:

```
bottomNavigationBar: BottomNavigationBar(
  backgroundColor: Colors.black,
  items: const <BottomNavigationBarItem>[
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Inicio',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.search),
      label: 'Buscar',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.person),
      label: 'Perfil',
    ),
  ],
  selectedItemColor: Colors.white,
  unselectedItemColor: Colors.grey,
  onTap: _onItemTapped,
),
```

![](/assets/blog/2024/10/flutter-bottomNavigationBar-theme.png)

#### **Usando texto personalizado en los tabs**

Es posible cambiar la fuente, el tamaño o el estilo del texto en las etiquetas de los ítems del `BottomNavigationBar`. Utiliza la propiedad `labelStyle` para personalizar la apariencia del texto:

```
bottomNavigationBar: BottomNavigationBar(
  items: const <BottomNavigationBarItem>[
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Inicio',
    ),
    BottomNavigationBarItem(
      icon

: Icon(Icons.search),
      label: 'Buscar',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.person),
      label: 'Perfil',
    ),
  ],
  currentIndex: _selectedIndex,
  selectedItemColor: Colors.blue,
  onTap: _onItemTapped,
  selectedLabelStyle: TextStyle(fontWeight: FontWeight.bold),
  unselectedLabelStyle: TextStyle(color: Colors.grey),
),
```

![](/assets/blog/2024/10/flutter-bottomNavigationBar-labelStyle.png)

---

### **8. Gestión del estado en BottomNavigationBar**

#### **Uso de `setState` para cambiar el ítem seleccionado**

La manera más básica de gestionar el estado del `BottomNavigationBar` es usando `setState` para actualizar el ítem seleccionado.

```
void _onItemTapped(int index) {
  setState(() {
    _selectedIndex = index;
  });
}
```

#### **Uso de `Provider` o `Riverpod` para la gestión del estado**

Para una gestión de estado más robusta, puedes utilizar paquetes como `Provider` o `Riverpod`. Esto es útil en aplicaciones más grandes donde varios widgets dependen del estado.

---

### **9. Combinación de BottomNavigationBar con otras opciones de navegación**

#### **Combinando BottomNavigationBar con `Drawer`**

Puedes combinar el `BottomNavigationBar` con un `Drawer` para tener tanto navegación lateral como en la parte inferior.

```
Scaffold(
  appBar: AppBar(title: Text('Mi App')),
  drawer: Drawer(
    child: ListView(
      children: <Widget>[
        DrawerHeader(
          child: Text('Encabezado'),
        ),
        ListTile(
          title: Text('Opción 1'),
          onTap: () {},
        ),
        ListTile(
          title: Text('Opción 2'),
          onTap: () {},
        ),
      ],
    ),
  ),
  bottomNavigationBar: BottomNavigationBar(
    items: [
      BottomNavigationBarItem(
        icon: Icon(Icons.home),
        label: 'Inicio',
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.search),
        label: 'Buscar',
      ),
    ],
  ),
),
```

![](/assets/blog/2024/10/flutter-bottomNavigationBar-drawer-closed.png)

![](/assets/blog/2024/10/flutter-bottomNavigationBar-drawer-open.png)

#### **BottomNavigationBar y `TabBar`**

El `TabBar` es una alternativa para la navegación horizontal dentro de una misma pantalla, mientras que el `BottomNavigationBar` está diseñado para navegación entre diferentes pantallas.

---

### **10. Buenas prácticas al usar BottomNavigationBar**

#### **Cuándo usar BottomNavigationBar**

- Cuando tienes entre 3 y 5 secciones principales en tu aplicación.
- Si necesitas ofrecer una navegación rápida entre diferentes pantallas sin recargar la interfaz.

#### **Accesibilidad y usabilidad en el diseño**

Es importante asegurarte de que el `BottomNavigationBar` sea accesible para todos los usuarios, incluyendo aquellos con discapacidades visuales o motoras. Usa etiquetas claras y asegúrate de que los íconos tengan un buen contraste con el fondo.

---

### **11. Errores comunes y cómo evitarlos**

- **Demasiados ítems**: No agregues más de cinco ítems en el `BottomNavigationBar`. Si necesitas más, considera usar un `Drawer` o una pantalla adicional.
- **Texto confuso o largo**: Las etiquetas deben ser cortas y claras para evitar que se desborden en pantallas más pequeñas.
- **No mantener el estado**: Si los usuarios esperan que el estado de una pantalla se mantenga al navegar de vuelta, utiliza `IndexedStack` o una técnica similar.

---

### **12. Ejemplo completo: BottomNavigationBar con tres pantallas y gestión del estado**

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;
  final List<Widget> _pages = [
    HomePage(),
    SearchPage(),
    ProfilePage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BottomNavigationBar Ejemplo'),
      ),
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Inicio',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Buscar',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Perfil',
          ),
        ],
        onTap: _onItemTapped,
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Página de Inicio'),
    );
  }
}

class SearchPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Página de Búsqueda'),
    );
  }
}

class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Página de Perfil'),
    );
  }
}
```

---

### **Conclusión**

El `BottomNavigationBar` es una herramienta excelente para simplificar la navegación en aplicaciones Flutter que tienen varias secciones principales. Su implementación es sencilla, y ofrece múltiples opciones de personalización para que se ajuste a las necesidades específicas de tu app. Desde la gestión del estado hasta la integración con `Navigator`, dominar este widget puede hacer que tu aplicación se sienta más profesional y fácil de usar.

---

### **5 preguntas comunes sobre el BottomNavigationBar en Flutter**

1. ¿Cuántos ítems puedo agregar al `BottomNavigationBar`?
2. ¿Cómo cambio el color del ítem seleccionado en el `BottomNavigationBar`?
3. ¿Qué sucede si necesito más de cinco ítems en mi `BottomNavigationBar`?
4. ¿Cómo mantengo el estado de las pantallas al navegar entre ellas?
5. ¿Puedo usar íconos personalizados en lugar de los predeterminados?

---

### **5 puntos clave del artículo sobre BottomNavigationBar**

1. El `BottomNavigationBar` es ideal para aplicaciones con 3 a 5 secciones principales.
2. Es fácil de implementar y ofrece una navegación rápida y directa.
3. Se puede personalizar con colores, íconos y texto adaptados al diseño de la aplicación.
4. Utiliza `IndexedStack` para mantener el estado de las pantallas al navegar entre ellas.
5. Se puede combinar con otros widgets de navegación como `Drawer` o `TabBar`.

---

### **Bibliografía recomendada (Normas ABNT)**

1. RUBY, David. *Flutter in Action*. 1. ed. Manning Publications, 2019.
2. MILEVSKI, D. *Flutter Cookbook: Over 100 Proven Techniques and Solutions for App Development with Flutter 2.x and Dart*. 1. ed. Packt Publishing, 2021.
3. GUEDES, Eric. *Flutter: Desenvolvendo aplicativos móveis nativos*. 1. ed. Novatec Editora, 2020.

---
