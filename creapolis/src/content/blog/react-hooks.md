---
title: "Aprender React Hooks: Guía Esencial con Ejemplos de useState y useEffect"
description: "Aprende desmitificando react hooks: guía esencial para escribir componentes modernos con esta guía completa para desarrolladores. Ejemplos prácticos y mejores prácticas."
pubDate: "2025-05-07"
author: "tiagofur"
tags: []
categories: ["Engineering"]
slug: "desmitificando-react-hooks-guia-esencial-para-esc"
originalUrl: "https://creapolis.dev/desmitificando-react-hooks-guia-esencial-para-esc/"
draft: false
---

### **1. Introducción: La Revolución de los Componentes Funcionales**

Si llevas un tiempo trabajando con React, seguramente recuerdas los componentes de clase. Eran la única forma de manejar el estado, el ciclo de vida y otras características complejas. `this.setState`, `componentDidMount`, `constructor`... eran nuestro pan de cada día. Funcionaban, sí, pero a menudo nos llevaban a componentes enormes, lógicas de estado difíciles de seguir y a un patrón conocido como "wrapper hell" (el infierno de los envoltorios).

Pero en la React Conf 2018, todo cambió. El equipo de React introdujo una nueva característica que revolucionaría la forma en que escribimos nuestras aplicaciones: los **Hooks**.

**¿Qué son exactamente los Hooks?**

En pocas palabras, los Hooks son funciones que te permiten "enganchar" el estado y el ciclo de vida de React desde componentes de función. Esto significa que ahora puedes usar características que antes estaban reservadas exclusivamente para las clases, pero con la simplicidad y legibilidad de una función de JavaScript.

Piensa en ellos como una forma más directa y explícita de decirle a React lo que tu componente necesita hacer:

- ¿Necesita recordar información? Usa `useState`.
- ¿Necesita ejecutar código después de renderizarse? Usa `useEffect`.
- ¿Necesita acceder a un contexto global? Usa `useContext`.

El objetivo de este artículo es desmitificar los Hooks más importantes. Te guiaremos paso a paso para que entiendas no solo *cómo* funcionan, sino *por qué* son la herramienta preferida para construir componentes modernos, reutilizables y fáciles de mantener. Prepárate para dejar atrás la complejidad del `this` y abrazar un código más limpio y funcional. ¡Comencemos!

### **2. Las Reglas de Oro de los Hooks** 📜

El equipo de React incluyó un plugin de ESlint (`eslint-plugin-react-hooks`) que detecta y te advierte si rompes alguna de estas reglas. ¡Es una gran ayuda! Pero entender el *porqué* de las reglas te hará un mejor desarrollador.

#### **Regla #1: Llama a los Hooks solo en el nivel superior**

Esto significa que **no debes llamar a los Hooks dentro de bucles, condicionales (`if`) o funciones anidadas.** Llámalos siempre en la primera línea de tu componente de función, antes de cualquier `return`.

**❌ Mal:**

JavaScript

```
function MyComponent({ shouldShow }) {
  if (shouldShow) {
    // 🔴 ¡Incorrecto! Llamando un Hook dentro de un condicional.
    const [name, setName] = useState('Articulos React');
  }
  // ...
}
```

**✅ Bien:**

JavaScript

```
function MyComponent({ shouldShow }) {
  // ✅ Correcto. El Hook se llama en el nivel superior.
  const [name, setName] = useState('Articulos React');

  if (!shouldShow) {
    return null; // La lógica condicional ocurre después del Hook.
  }
  // ...
}
```

#### **Regla #2: Llama a los Hooks solo desde funciones de React**

Solo debes llamar a los Hooks desde:

- ✅ Componentes de función de React.
- ✅ Custom Hooks (que veremos más adelante).

**No** los llames desde funciones regulares de JavaScript.

**❌ Mal:**

JavaScript

```
function getFullName() {
  // 🔴 ¡Incorrecto! Esta no es una función de React ni un Custom Hook.
  const [name, setName] = useState('Articulos React');
  return name;
}
```

**✅ Bien:**

JavaScript

