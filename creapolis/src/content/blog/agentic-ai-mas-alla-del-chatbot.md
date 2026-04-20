---
title: "Agentic AI: Guía Completa para pasar de Chatbots a Agentes Autónomos"
description: "Si 2023 fue el año del Chatbot y 2024 el del Copilot, 2026 se perfila indiscutiblemente como la era de la IA Agéntica (Agentic AI). Hasta ahora, la interacción con la inteligencia…"
pubDate: "2026-01-08"
author: "tiagofur"
tags: []
categories: ["IA", "Vibe Code"]
slug: "agentic-ai-mas-alla-del-chatbot"
originalUrl: "https://creapolis.dev/agentic-ai-mas-alla-del-chatbot/"
draft: false
---

## 1. Introducción

Si 2023 fue el año del Chatbot y 2024 el del Copilot, 2026 se perfila indiscutiblemente como la era de la **IA Agéntica (Agentic AI)**. Hasta ahora, la interacción con la inteligencia artificial ha sido fundamentalmente pasiva: escribimos un prompt, esperamos una respuesta y copiamos el código. Es un ciclo de "pide y lee". Pero, ¿y si la IA pudiera no solo responder, sino **actuar**?

El problema con los LLMs tradicionales es que viven en una caja aislada. Son brillantes razonando, pero no tienen "manos". No pueden ejecutar el script de Python que acaban de escribir, no pueden ver si los tests fallan y no pueden corregirse a sí mismos basándose en el error de la terminal.

En este artículo, daremos el siguiente paso evolutivo. Dejaremos de tratar a la IA como un oráculo consultivo y aprenderemos a construir **Agentes Autónomos**: sistemas capaces de planificar tareas complejas, utilizar herramientas reales (Terminal, File System, Browser) y ejecutar flujos de trabajo de ingeniería de software bajo supervisión. Desmitificaremos la "magia" detrás de frameworks como LangChain o AutoGen y entenderás por fin qué significa dotar de *agencia* a un modelo de lenguaje.

## 2. Prerrequisitos

Para aprovechar al máximo esta guía, necesitarás:

- **Conocimientos Previos:**

- Entendimiento intermedio de Python (clases, decoradores, manejo de APIs, async/await).

- Familiaridad básica con conceptos de LLMs (Prompts, Context Window, Roles de sistema).

- No es necesario ser experto en Machine Learning, ya que usaremos abstracciones de alto nivel.

- **Herramientas y Software:**

- **Python 3.10+** instalado en tu entorno local.

- Una clave de API de **OpenAI** (GPT-4o recomendado por su capacidad de razonamiento) o **Anthropic** (Claude 3.5 Sonnet es excelente para código).

- Opcional: **Ollama** instalado si prefieres experimentar con modelos locales como Llama 3 o Mistral (sin costo).

- Un editor de código como VS Code o Cursor.

- **Tiempo Estimado:**

- Lectura: 20-25 minutos

- Práctica con ejemplos: 60-90 minutos

### **3.1. El Salto Evolutivo: De LLMs Pasivos a Agentes Activos**

Para entender la "IA Agéntica", primero debemos romper con la mentalidad del Chatbot.

- **El Chatbot (Pasivo):** Es un sistema *stateless* (sin estado persistente complejo) que mapea una entrada a una salida basándose en probabilidades estadísticas. Es excelente para generar texto, resumir o explicar código.

- **El Agente (Activo):** Es un sistema que posee **objetivos**, **memoria** y **herramientas**. No se limita a responder; **ejecuta acciones** en el entorno digital para cambiar el estado del sistema y acercarse a su objetivo.

La diferencia fundamental es el **bucle de control (Control Loop)**. Mientras un chatbot es lineal (`Input -> LLM -> Output`), un agente opera en un bucle continuo (`Think -> Act -> Observe -> Repeat`) hasta cumplir su misión.

### **# Comparativa Técnica: Chatbot vs Agente**

| Característica | Chatbot Tradicional | Agente Autónomo |
| --- | --- | --- |
| **Flujo** | Unidireccional | Cíclico (ReAct) |
| **Estado** | Sin estado (stateless) | Memoria persistente |
| **Herramientas** | Ninguna o limitadas | Múltiples herramientas invocables |
| **Corrección de errores** | Manual (usuario reprompt) | Auto-corrección basada en feedback |
| **Planificación** | Ninguna | Descomposición de tareas |
| **Ejecución** | Solo genera texto | Ejecuta código real |
| **Supervisión** | Directa (cada interacción) | Semi-autónoma (human-in-the-loop) |

> **ℹ️ Analogía:** Piensa en un chatbot como un **consultor** que te dice qué hacer, mientras que un agente es como un **contratista** que recibe instrucciones, planifica el trabajo, compra materiales y ejecuta la construcción.

### **# Ejemplo Práctico: La Diferencia en Acción**

**Escenario:** Un usuario quiere "encontrar y fixear todos los bugs de performance en mi API"

**Chatbot:**

```
Usuario: "Encuentra y fixea los bugs de performance en mi API"
Chatbot: "Para optimizar tu API, deberías:
1. Revisar las queries N+1
2. Implementar caching
3. Usar índices de base de datos
¿Necesitas que te explique cómo implementar el caching?"

[El usuario debe leer, entender e implementar cada paso manualmente]
```

**Agente:**

```
Usuario: "Encuentra y fixea los bugs de performance en mi API"
Agente: "Entendido. Voy a:
1. Analizar el código de la API
2. Ejecutar pruebas de carga
3. Identificar cuellos de botella
4. Implementar optimizaciones
5. Verificar mejoras
¿Continuar? [S/N]"

[El agente ejecuta cada paso, corrige errores basándose en los resultados reales,
y solo pide confirmación para cambios destructivos]
```

### **3.2. Anatomía de la Arquitectura Cognitiva**

Un agente robusto se compone de cuatro pilares fundamentales. Si imaginas al agente como un ser humano digital:

1. **El Cerebro (LLM):** Es el motor de razonamiento. Modelos como GPT-4o o Claude 3.5 Sonnet son ideales porque han sido entrenados específicamente para *Function Calling* (detectar cuándo llamar a una función y con qué argumentos).

2. **Memoria (Contexto):**

- *Short-term:* El historial de la conversación actual y los pasos intermedios.

- *Long-term:* Bases de datos vectoriales (RAG) para recordar documentación técnica, reglas de negocio o soluciones pasadas.

3. **Planificación (Planner):** La capacidad de descomponer una meta vaga ("Optimiza la base de datos") en pasos ejecutables ("1. Analizar slow queries log", "2. Identificar índices faltantes", "3. Aplicar índices").

4. **Herramientas (Tools):** Los "brazos y manos" del agente. Son funciones de código que el LLM puede invocar.

- `run_terminal_command(cmd)`

- `read_file_content(path)`

- `git_commit(message)`

[Diagrama: Arquitectura de un Agente - Mostrar los 4 componentes interconectados con flechas de flujo de datos]

### **# Ejemplo 1: Implementación Básica de un Agente desde Cero**

Veamos cómo construir un agente simple sin frameworks, para entender la arquitectura fundamental:

