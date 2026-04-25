# 🛡️ Project Master Hub: Subscription Guardian

## 1. Identidad del Producto
- **Nombre:** Subscription Guardian (The Sentinel)
- **Tagline:** "Cancelá antes de que te cobren."
- **Propuesta de Valor:** Recuperar el control financiero eliminando los cobros automáticos no deseados mediante alertas proactivas nativas.
- **Monetización:** Pago único ($1.99) - "One-time purchase for a lifetime of savings".

## 2. Arquitectura de la Solución (The Stack)
- **UI:** SwiftUI (Modular & Reactive).
- **Persistencia:** SwiftData (Local-first).
- **Sincronización:** iCloud / CloudKit (Native, Zero-cost, Privacy-focused).
- **Notificaciones:** Local Notification Engine (Sin servidores, funciona offline).

## 3. Estado Actual del Proyecto
- **Fase:** 🏗️ Construcción de Core.
- **Progreso Global:** 35%
- **Último Hito:** Implementación del Modelo de Datos y el Dashboard Principal.

## 4. Directorio de Recursos
- **Documentación:**
    - [[PRD.md]]: Requisitos y visión.
    - [[Technical_Spec.md]]: Detalles técnicos y lógica de negocio.
- **Código Fuente (src/):**
    - `Models/Subscription.swift`: Esquema de datos.
    - `Services/NotificationManager.swift`: Lógica de alertas.
    - `Views/DashboardView.swift`: Interfaz principal.

## 5. Próximos Pasos Inmediatos
1. Implementar el Formulario de Carga (Add/Edit View).
2. Conectar la lógica de guardado con el Programador de Notificaciones.
3. Crear el componente de "Configuración" para FaceID.

---
*Este documento es el punto de entrada principal para el desarrollo. Mantener actualizado.*
