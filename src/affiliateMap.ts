export const AFFILIATE_LINKS: Record<string, string> = {

    // --- E-COMMERCE ---
    "Shopify":          "https://shopify.pxf.io/c/YOUR_ID",
    "WooCommerce":      "https://woocommerce.com/?aff=YOUR_ID",
    "BigCommerce":      "https://www.bigcommerce.com/essentials/?ref=YOUR_ID",
    "Wix":              "https://www.wix.com/upgrade/website?utm_campaign=INT_Affiliatly_YOUR_ID",
    "Squarespace":      "https://squarespace.com/?channel=affiliate&subchannel=YOUR_ID",
    "Webflow":          "https://webflow.com?r=YOUR_ID",
    "Framer":           "https://www.framer.com/?via=YOUR_ID",
    "Bubble":           "https://bubble.io/?ref=YOUR_ID",
    "Ghost":            "https://ghost.org/?ref=YOUR_ID",
    "WordPress":        "https://wordpress.com/refer-a-friend/YOUR_ID",
    "Gorgias":          "https://www.gorgias.com/?ref=YOUR_ID",
    "Yotpo":            "https://www.yotpo.com/?ref=YOUR_ID",
    "Recharge":         "https://rechargepayments.com/?ref=YOUR_ID",

    // --- EMAIL / MARKETING ---
    "Klaviyo":          "https://www.klaviyo.com/partner/signup?utm_campaign=YOUR_ID",
    "Mailchimp":        "https://mailchimp.com/?ref=YOUR_ID",
    "ActiveCampaign":   "https://www.activecampaign.com/?_r=YOUR_ID",
    "ConvertKit":       "https://convertkit.com?lmref=YOUR_ID",
    "Drip":             "https://www.getdrip.com/?ref=YOUR_ID",
    "Omnisend":         "https://www.omnisend.com/?ref=YOUR_ID",
    "Brevo":            "https://www.brevo.com/?ref=YOUR_ID",
    "MailerLite":       "https://www.mailerlite.com/a/YOUR_ID",

    // --- CRM ---
    "HubSpot":          "https://hubspot.sjv.io/YOUR_ID",
    "Salesforce":       "https://www.salesforce.com/partners/?ref=YOUR_ID",
    "Pipedrive":        "https://www.pipedrive.com/en/partners?ref=YOUR_ID",
    "Close CRM":        "https://close.com/partners/?ref=YOUR_ID",
    "Monday.com":       "https://monday.com/affiliates/?ref=YOUR_ID",

    // --- LIVE CHAT / SUPPORT ---
    "Intercom":         "https://intercom.com/?ref=YOUR_ID",
    "Zendesk":          "https://www.zendesk.com/partner/?ref=YOUR_ID",
    "Crisp":            "https://crisp.chat/?aff=YOUR_ID",
    "Tawk.to":          "https://www.tawk.to/affiliates/?ref=YOUR_ID",
    "LiveChat":         "https://www.livechat.com/?a=YOUR_ID&utm_source=PP",
    "Tidio":            "https://www.tidio.com/?ref=YOUR_ID",
    "Drift":            "https://www.salesloft.com/partners/?ref=YOUR_ID",
    "Freshchat":        "https://www.freshworks.com/live-chat-software/?ref=YOUR_ID",
    "Olark":            "https://www.olark.com/?ref=YOUR_ID",
    "Help Scout":       "https://www.helpscout.com/?ref=YOUR_ID",
    "Freshdesk":        "https://freshdesk.com/?ref=YOUR_ID",

    // --- ANALYTICS / HEATMAPS ---
    "Hotjar":           "https://www.hotjar.com/?ref=YOUR_ID",
    "Mixpanel":         "https://mixpanel.com/?ref=YOUR_ID",
    "Amplitude":        "https://amplitude.com/?ref=YOUR_ID",
    "Heap Analytics":   "https://heap.io/?ref=YOUR_ID",
    "FullStory":        "https://www.fullstory.com/partners/?ref=YOUR_ID",
    "LogRocket":        "https://logrocket.com/?ref=YOUR_ID",
    "Crazy Egg":        "https://www.shareasale.com/r.cfm?b=1662972&u=YOUR_ID&m=97846",
    "PostHog":          "https://posthog.com/?ref=YOUR_ID",
    "Microsoft Clarity":"https://clarity.microsoft.com/?ref=YOUR_ID",
    "Mouseflow":        "https://mouseflow.com/?ref=YOUR_ID",

    // --- MONITORING ---
    "Sentry":           "https://sentry.io/partners/?ref=YOUR_ID",
    "Datadog":          "https://www.datadoghq.com/partner/referral/?ref=YOUR_ID",
    "New Relic":        "https://newrelic.com/partners/referral?ref=YOUR_ID",

    // --- PAYMENTS ---
    "Stripe":           "https://stripe.com/partners/become-a-partner?ref=YOUR_ID",
    "Paddle":           "https://paddle.com/?ref=YOUR_ID",
    "Klarna":           "https://www.klarna.com/us/business/become-a-partner/?ref=YOUR_ID",
    "PayPal":           "https://www.paypal.com/us/webapps/mpp/referral/YOUR_ID",

    // --- COMPLIANCE ---
    "Cookiebot":        "https://www.cookiebot.com/en/partner/?ref=YOUR_ID",
    "Termly":           "https://termly.io/?ref=YOUR_ID",
    "OneTrust":         "https://www.onetrust.com/partners/?ref=YOUR_ID",

    // --- NOTIFICATIONS ---
    "OneSignal":        "https://onesignal.com/partnerships?ref=YOUR_ID",

    // --- FORMS ---
    "Typeform":         "https://www.typeform.com/referral/?ref=YOUR_ID",
    "Jotform":          "https://www.jotform.com/affiliates/?ref=YOUR_ID",

    // --- SCHEDULING ---
    "Calendly":         "https://calendly.com/affiliates?ref=YOUR_ID",

    // --- HOSTING ---
    "Cloudflare":       "https://www.cloudflare.com/?ref=YOUR_ID",
    "Vercel":           "https://vercel.com/?ref=YOUR_ID",
    "Netlify":          "https://www.netlify.com/?ref=YOUR_ID",
    "DigitalOcean":     "https://m.do.co/c/YOUR_ID",

    // --- SEARCH ---
    "Algolia":          "https://www.algolia.com/?ref=YOUR_ID",

    // --- PROJECT MANAGEMENT ---
    "ClickUp":          "https://clickup.com/?ref=YOUR_ID",
    "Asana":            "https://asana.com/?ref=YOUR_ID",
};

export const hasAffiliateLink = (techName: string): boolean => {
    return !!AFFILIATE_LINKS[techName];
};
