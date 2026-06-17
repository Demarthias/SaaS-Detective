export interface SaasSignature {
  id: string;
  name: string;
  category: string;
  patterns: string[];
  globalVar?: string[];
}

export const signatures: SaasSignature[] = [

  // --- ANALYTICS ---
  { id: 'ga', name: 'Google Analytics', category: 'Analytics', patterns: ['google-analytics.com/analytics.js', 'gtag/js?id=g-', 'ga.js'], globalVar: ['ga', 'GoogleAnalyticsObject', 'gtag'] },
  { id: 'gtm', name: 'Google Tag Manager', category: 'Analytics', patterns: ['googletagmanager.com/gtm.js'], globalVar: ['google_tag_manager'] },
  { id: 'mixpanel', name: 'Mixpanel', category: 'Analytics', patterns: ['cdn.mxpnl.com', 'cdn4.mxpnl.com'], globalVar: ['mixpanel'] },
  { id: 'amplitude', name: 'Amplitude', category: 'Analytics', patterns: ['cdn.amplitude.com', 'api2.amplitude.com'], globalVar: ['amplitude'] },
  { id: 'heap', name: 'Heap Analytics', category: 'Analytics', patterns: ['cdn.heapanalytics.com'], globalVar: ['heap', 'heapReadyCb'] },
  { id: 'posthog', name: 'PostHog', category: 'Analytics', patterns: ['app.posthog.com', 'eu.i.posthog.com', 'us.i.posthog.com'], globalVar: ['posthog'] },
  { id: 'plausible', name: 'Plausible', category: 'Analytics', patterns: ['plausible.io/js/'], globalVar: ['plausible'] },
  { id: 'fathom', name: 'Fathom Analytics', category: 'Analytics', patterns: ['cdn.usefathom.com'], globalVar: ['fathom'] },
  { id: 'matomo', name: 'Matomo', category: 'Analytics', patterns: ['matomo.js', 'piwik.js'], globalVar: ['_paq', 'Piwik'] },
  { id: 'woopra', name: 'Woopra', category: 'Analytics', patterns: ['static.woopra.com'], globalVar: ['woopra'] },
  { id: 'luckyorange', name: 'Lucky Orange', category: 'Analytics', patterns: ['luckyorange.com'], globalVar: ['_loq'] },

  // --- DATA PLATFORM ---
  { id: 'segment', name: 'Segment', category: 'Data Platform', patterns: ['cdn.segment.com', 'cdn.segment.io'], globalVar: ['analytics'] },

  // --- HEATMAP ---
  { id: 'hotjar', name: 'Hotjar', category: 'Heatmap', patterns: ['static.hotjar.com', 'script.hotjar.com'], globalVar: ['hj', '_hjSettings'] },
  { id: 'clarity', name: 'Microsoft Clarity', category: 'Heatmap', patterns: ['clarity.ms'], globalVar: ['clarity'] },
  { id: 'crazyegg', name: 'Crazy Egg', category: 'Heatmap', patterns: ['script.crazyegg.com', 'dnn506yrbagrg.cloudfront.net'], globalVar: ['CE2', 'CE_API'] },
  { id: 'mouseflow', name: 'Mouseflow', category: 'Heatmap', patterns: ['cdn.mouseflow.com'], globalVar: ['_mfq'] },

  // --- SESSION REPLAY ---
  { id: 'fullstory', name: 'FullStory', category: 'Session Replay', patterns: ['fullstory.com/s/fs.js', 'edge.fullstory.com'], globalVar: ['FS', '_fs_namespace'] },
  { id: 'logrocket', name: 'LogRocket', category: 'Session Replay', patterns: ['cdn.logrocket.io', 'cdn.lr-ingest.com'], globalVar: ['LogRocket'] },
  { id: 'smartlook', name: 'Smartlook', category: 'Session Replay', patterns: ['web-sdk.smartlook.com', 'rec.smartlook.com'], globalVar: ['smartlook'] },

  // --- OBSERVABILITY ---
  { id: 'datadog', name: 'Datadog', category: 'Observability', patterns: ['browser-agent.datadoghq-browser-agent.com', 'datadoghq.com/browser-agent'], globalVar: ['DD_RUM', 'DD_LOGS'] },
  { id: 'newrelic', name: 'New Relic', category: 'Observability', patterns: ['js-agent.newrelic.com', 'bam.nr-data.net'], globalVar: ['NREUM', 'newrelic'] },

  // --- ERROR TRACKING ---
  { id: 'sentry', name: 'Sentry', category: 'Error Tracking', patterns: ['browser.sentry-cdn.com', 'js.sentry-cdn.com'], globalVar: ['Sentry', '__SENTRY__'] },
  { id: 'bugsnag', name: 'Bugsnag', category: 'Error Tracking', patterns: ['d2wy8f7a9ursnm.cloudfront.net', 'bugsnag.com/bugsnag.min.js'], globalVar: ['Bugsnag'] },
  { id: 'rollbar', name: 'Rollbar', category: 'Error Tracking', patterns: ['cdn.rollbar.com', 'cdnjs.cloudflare.com/ajax/libs/rollbar.js'], globalVar: ['Rollbar'] },

  // --- ADS ---
  { id: 'fb_pixel', name: 'Meta Pixel', category: 'Ads', patterns: ['connect.facebook.net/en_us/fbevents.js', 'connect.facebook.net'], globalVar: ['fbq'] },
  { id: 'google_ads', name: 'Google Ads', category: 'Ads', patterns: ['googleadservices.com', 'googlesyndication.com/pagead'], globalVar: ['google_conversion_id', 'gtag'] },
  { id: 'tiktok', name: 'TikTok Pixel', category: 'Ads', patterns: ['analytics.tiktok.com'], globalVar: ['ttq', 'TiktokAnalyticsObject'] },
  { id: 'twitter_ads', name: 'X (Twitter) Pixel', category: 'Ads', patterns: ['static.ads-twitter.com'], globalVar: ['twq'] },
  { id: 'linkedin', name: 'LinkedIn Insight', category: 'Ads', patterns: ['snap.licdn.com'], globalVar: ['_linkedin_data_partner_ids'] },
  { id: 'pinterest', name: 'Pinterest Tag', category: 'Ads', patterns: ['s.pinimg.com'], globalVar: ['pintrk'] },
  { id: 'snapchat', name: 'Snapchat Pixel', category: 'Ads', patterns: ['sc-static.net/scevent.min.js'], globalVar: ['snaptr'] },
  { id: 'microsoft_ads', name: 'Microsoft Ads', category: 'Ads', patterns: ['bat.bing.com'], globalVar: ['uetq'] },

  // --- NATIVE ADS ---
  { id: 'taboola', name: 'Taboola', category: 'Native Ads', patterns: ['cdn.taboola.com'], globalVar: ['_taboola'] },
  { id: 'outbrain', name: 'Outbrain', category: 'Native Ads', patterns: ['widgets.outbrain.com'], globalVar: ['OBR'] },

  // --- RETARGETING ---
  { id: 'adroll', name: 'AdRoll', category: 'Retargeting', patterns: ['s.adroll.com', 'd.adroll.com'], globalVar: ['__adroll', 'adroll_adv_id'] },
  { id: 'criteo', name: 'Criteo', category: 'Retargeting', patterns: ['static.criteo.net', 'rtax.criteo.com'], globalVar: ['criteo_q'] },

  // --- CRM ---
  { id: 'hubspot', name: 'HubSpot', category: 'CRM', patterns: ['js.hs-scripts.com', 'js.hsforms.net', 'js.hscta.net'], globalVar: ['_hsq', 'hbspt'] },
  { id: 'salesforce', name: 'Salesforce', category: 'CRM', patterns: ['salesforceliveagent.com', 'force.com/embeddedservice', 'salesforce-experience.com'], globalVar: ['SFIDWidget', '_lc2'] },
  { id: 'pipedrive', name: 'Pipedrive', category: 'CRM', patterns: ['leadbooster-chat.pipedrive.com', 'pipedriveassets.com'], globalVar: ['LeadBooster'] },
  { id: 'closecrm', name: 'Close CRM', category: 'CRM', patterns: ['close.com/embed', 'closeio.com'], globalVar: [] },
  { id: 'zoho_crm', name: 'Zoho CRM', category: 'CRM', patterns: ['salesiq.zoho.com', 'salesiq.zoho.eu'], globalVar: ['$zoho'] },
  { id: 'monday', name: 'Monday.com', category: 'CRM', patterns: ['monday.com', 'dapulse.com'], globalVar: ['monday'] },

  // --- MARKETING AUTO ---
  { id: 'marketo', name: 'Marketo', category: 'Marketing Auto', patterns: ['munchkin.marketo.net'], globalVar: ['Munchkin'] },
  { id: 'pardot', name: 'Pardot', category: 'Marketing Auto', patterns: ['pi.pardot.com', 'cdn.pardot.com'], globalVar: ['piAId', 'piCId'] },
  { id: 'braze', name: 'Braze', category: 'Marketing Auto', patterns: ['js.appboycdn.com', 'sdk.iad-01.braze.com', 'braze.com/js/sdk'], globalVar: ['appboy', 'braze'] },
  { id: 'keap', name: 'Keap', category: 'Marketing Auto', patterns: ['keap.com/api/form', 'infusionsoft.com/app/orderForms'], globalVar: [] },

  // --- EMAIL ---
  { id: 'klaviyo', name: 'Klaviyo', category: 'Email', patterns: ['static.klaviyo.com', 'a.klaviyo.com'], globalVar: ['_learnq', 'klaviyo'] },
  { id: 'mailchimp', name: 'Mailchimp', category: 'Email', patterns: ['chimpstatic.com', 'list-manage.com'], globalVar: ['_mcid'] },
  { id: 'activecampaign', name: 'ActiveCampaign', category: 'Email', patterns: ['trackcmp.net', 'activehosted.com'], globalVar: ['vgo'] },
  { id: 'convertkit', name: 'ConvertKit', category: 'Email', patterns: ['f.convertkit.com', 'convertkit.com'], globalVar: ['ck_subscriber_id'] },
  { id: 'drip', name: 'Drip', category: 'Email', patterns: ['tag.getdrip.com'], globalVar: ['_dcq', '_dcs'] },
  { id: 'omnisend', name: 'Omnisend', category: 'Email', patterns: ['omnisrc.com', 'omnisnippet1.com'], globalVar: ['omnisend'] },
  { id: 'brevo', name: 'Brevo', category: 'Email', patterns: ['sibautomation.com', 'sendinblue.com'], globalVar: ['sendinblue'] },
  { id: 'mailerlite', name: 'MailerLite', category: 'Email', patterns: ['static.mailerlite.com', 'assets.mailerlite.com'], globalVar: ['ml_account'] },
  { id: 'getresponse', name: 'GetResponse', category: 'Email', patterns: ['gr4.com/js/', 'gr-analytics.com'], globalVar: ['_gr4'] },
  { id: 'aweber', name: 'AWeber', category: 'Email', patterns: ['forms.aweber.com', 'assets.aweber.com', 'www.aweber.com/form/'], globalVar: ['AWeber', '_aw'] },
  { id: 'customerio', name: 'Customer.io', category: 'Email', patterns: ['assets.customer.io', 'cio-tracker.js'], globalVar: ['_cio'] },
  { id: 'constantcontact', name: 'Constant Contact', category: 'Email', patterns: ['static.ctctcdn.com', 'ctctcdn.com', 'r20.rs6.net', 'constantcontact.com/signup'], globalVar: ['CTCT', '_ctct'] },

  // --- PUSH NOTIFICATIONS ---
  { id: 'onesignal', name: 'OneSignal', category: 'Push Notifications', patterns: ['cdn.onesignal.com'], globalVar: ['OneSignal'] },
  { id: 'pushwoosh', name: 'Pushwoosh', category: 'Push Notifications', patterns: ['cdn.pushwoosh.com'], globalVar: ['Pushwoosh'] },
  { id: 'pushcrew', name: 'VWO PushCrew', category: 'Push Notifications', patterns: ['pushcrew.com'], globalVar: [] },

  // --- CHAT ---
  { id: 'intercom', name: 'Intercom', category: 'Chat', patterns: ['widget.intercom.io', 'js.intercomcdn.com'], globalVar: ['Intercom', 'intercomSettings'] },
  { id: 'drift', name: 'Drift', category: 'Chat', patterns: ['js.driftt.com', 'js.drift.com'], globalVar: ['drift', 'driftt'] },
  { id: 'crisp', name: 'Crisp', category: 'Chat', patterns: ['client.crisp.chat'], globalVar: ['$crisp', 'CRISP_WEBSITE_ID'] },
  { id: 'tawkto', name: 'Tawk.to', category: 'Chat', patterns: ['embed.tawk.to'], globalVar: ['Tawk_API', 'Tawk_LoadStart'] },
  { id: 'livechat', name: 'LiveChat', category: 'Chat', patterns: ['cdn.livechatinc.com'], globalVar: ['LC_API', '__lc'] },
  { id: 'tidio', name: 'Tidio', category: 'Chat', patterns: ['code.tidio.co'], globalVar: ['tidioChatApi'] },
  { id: 'freshchat', name: 'Freshchat', category: 'Chat', patterns: ['wchat.freshchat.com'], globalVar: ['fcWidget'] },
  { id: 'olark', name: 'Olark', category: 'Chat', patterns: ['static.olark.com'], globalVar: ['olark'] },
  { id: 'helpcrunch', name: 'HelpCrunch', category: 'Chat', patterns: ['widget.helpcrunch.com'], globalVar: ['HelpCrunch'] },

  // --- SUPPORT ---
  { id: 'zendesk', name: 'Zendesk', category: 'Support', patterns: ['static.zdassets.com', 'v2.zopim.com'], globalVar: ['zE', 'zEmbed'] },
  { id: 'freshdesk', name: 'Freshdesk', category: 'Support', patterns: ['freshdesk.com/widget', 'freshworks.com/live-chat-software'], globalVar: ['FreshworksWidget'] },
  { id: 'helpscout', name: 'Help Scout', category: 'Support', patterns: ['beacon-v2.helpscout.net'], globalVar: ['Beacon'] },
  { id: 'gorgias', name: 'Gorgias', category: 'Support', patterns: ['config.gorgias.chat', 'gorgias.chat'], globalVar: ['GorgiasChat'] },
  { id: 'kayako', name: 'Kayako', category: 'Support', patterns: ['kayako.com/messenger', 'kayako.net/'], globalVar: [] },

  // --- E-COMMERCE ---
  { id: 'shopify', name: 'Shopify', category: 'E-Commerce', patterns: ['cdn.shopify.com', 'shopify.com/s/files'], globalVar: ['Shopify'] },
  { id: 'woocommerce', name: 'WooCommerce', category: 'E-Commerce', patterns: ['woocommerce', 'wc-ajax='], globalVar: ['wc_add_to_cart_params', 'woocommerce_params'] },
  { id: 'bigcommerce', name: 'BigCommerce', category: 'E-Commerce', patterns: ['cdn11.bigcommerce.com'], globalVar: ['BCData', 'BigCommerce'] },
  { id: 'magento', name: 'Magento', category: 'E-Commerce', patterns: ['/static/version', 'mage/cookies.js'], globalVar: ['Mage'] },
  { id: 'prestashop', name: 'PrestaShop', category: 'E-Commerce', patterns: ['/themes/default-bootstrap/', '/modules/ps_'], globalVar: ['prestashop'] },
  { id: 'ecwid', name: 'Ecwid', category: 'E-Commerce', patterns: ['app.ecwid.com', 'ecwid.com/script.js'], globalVar: ['Ecwid'] },
  { id: 'opencart', name: 'OpenCart', category: 'E-Commerce', patterns: ['/catalog/view/javascript/', 'route=common/home'], globalVar: [] },

  // --- PAYMENTS ---
  { id: 'stripe', name: 'Stripe', category: 'Payments', patterns: ['js.stripe.com'], globalVar: ['Stripe'] },
  { id: 'paypal', name: 'PayPal', category: 'Payments', patterns: ['paypal.com/sdk/js', 'paypalobjects.com'], globalVar: ['paypal', 'PAYPAL'] },
  { id: 'braintree', name: 'Braintree', category: 'Payments', patterns: ['js.braintreegateway.com'], globalVar: ['braintree'] },
  { id: 'paddle', name: 'Paddle', category: 'Payments', patterns: ['cdn.paddle.com'], globalVar: ['Paddle'] },
  { id: 'klarna', name: 'Klarna', category: 'Payments', patterns: ['x.klarnacdn.net', 'js.klarna.com'], globalVar: ['Klarna'] },
  { id: 'square', name: 'Square', category: 'Payments', patterns: ['js.squareup.com', 'web.squarecdn.com'], globalVar: ['Square', 'SqPaymentForm'] },
  { id: 'afterpay', name: 'Afterpay', category: 'Payments', patterns: ['js.afterpay.com', 'portal.afterpay.com'], globalVar: [] },
  { id: 'lemonsqueezy', name: 'Lemon Squeezy', category: 'Payments', patterns: ['assets.lemonsqueezy.com', 'lemon.js'], globalVar: ['createLemonSqueezy'] },
  { id: 'gumroad', name: 'Gumroad', category: 'Payments', patterns: ['assets.gumroad.com', 'gumroad.com/js/gumroad'], globalVar: ['GumroadOverlay'] },
  { id: 'recharge', name: 'Recharge', category: 'Payments', patterns: ['rechargeapps.com', 'rechargepayments.com'], globalVar: ['ReCharge'] },

  // --- BUILDER ---
  { id: 'wix', name: 'Wix', category: 'Builder', patterns: ['static.wixstatic.com', 'wix.com'], globalVar: ['wixBiSession'] },
  { id: 'squarespace', name: 'Squarespace', category: 'Builder', patterns: ['static1.squarespace.com', 'squarespace.com'], globalVar: ['Squarespace'] },
  { id: 'webflow', name: 'Webflow', category: 'Builder', patterns: ['assets.website-files.com', 'webflow.com/js'], globalVar: ['Webflow'] },
  { id: 'framer', name: 'Framer', category: 'Builder', patterns: ['framerusercontent.com', 'framer.com/m'], globalVar: [] },
  { id: 'duda', name: 'Duda', category: 'Builder', patterns: ['irp-cdn.multiscreensite.com', 'dm-cdn.multiscreensite.com'], globalVar: ['dmAPI'] },

  { id: 'elementor', name: 'Elementor', category: 'Builder', patterns: ['elementor/js', 'elementor-frontend'], globalVar: ['elementorFrontend'] },
  // --- CMS ---
  { id: 'wordpress', name: 'WordPress', category: 'CMS', patterns: ['/wp-content/', '/wp-includes/', 'wp-json'], globalVar: ['wp', 'wpApiSettings'] },
  { id: 'ghost', name: 'Ghost', category: 'CMS', patterns: ['ghost.org', 'cdn.jsdelivr.net/ghost'], globalVar: ['Ghost'] },
  { id: 'drupal', name: 'Drupal', category: 'CMS', patterns: ['drupal.js', '/sites/default/files/'], globalVar: ['Drupal'] },
  { id: 'joomla', name: 'Joomla', category: 'CMS', patterns: ['/media/jui/js/', '/media/com_joomla/'], globalVar: [] },
  { id: 'contentful', name: 'Contentful', category: 'CMS', patterns: ['ctfassets.net', 'images.ctfassets.net'], globalVar: [] },
  { id: 'sanity', name: 'Sanity', category: 'CMS', patterns: ['cdn.sanity.io'], globalVar: [] },
  { id: 'prismic', name: 'Prismic', category: 'CMS', patterns: ['prismic.io', 'cdn.prismic.io'], globalVar: [] },
  { id: 'storyblok', name: 'Storyblok', category: 'CMS', patterns: ['a.storyblok.com', 'app.storyblok.com'], globalVar: [] },

  // --- NO-CODE ---
  { id: 'bubble', name: 'Bubble', category: 'No-Code', patterns: ['bubble.io', 'appsbubble.com'], globalVar: ['bubble'] },
  { id: 'carrd', name: 'Carrd', category: 'No-Code', patterns: ['cdn2.carrd.co', 'carrd.co'], globalVar: [] },
  { id: 'glide', name: 'Glide', category: 'No-Code', patterns: ['cdn.glideapps.com', 'glideapps.com'], globalVar: [] },
  { id: 'miro', name: 'Miro', category: 'No-Code', patterns: ['miro.com/app/embed', 'cdn.miro.com', 'miro.com/embed'], globalVar: ['miro'] },

  // --- FRAMEWORK ---
  { id: 'react', name: 'React', category: 'Framework', patterns: ['react.production.min.js', 'react-dom'], globalVar: ['React', '__REACT_DEVTOOLS_GLOBAL_HOOK__'] },
  { id: 'vue', name: 'Vue.js', category: 'Framework', patterns: ['vue.js', 'vue.min.js', 'vue@'], globalVar: ['Vue', '__vue_app__'] },
  { id: 'angular', name: 'Angular', category: 'Framework', patterns: ['angular.min.js', 'angular.js'], globalVar: ['angular', 'ng'] },
  { id: 'nextjs', name: 'Next.js', category: 'Framework', patterns: ['/_next/static'], globalVar: ['__NEXT_DATA__'] },
  { id: 'nuxt', name: 'Nuxt.js', category: 'Framework', patterns: ['/_nuxt/'], globalVar: ['__NUXT__'] },
  { id: 'svelte', name: 'Svelte', category: 'Framework', patterns: ['/_app/immutable/'], globalVar: [] },
  { id: 'remix', name: 'Remix', category: 'Framework', patterns: ['/__remix_manifest', 'remix-run'], globalVar: ['__remixContext', '__remixManifest'] },
  { id: 'astro', name: 'Astro', category: 'Framework', patterns: ['data-astro-cid', '/_astro/'], globalVar: [] },
  { id: 'gatsby', name: 'Gatsby', category: 'Framework', patterns: ['gatsby-focus-wrapper', 'gatsby-noscript', '/gatsby-browser-entry'], globalVar: ['__gatsby'] },

  // --- LIBRARY ---
  { id: 'jquery', name: 'jQuery', category: 'Library', patterns: ['jquery.min.js', 'jquery.com/jquery'], globalVar: ['jQuery'] },
  { id: 'alpine', name: 'Alpine.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/alpinejs', 'alpinejs.dev'], globalVar: ['Alpine'] },
  { id: 'lodash', name: 'Lodash', category: 'Library', patterns: ['lodash.min.js', 'lodash.js'], globalVar: ['_'] },

  // --- CSS ---
  { id: 'tailwind', name: 'Tailwind CSS', category: 'CSS', patterns: ['cdn.tailwindcss.com'], globalVar: [] },
  { id: 'bootstrap', name: 'Bootstrap', category: 'CSS', patterns: ['bootstrap.min.js', 'cdn.jsdelivr.net/npm/bootstrap', 'stackpath.bootstrapcdn.com'], globalVar: [] },
  { id: 'bulma', name: 'Bulma', category: 'CSS', patterns: ['bulma.io/css/bulma', 'bulma.min.css', 'cdn.jsdelivr.net/npm/bulma'], globalVar: [] },

  // --- CDN ---
  { id: 'cloudflare_cdn', name: 'Cloudflare CDN', category: 'CDN', patterns: ['cdnjs.cloudflare.com'], globalVar: [] },
  { id: 'jsdelivr', name: 'jsDelivr', category: 'CDN', patterns: ['cdn.jsdelivr.net'], globalVar: [] },
  { id: 'googleapis', name: 'Google Hosted Libs', category: 'CDN', patterns: ['ajax.googleapis.com'], globalVar: [] },
  { id: 'fastly', name: 'Fastly', category: 'CDN', patterns: ['fastly.net'], globalVar: [] },
  { id: 'akamai', name: 'Akamai', category: 'CDN', patterns: ['akamaihd.net', 'akamai.net'], globalVar: [] },
  { id: 'bunnycdn', name: 'BunnyCDN', category: 'CDN', patterns: ['b-cdn.net'], globalVar: [] },
  { id: 'cloudinary', name: 'Cloudinary', category: 'CDN', patterns: ['res.cloudinary.com'], globalVar: ['cloudinary'] },

  // --- HOSTING ---
  { id: 'netlify', name: 'Netlify', category: 'Hosting', patterns: ['netlify.app', 'netlify.com'], globalVar: [] },
  { id: 'vercel', name: 'Vercel', category: 'Hosting', patterns: ['vercel.app', '_vercel'], globalVar: [] },
  { id: 'heroku', name: 'Heroku', category: 'Hosting', patterns: ['herokuapp.com'], globalVar: [] },
  { id: 'digitalocean', name: 'DigitalOcean', category: 'Hosting', patterns: ['ondigitalocean.app'], globalVar: [] },
  { id: 'firebase', name: 'Firebase', category: 'Hosting', patterns: ['firebaseapp.com', 'firebase.googleapis.com'], globalVar: ['firebase', '__FIREBASE_DEFAULTS__'] },
  { id: 'render', name: 'Render', category: 'Hosting', patterns: ['onrender.com'], globalVar: [] },
  { id: 'aws_amplify', name: 'AWS Amplify', category: 'Hosting', patterns: ['amplifyapp.com', 'aws-amplify'], globalVar: ['aws_amplify', 'Amplify'] },
  { id: 'netart', name: 'netart', category: 'Hosting', patterns: ['netart.com/js', 'static.netart.com', 'netart.com/embed'], globalVar: [] },

  // --- STORAGE ---
  { id: 'aws_s3', name: 'Amazon S3', category: 'Storage', patterns: ['s3.amazonaws.com', 's3-website'], globalVar: [] },
  { id: 'imgix', name: 'Imgix', category: 'Storage', patterns: ['imgix.net'], globalVar: [] },

  // --- SECURITY ---
  { id: 'recaptcha', name: 'Google reCAPTCHA', category: 'Security', patterns: ['www.google.com/recaptcha', 'recaptcha/api.js'], globalVar: ['grecaptcha'] },
  { id: 'hcaptcha', name: 'hCaptcha', category: 'Security', patterns: ['hcaptcha.com'], globalVar: ['hcaptcha'] },
  { id: 'cf_turnstile', name: 'Cloudflare Turnstile', category: 'Security', patterns: ['challenges.cloudflare.com/turnstile'], globalVar: ['turnstile'] },
  { id: 'auth0', name: 'Auth0', category: 'Security', patterns: ['cdn.auth0.com', 'auth0.com/authorize'], globalVar: ['Auth0', 'auth0'] },
  { id: 'okta', name: 'Okta', category: 'Security', patterns: ['okta.com/login', 'okta.com/oauth2', 'cdn.okta.com'], globalVar: ['OktaSignIn'] },
  { id: 'clerk', name: 'Clerk', category: 'Security', patterns: ['clerk.browser.js', 'accounts.dev', 'clerk.dev'], globalVar: ['Clerk'] },
  { id: 'nordvpn', name: 'NordVPN', category: 'Security', patterns: ['nordvpn.com/js', 'cdn.nordvpn.com'], globalVar: [] },
  { id: 'nordpass', name: 'NordPass', category: 'Security', patterns: ['nordpass.com/js', 'cdn.nordpass.com', 'assets.nordpass.com'], globalVar: [] },

  // --- COMPLIANCE ---
  { id: 'cookiebot', name: 'Cookiebot', category: 'Compliance', patterns: ['consent.cookiebot.com', 'cookiebot.com'], globalVar: ['Cookiebot', 'CookieConsent'] },
  { id: 'onetrust', name: 'OneTrust', category: 'Compliance', patterns: ['cdn.cookielaw.org', 'optanon.blob.core.windows.net'], globalVar: ['OneTrust', 'OptanonWrapper'] },
  { id: 'termly', name: 'Termly', category: 'Compliance', patterns: ['app.termly.io'], globalVar: ['displayPreferenceModal'] },
  { id: 'osano', name: 'Osano', category: 'Compliance', patterns: ['cmp.osano.com'], globalVar: ['Osano'] },

  // --- ICONS ---
  { id: 'fontawesome', name: 'Font Awesome', category: 'Icons', patterns: ['kit.fontawesome.com', 'use.fontawesome.com', 'fontawesome.com/releases'], globalVar: [] },
  { id: 'material_icons', name: 'Material Icons', category: 'Icons', patterns: ['fonts.googleapis.com/icon', 'material-icons'], globalVar: [] },

  // --- FONTS ---
  { id: 'google_fonts', name: 'Google Fonts', category: 'Fonts', patterns: ['fonts.googleapis.com'], globalVar: [] },
  { id: 'typekit', name: 'Adobe Fonts', category: 'Fonts', patterns: ['use.typekit.net', 'p.typekit.net'], globalVar: [] },
  { id: 'bunny_fonts', name: 'Bunny Fonts', category: 'Fonts', patterns: ['fonts.bunny.net'], globalVar: [] },

  // --- COMMENTS ---
  { id: 'disqus', name: 'Disqus', category: 'Comments', patterns: ['disqus.com/embed.js', 'disquscdn.com'], globalVar: ['DISQUS', 'disqus_config'] },
  { id: 'hyvor', name: 'Hyvor Talk', category: 'Comments', patterns: ['hyvor.com/web-sdk/embed.js'], globalVar: [] },

  // --- SCHEDULING ---
  { id: 'calendly', name: 'Calendly', category: 'Scheduling', patterns: ['assets.calendly.com', 'calendly.com/assets'], globalVar: ['Calendly'] },
  { id: 'acuity', name: 'Acuity Scheduling', category: 'Scheduling', patterns: ['embed.acuityscheduling.com'], globalVar: [] },
  { id: 'chilipiper', name: 'Chili Piper', category: 'Scheduling', patterns: ['js.chilipiper.com'], globalVar: ['ChiliPiper'] },
  { id: 'cal_com', name: 'Cal.com', category: 'Scheduling', patterns: ['cal.com/embed', 'app.cal.com'], globalVar: ['Cal'] },

  // --- VIDEO ---
  { id: 'wistia', name: 'Wistia', category: 'Video', patterns: ['fast.wistia.com', 'fast.wistia.net'], globalVar: ['wistiaEmbed', 'Wistia'] },
  { id: 'vidyard', name: 'Vidyard', category: 'Video', patterns: ['play.vidyard.com', 'embed.vidyard.com'], globalVar: ['VidyardV4'] },
  { id: 'vimeo', name: 'Vimeo', category: 'Video', patterns: ['player.vimeo.com', 'f.vimeocdn.com'], globalVar: [] },
  { id: 'youtube', name: 'YouTube', category: 'Video', patterns: ['youtube.com/embed', 'youtube.com/iframe_api'], globalVar: ['YT'] },
  { id: 'loom', name: 'Loom', category: 'Video', patterns: ['loom.com/embed', 'cdn.loom.com'], globalVar: [] },

  // --- FORMS ---
  { id: 'typeform', name: 'Typeform', category: 'Forms', patterns: ['embed.typeform.com', 'typeform.com/to/'], globalVar: ['tf'] },
  { id: 'jotform', name: 'Jotform', category: 'Forms', patterns: ['form.jotform.com', 'js.jotform.com'], globalVar: [] },
  { id: 'surveymonkey', name: 'SurveyMonkey', category: 'Forms', patterns: ['surveymonkey.com', 'smcx.com'], globalVar: ['SMCX'] },
  { id: 'tally', name: 'Tally', category: 'Forms', patterns: ['tally.so/embed', 'tally.so/widgets'], globalVar: ['TallyConfig'] },
  { id: 'paperform', name: 'Paperform', category: 'Forms', patterns: ['paperform.co/embed', 'f.paperform.co'], globalVar: [] },

  // --- A/B TESTING ---
  { id: 'optimizely', name: 'Optimizely', category: 'A/B Testing', patterns: ['cdn.optimizely.com', 'optimizely.com/js/'], globalVar: ['optimizely'] },
  { id: 'vwo', name: 'VWO', category: 'A/B Testing', patterns: ['dev.visualwebsiteoptimizer.com', 'vwo.com/j/async'], globalVar: ['VWO', '_vwo_code'] },
  { id: 'abtasty', name: 'AB Tasty', category: 'A/B Testing', patterns: ['try.abtasty.com'], globalVar: ['ABTasty', '__abtasty'] },
  { id: 'convert', name: 'Convert', category: 'A/B Testing', patterns: ['cdn-3.convertexperiments.com'], globalVar: ['_conv_q'] },
  { id: 'statsig', name: 'Statsig', category: 'A/B Testing', patterns: ['cdn.jsdelivr.net/npm/statsig-js', 'featuregates.org'], globalVar: ['statsig'] },

  // --- AUTOMATION ---
  { id: 'zapier', name: 'Zapier', category: 'Automation', patterns: ['zapier.com/apps/embed', 'zapier.com/embed/'], globalVar: [] },
  { id: 'make', name: 'Make', category: 'Automation', patterns: ['make.com/embed', 'integromat.com'], globalVar: [] },
  { id: 'n8n', name: 'n8n', category: 'Automation', patterns: ['n8n.io/embed', 'n8n.cloud'], globalVar: [] },

  // --- MAPS ---
  { id: 'google_maps', name: 'Google Maps', category: 'Maps', patterns: ['maps.googleapis.com', 'maps.gstatic.com'], globalVar: ['google'] },
  { id: 'mapbox', name: 'Mapbox', category: 'Maps', patterns: ['api.mapbox.com', 'cdn.mapbox.com', 'mapbox-gl.js'], globalVar: ['mapboxgl'] },
  { id: 'leaflet', name: 'Leaflet', category: 'Maps', patterns: ['cdn.leafletjs.com', 'leaflet.js'], globalVar: ['L'] },

  // --- REVIEWS ---
  { id: 'trustpilot', name: 'Trustpilot', category: 'Reviews', patterns: ['invitejs.trustpilot.com', 'widget.trustpilot.com'], globalVar: ['tp'] },
  { id: 'yotpo', name: 'Yotpo', category: 'Reviews', patterns: ['staticw2.yotpo.com', 'yotpo.com'], globalVar: ['yotpo'] },
  { id: 'stamped', name: 'Stamped', category: 'Reviews', patterns: ['cdn1.stamped.io', 'stamped.io'], globalVar: ['stamped'] },
  { id: 'okendo', name: 'Okendo', category: 'Reviews', patterns: ['i.okendo.io'], globalVar: [] },
  { id: 'judgeme', name: 'Judge.me', category: 'Reviews', patterns: ['cdn.judge.me', 'judge.me/reviews'], globalVar: [] },

  // --- REFERRAL ---
  { id: 'referralhero', name: 'ReferralHero', category: 'Referral', patterns: ['referralhero.com/js/', 'mbsy.co'], globalVar: [] },
  { id: 'viralloops', name: 'Viral Loops', category: 'Referral', patterns: ['app.viral-loops.com'], globalVar: [] },
  { id: 'invitereferrals', name: 'InviteReferrals', category: 'Referral', patterns: ['app.invitereferrals.com'], globalVar: [] },

  // --- SALES INTELLIGENCE ---
  { id: 'clearbit', name: 'Clearbit', category: 'Sales Intelligence', patterns: ['x.clearbitjs.com', 'reveal.clearbit.com'], globalVar: ['clearbit'] },
  { id: 'zoominfo', name: 'ZoomInfo', category: 'Sales Intelligence', patterns: ['ws.zoominfo.com', 'zoominfo.com/js/'], globalVar: [] },
  { id: 'apollo', name: 'Apollo.io', category: 'Sales Intelligence', patterns: ['cdn.apollo.io', 'assets.apollo.io'], globalVar: [] },
  { id: 'leadfeeder', name: 'Leadfeeder', category: 'Sales Intelligence', patterns: ['lf-cdn.com/ls.min.js', 'lf-cdn.com'], globalVar: [] },
  { id: 'semrush', name: 'Semrush', category: 'Sales Intelligence', patterns: ['cdn.semrush.com', 'semrush.com/swa', 'semrush.com/widget'], globalVar: [] },

  // --- CUSTOMER SUCCESS ---
  { id: 'pendo', name: 'Pendo', category: 'Customer Success', patterns: ['cdn.pendo.io', 'data.pendo.io'], globalVar: ['pendo'] },
  { id: 'gainsight', name: 'Gainsight', category: 'Customer Success', patterns: ['js.aptrinsic.com', 'web-sdk.aptrinsic.com'], globalVar: ['aptrinsic'] },
  { id: 'churnzero', name: 'ChurnZero', category: 'Customer Success', patterns: ['app.churnzero.net', 'churnzero.net'], globalVar: ['ChurnZero'] },
  { id: 'userpilot', name: 'Userpilot', category: 'Customer Success', patterns: ['js.userpilot.io'], globalVar: ['userpilot'] },

  // --- COMMUNICATIONS ---
  { id: 'twilio', name: 'Twilio', category: 'Communications', patterns: ['media.twiliocdn.com', 'flex.twilio.com'], globalVar: [] },
  { id: 'vonage', name: 'Vonage', category: 'Communications', patterns: ['static.nexmo.com', 'vonage-client-sdk.com'], globalVar: [] },
  { id: 'messagebird', name: 'MessageBird', category: 'Communications', patterns: ['livechat.messagebird.com', 'messagebird.com/embed'], globalVar: [] },

  // --- COURSES ---
  { id: 'teachable', name: 'Teachable', category: 'Courses', patterns: ['teachable.com', 'assets.teachable.com'], globalVar: [] },
  { id: 'thinkific', name: 'Thinkific', category: 'Courses', patterns: ['thinkific.com', 'assets.thinkific.com'], globalVar: [] },
  { id: 'kajabi', name: 'Kajabi', category: 'Courses', patterns: ['kajabi.com', 'kajabi-analytics.com'], globalVar: ['KajabiInApp'] },
  { id: 'podia', name: 'Podia', category: 'Courses', patterns: ['podia.com'], globalVar: [] },
  { id: 'learndash', name: 'LearnDash', category: 'Courses', patterns: ['learndash.com'], globalVar: [] },

  // --- COMMUNITY ---
  { id: 'circle', name: 'Circle', category: 'Community', patterns: ['circle.so', 'cdn.circle.so'], globalVar: [] },
  { id: 'discourse', name: 'Discourse', category: 'Community', patterns: ['discourse-cdn.com', 'discourse_env'], globalVar: ['Discourse', 'I18n'] },
  { id: 'bettermode', name: 'Bettermode', category: 'Community', patterns: ['bettermode.io', 'tribe.so'], globalVar: [] },

  // --- SEARCH ---
  { id: 'algolia', name: 'Algolia', category: 'Search', patterns: ['cdn.jsdelivr.net/npm/algoliasearch', 'algolia.net', 'algolia.com/'], globalVar: ['algoliasearch', 'instantsearch'] },
  { id: 'swiftype', name: 'Swiftype', category: 'Search', patterns: ['swiftype.com', 'search-cdn.swiftype.com'], globalVar: ['Swiftype'] },
  { id: 'doofinder', name: 'Doofinder', category: 'Search', patterns: ['cdn.doofinder.com'], globalVar: [] },
  { id: 'typesense', name: 'Typesense', category: 'Search', patterns: ['cdn.jsdelivr.net/npm/typesense', 'typesense.org'], globalVar: ['Typesense'] },
  { id: 'meilisearch', name: 'Meilisearch', category: 'Search', patterns: ['cdn.jsdelivr.net/npm/meilisearch', 'meilisearch.com'], globalVar: ['MeiliSearch', 'meilisearch'] },
  { id: 'coveo', name: 'Coveo', category: 'Search', patterns: ['cdn.coveo.com', 'static.cloud.coveo.com'], globalVar: ['Coveo'] },
  { id: 'klevu', name: 'Klevu', category: 'Search', patterns: ['js.klevu.com', 'klevu.com'], globalVar: ['klevu', 'klevu_page'] },
  { id: 'searchspring', name: 'Searchspring', category: 'Search', patterns: ['cdn.searchspring.net', 'searchspring.io'], globalVar: [] },

  // --- FEATURE FLAGS ---
  { id: 'launchdarkly', name: 'LaunchDarkly', category: 'Feature Flags', patterns: ['clientsdk.launchdarkly.com', 'app.launchdarkly.com/sdk/', 'events.launchdarkly.com'], globalVar: ['LDClient'] },
  { id: 'growthbook', name: 'GrowthBook', category: 'Feature Flags', patterns: ['cdn.growthbook.io', 'growthbook.io/js/sdk'], globalVar: ['GrowthBook'] },
  { id: 'split_io', name: 'Split.io', category: 'Feature Flags', patterns: ['cdn.split.io', 'sdk.split.io'], globalVar: ['SplitFactory'] },
  { id: 'unleash', name: 'Unleash', category: 'Feature Flags', patterns: ['app.unleash-hosted.com', 'getunleash.io'], globalVar: ['UnleashClient'] },
  { id: 'flagsmith', name: 'Flagsmith', category: 'Feature Flags', patterns: ['cdn.flagsmith.com', 'api.flagsmith.com'], globalVar: ['flagsmith'] },
  { id: 'eppo', name: 'Eppo', category: 'Feature Flags', patterns: ['eppo.cloud', 'cdn.geteppo.com'], globalVar: ['__eppo__'] },

  // --- SOCIAL PROOF ---
  { id: 'useproof', name: 'Proof', category: 'Social Proof', patterns: ['cdn.useproof.com', 'useproof.com/proof.min.js'], globalVar: ['proof_config'] },
  { id: 'fomo', name: 'Fomo', category: 'Social Proof', patterns: ['load.fomo.com', 'fomo.com/notifications.js'], globalVar: ['fomo'] },
  { id: 'trustpulse', name: 'TrustPulse', category: 'Social Proof', patterns: ['cdn.trustpulse.com'], globalVar: ['trustpulse'] },
  { id: 'nudgify', name: 'Nudgify', category: 'Social Proof', patterns: ['nudgify.com/plugin.js', 'assets.nudgify.com'], globalVar: [] },
  { id: 'provesrc', name: 'ProveSrc', category: 'Social Proof', patterns: ['provesrc.com/js/provesrc.js'], globalVar: [] },

  // --- PERSONALIZATION ---
  { id: 'dynamicyield', name: 'Dynamic Yield', category: 'Personalization', patterns: ['cdn.dynamicyield.com', 'st.dynamicyield.com'], globalVar: ['DY', 'DYO'] },
  { id: 'monetate', name: 'Monetate', category: 'Personalization', patterns: ['se.monetate.net', 'cdn.monetate.net'], globalVar: ['monetateQ'] },
  { id: 'nosto', name: 'Nosto', category: 'Personalization', patterns: ['connect.nosto.com', 'cdn.nosto.com'], globalVar: ['nostojs'] },
  { id: 'yieldify', name: 'Yieldify', category: 'Personalization', patterns: ['cdn.yieldify.com', 'yieldify.com/yieldify/'], globalVar: ['yieldify'] },
  { id: 'evergage', name: 'Salesforce Personalization', category: 'Personalization', patterns: ['cdn.evergage.com', 'salesforce-personalization.com'], globalVar: ['Evergage', 'SalesforceInteractions'] },

  // --- SURVEYS ---
  { id: 'qualtrics', name: 'Qualtrics', category: 'Surveys', patterns: ['iad1.qualtrics.com', 'qualtrics.com/WRQualtricsSiteIntercept.js'], globalVar: ['QSI'] },
  { id: 'delighted', name: 'Delighted', category: 'Surveys', patterns: ['d2yyd1h5d9bs7q.cloudfront.net', 'delighted.com/js/'], globalVar: ['delighted'] },
  { id: 'medallia', name: 'Medallia', category: 'Surveys', patterns: ['resources.digital.medallia.com', 'nebula.medallia.com'], globalVar: ['KAMPYLE_ONSITE_SDK', 'kampyleReady'] },
  { id: 'survicate', name: 'Survicate', category: 'Surveys', patterns: ['survey.survicate.com', 'cdn.survicate.com'], globalVar: ['_sva'] },
  { id: 'refiner', name: 'Refiner', category: 'Surveys', patterns: ['js.refiner.io', 'cdn.refiner.io'], globalVar: ['Refiner'] },
  { id: 'typeform_nps', name: 'Qualaroo', category: 'Surveys', patterns: ['ku.qualaroo.com', 'app.qualaroo.com/qualaroo.js'], globalVar: ['_kiq'] },

  // --- DATABASE ---
  { id: 'supabase', name: 'Supabase', category: 'Database', patterns: ['cdn.jsdelivr.net/npm/@supabase/supabase-js', 'supabase.co', 'supabase.io/js'], globalVar: ['supabase'] },

  // --- ANALYTICS additions ---
  { id: 'june', name: 'June.so', category: 'Analytics', patterns: ['cdn.june.so', 'api.june.so'], globalVar: ['june'] },
  { id: 'countly', name: 'Countly', category: 'Analytics', patterns: ['countly.com/sdk.js', 'cdnjs.cloudflare.com/ajax/libs/countly-sdk-web'], globalVar: ['Countly'] },
  { id: 'pirsch', name: 'Pirsch', category: 'Analytics', patterns: ['api.pirsch.io/pirsch.js', 'api.pirsch.io/pa.js'], globalVar: [] },
  { id: 'umami', name: 'Umami', category: 'Analytics', patterns: ['umami.is/script.js', 'umami.is/p/'], globalVar: ['umami'] },
  { id: 'piwikpro', name: 'Piwik PRO', category: 'Analytics', patterns: ['ppms.eu/js/', 'piwik.pro/js/'], globalVar: [] },
  { id: 'chartbeat', name: 'Chartbeat', category: 'Analytics', patterns: ['static.chartbeat.com', 'chartbeat.com/js/chartbeat.js'], globalVar: ['_sf_async_config', 'pSUPERFLY'] },
  { id: 'parsely', name: 'Parse.ly', category: 'Analytics', patterns: ['cdn.parsely.com', 'parsely.com/p.js'], globalVar: ['PARSELY', '__parsely_loaded'] },
  { id: 'comscore', name: 'comScore', category: 'Analytics', patterns: ['b.scorecardresearch.com', 'sb.scorecardresearch.com'], globalVar: ['COMSCORE', '_comscore'] },
  { id: 'openreplay', name: 'OpenReplay', category: 'Analytics', patterns: ['cdn.openreplay.com', 'openreplay.com/tracker'], globalVar: ['OpenReplay'] },

  // --- DATA PLATFORM additions ---
  { id: 'rudderstack', name: 'RudderStack', category: 'Data Platform', patterns: ['cdn.rudderlabs.com', 'dataplane.rudderstack.com'], globalVar: ['rudderanalytics'] },
  { id: 'mparticle', name: 'mParticle', category: 'Data Platform', patterns: ['jssdkcdns.mparticle.com', 'sdk-js.mparticle.com'], globalVar: ['mParticle'] },
  { id: 'tealium', name: 'Tealium', category: 'Data Platform', patterns: ['tags.tiqcdn.com', 'tealiumiq.com'], globalVar: ['utag', 'utagq'] },
  { id: 'freshpaint', name: 'Freshpaint', category: 'Data Platform', patterns: ['perfalytics.com', 'freshpaint.io/recorder'], globalVar: ['freshpaint'] },

  // --- SESSION REPLAY additions ---
  { id: 'contentsquare', name: 'Contentsquare', category: 'Session Replay', patterns: ['tag.iuniversal.com', 'uxa.io'], globalVar: ['cs_tag_config', '_uxa'] },
  { id: 'quantummetric', name: 'Quantum Metric', category: 'Session Replay', patterns: ['cdn.quantummetric.com', 'ptc.quantummetric.com'], globalVar: ['QuantumMetricAPI'] },
  { id: 'inspectlet', name: 'Inspectlet', category: 'Session Replay', patterns: ['cdn.inspectlet.com'], globalVar: ['__insp', '__insp_nv'] },
  { id: 'glassbox', name: 'Glassbox', category: 'Session Replay', patterns: ['gbqx.com', 'cdn.gbqx.com'], globalVar: ['_cdx_'] },
  { id: 'sessionstack', name: 'SessionStack', category: 'Session Replay', patterns: ['cdn.sessionstack.com'], globalVar: ['SessionStackKey', 'SessionStack'] },

  // --- OBSERVABILITY additions ---
  { id: 'dynatrace', name: 'Dynatrace', category: 'Observability', patterns: ['dt.dynatrace.com', 'dynatracelabs.com', 'ruxit.com'], globalVar: ['dtrum', 'dT_'] },
  { id: 'appdynamics', name: 'AppDynamics', category: 'Observability', patterns: ['cdn.appdynamics.com', 'appdynamics.com/adrum'], globalVar: ['ADRUM', 'adrum_config'] },
  { id: 'grafana_faro', name: 'Grafana Faro', category: 'Observability', patterns: ['unpkg.com/@grafana/faro-web-sdk', 'faro.grafana.com'], globalVar: ['faro', '__faroBundleId__'] },

  // --- ERROR TRACKING additions ---
  { id: 'raygun', name: 'Raygun', category: 'Error Tracking', patterns: ['cdn.raygun.io/raygun4js', 'raygun.io/raygun4js'], globalVar: ['Raygun', 'rg4js'] },
  { id: 'airbrake', name: 'Airbrake', category: 'Error Tracking', patterns: ['airbrake.io/notifier.js', 'cdn.airbrake.io'], globalVar: ['AirbrakeClient'] },
  { id: 'trackjs', name: 'TrackJS', category: 'Error Tracking', patterns: ['cdn.trackjs.com', 'usage.trackjs.com'], globalVar: ['TrackJS'] },
  { id: 'honeybadger', name: 'Honeybadger', category: 'Error Tracking', patterns: ['js.honeybadger.io'], globalVar: ['Honeybadger'] },

  // --- ADS additions ---
  { id: 'reddit_pixel', name: 'Reddit Pixel', category: 'Ads', patterns: ['alb.reddit.com', 'ads-static.reddit.com/ads/v2.js'], globalVar: ['rdt'] },
  { id: 'quora_pixel', name: 'Quora Pixel', category: 'Ads', patterns: ['a.quora.com/qevents.js'], globalVar: ['qp'] },
  { id: 'amazon_ads', name: 'Amazon Ads', category: 'Ads', patterns: ['c.amazon-adsystem.com', 'aax.amazon-adsystem.com'], globalVar: ['amzn', 'amazon_ad_tag'] },
  { id: 'spotify_pixel', name: 'Spotify Pixel', category: 'Ads', patterns: ['pixel.byspotify.com', 'analytics.spotify.com/pixel'], globalVar: ['_spotify_pixel'] },

  // --- CRM additions ---
  { id: 'attio', name: 'Attio', category: 'CRM', patterns: ['cdn.attio.com', 'forms.attio.com'], globalVar: ['attio'] },
  { id: 'copper', name: 'Copper', category: 'CRM', patterns: ['prosperworks.com', 'copper.com/embed'], globalVar: [] },
  { id: 'freshsales', name: 'Freshsales', category: 'CRM', patterns: ['cdn.freshsales.io', 'web.freshsales.io'], globalVar: [] },
  { id: 'keap_crm', name: 'Keap CRM', category: 'CRM', patterns: ['app.keap.com', 'forms.keap.com'], globalVar: [] },

  // --- MARKETING AUTO additions ---
  { id: 'iterable', name: 'Iterable', category: 'Marketing Auto', patterns: ['js.iterable.com', 'cdn.iterable.com'], globalVar: ['_itrbl'] },
  { id: 'ontraport', name: 'Ontraport', category: 'Marketing Auto', patterns: ['optins.ontraport.com', 'app.ontraport.com/scripts/'], globalVar: [] },
  { id: 'encharge', name: 'Encharge', category: 'Marketing Auto', patterns: ['js.encharge.io'], globalVar: ['ench'] },

  // --- EMAIL additions ---
  { id: 'beehiiv', name: 'Beehiiv', category: 'Email', patterns: ['cdn.beehiiv.com', 'beehiiv.com/subscribe'], globalVar: [] },
  { id: 'flodesk', name: 'Flodesk', category: 'Email', patterns: ['assets.flodesk.com', 'view.flodesk.com'], globalVar: [] },
  { id: 'campaignmonitor', name: 'Campaign Monitor', category: 'Email', patterns: ['createsend1.com', 'campaignmonitor.com/js/'], globalVar: [] },
  { id: 'moosend', name: 'Moosend', category: 'Email', patterns: ['resources.moosend.com', 'cdn.moosend.com'], globalVar: [] },
  { id: 'mailgun', name: 'Mailgun', category: 'Email', patterns: ['cdn.jsdelivr.net/npm/mailgun-js', 'emailvalidation.mailgun.com'], globalVar: [] },
  { id: 'postmark', name: 'Postmark', category: 'Email', patterns: ['postmarkapp.com/js/', 'assets.postmarkapp.com'], globalVar: [] },
  { id: 'listmonk', name: 'Listmonk', category: 'Email', patterns: ['listmonk.app/static/', 'listmonk.app/subscription'], globalVar: [] },

  // --- CHAT additions ---
  { id: 'reamaze', name: 'Re:amaze', category: 'Chat', patterns: ['reamaze.com/assets/', 'reamaze.com/embed/chat'], globalVar: ['Reamaze'] },
  { id: 'userlike', name: 'Userlike', category: 'Chat', patterns: ['userlike-cdn-widgets.s3-eu-west-1.amazonaws.com', 'userlike.com/widget'], globalVar: [] },
  { id: 'liveagent', name: 'LiveAgent', category: 'Chat', patterns: ['liveagent.com/button/', 'ladesk.com/button/'], globalVar: ['LiveAgent'] },
  { id: 'chaport', name: 'Chaport', category: 'Chat', patterns: ['cdn.chaport.com', 'app.chaport.com'], globalVar: ['chaport'] },
  { id: 'customerly', name: 'Customerly', category: 'Chat', patterns: ['widget.customerly.io'], globalVar: ['customerly'] },

  // --- SUPPORT additions ---
  { id: 'kustomer', name: 'Kustomer', category: 'Support', patterns: ['cdn.kustomerapp.com', 'chat.kustomerapp.com'], globalVar: ['Kustomer'] },
  { id: 'groove', name: 'Groove', category: 'Support', patterns: ['cdn.groovehq.com', 'widget.groovehq.com'], globalVar: ['groove'] },
  { id: 'trengo', name: 'Trengo', category: 'Support', patterns: ['static.widget.trengo.eu', 'widget.trengo.com'], globalVar: [] },
  { id: 'gladly', name: 'Gladly', category: 'Support', patterns: ['cdn.gladly.com', 'gladly.io/widget'], globalVar: ['gladly'] },

  // --- E-COMMERCE additions ---
  { id: 'snipcart', name: 'Snipcart', category: 'E-Commerce', patterns: ['cdn.snipcart.com', 'snipcart.com/themes/v3/default/'], globalVar: ['Snipcart'] },
  { id: 'foxy', name: 'Foxy', category: 'E-Commerce', patterns: ['cdn.foxycart.com', 'foxycart.com/loader.js'], globalVar: ['FC'] },
  { id: 'shift4shop', name: 'Shift4Shop', category: 'E-Commerce', patterns: ['shift4shop.com', 'jcore.io/app/'], globalVar: [] },
  { id: 'cs_cart', name: 'CS-Cart', category: 'E-Commerce', patterns: ['/js/tygh/', 'cs-cart.com'], globalVar: ['Tygh'] },

  // --- PAYMENTS additions ---
  { id: 'chargebee', name: 'Chargebee', category: 'Payments', patterns: ['js.chargebee.com', 'cdn.chargebee.com'], globalVar: ['Chargebee'] },
  { id: 'recurly', name: 'Recurly', category: 'Payments', patterns: ['js.recurly.com'], globalVar: ['recurly'] },
  { id: 'fastspring', name: 'FastSpring', category: 'Payments', patterns: ['sbl.onfastspring.com', 'd1f8f9xe74im1z.cloudfront.net'], globalVar: ['fastspring'] },
  { id: 'affirm', name: 'Affirm', category: 'Payments', patterns: ['cdn1.affirm.com', 'cdn2.affirm.com'], globalVar: ['affirm'] },
  { id: 'sezzle', name: 'Sezzle', category: 'Payments', patterns: ['widget.sezzle.com', 'cdn.sezzle.com'], globalVar: ['Sezzle'] },
  { id: 'zip_pay', name: 'Zip (Quadpay)', category: 'Payments', patterns: ['js.zip.co', 'quadpay.com/js/'], globalVar: [] },
  { id: 'adyen', name: 'Adyen', category: 'Payments', patterns: ['checkoutshopper-live.adyen.com', 'live.adyen.com/checkoutshopper/'], globalVar: ['AdyenCheckout'] },
  { id: 'mollie', name: 'Mollie', category: 'Payments', patterns: ['js.mollie.com', 'mollie.com/v2/js/'], globalVar: ['Mollie'] },

  // --- BUILDER additions ---
  { id: 'unbounce', name: 'Unbounce', category: 'Builder', patterns: ['unbouncepages.com', 'ubembed.com', 'd9hhrg4mnvzow.cloudfront.net'], globalVar: [] },
  { id: 'instapage', name: 'Instapage', category: 'Builder', patterns: ['instapage.com', 'pagedemo.co'], globalVar: [] },
  { id: 'leadpages', name: 'Leadpages', category: 'Builder', patterns: ['lpages.co', 'lpcontent.com'], globalVar: [] },
  { id: 'shogun', name: 'Shogun', category: 'Builder', patterns: ['f.shgcdn.com', 'shgcdn.com'], globalVar: ['Shogun'] },
  { id: 'gempages', name: 'GemPages', category: 'Builder', patterns: ['gemteam.io', 'gempages.net'], globalVar: [] },
  { id: 'pagefly', name: 'PageFly', category: 'Builder', patterns: ['cdn.pagefly.io', 'assets.pagefly.io'], globalVar: [] },
  { id: 'bricks', name: 'Bricks Builder', category: 'Builder', patterns: ['/bricks/assets/css/', '/bricks/assets/js/'], globalVar: ['bricksData'] },

  // --- CMS additions ---
  { id: 'craft', name: 'Craft CMS', category: 'CMS', patterns: ['/cpresources/', 'craftcms.com/js/'], globalVar: ['Craft'] },
  { id: 'typo3', name: 'TYPO3', category: 'CMS', patterns: ['/typo3/', '/typo3temp/assets/'], globalVar: ['TYPO3'] },
  { id: 'umbraco', name: 'Umbraco', category: 'CMS', patterns: ['/umbraco/api/', '/umbraco/surface/'], globalVar: [] },
  { id: 'kontent_ai', name: 'Kontent.ai', category: 'CMS', patterns: ['kontent.ai', 'assets.kenticocloud.com'], globalVar: [] },
  { id: 'webiny', name: 'Webiny', category: 'CMS', patterns: ['webiny.com', 'cdn.webiny.com'], globalVar: [] },
  { id: 'payload', name: 'Payload CMS', category: 'CMS', patterns: ['/payload-public/', 'payloadcms.com'], globalVar: [] },

  // --- NO-CODE additions ---
  { id: 'retool', name: 'Retool', category: 'No-Code', patterns: ['retool.com/embed', 'tryretool.com/embed'], globalVar: [] },
  { id: 'appsmith', name: 'Appsmith', category: 'No-Code', patterns: ['app.appsmith.com', 'cdn.appsmith.com'], globalVar: [] },
  { id: 'softr', name: 'Softr', category: 'No-Code', patterns: ['softr.io/js/', 'cdn.softr.io'], globalVar: [] },
  { id: 'typedream', name: 'Typedream', category: 'No-Code', patterns: ['typedream.app', 'cdn.typedream.com'], globalVar: [] },
  { id: 'super_so', name: 'Super.so', category: 'No-Code', patterns: ['super.so/sdk/', 'cdn.super.so'], globalVar: [] },

  // --- FRAMEWORK additions ---
  { id: 'ember', name: 'Ember.js', category: 'Framework', patterns: ['ember.min.js', 'ember.debug.js', '/ember/'], globalVar: ['Ember', 'Em'] },
  { id: 'solid', name: 'SolidJS', category: 'Framework', patterns: ['solid-js/dist/', 'cdn.jsdelivr.net/npm/solid-js'], globalVar: ['solid'] },
  { id: 'qwik', name: 'Qwik', category: 'Framework', patterns: ['qwikloader.js', '/build/q-'], globalVar: ['qwikevents'] },
  { id: 'preact', name: 'Preact', category: 'Framework', patterns: ['preact.min.js', 'cdn.jsdelivr.net/npm/preact'], globalVar: ['preact'] },
  { id: 'backbone', name: 'Backbone.js', category: 'Framework', patterns: ['backbone.min.js', 'backbone-min.js'], globalVar: ['Backbone'] },
  { id: 'htmx', name: 'HTMX', category: 'Framework', patterns: ['unpkg.com/htmx.org', 'cdn.jsdelivr.net/npm/htmx.org', 'htmx.org/dist/'], globalVar: ['htmx'] },

  // --- LIBRARY additions ---
  { id: 'd3', name: 'D3.js', category: 'Library', patterns: ['d3js.org/d3.v', 'cdn.jsdelivr.net/npm/d3@'], globalVar: ['d3'] },
  { id: 'chartjs', name: 'Chart.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/chart.js', 'cdn.chartjs.org/chart.js'], globalVar: ['Chart'] },
  { id: 'threejs', name: 'Three.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/three@', 'cdnjs.cloudflare.com/ajax/libs/three.js'], globalVar: ['THREE'] },
  { id: 'axios', name: 'Axios', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/axios', 'cdnjs.cloudflare.com/ajax/libs/axios'], globalVar: ['axios'] },
  { id: 'gsap', name: 'GSAP', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/gsap', 'cdn.jsdelivr.net/npm/gsap'], globalVar: ['gsap', 'TweenMax', 'TweenLite'] },
  { id: 'swiper', name: 'Swiper', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/swiper', 'unpkg.com/swiper/'], globalVar: ['Swiper'] },
  { id: 'lottie', name: 'Lottie', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/lottie-web', 'cdn.jsdelivr.net/npm/lottie-web'], globalVar: ['lottie', 'LottiePlayer'] },

  // --- CSS additions ---
  { id: 'foundation', name: 'Foundation', category: 'CSS', patterns: ['cdnjs.cloudflare.com/ajax/libs/foundation', 'cdn.jsdelivr.net/npm/foundation-sites'], globalVar: ['Foundation'] },
  { id: 'materialize', name: 'Materialize', category: 'CSS', patterns: ['cdnjs.cloudflare.com/ajax/libs/materialize', 'materializecss.com/js/'], globalVar: ['M', 'Materialize'] },
  { id: 'uikit', name: 'UIkit', category: 'CSS', patterns: ['cdn.jsdelivr.net/npm/uikit', 'cdnjs.cloudflare.com/ajax/libs/uikit'], globalVar: ['UIkit'] },

  // --- STORAGE additions ---
  { id: 'uploadcare', name: 'Uploadcare', category: 'Storage', patterns: ['ucarecdn.com', 'uploadcare.com/widget/'], globalVar: ['UPLOADCARE_PUBLIC_KEY', 'uploadcare'] },
  { id: 'filestack', name: 'Filestack', category: 'Storage', patterns: ['static.filestackapi.com', 'cdn.filestackcontent.com'], globalVar: ['filestack'] },

  // --- SECURITY additions ---
  { id: 'stytch', name: 'Stytch', category: 'Security', patterns: ['js.stytch.com', 'sdk.stytch.com'], globalVar: ['stytch'] },
  { id: 'workos', name: 'WorkOS', category: 'Security', patterns: ['cdn.workos.com', 'authkit.workos.com'], globalVar: [] },
  { id: 'magic_link', name: 'Magic.link', category: 'Security', patterns: ['cdn.magic.link', 'auth.magic.link'], globalVar: ['Magic'] },
  { id: 'supertokens', name: 'SuperTokens', category: 'Security', patterns: ['cdn.jsdelivr.net/npm/supertokens-web-js', 'supertokens.io/js/'], globalVar: [] },

  // --- COMPLIANCE additions ---
  { id: 'usercentrics', name: 'Usercentrics', category: 'Compliance', patterns: ['app.usercentrics.eu', 'api.usercentrics.eu'], globalVar: ['UC_UI', 'usercentrics'] },
  { id: 'iubenda', name: 'Iubenda', category: 'Compliance', patterns: ['cdn.iubenda.com', 'cs.iubenda.com'], globalVar: ['_iub', '_iubenda'] },
  { id: 'cookieyes', name: 'CookieYes', category: 'Compliance', patterns: ['cdn-cookieyes.com/cookieyes.js', 'cdn-cookieyes.com/client-data'], globalVar: ['getCkyConsent'] },
  { id: 'trustarc', name: 'TrustArc', category: 'Compliance', patterns: ['consent.truste.com', 'trustarc.com/notice'], globalVar: ['truste', '__tC'] },
  { id: 'complianz', name: 'Complianz', category: 'Compliance', patterns: ['cdn.complianz.io/js/', 'complianz.io/js/'], globalVar: [] },
  { id: 'cookie_information', name: 'Cookie Information', category: 'Compliance', patterns: ['policy.cookieinformation.com/uc.js', 'cdn.cookieinformation.com'], globalVar: ['CookieInformation'] },

  // --- SCHEDULING additions ---
  { id: 'doodle', name: 'Doodle', category: 'Scheduling', patterns: ['doodle.com/embed', 'doodle.com/api/'], globalVar: [] },
  { id: 'savvycal', name: 'SavvyCal', category: 'Scheduling', patterns: ['embed.savvycal.com', 'savvycal.com/embed'], globalVar: [] },
  { id: 'harmonizely', name: 'Harmonizely', category: 'Scheduling', patterns: ['harmonizely.com/embed', 'app.harmonizely.com'], globalVar: [] },

  // --- VIDEO additions ---
  { id: 'mux', name: 'Mux', category: 'Video', patterns: ['cdn.jsdelivr.net/npm/@mux/mux-player', 'stream.mux.com', 'mux.com/mux.js'], globalVar: ['mux'] },
  { id: 'brightcove', name: 'Brightcove', category: 'Video', patterns: ['players.brightcove.net', 'brightcove.com/js/'], globalVar: ['bc', 'videojs'] },
  { id: 'bunny_video', name: 'Bunny.net Video', category: 'Video', patterns: ['iframe.mediadelivery.net', 'video.bunnycdn.com'], globalVar: [] },
  { id: 'jwplayer', name: 'JW Player', category: 'Video', patterns: ['cdn.jwplayer.com', 'jwpcdn.com/player/'], globalVar: ['jwplayer'] },
  { id: 'kaltura', name: 'Kaltura', category: 'Video', patterns: ['cdnapisec.kaltura.com', 'kwidget.kaltura.com'], globalVar: ['kWidget', 'Kaltura'] },
  { id: 'sproutvideo', name: 'SproutVideo', category: 'Video', patterns: ['videos.sproutvideo.com', 'sproutvideo.com/assets/'], globalVar: [] },

  // --- FORMS additions ---
  { id: 'fillout', name: 'Fillout', category: 'Forms', patterns: ['server.fillout.com/embed', 'cdn.fillout.com'], globalVar: [] },
  { id: 'formstack', name: 'Formstack', category: 'Forms', patterns: ['formstack.com/forms/embed.js', 'fs2.formstack.com'], globalVar: [] },
  { id: 'cognitoforms', name: 'Cognito Forms', category: 'Forms', patterns: ['www.cognitoforms.com/f/seamless.js', 'cognitoforms.com/Form/'], globalVar: [] },
  { id: 'formbricks', name: 'Formbricks', category: 'Forms', patterns: ['cdn.formbricks.com', 'formbricks.com/js/formbricks.js'], globalVar: ['formbricks'] },
  { id: 'wufoo', name: 'Wufoo', category: 'Forms', patterns: ['wufoo.com/embed/', 'embed.wufoo.com'], globalVar: [] },
  { id: 'formspree', name: 'Formspree', category: 'Forms', patterns: ['formspree.io/f/', 'formspree.io/s/'], globalVar: [] },

  // --- A/B TESTING additions ---
  { id: 'kameleoon', name: 'Kameleoon', category: 'A/B Testing', patterns: ['kameleoon.io/kameleoon.js', 'api.kameleoon.com'], globalVar: ['Kameleoon'] },
  { id: 'evolv', name: 'Evolv AI', category: 'A/B Testing', patterns: ['cdn.evolv.ai', 'participants.evolv.ai'], globalVar: ['evolv'] },

  // --- AUTOMATION additions ---
  { id: 'pipedream', name: 'Pipedream', category: 'Automation', patterns: ['cdn.jsdelivr.net/npm/@pipedream/sdk', 'pipedream.com/forms/'], globalVar: [] },
  { id: 'workato', name: 'Workato', category: 'Automation', patterns: ['app.workato.com/widget', 'workato.com/embed/'], globalVar: [] },
  { id: 'activepieces', name: 'Activepieces', category: 'Automation', patterns: ['cloud.activepieces.com', 'cdn.activepieces.com'], globalVar: [] },

  // --- MAPS additions ---
  { id: 'here_maps', name: 'HERE Maps', category: 'Maps', patterns: ['js.api.here.com', 'geocoder.ls.hereapi.com'], globalVar: ['H', 'here'] },
  { id: 'azure_maps', name: 'Azure Maps', category: 'Maps', patterns: ['atlas.microsoft.com/sdk/javascript/mapcontrol', 'atlas.microsoft.com/sdk/javascript/'], globalVar: ['atlas'] },
  { id: 'openlayers', name: 'OpenLayers', category: 'Maps', patterns: ['cdn.jsdelivr.net/npm/ol@', 'cdnjs.cloudflare.com/ajax/libs/ol3'], globalVar: ['ol'] },
  { id: 'tomtom', name: 'TomTom Maps', category: 'Maps', patterns: ['api.tomtom.com/maps-sdk-for-web', 'cdn.jsdelivr.net/npm/@tomtom-international/'], globalVar: ['tt'] },

  // --- REVIEWS additions ---
  { id: 'birdeye', name: 'Birdeye', category: 'Reviews', patterns: ['birdeye.com/widget.js', 'widgetservice.birdeye.com'], globalVar: [] },
  { id: 'bazaarvoice', name: 'Bazaarvoice', category: 'Reviews', patterns: ['display.ugc.bazaarvoice.com', 'cdn.bazaarvoice.com'], globalVar: ['bv_analytics', 'BV'] },
  { id: 'powerreviews', name: 'PowerReviews', category: 'Reviews', patterns: ['cdn.powerreviews.com', 'powerreviews.com/pr/'], globalVar: ['POWERREVIEWS'] },
  { id: 'loox', name: 'Loox', category: 'Reviews', patterns: ['cdn.loox.io', 'loox.io/widget/loox.js'], globalVar: [] },
  { id: 'fera', name: 'Fera.ai', category: 'Reviews', patterns: ['sdk.fera.ai', 'fera.ai/fls.js'], globalVar: ['fera'] },

  // --- REFERRAL additions ---
  { id: 'growsurf', name: 'GrowSurf', category: 'Referral', patterns: ['app.growsurf.com/growsurf.js', 'js.growsurf.com'], globalVar: ['growsurf'] },
  { id: 'friendbuy', name: 'Friendbuy', category: 'Referral', patterns: ['djnf6e5yyirys.cloudfront.net', 'cdn.friendbuy.io'], globalVar: ['friendbuyAPI', 'friendbuy'] },
  { id: 'rewardful', name: 'Rewardful', category: 'Referral', patterns: ['r.wdfl.co', 'cdn.rewardful.com'], globalVar: ['rewardful', 'Rewardful'] },
  { id: 'tapfiliate', name: 'Tapfiliate', category: 'Referral', patterns: ['cdn.tapfiliate.com', 'tapfiliate.com/js/tapfiliate.js'], globalVar: ['tap'] },
  { id: 'tolt', name: 'Tolt', category: 'Referral', patterns: ['cdn.tolt.io', 'app.tolt.io/tolt.js'], globalVar: ['tolt'] },

  // --- SALES INTELLIGENCE additions ---
  { id: 'sixsense', name: '6sense', category: 'Sales Intelligence', patterns: ['j.6sc.co', 'beacon.6sc.co'], globalVar: ['_6si'] },
  { id: 'demandbase', name: 'Demandbase', category: 'Sales Intelligence', patterns: ['tag.demandbase.com', 'cdn.demandbase.com'], globalVar: ['dbx'] },
  { id: 'lusha', name: 'Lusha', category: 'Sales Intelligence', patterns: ['cdn.lusha.com', 'lusha.com/js/'], globalVar: [] },
  { id: 'visitorqueue', name: 'Visitor Queue', category: 'Sales Intelligence', patterns: ['app.visitorqueue.com/js/', 'cdn.visitorqueue.com'], globalVar: ['vq_gbl'] },
  { id: 'albacross', name: 'Albacross', category: 'Sales Intelligence', patterns: ['serve.albacross.com', 'albacross.com/track.js'], globalVar: [] },

  // --- CUSTOMER SUCCESS additions ---
  { id: 'appcues', name: 'Appcues', category: 'Customer Success', patterns: ['fast.appcues.com', 'api.appcues.com'], globalVar: ['Appcues'] },
  { id: 'userguiding', name: 'UserGuiding', category: 'Customer Success', patterns: ['cdn.userguiding.com', 'static.userguiding.com'], globalVar: ['userGuiding'] },
  { id: 'walkme', name: 'WalkMe', category: 'Customer Success', patterns: ['cdn.walkme.com', 'walkme.com/walkme/production/'], globalVar: ['walkme', 'WalkMePlayerAPI'] },
  { id: 'whatfix', name: 'Whatfix', category: 'Customer Success', patterns: ['cdn.whatfix.com', 'eu1.whatfix.com'], globalVar: ['whatfix'] },
  { id: 'userflow', name: 'Userflow', category: 'Customer Success', patterns: ['js.userflow.com', 'cdn.getuserflow.com'], globalVar: ['userflow'] },
  { id: 'stonly', name: 'Stonly', category: 'Customer Success', patterns: ['cdn.stonly.com', 'stonly.com/js/widget'], globalVar: ['StonlyWidget'] },
  { id: 'chameleon', name: 'Chameleon', category: 'Customer Success', patterns: ['fast.trychameleon.com', 'cdn.trychameleon.com'], globalVar: ['chmln'] },

  // --- COMMUNICATIONS additions ---
  { id: 'sinch', name: 'Sinch', category: 'Communications', patterns: ['cdn.sinch.com', 'cct.sinch.com'], globalVar: [] },
  { id: 'plivo', name: 'Plivo', category: 'Communications', patterns: ['cdn.plivo.com/plivo-browser-sdk', 'plivo.com/sdk/'], globalVar: ['Plivo'] },
  { id: 'telnyx', name: 'Telnyx', category: 'Communications', patterns: ['cdn.telnyx.com', 'js.telnyx.com'], globalVar: [] },
  { id: 'bandwidth', name: 'Bandwidth', category: 'Communications', patterns: ['bandwidth.com/js/', 'cdn.bandwidth.com'], globalVar: [] },

  // --- COURSES additions ---
  { id: 'memberful', name: 'Memberful', category: 'Courses', patterns: ['memberful.com/embed', 'cdn.memberful.com'], globalVar: ['memberful'] },
  { id: 'learnworlds', name: 'LearnWorlds', category: 'Courses', patterns: ['learnworlds.com/js/', 'cdn.learnworlds.com'], globalVar: [] },
  { id: 'skool', name: 'Skool', category: 'Courses', patterns: ['skool.com/embed', 'cdn.skool.com'], globalVar: [] },
  { id: 'memberpress', name: 'MemberPress', category: 'Courses', patterns: ['/memberpress/js/', 'memberpress.com/'], globalVar: [] },

  // --- COMMUNITY additions ---
  { id: 'mighty_networks', name: 'Mighty Networks', category: 'Community', patterns: ['mightynetworks.com', 'mightybell.com'], globalVar: [] },
  { id: 'hivebrite', name: 'Hivebrite', category: 'Community', patterns: ['hivebrite.com', 'cdn.hivebrite.com'], globalVar: [] },
  { id: 'forem', name: 'Forem', category: 'Community', patterns: ['forem.com', 'assets.forem.com/assets/'], globalVar: [] },

  // --- PUSH NOTIFICATIONS additions ---
  { id: 'airship', name: 'Airship', category: 'Push Notifications', patterns: ['aswpsdkus.com', 'ua.urbanairship.com', 'web-sdk.urbanairship.com'], globalVar: ['UA', 'Airship'] },
  { id: 'knock', name: 'Knock', category: 'Push Notifications', patterns: ['cdn.knock.app', 'in-app.knock.app'], globalVar: ['Knock'] },
  { id: 'novu', name: 'Novu', category: 'Push Notifications', patterns: ['cdn.novu.co', 'embed.novu.co'], globalVar: ['Novu'] },

  // --- AFFILIATE ---
  { id: 'impact', name: 'Impact', category: 'Affiliate', patterns: ['utt.impactradius.com', 'd.impactradius.com', 'clickserv.sitescout.com'], globalVar: ['ire'] },
  { id: 'partnerstack', name: 'PartnerStack', category: 'Affiliate', patterns: ['p.partnrapp.com', 'cdn.partnrapp.com', 'app.partnerstack.com/partner'], globalVar: ['growsumo', 'gs'] },
  { id: 'shareasale', name: 'ShareASale', category: 'Affiliate', patterns: ['www.shareasale.com/sale.cfm', 'shareasale.com/image/pixel/'], globalVar: [] },
  { id: 'goaffpro', name: 'GoAffPro', category: 'Affiliate', patterns: ['widget.goaffpro.com', 'cdn.goaffpro.com'], globalVar: ['goaffpro'] },
  { id: 'refersion', name: 'Refersion', category: 'Affiliate', patterns: ['cdn.refersion.com', 'refersion.com/js/v3/'], globalVar: ['_refersion', 'r'] },
  { id: 'everflow', name: 'Everflow', category: 'Affiliate', patterns: ['www.eftrack.net', 'click.evyy.net'], globalVar: [] },
  { id: 'tune', name: 'TUNE', category: 'Affiliate', patterns: ['sdk.tune.com', 'track.tune.com'], globalVar: [] },

  // --- EVENTS ---
  { id: 'eventbrite', name: 'Eventbrite', category: 'Events', patterns: ['www.eventbrite.com/static/widgets/eb_widgets.js', 'eventbrite.com/e/'], globalVar: ['EBWidgets'] },
  { id: 'luma', name: 'Luma', category: 'Events', patterns: ['lu.ma/embed/', 'cdn.lu.ma'], globalVar: [] },
  { id: 'demio', name: 'Demio', category: 'Events', patterns: ['widget.demio.com', 'cdn.demio.com/js/'], globalVar: ['Demio'] },
  { id: 'gotowebinar', name: 'GoToWebinar', category: 'Events', patterns: ['attendee.gotowebinar.com', 'global.gotowebinar.com'], globalVar: [] },
  { id: 'bigmarker', name: 'BigMarker', category: 'Events', patterns: ['bigmarker.com/api/v_js/', 'cdn.bigmarker.com'], globalVar: [] },
  { id: 'zoom_events', name: 'Zoom Events', category: 'Events', patterns: ['appssdk.zoom.us', 'marketplace.zoom.us/js/sdk'], globalVar: ['ZoomMtg', 'ZoomMtgEmbedded'] },
  { id: 'hopin', name: 'Hopin', category: 'Events', patterns: ['hopin.com/embed', 'cdn.hopin.com'], globalVar: [] },

  // --- E-SIGNATURE ---
  { id: 'docusign', name: 'DocuSign', category: 'E-Signature', patterns: ['demo.docusign.net/clickapi/sdk/latest/docuclicksdk.js', 'app.docusign.com/dsfs/js/'], globalVar: ['DocuSign'] },
  { id: 'hellosign', name: 'Dropbox Sign', category: 'E-Signature', patterns: ['cdn.hellosign.com/public/js/hellosign-embedded', 'app.hellosign.com'], globalVar: ['HelloSign'] },
  { id: 'pandadoc', name: 'PandaDoc', category: 'E-Signature', patterns: ['app.pandadoc.com/ss/document.js', 'cdn.pandadoc.com'], globalVar: ['PandaDoc'] },
  { id: 'adobe_sign', name: 'Adobe Sign', category: 'E-Signature', patterns: ['secure.echosign.com', 'secure.na4.echosign.com', 'adobesign.com/public/esignWidget'], globalVar: [] },
  { id: 'signnow', name: 'SignNow', category: 'E-Signature', patterns: ['signnow.com/embed/', 'cdn.signnow.com'], globalVar: [] },

  // --- FEEDBACK ---
  { id: 'canny', name: 'Canny', category: 'Feedback', patterns: ['canny.io/sdk.js', 'boards.canny.io'], globalVar: ['Canny'] },
  { id: 'productboard', name: 'ProductBoard', category: 'Feedback', patterns: ['portal.productboard.com', 'cdn.productboard.com'], globalVar: [] },
  { id: 'uservoice', name: 'UserVoice', category: 'Feedback', patterns: ['widget.uservoice.com', 'uservoice.com/js/'], globalVar: ['UserVoice', 'UV'] },
  { id: 'sleekplan', name: 'Sleekplan', category: 'Feedback', patterns: ['cdn.sleekplan.com', 'app.sleekplan.com/sdk'], globalVar: ['$sleekplan'] },
  { id: 'savio', name: 'Savio', category: 'Feedback', patterns: ['savio.io/api/track/', 'cdn.savio.io'], globalVar: [] },
  { id: 'featureupvote', name: 'FeatureUpvote', category: 'Feedback', patterns: ['featureupvote.com/embed', 'cdn.featureupvote.com'], globalVar: [] },

  // --- CONVERSIONS ---
  { id: 'optinmonster', name: 'OptinMonster', category: 'Conversions', patterns: ['a.optnmstr.com/app/js/api.min.js', 'optnmstr.com'], globalVar: ['om5mc', '__omOptIn'] },
  { id: 'hellobar', name: 'Hello Bar', category: 'Conversions', patterns: ['hellobar.com/hellobar.js', 'cdn.hellobar.com'], globalVar: ['HelloBar'] },
  { id: 'sumo', name: 'Sumo', category: 'Conversions', patterns: ['load.sumome.com', 'sumo.com/js/sumo.js'], globalVar: ['sumo', '__sumo_site_id'] },
  { id: 'privy', name: 'Privy', category: 'Conversions', patterns: ['widget.privy.com', 'cdn.privy.com'], globalVar: ['Privy'] },
  { id: 'justuno', name: 'Justuno', category: 'Conversions', patterns: ['cdn.justuno.com', 'app.justuno.com'], globalVar: ['juapp'] },
  { id: 'wisepops', name: 'Wisepops', category: 'Conversions', patterns: ['wisepops.com/wisepops.js', 'cdn.wisepops.com'], globalVar: ['wisepops'] },
  { id: 'poptin', name: 'Poptin', category: 'Conversions', patterns: ['cdn.popt.in', 'app.poptin.com'], globalVar: ['poptinx'] },

  // --- ANALYTICS additions ---
  { id: 'vercel_analytics', name: 'Vercel Analytics', category: 'Analytics', patterns: ['/_vercel/insights/script.js', 'cdn.vercel-insights.com'], globalVar: ['va'] },
  { id: 'cf_web_analytics', name: 'Cloudflare Web Analytics', category: 'Analytics', patterns: ['static.cloudflareinsights.com/beacon.min.js'], globalVar: ['__cfBeacon', '__cfRl'] },
  { id: 'sprig', name: 'Sprig', category: 'Analytics', patterns: ['cdn.sprig.com', 'cdn.sprigapp.com'], globalVar: ['Sprig'] },
  { id: 'microsoft_clarity_analytics', name: 'Microsoft Clarity', category: 'Analytics', patterns: ['www.clarity.ms/tag/'], globalVar: ['clarity'] },
  { id: 'goatcounter', name: 'GoatCounter', category: 'Analytics', patterns: ['gc.zgo.at/count.js', 'cdn.goatcounter.com'], globalVar: ['goatcounter'] },

  // --- CMS additions ---
  { id: 'contentstack', name: 'Contentstack', category: 'CMS', patterns: ['cdn.contentstack.io', 'cdn.contentstack.com'], globalVar: [] },
  { id: 'agility_cms', name: 'Agility CMS', category: 'CMS', patterns: ['cdn.aglty.io', 'agilitycms.com'], globalVar: [] },
  { id: 'directus', name: 'Directus', category: 'CMS', patterns: ['cdn.directus.io', 'directus.io/js/sdk'], globalVar: [] },
  { id: 'strapi_cms', name: 'Strapi', category: 'CMS', patterns: ['/strapi/admin/', '/api/strapi/'], globalVar: [] },

  // --- REVIEWS / TESTIMONIALS additions ---
  { id: 'testimonial_to', name: 'Testimonial.to', category: 'Reviews', patterns: ['cdn.testimonial.to', 'widget.testimonial.to'], globalVar: [] },
  { id: 'senja', name: 'Senja', category: 'Reviews', patterns: ['cdn.senja.io', 'widget.senja.io'], globalVar: [] },
  { id: 'endorsal', name: 'Endorsal', category: 'Reviews', patterns: ['cdn.endorsal.io', 'endorsal.io/embed'], globalVar: [] },
  { id: 'reviews_io', name: 'Reviews.io', category: 'Reviews', patterns: ['widget.reviews.io', 'cdn.reviews.io'], globalVar: ['ReviewsWidget'] },

  // --- CHAT additions ---
  { id: 'fb_messenger', name: 'Facebook Messenger Plugin', category: 'Chat', patterns: ['connect.facebook.net/en_US/sdk/xfbml.customerchat.js', 'connect.facebook.net/en_GB/sdk/xfbml.customerchat.js'], globalVar: ['FB'] },
  { id: 'whatsapp_widget', name: 'WhatsApp Business Widget', category: 'Chat', patterns: ['static.whatsapp.net', 'wa.me/send?', 'api.whatsapp.com/send'], globalVar: [] },
  { id: 'smartsupp', name: 'Smartsupp', category: 'Chat', patterns: ['www.smartsupp.com/loader.js', 'smartsupp.com/widget/'], globalVar: ['smartsupp', '_smartsupp'] },
  { id: 'pure_chat', name: 'Pure Chat', category: 'Chat', patterns: ['cdn.purechat.com', 'purechat.com/widget'], globalVar: ['$_Tawk_id'] },

  // --- SECURITY additions ---
  { id: 'frontegg', name: 'Frontegg', category: 'Security', patterns: ['cdn.frontegg.com', 'authkit.frontegg.com'], globalVar: ['frontegg'] },
  { id: 'descope', name: 'Descope', category: 'Security', patterns: ['cdn.jsdelivr.net/npm/@descope/web-js-sdk', 'auth.descope.com'], globalVar: ['Descope'] },
  { id: 'firebase_auth', name: 'Firebase Auth', category: 'Security', patterns: ['www.gstatic.com/firebasejs', 'firebase.googleapis.com/firebase-js-sdk'], globalVar: ['firebase'] },
  { id: 'cognito', name: 'AWS Cognito', category: 'Security', patterns: ['cognito-identity.amazonaws.com', 'cognito-idp.amazonaws.com'], globalVar: ['AmazonCognitoIdentity'] },

  // --- FRAMEWORK additions ---
  { id: 'knockout', name: 'Knockout.js', category: 'Framework', patterns: ['cdnjs.cloudflare.com/ajax/libs/knockout', 'knockoutjs.com/downloads/knockout', 'knockout-min.js'], globalVar: ['ko'] },
  { id: 'mithril', name: 'Mithril', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/mithril', 'cdnjs.cloudflare.com/ajax/libs/mithril'], globalVar: ['m'] },
  { id: 'alpinejs_v3', name: 'Alpine.js v3', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/alpinejs@3', 'unpkg.com/alpinejs@3'], globalVar: ['Alpine'] },
  { id: 'stimulus', name: 'Stimulus', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/@hotwired/stimulus', 'stimulus.hotwire.dev', 'unpkg.com/@hotwired/stimulus'], globalVar: ['Stimulus'] },
  { id: 'turbo', name: 'Turbo (Hotwire)', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/@hotwired/turbo', 'turbo.hotwired.dev'], globalVar: ['Turbo'] },

  // --- LIBRARY additions ---
  { id: 'momentjs', name: 'Moment.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/moment.js', 'momentjs.com/downloads/moment.min.js', 'moment.min.js'], globalVar: ['moment'] },
  { id: 'dayjs', name: 'Day.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/dayjs', 'cdnjs.cloudflare.com/ajax/libs/dayjs'], globalVar: ['dayjs'] },
  { id: 'plyr', name: 'Plyr', category: 'Library', patterns: ['cdn.plyr.io', 'plyr.io/plyr.js'], globalVar: ['Plyr'] },
  { id: 'videojs', name: 'Video.js', category: 'Library', patterns: ['vjs.zencdn.net', 'cdn.jsdelivr.net/npm/video.js'], globalVar: ['videojs'] },
  { id: 'revealjs', name: 'Reveal.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/reveal.js', 'revealjs.com'], globalVar: ['Reveal'] },
  { id: 'popper', name: 'Popper.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/popper.js', 'cdn.jsdelivr.net/npm/@popperjs/core'], globalVar: ['Popper'] },

  // --- NO-CODE additions ---
  { id: 'plasmic', name: 'Plasmic', category: 'No-Code', patterns: ['host.plasmic.app', 'cdn.plasmic.app'], globalVar: ['PlasmicCanvasContext'] },
  { id: 'weweb', name: 'WeWeb', category: 'No-Code', patterns: ['cdn.weweb.io', 'weweb.io/public/'], globalVar: [] },
  { id: 'pory', name: 'Pory', category: 'No-Code', patterns: ['pory.io/app/embed', 'cdn.pory.io'], globalVar: [] },
  { id: 'bildr', name: 'Bildr', category: 'No-Code', patterns: ['cdn.bildr.com', 'bildr.com/js/'], globalVar: [] },

  // --- E-COMMERCE additions ---
  { id: 'shopware', name: 'Shopware', category: 'E-Commerce', patterns: ['/bundles/storefront/', 'shopware.js', '/shopware/'], globalVar: [] },
  { id: 'nopcommerce', name: 'nopCommerce', category: 'E-Commerce', patterns: ['/nopcommerce/', '/plugins/nop', 'nopcommerce.com'], globalVar: [] },
  { id: 'aftership', name: 'AfterShip', category: 'E-Commerce', patterns: ['tracking.aftership.com', 'cdn.aftership.com/api/'], globalVar: [] },
  { id: 'nacelle', name: 'Nacelle', category: 'E-Commerce', patterns: ['cdn.nacelle.com', 'nacelle.com/js/sdk'], globalVar: [] },

  // --- SUPPORT additions ---
  { id: 'dixa', name: 'Dixa', category: 'Support', patterns: ['messenger.dixa.com', 'static.dixa-cdn.com'], globalVar: ['dixa'] },
  { id: 'hiver', name: 'Hiver', category: 'Support', patterns: ['hiverhq.com', 'hivermail.com'], globalVar: [] },
  { id: 'deskpro', name: 'Deskpro', category: 'Support', patterns: ['deskpro.com/deskpro-messenger', 'cdn.deskpro.com'], globalVar: ['DeskproMessenger'] },

  // --- PAYMENTS additions ---
  { id: 'checkout_com', name: 'Checkout.com', category: 'Payments', patterns: ['cdn.checkout.com', 'py.cko.com'], globalVar: ['Frames', 'Checkout'] },
  { id: 'paysafe', name: 'Paysafe', category: 'Payments', patterns: ['hosted.paysafe.com/js/v1/latest/paysafe.min.js'], globalVar: ['paysafe'] },
  { id: 'worldpay', name: 'Worldpay', category: 'Payments', patterns: ['cdn.worldpay.com', 'hpp.worldpay.com/js/'], globalVar: [] },
  { id: 'razorpay', name: 'Razorpay', category: 'Payments', patterns: ['checkout.razorpay.com', 'rzp.io/v1/checkout.js'], globalVar: ['Razorpay'] },
  { id: 'paystack', name: 'Paystack', category: 'Payments', patterns: ['js.paystack.co', 'paystack.com/v2/inline.js'], globalVar: ['PaystackPop'] },

  // --- CDN additions ---
  { id: 'keycdn', name: 'KeyCDN', category: 'CDN', patterns: ['kxcdn.com', 'app.keycdn.com'], globalVar: [] },
  { id: 'statically', name: 'Statically', category: 'CDN', patterns: ['cdn.statically.io'], globalVar: [] },
  { id: 'unpkg', name: 'unpkg', category: 'CDN', patterns: ['unpkg.com/'], globalVar: [] },
  { id: 'stackpath_cdn', name: 'StackPath CDN', category: 'CDN', patterns: ['stackpath.bootstrapcdn.com', 'maxcdn.bootstrapcdn.com', 'netdna.bootstrapcdn.com'], globalVar: [] },
  { id: 'amazon_cloudfront', name: 'Amazon CloudFront', category: 'CDN', patterns: ['cloudfront.net'], globalVar: [] },
  { id: 'azure_cdn', name: 'Azure CDN', category: 'CDN', patterns: ['azureedge.net', 'trafficmanager.net'], globalVar: [] },

  // --- ACCESSIBILITY ---
  { id: 'userway', name: 'UserWay', category: 'Accessibility', patterns: ['cdn.userway.org/widget.js'], globalVar: ['UserWay'] },
  { id: 'accessibe', name: 'accessiBe', category: 'Accessibility', patterns: ['acsbapp.com/apps/app/dist/js/app.js', 'acsbapp.com'], globalVar: ['acsbJS'] },
  { id: 'equalweb', name: 'EqualWeb', category: 'Accessibility', patterns: ['cdn.equalweb.com', 'accessibility.equalweb.com'], globalVar: ['EqualWeb'] },
  { id: 'audioeye', name: 'AudioEye', category: 'Accessibility', patterns: ['wid.audioeye.com/o.js', 'cdn.audioeye.com'], globalVar: ['AudioEye'] },
  { id: 'reciteme', name: 'Recite Me', category: 'Accessibility', patterns: ['cdn.reciteme.com/assets/js/latest/reciteme.js'], globalVar: [] },
  { id: 'browsealoud', name: 'Browsealoud', category: 'Accessibility', patterns: ['browsealoud.com/plus/scripts/ba.js', 'browsealoud.com/plus/scripts/'], globalVar: [] },
  { id: 'accessible360', name: 'Accessible360', category: 'Accessibility', patterns: ['cdn.accessible360.com', 'a360.co/widget.js'], globalVar: [] },

  // --- TRANSLATION ---
  { id: 'weglot', name: 'Weglot', category: 'Translation', patterns: ['cdn.weglot.com/weglot.min.js', 'cdn.weglot.com/weglot.js'], globalVar: ['Weglot'] },
  { id: 'transifex_live', name: 'Transifex Live', category: 'Translation', patterns: ['cdn.transifex.com/live.js', 'cdn.transifex.com/tools/'], globalVar: ['Transifex'] },
  { id: 'bablic', name: 'Bablic', category: 'Translation', patterns: ['app.bablic.com/snippet/'], globalVar: ['bablic'] },
  { id: 'gtranslate', name: 'GTranslate', category: 'Translation', patterns: ['gtranslate.io/flag.min.js', 'edge.gtranslate.io/gtranslate.js'], globalVar: [] },
  { id: 'translatepress', name: 'TranslatePress', category: 'Translation', patterns: ['/wp-content/plugins/translatepress-multilingual/', 'translatepress.com'], globalVar: [] },
  { id: 'polylang', name: 'Polylang', category: 'Translation', patterns: ['/wp-content/plugins/polylang/'], globalVar: [] },
  { id: 'wpml', name: 'WPML', category: 'Translation', patterns: ['/wp-content/plugins/sitepress-multilingual-cms/', 'wpml.org'], globalVar: [] },

  // --- DOCUMENTATION ---
  { id: 'gitbook', name: 'GitBook', category: 'Documentation', patterns: ['gitbook.io/public/', 'gitbook.io/spaces/', 'app.gitbook.com'], globalVar: [] },
  { id: 'readme_io', name: 'ReadMe', category: 'Documentation', patterns: ['cdn.readme.io/public/', 'dash.readme.io', 'readme.io/assets/'], globalVar: [] },
  { id: 'document360', name: 'Document360', category: 'Documentation', patterns: ['cdn.document360.io', 'portal.document360.io'], globalVar: [] },
  { id: 'helpjuice', name: 'HelpJuice', category: 'Documentation', patterns: ['helpjuice.com/helpjuice_production/', 'cdn.helpjuice.com'], globalVar: [] },
  { id: 'docsify', name: 'Docsify', category: 'Documentation', patterns: ['cdn.jsdelivr.net/npm/docsify/', 'unpkg.com/docsify/'], globalVar: ['$docsify'] },
  { id: 'docusaurus', name: 'Docusaurus', category: 'Documentation', patterns: ['/_docusaurus/', 'docusaurus.io/assets/'], globalVar: [] },
  { id: 'mintlify', name: 'Mintlify', category: 'Documentation', patterns: ['mintlify.app', 'mintlify.com/docs', '/api/mint.js'], globalVar: [] },
  { id: 'mkdocs', name: 'MkDocs', category: 'Documentation', patterns: ['mkdocs.org/mkdocs/', '/assets/javascripts/bundle.'], globalVar: [] },
  { id: 'knowledgeowl', name: 'KnowledgeOwl', category: 'Documentation', patterns: ['cdn.knowledgeowl.com', 'app.knowledgeowl.com'], globalVar: [] },
  { id: 'helpscout_docs', name: 'Help Scout Docs', category: 'Documentation', patterns: ['docs.helpscout.net', 'secure.helpscout.net/docs'], globalVar: [] },

  // --- SOCIAL SHARING ---
  { id: 'addthis', name: 'AddThis', category: 'Social Sharing', patterns: ['s7.addthis.com/js/300/addthis_widget.js', 'addthis.com/icons/'], globalVar: ['addthis'] },
  { id: 'sharethis', name: 'ShareThis', category: 'Social Sharing', patterns: ['platform-api.sharethis.com', 'sharethis.com/platform/'], globalVar: ['__sharethis__', 'sharethis'] },
  { id: 'addtoany', name: 'AddToAny', category: 'Social Sharing', patterns: ['static.addtoany.com/menu/page.js', 'addtoany.com/share/'], globalVar: ['a2a'] },
  { id: 'social9', name: 'Social9', category: 'Social Sharing', patterns: ['cdn.social9.com', 'social9.com/social9.js'], globalVar: [] },
  { id: 'twitter_widget', name: 'X (Twitter) Widget', category: 'Social Sharing', patterns: ['platform.twitter.com/widgets.js', 'platform.x.com/widgets.js'], globalVar: ['twttr'] },
  { id: 'instagram_embed', name: 'Instagram Embed', category: 'Social Sharing', patterns: ['www.instagram.com/embed.js', 'instagram.com/static/bundles/metro/EmbedSDK'], globalVar: [] },
  { id: 'fb_sdk', name: 'Facebook SDK', category: 'Social Sharing', patterns: ['connect.facebook.net/en_US/sdk.js', 'connect.facebook.net/en_GB/sdk.js'], globalVar: ['FB', 'fbAsyncInit'] },
  { id: 'pinterest_widget', name: 'Pinterest Widget', category: 'Social Sharing', patterns: ['assets.pinterest.com/js/pinit.js', 'assets.pinterest.com/js/pinit_main.js'], globalVar: [] },

  // --- RECRUITING ---
  { id: 'lever', name: 'Lever', category: 'Recruiting', patterns: ['jobs.lever.co/embed', 'lever.co/api/postings/'], globalVar: ['LeverBoardWidget'] },
  { id: 'greenhouse', name: 'Greenhouse', category: 'Recruiting', patterns: ['boards.greenhouse.io/embed/', 'boards.eu.greenhouse.io/embed/'], globalVar: [] },
  { id: 'workable', name: 'Workable', category: 'Recruiting', patterns: ['apply.workable.com', 'jobs.workable.com'], globalVar: [] },
  { id: 'ashby', name: 'Ashby', category: 'Recruiting', patterns: ['jobs.ashbyhq.com', 'ashbyhq.com/api/'], globalVar: [] },
  { id: 'teamtailor', name: 'Teamtailor', category: 'Recruiting', patterns: ['careers.teamtailor.com', 'teamtailor.com/widget'], globalVar: [] },
  { id: 'personio', name: 'Personio', category: 'Recruiting', patterns: ['personio.de/careers/', 'personio.com/job-listings/'], globalVar: [] },
  { id: 'smartrecruiters', name: 'SmartRecruiters', category: 'Recruiting', patterns: ['careers.smartrecruiters.com', 'jobs.smartrecruiters.com'], globalVar: [] },
  { id: 'recruitee', name: 'Recruitee', category: 'Recruiting', patterns: ['recruitee.com/o/', 'cdn.recruitee.com'], globalVar: [] },
  { id: 'breezyhr', name: 'Breezy HR', category: 'Recruiting', patterns: ['breezy.hr/embed/', 'app.breezyhr.com'], globalVar: [] },
  { id: 'workday_careers', name: 'Workday Careers', category: 'Recruiting', patterns: ['wd3.myworkdayjobs.com', 'wd5.myworkdayjobs.com', 'wd1.myworkdayjobs.com'], globalVar: [] },
  { id: 'icims', name: 'iCIMS', category: 'Recruiting', patterns: ['careers.icims.com', 'icims.com/jobs/'], globalVar: [] },
  { id: 'taleo', name: 'Oracle Taleo', category: 'Recruiting', patterns: ['tbe.taleo.net', 'taleo.net/careersection/'], globalVar: [] },
  { id: 'jazz_hr', name: 'JazzHR', category: 'Recruiting', patterns: ['app.jazz.co/job/', 'jazz.co/widget/'], globalVar: [] },
  { id: 'rippling', name: 'Rippling Jobs', category: 'Recruiting', patterns: ['ats.rippling.com', 'app.rippling.com/job/'], globalVar: [] },

  // --- STATUS PAGES ---
  { id: 'statuspage', name: 'Statuspage.io', category: 'Status Pages', patterns: ['statuspage.io/embed/script.js', 'cdnjs.statuspage.io'], globalVar: ['StatusPage'] },
  { id: 'instatus', name: 'Instatus', category: 'Status Pages', patterns: ['static.instatus.com', 'instatus.com/js/widget.js'], globalVar: [] },
  { id: 'sorry_app', name: 'Sorry™', category: 'Status Pages', patterns: ['cdn.sorryapp.com/core/js/sorry.widget.js'], globalVar: [] },
  { id: 'freshstatus', name: 'Freshstatus', category: 'Status Pages', patterns: ['freshstatus.io/embed/', 'cdn.freshstatus.io'], globalVar: [] },
  { id: 'betteruptime', name: 'Better Uptime', category: 'Status Pages', patterns: ['betteruptime.com/status/', 'cdn.betteruptime.com/badge/'], globalVar: [] },

  // --- LIVE DEMO ---
  { id: 'storylane', name: 'Storylane', category: 'Live Demo', patterns: ['cdn.storylane.io', 'app.storylane.io/embed/'], globalVar: [] },
  { id: 'navattic', name: 'Navattic', category: 'Live Demo', patterns: ['cdn.navattic.com', 'embed.navattic.com'], globalVar: [] },
  { id: 'arcade', name: 'Arcade', category: 'Live Demo', patterns: ['cdn.arcade.software', 'app.arcade.software/s/'], globalVar: ['Arcade'] },
  { id: 'walnut', name: 'Walnut', category: 'Live Demo', patterns: ['cdn.walnut.io', 'demo.walnut.io'], globalVar: [] },
  { id: 'tourial', name: 'Tourial', category: 'Live Demo', patterns: ['cdn.tourial.com', 'app.tourial.com'], globalVar: [] },
  { id: 'demoboost', name: 'Demoboost', category: 'Live Demo', patterns: ['embed.demoboost.com', 'cdn.demoboost.com'], globalVar: [] },
  { id: 'consensus', name: 'Consensus', category: 'Live Demo', patterns: ['embed.goconsensus.com', 'cdn.goconsensus.com'], globalVar: [] },

  // --- USER RESEARCH ---
  { id: 'maze', name: 'Maze', category: 'User Research', patterns: ['js.maze.co', 'cdn.maze.co'], globalVar: ['maze'] },
  { id: 'usertesting', name: 'UserTesting', category: 'User Research', patterns: ['platform.usertesting.com/embed', 'cdn.usertesting.com'], globalVar: [] },
  { id: 'lookback', name: 'Lookback', category: 'User Research', patterns: ['lookback.io/embed', 'cdn.lookback.io'], globalVar: [] },
  { id: 'dscout', name: 'dscout', category: 'User Research', patterns: ['dscout.com/embed', 'app.dscout.com'], globalVar: [] },
  { id: 'userbrain', name: 'UserBrain', category: 'User Research', patterns: ['cdn.userbrain.com', 'userbrain.com/embed'], globalVar: [] },

  // --- SEO ---
  { id: 'yoast', name: 'Yoast SEO', category: 'SEO', patterns: ['/wp-content/plugins/wordpress-seo/', 'yoast.com/tracking/'], globalVar: ['wpseoSchemas', 'wpseo'] },
  { id: 'rankmath', name: 'RankMath', category: 'SEO', patterns: ['/wp-content/plugins/seo-by-rank-math/', 'rankmath.com'], globalVar: ['rankMath'] },
  { id: 'seopress', name: 'SEOPress', category: 'SEO', patterns: ['/wp-content/plugins/wp-seopress/'], globalVar: [] },
  { id: 'all_in_one_seo', name: 'All in One SEO', category: 'SEO', patterns: ['/wp-content/plugins/all-in-one-seo-pack/', 'aioseo.com'], globalVar: ['aioseo'] },

  // --- VIDEO additions ---
  { id: 'twitch', name: 'Twitch', category: 'Video', patterns: ['embed.twitch.tv', 'player.twitch.tv'], globalVar: [] },
  { id: 'dailymotion', name: 'Dailymotion', category: 'Video', patterns: ['api.dmcdn.net/all.js', 'www.dailymotion.com/embed/'], globalVar: ['DM', 'DM_PLAYER_OPTIONS'] },
  { id: 'rumble', name: 'Rumble', category: 'Video', patterns: ['rumble.com/embedJS/', 'rumble.com/embed/'], globalVar: [] },
  { id: 'cloudflare_stream', name: 'Cloudflare Stream', category: 'Video', patterns: ['embed.cloudflarestream.com', 'cloudflarestream.com/embed/'], globalVar: [] },

  // --- VIDEO CONFERENCING ---
  { id: 'whereby', name: 'Whereby', category: 'Video', patterns: ['cdn.embed.whereby.com', 'embed.whereby.com'], globalVar: [] },
  { id: 'daily_co', name: 'Daily.co', category: 'Video', patterns: ['cdn.daily.co/build/sdk.iframe-body.js', 'daily.co/embedded'], globalVar: ['DailyIframe'] },
  { id: 'jitsi', name: 'Jitsi Meet', category: 'Video', patterns: ['meet.jit.si/external_api.js', '8x8.vc/libs/external_api.min.js'], globalVar: ['JitsiMeetExternalAPI'] },

  // --- ANALYTICS additions ---
  { id: 'adobe_analytics', name: 'Adobe Analytics', category: 'Analytics', patterns: ['assets.adobedtm.com', 'omtrdc.net', '/satelliteLib-'], globalVar: ['_satellite', 's_account', 'AppMeasurement'] },
  { id: 'kissmetrics', name: 'Kissmetrics', category: 'Analytics', patterns: ['doug1izaerwt3.cloudfront.net', 'kissmetrics.com/i.js'], globalVar: ['_kmq', 'KM'] },
  { id: 'quantcast', name: 'Quantcast', category: 'Analytics', patterns: ['edge.quantserve.com', 'secure-cdn.quantcast.com'], globalVar: ['__qca'] },
  { id: 'nielsen', name: 'Nielsen', category: 'Analytics', patterns: ['secure-dcr.imrworldwide.com', 'cdn-gl.imrworldwide.com'], globalVar: ['nol_it_ch'] },
  { id: 'piano_analytics', name: 'Piano Analytics', category: 'Analytics', patterns: ['tag.aticdn.net', 'logc335.xiti.com'], globalVar: ['ATInternet', 'pa'] },
  { id: 'clicky', name: 'Clicky', category: 'Analytics', patterns: ['static.getclicky.com', 'in.getclicky.com'], globalVar: ['clicky', 'clicky_site_ids'] },
  { id: 'statcounter', name: 'StatCounter', category: 'Analytics', patterns: ['statcounter.com/counter/counter.js', 'cdn.statcounter.com'], globalVar: ['StatCounter'] },
  { id: 'oribi', name: 'Oribi', category: 'Analytics', patterns: ['oribi.io/sdk', 'cdn.oribi.io'], globalVar: ['ORIBI'] },

  // --- DATA PLATFORM additions ---
  { id: 'treasure_data', name: 'Treasure Data', category: 'Data Platform', patterns: ['js-sdk-assets.treasuredata.com', 'in.treasuredata.com'], globalVar: ['Treasure', 'TD'] },
  { id: 'blueconic', name: 'BlueConic', category: 'Data Platform', patterns: ['cdn.blueconic.net', 'bc.blueconic.net'], globalVar: ['blueConicClient'] },
  { id: 'lytics', name: 'Lytics', category: 'Data Platform', patterns: ['c.lytics.io/jstag.js', 'lytics.io'], globalVar: ['jstag'] },
  { id: 'snowplow', name: 'Snowplow', category: 'Data Platform', patterns: ['cdn.jsdelivr.net/npm/@snowplow/browser-tracker', 'snowplowanalytics.com'], globalVar: ['snowplow'] },

  // --- FRAMEWORK additions — deep coverage ---
  // Additional client-side frameworks
  { id: 'lit', name: 'Lit', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/lit@', 'cdn.jsdelivr.net/npm/lit-html', 'cdn.jsdelivr.net/npm/lit-element'], globalVar: ['LitElement'] },
  { id: 'polymer', name: 'Polymer', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/@polymer/polymer', 'polygit.org/components/polymer/'], globalVar: ['Polymer'] },
  { id: 'riot', name: 'Riot.js', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/riot@', 'cdnjs.cloudflare.com/ajax/libs/riot'], globalVar: ['riot'] },
  { id: 'inferno', name: 'Inferno', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/inferno@', 'cdnjs.cloudflare.com/ajax/libs/inferno'], globalVar: ['Inferno'] },
  { id: 'aurelia', name: 'Aurelia', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/aurelia-bootstrapper', 'cdn.jsdelivr.net/npm/aurelia-pal'], globalVar: ['au'] },
  { id: 'marko', name: 'Marko', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/marko', 'marko.js.org'], globalVar: [] },
  // Mobile/hybrid frameworks
  { id: 'ionic', name: 'Ionic', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/@ionic/core', 'cdn.jsdelivr.net/npm/@ionic/core@', 'ionic.io/'], globalVar: ['Ionic'] },
  { id: 'capacitor', name: 'Capacitor', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/@capacitor/core', 'capacitorjs.com'], globalVar: ['Capacitor'] },
  { id: 'cordova', name: 'Apache Cordova', category: 'Framework', patterns: ['cordova.js', '/cordova_plugins.js'], globalVar: ['cordova', 'PhoneGap'] },
  { id: 'flutter_web', name: 'Flutter Web', category: 'Framework', patterns: ['flutter.js', 'main.dart.js', 'flutter_service_worker.js'], globalVar: ['_flutter'] },
  { id: 'react_native_web', name: 'React Native Web', category: 'Framework', patterns: ['react-native-web', 'rnw-bundle'], globalVar: [] },
  // Server-rendered / backend-rendered
  { id: 'rails_turbo', name: 'Ruby on Rails (Turbo)', category: 'Framework', patterns: ['/packs/js/application', 'data-turbolinks-track', 'data-turbo-track', '/assets/application-'], globalVar: ['Turbolinks'] },
  { id: 'aspnet_webforms', name: 'ASP.NET WebForms', category: 'Framework', patterns: ['__VIEWSTATE', '__EVENTVALIDATION', 'WebForms.js'], globalVar: [] },
  { id: 'aspnet_mvc', name: 'ASP.NET MVC', category: 'Framework', patterns: ['/bundles/jquery', '/bundles/modernizr', '__RequestVerificationToken'], globalVar: [] },
  { id: 'laravel_mix', name: 'Laravel', category: 'Framework', patterns: ['/js/app.js', 'laravel-echo.js', 'vendor/laravel/'], globalVar: [] },
  { id: 'coldfusion', name: 'ColdFusion', category: 'Framework', patterns: ['/CFIDE/scripts/ajax/', 'cfjs/cfajax.js', '/CFIDE/'], globalVar: [] },
  { id: 'joomla_framework', name: 'Joomla Framework', category: 'Framework', patterns: ['/media/system/js/core.js', '/media/jui/js/jquery.min.js'], globalVar: ['Joomla'] },
  // Meta-frameworks
  { id: 'sveltekit', name: 'SvelteKit', category: 'Framework', patterns: ['/_app/immutable/chunks/', '/_app/version.json'], globalVar: [] },
  { id: 'deno_fresh', name: 'Deno Fresh', category: 'Framework', patterns: ['/_fresh/js/', '/_fresh/static/'], globalVar: [] },
  { id: 'analog_js', name: 'Analog.js', category: 'Framework', patterns: ['analogjs.org', '/_analog/'], globalVar: [] },
  { id: 'qwik_city', name: 'Qwik City', category: 'Framework', patterns: ['/q-data.json', '/build/q-manifest.json'], globalVar: [] },
  { id: 'tanstack_start', name: 'TanStack Start', category: 'Framework', patterns: ['/__vite/browser/', 'tanstack.com'], globalVar: [] },
  // Utility / hybrid patterns
  { id: 'alpine_morph', name: 'Alpine.js (Morph)', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/@alpinejs/morph', 'cdn.jsdelivr.net/npm/@alpinejs/focus'], globalVar: ['Alpine'] },
  { id: 'inertiajs', name: 'Inertia.js', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/@inertiajs/core', 'cdn.jsdelivr.net/npm/@inertiajs/react'], globalVar: ['Inertia'] },
  { id: 'livewire', name: 'Laravel Livewire', category: 'Framework', patterns: ['/livewire/livewire.js', '/vendor/livewire/'], globalVar: ['Livewire'] },
  { id: 'phoenix_liveview', name: 'Phoenix LiveView', category: 'Framework', patterns: ['/js/app.js', 'phoenix.js', 'live_socket'], globalVar: ['liveSocket'] },
  { id: 'django_htmx', name: 'Django + HTMX', category: 'Framework', patterns: ['django-htmx', 'django_htmx'], globalVar: [] },
  { id: 'hotwire_turbo', name: 'Turbo (Hotwire)', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/@hotwired/turbo', 'turbo.hotwired.dev'], globalVar: ['Turbo'] },
  { id: 'stimulus_js', name: 'Stimulus', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/@hotwired/stimulus', 'stimulus.hotwire.dev'], globalVar: ['Stimulus'] },
  { id: 'blitz_js', name: 'Blitz.js', category: 'Framework', patterns: ['blitzjs.com', '/__blitz/'], globalVar: [] },
  { id: 'redwoodjs', name: 'RedwoodJS', category: 'Framework', patterns: ['redwoodjs.com', '/redwood/router'], globalVar: [] },
  { id: 'adonis_js', name: 'AdonisJS', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/@adonisjs/', 'adonisjs.com'], globalVar: [] },
  { id: 'alpinejs_v2', name: 'Alpine.js v2', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/alpinejs@2', 'unpkg.com/alpinejs@2'], globalVar: ['Alpine'] },
  { id: 'hyperscript', name: '_hyperscript', category: 'Framework', patterns: ['unpkg.com/hyperscript.org', 'cdn.jsdelivr.net/npm/hyperscript.org'], globalVar: ['_hyperscript'] },

  // --- LIBRARY additions — comprehensive ---
  { id: 'socketio', name: 'Socket.io', category: 'Library', patterns: ['/socket.io/socket.io.js', 'cdn.jsdelivr.net/npm/socket.io-client'], globalVar: ['io'] },
  { id: 'pusher_js', name: 'Pusher', category: 'Library', patterns: ['js.pusher.com', 'cdn.jsdelivr.net/npm/pusher-js'], globalVar: ['Pusher'] },
  { id: 'hammerjs', name: 'Hammer.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/hammer.js', 'cdn.jsdelivr.net/npm/hammerjs'], globalVar: ['Hammer'] },
  { id: 'handlebars', name: 'Handlebars.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/handlebars.js', 'cdn.jsdelivr.net/npm/handlebars'], globalVar: ['Handlebars'] },
  { id: 'markedjs', name: 'Marked.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/marked', 'cdnjs.cloudflare.com/ajax/libs/marked'], globalVar: ['marked'] },
  { id: 'highlightjs', name: 'Highlight.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/highlight.js', 'cdn.jsdelivr.net/gh/highlightjs/'], globalVar: ['hljs'] },
  { id: 'animejs', name: 'Anime.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/animejs', 'cdn.jsdelivr.net/npm/animejs'], globalVar: ['anime'] },
  { id: 'typedjs', name: 'Typed.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/typed.js', 'cdnjs.cloudflare.com/ajax/libs/typed.js'], globalVar: ['Typed'] },
  { id: 'tinymce', name: 'TinyMCE', category: 'Library', patterns: ['cdn.tiny.cloud/1/', 'cdnjs.cloudflare.com/ajax/libs/tinymce'], globalVar: ['tinyMCE', 'tinymce'] },
  { id: 'ckeditor', name: 'CKEditor', category: 'Library', patterns: ['cdn.ckeditor.com', 'ckeditor.com/ckeditor5/'], globalVar: ['CKEDITOR', 'ClassicEditor'] },
  { id: 'quill', name: 'Quill Editor', category: 'Library', patterns: ['cdn.quilljs.com', 'cdn.jsdelivr.net/npm/quill'], globalVar: ['Quill'] },
  { id: 'highcharts', name: 'Highcharts', category: 'Library', patterns: ['code.highcharts.com', 'cdn.jsdelivr.net/npm/highcharts'], globalVar: ['Highcharts'] },
  { id: 'echarts', name: 'Apache ECharts', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/echarts', 'cdnjs.cloudflare.com/ajax/libs/echarts'], globalVar: ['echarts'] },
  { id: 'apexcharts', name: 'ApexCharts', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/apexcharts', 'cdnjs.cloudflare.com/ajax/libs/apexcharts'], globalVar: ['ApexCharts'] },
  { id: 'vegajs', name: 'Vega', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/vega@', 'cdn.jsdelivr.net/npm/vega-lite@'], globalVar: ['vega', 'vegaEmbed'] },
  { id: 'pixi', name: 'PixiJS', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/pixi.js', 'cdnjs.cloudflare.com/ajax/libs/pixi.js'], globalVar: ['PIXI'] },
  { id: 'babylonjs', name: 'Babylon.js', category: 'Library', patterns: ['cdn.babylonjs.com/babylon.js', 'cdnjs.cloudflare.com/ajax/libs/babylonjs'], globalVar: ['BABYLON'] },
  { id: 'fabricjs', name: 'Fabric.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/fabric.js', 'cdn.jsdelivr.net/npm/fabric'], globalVar: ['fabric'] },
  { id: 'sortablejs', name: 'SortableJS', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/sortablejs', 'cdnjs.cloudflare.com/ajax/libs/Sortable'], globalVar: ['Sortable'] },
  { id: 'dropzone', name: 'Dropzone.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/dropzone', 'cdn.jsdelivr.net/npm/dropzone'], globalVar: ['Dropzone'] },
  { id: 'filepond', name: 'FilePond', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/filepond', 'unpkg.com/filepond/'], globalVar: ['FilePond'] },
  { id: 'trix', name: 'Trix Editor', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/trix', 'unpkg.com/trix/'], globalVar: ['Trix'] },
  { id: 'glidejs', name: 'Glide.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/@glidejs/glide'], globalVar: ['Glide'] },
  { id: 'select2', name: 'Select2', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/select2', 'cdnjs.cloudflare.com/ajax/libs/select2'], globalVar: ['jQuery.fn.select2', 'select2'] },
  { id: 'flatpickr', name: 'Flatpickr', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/flatpickr', 'cdnjs.cloudflare.com/ajax/libs/flatpickr'], globalVar: ['flatpickr'] },
  { id: 'sheetjs', name: 'SheetJS', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/xlsx', 'cdnjs.cloudflare.com/ajax/libs/xlsx'], globalVar: ['XLSX'] },
  { id: 'jspdf', name: 'jsPDF', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/jspdf', 'cdn.jsdelivr.net/npm/jspdf'], globalVar: ['jsPDF', 'jspdf'] },
  { id: 'pdfjs', name: 'PDF.js', category: 'Library', patterns: ['mozilla.github.io/pdf.js/build/pdf.js', 'cdn.jsdelivr.net/npm/pdfjs-dist'], globalVar: ['pdfjsLib', 'PDFJS'] },
  { id: 'qrcodejs', name: 'QRCode.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/qrcode', 'cdnjs.cloudflare.com/ajax/libs/qrcodejs'], globalVar: ['QRCode'] },
  { id: 'html2canvas', name: 'html2canvas', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/html2canvas', 'cdnjs.cloudflare.com/ajax/libs/html2canvas'], globalVar: ['html2canvas'] },
  { id: 'clipboard_js', name: 'Clipboard.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/clipboard', 'cdnjs.cloudflare.com/ajax/libs/clipboard.js'], globalVar: ['ClipboardJS'] },
  { id: 'papaparse', name: 'Papa Parse', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/papaparse', 'cdnjs.cloudflare.com/ajax/libs/PapaParse'], globalVar: ['Papa'] },
  { id: 'datatables', name: 'DataTables', category: 'Library', patterns: ['cdn.datatables.net', 'cdn.jsdelivr.net/npm/datatables'], globalVar: ['DataTable'] },
  { id: 'aggrid', name: 'AG Grid', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/ag-grid-community', 'cdnjs.cloudflare.com/ajax/libs/ag-grid'], globalVar: ['agGrid'] },
  { id: 'fullcalendar', name: 'FullCalendar', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/fullcalendar', 'cdnjs.cloudflare.com/ajax/libs/fullcalendar'], globalVar: ['FullCalendar'] },
  { id: 'tensorflowjs', name: 'TensorFlow.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/@tensorflow/tfjs', 'cdn.jsdelivr.net/npm/@tensorflow-models/'], globalVar: ['tf'] },
  { id: 'howlerjs', name: 'Howler.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/howler', 'cdn.jsdelivr.net/npm/howler'], globalVar: ['Howler'] },
  { id: 'wavesurfer', name: 'WaveSurfer.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/wavesurfer.js', 'cdn.jsdelivr.net/npm/wavesurfer.js'], globalVar: ['WaveSurfer'] },
  { id: 'konvajs', name: 'Konva.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/konva', 'cdnjs.cloudflare.com/ajax/libs/konva'], globalVar: ['Konva'] },
  { id: 'interactjs', name: 'Interact.js', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/interact.js', 'cdnjs.cloudflare.com/ajax/libs/interact.js'], globalVar: ['interact'] },
  { id: 'zepto', name: 'Zepto.js', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/zepto.js', 'zeptojs.com/zepto.min.js'], globalVar: ['Zepto'] },
  { id: 'mootools', name: 'MooTools', category: 'Library', patterns: ['cdnjs.cloudflare.com/ajax/libs/mootools', 'cdn.jsdelivr.net/npm/mootools'], globalVar: ['MooTools'] },
  { id: 'aframe', name: 'A-Frame (VR)', category: 'Library', patterns: ['aframe.io/releases', 'cdn.jsdelivr.net/npm/aframe'], globalVar: ['AFRAME'] },
  { id: 'phasergame', name: 'Phaser', category: 'Library', patterns: ['cdn.jsdelivr.net/npm/phaser', 'cdnjs.cloudflare.com/ajax/libs/phaser'], globalVar: ['Phaser'] },

  // --- MAPS additions ---
  { id: 'arcgis', name: 'ArcGIS Maps', category: 'Maps', patterns: ['js.arcgis.com', 'cdn.arcgis.com/arcgis/rest/'], globalVar: ['require', '__esri'] },
  { id: 'bing_maps', name: 'Bing Maps', category: 'Maps', patterns: ['www.bing.com/api/maps/mapcontrol', 'dev.virtualearth.net'], globalVar: ['Microsoft'] },
  { id: 'yandex_maps', name: 'Yandex Maps', category: 'Maps', patterns: ['api-maps.yandex.ru', 'api.maps.yandex.ru'], globalVar: ['ymaps'] },
  { id: 'apple_mapkit', name: 'Apple MapKit JS', category: 'Maps', patterns: ['cdn.apple-mapkit.com/mk/'], globalVar: ['mapkit'] },
  { id: 'what3words', name: 'what3words', category: 'Maps', patterns: ['cdn.what3words.com', 'api.what3words.com/v3/'], globalVar: ['what3words'] },

  // --- SECURITY additions ---
  { id: 'fingerprintjs', name: 'FingerprintJS', category: 'Security', patterns: ['fpjscdn.net', 'cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs'], globalVar: ['FingerprintJS', 'fpjs'] },
  { id: 'arkose_labs', name: 'Arkose Labs', category: 'Security', patterns: ['client-api.arkoselabs.com', 'api.arkoselabs.com'], globalVar: ['ArkoseEnforcement'] },
  { id: 'imperva', name: 'Imperva', category: 'Security', patterns: ['incapsula.com', '/_Incapsula_Resource'], globalVar: ['_imp_apg_r_'] },
  { id: 'akamai_bot', name: 'Akamai Bot Manager', category: 'Security', patterns: ['/_akam/ak_bmsc'], globalVar: ['bmak'] },
  { id: 'aws_cognito', name: 'AWS Cognito', category: 'Security', patterns: ['cognito-identity.amazonaws.com', 'cdn.jsdelivr.net/npm/amazon-cognito-identity-js'], globalVar: ['AmazonCognitoIdentity'] },

  // --- CHAT additions ---
  { id: 'jivochat', name: 'JivoChat', category: 'Chat', patterns: ['code.jivosite.com/widget', 'cdn.jivosite.com'], globalVar: ['jivo_config'] },
  { id: 'chatwoot', name: 'Chatwoot', category: 'Chat', patterns: ['cdn.chatwoot.com/v3/packs/js/sdk.js', 'app.chatwoot.com/packs/js/sdk.js'], globalVar: ['chatwoot'] },
  { id: 'rocketchat', name: 'Rocket.Chat', category: 'Chat', patterns: ['cdn.jsdelivr.net/npm/@rocket.chat/livechat', 'rocketchat-livechat.min.js'], globalVar: ['RocketChat'] },
  { id: 'landbot', name: 'Landbot', category: 'Chat', patterns: ['static.landbot.io/landbot-3/landbot-3.0.0.js', 'landbot.io/widgets/'], globalVar: ['LandbotLivechat'] },
  { id: 'botpress_chat', name: 'Botpress', category: 'Chat', patterns: ['cdn.botpress.cloud/webchat/v1/inject.js', 'cdn.botpress.cloud/webchat/v2/inject.js'], globalVar: [] },
  { id: 'voiceflow_chat', name: 'Voiceflow', category: 'Chat', patterns: ['cdn.voiceflow.com/widget/latest.min.js', 'cdn.voiceflow.com/widget-next/'], globalVar: ['voiceflow'] },
  { id: 'typebot', name: 'Typebot', category: 'Chat', patterns: ['cdn.typebot.io/js/v0/typebot.js', 'cdn.typebot.io/js/v0.3/'], globalVar: [] },
  { id: 'customgpt', name: 'CustomGPT.ai', category: 'Chat', patterns: ['widget.customgpt.ai', 'cdn.customgpt.ai'], globalVar: [] },
  { id: 'comm100', name: 'Comm100', category: 'Chat', patterns: ['cloudserver.comm100.com/livechatoperator/', 'cdn.comm100.com'], globalVar: [] },

  // --- REVIEWS additions ---
  { id: 'trustindex', name: 'Trustindex', category: 'Reviews', patterns: ['cdn.trustindex.io', 'trustindex.io/ti-widget'], globalVar: ['TrustindexWidget'] },
  { id: 'elfsight', name: 'Elfsight', category: 'Reviews', patterns: ['static.elfsight.com/platform/platform.js', 'apps.elfsight.com'], globalVar: ['eapps'] },
  { id: 'g2_widget', name: 'G2 Reviews', category: 'Reviews', patterns: ['www.g2.com/static/assets/widget.js', 'cdn.g2.com/widget/'], globalVar: [] },
  { id: 'capterra_widget', name: 'Capterra Reviews', category: 'Reviews', patterns: ['cdn.capterra.com', 'capterra.com/badge/'], globalVar: [] },
  { id: 'shopper_approved', name: 'Shopper Approved', category: 'Reviews', patterns: ['api.shopperprovedge.com', 'shopperapproved.com/seals/'], globalVar: [] },
  { id: 'provenexpert', name: 'ProvenExpert', category: 'Reviews', patterns: ['cdn.provenexpert.com', 'provenexpert.com/widget/'], globalVar: [] },

  // --- AFFILIATE additions ---
  { id: 'awin', name: 'Awin', category: 'Affiliate', patterns: ['tag.awin.com/merchant', 'productwidgets.awin.com'], globalVar: ['AWIN'] },
  { id: 'rakuten_ads', name: 'Rakuten Advertising', category: 'Affiliate', patterns: ['tag.rmp.rakuten.com', 'rakutenmarketing.com/beacon.js'], globalVar: [] },
  { id: 'cj_affiliate', name: 'CJ Affiliate', category: 'Affiliate', patterns: ['www.anrdoezrs.net', 'www.tkqlhce.com', 'www.jdoqocy.com'], globalVar: [] },
  { id: 'pepperjam', name: 'Pepperjam', category: 'Affiliate', patterns: ['t.pepperjamnetwork.com', 'pjtra.com'], globalVar: [] },
  { id: 'skimlinks', name: 'Skimlinks', category: 'Affiliate', patterns: ['s.skimresources.com', 'cdn.skimresources.com'], globalVar: ['skimlinks_account_id'] },
  { id: 'viglink', name: 'VigLink', category: 'Affiliate', patterns: ['cdn.viglink.com/api/vl.js', 'viglink.com'], globalVar: ['VigLink'] },

  // --- COMMUNITY additions ---
  { id: 'discord_widget', name: 'Discord Widget', category: 'Community', patterns: ['discord.com/widget', 'widgetbot.io/mount'], globalVar: [] },
  { id: 'vanilla_forums', name: 'Vanilla Forums', category: 'Community', patterns: ['vanillaforums.com', 'vanillaforums.org/js/'], globalVar: ['gdn'] },
  { id: 'khoros', name: 'Khoros', category: 'Community', patterns: ['lithium.com/lithiumLSW', 'lithiumcloud.com'], globalVar: ['LiBodyEndLoaded'] },

  // --- CONVERSIONS additions ---
  { id: 'convertflow', name: 'ConvertFlow', category: 'Conversions', patterns: ['cdn.convertflow.com', 'app.convertflow.com/assets/website.js'], globalVar: ['cf', '__cf_page_visitor'] },
  { id: 'convertbox', name: 'ConvertBox', category: 'Conversions', patterns: ['cdn.convertbox.com', 'convertbox.com/api/'], globalVar: ['ConvertBox'] },
  { id: 'sleeknote', name: 'Sleeknote', category: 'Conversions', patterns: ['sleeknote.com/snippet.js', 'cdn.sleeknote.com'], globalVar: ['Sleeknote'] },
  { id: 'picreel', name: 'Picreel', category: 'Conversions', patterns: ['cdn.picreel.com/picreel.js', 'picreel.com/script/'], globalVar: [] },
  { id: 'getsitecontrol', name: 'Getsitecontrol', category: 'Conversions', patterns: ['l.getsitecontrol.com', 'getsitecontrol.com'], globalVar: [] },

  // --- E-COMMERCE additions ---
  { id: 'bold_commerce', name: 'Bold Commerce', category: 'E-Commerce', patterns: ['cdn.boldapps.net', 'boldcommerce.com/js/', 'bold.re'], globalVar: [] },
  { id: 'rebuy', name: 'Rebuy Engine', category: 'E-Commerce', patterns: ['cdn.rebuyengine.com', 'rebuyengine.com/storefront/'], globalVar: [] },
  { id: 'limespot', name: 'LimeSpot', category: 'E-Commerce', patterns: ['limespot.io/assets/', 'cdn.limespot.io'], globalVar: [] },
  { id: 'thrivecart', name: 'ThriveCart', category: 'E-Commerce', patterns: ['thrivecart.com/checkout/product/', 'thrivecart.com/checkout/'], globalVar: [] },
  { id: 'samcart', name: 'SamCart', category: 'E-Commerce', patterns: ['samcart.com/checkout/', 'cdn.samcart.com'], globalVar: [] },
  { id: 'payhip', name: 'Payhip', category: 'E-Commerce', patterns: ['payhip.com/scripts/', 'payhip.com/checkout/'], globalVar: [] },
  { id: 'bigcartel', name: 'Big Cartel', category: 'E-Commerce', patterns: ['bigcartel.com/assets/', 'bigcartel.net'], globalVar: ['BigCartel'] },
  { id: 'sellfy', name: 'Sellfy', category: 'E-Commerce', patterns: ['sellfy.com/embed/', 'cdn.sellfy.com'], globalVar: [] },
  { id: 'sendowl', name: 'SendOwl', category: 'E-Commerce', patterns: ['app.sendowl.com', 'cdn.sendowl.com'], globalVar: [] },
  { id: 'netsuite', name: 'NetSuite Commerce', category: 'E-Commerce', patterns: ['system.netsuite.com', 'nlapi', '/app/site/hosting/'], globalVar: ['nlapi'] },

  // --- PAYMENTS additions ---
  { id: 'zuora', name: 'Zuora', category: 'Payments', patterns: ['static-na.zuora.com', 'apisandbox.zuora.com/apps/PublicPaymentPage/'], globalVar: ['Z'] },
  { id: 'authorize_net', name: 'Authorize.net', category: 'Payments', patterns: ['js.authorize.net/v1/Accept.js', 'js.authorize.net/v3/AcceptUI.js'], globalVar: ['Accept'] },
  { id: 'cybersource', name: 'Cybersource', category: 'Payments', patterns: ['flex.cybersource.com/cybersource/assets/', 'testflex.cybersource.com'], globalVar: [] },
  { id: 'verifone_2co', name: '2Checkout (Verifone)', category: 'Payments', patterns: ['www.2checkout.com/static/checkout/', 'secure.2checkout.com'], globalVar: ['TwoCoInlineCart'] },
  { id: 'plaid', name: 'Plaid', category: 'Payments', patterns: ['cdn.plaid.com/link/v2/stable/link-initialize.js', 'cdn.plaid.com/link/stable/'], globalVar: ['Plaid'] },
  { id: 'flutterwave', name: 'Flutterwave', category: 'Payments', patterns: ['cdn.flutterwave.com', 'inline.flutterwavehosted.com'], globalVar: ['FlutterwaveCheckout'] },

  // --- SUPPORT additions ---
  { id: 'zoho_desk', name: 'Zoho Desk', category: 'Support', patterns: ['desk.zoho.com/portal/', 'desk.zoho.eu/portal/'], globalVar: [] },
  { id: 'happyfox', name: 'HappyFox', category: 'Support', patterns: ['happyfox.com/chat/embed/', 'cdn.happyfox.com'], globalVar: [] },

  // --- MARKETING AUTO additions ---
  { id: 'salesmanago', name: 'SALESmanago', category: 'Marketing Auto', patterns: ['app1.salesmanago.pl/static/', 'app3.salesmanago.com/'], globalVar: ['_smTracker'] },
  { id: 'sharpspring', name: 'SharpSpring', category: 'Marketing Auto', patterns: ['sharpspring.com/lead/js/', 'ds.sharpspring.com'], globalVar: [] },
  { id: 'act_on', name: 'Act-On', category: 'Marketing Auto', patterns: ['actonsoftware.com/acton/bn/', 'actonsoftware.com/acton/fs/'], globalVar: [] },
  { id: 'kartra', name: 'Kartra', category: 'Marketing Auto', patterns: ['capi.kartra.com/js/kartra_tracking.js', 'kartra.com/tracker'], globalVar: [] },
  { id: 'moosend_auto', name: 'Moosend', category: 'Marketing Auto', patterns: ['resources.moosend.com/trk/js/', 'cdn.moosend.com/trk/'], globalVar: [] },

  // --- EMAIL additions ---
  { id: 'mailmodo', name: 'Mailmodo', category: 'Email', patterns: ['cdn.mailmodo.com/widgets/', 'app.mailmodo.com/embed/'], globalVar: [] },
  { id: 'emailoctopus', name: 'EmailOctopus', category: 'Email', patterns: ['emailoctopus.com/widgets/', 'cdn.emailoctopus.com'], globalVar: [] },

  // --- PUSH NOTIFICATIONS additions ---
  { id: 'pushengage', name: 'PushEngage', category: 'Push Notifications', patterns: ['cdn.pushengage.com/PushEngage.js', 'pushengageassetscdn.com'], globalVar: ['pushEngage', '_pe'] },

  // --- NO-CODE additions ---
  { id: 'stacker', name: 'Stacker', category: 'No-Code', patterns: ['app.stackerhq.com', 'cdn.stackerhq.com'], globalVar: [] },
  { id: 'airtable_embed', name: 'Airtable Embed', category: 'No-Code', patterns: ['static.airtable.com/js/shared/airtableEmbed.js', 'airtable.com/embed/'], globalVar: [] },
  { id: 'notion_embed', name: 'Notion Embed', category: 'No-Code', patterns: ['www.notion.so/embed', 'notion.site/'], globalVar: [] },
  { id: 'figma_embed', name: 'Figma Embed', category: 'No-Code', patterns: ['embed.figma.com', 'www.figma.com/embed'], globalVar: [] },

  // --- CMS additions ---
  { id: 'sitecore', name: 'Sitecore', category: 'CMS', patterns: ['/sitecore/shell/', '/sitecore/scripts/', 'sitecore.net/SitecoreJS'], globalVar: ['Sitecore'] },
  { id: 'dotcms', name: 'dotCMS', category: 'CMS', patterns: ['/api/v1/page/json/', '/dotAdmin/', 'dotcms.com'], globalVar: [] },
  { id: 'kentico', name: 'Kentico', category: 'CMS', patterns: ['/CMSFiles/', '/CMSPages/', 'kentico.com'], globalVar: [] },
  { id: 'sitefinity_cms', name: 'Sitefinity', category: 'CMS', patterns: ['/sfres/', '/SFRes/', '/sitefinity/'], globalVar: [] },
  { id: 'episerver', name: 'Optimizely CMS', category: 'CMS', patterns: ['/EPiServer/', '/episerver/cms/'], globalVar: ['epi'] },
  { id: 'strapi_pattern', name: 'Strapi', category: 'CMS', patterns: ['/strapi/admin/', '/api/strapi/', '/_strapi/'], globalVar: [] },

  // --- STORAGE additions ---
  { id: 'transloadit', name: 'Transloadit / Uppy', category: 'Storage', patterns: ['assets.transloadit.com/v3/uppy.min.js', 'cdn.jsdelivr.net/npm/@uppy/core'], globalVar: ['Uppy'] },

  // --- ADS additions ---
  { id: 'trade_desk', name: 'The Trade Desk', category: 'Ads', patterns: ['js.adsrvr.org', 'insight.adsrvr.org'], globalVar: ['TTDUniversalPixelApi'] },
  { id: 'appnexus', name: 'Xandr (AppNexus)', category: 'Ads', patterns: ['secure.adnxs.com', 'ib.adnxs.com'], globalVar: [] },
  { id: 'yahoo_ads', name: 'Yahoo Ads (Gemini)', category: 'Ads', patterns: ['s.yimg.com/wi/ytc.js', 'udc.yahoo.com/'], globalVar: ['dotq'] },

  // --- RETARGETING additions ---
  { id: 'rtb_house', name: 'RTB House', category: 'Retargeting', patterns: ['tags.rtbhouse.com', 'creatives.rtbhouse.com'], globalVar: [] },
  { id: 'steelhouse', name: 'SteelHouse', category: 'Retargeting', patterns: ['ads.steelhousemedia.com', 'steelhouse.com/shpix.js'], globalVar: [] },

  // --- COMPLIANCE additions ---
  { id: 'didomi', name: 'Didomi', category: 'Compliance', patterns: ['sdk.privacy-center.org', 'cdn.privacy-center.org'], globalVar: ['Didomi', 'didomiOnReady'] },

  // --- SCHEDULING additions ---
  { id: 'oncehub', name: 'OnceHub', category: 'Scheduling', patterns: ['go.oncehub.com', 'meet.oncehub.com'], globalVar: [] },
  { id: 'hubspot_meetings', name: 'HubSpot Meetings', category: 'Scheduling', patterns: ['meetings.hubspot.com', 'meetings-eu.hubspot.com'], globalVar: [] },
  { id: 'appointlet', name: 'Appointlet', category: 'Scheduling', patterns: ['cdn.appointlet.com', 'app.appointlet.com/b/'], globalVar: [] },

  // --- COMMENTS additions ---
  { id: 'commento', name: 'Commento', category: 'Comments', patterns: ['cdn.commento.io', 'commento.io/js/commento.js'], globalVar: [] },
  { id: 'utterances', name: 'Utterances', category: 'Comments', patterns: ['utteranc.es/client.js'], globalVar: [] },
  { id: 'giscus', name: 'Giscus', category: 'Comments', patterns: ['giscus.app/client.js', 'cdn.giscus.app'], globalVar: [] },
  { id: 'remark42', name: 'Remark42', category: 'Comments', patterns: ['cdn.remark42.com', 'remark42.com/web/embed.js'], globalVar: ['remark_config'] },

  // --- FORMS additions ---
  { id: 'gravity_forms', name: 'Gravity Forms', category: 'Forms', patterns: ['/wp-content/plugins/gravityforms/', '/gfembed/'], globalVar: ['gform', 'gforms_confirmation_message'] },
  { id: 'fluent_forms', name: 'Fluent Forms', category: 'Forms', patterns: ['/wp-content/plugins/fluentform/', '/fluentform/'], globalVar: [] },
  { id: 'wpforms', name: 'WPForms', category: 'Forms', patterns: ['/wp-content/plugins/wpforms/', '/wp-content/plugins/wpforms-lite/'], globalVar: ['wpformsSettings'] },
  { id: 'formidable', name: 'Formidable Forms', category: 'Forms', patterns: ['/wp-content/plugins/formidable/'], globalVar: [] },

  // --- A/B TESTING additions ---
  { id: 'intellimize', name: 'Intellimize', category: 'A/B Testing', patterns: ['cdn.intellimize.co', 'intellimize.co/snippet.js'], globalVar: [] },

  // --- AUTOMATION additions ---
  { id: 'tray_io', name: 'Tray.io', category: 'Automation', patterns: ['embedded.tray.io', 'tray.io/embed/'], globalVar: [] },

  // --- CSS additions ---
  { id: 'open_props', name: 'Open Props', category: 'CSS', patterns: ['cdn.jsdelivr.net/npm/open-props', 'unpkg.com/open-props/'], globalVar: [] },
  { id: 'daisyui', name: 'DaisyUI', category: 'CSS', patterns: ['cdn.jsdelivr.net/npm/daisyui', 'cdn.tailwindcss.com/daisyui'], globalVar: [] },

  // --- SALES INTELLIGENCE additions ---

  // --- CUSTOMER SUCCESS additions ---
  { id: 'totango', name: 'Totango', category: 'Customer Success', patterns: ['sdk.totango.com', 'tracker.totango.com'], globalVar: ['totango'] },
  { id: 'vitally', name: 'Vitally', category: 'Customer Success', patterns: ['cdn.vitally.io', 'vitally.io/js/track.js'], globalVar: ['Vitally'] },

  // --- COMMUNICATIONS additions ---

  // --- COURSES additions ---
  { id: 'academy_of_mine', name: 'Academy Of Mine', category: 'Courses', patterns: ['academyofmine.com', 'cdn.academyofmine.com'], globalVar: [] },

  // --- COMMUNITY additions ---

  // --- NATIVE ADS additions ---
  { id: 'mgid', name: 'MGID', category: 'Native Ads', patterns: ['jsc.mgid.com', 'jsc.t.mgid.com'], globalVar: [] },
  { id: 'revcontent', name: 'RevContent', category: 'Native Ads', patterns: ['labs-cdn.revcontent.com', 'trends.revcontent.com'], globalVar: [] },
  { id: 'sharethrough_native', name: 'Sharethrough', category: 'Native Ads', patterns: ['native.sharethrough.com/assets/tag.js', 'cdn.sharethrough.com'], globalVar: [] },
  { id: 'dianomi', name: 'Dianomi', category: 'Native Ads', patterns: ['api.dianomi.com', 'cdn.dianomi.com'], globalVar: [] },

  // --- REFERRAL additions ---

  // --- PERSONALIZATION additions ---

  // --- SURVEYS additions ---
  { id: 'qualaroo', name: 'Qualaroo', category: 'Surveys', patterns: ['ku.qualaroo.com', 'app.qualaroo.com/qualaroo.js'], globalVar: ['_kiq'] },
  { id: 'forsta', name: 'Forsta (Confirmit)', category: 'Surveys', patterns: ['survey.confirmit.com', 'app.forsta.com'], globalVar: [] },

  // --- SOCIAL PROOF additions ---

  // --- FEATURE FLAGS additions ---
  { id: 'unleash_ff', name: 'Unleash', category: 'Feature Flags', patterns: ['app.unleash-hosted.com', 'getunleash.io'], globalVar: ['UnleashClient'] },
  { id: 'statsig_ff', name: 'Statsig', category: 'Feature Flags', patterns: ['cdn.jsdelivr.net/npm/statsig-js', 'featuregates.org'], globalVar: ['statsig'] },

  // --- FEEDBACK additions ---

  // --- DATABASE addition ---

  // --- LIVE DEMO additions ---

  // --- STATUS PAGES additions ---

  // --- SEO additions ---

  // --- ACCESSIBILITY additions ---

  // --- TRANSLATION additions ---

  // --- RECRUITING additions ---
  { id: 'workable_jobs', name: 'Workable', category: 'Recruiting', patterns: ['apply.workable.com', 'jobs.workable.com'], globalVar: [] },

  // --- DOCUMENTATION additions ---

  // --- SOCIAL SHARING additions ---

  // --- USER RESEARCH additions ---
  { id: 'lookback_io', name: 'Lookback', category: 'User Research', patterns: ['lookback.io/embed', 'cdn.lookback.io'], globalVar: [] },

  // --- HOSTING additions ---
  { id: 'github_pages', name: 'GitHub Pages', category: 'Hosting', patterns: ['github.io', '.github.io/'], globalVar: [] },
  { id: 'gitlab_pages', name: 'GitLab Pages', category: 'Hosting', patterns: ['gitlab.io', '.gitlab.io/'], globalVar: [] },
  { id: 'cloudflare_pages', name: 'Cloudflare Pages', category: 'Hosting', patterns: ['.pages.dev/', 'cloudflare-pages.com'], globalVar: [] },
  { id: 'replit', name: 'Replit', category: 'Hosting', patterns: ['repl.co', 'replit.dev', 'replit.app'], globalVar: [] },
  { id: 'glitch_hosting', name: 'Glitch', category: 'Hosting', patterns: ['glitch.me', 'cdn.glitch.global'], globalVar: [] },
  { id: 'railway', name: 'Railway', category: 'Hosting', patterns: ['up.railway.app', 'railway.app'], globalVar: [] },
  { id: 'fly_io', name: 'Fly.io', category: 'Hosting', patterns: ['fly.dev', '.fly.io/'], globalVar: [] },
  { id: 'render_com', name: 'Render', category: 'Hosting', patterns: ['.onrender.com', 'cdn.onrender.com'], globalVar: [] },

  // --- LIBRARY additions ---
  { id: 'pubnub', name: 'PubNub', category: 'Library', patterns: ['cdn.pubnub.com', 'ps.pndsn.com', 'pubnub.com/sdk/javascript'], globalVar: ['PubNub'] },
  { id: 'ably', name: 'Ably', category: 'Library', patterns: ['cdn.ably.io/lib/ably.min.js', 'cdn.ably.com/lib/ably.min.js'], globalVar: ['Ably'] },
  { id: 'rive', name: 'Rive', category: 'Library', patterns: ['cdn.rive.app/runtime/latest/rive.min.js', 'unpkg.com/@rive-app/canvas'], globalVar: ['rive', 'Rive'] },
  { id: 'spline', name: 'Spline 3D', category: 'Library', patterns: ['unpkg.com/@splinetool/runtime', 'cdn.jsdelivr.net/npm/@splinetool/'], globalVar: [] },
  { id: 'lottiefiles', name: 'LottieFiles', category: 'Library', patterns: ['unpkg.com/@lottiefiles/lottie-player', 'cdn.lottiefiles.com', 'cdnjs.cloudflare.com/ajax/libs/bodymovin/'], globalVar: ['lottie', 'LottiePlayer'] },
  { id: 'embedly', name: 'Embedly', category: 'Library', patterns: ['cdn.embedly.com/widgets/platform.js', 'api.embed.ly'], globalVar: ['embedly'] },

  // --- FRAMEWORK additions ---
  { id: 'amp', name: 'AMP', category: 'Framework', patterns: ['cdn.ampproject.org/v0.js', 'cdn.ampproject.org/v0/', '⚡', 'data-ampdevmode'], globalVar: ['AMP'] },
  { id: 'htmx', name: 'HTMX', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/htmx.org', 'unpkg.com/htmx.org', 'hx-get=', 'hx-post=', 'hx-trigger='], globalVar: ['htmx'] },
  { id: 'alpine', name: 'Alpine.js', category: 'Framework', patterns: ['cdn.jsdelivr.net/npm/alpinejs', 'unpkg.com/alpinejs', 'x-data=', 'x-bind=', 'x-on:click'], globalVar: ['Alpine'] },

  // --- MAPS additions ---
  { id: 'maplibre', name: 'MapLibre GL', category: 'Maps', patterns: ['cdn.jsdelivr.net/npm/maplibre-gl', 'unpkg.com/maplibre-gl/'], globalVar: ['maplibregl'] },
  { id: 'maptiler', name: 'MapTiler', category: 'Maps', patterns: ['cdn.maptiler.com/maptiler-sdk-js/', 'api.maptiler.com/maps/'], globalVar: ['maptilersdk'] },

  // --- SESSION REPLAY additions ---
  { id: 'highlight_run', name: 'Highlight.run', category: 'Session Replay', patterns: ['cdn.highlight.run/index.js', 'pub.highlight.run/', 'highlight.run/init'], globalVar: ['H', 'firstload'] },

  // --- ERROR TRACKING additions ---
  { id: 'glitchtip', name: 'GlitchTip', category: 'Error Tracking', patterns: ['cdn.jsdelivr.net/npm/@sentry/browser', 'glitchtip.com/js/', '/glitchtip.js'], globalVar: [] },
  { id: 'honeybadger', name: 'Honeybadger', category: 'Error Tracking', patterns: ['js.honeybadger.io/v', 'cdn.honeybadger.io', 'Honeybadger.configure'], globalVar: ['Honeybadger'] },

  // --- FEEDBACK additions ---
  { id: 'usersnap', name: 'Usersnap', category: 'Feedback', patterns: ['widget.usersnap.com/global/load/', 'cdn.usersnap.com'], globalVar: [] },

  // --- SECURITY additions ---
  { id: 'ory', name: 'Ory', category: 'Security', patterns: ['sdk.ory.sh', 'cdn.jsdelivr.net/npm/@ory/client', '.projects.oryapis.com'], globalVar: [] },
  { id: 'keycloak', name: 'Keycloak', category: 'Security', patterns: ['/auth/js/keycloak.js', 'cdn.jsdelivr.net/npm/keycloak-js'], globalVar: ['Keycloak'] },

  // --- VIDEO additions ---
  { id: 'riverside', name: 'Riverside.fm', category: 'Video', patterns: ['riverside.fm/embed', 'share.riverside.fm'], globalVar: [] },
  { id: 'streamyard', name: 'StreamYard', category: 'Video', patterns: ['streamyard.com/embed', 'cdn.streamyard.com'], globalVar: [] },
  { id: 'descript', name: 'Descript', category: 'Video', patterns: ['share.descript.com/embed', 'cdn.descript.com'], globalVar: [] },

  // --- NO-CODE additions ---
  { id: 'coda_embed', name: 'Coda', category: 'No-Code', patterns: ['coda.io/_d/', 'coda.io/embed/'], globalVar: [] },
  { id: 'clickup_embed', name: 'ClickUp', category: 'No-Code', patterns: ['cdn.clickup.com/widget', 'sharing.clickup.com/'], globalVar: [] },

  // --- OBSERVABILITY additions ---
  { id: 'opentelemetry', name: 'OpenTelemetry', category: 'Observability', patterns: ['cdn.jsdelivr.net/npm/@opentelemetry/api', 'cdn.jsdelivr.net/npm/@opentelemetry/sdk-trace-web', 'opentelemetry-js'], globalVar: [] },

];
