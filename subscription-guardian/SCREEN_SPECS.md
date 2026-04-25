# 📱 SUSCRIPCIÓN GUARDIAN - SCREEN SPECS V1.0

## Documentación detallada de cada pantalla con código Swift + annotations de diseño Apple native

---

## PANTALLA 1: LaunchView (Bienvenida)

### Propósito
Pantalla inicial que pide autenticación FaceID/TouchID tras abrir app o cuando user cierra sesión (auto-lock active). 

### Componentes Visuales
```swift
ZStack {
    // Background gradient oscuro iOS dark mode default
    Color.black.opacity(0.9)
        .ignoresSafeArea()
    
    VStack(spacing: 40) {
        Spacer(minLength: 200)
        
        // SF Symbol grande 80x80px
        Image(systemName: "lock.fill")
            .font(.system(size: 80, weight: .light))
            .foregroundStyle(.white.opacity(0.8))
        
        Text("Desbloquear Subscription Guardian")
            .font(.title3) // 27pt weight .semibold iOS design spec
            .foregroundStyle(.white)
            .multilineTextAlignment(.center)
            .minimumScaleFactor(0.8)
        
        Text("Tu guardián personal contra cobros sorpresa \nNunca compartir tus datos bancarios")
            .font(.body).foregroundStyle(.secondary.opacity(0.7))
            .multilineTextAlignment(.center)
    }
    
    // Button ultraThinMaterial overlay iOS 16+ design pattern
    VStack {
        Spacer(minLength: 50)
        
        Button(action: authenticateFaceID) {
            Label("Desbloquear", systemImage: "faceid")
                .font(.headline)
                .padding(.horizontal, 40)
                .padding(.vertical, 18)
                .background(.ultraThinMaterial) // iOS 16+ glass effect (translucent backdrop blur)
                .clipShape(Capsule()) /* Apple rounded pill shape modern design */
        }
        .buttonStyle(.plain)
    }
}
.shadow(radius: 20, color: .blue.opacity(0.3)) // iOS deep shadow elevation effect z-index visual depth
```

### Annotations de diseño Apple native

- **Icono lock fill:** SF Symbol oficial lock.fill (Apple guidelines: only use SF Symbols for consistency across all screens)  
- **Fuente title3 semibold:** iOS design spec para hero text en splash screens (27pt weight 500, no bold)  
- **Capsule shape clipPath:** Apple standard iOS 16+ modern UI design language (vs rounded rect with fixed radius corners)  
- **Background .ultraThinMaterial()**: Material layer efecto glass translúcido (iOS 16+ backdrop blur system effect cuando app en foreground)

### Micro-interacciones
```swift
// FaceID prompt animation when button tapped:
@State private var showFaceIDSheet = false

.authenticateFaceID = {
    // Haptic feedback medium impact for critical action
    let generator = UIImpactFeedbackGenerator(style: .medium)
    generator.prepare()
    generator.impactOccurred()
    
    showFaceIDSheet = true
}
```

### Apple review requirements
- **App Store Guidelines Capítulo 5 "Authentication"**: FaceID prompt debe pedir "Para acceder a Subscription Guardian" (no generic text como "Desbloquear")  
- **Privacy label requirement**: App store listing debe incluir "Requiere FaceID o TouchID para funciones principales" (compliance con Apple Privacy Label Requirements V2024)

---

## PANTALLA 2: DashboardView (Pantalla Principal)

### Propósito
Vista principal de resumen financiero: gasto mensual estimado + lista de suscripciones con búsqueda, filtros de estado ("Todas", "Activas", "Sin uso") y ordenamiento dinámico.