```
// En un componente de función de React
function UserProfile() {
  // ✅ Correcto. Se llama desde un componente.
  const [name, setName] = useState('Articulos React');
  return <h1>{name}</h1>;
}
```

#### **¿Por qué existen estas reglas?**

La respuesta corta es que **React depende del orden en que se llaman los Hooks** para asociar el estado local con el componente correcto. Si pones un Hook dentro de un `if`, ese Hook podría no ejecutarse en cada renderizado, rompiendo el orden y causando bugs muy extraños y difíciles de depurar. Al seguir estas reglas, garantizas que los Hooks se ejecuten en el mismo orden cada vez, manteniendo tu componente predecible y estable.

### **3. El Hook Esencial para el Estado: `useState`** 🧠

Imagina un componente como una persona con amnesia a corto plazo. Cada vez que React lo renderiza, olvida todo lo que sucedió antes. No puede recordar clics, entradas de texto ni ninguna otra interacción. **`useState` es la píldora de la memoria para tus componentes**.

Este Hook te permite declarar una "variable de estado". React preservará esta variable entre renderizados, permitiendo que tu componente "recuerde" información y reaccione a los cambios.

#### **Anatomía de `useState`**

Cuando llamas a `useState`, le pasas el estado inicial como único argumento. A cambio, te devuelve un array con dos elementos:

1. **El valor actual del estado**: La "memoria" de tu componente.
2. **Una función para actualizar ese estado**: La única forma correcta de cambiar ese valor.

Generalmente, usamos la desestructuración de arrays de JavaScript para obtener estas dos variables de forma limpia.

JavaScript

```
//         [  valor  , función para actualizar ] = useState( valor inicial );
const [     count   ,         setCount         ] = useState(         0         );
```

Cuando llamas a la función `setCount`, le dices a React dos cosas: "Oye, cambia el valor de `count`" y "Por favor, vuelve a renderizar este componente y sus hijos para que reflejen el cambio".

#### **Ejemplo práctico: Creando un contador interactivo**

Nada mejor que un ejemplo clásico para entenderlo. Crearemos un componente que muestra un número y dos botones para incrementarlo y decrementarlo.

JavaScript

```
import React, { useState } from 'react';

function Counter() {
  // 1. Declaramos nuestra variable de estado 'count' con un valor inicial de 0.
  const [count, setCount] = useState(0);

  // 2. Creamos funciones que usan 'setCount' para modificar el estado.
  const handleIncrement = () => {
    // Al llamar a setCount, React re-renderizará el componente con el nuevo valor.
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>Contador: {count}</h2> {/* 3. Mostramos el valor actual del estado. */}
      <button onClick={handleIncrement}>Incrementar +</button>
      <button onClick={handleDecrement}>Decrementar -</button>
    </div>
  );
}

export default Counter;
```

#### **Manejando estados más complejos**

`useState` no se limita a números o strings. Puedes guardar objetos o arrays. Sin embargo, recuerda una regla clave: **el estado es inmutable**. Nunca modifiques directamente un objeto o array del estado. En su lugar, crea siempre una copia nueva con los cambios.

**❌ Mal:**

JavaScript

```
const [user, setUser] = useState({ name: 'John', age: 30 });

function updateAge() {
  user.age = 31; // 🔴 ¡Mutación directa! React podría no detectar el cambio.
  setUser(user);
}
```

**✅ Bien:**

JavaScript

```
const [user, setUser] = useState({ name: 'John', age: 30 });

function updateAge() {
  // ✅ Creamos un nuevo objeto usando el 'spread operator' (...).
  setUser({ ...user, age: 31 });
}
```

### **4. Manejo de Efectos Secundarios con `useEffect`** 🛰️

Tus componentes no viven en una burbuja. A menudo, necesitan interactuar con sistemas que están fuera de React, como hacer una petición a un servidor, manipular el DOM directamente o establecer una suscripción. A estas operaciones las llamamos **"efectos secundarios"** (side effects), porque no están relacionadas con el renderizado de la UI en sí.

`useEffect` es el Hook que nos permite ejecutar estos efectos secundarios de forma controlada y en el momento adecuado del ciclo de vida del componente.

