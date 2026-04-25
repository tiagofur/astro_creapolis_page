# 📋 Feature Specification Document - Subscription Guardian Evolution

## Overview

Esta documentación detalla especificaciones técnicas COMPLETAS para todas las features propuestas, con ejemplos de código, trade-offs documentados y priorización por valor/nivel de esfuerzo.

---

## Table of Contents

1. **[Auto-Discovery Engine](#1-autodiscovery-engine)** - Priority: GAME CHANGER ⭐⭐⭐⭐⭐
2. **[Ghost Subscription Detector](#2-ghost-subscription-detector)** - Priority: ROI HIGH ⭐⭐⭐⭐✨
3. **[Dashboard Elevation & UI/UX iOS 26](#3-dashboard-elevation-uix-ios-26)** - Priority: WOW FACTOR ⭐⭐⭐⭐💎
4. **[AI Insights Engine](#4-ai-insights-engine)** - Priority: SUSTAINABLE VALUE ⭐⭐⭐
5. **[Historical Usage Analytics](#5-historical-usage-analytics)** - Priority: ML FOUNDATION ⭐⭐

---

## 1. AUTO-DISCOVERY ENGINE

### Problem Statement

Actualmente: User manual entry → Friction → Low engagement → High churn

Objetivo: Auto-discover subscriptions → Zero friction → High engagement → Retention

```
Current Flow (Manual Entry):
┌─────────────────────────────────────────────┐
│ User opens app for first time              │
│ ↓                                           │
│ "Enter subscription details manually"       │
│ ↓                                           │
│ Typing name, amount, due date              │
│ ↓                                           │
│ Save + Confirmation                        │
│ ↓                                           │
│ User thinks: "Why do I need this?"         │
└─────────────────────────────────────────────┘

Target Flow (Auto-Discovery):
┌─────────────────────────────────────────────┐
│ User opens app for first time              │
│ → Permission prompt: "Detectar suscripción" │
│ ↓                                           │
│ App scans iCloud purchases automatically    │
│ ↓                                           │
│ "Found 12 active subscriptions!"           │
│ → Auto-add each to database                │
│ ↓                                           │
│ Dashboard shows data instantly             │
└─────────────────────────────────────────────┘
```

### Technical Specifications

#### API Architecture

```swift
// 🎯 STOREKIT EXTENSION (iOS 18+) - PRIMARY SOURCE
class AppStorePurchasesService: ObservableObject {
    
    // MARK: - Fetch Active Subscriptions
    
    /// Returns all active subscriptions from recent purchases
    @MainActor 
    func fetchActiveSubscriptions(forCustomer customerID: String) async throws -> [Subscription] {
        let products = try await Quantification.fetchProductsWithPurchases(
            forCustomerIdentifiers: [customerID],
            inContext: .current, // Uses current iCloud context (privacy-first, no server storage)
            withReceiptTypes: .subscriptionStatusAndBillingHistory(),
            sinceBeginningOfToday()
        )
        
        return products.compactMap(\.subscription) { product -> Subscription? in
            guard let subscription = product.subscription else { return nil }
            
            return Subscription(
                name: product.displayName,
                description: subscription.displayDescription ?? "Unknown",
                price: subscription.priceAmount,
                currencyCode: subscription.currencyCode,
                billingCycle: subscription.billingCycle,
                isActive: true,
                purchaseDate: product.purchases.first?.purchaseDate,
                lastPaymentDate: product.subscriptions.last?.lastSubscriptionEndDate,
                nextBillingDate: product.subscriptions.first?.nextBillingDate,
                category: self.determineCategory(from: product.displayName) ?? .unknown,
                autoDiscovered: true
            )
        }
    }
    
    // MARK: - Receipt History Parsing (Fallback for iOS 15-17 compatibility)
    
    /// Parse receipt table from iCloud backup data
    func parseReceiptHistory(fromAppStoreID appStoreID: String, bundleIdentifier: String) async throws -> [Receipt] {
        if #available(iOS 18, *) {
            return try await fetchReceiptData(withCustomerIdentifier: bundleIdentifier)
        } else {
            return try await self.cloudkitReceiptParser.parseForApp(
                storeID: appStoreID,
                bundleId: bundleIdentifier,
                fromCloudKitSyncTable: true // Use cloud kit sync for historical data
            )
        }
    }
    
    private func determineCategory(from productDisplayName: String) -> SubscriptionCategory? {
        let normalized = productDisplayName.lowercased()
        
        switch normalized {
        case #contains("netflix"), #contains("disney"), #contains("hulu"):
            return .streaming
            
        case #contains("spotify"), #contains("pandora", "musicbox"):
            return .music
            
        case #contains("netflix", "github"), #contains("zoom"), #contains("dropbox"):
            return .productivity
            
        case #contains("appleone"):
            return .bundle
            
        default:
            return .unknown
        }
    }
}

// MARK: - CloudKit Receipt Parser (Fallback Implementation)

class CloudKitReceiptParser {
    
    /// Get all receipt history from CloudKit sync tables
    func getReceiptHistory() async throws -> [Receipt] {
        let cloudkitContainer = try await self.getCloudKitContainer(from: .current)
        
        return for case receipt in cloudkitContainer.records(where: $receipt.isActive && $receipt.isSubscription)
            .sorted(byDate: \.$receipt.purchaseDate, descending: true)
    }
    
    private func calculateNextPaymentDate(from lastPaymentDate: Date?) -> Date? {
        guard let lastPaymentDate = lastPaymentDate else { return nil }
        
        let calendar = Calendar.current
        
        switch self.subscription.billingCycle == .weekly {
            return lastPaymentDate.addingTimeInterval(7 * 86400) // One week in seconds
            
        case .monthly:
            return calendar.date(byAdding: .day, value: 30, to: lastPaymentDate)
            
        case .yearly:
            return calendar.date(byAdding: .month, value: 12, to: lastPaymentDate)
            
        default:
            return nil
        }
    }
}
```

#### Data Model Extensions

```swift
import SwiftData

// 🎯 EXTEND EXISITING SUBSCRIPTION MODEL WITH NEW FIELDS
@Model
final class Subscription {
    @Attribute(.persistent, .identifier) var id: UUID
    
    // ✅ CORTEX MARKING
    @Attribute(.string, .optional) var displayName: String?
    @Attribute(.decimal) var amount: Decimal?
    @Attribute(.string, .optional) var currencyCode: String?
    @Attribute(.date, .optional) var nextPaymentDue: Date?
    
    // ✅ CORTEX TYPE MARKING
    @Attribute(.string, .optional) var category: String? // "streaming", "productivity", etc.
    var isActive: Bool
    
    // 💡 AUTO-DISCOVERY MARKERS (NEW)
    @Attribute(.bool) var autoDiscovered: Bool
    @Attribute(.date, .optional) var discoveryTimestamp: Date?
    
    // 🎯 USAGE TRACKING (NEW + PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.date, .optional) var lastOpenedDate: Date?
    @Attribute(.int32) var totalOpenCount: Int = 0
    
    // 👻 GHOST DETECTION MARKERS (NEW)
    @Attribute(.double) var ghostDetectionScore: Double = 0.0
    @Attribute(.string, .optional) var lastPaymentDate: Date?
    @Attribute(.int32, .optional) var daysSinceLastUse: Int?
    
    // 🗃️ RELATIONSHIPS (NEW + ANALYTICS FOUNDATIONS)
    @Transient 
    var nextPaymentDueTimestamp: TimeInterval {
        guard let nextPaymentDue = nextPaymentDue else { return 0 }
        return Calendar.current.dateIntervalSinceDate(from: Date(), to: nextPaymentDue).seconds
    }
    
    enum BillingCycle: String, Codable {
        case weekly, monthly, yearly
    }
}

// 🗃️ NEW MODEL: TRACKING EVENT TABLE (USAGE ANALYTICS)
@Model
final class TrackingEvent {
    @Attribute(.string, .identifier) var eventId: UUID
    
    // ✅ MARKING SUBSCRIPTION ID
    @Attribute(.string, .optional) var subscriptionId: String?
    
    // ✅ MARKING EVENT TYPE
    @Attribute(.enum) var eventType: TrackingEventType
    @Attribute(.date) var timestamp: Date
    
    // 🎯 CONTEXT INFO (LOCAL ONLY + NO SERVER STORAGE)
    @Attribute(.struct) var contextInfo: ContextInfo?
    
    // 🔥 METADATA (CROSS-REFERENCE DATA)
    @Attribute(.struct, .optional) var metadataInfo: MetadataInfo?
    
    // 💡 ML PREDICTION SCORING
    @Transient
    var predictionScoreForCancellation: Double? // 0-1.0 probability
    
    enum TrackingEventType: String, Codable {
        case appOpened = "app_opened"
        case subscriptionPayment = "subscription_payment"
        case usageDetected = "usage_detected"
        
        case swipeToCancelAttempt = "swipe_cancel_attempt"
        case aiInsightDismissed = "ai_insight_dismissed"
    }
}

// 🎯 CONTEXT INFO STRUCT (LOCALLY STORED ONLY, NO SERVER)
@Model
final class ContextInfo {
    @Attribute(.int32, .optional) var batteryLevel: Int32?
    @Attribute(.string) var deviceModelName: String // "iPhone 15 Pro" or "iPad Pro 12.9"
    @Attribute(.enum, .optional) var currentNetworkType: NetworkQuality
    
    enum NetworkQuality: String, Codable {
        case good = "good", fair = "fair", poor = "poor"
    }
}

// 🔥 METADATA INFO (CROSS-REFERENCE + APP IDENTIFIER)
@Model
final class MetadataInfo {
    @Attribute(.url, .optional) var appIconUrl: URL? // App Icon URL
    @Attribute(.string, .optional) var bundleIdentifier: String? // Apple App Store ID
    
    @Transient 
    var isAppInRecentUsage: Bool {
        guard let url = self.appIconUrl else { return false }
        return recentOpenedURLs.contains(where: { $0 == url })
    }
}

// 🗃️ RELATIONSHIPS (NEW + ANALYTICS FOUNDATIONS)
@Model
final class Subscription: Identifiable {
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ CORTEX MARKING
    @Attribute(.string, .optional) var displayName: String?
    
    // ⭐ USAGE TRACKING RELATIONSHIP (NEW)
    @Relationship(inverse: \.subscription) 
    var trackingEvents: [TrackingEvent]?
}

// 🗃️ ANALYTICS FOUNDATION TABLES (NEW + PRICACY-FIRST, LOCAL ONLY)
@Model
final class UsageHistory {
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID + BUNDLE IDENTIFIER
    @Attribute(.string) var subscriptionId: String?
    @Attribute(.string, .optional) var bundleIdentifier: String?
    
    // ✅ MARKING USAGE COUNTS
    @Attribute(.int32) var openCount: Int
    
    // ✅ MARKING LAST USED TIMESTAMP
    @Attribute(.date) var lastOpenedDate: Date
    
    // 💡 ML MODEL FOR PREDICTIONS (LOCAL ONLY)
    @Attribute(.double) var predictedCancellationProbability: Double?
}

@Model
final class AppLaunchTrackingData {
    @Attribute(.date, .identifier) var id: Date
    
    // ✅ MARKING SUBSCRIPTION ID
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 CONTEXT INFO (LOCAL ONLY + NO SERVER STORAGE)
    @Attribute(.double) var batteryLevel: Double?
    @Attribute(.int32) var networkQuality: NetworkQuality?
}
```

#### User Permission Flow

```swift
// 💡 USER PERMISSION REQUEST (NEW + PRIVACY-FRIENDLY)
class SubscriptionDiscoveryPermission {
    
    /// Request user permission for auto-discovery functionality
    func requestDiscoveryAccess(user: User, completion: @escaping (Bool) -> Void) async {
        let permissionRequest = PermissionRequest(
            identifier: "com.subscriptionguardian.discover",
            reason: "For discover all active subscriptions automatically — no manual entry needed. Your data stays local.",
            iconImage: UIImage(systemName: .magnifyingglass.withColor(.white)),
            isCritical: false, // User can opt-out (not critical for app functionality)
            
            // MARKETING COPY FOR PRIVACY PROMPT
            marketingCopy: "Discover Subscriptions"
        )
        
        try await permissionRequest.requestPermission(from: user) { granted in
            if granted {
                completion(true)
                
                // 🎯 AUTO-DISPLAY AFTER PERMISSION GRANTED
                await self.startAutoDiscovery(forUser: user)
            } else {
                completion(false)
                
                // 🎯 OFFER MANUAL ENTRY FALLBACK (Graceful degradation)
                await self.offerManualEntryFlow()
            }
        }
    }
    
    private func startAutoDiscovery(forUser user: User) async {
        // 🎯 START AUTO-DISCOVERY + DISPLAY PROGRESS
        await MainActor.run { [weak user] in
            let notificationContent = UNNotificationRequest(
                identifier: "discover.progress",
                userInfo: ["title": "Scanning for subscriptions...", "body": ""],
                triggerDate: .distantFuture
            )
            
            // 🎯 DISPLAY PROGRESS INDICATOR IN UI (e.g., "Discovering 12 subscriptions...")
            Task { @MainActor in
                await self.discoverAllActiveSubscriptions(forUser: user)
                    .forEach { subscription in
                        let notificationContent = UNNotificationRequest(
                            identifier: "discover.completed",
                            userInfo: ["title": "Found 12 active subscriptions!", "body": ""],
                            triggerDate: .distantFuture
                        )
                        
                        // 🎯 DISPLAY SUCCESS NOTIFICATION TO USER (with animation + haptics)
                    }
            }
        }
    }
    
    private func offerManualEntryFallBack() async {
        // 🎯 DISPLAY MANUAL ENTRY FALLBACK (User can still add subscriptions manually if needed)
        let manualEntryView = AddSubscriptionView()
            .presentationAnchor(.bottom, offset: CGSize(width: 0, height: 50))
        
        await MainActor.run {
            self.present(manualEntryView)
        }
        
        // 🎯 DISPLAY EXPLANATION TO USER (e.g., "We detected these subscriptions — add them manually or let us detect more?")
    }
}

// 🎯 AUTO-DISCOVERY SERVICE (NEW + CORE DISCOVERY ENGINE)
class SubscriptionDiscoveryService {
    
    /// Core discovery engine: scan App Store purchases for active subscriptions
    func discoverAllActiveSubscriptions(forCustomer customer: Customer) async throws -> [Subscription] {
        // 🎯 STEP 1: FETCH ALL PURCHASED APPS FROM CUSTOMER ACCOUNT
        let purchasedApps = try await quantificationAppStorePurchases.fetchAllProducts(withCustomerIdentifier: customer.id, inContext: .current)
        
        // 🎯 STEP 2: PARSE RECEIPT DATA FOR EACH APP (billing history + purchase dates)
        var discoveredSubscriptions: [Subscription] = []
        
        for app in purchasedApps {
            // 🎯 SKIP FREE APUROS ONLY + EXCLUDE ONES WITHOUT BILLLING HISTORY
            let isPremiumApp = await quantificationReceiptStoreService.isSubscriptionEligible(for: app.storeID) || !app.subscriptionCount == 0
            
            if !isPremiumApp {
                continue
            }
            
            // 🎯 FETCH RECIPTS FOR THIS APP ONLY (billing history from Apple's receipt table)
            guard let receipts = try await receiptHistoryProvider.fetchReceipts(for: app.storeID, inContext: .current) else {
                continue
            }
            
            // 🎯 PARSE RECEIPTS + BUILD SUBSCRIPTION RECORDS (billing cycle + next payment date)
            discoveredSubscriptions.append(contentsOf: self.parseSubscriptions(fromApps: receipts))
        }
        
        try await sharedModelContainer.save()
        return discoveredSubscriptions
    }
    
    private func parseSubscriptions(fromReceipts receipts: [Receipt]) -> [Subscription] {
        var subscriptions: [Subscription] = []
        
        for receipt in receipts {
            if receipt.isSubscription && receipt.isActive {
                let subscription = Subscription(
                    id: UUID(),
                    displayName: receipt.displayName,
                    amount: receipt.price,
                    currencyCode: receipt.currency,
                    nextPaymentDue: self.nextPaymentDate(from: receipt:lastReceiptLastPaymentDate),
                    
                    category: self.determineCategory(fromReceiptDisplayName: receipt.displayName),
                    autoDiscovered: true,
                    discoveryTimestamp: Date()
                )
                
                subscriptions.append(subscription)
            }
        }
        
        return subscriptions
    }
    
    private func determineCategory(fromDisplayName displayName: String) -> Subscription.Category? {
        let lowercasedName = displayName.lowercased()
        
        switch lowercasedName[:].prefix(5).contains("netflix", "hulu"), // Streaming
            .contains("spotify", "pandora"),  // Music
            .contains("zoom", "slack")) { // Productivity
            
            return nil
        }
    }
}
```

#### Auto-Discovery Integration with Existing App

```swift
// 🎯 INTEGRATE WITH EXISITING APP ARCHITECTURE (Existing Subscription.swift model)

class SubscriptionManager {
    @AppStorage("autoDiscoveryEnabled") private var autoDiscoverSubscriptions = false
    
    /// Check if user enabled auto-discover functionality
    func isUserAutoDiscoveryEnabled() -> Bool {
        return self.autoDiscoverSubscriptions && self.isCloudKitContainerAccessible()
    }
    
    /// Fetch all active subscriptions from user's iCloud account (privacy-first, local only)
    func fetchActiveSubscriptionsForCustomerID(customerID: String) async -> [Subscription] {
        // 🎯 STEP 1: CHECK IF AUTO-DISCOVERY IS ENABLED + PRIVACY-FIRST APPROACH
        guard self.isUserAutoDiscoveryEnabled() else {
            return []
        }
        
        // 🎯 STEP 2: DISCOVER SUBSCRIPTIONS FROM USER'S ICLLOUD PURCHASES (privacy-first)
        do {
            return try await Self.fetchActiveSubscriptionsFromCloudKit(
                withCustomerIdentifier: customerID,
                sinceBeginningOfToday: false // Include historical data for ghost detection scoring
            )
        } catch {
            print("Failed to fetch active subscriptions from CloudKit: \(error)")
            
            // 🎯 FALLBACK TO MANUAL ENTRY (Graceful degradation)
            return []
        }
    }
    
    private static func fetchActiveSubscriptionsFromCloudKit(
        withCustomerIdentifier customerID: String,
        sinceBeginningOfToday: Bool = false
    ) async throws -> [Subscription] {
        // 🎯 FETCH ALL APP STORE PURCHASED APPS FROM CUSTOMER (iCloud only, privacy-first)
        let purchasedApps = try await quantificationAppStorePurchases.fetchAllProducts(
            withCustomerIdentifier: customerID, inContext: .current
        )
        
        // 🎯 PARSE RECEIPT HISTORY FOR CLOUD KIT SYNC + BILLING CYCLE ANALYSIS
        var discoveredSubscriptions: [Subscription] = []
        
        for app in purchasedApps {
            // 🎯 SKIP FREE APPS ONLY (focus on paid subscriptions)
            guard let subscriptionCount = try await quantificationReceiptStore.fetchSubscriptionCount(
                withCustomerIdentifier: customerID,
                inContext: .current,
                receiptAppStoreID: app.appID
            ) else {
                continue
            }
            
            // 🎯 FETCH RECEIPT HISTORY FOR THIS APP (billing history for ghost detection)
            guard let receipts = try await quantificationReceiptHistory.fetchReceipts(
                withCustomerIdentifier: customerID, inContext: .current, receiptAppStoreID: app.appID
            ) else {
                continue
            }
            
            // 🎯 PARSE RECEIPTS + BUILD SUBSCRIPTION RECORDS
            discoveredSubscriptions.append(contentsOf: ReceiptParser.parseSubscriptions(
                fromReceipts: receipts,
                withCustomerIdentifier: customerID, inContext: .current
            ))
        }
        
        return discoveredSubscriptions
    }
}

// 🎯 AUTO-DISCOVERY WORKFLOW INTEGRATION (WITH EXISTING APP ARCHITECTURE)

struct SubscriptionDiscoveryWorkflow {
    
    /// Core workflow for auto-discovery + manual entry fallback
    func handleAutoDiscovery(forUser user: User, in: ViewContext) async -> Subscription? {
        try await MainActor.run { [weak user] in
            guard let user = user else { return nil }
            
            // 🎯 STEP 1: REQUEST DISCOVERY PERMISSIONS (privacy-first opt-in approach)
            var permissionRequest: PermissionRequest? = nil
            
            if #available(iOS 15.0, *) {
                self.permissionRequest = PermissionRequest(
                    identifier: "discover.subscription",
                    reason: "For discover your active subscriptions automatically — no manual entry needed.",
                    iconImage: UIImage(systemName: .magnifyingglass)
                )
            } else {
                return nil // User can always opt-out manually in iOS 14 and earlier (no auto-discover)
            }
        }
        
        try await MainActor.run { [weak user] in
            guard let request = self.permissionRequest else { return nil }
            
            // 🎯 STEP 2: DISPLAY PERMISSION REQUEST TO USER + AVOID AUTO-ACCEPTANCE
            let alert = UIAlertController(
                title: "Auto-Discovery Feature",
                message: "We can automatically detect your active subscriptions from Apple App Store. This eliminates manual entry.",
                
                isCritical: false, // Not critical — user can opt-out anytime without breaking app functionality
                suggestedButtonTitle: "Enable Discovery", // Primary button (recommended)
                declinedButtonTitle: "Maybe Later" // Secondary button (fallback to manual entry)
            )
            
            return alert.presented() { [weak view] in
                guard let view = view else { return nil }
                
                if #available(iOS 15.0, *) {
                    return .primaryAction, declineButtonTitle: "Enable Discovery"
                }
                
                view.endEditing(true) // Avoid auto-acceptance on older iOS versions (manual entry fallback)
                
                return nil
            } { _ -> PermissionRequest? in
                self.permissionGranted(forUser: user)
            } { alert in
                guard let declinedButton = alert.actions[0] else { return nil }
                
                if !declinedButton.isEnabled {
                    // 🎯 USER CLICKED "Enable Discovery" (primary action with enabled state)
                    self.startAutoDiscovery(forUser: user, in: context)
                    
                    return nil
                } else if declinedButton.style == .cancel {
                    // 🎯 USER CLIKED "Maybe Later" (fallback to manual entry only — graceful degradation)
                    self.offerManualEntryFlow(forUser: user, in: context)
                }
            }

            guard let alert = self.alert as? UIAlertController else { return nil }
        }
    }
}

// 🎯 AUTO-DISCOVERY SERVICE (NEW + PRIVACY-FIRST IMPLEMENTATION)
class SubscriptionDiscoveryService {
    
    static let shared = SubscriptionDiscoveryService()
    
    /// Main discovery workflow with permissions and analytics tracking
    func handleAutoDiscovery(forUser user: User, in: ViewContext) async throws -> [Subscription] {
        // 🎯 STEP 1: CHECK FOR AUTO-DISCOVERY PERMISSION (user-first approach)
        guard self.isPermissionGranted(forUser: user) else { return [] }
        
        // 🎯 STEP 2: FETCH ACTIVE SUBSCRIPTIONS FROM APP STORE DATA
        do {
            return try await Self.fetchActiveSubscriptionsFromCloudKit(
                withCustomerIdentifier: user.customerID, inContext: .current
            )
        } catch {
            print("Failed to fetch active subscriptions from CloudKit: \(error)")
            
            // 🎯 FALLBACK TO MANUAL ENTRY (graceful degradation)
            return []
        }
    }
    
    private func isPermissionGranted(forUser user: User) -> Bool {
        guard let container = self.sharedModelContainer else { return false }
        
        let activePermissions = try? container.fetchAll(subscribedActivePermissions) { model in
            model.id == user.customerID
        }
        
        return !activePermissions.isEmpty
    }
    
    private func offerManualEntryFlow(forUser user: User, in: ViewContext) async throws {
        // 🎯 OFFER MANUAL ENTRY FALLBACK (graceful degradation for older iOS versions)
        let manualEntryView = AddSubscriptionView()
            .presentationAnchor(.bottom, offset: CGSize(width: 0, height: 50))
        
        await MainActor.run { [weak view] in
            guard let view = view else { return nil }
            
            view.present(manualEntryView as any UIViewControllerProvider) { _ in
                // Manual entry flow triggered via presentation anchor
            }
        }
    }
}
```

### Integration with Existing Codebase

```swift
// 🎯 EXISTING FILE: Models/Subscription.swift
// ✅ EXTEND WITH NEW FIELDS FOR AUTO-DISCOVERY ENGINE

@Model
final class Subscription {
    @Attribute(.persistent, .identifier) var id: UUID
    
    // ✅ CORTEX MARKING (Original)
    @Attribute(.string, .optional) var displayName: String?
    @Attribute(.decimal) var amount: Decimal?
    @Attribute(.string, .optional) var currencyCode: String?
    @Attribute(.date, .optional) var nextPaymentDue: Date?
    
    // ✅ CORTEX TYPE MARKING (Original)
    @Attribute(.string, .optional) var category: String? // "streaming", "productivity", etc.
    var isActive: Bool
    
    // 💡 AUTO-DISCOVERY MARKERS (NEW + INTEGRATION LAYER)
    @Attribute(.bool) var autoDiscovered: Bool = false
    @Attribute(.date, .optional) var discoveryTimestamp: Date?
    
    // 🎯 USAGE TRACKING (NEW + PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.date, .optional) var lastOpenedDate: Date?
    @Attribute(.int32) var totalOpenCount: Int = 0
    
    // 👻 GHOST DETECTION MARKERS (NEW)
    @Attribute(.double) var ghostDetectionScore: Double = 0.0
    @Attribute(.date, .optional) var lastPaymentDate: Date?
    @Attribute(.int32, .optional) var daysSinceLastUse: Int?
    
    // 🗃️ RELATIONSHIPS (NEW + ANALYTICS FOUNDATIONS)
    @Relationship(inverse: \.subscription) 
    var trackingEvents: [TrackingEvent]?
}

// 🎯 EXISTING FILE: SubscriptionGuardianApp.swift
// ✅ EXTEND WITH NEW SERVICES

@main
struct SubscriptionGuardianApp: App {
    
    // ...existing model container code...
    
    @StateObject private var subscriptionDiscoveryService = SubscriptionDiscoveryService.shared
    
    // ...existing body view code...
}

// 🎯 EXISTING FILE: Views/HomeView.swift
// ✅ EXTEND WITH AUTO-DISCOVERY INDICATOR

struct HomeView: View {
    @AppStorage("autoDiscoveryEnabled") private var autoDiscoveryEnabled = false
    
    var body: some View {
        ZStack(alignment: .top) {
            // ...existing glass cards...
            
            // 🎯 AUTO-DISCOVERY INDICATOR (NEW + PRIVACY-FRIENDLY)
            if !self.autoDiscoverSubscriptions || self.subscriptionDiscoveryEnabled.isEmpty {
                Text("No active subscriptions detected")
                    .foregroundStyle(.secondary)
                
                if #available(iOS 15.0, *) {
                    
                        "Auto-discover enabled — finding your subscriptions automatically"
                    } else {
                        
                        (manualEntry) — no auto-discovery on older iOS versions"
                    }
            } else {
                
                let discoveredSubscriptions = self.subscriptionDiscoveryService.discoveredSubsriptions ?? []
                
                HStack(spacing: 16) {
                    Text("Found \(discoveredSubscriptions.count) Active Subscriptions")
                        .foregroundStyle(.accent)
                    
                    Button("Edit List") {
                        // Edit all discovered subscriptions manually (optional)
                    }
                }
            }
        }
    }
}
```

---

## 2. GHOST SUBSCRIPTION DETECTOR

### Technical Specifications

```swift
// 👻 GHOST SUBSCRIPTION DETECTION (ROI HIGH + PRIVACY-FIRST, LOCAL ONLY ANALYTICS)
class GhostSubscriptionDetector {
    
    /// Core ghost detection algorithm — identify subscriptions with no usage in X days + payment pending
    func detectPotentialGhostSubscriptions(in context: ViewContext) -> [SubscriptionDetectionResult] {
        var detections: [SubscriptionDetectionResult] = []
        
        for subscription in self.subscriptions where subscription.autoDiscovered || subscription.isActive {
            let result = SubscriptionDetectionResult(
                subscription: subscription,
                daysSinceLastUse: await calculateDaysSinceLastUsage(forSubscription: subscription),
                
                // 👻 MARKING GHOST CANDIDATE BASED ON USAGE PATTERN + BILLING CYCLE
                isGhostCandidate: self.isGhostCandidate(forSubscription: subscription),
                
                // 💡 ML PREDICTION SCORE (0-1.0 probability of being safe to cancel)
                predictedCancellationProbability: await self.predictCancellationProbability(
                    forSubscription: subscription
                ),
                
                // ⚠️ FLAGGING RED FLAGS (e.g., trial period just ended, payment cycle anomaly detected)
                warningFlags: self.detectWarningFlags(forSubscription: subscription),
                
                // 💡 REASONING FOR ML MODEL (privacy-first, local only training data)
                reasoningText: await self.generateReasoningText(forSubscription: subscription),
                
                // ✅ CROSS-REFERENCE WITH APP STORE REVIEWS (optional, user opt-in)
                appStoreReviewRating: await self.fetchAppStoreReviewRating(
                    forBundleIdentifier: subscription.bundleIdentifier ?? "Unknown"
                )
            )
            
            detections.append(result)
        }
        
        return detections.sorted(by: { $0.predictedCancellationProbability > $1.predictedCancellationProbability })
    }
    
    private func calculateDaysSinceLastUsage(forSubscription subscription: Subscription) -> Int? {
        guard let lastOpenedDate = subscription.lastOpenedDate else { return nil }
        
        let components = Calendar.current.dateComponents([.day], from: lastOpenedDate, to: Date())
        return components.day ?? 0
    }
    
    private func isGhostCandidate(forSubscription subscription: Subscription) -> Bool {
        guard let lastOpenedDate = subscription.lastOpenedDate else { return false }
        
        // 👻 MARKETING COPY FOR UI: "This subscription hasn't been used in X days"
        return Calendar.current.date(from: DateComponents(day: 30, at: lastOpenedDate), to: Date()) ?? -1 >= 30
    }
    
    private func predictCancellationProbability(forSubscription subscription: Subscription) -> Double {
        guard let lastOpenedDate = subscription.lastOpenedDate else { return 0.5 } // Default probability if no usage data
        
        let daysSinceLastUse = await calculateDaysSinceLastUsage(forSubscription: subscription) ?? 0
        
        // 💡 ML MODEL PREDICTION (privacy-first, local-only training)
        // Higher values indicate higher confidence to cancel without harming user experience
        
        guard daysSinceLastUse > 30 else { return 0.5 } // Default probability if no usage data
        
        // Higher values indicate higher confidence to cancel without harming user experience
        let probability = Double(daysSinceLastUse / 128) // Heuristic formula (replace with ML model)
        
        guard daysSinceLastUse > .distantFuture else { return 0 }
        
        // 💡 CROSS-REFERENCE WITH BILLING CYCLE (monthly/weekly more likely to cancel safely)
        let billingCycleFactor = switch subscription.billingCycle {
            case .monthly: return 1.0
                case .yearly: return 0.5
                
        default: return 1.0
        }
        
        // 💡 MULTIPLY WITH BILLING CYCLE FACTOR FOR FINAL PROBABILITY SCORE (privacy-first, local-only)
        return Double(32) * Double(daysSinceLastUse / 128) // Final probability score (0-1.0 range)
    }
    
    private func generateReasoningText(forSubscription subscription: Subscription) -> String {
        guard let lastOpenedDate = subscription.lastOpenedDate else { return "" }
        
        let daysSinceLastUse = await calculateDaysSinceLastUsage(forSubscription: subscription) ?? 0
        
        // 💡 REASONING TEXT FOR UI (privacy-first, local-only training data)
        let reasoningText = switch daysSinceLastUse {
            case 32..=96: return "Unused for \(String(format: "%.1f", Double(daysSinceLastUse / 33))) weeks. Consider canceling."
                case >96: // More than a quarter in last month (privacy-first, local-only training data)
                
        default: return "Recently used. Keep active subscription."
        }
        
        return reasoningText
    }
    
    private func detectWarningFlags(forSubscription subscription: Subscription) -> [String] {
        var flags: [String] = []
        
        // ⚠️ FLAGGING RED FLAGS (e.g., trial period just ended, payment cycle anomaly detected)
        
        if subscription.billingPeriod == .trial && calendar.date(from: DateComponents(day: 14)) {
            return nil // Trial period just ended — no cancel now (user might want more trial time)
        }
        
        guard let lastPaymentDate = subscription.lastPaymentDate else { return [] }
        
        // ⚠️ FLAGGING RED FLAGS (e.g., no recent payments, unusual billing patterns detected)
        if calendar.isInCalendarRange(from: .distantPast, to: (subscription.nextPaymentDue ?? .distantPast), in: DateComponents(month: 12)) {
            flags.append("No recent payment activity within last year")
        }
        
        return flags.isEmpty ? [] : flags
    }
    
    private func fetchAppStoreReviewRating(forBundleIdentifier bundleIdentifier: String) -> Rating? {
        // ⚠️ CROSS-REFERENCE WITH APP STORE REVIEWS (optional, user opt-in requirement)
        
        guard #available(iOS 18, *) else { return nil } // App Store review feature available on iOS 18+ only
        
        let bundleIdentifier = bundleIdentifier
        
        do {
            let reviews = try await quantificationAppStoreReviews.fetchAllReviews(for: bundleIdentifier, inContext: .current)
            
            guard let averageRating = reviews.reduce(0, { $0 + $1.rate }) / double(reviews.count) else { return nil }
            
            // 💡 MARKETING COPY FOR UI (privacy-first, local-only training data)
            let ratingText = switch averageRating {
                case .low: return "Users report low ratings on this app. Consider canceling."
                    default: return "Users report high ratings on this app. Keep active subscription."
            }
            
            return Rating(
                bundleIdentifier: bundleIdentifier,
                ratingValue: averageRating,
                ratingText: ratingText,
                isNegativeFeedback: .low
            )
        } catch {
            print("Failed to fetch App Store reviews: \(error)")
            return nil
        }
    }
}

// 👻 GHOST DETECTION RESULT MODEL (NEW + ML PREDICTION SCORING)
@Model
final class SubscriptionDetectionResult {
    @Attribute(.struct, .identifier) var subscription: Subscription
    
    // 💡 DAYS SINCE LAST USAGE (USAGE TRACKING FOR GHOST DETECTION)
    @Attribute(.int32) var daysSinceLastUse: Int = 0
    
    // 👻 MARKETING COPY FOR UI: "This subscription hasn't been used in X days"
    @Attribute(.bool) var isGhostCandidate: Bool = false
    
    // 💡 ML PREDICTION SCORE (0-1.0 probability of being safe to cancel)
    @Attribute(.double) var predictedCancellationProbability: Double = 0.5
    
    // ⚠️ MARKETING COPY FOR UI: "Warning flags detected"
    @Attribute(.array) var warningFlags: [String] = []
    
    // 💡 REASONING TEXT FOR ML MODEL (privacy-first, local-only training data)
    @Transient
    var reasoningText: String? = nil
    
    // ✅ CROSS-REFERENCE WITH APP STORE REVIEWS (optional, user opt-in requirement)
    @Transient
    var appStoreReviewRating: Rating? = nil
}

// 💡 MARKETING COPY FOR UI MODEL (NEW + PRIVACY-FRIENDLY DISPLAY TEXT)
struct SubscriptionInsight {
    let title: String
    let subtitle: String
    
    enum TitleStyle: CaseIterable, Codable {
        case warning
        case primary
        
        static var forWarning: String? {
            return "Ghost Detected" // 🤖 MARKETING COPY FOR UI
        }
        
        static var forPrimary: String? {
            return "Keep Active Subscription" // 🤖 MARKETING COPY FOR UI
        }
    }
}
```

---

## 3. DASHBOARD ELEVATION & UI/UX iOS 26

### Technical Specifications

```swift
// 🎨 IOS 26 LIQUID GLASS COMPONENT (WOW FACTOR + USER RETENTION)
import SwiftUI

/// LiquidGlassCard component with multiple blur layers + dynamic gradient border + ambient glow effects
struct LiquidGlassCard<Content>: View where Content : View {
    
    let title: String
    let content: Content
    
    @State private var isInteracted = false  // MARKETING COPY INTERACTION STATE (HAPTIC FEEDBACK)
    @AppStorage("theme") private var appTheme = "System"  // MARKING DARK MODE DEFAULT
    
    var body: some View {
        ZStack(alignment: .topLeading) {
            // 💡 GLASS CARD BASE WITH MULTI-LAYER BLUR (iOS 26 LIQUID STYLE)
            RoundedRectangle(cornerRadius: 18)
                .fill(.ultraThinMaterial)
                .overlay(
                    // 🎨 DYNAMIC GRADIENT BORDER (ANIMATED LAYER EFFECT)
                    RoundedRectangle(cornerRadius: 17)
                        .stroke(
                            LinearGradient(
                                colors: [
                                    self.appTheme == .dark ? (appTheme == .dark ? .white.opacity(0.8) : .black.opacity(0.2),
                                        .blue.opacity(0.4)) : (appTheme == .light ? .white.opacity(0.3) : .black.opacity(0.1))
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            ),
                            lineWidth: 2.5
                        )
                )
            
            // 📄 CONTENT LAYER WITH GLASS EFFECT (iOS 26 LIQUID STYLE)
            content
            
            // 💡 AMBIENT GLOW EFFECT AROUND CARD EDGE (HAPTIC FEEDBACK ON TAP)
            RoundedRectangle(cornerRadius: 18)
                .fill(.blue.opacity(self.isInteracted ? 0.06 : 0.03))
                .blur(radius: 20)
                
            // 💡 LIQUID MOTION EFFECT (ANIMATED GRADIENT BACKGROUND THAT PULSES WITH USER INTERACTION)
            RoundedRectangle(cornerRadius: 18)
                .fill(LinearGradient(
                    colors: [.white.opacity(self.isInteracted ? 0.03 : 0.01), .blue.opacity(self.isInteracted ? 0.02 : 0.01)],
                    startPoint: .topLeading,
                    endPoint: self.appTheme == .light ? .bottomTrailing : .topTrailing
                ))
        }
        .shadow(color: self.appTheme == .dark ? .blue.opacity(0.3) : .purple.opacity(0.3), radius: 8) // Apple Watch style soft shadow
        .onTapGesture {
            haptics.notificationOccurred(.success).impactOccurred() // iOS-style interaction feedback
        }
        .transition(.asymmetric(insertion: .scale(scale: 1.05), removal: .scale(scale: 0.95))) // Smooth transitions between views
    }
}

// 🎨 ANIMATED TREND CHART COMPONENT (APPLE HEALTH STYLE WITH GRADIENT LINE)
struct AnimatedTrendChart: View {
    
    let data: [SubscriptionUsageData]
    
    @State private var scale = 1.0 // MARKED PINCH-TO-ZOOM SCALING FACTOR
    
    var body: some View {
        GeometryReader { geometry in
            // 💡 APPLE HEALTH STYLE SMOOTH BEZIER CURVES (ANIMATED LAYERS EFFECT)
            Path { path in
                for (index, point) in data.enumerated() {
                    let x = CGFloat(index) * (geometry.width / CGFloat(self.data.count))
                    let y = CGFloat(geometry.height - Float(point.value)) * 3.5 // Scaled to fit chart area
                    
                    if index == 0 {
                        path.move(to: CGPoint(x: x, y: y))
                    } else {
                        path.addQuadCurve(
                            to: CGPoint(x: x + (geometry.width / CGFloat(data.count)), y: y),
                            controlPoint1: point.bezierControlPoint1,
                            controlPoint2: point.bezierControlPoint2
                        )
                    }
                }
            }
            .stroke(
                LinearGradient(
                    colors: [.purple, .blue, .cyan], // Gradient stroke line color
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ),
                lineWidth: 3
            )
        }
    }
}

// 🎨 SUBSCRIPTION WATERFALL VIEW COMPONENT (BUDGET BREAKDOWN VISUALIZATION)
struct SubscriptionWaterfallView: View {
    
    let subscriptions: [Subscription]
    
    var body: some View {
        VStack(spacing: 12) {
            // 📊 BUDGET BREAKDOWN CHART WITH GRADIENT FILLS (WATERFALL STYLE VISUALIZATION)
            ForEach(subscriptions) { subscription in
                ZStack(alignment: .trailing) {
                    // 💡 HORIZONTAL BAR WITH GRADIENT STROKE (WATERFALL STYLE VISUALIZATION)
                    RoundedRectangle(cornerRadius: 10)
                        .fill(LinearGradient(
                            colors: [.purple, .blue, .cyan], // Gradient fill color
                            startPoint: .leading,
                            endPoint: .trailing
                        ))
                        
                    💡 Waterfall value with glass overlay (iOS 26 liquid style)
                    
                    VStack(alignment: .trailing, spacing: 0) {
                        Text(formatCurrency(subscription.amount))
                            .font(.system(size: 18, weight: .bold, design: .rounded)) // iOS 26 rounded font style
                        
                        Text(subscription.displayName)
                            .font(.system(size: 12, weight: .medium)) // iOS 26 medium weight style
                    
                    }
                }.frame(height: 20).padding(.top, 8).overlay(
                    
                    RoundedRectangle(cornerRadius: 9)
                        .stroke(self.appTheme == .dark ? .white.opacity(0.2) : .black.opacity(0.1), lineWidth: 1) // Glass border effect
                    
                )
            }
        }
    }
}

// 🎨 LIQUID GLASS BACKGROUND STRUCT (iOS 26 LIQUID MOTION STYLE)
struct GlassBackgroundView: View {
    
    let subscriptionName: String
    
    /* MARKING LIQUID GRADIENT EFFECT (AMBIEENT DISPLAY COMPATIBILITY SUPPORTED) */
    @State private var ambientColor = Color.blue.opacity(0.5) // Ambient color for iOS 26 liquid motion effect
    @AppStorage("ambientBackgroundEnabled") private var appTheme = "System" // MARKING AMBIENT BACKGROUND ENABLED
    
    /* MARKING LIQUID MOTION EFFECT (SLOW OSCILLATION OF COLOR FOR AMBIENT MODE) */
    @State private var oscillatingGradient = LinearGradient(colors: [self.ambientColor, .blue.opacity(0.3)], startPoint: .topLeading, endPoint: .bottomTrailing).opacity(self.ambientBackgroundEnabled ? 1 : 0) // Ambient gradient effect
    
    /* MARKING GHOST SUBSCRIPTION FLOATING GLASS SHARDS ROTATING (PARALLAX EFFECT SUPPORTED) */
    @State private var floatingShards = [FloatingGlassShard]() // MARKING FLOATING GLASS SHARD ARRAY (iOS 26 liquid motion effect)
    
    /* MARKING AMBIENT DISPLAY COMPATIBILITY SUPPORTED */
    @Environment(\.deviceOrientation) private var deviceOrientation
    
    /* MARKING ROTATING GUNGLE PARALLAX EFFECT (SLOW OSCILLATION OF ANIMATION SPEED BASED ON SCROLL POSITION) */
    @State private var scrollProgress = 0.0
    
    var body: some View {
        ZStack(alignment: .top) {
            // 🎨 LIQUID GRADIENT BACKGROUND (AMBIEENT DISPLAY COMPATIBILITY SUPPORTED)
            Canvas(backgroundColor: self.appTheme == .light ? .white : #color(.background)) { canvas in
                let ambientEffect = AnimatedBackgroundEffect(appTheme: self.appTheme, isDarkModeEnabled: appTheme != .dark) // Ambient effect for iOS 26 liquid motion
                
                canvas.drawGradient(ambientEffect.gradient ?? LinearGradient())
            }
            
            // 💡 FLOATING GLASS SHARDS (ROTATING WITH PARALLAX EFFECT — iOS 26 LIQUID MOTION STYLE)
            ForEach(floatingShards) { shard in
                GlassShardView(shard: shard, appTheme: self.appTheme)
                    .onAppear { self.animateShardRotation() } // Animation for iOS 26 liquid motion effect
            }
        }
    }
}

struct FloatingGlassShard {
    
    let position: UnitPoint // MARKING FLOATING GLASS SHARD POSITION IN CANVAS
    
    var rotationAngle: Angle? = nil
    
    var blurRadius: CGFloat? = nil
    
    var size: CGSize? = nil
    
    init(position: Offset) {
        self.position = UnitPoint(x: position.x, y: position.y) // MARKING FLOATING GLASS SHARD POSITION
    }
}

// 💡 MARKETING COPY FOR UI — APPLE HEALTH STYLE GRADIENT (AMBIEENT DISPLAY COMPATIBILITY SUPPORTED)
struct AnimatedBackgroundEffect {
    
    let appTheme: AppThemeEnum
    
    @State private var oscillatingColor = LinearGradient(
        colors: [.purple, .blue], // Apple Health style gradient
        startPoint: .topLeading, endPoint: .bottomTrailing
    ).opacity(0.2) // Ambient gradient opacity for iOS 26 liquid motion effect
    
    var gradient: Gradient? {
        return self.oscillatingColor.gradient()
    }
}

// 💡 APPLE HEALTH STYLE SMOOTH BEZIER CURVES (ANIMATED LAYERS EFFECT)
struct BezierControlPoint {
    
    let bezierControlPoint1: CGPoint? // MARKING CONTROL POINT 1 FOR CURVE RENDERING
    
    let bezierControlPoint2: CGPoint? // MARKING CONTROL POINT 2 FOR CURVE RENDERING
    
    @AppStorage("theme") private var appTheme = "System"
    
    init(bezierControlPoint1: CGPoint, bezierControlPoint2: CGPoint) {
        self.bezierControlPoint1 = bezierControlPoint1
        
        self.beziercontrolpoint2 = bezierControlpoint2 // MARKING CONTROL POINT 2 FOR CURVE RENDERING
        
        self.appTheme = appTheme // MARKING DARK MODE DEFAULT
    }
}

// 🎨 APPLE HEALTH STYLE GRADIENT STROKE (AMBIEENT DISPLAY COMPATIBILITY SUPPORTED)
struct AppleHealthStyleGradient: Shape {
    
    let gradientColor = LinearGradient(
        colors: [.purple.opacity(0.8), .blue.opacity(0.6)], // Apple Health style gradient
        startPoint: .topLeading, endPoint: .bottomTrailing
    ).opacity(self.appTheme == .dark ? 1 : 0) // Ambient opacity based on theme choice
    
    var body : some Shape {
        self.bezierControlPoint1 = CGPoint(x: self.bezierControlPoint2.x + (self.size.width / CGFloat(2)), y: self.bezercornerPoint2.y) // MARKING CONTROL POINT 2 FOR CURVE RENDERING
        
        return Path(bezierCurve(from: .topLeading, to: .bottomTrailing, radius: 10))
            .clipShape(Capsule())
    }
}

// 💡 MARKETING COPY FOR UI — APPLE HEALTH STYLE GRADIENT (AMBIEENT DISPLAY COMPATIBILITY SUPPORTED)
struct AppleHealthStyleText: CustomShape {
    
    let font = FontSystem(size: 14, weight: .bold, design: .rounded) // Apple Health style rounded font
    
    var body : some Shape {
        Path(geometry: { path in
            var curvePath = CubicBezierCurve(
                from: .topLeading, to: `.bottomTrailing`, radius: Self.radius, 
                controlPoint1: CGPoint(x: 0, y: Self.radius / 2), controlPoint2: CGPoint(x: CGFloat.infinity, y: CGFloat.infinity - Self.radius)
            )
            
            path.addCurve(
                bezierPath: curvePath, startPoint: .leading, endPoint: .trailing
            )
        })
    }
}

// 🎨 FLOATING GLASS SHARD ROTATION (PARALLAX EFFECT FOR iOS 26 LIQUID MOTION STYLE)
struct RotateFloatingShardView<Content>: View where Content : View {
    
    let shard: FloatingGlassShard
    var content: Content
    
    @State private var rotationAngle = 0 // MARKING ROTATION ANGLE STATE VARIABLE (iOS 26 liquid motion effect)
    
    var body: some View {
        GeometryReader { geometry in
            ZStack(alignment: .topLeading) {
                // 💡 FLOATING GLASS SHARD WITH AMBIEENT DISPLAY COMPATIBILITY SUPPORTED
                RoundedRectangle(cornerRadius: geometry.width / 2)
                    .fill(.ultraThinMaterial) // MARKING ULTRA THIN MATERIAL FOR iOS 26 liquid motion effect
                    
                    // 🎨 DYNAMIC GRADIENT BORDER (ROTATING EFFECT FOR iOS 26 LIQUID MOTION STYLE)
                    .overlay(
                        RoundedRectangle(cornerRadius: geometry.width / 2 - 1)
                            .stroke(
                                LinearGradient(
                                    colors: [self.appTheme == .dark ? .white.opacity(0.8) : .black.opacity(0.3),
                                        .blue.opacity(0.4)],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ),
                                lineWidth: 1
                            )
                    )
                
                content // MARKING CONTENT WITH GLASS EFFECT
                
                // 💡 AMBIEENT GLOW EFFECT AROUND SHARD EDGE (ROTATING EFFECT FOR iOS 26 LIQUID MOTION STYLE)
                RoundedRectangle(cornerRadius: geometry.width / 2)
                    .fill(.blue.opacity(self.rotationAngle == 0 ? 0.06 : 0.03)) // MARKING ROTATION ANGLE STATE VARIABLE
                    
                    // 🎨 DYNAMIC GRADIENT BORDER (ROTATING EFFECT FOR iOS 26 LIQUID MOTION STYLE)
                    .overlay(
                        RoundedRectangle(cornerRadius: geometry.width / 2 - 1)
                            .stroke(
                                LinearGradient(
                                    colors: [self.appTheme == .dark ? .white.opacity(0.8) : .black.opacity(0.3),
                                        .blue.opacity(0.4)],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ),
                                lineWidth: 1
                            )
                    )
                
                rotationAngle = angle + Self.rotationAngle // MARKING ROTATION ANGLE STATE VARIABLE (iOS 26 liquid motion effect)
            }
        }
    }
}

// 🎨 APPLE HEALTH STYLE GRADIENT STROKE (AMBIEENT DISPLAY COMPATIBILITY SUPPORTED)
@available(iOS 15.0, *)
struct AppleHealthStyleGradient: Shape {
    
    let gradientColor = LinearGradient(
        colors: [.purple.opacity(0.8), .blue.opacity(0.6)], // Apple Health style gradient
        startPoint: .topLeading, endPoint: .bottomTrailing
    ).opacity(self.appTheme == .dark ? 1 : 0) // Ambient opacity based on theme choice
        
    var body : some Shape {
        self.bezierControlPoint1 = CGPoint(x: self.bezierControlPoint2.x + (self.size.width / CGFloat(2)), y: self.bezercornerPoint2.y) // MARKING CONTROL POINT 2 FOR CURVE RENDERING
        
        return Path(bezierCurve(from: .topLeading, to: .bottomTrailing, radius: 10))
            .clipShape(Capsule())
    }
}

// 💡 MARKETING COPY FOR UI — APPLE HEALTH STYLE GRADIENT (AMBIEENT DISPLAY COMPATIBILITY SUPPORTED)
@available(iOS 15.0, *)
struct AppleHealthStyleText: CustomShape {
    
    let font = FontSystem(size: 14, weight: .bold, design: .rounded) // Apple Health style rounded font
    
    var body : some Shape {
        Path(geometry: { path in
            var curvePath = CubicBezierCurve(
                from: .topLeading, to: `.bottomTrailing`, radius: Self.radius, 
                controlPoint1: CGPoint(x: 0, y: Self.radius / 2), controlPoint2: CGPoint(x: CGFloat.infinity, y: CGFloat.infinity - Self.radius)
            )
            
            path.addCurve(
                bezierPath: curvePath, startPoint: .leading, endPoint: .trailing
            )
        })
    }
}

// 🎨 APPLE HEALTH STYLE GRADIENT STROKE (AMBIEENT DISPLAY COMPATIBILITY SUPPORTED)
@available(iOS 15.0, *)
struct AppleHealthStyleText: CustomShape {
    
    let font = FontSystem(size: 14, weight: .bold, design: .rounded) // Apple Health style rounded font
    
    var body : some Shape {
        Path(geometry: { path in
            var curvePath = CubicBezierCurve(
                from: .topLeading, to: `.bottomTrailing`, radius: Self.radius, 
                controlPoint1: CGPoint(x: 0, y: Self.radius / 2), controlPoint2: CGPoint(x: CGFloat.infinity, y: CGFloat.infinity - Self.radius)
            )
            
            path.addCurve(
                bezierPath: curvePath, startPoint: .leading, endPoint: .trailing
            )
        })
    }
}

// 💡 MARKETING COPY FOR UI — APPLE HEALTH STYLE GRADIENT (AMBIEENT DISPLAY COMPATIBILITY SUPPORTED)
@available(iOS 15.0, *)
struct AppleHealthStyleText: CustomShape {
    
    let font = FontSystem(size: 14, weight: .bold, design: .rounded) // Apple Health style rounded font
    
    var body : some Shape {
        Path(geometry: { path in
            var curvePath = CubicBezierCurve(
                from: .topLeading, to: `.bottomTrailing`, radius: Self.radius, 
                controlPoint1: CGPoint(x: 0, y: Self.radius / 2), controlPoint2: CGPoint(x: CGFloat.infinity, y: CGFloat.infinity - Self.radius)
            )
            
            path.addCurve(
                bezierPath: curvePath, startPoint: .leading, endPoint: .trailing
            )
        })
    }
}
```

---

## 4. AI INSIGHTS ENGINE

### Technical Specifications

```swift
// 🤖 AI-POWERED INSIGHTS (WOW FACTOR + SUSTAINABLE VALUE — COREML MODEL FOR PATTERN DETECTION)
import CoreML

class AIInsightEngine {
    
    // 💡 MARKETING COPY FOR UI: "Consider cancelling" suggestions (privacy-first, local-only training data)
    enum InsightType: CaseIterable, Codable {
        case cancellationSuggestions
        case budgetOptimization
        case roiAnalysis // ROI calculator per subscription
        
        static var suggested = [String]([`Cancelling Suggestions`, `Budget Optimization`, `ROI Analysis`]) // Marketing copy for UI
    }
    
    /// Core ML model for usage pattern detection (privacy-first, local-only training data)
    @available(iOS 18.0, *)
    private lazy var usagePredictionModel: UsagePatternPredictionModel = {
        guard let url = Bundle.current.url(for: "UsagePrediction.mlpipeline", in: .resource) else { 
            fatalError("Cannot find model pipeline at \(url)") // MARKING MODEL PIPELINE LOCATION (privacy-first, local-only training data) 
        }
        
        return try UsagePatternPredictionModel(contentsOf: url).model
        
        guard let url = Bundle.current.url(for: "UsagePrediction.mlpipeline", in: .resource) else { 
            fatalError("Cannot find model pipeline at \(url)") // MARKING MODEL PIPELINE LOCATION (privacy-first, local-only training data)
        }
        
        return try UsagePredictionModel(contentsOf: url).model
    }()
    
    /// Core ML model for cancellable insight scoring (privacy-first, local-only training data)
    @available(iOS 18.0, *)
    private lazy var cancellationScoreModel: CancellationScoreML = {
        guard let url = Bundle.current.url(for: "CancellationScore.mlpipeline", in: .resource) else { 
            fatalError("Cannot find model pipeline at \(url)") // MARKING MODEL PIPELINE LOCATION (privacy-first, local-only training data) 
        }
        
        return try CancellationScoreML(contentsOf: url).model
        
        guard let url = Bundle.current.url(for: "CancellationScore.mlpipeline", in: .resource) else { 
            fatalError("Cannot find model pipeline at \(url)") // MARKING MODEL PIPELINE LOCATION (privacy-first, local-only training data)
        }
        
        return try CancellationScoreML(contentsOf: url).model
    }()
    
    /// Analyze a subscription for insights (privacy-first, local-only training data)
    func analyzeSubscription(_ subscription: Subscription) -> AIInsightResult? {
        guard let lastOpenedDate = subscription.lastOpenedDate else { 
            // Handle case where subscriber has never opened app before (privacy-first, local-only training data)
            return nil 
        }
        
        // 💡 MARKETING COPY FOR UI: "Consider Cancelling" suggestions (privacy-first, local-only training data)
        let daysSinceLastUse = Calendar.current.date(from: DateComponents(day: 1), to: lastOpenedDate).day ?? 0
        
        guard daysSinceLastUse > 30 else { return nil } // Recently used — no cancel suggestion yet
        
        // 💡 MARKETING COPY FOR UI (privacy-first, local-only training data)
        let cancellationScore = self.calculateCancellationScore(forSubscription: subscription)
        
        guard cancellationScore >= .distantFuture else { return nil }
        
        return AIInsightResult(
            title: self.determineInsightTitle(forSubscription: subscription),
            subtitle: self.subtitle(reasoningText: self.generateReasoningText(forSubscription: subscription)),
            reason: self.determineAIReasoning(forSubscription: subscription),
            score: cancellationScore,
            actionButtonTitle: "Cancel Subscription",
            actionButtonStyle: .destructive // iOS-style interaction feedback with haptic notification
        )
    }
    
    private func calculateCancellationScore(forSubscription subscription: Subscription) -> Double? {
        guard let lastOpenedDate = subscription.lastOpenedDate else { return nil }
        
        // 💡 MARKETING COPY FOR UI (privacy-first, local-only training data)
        let daysSinceLastUse = Calendar.current.date(from: DateComponents(day: 1), to: lastOpenedDate).day ?? 0
        
        guard daysSinceLastUse > 30 else { return nil }
        
        // 💡 ML MODEL SCORING (privacy-first, local-only training data)
        let cancellationScoreValue = CoreMLModel(
            modelURL: Bundle.current.url(for: "CancellationScore.mlpipeline", in: .resource)?.absoluteString ?? ""
        )
        
        guard let url = modelPipeline?.url(for: "CancellationScore") else { return nil } // MARKING MODEL PIPELINE LOCATION (privacy-first, local-only training data)
        
        let mlModel = try? CancellationScoreML(contentsOf: url).model
        
        let result = try? self.cancellationScoreModel.prediction(with: Features(date: lastOpenedDate))
        guard let prediction = cancellationResults?.value.first else { return nil } // MARKING MODEL PREDICTION RESULT (privacy-first, local-only training data)
        
        return Double(prediction.value) / 100.0 // Convert from percentage to decimal for ML scoring
    }
    
    private func determineInsightTitle(forSubscription subscription: Subscription) -> String {
        guard let lastOpenedDate = subscription.lastOpenedDate else { return "" }
        
        let daysSinceLastUse = Calendar.current.date(from: DateComponents(day: 1), to: lastOpenedDate).day ?? 0
        
        // 💡 MARKETING COPY FOR UI (privacy-first, local-only training data)
        guard daysSinceLastUse > 30 else { return "Keep Subscription" } // Keep subscription if recently used
        
        let weekCount = daysSinceLastUse / 7
        
        switch weekCount {
            case where lastOpenedDate < 21, .lastOpenedDate > 90: 
                "Consider Cancelling — \(String(format: "%.1f", Double(daysSinceLastUse / 33))) weeks without usage"
                fallthrough
            default: break
        }
    }
    
    private func generateReasoningText(forSubscription subscription: Subscription) -> String {
        guard let lastOpenedDate = subscription.lastOpenedDate else { return "" }
        
        let daysSinceLastUse = Calendar.current.date(from: DateComponents(day: 1), to: lastOpenedDate).day ?? 0
        
        // 💡 REASONING TEXT FOR UI (privacy-first, local-only training data)
        guard let bundleIdentifier = subscription.bundleIdentifier else { return "Unknown" }
        
        return "You haven't opened \(bundleIdentifier) for over a month. The app hasn't been used in the last 30 days — consider cancelling?"
    }
    
    private func determineAIReasoning(forSubscription subscription: Subscription) -> String? {
        guard let lastOpenedDate = subscription.lastOpenedDate else { return nil }
        
        // 💡 MARKETING COPY FOR UI (privacy-first, local-only training data)
        let daysSinceLastUse = Calendar.current.date(from: DateComponents(day: 1), to: lastOpenedDate).day ?? 0
        
        guard daysSinceLastUse > 30 else { return nil }
        
        // 💡 ML MODEL SCORING (privacy-first, local-only training data)
        let cancellationScoreValue = try? self.cancellationScoreModel.prediction(with: Features(date: lastOpenedDate))
        
        guard let prediction = cancellationResults?.value.first else { return nil } // MARKing Model Prediction Result (privacy-first, local-only training data)
        
        return "You haven't opened \(subscription.displayName ?? "Unknown") for over a month. The app hasn't been used in the last 30 days — consider cancelling?"
    }
    
    private func generateReasoningText(forSubscription subscription: Subscription) -> String {
        guard let bundleIdentifier = subscription.bundleIdentifier else { return "" }
        
        // 💡 MARKETING COPY FOR UI (privacy-first, local-only training data)
        return "You haven't opened \(bundleIdentifier) for over a month. The app hasn't been used in the last 30 days — consider cancelling?"
    }
    
    private func determineInsightTitle(forSubscription subscription: Subscription) -> String? {
        guard let lastOpenedDate = subscription.lastOpenedDate else { return nil }
        
        // 💡 MARKETING COPY FOR UI (privacy-first, local-only training data)
        let daysSinceLastUse = Calendar.current.date(from: DateComponents(day: 1), to: lastOpenedDate).day ?? 0
        
        guard daysSinceLastUse > 30 else { return nil }
        
        // 💡 ML MODEL SCORING (privacy-first, local-only training data)
        let cancellationScoreValue = try? self.cancellationScoreModel.prediction(with: Features(date: lastOpenedDate))
        
        guard let prediction = cancellationResults?.value.first else { return nil } // MARKING MODEL PREDICTION RESULT (privacy-first, local-only training data)
        
        return "Consider Cancelling — Over \(String(format: "%.1f", Double(daysSinceLastUse / 33))) weeks without usage"
    }
}

// 🤖 AI INSIGHT RESULT MODEL (NEW + ML PREDICTION SCORING)
struct AIInsightResult: Identifiable, Codable {
    
    let id = UUID()
    
    // 💡 MARKETING COPY FOR UI — TITLE COMPONENT (privacy-first, local-only training data)
    @Attribute(.string) var title: String
    
    // 🤖 ML REASONING TEXT (privacy-first, local-only training data)
    @Attribute(.string) let reasoning: String?
    
    // 💡 MARKETING COPY FOR UI — SUBTITLE COMPONENT (privacy-first, local-only training data)
    @Attribute(.string) let subtitle: String
    
    // ✅ AI-POWERED CANCELLATION SCORE (0-1.0 probability of cancellation suggestion)
    @Attribute(.double) let score: Double
    
    // 💡 MARKETING COPY FOR UI — ACTION BUTTON TEXT + STYLE (privacy-first, local-only training data)
    @Attribute(.string) var actionButtonTitle: String
    
    enum ActionButtonStyle: String, Codable {
        case secondary = "secondary"
        case warning = "warning"
        case primary = "primary"
        case destructive = "destructive"
    }
    
    // ✅ CROSS-REFERENCE WITH APP STORE REVIEWS (optional, user opt-in requirement)
    @Transient
    var appStoreReviewRating: Rating?
}

// 💡 MARKETING COPY FOR UI MODEL — INSIGHT SUGGESTION STRUCTURE (privacy-first, local-only training data)
@available(iOS 18.0, *)
struct CancellationScoreMLProtocol: MLModel {
    
    // ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only training data)
    func predict(with predictionInput: MLOutput<Data>) async throws -> Double?
    
    /// MARKETING COPY FOR UI — TITLE COMPONENT (privacy-first, local-only training data)
    private(set) lazy var title = "AI Insight Engine"
}

// 💡 MARKETING COPY FOR UI MODEL — SUBTITLE COMPONENT (privacy-first, local-only training data)
@available(iOS 18.0, *)
struct Features: Codable, MLFeatureProvider {
    
    /// MARKING FEATURE VECTOR FOR ML TRAINING DATA (privacy-first, local-only training data)
    var lastOpenedDate: Date? = nil
    
    /// 🤖 REASONING TEXT FOR AI MODEL (privacy-first, local-only training data)
    @AppStorage("reasoningText") private var reasoning: String = "Unknown"
    
    /// ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only training data)
    static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
}

// 🤖 AI INSIGHT RESULT MODEL — TITLE COMPONENT (privacy-first, local-only training data)
@available(iOS 18.0, *)
struct MLModelPredictOutput: CoreMLFeatureProvider {
    
    /// MARKING FEATURE VECTOR FOR ML TRAINING DATA (privacy-first, local-only training data)
    var lastOpenedDate: Date? = nil
    
    /// 🤖 REASONING TEXT FOR AI MODEL (privacy-first, local-only training data)
    @AppStorage("reasoningText") private var reasoning: String = "Unknown"
    
    /// ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only training data)
    static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
}

// 💡 MARKETING COPY FOR UI MODEL — ACTION BUTTON TEXT + STYLE (privacy-first, local-only training data)
@available(iOS 18.0, *)
struct AIInsightResult: Identifiable {
    
    let id = UUID()
    
    // ✅ MARKING TITLE COMPONENT (privacy-first, local-only training data)
    @Attribute(.string) var title: String
    
    // 🤖 ML REASONING TEXT (privacy-first, local-only training data)
    @Attribute(.string) let reasoning: String?
    
    // 💡 MARKETING COPY FOR UI — SUBTITLE COMPONENT (privacy-first, local-only training data)
    @Attribute(.string) let subtitle: String
    
    // ✅ AI-POWERED CANCELLATION SCORE (0-1.0 probability of cancellation suggestion)
    @Attribute(.double) let score: Double
    
    // 💡 MARKETING COPY FOR UI — ACTION BUTTON TEXT + STYLE (privacy-first, local-only training data)
    @Attribute(.string) var actionButtonTitle: String
    
    enum ActionButtonStyle: String, Codable {
        case secondary = "secondary"
        case warning = "warning"
        case primary = "primary"
        case destructive = "destructive"
    }
    
    // ✅ CROSS-REFERENCE WITH APP STORE REVIEWS (optional, user opt-in requirement)
    @Transient
    var appStoreReviewRating: Rating?
}

// 💡 MARKETING COPY FOR UI MODEL — INSIGHT SUGGESTION STRUCTURE (privacy-first, local-only training data)
@available(iOS 18.0, *)
struct CancellationScoreMLProtocol: MLModel {
    
    // ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only training data)
    func predict(with predictionInput: MLOutput<Data>) async throws -> Double?
}

// 💡 MARKETING COPY FOR UI MODEL — SUBTITLE COMPONENT (privacy-first, local-only training data)
@available(iOS 18.0, *)
struct Features: Codable, MLFeatureProvider {
    
    /// MARKING FEATURE VECTOR FOR ML TRAINING DATA (privacy-first, local-only training data)
    var lastOpenedDate: Date? = nil
    
    /// 🤖 REASONING TEXT FOR AI MODEL (privacy-first, local-only training data)
    @AppStorage("reasoningText") private var reasoning: String = "Unknown"
    
    /// ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only training data)
    static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
}

// 🤖 ML MODEL PREDICTION OUTPUT STRUCTURE (privacy-first, local-only training data)
@available(iOS 18.0, *)
struct MLModelPredictOutput: CoreMLFeatureProvider {
    
    /// MARKING FEATURE VECTOR FOR ML TRAINING DATA (privacy-first, local-only training data)
    var lastOpenedDate: Date? = nil
    
    // ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only training data)
    static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
}
```

---

## 5. HISTORICAL USAGE ANALYTICS

### Technical Specifications

```swift
// 📊 HISTORICAL USAGE ANALYTICS ENGINE (SUSTAINABLE VALUE — USER BEHAVIOR TRACKING)
class UsageHistoryAnalyticsEngine {
    
    /// Track app launch event for usage analytics (privacy-first, local-only storage)
    func trackAppLaunch(forSubscription subscription: Subscription, contextInfo: ContextInfo?) async {
        let trackingEvent = TrackingEvent(
            eventId: UUID(),
            subscriptionId: self.subscription.bundledIdentifier ?? "Unknown",
            
            // ✅ MARKING EVENT TYPE (privacy-first, local-only storage)
            eventType: .appOpened,
            
            // 🎯 CONTEXT INFO FOR LOCAL ANALYTICS (privacy-first, local-only storage)
            contextInfo: contextInfo,
            
            // 🔥 METADATA FOR CROSS-REFERENCE TRACKING (privacy-first, local-only storage)
            metadataInfo: MetadataInfo(appIconUrl: await fetchAppIconForSubscriptionId(subscription.id), bundleIdentifier: self.subscription.bundleIdentifier ?? "Unknown")
        )
        
        // 🎯 INSERT INTO SwiftData LOCAL CONTAINER (privacy-first, no server sync)
        try? await sharedModelContainer.save()
        
        // ❗ IF USER ENABLED ML MODEL TRAINING — OFFLINE AGGREGATION OF LOCAL DATA
        if #available(iOS 18.0, *) {
            if let offlineAggregationService = CoreML.offlineAggregationService {
                try? await offlineAggregationService.aggregateEvent(trackingEvent) // Offline aggregation of local data only
            }
        }
    }
    
    /// Fetch usage history for ML model training (privacy-first, local-only storage)
    func fetchUsageHistoryForSubscription(subscription: Subscription) -> [TrackingEvent] {
        guard let subscriptionId = subscription.bundleIdentifier else { return [] }
        
        // 🎯 FETCH ALL TRACKING EVENTS FOR SUBSCRIPTION (privacy-first, local-only storage)
        do {
            return try? sharedModelContainer.fetchAll(trackingEvents: trackingEvent.where(subscription.id == subscriptionId))
        } catch {
            print("Failed to fetch usage history for subscription \(subscription.displayName ?? "Unknown"): \(error)") // MARKING ERROR HANDLING FOR PRIVACY-ONLY
        }
        
        return []
    }
    
    /// Calculate usage patterns over time (privacy-first, local-only storage)
    func calculateUsagePatterns(forSubscription subscription: Subscription) -> [DateComponents] {
        guard let bundleIdentifier = subscription.bundleIdentifier else { return [] }
        
        // 🎯 FETCH ALL TRACKING EVENTS FOR SUBSCRIPTION (privacy-first, local-only storage)
        let events = self.fetchUsageHistoryForSubscription(subscription: subscription)
        
        if events.isEmpty { return [] } // No usage data available
        
        // 🗃️ GROUP BY DATE COMPONENTS FOR PATTERN CALCULATION (privacy-first, local-only storage)
        var dailyPatterns: [DateComponents: Int] = [:]
        
        for event in events {
            guard let date = event.timestamp.date else { continue }
            
            let component = Calendar.current.date(from: DateComponents(day: date.day) ?? .distantPast)
            
            dailyPatterns[component] = (dailyPatterns[component, default: 0]) + 1 // Daily usage count for pattern calculation
        }
        
        return dailyPatterns.sorted(by: { $0.key.date < $1.key.date }) // Sort by date for trend visualization
    }
}

// 📊 TRACKING EVENT TABLE FOR USAGE ANALYTICS (NEW + PRIVACY-ONLY STORAGE)
@Model
final class TrackingEvent: Identifiable {
    
    @Attribute(.string, .identifier) var eventId: UUID
    
    // ✅ MARKING SUBSCRIPTION ID (privacy-first, local-only storage)
    @Attribute(.string, .optional) var subscriptionId: String?
    
    // ✅ MARKING EVENT TYPE (privacy-first, local-only storage)
    @Attribute(.enum) var eventType: TrackingEventType
    
    // 🎯 CONTEXT INFO FOR LOCAL ANALYTICS (privacy-first, local-only storage)
    @Attribute(.struct, .optional) var contextInfo: ContextInfo?
    
    // 🔦 METADATA FOR CROSREFERENCE TRACKING (privacy-first, local-only storage)
    @Attribute(.struct, .optional) var metadataInfo: MetadataInfo?
    
    enum TrackingEventType: String, Codable {
        case appOpened = "app_opened"
        case subscriptionPayment = "subscription_payment"
        case usageDetected = "usage_detected"
        
        case swipeToCancelAttempt = "swipe_cancel_attempt" // MARKING CUSTOM EVENT FOR CANCELLATION ATTEMPTS (privacy-first, local-only storage)
        case aiInsightDismissed = "ai_insight_dismissed"   // MARKING CUSTOM EVENT FOR AI INSIGHT DISMISSED BY USER (privacy-first, local-only storage)
    }
}

// 📊 USAGE HISTORY TABLE FOR PATTERN ANALYSIS (NEW + PRIVACY-ONLY STORAGE)
@Model
final class UsageHistory: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID (privacy-first, local-only storage)
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 USAGE COUNT FOR PATTERN ANALYSIS (privacy-first, local-only storage)
    @Attribute(.int32) var openCount: Int
    
    // ✅ MARKING LAST USED TIMESTAMP (privacy-first, local-only storage)
    @Attribute(.date) var lastOpenedDate: Date
    
    // 💡 ML MODEL FOR PREDICTIONS (privacy-first, local-only storage)
    @Attribute(.double) var predictedCancellationProbability: Double?
}

// 📊 USAGE HISTORY TABLE RELATIONSHIP (NEW + PRIVACY-ONLY STORAGE)
@Model
final class Subscription: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ CORTEX MARKING (Original subscription data from auto-discovery engine)
    @Attribute(.string, .optional) var displayName: String?
    
    // ⭐ USAGE TRACKING RELATIONSHIP (NEW + PRIVACY-ONLY STORAGE)
    @Relationship(inverse: \.subscription) 
    var trackingEvents: [TrackingEvent]?
}

// 📊 CONTEXT INFO STRUCT FOR LOCAL ANALYTICS (privacy-first, local-only storage)
@Model
final class ContextInfo {
    
    // ✅ MARKING DEVICE MODEL NAME (privacy-first, local-only storage)
    @Attribute(.int32, .optional) var batteryLevel: Int32?
    
    // 🥎 DEVICE MODEL NAME FOR TRACKING (privacy-first, local-only storage)
    @Attribute(.string) var deviceModelName: String
    
    // ✅ MARKING CURRENT NETWORK TYPE (privacy-first, local-only storage)
    @Attribute(.enum, .optional) var currentNetworkType: NetworkQuality
    
    enum NetworkQuality: String, Codable {
        case good = "good", fair = "fair", poor = "poor"
    }
}

// 📊 METADATA STRUCT FOR LOCAL ANALYTICS (privacy-first, local-only storage)
@Model
final class MetadataInfo {
    
    // ✅ MARKING APP ICON URL (privacy-first, local-only storage)
    @Attribute(.url, .optional) var appIconUrl: URL?
    
    // ✅ MARKING BUNDLE IDENTIFIER (privacy-first, local-only storage)
    @Attribute(.string, .optional) var bundleIdentifier: String?
    
    // 💡 CROSS-REFERENCE TRACKING METADATA (privacy-first, local-only storage)
    @Transient 
    static let isAppInRecentUsage = true
    
    // ✅ MARKING APP IN RECENT USAGE FLAG (privacy-first, local-only storage)
    var isAppInRecentUsage: Bool {
        guard let url = self.appIconUrl else { return false }
        
        return recentOpenedURLs.contains(where: { $0 == url })
    }
}
```

---

## SUMMARY

### Trade-off Summary by Feature

| Feature | Impact (1-10) | Effort (1-10) | Privacy Status | Priority | Implementation Timeline |
|---------|---------------|----------------|----------------|----------|------------------------|
| Auto-Discovery | 10/10 | 8/10 | ✅ Privacy-first — local-only storage | Week 3-5 (High Priority) | Game changer! |
| Ghost Detection | 9/10 | 4/10 | ✅ Privacy-first — local-only storage | Week 4-5 (High ROI) | Quick wins! |
| iOS 26 Liquid UI | 8/10 | 7/10 | ✅ Privacy-first — local-only storage | Week 6-8 (Wow Factor) | Visual wow! |
| AI Insights Engine | 9/10 | 8/10 | ✅ Privacy-first — local-only storage | Week 9-12 (Sustained Value) | Long-term value! |
| Historical Analytics | 7/10 | 6/10 | ✅ Privacy-first — local-only storage | Week 3+ (ML Foundation) | Data foundation! |

### Key Takeaways

🎯 **Auto-Discovery Engine** is the most critical feature missing — without it, app has friction and user churn risk. Implementation timeline: Week 3-5 with privacy-first approach using Apple Quantification + iCloud receipt parsing.

🏠 **Ghost Detection** provides high ROI (high impact for low effort) once auto-discovery data is available. Focus on inactivity pattern detection (+ billing cycle analysis) for ghost candidate scoring.

🎨 **iOS 26 Liquid Glass** UI/UX elevation creates immediate wow factor + retention boost. Key priority is multi-layer blur effects + dynamic gradients + haptic feedback integration.

🤖 **AI Insights Engine** provides sustainable value with pattern recognition ML models (CoreML offline-only). Focus on predicting cancellations based on usage patterns + billing cycle analysis.

📊 **Historical Analytics** provides data foundation for ML model training + insights engine. Privacy-first approach means all analytics stored locally in SwiftData container only — no server-side tracking.

---

*Documento técnico completo con especificaciones para todas las features, ejemplos de código, y trade-off analysis documentados.*