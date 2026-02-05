# SaaS Detective | Web Intelligence Engine
**Version:** 1.0.2 (Manifest V3)
**Core Logic:** TypeScript + JavaScript

SaaS Detective is a lightweight Chrome extension that identifies technology stacks on the current page using local signature matching. No remote calls. No analytics. No tracking.

## Features
- Instant tech stack detection from the current tab
- 90+ signatures across frameworks, analytics, payments, and more
- Organized categories with per-category toggles
- Zero data collection (local-only processing)
- Affiliate links shown only when you click a tool

## Permissions (Why They’re Needed)
- `activeTab`: identify the active tab you choose to scan and open links you click in the popup
- `storage`: save category preferences in Chrome sync storage
- `scripting`: inject the detection script into the active tab when you trigger a scan
- Host permissions (http/https): allow the detection script to read page markup for sites you choose to scan

## Build
```bash
npm install
npm run build
```

## Package for Chrome Web Store
```bash
# From project root
zip -r SaaS-Detective-v1.0.2.zip \
	manifest.json \
	popup.html \
	popup.js \
	options.html \
	options.js \
	onboarding.html \
	terms.html \
	affiliates.json \
	privacy.html \
	background.js \
	README.md \
	dist/ \
	icons/
```

## Privacy & Affiliate Disclosure
- All detection runs locally on your device
- No browsing history is collected or transmitted
- Clicking a tool may open an affiliate link (clearly disclosed in the UI)

## Support
- Privacy policy: privacy.html
- Terms: terms.html
