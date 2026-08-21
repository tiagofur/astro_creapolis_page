---
title: "Guía Completa de Jetpack Compose De Composables a Estado"
description: "Si llevas un tiempo en el mundo del desarrollo de software, sabes que la construcción de interfaces de usuario (UI) puede ser una de las tareas más complejas y propensas a…"
pubDate: "2025-10-15"
author: "tiagofur"
tags: []
categories: ["Mobile"]
slug: "guia-completa-de-jetpack-compose-de-composables-a-estado"
originalUrl: "https://creapolis.dev/guia-completa-de-jetpack-compose-de-composables-a-estado/"
draft: false
---

### **1. Título: Fundamentos de Jetpack Compose: De Composables a la Gestión del Estado**

### **Introducción: La Revolución Declarativa en la UI de Android**

Si llevas un tiempo en el mundo del desarrollo de software, sabes que la construcción de interfaces de usuario (UI) puede ser una de las tareas más complejas y propensas a errores. Durante años, los desarrolladores de Android hemos vivido en un mundo dominado por XML, un sistema imperativo donde "decíamos" a la UI cómo cambiar paso a paso. Pero el ecosistema evoluciona, y con él, nuestras herramientas. Hoy nos encontramos ante una de las transformaciones más significativas en la historia del desarrollo de Android: la llegada de Jetpack Compose.

#### **1.1. Adiós XML, Hola Kotlin: ¿Qué es Jetpack Compose y por qué es diferente?**

**Jetpack Compose** es el moderno toolkit de UI nativo de Android, diseñado por Google para simplificar y acelerar el desarrollo de interfaces. Su principal característica es que está construido enteramente en Kotlin. Esto significa que ya no existe una separación entre el diseño visual (XML) y la lógica de comportamiento (Kotlin/Java). Tu UI es, ahora, parte de tu código.

A diferencia del sistema tradicional basado en Vistas (Views), donde defines un layout estático en XML y luego lo manipulas desde el código mediante `findViewById` o View Binding, en Compose describes *qué* debe mostrar la UI en un momento dado, no *cómo* llegar a ese estado. Simplemente, defines tus componentes de UI como funciones de Kotlin que emiten lo que se debe renderizar en pantalla. Cuando los datos de tu aplicación cambian, el framework de Compose se encarga de actualizar de forma inteligente solo las partes de la UI que dependen de esos datos.

#### **1.2. El cambio de paradigma: Pensar de forma declarativa vs. imperativa**

Para un programador experimentado, este es el cambio conceptual más importante que hay que asimilar.

- **Enfoque Imperativo (XML + Vistas):** Es como dar instrucciones a un robot. "Busca el `TextView` con el ID 'nombreUsuario'. Ahora, cambia su texto a 'Ana'. Luego, busca el `Button` con el ID 'botonLogin' y hazlo visible". Eres responsable de cada paso de la mutación de la UI.
- **Enfoque Declarativo (Jetpack Compose):** Es como describir el resultado final. "La pantalla debe mostrar un texto con el valor de la variable `nombreUsuario`. Si el usuario está autenticado, un botón de 'Logout' debe ser visible". No te preocupas por cómo se actualiza el texto o cómo aparece el botón; simplemente declaras cómo debe ser la UI para un estado determinado.

Este nuevo paradigma reduce drásticamente el código "boilerplate" (repetitivo), elimina clases enteras de errores relacionados con la sincronización del estado y la UI, y hace que tu código sea más predecible y fácil de probar.

#### **1.3. Lo que construiremos: un vistazo a nuestra mini-app de ejemplo**

Para hacer estos conceptos tangibles, no nos quedaremos solo en la teoría. A lo largo de este artículo, construiremos una pequeña pero ilustrativa aplicación: una simple "Tarjeta de Saludo Interactiva". Empezaremos con un texto estático, luego le añadiremos un botón para cambiar el mensaje y, finalmente, aprenderemos a estructurar el código de manera limpia y profesional, gestionando su estado correctamente. Este ejercicio nos permitirá explorar los pilares de Compose de manera práctica y progresiva.

### **2. Los Ladrillos de la UI: Funciones `@Composable`**

Si en el mundo del XML los ladrillos eran las `<View>`, `<TextView>` o `<Button>`, en Compose, nuestros bloques de construcción fundamentales son las **funciones Composable**. Olvídate de las clases extensas y los archivos XML; ahora, la UI se construye componiendo funciones simples y reutilizables.

