---
title: "Desarrollo Flutter Nativo para Escritorio Mac con el Paquete macos_ui"
description: "Flutter ha revolucionado la forma en que construimos aplicaciones multiplataforma, ofreciendo un rendimiento excepcional y una flexibilidad de diseño notable. Sin embargo, cuando…"
pubDate: "2025-04-02"
author: "tiagofur"
tags: []
categories: ["Mobile"]
slug: "desarrollo-flutter-nativo-para-escritorio-mac-con-el-paquete-macos_ui"
originalUrl: "https://creapolis.dev/desarrollo-flutter-nativo-para-escritorio-mac-con-el-paquete-macos_ui/"
draft: false
---

## 1. Introducción: Flutter se Encuentra con macOS

Flutter ha revolucionado la forma en que construimos aplicaciones multiplataforma, ofreciendo un rendimiento excepcional y una flexibilidad de diseño notable. Sin embargo, cuando dirigimos nuestras miras al sofisticado ecosistema de escritorio de Apple, nos encontramos con un desafío distintivo: **macOS**. Los usuarios de Mac no solo valoran la funcionalidad, sino que también esperan un estándar muy alto de pulido visual, coherencia y una *sensación* nativa profundamente arraigada, meticulosamente definida por las **Guías de Interfaz Humana (Human Interface Guidelines - HIG)** de Apple.

Simplemente ejecutar una aplicación Flutter con su estética Material Design por defecto, o incluso una interfaz personalizada genérica, en macOS a menudo produce una experiencia que se siente fuera de lugar. Elementos icónicos como la barra de menú global, las barras de herramientas estándar (`ToolBar`), los paneles laterales (`Sidebar`), los sutiles efectos de translucidez y desenfoque conocidos como "vibrancy", la tipografía característica San Francisco y los patrones de interacción específicos (como los `PushButton` o `PopupButton`) son más que simples adornos; son parte integral de la identidad y la usabilidad de macOS. Ignorar estas convenciones no solo crea una fricción visual, sino que puede afectar negativamente la curva de aprendizaje y la percepción general de la calidad de nuestra aplicación por parte de un público exigente.

Ante este panorama, surge la pregunta: ¿Cómo podemos fusionar la eficiencia y el poder de Flutter con la elegancia y autenticidad que demandan los usuarios de macOS? La respuesta nos la brinda, una vez más, el ecosistema de la comunidad Flutter a través del paquete **`macos_ui`**. Este paquete se erige como un puente fundamental, ofreciendo a los desarrolladores un conjunto cuidadosamente elaborado de widgets, temas y herramientas que permiten implementar los componentes visuales y los patrones de interacción definidos por Apple, directamente desde nuestro código Dart.

Este artículo está diseñado para **desarrolladores Flutter de nivel intermedio y avanzado** que aspiran a trascender la simple compatibilidad y buscan crear aplicaciones de escritorio para macOS que se sientan verdaderamente nativas y pulidas. Nos sumergiremos en el mundo de `macos_ui`, explorando desde la configuración inicial del proyecto y los conceptos centrales como `MacosApp`, `MacosTheme` y `MacosWindow`, hasta la implementación detallada de componentes esenciales como `Sidebar`, `ToolBar`, `PushButton`, `MacosTextField` y los característicos efectos visuales de macOS. Para consolidar el aprendizaje, construiremos juntos una aplicación de ejemplo paso a paso y discutiremos buenas prácticas esenciales para asegurar que tus aplicaciones no solo luzcan bien, sino que sean robustas y eficientes en macOS.

¡Prepárate para infundir en tus aplicaciones Flutter ese inconfundible y elegante "acento de Cupertino"!

## 2. Configuración del Entorno para el Desarrollo macOS

Antes de poder disfrutar de los elegantes widgets que `macos_ui` nos ofrece, debemos asegurarnos de que nuestro entorno de desarrollo Flutter esté correctamente configurado para compilar y ejecutar aplicaciones en macOS. Unos cimientos sólidos aquí nos ahorrarán problemas más adelante.

### 2.1 Prerrequisitos: Flutter para macOS

Aunque como desarrollador intermedio/avanzado ya tendrás el Flutter SDK instalado, el desarrollo específico para macOS requiere algunas herramientas y configuraciones adicionales del ecosistema de Apple:

- **Herramientas Esenciales:**
  - **Xcode:** El Entorno de Desarrollo Integrado (IDE) oficial de Apple. Es indispensable. Puedes descargarlo gratuitamente desde la **Mac App Store**. Una vez instalado, ábrelo al menos una vez para aceptar los términos de licencia y permitirle instalar componentes adicionales necesarios.
  - **CocoaPods:** Es un gestor de dependencias ampliamente utilizado para proyectos de Xcode (Objective-C y Swift). Flutter lo utiliza para gestionar ciertos plugins nativos. Si no lo tienes instalado, Flutter usualmente te indicará cómo hacerlo al ejecutar `flutter doctor`. El comando típico es `sudo gem install cocoapods`.
