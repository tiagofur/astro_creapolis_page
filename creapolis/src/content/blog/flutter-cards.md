---
title: "Cards Personalizables y Responsivos en Flutter: Todo lo que Necesitas Saber"
description: "El widget Card en Flutter es ideal para presentar información en contenedores visualmente atractivos. Estos se destacan por su diseño limpio, bordes redondeados y sombras que los…"
pubDate: "2024-10-16"
author: "tiagofur"
tags: ["ui", "card", "contenido", "dart", "desarrollo", "elevación", "flutter", "personalización", "responsive design"]
categories: ["Flutter - Basico", "Flutter - UI/UX", "Flutter - Widgets"]
slug: "cards-personalizables-y-responsivos-en-flutter-todo-lo-que-necesitas-saber"
originalUrl: "https://creapolis.dev/cards-personalizables-y-responsivos-en-flutter-todo-lo-que-necesitas-saber/"
draft: false
---

### 1. Introducción al Widget Card en Flutter

El widget `Card` en Flutter es ideal para presentar información en contenedores visualmente atractivos. Estos se destacan por su diseño limpio, bordes redondeados y sombras que los hacen parecer elevados sobre la superficie. Además, son altamente personalizables y pueden incluir texto, imágenes, botones, y hasta ser expandibles para revelar más contenido al ser tocados.

### 2. Estructura Básica del Widget Card

Un `Card` es un contenedor que generalmente incluye otros widgets dentro. Se utiliza para agrupar contenido relacionado y mostrarlo de forma organizada y atractiva.

#### 2.1. Ejemplo de Card Simple

```
Card(
  child: Padding(
    padding: const EdgeInsets.all(16.0),
    child: Text('Este es un card simple en Flutter'),
  ),
);
```

![](/assets/blog/2024/10/flutter-card-simple.png)

Este es un ejemplo básico de un `Card` que contiene solo un widget `Text`.

#### 2.2. Atributos Principales del Widget Card

- **elevation**: Añade una sombra debajo del card.
- **shape**: Define la forma del card (bordes redondeados o angulares).
- **margin**: Define el espacio alrededor del card.
- **color**: Cambia el color de fondo del card.
- **clipBehavior**: Determina cómo se recorta el contenido del card.

### 3. Card con Imagen y Texto

Los `Card` suelen combinar imágenes y texto para crear interfaces visualmente impactantes. Veamos dos enfoques comunes:

#### 3.1. Texto Sobrepuesta al Imagen

```
Card(
  clipBehavior: Clip.antiAlias,
  child: Stack(
    children: [
      Image.network('https://example.com/imagen.jpg',),
      Positioned(
        bottom: 16.0,
        left: 16.0,
        child: Text(
          'Texto sobre la imagen',
          style: TextStyle(
            fontSize: 20.0,
            color: Colors.white,
            backgroundColor: Colors.black54,
          ),
        ),
      ),
    ],
  ),
);
```

![](/assets/blog/2024/10/flutter-card-image-texto-sobrepuesto.png)

Este ejemplo usa `Stack` para superponer el texto sobre una imagen.

#### 3.2. Imagen con Texto Debajo

```
Card(
  clipBehavior: Clip.antiAlias,
  child: Column(
    children: [
      Image.network('https://example.com/imagen.jpg'),
      Padding(
        padding: const EdgeInsets.all(16.0),
        child: Text('Texto debajo de la imagen'),
      ),
    ],
  ),
);
```

![](/assets/blog/2024/10/flutter-card-image-texto-inferior.png)

Aquí, se organiza el contenido en una `Column`, colocando la imagen en la parte superior y el texto debajo.

### 4. Card con Botones y Acciones

Añadir botones a los `Card` permite la interacción con el usuario.

#### 4.1. Diseño de Card con Botones

```
Card(
  clipBehavior: Clip.antiAlias,
  child: Column(
    children: [
      Image.network('https://example.com/imagen.jpg'),
      Padding(
        padding: const EdgeInsets.all(16.0),
        child: Text('Card con botones interactivos'),
      ),
      ButtonBar(
        children: [
          ElevatedButton(
            onPressed: () {},
            child: Text('Aceptar'),
          ),
          ElevatedButton(
            onPressed: () {},
            child: Text('Cancelar'),
          ),
        ],
      ),
    ],
  ),
);
```

![](/assets/blog/2024/10/flutter-card-image-button.png)

Usamos `ButtonBar` para alinear los botones de forma ordenada.

#### 4.2. Eventos y Funcionalidad de los Botones

Los botones pueden realizar acciones como navegar a otra página o mostrar una notificación (`SnackBar`):

```
ElevatedButton(
  onPressed: () {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('¡Botón presionado!')),
    );
  },
  child: Text('Presiona aquí'),
);
```

### 5. Personalización y Estilo del Widget Card

#### 5.1. Cambiar la Forma y Bordes

```
Card(
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(20.0),
  ),
  child: Padding(
    padding: const EdgeInsets.all(16.0),
    child: Text('Card con bordes redondeados'),
  ),
);
```

![](/assets/blog/2024/10/flutter-card-raio-customizado.png)

#### 5.2. Sombra y Elevación

```
Card(
  elevation: 8.0,
  child: Padding(
    padding: const EdgeInsets.all(16.0),
    child: Text('Card con sombra'),
  ),
);
```

![](/assets/blog/2024/10/flutter-sombre.elevacion.png)