#### **2.1. Anatomía de un Composable: Más que una simple función**

A primera vista, un Composable parece una función de Kotlin normal, pero tiene una característica clave: la anotación `@Composable`.

Kotlin

```
@Composable
fun MiComponenteDeUI() {
    // Aquí describes la UI que esta función emite.
}
```

Esta anotación es una señal para el compilador de Compose. Le dice que esta función no es para realizar cálculos o lógica de negocio, sino para **describir una pieza de la interfaz de usuario**. El compilador procesa estas funciones de manera especial para permitir el seguimiento del estado y la actualización eficiente de la UI (la "recomposición" que veremos más adelante).

**Reglas de oro de los Composables:**

- Deben ser **rápidos y libres de efectos secundarios** (como modificar variables globales o hacer llamadas de red). Se pueden ejecutar con mucha frecuencia, incluso en cada frame durante una animación.
- El **orden de ejecución no está garantizado**. Compose puede optimizar y ejecutar los Composables en cualquier orden.
- **Pueden ejecutarse en paralelo**. Para mejorar el rendimiento, Compose puede distribuir la renderización de la UI en diferentes hilos.

#### **2.2. ¡Tu primer "Hola, Mundo!" en Compose**

Vamos a crear nuestra primera unidad de UI. En el mundo de Android, esto suele ser un `TextView`. En Compose, usamos el Composable `Text`.

Kotlin

```
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview

// Nuestra primera función Composable.
// Simplemente describe que queremos mostrar un texto en la pantalla.
@Composable
fun Saludo() {
    Text(text = "¡Hola, programador!")
}

// La anotación @Preview nos permite ver nuestro Composable
// en el panel de vista previa de Android Studio sin necesidad
// de ejecutar la app en un emulador o dispositivo. ¡Es una
// herramienta increíblemente potente para el desarrollo rápido!
@Preview(showBackground = true)
@Composable
fun VistaPreviaDeSaludo() {
    Saludo()
}
```

Así de simple. Hemos declarado que nuestra UI debe contener un texto. No hemos necesitado un `Activity`, un `Fragment`, ni una sola línea de XML.

#### **2.3. `Modifiers`: El sistema de decoración y configuración universal**

¿Y si queremos añadir `padding`, cambiar el color de fondo o gestionar los clics? En XML, esto se hacía con una multitud de atributos como `android:padding`, `android:background`, `android:onClick`, etc.

En Compose, esta responsabilidad recae en un concepto unificado y poderoso: el **`Modifier`** (modificador). Casi todos los Composables aceptan un `Modifier` como parámetro. Este se pasa de un Composable a otro, encadenando configuraciones de forma secuencial.

Veamos cómo "decorar" nuestro saludo:

Kotlin

```
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun SaludoDecorado() {
    Text(
        text = "¡Hola, Compose!",
        // Creamos una cadena de modificadores. El orden importa.
        // Primero se aplica el padding, y luego el fondo al área resultante.
        modifier = Modifier
            .padding(16.dp) // Añade 16dp de espacio alrededor del texto.
            .background(Color.Yellow) // Pinta el fondo de amarillo.
    )
}
```

Los `Modifiers` son el equivalente a los atributos de estilo y layout de XML, pero con toda la flexibilidad y el poder de Kotlin.

#### **2.4. Composables esenciales: `Column`, `Row`, `Box`, `Text` y `Button`**

Para construir interfaces complejas, necesitas organizar tus componentes. Compose ofrece tres Composables de layout básicos que te recordarán a `LinearLayout` y `FrameLayout`.

- `Column`: Apila sus hijos verticalmente, uno debajo del otro.
- `Row`: Coloca a sus hijos horizontalmente, uno al lado del otro.
- `Box`: Apila a sus hijos uno encima del otro, como un `FrameLayout`.

Combinemos esto para crear una pequeña tarjeta de perfil:

Kotlin