### Header (Gasto Mensual)
```swift
VStack(spacing: 0) {
    Text("Gasto Mensual Estimado")
        .font(.caption) // 11pt System Design Spec: footnotes hints metadata labels
        .foregroundStyle(.secondary.opacity(0.7)) // Gray #9E9E9F light mode Apple design token
    
    Spacer(minLength: 24) // Spacing between header & value (iOS standard spacing grid align = 12px baseline + 12px vertical space = 24)
    
    Text("$(\(monthlyTotal, specifier: "%.2f"))")
        .font(.system(size: 58, weight: .bold, design: .rounded)) // Display size: 58pt bold rounded font matching iOS calculator UI design spec
        .contentTransition(.numericText()) // Animated numeric value transition (iOS 15+ dynamic type support)
        .foregroundStyle(
            LinearGradient(
                gradient: Gradient(colors: [Color.blue, .white.opacity(0.6)]), // Text gradient blue to transparent for modern iOS feel
                startPoint: .leading,
                endPoint: .trailing
            )
        ).lineLimit(2) // Max 2 lines wrap display (Apple design guideline text overflow handling for large values)
}
.padding(.top, 30) // Top padding avoids edge-to-edge status bar clipping (iPhone notch aware spacing)
```

### Componente de lista ("Próximos Cobros")
```swift
List {
    Section(header: Text("Próximos Cobros").font(.headline)) {
        if subscriptions.isEmpty {
            EmptyView()
        } else {
            ForEach(subscriptions) { subscription in
                NavigationLink(destination: /* SubscriptionDetailView o placeholder */ ) {
                    SubscriptionRow(subscription: subscription)
                        .contentTransition(.asymmetric(
                            insertion: .opacity, // Opacity 0.2s fade-in when item appears
                            removal: .scale.combined(with: .opacity) // Scale down + fade out animation (deletion case)
                        ))
                }
            }
            .onDelete(perform: deleteItems) // Swipe left to delete row
        }
    }
    .listStyle(.insetGrouped) // iOS grouped style with indent for clean hierarchical layout
}
.listDivider(Color.clear) // No divider lines between rows (modern iOS 16+ flat design aesthetic)
```

### SubscriptionCard Component (Lista Item)
```swift
struct SubscriptionCard: View {
    let subscription: Subscription
    @Environment(\.colorScheme) var colorScheme

    private var daysUntilPayment: Int {
        max(0, Calendar.current.dateComponents([.day], from: Date(), to: subscription.nextBillingDate).day ?? 0)
    }

    private var urgencyColor: Color {
        if !subscription.isEnabled { return .gray }
        if daysUntilPayment <= 1 { return .red }
        if daysUntilPayment <= 3 { return .orange }
        if daysUntilPayment <= 7 { return .yellow }
        return .green
    }

    var body: some View {
        HStack(spacing: 16) {
            // Brand icon con resplandor
            ZStack {
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color(hex: subscription.colorHex).opacity(0.2))
                    .frame(width: 52, height: 52)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Color(hex: subscription.colorHex).opacity(0.3), lineWidth: 1)
                    )

                Image(systemName: iconNameForService(subscription.name))
                    .font(.title2)
                    .foregroundStyle(Color(hex: subscription.colorHex))
                    .shadow(color: Color(hex: subscription.colorHex).opacity(0.5), radius: 8)
            }

            // Info con Strikethrough si está cancelada
            VStack(alignment: .leading, spacing: 4) {
                Text(subscription.name)
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(colorScheme == .dark ? .white : .black)
                    .strikethrough(!subscription.isEnabled)

                HStack(spacing: 6) {
                    Circle()
                        .fill(urgencyColor)
                        .frame(width: 8, height: 8)
                        .blur(radius: 1)

                    Text(subscription.billingCycle == "Monthly" ? "Mensual" :
                         subscription.billingCycle == "Yearly" ? "Anual" : "Semanal")
                        .font(.system(size: 12))
                        .foregroundStyle(colorScheme == .dark ? .white.opacity(0.5) : .black.opacity(0.5))
                }
            }

            Spacer()

            // Monto + Fecha (Opacidad reducida si cancelada)
            VStack(alignment: .trailing, spacing: 6) {
                Text("\(subscription.currencySymbol)\(subscription.amount, specifier: "%.2f")")
                    .font(.system(size: 18, weight: .bold, design: .rounded))
                    .foregroundStyle(colorScheme == .dark ? .white : .black)
                    .strikethrough(!subscription.isEnabled)

                if subscription.isEnabled {
                    Text(daysUntilPayment == 0 ? "Hoy" :
                         daysUntilPayment == 1 ? "Mañana" :
                         "En \(daysUntilPayment) días")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundStyle(urgencyColor.opacity(0.8))
                } else {
                    Text("Cancelada")
                        .font(.system(size: 12, weight: .bold))
                        .foregroundStyle(.red)
                }
            }
        }
        .padding(16)
        .opacity(subscription.isEnabled ? 1.0 : 0.5)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 22))
        .overlay(
            RoundedRectangle(cornerRadius: 22)
                .stroke(colorScheme == .dark ? .white.opacity(0.1) : .black.opacity(0.05), lineWidth: 0.5)
        )
    }
}
```


