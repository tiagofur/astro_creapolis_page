# 🛠️ Especificación Técnica: Subscription Guardian

## 1. El Modelo de Datos (SwiftData)

Para habilitar CloudKit, el modelo debe cumplir con ciertas restricciones (todos los campos opcionales o con valores por defecto).

```swift
import Foundation
import SwiftData

@Model
final class Subscription {
    @Attribute(.unique) var id: UUID = UUID()
    var name: String = ""
    var amount: Double = 0.0
    var currencySymbol: String = "$"
    var startDate: Date = Date()
    var nextBillingDate: Date = Date()
    var billingCycle: String = "Monthly" // Opciones: "Weekly", "Monthly", "Yearly"
    var category: String = "Entertainment"
    var colorHex: String = "#007AFF" // Color asociado al servicio
    var notes: String = ""
    var isEnabled: Bool = true // Para pausar notificaciones sin borrar
    
    init(name: String, amount: Double, nextBillingDate: Date, billingCycle: String) {
        self.name = name
        self.amount = amount
        self.nextBillingDate = nextBillingDate
        self.billingCycle = billingCycle
    }
}
```

## 2. Lógica de Notificaciones (The Sentinel Engine)

Las notificaciones deben ser locales para no depender de un servidor.

### Reglas:
1. Al crear/editar una suscripción, se cancelan las notificaciones previas para ese `id`.
2. Se programan dos nuevas:
    - **Trigger A:** `nextBillingDate - 48 hours`.
    - **Trigger B:** `nextBillingDate - 24 hours`.
3. El contenido debe ser dinámico: `"Mañana se cobran \(amount) de \(name). ¿Seguís usando este servicio?"`.

## 3. Lógica de Recurrencia

Cuando el usuario marca un pago como "Realizado" o pasa la fecha:
- Si es "Monthly": `nextBillingDate = Calendar.current.date(byAdding: .month, value: 1, to: nextBillingDate)`.
- Si es "Yearly": `nextBillingDate = Calendar.current.date(byAdding: .year, value: 1, to: nextBillingDate)`.
- Importante: Mantener el día del mes original si es posible (ej: siempre los 15).

## 4. Configuración de iCloud (CloudKit)

Para que funcione, en Xcode debemos:
1. Añadir el Capability **iCloud**.
2. Marcar **CloudKit** y crear un container `iCloud.com.tuservicio.SubscriptionGuardian`.
3. Añadir el Capability **Background Modes** -> **Remote notifications**.
4. SwiftData detectará esto automáticamente si usamos `ModelContainer` sin configuraciones manuales pesadas.

## 5. Estructura de Archivos Recomendada
```text
/SubscriptionGuardian
  /Models
    - Subscription.swift
  /Views
    - DashboardView.swift
    - SubscriptionListView.swift
    - AddEditSubscriptionView.swift
    - Components (Custom Cells, Buttons)
  /Services
    - NotificationManager.swift
    - StatisticsCalculator.swift
  /Resources
    - Assets.xcassets
    - Localizable.strings
```