```
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun TarjetaDePerfil() {
    // Column organiza sus elementos hijos verticalmente.
    Column(
        modifier = Modifier.padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally // Centra los hijos horizontalmente.
    ) {
        Text(text = "Articulos Programacion", fontSize = 24.sp)
        
        // Un espaciador simple para añadir distancia vertical.
        Spacer(modifier = Modifier.height(8.dp))
        
        Text(text = "Desarrollador Senior")
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Row organiza sus elementos hijos horizontalmente.
        Row(
            horizontalArrangement = Arrangement.SpaceEvenly // Distribuye el espacio entre los hijos.
        ) {
            Button(onClick = { /* Acción para seguir */ }) {
                Text("Seguir")
            }
            Button(onClick = { /* Acción para mensaje */ }) {
                Text("Mensaje")
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun VistaPreviaTarjeta() {
    TarjetaDePerfil()
}
```

Con estas pocas herramientas (`Column`, `Row`, `Text`, `Button` y `Modifier`), ya tienes la capacidad de construir una gran parte de las interfaces de usuario que puedas imaginar. La clave es la **composición**: crear componentes pequeños y luego unirlos para formar pantallas completas.

### **3. El Motor de Compose: Recomposición y Estado**

Hemos aprendido a construir interfaces visualmente atractivas, pero una aplicación real necesita ser interactiva. Debe responder a clics, recibir texto del usuario y actualizarse cuando los datos subyacentes cambian. Aquí es donde los conceptos de **Estado** y **Recomposición** se convierten en los protagonistas.

#### **3.1. ¿Qué es el "Estado"? La memoria de tu UI**

En el contexto de Compose, el **Estado (State)** es cualquier valor que puede cambiar con el tiempo y que afecta a la UI. Piensa en ello como la información que tu aplicación necesita "recordar" para dibujar la pantalla correctamente.

Ejemplos de estado:

- El texto actual en un campo de búsqueda.
- Si un interruptor (switch) está activado o desactivado.
- Una lista de tareas por hacer.
- El número de "me gusta" en una publicación.

En Compose, declaramos explícitamente qué variables son parte del estado de nuestra UI. Cuando el valor de una de estas variables de estado cambia, Compose se da cuenta y actúa en consecuencia.

#### **3.2. La magia de la Recomposición: ¿Cómo reacciona la UI a los cambios?**

La **Recomposición** es el proceso mediante el cual Jetpack Compose vuelve a ejecutar tus funciones `@Composable` para actualizar la vista cuando el estado del que dependen ha cambiado. Es el corazón del modelo declarativo.

Funciona así:

1. **Composición Inicial:** La primera vez que tu UI se muestra, Compose ejecuta todas tus funciones `@Composable` para crear un árbol de componentes y dibujar la pantalla. Durante este proceso, "observa" qué variables de estado lee cada Composable.
2. **Cambio de Estado:** En algún momento, una interacción del usuario (como un clic en un botón) modifica el valor de una variable de estado.
3. **Recomposición Inteligente:** Compose detecta este cambio. En lugar de redibujar toda la pantalla, identifica *exactamente* qué Composables leyeron esa variable de estado específica y vuelve a ejecutar solo esas funciones.
4. **Actualización de la UI:** Los Composables que se re-ejecutan emiten una nueva descripción de la UI con los datos actualizados, y el framework aplica estos cambios mínimos en la pantalla.

Este proceso es increíblemente eficiente porque evita reconstruir partes de la UI que no han cambiado.

#### **3.3. `remember` y `mutableStateOf`: Las herramientas para recordar y cambiar el estado**

Para que todo esto funcione, necesitamos dos herramientas clave de la librería de Compose:

- **`mutableStateOf(valorInicial)`:** Esta función crea un objeto de estado observable. Es un contenedor para tu valor (un `Int`, un `String`, un `Boolean`, etc.) que notificará a Compose cada vez que su contenido cambie.
- **`remember { ... }`:** Como dijimos, los Composables pueden ejecutarse muchas veces. Si declaramos una variable normal dentro, esta se reiniciará en cada recomposición, perdiendo cualquier cambio. `remember` es un Composable especial que "recuerda" el valor calculado dentro de su lambda a través de las recomposiciones. Le dice a Compose: "Calcula este valor la primera vez, y en las siguientes ejecuciones, devuélveme el valor que ya tenías guardado".

La combinación de ambos, `remember { mutableStateOf(...) }`, es el patrón estándar para declarar un estado interno en un Composable.

#### **3.4. Ejemplo práctico: Creando un contador interactivo**

Vamos a aplicar la teoría. Construiremos un `Button` que, al ser presionado, incrementa un número mostrado en un `Text`.

