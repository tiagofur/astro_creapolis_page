# 📄 ML & Apple Intelligence Specification

## 1. Smart Cancellation Prediction (CoreML)

### Purpose
Predict if a user will likely cancel a subscription based on usage patterns, spending behavior, and engagement signals.

### Architecture
```
Input Features:
├── days_since_last_use (Int)
├── days_until_billing (Int)
├── amount (Double)
├── billing_cycle (String → encoded)
├── category (String → encoded)
├── historical_cancel_count (Int)
├── response_rate_to_alerts (Double)
└── app_opens_last_30_days (Int)

Output:
├── cancellation_probability (Double 0.0-1.0)
├── confidence_level (Double)
└── top_3_reasons [String]
```

### Model Details
- **Type**: On-device CoreML (Tabular Regression + Classification)
- **Privacy**: All processing locally, NO server calls
- **Training**: Initial seed model, user data improves over time
- **Update Frequency**: Monthly retraining on-device

### Privacy-First Approach
- ✅ All data stays on device
- ✅ No cloud processing
- ✅ Differential privacy if sharing aggregate data
- ✅ User can opt-out of ML improvements

---

## 2. Spending Forecast (Time Series)

### Purpose
Forecast monthly/yearly spending based on historical subscription data and trends.

### Architecture
```
Input:
├── past_12_months_spending_history [Double]
├── active_subscription_count (Int)
├── avg_monthly_new_subs (Double)
├── churn_rate (Double)
└── seasonal_factors [Double]

Output:
├── predicted_next_month (Double)
├── predicted_next_3_months [Double]
├── confidence_interval (min, max)
└── trend_indicator (up/down/stable)
```

### Model Details
- **Type**: On-device Linear Regression + Seasonal Decomposition
- **Data Window**: 12 months rolling
- **Update**: Real-time as subscriptions change

---

## 3. Category Smart Detection (On-device NLP)

### Purpose
Automatically detect and suggest category for new subscriptions using on-device ML.

### Architecture
```
Input:
├── subscription_name (String)
├── bundle_identifier (String)
├── app_icon_url (URL - optional)
└── metadata [String]

Output:
├── primary_category (String)
├── confidence_score (Double)
├── alternative_categories [String]
└── suggested_color (Hex)
```

### Categories Supported
- Entertainment
- Health & Fitness
- Productivity
- News
- Gaming
- Utilities
- Food & Delivery
- Education
- Finance
- Other

### Implementation
- **Type**: On-device Natural Language Processor
- **Dictionary**: 500+ app names with known categories
- **Fallback**: Keyword matching + category inference

---

## 4. Siri Shortcuts + App Intents

### Current Implementation
- Basic Siri Shortcuts for adding subscriptions
- No dynamic intents

### Enhanced Implementation

#### Available Siri Commands:
```
"Hey Siri, mostrá mis suscripciones"
→ Opens app to subscriptions list

"Hey Siri, agregá Netflix"
→ Opens add subscription with Netflix preset

"Hey Siri, cuánto gasto en suscripciones?"
→ Speaks total monthly spend

"Hey Siri, cancelá Spotify" 
→ Opens Spotify subscription detail

"Hey Siri, quésubs no estoy usando?"
→ Opens Guardian insights

"Hey Siri, cuándo me cobran?"
→ Lists upcoming payments (next 7 days)
```

#### App Intents (iOS 18+)
```swift
// ViewSubscriptionsIntent
// AddSubscriptionIntent  
// CancelSubscriptionIntent
// GetSpendingSummaryIntent
// GetUpcomingPaymentsIntent
// GetUnusedSubscriptionsIntent
```

---

## 5. Apple Intelligence Integration

### Writing Tools (Apple Intelligence)
- Use Writing tools for generating subscription cancellation emails
- Generate expense reports summaries

### Summarization
- Monthly spending summary notifications
- Usage insights digests

### On-Device Processing
- All AI processing uses Device Intelligence
- No cloud AI calls for privacy

---

## 📊 Training Data Collection (Privacy-First)

### What We Collect (Local Only)
```swift
struct LocalTrainingData {
    let subscription_id: UUID
    let days_active: Int
    let cancel_decision: Bool?  // nil if still active
    let response_to_alerts: Double
    let app_opens_per_month: Int
}
```

### Training Flow
1. User uses app normally
2. Data stored locally in SwiftData
3. On-device model updates periodically
4. No external transmission ever

---

## 🎯 Success Metrics

| Feature | Target Accuracy | Latency |
|---------|--------------|--------|
| Cancellation Prediction | >70% | <100ms |
| Spending Forecast | >80% | <50ms |
| Category Detection | >90% | <20ms |

---

## 🔒 Privacy Compliance

- [ ] All processing on-device
- [ ] No cloud AI calls
- [ ] User opt-in for improvements
- [ ] Delete local data option
- [ ] Privacy nutrition labels updated