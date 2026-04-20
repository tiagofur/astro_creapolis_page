---
title: "¿Flutter en peligro? El auge imparable de Kotlin Multiplataforma"
description: "En la era actual del desarrollo de software, la capacidad de llegar a un público amplio en múltiples plataformas es más crucial que nunca. Ya no basta con crear aplicaciones que…"
pubDate: "2024-11-28"
author: "tiagofur"
tags: ["mobile", "código compartido", "comparativa frameworks", "compose multiplatform", "dart", "desarrollo", "flutter", "jetpack compose", "kmm", "kotlin", "kotlin multiplatform", "tendencias tecnológicas"]
categories: ["Flutter - Basico"]
slug: "flutter-en-peligro-el-auge-imparable-de-kotlin-multiplataforma"
originalUrl: "https://creapolis.dev/flutter-en-peligro-el-auge-imparable-de-kotlin-multiplataforma/"
draft: false
---

## Introducción: El auge del desarrollo multiplataforma

En la era actual del desarrollo de software, la capacidad de llegar a un público amplio en múltiples plataformas es más crucial que nunca. Ya no basta con crear aplicaciones que funcionen solo en un sistema operativo; los usuarios esperan experiencias fluidas y consistentes en sus dispositivos móviles, web y de escritorio. Es aquí donde el **desarrollo multiplataforma** ha cobrado un protagonismo indiscutible, ofreciendo a los desarrolladores la posibilidad de escribir código una vez y ejecutarlo en diferentes sistemas, optimizando tiempo, recursos y costos.

Dentro de este panorama, **Kotlin Multiplataforma (KMP)** y **Flutter** han emergido como dos de las soluciones más populares y robustas. Mientras que Flutter, respaldado por Google, ha ganado terreno rápidamente con su enfoque en la creación de interfaces de usuario (UI) atractivas y con un rendimiento cercano al nativo, Kotlin Multiplataforma, impulsado por JetBrains, se centra en compartir la lógica de negocio y permite una integración más profunda con las plataformas nativas.

Este artículo se adentra en una **comparación exhaustiva entre Kotlin Multiplataforma y Flutter**, analizando sus fortalezas, debilidades y casos de uso ideales. Exploraremos en detalle sus arquitecturas, rendimiento, curvas de aprendizaje y comunidades, para que los desarrolladores avanzados como tú puedan tomar decisiones informadas sobre qué tecnología se adapta mejor a sus necesidades. Además, abordaremos la capacidad de Kotlin Multiplataforma para interactuar con código nativo, abriendo un abanico de posibilidades para proyectos complejos que requieren funcionalidades específicas de cada plataforma.

Prepárate para sumergirte en el fascinante mundo del desarrollo multiplataforma y descubrir cómo Kotlin Multiplataforma y Flutter están dando forma al futuro de las aplicaciones.

## Kotlin Multiplataforma: Compartiendo lógica, no UI

Kotlin Multiplataforma (KMP) es un SDK desarrollado por JetBrains que permite a los desarrolladores utilizar Kotlin para escribir código que se puede compartir entre diferentes plataformas, incluyendo Android, iOS, web, escritorio y backend. A diferencia de otros enfoques multiplataforma que intentan abstraer completamente las diferencias entre sistemas operativos, KMP adopta una estrategia más pragmática: **se centra en compartir la lógica de negocio**, mientras que permite implementar la interfaz de usuario (UI) y acceder a las APIs específicas de cada plataforma de forma nativa.

En esencia, KMP te permite crear un núcleo de código común en Kotlin que contiene la lógica principal de tu aplicación, como la gestión de datos, la lógica de negocio, las conexiones de red y los algoritmos. Este código se compila a un formato compatible con cada plataforma objetivo: bytecode JVM para Android, código nativo para iOS y macOS, y JavaScript para la web.

### ¿Cómo funciona KMP?

La magia de KMP reside en su capacidad para **interactuar con el código nativo de cada plataforma**. Esto se logra mediante el uso de:

- **Expect/Actual:** Define declaraciones `expect` en el código común para especificar APIs o funcionalidades que deben ser proporcionadas por cada plataforma. Luego, implementa estas declaraciones con código `actual` específico de cada plataforma (por ejemplo, usando Swift para iOS o Kotlin para Android).
- **Kotlin/Native:** Permite compilar código Kotlin a código nativo que se puede ejecutar sin una máquina virtual, lo que lo hace ideal para plataformas como iOS, macOS, Windows y Linux.
- **Bibliotecas multiplataforma:** KMP ofrece un conjunto de bibliotecas que se pueden utilizar en todas las plataformas, como `kotlinx.coroutines` para la gestión de concurrencia y `kotlinx.serialization` para la serialización de datos.

