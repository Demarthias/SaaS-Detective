# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

SaaS Detective is a Manifest V3 Chrome extension (TypeScript) that scans the current tab's HTML for known SaaS/tech-stack signatures (analytics, payments, CMS, frameworks, etc.) and lists what it finds. It has a free/Pro split gated by a license key validated against an external Cloudflare Worker, plus PostHog + GA4 analytics.

## Commands

```bash
npm install
npm run build           # webpack production build + copies static assets (html/js/icons/affiliates.json) into dist/
npm run watch           # webpack development build, watches src/**/*.ts
npm run check-affiliates  # node --experimental-strip-types scripts/check-affiliate-coverage.ts
```

There is no test suite or lint script configured.

`npm run build` is not just `webpack` — it also copies `popup.html`, `onboarding.html`, `options.html`, `privacy.html`, `shared.js`, `options.js`, `affiliates.json`, and `icons/` into `dist/`. If you add a new static file that needs to ship, add it to the `build` script in `package.json`, not just to webpack's `entry`.

To load the extension in Chrome for manual testing: `chrome://extensions` → enable Developer Mode → "Load unpacked" → select `dist/`.

### check-affiliate-coverage

Run after editing `src/signatures.ts` or `affiliates.json`. It diffs detectable signature names against `affiliates.json` and fails (non-zero exit) if any entry marked `"status": "active"` has an empty `url` or a note starting with "Replace" — i.e. a placeholder that would otherwise render a real "aff" (affiliate) badge on a fake link.

## Architecture

### Detection pipeline (popup → content script → MAIN world)

Scanning is split across two isolated execution contexts, both driven from `popup.ts`:

1. **Content script (`content.ts`, isolated world)** — runs on every page per the manifest's `content_scripts`, but does nothing until the popup sends it a `{action: 'SCAN_PAGE'}` message. It lowercases `document.documentElement.innerHTML` once and checks each `signatures[].patterns` string against it. Categories disabled in `chrome.storage.sync.sd_options.enabledCategories` are skipped. `popup.ts` also injects `content.js` on demand via `chrome.scripting.executeScript` as a fallback in case the declarative content script hasn't attached (e.g. tab existed before install).
2. **MAIN-world injection (`popup.ts`)** — a second `chrome.scripting.executeScript({world: 'MAIN', ...})` call checks `signatures[].globalVar` names against `window`, to catch tools that only expose a JS global and don't leave a detectable `<script src>` pattern (e.g. loaded via bundler rather than a CDN tag). Results from both passes are merged/deduped by signature `id` in `popup.ts`.
3. A third injected script (`getPaymentProcessor` in `popup.ts`) specifically looks for payment processor globals/patterns to feed the Trust Score feature (see below).

`signatures.ts` (`SaasSignature[]`) is the single source of truth for what's detectable; `signatureUrls.ts` (`SIGNATURE_URLS`) maps signature `id` → vendor homepage, used as the fallback destination for "Visit" buttons when no affiliate link exists.

**`DEFAULT_OPTIONS.enabledCategories` is duplicated in three places and must be kept in sync manually**: `content.ts`, `src/options.js`, and (implicitly) whatever reads `sd_options` — content scripts can't `import` from `options.js` due to content-script context restrictions, so there's no shared module. `options.js` has a `SYNC REQUIRED` comment marking this; if you add/rename a category in `signatures.ts`, update it in both places. `content.ts`'s `getEnabledCategories` merges stored options over the full default so a category missing from a stale stored object fails open (enabled), not silently disabled.

### Licensing, trust, and analytics — external Cloudflare Worker

Extension code (`background.ts`, `popup.ts`, `analytics.ts`) calls a Cloudflare Worker at `saas-detective-licensing.kubegrayson.workers.dev`. Its source is **not** in this repo — it lives at `../saas-detective-licensing`, which has its own `CLAUDE.md` documenting all of its routes. The extension uses four of them (`/validate`, `/trust-check`, `/track`, `/trial/start`); the Worker also serves the marketing site's checkout and receives Stripe webhooks, so a change to it can affect surfaces this repo never calls. The three that matter most here:
- `/validate` — revalidates the stored license key on a recurring `chrome.alarms` alarm (`background.ts`), refreshing `chrome.storage.sync.sd_license`.
- `/trust-check` — the Checkout Trust Score feature (`popup.ts`), sends domain + SSL status + detected payment processor, gated by `TRUST_CHECK_SHARED_SECRET` (from `.env`, injected via webpack `DefinePlugin`) sent as `X-SD-Trust-Key`.
- `/track` — GA4 event forwarding, kept only for Google Ads conversion tracking.