```
# basic_agent.py
import json
from openai import OpenAI
from typing import Dict, List, Any

class SimpleAgent:
    """
    Un agente minimalista que implementa el bucle ReAct.
    Este código es educativo - para producción usa frameworks como LangChain.
    """
    def __init__(self, system_prompt: str, tools: Dict[str, callable]):
        self.client = OpenAI()  # Asume OPENAI_API_KEY en entorno
        self.system_prompt = system_prompt
        self.tools = tools  # Dict: {"tool_name": tool_function}
        self.history: List[Dict] = []

    def run(self, user_input: str, max_iterations: int = 10) -> str:
        """Ejecuta el bucle del agente hasta completar la tarea o alcanzar límite."""
        # Inicializar conversación
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": user_input}
        ]

        # Describir herramientas disponibles al LLM
        tools_description = self._describe_tools()
        messages[0]["content"] += f"\n\nHerramientas disponibles:\n{tools_description}"

        iteration = 0
        while iteration < max_iterations:
            iteration += 1

            # 1. PENSAMIENTO: LLM genera respuesta
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                temperature=0
            )

            thought = response.choices[0].message.content
            print(f"\n🧠 Pensamiento {iteration}: {thought}")
            messages.append({"role": "assistant", "content": thought})

            # 2. ACCIÓN: Detectar si quiere usar herramienta
            tool_call = self._parse_tool_call(thought)

            if not tool_call:
                # No detectó llamada a herramienta -> respuesta final
                return thought

            # 3. OBSERVACIÓN: Ejecutar herramienta
            tool_name, tool_args = tool_call

            if tool_name not in self.tools:
                observation = f"Error: Herramienta '{tool_name}' no existe"
            else:
                try:
                    # Ejecutar función real
                    result = self.tools[tool_name](**tool_args)
                    observation = json.dumps(result, indent=2)
                except Exception as e:
                    observation = f"Error ejecutando {tool_name}: {str(e)}"

            print(f"🔧 Acción: {tool_name}({tool_args})")
            print(f"👀 Observación: {observation[:200]}...")  # Truncar para log

            # 4. Retroalimentación: Añadir observación al historial
            messages.append({"role": "user", "content": f"Observation: {observation}"})

        return "Límite de iteraciones alcanzado sin completar tarea"

    def _describe_tools(self) -> str:
        """Genera descripción de herramientas para el LLM"""
        descriptions = []
        for name, func in self.tools.items():
            descriptions.append(f"- {name}: {func.__doc__}")
        return "\n".join(descriptions)

    def _parse_tool_call(self, text: str) -> tuple[str, dict] | None:
        """
        Parsea el output del LLM para detectar llamadas a herramientas.
        Formato esperado: USE_TOOL: tool_name(arg1=value1, arg2=value2)
        """
        if "USE_TOOL:" not in text:
            return None

        # Extraer línea con USE_TOOL
        for line in text.split("\n"):
            if line.strip().startswith("USE_TOOL:"):
                # Parse: USE_TOOL: calculator(operation="add", a=5, b=3)
                tool_spec = line.split("USE_TOOL:")[1].strip()
                tool_name = tool_spec.split("(")[0].strip()

                # Parse argumentos (simplificado - usar librería para producción)
                args_str = tool_spec.split("(")[1].rstrip(")")
                # Esto es básico - mejor usar ast.literal_eval o json
                return tool_name, {}

        return None

# ============= DEFINICIÓN DE HERRAMIENTAS =============

def calculator(operation: str, a: float, b: float) -> dict:
    """Calculadora básica que puede sumar, restar, multiplicar o dividir"""
    operations = {
        "add": a + b,
        "subtract": a - b,
        "multiply": a * b,
        "divide": a / b if b != 0 else "Error: División por cero"
    }
    return {"result": operations.get(operation, "Operación inválida")}

def get_file_size(path: str) -> dict:
    """Obtiene el tamaño de un archivo en bytes"""
    import os
    if not os.path.exists(path):
        return {"error": "Archivo no encontrado"}
    return {"size_bytes": os.path.getsize(path), "path": path}

def current_time() -> dict:
    """Retorna la fecha y hora actual"""
    from datetime import datetime
    return {"timestamp": datetime.now().isoformat()}

# ============= EJECUCIÓN DEL AGENTE =============

if __name__ == "__main__":
    # Configurar agente
    SYSTEM_PROMPT = """
    Eres un agente de IA útil que puede usar herramientas para resolver tareas.
    Cuando necesites usar una herramienta, usa este formato exacto:
    USE_TOOL: tool_name(arg1="value1", arg2="value2")

    Luego analiza el resultado y decide si necesitas más herramientas o si ya puedes responder.
    """

    tools = {
        "calculator": calculator,
        "get_file_size": get_file_size,
        "current_time": current_time
    }

    agent = SimpleAgent(SYSTEM_PROMPT, tools)

    # Probar el agente
    result = agent.run(
        "¿Qué hora es y cuánto es 123 multiplicado por 456?"
    )

    print(f"\n✅ Respuesta final: {result}")
```

Este ejemplo muestra la **esencia de la agenticidad**: un bucle que piensa, actúa, observa y ajusta. Aunque simplificado, contiene los mismos principios que frameworks complejos como LangGraph.

> **⚠️ Warning:** Este código usa parsing de strings simple para detectar llamadas a herramientas. En producción, usa **Structured Outputs** de OpenAI o **Tool Use** de Anthropic, que son APIs nativas y más robustas.

### **3.3. Patrones de Diseño Esenciales: ReAct**

El patrón más famoso y efectivo hoy en día es **ReAct (Reason + Act)**. Permite al modelo "hablarse a sí mismo" antes de actuar, reduciendo alucinaciones.

### **# El Bucle ReAct explicado:**

1. **Pensamiento (Thought):** El agente razona sobre qué hacer. *"El usuario quiere ver el clima de Londres. No sé el clima, necesito buscarlo."*

2. **Acción (Action):** El agente selecciona una herramienta. `weather_api.get("London")`

3. **Observación (Observation):** El agente recibe el output real de la herramienta (no una alucinación). *"La API devolvió: 15°C, Nublado"*

4. **Respuesta Final:** El agente procesa la observación y responde al usuario. *"En Londres hacen 15°C y está nublado."*

### **# Ejemplo 2: Implementación Profesional de ReAct con OpenAI Function Calling**

Ahora veamos cómo implementar ReAct correctamente usando las APIs nativas de **Function Calling** de OpenAI, que son mucho más robustas que el parsing manual de strings:

```
# react_agent_openai.py
import os
from openai import OpenAI
from typing import TypedDict, Annotated
import json

# ============= DEFINICIÓN DE HERRAMIENTAS CON TIPOS =============

class CalculatorInput(TypedDict):
    """Parámetros para la calculadora"""
    operation: Annotated[str, "Operación: 'add', 'subtract', 'multiply', 'divide'"]
    a: Annotated[float, "Primer número"]
    b: Annotated[float, "Segundo número"]

class SearchInput(TypedDict):
    """Parámetros para búsqueda web"""
    query: Annotated[str, "Término de búsqueda"]
    num_results: Annotated[int, "Número de resultados (1-10)"]

def calculator(operation: str, a: float, b: float) -> str:
    """Calculadora que realiza operaciones aritméticas básicas"""
    operations = {
        "add": a + b,
        "subtract": a - b,
        "multiply": a * b,
        "divide": a / b if b != 0 else "Error: División por cero"
    }
    result = operations.get(operation, "Operación inválida")
    return json.dumps({"operation": operation, "result": result})

def web_search(query: str, num_results: int = 5) -> str:
    """
    Busca información en la web.
    NOTA: En producción, aquí conectarías con Tavily, Google Search API, etc.
    Este es un mock para demostración.
    """
    # Mock de resultados de búsqueda
    mock_results = {
        "weather": "La temperatura en Londres es 15°C, nublado",
        "news": "Últimas headlines: La IA agents revolucionan el desarrollo...",
        "tech": "Nuevos frameworks como LangGraph dominan el panorama..."
    }

    key = next((k for k in mock_results if k in query.lower()), None)
    if key:
        return json.dumps({"query": query, "results": [mock_results[key]]})

    return json.dumps({
        "query": query,
        "results": [f"Resultado simulado para: {query}"]
    })

# ============= AGENTE REACT =============

class ReactAgent:
    """Agente que implementa el patrón ReAct usando Function Calling de OpenAI"""

    def __init__(self, model: str = "gpt-4o"):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = model
        self.tools = {
            "calculator": {
                "type": "function",
                "function": {
                    "name": "calculator",
                    "description": "Realiza operaciones matemáticas",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "operation": {
                                "type": "string",
                                "enum": ["add", "subtract", "multiply", "divide"],
                                "description": "Operación a realizar"
                            },
                            "a": {"type": "number", "description": "Primer número"},
                            "b": {"type": "number", "description": "Segundo número"}
                        },
                        "required": ["operation", "a", "b"]
                    }
                }
            },
            "web_search": {
                "type": "function",
                "function": {
                    "name": "web_search",
                    "description": "Busca información en internet",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "query": {
                                "type": "string",
                                "description": "Término a buscar"
                            },
                            "num_results": {
                                "type": "integer",
                                "description": "Número de resultados",
                                "default": 5
                            }
                        },
                        "required": ["query"]
                    }
                }
            }
        }

        self.tool_map = {
            "calculator": calculator,
            "web_search": web_search
        }

    def run(self, user_message: str, max_steps: int = 10) -> str:
        """Ejecuta el bucle ReAct completo"""
        messages = [
            {
                "role": "system",
                "content": """Eres un agente útil que usa el patrón ReAct:
1. Thought: Piensa paso a paso sobre qué hacer
2. Action: Usa una herramienta si es necesario
3. Observation: Analiza el resultado
4. Continue o responde cuando tengas suficiente información

Siempre piensa en voz alta antes de actuar."""
            },
            {"role": "user", "content": user_message}
        ]

        for step in range(max_steps):
            print(f"\n{'='*60}")
            print(f"PASO {step + 1}")
            print(f"{'='*60}")

            # Llamada a la API con herramientas disponibles
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                tools=list(self.tools.values()),
                tool_choice="auto",  # Deja que el modelo decida si usar tools
                temperature=0
            )

            response_message = response.choices[0].message

            # Caso 1: Respuesta directa sin herramientas
            if not response_message.tool_calls:
                print("🤖 Respuesta final del agente:")
                print(response_message.content)
                return response_message.content

            # Caso 2: El modelo quiere usar herramientas
            print(f"🧠 Pensamiento: {response_message.content}")

            # Ejecutar cada tool call (puede haber múltiples en paralelo)
            for tool_call in response_message.tool_calls:
                function_name = tool_call.function.name
                function_args = json.loads(tool_call.function.arguments)

                print(f"🔧 Acción: {function_name}({function_args})")

                # Ejecutar la función
                function_response = self.tool_map[function_name](**function_args)

                print(f"👀 Observación: {function_response[:300]}...")

                # Añadir la respuesta del tool al historial
                messages.append({
                    "tool_call_id": tool_call.id,
                    "role": "tool",
                    "name": function_name,
                    "content": function_response
                })

            # Añadir la respuesta del asistente al historial
            messages.append({"role": "assistant", "content": response_message.content})

        return "Límite de pasos alcanzado"

# ============= EJECUCIÓN =============

if __name__ == "__main__":
    agent = ReactAgent()

    # Ejemplo 1: Tarea simple que requiere una herramienta
    print("\n🎯 TAREA 1: Operación matemática")
    result1 = agent.run("¿Cuánto es 345 multiplicado por 789?")

    # Ejemplo 2: Tarea compleja que requiere múltiples pasos
    print("\n\n🎯 TAREA 2: Búsqueda y cálculo")
    result2 = agent.run(
        "Busca el clima de Londres y luego calcula "
        "cuánto sería 15 más 27"
    )

    # Ejemplo 3: Tarea que requiere razonamiento
    print("\n\n🎯 TAREA 3: Razonamiento multi-paso")
    result3 = agent.run(
        "Si tengo 500 dólares y compro 3 artículos de 75 dólares cada uno, "
        "¿cuánto me sobra? Luego busca qué puedo comprar con el sobrante."
    )
```