#### 5.3. Colores y Decoraciones

Puedes cambiar el color de fondo del `Card` para personalizar el diseño.

```
Card(
  color: Colors.blueAccent,
  child: Padding(
    padding: const EdgeInsets.all(16.0),
    child: Text('Card con color personalizado'),
  ),
);
```

![](/assets/blog/2024/10/flutter-card-fondo-color.png)

#### 5.4. Card con Fondo en Gradiente

Para lograr un fondo con gradiente dentro de un `Card`, podemos envolver el contenido del `Card` en un `Container` con un `BoxDecoration`:

```
Card(
  clipBehavior: Clip.antiAlias,
  child: Container(
    decoration: BoxDecoration(
      gradient: LinearGradient(
        colors: [Colors.blue, Colors.purple],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
    ),
    child: Padding(
      padding: const EdgeInsets.all(16.0),
      child: Text(
        'Card con fondo en gradiente',
        style: TextStyle(color: Colors.white),
      ),
    ),
  ),
);
```

![](/assets/blog/2024/10/flutter-card-fondo-degradado.png)

Este enfoque permite un fondo de gradiente suave y personalizado.

### 6. Cards Expandibles

Un diseño interactivo que se usa mucho es el `Card` expandible, donde el contenido se expande o se oculta según la interacción del usuario. Esto se puede lograr con el widget `ExpansionPanel` o simplemente con la animación de expansión.

```
class ExpandableCard extends StatefulWidget {
  @override
  _ExpandableCardState createState() => _ExpandableCardState();
}

class _ExpandableCardState extends State<ExpandableCard> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          ListTile(
            title: Text('Card Expandible'),
            trailing: IconButton(
              icon: Icon(_expanded ? Icons.expand_less : Icons.expand_more),
              onPressed: () {
                setState(() {
                  _expanded = !_expanded;
                });
              },
            ),
          ),
          if (_expanded)
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text('Contenido expandido del card'),
            ),
        ],
      ),
    );
  }
}
```

![](/assets/blog/2024/10/flutter-card-expansible-cerrado.png)

![](/assets/blog/2024/10/flutter-card-expansible-abierto.png)

Este widget es un `Card` que se expande para revelar contenido adicional cuando se presiona el icono.

### 7. Cards Responsivos y Adaptables

Para asegurar que los `Card` se adapten a diferentes tamaños de pantalla, puedes usar `LayoutBuilder` o `MediaQuery`:

```
Card(
  child: LayoutBuilder(
    builder: (context, constraints) {
      return constraints.maxWidth < 600
          ? Text('Pantalla pequeña')
          : Text('Pantalla grande');
    },
  ),
);
```

### 8. Casos de Uso y Ejemplos Prácticos

- Tarjetas de perfil con imágenes y botones de acción.
- Tarjetas de productos en una tienda con imágenes, descripciones y precios.
- Tarjetas para resúmenes de artículos o noticias.

### 9. Preguntas Frecuentes

1. **¿Qué es el widget Card en Flutter?**  
   El widget `Card` es un contenedor que presenta información de manera organizada, con un diseño limpio, bordes redondeados y sombras. Se usa frecuentemente para agrupar contenido relacionado.
2. \*\*¿Cómo agregar bordes redonde

ados a un Card?\*\*  
Usando la propiedad `shape` y el widget `RoundedRectangleBorder` puedes crear bordes redondeados, personalizando el radio según sea necesario.

3. **¿Cómo hacer un Card expandible en Flutter?**  
   Se puede crear un `Card` expandible usando un estado gestionado en un widget `StatefulWidget` que muestre u oculte contenido dinámicamente.
4. **¿Puedo agregar un fondo en gradiente a un Card?**  
   Sí, envolviendo el contenido del `Card` en un `Container` con un `BoxDecoration` que incluya un `LinearGradient` o cualquier otro tipo de gradiente.
5. **¿Cómo hago un Card interactivo con botones?**  
   Puedes añadir botones en un `Card` utilizando el widget `ButtonBar` y enlazar eventos o acciones como navegación o mostrar mensajes usando `ElevatedButton`.

### 10. Puntos Relevantes del Artículo

1. El widget `Card` es altamente personalizable y esencial para mostrar información agrupada de manera limpia.
2. Puedes agregar imágenes, texto, botones, y hasta hacer que los `Card` sean expandibles.
3. Es posible aplicar fondos en gradiente dentro de un `Card` utilizando `BoxDecoration`.
4. La interacción con botones es fácil de implementar en un `Card`, permitiendo una mayor funcionalidad.
5. Los `Card` expandibles son una excelente forma de gestionar grandes cantidades de contenido sin saturar la interfaz de usuario.

### 11. Conclusión

El widget `Card` en Flutter es una herramienta increíblemente versátil para crear interfaces visualmente atractivas y organizadas. Su personalización permite adaptarlo a diferentes necesidades, desde un simple texto hasta tarjetas expandibles con imágenes, botones, y fondos en gradiente. Con las herramientas que ofrece Flutter, puedes crear diseños interactivos que mejoren la experiencia del usuario de manera significativa.

### 12. Bibliografía

- BROOKS, Tom. *Mastering Flutter Widgets*. Springer, 2022.
- NAGY, David. *Flutter in Action*. Manning Publications, 2021.
- STOLER, Philip. *Flutter for Professionals*. Packt Publishing, 2023.
