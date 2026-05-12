# SaaS Detective — Claude Session Log

## Session: 2026-05-11

### Growth Sprint — 4 items shipped end-to-end

**1. Marketing-site tracking patch — DEPLOYED**
- Discovered the 2026-05-09 patch (checkout_begin GA4 tracking on Stripe links) was in `worker.js` locally but never went live on `venom-industries.com`. Created `marketing-site-worker/wrangler.toml` (minimal: name + main only, no routes/bindings declared so existing infra is preserved) and ran `wrangler deploy`. **The Cloudflare worker now serves the patched content at `venom-saas-detective.kubegrayson.workers.dev` — but venom-industries.com is GitHub Pages.** See `Topology` note below.

**2. Broader popup upgrade triggers — `src/popup.ts`**
- Existing `>50 tools detected` banner kept (rare trigger).
- Added soft "Detected N tools here / Pro unlocks all 175+ signatures" nudge that fires after the user has scanned 3+ pages with detected tools (`sd_scans_with_content` counter in `chrome.storage.local`), throttled to once per 24h via `sd_last_nudge_at`. Tracks `upgrade_nudge_shown` event with `tools_detected` and `scans_with_content` params, location `popup_nudge` on click.
- Refactored shared banner internals: `renderPlanGrid()` + `wirePlanButtons(banner, location)` so the three banner variants (locked-hard, soft-nudge, trial) share the plan grid wiring.

**3. Pricing page — stat strip + Free-vs-Pro comparison table**
- Edits made in BOTH `worker.js` (workers.dev) AND `Venom-Industries-LLC/saas-detective.html` (GitHub Pages — the real production source).
- Added a 4-cell stat strip above the pricing grid: 175+ signatures / 45+ categories / 100% client-side / "Founders & sales" (placeholder — TODO marker for live CWS install count).
- Added side-by-side Free vs Pro comparison table after the pricing grid (8 rows).
- Renamed classes to `.pricing-stats` / `.pricing-stat` to avoid collision with the existing `.stats-strip`/`.stat` on the hero.

**4. 7-day Pro trial flow — full stack**
- **Licensing worker (`licensing-worker/src/index.js`):** New `POST /trial/start` endpoint. Validates email regex, blocks duplicate emails via `trial-email:${email}` KV key (returns 409 + existing key/expiry), generates a `SD-XXXX-XXXX-XXXX-XXXX` license, stores `license:${key}` with `{ plan: "pro", trial: true, active: true, email, createdAt, expires_at }` and a 14-day KV TTL. Sends Resend email if `RESEND_API_KEY` is set (graceful no-op otherwise — the key is still returned in response, so the trial works inline regardless). Fires GA4 `trial_started` event with `email_sent` flag.
- `/validate` now returns `trial`, `expires_at`, and treats trials past their `expires_at` as `valid: false` with `reason: "trial_expired"`.
- **Marketing site:** Inline email-capture form added to both `worker.js` and `saas-detective.html`, posts to `/trial/start`, reveals the license key inline on success, shows duplicate-email error on 409. Tracks `trial_form_submitted` event.
- **Extension (`src/popup.ts`, `src/background.ts`):** `LicenseData` extended with `trial` + `expires_at`. Background revalidation alarm now writes those fields and fires `trial_expired` event when a trial expires. Popup shows a "Pro trial · N days left" banner when on an active trial, or a "Your Pro trial has ended" banner with plan grid when expired. These banners replace the regular nudge for trial users.

### Deploys
- `saas-detective-licensing` worker — version `f1198dfd-6d49-47c2-8a85-f98c8979357a` (trial endpoint live)
- `venom-saas-detective` worker — versions `9030de91 → 1c2bb12e → ccb6ccdf → 17157648` (pricing + trial form, four iterations)
- Both git repos pushed to GitHub `main`. GitHub Pages on Venom-Industries-LLC rebuilds in 30-90s.
- Extension version bumped `src/manifest.json` 2.6.8 → 2.7.0. **CWS submission not done in this session** — `dist/` is rebuilt but you need to upload to the Web Store yourself.

### Smoke tests passed
- `POST /trial/start` with fresh email → `{ ok: true, key: "SD-...", email, expires_at, email_sent: false }`
- `GET /validate?key=<trial key>` → `{ valid: true, plan: "pro", trial: true, expires_at }`
- Duplicate email on `/trial/start` → 409
- `npx tsc --noEmit` clean after popup + background edits
- `npx webpack --mode production` clean

### Topology gotcha (discovered the hard way)
`venom-industries.com/saas-detective` is served by **GitHub Pages** (Demarthias/Venom-Industries-LLC repo, file `saas-detective.html`), proxied through Cloudflare DNS. The Cloudflare Worker `venom-saas-detective` is only on the workers.dev URL. Headers gave it away: `x-github-request-id` + `Via: 1.1 varnish` (Fastly = GitHub Pages CDN). All marketing-site changes must go to BOTH files.

### Follow-up — resolved in same session
- **CWS submission**: packaged `saas-detective-2.7.0.zip` (45.9 KB, manifest at root) at repo root via `npm run build` + Compress-Archive. User uploaded + submitted via dev console.
- **Install count placeholder**: kept directional copy ("Founders & sales / Built for") instead of showing 50 installs — at this scale a raw number suppresses conversion vs directional. Revisit when installs > ~300.
- **Resend configured**: `venom-industries.com` verified on Resend (SPF + DKIM via Cloudflare DNS, DNS-only / grey-cloud). `wrangler secret put RESEND_API_KEY` and `RESEND_FROM` set on `saas-detective-licensing` worker. `RESEND_FROM` is `"SaaS Detective <grayson@venom-industries.com>"` so replies land in the existing support inbox.
- **Smoke test**: posted `/trial/start` for two test emails — both returned `email_sent: true` and landed in user's inbox with the SD-XXXX-XXXX-XXXX-XXXX key, expected subject, and 3-step activation copy. Trial flow is live end-to-end.

### Permission justifications written for CWS review
Wrote justification copy for `alarms`, `storage`, `scripting`, `activeTab`, and `host_permissions` — see conversation history for the exact text used in the dev console. Centered on license revalidation (24h alarm), local-only storage, MAIN-world script injection on active tab only, no off-device data transmission.

### Still outstanding (carryover from prior sessions)
- ~26 placeholder affiliate entries still need real IDs.
- venom-industries.com Cloudflare caching still at 0%.

---

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
