---
title: "Dominando fluent_ui: Desarrollo Avanzado de Flutter para una Experiencia Windows Auténtica"
description: "Flutter ha trascendido sus orígenes móviles para convertirse en una fuerza formidable en el desarrollo de aplicaciones multiplataforma, abarcando ahora con solidez el territorio…"
pubDate: "2025-04-02"
author: "tiagofur"
tags: []
categories: ["Flutter - Avanzado", "Flutter - Desktop", "Flutter - Intermedio"]
slug: "dominando-fluent_ui-desarrollo-avanzado-de-flutter-para-una-experiencia-windows-autentica"
originalUrl: "https://creapolis.dev/dominando-fluent_ui-desarrollo-avanzado-de-flutter-para-una-experiencia-windows-autentica/"
draft: false
---

## Introducción: Flutter y la Experiencia Nativa en Windows

Flutter ha trascendido sus orígenes móviles para convertirse en una fuerza formidable en el desarrollo de aplicaciones multiplataforma, abarcando ahora con solidez el territorio del escritorio. Si bien su promesa central de "compilar una vez, ejecutar en todas partes" sigue siendo uno de sus mayores atractivos, los desarrolladores experimentados que apuntan a plataformas específicas como Windows comprenden una verdad fundamental: el éxito de una aplicación no reside únicamente en su funcionalidad, sino también, y de manera crucial, en la *sensación* que transmite al usuario final.

Los usuarios del ecosistema Windows están profundamente familiarizados con una estética, un flujo de interacción y un comportamiento particulares, definidos y evolucionados a través del **Fluent Design System** de Microsoft. Una aplicación que ignora estas convenciones visuales y de usabilidad, por muy potente o innovadora que sea bajo el capó, corre el riesgo de sentirse ajena, una pieza externa forzada en un entorno cohesivo. Esta desconexión puede impactar negativamente la experiencia del usuario, la curva de aprendizaje e incluso la tasa de adopción. La pregunta clave es, entonces: ¿Cómo podemos aprovechar el poder y la flexibilidad de Flutter para construir aplicaciones de escritorio para Windows que no solo funcionen a la perfección, sino que también se sientan *realmente* nativas?

La respuesta se encuentra en el excelente trabajo de la comunidad Flutter, materializado en el paquete **`fluent_ui`**. Este paquete, diseñado meticulosamente para alinearse con las directrices oficiales de Fluent Design, ofrece un conjunto rico y completo de widgets, herramientas de tematización y patrones de interfaz que permiten a los desarrolladores de Flutter crear interfaces de usuario que respetan, replican y se integran armoniosamente con la apariencia y el comportamiento esperados en Windows.

Este artículo está diseñado específicamente para **desarrolladores Flutter de nivel intermedio y avanzado** que desean elevar la calidad de sus aplicaciones de escritorio para Windows, dotándolas de una identidad visual auténtica. Nos sumergiremos en las profundidades del paquete `fluent_ui`, desglosando sus componentes esenciales: desde la configuración inicial y los widgets raíz como `FluentApp`, pasando por la navegación con `NavigationView`, hasta explorar una amplia gama de controles interactivos (botones, campos de texto, selectores, diálogos y más). Para consolidar el aprendizaje, construiremos juntos una aplicación de ejemplo paso a paso, aplicando los conceptos aprendidos. Además, abordaremos consideraciones importantes y buenas prácticas para asegurar que tus aplicaciones no solo luzcan profesionales, sino que también sean performantes, responsivas y accesibles.

¡Prepárate para dominar el arte de crear aplicaciones Flutter que se sientan como en casa en el escritorio de Windows!

## 2. Preparando el Terreno: Configuración del Proyecto

Antes de sumergirnos en la riqueza de widgets que ofrece `fluent_ui`, es fundamental asegurarse de que nuestro entorno de desarrollo esté correctamente preparado y que la estructura base de nuestro proyecto Flutter esté lista para adoptar el estilo Fluent Design.

### 2.1 Prerrequisitos: Flutter para Escritorio (Windows)

Partimos de la base de que, como desarrollador de nivel intermedio o avanzado, ya cuentas con una instalación funcional del Flutter SDK en tu máquina. Sin embargo, es crucial verificar específicamente que tu entorno esté **habilitado y configurado para el desarrollo de aplicaciones de escritorio en Windows**.

La forma más sencilla de comprobarlo es ejecutando el comando `flutter doctor` con la bandera de verbosidad en tu terminal:

Bash

```
# Ejecuta este comando en tu CMD, PowerShell o terminal preferida
flutter doctor -v
```

Presta especial atención a la sección que detalla la configuración para Windows. Una configuración correcta mostrará algo similar a esto, confirmando la presencia de Visual Studio con la carga de trabajo requerida ("Desarrollo de escritorio con C++"):

```
[✓] Visual Studio - develop for Windows (Visual Studio Community 2022 17.8.0)
    • Visual Studio at C:\Program Files\Microsoft Visual Studio\2022\Community
    • Visual Studio Community 2022 version 17.8.34330.188
    • Windows 10 SDK version 10.0.22621.0  # O una versión compatible
    • Includes the Desktop development with C++ workload
    • MSBuild version 17.8.3+195e7f5a3 for .NET Framework 4.8.1 # O similar
```