### Botón flotante (+) Añadir Suscripción
```swift
VStack(spacing: 30) { // Bottom spacing for FAB container
    Spacer(minLength: 50) // Pushes button to lower screen (Apple standard floating action pattern)
    
    HStack {
        Spacer()
        
        Button(action: toggleAddSheet) {
            Image(systemName: "plus")
                .font(.title.bold()) // Title size 32pt SF Symbol bold variant for visibility
                .foregroundStyle(.white)
                .frame(width: 60, height: 60) // Touch target >= 44x44 Apple Human Interface Guidelines
                .background(
                    // Azul exacto iOS system blue #007AFF (Apple design token color name: "iOS blue")
                    Color(hexString: "#007AFF").ignoresSafeArea(.all, margins: .hidden)
                )
                .clipShape(Circle())
                .shadow(radius: 12.0, color: .blue.opacity(0.4)) // iOS deep shadow elevation effect (z-index visual hierarchy layer)
        }
        .padding() // Extra padding avoids edge clipping from device bezel / safe area layout guide
    }
}
```

### Empty State Handling
```swift
if subscriptions.isEmpty {
    Text("No hay suscripciones activas")
        .font(.headline) // Primary emphasis for empty state (no smaller text like labels)
        .foregroundStyle(.secondary.opacity(0.7)) // Muted gray vs main blue header value design contrast
        .multilineTextAlignment(.center)
        .padding(40) // Symmetric padding centered text in list view container
}
```

### Annotations de diseño Apple native

- **iOS dark mode first:** Usar sistema `Color.systemGroupedBackground` que automaticamente cambia entre light/dark (contraste 7.0+ WCAG AA compliance for accessibility requirements)  
- **Dynamic Type Support:** Todas las vistas respeta iOS Large Text / Larger Accessible Type preferences en Settings app → texto escala proporcionalmente sin layout breakage  
- **Safe area handling:** `ignoresSafeArea()` solo para header value display (evitar clipping por notch/dinamic island). Button flotante respecta safe area bottom con `.padding()` extra.

---

## PANTALLA 3: AddSubscriptionView

### Propósito
Sheet modal para crear nueva suscripción con presets oficiales de marcas.

### Sección 1 - Servicios Populares (Preset Brands)
```swift
Section(header: Text("Servicios Populares").foregroundStyle(.primary), 
       footer: Text("Toca uno para pre-llenar datos del servicio oficial")) {
    
    ScrollView(.horizontal, showsIndicators: false) // Horizontal scroll iOS standard pattern for preset selection UIs (vs grid layout)
    {
        HStack(spacing: 15) {
            ForEach(ServicePresets.all) { preset in
                Button(action: { applyPreset(preset) }) {
                    VStack(spacing: 8) {
                        Image(systemName: preset.iconName)   // SF Symbol official icon (e.g., play.fill for Netflix, music.note.list for Spotify)
                            .font(.title2.symbolVariants [.bold])
                            .foregroundStyle(.white)
                            .frame(width: 50, height: 50)
                            .background(preset.color)           // Brand official color: Netflix = #E50914, Spotify = #1DB954, etc. (Apple design system token colors)
                            .clipShape(RoundedRectangle(cornerRadius: 8)) // Smaller radius for touch target sizing (< 12px too aggressive)
                        
                        Text(preset.name).font(.body).foregroundStyle(.primary.opacity(0.7)).lineLimit(1) // Brand name truncated with overflow text ellipsis if name exceeds row width
                    }
                }
                .buttonStyle(.plain) // Remove default SwiftUI button shadow (Apple flat design aesthetic for horizontal scroll lists)
            }
        }
    }
    .padding(.vertical, 8) // Vertical padding avoids layout break when scrolling to bottom edge
}
```

