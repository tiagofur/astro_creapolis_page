# Post-Launch Review — creapolis.dev

## Overview

This document guides the post-launch review after collecting real user data.

**Recommended window**: 7-14 days after launch (minimum)
**Review date**: [FILL IN after data collection]

---

## 1. Baseline Expectations (Pre-Launch)

### Web Vitals Targets

| Metric | Target | p75 Target | Measurement |
|--------|--------|------------|-------------|
| **LCP** | ≤ 2.5s | ≤ 3.0s | Largest Contentful Paint |
| **INP** | ≤ 200ms | ≤ 250ms | Interaction to Next Paint |
| **CLS** | ≤ 0.1 | ≤ 0.15 | Cumulative Layout Shift |
| **FCP** | ≤ 1.8s | ≤ 2.0s | First Contentful Paint |
| **TTFB** | ≤ 800ms | ≤ 1.0s | Time to First Byte |

### Conversion Funnel Targets

| Funnel | Expected Rate | Notes |
|--------|---------------|-------|
| **Home → Services** | 15-25% | Primary conversion path |
| **Services → Contact** | 10-20% | Service interest → action |
| **Home → Products** | 20-30% | Product exploration |
| **Product → Store** | 5-10% | Store link clicks |
| **Blog → CTA** | 3-8% | Content → service interest |
| **Contact Form Completion** | 60-80% | Form starts → submits |

### Analytics Event Baseline

| Event | Expected Frequency | Notes |
|-------|-------------------|-------|
| `page_view` | Every page load | Consent-gated |
| `start_project_click` | 2-5% of sessions | CTA button clicks |
| `contact_form_started` | 1-3% of sessions | Form focus |
| `contact_form_completed` | 0.5-2% of sessions | Successful submit |
| `project_viewed` | 10-20% of sessions | Product page views |
| `service_click` | 5-10% of sessions | Service CTA clicks |
| `store_click` | 1-3% of sessions | App Store / Play Store |
| `blog_read` | 15-25% of sessions | Blog article views |
| `blog_service_cta_click` | 2-5% of blog reads | Blog CTA clicks |
| `language_changed` | 5-10% of sessions | Language switcher |
| `404_viewed` | 1-3% of sessions | Not found pages |

---

## 2. Data Collection Methods

### Web Vitals

**Option A: Chrome UX Report (CrUX)**
- Visit: https://developer.chrome.com/docs/crux/
- URL: `https://creapolis.dev`
- Provides real-world CrUX data (28-day rolling average)

**Option B: Web Vitals Library**
- Add to Layout.astro:
```html
<script type="module">
  import {onLCP, onINP, onCLS} from 'web-vitals';
  onLCP(console.log);
  onINP(console.log);
  onCLS(console.log);
</script>
```
- Monitor via `PUBLIC_ANALYTICS_ENDPOINT`

**Option C: Lighthouse CI**
- Run `npx lighthouse-ci https://creapolis.dev/es/`
- Compare scores weekly

### Analytics Events

1. Set `PUBLIC_ANALYTICS_ENDPOINT` in GitHub Pages environment
2. Events will be sent via `sendBeacon` to your endpoint
3. Alternative: Check browser console for event logs (development mode)

### Error Monitoring

- Check browser console for JavaScript errors
- Monitor 404 pages via `404_viewed` event
- Review network failures in DevTools

---

## 3. Review Checklist

### Week 1 (Days 1-7)

- [ ] Collect baseline CrUX data
- [ ] Verify analytics events are firing
- [ ] Check for JavaScript errors
- [ ] Test all forms on production
- [ ] Verify language switcher works
- [ ] Test mobile experience
- [ ] Check SEO: sitemap, robots.txt, meta tags
- [ ] Review 404 page for common missing routes

### Week 2 (Days 7-14)

- [ ] Compare Web Vitals with targets
- [ ] Analyze conversion funnels
- [ ] Review top-performing blog posts
- [ ] Check which products get most views
- [ ] Identify any broken links
- [ ] Review analytics consent rate
- [ ] Document any UX friction points
- [ ] Prioritize improvements based on data

---

## 4. Analysis Template

### Web Vitals Analysis

```
Metric: [LCP/INP/CLS]
Target: [target value]
Actual: [measured value]
Status: ✅ PASS / ❌ FAIL
Action: [maintain/investigate/fix]
```

### Conversion Analysis

```
Funnel: [path]
Starts: [number]
Completions: [number]
Rate: [percentage]
Target: [target percentage]
Status: ✅ PASS / ❌ FAIL
Action: [maintain/optimize/fix]
```

### Event Analysis

```
Event: [event name]
Count: [total]
Per Session: [rate]
Trend: [increasing/stable/decreasing]
Insight: [observation]
Action: [maintain/investigate/fix]
```

---

## 5. Decision Framework

### Maintain (No Changes Needed)
- Metric meets target
- Trend is stable or improving
- No user complaints

### Iterate (Optimize)
- Metric is close to target (within 10%)
- Clear improvement opportunity exists
- Low risk, high reward

### Fix (Critical Issue)
- Metric misses target by >20%
- Trend is worsening
- Users reporting issues
- Blocking conversions

---

## 6. Sample Review Report

### Date: [FILL IN]
### Reviewer: [FILL IN]
### Data Window: [FILL IN dates]

#### Summary
- **Overall Status**: ✅ PASS / ⚠️ WARNING / ❌ FAIL
- **Key Finding**: [one sentence]
- **Top Priority**: [one action item]

#### Web Vitals
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| LCP | ≤ 2.5s | [value] | [status] |
| INP | ≤ 200ms | [value] | [status] |
| CLS | ≤ 0.1 | [value] | [status] |

#### Conversion Funnels
| Funnel | Target | Actual | Status |
|--------|--------|--------|--------|
| Home→Services | 15-25% | [value] | [status] |
| Services→Contact | 10-20% | [value] | [status] |

#### Key Events
| Event | Count | Rate | Status |
|-------|-------|------|--------|
| start_project_click | [count] | [rate] | [status] |
| contact_form_completed | [count] | [rate] | [status] |

#### Issues Found
1. [issue description]
   - **Impact**: [high/medium/low]
   - **Action**: [fix/ignore/monitor]

#### Recommendations
1. [recommendation 1]
2. [recommendation 2]
3. [recommendation 3]

---

## 7. Next Steps

After this review:
1. Create F062 completion evidence in feature_list.json
2. Document any new tasks discovered
3. Prioritize improvements for next sprint
4. Schedule next review in 30 days

---

## References

- review.md §58: Events to measure
- review.md §63: What to do after launch
- F005: Content truth audit (baseline)
- F057: Privacy-aware analytics (events)
- F058: Conversion funnel QA (verification)