Kotlin

```
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.tooling.preview.Preview

@Composable
fun ContadorInteractivo() {
    // 1. Declaramos nuestra variable de estado.
    //    - `mutableStateOf(0)`: Crea el estado observable con un valor inicial de 0.
    //    - `remember`: Se asegura de que este estado sobreviva a las recomposiciones.
    //    - `var count by ...`: Usamos la delegación de propiedades de Kotlin (`by`)
    //      para acceder y modificar el valor directamente (`count++`) en lugar
    //      de usar `count.value++`, lo que hace el código más limpio.
    var count by remember { mutableStateOf(0) }

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // 2. Este Text "lee" el estado `count`. Compose ahora sabe que
        //    si `count` cambia, este Composable debe ser re-ejecutado.
        Text(text = "Has presionado el botón $count veces.")

        // 3. El `onClick` del botón es un evento. Aquí es donde "escribimos"
        //    o modificamos nuestro estado.
        Button(onClick = { count++ }) {
            Text("¡Presióname!")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun VistaPreviaContador() {
    ContadorInteractivo()
}
```

**¿Qué sucede aquí?**

1. **Inicialmente**, `count` es 0. El `Text` muestra "Has presionado el botón 0 veces."
2. Cuando **haces clic** en el `Button`, la lambda `onClick` se ejecuta, y `count` se incrementa a 1.
3. El cambio en `count` es **detectado** por Compose.
4. Compose ve que el `Text` depende de `count`, por lo que **recompone** (vuelve a llamar) la función `ContadorInteractivo`.
5. Durante la recomposición, `remember` devuelve el valor actual de `count` (que ahora es 1).
6. El `Text` se ejecuta de nuevo, ahora con el nuevo valor, mostrando "Has presionado el botón 1 veces." La UI se actualiza.

¡Felicidades! Has creado tu primera UI interactiva y reactiva en Jetpack Compose.

### **4. Buenas Prácticas: La Elevación del Estado (State Hoisting)**

Acabamos de crear un `ContadorInteractivo` que funciona perfectamente. Sin embargo, tiene un pequeño "problema" de diseño: el Composable que muestra la UI (`Text` y `Button`) también es el responsable de almacenar y modificar su propio estado (`count`). A este tipo de componente se le conoce como **stateful** (con estado).

Si bien esto es aceptable para componentes muy simples, se convierte en un obstáculo a medida que tu aplicación crece.

#### **4.1. ¿Por qué mi UI no debería gestionar su propio estado?**

Existen varias razones clave para separar la UI de la gestión de su estado:

- **Reutilización:** Nuestro `ContadorInteractivo` siempre empieza en 0 y solo sabe incrementarse. ¿Y si quisiéramos reutilizar esta misma UI de contador en otra parte de la app, pero que se incremente de 2 en 2 o que sea controlado por un `ViewModel`? No podríamos. La lógica y la UI están demasiado acopladas.
- **Pruebas (Testing):** Probar un Composable stateful es complicado porque necesitas simular interacciones de UI para verificar la lógica del estado. Es mucho más fácil probar una función que simplemente muestra datos y otra que maneja la lógica por separado.
- **Fuente única de verdad:** A medida que la app crece, múltiples componentes podrían necesitar reaccionar o modificar el mismo estado. Si cada uno gestiona su propia copia, tu UI se volverá inconsistente y llena de errores. Necesitamos que el estado "viva" en un lugar superior y se distribuya hacia abajo.

#### **4.2. El patrón "State Hoisting" (Elevación del Estado)**

La solución a estos problemas es un patrón de diseño llamado **State Hoisting**, que en español significa "elevación del estado".

El concepto es simple: en lugar de que un Composable mantenga su propio estado internamente, **movemos (elevamos) ese estado a un componente padre que lo pueda controlar**.

Para lograr esto, el Composable "hijo" deja de tener estado (se convierte en **stateless**) y, en su lugar, recibe dos cosas como parámetros:

1. `value`: El valor del estado actual que debe mostrar.
2. `onValueChange`: Una función (lambda) que se le notifica cuando ocurre un evento que *debería* cambiar el estado (por ejemplo, `onClick`).

De esta manera, el componente hijo solo se encarga de mostrar la UI y delegar los eventos hacia arriba. El padre es quien posee el estado, decide qué hacer con los eventos y vuelve a pasar el nuevo estado al hijo para que se redibuje.