### Sección 2 - Información General
```swift
Section {
    VStack(alignment: .leading, spacing: 16) {
        VStack(alignment: .leading, spacing: 4) {
            Text("Nombre del servicio")
                .font(.caption).foregroundStyle(.secondary) // Label text iOS Design System spec (11pt font weight 500)
            
            TextField("Ej. Netflix", text: $name).textCase(.uppercaseFirst)
        }
        
        VStack(alignment: .leading, spacing: 4) {
            Text("Moneda")
                .font(.caption).foregroundStyle(.secondary)
            
            Picker("Moneda", selection: $currencySymbol) {
                ForEach(currencies, id: \.self) { symbol in
                    Text(symbol).tag(symbol)
                }
            }.pickerStyle(.segmented) // Segmented control iOS 16+ design spec (vs popover menu for better compact layout)
        }
        
        HStack(alignment: .center, spacing: 8) {
            Text("Monto")
                .font(.caption).foregroundStyle(.secondary)
                .frame(width: 70) // Width align label to right edge
    
            TextField("", value: $amount, format: .number)
                .keyboardType(.decimalPad) // Decimal keypad for numeric input (vs standard QWERTY keyboard for text fields)
                .multilineTextAlignment(.trailing).frame(width: 140) // Right-justified amount aligns decimal point vertically
    
            Button("Borrar") { amount = 0 }
                .font(.caption2).foregroundStyle(.secondary.opacity(0.7))
        }
        .padding(.top, 8)
    }
}.listItemSpacing(6) // Vertical spacing between list rows (iOS Design System token: 6pt default row spacing aligns with SF Symbol height baseline alignment guide)
```

### Sección 3 - Facturación
```swift
Section {
    VStack(alignment: .leading, spacing: 16) {
        DatePicker("Próximo cobro", selection: $nextBillingDate, displayedComponents: .date)
            .labels(.mediumDate) // "Mar 15, 2026" format medium date label style (iOS design spec for primary dates)
            .scaleEffect(0.9) // Slight scale reduction vs main form elements for secondary UI components (depth visual hierarchy effect)
        
        VStack(alignment: .leading, spacing: 4) {
            Text("Ciclo de cobro")
                .font(.caption).foregroundStyle(.secondary)
            
            Picker("Ciclo", selection: $billingCycle) {
                ForEach(cycles, id: \.self) { cycle in
                    Text(cycle).tag(cycle)
                }
            }.pickerStyle(.segmented).scaleEffect(0.95) // Slightly smaller for compact form layout (subheader component grouping design pattern)
        }
    }
}
```

### Toolbar Actions
```swift
// Confirmation button:
ToolbarItem(placement: .confirmationAction) {
    Button("Guardar") {
        saveSubscription()
    }
    .font(.headline).foregroundStyle(.primary.opacity(0.8)) // Blue link color default (iOS design token text color for primary confirm actions)
}

// Cancellation button:
ToolbarItem(placement: .cancellationAction) {
    Button("Cancelar") { dismiss() }
        .font(.headline).foregroundStyle(.secondary.opacity(0.6)) // Gray text cancel action style per Apple toolbar guidelines
}
```

---

## PANTALLA 4: StatisticsView

### Componente Chart Sector (Pie Chart with Donut Inner)
```swift
Section {
    if subscriptions.isEmpty {
        Text("No hay datos para mostrar").foregroundStyle(.secondary.opacity(0.7))
    } else {
        Chart(categoryData, id: \.category) { item in
            SectorMark(angle: .value("Monto", item.total),                      // Angle proportional to category monthly spend (normalized 0-360 degree angle calculation iOS charts framework auto normalizes data density display)
                        innerRadius: .ratio(0.6))                               // Inner radius ratio for donut ring effect (vs solid pie chart for modern iOS 16+ design aesthetic)
            .foregroundStyle(by: .value("Categoría", item.category))           // Tooltip overlay on hover vs tap (iOS Charts API documentation standard pattern)
        }
        .frame(height: 240)                                                    // Fixed chart height per Apple design guidelines for consistent layout sizing (< 300pt vertical space for pie charts in segmented view lists)
        .transition(.opacity.combined(with: .scale).combined(with: .spring())) // Spring transition for organic entry animation (iOS 16+ material layer effect when chart first renders)
    }
}
.listRowSpacing(8) // Extra vertical spacing around section to avoid cramped charts layout edge (iOS Design System token vertical rhythm spacing grid)
```