**Salida esperada del agente:**

```
🎯 TAREA 1: Operación matemática

============================================================
PASO 1
============================================================
🧠 Pensamiento: El usuario quiere multiplicar 345 por 789. Usaré la calculadora.
🔧 Acción: calculator({'operation': 'multiply', 'a': 345, 'b': 789})
👀 Observación: {"operation": "multiply", "result": 272,205}

============================================================
PASO 2
============================================================
🤖 Respuesta final del agente:
345 multiplicado por 789 es igual a 272,205.
```

> **✅ Best Practice:** Siempre usa **TypedDict** o **Pydantic models** para definir los esquemas de tus herramientas. Esto permite que el LLM entienda exactamente qué parámetros espera cada función y reduce errores de invocación.

### **3.4. Frameworks y Ecosistema 2026**

No necesitas programar el bucle `while` manualmente. Existen frameworks maduros para esto:

- **LangGraph (Python/JS):** La evolución de LangChain. Permite definir agentes como **grafos de estado**. Es ideal para flujos cíclicos complejos donde un agente puede necesitar retroceder o pedir ayuda humana.

- **Microsoft Semantic Kernel:** Muy fuerte en entornos empresariales (.NET/Python). Introduce el concepto de "Planners" que generan planes automáticamente.

- **AutoGen & CrewAI:** Frameworks para **Sistemas Multi-Agente**.

- *Idea clave:* En lugar de un agente "Genio" que lo hace todo, tienes un equipo: Un "Product Manager" desglosa la tarea, un "Developer" escribe el código y un "QA Engineer" lo revisa. Los agentes conversan entre ellos para resolver la tarea.

### **# Ejemplo 3: Agente con LangGraph (Estado del Arte 2026)**

LangGraph es hoy el framework más avanzado para agentes porque modela el flujo como un **grafo de estado finito**, permitiendo ciclos, condicionales y ramificaciones complejas.

```
# langgraph_agent.py
# Instalación: pip install langgraph langchain-openai langchain-community

import os
from typing import TypedDict, Annotated, Literal
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage

# ============= ESTADO DEL AGENTE =============

class AgentState(TypedDict):
    """El estado persiste mientras el agente ejecuta su bucle"""
    messages: Annotated[list, "Historial de mensajes"]
    next_step: Annotated[str, "Próximo paso a ejecutar"]
    iterations: Annotated[int, "Contador de iteraciones"]

# ============= DEFINICIÓN DE HERRAMIENTAS =============

@tool
def read_file(path: str) -> str:
    """Lee el contenido de un archivo del sistema de archivos"""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error leyendo archivo: {e}"

@tool
def write_file(path: str, content: str) -> str:
    """Escribe contenido en un archivo"""
    try:
        # Crear directorios si no existen
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        return f"Archivo escrito exitosamente: {path}"
    except Exception as e:
        return f"Error escribiendo archivo: {e}"

@tool
def list_files(directory: str = ".") -> str:
    """Lista archivos en un directorio"""
    try:
        files = os.listdir(directory)
        return "\n".join(files)
    except Exception as e:
        return f"Error listando directorio: {e}"

@tool
def run_python_code(code: str) -> str:
    """
    Ejecuta código Python y retorna el output.
    ⚠️ PELIGROSO: Solo usar en entornos sandboxed
    """
    try:
        import subprocess
        result = subprocess.run(
            ['python', '-c', code],
            capture_output=True,
            text=True,
            timeout=10
        )
        return f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"
    except Exception as e:
        return f"Error ejecutando código: {e}"

tools = [read_file, write_file, list_files, run_python_code]

# ============= NODOS DEL GRAFO =============

def should_continue(state: AgentState) -> Literal["tools", END]:
    """Decide si continuar o terminar"""
    messages = state["messages"]
    last_message = messages[-1]

    # Si el último mensaje tiene tool_calls, ir a tools
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"

    # Si no, terminar
    return END

def call_model(state: AgentState):
    """Nodo que invoca al LLM"""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

# ============= CONFIGURACIÓN DEL AGENTE =============

# Inicializar el modelo con herramientas
llm = ChatOpenAI(model="gpt-4o", temperature=0)
llm_with_tools = llm.bind_tools(tools)

# Crear el grafo
workflow = StateGraph(AgentState)

# Añadir nodos
workflow.add_node("agent", call_model)
workflow.add_node("tools", ToolNode(tools))

# Punto de entrada
workflow.set_entry_point("agent")

# Añadir bordes (condicionales)
workflow.add_conditional_edges(
    "agent",
    should_continue,
    {
        "tools": "tools",
        END: END
    }
)

# Los tools siempre vuelven al agent
workflow.add_edge("tools", "agent")

# Compilar el grafo
app = workflow.compile()

# ============= EJECUCIÓN DEL AGENTE =============

if __name__ == "__main__":
    print("🤖 Agente LangGraph iniciado")
    print("="*60)

    # Tarea: Crear un script de Python que sume números
    initial_state = {
        "messages": [
            HumanMessage(content=(
                "Crea un archivo llamado 'sumador.py' que contenga "
                "una función sumar(a, b) que retorne la suma. "
                "Luego ejecútalo para verificar que 5 + 3 = 8."
            ))
        ],
        "next_step": "start",
        "iterations": 0
    }

    # Ejecutar el agente
    print("\n🎯 TAREA: Crear y verificar script de suma\n")
    result = app.invoke(initial_state)

    # Mostrar resultado final
    print("\n" + "="*60)
    print("✅ RESULTADO FINAL:")
    print("="*60)
    final_message = result["messages"][-1]
    print(final_message.content)

    # Mostrar trace completo
    print("\n📋 TRACE COMPLETO:")
    print("="*60)
    for i, msg in enumerate(result["messages"]):
        print(f"\n[Paso {i}] {type(msg).__name__}: {msg.content[:200]}")
        if hasattr(msg, "tool_calls") and msg.tool_calls:
            print(f"   → Tool calls: {[tc['name'] for tc in msg.tool_calls]}")
```

**Salida esperada:**

```
🤖 Agente LangGraph iniciado
============================================================

🎯 TAREA: Crear y verificar script de suma

[Paso 0] HumanMessage: Crea un archivo llamado 'sumador.py'...
   → Agent decide: Usar herramienta write_file

[Paso 1] ToolMessage: Archivo escrito exitosamente: sumador.py

[Paso 2] AIMessage: Ahora voy a ejecutar el script...
   → Agent decide: Usar herramienta run_python_code

[Paso 3] ToolMessage: STDOUT: (vacío) STDERR: ... (verificación)

[Paso 4] AIMessage: Voy a verificar correctamente...

============================================================
✅ RESULTADO FINAL:
============================================================
He creado el archivo 'sumador.py' con la función sumar(a, b).
Al ejecutar el código de prueba que suma 5 + 3, el resultado es 8,
lo que verifica que la función funciona correctamente.
```

> **💡 Pro Tip:** LangGraph shine en escenarios donde necesitas **memoria a largo plazo** y **toma de decisiones compleja**. Puedes persistir el estado del agente en Redis o PostgreSQL, permitiendo que un agente "duerma" y continúe días después.

### **# Comparativa de Frameworks (Enero 2026)**

| Framework | Mejor Para | Curva de Aprendizaje | Ecosistema |
| --- | --- | --- | --- |
| **LangGraph** | Flujos complejos, estado persistente | Media | 🔥🔥🔥🔥🔥 |
| **AutoGen** | Multi-agent systems | Alta | 🔥🔥🔥🔥 |
| **CrewAI** | Equipos de agentes especializados | Media | 🔥🔥🔥 |
| **Semantic Kernel** | Empresas .NET/Python | Media | 🔥🔥🔥 |
| **LlamaIndex Agents** | RAG + Agentes | Baja | 🔥🔥🔥🔥 |

### **3.5. Casos de Uso Reales en Ingeniería**

1. **Scaffolding Inteligente:**

- *Prompt:* "Crea un proyecto Next.js con Tailwind, configura una base de datos Postgres en Docker y crea un endpoint de autenticación".

- *Agente:* Crea carpetas -> Escribe `package.json` -> Instala dependencias -> Escribe `docker-compose.yml` -> Verifica que levante.

2. **Refactoring Autónomo:**

- Le das acceso a un repo legacy: "Migra todos los componentes de clase a funcionales en `/src`".

- El agente itera archivo por archivo, corre los tests unitarios tras cada cambio y si fallan, se auto-corrige.