### Ventajas de Kotlin Multiplataforma

- **Rendimiento cercano al nativo:** Al compilar a código nativo en plataformas como iOS, KMP ofrece un rendimiento comparable al de las aplicaciones nativas desarrolladas en Swift u Objective-C.
- **Interoperabilidad con código nativo:** Puedes integrar fácilmente código KMP con código nativo existente, lo que te permite reutilizar bibliotecas y frameworks específicos de cada plataforma.
- **Base de código compartida:** Reduce la duplicación de código y el esfuerzo de desarrollo, ya que la lógica de negocio se escribe una sola vez y se comparte entre todas las plataformas.
- **Curva de aprendizaje suave:** Si ya conoces Kotlin, te resultará fácil aprender KMP. No necesitas aprender nuevos lenguajes de programación para desarrollar aplicaciones multiplataforma.
- **Flexibilidad:** KMP te da la libertad de elegir cómo implementar la UI de tu aplicación. Puedes usar frameworks nativos como SwiftUI en iOS o Jetpack Compose en Android, o incluso optar por soluciones multiplataforma como Compose Multiplatform.

### Casos de uso ideales para Kotlin Multiplataforma

KMP es especialmente adecuado para aplicaciones que:

- Tienen una lógica de negocio compleja que se puede compartir entre plataformas.
- Requieren un alto rendimiento y una integración fluida con las APIs nativas.
- Necesitan acceder a funcionalidades específicas de cada plataforma, como sensores, GPS o notificaciones.
- Buscan reducir el tiempo y los costos de desarrollo al compartir código.

Ejemplos concretos de uso de KMP incluyen:

- **Aplicaciones móviles con lógica de negocio compleja:** Compartir la lógica de autenticación, gestión de datos o procesamiento de pagos entre iOS y Android.
- **Bibliotecas multiplataforma:** Desarrollar bibliotecas que se puedan utilizar en diferentes plataformas, como bibliotecas de análisis de datos o de redes.
- **Aplicaciones de escritorio:** Crear aplicaciones de escritorio para Windows, macOS y Linux con una base de código compartida.

En resumen, Kotlin Multiplataforma ofrece una solución robusta y flexible para el desarrollo multiplataforma, permitiendo a los desarrolladores compartir código y aprovechar al máximo las capacidades de cada plataforma.

## Flutter: La apuesta por la UI declarativa y el rendimiento nativo

Flutter, el framework de interfaz de usuario de código abierto creado por Google, ha revolucionado el desarrollo multiplataforma con su enfoque innovador y su capacidad para ofrecer experiencias de usuario atractivas y con un rendimiento excepcional. A diferencia de otros frameworks que se basan en puentes o wrappers para interactuar con las plataformas nativas, Flutter utiliza un motor de renderizado propio que dibuja directamente los widgets en la pantalla, lo que se traduce en un rendimiento cercano al nativo y una consistencia visual en todas las plataformas.

En el corazón de Flutter se encuentra el concepto de **widgets**, que son los bloques de construcción fundamentales de la interfaz de usuario. Los widgets son inmutables y describen la configuración de la UI en un momento dado. Flutter utiliza un **enfoque declarativo** para la construcción de la interfaz de usuario, lo que significa que los desarrolladores describen cómo debería verse la UI en función del estado actual de la aplicación, y Flutter se encarga de actualizar la UI de forma eficiente cuando el estado cambia.

### Arquitectura de Flutter

La arquitectura de Flutter se compone de tres capas principales:

1. **Framework Dart:** La capa superior escrita en Dart, que proporciona un conjunto rico de widgets preconstruidos, API para la gestión de estado, animaciones, gestos y más.
2. **Motor C++:** El núcleo de Flutter, escrito en C++, que se encarga del renderizado, el diseño y la gestión de eventos. Incluye Skia, un motor de gráficos 2D de alto rendimiento, que permite a Flutter dibujar widgets directamente en la pantalla.
3. **Plataforma embedder:** Una capa específica de la plataforma que proporciona acceso a los servicios del sistema operativo, como los sensores, la cámara y el almacenamiento.

### Beneficios de Flutter

