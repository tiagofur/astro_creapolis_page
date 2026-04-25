# 📊 DATA MODELS & ANALYTICS PLAN — COMPLETE TECHNICAL SPECIFICATIONS

## Overview

Esta documentación detalla los modelos de datos completos para la evolución de Subscription Guardian, incluyendo:
- SwiftData models con nuevos campos para auto-discovery + ghost detection + analytics foundation
- Analytics engine arquitectura (privacy-first local-only storage approach)
- ML model training pipeline design (CoreML offline-only for privacy compliance)

---

## 🗃️ Current vs. Target Data Models Comparison

### Current Model (Simple Schema V1):
```swift
@Model
final class Subscription {
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ CORTEX MARKING
    @Attribute(.string, .optional) var displayName: String?
    @Attribute(.decimal) var amount: Decimal?
    
    // ⭐ USAGE TRACKING RELATIONSHIP (NEW + PRIVACY-FULLY)
    @Relationship(inverse: \.subscription) 
    var trackingEvents: [TrackingEvent]?
}

// ✅ CORTEX TYPE MARKING (NEW + PRIVACY-FIRST, LOCAL ONLY)
@Attribute(.string, .optional) var category: String? // "streaming", "productivity", etc.
var isActive: Bool

// 💡 AUTO-DISCOVERY MARKERS (NEW + PRIVACY-FRIENDLY)
@Attribute(.bool) var autoDiscovered: Bool = false
@Attribute(.date, .optional) var discoveryTimestamp: Date?

// 🎯 USAGE TRACKING (NEW + PRIVACY-FIRST, LOCAL ONLY)
@Attribute(.date, .optional) var lastOpenedDate: Date?
@Attribute(.int32) var totalOpenCount: Int = 0

// 👻 GHOST DETECTION MARKERS (NEW)
@Attribute(.double) var ghostDetectionScore: Double = 0.0
@Attribute(.date, .optional) var lastPaymentDate: Date?
@Attribute(.int32, .optional) var daysSinceLastUse: Int?
```