### **# Ejemplo 4: Agente de Code Review Autónomo**

Este agente revisa Pull Requests automáticamente, buscando bugs, problemas de seguridad y malas prácticas:

```
# code_review_agent.py
"""
Agente que revisa código automáticamente buscando:
- Bugs comunes
- Problemas de seguridad
- Malas prácticas
- Incumplimiento de estándares de estilo
"""

import os
import re
from openai import OpenAI
from typing import List, Dict
from dataclasses import dataclass

@dataclass
class ReviewIssue:
    """Representa un problema encontrado en el código"""
    severity: str  # "critical", "high", "medium", "low"
    category: str  # "security", "bug", "style", "performance"
    line_number: int
    description: str
    suggestion: str

class CodeReviewAgent:
    """Agente especializado en revisión de código"""

    def __init__(self):
        self.client = OpenAI()
        self.security_patterns = {
            # SQL Injection patterns
            r'execute\([^)]*\+[^)]*\)': "Posible SQL Injection - concatenación de strings",
            r'query\([^)]*f"[^"]*\{[^}]*\}': "Posible SQL Injection - f-string con input de usuario",

            # Hardcoded secrets
            r'api_key\s*=\s*["\'][\w-]+["\']': "API key harcodeada en el código",
            r'password\s*=\s*["\'][\w]+["\']': "Password harcodeada en el código",
            r'token\s*=\s*["\'][\w.-]+["\']': "Token harcodeado",

            # Command injection
            r'subprocess\.(run|call|Popen)\([^)]*shell=True[^)]*\)': "Peligro: shell=True permite inyección de comandos",
            r'os\.system\([^)]*\)': "Peligro: os.system es vulnerable a inyección de comandos",

            # Debug prints
            r'^\s*print\([^)]*\)': "Print statement dejado en código de producción",

            # Missing error handling
            r'except:\s*pass': "Except pass vacío - oculta todos los errores",
            r'except\s*Exception': "Demasiado genérico - captura toda excepción",
        }

        self.bug_patterns = {
            r'if\s+\w+\s*==\s*None': "Usar 'is None' en lugar de '== None'",
            r'if\s+\w+\s*!=\s*None': "Usar 'is not None' en lugar de '!= None'",
            r'for\s+\w+\s+in\s+range\(len\([^)]+\)\):': "Iteración ineficiente - usar enumerate()",
            r'list\(dict\.keys\(\)\)': "Ineficiente - iterar dict directamente",
        }

    def review_file(self, file_path: str) -> List[ReviewIssue]:
        """Revisa un archivo completo y retorna lista de issues"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.split('\n')
        except Exception as e:
            return [ReviewIssue(
                severity="high",
                category="file",
                line_number=0,
                description=f"No se pudo leer el archivo: {e}",
                suggestion="Verifica que el archivo existe y es accesible"
            )]

        issues = []

        # Revisión con patrones regex (rápida)
        issues.extend(self._regex_review(content, lines))

        # Revisión profunda con LLM (más lenta pero más inteligente)
        issues.extend(self._llm_deep_review(content, file_path))

        return sorted(issues, key=lambda x: self._severity_score(x.severity), reverse=True)

    def _regex_review(self, content: str, lines: List[str]) -> List[ReviewIssue]:
        """Revisión rápida usando expresiones regulares"""
        issues = []
        all_patterns = {**self.security_patterns, **self.bug_patterns}

        for pattern, description in all_patterns.items():
            for match in re.finditer(pattern, content, re.MULTILINE):
                line_num = content[:match.start()].count('\n') + 1

                # Determinar severidad
                if "security" in description or "Peligro" in description:
                    severity = "critical"
                elif "Ineficiente" in description or "hardcodeada" in description:
                    severity = "medium"
                else:
                    severity = "low"

                issues.append(ReviewIssue(
                    severity=severity,
                    category="security" if "security" in description.lower() else "code_quality",
                    line_number=line_num,
                    description=description,
                    suggestion=self._get_suggestion(description)
                ))

        return issues

    def _llm_deep_review(self, content: str, file_path: str) -> List[ReviewIssue]:
        """Revisión profunda usando GPT-4 para encontrar bugs complejos"""
        # Solo revisar archivos .py
        if not file_path.endswith('.py'):
            return []

        system_prompt = """Eres un experto en revisión de código Python.
Analiza el código buscando:
1. Bugs lógicos
2. Race conditions
3. Memory leaks
4. Problemas de concurrencia
5. Violaciones de principios SOLID
6. Código duplicado

Retorna TU respuesta ÚNICAMENTE en este formato JSON:
[
  {
    "severity": "critical|high|medium|low",
    "category": "bug|security|performance|style",
    "line_number": 123,
    "description": "Descripción clara del problema",
    "suggestion": "Sugerencia concreta de cómo arreglarlo"
  }
]

Si no encuentras problemas graves, retorna una lista vacía: []"""

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Archivo: {file_path}\n\nCódigo:\n{content[:5000]}"}
                ],
                temperature=0,
                response_format={"type": "json_object"}
            )

            import json
            issues_data = json.loads(response.choices[0].message.content)
            issues = [ReviewIssue(**issue) for issue in issues_data]
            return issues

        except Exception as e:
            print(f"Error en revisión LLM: {e}")
            return []

    def _get_suggestion(self, description: str) -> str:
        """Genera sugerencia basada en la descripción"""
        suggestions = {
            "SQL Injection": "Usa parámetros preparados o un ORM",
            "hardcodeada": "Usa variables de entorno o un vault",
            "shell=True": "Evita shell=True o sanitiza inputs exhaustivamente",
            "os.system": "Usa subprocess.run() sin shell=True",
            "is None": "Usar 'is None' es más Pythonico",
            "range(len(": "Usar enumerate() es más legible",
            "Except pass": "Añade manejo de error o logging mínimo"
        }

        for key, suggestion in suggestions.items():
            if key in description:
                return suggestion

        return "Revisa la documentación de mejores prácticas"

    def _severity_score(self, severity: str) -> int:
        """Retorna puntaje numérico para ordenar"""
        scores = {"critical": 4, "high": 3, "medium": 2, "low": 1}
        return scores.get(severity, 0)

    def generate_report(self, issues: List[ReviewIssue], file_path: str) -> str:
        """Genera un reporte legible"""
        if not issues:
            return f"✅ {file_path}: No se encontraron problemas graves"

        report = f"\n{'='*70}\n"
        report += f"📋 REVISIÓN DE CÓDIGO: {file_path}\n"
        report += f"{'='*70}\n"
        report += f"Total de issues: {len(issues)}\n\n"

        # Agrupar por severidad
        for severity in ["critical", "high", "medium", "low"]:
            severity_issues = [i for i in issues if i.severity == severity]
            if not severity_issues:
                continue

            icon = {"critical": "🚨", "high": "⚠️", "medium": "⚡", "low": "💡"}
            report += f"{icon[severity]} {severity.upper()} ({len(severity_issues)})\n"
            report += f"{'-'*70}\n"

            for issue in severity_issues:
                report += f"  Línea {issue.line_number} [{issue.category}]\n"
                report += f"  📌 {issue.description}\n"
                report += f"  💡 Sugerencia: {issue.suggestion}\n\n"

        return report

# ============= EJECUCIÓN =============

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Uso: python code_review_agent.py <archivo_o_directorio>")
        sys.exit(1)

    agent = CodeReviewAgent()
    target = sys.argv[1]

    if os.path.isfile(target):
        # Revisar un solo archivo
        issues = agent.review_file(target)
        print(agent.generate_report(issues, target))
    else:
        # Revisar todos los archivos Python en un directorio
        all_issues = []
        for root, dirs, files in os.walk(target):
            for file in files:
                if file.endswith('.py'):
                    file_path = os.path.join(root, file)
                    print(f"Revisando: {file_path}")
                    issues = agent.review_file(file_path)
                    all_issues.extend(issues)
                    print(agent.generate_report(issues, file_path))

        # Resumen global
        critical = sum(1 for i in all_issues if i.severity == "critical")
        high = sum(1 for i in all_issues if i.severity == "high")
        print(f"\n{'='*70}")
        print(f"📊 RESUMEN GLOBAL")
        print(f"{'='*70}")
        print(f"🚨 Críticos: {critical}")
        print(f"⚠️  Altos: {high}")
        print(f"⚡ Medios: {sum(1 for i in all_issues if i.severity == 'medium')}")
        print(f"💡 Bajos: {sum(1 for i in all_issues if i.severity == 'low')}")
```

**Uso práctico:**

```
# Revisar un archivo
python code_review_agent.py mi_app.py

# Revisar todo un proyecto
python code_review_agent.py src/
```

Este agente combina **dos enfoques**:

1. **Revisión rápida con regex**: Detecta patrones conocidos de bugs y seguridad

2. **Revisión profunda con LLM**: Analiza la lógica y encuentra bugs complejos

> **✅ Mejor práctica:** Para producción, integra este agente en tu CI/CD pipeline. Puede automáticamente comentar en los PRs de GitHub/GitLab con los issues encontrados.

### **3.6. Gestión de Memoria y Contexto**

Uno de los mayores desafíos en Agentic AI es la **gestión eficiente de la memoria**. Los agentes necesitan recordar conversaciones pasadas, decisiones tomadas y resultados de acciones anteriores.

