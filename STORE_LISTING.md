# Chrome Web Store listing copy

Ready to paste into the Developer Dashboard. Supersedes the "Full description:
see README.md" pointer in CHROME_STORE_SUBMISSION.md — that file is stale
(pre-dates Pro/trial/Stripe entirely) and shouldn't be used as the source
for the listing anymore.

## Short description (132 char limit)

```
See any website's tech stack instantly, plus a checkout trust score — 800+ signatures, 64 categories, one click.
```
(114 characters)

## Full description

```
SaaS Detective — Tech Stack Intelligence & Checkout Trust Score for Any Website

Every website leaves a trail. SaaS Detective reads it — and tells you whether you can trust what you find.

One click. Any website. Under 2 seconds. SaaS Detective scans the active page and does two things at once: it surfaces every tool, platform, and framework powering the site, and it scores whether the page is safe to trust with your payment details. Walk into any sales call, competitive audit, or unfamiliar checkout already knowing what you're dealing with.

No source code. No guesswork. Just answers.

━━ WHY IT MATTERS ━━

The modern web runs on dozens of invisible tools — CRMs, analytics platforms, ad pixels, payment processors, A/B testing software, live chat widgets. These tools reveal how a business operates, what they spend money on, and where the gaps are. SaaS Detective makes all of it visible, instantly.

800+ technology signatures. 64 categories. Results in under 2 seconds.

━━ WHO IT'S FOR ━━

Sales Professionals
Stop walking into discovery calls blind. Know what CRM they're on, what analytics they run, how they handle payments, and what ad platforms they're buying — before you dial. Walk in with context. Close with confidence.

Founders & Strategists
See the exact toolset behind companies you admire or compete with. Find out what's working in your space without spending months testing it yourself. Validated signal, not gut instinct.

Agencies & Consultants
Audit any prospect's stack before the first meeting. Spot outdated tools, redundant software, and integration gaps. Show up as the expert who already did the homework.

Developers & Engineers
Instantly identify frameworks, libraries, CDNs, and infrastructure without touching a line of source code. Reverse-engineer architecture decisions in seconds.

Online Shoppers
Before you enter your card number on an unfamiliar site, get a plain-English read on whether it looks safe — see Checkout Trust Score below.

━━ WHAT IT DETECTS ━━

SaaS Detective covers 64 technology categories including:
· Analytics & tracking
· CRM & sales platforms
· Heatmaps & session recording
· Live chat & customer support
· Email & marketing automation
· E-commerce platforms & payment processors
· JavaScript frameworks & libraries
· Ad pixels & retargeting networks
· A/B testing & feature flags
· Scheduling, forms, video, and more

800+ signatures in total — and growing with every release.

SaaS Detective contains affiliate links. When the extension detects a tool on a website, it may show a link to that tool, and we may earn a commission if you sign up through it — at no extra cost to you.

━━ CHECKOUT TRUST SCORE (Pro) ━━

Before you buy from a site you don't recognize, SaaS Detective can score it for you. Checkout Trust Score checks the page you're on for the signals that actually matter — a valid SSL certificate, a recognized payment processor, and how long the domain has been registered — and turns them into a plain verdict, from "Excellent — safe to checkout" to "Do not enter payment information," with the specific reasons behind the score. No more guessing whether an unfamiliar storefront is legitimate before you hand over your card.

━━ FREE VS PRO ━━

Free — Detects the 50 most common tools on any page, no account, no login, no credit card. A locked preview shows when Checkout Trust Score has something to tell you, so you always know it's there. Install and start immediately.

Pro — Unlocks the full library of 800+ signatures across 64 categories, plus the full Checkout Trust Score breakdown on every page you visit. Starting at $7.99/month or $90/year — cancel anytime, 30-day money-back guarantee. Not sure? Try Pro free for 7 days by email, no credit card required.

━━ PRIVACY ━━

Tech-stack detection runs entirely in your browser on the active tab — SaaS Detective reads script tags and page resources locally, and that page content never leaves your device. We do send limited product-usage analytics (a per-device identifier, scan counts, and which features you use) to help us improve the extension. Before you activate a trial or paid license, that data is pseudonymous and not tied to your name or email. If you do activate a trial or license, your email is then linked to that usage data so we can support your account — this is described in full in our privacy policy, along with the third-party processors involved (PostHog for analytics, Stripe for payment, Cloudflare for our backend).

Full privacy policy: https://venom-industries.com/SaaS-Detective/privacy.html

Questions or support: grayson@venom-industries.com

Built by Venom Industries LLC · venom-industries.com
```

## What changed from the current live listing, and why

1. **Checkout Trust Score got its own section** instead of one crammed-in, redundantly-worded sentence under "Free vs Pro" ("website trust score and checkout score... trust and checkout trust score" was the same single feature named two different ways). It's now named once, consistently, and described from real behavior in the code (`saas-detective-licensing` Worker's `handleTrustCheck`: SSL check, payment-processor check, domain-age-via-RDAP check, five-tier verdict from "Excellent" to "Do not enter payment information").
2. **"Now includes..." framing removed.** That phrasing reads as a changelog note bolted onto permanent listing copy — it'll look stale the moment the next feature ships. Trust Score is now just described as a normal part of the product.
3. **Privacy section corrected.** The live copy's "never linked to your identity" is inaccurate the moment someone activates a trial or license — the actual privacy policy (and the code: `analytics.ts`'s `identifyUser`, fired on license/trial activation) links email to the usage identifier at that point. This is exactly the class of mismatch Chrome's review process can flag, and it's also just a promise the product doesn't keep — fixed to match what actually happens.
4. **Contact/privacy links fixed** to the real current support address and the actual hosted privacy page, replacing the stale ones in `CHROME_STORE_SUBMISSION.md` (`gkube16@protonmail.com`, a GitHub raw URL).
5. **Didn't add Business/Agency/Enterprise tiers.** They exist as plan names in the licensing code, but there are no live, purchasable Stripe prices for them right now — only Pro is actually buyable via the checkout flow. Advertising tiers customers can't actually check out into would just recreate the kind of broken-promise bug this whole pass was about fixing.
6. Added one line to "Who it's for" (**Online Shoppers**) since Trust Score is genuinely useful to a different audience than the rest of the tool, and gives the feature a natural home in the copy instead of feeling bolted on.