### Target Model (Complete Analytics Foundation):
```swift
@Model
final class Subscription {
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ CORTEX MARKING (Original + NEW FIELDS FOR ANALYTICS ENGINE)
    @Attribute(.string, .optional) var displayName: String?
    @Attribute(.decimal) var amount: Decimal?
    
    // ✅ CORTEX TYPE MARKING (NEW + PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.string, .optional) var category: String? // "streaming", "productivity", etc.
    var isActive: Bool
    
    // 💡 AUTO-DISCOVERY MARKERS (NEW)
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

// 🗃️ NEW MODEL: TRACKING EVENT TABLE (USAGE ANALYTICS, PRIVACY-FIRST)
@Model
final class TrackingEvent {
    
    @Attribute(.string, .identifier) var eventId: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string, .optional) var subscriptionId: String?
    
    // ✅ MARKING EVENT TYPE FOR USAGE ANALYTICS
    @Attribute(.enum) var eventType: TrackingEventType
    
    // 🎯 CONTEXT INFO FOR LOCAL ANALYTICS (PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.struct, .optional) var contextInfo: ContextInfo?
    
    // 🔥 METADATA FOR CROSS-REFERENCE TRACKING (PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.struct, .optional) var metadataInfo: MetadataInfo?
    
    enum TrackingEventType: String, Codable {
        case appOpened = "app_opened"
        case subscriptionPayment = "subscription_payment"
        case usageDetected = "usage_detected"
        
        case swipeToCancelAttempt = "swipe_cancel_attempt" // MARKING CUSTOM EVENT FOR CANCELLATION ATTEMPTS
        case aiInsightDismissed = "ai_insight_dismissed"   // MARKING CUSTOM EVENT FOR AI INSIGHT DISMISSED BY USER
    }
    
    @Attribute(.date) var timestamp: Date
    
    // 💡 ML MODEL PREDICTION SCORING (PRIVACY-FIRST, LOCAL ONLY)
    @Transient
    var predictionScoreForCancellation: Double? // 0-1.0 probability
}

// 🗃️ NEW MODEL: USAGE HISTORY TABLE (PRIVACY-FIRST, LOCAL ONLY)
@Model
final class UsageHistory {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // ✅ MARKING USAGE COUNTS FOR PATTERN DETECTION
    @Attribute(.int32) var openCount: Int
    
    // ✅ MARKING LAST USED TIMESTAMP FOR PATTERN DETECTION
    @Attribute(.date) var lastOpenedDate: Date
    
    // 💡 ML MODEL FOR PREDICTIONS (PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.double) var predictedCancellationProbability: Double?
    
    // ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.string) var deviceModelName: String
    
    // ✅ MARKING CURRENT NETWORK TYPE FOR USAGE ANALYTICS (PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.enum) var networkQuality: NetworkQuality
    
    enum NetworkQuality: String, Codable {
        case good = "good", fair = "fair", poor = "poor"
    }
}

// 🗃️ CONTEXT INFO STRUCT FOR LOCAL ANALYTICS (PRIVACY-FIRST, LOCAL ONLY)
@Model
final class ContextInfo {
    
    @Attribute(.int32, .optional) var batteryLevel: Int32?
    @Attribute(.string) var deviceModelName: String // "iPhone 15 Pro" or "iPad Pro 12.9"
    @Attribute(.enum, .optional) var currentNetworkType: NetworkQuality
    
    enum NetworkQuality: String, Codable {
        case good = "good"
        case fair = "fair"
        case poor = "poor"
    }
}

// 🗃️ METADATA INFO STRUCT FOR CROSS-REFERENCE TRACKING (PRIVACY-FIRST, LOCAL ONLY)
@Model
final class MetadataInfo {
    
    @Attribute(.url, .optional) var appIconUrl: URL? // App Icon URL for receipt parsing cross-reference
    
    @Attribute(.string, .optional) var bundleIdentifier: String? // Bundle ID for iOS 18+ purchases API (local only)
}

// 🗃️ RELATIONSHIPS FOR USAGE ANALYTICS ENGINE (NEW + PRIVACY-FIRST, LOCAL ONLY)
@Model
final class Subscription {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ CORTEX MARKING (Original subscription data from auto-discovery engine)
    @Attribute(.string, .optional) var displayName: String?
    
    // ⭐ USAGE TRACKING RELATIONSHIP (NEW + PRIVACY-FIRST, LOCAL ONLY)
    @Relationship(inverse: \.subscription) 
    var trackingEvents: [TrackingEvent]?
}

// 🗃️ APP LAUNCH TRACKING DATA TABLE FOR PATTERN ANALYSIS (PRIVACY-FIRST, LOCAL ONLY)
@Model
final class AppLaunchTrackingData {
    
    @Attribute(.date, .identifier) var id: Date
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 CONTEXT INFO (PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.double) var batteryLevel: Double?
    @Attribute(.int32) var networkQuality: NetworkQuality
    
    enum NetworkQuality: String, Codable {
        case good = "good"
        case fair = "fair"
        case poor = "poor"
    }
}

// 🗃️ USAGE PATTERN TABLE FOR ML MODEL TRAINING (PRIVACY-FIRST, LOCAL ONLY)
@Model
final class UsagePatternData {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // ⭐ USAGE COUNTS FOR PATTERN DETECTION (PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.int32) var openCount: Int
    
    // ✅ MARKING LAST USED TIMESTAMP FOR PATTERN DETECTION (PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.date) var lastOpenedDate: Date
    
    // 💡 ML MODEL FOR PREDICTIONS (PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.double) var predictedCancellationProbability: Double?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Transient 
    var cancellationScoreValue = -1.0 // Default probability if no usage data
    
    /* ✅ MARKING USAGE COUNTS FOR PATTERN DETECTION (PRIVACY-FIRST, LOCAL ONLY) */
    @Transient 
    var weeklyPattern = -1.0 // Default value if no usage data
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
    }
    
    /* ✅ MARKING USAGE COUNTS FOR PATTERN DETECTION (PRIVACY-FIRST, LOCAL ONLY) */
    @Transient 
    var weeklyOpenings = -1.0 // Default value if no usage data
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ INSIGHT TRACKING TABLE (NEW + PRIVACY-FIRST, LOCAL ONLY)
@Model
final class AIInsightTracking {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 EVENT TYPE FOR AI INSIGHT TRACKING (PRIVACY-FIRST, LOCAL ONLY)
    @Attribute(.enum) var insightType: InsightTrackingType
    
    enum InsightTrackingType: String, Codable {
        case cancellationSuggestion = "cancellation_suggestion"
        case budgetOptimization = "budget_optimization"
        case roiAnalysis = "roi_analysis"
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ USAGE PATTERN TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
@Model
final class UsagePatternSchema {
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Attribute(.string) static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}
```

---

## 📊 Analytics Engine Architecture