#### **Controlando la Ejecución: El Array de Dependencias**

La verdadera potencia de `useEffect` reside en su segundo argumento: el array de dependencias. Este array le dice a React **cuándo** debe volver a ejecutar el efecto.

JavaScript

```
useEffect(() => {
  // El código de tu efecto va aquí.
  console.log('El efecto se ha ejecutado.');

}, [/* array de dependencias */]);
```

Existen tres escenarios principales:

1. **Sin array de dependencias**: El efecto se ejecutará **después de cada renderizado** del componente. ¡Úsalo con cuidado, puede causar bucles infinitos!JavaScript`useEffect(() => { /* Se ejecuta siempre */ });`
2. **Con un array vacío `[]`**: El efecto se ejecutará **solo una vez**, después del primer renderizado (cuando el componente se "monta"). Perfecto para llamadas a API iniciales.JavaScript`useEffect(() => { /* Se ejecuta solo la primera vez */ }, []);`
3. **Con dependencias `[prop, estado]`**: El efecto se ejecutará la primera vez y, después, **solo si alguno de los valores en el array ha cambiado** entre renderizados.JavaScript`useEffect(() => { /* Se ejecuta si 'userId' cambia */ }, [userId]);`

#### **Ejemplo práctico: Cargando datos desde una API**

Vamos a crear un componente que carga una lista de usuarios desde una API pública (`jsonplaceholder`) cuando se monta.

JavaScript