Si `flutter doctor` reporta algún problema, como la falta de Visual Studio o de la carga de trabajo C++, sigue las instrucciones que proporciona la propia herramienta para solucionarlo. También puedes consultar la [guía oficial de Flutter para la configuración de escritorio en Windows](https://www.google.com/search?q=https://docs.flutter.dev/desktop%23windows-setup) para obtener instrucciones detalladas.

### 2.2 Instalación y Configuración de `fluent_ui`

Con el entorno validado, integrar el paquete `fluent_ui` en tu proyecto es un proceso estándar de Flutter. Abre una terminal en el directorio raíz de tu proyecto y ejecuta:

Bash

```
flutter pub add fluent_ui
```

Este comando añadirá automáticamente la dependencia a tu archivo `pubspec.yaml`. Si prefieres hacerlo manualmente, asegúrate de añadir la línea correspondiente bajo la sección `dependencies`:

YAML

```
# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  fluent_ui: ^<latest_stable_version> # Asegúrate de usar la versión más reciente
  # ... tus otras dependencias
```

Tras añadir la línea (manual o automáticamente), no olvides ejecutar `flutter pub get` en la terminal para que Flutter descargue e integre el paquete en tu árbol de dependencias.

### 2.3 Estructura Básica del Proyecto con `FluentApp`

El corazón de una aplicación Flutter que utiliza `fluent_ui` es el widget `FluentApp`. Este cumple un rol análogo al de `MaterialApp` o `CupertinoApp`, sirviendo como el widget raíz que configura el tema global, la navegación y otras propiedades fundamentales de la aplicación bajo los principios de Fluent Design.

Deberás reemplazar el widget raíz predeterminado (usualmente `MaterialApp`) en tu archivo `lib/main.dart` por `FluentApp`. A continuación, se muestra un ejemplo minimalista de cómo luciría tu `main.dart` inicial:

Dart

```
// lib/main.dart
import 'package:fluent_ui/fluent_ui.dart';
// Importante: Ocultar Colors de material para evitar conflictos de nombres.
import 'package:flutter/material.dart' hide Colors;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Usamos FluentApp como widget raíz
    return FluentApp(
      title: 'Mi Aplicación Fluent', // Título usado por el sistema operativo
      debugShowCheckedModeBanner: false, // Oculta el banner de debug

      // Configuración básica de temas (exploraremos esto en detalle)
      themeMode: ThemeMode.system, // Usa el modo claro/oscuro del sistema
      darkTheme: FluentThemeData(
        brightness: Brightness.dark,
        accentColor: Colors.blue.toAccentColor(), // Define el color de acento
        visualDensity: VisualDensity.standard,
        focusTheme: FocusThemeData(
          glowFactor: is10footScreen(context) ? 2.0 : 0.0,
        ),
      ),
      theme: FluentThemeData(
        brightness: Brightness.light,
        accentColor: Colors.blue.toAccentColor(),
        visualDensity: VisualDensity.standard,
        focusTheme: FocusThemeData(
          glowFactor: is10footScreen(context) ? 2.0 : 0.0,
        ),
      ),

      // Define la pantalla/ruta inicial de la aplicación
      home: const MyHomePage(),
    );
  }
}

// Widget de ejemplo para la página principal inicial
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    // Usaremos ScaffoldPage para estructurar páginas más adelante
    // Por ahora, un placeholder simple:
    return ScaffoldPage(
      // ScaffoldPage proporciona una estructura común para páginas Fluent
      header: const PageHeader(title: Text('Página de Inicio')),
      content: const Center(
        child: Text(
          '¡Bienvenido a Fluent UI en Flutter!',
          style: TextStyle(fontSize: 24), // TextStyle sigue siendo de Flutter
        ),
      ),
    );
  }
}
```

**Nota Clave sobre Conflictos de Nombres:** Observa la línea `import 'package:flutter/material.dart' hide Colors;`. Esta es una práctica **muy recomendada** al usar `fluent_ui`. Tanto `material.dart` como `fluent_ui.dart` definen una clase llamada `Colors`. Al ocultar (`hide`) la versión de Material, evitas ambigüedades y posibles errores. Si necesitas usar un color predefinido del paquete Fluent (como `Colors.red`), estará disponible directamente. Si necesitas un color específico de Material (menos común en una app Fluent pura), tendrías que importarlo con un prefijo (`import 'package:flutter/material.dart' as material;` y usar `material.Colors.red`).

Con estos pasos completados, tu proyecto Flutter tiene la base necesaria. Está configurado para utilizar `fluent_ui` y listo para que comencemos a construir interfaces de usuario con la estética y funcionalidad de Windows.

## 3. Conceptos Fundamentales de `fluent_ui`

Con el proyecto ya configurado, es momento de adentrarnos en los pilares sobre los cuales construiremos nuestras interfaces de usuario con sabor a Windows. Estos son los conceptos esenciales que todo desarrollador que trabaje con `fluent_ui` debe dominar: el widget raíz `FluentApp`, el potente sistema de temas `FluentTheme` y el paradigma de navegación principal encapsulado en `NavigationView`.

### 3.1 `FluentApp`: El Corazón de tu Aplicación Fluent

Como ya introdujimos, `FluentApp` es el punto de entrada indispensable para cualquier aplicación que emplee `fluent_ui`. Funciona como el contenedor principal y el configurador global, desempeñando un papel similar al de `MaterialApp` o `CupertinoApp` en sus respectivos ecosistemas de diseño. Es el responsable de inyectar el contexto de Fluent Design en el árbol de widgets.

**Propiedades clave de `FluentApp` que debes dominar:**

- **`title`**: Un `String` que identifica tu aplicación ante el sistema operativo (visible, por ejemplo, en la barra de título de la ventana o en la vista de tareas).
- **`theme`**: Una instancia de `FluentThemeData` que define la apariencia visual completa para el **modo claro**. Aquí se configuran colores primarios y de acento, estilos de tipografía, densidad visual, apariencia de controles específicos, etc.
- **`darkTheme`**: Otra instancia de `FluentThemeData`, opcional pero muy recomendada, para definir la apariencia en **modo oscuro**. Proporcionar ambos temas permite una adaptación perfecta a las preferencias del usuario.
- **`themeMode`**: Determina qué tema usar. Las opciones son:
  - `ThemeMode.system`: (Recomendado para escritorio) Sigue la configuración de modo claro/oscuro del sistema operativo Windows.
  - `ThemeMode.light`: Fuerza el uso del `theme` definido.
  - `ThemeMode.dark`: Fuerza el uso del `darkTheme` definido (si existe).
- **`home`**: El `Widget` que se mostrará como pantalla inicial si no estás utilizando un sistema de navegación por rutas nombradas más avanzado.
- **`routes`, `initialRoute`, `onGenerateRoute`, etc.**: `FluentApp` es compatible con el sistema de navegación por rutas de Flutter. Puedes definir aquí un `Map<String, WidgetBuilder>` para manejar la navegación entre diferentes pantallas de tu aplicación de forma estructurada.
- **`color`**: Un `Color` que representa el color principal de tu aplicación para el sistema operativo. Es buena práctica que este color esté alineado con el `accentColor` definido en tu `FluentThemeData`.
- **`debugShowCheckedModeBanner`**: Un `bool` (por defecto `true`) para mostrar u ocultar la pequeña cinta "Debug" en la esquina superior derecha durante el desarrollo.

Si bien `FluentApp` comparte la filosofía general de ser el widget raíz con `MaterialApp`, está intrínsecamente ligado a `FluentTheme` y a las convenciones de Fluent Design, asegurando que todo el árbol de widgets descendiente reciba el contexto visual y de comportamiento correcto para Windows.

### 3.2 Tematización Fluent: `FluentTheme` y `AccentColor`

El sistema de diseño Fluent de Microsoft pone un gran énfasis en la luz, la profundidad, el material y el color. El paquete `fluent_ui` encapsula esto a través de los widgets `FluentTheme` y, más importante para la configuración, la clase `FluentThemeData`. Esta clase te permite personalizar casi todos los aspectos visuales de tu aplicación.

Configuras `FluentThemeData` principalmente dentro de `FluentApp`, proporcionando instancias para `theme` (modo claro) y `darkTheme` (modo oscuro).

**Propiedades esenciales de `FluentThemeData`:**

- **`brightness`**: (`Brightness.light` o `Brightness.dark`). Indica explícitamente si este conjunto de datos es para el tema claro u oscuro. Es crucial definirlo.
- **`accentColor`**: Define el color de acento principal. Este color es vital, ya que se usa para resaltar controles interactivos (botones activos, sliders, checkboxes marcados), indicar el foco y guiar la atención del usuario. `fluent_ui` introduce el tipo `AccentColor`, que no es solo un color plano, sino una rampa de colores derivados del color base (más claro, más oscuro, normal). Esto es fundamental en Fluent Design. Se crea fácilmente desde un `Color` estándar usando el método de extensión `.toAccentColor()` (ej: `Colors.orange.toAccentColor()`).
- **`scaffoldBackgroundColor`**: El color de fondo predeterminado para las páginas (`ScaffoldPage`).
- **`navigationPaneTheme`**: Una instancia de `NavigationPaneThemeData` para personalizar específicamente la apariencia del `NavigationView` (color de fondo, indicadores de selección, etc.). Lo veremos más adelante.
- **`typography`**: Permite definir `TextStyle` específicos para diferentes roles de texto (`body`, `caption`, `title`, `subtitle`, etc.). Por defecto, `fluent_ui` proporciona una tipografía que se alinea bien con los estándares de Windows (Segoe UI Variable).
- **`visualDensity`**: Tipo `VisualDensity` (`.standard`, `.compact`, `.comfortable`). Ajusta el "aire" y el tamaño general de los componentes, permitiendo adaptar la interfaz a diferentes escenarios (ej., pantallas táctiles vs. ratón/teclado, o preferencias de usuario).
- **`focusTheme`**: Una instancia de `FocusThemeData` que controla cómo se visualiza el indicador de foco en los elementos (grosor del borde, si usa un "glow"). Esencial para la accesibilidad y la navegación por teclado.
- **Colores específicos:** `FluentThemeData` también permite anular colores para muchos componentes individuales (botones, checkboxes, etc.), aunque a menudo es mejor confiar en el `accentColor` y los colores base para mantener la consistencia.

**¿Cómo acceder al tema actual dentro de tus widgets?**

Puedes obtener la instancia actual de `FluentThemeData` usando el método estático `FluentTheme.of(context)` dentro del método `build` de cualquier widget que esté por debajo de `FluentApp` en el árbol:

Dart

```
@override
Widget build(BuildContext context) {
  // Obtiene el tema actual (sea claro u oscuro)
  final FluentThemeData theme = FluentTheme.of(context);

  return Container(
    padding: const EdgeInsets.all(16.0),
    // Usa un color derivado del accentColor del tema actual
    color: theme.accentColor.lighter,
    child: Text(
      'Este texto usa el estilo "body" del tema.',
      // Usa un estilo de texto definido en la tipografía del tema
      style: theme.typography.body,
    ),
  );
}
```

Dominar la configuración de `FluentThemeData` es clave para lograr aplicaciones visualmente pulidas y coherentes. Te animo a experimentar cambiando el `accentColor` y explorando otras propiedades para ver su efecto directo en los widgets `fluent_ui`.

### 3.3 Navegación al Estilo Windows: Introducción a `NavigationView`

La navegación es un componente crítico de la experiencia de usuario. En el paradigma de diseño Fluent para aplicaciones de escritorio de Windows, el patrón de navegación principal más reconocible y recomendado es el **Panel de Navegación Lateral (Navigation View)**. El paquete `fluent_ui` nos proporciona una implementación robusta y altamente configurable de este patrón a través del widget `NavigationView`.

`NavigationView` ofrece una estructura familiar para los usuarios de Windows, que típicamente consiste en:

- **Un Panel (Pane):** Usualmente a la izquierda (o a veces arriba), contiene los principales destinos o secciones de la aplicación, representados a menudo por iconos y etiquetas de texto. Este panel puede adoptar diferentes modos de visualización (abierto, compacto, minimalista) para adaptarse al espacio disponible o a la interacción del usuario.
- **Un Área de Contenido:** El espacio principal donde se renderiza la vista o página correspondiente al elemento seleccionado en el panel.
- **Componentes Opcionales:** `NavigationView` puede incluir de forma integrada elementos como un botón de retroceso gestionado automáticamente, un `AutoSuggestBox` para búsquedas, elementos en la cabecera o pie de página del panel, y más.

Normalmente, `NavigationView` se utiliza como el widget principal dentro del `home` de tu `FluentApp` o como el cuerpo de una `ScaffoldPage` si representa la estructura principal de tu aplicación. Gestiona internamente gran parte de la lógica para cambiar entre vistas basándose en la selección del usuario en el panel.

Veamos un boceto estructural muy simplificado para ilustrar su uso (profundizaremos en sus detalles en la siguiente sección):

Dart

```
// En main.dart, podríamos tener:
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return FluentApp(
      title: 'App con NavigationView',
      themeMode: ThemeMode.system,
      theme: FluentThemeData(brightness: Brightness.light),
      darkTheme: FluentThemeData(brightness: Brightness.dark),
      // Usamos una pantalla que contiene el NavigationView como home
      home: const MainNavigationContainer(),
    );
  }
}

// Widget que construye el NavigationView
class MainNavigationContainer extends StatefulWidget {
  const MainNavigationContainer({super.key});

  @override
  State<MainNavigationContainer> createState() => _MainNavigationContainerState();
}

class _MainNavigationContainerState extends State<MainNavigationContainer> {
  // Estado para rastrear el índice del panel seleccionado
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return NavigationView(
      // El panel de navegación
      pane: NavigationPane(
        // Indica cuál ítem está seleccionado
        selected: _currentIndex,
        // Callback que se ejecuta cuando el usuario selecciona un ítem diferente
        onChanged: (newIndex) {
          setState(() {
            _currentIndex = newIndex;
          });
        },
        // Controla cómo se muestra el panel (abierto, compacto, etc.)
        displayMode: PaneDisplayMode.auto, // Se ajusta automáticamente al ancho
        // La lista de elementos de navegación
        items: <NavigationPaneItem>[
          // Un elemento de navegación (requiere un PaneItem o subclase)
          PaneItem(
            icon: const Icon(FluentIcons.home),
            title: const Text('Inicio'),
            // El widget que se mostrará cuando este ítem esté seleccionado
            body: const Center(child: Text('Contenido de la Página de Inicio')),
          ),
          // Otro elemento de navegación
          PaneItem(
            icon: const Icon(FluentIcons.contact_info),
            title: const Text('Perfil'),
            body: const Center(child: Text('Contenido de la Página de Perfil')),
          ),
        ],
        // También puedes añadir un header, footer, etc. al NavigationPane
        // footerItems: [ ... ]
      ),
      // Nota: NavigationView maneja el mostrar el 'body' del PaneItem seleccionado.
      // No necesitas un 'body' directamente en NavigationView cuando usas PaneItems con body.
    );
  }
}
```

Este widget es el caballo de batalla para la estructura de muchas aplicaciones Fluent. Su flexibilidad permite crear desde aplicaciones simples hasta interfaces complejas con múltiples niveles de navegación. En la próxima sección, desglosaremos `NavigationView` con mucho más detalle, explorando sus modos de visualización (`PaneDisplayMode`), los diferentes tipos de `NavigationPaneItem`, cómo personalizar su apariencia a través de `NavigationPaneThemeData`, y cómo gestionar el estado de la selección de manera efectiva.

## 4. Explorando los Widgets Clave de `fluent_ui`

Con los cimientos conceptuales ya establecidos – comprendiendo el rol de `FluentApp`, la importancia de `FluentTheme` y habiendo tenido un primer vistazo a `NavigationView` – ha llegado el momento de sumergirnos en el corazón práctico y tangible del paquete `fluent_ui`: su extensa y bien surtida biblioteca de widgets. Esta sección es donde la teoría se transforma en interfaces de usuario interactivas y funcionales.

El paquete `fluent_ui` nos brinda una colección rica y diversa de componentes prediseñados que buscan replicar fielmente los controles estándar que los usuarios esperan encontrar en una aplicación de Windows moderna, todo bajo los principios estéticos y funcionales de Fluent Design. Cubriremos desde los elementos que definen la estructura y guían la navegación del usuario, hasta la vasta gama de botones, campos para la entrada de datos, selectores, diálogos modales y formas de visualizar información. En esencia, `fluent_ui` nos equipa con los bloques de construcción necesarios para ensamblar aplicaciones de escritorio completas y pulidas.

En las subsecciones que siguen, realizaremos una exploración sistemática de los widgets más cruciales y de uso más frecuente, organizándolos por su propósito principal (estructura, comandos, entrada, visualización, etc.). Para cada widget destacado, analizaremos cómo instanciarlo correctamente, cuáles son sus propiedades de configuración más relevantes y cómo integrarlo eficazmente dentro de tu aplicación para crear esas experiencias de usuario fluidas, intuitivas y reconocibles que los usuarios de Windows aprecian. Nos enfocaremos no solo en identificar *qué* widget usar para cada necesidad, sino también en el *cómo* implementarlo siguiendo buenas prácticas, ilustrando su uso con ejemplos de código claros y comentados.

Prepárate para llenar tu caja de herramientas de desarrollo Flutter con los componentes esenciales que te permitirán construir interfaces de escritorio para Windows de la más alta calidad.

### 4.1. Estructura y Navegación

Los cimientos de cualquier aplicación bien diseñada residen en cómo se organiza su contenido y cómo el usuario se mueve a través de él. El paquete `fluent_ui` proporciona widgets robustos y flexibles para establecer estos patrones estructurales y de navegación fundamentales, asegurando que tu aplicación se sienta coherente con el resto del ecosistema Windows.

#### 4.1.1 `NavigationView`: El Epicentro de la Navegación

Ya tuvimos una introducción a `NavigationView` como el componente principal para la navegación global o de nivel superior en muchas aplicaciones Fluent. Ahora, profundicemos en sus capacidades y opciones de configuración.

- **Modos de Visualización del Panel (`PaneDisplayMode`):** Esta propiedad, configurada dentro de `NavigationPane`, es crucial para la adaptabilidad de tu interfaz. Define cómo se presenta el panel que contiene los elementos de navegación:
  - `PaneDisplayMode.auto`: **(Recomendado)** Se adapta inteligentemente al ancho de la ventana. Muestra el panel `open` (ancho, con iconos y texto) si hay espacio suficiente, y cambia a `compact` (estrecho, solo iconos visibles, se expande al pasar el ratón o al usar el botón "hamburguesa") cuando el espacio es limitado.
  - `PaneDisplayMode.open`: Fuerza el panel a permanecer siempre abierto y expandido.
  - `PaneDisplayMode.compact`: Fuerza el panel a permanecer siempre en modo compacto.
  - `PaneDisplayMode.minimal`: El panel está completamente oculto por defecto. Se muestra temporalmente como una superposición (flyout) cuando el usuario hace clic en el botón "hamburguesa". Ideal para pantallas muy pequeñas o cuando el contenido necesita el máximo espacio posible.
  - `PaneDisplayMode.top`: Cambia completamente el paradigma. En lugar de un panel lateral, los elementos de navegación se muestran en una barra horizontal en la parte superior de la ventana, similar a las pestañas de un navegador web. El panel lateral no se utiliza en este modo.
- **Construcción del Panel (`NavigationPane`):** Este widget se pasa a la propiedad `pane` de `NavigationView` y es donde defines qué se muestra en el panel.
  - **`items`**: Una `List` que contiene los elementos de navegación principales. No solo acepta `PaneItem`, sino también elementos estructurales:
    - `PaneItem`: El elemento de navegación estándar. Como mínimo, requiere un `icon` (un `Widget` `Icon`, usualmente con `FluentIcons`) y un `body` (el `Widget` que se mostrará en el área de contenido cuando este ítem esté seleccionado). Opcionalmente, puede tener un `title` (`Widget`, típicamente `Text`), un `infoBadge` (para mostrar notificaciones), y un `trailing` (widget adicional al final).
    - `PaneItemHeader`: Permite añadir un título (`Widget`, usualmente `Text`) dentro del panel para agrupar visualmente los `PaneItem`s que le siguen.
    - `PaneItemSeparator`: Añade una línea divisoria horizontal para separar grupos de ítems.
  - **`header`**: Un `Widget` opcional que se coloca en la parte superior del panel, por encima de la lista de `items`. Útil para mostrar un logo, el nombre de la aplicación o información contextual.
  - **`footerItems`**: Similar a `items`, pero esta lista de `NavigationPaneItem` (y/o `PaneItemSeparator`, `PaneItemHeader`) aparece fija en la parte inferior del panel. Es el lugar común para enlaces a "Configuración", "Ayuda", "Acerca de", o acciones como "Cerrar Sesión" (usando `PaneItemAction`).
  - **`selected`**: Propiedad `int` **fundamental** que indica el índice del `PaneItem` actualmente activo (considerando la concatenación de `items` y `footerItems`). Debes manejar este valor en el estado de tu `StatefulWidget`.
  - **`onChanged`**: Callback `ValueChanged<int>` que `NavigationView` invoca cuando el usuario selecciona un `PaneItem` diferente (haciendo clic o usando el teclado). Es **aquí donde debes llamar a `setState`** para actualizar tu variable de estado que almacena el índice actual (`_currentIndex` en los ejemplos).
  - **`autoSuggestBox`**: Permite integrar un `AutoSuggestBox` (widget de búsqueda con sugerencias) directamente en la parte superior del panel.
  - **`autoSuggestBoxReplacement`**: Un `Widget` que se muestra en lugar del `AutoSuggestBox` cuando el panel está en modo `compact`.
- **Gestión del Estado y Visualización del Contenido:**
  - La forma canónica de usar `NavigationView` es dentro de un `StatefulWidget`. La variable de estado (`_currentIndex`) controla la propiedad `selected` del `NavigationPane`.
  - La magia ocurre al definir la propiedad `body` dentro de cada `PaneItem`. `NavigationView` automáticamente escucha los cambios en `selected` y muestra el `body` correspondiente al `PaneItem` activo en el área de contenido principal. Esto simplifica enormemente la lógica, eliminando la necesidad manual de `IndexedStack` o condicionales complejos en muchos casos.
- **Botón de Retroceso (`NavigationAppBar`):** Para integrar una barra de título que incluya manejo automático del botón de retroceso (basado en el `Navigator` de Flutter), puedes usar `NavigationAppBar` en la propiedad `appBar` de `NavigationView`. Con `automaticallyImplyLeading: true`, mostrará el botón "<" cuando sea posible navegar hacia atrás.

Dart

```
// Ejemplo más detallado de StatefulWidget con NavigationView
class DetailedNavigationView extends StatefulWidget {
  const DetailedNavigationView({super.key});

  @override
  State<DetailedNavigationView> createState() => _DetailedNavigationViewState();
}

class _DetailedNavigationViewState extends State<DetailedNavigationView> {
  int _currentIndex = 0;

  // Es buena práctica definir tus páginas o vistas como widgets separados
  final List<Widget> _pageBodies = [
    const HomePageContent(),
    const MusicPageContent(),
    const SettingsPageContent(), // Página definida abajo
  ];

  @override
  Widget build(BuildContext context) {
    return NavigationView(
      // Barra de título integrada opcional
      appBar: const NavigationAppBar(
        title: Text("Mi App Fluent Completa"),
        automaticallyImplyLeading: true, // Gestiona botón <-
        // leading: Icon(FluentIcons.air_tickets), // Puedes poner un icono inicial
      ),
      pane: NavigationPane(
        selected: _currentIndex,
        onChanged: (index) => setState(() => _currentIndex = index),
        displayMode: PaneDisplayMode.auto, // Se adapta al ancho
        // Ejemplo de cabecera en el panel
        header: const Padding(
          padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 10.0),
          child: FlutterLogo(size: 30), // Placeholder
        ),
        items: [
          PaneItemHeader(header: const Text('Biblioteca')),
          PaneItem(
            icon: const Icon(FluentIcons.home),
            title: const Text('Inicio'),
            body: _pageBodies[0], // Asocia el widget del body directamente
          ),
          PaneItem(
            icon: const Icon(FluentIcons.music_in_collection_fill), // Icono relleno
            title: const Text('Música'),
            infoBadge: const InfoBadge(source: Text('Novedades')), // Pequeña notificación
            body: _pageBodies[1],
          ),
          PaneItemSeparator(), // Línea divisoria
        ],
        // Elementos fijos en la parte inferior del panel
        footerItems: [
          PaneItem(
            icon: const Icon(FluentIcons.settings),
            title: const Text('Configuración'),
            body: _pageBodies[2],
          ),
          // Ejemplo de acción directa en el pie (no cambia el body principal)
          PaneItemAction(
            icon: const Icon(FluentIcons.sign_out),
            title: const Text('Cerrar Sesión'),
            onTap: () {
              // Lógica para cerrar sesión
              debugPrint('Cerrando sesión...');
            },
          ),
        ],
      ),
      // NavigationView muestra automáticamente el 'body' del PaneItem seleccionado.
      // No es necesario un widget 'content' aquí si los PaneItems tienen 'body'.
    );
  }
}

// Widgets placeholder para el contenido de las páginas
class HomePageContent extends StatelessWidget {
  const HomePageContent({super.key});
  @override Widget build(BuildContext context) => const Center(child: Text('Contenido de Inicio'));
}

class MusicPageContent extends StatelessWidget {
  const MusicPageContent({super.key});
  @override Widget build(BuildContext context) => const Center(child: Text('Contenido de Música'));
}

// Página de Configuración usando ScaffoldPage (ver siguiente widget)
class SettingsPageContent extends StatelessWidget {
  const SettingsPageContent({super.key});
  @override
  Widget build(BuildContext context) {
    // Usamos ScaffoldPage para dar estructura a esta página interna
    return ScaffoldPage(
      header: const PageHeader(title: Text('Opciones de Configuración')),
      content: ListView( // Un ListView es común para listas de opciones
        padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
        children: [
          Text('Apariencia', style: FluentTheme.of(context).typography.subtitle),
          const SizedBox(height: 10),
          ToggleSwitch(
            checked: FluentTheme.of(context).brightness.isDark,
            onChanged: (v) { /* Lógica para cambiar tema */ },
            content: const Text('Activar modo oscuro (solo visual)'),
          ),
          const Divider(height: 30),
          Text('Cuenta', style: FluentTheme.of(context).typography.subtitle),
          const SizedBox(height: 10),
          const TextBox(placeholder: 'Tu nombre de usuario'),
          const SizedBox(height: 10),
          Button(child: const Text('Guardar cambios'), onPressed: () {}),
        ],
      ),
    );
  }
}
```

#### 4.1.2 `ScaffoldPage`: El Lienzo de tus Páginas

Mientras `NavigationView` se encarga de la estructura y navegación *global*, `ScaffoldPage` define la estructura *interna* estándar para cada vista o página individual dentro de tu aplicación Fluent. Es el contenedor natural para el `body` de tus `PaneItem` o el widget raíz de tus rutas navegables.

Piensa en él como el equivalente Fluent del `Scaffold` de Material Design. Sus partes principales son:

- **`header`**: Un `Widget` opcional que aparece en la parte superior del área de contenido. La convención es usar aquí el widget `PageHeader` para mostrar el título de la página y, opcionalmente, una `CommandBar` con acciones contextuales.
- **`content`**: El `Widget` principal que alberga el contenido específico de la página. Comúnmente será un `ListView`, `Column`, `Row`, `GridView`, `SingleChildScrollView`, o cualquier combinación que necesites para tu UI.
- **`bottomBar`**: Un `Widget` opcional que se ancla en la parte inferior de la página. Útil para barras de estado, resúmenes o conjuntos de acciones persistentes.
- **`padding`**: `ScaffoldPage` aplica un padding por defecto alrededor del `content`. Puedes anularlo estableciendo `padding: EdgeInsets.zero` si necesitas control absoluto del espacio, aunque el padding por defecto suele ser adecuado.

**Es una práctica muy recomendada envolver el contenido principal de cada página o vista de tu aplicación dentro de un `ScaffoldPage`** para lograr consistencia visual (márgenes, posicionamiento del header) y semántica.

Dart

```
// El ejemplo 'SettingsPageContent' anterior ya demuestra el uso de
// ScaffoldPage con header y content (usando ListView).

// Otro ejemplo simple de ScaffoldPage:
class SimpleInfoPage extends StatelessWidget {
  const SimpleInfoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ScaffoldPage(
      // Un PageHeader simple para el título
      header: const PageHeader(title: Text('Página de Información Simple')),
      // Contenido centrado como ejemplo
      content: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(FluentIcons.info, size: 48),
            SizedBox(height: 16),
            Text('Aquí se mostraría información relevante.'),
            SizedBox(height: 24),
            FilledButton(child: Text('Entendido'), onPressed: null) // Botón desactivado
          ],
        ),
      ),
      // Ejemplo de una barra inferior simple
      bottomBar: Container(
        alignment: Alignment.center,
        padding: const EdgeInsets.all(8.0),
        color: FluentTheme.of(context).navigationPaneTheme.backgroundColor,
        child: const Text('Barra inferior personalizada'),
      ),
    );
  }
}
```

#### 4.1.3 `TabView`: Navegación por Pestañas

No toda la navegación es jerárquica como en `NavigationView`. A veces, necesitas presentar múltiples vistas o documentos del mismo nivel, permitiendo al usuario cambiar entre ellos fácilmente. Para este patrón, `fluent_ui` ofrece el widget `TabView`. Es ideal para editores de documentos, navegadores de archivos simulados o cualquier interfaz donde el usuario gestiona múltiples contextos abiertos simultáneamente.

**Características clave de `TabView`:**

- **`tabs`**: Una `List<Tab>` que define cada una de las pestañas.
  - Cada `Tab` requiere un `key` (usualmente `UniqueKey()`, especialmente si las pestañas son dinámicas), un `header` (`Widget` que se muestra en la tira de pestañas, ej: `Text('Documento')`) y un `body` (`Widget` con el contenido de esa pestaña).
  - Opcionalmente, un `Tab` puede tener un `closeIcon` y un callback `onClosed` para manejar el cierre de pestañas individuales.
- **`currentIndex`**: `int` que indica el índice de la pestaña actualmente visible. **Necesita ser gestionado en un `StatefulWidget`**.
- **`onChanged`**: `ValueChanged<int>` que se llama cuando el usuario selecciona una pestaña diferente (haciendo clic o con atajos). Aquí actualizas tu estado (`_currentIndex`).
- **`onNewPressed`**: Callback opcional. Si se proporciona, `TabView` mostrará un botón '+' al final de la tira de pestañas, y este callback se ejecutará al presionarlo. Úsalo para añadir nuevas pestañas dinámicamente.
- **`onReorder`**: Callback opcional `void Function(int oldIndex, int newIndex)`. Si se proporciona, permite al usuario reordenar las pestañas arrastrándolas. Deberás implementar la lógica de reordenamiento en tu lista de pestañas dentro de `setState`.
- **`tabWidthBehavior`**: Controla el ancho de las pestañas en la tira (`TabWidthBehavior.equal` - todas iguales, `.sizeToContent` - se ajustan al `header`, `.compact` - ancho mínimo).
- **`closeButtonVisibility`**: Controla cuándo es visible el botón de cierre en cada pestaña (`CloseButtonVisibilityMode.always`, `.onHover`, `.never`).

Dart

```
// Ejemplo de TabView dinámico
class MyDynamicTabView extends StatefulWidget {
  const MyDynamicTabView({super.key});

  @override
  State<MyDynamicTabView> createState() => _MyDynamicTabViewState();
}

class _MyDynamicTabViewState extends State<MyDynamicTabView> {
  int _currentIndex = 0;
  final List<Tab> _tabs = []; // Empezamos con lista vacía

  @override
  void initState() {
    super.initState();
    // Añadimos una pestaña inicial al arrancar
    _addTab('Pestaña Inicial');
  }

  // Función para añadir una nueva pestaña
  void _addTab(String title) {
    final newKey = UniqueKey(); // Clave única para cada pestaña
    final newTab = Tab(
      key: newKey,
      header: Text(title),
      // Cada pestaña puede tener su propio ScaffoldPage o estructura
      body: ScaffoldPage(
        content: Center(
          child: Text('Contenido para: $title\nKey: $newKey'),
        ),
      ),
      // Callback para manejar el cierre de esta pestaña específica
      onClosed: () {
        setState(() {
          final tabIndex = _tabs.indexWhere((tab) => tab.key == newKey);
          if (tabIndex != -1) {
            _tabs.removeAt(tabIndex);
            // Ajustar el índice actual si es necesario después de cerrar
            if (_currentIndex >= _tabs.length) {
              _currentIndex = _tabs.isEmpty ? 0 : _tabs.length - 1;
            }
          }
        });
      },
    );

    setState(() {
      _tabs.add(newTab);
      // Opcional: activar la nueva pestaña añadida
      _currentIndex = _tabs.length - 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return TabView(
      tabs: _tabs, // Pasamos la lista de pestañas
      currentIndex: _currentIndex, // Indicamos cuál está activa
      onChanged: (index) => setState(() => _currentIndex = index), // Actualizamos el índice
      tabWidthBehavior: TabWidthBehavior.sizeToContent, // Ancho según contenido
      closeButtonVisibility: CloseButtonVisibilityMode.onHover, // Mostrar 'x' al pasar ratón

      // Habilitar el botón '+' para añadir pestañas
      showAddButton: true,
      onNewPressed: () {
        _addTab('Pestaña ${_tabs.length + 1}');
      },

      // Habilitar reordenamiento (requiere implementar la lógica)
      onReorder: (oldIndex, newIndex) {
        setState(() {
          // Lógica estándar de reordenamiento de listas en Dart
          if (oldIndex < newIndex) {
            newIndex -= 1; // Ajuste necesario por cómo funciona la inserción/remoción
          }
          final Tab item = _tabs.removeAt(oldIndex);
          _tabs.insert(newIndex, item);

          // Importante: Actualizar el currentIndex si la pestaña activa fue movida
          if (_currentIndex == oldIndex) {
            _currentIndex = newIndex;
          } else if (_currentIndex > oldIndex && _currentIndex <= newIndex) {
            // La pestaña activa estaba después de la movida, y se movió antes o a su posición
             _currentIndex--;
          } else if (_currentIndex < oldIndex && _currentIndex >= newIndex) {
             // La pestaña activa estaba antes de la movida, y se movió después o a su posición
             _currentIndex++;
          }
        });
      },
    );
  }
}
```

Estos tres widgets – `NavigationView`, `ScaffoldPage` y `TabView` – forman la columna vertebral para organizar la estructura y facilitar la navegación en la gran mayoría de las aplicaciones de escritorio desarrolladas con `fluent_ui`. Comprender a fondo sus propiedades y cómo combinarlos te permitirá crear interfaces complejas pero intuitivas y coherentes con el entorno Windows.

### 4.2. Comandos y Acciones

Una vez que hemos definido la estructura y la navegación, el siguiente paso crucial es permitir que los usuarios interactúen y realicen tareas. Los comandos y acciones, materializados principalmente a través de botones y barras de comandos, son el lenguaje mediante el cual los usuarios comunican sus intenciones a la aplicación. `fluent_ui` ofrece un conjunto rico y matizado de controles para este propósito.

#### 4.2.1 La Familia de Botones Fluent

No todos los botones son iguales, ni deben serlo. Fluent Design, y por ende `fluent_ui`, proporciona diferentes estilos de botones para distintas situaciones, ayudando a establecer una jerarquía visual clara para las acciones disponibles. Elegir el botón adecuado es clave para una buena UX.

- **`Button`**: El caballo de batalla estándar. Presenta un fondo sutil y un borde que se acentúa al interactuar (pasar el ratón o recibir foco). Es ideal para acciones secundarias, o cuando tienes varios botones de importancia similar en una misma área.
  - Props clave: `child` (el contenido, ej: `Text('Abrir')` o `Row(children: [Icon(FluentIcons.add), Text('Añadir')])`), `onPressed` (el `VoidCallback` que ejecuta la acción; si es `null`, el botón se deshabilita).
- **`FilledButton`**: Este botón destaca visualmente utilizando el color de acento (`accentColor`) del tema como fondo. Su prominencia lo hace perfecto para la **acción primaria** o más importante en un contexto determinado (ej: "Guardar" en un formulario, "Aceptar" en un diálogo). Se recomienda usarlo con moderación (generalmente uno por vista/diálogo) para mantener su impacto.
  - Props clave: `child`, `onPressed`.
- **`TextButton`**: El minimalista de la familia. Muestra su `child` (usualmente texto) sin fondo ni borde visible en reposo, revelando un fondo sutil solo durante la interacción. Es perfecto para acciones de baja prioridad, enlaces dentro de un texto, o en contextos donde un botón más pesado saturaría la UI (ej: el botón "Cancelar" junto a un `FilledButton` "Aceptar").
  - Props clave: `child`, `onPressed`.
- **`OutlinedButton`**: Similar al `Button` estándar, pero con un borde claramente visible en todo momento. Ofrece una alternativa visual y puede usarse para acciones de importancia media o para diferenciar grupos de botones.
  - Props clave: `child`, `onPressed`.
- **`ToggleButton`**: Representa un estado binario (encendido/apagado, activado/desactivado). Cambia su apariencia (generalmente el fondo o el borde) para indicar si está `checked` (activado) o no. Necesita ser usado dentro de un `StatefulWidget` para gestionar su estado.
  - Props clave: `child`, `checked` (el `bool` que refleja el estado actual), `onChanged` (el `ValueChanged<bool>` que se invoca cuando el usuario cambia el estado, donde debes llamar a `setState`).

Dart

```
// Widget de demostración para varios tipos de botones básicos
class ButtonShowcase extends StatefulWidget {
  const ButtonShowcase({super.key});
  @override
  State<ButtonShowcase> createState() => _ButtonShowcaseState();
}

class _ButtonShowcaseState extends State<ButtonShowcase> {
  bool _isToggleOn = false; // Estado para el ToggleButton

  @override
  Widget build(BuildContext context) {
    // Usamos Wrap para que los botones fluyan si no caben en una línea
    return Wrap(
      spacing: 12.0, // Espacio horizontal entre botones
      runSpacing: 12.0, // Espacio vertical si hay saltos de línea
      alignment: WrapAlignment.start, // Alineación
      children: [
        // Botón Estándar
        Button(
          child: const Text('Acción Estándar'),
          onPressed: () => debugPrint('Button presionado'),
        ),
        // Botón Relleno (Primario)
        FilledButton(
          child: const Text('Acción Primaria'),
          onPressed: () => debugPrint('FilledButton presionado'),
        ),
        // Botón de Texto (Secundario/Discreto)
        TextButton(
          child: const Text('Acción Secundaria'),
          onPressed: () => debugPrint('TextButton presionado'),
        ),
        // Botón con Borde
        OutlinedButton(
          child: const Row( // Contenido con icono y texto
             mainAxisSize: MainAxisSize.min, // Ajusta al contenido
             children: [Icon(FluentIcons.download), SizedBox(width: 8), Text('Descargar')],
           ),
          onPressed: () => debugPrint('OutlinedButton presionado'),
        ),
        // Botón Toggle
        ToggleButton(
          checked: _isToggleOn, // Vincula al estado
          onChanged: (value) { // Actualiza el estado al cambiar
            setState(() => _isToggleOn = value);
            debugPrint('ToggleButton cambiado a: $value');
          },
          child: Text(_isToggleOn ? 'Modo ON' : 'Modo OFF'),
        ),
        // Ejemplo de botón deshabilitado (cualquier tipo funciona igual)
        const Button(
          child: Text('Deshabilitado'),
          onPressed: null, // La clave es onPressed: null
        ),
      ],
    );
  }
}
```

Además de estos botones básicos, `fluent_ui` incluye variantes más complejas para menús desplegables:

- **`DropDownButton`**: Este botón no ejecuta una acción directamente. Su propósito es mostrar un menú desplegable (un `Flyout`, típicamente `MenuFlyout`) cuando se presiona, permitiendo al usuario seleccionar una opción de una lista.
  - Props clave: `title` (el `Widget` visible en el botón, ej: `Text` mostrando la selección actual), `items` (una `List<MenuFlyoutItemBase>` que define las opciones del menú, como `MenuFlyoutItem` o `MenuFlyoutSeparator`). Cada `MenuFlyoutItem` tiene su propio `onPressed`.
- **`SplitButton`**: Una combinación inteligente. Presenta una parte principal a la izquierda (que actúa como un botón normal para una acción frecuente) y una flecha a la derecha que abre un menú desplegable (`Flyout`) con acciones relacionadas o alternativas.
  - Props clave: `child` (el `Widget` para la parte principal), `onInvoked` (el `VoidCallback` para la acción principal), `flyout` (el `MenuFlyout` que contiene las opciones secundarias), `controller` (un `FlyoutController` para gestionar el estado del menú, **importante crearlo y liberarlo**).

Dart

```
// Widget de demostración para DropDownButton y SplitButton
class DropdownSplitButtonShowcase extends StatefulWidget {
  const DropdownSplitButtonShowcase({super.key});
  @override
  State<DropdownSplitButtonShowcase> createState() => _DropdownSplitButtonShowcaseState();
}

class _DropdownSplitButtonShowcaseState extends State<DropdownSplitButtonShowcase> {
  String _selectedOption = 'Opción A'; // Estado para DropDownButton
  final _splitFlyoutController = FlyoutController(); // Controller para SplitButton

  @override
  void dispose() {
    _splitFlyoutController.dispose(); // ¡No olvides liberar el controller!
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Definimos el contenido del menú para el SplitButton
    final splitMenu = MenuFlyout(items: [
      MenuFlyoutItem(
        leading: const Icon(FluentIcons.edit),
        text: const Text('Editar elemento'),
        onPressed: () => debugPrint('SplitButton Menu: Editar'),
      ),
      MenuFlyoutItem(
        leading: const Icon(FluentIcons.copy),
        text: const Text('Duplicar elemento'),
        onPressed: () => debugPrint('SplitButton Menu: Duplicar'),
      ),
      const MenuFlyoutSeparator(),
      MenuFlyoutItem(
        leading: const Icon(FluentIcons.delete, color: Colors.errorPrimaryColor), // Icono con color
        text: const Text('Eliminar', style: TextStyle(color: Colors.errorPrimaryColor)), // Texto con color
        onPressed: () => debugPrint('SplitButton Menu: Eliminar'),
      ),
    ]);

    return Wrap(
      spacing: 12.0,
      runSpacing: 12.0,
      alignment: WrapAlignment.start,
      children: [
        // DropDownButton para selección simple
        DropDownButton(
          title: Text('Seleccionado: $_selectedOption'), // Muestra estado actual
          items: ['Opción A', 'Opción B', 'Opción C'].map((option) =>
            MenuFlyoutItem(
              text: Text(option),
              onPressed: () => setState(() => _selectedOption = option),
            )
          ).toList(), // Genera los ítems del menú
        ),

        // SplitButton: Acción principal + menú secundario
        SplitButton(
          controller: _splitFlyoutController, // Asocia el controller
          flyout: splitMenu, // Asocia el menú definido arriba
          // Parte principal del botón
          child: const Text('Acción Principal'),
          // Callback para la acción principal (click en la parte izquierda)
          onInvoked: () => debugPrint('SplitButton: Acción Principal Invocada'),
        ),
      ],
    );
  }
}
```

#### 4.2.2 `CommandBar`: Organizando Acciones Contextuales

Cuando necesitas presentar un conjunto de acciones relacionadas con la vista actual o con un elemento seleccionado (por ejemplo, en una tabla o lista), `CommandBar` es la solución ideal. Agrupa los comandos de forma estructurada y adaptable, generalmente ubicada en el `header` o `bottomBar` de un `ScaffoldPage`.

**Características destacadas de `CommandBar`:**

- **`primaryItems`**: Una `List<CommandBarItem>` para las acciones **principales** o más usadas. Se muestran directamente en la barra si el espacio lo permite.
- **`secondaryItems`**: Una `List<CommandBarItem>` para acciones **secundarias**, menos frecuentes o que no caben. Se agrupan automáticamente en un menú desplegable accesible mediante un botón "más" (`...`), conocido como `CommandBarOverflowButton`.
- **Tipos de `CommandBarItem`:**
  - `CommandBarButton`: El más común. Representa un botón dentro de la barra. Requiere `icon` (`Widget`), `label` (`String`) y `onPressed` (`VoidCallback`). Puede tener `tooltipMessage` para ayuda contextual.
  - `CommandBarSeparator`: Añade un separador visual (una línea vertical u horizontal dependiendo de la orientación) entre ítems, tanto primarios como secundarios.
  - `CommandBarBuilderItem`: Permite incrustar un widget completamente personalizado (`builder`) dentro de la barra. Útil para añadir `ToggleSwitch`, `ComboBox`, `TextBox` o cualquier otro control directamente en la `CommandBar`. Necesita un `wrappedItem` que es el widget a construir.
- **Adaptabilidad (Overflow):** `CommandBar` es inteligente. Si el ancho disponible se reduce, moverá automáticamente ítems desde `primaryItems` hacia el menú secundario (overflow) para evitar que la barra se desborde y rompa la UI. Puedes influir ligeramente en este comportamiento con la propiedad `overflowBehavior`.

Dart

```
// Widget de demostración para CommandBar
class CommandBarShowcase extends StatelessWidget {
  const CommandBarShowcase({super.key});

  @override
  Widget build(BuildContext context) {
    return CommandBar(
      // Acciones principales (visibles si caben)
      primaryItems: [
        CommandBarButton(
          icon: const Icon(FluentIcons.add_to),
          label: 'Añadir',
          onPressed: () => debugPrint('CB: Añadir'),
        ),
        CommandBarButton(
          icon: const Icon(FluentIcons.edit),
          label: 'Editar',
          onPressed: () => debugPrint('CB: Editar'),
        ),
         CommandBarButton(
          icon: const Icon(FluentIcons.refresh),
          label: 'Refrescar',
          onPressed: () {},
        ),
        const CommandBarSeparator(), // Separador
        // Ejemplo de widget personalizado (ToggleSwitch) en la barra primaria
        CommandBarBuilderItem(
          // Tooltip para el widget interno
          builder: (context, mode, child) => Tooltip(message: 'Mostrar/Ocultar detalles', child: child),
          // El widget que se inserta
          wrappedItem: Row( // Usamos Row para añadir texto al Toggle
             mainAxisSize: MainAxisSize.min,
             children: [
                ToggleSwitch(checked: true, onChanged: (v){}),
                const SizedBox(width: 8),
                const Text('Detalles')
             ]
          )
        ),
      ],
      // Acciones secundarias (siempre en el menú '...' o si no caben las primarias)
      secondaryItems: [
        CommandBarButton(
          icon: const Icon(FluentIcons.archive),
          label: 'Archivar Selección',
          onPressed: () => debugPrint('CB: Archivar (sec)'),
        ),
        CommandBarButton(
          icon: const Icon(FluentIcons.share),
          label: 'Compartir',
          onPressed: () => debugPrint('CB: Compartir (sec)'),
        ),
         CommandBarButton(
          icon: const Icon(FluentIcons.properties),
          label: 'Propiedades',
          onPressed: () => debugPrint('CB: Propiedades (sec)'),
        ),
      ],
    );
  }
}

// Ejemplo de cómo integrar CommandBar en una ScaffoldPage
class PageWithCommandBar extends StatelessWidget {
  const PageWithCommandBar({super.key});
  @override
  Widget build(BuildContext context) {
    return const ScaffoldPage(
      // La CommandBar se integra comúnmente en el PageHeader
      header: PageHeader(
        title: Text('Gestión de Elementos'),
        commandBar: CommandBarShowcase(), // Usamos el widget de ejemplo anterior
      ),
      content: Center(
        child: Text('Aquí iría una lista o tabla con elementos seleccionables'),
      ),
    );
  }
}
```

Utilizar adecuadamente la variedad de botones y agrupar las acciones contextualmente con `CommandBar` son prácticas esenciales para crear interfaces Fluent claras, eficientes y fáciles de usar. Ayudan al usuario a entender la importancia relativa de cada acción y a encontrar los comandos que necesita de forma intuitiva.

### 4.3. Controles de Entrada

Una parte fundamental de cualquier aplicación interactiva es la capacidad del usuario para ingresar datos. Ya sea texto libre, seleccionar opciones de una lista, elegir fechas, o ajustar valores en un rango, `fluent_ui` nos equipa con un arsenal completo de controles de entrada diseñados para ser intuitivos, eficientes y visualmente coherentes con el entorno Windows.

#### 4.3.1 Entrada de Texto

- **`TextBox`**: Es el widget esencial para capturar texto, ya sea en una sola línea o en múltiples líneas.
  - **Propiedades Clave:**
    - `controller`: Un `TextEditingController` estándar de Flutter para obtener y manipular el texto del campo.
    - `placeholder`: `String` que se muestra como pista dentro del campo cuando está vacío.
    - `header`: Una etiqueta (`String` o `Widget`) que aparece encima del campo para identificarlo.
    - `maxLines`: Número de líneas visibles. Por defecto es 1. Usa `null` o un valor > 1 para permitir entrada multilínea (aparecerá un scroll si el texto excede `maxLines`).
    - `onChanged`: `ValueChanged<String>` que se dispara en cada pulsación de tecla que modifica el contenido.
    - `onSubmitted`: `ValueChanged<String>` que se dispara cuando el usuario indica que ha finalizado la entrada (ej: presionando Enter en un campo de una sola línea).
    - `prefix` / `suffix`: Widgets opcionales para colocar antes o después del área de texto (útil para iconos, unidades, etc.).
    - `highlightColor`: Permite sobreescribir el color de acento usado para el borde y el `header` cuando el `TextBox` tiene el foco.
- **`PasswordBox`**: Variante especializada de `TextBox` diseñada para la entrada segura de contraseñas. Automáticamente ofusca los caracteres ingresados.
  - **Propiedades Clave:** Hereda muchas de `TextBox` (`controller`, `placeholder`, `header`...).
  - `revealMode`: Controla la visibilidad de la contraseña (`PasswordRevealMode.peek` muestra un icono de "ojo" para revelar temporalmente, `.hidden` lo oculta, `.visible` la muestra siempre – ¡cuidado con este último!).
- **`AutoSuggestBox<T>`**: Un control potente que combina un `TextBox` con un menú desplegable (`Flyout`) que muestra sugerencias relevantes mientras el usuario escribe. Ideal para búsquedas, campos de "tags" o selección rápida de ítems de listas largas.
  - **Propiedades Clave:**
    - `controller`: `TextEditingController` para la parte de entrada de texto.
    - `items`: **Fundamental**. Es una `List<AutoSuggestBoxItem<T>>` que define las sugerencias *actualmente* disponibles. **Debes actualizar esta lista dinámicamente** (usualmente en `onChanged` o mediante un listener en el `controller`) basándote en el texto que el usuario está escribiendo.
    - `onSelected`: `ValueChanged<AutoSuggestBoxItem<T>>` que se invoca cuando el usuario selecciona una sugerencia del menú desplegable. Aquí es donde normalmente actualizas el `controller` con el valor seleccionado.
    - `onChanged`: `ValueChanged<String>` que se dispara al cambiar el texto. Úsalo para la lógica de filtrado y actualización de `items`.

Dart

```
// Widget de demostración para entradas de texto
class TextInputShowcase extends StatefulWidget {
  const TextInputShowcase({super.key});
  @override
  State<TextInputShowcase> createState() => _TextInputShowcaseState();
}

class _TextInputShowcaseState extends State<TextInputShowcase> {
  // Controllers para gestionar el texto
  final _nameController = TextEditingController(text: 'Valor Inicial Opcional');
  final _passwordController = TextEditingController();
  final _suggestController = TextEditingController();

  // Datos de ejemplo y estado para AutoSuggestBox
  final List<String> _fruitDatabase = ['Manzana', 'Banana', 'Naranja', 'Fresa', 'Arándano', 'Mango', 'Melón'];
  List<String> _currentSuggestions = [];

  @override
  void initState() {
    super.initState();
    // Inicializar sugerencias (podrían cargarse asíncronamente)
    _currentSuggestions = _fruitDatabase;
    // Escuchar cambios en el texto del AutoSuggestBox para filtrar
    _suggestController.addListener(_filterSuggestions);
  }

  @override
  void dispose() {
    // ¡Siempre liberar los controllers!
    _nameController.dispose();
    _passwordController.dispose();
    _suggestController.removeListener(_filterSuggestions); // Quitar listener
    _suggestController.dispose();
    super.dispose();
  }

  // Lógica para filtrar sugerencias basada en el texto actual
  void _filterSuggestions() {
    final query = _suggestController.text.toLowerCase();
    setState(() {
      if (query.isEmpty) {
        _currentSuggestions = _fruitDatabase; // Mostrar todo si no hay texto
      } else {
        _currentSuggestions = _fruitDatabase
            .where((fruit) => fruit.toLowerCase().contains(query))
            .toList();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // TextBox simple con header y placeholder
        TextBox(
          controller: _nameController,
          header: 'Nombre de Usuario:',
          placeholder: 'Escribe tu nombre de usuario',
          // onChanged: (s) => print('Nombre cambiado: $s'), // Para debug o lógica simple
        ),
        const SizedBox(height: 16),

        // PasswordBox con modo de revelación
        PasswordBox(
          controller: _passwordController,
          header: 'Contraseña:',
          placeholder: 'Introduce tu clave secreta',
          revealMode: PasswordRevealMode.peek, // Icono de ojo para ver/ocultar
        ),
        const SizedBox(height: 16),

        // AutoSuggestBox con filtrado dinámico
        AutoSuggestBox<String>(
          controller: _suggestController,
          header: 'Busca una fruta:',
          placeholder: 'Ej: Manzana, Banana...',
          // Genera los items para el flyout a partir de las sugerencias filtradas
          items: _currentSuggestions.map((fruit) => AutoSuggestBoxItem<String>(
                value: fruit, // El valor real asociado al item
                label: fruit, // El texto mostrado en la lista de sugerencias
                // Callback opcional si seleccionan este item específico
                // onSelected: () => print('$fruit seleccionado vía item callback'),
              )).toList(),
          // Callback principal cuando se selecciona una sugerencia
          onSelected: (item) {
            final selectedValue = item.value ?? '';
            debugPrint('Fruta seleccionada: $selectedValue');
            setState(() {
              // Actualizar el texto del campo con la selección
              _suggestController.text = selectedValue;
              // Opcional: Mover el cursor al final
              _suggestController.selection = TextSelection.fromPosition(
                TextPosition(offset: _suggestController.text.length),
              );
              // Opcional: Limpiar sugerencias tras seleccionar
              // _currentSuggestions = [];
            });
          },
        ),
        const SizedBox(height: 16),
         // TextBox multilínea
        TextBox(
          header: 'Descripción (Opcional):',
          placeholder: 'Añade una descripción detallada aquí...',
          maxLines: 4, // Permite 4 líneas visibles, con scroll si se excede
          // controller: _descriptionController, // Necesitarías otro controller
        ),
      ],
    );
  }
}
```

#### 4.3.2 Controles de Selección

Estos widgets permiten al usuario elegir entre un conjunto de opciones.

- **`Checkbox`**: El control estándar para opciones booleanas (sí/no) o para permitir selecciones múltiples en una lista.
  - Props Clave: `checked` (el estado `bool?`, puede ser `null` para un estado indeterminado/mixto), `onChanged` (`ValueChanged<bool?>` que se llama al cambiar el estado), `content` (el `Widget` etiqueta, usualmente `Text`).
- **`RadioButton`**: Usado cuando el usuario debe seleccionar **una y solo una** opción de un grupo mutuamente exclusivo.
  - Props Clave: `checked` (`bool` que indica si *este* radio button está seleccionado), `onChanged` (`ValueChanged<bool>`), `content` (`Widget` etiqueta).
  - **Gestión de Grupo:** Debes manejar la lógica de exclusividad en tu `StatefulWidget`. Típicamente, tendrás una variable de estado que almacena el valor de la opción seleccionada para todo el grupo (ej: un `enum` o `String`). Cada `RadioButton` compara su propio valor con el valor seleccionado del grupo para determinar su estado `checked` y actualiza el valor del grupo en `onChanged`.
- **`ToggleSwitch`**: Una alternativa visualmente prominente al `Checkbox`, a menudo preferida para activar o desactivar configuraciones o modos.
  - Props Clave: `checked` (`bool` indicando el estado on/off), `onChanged` (`ValueChanged<bool>`), `content` (`Widget` etiqueta que aparece a la derecha).
- **`ComboBox<T>`**: Un control compacto que muestra el valor actual y, al hacer clic, despliega una lista (`Flyout`) para seleccionar un valor diferente de un conjunto predefinido. Muy útil en formularios.
  - Props Clave:
    - `items`: `List<ComboBoxItem<T>>`. Define las opciones disponibles. Cada `ComboBoxItem` tiene un `value` único (de tipo `T`) y un `child` (`Widget`, usualmente `Text`) para mostrar en la lista desplegable.
    - `value`: El valor actual (`T`) seleccionado. Debe coincidir (semánticamente, usando `==`) con el `value` de uno de los `items` para que se muestre correctamente.
    - `onChanged`: `ValueChanged<T?>` que se dispara cuando el usuario selecciona un nuevo valor de la lista. Recibe el `value` del `ComboBoxItem` seleccionado.
    - `placeholder`: `Widget` (ej: `Text('Seleccionar...')`) que se muestra si `value` es `null` o no coincide con ningún `value` en `items`.

Dart

```
// Widget de demostración para controles de selección
class SelectionControlsShowcase extends StatefulWidget {
  const SelectionControlsShowcase({super.key});
  @override
  State<SelectionControlsShowcase> createState() => _SelectionControlsShowcaseState();
}

// Enum para las opciones del RadioButton, mejora la legibilidad y seguridad de tipo
enum _DeliveryOptions { standard, express, pickup }

class _SelectionControlsShowcaseState extends State<SelectionControlsShowcase> {
  bool? _acceptTerms = false; // Estado Checkbox (puede ser null si se permite indeterminado)
  _DeliveryOptions _selectedDelivery = _DeliveryOptions.standard; // Estado RadioButton
  bool _enableNotifications = true; // Estado ToggleSwitch
  String? _selectedColor; // Estado ComboBox (String opcional)

  final List<String> _availableColors = ['Rojo', 'Verde', 'Azul', 'Amarillo'];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Checkbox con etiqueta
        Checkbox(
          checked: _acceptTerms,
          onChanged: (value) => setState(() => _acceptTerms = value),
          content: const Text('He leído y acepto los términos'),
        ),
        const SizedBox(height: 16),

        // Grupo de RadioButtons
        const Text('Método de Envío:'),
        // Iteramos sobre las opciones del enum para crear los RadioButtons
        ..._DeliveryOptions.values.map((option) => RadioButton(
              checked: _selectedDelivery == option, // Comprueba si esta opción es la seleccionada
              onChanged: (checked) {
                // Si se marca (checked es true), actualiza el estado del grupo
                if (checked) setState(() => _selectedDelivery = option);
              },
              content: Text(option.toString().split('.').last), // Muestra el nombre de la opción
            )),
        const SizedBox(height: 16),

        // ToggleSwitch para una configuración
        ToggleSwitch(
          checked: _enableNotifications,
          onChanged: (value) => setState(() => _enableNotifications = value),
          content: const Text('Habilitar notificaciones push'),
        ),
        const SizedBox(height: 16),

        // ComboBox para seleccionar un color
        ComboBox<String>(
          value: _selectedColor, // Vincula al valor seleccionado
          items: _availableColors.map((color) => ComboBoxItem<String>(
                value: color, // El valor asociado a este item
                child: Text(color), // Lo que se muestra en la lista desplegable
              )).toList(),
          onChanged: (value) { // Callback cuando se selecciona un nuevo item
            setState(() => _selectedColor = value);
            debugPrint('Color seleccionado: $value');
          },
          placeholder: const Text('Elige un color'), // Texto si no hay nada seleccionado
        ),
        const SizedBox(height: 8),
        // Mostrar la selección actual del ComboBox (opcional)
        Text('Color elegido: ${_selectedColor ?? "Ninguno"}'),
      ],
    );
  }
}
```

#### 4.3.3 Rangos y Valoraciones

Para entradas numéricas dentro de un rango o para calificaciones.

- **`Slider`**: El control deslizante estándar para seleccionar un valor (`double`) dentro de un rango (`min`, `max`). Puede ser continuo o discreto (usando `divisions`).
  - Props Clave: `value` (`double`), `onChanged` (`ValueChanged<double>`), `min`, `max`, `divisions` (`int` opcional para pasos discretos), `label` (`String` opcional que aparece sobre el control al arrastrar).
- **`RatingBar`**: Diseñado específicamente para que el usuario introduzca una calificación, típicamente representada por estrellas.
  - Props Clave: `rating` (`double`, el valor actual), `onChanged` (`ValueChanged<double>`), `amount` (`int`, número de estrellas/iconos, por defecto 5), `icon` y `ratedIcon` (`Widget`s opcionales para personalizar los iconos), `iconSize`.

Dart

```
// Widget de demostración para Slider y RatingBar
class RangeRatingShowcase extends StatefulWidget {
  const RangeRatingShowcase({super.key});
  @override
  State<RangeRatingShowcase> createState() => _RangeRatingShowcaseState();
}

class _RangeRatingShowcaseState extends State<RangeRatingShowcase> {
  double _volumeLevel = 25.0;
  double _satisfactionRating = 4.0;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Slider para ajustar volumen (0-100)
        Text('Nivel de Volumen: ${_volumeLevel.round()}%'), // Muestra valor redondeado
        Slider(
          value: _volumeLevel,
          min: 0.0,
          max: 100.0,
          // divisions: 10, // Descomenta para pasos discretos (0, 10, 20...)
          label: '${_volumeLevel.round()}', // Etiqueta que sigue al pulgar
          onChanged: (value) => setState(() => _volumeLevel = value),
        ),
        const SizedBox(height: 24),

        // RatingBar para satisfacción (1-5 estrellas)
        Text('Calificación de Satisfacción: ${_satisfactionRating.toStringAsFixed(1)}'),
        RatingBar(
          rating: _satisfactionRating,
          // onChanged permite valores intermedios si el usuario arrastra con precisión
          onChanged: (value) => setState(() => _satisfactionRating = value),
          amount: 5, // 5 estrellas en total
          iconSize: 32, // Tamaño más grande
          // Puedes personalizar los iconos:
          // icon: Icon(FluentIcons.favorite_star, color: Colors.grey[100]),
          // ratedIcon: Icon(FluentIcons.favorite_star_fill, color: Colors.yellow),
        ),
      ],
    );
  }
}
```

#### 4.3.4 Fechas y Horas

`fluent_ui` proporciona controles que utilizan los selectores de fecha y hora estándar de Windows, mostrados como `Flyout`.

- **`DatePicker`**: Un botón que, al ser presionado, despliega un calendario para seleccionar día, mes y año.
  - Props Clave: `selected` (`DateTime?`, la fecha actualmente seleccionada), `onChanged` (`ValueChanged<DateTime>` que se llama al confirmar una fecha), `header` (etiqueta), `startDate`, `endDate` (para limitar el rango seleccionable).
- **`TimePicker`**: Similar a `DatePicker`, pero despliega un selector de hora (hora, minuto, AM/PM o formato 24h).
  - Props Clave: `selected` (`DateTime?`, la hora seleccionada), `onChanged` (`ValueChanged<DateTime>`), `header` (etiqueta), `hourFormat` (`HourFormat.h` para 12h, `HourFormat.H` para 24h).

Dart

```
// Widget de demostración para DatePicker y TimePicker
class DateTimePickerShowcase extends StatefulWidget {
  const DateTimePickerShowcase({super.key});
  @override
  State<DateTimePickerShowcase> createState() => _DateTimePickerShowcaseState();
}

class _DateTimePickerShowcaseState extends State<DateTimePickerShowcase> {
  DateTime? _eventDate; // Estado para DatePicker
  DateTime? _eventTime; // Estado para TimePicker

  @override
  Widget build(BuildContext context) {
    // Para formatear la fecha/hora de forma localizada
    final localizations = MaterialLocalizations.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // DatePicker
        DatePicker(
          header: 'Fecha del Evento:',
          selected: _eventDate,
          onChanged: (date) => setState(() => _eventDate = date),
          // Ejemplo: Permitir solo fechas a partir de hoy
          // startDate: DateTime.now().subtract(const Duration(days: 1)),
        ),
        const SizedBox(height: 8),
        Text('Fecha seleccionada: ${_eventDate != null ? localizations.formatMediumDate(_eventDate!) : "No seleccionada"}'),
        const SizedBox(height: 16),

        // TimePicker
        TimePicker(
          header: 'Hora del Evento:',
          selected: _eventTime, // Necesita un DateTime, solo se usa la parte de la hora
          onChanged: (time) => setState(() => _eventTime = time),
           // hourFormat: HourFormat.H, // Descomenta para formato 24h
        ),
         const SizedBox(height: 8),
         Text('Hora seleccionada: ${_eventTime != null ? TimeOfDay.fromDateTime(_eventTime!).format(context) : "No seleccionada"}'),
      ],
    );
  }
}
```

La correcta implementación y el uso adecuado de estos controles de entrada son cruciales para crear formularios intuitivos, páginas de configuración claras y, en general, cualquier interfaz que requiera interacción y datos del usuario. La familiaridad que ofrecen estos controles a los usuarios de Windows es una ventaja significativa para la usabilidad de tu aplicación Flutter.

### 4.5. Iconografía y Estilo Visual

Para lograr una aplicación que no solo funcione bien sino que también *luzque* como una aplicación nativa de Windows, debemos prestar atención a dos elementos cruciales: una iconografía consistente y el uso adecuado de los efectos visuales distintivos de Fluent Design, como los materiales Acrylic y Mica.

#### 4.5.1 Iconografía Consistente con `FluentIcons`

Ya hemos utilizado iconos en varios ejemplos, pero vale la pena recalcar su importancia y cómo gestionarlos correctamente en `fluent_ui`. La consistencia en la iconografía es fundamental para la usabilidad y el reconocimiento rápido de funciones.

- **La Fuente Principal: `FluentIcons`**: El paquete `fluent_ui` incluye una clase estática llamada `FluentIcons` que contiene una **extensa colección** de iconos prediseñados que se alinean perfectamente con el estilo visual de Windows. Debes priorizar el uso de estos iconos siempre que sea posible.
  - **Uso:** Se emplean con el widget `Icon` estándar de Flutter: Dart`Icon(FluentIcons.save) // Guardar Icon(FluentIcons.cancel) // Cancelar o Cerrar Icon(FluentIcons.folder) // Carpeta Icon(FluentIcons.add) // Añadir Icon(FluentIcons.settings) // Configuración Icon(FluentIcons.sync_icon) // Sincronizar`
- **Consistencia Visual y Semántica:** Usar `FluentIcons` garantiza que los símbolos sean familiares para los usuarios acostumbrados al ecosistema Windows. Es importante elegir el icono que mejor represente **semánticamente** la acción o el objeto. Evita mezclar estilos de iconos (por ejemplo, usar iconos de Material Design junto con Fluent Icons) ya que esto rompe la coherencia visual.
- **Personalización Básica:** Puedes usar las propiedades estándar del widget `Icon` como `size` y `color` para ajustar la apariencia según tus necesidades. Sin embargo, a menudo el color se hereda correctamente del contexto (por ejemplo, el color de un `Button` o `ListTile`). No olvides añadir `semanticLabel` para mejorar la accesibilidad. Dart`IconButton( // Icono dentro de un botón interactivo icon: const Icon( FluentIcons.delete, size: 18.0, // Tamaño ajustado semanticLabel: 'Eliminar elemento', // Descripción para accesibilidad ), onPressed: () { /* ... */ }, )`

#### 4.5.2 Efectos Visuales: `Acrylic` y `Mica`

Fluent Design introduce materiales translúcidos que añaden profundidad, jerarquía visual y un toque de personalización (especialmente Mica) a las aplicaciones. `fluent_ui` implementa los dos más importantes: Acrylic y Mica.

- **`Acrylic`**: Este material simula un acrílico esmerilado. Es semitransparente y aplica un **desenfoque y ruido** al contenido que se encuentra *detrás* de él.
  - **Propósito:** Se utiliza principalmente para **superficies temporales** como menús desplegables (`Flyout`), paneles de navegación mostrados temporalmente (modo `minimal`), diálogos o barras laterales. Ayuda a mantener el foco en el contenido temporal sin perder completamente el contexto de lo que hay debajo.
  - **Widget:** `Acrylic(child: ...)`
  - **Props Clave:**
    - `tintColor`: `Color` para teñir sutilmente el efecto.
    - `tintOpacity`: `double` (0.0-1.0) para controlar la intensidad del tinte.
    - `blurAmount`: `double` (opcional) para ajustar la intensidad del desenfoque (valores más altos consumen más recursos).
    - `shape`: `BoxShape` (`.rectangle` o `.circle`).
  - **Consideraciones de Rendimiento:** Acrylic, especialmente con desenfoques altos, puede ser **más costoso computacionalmente** que los fondos opacos. Úsalo estratégicamente en áreas limitadas y evita animaciones complejas sobre fondos Acrylic si notas problemas de rendimiento.Dart`// Ejemplo conceptual: Fondo de un menú desplegable con Acrylic // (Este sería el contenido de un FlyoutContent) Acrylic( tintColor: FluentTheme.of(context).menuColor.withOpacity(0.7), // Tinte basado en el color de menú del tema blurAmount: 10, // Desenfoque moderado child: Padding( padding: const EdgeInsets.all(8.0), child: Column( mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [ MenuFlyoutItem(text: const Text('Opción 1'), onPressed: () {}), MenuFlyoutItem(text: const Text('Opción 2'), onPressed: () {}), ], ), ), )`
- **`Mica`**: Es el material distintivo para las **superficies principales y de larga duración** de las aplicaciones Fluent, como el fondo de la ventana. Es más sutil que Acrylic.
  - **Propósito:** Incorpora el color del **fondo de escritorio** del usuario y aplica un desenfoque muy ligero, creando una conexión visual con el entorno del sistema operativo. Ayuda a diferenciar las ventanas activas de las inactivas (el efecto es más pronunciado cuando la ventana tiene el foco).**Widget:** `Mica(child: ...)`**Props Clave:**
    - `child`: El contenido que se muestra encima del efecto Mica.`backgroundColor`: `Color` opcional para aplicar un tinte muy ligero.`brightness`: Permite ajustar el brillo general del efecto.**Uso Común:** Se aplica como widget raíz dentro de tu `ScaffoldPage` o incluso envolviendo el `NavigationView` principal si deseas que toda la ventana adopte este material.**Consideraciones de Rendimiento:** Mica está diseñado para ser **más eficiente** que Acrylic y es adecuado para fondos de ventana completos. Su visibilidad y efecto dependen en gran medida del fondo de escritorio elegido por el usuario y del estado (activo/inactivo) de la ventana.

Dart

```
// Aplicar Mica como fondo de una página completa
class PageWithMicaBackground extends StatelessWidget {
  const PageWithMicaBackground({super.key});

  @override
  Widget build(BuildContext context) {
    // Envuelve el ScaffoldPage.content (o todo el ScaffoldPage si prefieres)
    return ScaffoldPage(
      header: const PageHeader(title: Text('Ventana con Fondo Mica')),
      content: Mica(
         // Puedes darle un ligero tinte con el color de fondo del tema
         // backgroundColor: FluentTheme.of(context).scaffoldBackgroundColor.withOpacity(0.3),
         child: Center(
           child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                 Text('Este contenido está sobre un fondo Mica.'),
                 SizedBox(height: 20),
                 Button(onPressed: null, child: Text('Botón sobre Mica'))
              ]
           ),
         ),
      ),
    );
  }
}

// Para aplicarlo a toda la app, podrías envolver tu widget home en main.dart:
// home: Mica(child: MainNavigationContainer()), // Donde MainNavigationContainer tiene el NavigationView
```

La combinación cuidadosa de la iconografía estándar de `FluentIcons` y el uso estratégico de los materiales `Acrylic` (para superficies temporales) y `Mica` (para fondos principales) son detalles que marcan la diferencia y contribuyen enormemente a que tu aplicación Flutter se perciba como una aplicación de escritorio Windows verdaderamente nativa y moderna.

## 5. Construyendo una Aplicación Ejemplo con `fluent_ui`

¡La teoría está muy bien, pero la práctica es donde ocurre la magia! Ahora que hemos desglosado los componentes esenciales de `fluent_ui`, vamos a integrarlos para construir una aplicación de ejemplo funcional. Crearemos un **Gestor de Tareas Básico** que nos permitirá aplicar muchos de los widgets y conceptos vistos.

**Objetivo de la Aplicación Ejemplo:**

Nuestra aplicación "Fluent Tasks" permitirá:

1. Visualizar tareas pendientes y completadas en vistas separadas.
2. Añadir nuevas tareas a la lista de pendientes.
3. Marcar tareas como completadas (lo que las moverá a la vista correspondiente).
4. Eliminar tareas (con confirmación).
5. Tener una pequeña sección de "Ajustes" para simular cambios visuales (como el color de acento).

Esto nos dará la oportunidad perfecta para usar `NavigationView`, `ScaffoldPage`, `ListView`, `ListTile`, `Checkbox`, `TextBox`, `Button`, `CommandBar`, `ContentDialog`, `ToggleSwitch`, personalizar el `FluentTheme` y aplicar efectos como `Mica`.

**Paso 0: Preparación del Proyecto (Recordatorio Rápido)**

Asegúrate de tener un proyecto Flutter nuevo o existente con la dependencia `fluent_ui` añadida en tu `pubspec.yaml` y haber ejecutado `flutter pub get`. Nuestro punto de partida será un `lib/main.dart` con la estructura mínima de `FluentApp`:

Dart

```
// lib/main.dart (Punto de partida)
import 'package:fluent_ui/fluent_ui.dart';
// Importante ocultar Material Colors para evitar conflictos
import 'package:flutter/material.dart' hide Colors, TextButton hide ButtonStyle; // Ocultamos también TextButton y ButtonStyle

// Importaremos nuestras pantallas aquí más adelante
// import 'screens/main_screen.dart';

void main() {
  runApp(const FluentTaskManagerApp());
}

class FluentTaskManagerApp extends StatelessWidget {
  const FluentTaskManagerApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Definiremos un AccentColor por defecto más adelante
    final appAccentColor = Colors.blue.toAccentColor();

    return FluentApp(
      title: 'Fluent Tasks', // Título de la ventana
      debugShowCheckedModeBanner: false, // Ocultar banner debug
      color: appAccentColor, // Color usado por el SO

      // Configuración inicial de temas (mejoraremos esto)
      themeMode: ThemeMode.system, // Adaptarse al sistema
      darkTheme: FluentThemeData(
        brightness: Brightness.dark,
        accentColor: appAccentColor,
        visualDensity: VisualDensity.standard,
      ),
      theme: FluentThemeData(
        brightness: Brightness.light,
        accentColor: appAccentColor,
        visualDensity: VisualDensity.standard,
      ),

      // La pantalla principal de nuestra app
      // Usaremos un placeholder mientras creamos MainScreen
      home: const _AppLoader(),
    );
  }
}

// Placeholder simple mientras creamos la estructura principal
class _AppLoader extends StatelessWidget {
  const _AppLoader();
  @override Widget build(BuildContext context) {
    return const ScaffoldPage(
       content: Center(child: ProgressRing()),
    );
  }
}

// TODO: Reemplazar _AppLoader con la importación y uso de MainScreen cuando esté lista.
// home: const MainScreen(),
```

**Paso 1: Estructura Principal con `NavigationView`**

Vamos a crear la pantalla principal (`MainScreen`) que contendrá nuestro `NavigationView`. Esta pantalla será un `StatefulWidget` para poder gestionar qué sección está activa.

Crea un nuevo archivo `lib/screens/main_screen.dart`:

Dart

```
// lib/screens/main_screen.dart
import 'package:fluent_ui/fluent_ui.dart';

// Importa las páginas que definiremos a continuación
import 'tasks_page.dart';
import 'settings_page.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _activeIndex = 0; // Índice del panel de navegación activo

  // Widgets que representan el contenido de cada sección
  // Los crearemos en los siguientes pasos
  final List<Widget> _screens = [
    const TasksPage(showCompleted: false), // Página de tareas pendientes
    const TasksPage(showCompleted: true),  // Página de tareas completadas
    const SettingsPage(),                 // Página de ajustes
  ];

  @override
  Widget build(BuildContext context) {
    return NavigationView(
      // Barra de título opcional integrada
      appBar: const NavigationAppBar(
        title: Text("Fluent Tasks Manager"),
        // leading: FlutterLogo(), // Podrías poner un logo
      ),

      // Panel de navegación lateral
      pane: NavigationPane(
        selected: _activeIndex, // Vincula al estado
        onChanged: (index) => setState(() => _activeIndex = index), // Actualiza estado
        displayMode: PaneDisplayMode.auto, // Abierto o compacto según ancho
        size: const NavigationPaneSize(
           openMinWidth: 200, // Ancho mínimo cuando está abierto
           openMaxWidth: 280, // Ancho máximo
        ),

        // Elementos principales del panel
        items: [
          PaneItem(
            icon: const Icon(FluentIcons.list),
            title: const Text('Pendientes'),
            body: _screens[0], // Asocia el widget de contenido
          ),
          PaneItem(
            icon: const Icon(FluentIcons.checklist), // Usamos checklist en lugar de completed
            title: const Text('Completadas'),
            body: _screens[1],
          ),
        ],

        // Elementos en el pie del panel (para Ajustes)
        footerItems: [
          PaneItemSeparator(), // Separador visual
          PaneItem(
            icon: const Icon(FluentIcons.settings),
            title: const Text('Ajustes'),
            body: _screens[2],
          ),
        ],
      ),
      // El contenido principal es gestionado por la propiedad 'body' de los PaneItem
    );
  }
}

// --- Placeholders Temporales (Crea estos archivos o añádelos al final por ahora) ---
// Archivo: lib/screens/tasks_page.dart
// import 'package:fluent_ui/fluent_ui.dart';
// class TasksPage extends StatelessWidget {
//   final bool showCompleted;
//   const TasksPage({required this.showCompleted, super.key});
//   @override Widget build(BuildContext context) => Center(child: Text(showCompleted ? 'Vista Completadas' : 'Vista Pendientes'));
// }

// Archivo: lib/screens/settings_page.dart
// import 'package:fluent_ui/fluent_ui.dart';
// class SettingsPage extends StatelessWidget {
//   const SettingsPage({super.key});
//   @override Widget build(BuildContext context) => const Center(child: Text('Vista Ajustes'));
// }

// --- Actualiza lib/main.dart ---
// Añade al inicio: import 'screens/main_screen.dart';
// Reemplaza: home: const _AppLoader(), por home: const MainScreen(),
```

- **¡Importante!** No olvides crear los archivos `tasks_page.dart` y `settings_page.dart` (aunque sea con los placeholders) y actualizar `main.dart` para usar `MainScreen` como `home`.

**Paso 2: Creación de Páginas con `ScaffoldPage` y `CommandBar`**

Ahora daremos cuerpo a `TasksPage`. Usaremos `ScaffoldPage` para su estructura interna y añadiremos una `CommandBar` para la acción de añadir tareas. Necesitamos también un modelo simple para representar una tarea y gestionar el estado de la lista (usaremos un `StatefulWidget` simple aquí; en una app real, considera un gestor de estado como Provider o Riverpod).

1. Crea el modelo `lib/models/task.dart`:

Dart

```
// lib/models/task.dart
class Task {
  final String id;
  String title;
  bool isCompleted;

  Task({required this.id, required this.title, this.isCompleted = false});

  // Sobrescribimos == y hashCode para facilitar búsquedas y comparaciones en listas
  @override
  bool operator ==(Object other) =>
      identical(this, other) || other is Task && runtimeType == other.runtimeType && id == other.id;

  @override
  int get hashCode => id.hashCode;
}
```

2. Desarrolla `lib/screens/tasks_page.dart`

Dart

```
// lib/screens/tasks_page.dart
import 'package:fluent_ui/fluent_ui.dart';
import 'package:flutter/material.dart' show MaterialLocalizations; // Para formatear fechas si es necesario
import '../models/task.dart';

// Simulación de almacenamiento/estado global simple (¡NO USAR EN PRODUCCIÓN!)
// En una app real, esto estaría en un gestor de estado (Provider, Riverpod, Bloc, etc.)
final List<Task> _globalTasks = [
  Task(id: 'task-1', title: 'Aprender NavigationView', isCompleted: true),
  Task(id: 'task-2', title: 'Implementar ScaffoldPage'),
  Task(id: 'task-3', title: 'Añadir CommandBar y TextBox'),
  Task(id: 'task-4', title: 'Usar ListView con ListTile', isCompleted: true),
  Task(id: 'task-5', title: 'Probar ContentDialog'),
];

class TasksPage extends StatefulWidget {
  final bool showCompleted; // Flag para decidir qué tareas mostrar
  const TasksPage({required this.showCompleted, super.key});

  @override
  State<TasksPage> createState() => _TasksPageState();
}

class _TasksPageState extends State<TasksPage> {
  final TextEditingController _newTaskController = TextEditingController();
  final ScrollController _scrollController = ScrollController(); // Para el ListView

  // Filtra la lista global según el estado requerido por esta instancia de la página
  List<Task> get _filteredTasks => _globalTasks.where((task) => task.isCompleted == widget.showCompleted).toList();

  // Función para añadir una nueva tarea (modifica la lista global)
  void _addTask() {
    final title = _newTaskController.text.trim();
    if (title.isNotEmpty) {
      setState(() { // Actualiza el estado local para reflejar el cambio global
        _globalTasks.add(Task(
          id: DateTime.now().microsecondsSinceEpoch.toString(), // ID simple único
          title: title,
        ));
      });
      _newTaskController.clear(); // Limpia el campo
      // Opcional: Mostrar InfoBar de éxito
    }
  }

  // Función para cambiar el estado de completado de una tarea
  void _toggleTaskCompletion(Task task) {
    setState(() { // Actualiza estado local
       final taskIndex = _globalTasks.indexWhere((t) => t.id == task.id);
       if (taskIndex != -1) {
          _globalTasks[taskIndex].isCompleted = !_globalTasks[taskIndex].isCompleted;
       }
    });
  }

   // Función para eliminar una tarea (con confirmación)
  void _deleteTask(Task task) async {
    // Usamos nuestra función helper de diálogo definida anteriormente (o similar)
    bool confirmed = await showDialog<bool>(
        context: context,
        builder: (context) => ContentDialog(
          title: const Text('Confirmar Eliminación'),
          content: Text('¿Seguro que deseas eliminar la tarea "${task.title}"?'),
          actions: [
              Button(child: const Text('Cancelar'), onPressed: () => Navigator.pop(context, false)),
              FilledButton(style: ButtonStyle(backgroundColor: ButtonState.all(Colors.red)), child: const Text('Eliminar'), onPressed: () => Navigator.pop(context, true)),
          ],
        ),
    ) ?? false;

    if (confirmed) {
        setState(() { // Actualiza estado local
           _globalTasks.removeWhere((t) => t.id == task.id);
        });
        // Opcional: Mostrar InfoBar de éxito/info
    }
  }

  @override
  void dispose() {
    _newTaskController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Construye la UI de la página usando ScaffoldPage
    return ScaffoldPage(
      // Header con título y CommandBar
      header: PageHeader(
        title: Text(widget.showCompleted ? 'Completadas' : 'Pendientes'),
        commandBar: CommandBar(
          primaryItems: [
            // TextBox para nueva tarea, integrado en la barra
            CommandBarBuilderItem(
              builder: (_, __, child) => Tooltip(message: "Escribe la nueva tarea aquí y presiona Enter o el botón Añadir", child: child),
              wrappedItem: SizedBox(
                width: 300, // Darle un ancho fijo o adaptable
                child: TextBox(
                  controller: _newTaskController,
                  placeholder: 'Nueva tarea...',
                  onSubmitted: (_) => _addTask(), // Permite añadir con Enter
                ),
              ),
            ),
            // Botón para añadir
            CommandBarButton(
              icon: const Icon(FluentIcons.add),
              label: 'Añadir',
              onPressed: _addTask,
            ),
          ],
          // secondaryItems: [ // Podríamos añadir acciones secundarias aquí
          //   CommandBarButton(icon: Icon(FluentIcons.delete), label: 'Eliminar seleccionadas', onPressed: (){}),
          // ],
        ),
      ),

      // Contenido principal de la página
      content: _buildTaskList(), // Llama a un método helper para construir la lista
    );
  }

  // Método helper que construye la lista o un mensaje si está vacía
  Widget _buildTaskList() {
    final tasks = _filteredTasks; // Obtiene las tareas filtradas

    if (tasks.isEmpty) {
      // Muestra un mensaje si no hay tareas en esta vista
      return Center(
        child: Text(
          widget.showCompleted
              ? 'Aún no has completado ninguna tarea.'
              : '¡Felicidades! No tienes tareas pendientes.',
           style: FluentTheme.of(context).typography.bodyLarge,
        ),
      );
    }

    // Usa ListView.builder para eficiencia con listas potencialmente largas
    return ListView.builder(
      controller: _scrollController, // Asigna el scroll controller
      itemCount: tasks.length,
      // Padding alrededor de la lista para que no pegue a los bordes
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      itemBuilder: (context, index) {
        final task = tasks[index];
        // Usa ListTile para cada elemento de la lista
        return ListTile(
          leading: Checkbox(
            checked: task.isCompleted,
            onChanged: (_) => _toggleTaskCompletion(task), // Cambia estado al marcar/desmarcar
          ),
          title: Text(
            task.title,
            // Estilo condicional: tachado y gris si está completada
            style: TextStyle(
              decoration: task.isCompleted ? TextDecoration.lineThrough : TextDecoration.none,
              color: task.isCompleted ? Colors.grey[120] : null, // Atenúa si está completada (ajusta el índice de gris)
            ),
          ),
          trailing: IconButton( // Botón para eliminar la tarea
            icon: const Icon(FluentIcons.delete),
            onPressed: () => _deleteTask(task),
          ),
          // Podrías añadir un onPressed al ListTile para editar la tarea, por ejemplo
          // onPressed: () => _editTask(task),
        );
      },
    );
  }
}
```

Este paso es denso. Hemos creado el modelo, la página `TasksPage` con `ScaffoldPage`, `CommandBar`, `TextBox`, `Button`, `ListView`, `ListTile`, `Checkbox`, `IconButton` y la lógica básica (añadir, completar, eliminar con diálogo de confirmación) usando un estado "global" simulado.

**Paso 3: Implementación de la Página de Ajustes**

Ahora, creemos la página de `SettingsPage` para simular algunos ajustes visuales.

Dart

```
// lib/screens/settings_page.dart
import 'package:fluent_ui/fluent_ui.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  // Estados locales para simular los ajustes (no afectan realmente el tema global aquí)
  bool _simulatedDarkMode = false;
  AccentColor _simulatedAccentColor = Colors.blue.toAccentColor(); // Color inicial simulado

  // Lista de colores de acento para elegir
  final List<Map<String, AccentColor>> _accentOptions = [
    {'Azul': Colors.blue.toAccentColor()}, {'Verde': Colors.green.toAccentColor()},
    {'Rojo': Colors.red.toAccentColor()}, {'Naranja': Colors.orange.toAccentColor()},
    {'Morado': Colors.purple.toAccentColor()}, {'Magenta': Colors.magenta.toAccentColor()},
    {'Teal': Colors.teal.toAccentColor()}, {'Amarillo': Colors.yellow.toAccentColor()},
  ];

  @override
  void didChangeDependencies() {
     // Sincronizar estado simulado con el tema actual al inicio o si el tema cambia
     _simulatedDarkMode = FluentTheme.of(context).brightness.isDark;
     // Podríamos intentar obtener el AccentColor real si estuviera accesible globalmente
     // _simulatedAccentColor = FluentTheme.of(context).accentColor;
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    return ScaffoldPage(
      header: const PageHeader(title: Text('Ajustes')),
      content: Padding(
        padding: const EdgeInsets.all(24.0), // Más padding en ajustes
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Sección Apariencia
            Text('Apariencia', style: FluentTheme.of(context).typography.subtitle),
            const SizedBox(height: 10),
            ToggleSwitch(
              checked: _simulatedDarkMode,
              onChanged: (v) {
                 setState(() => _simulatedDarkMode = v);
                 // TODO: En una app real, aquí llamarías a tu gestor de temas
                 // para cambiar FluentApp.themeMode y persistir la preferencia.
                 debugPrint('Simulación: Modo oscuro -> $v');
              },
              content: const Text('Modo Oscuro (Simulado)'),
            ),
            const Divider(height: 30), // Separador visual

            // Sección Color de Acento
            Text('Color de Acento (Simulado)', style: FluentTheme.of(context).typography.subtitle),
             const SizedBox(height: 10),
             Wrap( // Muestra los botones de colores
                spacing: 8.0,
                runSpacing: 8.0,
                children: _accentOptions.map((option) {
                   final colorName = option.keys.first;
                   final colorValue = option.values.first;
                   final bool isSelected = _simulatedAccentColor.key == colorValue.key; // Compara por key

                   return Tooltip(
                      message: colorName,
                      child: Button(
                         style: ButtonStyle(
                            padding: ButtonState.all(EdgeInsets.zero), // Quita padding interno
                            // Fondo con el color de la opción
                            backgroundColor: ButtonState.resolveWith((states) {
                               if (states.isHovering) return colorValue.lighter;
                               if (states.isPressing) return colorValue.darker;
                               return colorValue;
                            }),
                            // Borde grueso si está seleccionado
                            border: ButtonState.all(
                               isSelected
                               ? BorderSide(color: FluentTheme.of(context).focusTheme.glowColor ?? Colors.black, width: 3)
                               : BorderSide.none,
                            )
                         ),
                         // Contenido vacío, el tamaño lo da el estilo
                         child: const SizedBox(width: 36, height: 36),
                         onPressed: () {
                           setState(() => _simulatedAccentColor = colorValue);
                            // TODO: En una app real, aquí actualizarías el AccentColor
                            // en tu gestor de temas y lo aplicarías a FluentApp.theme/darkTheme.
                            debugPrint('Simulación: Color acento -> $colorName');
                         },
                      ),
                   );
                }).toList(),
             ),
          ],
        ),
      ),
    );
  }
}
```

- Hemos creado la página de Ajustes con un `ToggleSwitch` y una selección de color (ambos simulados, no afectan el tema real de la `FluentApp` en este ejemplo básico).

**Paso 4: Aplicación del Tema y Personalización Visual**

Volvamos a `lib/main.dart` para aplicar un color de acento por defecto (ej: Teal) y el efecto `Mica` al fondo de la aplicación.

Dart

```
// lib/main.dart (Versión final)
import 'package:fluent_ui/fluent_ui.dart';
import 'package:flutter/material.dart' hide Colors, TextButton, ButtonStyle; // Asegúrate de ocultar estos
import 'screens/main_screen.dart'; // Importa la pantalla principal

void main() {
  runApp(const FluentTaskManagerApp());
}

class FluentTaskManagerApp extends StatelessWidget {
  const FluentTaskManagerApp({super.key});

  // Define el color de acento principal para toda la app
  static final AccentColor appAccentColor = Colors.teal.toAccentColor(); // ¡Usamos Teal!

  @override
  Widget build(BuildContext context) {
    debugPrint('Building FluentTaskManagerApp'); // Para ver cuándo se reconstruye
    return FluentApp(
      title: 'Fluent Tasks',
      debugShowCheckedModeBanner: false,
      color: appAccentColor, // Color para la barra de título, etc.

      // Configuración de Temas usando el color de acento definido
      themeMode: ThemeMode.system, // Respetar preferencia del usuario
      darkTheme: FluentThemeData(
        brightness: Brightness.dark,
        accentColor: appAccentColor,
        visualDensity: VisualDensity.standard,
        // Aplicar Mica como fondo por defecto del scaffold en modo oscuro
        scaffoldBackgroundColor: Colors.transparent, // Hacer fondo transparente para que Mica se vea
      ),
      theme: FluentThemeData(
        brightness: Brightness.light,
        accentColor: appAccentColor,
        visualDensity: VisualDensity.standard,
         // Aplicar Mica como fondo por defecto del scaffold en modo claro
        scaffoldBackgroundColor: Colors.transparent, // Hacer fondo transparente para que Mica se vea
      ),

      // Envolver la pantalla principal con Mica para el efecto de fondo
      home: const Mica( // Aplica Mica a toda la app
        child: MainScreen(),
      ),
    );
  }
}
```

- Hemos definido `appAccentColor` como Teal y lo hemos aplicado a `theme` y `darkTheme`.
- Hemos envuelto `MainScreen` con `Mica` para darle el efecto de fondo translúcido característico. Para que `Mica` sea visible a través del fondo de las páginas, establecimos `scaffoldBackgroundColor: Colors.transparent` en `FluentThemeData`.

**¡Aplicación Completada (Versión Ejemplo)!**

¡Felicidades! Acabas de construir una aplicación de gestión de tareas usando `fluent_ui`. Aunque el estado es muy básico y los ajustes son simulados, este ejemplo demuestra cómo:

- Estructurar una app con `NavigationView` y `ScaffoldPage`.
- Usar `CommandBar` para acciones contextuales.
- Implementar listas con `ListView` y `ListTile` de estilo Fluent.
- Utilizar controles de entrada como `TextBox`, `Checkbox`.
- Mostrar diálogos modales con `ContentDialog`.
- Aplicar temas (`AccentColor`) y efectos visuales (`Mica`).

Este es un excelente punto de partida. Puedes experimentar añadiendo más funcionalidades (editar tareas, prioridades, fechas límite con `DatePicker`, persistencia de datos, un gestor de estado real, etc.).

## 6. Consideraciones Avanzadas y Buenas Prácticas

Desarrollar una aplicación que funcione es solo el primer paso. Para crear aplicaciones de escritorio de alta calidad con Flutter y `fluent_ui`, especialmente aquellas destinadas a producción, debemos considerar aspectos cruciales como la adaptabilidad, la gestión del estado, el rendimiento y la accesibilidad.

### 6.1 Diseño Responsivo y Adaptativo

Las ventanas de escritorio pueden redimensionarse libremente, y tu aplicación debe responder de manera fluida y coherente a estos cambios. No basta con que no se "rompa"; idealmente, debería optimizar su layout para diferentes tamaños.

- **`NavigationView` Adaptable:** El uso de `PaneDisplayMode.auto` en `NavigationPane` es tu principal aliado. Permite que el panel de navegación cambie entre los modos `open` y `compact` automáticamente, una característica fundamental del diseño responsivo en Fluent.
- **Layouts Flexibles de Flutter:** Utiliza intensivamente los widgets de layout de Flutter diseñados para la flexibilidad:
  - `Column` y `Row` con hijos `Expanded` y `Flexible` para distribuir el espacio.
  - `Wrap` para que los elementos fluyan a la siguiente línea si no caben horizontalmente.
  - `GridView` para mostrar colecciones de elementos que se adaptan al ancho.
- **`MediaQuery` y `LayoutBuilder`:** Para tomar decisiones de diseño más significativas basadas en el tamaño disponible:
  - `MediaQuery.of(context).size` te da el ancho y alto actual de la ventana. Úsalo para establecer umbrales (breakpoints).
  - `LayoutBuilder` es aún más potente, ya que te proporciona las `BoxConstraints` del widget padre. Esto te permite construir diferentes árboles de widgets dependiendo del espacio disponible *en ese punto específico* de la interfaz. Dart`LayoutBuilder( builder: (context, constraints) { // Ejemplo: Cambiar a 2 columnas si hay suficiente ancho if (constraints.maxWidth > 720) { return TwoColumnLayout( /* ... */ ); } else { return SingleColumnLayout( /* ... */ ); } }, )`
- **Breakpoints de `fluent_ui`:** Para consistencia con las directrices de Windows, puedes usar los breakpoints definidos en `FluentTheme.of(context).breakpoints` (`sm`, `md`, `lg`, `xl`). Combínalos con `MediaQuery` para aplicar cambios de layout en puntos de corte estándar.
- **Adaptabilidad de Controles:** Ten en cuenta cómo se comportan los controles complejos (`CommandBar`, `DataGrid` si lo usas) en espacios reducidos. Asegúrate de que la información esencial y las acciones clave sigan siendo accesibles.

### 6.2 Integración con Gestión de Estado

Nuestro ejemplo usó `setState` y una lista simulada, lo cual es inadecuado para aplicaciones reales. La complejidad crece rápidamente, y necesitas una arquitectura de estado sólida.

- **Elige una Solución:** Integra un paquete de gestión de estado probado como **Provider**, **Riverpod** (recomendado por su flexibilidad y seguridad de tipos), **Bloc/Cubit**, GetX, u otros. La elección depende de tus preferencias y la complejidad del proyecto.
- **Separa Lógica y UI:** Tu gestor de estado debe contener el estado de la aplicación (datos, preferencias del usuario, estado de autenticación) y la lógica de negocio (cómo se modifican los datos). Los widgets de `fluent_ui` deben ser lo más "tontos" posible, reaccionando a los cambios de estado y notificando al gestor de estado sobre las interacciones del usuario.
- **Reconstrucciones Eficientes:** Utiliza los mecanismos específicos de tu gestor de estado (`Consumer`, `Selector`, `ref.watch`, `BlocBuilder`, etc.) para asegurarte de que solo los widgets que dependen de una pieza específica del estado se reconstruyan cuando esta cambie. Evita reconstruir pantallas enteras innecesariamente.
- **Gestión del Tema Global:** El `ThemeMode` (Claro/Oscuro/Sistema) y el `AccentColor` son estados globales perfectos para ser manejados por tu gestor de estado. Al cambiar estos valores en el gestor (por ejemplo, desde la página de Ajustes), puedes hacer que `FluentTaskManagerApp` (o tu widget raíz) se reconstruya con los nuevos `FluentThemeData`, aplicando el cambio a toda la aplicación.

### 6.3 Optimización del Rendimiento

Flutter es rápido, pero siempre hay margen para optimizar, especialmente en interfaces complejas o con muchos datos.

- **Minimiza Reconstrucciones (`build`):** Es la regla de oro. Usa `const` widgets siempre que sea posible. Evita `setState` innecesarios o en widgets muy altos en el árbol. Usa las herramientas de estado para reconstrucciones selectivas.
- **Listas y Árboles Eficientes:**
  - Para listas largas, **siempre** usa `ListView.builder` o equivalentes (`SliverList` en `CustomScrollView`). No construyas una lista completa en un `Column` dentro de un `SingleChildScrollView`.
  - En `TreeView`, usa `lazy: true` para nodos con muchos hijos o cuya carga sea costosa, para diferir la construcción hasta que se expandan.
- **Rendimiento de Efectos Visuales:**
  - `Acrylic` puede impactar el rendimiento, especialmente con `blurAmount` altos o si se aplica a áreas grandes que se redibujan frecuentemente. Úsalo con criterio.
  - `Mica` está optimizado para fondos de ventana y generalmente tiene un impacto menor.
  - Monitoriza el rendimiento usando **Flutter DevTools**, específicamente las pestañas "Performance" y "CPU Profiler", si sospechas que los efectos visuales están causando lentitud.
- **Asincronía:** Nunca bloquees el hilo principal (UI thread). Usa `async`/`await` para operaciones de red o disco, y considera `Isolate`s (`compute`) para tareas de CPU muy intensivas que puedan congelar la interfaz.
- **DevTools:** Aprende a usar Flutter DevTools. Son indispensables para diagnosticar problemas de rendimiento, inspeccionar el árbol de widgets, verificar reconstrucciones ("Highlight Repaints") y analizar el uso de memoria.

### 6.4 Consideraciones de Accesibilidad (A11y)

Una aplicación excelente debe ser usable por todos. La accesibilidad no es una ocurrencia tardía.

- **Semántica:** Proporciona descripciones significativas para elementos no textuales. `fluent_ui` y Flutter lo facilitan:
  - Usa la propiedad `semanticLabel` en `Icon`, `IconButton`, etc.
  - Envuelve widgets personalizados o grupos complejos con el widget `Semantics` para darles un significado y comportamiento accesibles.
  - `Tooltip` también ayuda, ya que su mensaje suele ser leído por los lectores de pantalla.
- **Navegación por Teclado:** `fluent_ui` se esfuerza por seguir las convenciones de Windows. Prueba exhaustivamente la navegación usando solo el teclado (Tab, Shift+Tab, Flechas, Enter, Espacio). Asegúrate de que todos los controles interactivos sean alcanzables y operables, y que el orden del foco sea lógico. Usa `FocusNode` y `FocusScope` si necesitas un control manual preciso del foco.
- **Contraste y Tamaño:** Verifica que el contraste entre el texto y el fondo cumpla con las directrices WCAG (puedes usar herramientas online). Permite que el tamaño del texto respete la configuración del sistema si es posible, o incluye opciones para ajustarlo en la aplicación.
- **Pruebas con Lectores de Pantalla:** Familiarízate y prueba tu aplicación con Narrador (el lector de pantalla integrado en Windows) para identificar áreas donde la experiencia pueda ser confusa o incompleta.

### 6.5 Empaquetado y Distribución para Windows

Una vez que tu aplicación está lista, necesitas empaquetarla para distribuirla a los usuarios.

- **Build Release:** ¡Fundamental! Compila siempre la versión final usando `flutter build windows`. Esto habilita optimizaciones AOT (Ahead-of-Time) para un rendimiento máximo.
- **Empaquetado MSIX:** Es el formato moderno y recomendado por Microsoft. Ofrece instalación/desinstalación limpia, actualizaciones automáticas (especialmente si se usa la Store) y un modelo de seguridad mejorado.
  - Utiliza el paquete `msix` de pub.dev (`flutter pub run msix:create`) para generar el paquete `.msix` directamente desde tu proyecto Flutter. Requiere configuración previa (definir publicador, logo, etc.).
- **Microsoft Store:** Publicar en la Microsoft Store aumenta la visibilidad, simplifica la instalación para los usuarios y gestiona las actualizaciones automáticamente. El paquete MSIX es el formato requerido.
- **Instaladores Tradicionales (`.exe`):** Si prefieres una distribución más clásica o necesitas mayor control sobre el proceso de instalación, puedes usar herramientas como Inno Setup para crear un instalador `.exe` que incluya los archivos de tu build de Flutter.

Aplicar estas prácticas avanzadas marcará la diferencia entre una demo técnica y una aplicación de escritorio robusta, eficiente, usable por todos y lista para ser distribuida profesionalmente.

### 7. Preguntas y Respuestas Frecuentes (FAQ)

Aquí respondemos algunas de las preguntas más comunes que surgen al trabajar con Flutter y `fluent_ui` para el desarrollo en Windows:

1. **¿Puedo/Debo mezclar widgets de `fluent_ui` con widgets de Material Design (`material.dart`) en una aplicación para Windows?**
   - **Respuesta:** Técnicamente, es posible mezclar widgets, pero **generalmente no es recomendable** si buscas una experiencia de usuario nativa y coherente en Windows. `fluent_ui` está diseñado para seguir las directrices de Fluent Design, mientras que Material sigue las suyas. Mezclarlos puede llevar a inconsistencias visuales (tipografía, espaciado, iconos, efectos de interacción) y de comportamiento (paradigmas de navegación, tematización). Es preferible usar los equivalentes que ofrece `fluent_ui` siempre que sea posible. Si necesitas un widget muy específico que solo existe en Material, úsalo con precaución y considera estilizarlo manualmente para que encaje lo mejor posible, pero sé consciente de la posible fricción visual y de mantenimiento.
2. **¿Cómo maneja `fluent_ui` las diferencias entre Windows 10 y Windows 11 (Mica, esquinas redondeadas, etc.)?**
   - **Respuesta:** `fluent_ui` se esfuerza por implementar los controles y estilos de Fluent Design de la manera más fiel posible. Widgets como `Mica` y el uso general de esquinas redondeadas en controles buscan alinearse con la estética moderna (prominente en Windows 11). Sin embargo, la *apariencia exacta* de algunos efectos (como `Mica`) puede depender de la versión subyacente de Windows y de las capacidades del hardware, ya que interactúan con el compositor del sistema operativo. En general, los widgets de `fluent_ui` funcionarán en ambas versiones de Windows (dentro de las versiones soportadas por Flutter), pero la fidelidad visual a las últimas características de Win11 será más evidente al ejecutar la app en Win11.
3. **¿Cuál es la mejor manera de gestionar el estado de la navegación con `NavigationView`?**
   - **Respuesta:** Para casos simples, manejar el índice `selected` con `setState` dentro de un `StatefulWidget` (como en nuestro ejemplo) es suficiente. Sin embargo, para aplicaciones más complejas con múltiples niveles, necesidad de pasar datos entre pantallas o estado persistente por vista, es **altamente recomendable** integrar una solución de gestión de estado (Provider, Riverpod, BLoC, etc.). Almacena el índice de navegación actual y el estado específico de cada página en tu gestor de estado. Esto desacopla la lógica de navegación de la UI y facilita el mantenimiento y las pruebas. Para necesidades de routing más avanzadas (similares a la web, con rutas nombradas y parámetros), puedes explorar paquetes como `go_router` o `auto_route`, aunque su integración con el paradigma de `NavigationView` puede requerir configuración adicional o adaptadores.
4. **¿Es `fluent_ui` menos performante que usar los widgets estándar de Material? ¿Hay cuellos de botella conocidos?**
   - **Respuesta:** En general, para la mayoría de los controles estándar (botones, campos de texto, listas básicas), el rendimiento de `fluent_ui` es comparable al de Material. Ambos se basan en el mismo motor de renderizado de Flutter (Skia). Los posibles cuellos de botella suelen provenir de las mismas fuentes en ambos casos: reconstrucciones ineficientes de widgets (no usar `const`, `setState` excesivos), listas muy largas sin `ListView.builder`, operaciones bloqueantes en el hilo de UI, o layouts muy complejos. Específicamente en `fluent_ui`, los efectos visuales como `Acrylic` (especialmente con desenfoque alto) pueden ser más demandantes que fondos opacos, por lo que deben usarse con consideración y probarse con Flutter DevTools si se sospecha que causan problemas en hardware de gama baja.
5. **¿Qué tan maduro es `fluent_ui` y qué hago si necesito un control o funcionalidad que no ofrece?**
   - **Respuesta:**`fluent_ui` es un paquete de la comunidad **muy maduro, activamente mantenido y ampliamente utilizado**, considerado listo para producción por muchos desarrolladores. Cubre una gran mayoría de los controles y patrones de Fluent Design. Sin embargo, al ser impulsado por la comunidad, puede que no implemente *inmediatamente* cada nueva característica introducida en WinUI nativo o que tenga algún bug ocasional. Si necesitas algo específico que no está:
     - **Revisa GitHub:** Busca en los issues y discusiones del repositorio oficial de `fluent_ui` (<https://github.com/bdlukaa/fluent_ui>) si la característica está planeada, en desarrollo o si alguien ha propuesto una solución.
     - **Crea un Widget Personalizado:** Intenta construir el control tú mismo usando los primitivos de Flutter y `fluent_ui`, siguiendo las directrices de Fluent Design.
     - **Contribuye:** Si desarrollas una solución genérica, considera contribuirla de vuelta al paquete `fluent_ui`.
     - **Último Recurso:** Como se mencionó en la Q1, podrías envolver un control nativo (más complejo, usando platform channels o FFI) o, con mucho cuidado, usar y estilizar un widget de Material si es absolutamente indispensable y no rompe demasiado la experiencia.

### 8. Puntos Relevantes del Artículo

Aquí tienes un resumen de los 5 puntos más importantes que hemos cubierto:

1. **Apariencia Nativa es Clave:** Para que las aplicaciones Flutter triunfen en Windows, deben sentirse nativas. El paquete `fluent_ui` es la herramienta fundamental para lograr esto, proporcionando widgets y temas alineados con Fluent Design.
2. **Estructura Fundamental:** La base de una aplicación `fluent_ui` se construye sobre `FluentApp` (el widget raíz), `FluentTheme` (para la tematización global), `NavigationView` (para la navegación principal) y `ScaffoldPage` (para la estructura interna de cada página).
3. **Rica Biblioteca de Widgets:** `fluent_ui` va más allá de la estructura, ofreciendo un conjunto completo de controles para comandos (botones, `CommandBar`), entrada de datos (`TextBox`, `Checkbox`, `DatePicker`, etc.), visualización (`ListTile`, `TreeView`, `InfoBar`, `ContentDialog`) y efectos visuales (`Mica`, `Acrylic`).
4. **La Gestión de Estado No es Opcional (en la práctica):** Aunque los ejemplos simples usan `setState`, las aplicaciones reales requieren una solución de gestión de estado robusta (Provider, Riverpod, BLoC, etc.) para manejar la complejidad, mejorar el rendimiento y facilitar el mantenimiento.
5. **Visión Holística:** Construir una aplicación de calidad implica más que solo usar widgets. Se deben considerar activamente el diseño responsivo, la optimización del rendimiento (usando DevTools), la accesibilidad (A11y) y las estrategias de empaquetado y distribución (MSIX).

### 9. Conclusión

Hemos viajado desde la configuración inicial hasta las consideraciones avanzadas, pasando por la exploración detallada de widgets y la construcción de una aplicación de ejemplo. A lo largo de este camino, ha quedado clara una idea central: Flutter no es solo una herramienta poderosa para crear aplicaciones multiplataforma funcionalmente robustas, sino que, gracias a la dedicación de la comunidad encapsulada en el paquete `fluent_ui`, también es perfectamente capaz de producir aplicaciones de escritorio para Windows que se sienten **auténticas, modernas y completamente integradas** en su ecosistema nativo.

Ignorar la experiencia de usuario y las convenciones visuales de una plataforma es un error costoso. `fluent_ui` nos proporciona los bloques de construcción necesarios – desde la estructura y navegación con `NavigationView` y `ScaffoldPage`, pasando por un rico conjunto de controles interactivos, hasta los sutiles pero importantes efectos visuales como `Mica` y `Acrylic` – para evitar ese error y deleitar a los usuarios de Windows.

Si bien dominar `fluent_ui` y las mejores prácticas de desarrollo de escritorio requiere tiempo y experimentación, esperamos que este artículo te haya proporcionado una base sólida y la confianza necesaria para empezar a crear o mejorar tus propias aplicaciones Flutter para Windows. La combinación de la productividad de Flutter con la elegancia nativa de Fluent Design es potente y abre un mundo de posibilidades.

**¡No dejes de explorar, construir y refinar!** El ecosistema Flutter sigue evolucionando, y la capacidad de crear experiencias de escritorio de alta calidad es cada vez más importante.

### 10. Recursos Adicionales

Para seguir profundizando en el tema, aquí tienes algunos enlaces esenciales:

- **Documentación Oficial de `fluent_ui`:** La referencia principal para todos los widgets, APIs y ejemplos del paquete.
  - [https://fluentui-fluent-ui.netlify.app/](https://www.google.com/search?q=https://fluentui-fluent-ui.netlify.app/)
- **Repositorio GitHub de `fluent_ui`:** Para reportar issues, ver el código fuente, participar en discusiones y seguir el desarrollo.
  - <https://github.com/bdlukaa/fluent_ui>
- **Documentación Oficial de Flutter para Escritorio (Windows):** Guías de configuración, compilación y aspectos específicos de la plataforma.
  - [https://docs.flutter.dev/desktop](https://www.google.com/search?q=https://docs.flutter.dev/desktop) (Navega a la sección de Windows)
- **Sistema de Diseño Fluent (Microsoft):** Para comprender los principios de diseño subyacentes que `fluent_ui` busca implementar.
  - <https://www.microsoft.com/design/fluent/>

### 11. Sugerencias de Siguientes Pasos

Una vez que te sientas cómodo con lo cubierto en este artículo, considera explorar estas áreas relacionadas:

1. **Integración con APIs Nativas (Win32/WinRT):** Investiga paquetes como `win32` (<https://pub.dev/packages/win32>) que permiten llamar directamente a APIs del sistema operativo Windows desde Dart. Esto abre la puerta a funcionalidades muy específicas de la plataforma que no están cubiertas por Flutter o `fluent_ui` (ej: interacción avanzada con ventanas, notificaciones del sistema nativas, acceso al registro, system tray).
2. **Aplicar Gestión de Estado Robusta:** Refactoriza la aplicación de ejemplo (o crea una nueva) utilizando una solución de gestión de estado como Riverpod o Provider. Concéntrate en separar la lógica de negocio y el estado de la UI, y en gestionar el estado del tema y la navegación de forma centralizada.
3. **Empaquetado y Distribución con MSIX:** Profundiza en el uso de la herramienta `msix` (`flutter pub run msix:create`) para empaquetar tu aplicación en el formato recomendado por Microsoft. Investiga cómo configurar el manifiesto (`msix_config` en `pubspec.yaml`), firmar el paquete y prepararlo para la distribución, ya sea directamente o a través de la Microsoft Store.

### 12. Invitación a la Acción

¡La mejor forma de aprender es haciendo! Ahora te toca a ti.

- **Experimenta:** No tengas miedo de probar los diferentes widgets de `fluent_ui`. Crea pequeñas aplicaciones de prueba enfocadas en un solo componente o concepto para entenderlo a fondo.
- **Modifica el Ejemplo:** Toma la aplicación de gestión de tareas que construimos y añádele funcionalidades: edición de tareas, prioridades, fechas límite (`DatePicker`), persistencia de datos (usando `shared_preferences` o una base de datos simple como `sqflite` o `isar`), o integra un gestor de estado real.
- **Construye tu Propia Idea:** ¿Tienes una idea para una utilidad de escritorio? ¡Intenta construirla con Flutter y `fluent_ui`! Empezar un proyecto desde cero aplicando estos principios es una excelente manera de solidificar tu aprendizaje.

El desarrollo de aplicaciones de escritorio con Flutter es una realidad vibrante y `fluent_ui` te da las herramientas para crear interfaces que los usuarios de Windows apreciarán. **¡Adelante, crea aplicaciones increíbles!**