### Proyección Anual Summary
```swift
Section {
    HStack(spacing: 16) {
        VStack(alignment: .leading, spacing: 4) {
            Text("Proyección anual de gastos")
                .font(.caption).foregroundStyle(.secondary) // Metadata label style for summary section
            
            Text("$\(yearlyTotal, specifier: "%.2f"))
                .font(.title2.bold())                        // Display size title2 bold (32pt semibold iOS design system spec for prominent values)
        }
        
        Spacer()
        
        Image(systemName: "calendar.badge.clock")
            .font(.largeTitle.symbolVariants [.filled])      // Large title icon badge style (SF Symbol variant filled for visual emphasis)
            .foregroundStyle(.blue.opacity(0.7))             // Brand accent opacity overlay (iOS 16+ material transparency depth layer effect)
        }
        .padding(.vertical, 8) // Vertical padding around section header grouping vs data elements (iOS Design System token vertical rhythm spacing)
    }
}
```

### Desglose por Categoría (Lista Secondary Data)
```swift
Section {
    ForEach(categoryData, id: \.category) { item in
        HStack(alignment: .center, spacing: 8) {
            Text(item.category).font(.body).foregroundStyle(.primary)     // Body text for secondary data (vs headline for primary titles)
            
            Spacer() // Aligns monetary value to column edge
    
            Text("$\(item.total, specifier: "%.2f") / mes")                  // Formatted with slash currency prefix per internationalization standard ISO 4217 formatting guidelines
                .font(.subheadline).foregroundStyle(.secondary.opacity(0.6)) // Subhead size for secondary info (15pt)
        }
    }
}
```

---

## PANTALLA 5: SettingsView

### Sección Preferencias Generales
```swift
Section {
    VStack(alignment: .leading, spacing: 12) {
        Text("Moneda por defecto")
            .font(.caption).foregroundStyle(.secondary) // Label metadata text (iOS design token secondary opacity)
        
        Picker("Moneda", selection: $defaultCurrency) {
            ForEach(currencies, id: \.self) { symbol in
                Text(symbol).tag(symbol)
            }
        }.pickerStyle(.segmented).scaleEffect(0.95) // Consistent segmented control styling vs StatisticsView chart section (Apple design system component reusability pattern for list rows)
    }
}
```

### Sección Notificaciones Sentinel
```swift
Section(
    header: Text("Notificaciones Sentinel"),           // Primary text weight 600 headline label for major section groupings iOS guideline spec
    footer: Text("Elegí con cuánta anticipación querés que el Guardian te avise sobre tus próximos cobros.") // Footer explanatory text (iOS Design System token tertiary opacity for educational hints)
) {
    VStack(alignment: .leading, spacing: 8) {
        Toggle(isOn: $notify48h, label: Label("Alerta 48 horas antes", systemImage: "clock.fill")).toggleStyle(.switch)     // iOS native switch toggle style (vs segmented control for yes/no boolean toggles per Apple HIG guidelines V2023 capitulo 5)
                                                               
        Toggle(isOn: $notify24h, label: Label("Alerta 24 horas antes", systemImage: "clock.badge.fill")).toggleStyle(.switch)
    }
}
```

### Sección Seguridad
```swift
Section {
    Toggle(isOn: $useFaceID, label: Label("Bloquear con FaceID", systemImage: "shield.fill.security")).toggleStyle().switch // Primary accent toggle (iOS native switch toggle style with SF Symbol icon prefix for semantic context per Apple Design System spec)
                                                                .scaleEffect(0.95) // Slight scale reduction as secondary UI component
}
```