#### **4.3. Refactorizando nuestro contador: Creando un Composable "tonto" y reutilizable**

Vamos a aplicar el "State Hoisting" a nuestro `ContadorInteractivo`. Lo dividiremos en dos partes:

1. `ContadorSinEstado`: Un Composable "tonto" (stateless) que solo sabe mostrar un número y notificar cuándo se hace clic en su botón.
2. `ContadorInteligente`: El Composable "padre" (stateful) que posee el estado y le dice al hijo qué mostrar y cómo reaccionar.

**Este es el código refactorizado:**

Kotlin

```
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.tooling.preview.Preview

// 1. El Composable "tonto" y sin estado (stateless).
//    - No usa `remember` ni `mutableStateOf`.
//    - Recibe el estado (`count`) y la lambda de evento (`onIncrement`)
//      como parámetros.
//    - Es altamente reutilizable y fácil de previsualizar.
@Composable
fun ContadorSinEstado(count: Int, onIncrement: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(text = "Has presionado el botón $count veces.")
        Button(onClick = onIncrement) { // Llama a la función lambda recibida
            Text("¡Presióname!")
        }
    }
}

// 2. El Composable "inteligente" o padre (stateful).
//    - Este es el que ahora posee y recuerda el estado.
//    - Es el responsable de la lógica.
@Composable
fun ContadorInteligente() {
    var count by remember { mutableStateOf(0) }

    // El padre controla el estado y se lo pasa al hijo.
    // También le pasa la "lógica" de lo que debe hacer
    // cuando el hijo notifique un evento.
    ContadorSinEstado(
        count = count,
        onIncrement = { count++ }
    )
}

@Preview(showBackground = true)
@Composable
fun VistaPreviaContadorElevado() {
    ContadorInteligente()
}
```

¡El resultado visual es idéntico, pero la arquitectura es infinitamente superior! Ahora nuestro `ContadorSinEstado` puede ser reutilizado en cualquier lugar, controlado por cualquier lógica, simplemente pasándole un valor y una función.

#### **4.4. El flujo de datos unidireccional (UDF) como consecuencia natural**

Este patrón nos lleva de forma natural a una arquitectura muy robusta conocida como **Flujo de Datos Unidireccional** (Unidirectional Data Flow o UDF).

El concepto es:

- El **Estado fluye hacia abajo** (del padre `ContadorInteligente` al hijo `ContadorSinEstado`).
- Los **Eventos fluyen hacia arriba** (del hijo `ContadorSinEstado` al padre `ContadorInteligente`).

La UI nunca modifica su estado directamente, solo informa al propietario del estado sobre la intención de cambio. Esto hace que el flujo de datos en tu app sea predecible, fácil de depurar y menos propenso a errores. Es el pilar sobre el que se construyen las aplicaciones de Compose a gran escala con arquitecturas como MVVM.

### **5. Preguntas y Respuestas Frecuentes (FAQ)**

**1. ¿Puedo mezclar Jetpack Compose con mis vistas de XML existentes?** ¡Sí! Google ha asegurado una excelente interoperabilidad. Puedes colocar Composables dentro de tus layouts de XML usando el componente `ComposeView`, y también puedes insertar Vistas de XML tradicionales dentro de tus Composables usando el `AndroidView` Composable. Esto permite una migración gradual y segura.

**2. ¿Jetpack Compose reemplazará por completo a XML?** A largo plazo, Compose es el futuro del desarrollo de UI en Android y la recomendación oficial de Google para nuevas aplicaciones. Sin embargo, el sistema de Vistas basado in XML seguirá teniendo soporte durante muchos años, ya que existen millones de aplicaciones construidas con él. No hay una necesidad inmediata de reescribir apps existentes, pero para nuevos proyectos, Compose es el camino a seguir.

**3. ¿Qué pasa con el rendimiento? ¿Es más lento que XML?** La composición inicial de una pantalla compleja en Compose puede ser ligeramente más lenta que inflar un layout de XML equivalente. Sin embargo, su gran ventaja está en las actualizaciones (recomposiciones). Al actualizar solo los componentes que cambian, Compose puede ser significativamente más performante en UIs dinámicas, evitando redibujar la jerarquía de vistas completa.

