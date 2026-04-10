export interface SaasSignature {
    id: string;
    name: string;
    category: string;
    affiliateLink?: string;
    patterns: string[];
}

export const signatures: SaasSignature[] = [
    // --- ANALYTICS & DATA ---
    { id: "ga", name: "Google Analytics", category: "Analytics", patterns: ["google-analytics.com", "ga.js", "analytics.js"] },
    { id: "gtm", name: "Google Tag Manager", category: "Analytics", patterns: ["googletagmanager.com"] },
    { id: "segment", name: "Segment", category: "Data Platform", patterns: ["cdn.segment.com", "segment.io"] },
    { id: "mixpanel", name: "Mixpanel", category: "Analytics", patterns: ["cdn.mxpnl.com", "mixpanel.com"] },
    { id: "amplitude", name: "Amplitude", category: "Analytics", patterns: ["amplitude.com", "amplitude-snippet"] },
    { id: "heap", name: "Heap Analytics", category: "Analytics", patterns: ["heapanalytics.com"] },
    { id: "crazyegg", name: "Crazy Egg", category: "Heatmap", patterns: ["script.crazyegg.com"] },
    { id: "hotjar", name: "Hotjar", category: "Heatmap", patterns: ["static.hotjar.com"] },
    { id: "clarity", name: "Microsoft Clarity", category: "Heatmap", patterns: ["www.clarity.ms"] },
    { id: "fullstory", name: "FullStory", category: "Session Replay", patterns: ["fullstory.com"] },
    { id: "logrocket", name: "LogRocket", category: "Session Replay", patterns: ["logrocket.io"] },
    { id: "newrelic", name: "New Relic", category: "Observability", patterns: ["js-agent.newrelic.com"] },
    { id: "datadog", name: "Datadog", category: "Observability", patterns: ["datadoghq-browser-agent.com"] },
    { id: "sentry", name: "Sentry", category: "Error Tracking", patterns: ["browser.sentry-cdn.com", "js.sentry-cdn.com"] },
    { id: "bugsnag", name: "Bugsnag", category: "Error Tracking", patterns: ["d2wy8f7a9ursnm.cloudfront.net", "bugsnag"] },

    // --- ADVERTISING & PIXELS ---
    { id: "fb_pixel", name: "Meta Pixel", category: "Ads", patterns: ["connect.facebook.net/en_US/fbevents.js"] },
    { id: "tiktok", name: "TikTok Pixel", category: "Ads", patterns: ["analytics.tiktok.com"] },
    { id: "linkedin", name: "LinkedIn Insight", category: "Ads", patterns: ["snap.licdn.com"] },
    { id: "twitter", name: "X (Twitter) Ads", category: "Ads", patterns: ["static.ads-twitter.com"] },
    { id: "pinterest", name: "Pinterest Tag", category: "Ads", patterns: ["s.pinimg.com"] },
    { id: "snapchat", name: "Snap Pixel", category: "Ads", patterns: ["sc-static.net/scevent.min.js"] },
    { id: "google_ads", name: "Google Ads", category: "Ads", patterns: ["googleadservices.com", "googlesyndication.com"] },
    { id: "taboola", name: "Taboola", category: "Native Ads", patterns: ["cdn.taboola.com"] },
    { id: "outbrain", name: "Outbrain", category: "Native Ads", patterns: ["widgets.outbrain.com"] },
    { id: "adroll", name: "AdRoll", category: "Retargeting", patterns: ["s.adroll.com"] },
    { id: "bing", name: "Microsoft Ads", category: "Ads", patterns: ["bat.bing.com"] },

    // --- MARKETING & CRM ---
    { id: "hubspot", name: "HubSpot", category: "CRM", patterns: ["js.hs-scripts.com", "js.hs-analytics.net"] },
    { id: "salesforce", name: "Salesforce", category: "CRM", patterns: ["force.com", "salesforceliveagent.com"] },
    { id: "marketo", name: "Marketo", category: "Marketing Auto", patterns: ["munchkin.marketo.net"] },
    { id: "pardot", name: "Pardot", category: "Marketing Auto", patterns: ["pardot.com"] },
    { id: "mailchimp", name: "Mailchimp", category: "Email", patterns: ["chimpstatic.com"] },
    { id: "klaviyo", name: "Klaviyo", category: "Email", patterns: ["static.klaviyo.com"] },
    { id: "activecampaign", name: "ActiveCampaign", category: "Email", patterns: ["activehosted.com"] },
    { id: "drip", name: "Drip", category: "Email", patterns: ["tag.getdrip.com"] },
    { id: "convertkit", name: "ConvertKit", category: "Email", patterns: ["convertkit.com"] },
    { id: "onesignal", name: "OneSignal", category: "Push Notifications", patterns: ["cdn.onesignal.com"] },
    { id: "pushcrew", name: "VWO (PushCrew)", category: "Push Notifications", patterns: ["pushcrew.com"] },

    // --- CUSTOMER SUPPORT & CHAT ---
    { id: "intercom", name: "Intercom", category: "Chat", patterns: ["widget.intercom.io"] },
    { id: "drift", name: "Drift", category: "Chat", patterns: ["js.drift.com"] },
    { id: "zendesk", name: "Zendesk", category: "Support", patterns: ["static.zdassets.com", "assets.zendesk.com"] },
    { id: "freshchat", name: "Freshchat", category: "Chat", patterns: ["wchat.freshchat.com"] },
    { id: "crisp", name: "Crisp", category: "Chat", patterns: ["client.crisp.chat"] },
    { id: "tawkto", name: "Tawk.to", category: "Chat", patterns: ["embed.tawk.to"] },
    { id: "olark", name: "Olark", category: "Chat", patterns: ["static.olark.com"] },
    { id: "livechat", name: "LiveChat", category: "Chat", patterns: ["cdn.livechatinc.com"] },
    { id: "tidio", name: "Tidio", category: "Chat", patterns: ["code.tidio.co"] },

    // --- E-COMMERCE & PAYMENTS ---
    { id: "shopify", name: "Shopify", category: "E-Commerce", patterns: ["cdn.shopify.com", "shopify.com"] },
    { id: "woocommerce", name: "WooCommerce", category: "E-Commerce", patterns: ["woocommerce", "wc-ajax"] },
    { id: "magento", name: "Magento", category: "E-Commerce", patterns: ["/static/version", "mage/cookies"] },
    { id: "bigcommerce", name: "BigCommerce", category: "E-Commerce", patterns: ["cdn11.bigcommerce.com"] },
    { id: "stripe", name: "Stripe", category: "Payments", patterns: ["js.stripe.com"] },
    { id: "paypal", name: "PayPal", category: "Payments", patterns: ["paypal.com/sdk", "paypalobjects.com"] },
    { id: "braintree", name: "Braintree", category: "Payments", patterns: ["js.braintreegateway.com"] },
    { id: "paddle", name: "Paddle", category: "Payments", patterns: ["cdn.paddle.com"] },
    { id: "klarna", name: "Klarna", category: "Payments", patterns: ["x.klarnacdn.net"] },
    { id: "afterpay", name: "Afterpay", category: "Payments", patterns: ["js.afterpay.com"] },

    // --- SITE BUILDERS & CMS ---
    { id: "wordpress", name: "WordPress", category: "CMS", patterns: ["wp-content", "wp-includes"] },
    { id: "wix", name: "Wix", category: "Builder", patterns: ["wix.com", "wix-code"] },
    { id: "squarespace", name: "Squarespace", category: "Builder", patterns: ["squarespace.com", "static.squarespace"] },
    { id: "webflow", name: "Webflow", category: "Builder", patterns: ["webflow.com", "webflow.js"] },
    { id: "framer", name: "Framer", category: "Builder", patterns: ["framer.com", "framerusercontent"] },
    { id: "bubble", name: "Bubble", category: "No-Code", patterns: ["bubble.io"] },
    { id: "ghost", name: "Ghost", category: "CMS", patterns: ["ghost.org", "ghost-sdk"] },
    { id: "drupal", name: "Drupal", category: "CMS", patterns: ["drupal.js"] },
    { id: "joomla", name: "Joomla", category: "CMS", patterns: ["/media/jui/js"] },

    // --- FRAMEWORKS & LIBRARIES ---
    { id: "react", name: "React", category: "Framework", patterns: ["react.production.min.js", "react-dom"] },
    { id: "vue", name: "Vue.js", category: "Framework", patterns: ["vue.js", "vue.min.js"] },
    { id: "angular", name: "Angular", category: "Framework", patterns: ["angular.js", "angular.min.js"] },
    { id: "jquery", name: "jQuery", category: "Library", patterns: ["jquery.com", "jquery.min.js"] },
    { id: "nextjs", name: "Next.js", category: "Framework", patterns: ["/_next/static"] },
    { id: "nuxt", name: "Nuxt.js", category: "Framework", patterns: ["/_nuxt/"] },
    { id: "svelte", name: "Svelte", category: "Framework", patterns: ["svelte-internal"] },
    { id: "alpine", name: "Alpine.js", category: "Library", patterns: ["alpine.js", "cdn.jsdelivr.net/gh/alpinejs"] },
    { id: "tailwind", name: "Tailwind CSS", category: "CSS", patterns: ["tailwindcss.com", "cdn.tailwindcss.com"] },
    { id: "bootstrap", name: "Bootstrap", category: "CSS", patterns: ["bootstrap.min.js", "stackpath.bootstrapcdn.com/bootstrap"] },

    // --- HOSTING & INFRASTRUCTURE ---
    { id: "cloudflare", name: "Cloudflare", category: "CDN", patterns: ["cdnjs.cloudflare.com", "cloudflare-static"] },
    { id: "aws_s3", name: "Amazon S3", category: "Storage", patterns: ["s3.amazonaws.com"] },
    { id: "googleapis", name: "Google Hosted Libs", category: "CDN", patterns: ["ajax.googleapis.com"] },
    { id: "netlify", name: "Netlify", category: "Hosting", patterns: ["netlify.app"] },
    { id: "vercel", name: "Vercel", category: "Hosting", patterns: ["vercel-analytics"] },
    { id: "heroku", name: "Heroku", category: "Hosting", patterns: ["herokuapp.com"] },
    { id: "fastly", name: "Fastly", category: "CDN", patterns: ["fastly.net"] },
    { id: "akamai", name: "Akamai", category: "CDN", patterns: ["akamaihd.net"] },

    // --- SECURITY & UTILS ---
    { id: "recaptcha", name: "Google reCAPTCHA", category: "Security", patterns: ["www.google.com/recaptcha"] },
    { id: "hcaptcha", name: "hCaptcha", category: "Security", patterns: ["hcaptcha.com"] },
    { id: "cookiebot", name: "Cookiebot", category: "Compliance", patterns: ["cookiebot.com"] },
    { id: "onetrust", name: "OneTrust", category: "Compliance", patterns: ["cdn.cookielaw.org"] },
    { id: "termly", name: "Termly", category: "Compliance", patterns: ["termly.io"] },
    { id: "fontawesome", name: "Font Awesome", category: "Icons", patterns: ["fontawesome.com", "kit.fontawesome.com"] },
    { id: "typekit", name: "Adobe Fonts", category: "Fonts", patterns: ["use.typekit.net"] },
    { id: "google_fonts", name: "Google Fonts", category: "Fonts", patterns: ["fonts.googleapis.com"] },
    { id: "disqus", name: "Disqus", category: "Comments", patterns: ["disqus.com/embed.js"] }
];