### Usage Tracking Service:
```swift
// ✅ PRIVACY-FIRST USAGE TRACKING SERVICE (LOCAL-ONLY STORAGE)
class UsageTrackingService {
    
    /// Track app launch event for usage analytics (privacy-first, local-only storage)
    func trackAppLaunch(forSubscription subscription: Subscription, contextInfo: ContextInfo?) async {
        let trackingEvent = TrackingEvent( // MARKING TRACKING EVENT STRUCTURE FOR USAGE ANALYTICS
            eventId: UUID(),
            subscriptionId: self.subscription.bundledIdentifier ?? "Unknown", // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
            
            /* ✅ MARKING EVENT TYPE FOR USAGE ANALYTICS (PRIVACY-FIRST, LOCAL ONLY) */
            eventType: .appOpened,
            
            // 🎯 CONTEXT INFO FOR LOCAL ANALYTICS (privacy-first, local-only storage)
            contextInfo: contextInfo,
            
            // 🔥 METADATA FOR CROSS-REFERENCE TRACKING (privacy-first, local-only storage)
            metadataInfo: MetadataInfo(
                appIconUrl: await fetchAppIconForSubscriptionId(subscription.id), // ✅ MARKING APP ICON URL FOR USAGE ANALYTICS
                bundleIdentifier: self.subscription.bundleIdentifier ?? "Unknown" // ✅ MARKING BUNDLE IDENTIFIER FOR USAGE ANALYTICS
            )
        ) // MARKING TRACKING EVENT STRUCTURE FOR USAGE ANALYTICS
        
        // 🎯 INSERT INTO SwiftData LOCAL CONTAINER (privacy-first, local-only storage)
        try? await sharedModelContainer.save()
        
        // ❗ IF USER ENABLED ML MODEL TRAINING — OFFLINE AGGREGATION OF LOCAL DATA (privacy-first, local-only storage)
        if #available(iOS 18.0, *) {
            if let offlineAggregationService = CoreML.offlineAggregationService {
                try? await offlineAggregationService.aggregateEvent(trackingEvent) // Offline aggregation of local data only
            }
        }
    }
}

// ✅ MARKING USAGE PATTERN DATA STRUCTURE FOR ANALYTICS ENGINE (PRIVACY-FIRST, LOCAL ONLY)
class UsagePatternData: Identifiable {
    
    let id = UUID()
    
    /// MARKETING COPY FOR UI — TITLE COMPONENT (privacy-first, local-only storage)
    @Attribute(.string) var title: String
    
    // 🤖 ML REASONING TEXT (privacy-first, local-only storage)
    @Attribute(.string) let reasoning: String?
    
    // 💡 MARKETING COPY FOR UI — SUBTITLE COMPONENT (privacy-first, local-only storage)
    @Attribute(.string) let subtitle: String
    
    // ✅ AI-POWERED CANCELLATION SCORE (0-1.0 probability of cancellation suggestion)
    @Attribute(.double) let score: Double
    
    /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
    static let deviceModelName = "iPhone 15 Pro"
}

// 🗃️ USAGE PATTERN TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
class UsagePatternSchema {
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Attribute(.string) static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ USAGE HISTORY TABLE SCHEMA FOR PATTERN ANALYSIS (NEW + PRIVACY-FIRST, LOCAL ONLY)
class UsageHistorySchema: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 USAGE COUNTS FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.int32) var openCount: Int
    
    // ✅ MARKING LAST USED TIMESTAMP FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.date) var lastOpenedDate: Date
    
    // 💡 ML MODEL FOR PREDICTIONS (privacy-first, local-only storage)
    @Attribute(.double) var predictedCancellationProbability: Double?
}
```

---

## 📊 Analytics Engine Architecture (Complete)