### **# Tipos de Memoria en Agentes**

1. **Memoria a Corto Plazo (Short-term):**

- Historial de conversación actual

- Variables de estado durante la ejecución

- Almacenada en el objeto `messages` del agente

2. **Memoria a Largo Plazo (Long-term):**

- Bases de datos vectoriales (RAG)

- Redis para caché rápida

- PostgreSQL para persistencia estructurada

3. **Memoria Episódica:**

- Registro de "experiencias" pasadas

- Lecciones aprendidas de ejecuciones anteriores

- Permite que el agente "aprenda" de sus errores

### **# Ejemplo 5: Agente con Memoria Persistente usando Redis**

```
# memory_agent.py
"""
Agente con memoria persistente usando Redis.
Recuerda conversaciones pasadas y decisiones tomadas.
"""

import json
import os
from datetime import datetime
from typing import List, Dict, Any
from openai import OpenAI
import redis

class PersistentMemoryAgent:
    """Agente con memoria a largo plazo usando Redis"""

    def __init__(self, agent_id: str, redis_host: str = "localhost"):
        self.client = OpenAI()
        self.agent_id = agent_id

        # Conectar a Redis para persistencia
        try:
            self.redis_client = redis.Redis(
                host=redis_host,
                port=6379,
                decode_responses=True
            )
            self.redis_client.ping()
            print(f"✅ Conectado a Redis - Agente: {agent_id}")
        except:
            print("⚠️ Redis no disponible - usando memoria volátil")
            self.redis_client = None

    def _get_memory_key(self) -> str:
        """Retorna la key de Redis para este agente"""
        return f"agent:{self.agent_id}:memory"

    def _get_episodes_key(self) -> str:
        """Retorna la key para episodios pasados"""
        return f"agent:{self.agent_id}:episodes"

    def save_conversation(self, user_message: str, agent_response: str, metadata: Dict = None):
        """Guarda la conversación en memoria"""
        conversation = {
            "timestamp": datetime.now().isoformat(),
            "user_message": user_message,
            "agent_response": agent_response,
            "metadata": metadata or {}
        }

        if self.redis_client:
            # Guardar en Redis list (mantiene orden)
            key = self._get_memory_key()
            self.redis_client.lpush(key, json.dumps(conversation))
            # Mantener solo últimas 50 conversaciones
            self.redis_client.ltrim(key, 0, 49)
        else:
            # Fallback a memoria local
            if not hasattr(self, '_local_memory'):
                self._local_memory = []
            self._local_memory.append(conversation)

    def save_episode(self, task: str, actions: List[Dict], outcome: str, lessons_learned: str):
        """
        Guarda un "episodio" completo: tarea realizada, acciones, resultado y lecciones
        Esto permite que el agente "aprenda" de experiencias pasadas
        """
        episode = {
            "timestamp": datetime.now().isoformat(),
            "task": task,
            "actions": actions,
            "outcome": outcome,  # "success" | "failure" | "partial"
            "lessons_learned": lessons_learned
        }

        if self.redis_client:
            key = self._get_episodes_key()
            self.redis_client.lpush(key, json.dumps(episode))
            # Mantener últimos 100 episodios
            self.redis_client.ltrim(key, 0, 99)
        else:
            if not hasattr(self, '_local_episodes'):
                self._local_episodes = []
            self._local_episodes.append(episode)

    def recall_relevant_episodes(self, current_task: str, top_k: int = 3) -> List[Dict]:
        """Recupera episodios pasados relevantes para la tarea actual"""
        if not self.redis_client:
            if hasattr(self, '_local_episodes'):
                return self._local_episodes[:top_k]
            return []

        # Recuperar episodios de Redis
        key = self._get_episodes_key()
        episodes_data = self.redis_client.lrange(key, 0, -1)

        if not episodes_data:
            return []

        episodes = [json.loads(ep) for ep in episodes_data]

        # Buscar similitud simple por palabras clave
        # (En producción, usar embeddings y búsqueda vectorial)
        relevant = []
        task_words = set(current_task.lower().split())

        for episode in episodes:
            episode_words = set(episode['task'].lower().split())
            overlap = len(task_words & episode_words)
            if overlap > 0:  # Si hay al menos una palabra en común
                relevant.append((episode, overlap))

        # Ordenar por relevancia y retornar top_k
        relevant.sort(key=lambda x: x[1], reverse=True)
        return [ep[0] for ep in relevant[:top_k]]

    def run_with_memory(self, user_message: str) -> str:
        """Ejecuta el agente usando memoria de conversaciones pasadas"""
        # 1. Recuperar historial de conversaciones recientes
        conversation_history = self._get_recent_conversations(num=5)

        # 2. Recuperar episodios relevantes
        relevant_episodes = self.recall_relevant_episodes(user_message)

        # 3. Construir contexto enriquecido
        system_prompt = """Eres un asistente IA útil con memoria persistente.
Puedes recordar conversaciones previas y aprendizajes de tareas pasadas.
Usa esta información para proporcionar respuestas más contextualizadas."""

        messages = [{"role": "system", "content": system_prompt}]

        # Añadir episodios relevantes como contexto
        if relevant_episodes:
            episodes_context = "\n\n".join([
                f"Tarea previa: {ep['task']}\n"
                f"Resultado: {ep['outcome']}\n"
                f"Lección: {ep['lessons_learned']}"
                for ep in relevant_episodes[:2]  # Solo los 2 más relevantes
            ])
            messages.append({
                "role": "system",
                "content": f"Experiencias relevantes previas:\n{episodes_context}"
            })

        # Añadir historial de conversación
        for conv in conversation_history:
            messages.append({"role": "user", "content": conv['user_message']})
            messages.append({"role": "assistant", "content": conv['agent_response']})

        # Mensaje actual
        messages.append({"role": "user", "content": user_message})

        # 4. Generar respuesta
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7
        )

        agent_response = response.choices[0].message.content

        # 5. Guardar esta conversación
        self.save_conversation(user_message, agent_response)

        return agent_response

    def _get_recent_conversations(self, num: int = 5) -> List[Dict]:
        """Recupera las últimas N conversaciones"""
        if not self.redis_client:
            if hasattr(self, '_local_memory'):
                return self._local_memory[-num:]
            return []

        key = self._get_memory_key()
        conversations_data = self.redis_client.lrange(key, 0, num - 1)
        return [json.loads(conv) for conv in conversations_data]

# ============= EJEMPLO DE USO =============

if __name__ == "__main__":
    # Crear agente con ID único
    agent = PersistentMemoryAgent(agent_id="dev_assistant_1")

    print("=" * 70)
    print("🤖 Agente con Memoria Persistente")
    print("=" * 70)

    # Primera interacción
    print("\n📝 Interacción 1:")
    response1 = agent.run_with_memory(
        "Necesito crear una API REST con FastAPI. ¿Qué pasos debo seguir?"
    )
    print(f"Respuesta: {response1[:200]}...")

    # Guardar episodio de lo aprendido
    agent.save_episode(
        task="Crear API REST con FastAPI",
        actions=["fastapi install", "create main.py", "define routes"],
        outcome="success",
        lessons_learned="FastAPI es excelente para APIs rápidas. Recuerda instalar uvicorn."
    )

    # Segunda interacción (el agente recordará lo anterior)
    print("\n📝 Interacción 2:")
    response2 = agent.run_with_memory(
        "Ahora quiero agregar autenticación JWT a la API que mencionamos"
    )
    print(f"Respuesta: {response2[:200]}...")

    # Tercera interacción sobre un tema similar
    print("\n📝 Interacción 3:")
    response3 = agent.run_with_memory(
        "¿Recuerdas qué framework usamos para la API? Quiero crear otra"
    )
    print(f"Respuesta: {response3}")

    print("\n✅ El agente ha recordado el contexto de las interacciones previas")
```

**Beneficios de la memoria persistente:**

1. **Conversación natural:** El agente recuerda lo que habló anteriormente

2. **Aprendizaje continuo:** Cada interacción mejora las futuras respuestas

3. **Personalización:** El agente aprende preferencias del usuario

4. **Eficiencia:** Reutiliza soluciones de problemas previos

> **💡 Pro Tip:** Para sistemas de producción, considera usar **ChromaDB** o **Pinecone** para búsqueda vectorial semántica en lugar de búsqueda por palabras clave como en este ejemplo simplificado.

### **3.7. Multi-Agent Systems: El Poder de la Especialización**

En lugar de un solo agente "todopoderoso", los **sistemas multi-agente** dividen responsabilidades, imitando equipos de trabajo humanos.

### **# Ejemplo 6: Equipo de Desarrollo Multi-Agente con AutoGen**