- **Desarrollo rápido:** La recarga en caliente (hot reload) permite a los desarrolladores ver los cambios en el código de forma instantánea, lo que acelera significativamente el proceso de desarrollo y la iteración.
- **UI consistente en todas las plataformas:** Flutter dibuja sus propios widgets, lo que garantiza una apariencia y un comportamiento uniformes en Android, iOS, web y escritorio, sin depender de los controles nativos de cada plataforma.
- **Rendimiento cercano al nativo:** Gracias a su motor de renderizado propio, Flutter ofrece un rendimiento fluido y una experiencia de usuario comparable a la de las aplicaciones nativas.
- **Gran comunidad y ecosistema:** Flutter cuenta con una comunidad activa y en constante crecimiento, que proporciona una amplia gama de recursos, bibliotecas y paquetes de terceros.
- **Fácil de aprender:** Dart es un lenguaje de programación moderno y fácil de aprender, con una sintaxis clara y concisa.

### Ejemplos de aplicaciones exitosas construidas con Flutter

Flutter ha sido adoptado por numerosas empresas y desarrolladores para crear aplicaciones de alta calidad, entre las que destacan:

- **Google Ads:** La aplicación oficial de Google Ads, que permite a los usuarios gestionar sus campañas publicitarias.
- **eBay Motors:** La aplicación de eBay para la compra y venta de vehículos.
- **BMW:** La aplicación My BMW, que permite a los conductores controlar y gestionar su vehículo.
- **Alibaba:** La aplicación Xianyu, una plataforma de comercio electrónico de segunda mano.

Flutter se ha convertido en una opción popular para el desarrollo multiplataforma, ofreciendo una combinación única de rendimiento, velocidad de desarrollo y consistencia visual en todas las plataformas.

## Comparativa Kotlin Multiplataforma vs Flutter: Un análisis crítico

Tanto Kotlin Multiplataforma como Flutter se presentan como soluciones atractivas para el desarrollo multiplataforma, pero cada uno tiene sus propias fortalezas y debilidades. En esta sección, realizaremos una comparativa en profundidad para ayudarte a decidir cuál es la mejor opción para tu proyecto.

### Rendimiento y eficiencia

- **Flutter:** Su motor de renderizado propio y la compilación a código nativo le otorgan a Flutter un excelente rendimiento en todas las plataformas. Las animaciones son fluidas y la experiencia de usuario es generalmente muy buena.
- **Kotlin Multiplataforma:** Al compilar a código nativo en iOS, KMP también ofrece un rendimiento cercano al nativo. Sin embargo, en la web, el rendimiento puede variar dependiendo del tamaño y la complejidad de la aplicación.

**Conclusión:** En general, Flutter tiene una ligera ventaja en términos de rendimiento, especialmente en la web. Sin embargo, KMP también ofrece un rendimiento muy competitivo, especialmente en plataformas móviles.

### Curva de aprendizaje

- **Flutter:** Requiere aprender Dart, un lenguaje con una sintaxis similar a Java o JavaScript, y familiarizarse con el enfoque declarativo para la construcción de la UI.
- **Kotlin Multiplataforma:** Si ya conoces Kotlin, la curva de aprendizaje es más suave. Sin embargo, debes aprender a utilizar las herramientas y bibliotecas específicas de KMP, y comprender cómo interactuar con el código nativo de cada plataforma.

**Conclusión:** Para desarrolladores con experiencia en Kotlin, KMP puede ser más fácil de aprender. Sin embargo, Dart es un lenguaje relativamente fácil de aprender, y Flutter cuenta con una excelente documentación y una gran comunidad.

### Madurez de la tecnología y comunidad

- **Flutter:** Es un framework más maduro, con una comunidad más grande y un ecosistema más desarrollado. Cuenta con una gran cantidad de bibliotecas, herramientas y recursos disponibles.
- **Kotlin Multiplataforma:** Es una tecnología más joven, pero está en constante evolución y cuenta con el respaldo de JetBrains. Su comunidad está creciendo rápidamente y cada vez hay más recursos disponibles.

**Conclusión:** Flutter tiene una clara ventaja en cuanto a madurez y comunidad. Sin embargo, KMP está ganando terreno rápidamente y se espera que siga creciendo en los próximos años.

### Integración con herramientas de desarrollo

- **Flutter:** Cuenta con un excelente soporte en Android Studio e IntelliJ IDEA, con herramientas de desarrollo y depuración integradas.
- **Kotlin Multiplataforma:** También tiene buen soporte en IntelliJ IDEA, pero la integración con otras herramientas de desarrollo puede ser más limitada.

