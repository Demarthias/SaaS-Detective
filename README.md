# SaaS Detective - Browser Extension

![SaaS Detective](icons/icon128.png)

**Instantly identify the tech stack powering any website.**

## Overview

SaaS Detective is a Chrome extension that instantly reveals the technologies, frameworks, and SaaS tools used to build any website. Click the extension icon, and within seconds, you'll see:

- 🔍 **92 Tech Signatures** - Detect tools across 30+ categories
- 🚀 **Frameworks & Libraries** - React, Vue, Next.js, Angular, Svelte, and more
- 💳 **Payment Processors** - Stripe, PayPal, Paddle, Klarna, Braintree, and more
- 📊 **Analytics Platforms** - Google Analytics, Mixpanel, Amplitude, Heap, and more
- 💬 **Communication Tools** - Intercom, Drift, Crisp, Tidio, LiveChat, and more
- 🎯 **Marketing & Ads** - Meta Pixel, TikTok, LinkedIn, Google Ads, and more
- 🛒 **E-Commerce Platforms** - Shopify, WooCommerce, BigCommerce, Magento, and more

## Features

✅ **Zero Data Collection** - All detection happens locally on your device  
✅ **No Tracking** - We don't track your browsing or collect personal information  
✅ **Instant Results** - Auto-scans when you open the popup  
✅ **Affiliate Links** - Visit tool websites directly from detected results  
✅ **Lightweight** - Only 3.7 KB of optimized code  
✅ **Open Source Ready** - Clean, maintainable TypeScript codebase  

## How It Works

1. **Navigate** to any website
2. **Click** the SaaS Detective icon
3. **View** the detected tech stack instantly
4. **Visit** any tool's official website using the provided links

The extension analyzes script tags and resource URLs loaded on the page to identify technologies. No data leaves your browser.

## Detected Tools (92 Signatures)

### Analytics (5)
- Google Analytics, Google Tag Manager, Mixpanel, Amplitude, Heap Analytics

### Heatmap & Session Replay (5)
- Hotjar, Microsoft Clarity, Crazy Egg, FullStory, LogRocket

### Observability & Error Tracking (4)
- New Relic, Datadog, Sentry, Bugsnag

### Ads & Pixels (8)
- Meta Pixel, TikTok Pixel, LinkedIn Insight, Google Ads, Microsoft Ads, Pinterest Tag, Snap Pixel, X (Twitter) Ads

### Native Ads & Retargeting (3)
- Taboola, Outbrain, AdRoll

### CRM & Marketing Automation (4)
- HubSpot, Salesforce, Marketo, Pardot

### Email Marketing (5)
- Mailchimp, Klaviyo, ActiveCampaign, ConvertKit, Drip

### Push Notifications (2)
- OneSignal, VWO (PushCrew)

### Chat & Support (9)
- Intercom, Drift, Crisp, Freshchat, Tawk.to, Olark, LiveChat, Tidio, Zendesk

### E-Commerce (4)
- Shopify, WooCommerce, Magento, BigCommerce

### Payments (6)
- Stripe, PayPal, Braintree, Paddle, Klarna, Afterpay

### Site Builders (4)
- Wix, Squarespace, Webflow, Framer

### CMS (4)
- WordPress, Ghost, Drupal, Joomla

### No-Code (1)
- Bubble

### Frameworks (6)
- React, Vue.js, Angular, Next.js, Nuxt.js, Svelte

### Libraries & CSS (4)
- jQuery, Alpine.js, Tailwind CSS, Bootstrap

### CDN (4)
- Cloudflare, Akamai, Fastly, Google Hosted Libs

### Hosting (3)
- Vercel, Netlify, Heroku

### Infrastructure & Storage (1)
- Amazon S3

### Security & Compliance (5)
- Google reCAPTCHA, hCaptcha, OneTrust, Cookiebot, Termly

### Fonts & Icons (3)
- Google Fonts, Adobe Fonts, Font Awesome

### Data Platform (1)
- Segment

### Comments (1)
- Disqus

## Privacy & Security

**We take privacy seriously:**
- ✅ No data collection or storage
- ✅ No external API calls
- ✅ No user tracking
- ✅ Local processing only
- ✅ No cookies injected
- ✅ No personal information access

See [Privacy Policy](privacy.html) for complete details.

## Permissions

| Permission | Purpose |
|-----------|---------|
| `activeTab` | Access the current website |
| `scripting` | Inject detection script into pages |
| `https://*/* and http://*/*` | Run on all websites |

## Development

Built with:
- **TypeScript** - Type-safe code
- **Webpack** - Bundling and optimization
- **Manifest V3** - Modern Chrome extension standard

### Build
```bash
npm install
npm run build
```

### Development Watch
```bash
npm run watch
```

## Support

For questions or issues:
- 📧 Email: gkube16@protonmail.com
- 🐛 Report bugs via Chrome Web Store

## License

Copyright © 2026 Venom Industries. All rights reserved.

## Affiliate Disclosure

SaaS Detective may include affiliate links to services we detect. Using these links helps support extension development. You are never required to use them, and they are clearly labeled.

---

**Download SaaS Detective from the [Chrome Web Store](https://chrome.google.com/webstore)**

Made with ❤️ by Venom Industries
