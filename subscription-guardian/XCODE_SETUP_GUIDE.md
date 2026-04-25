# 🛠️ Guía de Configuración en Xcode: Subscription Guardian

Seguí estos pasos para convertir el código que generamos en una app real en tu Mac.

## 1. Crear el Proyecto
1. Abrí **Xcode** -> **File** -> **New** -> **Project...**
2. Seleccioná **iOS** -> **App**.
3. **Product Name:** `SubscriptionGuardian`
4. **Interface:** `SwiftUI`
5. **Language:** `Swift`
6. **Storage:** `SwiftData` (Marcá esta opción, es CLAVE).
7. Guardalo en tu carpeta de trabajo.

## 2. Limpiar e Importar Código
1. En el navegador de archivos de Xcode (izquierda), borrá los archivos que creó Xcode por defecto: `ContentView.swift` y `SubscriptionGuardianApp.swift` (o el que tenga el nombre de la app).
2. Arrastrá la carpeta `src/` que creamos en la wiki directamente al proyecto de Xcode.
3. Cuando te pregunte, marcá **"Copy items if needed"** y **"Create groups"**.

## 3. Configurar Permisos (Info.plist)
Para que FaceID funcione, tenés que pedir permiso al usuario:
1. En Xcode, seleccioná el proyecto arriba de todo.
2. Andá a la pestaña **Info**.
3. Agregá una nueva línea (botón +) con la clave:
   - `Privacy - Face ID Usage Description`
   - **Value:** "Protegé tus datos financieros con seguridad biométrica."

## 4. Configurar iCloud y Background Modes
1. Andá a la pestaña **Signing & Capabilities**.
2. Tocá el botón **+ Capability**.
3. Buscá y agregá **iCloud**.
    - Marcá **CloudKit**.
    - Tocá el botón **+** en Containers y creá uno (ej: `iCloud.com.tuNombre.SubscriptionGuardian`).
4. Tocá de nuevo **+ Capability** y agregá **Background Modes**.
    - Marcá **Remote notifications**.
    - Marcá **Background fetch**.

## 5. Agregar el Widget (Fase 3)
1. En Xcode: **File** -> **New** -> **Target...**
2. Buscá **Widget Extension**.
3. **Product Name:** `SubscriptionGuardianWidget`
4. **IMPORTANTE:** Desmarcá "Include Configuration Intent" (queremos un widget estático por ahora).
5. Borrá el código que Xcode pone por defecto en el archivo del widget y pegá el contenido de `src/Widgets/NextPaymentWidget.swift`.

## 6. ¡Correr la App! 🚀
1. Seleccioná un Simulador (ej: iPhone 15) o tu iPhone real.
2. Dale al botón **Play** (Cmd + R).

---
**Nota del Arquitecto:** Si Xcode te tira errores de "Missing Module", asegurate de que todos los archivos tengan marcado el "Target Membership" correcto en el panel derecho de Xcode.