**4. Si un Composable se ejecuta muy a menudo, ¿dónde pongo mi lógica de negocio o llamadas a la red?** ¡Nunca dentro del Composable! Las funciones Composable deben ser rápidas y libres de efectos secundarios. La lógica de negocio, las llamadas a APIs o el acceso a bases de datos deben residir en capas de arquitectura superiores, como los `ViewModels` de Android Architecture Components. El estado resultante de esas operaciones se pasa al Composable para que este simplemente lo muestre.

**5. ¿Cómo manejo la navegación entre pantallas en Compose?** Existe una librería específica llamada **Navigation-Compose** que se integra perfectamente con el paradigma de Compose. Permite definir un grafo de navegación directamente en código Kotlin, gestionando las rutas y el paso de argumentos entre tus pantallas Composable de una manera muy intuitiva.

---

### **Puntos Relevantes (Resumen Clave)**

1. **Paradigma Declarativo:** En Compose, describes *qué* debe mostrar la UI para un estado dado, en lugar de dar los pasos imperativos para modificarla. Tu UI es una función de tu estado: `UI = f(estado)`.
2. **`@Composable` es el Núcleo:** Todo en la UI se construye a partir de funciones de Kotlin anotadas con `@Composable`. Son los ladrillos reutilizables de tu interfaz.
3. **Estado y Recomposición:** La UI se actualiza automáticamente a través de la **recomposición**, que se activa cuando cambia una variable de **estado** (creada con `mutableStateOf` y guardada con `remember`).
4. **`Modifier` para Todo:** Los `Modifiers` son la forma unificada y potente de decorar y configurar tus Composables (padding, tamaño, clics, fondo, etc.).
5. **Eleva el Estado (State Hoisting):** La mejor práctica es crear Composables "tontos" (stateless) que reciben el estado y los eventos desde un componente padre. Esto conduce a un Flujo de Datos Unidireccional (UDF), haciendo tu app más robusta, reutilizable y fácil de probar.

---

### **Conclusión: Tu nuevo camino en el desarrollo de Android**

Hemos viajado desde los conceptos fundamentales y el cambio de mentalidad que exige Jetpack Compose hasta las prácticas esenciales para construir interfaces interactivas y bien estructuradas. Has aprendido que la UI ya no es un conjunto de archivos estáticos, sino código vivo y reactivo escrito enteramente en Kotlin.

El dominio de los Composables, la comprensión del ciclo de estado y recomposición, y la aplicación del patrón de elevación de estado no son solo técnicas; son los cimientos de una nueva forma de pensar y construir aplicaciones en Android. Este camino te llevará a desarrollar más rápido, con menos errores y con un código mucho más limpio y disfrutable.

---

### **Recursos Adicionales**

- **Documentación Oficial de Jetpack Compose:** El punto de partida y la fuente de verdad definitiva.
  - <https://developer.android.com/jetpack/compose>
- **Codelabs de Jetpack Compose:** Tutoriales prácticos y guiados creados por Google.
  - <https://developer.android.com/courses/jetpack-compose/course>
- **ComposeSamples en GitHub:** Repositorio oficial con ejemplos de implementaciones.
  - <https://github.com/android/compose-samples>

---

### **Sugerencias de Siguientes Pasos**

1. **Listas y Grids:** Investiga sobre `LazyColumn` y `LazyRow`. Son los equivalentes de `RecyclerView` en Compose, diseñados para mostrar listas largas de elementos de manera eficiente.
2. **Estado en ViewModels:** Aprende a mover el estado que elevaste desde tus Composables "padre" hacia un `ViewModel` de Android Architecture Components. Este es el siguiente paso para construir una app con una arquitectura robusta.
3. **Navegación:** Explora la librería **Navigation-Compose** para aprender a construir aplicaciones con múltiples pantallas.

---

### **Invitación a la Acción**

La teoría es importante, pero la verdadera comprensión llega con la práctica. No te quedes aquí. Abre Android Studio, crea un proyecto vacío de Compose y empieza a experimentar.

Intenta modificar el contador que construimos. ¿Puedes añadir un botón para resetearlo? ¿Puedes hacer que el color del texto cambie cuando el número sea mayor que 10? Desafíate a ti mismo a crear pequeños componentes que se te ocurran. ¡La mejor manera de aprender Compose es componiendo!

¡Bienvenido al futuro del desarrollo de UI en Android!