**Conclusión:** Flutter tiene una mejor integración con las herramientas de desarrollo, especialmente en Android Studio.

### Flexibilidad y personalización

- **Flutter:** Ofrece un alto grado de personalización, pero su enfoque "todo en uno" puede ser limitante en algunos casos. Por ejemplo, puede ser más difícil integrar componentes nativos específicos de cada plataforma.
- **Kotlin Multiplataforma:** Proporciona mayor flexibilidad para integrar código nativo y acceder a las APIs específicas de cada plataforma. Esto permite a los desarrolladores crear aplicaciones que se sientan verdaderamente nativas en cada plataforma.

**Conclusión:** KMP ofrece mayor flexibilidad para la integración con código nativo y la personalización de la UI. Flutter, por otro lado, prioriza la consistencia visual y el desarrollo rápido.

En resumen, la elección entre Kotlin Multiplataforma y Flutter depende de las necesidades específicas de tu proyecto. Si buscas un rendimiento excepcional, una gran comunidad y un desarrollo rápido, Flutter es una excelente opción. Si necesitas mayor flexibilidad para integrar código nativo y acceder a las APIs específicas de cada plataforma, KMP puede ser la mejor alternativa.

## Interoperabilidad con código nativo: La clave de Kotlin Multiplataforma

Una de las mayores ventajas de Kotlin Multiplataforma es su capacidad para interactuar con código nativo de cada plataforma. Esto permite a los desarrolladores aprovechar al máximo las funcionalidades específicas de cada sistema operativo, como APIs del sistema, bibliotecas nativas y frameworks de UI. En lugar de intentar abstraer completamente las diferencias entre plataformas, KMP ofrece un enfoque más flexible y pragmático, permitiendo a los desarrolladores combinar lo mejor de ambos mundos: la eficiencia de compartir código y la flexibilidad de acceder a funcionalidades nativas.

### ¿Cómo funciona la interoperabilidad?

KMP facilita la interoperabilidad con código nativo a través de varios mecanismos:

- **Expect/Actual:** Permite definir declaraciones `expect` en el código común para especificar APIs o funcionalidades que deben ser proporcionadas por cada plataforma. Luego, se implementan estas declaraciones con código `actual` específico de la plataforma. Por ejemplo, puedes definir una declaración `expect` para obtener la ubicación del usuario, y luego proporcionar implementaciones `actual` utilizando Core Location en iOS y los servicios de ubicación de Google en Android.
- **Kotlin/Native:** Permite compilar código Kotlin a código nativo que se puede ejecutar sin una máquina virtual. Esto facilita la interoperabilidad con lenguajes como Swift, Objective-C, C++ y Java.
- **cinterop:** Una herramienta que genera bindings de Kotlin para bibliotecas C. Esto permite utilizar bibliotecas C existentes en proyectos KMP.

### Ejemplos de integración con código nativo

Veamos algunos ejemplos concretos de cómo integrar KMP con código nativo:

**1. Integración con Swift en iOS:**

Supongamos que quieres acceder a la API de Core Location en iOS para obtener la ubicación del usuario. Puedes definir una declaración `expect` en el código común:

Kotlin

```
expect class LocationManager {
    fun getCurrentLocation(): Location?
}
```

Luego, puedes proporcionar una implementación `actual` en Swift:

Swift

```
import CoreLocation

class LocationManager: NSObject, CLLocationManagerDelegate {

    private let locationManager = CLLocationManager()1

    override init() {
        super.init()
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
    }

    func2 getCurrentLocation() -> Location? {
        // Implementación para obtener la ubicación utilizando Core Location
    }
}
```

**2. Integración con Java/Kotlin en Android:**

Si necesitas acceder a una API específica de Android, como la de sensores, puedes utilizar una implementación `actual` en Kotlin:

Kotlin

```
actual class LocationManager {
    fun getCurrentLocation(): Location? {
        // Implementación para obtener la ubicación utilizando los servicios de ubicación de Google
    }
}
```

### Ventajas de la interoperabilidad

- **Acceso a funcionalidades específicas de cada plataforma:** Permite utilizar APIs y bibliotecas nativas que no están disponibles en otras soluciones multiplataforma.
- **Mayor flexibilidad:** Los desarrolladores tienen la libertad de elegir qué partes de la aplicación implementar de forma nativa y qué partes compartir entre plataformas.
- **Mejor rendimiento:** Al utilizar código nativo para tareas específicas, se puede optimizar el rendimiento de la aplicación.
- **Reutilización de código existente:** Se puede integrar código nativo existente en proyectos KMP, lo que reduce el tiempo y el esfuerzo de desarrollo.