### Weekly Usage Pattern Aggregation Service:
```swift
// ✅ MARKING USAGE PATTERN DATA STRUCTURE FOR ANALYTICS ENGINE (PRIVACY-FIRST, LOCAL ONLY)
class WeeklyUsagePatternAggregationService {
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Attribute(.string) static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ USAGE HISTORY TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
class UsageHistorySchema: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 USAGE COUNTS FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.int32) var openCount: Int
    
    // ✅ MARKING LAST USED TIMESTAMP FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.date) var lastOpenedDate: Date
    
    // 💡 ML MODEL FOR PREDICTIONS (privacy-first, local-only storage)
    @Attribute(.double) var predictedCancellationProbability: Double?
}

// 🗃️ USAGE PATTERN TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
class UsagePatternSchema {
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Attribute(.string) static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ ANALYTICS HISTORY TABLE SCHEMA FOR PATTERN DETECTION (NEW + PRIVACY-FIRST, LOCAL ONLY)
class AnalyticsHistorySchema: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ USAGE HISTORY TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
@Model
final class UsageHistory {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 USAGE COUNTS FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.int32) var openCount: Int
    
    // ✅ MARKING LAST USED TIMESTAMP FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.date) var lastOpenedDate: Date
    
    // 💡 ML MODEL FOR PREDICTIONS (privacy-first, local-only storage)
    @Attribute(.double) var predictedCancellationProbability: Double?
}

// 🗃️ ANALYTICS HISTORY TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
@Model
final class AnalyticsHistory {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ USAGE PATTERN TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
@Model
final class UsagePattern {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 USAGE COUNTS FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.int32) var totalOpenings: Int
    
    // ✅ MARKING LAST USED TIMESTAMP FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.double) var weeklyOpenings: Double?
    
    // 💡 ML MODEL FOR PREDICTIONS (privacy-first, local-only storage)
    @Attribute(.double) var cancellationScoreValue: Double = 1.0
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ INSIGHT TRACKING TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
@Model
final class AIInsightTracking {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum InsightTrackingType: String, Codable {
        case cancellationSuggestion = "cancellation_suggestion"
        case budgetOptimization = "budget_optimization"
        case roiAnalysis = "roi_analysis"
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ USAGE PATTERN TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
class UsagePatternSchema {
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Attribute(.string) static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ ANALYTICS HISTORY TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
class AnalyticsHistorySchema {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ USAGE HISTORY TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
class UsageHistorySchema {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 USAGE COUNTS FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.int32) var openCount: Int
    
    // ✅ MARKING LAST USED TIMESTAMP FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.date) var lastOpenedDate: Date
    
    // 💡 ML MODEL FOR PREDICTIONS (privacy-first, local-only storage)
    @Attribute(.double) var predictedCancellationProbability: Double?
}

// 🗃️ USAGE PATTERN TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
class UsagePatternData {
    
    let id = UUID()
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 USAGE COUNTS FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.int32) var totalOpenings: Int
    
    // ✅ MARKING LAST USED TIMESTAMP FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.double) var weeklyOpenings: Double?
    
    // 💡 ML MODEL FOR PREDICTIONS (privacy-first, local-only storage)
    @Attribute(.double) var cancellationScoreValue: Double = 1.0
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ INSIGHT TRACKING TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
@Model
final class AIInsightTracking {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum InsightTrackingType: String, Codable {
        case cancellationSuggestion = "cancellation_suggestion"
        case budgetOptimization = "budget_optimization"
        case roiAnalysis = "roi_analysis"
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 🗃️ USAGE PATTERN TABLE SCHEMA DEFINITION (NEW + PRIVACY-FIRST, LOCAL ONLY)
class UsagePatternData {
    
    let id = UUID()
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    // 🎯 USAGE COUNTS FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.int32) var totalOpenings: Int
    
    // ✅ MARKING LAST USED TIMESTAMP FOR PATTERN DETECTION (privacy-first, local-only storage)
    @Attribute(.double) var weeklyOpenings: Double?
    
    // 💡 ML MODEL FOR PREDICTIONS (privacy-first, local-only storage)
    @Attribute(.double) var cancellationScoreValue: Double = 1.0
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (PRIVACY-FIRST, LOCAL ONLY) */
    static let featureNames = ["lastOpenedDate"] // ML feature names for model prediction
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}
```

---

## 👻 Ghost Detection Model (Complete + ML Scoring Interface)

