# SaaS Detective — Claude Session Log

## Session: 2026-04-27

### Affiliate Links Added
- **GetResponse**: `https://www.kqzyfj.com/click-101717325-15733588` (CJ)
- **netart**: `https://www.kqzyfj.com/click-101717325-15853293` (CJ)
- **NordVPN**: `https://www.jdoqocy.com/click-101717325-13914989` (CJ)
- **Shopify**: `https://shopify.pxf.io/xJ21Dx` (Impact) — replaced placeholder

### Signatures Added to content.js
- GetResponse (Email)
- netart (Hosting)
- NordVPN (Security)
- Semrush (Sales Intelligence)
- Miro (No-Code)

### Relic Audit
- `C:\Relics\SaaS-Detective\` and `C:\Relics\SaaS_Detective_FINAL_v227\` — both behind GitHub
- `C:\SaaS-Detective\` — also behind GitHub; synced after session
- GitHub is the source of truth

### Cloudflare Worker Audit (saas-detective-licensing)
- Fully functional — real KV-backed validation, not a stub
- All env vars confirmed: `LICENSES` KV, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `GA_MEASUREMENT_ID`
- `GA_MEASUREMENT_ID` was missing — set to `G-HVECKYG478` via wrangler

### Outstanding
- 39 affiliate entries still have placeholder IDs
- Semrush + Miro need real Impact links
- venom-industries.com Cloudflare caching at 0% — needs API token to configure via CLI

---

## Session: 2026-05-01

### Bugs Fixed
- `popup.js` — removed orphaned outer `(() => {` wrapper on line 1
- `popup.js` — `#rescanBtn` was dead (no event listener) — wired up
- `popup.html` — upgrade banner existed in CSS only, never rendered — added HTML + wired to free-user locked count
- `popup.js` — Stripe 3mo/6mo/yearly links were placeholders — replaced with real links from options.html
- `manifest.json` — version bumped from 2.5.6 → 2.5.9

### Analytics Added
- `popup_opened` — fires on every popup open
- `rescan_clicked` — fires when rescan button clicked
- `scan_complete` — now includes `locked` count in params
- `onboarding_viewed` — fires when onboarding page loads
- `onboarding_completed` — fires when Get Started clicked
- `onboarding_options_clicked` — fires when Open Options clicked from onboarding
- `category_toggled` — fires in options.js with `{category, enabled}` params

### Stripe Payment Links (all confirmed real)
- Monthly $7.99: `https://buy.stripe.com/aFaaEZ76edBi8aQ5wD1Jm00`
- 3-Month $19.99: `https://buy.stripe.com/3cIdRb76e9l28aQcZ51Jm04`
- 6-Month $34.99: `https://buy.stripe.com/6oU00lduC54M0Io5wD1Jm05`
- Annual $59.99: `https://buy.stripe.com/8x2bJ3bmu8gYgHm1gn1Jm06`

### Affiliate Programs Active
- Networks: Impact (publisher ID: 6918744), CJ, MaxBounty (offers TBD)
- Webflow affiliate application in progress (2026-05-01)

### Outstanding
- Webflow affiliate link pending approval → update affiliates.json when received
- Semrush + Miro: get real Impact deep links (publisher ID 6918744)
- MaxBounty: identify active offers, get tracking URLs
- ~26 placeholder affiliate entries still need real IDs
- venom-industries.com Cloudflare caching still at 0%

---

## Session: 2026-05-05

### Full Audit + Overhaul (v2.6.6)

#### Signatures
- `src/signatures.ts` fully rewritten — 208 entries (was ~95 in src/core/src.signatures.ts)
- All category names now match DEFAULT_OPTIONS exactly (45 categories)
- Added 14 missing categories: Video, A/B Testing, Maps, Reviews, Referral, Sales Intelligence, Customer Success, Communications, Courses, Community, Native Ads, Retargeting, Heatmap, Session Replay, Observability, Error Tracking
- `globalVar` detection added to every signature
- Deleted dead files: `src/core/src.signatures.ts`, `src/affiliateMap.ts`, `src/config/affiliateMap.ts`, `src/openLink.ts`, `src/detectors/shopify.ts`

#### Detection Engine
- `src/content.ts` now imports from `./signatures` (updated)
- `src/popup.ts` now runs a second pass via `chrome.scripting.executeScript({world:'MAIN'})` to check window globals — catches tools loaded async or via GTM
- Results from both passes are merged (deduped by id) before applying FREE_LIMIT

#### Bug Fixes
- `FREE_LIMIT` corrected from 15 → 50 (matches UI copy in options.html and onboarding.html)
- `DEFAULT_OPTIONS` in `src/content.ts` synced to 45 categories (was 31, missing 14)
- `src/manifest.json` version synced and bumped to 2.6.6 (was stuck at 2.6.0)
- `alarms` permission was declared but unused — now wired up in background.ts

#### License Revalidation
- `src/background.ts` now creates `license_revalidate` alarm on install/update (24h period)
- Alarm handler re-fetches `/validate`, updates `sd_license.validated_at`, fires `license_revalidated` or `license_expired` events

#### Outstanding
- ~26 placeholder affiliate entries still need real IDs
- venom-industries.com Cloudflare caching still at 0%
- trackEvent still has 2 copies (src/analytics.ts for webpack, shared.js for options/onboarding) — harmless but worth future dedup

---

## Session: 2026-05-09

### GA4 Checkout Path Audit + Marketing-Site Tracking Patch
- Traced the full upgrade-click → GA4 path. Extension side is fully wired (popup banner, locked card, options pricing, onboarding pricing — all fire `upgrade_clicked` via `shared.js` trackEvent → `/track` → GA4 `G-HVECKYG478`; `license_activated` fires post-key-paste).
- Found the marketing site (venom-industries.com/saas-detective, rendered by `worker.js` SD_HTML) had **zero tracking** on its 4 Stripe checkout links. The orphan files `track-checkout.js` and `index (1).html` were dead — bare ESM `import` in a non-module script tag, referenced a non-existent `./src/analytics.js`, and used `chrome.storage.local` outside an extension context. Page wasn't served anyway.

### Patch Applied (worker.js)
- Added `data-stripe-checkout`, `data-plan`, `data-price` to all 4 Stripe `<a>` tags in SD_HTML (monthly/yearly/3month/6month).
- Injected an inline `<script>` before `${NAV_SCRIPT}` that:
  - Persists a `client_id` in `localStorage` (key `sd_ga_client_id`); falls back to ephemeral `anon.<ts>` on storage exception.
  - Capture-phase click listener catches anchors *before* navigation, POSTs `checkout_begin` (with `plan`, `price`, `location: 'marketing_site'`) to `https://saas-detective-licensing.kubegrayson.workers.dev/track` using `keepalive: true` so the request survives the redirect.

### Cleanup
- Deleted dead files: `track-checkout.js`, `index (1).html`.

### Pending
- **Manual deploy required** — there is no `wrangler.toml` for the marketing-site worker in this repo (only `licensing-worker/wrangler.toml` for the licensing one). `worker.js` is presumably deployed via the Cloudflare dashboard. Push the new `worker.js` content there to take this live.
- Once live, verify in GA4 Realtime that `checkout_begin` fires when a Stripe link is clicked on venom-industries.com/saas-detective.