```
# multi_agent_team.py
# Instalación: pip install pyautogen

import os
from autogen import AssistantAgent, UserProxyAgent, config_list_from_json

# Configuración del modelo LLM
config_list = config_list_from_json(
    env_or_file="OAI_CONFIG_LIST",  # Archivo con API keys
    filter_dict={"model": ["gpt-4o"]}
)

# ============= DEFINICIÓN DE AGENTES =============

class DevelopmentTeam:
    """Sistema multi-agente que imita un equipo de desarrollo"""

    def __init__(self):
        # 1. Product Manager: Planifica y desglosa tareas
        self.pm_agent = AssistantAgent(
            name="Product_Manager",
            system_message="""Eres el Product Manager de un equipo de desarrollo.
Tu rol es:
- Entender los requisitos del usuario
- Desglosar tareas complejas en subtareas manejables
- Priorizar qué hacer primero
- Comunicarte claramente con el equipo técnico

Siempre empieza analizando el problema completo antes de delegar.""",
            llm_config={"config_list": config_list, "temperature": 0}
        )

        # 2. Senior Developer: Escribe el código
        self.developer_agent = AssistantAgent(
            name="Senior_Developer",
            system_message="""Eres un Desarrollador Senior especialista en Python y mejores prácticas.
Tu rol es:
- Escribir código limpio, documentado y testeable
- Seguir estándares de la industria (PEP 8, SOLID)
- Considerar edge cases y errores
- Añadir type hints y docstrings

Escribe código que funcione y sea mantenible.""",
            llm_config={"config_list": config_list, "temperature": 0.2}
        )

        # 3. QA Engineer: Revisa y prueba el código
        self.qa_agent = AssistantAgent(
            name="QA_Engineer",
            system_message="""Eres un QA Engineer experto en testing y calidad de código.
Tu rol es:
- Revisar el código buscando bugs
- Proponer casos de prueba edge cases
- Verificar que el código sigue las especificaciones
- Sugerir mejoras de performance y seguridad

Sé crítico pero constructivo. Si encuentras problemas, sé específico.""",
            llm_config={"config_list": config_list, "temperature": 0.3}
        )

        # 4. Usuario: Interactúa con el equipo
        self.user_proxy = UserProxyAgent(
            name="user",
            human_input_mode="NEVER",  # Modo automático
            max_consecutive_auto_reply=10,
            code_execution_config={
                "work_dir": "generated_code",
                "use_docker": False  # ⚠️ True para mayor seguridad
            }
        )

    def execute_task(self, task_description: str) -> str:
        """Ejecuta una tarea usando el equipo multi-agente"""

        print("\n" + "="*70)
        print("🚀 INICIANDO EQUIPO DE DESARROLLO MULTI-AGENTE")
        print("="*70)
        print(f"📋 Tarea: {task_description}\n")

        # Flujo de trabajo: PM → Developer → QA → Iteración si necesario

        # Paso 1: PM analiza y planifica
        print("📊 FASE 1: Planificación (Product Manager)")
        planning_prompt = f"""
Como Product Manager, analiza esta tarea:
{task_description}

Por favor:
1. Identifica los componentes principales necesarios
2. Desglosa en subtareas específicas
3. Identifica posibles riesgos o dependencias
4. Propón un orden de ejecución

Comunica tu plan al Senior Developer.
"""

        self.user_proxy.initiate_chat(
            self.pm_agent,
            message=planning_prompt
        )

        # Paso 2: Developer implementa
        print("\n💻 FASE 2: Implementación (Senior Developer)")
        dev_prompt = f"""
Basado en el plan del Product Manager, implementa la solución:
- Escribe código Python completo y funcional
- Incluye manejo de errores
- Añade documentación
- Crea ejemplos de uso

Muestra el código al QA Engineer para revisión.
"""

        self.user_proxy.initiate_chat(
            self.developer_agent,
            message=dev_prompt
        )

        # Paso 3: QA revisa
        print("\n🔍 FASE 3: Revisión (QA Engineer)")
        qa_prompt = """
Revisa el código implementado:
- ¿Funciona correctamente?
- ¿Hay bugs o edge cases no considerados?
- ¿Es seguro?
- ¿Es eficiente?

Propone mejoras si es necesario, o apruébalo si está bien.
"""

        self.user_proxy.initiate_chat(
            self.qa_agent,
            message=qa_prompt
        )

        print("\n" + "="*70)
        print("✅ EQUIPO MULTI-AGENTE HA COMPLETADO LA TAREA")
        print("="*70)

        return "Tarea completada por el equipo multi-agente"

# ============= EJECUCIÓN =============

if __name__ == "__main__":
    team = DevelopmentTeam()

    # Tarea ejemplo: Crear un gestor de tareas
    result = team.execute_task("""
    Crea un sistema de gestión de tareas (Todo List) en Python con:
    - Capacidad de agregar, marcar como completada y listar tareas
    - Persistencia en archivo JSON
    - Manejo de errores robusto
    - Tests unitarios básicos
    """)

    print("\n📁 Revisa el directorio 'generated_code/' para ver el código generado")
```

**Ventajas de los sistemas multi-agente:**

1. **Especialización:** Cada agente es experto en su dominio

2. **Simulación de equipo:** Reproduce dinámicas de trabajo real

3. **Mejor calidad:** El QA revisa críticamente lo que escribe el Developer

4. **Escalabilidad:** Fácil añadir nuevos roles (DevOps, Designer, etc.)

[Diagrama: Flujo multi-agente mostrando PM → Developer → QA → Iteración]

## 4. Preguntas Frecuentes (FAQ)

### **1. ¿Cuál es la diferencia real entre un Plugin de ChatGPT y un Agente?**

Los plugins son herramientas pasivas que ChatGPT usa puntualmente para obtener información adicional. Funcionan bajo demanda: el usuario pide algo, el modelo invoca el plugin una vez, recibe la respuesta y genera su output. Es un flujo unidireccional y de único uso.

Un Agente, en cambio, tiene un **bucle de vida autónomo**, mantiene un **estado persistente** y persigue un **objetivo complejo** que puede requerir docenas de pasos iterativos. Mientras un plugin es una "herramienta" que el modelo usa, un agente es un "sistema" que planifica, ejecuta, observa errores, se autocorrige y decide continuamente qué hacer next. El agente puede usar múltiples herramientas en secuencia, aprender de sus fallos y adaptar su estrategia en tiempo real.

**Ejemplo práctico:**

- **Plugin:** "¿Qué clima hace en Londres?" → Plugin del clima → Un solo llamado API → Respuesta

- **Agente:** "Organiza un viaje a Londres considerando clima, vuelos, hoteles y presupuesto" → 50+ iteraciones comparando opciones, reajustando según restricciones, optimizando itinerario → Plan completo

### **2. ¿Son peligrosos los agentes con acceso a terminal?**

**Sí, extremadamente peligrosos si no se implementan las salvaguardas adecuadas.** Un agente mal instruido o con un prompt mal diseñado podría ejecutar comandos destructivos como `rm -rf /`, borrar bases de datos, subir claves privadas a repositorios públicos, o abrir brechas de seguridad.

**Medidas de seguridad esenciales:**

1. **Sandboxing obligatorio:** Ejecutar agentes siempre en entornos aislados como contenedores Docker efímeros, máquinas virtuales, o entornos cloud temporales (AWS Temporary Credentials)

2. **Human-in-the-loop (HITL):** Requerir confirmación humana explícita para cualquier acción destructiva o irreversible. Ejemplo:

```
   if action.is_destructive():
       response = request_human_approval(action)
       if not response.approved:
           return "Acción cancelada por humano"
```

3. **Principio de mínimo privilegio:** El agente solo debe tener los permisos estrictamente necesarios. Nunca darle acceso de root o administrador.

4. **Auditoría y logging:** Registrar cada comando ejecutado, cada archivo modificado y cada herramienta invocada.

5. **Rate limiting:** Limitar el número de acciones por minuto para evitar bucles infinitos que consuman recursos.

6. **Testing en staging:** Nunca ejecutar un agente nuevo directamente en producción sin probarlo exhaustivamente en entornos de desarrollo.

### **3. ¿Cuánto cuesta correr un agente autónomo en producción?**

El costo puede variar dramáticamente según la complejidad de la tarea y el modelo utilizado. Un bucle ReAct que se equivoca y reintenta 10 veces puede consumir **10x más tokens** que una simple llamada a la API.

**Desglose de costos aproximados (Enero 2026):**

| Modelo | Costo/1M tokens (input) | Costo/1M tokens (output) | Uso recomendado |
| --- | --- | --- | --- |
| GPT-4o | $2.50 | $10.00 | Tareas complejas, razonamiento |
| GPT-4o-mini | $0.15 | $0.60 | Tareas repetitivas, subtareas |
| Claude 3.5 Sonnet | $3.00 | $15.00 | Código y análisis profundo |
| Llama-3-70b (local) | $0 | $0 | Privacidad máxima, costo GPU |

**Estrategias para optimizar costos:**

- **Enfoque cascada:** Usa modelos pequeños (GPT-4o-mini) para tareas simples y solo invoca modelos grandes para decisiones complejas

- **Caché inteligente:** Cachea resultados de herramientas costosas (búsquedas web, llamadas API)

- **Modelos locales:** Para tareas repetitivas que no requieren razonamiento de punta, usa modelos locales con Ollama

- **Limitar iteraciones:** Establece un máximo de iteraciones (ej: `max_steps=15`) para evitar bucles infinitos

**Ejemplo real:** Un agente de code review que analiza 10 archivos podría costar $0.50-$2.00 dependiendo del modelo y la profundidad del análisis.

### **4. ¿Puedo correr agentes 100% locales sin enviar datos a la nube?**

