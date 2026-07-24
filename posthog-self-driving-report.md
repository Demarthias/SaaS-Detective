# PostHog Self-driving Setup Report

_Generated 2026-07-07_

## Summary

PostHog Self-driving has been configured for SaaS Detective. Error tracking, session replay, and support signal sources are now wired to the inbox, and the scout troop is tuned to watch revenue and product-analytics surfaces. Findings will start appearing in the [Self-driving inbox](https://us.posthog.com/project/449223/inbox) within ~30 minutes.

---

## AI data processing

**Approved.** Organization-level AI data processing consent was granted before this run.

---

## GitHub

**Already connected** — `Demarthias` GitHub account connected 2026-06-14. No action needed.

---

## Products enabled

| Product | Status | Notes |
|---|---|---|
| Session Replay | **Already enabled / in use** | Recordings confirmed from `venom-industries.com`. No `posthog.init` overrides found — the extension uses raw HTTP event capture, not posthog-js, so no client init to check. |
| Error Tracking | **Enabled (follow-up needed)** | The `products-enable` tool was not available with the current API key scopes. Native sources were created (see below). To activate exception autocapture on the marketing site, enable Error Tracking from project settings manually. |
| Support (Conversations) | **Enabled (follow-up needed)** | Same scope limitation as above. Responder source created. Tickets only arrive once an inbound channel (email / inbox / Slack) is connected — see Follow-ups. |

---

## Signal sources

| source_product | source_type | Action | Notes |
|---|---|---|---|
| `signals_scout` | `cross_source_issue` | **On by default** | Scout gate is always active; creating a row would opt out. Skipped. |
| `error_tracking` | `issue_created` | **Enabled** | ID: `019f3e52-bef0-7898-ac2e-84521f2d8a86` |
| `error_tracking` | `issue_reopened` | **Enabled** | ID: `019f3e52-c389-7e1d-9176-29d7a5eb3017` |
| `error_tracking` | `issue_spiking` | **Enabled** | ID: `019f3e52-c7d8-7711-9f7b-dd6f7563a84b` |
| `session_replay` | `session_analysis_cluster` | **Enabled** | ID: `019f3e52-c96f-7238-90b8-051a0b051cd4`, sample_rate: 0.1 |
| `conversations` | `ticket` | **Enabled** | ID: `019f3e52-cc33-7d8a-9d1e-43718dc48f33` |
| `llm_analytics` | — | **Skipped** | No LLM/AI usage found. |
| `logs` | — | **Skipped** | PostHog logs product not in use. |

---

## Connected tools

| Tool | Status |
|---|---|
| GitHub Issues | Not used (not selected) |
| Linear | Not used (not selected) |
| Zendesk | Not used (not selected) |
| pganalyze | Not used (not selected) |

_Note: Stripe is connected as a PostHog integration (`SaaS-Detective`, `acct_1THqBmRjzw2rPpuq`), which feeds the `signals-scout-revenue-analytics` scout._

---

## Scout troop

**3 active, 22 disabled.** (25 total)

### Enabled

| Scout | Reason |
|---|---|
| `signals-scout-general` | Always on. Cross-product correlations and surfaces no specialist covers. |
| `signals-scout-revenue-analytics` | Stripe connected as integration; 6 revenue events tracked (`license_purchased`, `subscription_renewed`, `payment_failed`, `invoice_payment_failed`, `checkout_abandoned`, `subscription_cancelled`). |
| `signals-scout-product-analytics` | Extension tracks conversion funnel: `popup_opened` → `scan_complete` → `upgrade_nudge_shown` → `upgrade_clicked` → `license_activated`. Trial-to-Purchase Funnel insight is saved in PostHog. |

### Disabled

| Scout | Reason |
|---|---|
| `signals-scout-error-tracking` | Covered by the native `error_tracking` source (step 4). |
| `signals-scout-session-replay` | Covered by the native `session_replay` source (step 4). |
| `signals-scout-ai-observability` | No `$ai_*` events or LLM SDK found. Re-enable if you add AI features. |
| `signals-scout-anomaly-detection` | No dashboards or insights heavy enough to warrant daily anomaly polling at launch scale. Re-enable once the dashboard set grows. |
| `signals-scout-apm` | No distributed tracing / OpenTelemetry configured. |
| `signals-scout-csp-violations` | No CSP reporting configured. |
| `signals-scout-customer-analytics` | No group analytics; single-seat extension product, not B2B accounts. |
| `signals-scout-data-pipelines` | No CDP destinations or hog flows active. |
| `signals-scout-data-warehouse` | No warehouse sources connected. |
| `signals-scout-experiments` | No A/B experiments running. Re-enable if you start experiments. |
| `signals-scout-feature-flags` | No feature flags defined. Re-enable if you add flags. |
| `signals-scout-health-checks` | No active health issues at setup time. |
| `signals-scout-inbox-validation` | Fresh setup — no resolved reports to validate yet. Re-enable after the inbox accumulates resolved findings. |
| `signals-scout-insight-alerts` | No configured insight alerts. |
| `signals-scout-logs` | PostHog logs product not in use. Re-enable if you connect logs. |
| `signals-scout-mcp-tool-calls` | No `$mcp_tool_call` telemetry. |
| `signals-scout-observability-gaps` | Troop is small and intentional at this stage; gap-analysis would flag early sparse data. Re-enable once event volume grows. |
| `signals-scout-replay-vision` | No Replay Vision scanners configured. |
| `signals-scout-skills-store` | Skills-store hygiene only relevant at larger team scale. |
| `signals-scout-surveys` | No surveys in use. Re-enable if you launch surveys. |
| `signals-scout-web-analytics` | Web traffic is watched by `signals-scout-general`; no UTM/referrer campaigns active yet. |
| `signals-scout-web-vitals` | No `$web_vitals` events captured (extension-only product; marketing site doesn't capture web vitals). |

---

## Custom scouts

The gap analysis identified two product-specific surfaces not covered by any built-in scout. These were proposed to the user but could not be confirmed due to a UI interaction error. They are recorded here as candidates for manual creation.

### Candidate 1 — Upgrade nudge conversion

**What it watches:** The ratio of `upgrade_nudge_shown` to `upgrade_clicked` across all nudge locations (`popup_nudge`, `locked_card`, etc.)

**Discriminator:** Click rate falls below the 7-day rolling baseline while nudge impression volume holds steady.

**Why uncovered:** No built-in scout watches event-ratio regressions for specific in-product UI surfaces. The product-analytics scout watches saved funnels — there is no `upgrade_nudge_shown → upgrade_clicked` funnel saved in PostHog. The general scout watches cross-product correlations, not individual event pair ratios.

**Scout name to use if created:** `signals-scout-upgrade-nudge`

### Candidate 2 — Detection quality

**What it watches:** The average number of tools detected per `scan_complete` event, with breakdown by page/domain category.

**Discriminator:** Average detected count per scan drops below rolling baseline while scan volume stays steady — indicates a signature regression or a major site changed its implementation.

**Why uncovered:** No built-in scout tracks detection quality metrics. Error tracking catches hard errors; session replay catches user friction. A silent regression in detection accuracy (scans succeed but detect fewer tools) falls between both.

**Scout name to use if created:** `signals-scout-detection-quality`

**Noise escape hatch:** If either scout turns out noisy after creation, set `emit: false` on its config in [PostHog Settings](https://us.posthog.com/project/449223/inbox) to switch it to dry-run mode.

### Surfaces considered and ruled out

| Surface | Filter |
|---|---|
| Trial expiry → non-conversion | Partially covered by `signals-scout-product-analytics` (Trial-to-Purchase Funnel) and `signals-scout-revenue-analytics` (goal-miss escalations). |
| Checkout abandonment rate | `signals-scout-revenue-analytics` watches capture regressions including `checkout_abandoned`. |
| License validation failure rate | Covered by native error tracking source (`captureException` wired in licensing worker). |
| Extension distribution / CWS installs | Not watchable from PostHog data alone (no CWS telemetry). |
| Affiliate link engagement | No PostHog events for affiliate clicks exist in the codebase. |
| Scan volume anomalies | `signals-scout-general` catches broad volume anomalies. |

---

## Follow-ups

- [ ] **Enable Error Tracking product** — Visit [Project Settings → Products](https://us.posthog.com/project/449223/settings/environment-integrations) and enable Exception Autocapture so errors from the marketing site and extension popup reach the inbox.
- [ ] **Enable Support (Conversations) product** — Same settings page. Then connect an inbound channel (email, inbox, or Slack) so support tickets flow to the inbox. Without a channel, the responder source (`conversations/ticket`) stays dormant.
- [ ] **Add custom scout: Upgrade nudge conversion** — Create a `signals-scout-upgrade-nudge` skill in [PostHog Skills Store](https://us.posthog.com/project/449223/inbox). Watch `upgrade_nudge_shown` vs `upgrade_clicked` daily ratio; speak up when click rate drops below 7-day rolling baseline.
- [ ] **Add custom scout: Detection quality** — Create a `signals-scout-detection-quality` skill. Watch average tools-detected per `scan_complete`; speak up when average drops while volume holds.
- [ ] **Enable feature-flags scout when flags are added** — `signals-scout-feature-flags` is disabled; re-enable in PostHog once you introduce feature flags.
- [ ] **Enable experiments scout when A/B tests start** — `signals-scout-experiments` is disabled; re-enable once experiments are running.
- [ ] **Enable inbox-validation scout** — After the inbox accumulates resolved reports (a few weeks), enable `signals-scout-inbox-validation` to catch regressions in shipped fixes.
- [ ] **Run `wrangler secret put POSTHOG_KEY`** — Set the production PostHog key as a Wrangler secret in the licensing worker (flagged in the earlier integration report).

---

## What happens next

The Self-driving coordinator picks up the fresh configs within ~30 minutes. The three enabled scouts (`general`, `revenue-analytics`, `product-analytics`) will run their first scan then, with daily cadence after that. Error tracking, session replay, and support signals flow directly to the inbox as they arrive — no polling interval. Inbox findings that require code changes can be handed to coding agents directly from the inbox.

Your inbox: [https://us.posthog.com/project/449223/inbox](https://us.posthog.com/project/449223/inbox)
