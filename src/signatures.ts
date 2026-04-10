export interface SaasSignature {
    id: string;
    name: string;
    category: string;
    affiliateLink?: string;
    patterns: string[];
    globalVar?: string[];
}

export const signatures: SaasSignature[] = [

    // --- E-COMMERCE ---
    {
        id: "shopify",
        name: "Shopify",
        category: "E-Commerce",
        patterns: ["cdn.shopify.com", "shopify.com"],
        globalVar: ["Shopify"]
    },
    {
        id: "woocommerce",
        name: "WooCommerce",
        category: "E-Commerce",
        patterns: ["woocommerce", "wc-ajax"],
        globalVar: ["wc_add_to_cart_params", "woocommerce_params"]
    },
    {
        id: "bigcommerce",
        name: "BigCommerce",
        category: "E-Commerce",
        patterns: ["cdn11.bigcommerce.com"],
        globalVar: ["BCData", "BigCommerce"]
    },
    {
        id: "magento",
        name: "Magento",
        category: "E-Commerce",
        patterns: ["/static/version", "mage/cookies"],
        globalVar: ["Mage"]
    },
    {
        id: "wix",
        name: "Wix",
        category: "Website Builder",
        patterns: ["static.wixstatic.com", "wix.com"],
        globalVar: ["wixBiSession", "wixPerformanceMeasurements"]
    },
    {
        id: "squarespace",
        name: "Squarespace",
        category: "Website Builder",
        patterns: ["static1.squarespace.com", "squarespace.com"],
        globalVar: ["Squarespace"]
    },
    {
        id: "webflow",
        name: "Webflow",
        category: "Website Builder",
        patterns: ["assets.website-files.com", "webflow.com/js"],
        globalVar: ["Webflow"]
    },
    {
        id: "framer",
        name: "Framer",
        category: "Website Builder",
        patterns: ["framerusercontent.com", "framer.com/m"],
        globalVar: []
    },
    {
        id: "bubble",
        name: "Bubble",
        category: "No-Code",
        patterns: ["bubble.io", "appsbubble.com"],
        globalVar: ["bubble"]
    },
    {
        id: "ghost",
        name: "Ghost",
        category: "CMS",
        patterns: ["ghost.org", "cdn.jsdelivr.net/ghost"],
        globalVar: ["Ghost"]
    },
    {
        id: "wordpress",
        name: "WordPress",
        category: "CMS",
        patterns: ["/wp-content/", "/wp-includes/", "wp-json"],
        globalVar: ["wp", "wpApiSettings"]
    },
    {
        id: "gorgias",
        name: "Gorgias",
        category: "Support",
        patterns: ["config.gorgias.chat", "gorgias.chat"],
        globalVar: ["GorgiasChat"]
    },
    {
        id: "yotpo",
        name: "Yotpo",
        category: "Reviews",
        patterns: ["staticw2.yotpo.com", "yotpo.com"],
        globalVar: ["yotpo"]
    },
    {
        id: "recharge",
        name: "Recharge",
        category: "Subscriptions",
        patterns: ["rechargeapps.com", "rechargepayments.com"],
        globalVar: ["ReCharge"]
    },
    {
        id: "klaviyo",
        name: "Klaviyo",
        category: "Email Marketing",
        patterns: ["static.klaviyo.com", "a.klaviyo.com"],
        globalVar: ["_learnq", "klaviyo"]
    },

    // --- EMAIL / MARKETING AUTOMATION ---
    {
        id: "mailchimp",
        name: "Mailchimp",
        category: "Email Marketing",
        patterns: ["chimpstatic.com", "list-manage.com", "mailchimp.com"],
        globalVar: ["_mcid", "mc"]
    },
    {
        id: "activecampaign",
        name: "ActiveCampaign",
        category: "Email Marketing",
        patterns: ["trackcmp.net", "activecampaign.com"],
        globalVar: ["vgo"]
    },
    {
        id: "convertkit",
        name: "ConvertKit",
        category: "Email Marketing",
        patterns: ["f.convertkit.com", "convertkit.com"],
        globalVar: ["ck_subscriber_id"]
    },
    {
        id: "drip",
        name: "Drip",
        category: "Email Marketing",
        patterns: ["tag.getdrip.com", "getdrip.com"],
        globalVar: ["_dcq", "_dcs"]
    },
    {
        id: "omnisend",
        name: "Omnisend",
        category: "Email Marketing",
        patterns: ["omnisrc.com", "omnisnippet1.com"],
        globalVar: ["omnisend"]
    },
    {
        id: "sendinblue",
        name: "Brevo",
        category: "Email Marketing",
        patterns: ["sibautomation.com", "sendinblue.com"],
        globalVar: ["sendinblue"]
    },
    {
        id: "mailerlite",
        name: "MailerLite",
        category: "Email Marketing",
        patterns: ["static.mailerlite.com", "assets.mailerlite.com"],
        globalVar: ["ml_account"]
    },

    // --- CRM ---
    {
        id: "hubspot",
        name: "HubSpot",
        category: "CRM",
        patterns: ["js.hs-scripts.com", "js.hsforms.net", "js.hscta.net"],
        globalVar: ["_hsq", "hbspt"]
    },
    {
        id: "salesforce",
        name: "Salesforce",
        category: "CRM",
        patterns: ["salesforce.com", "force.com", "pardot.com"],
        globalVar: ["SFIDWidget", "_pa"]
    },
    {
        id: "pipedrive",
        name: "Pipedrive",
        category: "CRM",
        patterns: ["leadbooster-chat.pipedrive.com", "pipedrive.com"],
        globalVar: ["LeadBooster"]
    },
    {
        id: "closecrm",
        name: "Close CRM",
        category: "CRM",
        patterns: ["close.com", "closeio.com"],
        globalVar: []
    },
    {
        id: "mondaycom",
        name: "Monday.com",
        category: "Project Management",
        patterns: ["monday.com", "dapulse.com"],
        globalVar: ["monday"]
    },

    // --- LIVE CHAT / SUPPORT ---
    {
        id: "intercom",
        name: "Intercom",
        category: "Live Chat",
        patterns: ["widget.intercom.io", "js.intercomcdn.com"],
        globalVar: ["Intercom", "intercomSettings"]
    },
    {
        id: "zendesk",
        name: "Zendesk",
        category: "Support",
        patterns: ["static.zdassets.com", "zendesk.com"],
        globalVar: ["zE", "zEmbed"]
    },
    {
        id: "crisp",
        name: "Crisp",
        category: "Live Chat",
        patterns: ["client.crisp.chat"],
        globalVar: ["$crisp", "CRISP_WEBSITE_ID"]
    },
    {
        id: "tawkto",
        name: "Tawk.to",
        category: "Live Chat",
        patterns: ["embed.tawk.to", "tawk.to"],
        globalVar: ["Tawk_API", "Tawk_LoadStart"]
    },
    {
        id: "livechat",
        name: "LiveChat",
        category: "Live Chat",
        patterns: ["cdn.livechatinc.com", "livechatinc.com"],
        globalVar: ["LC_API", "__lc"]
    },
    {
        id: "tidio",
        name: "Tidio",
        category: "Live Chat",
        patterns: ["code.tidio.co"],
        globalVar: ["tidioChatApi"]
    },
    {
        id: "drift",
        name: "Drift",
        category: "Live Chat",
        patterns: ["js.driftt.com", "drift.com"],
        globalVar: ["drift", "driftt"]
    },
    {
        id: "freshchat",
        name: "Freshchat",
        category: "Live Chat",
        patterns: ["wchat.freshchat.com", "freshchat.com"],
        globalVar: ["fcWidget", "fwcrm"]
    },
    {
        id: "olark",
        name: "Olark",
        category: "Live Chat",
        patterns: ["static.olark.com"],
        globalVar: ["olark"]
    },
    {
        id: "helpscout",
        name: "Help Scout",
        category: "Support",
        patterns: ["beacon-v2.helpscout.net"],
        globalVar: ["Beacon"]
    },
    {
        id: "freshdesk",
        name: "Freshdesk",
        category: "Support",
        patterns: ["freshdesk.com", "freshworks.com/widget"],
        globalVar: ["FreshworksWidget"]
    },

    // --- ANALYTICS / HEATMAPS ---
    {
        id: "ga",
        name: "Google Analytics",
        category: "Analytics",
        patterns: ["google-analytics.com", "ga.js", "analytics.js"],
        globalVar: ["ga", "GoogleAnalyticsObject"]
    },
    {
        id: "gtm",
        name: "Google Tag Manager",
        category: "Analytics",
        patterns: ["googletagmanager.com"],
        globalVar: ["google_tag_manager"]
    },
    {
        id: "segment",
        name: "Segment",
        category: "Data Platform",
        patterns: ["cdn.segment.com", "segment.io"],
        globalVar: ["analytics"]
    },
    {
        id: "hotjar",
        name: "Hotjar",
        category: "Analytics",
        patterns: ["static.hotjar.com", "script.hotjar.com"],
        globalVar: ["hj", "_hjSettings", "hjSiteSettings"]
    },
    {
        id: "mixpanel",
        name: "Mixpanel",
        category: "Analytics",
        patterns: ["cdn.mxpnl.com", "cdn4.mxpnl.com"],
        globalVar: ["mixpanel"]
    },
    {
        id: "amplitude",
        name: "Amplitude",
        category: "Analytics",
        patterns: ["cdn.amplitude.com", "api2.amplitude.com"],
        globalVar: ["amplitude"]
    },
    {
        id: "heap",
        name: "Heap Analytics",
        category: "Analytics",
        patterns: ["cdn.heapanalytics.com"],
        globalVar: ["heap", "heapReadyCb"]
    },
    {
        id: "fullstory",
        name: "FullStory",
        category: "Analytics",
        patterns: ["fullstory.com/s/fs.js", "edge.fullstory.com"],
        globalVar: ["FS", "_fs_namespace"]
    },
    {
        id: "logrocket",
        name: "LogRocket",
        category: "Analytics",
        patterns: ["cdn.logrocket.io", "cdn.lr-ingest.com"],
        globalVar: ["LogRocket"]
    },
    {
        id: "crazyegg",
        name: "Crazy Egg",
        category: "Analytics",
        patterns: ["script.crazyegg.com", "dnn506yrbagrg.cloudfront.net"],
        globalVar: ["CE2", "CE_API"]
    },
    {
        id: "mouseflow",
        name: "Mouseflow",
        category: "Analytics",
        patterns: ["cdn.mouseflow.com"],
        globalVar: ["_mfq"]
    },
    {
        id: "clarity",
        name: "Microsoft Clarity",
        category: "Analytics",
        patterns: ["clarity.ms"],
        globalVar: ["clarity"]
    },
    {
        id: "posthog",
        name: "PostHog",
        category: "Analytics",
        patterns: ["app.posthog.com", "eu.posthog.com", "us.i.posthog.com"],
        globalVar: ["posthog"]
    },

    // --- MONITORING / ERROR TRACKING ---
    {
        id: "sentry",
        name: "Sentry",
        category: "Monitoring",
        patterns: ["browser.sentry-cdn.com", "js.sentry-cdn.com"],
        globalVar: ["Sentry", "__SENTRY__"]
    },
    {
        id: "datadog",
        name: "Datadog",
        category: "Monitoring",
        patterns: ["browser-agent.datadoghq-browser-agent.com", "datadoghq.com"],
        globalVar: ["DD_RUM", "DD_LOGS"]
    },
    {
        id: "newrelic",
        name: "New Relic",
        category: "Monitoring",
        patterns: ["js-agent.newrelic.com", "bam.nr-data.net"],
        globalVar: ["NREUM", "newrelic"]
    },

    // --- PAYMENTS / BILLING ---
    {
        id: "stripe",
        name: "Stripe",
        category: "Payments",
        patterns: ["js.stripe.com"],
        globalVar: ["Stripe"]
    },
    {
        id: "paddle",
        name: "Paddle",
        category: "Payments",
        patterns: ["cdn.paddle.com", "paddle.com"],
        globalVar: ["Paddle"]
    },
    {
        id: "klarna",
        name: "Klarna",
        category: "Payments",
        patterns: ["x.klarnacdn.net", "js.klarna.com"],
        globalVar: ["Klarna"]
    },
    {
        id: "paypal",
        name: "PayPal",
        category: "Payments",
        patterns: ["www.paypal.com/sdk/js", "paypalobjects.com"],
        globalVar: ["paypal", "PAYPAL"]
    },
    {
        id: "braintree",
        name: "Braintree",
        category: "Payments",
        patterns: ["js.braintreegateway.com"],
        globalVar: ["braintree"]
    },
    {
        id: "square",
        name: "Square",
        category: "Payments",
        patterns: ["js.squareup.com", "web.squarecdn.com"],
        globalVar: ["Square", "SqPaymentForm"]
    },

    // --- COMPLIANCE / CONSENT ---
    {
        id: "cookiebot",
        name: "Cookiebot",
        category: "Compliance",
        patterns: ["consent.cookiebot.com", "cookiebot.com"],
        globalVar: ["Cookiebot", "CookieConsent"]
    },
    {
        id: "termly",
        name: "Termly",
        category: "Compliance",
        patterns: ["app.termly.io"],
        globalVar: ["displayPreferenceModal"]
    },
    {
        id: "onetrust",
        name: "OneTrust",
        category: "Compliance",
        patterns: ["cdn.cookielaw.org", "optanon.blob.core.windows.net"],
        globalVar: ["OneTrust", "OptanonWrapper"]
    },
    {
        id: "osano",
        name: "Osano",
        category: "Compliance",
        patterns: ["cmp.osano.com"],
        globalVar: ["Osano"]
    },

    // --- NOTIFICATIONS / PUSH ---
    {
        id: "onesignal",
        name: "OneSignal",
        category: "Notifications",
        patterns: ["cdn.onesignal.com", "onesignal.com"],
        globalVar: ["OneSignal"]
    },
    {
        id: "pushwoosh",
        name: "Pushwoosh",
        category: "Notifications",
        patterns: ["cdn.pushwoosh.com"],
        globalVar: ["Pushwoosh"]
    },

    // --- FORMS / SURVEYS ---
    {
        id: "typeform",
        name: "Typeform",
        category: "Forms",
        patterns: ["embed.typeform.com", "typeform.com"],
        globalVar: ["tf"]
    },
    {
        id: "jotform",
        name: "Jotform",
        category: "Forms",
        patterns: ["form.jotform.com", "js.jotform.com"],
        globalVar: []
    },
    {
        id: "surveymonkey",
        name: "SurveyMonkey",
        category: "Forms",
        patterns: ["surveymonkey.com", "smcx.com"],
        globalVar: ["SMCX"]
    },
    {
        id: "tally",
        name: "Tally",
        category: "Forms",
        patterns: ["tally.so"],
        globalVar: ["TallyConfig"]
    },

    // --- ADS / SOCIAL PIXELS ---
    {
        id: "fbpixel",
        name: "Meta Pixel",
        category: "Ads",
        patterns: ["connect.facebook.net"],
        globalVar: ["fbq"]
    },
    {
        id: "googletag",
        name: "Google Ads",
        category: "Ads",
        patterns: ["googleadservices.com", "googlesyndication.com"],
        globalVar: ["google_conversion_id", "gtag"]
    },
    {
        id: "tiktokpixel",
        name: "TikTok Pixel",
        category: "Ads",
        patterns: ["analytics.tiktok.com"],
        globalVar: ["ttq", "TiktokAnalyticsObject"]
    },
    {
        id: "twitterpixel",
        name: "X (Twitter) Pixel",
        category: "Ads",
        patterns: ["static.ads-twitter.com"],
        globalVar: ["twq"]
    },
    {
        id: "linkedinpixel",
        name: "LinkedIn Insight",
        category: "Ads",
        patterns: ["snap.licdn.com"],
        globalVar: ["_linkedin_data_partner_ids"]
    },
    {
        id: "pinterest",
        name: "Pinterest Tag",
        category: "Ads",
        patterns: ["s.pinimg.com"],
        globalVar: ["pintrk"]
    },
    {
        id: "snapchat",
        name: "Snapchat Pixel",
        category: "Ads",
        patterns: ["sc-static.net"],
        globalVar: ["snaptr"]
    },

    // --- HOSTING / CDN / INFRASTRUCTURE ---
    {
        id: "cloudflare",
        name: "Cloudflare",
        category: "CDN",
        patterns: ["cloudflare.com", "cdnjs.cloudflare.com"],
        globalVar: ["__cf_chl_jschl_tk__", "Cloudflare"]
    },
    {
        id: "vercel",
        name: "Vercel",
        category: "Hosting",
        patterns: ["vercel.app", "_vercel"],
        globalVar: ["__NEXT_DATA__"]
    },
    {
        id: "netlify",
        name: "Netlify",
        category: "Hosting",
        patterns: ["netlify.app", "netlify.com"],
        globalVar: []
    },
    {
        id: "digitalocean",
        name: "DigitalOcean",
        category: "Hosting",
        patterns: ["digitalocean.com", "do.co"],
        globalVar: []
    },

    // --- SCHEDULING ---
    {
        id: "calendly",
        name: "Calendly",
        category: "Scheduling",
        patterns: ["assets.calendly.com", "calendly.com"],
        globalVar: ["Calendly"]
    },
    {
        id: "acuity",
        name: "Acuity Scheduling",
        category: "Scheduling",
        patterns: ["embed.acuityscheduling.com"],
        globalVar: []
    },
    {
        id: "chilipipper",
        name: "Chili Piper",
        category: "Scheduling",
        patterns: ["js.chilipiper.com"],
        globalVar: ["ChiliPiper"]
    },

    // --- PROJECT MANAGEMENT / PRODUCTIVITY ---
    {
        id: "asana",
        name: "Asana",
        category: "Project Management",
        patterns: ["asana.com"],
        globalVar: []
    },
    {
        id: "clickup",
        name: "ClickUp",
        category: "Project Management",
        patterns: ["clickup.com"],
        globalVar: []
    },
    {
        id: "notion",
        name: "Notion",
        category: "Productivity",
        patterns: ["notion.so", "notion.site"],
        globalVar: []
    },

    // --- AUTOMATION ---
    {
        id: "zapier",
        name: "Zapier",
        category: "Automation",
        patterns: ["zapier.com"],
        globalVar: []
    },

    // --- SEARCH ---
    {
        id: "algolia",
        name: "Algolia",
        category: "Search",
        patterns: ["cdn.jsdelivr.net/npm/algoliasearch", "algolia.net"],
        globalVar: ["algoliasearch", "instantsearch"]
    },

    // --- FRAMEWORKS ---
    {
        id: "react",
        name: "React",
        category: "Framework",
        patterns: ["react.production.min.js"],
        globalVar: ["React", "_reactRootContainer", "__REACT_DEVTOOLS_GLOBAL_HOOK__"]
    },
    {
        id: "vue",
        name: "Vue.js",
        category: "Framework",
        patterns: ["vue.js", "vue.min.js"],
        globalVar: ["Vue", "__vue_app__"]
    },
    {
        id: "nextjs",
        name: "Next.js",
        category: "Framework",
        patterns: ["/_next/static"],
        globalVar: ["__NEXT_DATA__"]
    },
    {
        id: "nuxt",
        name: "Nuxt.js",
        category: "Framework",
        patterns: ["/_nuxt/"],
        globalVar: ["__NUXT__"]
    },
    {
        id: "angular",
        name: "Angular",
        category: "Framework",
        patterns: ["angular.min.js", "angular.js"],
        globalVar: ["angular", "ng"]
    },
    {
        id: "svelte",
        name: "Svelte",
        category: "Framework",
        patterns: ["/_app/immutable/"],
        globalVar: []
    },
    {
        id: "jquery",
        name: "jQuery",
        category: "Library",
        patterns: ["jquery.com", "jquery.min.js"],
        globalVar: ["jQuery", "$"]
    },

    // --- OTHER ---
    {
        id: "amazon_ui",
        name: "Amazon UI",
        category: "Custom Stack",
        patterns: ["images-na.ssl-images-amazon.com", "m.media-amazon.com"],
        globalVar: ["ue", "P", "AmazonUIPageJS"]
    },
    {
        id: "aws_amplify",
        name: "AWS Amplify",
        category: "Cloud",
        patterns: ["amplify.aws", "aws-amplify"],
        globalVar: ["aws_amplify", "Amplify"]
    },
    {
        id: "firebase",
        name: "Firebase",
        category: "Cloud",
        patterns: ["firebase.googleapis.com", "firebaseapp.com"],
        globalVar: ["firebase", "__FIREBASE_DEFAULTS__"]
    },
    {
        id: "supabase",
        name: "Supabase",
        category: "Cloud",
        patterns: ["supabase.co", "supabase.io"],
        globalVar: ["supabase"]
    },
    {
        id: "interakt",
        name: "Interakt",
        category: "Messaging",
        patterns: ["widget.interakt.ai"],
        globalVar: ["interakt"]
    }
];