La interoperabilidad con código nativo es una de las características más poderosas de Kotlin Multiplataforma. Permite a los desarrolladores crear aplicaciones multiplataforma robustas y flexibles, aprovechando al máximo las capacidades de cada sistema operativo.

## ¿Kotlin Multiplataforma reemplazará a Flutter?

La pregunta del millón: ¿está Kotlin Multiplataforma destinado a destronar a Flutter como el rey del desarrollo multiplataforma? Si bien es cierto que KMP está ganando terreno rápidamente y ofrece ventajas significativas, la realidad es que **el futuro probablemente apunta a una coexistencia** donde ambas tecnologías prosperen en nichos específicos.

Analicemos las tendencias actuales y las perspectivas de futuro:

- **Flutter:** Continúa siendo una apuesta fuerte de Google, con una inversión constante en su desarrollo y una comunidad en constante crecimiento. Su enfoque en la UI declarativa, el rendimiento nativo y la consistencia visual en todas las plataformas lo convierte en una opción ideal para aplicaciones que priorizan la experiencia de usuario y el desarrollo rápido.
- **Kotlin Multiplataforma:** Respaldado por JetBrains, KMP se está posicionando como una alternativa sólida, especialmente para proyectos que requieren una integración profunda con código nativo y acceso a APIs específicas de cada plataforma. Su flexibilidad y la capacidad de compartir lógica de negocio lo hacen atractivo para aplicaciones complejas con requisitos específicos.

**La visión de Google:** Si bien Google está invirtiendo en ambas tecnologías, parece haber un enfoque en posicionar a Flutter como la solución principal para el desarrollo multiplataforma de UI, mientras que KMP se centra en compartir lógica de negocio y la interoperabilidad con código nativo. Esto sugiere que ambas tecnologías pueden coexistir y complementarse, en lugar de competir directamente.

**Opiniones de expertos:** Muchos expertos en la industria creen que KMP y Flutter no son necesariamente excluyentes. KMP puede ser una excelente opción para compartir lógica de negocio entre plataformas, mientras que Flutter se puede utilizar para construir la UI. Incluso es posible integrar KMP con Flutter, utilizando KMP para la lógica de negocio y Flutter para la UI.

**Conclusión:** Es poco probable que KMP reemplace completamente a Flutter. Ambas tecnologías tienen fortalezas y debilidades, y la elección depende de las necesidades específicas de cada proyecto. Es probable que veamos una coexistencia donde Flutter domine en el desarrollo de UI multiplataforma, mientras que KMP se consolide como una solución robusta para compartir lógica de negocio e integrar código nativo. Lo importante es que los desarrolladores tengan a su disposición herramientas poderosas para crear aplicaciones increíbles que lleguen a un público cada vez más amplio.

## Preguntas y Respuestas

**1. ¿Cuál es la principal diferencia entre Kotlin Multiplataforma y Flutter?**

Mientras que Flutter se centra en construir una UI consistente en todas las plataformas con su propio motor de renderizado, Kotlin Multiplataforma prioriza compartir la lógica de negocio y permite una integración más profunda con el código nativo de cada plataforma, incluyendo la UI.

**2. ¿Qué lenguaje de programación se utiliza en Kotlin Multiplataforma y Flutter?**

Kotlin Multiplataforma utiliza Kotlin, mientras que Flutter utiliza Dart.

**3. ¿Qué plataformas son compatibles con Kotlin Multiplataforma y Flutter?**

Ambas tecnologías soportan Android, iOS, web y escritorio.

**4. ¿Es Kotlin Multiplataforma una tecnología madura?**

Si bien es más joven que Flutter, Kotlin Multiplataforma está respaldado por JetBrains y su comunidad está creciendo rápidamente. Cada vez hay más recursos y bibliotecas disponibles.

**5. ¿Puedo usar Kotlin Multiplataforma y Flutter en el mismo proyecto?**

Sí, es posible integrar ambas tecnologías. Puedes usar Kotlin Multiplataforma para la lógica de negocio y Flutter para la UI.

## Puntos Relevantes