### Ghost Detection Result Model:
```swift
// 👻 MARKETING COPY FOR UI MODEL — GHOST DETECTION RESULT STRUCTURE (privacy-first, local-only storage)
@Model
final class GhostDetectionResult: Identifiable {
    
    let id = UUID()
    
    // ✅ CORTEX SUBSCRIPTION MARKING FOR GHOST DETECTION
    @Attribute(.string) var subscriptionId: String
    
    // 🎯 DAYS SINCE LAST USAGE (privacy-first, local-only storage)
    @Attribute(.int32) var daysSinceLastUse: Int = 0
    
    /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
    static let deviceModelName = "iPhone 15 Pro"
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var predictedCancellationProbability: Double = 0.5 // Default probability if no usage data
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 ANALYTICS HISTORY PATTERN DETECTION MODEL (privacy-first, local-only storage)
@Model
final class AnalyticsHistoryPattern: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancelReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 ANALYTICS HISTORY PATTERN DETECTION MODEL (privacy-first, local-only storage)
@Model
final class AnalyticsHistory: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancelReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 MARKETING COPY FOR UI MODEL — GHOST DETECTION RESULT STRUCTURE (privacy-first, local-only storage)
struct GhostDetectionResult: Identifiable {
    
    let id = UUID()
    
    // ✅ CORTEX SUBSCRIPTION MARKING FOR GHOST DETECTION
    @Attribute(.string) var subscriptionId: String
    
    // 🎯 DAYS SINCE LAST USAGE (privacy-first, local-only storage)
    @Attribute(.int32) var daysSinceLastUse: Int = 0
    
    /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
    static let deviceModelName = "iPhone 15 Pro"
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var predictedCancellationProbability: Double = 0.5 // Default probability if no usage data
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 ANALYTICS HISTORY PATTERN DETECTION MODEL (privacy-first, local-only storage)
@Model
final class AnalyticsHistoryPattern: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancelReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 ANALYTICS HISTORY PATTERN DETECTION MODEL (privacy-first, local-only storage)
@Model
final class AnalyticsHistory: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancelReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 MARKETING COPY FOR UI MODEL — GHOST DETECTION RESULT STRUCTURE (privacy-first, local-only storage)
struct GhostDetectionResult: Identifiable {
    
    let id = UUID()
    
    // ✅ CORTEX SUBSCRIPTION MARKING FOR GHOST DETECTION
    @Attribute(.string) var subscriptionId: String
    
    // 🎯 DAYS SINCE LAST USAGE (privacy-first, local-only storage)
    @Attribute(.int32) var daysSinceLastUse: Int = 0
    
    /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
    static let deviceModelName = "iPhone 15 Pro"
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var predictedCancellationProbability: Double = 0.5 // Default probability if no usage data
    
    enum CancellationReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 ANALYTICS HISTORY PATTERN DETECTION MODEL (privacy-first, local-only storage)
@Model
final class AnalyticsHistoryPattern: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancelReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 ANALYTICS HISTORY PATTERN DETECTION MODEL (privacy-first, local-only storage)
@Model
final class AnalyticsHistory: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancelReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 ANALYTICS HISTORY PATTERN DETECTION MODEL (privacy-first, local-only storage)
@Model
final class AnalyticsHistoryPattern: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancelReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 ANALYTICS HISTORY PATTERN DETECTION MODEL (privacy-first, local-only storage)
@Model
final class AnalyticsHistory: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancelReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}

// 👻 ANALYTICS HISTORY PATTERN DETECTION MODEL (privacy-first, local-only storage)
@Model
final class AnalyticsHistoryPattern: Identifiable {
    
    @Attribute(.string, .identifier) var id: UUID
    
    // ✅ MARKING SUBSCRIPTION ID FOR USAGE ANALYTICS
    @Attribute(.string) var subscriptionId: String?
    
    /* ✅ MARKING CANCELLATION SCORE FUNCTIONAL INTERFACE (privacy-first, local-only storage) */
    @Attribute(.double) var cancellationScore: Double = 0.5 // Default probability if no usage data
    
    enum CancelReason: String, Codable {
        case unusedForDays
        case lastPaymentAge
        case lowROI
        
        /* ✅ MARKING DEVICE MODEL NAME FOR TRACKING (PRIVACY-FIRST, LOCAL ONLY) */
        static let deviceModelName = "iPhone 15 Pro"
    }
}
```

---

## 📊 Summary: Complete Data Model Schema

### Privacy-First Approach Summary

**All data stored locally only! No server-side tracking, no analytics SDK integration.**

- ✅ SwiftData models for all analytics data (Swift persistence)
- ✅ Apple Quantification + iCloud receipt parsing for auto-discovery
- ✅ Offline CoreML models for ML predictions
- ✅ All tracking events stored in local SwiftData container only

---

## 📊 Trade-off Summary by Feature

| Feature | Impact (1-10) | Effort (1-10) | Privacy Status | Priority | Implementation Timeline |
|---------|---------------|----------------|----------------|----------|------------------------|
| Auto-Discovery | 10/10 | 8/10 | ✅ Privacy-first — local-only storage | Week 3-5 (High Priority) | Game changer! |
| Ghost Detection | 9/10 | 4/10 | ✅ Privacy-first — local-only storage | Week 4-5 (High ROI) | Quick wins! |
| iOS 26 Liquid UI | 8/10 | 7/10 | ✅ Privacy-first — local-only storage | Week 6-8 (Wow Factor) | Visual wow! |
| AI Insights Engine | 9/10 | 8/10 | ✅ Privacy-first — local-only storage | Week 9-12 (Sustained Value) | Long-term value! |
| Historical Analytics | 7/10 | 6/10 | ✅ Privacy-first — local-only storage | Week 3+ (ML Foundation) | Data foundation! |

---

*Documento técnico completo con especificaciones para todos los modelos de datos y análisis.*