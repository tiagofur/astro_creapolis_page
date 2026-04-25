# 📄 PRD: Subscription Guardian (The Sentinel)

## 1. Visión del Producto
**Subscription Guardian** es una utilidad premium para iOS diseñada para eliminar la "fatiga de suscripciones". A diferencia de apps bancarias complejas, esta app se centra en la **notificación preventiva activa**. Su valor radica en dar al usuario el tiempo necesario para cancelar un servicio antes de que ocurra el próximo débito automático.

## 2. Público Objetivo
- Usuarios con múltiples servicios digitales (Streaming, SaaS, Gym).
- Personas que buscan simplificar sus finanzas sin compartir sus credenciales bancarias.
- "Indie hackers" y profesionales que prueban muchas herramientas.

## 3. Características Core (MVP+)

### A. Registro de Suscripciones (CERO Fricción)
- **Presets Inteligentes:** Selección rápida de servicios populares (Netflix, Disney+, Spotify, etc.) con sus logos y colores oficiales mediante SF Symbols o assets locales.
- **Campos:** Nombre, Monto, Moneda, Fecha de Próximo Pago, Ciclo (Mensual/Semanal/Anual), Categoría.
- **Notas:** Espacio para anotar "Cancelar después de ver X serie".

### B. El Sistema "Sentinel" (Notificaciones)
- **Alerta T-48h:** Notificación 2 días antes del cobro.
- **Alerta T-24h:** Segunda notificación con botón de "Marcar como cancelado".
- **Critical Alerts:** Notificaciones persistentes para montos grandes (+ $50 USD).

### C. Visualización y Analytics
- **Dashboard "Burn Rate":** Cuánto dinero se está "quemando" por mes y por año con gráficos de dona dinámicos.
- **Gestión Avanzada:** Búsqueda inteligente, filtros de estado ("Activas", "Sin uso") y ordenamiento por precio, fecha o nombre.
- **Transparencia en Cancelaciones:** Las suscripciones canceladas se mantienen visibles pero con estilo "strikethrough" y opacidad reducida para mantener el historial sin ruido visual.
- **Cronología:** Vista de lista ordenada por proximidad de cobro.

### D. Sync y Privacidad
- **iCloud Native Sync:** Sincronización automática entre dispositivos usando SwiftData + CloudKit (Sin login, sin servidores externos).
- **FaceID/TouchID Lock:** Protección de datos financieros con biometría nativa.

## 4. Arquitectura Técnica
- **Framework:** SwiftUI (Declarative UI).
- **Persistencia:** SwiftData (Schema V1).
- **Sincronización:** CloudKit (Silencioso y gratuito).
- **Notificaciones:** `UserNotifications` framework con `UNNotificationRequest` dinámicos.
- **Widgets:** `WidgetKit` para mostrar el próximo cobro en el Lock Screen y Home Screen.

## 5. Diseño y Estética
- **Dark Mode First:** Diseño elegante, oscuro, con acentos en colores vibrantes según la categoría.
- **SF Symbols 6:** Uso extensivo de iconos nativos para una sensación de integración total con iOS.
- **Micro-interacciones:** Haptics (vibración táctil) al confirmar un pago o añadir una suscripción.

## 6. Hoja de Ruta de Implementación (7 Días)
- **Día 1:** Modelado de Datos y Configuración de CloudKit.
- **Día 2:** Lógica de CRUD (Crear, Leer, Actualizar, Borrar) y UI de Lista.
- **Día 3:** Motor de Notificaciones Locales y Programación Dinámica.
- **Día 4:** Diseño de Dashboard y Pantalla de Estadísticas.
- **Día 5:** Implementación de Widgets y Siri Shortcuts.
- **Día 6:** Seguridad (FaceID) y Testing de casos de borde (ej: años bisiestos).
- **Día 7:** Generación de Material de Marketing y App Store Connect.