1. **Desarrollo multiplataforma en auge:** La necesidad de llegar a usuarios en múltiples sistemas operativos ha impulsado el desarrollo multiplataforma, con Kotlin Multiplataforma y Flutter como soluciones líderes.
2. **Kotlin Multiplataforma (KMP):** Se centra en compartir la lógica de negocio, permitiendo la implementación de UI nativa y acceso a APIs específicas de cada plataforma. Ofrece rendimiento cercano al nativo, interoperabilidad con código nativo y flexibilidad.
3. **Flutter:** Utiliza un motor de renderizado propio para ofrecer una UI consistente y un rendimiento cercano al nativo en todas las plataformas. Destaca por su desarrollo rápido, gran comunidad y facilidad de aprendizaje.
4. **Comparativa:** Flutter tiene ventajas en rendimiento (especialmente en web), madurez y comunidad. KMP ofrece mayor flexibilidad para integrar código nativo y personalizar la UI. La elección depende de las necesidades del proyecto.
5. **Interoperabilidad con código nativo:** KMP permite aprovechar funcionalidades específicas de cada plataforma a través de mecanismos como `expect/actual` y Kotlin/Native. Esto lo hace ideal para proyectos complejos que requieren acceso a APIs nativas.

## Conclusión

En el dinámico mundo del desarrollo multiplataforma, Kotlin Multiplataforma y Flutter han emergido como dos potentes contendientes, cada uno con sus propias fortalezas y enfoques únicos. Mientras que Flutter ha conquistado a muchos con su UI declarativa, rendimiento cercano al nativo y desarrollo rápido, Kotlin Multiplataforma se está consolidando como una alternativa robusta, especialmente para proyectos que requieren una integración profunda con código nativo y acceso a APIs específicas de cada plataforma.

La elección entre ambas tecnologías no es una cuestión de "mejor" o "peor", sino de encontrar la herramienta adecuada para las necesidades específicas de cada proyecto. Si buscas una experiencia de usuario consistente, un desarrollo rápido y una gran comunidad, Flutter es una excelente opción. Si necesitas mayor flexibilidad para integrar código nativo, acceder a funcionalidades específicas de cada plataforma y compartir lógica de negocio compleja, Kotlin Multiplataforma puede ser la mejor alternativa.

El futuro del desarrollo multiplataforma probablemente se caracterice por la coexistencia de ambas tecnologías, donde cada una prosperará en su nicho específico. Lo importante es que los desarrolladores tengan a su disposición herramientas poderosas para crear aplicaciones increíbles que lleguen a un público cada vez más amplio.

Te invito a explorar tanto Kotlin Multiplataforma como Flutter, experimentar con sus capacidades y descubrir cuál se adapta mejor a tu estilo de desarrollo y a los retos que enfrentas. El camino hacia el dominio del desarrollo multiplataforma está lleno de aprendizaje continuo y experimentación. ¡No te quedes atrás y aprovecha al máximo estas tecnologías innovadoras!

## Recursos adicionales

- **Documentación oficial de Kotlin Multiplataforma:** [https://kotlinlang.org/docs/multiplatform.html](https://www.google.com/url?sa=E&source=gmail&q=https://kotlinlang.org/docs/multiplatform.html)
- **Documentación oficial de Flutter:** [https://flutter.dev/docs](https://www.google.com/url?sa=E&source=gmail&q=https://flutter.dev/docs)
- **Kotlin Multiplatform by Tutorials:** [https://www.raywenderlich.com/books/kotlin-multiplatform-by-tutorials](https://www.google.com/url?sa=E&source=gmail&q=https://www.raywenderlich.com/books/kotlin-multiplatform-by-tutorials)
- **Flutter Apprentice:** [https://www.raywenderlich.com/books/flutter-apprentice](https://www.google.com/url?sa=E&source=gmail&q=https://www.raywenderlich.com/books/flutter-apprentice)

## Sugerencias de siguientes pasos

1. **Explorar Jetpack Compose Multiplataforma:** Aprende a construir interfaces de usuario declarativas que se pueden compartir entre Android, iOS, web y escritorio utilizando Kotlin.
2. **Profundizar en Kotlin/Native:** Descubre cómo interactuar con bibliotecas C y APIs nativas utilizando Kotlin/Native.
3. **Crear un proyecto de ejemplo:** Desarrolla una aplicación sencilla que comparta lógica de negocio entre Android e iOS utilizando Kotlin Multiplataforma o Flutter.

## Invitación a la acción

Te animo a que experimentes con Kotlin Multiplataforma y Flutter en tus propios proyectos. Crea aplicaciones de prueba, explora las diferentes funcionalidades y descubre cuál de estas tecnologías se adapta mejor a tus necesidades y estilo de desarrollo. ¡El mundo del desarrollo multiplataforma te espera!