**Absolutamente.** Usando **Ollama** con modelos open-source de alta calidad como `Llama-3-70b-Instruct` o `Mixtral-8x7b`, puedes tener agentes de codificación muy competentes completamente offline. Esto es crítico para empresas que manejan datos sensibles, código propietario o tienen requisitos de compliance estrictos (GDPR, HIPAA, etc.).

**Ventajas de agentes locales:**

- **Privacidad total:** Los datos nunca salen de tu infraestructura

- **Costo cero de API:** Solo pagas el costo del hardware (GPU)

- **Latencia mínima:** Sin viajes de red a servidores externos

- **Personalización:** Puedes fine-tunear modelos con tus propios datos

**Desventajas:**

- **Requiere hardware GPU:** Necesitas al menos una GPU con 16GB VRAM para Llama-3-70b

- **Modelos slightly menos capaces:** Los modelos open-source están muy cerca, pero GPT-4o sigue siendo superior en razonamiento complejo

**Ejemplo de configuración local:**

```
from langchain.llms import Ollama

# Usar Llama-3-70b localmente
llm = Ollama(model="llama3:70b")

# Agente LangChain con modelo local
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)
```

Frameworks como **LangChain**, **LangGraph** y **LlamaIndex** soportan Ollama nativamente, por lo que puedes usar los mismos códigos de los ejemplos de este artículo, solo cambiando la inicialización del LLM.

### **5. ¿Reemplazarán los agentes a los desarrolladores Junior?**

**Más que reemplazarlos, redefinán su rol fundamentalmente.** El desarrollador Junior del futuro pasará mucho menos tiempo escribiendo código boilerplate y mucho más tiempo **revisando, orquestando y arquitecturando** el trabajo de los agentes.

**El nuevo rol del Junior:**

1. **Code Reviewer especializado:** Revisar y validar el código generado por agentes

2. **Orchestrator:** Conectar múltiples agentes y flujos de trabajo

3. **Prompt Engineer:** Diseñar prompts efectivos y herramientas para agentes

4. **QA en tiempo real:** Probar el código generado y reportar bugs

5. **Arquitectura:** Entender el sistema completo y cómo encajan las piezas

**Habilidades que serán MÁS importantes:**

- Comprensión profunda de arquitectura de software

- Capacidad de analizar y validar código ajeno

- Conocimiento de patrones de diseño y mejores prácticas

- Habilidad para desglosar problemas complejos

- Pensamiento crítico para evaluar outputs de IA

**Habilidades que serán MENOS importantes:**

- Memorización de sintaxis (ya que el agente la provee)

- Escritura rápida de código boilerplate

- Búsqueda manual en documentación

En resumen, el bar se ha elevado. El Junior que antes escribía funciones simples ahora necesita entender sistemas completos. Los desarrolladores que se adapten a esta nueva realidad serán **10x más productivos**, mientras que los que se resistan quedarán obsoletos.

### **6. ¿Cómo puedo monitorizar y debuggear un agente cuando falla?**

El debugging de agentes es significativamente más complejo que el debugging tradicional porque el fallo puede estar en múltiples lugares: el prompt, la herramienta, el parsing de la respuesta, la lógica del bucle, etc.

**Best practices para debugging de agentes:**

1. **Logging exhaustivo:** Registra cada paso del bucle ReAct:

```
   logger.info(f"Step {iteration}: Thought={thought}, Action={action}, Observation={observation}")
```

2. **Tracing con herramientas especializadas:** Usa **LangSmith** (de LangChain) o **Weights & Biases** para visualizar el flujo completo de ejecución, ver cada herramienta invocada y los inputs/outputs.

3. **Modo verbose:** Activa `verbose=True` en tus agentes para ver cada decisión internamente.

4.  **snapshots de estado:** Guarda el estado del agente en cada iteración para poder reproducir errores.

5. **Unit testing de herramientas:** Prueba cada herramienta independientemente del agente:

```
   def test_calculator_tool():
       result = calculator(operation="add", a=5, b=3)
       assert result == 8
```

6. **Prompt tracing:** Guarda el prompt exacto enviado al LLM y la respuesta recibida para identificar problemas de "alucinación" o mala comprensión.

7. **Métricas de rendimiento:** Monitorea:

- Número de iteraciones por tarea

- Tiempo total de ejecución

- Costo en tokens

- Tasa de errores por herramienta

8. **Human-in-the-loop debugging:** Modo donde el agente se pausa después de cada acción y pregunta "¿Continuar?" para inspección manual.

### **7. ¿Qué sucede cuando un agente entra en un bucle infinito?**

Es uno de los problemas más comunes y peligrosos en Agentic AI. Un agente puede entrar en un bucle cuando:

- No logra completar una tarea y reintenta infinitamente

- Se obsesiona con un enfoque que no funciona

- La herramienta siempre falla pero el agente no cambia de estrategia

**Estrategias para prevenir bucles infinitos:**

1. **Límite estricto de iteraciones:**

```
   for iteration in range(max_iterations):  # ej: max_iterations=15
       # ... bucle del agente
```

2. **Detector de repetición:** Detectar si el agente está repitiendo las mismas acciones:

```
   recent_actions = [action for action in history[-5:]]
   if len(set(recent_actions)) == 1:  # Misma acción 5 veces
       return "Error: Agente en bucle detectado"
```

3. **Deterioro de puntuación:** Si la "recompensa" o "progreso" no mejora tras N iteraciones, forzar un cambio de estrategia.

4. **Timeout global:** Establecer un timeout absoluto (ej: 5 minutos) más allá del cual el agente se detiene inevitablemente.

5. **Checkpoint y rollback:** Guardar el mejor resultado intermedio y si el agente no mejora tras X iteraciones, volver al checkpoint.

6. **Human escalation:** Si tras N iteraciones no hay progreso, escalar a humano con el contexto completo:

```
   if iteration > 10 and not has_made_progress():
       escalate_to_human(context=full_state)
       return "Esperando intervención humana"
```

## 5. Takeaways Clave (Resumen Ejecutivo)

1. 🎯 **Agentic AI = LLM + Memoria + Herramientas + Planificación:** Los agentes no son solo chatbots más listos; son sistemas con autonomía, objetivos y capacidad de ejecutar acciones reales en el entorno digital.

2. 🎯 **El patrón ReAct es la base:** El ciclo "Thought → Action → Observation" permite a la IA razonar, actuar, observar resultados y autocorregirse, reduciendo dramáticamente las alucinaciones.

3. 🎯 **Los frameworks maduros facilitan la implementación:** LangGraph, AutoGen y CrewAI abstraen la complejidad de implementar bucles de control, permitiéndote focarte en definir las herramientas y el objetivo del agente.

4. 🎯 **La seguridad es crítica:** Nunca des acceso sin supervisión a un agente. Siempre usa sandboxing (Docker), límite de iteraciones, y confirmación humana para acciones destructivas.

5. 🎯 **Multi-agent systems superan a agentes individuales:** Dividir responsabilidades entre agentes especializados (PM, Developer, QA) produce resultados de mayor calidad que un único agente "todopoderoso".

## 6. Conclusión

La era de la Agentic AI nos invita a convertirnos en **"Arquitectos de Agentes"**. Ya no solo escribimos el código que ejecuta la lógica de negocio, ahora escribimos los prompts y las herramientas que permitirán a la IA escribir esa lógica por nosotros.

El futuro inmediato no es una IA que lo hace todo mágicamente, sino una colaboración híbrida donde el humano define el **"Qué"** (Estrategia) y el Agente se encarga del **"Cómo"** (Ejecución táctica), eliminando la fricción de las tareas repetitivas y permitiéndonos focar en lo que realmente importa: la creatividad, la arquitectura y la resolución de problemas complejos.

### **Perspectiva Futura: Hacia dónde vamos en 2026-2027**

**Lo que viene en el horizonte cercano:**

1. **Agentes Autónomos con Memoria Episódica:** Agentes que no solo recuerdan conversaciones, sino que "aprenden" de cada tarea, construyendo una base de conocimientos propia basada en experiencia real.

2. **Agentes Multi-Modal Avanzados:** Agentes que pueden ver (visión artificial), escuchar (audio), navegar la web y ejecutar código, permitiendo automatizar flujos de trabajo verdaderamente end-to-end.

3. **Agentes como Microservicios:** Arquitecturas donde cada microservicio es un agente especializado, comunicándose entre sí para resolver problemas empresariales complejos.

4. **Mejoras Dramáticas en Costos:** La competencia entre OpenAI, Anthropic, Meta y Google reducirá los costos de la IA agéntica por un factor de 10-20x en 2026, haciéndola accesible para startups y desarrolladores individuales.

5. **Regulación y Estándares de Seguridad:** Emergerán estándares industriales (similar a OWASP para seguridad web) específicos para seguridad de agentes, incluyendo certificaciones y auditorías obligatorias.

**El llamado a la acción:**

No esperes a que la Agentic AI sea "perfecta". Empieza hoy. Construye tu primer agente, experimenta con LangGraph, falla rápido, aprende. Los desarrolladores que dominen estos paradigmas en 2026 tendrán una ventaja competitiva enorme en el mercado laboral.

El futuro pertenece a quienes sepan orquestar la inteligencia, no solo a quienes sepan escribir código.

## 7. Recursos Adicionales

### **Documentación Oficial**