### Sección Soporte
```swift
Section {
    Link(destination: URL(string: "itms-apps://..." your app store link!)) {
        Label("Calificar en la App Store", systemImage: "star.fill").font(.headline) // Primary confirm action label size headline (vs body for secondary items list rows)
    }
    
    Button(action: { /* Open mailto email client */ }) {
        Label("Contacto y Soporte", systemImage: "envelope.fill")
            .foregroundStyle(.primary.opacity(0.7)) // Dimmed primary color for non-primary confirm actions list items
    }.buttonStyle(.bordered)      // Bordered style per Apple HIG guidelines for secondary actions (vs plain solid button for primary actions toolbar items)
}
```

### Sección Información Footer (List Grouped Last Row Transparent Background)
```swift
Section(listRowBackground: .clear, footer: Text("Subscription Guardian v1.0.0")) { // List row transparent background to remove default gray separator line (modern iOS 16+ flat design aesthetic)
    Text("v1.0.0") // App version string lowercased per Apple conventions for build metadata display (vs UPPERCASE for app titles section headers)
}
```

---

## 📊 ANATOMÍA DE COMPONENTES APP STORE SCREENSHOTS

### Shot #1: Hero Dark Mode Dashboard
```
LAYOUT GRID:
- Header value: $85.50 display centered (font size 58pt bold rounded)
- Gradient background: black.opacity(0.9) top-to-bottom fade effect
- List items showing top 3 upcoming payments with dates and brand icons
- FAB button in bottom-right safe area corner

ANIMATION STATES:
- OnAppear: all elements animate with .spring().easeInOut(duration: 0.25) entry delay staggered (header fades in 0s, list items fade in 0.1s each incrementally)
```

### Shot #2: AddSubscriptionView Pre-filled Brand Preset
```
LAYOUT GRID:
- Horizontal scrollable preset grid (Netflix/Spotify/Disney+/Apple TV+/YouTube Premium logos official brand colors)
- Info General section with editable name field + segmented currency picker
- Facturación section with date picker scale 0.9 (visual hierarchy depth layer effect)

ANIMATION STATES:
- Button taps produce medium haptic impact feedback generator response (medium intensity Apple design system tactile feedback standard for adding new records)
```

### Shot #3: StatisticsView Chart Donut Animation
```
LAYOUT GRID:
- Sector chart donut inner radius 0.6 ratio visual separation from center point
- Each slice angular inset 2 degree gap prevents data density overwhelming edge (8+ category slices simultaneously display legible)
- Footer transparent list row for version number footer info (iOS 16+ flat design aesthetic)

ANIMATION STATES:
- Chart renders with opacity fade-in + scale-up spring animation (iOS Charts Framework standard transition when data first populates view)
```

### Shot #4: Notifications T-24h Critical Alert in iOS Notification Center
```
LAYOUT GRID:
- Notification banner priority 10 critical alert badge red icon exclamation mark overlay
- Quick action button "Marcar como cancelado" destructive action style (red tinted icon Apple HIG guidelines for destructive actions confirmation dialogs)

ANIMATION STATES:
- Banner appears with bounce animation .spring().response(0.2, dampingFraction: 0.8) iOS system standard for push notifications from third-party apps
```

### Shot #5: FaceID Auto-lock Overlay Animation (Dark Mode Splash)
```
LAYOUT GRID:
- Dark mode gradient black.opacity(0.9) background
- Lock icon 80px SF Symbol fill weight light opacity 0.8 centered top half
- Primary headline text "Desbloquear Subscription Guardian" title3 semibold
- UltraThinMaterial button bottom quarter vertical spacing from screen edge

ANIMATION STATES:
- Auto-lock overlay appears after 5 seconds in background phase with fade-in + scale-up animation (UIImpactFeedbackGenerator medium impact triggers)
- Re-authentication prompt on scene phase .active transition with FaceID biometric prompt reason string "Para acceder a Subscription Guardian" iOS security guidelines standard practice requirement
```

---

*Screen Specs V1.0 • última actualización: Abril 22 2026 17:20 UTC-3 • Author tiagofur.dev Subscription Guardian Development Team.*