```
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]); // Estado para guardar los usuarios
  const [loading, setLoading] = useState(true); // Estado para mostrar un mensaje de carga

  // useEffect se encargará de la llamada a la API
  useEffect(() => {
    // Definimos una función asíncrona dentro del efecto
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data); // Guardamos los datos en el estado
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoading(false); // Ocultamos el mensaje de carga, haya éxito o error
      }
    };

    fetchUsers(); // La llamamos

  }, []); // El array vacío [] asegura que esto se ejecute solo una vez

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

#### **La importancia de la función de limpieza (cleanup)**

A veces, un efecto secundario necesita ser "deshecho". Por ejemplo, si te suscribes a un evento, debes desuscribirte cuando el componente se desmonte para evitar fugas de memoria. Para ello, puedes devolver una función desde tu `useEffect`. React la ejecutará automáticamente cuando sea necesario.

JavaScript

```
useEffect(() => {
  const handleResize = () => console.log('Ventana redimensionada');
  window.addEventListener('resize', handleResize);

  // Esta es la función de limpieza
  return () => {
    console.log('Limpiando el efecto...');
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

### **5. Contexto sin "Prop Drilling": `useContext`** 🚇

Imagina que tienes un componente `Abuelo` que necesita pasarle una información a su componente `Nieto`. El problema es que, en medio, está el componente `Padre`, que no necesita esa información para nada. Aun así, te ves forzado a pasar la prop a través de `Padre` solo para que llegue a su destino. Esto es el **"prop drilling"** (perforación de props). En aplicaciones grandes, puedes terminar pasando props a través de 5, 10 o más niveles, lo que hace que el código sea frágil y difícil de mantener.

Aquí es donde entra el **Context API** de React, y el Hook `useContext` lo hace increíblemente fácil de usar. Context te permite crear una especie de "tubería" de datos global a la que cualquier componente dentro de esa tubería puede conectarse y consumir la información, sin necesidad de recibirla por props.

#### **Cómo funciona `useContext` en 3 pasos:**

1. **Crear el Contexto**: Usas `React.createContext` para crear un objeto de contexto. Puedes darle un valor por defecto.
2. **Proveer el Contexto**: Envuelves el árbol de componentes que necesita acceso a los datos con el componente `Context.Provider` y le pasas el valor que quieres compartir.
3. **Consumir el Contexto**: En cualquier componente hijo, usas el Hook `useContext(MiContexto)` para leer el valor.

#### **Ejemplo práctico: Implementando un tema (Modo Claro/Oscuro)**

Este es el caso de uso perfecto para Context. El tema (claro u oscuro) es una información global que muchos componentes necesitan, desde botones hasta el fondo de la página.

**Paso 1: Crear el Contexto (`ThemeContext.js`)**

JavaScript

```
import React from 'react';

// Creamos un contexto con 'light' como valor por defecto.
export const ThemeContext = React.createContext('light');
```

**Paso 2: Proveer el Contexto en el componente principal (`App.js`)**

JavaScript

```
import React, { useState } from 'react';
import { ThemeContext } from './ThemeContext';
import Toolbar from './Toolbar'; // Un componente hijo

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    // Todos los componentes dentro de este Provider tendrán acceso al valor 'theme'.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app theme-${theme}`}>
        <h1>App con Temas</h1>
        <button onClick={toggleTheme}>
          Cambiar a {theme === 'light' ? 'Oscuro' : 'Claro'}
        </button>
        <Toolbar /> {/* Este componente no necesita recibir 'theme' como prop */}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
```

**Paso 3: Consumir el Contexto en un componente anidado (`ThemedButton.js`)** Este botón podría estar dentro del componente `Toolbar`.

JavaScript

```
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  // Usamos useContext para acceder directamente al valor del contexto más cercano.
  const { theme } = useContext(ThemeContext);

  // Usamos el valor del tema para aplicar estilos dinámicos.
  const buttonStyle = {
    background: theme === 'dark' ? '#333' : '#FFF',
    color: theme === 'dark' ? '#FFF' : '#333',
    border: '1px solid',
    padding: '10px',
    borderRadius: '5px',
  };

  return <button style={buttonStyle}>Botón con Tema</button>;
}

export default ThemedButton;
```

¡Y listo! `ThemedButton` obtiene el tema directamente, sin que `App` o `Toolbar` tengan que pasárselo como prop. Hemos evitado el "prop drilling" y nuestro código es mucho más limpio.

### **6. Creando tus Propios Hooks: La Magia de los Custom Hooks** ✨

¿Recuerdas el componente `UserList` que creamos antes? Tenía la lógica para el estado de carga (`loading`), el estado de los datos (`users`) y el `useEffect` para hacer la llamada a la API. Ahora, imagina que necesitas hacer lo mismo en otro componente, pero para cargar una lista de *productos*. ¿Copiarías y pegarías todo ese código? ¡Podrías, pero hay una forma mucho mejor!

Un **Custom Hook** es simplemente una función de JavaScript cuyo nombre empieza con `use` y que puede llamar a otros Hooks. Su propósito es extraer y reutilizar lógica con estado de un componente.

#### **¿Por qué y cuándo crear un Custom Hook?**

La regla es simple: si te encuentras escribiendo la misma lógica (una combinación de `useState`, `useEffect`, `useContext`, etc.) en varios componentes, es el momento perfecto para extraerla a un Custom Hook.

#### **La convención de nomenclatura `use...`**

Es **obligatorio** que el nombre de tu Custom Hook empiece con `use`. No es solo una convención, es la forma en que el linter de React sabe que esa función debe seguir las reglas de los Hooks que vimos al principio. Por ejemplo: `useFetch`, `useLocalStorage`, `useFormInput`.

#### **Ejemplo práctico: Construyendo un Hook `useFetch`**

Vamos a tomar la lógica de nuestro componente `UserList` y la convertiremos en un Hook reutilizable llamado `useFetch`. Este Hook recibirá una URL y nos devolverá el estado de la petición: los datos, el estado de carga y si hubo un error.

**Paso 1: Crear el Custom Hook (`useFetch.js`)**

JavaScript

```
import { useState, useEffect } from 'react';

// Nuestro Custom Hook. Es solo una función que empieza con "use".
function useFetch(url) {
  // Encapsulamos toda la lógica de estado que antes estaba en el componente.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // La lógica para hacer el fetch es la misma, pero ahora es genérica.
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // El efecto se volverá a ejecutar si la URL cambia.
  }, [url]);

  // El Hook devuelve un objeto con los tres estados.
  return { data, loading, error };
}

export default useFetch;
```

**Paso 2: Usar nuestro Custom Hook en un componente**

Ahora, mira qué increíblemente limpio queda nuestro componente `UserList` (y cualquier otro componente que necesite hacer un fetch).

JavaScript

```
import React from 'react';
import useFetch from './useFetch'; // Importamos nuestro nuevo Hook