`analytics.ts` also posts directly to PostHog via `api.venom-industries.com/capture/` (a proxied domain, not `*.posthog.com` directly — deliberate, so ad blockers like uBlock/Privacy Badger don't silently drop analytics for the exact users likely to install a privacy-focused extension).

License state (`sd_license` in `chrome.storage.sync`) has a TTL + grace period (`isLicenseValid` in `popup.ts`: 48h TTL + 7 day grace) so Pro features keep working through transient validation failures. Trial licenses additionally check `expires_at`.

`.env` (gitignored) supplies **only `TRUST_CHECK_SHARED_SECRET`** at build time — the extension has no runtime env, so it gets baked into the bundle by webpack's `DefinePlugin`. There's no `.env.example`; check with the project owner for the value before building.

The PostHog project token and capture URL are **deliberately hardcoded** in `analytics.ts` (and `shared.js`) rather than injected. That token is a public client identifier meant to ship in client code, and routing it through `.env` was a footgun: with no committed `.env` and no non-empty default, an ordinary `npm run build` silently produced a build that posted analytics straight to `us.i.posthog.com` instead of the proxy. Do not "restore" it to `DefinePlugin`.

`TRUST_CHECK_SHARED_SECRET` is the opposite case and must stay on the `.env`/`DefinePlugin` path — it is a real shared secret checked server-side by the Worker, so hardcoding it would commit a secret to a public repo. It has no safe default: **if `.env` is missing, the key compiles to `''` and every `/trust-check` returns 401, which surfaces as the Trust Score section silently rendering nothing rather than as an error.** `webpack.config.js` prints a build warning for exactly this case. This has already happened once in production, via the Worker side — the secret was never set with `wrangler secret put`, so Trust Score was dead for all users with no visible symptom.

### Free/Pro gating

`FREE_LIMIT = 8` caps how many detected **tools** are revealed per scan, not how many scans a user gets — `popup.ts` slices `allTools` at it and reports the remainder as `locked`. `HISTORY_LIMIT_FREE = 25` / `HISTORY_LIMIT_PRO = 50` cap stored history entries. Together they gate feature access client-side (locked results render with an upgrade banner via `appendUpgradeBanner`/`renderTrustLocked`). Stripe checkout links (`STRIPE_PLANS`) point to `venom-industries.com/checkout.html`, with `client_reference_id`/`ga_client_id`/`email` query params attached by `withClientRef` (`analytics.ts`) so the Stripe webhook (also external) can attribute purchases back to the extension's anonymous client ID.

### Built output is committed

`dist/` is listed in `.gitignore` but its files are tracked anyway (force-added) — `git status`/`git diff` on `dist/*` reflects real, intentional changes, not build noise. If you edit `src/`, rebuild and expect `dist/` to show up as modified in the diff.

### Other surfaces referenced by this project but not in this repo

Per project convention, a change here (signatures, pricing, category list) often needs to be mirrored in the marketing site and the licensing worker. These live outside this repository, as sibling checkouts, and each has its own `CLAUDE.md` — read it before changing a shared contract:

| Path | What it is | What's shared with this repo |
|---|---|---|
| `../Venom-Industries-LLC` | venom-industries.com (GitHub Pages) | `saas-detective.html` restates the signature/category/free-tier counts; `checkout.html` receives the `?plan=` keys built here. **Its `main` branch deploys straight to production on push.** |
| `../saas-detective-licensing` | The Cloudflare Worker | `TRUST_CHECK_SHARED_SECRET` must match the value webpack bakes in here; the 48h + 7 day license TTL contract; Stripe. |

The upgrade plan keys are a three-way contract between `STRIPE_PLANS` here, the `PLANS` object in the site's `checkout.html`, and the Worker's `/checkout/create-session`. The site offers four terms (`1mo` / `3mo` / `6mo` / `12mo`); `STRIPE_PLANS` surfaces only two of them in the popup — `?plan=1mo` ($7.99/mo) and `?plan=12mo` ($90/yr). Prices are duplicated as display strings here and must match the site's `PLANS` totals. Ask before assuming any of this is out of scope for a given change.
