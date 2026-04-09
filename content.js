(()=>{"use strict";

const signatures = [
  // --- ANALYTICS ---
  {id:"ga",name:"Google Analytics",category:"Analytics",free:true,patterns:["google-analytics.com","ga.js","analytics.js"],globalVar:["ga","gtag"],description:"Web and app analytics by Google",alternatives:["Plausible","Fathom Analytics","Matomo"]},
  {id:"gtm",name:"Google Tag Manager",category:"Analytics",free:true,patterns:["googletagmanager.com"],globalVar:["google_tag_manager","dataLayer"],description:"Tag management system by Google",alternatives:["Segment","Tealium","Metarouter"]},
  {id:"mixpanel",name:"Mixpanel",category:"Analytics",free:true,patterns:["cdn.mxpnl.com","mixpanel.com"],globalVar:["mixpanel"],description:"Product analytics for web and mobile apps",alternatives:["Amplitude","Heap Analytics","PostHog"]},
  {id:"amplitude",name:"Amplitude",category:"Analytics",free:true,patterns:["amplitude.com","amplitude-snippet"],globalVar:["amplitude"],description:"Behavioral analytics and data platform",alternatives:["Mixpanel","Heap Analytics","PostHog"]},
  {id:"heap",name:"Heap Analytics",category:"Analytics",patterns:["heapanalytics.com"],globalVar:["heap"],description:"Automatic event capture and product analytics",alternatives:["Mixpanel","FullStory","PostHog"]},
  {id:"posthog",name:"PostHog",category:"Analytics",patterns:["app.posthog.com","eu.posthog.com"],globalVar:["posthog"],description:"Open-source product analytics platform",alternatives:["Mixpanel","Amplitude","Heap Analytics"]},
  {id:"plausible",name:"Plausible Analytics",category:"Analytics",patterns:["plausible.io/js"],globalVar:["plausible"],description:"Privacy-friendly Google Analytics alternative",alternatives:["Fathom Analytics","Matomo","GoatCounter"]},
  {id:"fathom",name:"Fathom Analytics",category:"Analytics",patterns:["cdn.usefathom.com","usefathom.com"],globalVar:[],description:"Simple, privacy-focused website analytics",alternatives:["Plausible","Matomo","GoatCounter"]},
  {id:"matomo",name:"Matomo",category:"Analytics",patterns:["matomo.js","piwik.js"],globalVar:["Matomo","_paq"],description:"Open-source web analytics platform",alternatives:["Google Analytics","Plausible","Fathom Analytics"]},
  {id:"segment",name:"Segment",category:"Data Platform",free:true,patterns:["cdn.segment.com","segment.io"],globalVar:[],description:"Customer data platform and analytics hub",alternatives:["RudderStack","mParticle","Amplitude"]},
  {id:"rudderstack",name:"RudderStack",category:"Data Platform",patterns:["cdn.rudderlabs.com","rudderstack.com"],globalVar:["rudderanalytics"],description:"Open-source customer data platform",alternatives:["Segment","mParticle","Treasure Data"]},

  // --- HEATMAPS & SESSION REPLAY ---
  {id:"hotjar",name:"Hotjar",category:"Heatmap",free:true,patterns:["static.hotjar.com"],globalVar:["hj","hjSiteSettings"],description:"Heatmaps, session recordings, and surveys",alternatives:["Microsoft Clarity","FullStory","Lucky Orange"]},
  {id:"clarity",name:"Microsoft Clarity",category:"Heatmap",free:true,patterns:["www.clarity.ms"],globalVar:["clarity"],description:"Free behavior analytics with heatmaps by Microsoft",alternatives:["Hotjar","Crazy Egg","Lucky Orange"]},
  {id:"crazyegg",name:"Crazy Egg",category:"Heatmap",patterns:["script.crazyegg.com"],globalVar:["CE2"],description:"Heatmaps and A/B testing tool",alternatives:["Hotjar","Microsoft Clarity","Lucky Orange"]},
  {id:"mouseflow",name:"Mouseflow",category:"Heatmap",patterns:["cdn.mouseflow.com","mouseflow.com"],globalVar:["mouseflow","_mfq"],description:"Session replay and heatmap analytics",alternatives:["Hotjar","FullStory","Crazy Egg"]},
  {id:"luckyorange",name:"Lucky Orange",category:"Heatmap",patterns:["d.luckyorange.com"],globalVar:["_lo_"],description:"Heatmaps, recordings, and live chat",alternatives:["Hotjar","Crazy Egg","Microsoft Clarity"]},
  {id:"fullstory",name:"FullStory",category:"Session Replay",free:true,patterns:["fullstory.com"],globalVar:["FS","_fs_namespace"],description:"Digital experience platform with session replay",alternatives:["Hotjar","LogRocket","Smartlook"]},
  {id:"logrocket",name:"LogRocket",category:"Session Replay",free:true,patterns:["logrocket.io"],globalVar:["LogRocket"],description:"Frontend monitoring and session replay",alternatives:["FullStory","Datadog","Sentry"]},

  // --- OBSERVABILITY & ERROR TRACKING ---
  {id:"newrelic",name:"New Relic",category:"Observability",free:true,patterns:["js-agent.newrelic.com"],globalVar:["newrelic"],description:"Full-stack observability and monitoring platform",alternatives:["Datadog","Dynatrace","AppDynamics"]},
  {id:"datadog",name:"Datadog",category:"Observability",patterns:["datadoghq-browser-agent.com"],globalVar:["DD_RUM"],description:"Cloud monitoring, logs, and APM",alternatives:["New Relic","Dynatrace","Splunk"]},
  {id:"dynatrace",name:"Dynatrace",category:"Observability",patterns:["dynatrace.com","dynatracelabs.com"],globalVar:["dtrum"],description:"AI-powered observability and security platform",alternatives:["Datadog","New Relic","AppDynamics"]},
  {id:"sentry",name:"Sentry",category:"Error Tracking",free:true,patterns:["browser.sentry-cdn.com","js.sentry-cdn.com"],globalVar:["Sentry"],description:"Application error tracking and performance monitoring",alternatives:["Bugsnag","Rollbar","LogRocket"]},
  {id:"bugsnag",name:"Bugsnag",category:"Error Tracking",patterns:["d2wy8f7a9ursnm.cloudfront.net","bugsnag"],globalVar:["Bugsnag"],description:"Error monitoring for web and mobile apps",alternatives:["Sentry","Rollbar","Raygun"]},
  {id:"rollbar",name:"Rollbar",category:"Error Tracking",patterns:["cdn.rollbar.com"],globalVar:["Rollbar"],description:"Real-time error tracking for developers",alternatives:["Sentry","Bugsnag","Raygun"]},

  // --- ADVERTISING & PIXELS ---
  {id:"fb_pixel",name:"Meta Pixel",category:"Ads",free:true,patterns:["connect.facebook.net/en_US/fbevents.js"],globalVar:["fbq","_fbq"],description:"Facebook/Meta advertising and conversion tracking",alternatives:["TikTok Pixel","Google Ads","Pinterest Tag"]},
  {id:"tiktok",name:"TikTok Pixel",category:"Ads",free:true,patterns:["analytics.tiktok.com"],globalVar:["ttq"],description:"TikTok advertising and event tracking pixel",alternatives:["Meta Pixel","Snap Pixel","Pinterest Tag"]},
  {id:"linkedin",name:"LinkedIn Insight",category:"Ads",free:true,patterns:["snap.licdn.com"],globalVar:["_linkedin_data_partner_ids"],description:"LinkedIn advertising and conversion tracking",alternatives:["Meta Pixel","X (Twitter) Ads","Google Ads"]},
  {id:"twitter",name:"X (Twitter) Ads",category:"Ads",patterns:["static.ads-twitter.com"],globalVar:["twq"],description:"Twitter/X advertising and event tracking",alternatives:["Meta Pixel","LinkedIn Insight","Snap Pixel"]},
  {id:"pinterest",name:"Pinterest Tag",category:"Ads",patterns:["s.pinimg.com"],globalVar:["pintrk"],description:"Pinterest advertising and conversion pixel",alternatives:["Meta Pixel","TikTok Pixel","Snap Pixel"]},
  {id:"snapchat",name:"Snap Pixel",category:"Ads",patterns:["sc-static.net/scevent.min.js"],globalVar:["snaptr"],description:"Snapchat advertising pixel and event tracking",alternatives:["Meta Pixel","TikTok Pixel","Pinterest Tag"]},
  {id:"google_ads",name:"Google Ads",category:"Ads",free:true,patterns:["googleadservices.com","googlesyndication.com"],globalVar:["google_conversion_id"],description:"Google search, display, and shopping advertising",alternatives:["Meta Ads","Microsoft Ads","LinkedIn Ads"]},
  {id:"bing",name:"Microsoft Ads",category:"Ads",patterns:["bat.bing.com"],globalVar:["uetq"],description:"Microsoft/Bing search advertising platform",alternatives:["Google Ads","Meta Ads","LinkedIn Ads"]},
  {id:"taboola",name:"Taboola",category:"Native Ads",patterns:["cdn.taboola.com"],globalVar:["_taboola"],description:"Native advertising and content discovery platform",alternatives:["Outbrain","Revcontent","Sharethrough"]},
  {id:"outbrain",name:"Outbrain",category:"Native Ads",patterns:["widgets.outbrain.com"],globalVar:["obApi"],description:"Content discovery and native advertising network",alternatives:["Taboola","Revcontent","Sharethrough"]},
  {id:"adroll",name:"AdRoll",category:"Retargeting",patterns:["s.adroll.com"],globalVar:["adroll"],description:"Retargeting and display advertising platform",alternatives:["Criteo","Perfect Audience","Google Ads"]},

  // --- CRM & MARKETING AUTOMATION ---
  {id:"hubspot",name:"HubSpot",category:"CRM",free:true,patterns:["js.hs-scripts.com","js.hs-analytics.net"],globalVar:["_hsq","hbspt"],description:"All-in-one CRM, marketing, and sales platform",alternatives:["Salesforce","Pipedrive","ActiveCampaign"]},
  {id:"salesforce",name:"Salesforce",category:"CRM",free:true,patterns:["salesforceliveagent.com","salesforce.com/embeddedservice","service.force.com"],globalVar:["sforce","Sfdc"],description:"Enterprise CRM and customer data platform",alternatives:["HubSpot","Microsoft Dynamics","Zoho CRM"]},
  {id:"marketo",name:"Marketo",category:"Marketing Auto",patterns:["munchkin.marketo.net"],globalVar:["MunchkinTracker"],description:"B2B marketing automation by Adobe",alternatives:["HubSpot","Pardot","Eloqua"]},
  {id:"pardot",name:"Pardot",category:"Marketing Auto",patterns:["pardot.com"],globalVar:["piTracker"],description:"Salesforce B2B marketing automation platform",alternatives:["Marketo","HubSpot","Eloqua"]},

  // --- EMAIL MARKETING ---
  {id:"mailchimp",name:"Mailchimp",category:"Email",free:true,patterns:["chimpstatic.com"],globalVar:[],description:"Email marketing and automation platform",alternatives:["Klaviyo","ConvertKit","Brevo"]},
  {id:"klaviyo",name:"Klaviyo",category:"Email",free:true,patterns:["static.klaviyo.com"],globalVar:["_learnq","klaviyo"],description:"Email and SMS marketing for e-commerce brands",alternatives:["Mailchimp","Drip","Omnisend"]},
  {id:"activecampaign",name:"ActiveCampaign",category:"Email",patterns:["activehosted.com"],globalVar:["vgo"],description:"Email marketing, automation, and CRM suite",alternatives:["HubSpot","Klaviyo","ConvertKit"]},
  {id:"drip",name:"Drip",category:"Email",patterns:["tag.getdrip.com"],globalVar:[],description:"E-commerce marketing automation platform",alternatives:["Klaviyo","Omnisend","ActiveCampaign"]},
  {id:"convertkit",name:"ConvertKit",category:"Email",patterns:["convertkit.com"],globalVar:[],description:"Email marketing platform for creators",alternatives:["Mailchimp","Klaviyo","Brevo"]},
  {id:"brevo",name:"Brevo",category:"Email",patterns:["sendinblue.com","sibforms.com"],globalVar:[],description:"Email, SMS, and CRM marketing platform (formerly Sendinblue)",alternatives:["Mailchimp","ActiveCampaign","Klaviyo"]},
  {id:"mailerlite",name:"MailerLite",category:"Email",patterns:["mailerlite.com","assets.mailerlite.com"],globalVar:[],description:"Email marketing for small businesses and creators",alternatives:["Mailchimp","ConvertKit","Brevo"]},
  {id:"omnisend",name:"Omnisend",category:"Email",patterns:["omnisrc.com","omnisend.com"],globalVar:[],description:"E-commerce email and SMS marketing automation",alternatives:["Klaviyo","Drip","Mailchimp"]},
  {id:"beehiiv",name:"Beehiiv",category:"Email",patterns:["beehiiv.com"],globalVar:[],description:"Newsletter platform built for growth",alternatives:["Substack","ConvertKit","Ghost"]},
  {id:"substack",name:"Substack",category:"Email",patterns:["substackcdn.com","substack.com/embed"],globalVar:[],description:"Newsletter and subscription publishing platform",alternatives:["Beehiiv","Ghost","ConvertKit"]},

  // --- PUSH NOTIFICATIONS ---
  {id:"onesignal",name:"OneSignal",category:"Push Notifications",free:true,patterns:["cdn.onesignal.com"],globalVar:["OneSignal"],description:"Push notifications, email, and in-app messaging",alternatives:["Pushwoosh","Firebase","Airship"]},
  {id:"pushcrew",name:"VWO Engage",category:"Push Notifications",patterns:["pushcrew.com"],globalVar:["vwo_$"],description:"Push notification and marketing engagement tool",alternatives:["OneSignal","Pushwoosh","Airship"]},
  {id:"pushwoosh",name:"Pushwoosh",category:"Push Notifications",patterns:["pushwoosh.com"],globalVar:["Pushwoosh"],description:"Multi-channel push notification platform",alternatives:["OneSignal","Firebase","Airship"]},

  // --- CHAT & SUPPORT ---
  {id:"intercom",name:"Intercom",category:"Chat",free:true,patterns:["widget.intercom.io"],globalVar:["Intercom"],description:"AI-first customer service and messaging platform",alternatives:["Drift","Crisp","HubSpot"]},
  {id:"drift",name:"Drift",category:"Chat",free:true,patterns:["js.drift.com"],globalVar:["drift"],description:"Conversational marketing and revenue platform",alternatives:["Intercom","HubSpot Chat","Qualified"]},
  {id:"crisp",name:"Crisp",category:"Chat",free:true,patterns:["client.crisp.chat"],globalVar:["CRISP_WEBSITE_ID","$crisp"],description:"Customer messaging platform with live chat and CRM",alternatives:["Intercom","Tawk.to","Tidio"]},
  {id:"tawkto",name:"Tawk.to",category:"Chat",free:true,patterns:["embed.tawk.to"],globalVar:["Tawk_API"],description:"100% free live chat and customer support",alternatives:["Crisp","Tidio","LiveChat"]},
  {id:"olark",name:"Olark",category:"Chat",patterns:["static.olark.com"],globalVar:["olark"],description:"Live chat software for sales and support teams",alternatives:["LiveChat","Tidio","Crisp"]},
  {id:"livechat",name:"LiveChat",category:"Chat",patterns:["cdn.livechatinc.com"],globalVar:["LC_API","__lc"],description:"Live chat for customer service and sales teams",alternatives:["Intercom","Zendesk","Crisp"]},
  {id:"tidio",name:"Tidio",category:"Chat",patterns:["code.tidio.co"],globalVar:["tidioChatApi"],description:"AI-powered live chat and chatbot platform",alternatives:["Crisp","Intercom","Freshchat"]},
  {id:"freshchat",name:"Freshchat",category:"Chat",patterns:["wchat.freshchat.com"],globalVar:["fcWidget"],description:"Modern customer messaging by Freshworks",alternatives:["Intercom","Crisp","Tidio"]},
  {id:"zendesk",name:"Zendesk",category:"Support",free:true,patterns:["static.zdassets.com","assets.zendesk.com"],globalVar:["zE","zEACT"],description:"Customer service software and support ticketing",alternatives:["Freshdesk","Help Scout","Intercom"]},
  {id:"helpscout",name:"Help Scout",category:"Support",patterns:["beacon-v2.helpscout.net"],globalVar:["Beacon"],description:"Customer support and shared inbox platform",alternatives:["Zendesk","Freshdesk","Intercom"]},
  {id:"freshdesk",name:"Freshdesk",category:"Support",patterns:["freshdesk.com","freshdesk-widget"],globalVar:["FreshworksWidget"],description:"Customer support and helpdesk software",alternatives:["Zendesk","Help Scout","Kayako"]},
  {id:"gorgias",name:"Gorgias",category:"Support",patterns:["config.gorgias.chat"],globalVar:["GorgiasChat"],description:"Customer support platform for e-commerce brands",alternatives:["Zendesk","Freshdesk","Re:amaze"]},

  // --- E-COMMERCE ---
  {id:"shopify",name:"Shopify",category:"E-Commerce",free:true,patterns:["cdn.shopify.com","shopify.com"],globalVar:["Shopify"],description:"All-in-one e-commerce and retail platform",alternatives:["BigCommerce","WooCommerce","Wix Commerce"]},
  {id:"woocommerce",name:"WooCommerce",category:"E-Commerce",free:true,patterns:["woocommerce","wc-ajax"],globalVar:["wc_add_to_cart_params","woocommerce_params"],description:"Open-source WordPress e-commerce plugin",alternatives:["Shopify","BigCommerce","Magento"]},
  {id:"magento",name:"Magento",category:"E-Commerce",patterns:["mage/cookies","mage/translate","mage-init"],globalVar:["Magento"],description:"Enterprise e-commerce platform by Adobe",alternatives:["Shopify","BigCommerce","WooCommerce"]},
  {id:"bigcommerce",name:"BigCommerce",category:"E-Commerce",free:true,patterns:["cdn11.bigcommerce.com"],globalVar:["BCData"],description:"Enterprise e-commerce SaaS platform",alternatives:["Shopify","Magento","WooCommerce"]},
  {id:"recharge",name:"Recharge",category:"E-Commerce",patterns:["cdn.recharge.com","rechargepayments.com"],globalVar:["ReCharge"],description:"Subscription billing and management for e-commerce",alternatives:["Bold Subscriptions","Recurly","Chargebee"]},
  {id:"attentive",name:"Attentive",category:"E-Commerce",patterns:["cdn.attn.tv","attentivemobile.com"],globalVar:[],description:"SMS marketing platform for e-commerce brands",alternatives:["Klaviyo SMS","Postscript","SMSBump"]},
  {id:"yotpo",name:"Yotpo",category:"E-Commerce",patterns:["staticw2.yotpo.com","yotpo.com"],globalVar:["yotpo"],description:"E-commerce reviews, loyalty, and referral platform",alternatives:["Trustpilot","Stamped.io","Okendo"]},

  // --- PAYMENTS ---
  {id:"stripe",name:"Stripe",category:"Payments",free:true,patterns:["js.stripe.com"],globalVar:["Stripe"],description:"Payments infrastructure for internet businesses",alternatives:["Paddle","Braintree","Square"]},
  {id:"paypal",name:"PayPal",category:"Payments",free:true,patterns:["paypal.com/sdk","paypalobjects.com"],globalVar:["paypal","PAYPAL"],description:"Online payment processing and digital wallet",alternatives:["Stripe","Braintree","Square"]},
  {id:"braintree",name:"Braintree",category:"Payments",patterns:["js.braintreegateway.com"],globalVar:["braintree"],description:"PayPal's developer-friendly payments SDK",alternatives:["Stripe","Square","Adyen"]},
  {id:"paddle",name:"Paddle",category:"Payments",patterns:["cdn.paddle.com"],globalVar:["Paddle"],description:"Revenue delivery platform for SaaS companies",alternatives:["Stripe","Chargebee","Recurly"]},
  {id:"klarna",name:"Klarna",category:"Payments",patterns:["x.klarnacdn.net"],globalVar:["Klarna"],description:"Buy now, pay later payment solution",alternatives:["Afterpay","Affirm","Sezzle"]},
  {id:"afterpay",name:"Afterpay",category:"Payments",patterns:["js.afterpay.com"],globalVar:[],description:"Buy now, pay later for online shopping",alternatives:["Klarna","Affirm","Sezzle"]},
  {id:"square",name:"Square",category:"Payments",patterns:["squareup.com","squareupsandbox.com"],globalVar:["Square"],description:"Payment processing and point-of-sale platform",alternatives:["Stripe","PayPal","Braintree"]},
  {id:"recurly",name:"Recurly",category:"Payments",patterns:["js.recurly.com","recurly.com"],globalVar:["recurly"],description:"Subscription billing and management platform",alternatives:["Chargebee","Paddle","Stripe Billing"]},
  {id:"chargebee",name:"Chargebee",category:"Payments",patterns:["js.chargebee.com"],globalVar:["Chargebee"],description:"Revenue and subscription management platform",alternatives:["Recurly","Paddle","Stripe Billing"]},
  {id:"affirm",name:"Affirm",category:"Payments",patterns:["cdn1.affirm.com"],globalVar:["affirm"],description:"Buy now, pay later for larger purchases",alternatives:["Klarna","Afterpay","Sezzle"]},

  // --- CMS & BUILDERS ---
  {id:"wordpress",name:"WordPress",category:"CMS",free:true,patterns:["wp-content","wp-includes"],globalVar:["wp","wpApiSettings"],description:"Open-source CMS powering 40%+ of the web",alternatives:["Ghost","Drupal","Webflow"]},
  {id:"ghost",name:"Ghost",category:"CMS",free:true,patterns:["ghost.org","ghost-sdk"],globalVar:["Ghost"],description:"Headless CMS and publishing platform",alternatives:["WordPress","Contentful","Strapi"]},
  {id:"drupal",name:"Drupal",category:"CMS",free:true,patterns:["drupal.js"],globalVar:["Drupal"],description:"Open-source enterprise CMS and framework",alternatives:["WordPress","Joomla","Sitecore"]},
  {id:"joomla",name:"Joomla",category:"CMS",patterns:["/media/jui/js"],globalVar:["Joomla"],description:"Open-source CMS and web application framework",alternatives:["WordPress","Drupal","TYPO3"]},
  {id:"wix",name:"Wix",category:"Builder",free:true,patterns:["wix.com","wix-code"],globalVar:["wixBiSession"],description:"Drag-and-drop website builder platform",alternatives:["Squarespace","Webflow","Framer"]},
  {id:"squarespace",name:"Squarespace",category:"Builder",free:true,patterns:["squarespace.com","static.squarespace"],globalVar:[],description:"All-in-one website building and hosting platform",alternatives:["Wix","Webflow","WordPress"]},
  {id:"webflow",name:"Webflow",category:"Builder",free:true,patterns:["webflow.com","webflow.js"],globalVar:["Webflow"],description:"Visual web design tool with CMS and hosting",alternatives:["Framer","Wix","WordPress"]},
  {id:"framer",name:"Framer",category:"Builder",patterns:["framer.com","framerusercontent"],globalVar:[],description:"Interactive design tool and website builder",alternatives:["Webflow","Wix","Squarespace"]},
  {id:"bubble",name:"Bubble",category:"No-Code",patterns:["bubble.io"],globalVar:["bubble"],description:"No-code platform for building web apps",alternatives:["Webflow","Adalo","Glide"]},
  {id:"unbounce",name:"Unbounce",category:"Builder",patterns:["unbounce.com"],globalVar:["ub_entry_popup"],description:"Landing page builder and conversion optimizer",alternatives:["Instapage","Leadpages","Landingi"]},

  // --- FRAMEWORKS ---
  {id:"react",name:"React",category:"Framework",free:true,patterns:["react.production.min.js","react-dom"],globalVar:["React","__REACT_DEVTOOLS_GLOBAL_HOOK__"],description:"UI library for building component-based interfaces",alternatives:["Vue.js","Angular","Svelte"]},
  {id:"vue",name:"Vue.js",category:"Framework",free:true,patterns:["vue.js","vue.min.js"],globalVar:["Vue"],description:"Progressive JavaScript UI framework",alternatives:["React","Angular","Svelte"]},
  {id:"angular",name:"Angular",category:"Framework",free:true,patterns:["angular.js","angular.min.js"],globalVar:["ng","getAllAngularRootElements"],description:"TypeScript-based web framework by Google",alternatives:["React","Vue.js","Svelte"]},
  {id:"nextjs",name:"Next.js",category:"Framework",free:true,patterns:["/_next/static"],globalVar:["__NEXT_DATA__","next"],description:"React framework for production web apps",alternatives:["Nuxt.js","Gatsby","Remix"]},
  {id:"nuxt",name:"Nuxt.js",category:"Framework",patterns:["/_nuxt/"],globalVar:["__NUXT__"],description:"Vue.js framework for server-side rendering",alternatives:["Next.js","SvelteKit","Gatsby"]},
  {id:"svelte",name:"Svelte",category:"Framework",patterns:["svelte-internal"],globalVar:[],description:"Compiler-based JavaScript UI framework",alternatives:["React","Vue.js","SolidJS"]},
  {id:"ember",name:"Ember.js",category:"Framework",patterns:["ember.js","ember.min.js"],globalVar:["Ember"],description:"Opinionated JavaScript framework for ambitious apps",alternatives:["React","Angular","Vue.js"]},

  // --- LIBRARIES ---
  {id:"jquery",name:"jQuery",category:"Library",free:true,patterns:["jquery.com","jquery.min.js"],globalVar:["jQuery"],description:"JavaScript library for DOM manipulation",alternatives:["Alpine.js","Vanilla JS","Stimulus"]},
  {id:"alpine",name:"Alpine.js",category:"Library",patterns:["alpine.js","cdn.jsdelivr.net/gh/alpinejs"],globalVar:["Alpine"],description:"Lightweight JavaScript behavior library",alternatives:["jQuery","Stimulus","htmx"]},
  {id:"htmx",name:"htmx",category:"Library",patterns:["htmx.org","unpkg.com/htmx.org"],globalVar:["htmx"],description:"High power tools for HTML — AJAX without JavaScript",alternatives:["jQuery","Alpine.js","Stimulus"]},
  {id:"gsap",name:"GSAP",category:"Library",patterns:["gsap.com","cdnjs.cloudflare.com/ajax/libs/gsap"],globalVar:["gsap","TweenMax"],description:"Professional JavaScript animation library",alternatives:["Anime.js","Motion One","Framer Motion"]},
  {id:"threejs",name:"Three.js",category:"Library",patterns:["three.js","three.min.js","threejs.org"],globalVar:["THREE"],description:"3D graphics library for web browsers",alternatives:["Babylon.js","A-Frame","PlayCanvas"]},

  // --- CSS ---
  {id:"tailwind",name:"Tailwind CSS",category:"CSS",free:true,patterns:["tailwindcss.com","cdn.tailwindcss.com"],globalVar:[],description:"Utility-first CSS framework for rapid UI development",alternatives:["Bootstrap","Bulma","Foundation"]},
  {id:"bootstrap",name:"Bootstrap",category:"CSS",free:true,patterns:["bootstrap.min.js","stackpath.bootstrapcdn.com/bootstrap"],globalVar:["bootstrap"],description:"Popular CSS framework for responsive web design",alternatives:["Tailwind CSS","Foundation","Bulma"]},

  // --- HOSTING & INFRASTRUCTURE ---
  {id:"cloudflare",name:"Cloudflare",category:"CDN",patterns:["cdnjs.cloudflare.com","cloudflare-static"],globalVar:[],description:"CDN, DDoS protection, and edge computing platform",alternatives:["Fastly","Akamai","AWS CloudFront"]},
  {id:"fastly",name:"Fastly",category:"CDN",patterns:["fastly.net"],globalVar:[],description:"Edge cloud platform and content delivery network",alternatives:["Cloudflare","Akamai","AWS CloudFront"]},
  {id:"akamai",name:"Akamai",category:"CDN",patterns:["akamaihd.net"],globalVar:[],description:"Enterprise CDN and web security platform",alternatives:["Cloudflare","Fastly","AWS CloudFront"]},
  {id:"googleapis",name:"Google Hosted Libraries",category:"CDN",patterns:["ajax.googleapis.com"],globalVar:[],description:"Google's CDN for open-source JavaScript libraries",alternatives:["jsDelivr","unpkg","cdnjs"]},
  {id:"aws_s3",name:"Amazon S3",category:"Storage",patterns:["s3.amazonaws.com"],globalVar:["AWS"],description:"Cloud object storage by Amazon Web Services",alternatives:["Google Cloud Storage","Azure Blob","Cloudflare R2"]},
  {id:"netlify",name:"Netlify",category:"Hosting",patterns:["netlify.app"],globalVar:[],description:"Frontend cloud hosting and deployment platform",alternatives:["Vercel","Cloudflare Pages","GitHub Pages"]},
  {id:"vercel",name:"Vercel",category:"Hosting",patterns:["vercel-analytics"],globalVar:[],description:"Frontend deployment and edge network platform",alternatives:["Netlify","Cloudflare Pages","Render"]},
  {id:"heroku",name:"Heroku",category:"Hosting",patterns:["herokuapp.com"],globalVar:[],description:"Cloud platform for app deployment and scaling",alternatives:["Railway","Render","Fly.io"]},
  {id:"firebase",name:"Firebase",category:"Hosting",patterns:["www.gstatic.com/firebasejs","firebase.google.com"],globalVar:["firebase"],description:"Google's app development and hosting platform",alternatives:["Supabase","AWS Amplify","Appwrite"]},
  {id:"supabase",name:"Supabase",category:"Hosting",patterns:["supabase.co","supabase.io"],globalVar:[],description:"Open-source Firebase alternative with PostgreSQL",alternatives:["Firebase","PlanetScale","Neon"]},
  {id:"cloudinary",name:"Cloudinary",category:"Storage",patterns:["res.cloudinary.com","cloudinary.com"],globalVar:["cloudinary"],description:"Cloud-based image and video management platform",alternatives:["Imgix","Uploadcare","Bunny CDN"]},

  // --- SECURITY & COMPLIANCE ---
  {id:"recaptcha",name:"Google reCAPTCHA",category:"Security",free:true,patterns:["www.google.com/recaptcha"],globalVar:["grecaptcha"],description:"Bot detection and CAPTCHA verification service",alternatives:["hCaptcha","Cloudflare Turnstile","FriendlyCaptcha"]},
  {id:"hcaptcha",name:"hCaptcha",category:"Security",patterns:["hcaptcha.com"],globalVar:["hcaptcha"],description:"Privacy-focused CAPTCHA alternative",alternatives:["Google reCAPTCHA","Cloudflare Turnstile","FriendlyCaptcha"]},
  {id:"cookiebot",name:"Cookiebot",category:"Compliance",patterns:["cookiebot.com"],globalVar:["Cookiebot"],description:"Cookie consent and GDPR compliance management",alternatives:["OneTrust","Termly","Osano"]},
  {id:"onetrust",name:"OneTrust",category:"Compliance",patterns:["cdn.cookielaw.org"],globalVar:["OneTrust","OptanonWrapper"],description:"Enterprise privacy and compliance management platform",alternatives:["Cookiebot","TrustArc","Osano"]},
  {id:"termly",name:"Termly",category:"Compliance",patterns:["termly.io"],globalVar:[],description:"Privacy policy and cookie consent generator",alternatives:["Cookiebot","OneTrust","Osano"]},

  // --- FONTS & ICONS ---
  {id:"fontawesome",name:"Font Awesome",category:"Icons",free:true,patterns:["fontawesome.com","kit.fontawesome.com"],globalVar:["FontAwesome","__fa$"],description:"Icon library with 7,000+ free and pro icons",alternatives:["Lucide","Heroicons","Phosphor Icons"]},
  {id:"google_fonts",name:"Google Fonts",category:"Fonts",free:true,patterns:["fonts.googleapis.com"],globalVar:[],description:"Free web font hosting service by Google",alternatives:["Adobe Fonts","Bunny Fonts","System fonts"]},
  {id:"typekit",name:"Adobe Fonts",category:"Fonts",patterns:["use.typekit.net"],globalVar:["Typekit"],description:"Professional web font hosting by Adobe",alternatives:["Google Fonts","Fonts.com","Fontspring"]},

  // --- COMMENTS ---
  {id:"disqus",name:"Disqus",category:"Comments",patterns:["disqus.com/embed.js"],globalVar:["DISQUS","disqus_config"],description:"Comment and community engagement platform",alternatives:["Commento","Hyvor Talk","Giscus"]},

  // --- SCHEDULING ---
  {id:"calendly",name:"Calendly",category:"Scheduling",free:true,patterns:["assets.calendly.com","calendly.com/assets"],globalVar:["Calendly"],description:"Online scheduling and appointment booking platform",alternatives:["Cal.com","Acuity Scheduling","Chili Piper"]},
  {id:"calcom",name:"Cal.com",category:"Scheduling",patterns:["cal.com/embed"],globalVar:[],description:"Open-source scheduling infrastructure platform",alternatives:["Calendly","Acuity Scheduling","SavvyCal"]},
  {id:"acuity",name:"Acuity Scheduling",category:"Scheduling",patterns:["acuityscheduling.com"],globalVar:[],description:"Online appointment scheduling software by Squarespace",alternatives:["Calendly","Cal.com","Setmore"]},
  {id:"chilipiper",name:"Chili Piper",category:"Scheduling",patterns:["chilipiper.com"],globalVar:["ChiliPiper"],description:"Revenue scheduling and demand conversion platform",alternatives:["Calendly","HubSpot Meetings","RevenueHero"]},

  // --- VIDEO ---
  {id:"youtube",name:"YouTube",category:"Video",free:true,patterns:["youtube.com/embed","ytimg.com","youtube-nocookie.com"],globalVar:["YT"],description:"Google's video hosting and streaming platform",alternatives:["Vimeo","Wistia","Dailymotion"]},
  {id:"vimeo",name:"Vimeo",category:"Video",patterns:["player.vimeo.com","vimeocdn.com"],globalVar:[],description:"High-quality video hosting platform",alternatives:["Wistia","YouTube","Brightcove"]},
  {id:"wistia",name:"Wistia",category:"Video",patterns:["fast.wistia.com","embedwistia"],globalVar:["wistiaEmbed","_wistia_"],description:"Professional video hosting for businesses and marketers",alternatives:["Vimeo","Vidyard","Loom"]},
  {id:"loom",name:"Loom",category:"Video",patterns:["cdn.loom.com","loom.com/embed"],globalVar:[],description:"Async video messaging for teams",alternatives:["Wistia","Vimeo","Vidyard"]},
  {id:"mux",name:"Mux",category:"Video",patterns:["mux.com/mux.js","cdn.mux.com"],globalVar:["mux"],description:"Video infrastructure API for developers",alternatives:["Cloudinary","Cloudflare Stream","Fastly"]},

  // --- FORMS ---
  {id:"typeform",name:"Typeform",category:"Forms",free:true,patterns:["typeform.com/to","embed.typeform.com"],globalVar:[],description:"Conversational form and survey builder",alternatives:["Jotform","Tally","SurveyMonkey"]},
  {id:"jotform",name:"Jotform",category:"Forms",patterns:["jotform.com","jotform-form"],globalVar:[],description:"Online form builder with 10,000+ templates",alternatives:["Typeform","Google Forms","Gravity Forms"]},
  {id:"tally",name:"Tally",category:"Forms",patterns:["tally.so/widgets","tally.so/r"],globalVar:[],description:"Free form builder for any use case",alternatives:["Typeform","Jotform","Google Forms"]},
  {id:"surveymonkey",name:"SurveyMonkey",category:"Forms",patterns:["surveymonkey.com/r","smsurvey.io"],globalVar:["SMCX"],description:"Online survey and market research platform",alternatives:["Typeform","Jotform","Qualtrics"]},
  {id:"gravity_forms",name:"Gravity Forms",category:"Forms",patterns:["gform_wrapper","gravityforms"],globalVar:["gform"],description:"Advanced WordPress form plugin",alternatives:["WPForms","Ninja Forms","Typeform"]},

  // --- A/B TESTING ---
  {id:"optimizely",name:"Optimizely",category:"A/B Testing",patterns:["cdn.optimizely.com","optimizely.com/js"],globalVar:["optimizely"],description:"Enterprise digital experimentation platform",alternatives:["VWO","AB Tasty","LaunchDarkly"]},
  {id:"vwo",name:"VWO",category:"A/B Testing",patterns:["dev.visualwebsiteoptimizer.com","vwo.com"],globalVar:["VWO","_vwo_"],description:"A/B testing and conversion optimization platform",alternatives:["Optimizely","AB Tasty","Google Optimize"]},
  {id:"abtasty",name:"AB Tasty",category:"A/B Testing",patterns:["try.abtasty.com"],globalVar:["ABTasty"],description:"A/B testing and personalization platform",alternatives:["Optimizely","VWO","Kameleoon"]},
  {id:"launchdarkly",name:"LaunchDarkly",category:"A/B Testing",patterns:["app.launchdarkly.com","unpkg.com/launchdarkly"],globalVar:["LDClient"],description:"Feature flags and experiment management platform",alternatives:["Split.io","Unleash","Flagsmith"]},

  // --- AUTOMATION ---
  {id:"zapier",name:"Zapier",category:"Automation",patterns:["zapier.com/apps","cdn.zapier.com"],globalVar:[],description:"No-code automation connecting 6,000+ apps",alternatives:["Make","n8n","Workato"]},
  {id:"make",name:"Make",category:"Automation",patterns:["integromat.com","make.com/embed"],globalVar:[],description:"Visual automation platform (formerly Integromat)",alternatives:["Zapier","n8n","Workato"]},

  // --- MAPS ---
  {id:"googlemaps",name:"Google Maps",category:"Maps",free:true,patterns:["maps.googleapis.com","maps.google.com/maps/api"],globalVar:[],description:"Web mapping service and location API by Google",alternatives:["Mapbox","HERE Maps","OpenStreetMap"]},
  {id:"mapbox",name:"Mapbox",category:"Maps",patterns:["api.mapbox.com","mapbox-gl"],globalVar:["mapboxgl"],description:"Custom maps and location data platform",alternatives:["Google Maps","HERE Maps","Leaflet"]},
  {id:"leaflet",name:"Leaflet",category:"Maps",patterns:["leaflet.js","leafletjs.com"],globalVar:[],description:"Open-source interactive maps JavaScript library",alternatives:["Mapbox GL","OpenLayers","Google Maps"]},

  // --- REVIEWS ---
  {id:"trustpilot",name:"Trustpilot",category:"Reviews",patterns:["widget.trustpilot.com"],globalVar:[],description:"Online customer review and rating platform",alternatives:["G2","Capterra","Yotpo"]},
  {id:"stamped",name:"Stamped.io",category:"Reviews",patterns:["cdn.stamped.io","stamped.io"],globalVar:["StampedFn"],description:"Product reviews and loyalty program platform",alternatives:["Yotpo","Okendo","Junip"]},

  // --- REFERRAL ---
  {id:"rewardful",name:"Rewardful",category:"Referral",patterns:["r.wurl.io","rewardful.com"],globalVar:["Rewardful"],description:"Affiliate and referral tracking for SaaS companies",alternatives:["FirstPromoter","Tapfiliate","PartnerStack"]},
  {id:"viralloops",name:"Viral Loops",category:"Referral",patterns:["app.viral-loops.com","viral-loops.com"],globalVar:[],description:"Viral and referral marketing campaign platform",alternatives:["ReferralHero","Friendbuy","Refersion"]},

  // --- SALES INTELLIGENCE ---
  {id:"clearbit",name:"Clearbit",category:"Sales Intelligence",patterns:["x.clearbitjs.com","clearbit.com/v1"],globalVar:["clearbit"],description:"B2B data enrichment and company intelligence API",alternatives:["ZoomInfo","Apollo","Lusha"]},
  {id:"apollo",name:"Apollo.io",category:"Sales Intelligence",patterns:["apollo.io/js","assets.apollo.io"],globalVar:[],description:"Sales intelligence and engagement platform",alternatives:["ZoomInfo","Clearbit","Lusha"]},

  // --- CUSTOMER SUCCESS ---
  {id:"pendo",name:"Pendo",category:"Customer Success",patterns:["cdn.pendo.io","pendo.io"],globalVar:["pendo"],description:"Product analytics, in-app guidance, and NPS platform",alternatives:["Gainsight PX","Appcues","Intercom"]},
  {id:"appcues",name:"Appcues",category:"Customer Success",patterns:["fast.appcues.com"],globalVar:["Appcues"],description:"User onboarding and product adoption platform",alternatives:["Pendo","WalkMe","Userflow"]},
  {id:"walkme",name:"WalkMe",category:"Customer Success",patterns:["cdn.walkme.com"],globalVar:["WalkMeAPI"],description:"Digital adoption platform and user guidance system",alternatives:["Pendo","Appcues","Userflow"]},

  // --- SEARCH ---
  {id:"algolia",name:"Algolia",category:"Search",patterns:["algolianet.com","algolia.net"],globalVar:["instantsearch","algoliasearch"],description:"Search and discovery API platform",alternatives:["Elasticsearch","Typesense","MeiliSearch"]},

  // --- COMMUNICATIONS ---
  {id:"twilio",name:"Twilio",category:"Communications",patterns:["twilio.com/js","media.twiliocdn.com"],globalVar:[],description:"Cloud APIs for SMS, voice, video, and email",alternatives:["Vonage","MessageBird","Bandwidth"]},

  // --- COURSES ---
  {id:"teachable",name:"Teachable",category:"Courses",patterns:["teachable.com","tc-cdn.com"],globalVar:[],description:"Online course creation and selling platform",alternatives:["Thinkific","Kajabi","Podia"]},
  {id:"thinkific",name:"Thinkific",category:"Courses",patterns:["thinkific.com"],globalVar:[],description:"Online course and learning management platform",alternatives:["Teachable","Kajabi","Podia"]},
  {id:"kajabi",name:"Kajabi",category:"Courses",patterns:["kajabi.com","kajabi-cdn.com"],globalVar:[],description:"All-in-one online business and course platform",alternatives:["Teachable","Thinkific","Podia"]},

  // --- COMMUNITY ---
  {id:"circle",name:"Circle",category:"Community",patterns:["circle.so"],globalVar:[],description:"Community platform for creators and brands",alternatives:["Mighty Networks","Discourse","Discord"]},
  {id:"discourse",name:"Discourse",category:"Community",patterns:["discourse.com","discourse-ember"],globalVar:["Discourse"],description:"Open-source discussion forum and community platform",alternatives:["Circle","Mighty Networks","Flarum"]},

  // --- PROJECT MANAGEMENT & PRODUCTIVITY ---
  {id:"monday",name:"Monday.com",category:"No-Code",patterns:["assets.monday.com","monday.com/js","monday.com/tracking"],globalVar:["monday"],description:"Visual work OS and project management platform",alternatives:["Asana","ClickUp","Notion"]},
  {id:"notion",name:"Notion",category:"CMS",patterns:["prism.notion.so","notion.so/api/v3","notionusercontent.com"],globalVar:[],description:"All-in-one workspace for notes, docs, and databases",alternatives:["Coda","Confluence","Airtable"]},
  {id:"airtable",name:"Airtable",category:"No-Code",patterns:["static.airtableusercontent.com","airtable.com/embed"],globalVar:[],description:"Spreadsheet-database hybrid for teams",alternatives:["Notion","Monday.com","Coda"]},

  // --- ADDITIONAL CRM ---
  {id:"pipedrive",name:"Pipedrive",category:"CRM",patterns:["leadbooster-chat.pipedrive.com","pipedrive.com/js/analytics"],globalVar:["LeadBooster"],description:"Sales-focused CRM for small and mid-size teams",alternatives:["HubSpot","Salesforce","Close CRM"]},

  // --- ADDITIONAL AUTOMATION ---
  {id:"n8n",name:"n8n",category:"Automation",patterns:["n8n.io/embed","n8n.cloud/webhook"],globalVar:[],description:"Open-source workflow automation platform",alternatives:["Zapier","Make","Workato"]},

  // --- ADDITIONAL COMMUNICATIONS ---
  {id:"slack",name:"Slack",category:"Communications",patterns:["slack.com/api/rtm","edge.slack.com","slack-msgs"],globalVar:[],description:"Business messaging and team collaboration platform",alternatives:["Microsoft Teams","Discord","Google Chat"]},
];

const DEFAULT_OPTIONS = {
  enabledCategories: {
    'CMS': true, 'E-Commerce': true, 'Builder': true, 'No-Code': true,
    'Analytics': true, 'Data Platform': true, 'Heatmap': true, 'Session Replay': true,
    'Observability': true, 'Error Tracking': true, 'Chat': true, 'CRM': true,
    'Marketing Auto': true, 'Email': true, 'Push Notifications': true, 'Support': true,
    'Ads': true, 'Native Ads': true, 'Retargeting': true, 'Framework': true,
    'Library': true, 'CSS': true, 'Payments': true, 'CDN': true,
    'Storage': true, 'Hosting': true, 'Security': true, 'Compliance': true,
    'Icons': true, 'Fonts': true, 'Comments': true, 'Scheduling': true,
    'Video': true, 'Forms': true, 'A/B Testing': true, 'Automation': true,
    'Maps': true, 'Reviews': true, 'Referral': true, 'Sales Intelligence': true,
    'Customer Success': true, 'Search': true, 'Communications': true,
    'Courses': true, 'Community': true,
  }
};

async function getEnabledCategories() {
  const { sd_options } = await chrome.storage.sync.get({ sd_options: DEFAULT_OPTIONS });
  return sd_options?.enabledCategories || DEFAULT_OPTIONS.enabledCategories;
}

async function isPro() {
  const { sd_license } = await chrome.storage.sync.get({ sd_license: null });
  if (!sd_license?.valid || !sd_license?.validated_at) return false;
  const TTL = 48 * 60 * 60 * 1000;
  const GRACE = 7 * 24 * 60 * 60 * 1000;
  return Date.now() < sd_license.validated_at + TTL + GRACE;
}

function checkGlobalVars(sigs) {
  return new Promise((resolve) => {
    const checks = sigs
      .filter(s => s.globalVar && s.globalVar.length > 0)
      .map(s => ({ id: s.id, vars: s.globalVar }));

    if (checks.length === 0) { resolve(new Set()); return; }

    // Use a per-scan nonce so pages cannot spoof results by pre-dispatching the event
    const nonce = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const eventName = `__sd_gv_${nonce}`;

    const timeout = setTimeout(() => resolve(new Set()), 1000);

    window.addEventListener(eventName, (e) => {
      clearTimeout(timeout);
      resolve(new Set(e.detail));
    }, { once: true });

    const script = document.createElement('script');
    script.textContent = `(function(){
      var checks = ${JSON.stringify(checks)};
      var found = checks.filter(function(c){
        return c.vars.some(function(v){ return typeof window[v] !== 'undefined'; });
      }).map(function(c){ return c.id; });
      window.dispatchEvent(new CustomEvent(${JSON.stringify(eventName)}, { detail: found }));
    })();`;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
  });
}

async function detectTools(enabledCategories) {
  const html = (document.documentElement?.innerHTML || '').toLowerCase();
  const seen = new Set();
  const tools = [];

  // Pass 1: HTML pattern matching
  for (const sig of signatures) {
    if (!enabledCategories[sig.category]) continue;
    if (sig.patterns.some(p => html.includes(p.toLowerCase()))) {
      seen.add(sig.id);
      tools.push({ id: sig.id, name: sig.name, category: sig.category, free: !!sig.free, description: sig.description, alternatives: sig.alternatives });
    }
  }

  // Pass 2: globalVar checking (catches JS-heavy SPAs)
  const candidates = signatures.filter(s => !seen.has(s.id) && enabledCategories[s.category]);
  const globalMatches = await checkGlobalVars(candidates);
  for (const sig of signatures) {
    if (globalMatches.has(sig.id) && !seen.has(sig.id)) {
      seen.add(sig.id);
      tools.push({ id: sig.id, name: sig.name, category: sig.category, free: !!sig.free, description: sig.description, alternatives: sig.alternatives });
    }
  }

  return tools;
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action !== 'SCAN_PAGE') return false;

  Promise.all([getEnabledCategories(), isPro()])
    .then(([enabledCategories, pro]) => detectTools(enabledCategories).then(allTools => {
      const free = allTools.filter(t => t.free);
      const locked = allTools.filter(t => !t.free);
      sendResponse(pro
        ? { tools: allTools, locked: 0 }
        : { tools: free, locked: locked.length }
      );
    }))
    .catch(() => sendResponse({ tools: [], locked: 0, error: 'scan_failed' }));

  return true;
});

})();