- **Verificación con `flutter doctor`:** La herramienta `flutter doctor` es tu mejor amiga para diagnosticar el estado de tu configuración. Ejecútala en tu terminal con la opción de verbosidad (`-v`) para obtener detalles: Bash`flutter doctor -v` Presta especial atención a las secciones que comienzan con `[✓] Xcode - develop for Objective-C and Swift` y `[✓] CocoaPods`. Deben mostrar marcas de verificación verdes. Si `flutter doctor` detecta algún problema (falta de Xcode, versión incompatible, problemas con CocoaPods, necesidad de ejecutar `pod setup`), sigue las instrucciones que te proporcione. La [documentación oficial de Flutter para la configuración de macOS](https://www.google.com/search?q=https://docs.flutter.dev/desktop%23macos-setup) también es un excelente recurso.

### 2.2 Habilitando el Soporte de Escritorio (Si es Necesario)

Si esta es tu primera incursión en el desarrollo de escritorio con tu instalación actual de Flutter, es posible que necesites habilitar explícitamente el soporte para la plataforma macOS. Ejecuta el siguiente comando en tu terminal:

Bash

```
flutter config --enable-macos-desktop
```

Tras ejecutarlo, vuelve a correr `flutter doctor` para confirmar que macOS aparece como una plataforma disponible (`[✓] macOS - develop for macOS`).

### 2.3 Instalación del Paquete `macos_ui`

Una vez que tu entorno esté validado (`flutter doctor` sin errores críticos para macOS), añadir el paquete `macos_ui` a tu proyecto Flutter es el procedimiento estándar. Navega hasta el directorio raíz de tu proyecto en la terminal y ejecuta:

Bash

```
flutter pub add macos_ui
```

Esto añadirá la última versión compatible del paquete a tu archivo `pubspec.yaml` bajo la sección `dependencies`. Si prefieres hacerlo manualmente:

YAML

```
# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  macos_ui: ^<latest_compatible_version> # Reemplaza con la versión más reciente
  # ... otras dependencias que puedas tener
```

Si lo añades manualmente, recuerda ejecutar `flutter pub get` después para descargar e integrar el paquete.

### 2.4 Estructura Inicial con `MacosApp`

El widget raíz para cualquier aplicación Flutter que utilice `macos_ui` es `MacosApp`. Similar a `MaterialApp` o `FluentApp`, `MacosApp` es responsable de configurar aspectos globales cruciales como el tema (`MacosTheme`), la ruta inicial o el widget `home`, y de inyectar el contexto necesario para que los widgets de `macos_ui` funcionen correctamente.

En tu archivo principal `lib/main.dart`, deberás reemplazar el widget raíz existente (probablemente `MaterialApp`) por `MacosApp`. Aquí tienes un ejemplo mínimo de cómo quedaría:

Dart

```
// lib/main.dart (Estructura inicial con MacosApp)
import 'package:flutter/cupertino.dart'; // Importa Cupertino si necesitas widgets específicos de iOS/macOS base
import 'package:macos_ui/macos_ui.dart'; // Importa el paquete macos_ui

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Usa MacosApp como el widget raíz
    return MacosApp(
      title: 'Mi Aplicación macos_ui', // Título que aparece en la barra de menú
      debugShowCheckedModeBanner: false, // Oculta la cinta "Debug"

      // Configuración básica de temas (profundizaremos más adelante)
      theme: MacosThemeData.light(), // Tema claro por defecto proporcionado por macos_ui
      darkTheme: MacosThemeData.dark(), // Tema oscuro por defecto
      themeMode: ThemeMode.system, // Sigue la apariencia del sistema (Claro/Oscuro)

      // El widget principal que define la UI de la ventana inicial
      // Normalmente será un MacosWindow o MacosScaffold
      home: const InitialPageStructure(), // Usamos un placeholder por ahora
    );
  }
}

// Placeholder para la estructura inicial de nuestra UI
class InitialPageStructure extends StatelessWidget {
  const InitialPageStructure({super.key});

  @override
  Widget build(BuildContext context) {
    // MacosScaffold es una estructura común para organizar la UI
    // dentro de una ventana o como parte principal de MacosWindow.
    return MacosScaffold(
      // 'children' es donde va el contenido principal, usualmente ContentArea y Sidebar
      children: [
        ContentArea( // El área principal para el contenido de la página
          builder: (context, scrollController) {
            // Contenido de ejemplo muy simple
            return const Center(
              child: Text('¡Bienvenido a macos_ui!'),
            );
          },
        ),
        // Podríamos añadir un Sidebar aquí si no usamos MacosWindow para gestionarlo
        // Sidebar(
        //   builder: (context, scrollController) => ...,
        //   minWidth: 200,
        //   ...
        // ),
      ],
    );
  }
}
```

Con estos pasos, tu entorno de desarrollo está listo y tu proyecto Flutter tiene la estructura base necesaria. Estamos preparados para empezar a explorar los conceptos fundamentales y los widgets específicos que `macos_ui` nos ofrece para replicar la interfaz nativa de macOS.

## 3. Conceptos Esenciales de `macos_ui`

Con nuestro entorno listo, es momento de familiarizarnos con los pilares conceptuales y los widgets estructurales que `macos_ui` proporciona para replicar la experiencia nativa de macOS. Comprender `MacosApp`, `MacosTheme`, la relación entre `MacosWindow` y `MacosScaffold`, y el funcionamiento de `Sidebar` es crucial antes de sumergirnos en controles más específicos.

### 3.1 `MacosApp`: El Punto de Partida

Como ya introdujimos, `MacosApp` es el widget raíz indispensable para cualquier aplicación que utilice `macos_ui`. Similar a `MaterialApp` o `FluentApp`, actúa como el contenedor principal que inicializa el entorno visual de macOS dentro de Flutter.

**Propiedades Clave de `MacosApp`:**

- **`title`**: Un `String` que identifica tu aplicación. Este título es usado por el sistema operativo, notablemente en la barra de menú global de macOS (al lado del menú Apple).
- **`theme`**: Una instancia de `MacosThemeData` que define la apariencia visual para el **modo claro**. `macos_ui` convenientemente provee `MacosThemeData.light()` con valores por defecto sensatos.
- **`darkTheme`**: Otra instancia de `MacosThemeData` para definir la apariencia en **modo oscuro**. `MacosThemeData.dark()` es el punto de partida recomendado.
- **`themeMode`**: Controla qué tema (`theme` o `darkTheme`) se aplica. Las opciones son `ThemeMode.system`, `ThemeMode.light`, `ThemeMode.dark`. Para macOS, **`ThemeMode.system`** es casi siempre la elección correcta para respetar la configuración global de Apariencia del usuario.
- **`home`**: El `Widget` que define la interfaz de usuario principal de tu aplicación. En aplicaciones `macos_ui`, este suele ser un `MacosWindow` que, a su vez, contiene la estructura principal (como `MacosScaffold`).
- **`debugShowCheckedModeBanner`**: `bool` para ocultar la cinta "Debug" en la esquina superior derecha.
- **`navigatorKey`, `routes`, `initialRoute`, etc.:** Al igual que otros widgets `App` de Flutter, `MacosApp` soporta el sistema de navegación por rutas nombradas si prefieres ese enfoque sobre manejar el cambio de vistas directamente en el widget `home`.

### 3.2 Tematización macOS: `MacosTheme` y `MacosThemeData`

La estética de macOS es muy reconocible. `macos_ui` la encapsula a través de `MacosTheme` (el widget que propaga el tema) y `MacosThemeData` (la clase que contiene los datos de configuración del tema).

**Propiedades Importantes de `MacosThemeData`:**

- **`brightness`**: (`Brightness.light` o `Brightness.dark`). Indica explícitamente si este es el tema claro u oscuro.
- **`primaryColor`**: El color principal, usado típicamente para indicar selección, foco y estado activo (el azul estándar de macOS es el predeterminado).
- **`accentColor`**: Un color de acento secundario. A menudo puede ser el mismo que `primaryColor` o uno diferente para ciertos elementos.
- **`typography`**: Define los estilos de texto (`TextStyle`) para diferentes roles semánticos (`title1`, `title2`, `headline`, `body`, `caption1`, etc.). Por defecto, usa la fuente San Francisco (si está disponible en el sistema) y tamaños/pesos apropiados para macOS.
- **Temas específicos de widgets:** `MacosThemeData` permite anular estilos por defecto para widgets individuales (`pushButtonTheme`, `helpButtonTheme`, `tooltipTheme`, etc.).
- **`dividerColor`**: El color usado para líneas separadoras.

**¿Cómo Acceder al Tema Actual?**

Dentro de cualquier widget descendiente de `MacosApp`, puedes obtener la `MacosThemeData` activa usando `MacosTheme.of(context)`:

Dart

```
@override
Widget build(BuildContext context) {
  // Obtiene el tema macOS actual
  final macosTheme = MacosTheme.of(context);

  return Column(
    children: [
      Text(
        'Título de Sección',
        // Aplica el estilo de texto 'headline' del tema
        style: macosTheme.typography.headline,
      ),
      PushButton(
        // Usa el color primario definido en el tema
        buttonSize: ButtonSize.large,
        color: macosTheme.primaryColor,
        child: const Text('Acción Principal'),
        onPressed: () {},
      ),
    ],
  );
}
```

Personalizar `primaryColor` en `MacosThemeData` es una forma sencilla de darle a tu aplicación un toque de identidad visual sin romper con la estética general de macOS.

### 3.3 Ventanas y Andamiaje: `MacosWindow` y `MacosScaffold`

A diferencia de las apps móviles que ocupan toda la pantalla, las apps de escritorio residen en ventanas. `macos_ui` ofrece dos widgets clave para estructurar esto:

- **`MacosWindow`**: Representa la ventana principal de tu aplicación. A menudo se coloca como el `home` de `MacosApp`. Su función principal es alojar una barra lateral (`Sidebar`) y el área de contenido principal (`child`). También puede manejar el estado de visibilidad y capacidad de redimensionamiento de la `Sidebar`.
- **`MacosScaffold`**: Proporciona la estructura *interna* típica de una vista o página dentro de una ventana macOS. Define "ranuras" para componentes comunes como la barra de herramientas (`ToolBar`), el contenido principal (`children`, que usualmente contiene un `ContentArea`) y, opcionalmente, una `Sidebar` si no se gestiona a nivel de `MacosWindow`.

La **relación común** es tener `MacosApp` cuyo `home` es un `MacosWindow`. El `MacosWindow` define la `Sidebar` y tiene como `child` un `MacosScaffold`. El `MacosScaffold` a su vez define la `ToolBar` y el `ContentArea` principal.

Dart

```
// Ejemplo de la estructura jerárquica común
class StandardLayout extends StatelessWidget {
  const StandardLayout({super.key});

  @override
  Widget build(BuildContext context) {
    // MacosWindow define la ventana y puede contener la Sidebar
    return MacosWindow(
      sidebar: Sidebar( // La barra lateral
        minWidth: 220,
        builder: (context, scrollController) {
          // Contenido del Sidebar (veremos SidebarItems luego)
          return const Center(child: Text('Sidebar'));
        },
      ),
      // El hijo de MacosWindow es usualmente MacosScaffold
      child: MacosScaffold(
        // Barra de herramientas superior (opcional)
        toolBar: ToolBar(
          title: const Text('Título Principal'),
          actions: [ // Botones de acción en la toolbar
            ToolBarIconButton(
              label: 'Nuevo',
              icon: const MacosIcon(MacosIcons.add_circled),
              onPressed: () => debugPrint('Nuevo presionado'),
              showLabel: false, // Mostrar solo icono
            ),
          ],
        ),
        // El contenido principal va en la lista 'children'
        children: [
          ContentArea( // Widget que define el área de contenido principal
            builder: (context, scrollController) {
              // Aquí va el contenido específico de la vista actual
              return const Center(
                child: Text('Contenido Principal del Scaffold'),
              );
            },
          ),
          // Podríamos tener otros paneles aquí, como ResizablePane
        ],
      ),
    );
  }
}

// En main.dart, usarías:
// home: const StandardLayout(), // dentro de MacosApp
```

### 3.4 Navegación Principal: `Sidebar` y `SidebarItems`

El patrón de navegación por excelencia en macOS para acceder a las secciones principales de una aplicación es la barra lateral o `Sidebar`. `macos_ui` lo implementa con el widget `Sidebar` y sus componentes asociados.

- **`Sidebar`**: Es el panel vertical (usualmente a la izquierda) que aloja la navegación.
  - **Props Clave:**
    - `builder`: Función que construye el contenido interno del `Sidebar`. Típicamente contendrá un widget `SidebarItems`. Recibe un `ScrollController` para manejar el desplazamiento si el contenido es largo.
    - `minWidth`: Ancho mínimo que tendrá la barra lateral.
    - `startWidth`: Ancho con el que se mostrará inicialmente.
    - `maxWidth`: Ancho máximo al que se puede redimensionar (si `isResizable` es true).
    - `isResizable`: `bool` (por defecto `false`) que permite al usuario arrastrar el borde para redimensionarla.
    - `top`: `Widget` opcional fijo en la parte superior (ej: `MacosSearchField`).
    - `bottom`: `Widget` opcional fijo en la parte inferior (ej: botón de ajustes, estado).
- **`SidebarItems`**: Un widget conveniente para construir la lista de elementos navegables dentro del `builder` del `Sidebar`. Gestiona el estado de selección.
  - **Props Clave:**
    - `currentIndex`: `int` que indica el índice del ítem actualmente seleccionado. **Necesitas manejar esto en tu estado**.
    - `onChanged`: `ValueChanged<int>` que se invoca cuando el usuario selecciona un nuevo ítem. **Aquí actualizas tu estado** (ej: con `setState`) para cambiar `currentIndex` y para actualizar el `ContentArea`.
    - `items`: `List<SidebarItem>` que define cada elemento de la lista.
- **`SidebarItem`**: Representa un único elemento navegable en la `Sidebar`.
  - **Props Clave:**
    - `leading`: `Widget` icono (usualmente `MacosIcon`).
    - `label`: `Widget` texto (usualmente `Text`).
    - `trailing`: `Widget` opcional al final (ej: `InfoBadge`).
    - `disclosureItems`: Lista opcional de `SidebarItem` hijos para crear jerarquías (mostrará un triángulo de expansión).

La interacción típica implica tener un `StatefulWidget` que contenga `MacosWindow` o `MacosScaffold`. Este estado mantendrá el `_currentIndex` que se pasa a `SidebarItems`. El callback `onChanged` de `SidebarItems` actualizará este `_currentIndex` con `setState`, y el `ContentArea` usará este índice para decidir qué vista/página mostrar.

Dart

```
// Ejemplo conceptual de estado y SidebarItems (dentro de un StatefulWidget)

int _selectedIndex = 0; // Variable de estado para el índice

// ... en el método build ...

MacosWindow(
  sidebar: Sidebar(
    builder: (context, scrollController) {
      return SidebarItems(
        currentIndex: _selectedIndex, // Vincula al estado
        onChanged: (index) { // Actualiza el estado y dispara cambio de vista
          setState(() {
            _selectedIndex = index;
            // Lógica adicional para cambiar el contenido principal podría ir aquí
            debugPrint('Sidebar index cambiado a: $index');
          });
        },
        // Define los elementos de la barra lateral
        items: const [
          SidebarItem(
            leading: MacosIcon(MacosIcons.apple_script), // Iconos de MacosIcons
            label: Text('Scripts'),
          ),
          SidebarItem(
            leading: MacosIcon(MacosIcons.notes),
            label: Text('Notas'),
          ),
          SidebarItem(
            leading: MacosIcon(MacosIcons.settings_solid), // Variante sólida
            label: Text('Configuración'),
          ),
        ],
      );
    },
    // bottom: MacosListTile(...), // Podría ir un botón de ajustes aquí también
  ),
  child: MacosScaffold(
    // ... toolbar ...
    children: [
      ContentArea(
        builder: (context, scrollController) {
          // Aquí construirías el widget de contenido basado en _selectedIndex
          // Ejemplo simple:
          return Center(child: Text('Contenido para la Sección $_selectedIndex'));
        },
      ),
    ],
  ),
)
```

Entender cómo `MacosApp` inicializa el entorno, `MacosTheme` define la apariencia, `MacosWindow` y `MacosScaffold` estructuran la ventana/vista, y `Sidebar` maneja la navegación principal, es la base indispensable para construir interfaces de usuario efectivas y nativas en macOS con `macos_ui`.

## 4. Explorando los Widgets Clave de `macos_ui`

Habiendo establecido la estructura fundamental con `MacosApp`, `MacosTheme` y los pilares de la interfaz como `MacosWindow`, `MacosScaffold` y `Sidebar`, estamos listos para sumergirnos en la rica biblioteca de componentes individuales que `macos_ui` pone a nuestra disposición. Esta sección es el corazón práctico del artículo, donde aprenderemos a utilizar los widgets específicos que darán vida, interactividad y funcionalidad detallada a nuestra interfaz de usuario al estilo macOS.

El paquete `macos_ui` ofrece una colección cuidadosamente diseñada de widgets que buscan emular fielmente la apariencia y el comportamiento de los controles nativos encontrados en las aplicaciones de macOS, siguiendo de cerca las directrices de las Human Interface Guidelines (HIG) de Apple. Cubriremos desde los elementos que nos permiten refinar aún más la estructura y la navegación, pasando por la variedad de botones y controles para la entrada de datos, hasta las distintas formas de presentar información al usuario y aplicar los efectos visuales característicos del sistema operativo. En esencia, `macos_ui` nos proporciona las piezas necesarias para ensamblar aplicaciones completas y visualmente integradas.

En las subsecciones que siguen a continuación, realizaremos una exploración sistemática de los widgets más importantes y de uso más común, organizándolos lógicamente según su función principal (estructura, comandos, entrada, visualización, estilo). Para cada widget destacado, veremos cómo instanciarlo, cuáles son sus propiedades de configuración más relevantes y cómo integrarlo de manera efectiva en nuestra aplicación para crear esas experiencias de usuario fluidas, intuitivas y familiares que los usuarios de Mac esperan y aprecian. Nos apoyaremos en ejemplos de código claros y comentados para ilustrar su aplicación práctica.

Prepárate para equipar tu caja de herramientas de desarrollo Flutter con los componentes esenciales que te permitirán construir interfaces de escritorio para macOS con un alto grado de fidelidad nativa.

### 4.1. Estructura y Navegación

Una aplicación macOS bien diseñada se siente familiar y fácil de usar en gran parte debido a su estructura predecible y sus patrones de navegación consistentes. `macos_ui` nos proporciona los widgets clave para replicar esta estructura fundamental, siguiendo de cerca las Human Interface Guidelines (HIG) de Apple.

#### 4.1.1 `MacosWindow`: El Contenedor Principal

Mientras que `MacosApp` es la raíz de la aplicación Flutter, `MacosWindow` representa la ventana visual principal que el usuario ve e interactúa. Aunque técnicamente podrías colocar un `MacosScaffold` directamente como `home` de `MacosApp`, usar `MacosWindow` ofrece una forma más estructurada y conveniente, especialmente cuando necesitas una barra lateral (`Sidebar`).

- **Propiedades Clave:**
  - `child`: El widget principal que ocupa el área de contenido de la ventana. **Muy comúnmente, este es un `MacosScaffold`**.
  - `sidebar`: Un widget `Sidebar` opcional. Si se proporciona aquí, `MacosWindow` lo colocará automáticamente a la izquierda (por defecto) del `child` y puede gestionar algunos aspectos de su estado (como el colapso inicial).
  - `titleBar`: Aunque la personalización profunda de la barra de título requiere APIs nativas, esta propiedad permite cierta configuración básica provista por `macos_ui`. Sin embargo, el foco principal del paquete está en el *contenido* de la ventana.
  - `backgroundColor`: Permite definir un color de fondo para toda la ventana.

Usar `MacosWindow` es la forma recomendada para implementar el layout estándar de macOS que incluye una `Sidebar`.

#### 4.1.2 `MacosScaffold`: El Andamio de la Vista

`MacosScaffold` actúa como el "andamio" que organiza la interfaz de usuario *dentro* de la ventana (o dentro de una sección principal de la app). Define las "ranuras" para los componentes estructurales más comunes de una vista macOS.

- **Propiedades Clave:**
  - `toolBar`: Un `ToolBar` opcional. Si se proporciona, se muestra horizontalmente en la parte superior del área de contenido, justo debajo de la barra de título de la ventana. Es el lugar ideal para acciones globales o contextuales de la vista actual.
  - `children`: Una `List<Widget>` que define las áreas principales del cuerpo del scaffold. La estructura más común aquí incluye:
    - `ContentArea`: **Indispensable**. Define el área principal donde se mostrará el contenido específico de la vista o página actual. Su `builder` recibe un `ScrollController`.
    - `Sidebar`: Puedes colocar la `Sidebar` como un hijo de `MacosScaffold` si *no* la definiste en `MacosWindow`. Esto puede ser útil para sidebars secundarias o contextuales, o si necesitas un control más manual sobre el layout general.
    - `ResizablePane`: Paneles adicionales (izquierda, derecha, inferior) cuyo tamaño puede ser ajustado por el usuario arrastrando un divisor. Perfecto para layouts maestro-detalle o paneles de inspección.
  - `backgroundColor`: Color de fondo específico para el área del scaffold, si no quieres que sea transparente o herede del tema/ventana.

La jerarquía más habitual y recomendada es `MacosApp` -> `MacosWindow` (con `Sidebar`) -> `child: MacosScaffold` (con `ToolBar` y `ContentArea`).

Dart

```
// Ejemplo Estructura Combinada (Convertido a StatefulWidget para manejar estado de Sidebar)
class StandardLayout extends StatefulWidget {
  const StandardLayout({super.key});
  @override State<StandardLayout> createState() => _StandardLayoutState();
}

class _StandardLayoutState extends State<StandardLayout> {
  int _sidebarIndex = 0; // Estado para saber qué ítem del Sidebar está activo

  // Función simple para construir el contenido según el índice
  Widget _buildContent(int index) {
    switch (index) {
      case 0: return const Center(child: Text('Contenido de la Sección Archivos'));
      case 1: return const Center(child: Text('Contenido de la Sección Documentos'));
      case 2: return const Center(child: Text('Contenido de la Sección Ajustes'));
      default: return const Center(child: Text('Selecciona una sección'));
    }
  }

  @override
  Widget build(BuildContext context) {
    // MacosWindow gestiona la ventana y la Sidebar principal
    return MacosWindow(
      sidebar: Sidebar(
        minWidth: 200,
        isResizable: true, // Permite al usuario redimensionar la sidebar
        startWidth: 250, // Ancho inicial
        // Usamos SidebarItems para construir la lista de navegación
        builder: (context, scrollController) {
          return SidebarItems(
            currentIndex: _sidebarIndex, // Pasa el índice activo
            onChanged: (index) { // Callback cuando el usuario selecciona otro ítem
              setState(() => _sidebarIndex = index);
            },
            // Definición de los ítems de la sidebar
            items: const [
              SidebarItem(
                leading: MacosIcon(MacosIcons.folder_smart), // Iconos de MacosIcons
                label: Text('Archivos'),
              ),
              SidebarItem(
                leading: MacosIcon(MacosIcons.document_solid), // Icono sólido
                label: Text('Documentos'),
              ),
               SidebarItem(
                leading: MacosIcon(MacosIcons.settings),
                label: Text('Ajustes'),
              ),
            ],
          );
        },
        // Podríamos añadir contenido fijo en la parte inferior aquí
        // bottom: Padding(...),
      ),
      // El hijo principal de MacosWindow es el Scaffold
      child: MacosScaffold(
        // Barra de herramientas superior
        toolBar: ToolBar(
          title: const Text('Mi App Nativa macOS'), // Título en la Toolbar
          // titleWidth: 200.0, // Ancho reservado opcional para el título
          actions: [ // Lista de acciones en la toolbar
            ToolBarIconButton(
              label: 'Refrescar', // Etiqueta para accesibilidad y tooltip
              icon: const MacosIcon(MacosIcons.refresh),
              onPressed: () => debugPrint('Toolbar: Refrescar'),
              showLabel: false, // Mostrar solo icono por defecto
              tooltipMessage: 'Recargar datos', // Mensaje tooltip
            ),
            ToolBarPulldownButton( // Botón con menú desplegable
              label: 'Opciones',
              icon: MacosIcons.ellipsis, // Icono de puntos suspensivos
              items: [ // Items del menú
                MacosPulldownMenuItem(
                  label: 'Exportar...',
                  onTap: () => debugPrint('Exportar seleccionado'),
                ),
                 MacosPulldownMenuItem(
                  label: 'Imprimir',
                  enabled: false, // Ejemplo de ítem deshabilitado
                  onTap: (){},
                ),
                const MacosPulldownMenuDivider(), // Separador
                MacosPulldownMenuItem(
                  label: 'Preferencias...',
                  onTap: () => debugPrint('Preferencias seleccionado'),
                ),
              ],
            ),
            const ToolBarSpacer(), // Ocupa espacio flexible, empuja lo siguiente a la derecha
            ToolBarIconButton(
              label: 'Ayuda',
              icon: const MacosIcon(MacosIcons.help_circle),
              onPressed: () => debugPrint('Toolbar: Ayuda'),
              showLabel: false,
            ),
          ],
        ),
        // Contenido principal del Scaffold
        children: [
          ContentArea( // Área donde se muestra el contenido principal
            builder: (context, scrollController) {
              // Devuelve el widget correspondiente al índice seleccionado
              return _buildContent(_sidebarIndex);
            },
          ),
          // Ejemplo de cómo añadir un panel derecho redimensionable
          // ResizablePane(
          //   minWidth: 180,
          //   startWidth: 250,
          //   windowBreakpoint: 700, // Opcional: se colapsa si la ventana es más estrecha
          //   builder: (_, __) {
          //     return Center(child: Text('Panel de Detalles'));
          //   },
          //   resizableSide: ResizableSide.left,
          // ),
        ],
      ),
    );
  }
}

// Recuerda usar este widget `StandardLayout` como `home` en tu `MacosApp`.
```

#### 4.1.3 `Sidebar`: Navegación Lateral Detallada

El `Sidebar` es fundamental para la navegación principal. Profundicemos:

- **`SidebarItems`:** Es la forma más sencilla de crear una lista de navegación estándar. Se encarga del resaltado del ítem seleccionado y llama a `onChanged` con el nuevo índice.
- **`SidebarItem`:**
  - `leading`: Icono (`MacosIcon`).
  - `label`: Texto (`Text`).
  - `trailing`: Widget opcional (ej: `InfoBadge` para notificaciones).
  - `disclosureItems`: Una `List<SidebarItem>` para crear subniveles. Al definir esto, el `SidebarItem` padre mostrará un triángulo (disclosure indicator). El `onTap` del padre normalmente no navega, sino que solo gestiona la expansión/colapso de los hijos (aunque puedes personalizar este comportamiento).
- **`top` / `bottom`:** Permiten añadir widgets fijos. `top` es ideal para un `MacosSearchField`. `bottom` es bueno para botones de acción globales (como "Añadir Cuenta") o información de estado.
- **Estilo Visual:** El fondo del `Sidebar` a menudo utiliza efectos de "vibrancy" (translucidez basada en el fondo) automáticamente, especialmente si se usa dentro de `MacosWindow`, contribuyendo a la estética nativa.

#### 4.1.4 `ToolBar`: Acciones Globales y Contextuales

La `ToolBar` es el hogar natural para las acciones más frecuentes o relevantes para la vista actual.

- **`ToolBar` (Widget Contenedor):** Se coloca en `MacosScaffold.toolBar`.
  - `title` / `titleWidth`: Para mostrar un título centrado (si cabe).
  - `actions`: La lista de `ToolbarItem`s que componen la barra.
- **Tipos de `ToolbarItem`:**
  - `ToolBarIconButton`: El más común. Botón con icono. `label` es importante para accesibilidad y tooltips (`tooltipMessage`). `showLabel: false` es lo habitual.
  - `ToolBarPulldownButton`: Botón con icono que despliega un menú (`items: List<MacosPulldownMenuItem>`). Similar a `PulldownButton` pero diseñado para la `ToolBar`.
  - `ToolBarSpacer`: Ocupa espacio flexible. Útil para empujar grupos de acciones hacia la derecha.
  - `CustomToolbarItem`: Para insertar cualquier widget (un `MacosSearchField`, `PopupButton`, etc.). Usa `placement: ToolbarItemPlacement.principal` (izquierda/centro) o `.final` (derecha).

#### 4.1.5 `MacosTabView`: Vistas con Pestañas

Cuando necesitas presentar múltiples vistas o documentos del mismo nivel jerárquico dentro del `ContentArea`, `MacosTabView` ofrece la interfaz de pestañas estándar de macOS.

- **Props Clave:**
  - `tabs`: `List<MacosTab>`. Cada `MacosTab` define una pestaña.
    - `MacosTab`: Requiere `label` (`String`) y `body` (`Widget`). Opcionalmente `closeable: true` y `onClosed` callback.
  - `currentIndex`: El índice del tab activo (necesita gestión de estado).
  - `onChanged`: Callback cuando el usuario cambia de tab.
  - `showAddButton` / `onNewPressed`: Para permitir añadir tabs dinámicamente.
  - `onTabClose`: Callback global para manejar el cierre de cualquier pestaña (si no se maneja en `MacosTab.onClosed`).

Dart

```
// Ejemplo de uso de MacosTabView dentro de un ContentArea
class MyTabViewPage extends StatefulWidget {
  const MyTabViewPage({super.key});
  @override State<MyTabViewPage> createState() => _MyTabViewPageState();
}

class _MyTabViewPageState extends State<MyTabViewPage> {
  int _currentTabIndex = 0;
  // Lista de tabs (podría ser dinámica)
  final List<MacosTab> _myTabs = [
    MacosTab(label: 'Vista A', body: const Center(child: Text('Contenido A'))),
    MacosTab(label: 'Vista B', body: const Center(child: Text('Contenido B'))),
    MacosTab(label: 'Vista C', body: const Center(child: Text('Contenido C')), closeable: false), // Esta no se puede cerrar
  ];

  @override
  Widget build(BuildContext context) {
    // Se colocaría dentro del builder de un ContentArea
    return Padding(
      padding: const EdgeInsets.all(16.0), // Padding alrededor del TabView
      child: MacosTabView(
        currentIndex: _currentTabIndex,
        onChanged: (index) => setState(() => _currentTabIndex = index),
        tabs: _myTabs,
        // Podríamos añadir lógica para añadir/cerrar tabs aquí
        // showAddButton: true,
        // onNewPressed: () { ... },
        // onTabClose: (index) { ... },
      ),
    );
  }
}

// Luego, en el `_buildContent` de `StandardLayout`, podrías devolver:
// case 1: return const MyTabViewPage(); // Ejemplo
```

Estos widgets (`MacosWindow`, `MacosScaffold`, `Sidebar`, `ToolBar`, `MacosTabView`) son esenciales para definir la macro-estructura y los flujos de navegación principales, sentando las bases para una aplicación macOS coherente y fácil de usar con Flutter y `macos_ui`.

### 4.2. Comandos y Acciones

Una aplicación cobra vida cuando el usuario puede interactuar con ella. Los botones son los elementos primarios para permitir estas interacciones, ya sea para ejecutar una acción directa, obtener ayuda o seleccionar una opción de un menú. `macos_ui` proporciona los tipos de botones estándar que los usuarios esperan en macOS.

#### 4.2.1 `PushButton`: El Botón Estándar

El `PushButton` es el botón de comando más ubicuo y fundamental en macOS. Se utiliza para iniciar una acción inmediata al ser presionado.

- **Propiedades Clave:**
  - `child`: El contenido que se muestra dentro del botón, generalmente un widget `Text`.
  - `onPressed`: El `VoidCallback` que contiene la lógica a ejecutar cuando se presiona el botón. Si proporcionas `null`, el botón se mostrará automáticamente en estado deshabilitado.
  - `buttonSize`: Define el tamaño del botón usando la enumeración `ButtonSize` (`.small`, `.regular`, `.large`). El tamaño `.regular` es el más común para acciones generales, mientras que `.large` se usa a menudo para acciones principales en diálogos y `.small` para acciones secundarias o en barras de herramientas compactas.
  - `isSecondary`: Un `bool` (por defecto `false`). Cuando es `true`, aplica un estilo visual ligeramente diferente (usualmente menos prominente), adecuado para acciones secundarias como "Cancelar" o "No guardar" en un diálogo, junto a un botón primario.
  - `color`: Permite sobreescribir el color de fondo/borde. Aunque a menudo se hereda del tema, puedes usar `MacosTheme.of(context).primaryColor` para enfatizar visualmente un botón como la acción principal (por ejemplo, el botón "Aceptar" o "Guardar" en un diálogo).
  - `semanticLabel`: Cadena descriptiva para accesibilidad (lectores de pantalla).

Dart

```
// Demostración de diferentes PushButtons
class PushButtonShowcase extends StatelessWidget {
  const PushButtonShowcase({super.key});

  @override
  Widget build(BuildContext context) {
    // Usamos Wrap para que los botones se ajusten en el espacio disponible
    return Wrap(
      spacing: 15.0, // Espacio horizontal
      runSpacing: 10.0, // Espacio vertical si hay salto de línea
      alignment: WrapAlignment.start, // Alineación
      children: [
        // Botón principal (implícito) de tamaño grande
        PushButton(
          buttonSize: ButtonSize.large,
          child: const Text('Guardar Cambios'),
          onPressed: () => debugPrint('PushButton: Guardar'),
        ),
        // Botón secundario de tamaño grande
        PushButton(
          buttonSize: ButtonSize.large,
          isSecondary: true, // Marcado como secundario
          child: const Text('Descartar'),
          onPressed: () => debugPrint('PushButton: Descartar'),
        ),
        // Botón de tamaño regular
        PushButton(
          buttonSize: ButtonSize.regular,
          child: const Text('Abrir Archivo...'),
          onPressed: () => debugPrint('PushButton: Abrir'),
        ),
        // Botón de tamaño pequeño
        PushButton(
          buttonSize: ButtonSize.small,
          child: const Text('Detalles'),
          onPressed: () => debugPrint('PushButton: Detalles'),
        ),
        // Botón deshabilitado
        const PushButton(
          buttonSize: ButtonSize.regular,
          onPressed: null, // La clave para deshabilitar
          child: Text('Acción No Disponible'),
        ),
         // Botón enfatizado como primario usando el color del tema
         // Útil en diálogos para la acción principal afirmativa
        PushButton(
          buttonSize: ButtonSize.large,
          color: MacosTheme.of(context).primaryColor, // Usa el color primario del tema
          child: const Text('Confirmar'),
          onPressed: () => debugPrint('PushButton: Confirmar'),
        ),
      ],
    );
  }
}
```

#### 4.2.2 `HelpButton`: Ayuda Contextual

macOS tiene un estilo estándar para botones de ayuda: un círculo azul con un signo de interrogación blanco (?). `macos_ui` lo implementa con `HelpButton`.

- **Propiedades Clave:**
  - `onPressed`: `VoidCallback` que se ejecuta al presionar. Aquí deberías mostrar información de ayuda relevante para el contexto actual (abrir un `MacosSheet`, un `Popover` (si estuviera disponible), o enlazar a documentación).
  - `size`: `double` opcional para ajustar el tamaño del icono/botón.

Dart

```
// Ejemplo de uso de HelpButton
Row(
  children: [
    const Text('Activar compresión avanzada:'),
    const SizedBox(width: 8),
    HelpButton(
      onPressed: () {
        debugPrint('Mostrando ayuda sobre compresión avanzada...');
        // Aquí podrías llamar a una función que muestre un MacosAlertDialog o MacosSheet
        // showMacosAlertDialog(context: context, ...);
      },
    ),
  ],
)
```

Es ideal colocarlo junto a configuraciones o campos que puedan requerir una explicación adicional para el usuario.

#### 4.2.3 `PopupButton<T>`: Selección desde un Menú

Cuando el usuario necesita elegir una opción de una lista predefinida de valores (y solo una opción puede estar activa), `PopupButton` es el control estándar en macOS. Muestra el valor actual y, al hacer clic, despliega un menú para seleccionar uno diferente. Es el equivalente macOS de `DropdownButton` en Material o `ComboBox` en Fluent.

- **Propiedades Clave:**
  - `value`: El valor actual de tipo `T` que está seleccionado. Debe coincidir con el `value` de uno de los `items`.
  - `items`: Una `List<MacosPopupMenuItem<T>>`. Define las opciones del menú. Cada `MacosPopupMenuItem` tiene:
    - `value`: El valor único (de tipo `T`) asociado a esta opción.
    - `child`: El `Widget` (usualmente `Text`) que se muestra en la lista del menú.
  - `onChanged`: `ValueChanged<T?>` que se llama cuando el usuario selecciona un nuevo ítem del menú. Recibe el `value` del ítem seleccionado. **Aquí actualizas tu estado**.
  - `itemBuilder`: Alternativa a `items` si necesitas construir los ítems del menú dinámicamente.
  - `hint`: `Widget` que se muestra en el botón si `value` es `null`.
  - `buttonSize`: Controla el tamaño (`.small`, `.regular`, `.large`).

Dart

```
// Ejemplo de PopupButton para seleccionar una fuente
class FontSelectorPopup extends StatefulWidget {
  const FontSelectorPopup({super.key});
  @override State<FontSelectorPopup> createState() => _FontSelectorPopupState();
}

// Simulamos algunas fuentes disponibles
const List<String> _availableFonts = ['San Francisco', 'Helvetica Neue', 'Menlo', 'Times New Roman'];

class _FontSelectorPopupState extends State<FontSelectorPopup> {
  String _selectedFont = _availableFonts[0]; // Estado para la fuente seleccionada

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Text('Fuente: '),
        const SizedBox(width: 8),
        PopupButton<String>(
          value: _selectedFont, // Vincula al estado
          onChanged: (String? newFont) { // Actualiza el estado al cambiar
            if (newFont != null) {
              setState(() => _selectedFont = newFont);
              debugPrint('Fuente seleccionada: $newFont');
            }
          },
          // Crea los ítems del menú a partir de la lista de fuentes
          items: _availableFonts.map((font) => MacosPopupMenuItem<String>(
                value: font,       // El valor asociado
                child: Text(font), // El texto a mostrar en el menú
              )).toList(),
          buttonSize: ButtonSize.regular,
          // hint: Text('Seleccionar Fuente'), // Se mostraría si _selectedFont fuera null
        ),
      ],
    );
  }
}
```

#### 4.2.4 `PulldownButton`: Menú de Acciones

Mientras que `PopupButton` es para *seleccionar un valor*, `PulldownButton` es para presentar un menú de *acciones* o comandos relacionados. Puede aparecer como un icono, texto o ambos, y al hacer clic despliega una lista de acciones ejecutables.

- **Propiedades Clave:**
  - `items`: `List<MacosPulldownMenuItem>`. Define las acciones. Cada `MacosPulldownMenuItem` tiene:
    - `label`: El `String` que se muestra para la acción.
    - `onTap`: El `VoidCallback` que se ejecuta al seleccionar esta acción.
    - `enabled`: `bool` para habilitar/deshabilitar la acción.
  - También puedes usar `MacosPulldownMenuDivider` en la lista para separar grupos de acciones.
  - `itemBuilder`: Alternativa a `items` para construcción dinámica.
  - `icon`: `IconData?` (ej: `MacosIcons.ellipsis`, `MacosIcons.gear`) para mostrar un icono en el botón.
  - `title`: `Widget?` (ej: `Text('Archivo')`) para mostrar texto en el botón. Puedes usar `icon`, `title` o ambos (aunque esto último es menos común en macOS que un icono solo o texto solo).
  - `buttonSize`: `ButtonSize`.
- **Nota:** No lo confundas con `ToolBarPulldownButton`. Este último está diseñado específicamente para la `ToolBar`, mientras que `PulldownButton` es para uso general dentro del contenido de tu aplicación.

Dart

```
// Ejemplo de PulldownButton con acciones de edición
class EditActionsPulldown extends StatelessWidget {
  const EditActionsPulldown({super.key});

  @override
  Widget build(BuildContext context) {
    return PulldownButton(
      // Icono común para un menú de "más acciones"
      icon: MacosIcons.ellipsis,
      // Define las acciones disponibles
      items: [
        MacosPulldownMenuItem(
          label: 'Cortar',
          onTap: () => debugPrint('Pulldown: Cortar'),
        ),
         MacosPulldownMenuItem(
          label: 'Copiar',
          onTap: () => debugPrint('Pulldown: Copiar'),
        ),
         MacosPulldownMenuItem(
          label: 'Pegar',
          enabled: false, // Ejemplo: Pegar podría estar deshabilitado
          onTap: (){},
        ),
        const MacosPulldownMenuDivider(), // Separador
         MacosPulldownMenuItem(
          label: 'Buscar...',
          onTap: () => debugPrint('Pulldown: Buscar'),
        ),
      ],
      buttonSize: ButtonSize.small, // Pequeño es común para estos botones contextuales
    );
  }
}
```

La elección correcta entre `PushButton` (acción directa), `HelpButton` (ayuda), `PopupButton` (selección de valor) y `PulldownButton` (menú de acciones) es clave para que tu aplicación se sienta intuitiva y siga las convenciones esperadas por los usuarios de macOS.

### 4.3. Controles de Entrada

La capacidad de una aplicación para recibir información del usuario es fundamental. `macos_ui` proporciona implementaciones de los controles de entrada nativos de macOS, permitiendo a los usuarios introducir texto, hacer selecciones, elegir fechas o ajustar valores de forma intuitiva y familiar.

#### 4.3.1 Entrada de Texto: `MacosTextField` y `MacosSearchField`

- **`MacosTextField`**: Este es el widget principal para la entrada de texto, ya sea de una sola línea o multilínea.
  - **Propiedades Clave:**
    - `controller`: Un `TextEditingController` estándar de Flutter para controlar y acceder al contenido del campo.
    - `placeholder`: `String` que se muestra como guía dentro del campo cuando está vacío.
    - `prefix`: `Widget` opcional que se muestra al inicio (izquierda) del campo (ej: un `MacosIcon`).
    - `suffix`: `Widget` opcional que se muestra al final (derecha) del campo (ej: un `MacosIcon` o un botón).
    - `maxLines`: Número de líneas. Por defecto es 1. Para entrada multilínea, usa `null` o un valor mayor que 1 (aparecerá scroll si el texto excede el espacio).
    - `onChanged`: `ValueChanged<String>` que se dispara cada vez que el texto cambia.
    - `onSubmitted`: `ValueChanged<String>` que se dispara cuando el usuario finaliza la edición (normalmente al presionar Enter en campos de una línea).
    - `clearButtonMode`: `OverlayVisibilityMode` (`.never`, `.editing`, `.always`) controla la visibilidad del botón estándar 'x' para borrar el contenido del campo. `.editing` (visible mientras se escribe) es una opción común.
    - `obscureText`: `bool` (por defecto `false`). Ponerlo a `true` oculta los caracteres introducidos, útil para campos de contraseña (aunque `macos_ui` no tiene un `MacosPasswordBox` dedicado como `fluent_ui`).
- **`MacosSearchField`**: Una variante estilizada de `MacosTextField`, diseñada específicamente para campos de búsqueda. Incluye un icono de lupa por defecto y a menudo se combina con un botón de cancelar (usando la propiedad `suffix`).
  - **Propiedades Clave:** Hereda muchas de `MacosTextField` (`controller`, `placeholder`, `onChanged`, `onSubmitted`).
  - `results`: `List<Widget>?` opcional. Permite mostrar una lista de resultados directamente debajo del campo (útil para sugerencias simples, aunque lógicas de búsqueda más complejas suelen gestionarse externamente).
  - `searchIconColor`: Permite personalizar el color del icono de lupa.

Dart

```
// Demostración de MacosTextField y MacosSearchField
class TextFieldsShowcase extends StatefulWidget {
  const TextFieldsShowcase({super.key});
  @override State<TextFieldsShowcase> createState() => _TextFieldsShowcaseState();
}

class _TextFieldsShowcaseState extends State<TextFieldsShowcase> {
  // Controllers para gestionar el texto
  final _nameController = TextEditingController();
  final _searchController = TextEditingController();
  final _commentController = TextEditingController();
  final _passwordController = TextEditingController();

  @override void dispose() {
    _nameController.dispose();
    _searchController.dispose();
    _commentController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min, // Ajusta la columna al contenido
      children: [
        const Text('Campo de Texto Básico:'),
        MacosTextField(
          controller: _nameController,
          placeholder: 'Nombre Completo',
          clearButtonMode: OverlayVisibilityMode.editing, // Botón 'x' al editar
        ),
        const SizedBox(height: 16),

        const Text('Campo de Contraseña (obscureText):'),
        MacosTextField(
          controller: _passwordController,
          placeholder: 'Contraseña',
          obscureText: true, // Oculta el texto
           clearButtonMode: OverlayVisibilityMode.editing,
        ),
        const SizedBox(height: 16),

        const Text('Campo de Búsqueda:'),
        MacosSearchField(
          controller: _searchController,
          placeholder: 'Buscar elemento...',
          onSubmitted: (value) { // Acción al presionar Enter
            debugPrint('Realizando búsqueda de: $value');
            // Lógica de búsqueda aquí...
          },
          // Podrías añadir un botón de cancelar en el suffix si es necesario
          // suffix: MacosIconButton( ... ),
        ),
        const SizedBox(height: 16),

        const Text('Campo de Texto Multilínea:'),
        MacosTextField(
          controller: _commentController,
          placeholder: 'Escribe tus comentarios aquí...\nPueden ocupar varias líneas.',
          maxLines: 4, // Permite 4 líneas visibles, con scroll si excede
        ),
      ],
    );
  }
}
```

#### 4.3.2 Controles de Selección: Checkbox, RadioButton, Switch

Estos controles permiten al usuario realizar selecciones binarias o elegir una opción de un grupo.

- **`MacosCheckbox`**: El checkbox estándar.
  - **Props Clave:** `value` (`bool?` - puede ser `true`, `false`, o `null` para estado indeterminado), `onChanged` (`ValueChanged<bool?>`).
  - **Importante:** No incluye una etiqueta. Debes añadir un widget `Text` (u otro) al lado y, comúnmente, envolver ambos en un `Row` y `GestureDetector` para mejorar la interacción.
- **`MacosRadioButton<T>`**: Para selección única dentro de un grupo.
  - **Props Clave:** `value` (el valor `T` de *esta* opción), `groupValue` (el valor `T` *actualmente seleccionado* en el grupo), `onChanged` (`ValueChanged<T?>`).
  - **Importante:** Requiere que gestiones la lógica de grupo (asegurar que solo uno esté activo) usando la variable `groupValue` en tu estado. Tampoco incluye etiqueta.
- **`MacosSwitch`**: El interruptor estándar On/Off de macOS.
  - **Props Clave:** `value` (`bool`), `onChanged` (`ValueChanged<bool>`).
  - **Importante:** No incluye etiqueta. Se suele colocar junto a un `Text` descriptivo.

Dart

```
// Demostración de controles de selección
class SelectionControlsShowcase extends StatefulWidget {
  const SelectionControlsShowcase({super.key});
  @override State<SelectionControlsShowcase> createState() => _SelectionControlsShowcaseState();
}

// Enum para las opciones del RadioButton
enum ConnectionType { wifi, ethernet, bluetooth }

class _SelectionControlsShowcaseState extends State<SelectionControlsShowcase> {
  bool? _enableFeature = false; // Estado para Checkbox
  ConnectionType _connection = ConnectionType.wifi; // Estado para Radio Buttons
  bool _sendAnalytics = true; // Estado para Switch

  // Helper para crear una fila con etiqueta y control (mejora la legibilidad)
  Widget _buildLabeledControl(String label, Widget control, {VoidCallback? onTap}) {
    // GestureDetector para hacer clickeable toda la fila
    return GestureDetector(
       onTap: onTap, // Permite activar/desactivar desde la etiqueta también
       child: Padding(
         padding: const EdgeInsets.symmetric(vertical: 5.0),
         child: Row(
           children: [
             control, // Checkbox, RadioButton o Switch
             const SizedBox(width: 8), // Espacio
             Expanded(child: Text(label)), // Etiqueta
           ],
         ),
       ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Checkbox con etiqueta externa y GestureDetector
        _buildLabeledControl(
          'Activar Funcionalidad X',
          MacosCheckbox(
            value: _enableFeature,
            onChanged: (value) => setState(() => _enableFeature = value),
          ),
          // Lógica para que al tocar la etiqueta también cambie el checkbox
          onTap: () => setState(() => _enableFeature = !_enableFeature!),
        ),
        const SizedBox(height: 16),

        // Grupo de Radio Buttons
        const Text('Tipo de Conexión Preferida:'),
        // Itera sobre las opciones del enum
        ...ConnectionType.values.map((type) => _buildLabeledControl(
              type.toString().split('.').last.toUpperCase(), // Nombre de la opción
              MacosRadioButton<ConnectionType>(
                value: type,            // Valor de esta opción
                groupValue: _connection, // Valor seleccionado del grupo
                onChanged: (value) {    // Actualiza el grupo
                  if (value != null) setState(() => _connection = value);
                },
              ),
               // Lógica para que al tocar la etiqueta también cambie el radio button
              onTap: () => setState(() => _connection = type),
            )).toList(),
        const SizedBox(height: 16),

        // Switch con etiqueta externa
        _buildLabeledControl(
          'Enviar datos de uso anónimos',
          MacosSwitch(
            value: _sendAnalytics,
            onChanged: (value) => setState(() => _sendAnalytics = value),
          ),
           // Lógica para que al tocar la etiqueta también cambie el switch
          onTap: () => setState(() => _sendAnalytics = !_sendAnalytics),
        ),
      ],
    );
  }
}
```

- **Recuerda:** La práctica común en macOS es asociar etiquetas externas (`Text`) a estos controles y a menudo hacer que la fila completa sea interactiva.

#### 4.3.3 Selectores de Fecha y Rango

- **`MacosDatePicker`**: Invoca el selector de fecha nativo de macOS en un popover.
  - **Props Clave:** `onDateChanged` (`ValueChanged<DateTime>` que se llama al seleccionar una fecha), `initialDate` (`DateTime` para la fecha inicial mostrada), `minDate` y `maxDate` (`DateTime` opcionales para limitar el rango).
- **`MacosSlider`**: El control deslizante estándar.
  - **Props Clave:** `value` (`double` actual), `onChanged` (`ValueChanged<double>`), `min` (`double`), `max` (`double`), `divisions` (`int?` opcional para crear pasos discretos), `discrete` (`bool`, si es `true` y `divisions` existe, muestra las marcas de los pasos).

Dart

```
// Demostración de DatePicker y Slider
class PickersSlidersShowcase extends StatefulWidget {
  const PickersSlidersShowcase({super.key});
  @override State<PickersSlidersShowcase> createState() => _PickersSlidersShowcaseState();
}

class _PickersSlidersShowcaseState extends State<PickersSlidersShowcase> {
  DateTime _selectedStartDate = DateTime.now(); // Estado DatePicker
  double _opacityLevel = 75.0; // Estado Slider (ej: 0-100)

  @override
  Widget build(BuildContext context) {
    // Necesitamos MaterialLocalizations para formatear la fecha
    final localizations = MaterialLocalizations.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // MacosDatePicker
        const Text('Fecha de Inicio:'),
        MacosDatePicker(
          initialDate: _selectedStartDate,
          onDateChanged: (newDate) => setState(() => _selectedStartDate = newDate),
          // Podríamos limitar el rango:
          // minDate: DateTime(2024),
          // maxDate: DateTime.now().add(Duration(days: 365)),
        ),
        // Muestra la fecha seleccionada formateada
        Text('Seleccionada: ${localizations.formatMediumDate(_selectedStartDate)}'),
        const SizedBox(height: 24),

        // MacosSlider
         Text('Nivel de Opacidad: ${_opacityLevel.round()}%'),
        MacosSlider(
          value: _opacityLevel,
          onChanged: (value) => setState(() => _opacityLevel = value),
          min: 0.0,  // Rango de 0 a 100
          max: 100.0,
          divisions: 10, // Pasos de 10 en 10 (11 marcas en total)
          discrete: true,  // Mostrar las marcas
        ),
      ],
    );
  }
}
```

Estos controles forman la base para recopilar la mayoría de los tipos de datos que tus usuarios necesitarán introducir. Su implementación en `macos_ui` asegura que la interacción se sienta natural y consistente con otras aplicaciones del sistema.

### 4.4. Visualización de Contenido

Mostrar información de forma clara, indicar el estado de las operaciones y permitir la interacción con listas de datos son aspectos cruciales de cualquier interfaz de usuario. `macos_ui` proporciona los widgets necesarios para lograr esto siguiendo las convenciones visuales y de comportamiento de macOS.

#### 4.4.1 Texto y Tipografía

A diferencia de `fluent_ui` con su `TextBlock`, en `macos_ui` la práctica estándar es utilizar el widget **`Text`** nativo de Flutter, pero **estilizado a través del `MacosTheme`**. Esto asegura el uso de la fuente San Francisco (predeterminada en macOS) y las jerarquías de tamaño y peso correctas.

**Uso:** Accede a los estilos predefinidos mediante `MacosTheme.of(context).typography`.

Dart

```
// Usando estilos tipográficos del tema macOS
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    // Estilos comunes según las HIG
    Text('Título Grande', style: MacosTheme.of(context).typography.largeTitle),
    Text('Título 1', style: MacosTheme.of(context).typography.title1),
    Text('Título 2', style: MacosTheme.of(context).typography.title2),
    Text('Encabezado', style: MacosTheme.of(context).typography.headline),
    Text('Cuerpo de Texto Principal.', style: MacosTheme.of(context).typography.body),
    Text('Texto de llamada (Callout).', style: MacosTheme.of(context).typography.callout),
    Text('Subtítulo.', style: MacosTheme.of(context).typography.subheadline),
    Text('Nota al pie.', style: MacosTheme.of(context).typography.footnote),
    Text('Texto de leyenda (Caption).', style: MacosTheme.of(context).typography.caption1),
    Text('Leyenda secundaria.', style: MacosTheme.of(context).typography.caption2),
  ],
)
```

**Consistencia:** Utilizar estos estilos garantiza la coherencia visual con el resto del sistema operativo y facilita la legibilidad.

#### 4.4.2 Indicadores de Progreso

Para informar al usuario sobre tareas en curso.

- **`ProgressCircle`**: Un indicador circular giratorio **indeterminado**. Ideal para mostrar actividad sin un progreso específico (ej: "Cargando...", "Procesando...").
  - **Uso Simple:** `const ProgressCircle()`
- **`ProgressBar`**: Una barra de progreso lineal.
  - **Props Clave:**
    - `value`: `double?`. Si es `null`, la barra se anima en modo **indeterminado**. Si es un valor entre `0.0` y `1.0`, muestra el progreso **determinado**.
    - `height`: Altura de la barra (por defecto es 4.0).
    - `backgroundColor`, `valueColor`: Colores personalizables.

Dart

```
// Demostración de indicadores de progreso
class ProgressIndicatorsShowcase extends StatelessWidget {
  const ProgressIndicatorsShowcase({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Circular Indeterminado:'),
          const SizedBox(height: 8),
          const SizedBox( // Envuelto para darle tamaño si es necesario
            width: 32, height: 32,
            child: ProgressCircle(),
          ),
          const SizedBox(height: 20),

          const Text('Barra Indeterminada:'),
          const SizedBox(height: 8),
          const ProgressBar(value: null), // value: null es indeterminado
          const SizedBox(height: 20),

          const Text('Barra Determinada (ej: 60%):'),
          const SizedBox(height: 8),
          ProgressBar(
              value: 0.6, // Progreso al 60%
              valueColor: MacosTheme.of(context).primaryColor, // Opcional: usar color primario
          ),
        ],
      ),
    );
  }
}
```

#### 4.4.3 Listas con `MacosListTile`

Para mostrar listas de elementos, seguimos usando `ListView.builder` de Flutter por eficiencia. Sin embargo, para que cada fila (tile) tenga la apariencia y el comportamiento correctos de macOS (padding, resaltado al pasar el ratón o seleccionar), debemos usar `MacosListTile`.

- **`MacosListTile`**: Representa una fila individual en una lista.
  - **Props Clave:**
    - `leading`: `Widget` que aparece al inicio (izquierda), típicamente un `MacosIcon`.
    - `title`: `Widget` principal (usualmente `Text`).
    - `subtitle`: `Widget` opcional debajo del `title` (usualmente `Text` con estilo `footnote` o `caption`).
    - `trailing`: `Widget` opcional al final (derecha), como otro `MacosIcon`, `Text`, `InfoBadge` o incluso un `PushButton` pequeño.
    - `onClick`: `VoidCallback` para manejar la interacción al hacer clic en toda la fila.
    - `backgroundColor`: Útil para cambiar el fondo, por ejemplo, para indicar el elemento seleccionado en la lista (requiere gestión de estado).

Dart

```
// Ejemplo de ListView seleccionable usando MacosListTile
class SelectableListView extends StatefulWidget {
  const SelectableListView({super.key});
  @override State<SelectableListView> createState() => _SelectableListViewState();
}

class _SelectableListViewState extends State<SelectableListView> {
  int? _selectedItemIndex; // Estado para el índice seleccionado (null si no hay selección)
  final List<String> _fileNames = List.generate(20, (i) => 'Archivo Importante ${i + 1}.pdf');

  @override
  Widget build(BuildContext context) {
    // Usamos Scrollbar para mostrar la barra de scroll estilo macOS
    return MacosScrollbar(
      child: ListView.builder(
        itemCount: _fileNames.length,
        itemBuilder: (context, index) {
          final fileName = _fileNames[index];
          final bool isSelected = _selectedItemIndex == index; // Comprueba si este item está seleccionado

          return MacosListTile(
            leading: MacosIcon(isSelected ? MacosIcons.document_solid : MacosIcons.document),
            title: Text(fileName),
            subtitle: Text('Modificado: Ayer', style: MacosTheme.of(context).typography.footnote),
            // Cambia el color de fondo si está seleccionado
            backgroundColor: isSelected ? MacosTheme.of(context).primaryColor.withOpacity(0.2) : null,
            onClick: () { // Actualiza el estado al hacer clic
              setState(() => _selectedItemIndex = index);
              debugPrint('Seleccionado: $fileName');
            },
            trailing: Text('PDF', style: MacosTheme.of(context).typography.caption1), // Ejemplo de trailing
          );
        },
      ),
    );
  }
}
```

#### 4.4.4 Diálogos (`MacosAlertDialog`) y Hojas (`MacosSheet`)

Para comunicaciones modales con el usuario.

**`MacosAlertDialog`**: El diálogo de alerta estándar, modal para toda la aplicación. Se invoca con `showMacosAlertDialog`.

- **Props Clave:** `appIcon` (`Widget`), `title` (`Widget`), `message` (`Widget`), `primaryButton` (`Widget`), `secondaryButton` (`Widget`), `horizontalSecondaryButton` (`Widget`, opcional para un tercer botón).
- **Uso (Función):**

Dart

```
void _mostrarAlertaSimple(BuildContext context) {
  showMacosAlertDialog(
    context: context,
    builder: (_) => MacosAlertDialog(
      appIcon: const MacosIcon( // Icono de la app o de alerta
        MacosIcons.info_circle_fill,
        color: MacosTheme.of(context).primaryColor,
        size: 56,
      ),
      title: const Text('Información Importante'),
      message: const Text('Esta es una notificación que requiere tu atención, pero no necesariamente una acción crítica.'),
      // Botón primario para cerrar el diálogo
      primaryButton: PushButton(
        buttonSize: ButtonSize.large,
        child: const Text('Entendido'),
        onPressed: () => Navigator.of(context).pop(), // Cierra el diálogo
      ),
    ),
  );
}
// Llamar a _mostrarAlertaSimple(context) desde un onPressed
```

**`MacosSheet`**: Un panel que se desliza desde la barra de título de la ventana *actual*, siendo modal **solo para esa ventana**. Permite al usuario interactuar con otras ventanas de la misma aplicación. Ideal para tareas secundarias, formularios o confirmaciones relacionadas con el contenido de la ventana activa. Se invoca con `showMacosSheet`.

- **Props Clave:** `child` (el contenido de la hoja).
- **Uso (Función):**

Dart

```
void _mostrarHojaConfiguracion(BuildContext context) async {
   final result = await showMacosSheet<bool>( // Espera un resultado opcional
      context: context,
      // barrierDismissible: true, // Permitir cerrar tocando fuera (opcional)
      builder: (_) => MacosSheet(
         // El contenido de la hoja
         child: Padding(
           padding: const EdgeInsets.all(20.0),
           child: Column(
             mainAxisSize: MainAxisSize.min, // Ajusta al contenido
             children: [
               const Text('Configuración Rápida', style: TextStyle(fontWeight: FontWeight.bold)),
               const SizedBox(height: 16),
               const MacosTextField(placeholder: 'Opción 1...'),
               const SizedBox(height: 16),
               Row(
                 mainAxisAlignment: MainAxisAlignment.end,
                 children: [
                    PushButton(
                      buttonSize: ButtonSize.large,
                      isSecondary: true,
                      child: const Text('Cancelar'),
                      onPressed: () => Navigator.pop(context, false), // Cierra y devuelve false
                    ),
                    const SizedBox(width: 12),
                    PushButton(
                      buttonSize: ButtonSize.large,
                      child: const Text('Guardar'),
                      onPressed: () => Navigator.pop(context, true), // Cierra y devuelve true
                    ),
                 ],
               )
             ],
           ),
         ),
      ),
   );
    // Procesar el resultado (si se guardó o canceló)
    if (result == true) { debugPrint('Configuración guardada desde la hoja.'); }
    else { debugPrint('Configuración cancelada desde la hoja.'); }
}
 // Llamar a _mostrarHojaConfiguracion(context) desde un onPressed
```

#### 4.4.5 Otros Elementos Visuales

- **`DisclosureButton`**: Un control para mostrar/ocultar contenido adicional. Muestra un `child` (el encabezado) junto a un triángulo desplegable. Al hacer clic, revela/oculta el `content`. Requiere gestionar el estado de expansión (`isExpanded`, `onExpansionChanged`).
- **`Tooltip`**: Simplemente usa el widget `Tooltip` estándar de Flutter (`Tooltip(message: '...', child: ...)`). Su estilo visual se adapta al tema macOS. Esencial para botones con solo icono o para dar información adicional.

Dart

```
// Ejemplo de DisclosureButton (requiere StatefulWidget)
class AdvancedOptionsDisclosure extends StatefulWidget {
  const AdvancedOptionsDisclosure({super.key});
  @override State<AdvancedOptionsDisclosure> createState() => _AdvancedOptionsDisclosureState();
}

class _AdvancedOptionsDisclosureState extends State<AdvancedOptionsDisclosure> {
  bool _showAdvanced = false; // Estado de expansión

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: DisclosureButton(
        // El encabezado que siempre es visible
        child: const Text('Opciones Avanzadas'),
        isExpanded: _showAdvanced, // Vincula al estado
        onExpansionChanged: (isExpanded) => setState(() => _showAdvanced = isExpanded),
        // El contenido que se muestra/oculta
        content: Container(
          padding: const EdgeInsets.only(left: 20, top: 10, bottom: 10), // Indentación
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('Parámetro X:'), MacosTextField(),
              SizedBox(height: 10),
              Text('Parámetro Y:'), MacosSlider(value: 0.2, onChanged: null),
            ],
          ),
        ),
      ),
    );
  }
}

// Ejemplo de Tooltip en un IconButton de la Toolbar
// ToolBarIconButton(
//   label: 'Guardar',
//   icon: const MacosIcon(MacosIcons.save),
//   onPressed: () { },
//   showLabel: false,
//   tooltipMessage: 'Guardar el documento actual (Cmd+S)', // Mensaje del tooltip
// )
```

Estos widgets te permiten construir interfaces informativas y diálogos modales que siguen las convenciones visuales y de interacción de macOS, contribuyendo a una experiencia de usuario pulida y nativa.

### 4.5. Estilo Visual y Efectos

Una aplicación Flutter puede funcionar en macOS, pero para que se *sienta* verdaderamente parte del sistema, debemos prestar atención a dos componentes clave del diseño visual de Apple: la iconografía estándar y los característicos efectos de translucidez y vitalidad (vibrancy). `macos_ui` nos ayuda a integrar ambos.

#### 4.5.1 Iconografía Nativa con `MacosIcons`

Hemos usado iconos en ejemplos anteriores, pero es vital recalcar: la consistencia visual en macOS depende en gran medida del uso de la iconografía correcta.

**Fuente Principal: `MacosIcons`**: El paquete `macos_ui` incluye la clase estática `MacosIcons`, que es una extensa colección de iconos diseñados para coincidir exactamente con los símbolos utilizados en todo el sistema operativo macOS (basados en los SF Symbols de Apple, aunque adaptados a Flutter). **Prioriza siempre el uso de `MacosIcons`**.

- **Uso:** Se utilizan de forma estándar con el widget `Icon` de Flutter.

Dart

```
// Iconos comunes de macOS
Icon(MacosIcons.search)              // Búsqueda (lupa)
Icon(MacosIcons.add)                  // Añadir (signo '+')
Icon(MacosIcons.trash)                // Papelera
Icon(MacosIcons.sidebar_left)         // Icono para mostrar/ocultar sidebar
Icon(MacosIcons.info_circle)          // Círculo de información
Icon(MacosIcons.apple_logo)           // Logo de Apple (usar con discreción)
Icon(MacosIcons.go_forward)           // Flecha adelante
Icon(MacosIcons.go_backward)          // Flecha atrás
```

**Consistencia y Semántica:** Usar `MacosIcons` no solo asegura la coherencia visual, sino que aprovecha el reconocimiento instantáneo que los usuarios de Mac tienen de estos símbolos. Elige el icono que mejor represente la acción o el concepto semánticamente. Evita mezclar `MacosIcons` con otros sets (como Material Icons) para no romper la armonía visual.

**Personalización (`Icon` y `MacosIcon`):** Puedes usar las propiedades `size` y `color` del widget `Icon`. `macos_ui` también ofrece un widget `MacosIcon` que es esencialmente un wrapper sobre `Icon` pero puede que incorpore algún comportamiento o estilo por defecto adicional alineado con el tema. En general, el color se hereda apropiadamente del contexto (botones, tema). No olvides `semanticLabel`.

Dart

```
// Usando MacosIcon dentro de un botón específico del paquete
PushButton(
  child: Row(
     mainAxisSize: MainAxisSize.min,
     children: [
       MacosIcon(
         MacosIcons.download,
         color: MacosTheme.of(context).primaryColor, // Color del tema
         size: 16.0,
         semanticLabel: 'Descargar archivo', // Para accesibilidad
       ),
       const SizedBox(width: 8),
       const Text('Descargar')
     ],
  ),
  onPressed: () {},
)
```

#### 4.5.2 Efectos de Translucidez y Vitalidad (Vibrancy)

macOS es famoso por sus sutiles efectos de translucidez en elementos como la barra lateral, la barra de herramientas y los menús. Estos efectos, a menudo llamados "vibrancy", no solo permiten ver una versión desenfocada de lo que hay detrás, sino que también **ajustan dinámicamente el color del texto y los iconos** que están *encima* de la superficie translúcida para mantener una legibilidad óptima.

- **Tecnología Nativa:** En el nivel del sistema operativo, estos efectos se logran principalmente con `NSVisualEffectView`.
- **Integración en `macos_ui`:** A diferencia de `fluent_ui` que ofrece widgets explícitos como `Acrylic` y `Mica`, `macos_ui` adopta un enfoque más **implícito**. Aplica automáticamente los efectos de vibrancy apropiados a los widgets estructurales estándar donde macOS los utiliza comúnmente:
  - **`Sidebar`:** Por defecto, la `Sidebar` (especialmente cuando se usa dentro de `MacosWindow`) utiliza un material con vibrancy, adaptándose al modo claro/oscuro y al fondo de la ventana/escritorio.
  - **`ToolBar`:** La `ToolBar` también suele incorporar efectos de translucidez, adaptándose al contenido que se desplaza por debajo.
  - **`MacosScaffold` / `MacosWindow`:** El `backgroundColor` de estos widgets influye. Si usas colores transparentes o semitransparentes, permitirás que los efectos de vibrancy de la `Sidebar` o `ToolBar` interactúen más visiblemente con el fondo general de la ventana o el escritorio. `MacosThemeData` (`canvasColor`, `secondaryCanvasColor`, etc.) proporciona colores base diseñados para funcionar bien con estos efectos.
- **Control Manual Limitado:**`macos_ui` (hasta las versiones recientes, verifica siempre la documentación) **no proporciona un widget genérico y fácil de usar** (como `Acrylic`) para aplicar vibrancy a cualquier contenedor personalizado. La filosofía es que la vibrancy se usa en componentes estructurales específicos definidos por las HIG. Si necesitas replicar un efecto similar en un widget personalizado:
  - Podrías intentar simularlo usando `BackdropFilter` (para el desenfoque) y `ImageFiltered` de Flutter, pero replicar el ajuste dinámico de color del contenido ("vibrancy" real) es complejo.
  - La opción más avanzada sería usar platform views o FFI para incrustar una `NSVisualEffectView` nativa, lo cual queda fuera del alcance de `macos_ui` puro.

Dart

```
// Ejemplo que muestra dónde la Vibrancy se aplica implícitamente
class ImplicitVibrancyDemo extends StatelessWidget {
  const ImplicitVibrancyDemo({super.key});

  @override
  Widget build(BuildContext context) {
    // Asumiendo que MacosApp está configurado con temas light/dark
    return MacosWindow(
      // La Sidebar aplicará vibrancy basada en el tema y el fondo
      sidebar: Sidebar(
        minWidth: 200,
        builder: (context, scrollController) {
          return SidebarItems(
            currentIndex: 0,
            onChanged: (i) {},
            items: const [
              SidebarItem(
                 // Los colores de MacosIcon y Text aquí se ajustarán
                 // automáticamente por la vibrancy de la Sidebar.
                 leading: MacosIcon(MacosIcons.mail_solid),
                 label: Text('Correo'),
              ),
               SidebarItem(
                 leading: MacosIcon(MacosIcons.photo_solid),
                 label: Text('Fotos'),
              ),
            ],
          );
        },
      ),
      // El fondo de la ventana podría ser ligeramente transparente
      // backgroundColor: MacosTheme.of(context).canvasColor.withOpacity(0.8),
      child: MacosScaffold(
         // La Toolbar también tendrá su propio efecto visual
         toolBar: ToolBar(
            title: const Text('Mi Galería'),
            // El color de este icono también se ajusta
            actions: [ ToolBarIconButton(label: 'Info', icon: MacosIcon(MacosIcons.info), onPressed: (){}, showLabel: false,) ],
         ),
         // Si el fondo del Scaffold es transparente, se verá el fondo de MacosWindow
         // backgroundColor: Colors.transparent,
         children: [
           ContentArea(
              builder: (context, scrollController) {
                 // Contenido normal. Este área NO suele tener vibrancy por defecto.
                 return const Center(child: Text('Contenido Principal (generalmente opaco)'));
              }
           )
         ]
      ),
    );
  }
}
```

En resumen, para lograr el estilo visual de macOS: utiliza `MacosIcons` para todos los iconos y confía en que `macos_ui` aplicará los efectos de translucidez y vibrancy donde corresponde (principalmente `Sidebar` y `ToolBar`), siguiendo las convenciones del sistema operativo. La personalización profunda de estos efectos requiere enfoques más avanzados fuera del alcance directo del paquete.

## 5. Construyendo una Aplicación Ejemplo con `macos_ui`

Ahora que conocemos las piezas individuales, veamos cómo ensamblarlas para crear una aplicación macOS coherente y funcional usando `macos_ui`. Nuestro objetivo será una aplicación simple para tomar notas.

**Objetivo de la Aplicación Ejemplo "MacNotes":**

- Mostrar una lista de notas existentes en una barra lateral (`Sidebar`).
- Permitir seleccionar una nota de la lista para ver y editar su contenido en el área principal (`ContentArea`).
- Incluir una barra de herramientas (`ToolBar`) con acciones para crear una nueva nota y eliminar la nota seleccionada.
- Utilizar `MacosAlertDialog` para confirmar la eliminación.
- Aplicar un tema `MacosTheme` personalizado (cambiando el color primario).

Esto nos permitirá integrar `MacosApp`, `MacosWindow`, `MacosScaffold`, `Sidebar`, `ToolBar`, `ListView`, `MacosListTile`, `MacosTextField`, `ToolBarIconButton`, `PushButton` y `MacosAlertDialog`.

**Paso 0: Preparación del Proyecto (Recordatorio)**

Partimos de un proyecto Flutter configurado para macOS con `macos_ui` añadido. Nuestro `lib/main.dart` inicial se verá así (ya incluyendo un color primario personalizado y listo para usar nuestro layout principal):

Dart

```
// lib/main.dart (Punto de partida actualizado)
import 'package:flutter/cupertino.dart';
import 'package:macos_ui/macos_ui.dart';
import 'screens/main_layout.dart'; // Importaremos esta pantalla que vamos a crear

void main() {
  runApp(const MacNotesApp());
}

class MacNotesApp extends StatelessWidget {
  const MacNotesApp({super.key});

  // Definimos un color primario personalizado para la app
  static final AccentColor appPrimaryColor = Colors.orange.toAccentColor(); // ¡Usaremos naranja!

  @override
  Widget build(BuildContext context) {
    return MacosApp(
      title: 'MacNotes', // Título en la barra de menú
      debugShowCheckedModeBanner: false,

      // Aplicamos el color primario a los temas claro y oscuro
      theme: MacosThemeData.light().copyWith(primaryColor: appPrimaryColor),
      darkTheme: MacosThemeData.dark().copyWith(primaryColor: appPrimaryColor),
      themeMode: ThemeMode.system, // Respetar configuración del sistema

      // Nuestra pantalla/layout principal
      home: const MainLayout(), // Usaremos el widget que crearemos a continuación
    );
  }
}
```

**Paso 1: Modelo de Datos y Estructura Principal (`MainLayout`)**

Primero, definamos un modelo simple para nuestras notas y luego creemos el widget principal `MainLayout` que contendrá la estructura `MacosWindow` > `MacosScaffold` > `Sidebar`/`ContentArea`/`Toolbar`.

**1. Modelo `Note`:** Crea el archivo `lib/models/note.dart`

Dart

```
// lib/models/note.dart
class Note {
  String id;
  String title;
  String content;
  DateTime lastModified;

  Note({
    required this.id,
    required this.title,
    this.content = '',
    DateTime? lastModified,
  }) : this.lastModified = lastModified ?? DateTime.now();

  // Sobrescribir == y hashCode es buena práctica si buscas/comparas objetos
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Note && runtimeType == other.runtimeType && id == other.id;

  @override
  int get hashCode => id.hashCode;
}
```

**2. Widget `MainLayout`:** Crea el archivo `lib/screens/main_layout.dart`. Este será un `StatefulWidget` para manejar la lista de notas y la nota seleccionada. **(Nota: Usamos estado local simple aquí por brevedad. En una app real, usa Provider/Riverpod/etc.)**

Dart

```
// lib/screens/main_layout.dart
import 'dart:math'; // Para generar IDs simples
import 'package:flutter/cupertino.dart';
import 'package:macos_ui/macos_ui.dart';
import '../models/note.dart'; // Importa el modelo

// Estado "global" simulado - ¡NO HACER ESTO EN PRODUCCIÓN!
final List<Note> _notesDb = [
  Note(id: '1', title: 'Bienvenida', content: '¡Bienvenido a MacNotes!\n\nUsa la barra lateral para navegar.'),
  Note(id: '2', title: 'Ideas Proyecto', content: '- Concepto A\n- Prototipo B\n- Revisión C'),
];

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  Note? _selectedNote; // Nota activa (puede ser null)
  final TextEditingController _contentController = TextEditingController(); // Para el editor
  final ScrollController _sidebarScrollController = ScrollController(); // Para la Sidebar
  final ScrollController _contentScrollController = ScrollController(); // Para el ContentArea

  @override
  void initState() {
    super.initState();
    // Seleccionar la primera nota al iniciar si existe
    if (_notesDb.isNotEmpty) {
      _selectNote(_notesDb.first);
    }
  }

  @override
  void dispose() {
    _contentController.dispose();
    _sidebarScrollController.dispose();
    _contentScrollController.dispose();
    super.dispose();
  }

  // --- Lógica de Estado ---

  void _selectNote(Note note) {
    setState(() {
      _selectedNote = note;
      _contentController.text = note.content; // Carga contenido en el editor
      debugPrint('Nota seleccionada: ${note.title}');
    });
  }

  void _updateSelectedNoteContent(String newContent) {
    if (_selectedNote != null) {
      final index = _notesDb.indexWhere((n) => n.id == _selectedNote!.id);
      if (index != -1) {
        // Actualiza el estado local para forzar reconstrucción donde sea necesario
        setState(() {
          // Modifica la lista "global" (¡mal patrón en app real!)
          _notesDb[index].content = newContent;
          _notesDb[index].lastModified = DateTime.now();
          // Opcional: Actualizar título basado en primera línea (lógica omitida)
          // _notesDb[index].title = _extractTitle(newContent) ?? 'Nota sin título';
        });
      }
    }
  }

  void _addNewNote() {
    setState(() {
      final newId = 'note-${Random().nextInt(99999)}'; // ID simple aleatorio
      final newNote = Note(id: newId, title: 'Nueva Nota');
      _notesDb.insert(0, newNote); // Añade al principio de la lista "global"
      _selectNote(newNote); // Selecciona la nueva nota
    });
  }

  void _deleteSelectedNote() async {
    if (_selectedNote == null) return; // No hacer nada si no hay selección

    final noteToDelete = _selectedNote!; // Guarda referencia antes de setState asíncrono

    // Mostrar diálogo de confirmación
    bool confirmDelete = await showMacosAlertDialog<bool>(
          context: context,
          builder: (_) => MacosAlertDialog(
            appIcon: const MacosIcon(MacosIcons.trash, size: 56),
            title: const Text('Eliminar Nota'),
            message: Text('¿Estás seguro de que deseas eliminar la nota "${noteToDelete.title}"? Esta acción no se puede deshacer.'),
            primaryButton: PushButton(
              buttonSize: ButtonSize.large,
              child: const Text('Eliminar'),
              onPressed: () => Navigator.pop(context, true), // Devuelve true al confirmar
            ),
            secondaryButton: PushButton(
              buttonSize: ButtonSize.large,
              isSecondary: true,
              child: const Text('Cancelar'),
              onPressed: () => Navigator.pop(context, false), // Devuelve false al cancelar
            ),
          ),
        ) ?? false; // Si cierra sin pulsar botón, devuelve false

    if (confirmDelete) {
      setState(() {
        _notesDb.removeWhere((n) => n.id == noteToDelete.id); // Elimina de la lista "global"
        // Decide qué seleccionar después
        if (_notesDb.isNotEmpty) {
          // Selecciona la primera nota si quedan
          _selectNote(_notesDb.first);
        } else {
          // No quedan notas, deselecciona
          _selectedNote = null;
          _contentController.clear();
        }
      });
    }
  }

  // --- Construcción de la UI ---
  @override
  Widget build(BuildContext context) {
    return MacosWindow(
      // Barra lateral con la lista de notas
      sidebar: Sidebar(
        minWidth: 180,
        startWidth: 220, // Ancho inicial
        isResizable: true,
        builder: (context, scrollController) {
          // ListView con MacosListTile para cada nota
          return ListView.builder(
            controller: scrollController,
            itemCount: _notesDb.length,
            itemBuilder: (context, index) {
              final note = _notesDb[index];
              final isSelected = _selectedNote?.id == note.id;
              return MacosListTile(
                leading: MacosIcon(isSelected ? MacosIcons.notes_solid : MacosIcons.notes),
                title: Text(note.title, maxLines: 1, overflow: TextOverflow.ellipsis),
                subtitle: Text(
                  note.content.split('\n').first, // Muestra primera línea como subtítulo
                  maxLines: 1, overflow: TextOverflow.ellipsis,
                  style: MacosTheme.of(context).typography.footnote,
                ),
                onClick: () => _selectNote(note), // Selecciona al hacer clic
                backgroundColor: isSelected ? MacosTheme.of(context).primaryColor.withOpacity(0.2) : null,
              );
            },
          );
        },
      ),
      // Contenido principal dentro de MacosScaffold
      child: MacosScaffold(
        // Barra de herramientas con acciones
        toolBar: ToolBar(
          // Muestra el título de la nota seleccionada o un título genérico
          title: Text(_selectedNote?.title ?? 'MacNotes'),
          actions: [
            ToolBarIconButton(
              label: 'Nueva Nota',
              icon: const MacosIcon(MacosIcons.add),
              onPressed: _addNewNote, // Acción de añadir
              showLabel: false,
              tooltipMessage: 'Crear una nueva nota',
            ),
            ToolBarIconButton(
              label: 'Eliminar Nota',
              icon: const MacosIcon(MacosIcons.trash),
              // Deshabilita si no hay nota seleccionada
              onPressed: _selectedNote != null ? _deleteSelectedNote : null,
              showLabel: false,
              tooltipMessage: _selectedNote != null ? 'Eliminar nota seleccionada' : 'Selecciona una nota para eliminar',
            ),
            const ToolBarSpacer(), // Empuja a la derecha
            ToolBarIconButton( // Botón estándar para mostrar/ocultar sidebar
              label: 'Toggle Sidebar',
              icon: const MacosIcon(MacosIcons.sidebar_left),
              onPressed: () => MacosWindowScope.of(context).toggleSidebar(),
              showLabel: false,
            ),
          ],
        ),
        // Área de contenido (el editor de texto)
        children: [
          ContentArea(
            builder: (context, scrollController) {
              // Si no hay nota seleccionada, muestra un mensaje
              if (_selectedNote == null) {
                return const Center(
                  child: Text('Selecciona una nota de la lista o crea una nueva.'),
                );
              }
              // Si hay nota, muestra el editor MacosTextField multilínea
              return Padding(
                // Padding interno para el área de texto
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
                child: MacosTextField(
                  controller: _contentController,
                  maxLines: null, // Permite crecimiento vertical infinito
                  placeholder: 'Empieza a escribir...',
                  // Usamos el estilo base del cuerpo
                  style: MacosTheme.of(context).typography.body,
                  // Quitamos la decoración para que parezca una hoja en blanco
                  decoration: const BoxDecoration(),
                  scrollPadding: EdgeInsets.zero, // Ajuste de padding de scroll
                  // Actualiza el contenido de la nota mientras el usuario escribe
                  onChanged: _updateSelectedNoteContent,
                  // ¡Importante! Asigna el scrollController del ContentArea
                  // para que el scroll funcione correctamente con el TextField
                  scrollController: scrollController,
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
```

**¡Hecho!** Este código crea la estructura completa: `MacosApp` > `MacosWindow` > `Sidebar` (con `ListView`/`MacosListTile` para notas) + `MacosScaffold` > `ToolBar` (con acciones) + `ContentArea` (con `MacosTextField` para editar). Incluye la lógica básica de estado para seleccionar, añadir, eliminar (con `MacosAlertDialog`) y editar notas. ¡Asegúrate de actualizar `main.dart` para usar `MainLayout`!

**Paso 2, 3 y 4 (Integrados en Paso 1):** Ya hemos implementado la `ToolBar`, las vistas de Lista/Detalle, y el `MacosAlertDialog` dentro de la lógica de `MainLayout`.

**Paso 5 (Tema):** El tema básico (color primario naranja) ya se aplicó en `main.dart` al inicio.

**Resumen del Ejemplo:**

Hemos construido una aplicación de notas funcional que demuestra la integración de los componentes estructurales (`MacosWindow`, `MacosScaffold`, `Sidebar`, `ToolBar`, `ContentArea`) con widgets de contenido y acción (`MacosListTile`, `MacosTextField`, `ToolBarIconButton`, `MacosAlertDialog`). Aunque la gestión del estado es simplista, ilustra cómo las diferentes partes de `macos_ui` colaboran para crear una interfaz de usuario que se siente nativa en macOS.

Puedes ejecutar esta aplicación y ver cómo la barra lateral muestra la lista, la barra de herramientas ofrece acciones y el área de contenido permite editar la nota seleccionada.

## 6. Consideraciones Avanzadas y Buenas Prácticas (macOS)

Haber construido nuestra aplicación 'MacNotes' nos da una base sólida. Sin embargo, para crear aplicaciones macOS con Flutter que sean verdaderamente robustas, eficientes, accesibles y listas para el mundo real, necesitamos ir un paso más allá y considerar aspectos avanzados específicos de la plataforma y del desarrollo de software de calidad.

### 6.1 Diseño Adaptativo en macOS

Las ventanas en macOS son fluidas y redimensionables. Una aplicación profesional debe adaptarse elegantemente a cualquier tamaño, optimizando la presentación del contenido.

- **`Sidebar` Flexible:** Aprovecha las propiedades `isResizable`, `minWidth`, `startWidth` y `maxWidth` de la `Sidebar` para permitir que el usuario ajuste el espacio según sus necesidades. Considera si en anchos muy pequeños deberías simplificar la información mostrada en la `Sidebar`.
- **Layouts Fluidos en `ContentArea`:** Utiliza widgets de layout flexibles de Flutter (`Expanded`, `Flexible`, `Wrap`, `GridView`, `LayoutBuilder`) dentro de tu `ContentArea` para que el contenido principal se reorganice de forma inteligente al redimensionar la ventana. Evita anchos y altos fijos siempre que sea posible.
- **`LayoutBuilder` y `MediaQuery`:** Son cruciales para implementar cambios de diseño más drásticos. Usa `MediaQuery.of(context).size` para obtener las dimensiones globales de la ventana y definir puntos de corte (breakpoints) lógicos. `LayoutBuilder` te permite adaptar partes específicas de la UI según el espacio disponible para *esa parte*. Por ejemplo, podrías cambiar de una vista de lista+detalle a una vista de solo lista en ventanas más estrechas.
- **Adaptabilidad de `ToolBar`:** macOS maneja el desbordamiento de la `ToolBar` nativa si los ítems no caben. Aunque `macos_ui` intenta emular esto, sé consciente del espacio y prioriza las acciones más importantes para que permanezcan visibles. Considera usar `ToolBarPulldownButton` para agrupar acciones relacionadas si la barra se llena.

### 6.2 Integración con Gestión de Estado Robusta

El estado local (`setState`) y variables globales simuladas de nuestro ejemplo 'MacNotes' **no son escalables**. Una arquitectura de estado sólida es indispensable para aplicaciones mantenibles y complejas.

- **Adopta un Gestor:** Integra una solución probada como **Riverpod** (muy recomendado por su enfoque moderno y seguro), Provider, BLoC/Cubit, o GetX. Funcionan perfectamente con `macos_ui`.
- **Separa Responsabilidades:** Tu gestor de estado debe manejar los datos de la aplicación (la lista real de notas, la nota seleccionada, preferencias de usuario) y la lógica de negocio (guardar, cargar, filtrar notas). Tus widgets `macos_ui` deben ser "presentadores" que leen el estado y notifican al gestor sobre las interacciones del usuario.
- **Reconstrucciones Mínimas:** La clave del rendimiento. Usa las capacidades de tu gestor de estado (`Consumer`, `ref.watch`, `BlocBuilder`, `select`) para reconstruir únicamente los widgets que *necesitan* actualizarse cuando una pieza específica del estado cambia.
- **Estado Global (Tema, Navegación):** El `ThemeMode`, el `primaryColor` (si es personalizable por el usuario), y el estado de navegación principal (qué sección o nota está activa) deben ser gestionados globalmente para que los cambios se reflejen consistentemente en toda la aplicación.

### 6.3 Optimización del Rendimiento en macOS

Flutter compila a código nativo en macOS, ofreciendo un excelente rendimiento por defecto, pero siempre hay optimizaciones posibles.

- **Principios Flutter:** Aplica las optimizaciones generales: usa `const` donde sea posible, minimiza las reconstrucciones de widgets, usa `ListView.builder` para listas, y maneja operaciones bloqueantes de forma asíncrona (`async`/`await`, `compute`).
- **Efectos Visuales (Vibrancy):** Los efectos de translucidez (`NSVisualEffectView`) que `macos_ui` aplica a `Sidebar` y `ToolBar` tienen un costo de renderizado. Aunque suelen ser eficientes en hardware moderno, si experimentas lentitud (especialmente al hacer scroll o animar sobre estas áreas), usa **Flutter DevTools** para perfilar y confirmar si son un cuello de botella.
- **Interoperabilidad Nativa (FFI/Platform Channels):** Si interactúas con código Swift/Objective-C, asegúrate de que la comunicación sea eficiente y no transfiera grandes cantidades de datos innecesariamente en cada frame.
- **Modo Profile/Release:** **Nunca** bases tus conclusiones de rendimiento en el modo `debug`. Usa `flutter run --profile` para analizar con DevTools y `flutter build macos` para la versión final optimizada.
- **Flutter DevTools:** Son tu herramienta esencial. Aprende a usar el "Performance View" (para FPS y jank), "CPU Profiler" (para identificar funciones lentas), "Memory View" (para fugas) y "Widget Rebuilds" (para optimizar `build`).

### 6.4 Accesibilidad (A11y) en macOS

Crear aplicaciones accesibles es fundamental y macOS ofrece un soporte robusto a través de tecnologías como VoiceOver.

- **Semántica Clara:** Usa `semanticLabel` en `Icon`, `MacosIconButton`, `ToolBarIconButton`, etc., para describir elementos no textuales. Envuelve widgets personalizados complejos con `Semantics` para darles un rol y descripción adecuados.
- **Navegación por Teclado:** macOS depende fuertemente del teclado. Prueba tu aplicación usando Tab, Shift+Tab, flechas, Espacio, Enter. ¿Puedes alcanzar y operar todos los controles? ¿Es lógico el orden del foco? `macos_ui` se esfuerza por seguir las convenciones, pero siempre verifica. Usa `FocusNode` para control manual si es necesario.
- **VoiceOver:** Activa VoiceOver (Cmd + F5) y navega tu aplicación. ¿Lee los elementos correctamente? ¿Son las etiquetas descriptivas? ¿Se anuncian los cambios de estado (ej: checkbox marcado)?
- **Contraste y Tamaño:** Asegura un buen contraste de color, especialmente si personalizas el tema. Intenta respetar los ajustes de tamaño de fuente y contraste del sistema operativo. `MacosTheme.of(context).typography` te ayuda con los tamaños relativos estándar.
- **Tooltip:** Proporciona `tooltipMessage` en los botones de la `ToolBar` y otros controles donde una ayuda contextual breve sea útil. VoiceOver a menudo lee estos mensajes.

### 6.5 Integración con la Barra de Menú Principal

La barra de menú global es una parte integral de la experiencia macOS. Flutter permite definir menús personalizados para ella.

- **`PlatformMenuBar`:** Este widget de Flutter te permite construir la estructura de menús (Archivo, Editar, Ver, Ventana, Ayuda, etc.) que aparecerá en la barra de menú global cuando tu aplicación esté activa.
- **`PlatformMenu` y `PlatformMenuItem`:** Defines cada menú principal (`PlatformMenu`) y sus elementos (`PlatformMenuItem`). Cada `PlatformMenuItem` puede tener un `label`, un `shortcut` (atajo de teclado) y un callback `onSelected` para ejecutar la acción correspondiente. Puedes agrupar ítems con `PlatformMenuItemGroup`.
- **Uso:** Envuelve tu `MacosApp` (o a veces el `MacosWindow`/`MacosScaffold` principal) con el widget `PlatformMenuBar` y define la lista de `menus`.

Dart

```
// Ejemplo conceptual de PlatformMenuBar envolviendo MacosApp
// (Colocarías esto en tu main.dart, alrededor de MacosApp)
PlatformMenuBar(
  menus: <PlatformMenu>[
    // --- Menú 'App' (Nombre de tu App) ---
    // macOS lo añade automáticamente, pero puedes definir 'Acerca de', 'Preferencias', 'Salir'
    PlatformMenu(
      label: 'MacNotes', // El nombre suele ser gestionado por el sistema
      menus: <PlatformMenuItem>[
        const PlatformMenuItem(label: 'Acerca de MacNotes', role: PlatformMenuItemRole.about), // Rol estándar
        const PlatformMenuItemGroup(members: [ // Separador implícito
          PlatformMenuItem(label: 'Preferencias...', onSelected: (){ /* Abrir prefs */ }, shortcut: SingleActivator(LogicalKeyboardKey.comma, meta: true)), // Cmd+,
        ]),
        const PlatformMenuItemGroup(members: [
          PlatformMenuItem(label: 'Salir de MacNotes', role: PlatformMenuItemRole.quit), // Rol estándar
        ]),
      ],
    ),
    // --- Menú Archivo ---
    PlatformMenu(
      label: 'Archivo',
      menus: <PlatformMenuItem>[
        PlatformMenuItem(label: 'Nueva Nota', onSelected: (){ /* Lógica nueva nota */ }, shortcut: SingleActivator(LogicalKeyboardKey.keyN, meta: true)), // Cmd+N
         PlatformMenuItem(label: 'Cerrar Ventana', role: PlatformMenuItemRole.closeWindow, shortcut: SingleActivator(LogicalKeyboardKey.keyW, meta: true)), // Cmd+W
      ],
    ),
     // --- Menú Editar ---
    PlatformMenu(
      label: 'Editar',
      menus: <PlatformMenuItem>[
        const PlatformMenuItem(label: 'Deshacer', role: PlatformMenuItemRole.undo), // Roles estándar para Edición
        const PlatformMenuItem(label: 'Rehacer', role: PlatformMenuItemRole.redo),
         const PlatformMenuItemGroup(members:[ // Separador implícito
            const PlatformMenuItem(label: 'Cortar', role: PlatformMenuItemRole.cut),
            const PlatformMenuItem(label: 'Copiar', role: PlatformMenuItemRole.copy),
            const PlatformMenuItem(label: 'Pegar', role: PlatformMenuItemRole.paste),
            const PlatformMenuItem(label: 'Seleccionar Todo', role: PlatformMenuItemRole.selectAll),
         ]),
      ],
    ),
    // ... Otros menús (Ver, Ventana, Ayuda) ...
  ],
  // El hijo es la aplicación misma
  child: const MacNotesApp(), // Tu widget MacosApp raíz
)
```

### 6.6 Empaquetado, Notarización y Distribución

Para que los usuarios puedan instalar tu aplicación macOS.

- **Build Release:** Usa `flutter build macos` para generar el `.app` bundle optimizado en `build/macos/Build/Products/Release/`.
- **Firma de Código (Code Signing):** **Esencial** para la distribución fuera de la Mac App Store. Necesitas un certificado "Developer ID Application" de Apple para firmar tu app. `flutter build macos` puede integrar el proceso si tienes los certificados configurados en Xcode o vía variables de entorno. La firma evita advertencias de Gatekeeper.
- **Notarización:** **Requerido por Apple** para apps distribuidas fuera de la Store. Es un escaneo de seguridad automatizado por Apple. Envías tu app firmada, Apple la revisa y, si pasa, adjunta un "ticket" que asegura a macOS que la app es segura. El proceso se puede integrar en el build de Flutter o realizarse manualmente con herramientas de línea de comandos de Xcode (`notarytool`).
- **Distribución:**
  - **Directa:** Comprime tu `.app` firmado y notarizado en un `.zip` o créa una imagen de disco `.dmg` para que los usuarios descarguen e instalen manualmente.
  - **Mac App Store:** Requiere membresía de pago en el Apple Developer Program, cumplir las directrices de la Store y enviar la app firmada a través de App Store Connect. Simplifica la instalación y las actualizaciones para los usuarios.

Abordar estas consideraciones te permitirá pasar de un prototipo funcional a una aplicación macOS de nivel profesional, lista para enfrentar a los usuarios y las exigencias del ecosistema Apple.

### 7. Preguntas y Respuestas Frecuentes (FAQ)

Aquí tienes respuestas a algunas dudas comunes al desarrollar para macOS con Flutter y `macos_ui`:

1. **¿Cuál es la diferencia entre `macos_ui` y los widgets `cupertino` de Flutter? ¿Cuándo usar cada uno?**
   - **Respuesta:** `cupertino` implementa las Guías de Interfaz Humana (HIG) de **iOS**. `macos_ui` implementa las HIG de **macOS (escritorio)**. Aunque hay similitudes visuales (ambos son de Apple), los patrones de UI, los controles específicos y las convenciones de layout son diferentes (ej: `Sidebar`/`ToolBar` en macOS vs. `CupertinoNavigationBar`/`CupertinoTabBar` en iOS). Para crear una aplicación de escritorio macOS nativa, **debes usar `macos_ui`**. Puedes usar widgets `cupertino` si `macos_ui` excepcionalmente carece de algo muy básico y visualmente similar, pero la prioridad es `macos_ui` para la estructura y controles principales.
2. **¿Cómo manejo características específicas de macOS como la Barra de Menú global o la gestión avanzada de ventanas?**
   - **Respuesta:** `macos_ui` se centra en los widgets *dentro* del contenido de la ventana. Para la **Barra de Menú global**, debes usar el widget `PlatformMenuBar` proporcionado por el propio SDK de Flutter, envolviendo tu `MacosApp` o layout principal. Para **gestión avanzada de ventanas** (múltiples ventanas, posicionamiento preciso, personalización profunda de la barra de título), generalmente necesitarás usar paquetes de la comunidad específicos para escritorio (como `desktop_window`) o interactuar con APIs nativas de macOS a través de platform channels o FFI, ya que `MacosWindow` de `macos_ui` cubre principalmente la estructura básica.
3. **¿Cuáles son las mejores prácticas para gestionar el estado de la `Sidebar` o `MacosTabView`?**
   - **Respuesta:** Al igual que con cualquier UI compleja en Flutter, evita depender únicamente de `setState` en el widget raíz. Utiliza un **gestor de estado** (Riverpod, Provider, BLoC, etc.). Almacena el `currentIndex` (índice del elemento o pestaña seleccionada) en tu proveedor/bloc/controlador de estado. El widget `SidebarItems` o `MacosTabView` leerá este índice y llamará a una función en tu gestor de estado a través del callback `onChanged` cuando el usuario seleccione un nuevo ítem/pestaña. El `ContentArea` (o la parte relevante de tu UI) escuchará los cambios en ese índice desde el gestor de estado para mostrar la vista correcta.
4. **¿Tienen los efectos visuales (vibrancy) de `macos_ui` un impacto significativo en el rendimiento?**
   - **Respuesta:** Los efectos de translucidez y vibrancy que `macos_ui` aplica automáticamente a widgets como `Sidebar` y `ToolBar` se basan en la implementación nativa de macOS (`NSVisualEffectView`), la cual está generalmente muy optimizada a nivel del sistema operativo. En hardware moderno, el impacto suele ser mínimo. Sin embargo, como con cualquier efecto gráfico, puede añadir carga a la GPU. Si observas caídas de FPS o lentitud al interactuar con áreas que usan estos efectos (especialmente durante animaciones o scrolling rápido), usa Flutter DevTools para perfilar y confirmar si es un cuello de botella real en tu caso específico. Los problemas de rendimiento en Flutter suelen originarse más a menudo en reconstrucciones ineficientes de widgets o lógica de Dart bloqueante.
5. **¿Está `macos_ui` "completo"? ¿Qué hago si necesito un control nativo de macOS que no está en el paquete?**
   - **Respuesta:**`macos_ui` es un paquete **maduro y robusto** que cubre una gran parte de los controles y patrones de UI más comunes y necesarios para construir aplicaciones macOS completas y nativas. Está en desarrollo activo por la comunidad. Sin embargo, el framework nativo AppKit de macOS es inmenso y contiene muchos controles especializados. Si necesitas un control específico no disponible:
     1. **Revisa GitHub:** Busca issues o discusiones en el repositorio de `macos_ui` para ver si está planeado o si hay soluciones alternativas.
     2. **Composición:** ¿Puedes construir una funcionalidad similar combinando widgets existentes de `macos_ui` y Flutter?
     3. **Paquetes de Terceros:** Busca en pub.dev si alguien más ha creado un paquete para ese control específico.
     4. **Widget Personalizado:** Implementa tu propio widget Flutter siguiendo las HIG de macOS.
     5. **Puente Nativo (Avanzado):** Como último recurso, usa platform channels o FFI para interactuar con el control nativo de AppKit directamente desde Swift/Objective-C. Esto añade una complejidad considerable.

### 8. Puntos Relevantes del Artículo

Aquí tienes un resumen de los 5 puntos clave de nuestro recorrido por `macos_ui`:

1. **Fidelidad a macOS:** Para triunfar en macOS, las apps Flutter deben respetar las HIG de Apple. `macos_ui` es la herramienta esencial que nos permite lograr esa apariencia, comportamiento y sensación nativa.
2. **Estructura Clave de macOS:** La arquitectura visual típica se logra combinando `MacosApp`, `MacosTheme`, `MacosWindow`, `MacosScaffold`, `Sidebar` y `ToolBar`, creando una base familiar para el usuario.
3. **Widgets Nativos Específicos:** Es crucial utilizar los widgets proporcionados por `macos_ui` (como `PushButton`, `MacosTextField`, `MacosListTile`, `MacosIcons`, `MacosAlertDialog`, `MacosSwitch`, etc.) en lugar de sus contrapartes de Material u otros paquetes para mantener la coherencia visual y funcional.
4. **Gestión de Estado Profesional:** Más allá de `setState`, es indispensable adoptar soluciones como Riverpod, Provider o BLoC para manejar el estado de la aplicación (navegación, datos, tema) de forma escalable, mantenible y performante.
5. **Integración con el Ecosistema Apple:** El desarrollo para macOS no termina en la UI. Considerar la Barra de Menú global (`PlatformMenuBar`), la accesibilidad (VoiceOver), y los procesos de firma de código, notarización y distribución (`.app`, Mac App Store) es vital para entregar una aplicación completa y profesional.

### 9. Conclusión

A lo largo de este artículo, hemos explorado el emocionante cruce entre la potencia multiplataforma de Flutter y las exigentes expectativas de diseño del ecosistema macOS. Hemos visto que, si bien Flutter ofrece una base sólida para el desarrollo de escritorio, alcanzar una verdadera **sensación nativa** en macOS requiere un enfoque deliberado y el uso de herramientas específicas.

El paquete `macos_ui` emerge como esa herramienta crucial, actuando como un puente indispensable que nos permite implementar los patrones visuales, los controles y las convenciones de interacción dictadas por las Human Interface Guidelines (HIG) de Apple. Desde la estructura fundamental proporcionada por `MacosApp`, `MacosWindow`, `MacosScaffold`, `Sidebar` y `ToolBar`, hasta la rica variedad de widgets como `PushButton`, `MacosTextField`, `MacosListTile` y los sutiles efectos de *vibrancy*, `macos_ui` nos equipa para construir interfaces que no solo funcionan en macOS, sino que *pertenecen* a macOS.

Nuestro recorrido incluyó la configuración del entorno, la comprensión de los conceptos esenciales, la exploración detallada de widgets clave, la construcción paso a paso de una aplicación de ejemplo ("MacNotes") y la discusión de consideraciones avanzadas vitales para aplicaciones de producción, como el diseño adaptativo, la gestión de estado, el rendimiento, la accesibilidad y la crucial integración con la barra de menú y los procesos de distribución de Apple.

Crear aplicaciones macOS excepcionales con Flutter es absolutamente posible. Requiere atención al detalle, un buen entendimiento de las HIG de Apple y el uso inteligente de paquetes como `macos_ui`. Esperamos que esta guía te haya proporcionado el conocimiento y la inspiración para embarcarte en tus propios proyectos de escritorio macOS con Flutter, creando experiencias de usuario pulidas y auténticas.

### 10. Recursos Adicionales

Para continuar tu aprendizaje y consultar referencias:

- **Paquete `macos_ui` en pub.dev (Documentación y API):** La fuente principal para la API del paquete, ejemplos y la última versión.
  - <https://pub.dev/packages/macos_ui>
- **Repositorio GitHub de `macos_ui`:** Ideal para ver el código fuente, reportar bugs, proponer características y participar en discusiones.
  - <https://github.com/GroovinChip/macos_ui>
- **Apple Human Interface Guidelines (HIG):** La "biblia" del diseño para plataformas Apple. Esencial para entender el *porqué* detrás de los controles y patrones de macOS.
  - <https://developer.apple.com/design/human-interface-guidelines/macos/overview/themes/>1
- **Documentación Oficial de Flutter para macOS:** Guías sobre configuración, compilación, firma de código, notarización y más.
  - [https://docs.flutter.dev/desktop#macos](https://www.google.com/search?q=https://docs.flutter.dev/desktop%23macos)

### 11. Sugerencias de Siguientes Pasos

Una vez que domines los fundamentos cubiertos aquí, considera explorar estas áreas para convertirte en un experto en Flutter para macOS:

1. **Integración Profunda con el Escritorio macOS:** Investiga cómo usar `PlatformMenuBar` a fondo para crear menús complejos, cómo interactuar con el Dock, enviar notificaciones nativas (usando paquetes o platform channels), y explorar opciones avanzadas de gestión de ventanas (múltiples ventanas, modos pantalla completa, etc.).
2. **Interoperabilidad Nativa (Swift/Objective-C):** Aprende a usar Platform Channels o FFI (Foreign Function Interface) con el paquete `ffi`. Esto te permitirá llamar a cualquier API nativa de AppKit o de otros frameworks de macOS que no esté directamente expuesta por Flutter o paquetes existentes, abriendo posibilidades ilimitadas.
3. **Proceso Completo de Publicación en la Mac App Store:** Sumérgete en los detalles de preparar tu aplicación para la tienda: configurar identificadores en App Store Connect, implementar compras dentro de la app (si aplica), adherirte estrictamente a las directrices de revisión de Apple, y dominar el proceso de firma, notarización y subida a través de Xcode o herramientas de línea de comando.

### 12. Invitación a la Acción

¡El conocimiento se consolida con la práctica! Te animo a que:

- **Experimentes sin Miedo:** Crea proyectos pequeños para probar cada widget de `macos_ui` que te interese. Juega con `MacosThemeData`, prueba diferentes layouts con `MacosScaffold` y `ResizablePane`.
- **Expande "MacNotes":** Toma la aplicación de ejemplo que construimos y llévala más lejos. Implementa la persistencia de datos (con `shared_preferences`, `sqflite`, `isar`, etc.), añade formato de texto, implementa la búsqueda real, o refactorízala usando Riverpod o tu gestor de estado preferido.
- **Construye Tu Propia Visión:** ¿Qué herramienta o aplicación te gustaría tener en tu Mac? ¡Intenta construirla con Flutter y `macos_ui`! Es la mejor manera de enfrentar desafíos reales y solidificar tu aprendizaje.

Flutter, combinado con el excelente trabajo de la comunidad en `macos_ui`, te ofrece una vía poderosa y eficiente para crear aplicaciones de escritorio macOS hermosas y de alta calidad. **¡El lienzo está listo, ahora te toca crear!**