- [LangGraph Documentation](https://python.langchain.com/docs/langgraph) - Guía completa del framework de agentes más avanzado del ecosistema

- [Microsoft AutoGen](https://microsoft.github.io/autogen/) - Framework para sistemas multi-agente de Microsoft

- [CrewAI Documentation](https://docs.crewai.com/) - Framework para crear equipos de agentes especializados

- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling) - Documentación oficial de la API que permite a los modelos invocar herramientas

- [Anthropic Tool Use](https://docs.anthropic.com/claude/docs/tool-use) - Guía de herramientas de Claude 3.5 Sonnet

### **Papers Académicos Fundacionales**

- [ReAct: Synergizing Reasoning and Acting in Language Models (ICLR 2023)](https://arxiv.org/abs/2210.03629) - El paper seminal que introdujo el patrón ReAct

- [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366) - Agentes que aprenden de errores pasados

- [Communicative Agents for Software Development (AutoGen)](https://arxiv.org/abs/2308.08155) - Paper base de AutoGen sobre multi-agent systems

### **Cursos y Tutoriales**

- [AI Agents in LangGraph (DeepLearning.AI - Free)](https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/) - Curso gratuito de 1 hora sobre agentes con memoria

- [LangChain: Agents](https://python.langchain.com/docs/modules/agents/) - Tutorial oficial de agentes en LangChain

- [Awesome AI Agents (GitHub)](https://github.com/e2b-dev/awesome-ai-agents) - Curación de recursos, papers y proyectos sobre agentes IA

### **Herramientas Mencionadas**

- [Ollama](https://ollama.ai/) - Ejecuta modelos LLM localmente (Llama 3, Mistral, etc.)

- [Tavily AI](https://tavily.com/) - API de búsqueda optimizada para agentes IA

- [LangSmith](https://smith.langchain.com/) - Plataforma de debugging y tracing para agentes

- [ChromaDB](https://www.trychroma.com/) - Base de datos vectorial para memoria a largo plazo de agentes

- [Docker](https://www.docker.com/) - Para sandboxing y aislamiento de agentes

### **Comunidades**

- [LangChain Discord](https://discord.gg/langchain) - Comunidad activa de desarrolladores de agentes

- [r/LocalLLaMA on Reddit](https://reddit.com/r/LocalLLaMA) - Agentes y modelos locales

- [AI Agents Discord](https://discord.gg/ai-agents) - Servidor dedicado a sistemas multi-agente

## 8. Ruta de Aprendizaje (Siguientes Pasos)

Para continuar tu viaje en el mundo de la Agentic AI, te recomiendo seguir esta ruta progresiva:

### **Nivel 1: Fundamentos Prácticos**

**Objetivo:** Construir tu primer agente funcional con herramientas reales

- **Proyecto:** Crea un script en Python que use la API de OpenAI para "chatear" con tu propia base de datos SQL

- Implementa text-to-SQL usando Function Calling

- Añade herramientas para: `execute_query()`, `get_table_schema()`, `list_tables()`

- Maneja errores de SQL gracefully y permite que el agente se autocorrija

- **Tiempo estimado:** 3-5 horas

- **Lo que aprenderás:** Function Calling, herramientas básicas, manejo de errores

### **Nivel 2: Agentes con Memoria y Búsqueda**

**Objetivo:** Agregar memoria persistente y capacidad de investigación web

- **Proyecto:** Implementa un agente con `LangGraph` que investiga y resume noticias

- Integra Tavily Search API para búsqueda web en tiempo real

- Añade memoria usando ChromaDB (guarda búsquedas previas)

- Implementa un sistema de "aprendizaje": el agente guarda qué fuentes son confiables

- Crea un workflow donde el agente busca, filtra, resume y genera un reporte

- **Tiempo estimado:** 6-8 horas

- **Lo que aprenderás:** Memoria vectorial, grafos de estado, orquestación compleja

### **Nivel 3: Sistemas Multi-Agente**

**Objetivo:** Construir equipos de agentes especializados que colaboren

- **Proyecto:** Agencia de marketing automatizada con `CrewAI`

- **Agente Investigador:** Busca tendencias y competencia en redes sociales

- **Agente Estratega:** Define el ángulo y tono de la campaña basado en la investigación

- **Agente Creador:** Escribe posts, artículos y copy para ads

- **Agente QA:** Revisa el contenido contra guías de estilo y compliance

- Implementa un pipeline donde los agentes conversan y se retroalimentan

- **Tiempo estimado:** 10-15 horas

- **Lo que aprenderás:** Multi-agent orchestration, roles especializados, colaboración entre agentes

### **Nivel 4: Producción y Escalabilidad (Avanzado)**

**Objetivo:** Desplegar agentes en producción con monitoreo y optimización

- **Proyecto:** Sistema de code review automatizado para tu empresa

- Intégralo con GitHub/GitLab webhooks

- Implementa análisis profundo de código (seguridad, performance, patrones)

- Añade auto-mejora: el agente aprende de las correcciones que aceptas/rechazas

- Despliega como microservicio con Docker y Kubernetes

- Monitorea con LangSmith y crea dashboards de rendimiento

- Optimiza costos usando modelos pequeños para tareas simples

- **Tiempo estimado:** 20-30 horas

- **Lo que aprenderás:** Deployment, monitoring, optimización de costos, CI/CD con IA

## 9. Challenge Práctico

🔥 **Reto Semanal: "Agente de Limpieza de Archivos Inteligente"**

Pon a prueba lo aprendido construyendo un agente útil que puedes usar en tu vida diaria.

### **Objetivo**

Escribe un programa en Python que automatice la organización de archivos usando Agentic AI.

### **Requisitos Funcionales**

**Mínimo Viable (MVP):**

1. **Análisis de directorio:**

- El agente recibe una ruta de carpeta (ej: `~/Downloads` o `~/Desktop`)

- Lista todos los archivos y sus metadatos (nombre, extensión, tamaño, fecha de modificación)

2. **Planificación inteligente:**

- El agente analiza los archivos y propone una estructura de carpetas lógica

- Ejemplo de categorías: `/Imágenes`, `/Documentos`, `/Instaladores`, `/Código`, `/Comprimidos`

- Debe explicar su criterio de clasificación

3. **Human-in-the-loop:**

- **CRÍTICO:** Antes de mover un solo archivo, el agente debe imprimir el plan completo

- Espera confirmación explícita del usuario: "¿Proceder? [S/N]"

- Si el usuario rechaza, debe permitir modificar el plan

4. **Ejecución segura:**

- Mueve los archivos a sus nuevas ubicaciones

- Crea un log de todas las operaciones realizadas

- Maneja errores gracefully (ej: archivo ya existe en destino)

**Bonus Features (para avanzados):**

- 🎯 **Aprendizaje:** Guarda las preferencias del usuario en un archivo JSON (ej: "siempre mover .psd a /Design" en lugar de /Imágenes)

- 🎯 **Detección de duplicados:** Antes de mover, busca archivos duplicados por hash y pregunta qué hacer

- 🎯 **Modo reversible:** Crea un script "undo.sh" que deshaga todos los movimientos si algo sale mal

- 🎯 **Interfaz web:** Simple UI con Streamlit para seleccionar la carpeta y ver el plan visualmente

### **Stack Sugerido**

```
# Dependencias
pip install openai langchain langchain-community langchain-openai

# Opcional para interfaz web
pip install streamlit
```

### **Estructura de Código Sugerida**

```
# file_organizer_agent.py

import os
import shutil
from pathlib import Path
from openai import OpenAI

class FileOrganizerAgent:
    def __init__(self, target_folder: str):
        self.target_folder = Path(target_folder)
        self.client = OpenAI()

    def analyze_files(self):
        """Escanea la carpeta y retorna metadatos de archivos"""
        # Tu implementación aquí
        pass

    def create_plan(self, files_metadata):
        """Usa GPT-4 para crear un plan de organización"""
        # Usa Function Calling para estructurar el plan
        pass

    def present_plan_to_user(self, plan):
        """Muestra el plan y pide confirmación"""
        print("📋 PLAN DE ORGANIZACIÓN:")
        print(plan)
        return input("\n¿Proceder? [S/N]: ").strip().lower() == 's'

    def execute_plan(self, plan):
        """Ejecuta el movimiento de archivos"""
        # Implementa con safeguards
        pass

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Uso: python file_organizer_agent.py <ruta_carpeta>")
        sys.exit(1)

    agent = FileOrganizerAgent(sys.argv[1])
    agent.run()
```

### **Criterios de Éxito**

✅ El agente clasifica correctamente al menos 80% de los archivos

✅ Siempre pide confirmación antes de mover (sin excepciones)

✅ Maneja errores sin crashear (permisos, archivos en uso, etc.)

✅ Genera un log claro de las operaciones realizadas

✅ El código es limpio y sigue PEP 8

### **Tiempo Estimado**

- **MVP:** 2-3 horas

- **Con bonus features:** 5-8 horas

### **Comparte tu Progreso**

Cuando termines, comparte tu código en:

- GitHub con el hashtag `#AgenticAIChallenge`

- Comentarios abajo con tu experiencia

- Discord de LangChain para feedback de la comunidad

**Los 3 mejores proyectos (código limpio, features creativas, buen uso de agentes) serán mencionados en mi próximo artículo.** ¡Buena suerte! 🚀