function UserList() {
  // ¡Toda la lógica compleja está ahora en una sola línea!
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {/* Renombramos 'data' a 'users' para mayor claridad */}
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

¡Es así de simple! Hemos abstraído toda la complejidad en `useFetch`. Ahora podemos reutilizarlo para obtener productos, artículos de blog, o cualquier otra cosa, simplemente cambiando la URL. Esto hace que nuestros componentes sean más declarativos, más fáciles de leer y de mantener.

### **7. Preguntas Frecuentes (FAQ)** 🤔

Aquí respondemos a algunas de las preguntas más habituales que los desarrolladores se hacen al empezar a trabajar con Hooks en React.

**1. ¿Puedo usar Hooks dentro de mis componentes de clase existentes?**

No. Los Hooks están diseñados para funcionar exclusivamente dentro de componentes de función. No puedes usarlos en componentes de clase. Sin embargo, una aplicación de React puede tener perfectamente componentes de clase y componentes de función con Hooks conviviendo en el mismo árbol de componentes sin ningún problema. Esto te permite adoptar Hooks de forma gradual en tu codebase.

**2. ¿Por qué mi `useEffect` causa un bucle infinito?**

Este es el error más común al empezar con `useEffect`. Generalmente ocurre por dos razones:

- **No has especificado el array de dependencias**: Si omites el segundo argumento, el efecto se ejecuta después de *cada* renderizado. Si dentro del efecto actualizas el estado, provocas un nuevo renderizado, que vuelve a ejecutar el efecto, y así infinitamente.
- **Creas un nuevo objeto o array en cada renderizado y lo pones como dependencia**: Si una de tus dependencias es un objeto o array que se redefine en cada renderizado (p. ej. `style={{...}}`), React lo verá como un valor "nuevo" cada vez, disparando el efecto repetidamente. La solución suele ser memorizar ese valor con otros Hooks como `useMemo` o sacarlo fuera del componente si no necesita cambiar.

**3. ¿La función para actualizar de `useState` (ej: `setCount`) fusiona los objetos como lo hacía `this.setState`?**

No, y esta es una diferencia clave. En los componentes de clase, `this.setState({ a: 1 })` fusionaba este objeto con el estado existente. En cambio, la función `set` de `useState` **reemplaza** el estado anterior por completo. Por eso, cuando trabajes con objetos, siempre debes crear una copia del estado anterior y luego aplicar tus cambios.

JavaScript

```
// En lugar de:
setUser({ age: 31 }); // 🔴 ¡Esto borraría la propiedad 'name'!

// Debes hacer:
setUser(prevState => ({ ...prevState, age: 31 })); // ✅ Correcto
```

**4. ¿Cuándo debería crear un Custom Hook en lugar de una simple función de JavaScript?**

La respuesta es simple: crea un Custom Hook cuando tu lógica necesite "engancharse" a otros Hooks de React (`useState`, `useEffect`, etc.). Si tu función es un cálculo puro que no necesita estado ni efectos (por ejemplo, una función que formatea una fecha), entonces una función de JavaScript normal es suficiente. Si necesitas reutilizar lógica que involucra estado, es el caso de uso perfecto para un Custom Hook.

**5. ¿Han quedado obsoletos los componentes de clase? ¿Debería dejar de usarlos?**

El equipo de React ha declarado que no tienen planes de eliminar los componentes de clase. Siguen siendo una parte totalmente válida de React. Sin embargo, para nuevos desarrollos, los Hooks son la forma recomendada y moderna de escribir componentes. Ofrecen una mejor reutilización de la lógica y tienden a producir un código más limpio y fácil de seguir. Si estás empezando un proyecto nuevo, sin duda deberías optar por componentes de función y Hooks.

### **8. Puntos Clave para Recordar** 📌

Si te quedas con solo cinco ideas de esta guía, que sean estas:

1. **Los Hooks revolucionan los componentes de función.** Te permiten usar estado, efectos secundarios y otras características de React sin escribir una sola clase, resultando en un código más limpio y legible.
2. **`useState` es tu memoria.** Es el Hook fundamental para añadir estado a tus componentes, permitiéndoles "recordar" información entre renderizados y ser interactivos.
3. **`useEffect` conecta tu componente con el exterior.** Úsalo para cualquier operación que no sea el renderizado puro, como llamadas a APIs, suscripciones o manipulación del DOM, controlando exactamente cuándo se ejecuta con el array de dependencias.
4. **No repitas lógica, crea un Custom Hook.** Si una combinación de Hooks se repite en varios componentes, extráela a tu propio Hook (una función que empieza con `use`). Es la forma más poderosa de compartir lógica con estado.
5. **Respeta siempre las Reglas de Oro.** Llama a los Hooks solo en el nivel superior de tus componentes de función y nunca dentro de condicionales o bucles. Esto garantiza que tu componente se comporte de manera predecible.

### **9. Conclusión: Escribiendo React de Forma Moderna**

Hemos viajado desde el "porqué" de los Hooks hasta la creación de nuestra propia lógica reutilizable. Si algo queda claro, es que los Hooks no son solo una nueva sintaxis, sino un cambio de paradigma en la forma de pensar y construir componentes en React. Nos invitan a abrazar la simplicidad de las funciones de JavaScript y a componer la lógica de una manera más limpia, directa y modular.

Al dominar `useState`, `useEffect`, `useContext` y el patrón de Custom Hooks, no solo estás actualizando tus habilidades, sino que estás abriendo la puerta a un desarrollo más rápido, a un código más fácil de testear y a una base de código mucho más mantenible. No temas experimentar, refactorizar un viejo componente de clase o empezar tu próximo proyecto usando solo Hooks. Ese es el verdadero camino para interiorizar su poder.

### **10. Recursos Adicionales**

La documentación oficial siempre es el mejor lugar para profundizar, pero aquí tienes otros recursos fantásticos:

- **Documentación Oficial de React sobre Hooks:** La fuente de la verdad. Indispensable para entender cada Hook en detalle. [Ver la documentación](https://react.dev/reference/react).
- **A Complete Guide to useEffect:** Un artículo de Dan Abramov (del equipo de React) que profundiza en la mentalidad detrás de `useEffect`. [Leer en overreacted.io](https://overreacted.io/a-complete-guide-to-useeffect/).
- **useHooks.com:** Una colección de recetas y ejemplos de Custom Hooks listos para usar en tus proyectos. [Explorar ejemplos](https://usehooks.com/).

### **11. Sugerencias de Siguientes Pasos**

¿Te sientes cómodo con lo que has aprendido? ¡Genial! Aquí tienes tres temas para llevar tus habilidades con los Hooks al siguiente nivel:

1. **Explora `useReducer`:** Para manejar lógica de estado más compleja que involucra múltiples sub-valores o depende del estado anterior, `useReducer` es una alternativa increíblemente poderosa a `useState`.
2. **Optimiza el rendimiento con `useCallback` y `useMemo`:** Aprende a usar estos Hooks para memorizar funciones y valores, evitando re-cálculos innecesarios y optimizando el rendimiento de tus componentes.
3. **Sumérgete en Librerías de Gestión de Estado basadas en Hooks:** Explora herramientas modernas como Zustand, Jotai o Redux Toolkit con Hooks. Te mostrarán patrones avanzados para manejar el estado global de una aplicación.

### **12. Invitación a la Acción**

La teoría es importante, pero la práctica lo es todo. Te invito a que tomes lo aprendido y lo pongas en acción ahora mismo.

- **Crea una pequeña App:** Intenta construir una aplicación simple como una lista de tareas (To-Do list), un buscador de GIFs usando una API pública o una pequeña aplicación del clima. Usa solo componentes de función y Hooks.
- **Refactoriza un Componente:** ¿Tienes un proyecto antiguo con componentes de clase? Elige uno y refactorízalo para que use Hooks. Es el mejor ejercicio para entender las diferencias y ventajas.

Comparte tus creaciones, experimenta, rompe cosas y arréglalas. Esa es la esencia de ser desarrollador. ¡Feliz codificación!
