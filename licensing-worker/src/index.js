var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var PRODUCT_PLAN_MAP = {
  "prod_UGkCu0KzxFHGCy": "pro",
  "prod_UGkCJ9KR5nVrhI": "business",
  "prod_UHeCaCDyIw17PL": "business",
  "prod_UGkCao2ZT6DX9w": "agency",
  "prod_UGkCAvzpONr49G": "enterprise"
};
var CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" }
  });
}
__name(json, "json");
__name2(json, "json");
function generateLicenseKey() {
  const seg = __name2(() => {
    const arr = new Uint16Array(1);
    crypto.getRandomValues(arr);
    return arr[0].toString(16).toUpperCase().padStart(4, "0");
  }, "seg");
  return `SD-${seg()}-${seg()}-${seg()}-${seg()}`;
}
__name(generateLicenseKey, "generateLicenseKey");
__name2(generateLicenseKey, "generateLicenseKey");
async function verifyStripeSignature(body, signature, secret) {
  let timestamp = null;
  const v1Sigs = [];
  for (const part of signature.split(",")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const k = part.slice(0, eq);
    const v = part.slice(eq + 1);
    if (k === "t") timestamp = v;
    else if (k === "v1") v1Sigs.push(v);
  }
  if (!timestamp || v1Sigs.length === 0) return false;
  if (Math.abs(Date.now() / 1e3 - parseInt(timestamp, 10)) > 300) {
    console.log(`[webhook] signature timestamp too old ts=${timestamp}`);
    return false;
  }
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const payload = new TextEncoder().encode(`${timestamp}.${body}`);
  for (const sig of v1Sigs) {
    const sigBytes = new Uint8Array(sig.match(/../g).map((h) => parseInt(h, 16)));
    if (await crypto.subtle.verify("HMAC", key, sigBytes, payload)) return true;
  }
  return false;
}
__name(verifyStripeSignature, "verifyStripeSignature");
__name2(verifyStripeSignature, "verifyStripeSignature");
async function fetchStripeSubscription(subscriptionId, stripeKey) {
  const res = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}?expand[]=items.data.price.product`, {
    headers: { Authorization: `Bearer ${stripeKey}` }
  });
  if (res.ok) return res.json();
  if (res.status === 404) return null;
  throw new Error(`Stripe subscription fetch failed: ${res.status} for ${subscriptionId}`);
}
__name(fetchStripeSubscription, "fetchStripeSubscription");
__name2(fetchStripeSubscription, "fetchStripeSubscription");
var AMOUNT_PLAN_MAP = {
  799: "monthly",
  2e3: "3mo",
  4e3: "6mo",
  9e3: "annual"
};
function getBillingPeriod(sub) {
  const price = sub?.items?.data?.[0]?.price;
  const interval = price?.recurring?.interval;
  const count = price?.recurring?.interval_count || 1;
  if (interval === "month" && count === 1) return "monthly";
  if (interval === "month" && count === 3) return "3mo";
  if (interval === "month" && count === 6) return "6mo";
  if (interval === "year") return "annual";
  return "unknown";
}
__name(getBillingPeriod, "getBillingPeriod");
__name2(getBillingPeriod, "getBillingPeriod");
async function fireGA4Event(env, clientId, eventName, params) {
  const measurementId = env.GA_MEASUREMENT_ID || "G-HVECKYG478";
  const apiSecret = env.GA_API_SECRET;
  if (!apiSecret) return;
  await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, events: [{ name: eventName, params }] })
  });
}
__name(fireGA4Event, "fireGA4Event");
__name2(fireGA4Event, "fireGA4Event");
async function fireVenomWebGA4Event(env, clientId, eventName, params) {
  const apiSecret = env.GA_VENOM_WEB_SECRET;
  if (!apiSecret) return;
  await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=G-JGHX274MQ3&api_secret=${apiSecret}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, events: [{ name: eventName, params }] })
  });
}
__name(fireVenomWebGA4Event, "fireVenomWebGA4Event");
__name2(fireVenomWebGA4Event, "fireVenomWebGA4Event");
async function firePostHogEvent(env, distinctId, eventName, properties) {
  const apiKey = env.POSTHOG_API_KEY || "phc_tiu7QvVMRHTEanqn8DtzdMd524u78aGmCnAbMWYxfHkJ";
  await fetch("https://us.i.posthog.com/capture/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, event: eventName, distinct_id: distinctId, properties })
  });
}
__name(firePostHogEvent, "firePostHogEvent");
__name2(firePostHogEvent, "firePostHogEvent");
async function handlePurchaseSession(session, env) {
  const sessionId = session.id;
  const subscriptionId = session.subscription;
  const customerId = session.customer;
  const email = session.customer_details?.email || session.customer_email || "";
  if (await env.LICENSES.get(`session:${sessionId}`)) return;
  let plan = "pro";
  let sub = null;
  if (subscriptionId && env.STRIPE_SECRET_KEY) {
    sub = await fetchStripeSubscription(subscriptionId, env.STRIPE_SECRET_KEY);
    if (sub) {
      const productId = sub.items?.data?.[0]?.price?.product?.id;
      if (PRODUCT_PLAN_MAP[productId]) {
        plan = PRODUCT_PLAN_MAP[productId];
      } else {
        console.warn(`[webhook] unknown product id=${productId} sub=${subscriptionId}, defaulting to pro`);
      }
    }
  }
  const licenseKey = generateLicenseKey();
  const licenseData = {
    plan,
    email,
    customerId,
    subscriptionId,
    sessionId,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    active: true
  };
  await env.LICENSES.put(`license:${licenseKey}`, JSON.stringify(licenseData));
  await env.LICENSES.put(`session:${sessionId}`, JSON.stringify({ licenseKey, ...licenseData }));
  if (subscriptionId) await env.LICENSES.put(`sub:${subscriptionId}`, licenseKey);
  console.log(`[webhook] license created key=${licenseKey} plan=${plan} email=${email} amount=${session.amount_total}`);
  if (email) await sendPurchaseEmail(env, email, licenseKey, plan);
  const valueUSD = session.amount_total ? session.amount_total / 100 : 0;
  const billingPeriod = sub ? getBillingPeriod(sub) : AMOUNT_PLAN_MAP[session.amount_total] || "unknown";
  const ga4ClientId = session.client_reference_id || customerId || sessionId;
  if (session.amount_total > 0) {
    const purchaseParams = {
      transaction_id: sessionId,
      value: valueUSD,
      currency: "USD",
      plan,
      billing_period: billingPeriod,
      customer_id: customerId || ""
    };
    await fireGA4Event(env, ga4ClientId, "purchase", purchaseParams);
    await fireVenomWebGA4Event(env, ga4ClientId, "purchase", purchaseParams);
  }
  const phDistinctId = email || ga4ClientId;
  const isTrial = session.payment_status === "no_payment_required";
  await firePostHogEvent(env, phDistinctId, isTrial ? "trial_license_assigned" : "license_assigned", {
    transaction_id: sessionId,
    value: valueUSD,
    currency: "USD",
    plan,
    billing_period: billingPeriod,
    is_stripe_trial: isTrial,
    $set: { plan, email: email || undefined }
  });
  if (!isTrial && session.amount_total > 0) {
    await firePostHogEvent(env, phDistinctId, "checkout_completed", {
      transaction_id: sessionId,
      plan,
      amount: valueUSD,
      currency: (session.currency || "USD").toUpperCase(),
      billing_period: billingPeriod,
      payment_method: (session.payment_method_types && session.payment_method_types[0]) || "card",
      $set: { plan, email: email || undefined }
    }).catch((err) => console.error("[webhook] PostHog checkout_completed failed", String(err)));
    if (env.MAKE_PAYMENTS_WEBHOOK_URL) {
      const details = session.customer_details || {};
      const addr = details.address || {};
      let cardBrand = "", cardLast4 = "", cardExpiry = "";
      if (env.STRIPE_SECRET_KEY && session.payment_intent) {
        try {
          const piRes = await fetch(`https://api.stripe.com/v1/payment_intents/${session.payment_intent}?expand[]=payment_method`, {
            headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` }
          });
          const pi = await piRes.json();
          const card = pi?.payment_method?.card;
          if (card) {
            cardBrand = card.brand || "";
            cardLast4 = card.last4 || "";
            cardExpiry = card.exp_month ? `${card.exp_month}/${card.exp_year}` : "";
          }
        } catch (_) {}
      }
      await fetch(env.MAKE_PAYMENTS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-make-apikey": env.MAKE_PAYMENTS_WEBHOOK_APIKEY || "" },
        body: JSON.stringify({
          email: email || "",
          name: details.name || "",
          plan,
          amount: valueUSD,
          currency: (session.currency || "USD").toUpperCase(),
          billing_period: billingPeriod,
          payment_method: (session.payment_method_types && session.payment_method_types[0]) || "card",
          card_brand: cardBrand,
          card_last4: cardLast4,
          card_expiry: cardExpiry,
          address_line1: addr.line1 || "",
          address_city: addr.city || "",
          address_state: addr.state || "",
          address_postal: addr.postal_code || "",
          address_country: addr.country || "",
          phone: details.phone || "",
          transaction_id: sessionId,
          customer_id: customerId || "",
          license_key: licenseKey,
          createdAt: new Date().toISOString()
        })
      }).catch((err) => console.error("[webhook] Make payments webhook failed", String(err)));
    }
  }
}
__name(handlePurchaseSession, "handlePurchaseSession");
__name2(handlePurchaseSession, "handlePurchaseSession");
async function handleWebhook(request, env) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";
  if (!await verifyStripeSignature(body, signature, env.STRIPE_WEBHOOK_SECRET)) {
    console.log("[webhook] invalid signature rejected");
    return new Response("Invalid signature", { status: 400 });
  }
  const event = JSON.parse(body);
  console.log(`[webhook] received event=${event.type} id=${event.id}`);
  try {
    if (event.id) {
      const evtKey = `evt:${event.id}`;
      if (await env.LICENSES.get(evtKey)) return new Response("OK", { status: 200 });
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      if (session.payment_status !== "paid" && session.payment_status !== "no_payment_required") {
        console.log(`[webhook] skipping session ${session.id} payment_status=${session.payment_status}`);
      } else {
        await handlePurchaseSession(session, env);
      }
    }
    if (event.type === "checkout.session.async_payment_succeeded") {
      await handlePurchaseSession(event.data.object, env);
    }
    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const sessionId = session.id;
      const customerId = session.customer || sessionId;
      const planByAmount = AMOUNT_PLAN_MAP[session.amount_total] || "unknown";
      const valueUSD = session.amount_total ? session.amount_total / 100 : 0;
      const ga4ClientId = session.client_reference_id || customerId;
      await fireGA4Event(env, ga4ClientId, "checkout_abandoned", {
        session_id: sessionId,
        plan: planByAmount,
        value: valueUSD,
        currency: "USD"
      }).catch((err) => console.error("[webhook] GA4 checkout_abandoned failed", String(err)));
      await firePostHogEvent(env, ga4ClientId, "checkout_abandoned", {
        session_id: sessionId,
        plan: planByAmount,
        value: valueUSD,
        currency: "USD"
      }).catch((err) => console.error("[webhook] PostHog checkout_abandoned failed", String(err)));
    }
    if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object;
      const error = pi.last_payment_error;
      const ga4ClientId = pi.metadata?.client_reference_id || pi.customer || pi.id;
      await fireGA4Event(env, ga4ClientId, "payment_failed", {
        decline_code: error?.decline_code || "unknown",
        error_code: error?.code || "unknown",
        error_type: error?.type || "unknown",
        amount: pi.amount ? pi.amount / 100 : 0,
        currency: pi.currency || "usd",
        customer_id: pi.customer || ""
      }).catch((err) => console.error("[webhook] GA4 payment_failed failed", String(err)));
    }
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object;
      if (invoice.billing_reason !== "subscription_create" && invoice.subscription) {
        const licenseKey = await env.LICENSES.get(`sub:${invoice.subscription}`);
        if (licenseKey) {
          const raw = await env.LICENSES.get(`license:${licenseKey}`);
          if (raw) {
            const data = JSON.parse(raw);
            data.active = true;
            data.renewedAt = (/* @__PURE__ */ new Date()).toISOString();
            data.currentPeriodEnd = invoice.lines?.data?.[0]?.period?.end ? new Date(invoice.lines.data[0].period.end * 1e3).toISOString() : null;
            await env.LICENSES.put(`license:${licenseKey}`, JSON.stringify(data));
            console.log(`[webhook] license renewed key=${licenseKey} plan=${data.plan} sub=${invoice.subscription}`);
          }
        }
      }
    }
    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object;
      const ga4ClientId = invoice.customer || invoice.id;
      const licenseKey = invoice.subscription ? await env.LICENSES.get(`sub:${invoice.subscription}`) : null;
      const raw = licenseKey ? await env.LICENSES.get(`license:${licenseKey}`) : null;
      const licenseData = raw ? JSON.parse(raw) : {};
      await fireGA4Event(env, ga4ClientId, "invoice_payment_failed", {
        attempt_count: invoice.attempt_count || 1,
        amount: invoice.amount_due ? invoice.amount_due / 100 : 0,
        currency: invoice.currency || "usd",
        customer_id: invoice.customer || "",
        subscription_id: invoice.subscription || "",
        plan: licenseData.plan || "unknown"
      }).catch((err) => console.error("[webhook] GA4 invoice_payment_failed failed", String(err)));
    }
    if (event.type === "customer.subscription.updated") {
      const sub = event.data.object;
      const prev = event.data.previous_attributes || {};
      if (sub.cancel_at_period_end === true && prev.cancel_at_period_end === false) {
        const licenseKey = await env.LICENSES.get(`sub:${sub.id}`);
        const raw = licenseKey ? await env.LICENSES.get(`license:${licenseKey}`) : null;
        const licenseData = raw ? JSON.parse(raw) : {};
        await fireGA4Event(env, sub.customer || sub.id, "subscription_cancelled", {
          plan: licenseData.plan || "unknown",
          customer_id: sub.customer || "",
          subscription_id: sub.id,
          cancel_at: sub.cancel_at || 0
        }).catch((err) => console.error("[webhook] GA4 subscription_cancelled failed", String(err)));
      }
    }
    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      const licenseKey = await env.LICENSES.get(`sub:${sub.id}`);
      if (licenseKey) {
        const raw = await env.LICENSES.get(`license:${licenseKey}`);
        if (raw) {
          const data = JSON.parse(raw);
          data.active = false;
          await env.LICENSES.put(`license:${licenseKey}`, JSON.stringify(data));
          await fireGA4Event(env, sub.customer || sub.id, "subscription_deleted", {
            plan: data.plan || "unknown",
            customer_id: sub.customer || "",
            subscription_id: sub.id
          }).catch((err) => console.error("[webhook] GA4 subscription_deleted failed", String(err)));
        }
      }
    }
    if (event.id) {
      await env.LICENSES.put(`evt:${event.id}`, "1", { expirationTtl: 86400 });
    }
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error(`[webhook] processing error event=${event.type} id=${event.id}`, String(err));
    return new Response("Internal error", { status: 500 });
  }
}
__name(handleWebhook, "handleWebhook");
__name2(handleWebhook, "handleWebhook");
async function handleGetLicense(url, env) {
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return json({ error: "No session_id provided" }, 400);
  const raw = await env.LICENSES.get(`session:${sessionId}`);
  if (!raw) return json({ error: "Session not found. It may take a moment \u2014 please refresh." }, 404);
  const data = JSON.parse(raw);
  return json({ licenseKey: data.licenseKey, plan: data.plan, email: data.email });
}
__name(handleGetLicense, "handleGetLicense");
__name2(handleGetLicense, "handleGetLicense");
var TRIAL_DURATION_DAYS = 7;
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
async function sendPurchaseEmail(env, email, key, plan) {
  if (!env.RESEND_API_KEY) return { sent: false, reason: "no_api_key" };
  const from = env.RESEND_FROM || "SaaS Detective <noreply@venom-industries.com>";
  const planLabel = PLAN_LABELS[plan] || "Pro";
  const body = {
    from,
    to: [email],
    subject: `Your SaaS Detective ${planLabel} license key`,
    html: `<div style="font-family:-apple-system,system-ui,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0f172a;">
  <h1 style="font-size:22px;margin:0 0 8px;">Your ${planLabel} license is active</h1>
  <p style="color:#475569;font-size:14px;margin:0 0 24px;">Thanks for subscribing. Your license key is below \u2014 save it somewhere safe.</p>
  <div style="background:#0f172a;color:#f1f5f9;font-family:monospace;font-size:18px;font-weight:700;letter-spacing:.08em;padding:14px 18px;border-radius:10px;text-align:center;">${key}</div>
  <h3 style="font-size:14px;margin:20px 0 10px;">Activate in 3 steps</h3>
  <ol style="color:#334155;font-size:14px;line-height:1.7;padding-left:18px;margin:0 0 24px;">
    <li>Click the SaaS Detective icon in your browser toolbar</li>
    <li>Click <strong>Options</strong> at the bottom of the popup</li>
    <li>Paste your key and click <strong>Activate</strong></li>
  </ol>
  <p style="color:#64748b;font-size:12px;">Need help? <a href="mailto:grayson@venom-industries.com" style="color:#2563eb;">grayson@venom-industries.com</a></p>
</div>`
  };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return { sent: res.ok, status: res.status };
  } catch (err) {
    return { sent: false, reason: "fetch_failed" };
  }
}
__name(sendPurchaseEmail, "sendPurchaseEmail");
__name2(sendPurchaseEmail, "sendPurchaseEmail");
async function sendTrialEmail(env, email, key, expiresAt) {
  if (!env.RESEND_API_KEY) return { sent: false, reason: "no_api_key" };
  const from = env.RESEND_FROM || "SaaS Detective <noreply@venom-industries.com>";
  const expiresStr = new Date(expiresAt).toUTCString();
  const body = {
    from,
    to: [email],
    subject: "Your SaaS Detective 7-day Pro trial",
    html: `<div style="font-family:-apple-system,system-ui,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0f172a;">
  <h1 style="font-size:22px;margin:0 0 8px;">Your Pro trial is active</h1>
  <p style="color:#475569;font-size:14px;margin:0 0 24px;">7 days of full access. Cancel anytime \u2014 there is nothing to cancel.</p>
  <div style="background:#0f172a;color:#f1f5f9;font-family:monospace;font-size:18px;font-weight:700;letter-spacing:.08em;padding:14px 18px;border-radius:10px;text-align:center;">${key}</div>
  <p style="color:#64748b;font-size:13px;margin:14px 0 24px;">Expires ${expiresStr}</p>
  <h3 style="font-size:14px;margin:0 0 10px;">Activate in 3 steps</h3>
  <ol style="color:#334155;font-size:14px;line-height:1.7;padding-left:18px;margin:0 0 24px;">
    <li>Click the SaaS Detective icon in your browser toolbar</li>
    <li>Click <strong>Options</strong> at the bottom of the popup</li>
    <li>Paste your key and click <strong>Activate</strong></li>
  </ol>
  <p style="color:#64748b;font-size:12px;">Need help? <a href="mailto:grayson@venom-industries.com" style="color:#2563eb;">grayson@venom-industries.com</a></p>
</div>`
  };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return { sent: res.ok, status: res.status };
  } catch (err) {
    return { sent: false, reason: "fetch_failed" };
  }
}
__name(sendTrialEmail, "sendTrialEmail");
__name2(sendTrialEmail, "sendTrialEmail");
async function sendTrialReminderEmail(env, email, key, expiresAt) {
  if (!env.RESEND_API_KEY) return;
  const from = env.RESEND_FROM || "SaaS Detective <noreply@venom-industries.com>";
  const hoursLeft = Math.max(1, Math.ceil((expiresAt - Date.now()) / (60 * 60 * 1e3)));
  const timeLabel = hoursLeft <= 24 ? `${hoursLeft} hour${hoursLeft === 1 ? "" : "s"}` : "2 days";
  const body = {
    from,
    to: [email],
    subject: `Your SaaS Detective Pro trial ends in ${timeLabel}`,
    html: `<div style="font-family:-apple-system,system-ui,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0f172a;">
  <h1 style="font-size:22px;margin:0 0 8px;">Your trial ends in ${timeLabel}.</h1>
  <p style="color:#475569;font-size:14px;margin:0 0 24px;">You've been scanning sites with access to all 208+ tool signatures. In ${timeLabel} your account reverts to the free plan (50 signatures).</p>
  <p style="color:#475569;font-size:14px;margin:0 0 28px;">Keep full access \u2014 upgrade before your trial ends.</p>
  <a href="https://venom-industries.com/saas-detective#pricing" style="display:inline-block;background:#2563eb;color:#ffffff;font-family:'Courier New',monospace;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:13px 28px;border-radius:7px;text-decoration:none;">Keep Pro Access \u2014 from $7.99/mo \u2192</a>
  <p style="color:#64748b;font-size:12px;margin-top:28px;">30-day money-back guarantee \xB7 cancel anytime \xB7 license key emailed instantly</p>
  <p style="color:#94a3b8;font-size:12px;margin-top:16px;">\u2014 Grayson, founder \xB7 <a href="mailto:grayson@venom-industries.com" style="color:#2563eb;">grayson@venom-industries.com</a></p>
</div>`
  };
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  } catch (_) {
  }
}
__name(sendTrialReminderEmail, "sendTrialReminderEmail");
__name2(sendTrialReminderEmail, "sendTrialReminderEmail");
async function sendTrialExpiryEmail(env, email) {
  if (!env.RESEND_API_KEY) return;
  const from = env.RESEND_FROM || "SaaS Detective <noreply@venom-industries.com>";
  const body = {
    from,
    to: [email],
    subject: "Your SaaS Detective Pro trial has ended",
    html: `<div style="font-family:-apple-system,system-ui,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0f172a;">
  <h1 style="font-size:22px;margin:0 0 8px;">Your trial has ended.</h1>
  <p style="color:#475569;font-size:14px;margin:0 0 16px;">Your 7-day Pro trial for SaaS Detective is over. You're back on the free plan \u2014 limited to the 50 most common tool signatures.</p>
  <p style="color:#475569;font-size:14px;margin:0 0 28px;">If you found value in the full library during your trial, upgrading is $7.99/mo \u2014 less than a coffee. Cancel anytime.</p>
  <a href="https://venom-industries.com/saas-detective#pricing" style="display:inline-block;background:#2563eb;color:#ffffff;font-family:'Courier New',monospace;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:13px 28px;border-radius:7px;text-decoration:none;">Upgrade to Pro \u2014 from $7.99/mo \u2192</a>
  <p style="color:#64748b;font-size:12px;margin-top:28px;">30-day money-back guarantee \xB7 license key emailed instantly after checkout</p>
  <p style="color:#94a3b8;font-size:12px;margin-top:16px;">\u2014 Grayson, founder \xB7 <a href="mailto:grayson@venom-industries.com" style="color:#2563eb;">grayson@venom-industries.com</a></p>
</div>`
  };
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  } catch (_) {
  }
}
__name(sendTrialExpiryEmail, "sendTrialExpiryEmail");
__name2(sendTrialExpiryEmail, "sendTrialExpiryEmail");
async function handleSubscribe(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (!await checkRateLimit(env, ip, "subscribe", 5, 3600)) {
    return json({ ok: false, error: "Too many requests. Try again in an hour." }, 429);
  }
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }
  const email = String(payload?.email || "").trim().toLowerCase();
  const clientId = String(payload?.client_id || email);
  const source = String(payload?.source || "marketing");
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "Invalid email" }, 400);
  const existingKey = `subscriber:${email}`;
  if (await env.LICENSES.get(existingKey)) return json({ ok: true, already: true });
  await env.LICENSES.put(existingKey, JSON.stringify({ email, createdAt: (/* @__PURE__ */ new Date()).toISOString(), source }));
  if (env.RESEND_API_KEY) {
    const from = env.RESEND_FROM || "SaaS Detective <noreply@venom-industries.com>";
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "You're on the SaaS Detective updates list",
        html: `<div style="font-family:-apple-system,system-ui,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0f172a;">
  <h1 style="font-size:22px;margin:0 0 8px;">You're on the list.</h1>
  <p style="color:#475569;font-size:14px;margin:0 0 16px;">We'll email you when we ship new tool signatures \u2014 typically a short note with what's new and why it matters.</p>
  <p style="color:#475569;font-size:14px;margin:0 0 24px;">No spam. Unsubscribe anytime by replying "unsubscribe".</p>
  <p style="color:#64748b;font-size:12px;">In the meantime, try the free extension if you haven't already \u2192 <a href="https://venom-industries.com/saas-detective" style="color:#2563eb;">venom-industries.com/saas-detective</a></p>
  <p style="color:#94a3b8;font-size:12px;margin-top:16px;">\u2014 Grayson, founder \xB7 <a href="mailto:grayson@venom-industries.com" style="color:#2563eb;">grayson@venom-industries.com</a></p>
</div>`
      })
    }).catch((_) => {
    });
  }
  await fireGA4Event(env, clientId, "newsletter_subscribe", { source }).catch((_) => {
  });
  if (env.MAKE_WEBHOOK_URL) {
    await fetch(env.MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-make-apikey": env.MAKE_WEBHOOK_APIKEY || "" },
      body: JSON.stringify({ email, source, createdAt: new Date().toISOString(), client_id: clientId })
    }).catch((_) => {});
  }
  return json({ ok: true });
}
__name(handleSubscribe, "handleSubscribe");
__name2(handleSubscribe, "handleSubscribe");
async function checkRateLimit(env, ip, bucket, limit, windowSec) {
  const key = `rate:${bucket}:${ip}`;
  const raw = await env.LICENSES.get(key);
  const count = raw ? parseInt(raw) : 0;
  if (count >= limit) return false;
  if (count === 0) {
    await env.LICENSES.put(key, "1", { expirationTtl: windowSec });
  } else {
    await env.LICENSES.put(key, String(count + 1));
  }
  return true;
}
__name(checkRateLimit, "checkRateLimit");
__name2(checkRateLimit, "checkRateLimit");
async function handleTrialStart(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (!await checkRateLimit(env, ip, "trial", 5, 3600)) {
    console.log(`[trial/start] rate limited ip=${ip}`);
    return json({ ok: false, error: "Too many trial requests. Try again in an hour." }, 429);
  }
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }
  const email = String(payload?.email || "").trim().toLowerCase();
  const clientId = String(payload?.client_id || "");
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "Invalid email" }, 400);
  const existingKey = await env.LICENSES.get(`trial-email:${email}`);
  if (existingKey) {
    const raw = await env.LICENSES.get(`license:${existingKey}`);
    const data = raw ? JSON.parse(raw) : {};
    return json({ ok: false, error: "Trial already issued for this email", expires_at: data.expires_at || null }, 409);
  }
  const key = generateLicenseKey();
  const now = Date.now();
  const expiresAt = now + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1e3;
  const license = {
    plan: "pro",
    trial: true,
    email,
    active: true,
    createdAt: new Date(now).toISOString(),
    expires_at: expiresAt
  };
  const trialTtlSec = TRIAL_DURATION_DAYS * 24 * 60 * 60 + 7 * 24 * 60 * 60;
  await env.LICENSES.put(`license:${key}`, JSON.stringify(license), { expirationTtl: trialTtlSec });
  await env.LICENSES.put(`trial-email:${email}`, key);
  console.log(`[trial/start] issued key=${key} email=${email} expires=${new Date(expiresAt).toISOString()}`);
  const emailResult = await sendTrialEmail(env, email, key, expiresAt);
  await fireGA4Event(env, clientId || email, "trial_started", {
    plan: "pro",
    days: TRIAL_DURATION_DAYS,
    email_sent: emailResult.sent ? 1 : 0
  });
  await firePostHogEvent(env, email, "trial_license_assigned", {
    plan: "pro",
    days: TRIAL_DURATION_DAYS,
    is_stripe_trial: false,
    expires_at: expiresAt,
    $set: { plan: "pro_trial", email }
  });
  return json({ ok: true, key, email, expires_at: expiresAt, email_sent: emailResult.sent });
}
__name(handleTrialStart, "handleTrialStart");
__name2(handleTrialStart, "handleTrialStart");
async function handleTrack(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (!await checkRateLimit(env, ip, "track", 60, 60)) {
    return json({ ok: false, error: "Rate limited" }, 429);
  }
  try {
    const body = await request.json();
    const { client_id, events } = body;
    if (!client_id || !Array.isArray(events) || events.length === 0 || events.length > 25) {
      return json({ ok: false, error: "Invalid payload" }, 400);
    }
    const measurementId = env.GA_MEASUREMENT_ID || "G-HVECKYG478";
    const apiSecret = env.GA_API_SECRET;
    if (!apiSecret) return json({ ok: false, error: "Not configured" }, 500);
    const gaUrl = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
    const gaRes = await fetch(gaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id, events })
    });
    return json({ ok: gaRes.ok });
  } catch (err) {
    return json({ ok: false, error: "Track failed" }, 500);
  }
}
__name(handleTrack, "handleTrack");
__name2(handleTrack, "handleTrack");
var PLAN_LABELS = {
  pro: "Pro",
  business: "Business",
  agency: "Agency",
  enterprise: "Enterprise"
};
var PLAN_FEATURES = {
  pro: "All 217 tech signatures unlocked",
  business: "All 200+ signatures + CSV/JSON export & scan history",
  agency: "Business features + bulk scanning, 3 seats & API access",
  enterprise: "Agency features + unlimited seats, custom signatures & white-label"
};
function serveSuccessPage(sessionId) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to SaaS Detective</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, system-ui, sans-serif; background: #0f172a; color: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; max-width: 520px; width: 100%; padding: 40px 36px; text-align: center; }
    .badge { display: inline-block; background: #16a34a; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 99px; margin-bottom: 20px; letter-spacing: 0.05em; }
    h1 { font-size: 26px; font-weight: 800; margin-bottom: 8px; }
    .plan-name { color: #60a5fa; }
    .tagline { color: #94a3b8; font-size: 14px; margin-bottom: 28px; }
    .key-box { background: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 16px 20px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
    .key-text { font-family: monospace; font-size: 18px; font-weight: 700; color: #f1f5f9; flex: 1; letter-spacing: 0.08em; }
    .copy-btn { background: #2563eb; color: #fff; border: none; padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: background 0.15s; }
    .copy-btn:hover { background: #1d4ed8; }
    .copy-btn.copied { background: #16a34a; }
    .hint { color: #64748b; font-size: 12px; margin-bottom: 28px; }
    .steps { text-align: left; background: #0f172a; border-radius: 10px; padding: 20px 22px; margin-bottom: 28px; }
    .steps h3 { font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 14px; }
    .step { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; }
    .step:last-child { margin-bottom: 0; }
    .step-num { background: #2563eb; color: #fff; width: 22px; height: 22px; border-radius: 50%; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
    .step-text { font-size: 13px; color: #cbd5e1; line-height: 1.5; }
    .step-text strong { color: #f1f5f9; }
    .support { font-size: 12px; color: #64748b; }
    .support a { color: #60a5fa; text-decoration: none; }
    #loading { color: #94a3b8; font-size: 14px; padding: 20px 0; }
    #error { color: #f87171; font-size: 14px; padding: 20px 0; display: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">PAYMENT CONFIRMED</div>
    <h1>Welcome to<br><span class="plan-name" id="planName">SaaS Detective</span></h1>
    <p class="tagline" id="tagline">Loading your license...</p>
    <div id="loading">Retrieving your license key...</div>
    <div id="error">Could not retrieve your license key. Please <a href="mailto:grayson@venom-industries.com">contact support</a> with your order confirmation.</div>
    <div id="keySection" style="display:none">
      <div class="key-box">
        <span class="key-text" id="licenseKey">\u2014</span>
        <button class="copy-btn" id="copyBtn" onclick="copyKey()">Copy</button>
      </div>
      <p class="hint">Save this key \u2014 you'll need it to activate the extension.</p>
      <div class="steps">
        <h3>Activate in 3 steps</h3>
        <div class="step"><div class="step-num">1</div><div class="step-text">Click the <strong>SaaS Detective</strong> icon in your browser toolbar</div></div>
        <div class="step"><div class="step-num">2</div><div class="step-text">Click <strong>Options</strong> at the bottom of the popup</div></div>
        <div class="step"><div class="step-num">3</div><div class="step-text">Paste your license key and click <strong>Activate</strong></div></div>
      </div>
      <p class="support">Need help? <a href="mailto:grayson@venom-industries.com">grayson@venom-industries.com</a></p>
    </div>
  </div>
  <script>
    const sessionId = ${JSON.stringify(sessionId)};
    const PLAN_LABELS = ${JSON.stringify(PLAN_LABELS)};
    const PLAN_FEATURES = ${JSON.stringify(PLAN_FEATURES)};
    async function fetchLicense(attempts = 0) {
      try {
        const res = await fetch('/license?session_id=' + sessionId);
        if (res.status === 404 && attempts < 5) {
          await new Promise(r => setTimeout(r, 2000));
          return fetchLicense(attempts + 1);
        }
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        document.getElementById('loading').style.display = 'none';
        document.getElementById('keySection').style.display = 'block';
        document.getElementById('licenseKey').textContent = data.licenseKey;
        document.getElementById('planName').textContent = 'SaaS Detective ' + (PLAN_LABELS[data.plan] || '');
        document.getElementById('tagline').textContent = PLAN_FEATURES[data.plan] || '';
      } catch {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
      }
    }
    function copyKey() {
      const key = document.getElementById('licenseKey').textContent;
      navigator.clipboard.writeText(key).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      });
    }
    fetchLicense();
  <\/script>
</body>
</html>`;
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
__name(serveSuccessPage, "serveSuccessPage");
__name2(serveSuccessPage, "serveSuccessPage");
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }
    if (url.pathname === "/webhook" && request.method === "POST") {
      return handleWebhook(request, env);
    }
    if (url.pathname === "/validate" && request.method === "GET") {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      if (!await checkRateLimit(env, ip, "validate", 30, 60)) {
        return json({ valid: false, error: "Rate limited" }, 429);
      }
      const key = url.searchParams.get("key");
      if (!key) return json({ valid: false, error: "No key provided" }, 400);
      const raw = await env.LICENSES.get(`license:${key}`);
      if (!raw) return json({ valid: false, error: "Key not found" });
      const license = JSON.parse(raw);
      const isTrial = Boolean(license.trial);
      const expired = isTrial && license.expires_at && Date.now() > license.expires_at;
      const valid = license.active && !expired;
      console.log(`[validate] key=${key.slice(0, 8)}... valid=${valid} plan=${license.plan} trial=${isTrial} expired=${expired}`);
      if (license.email) {
        if (expired) {
          const sentKey = `trial-expiry-email-sent:${license.email}`;
          if (!await env.LICENSES.get(sentKey)) {
            await env.LICENSES.put(sentKey, "1");
            await sendTrialExpiryEmail(env, license.email);
          }
        } else if (isTrial && license.expires_at) {
          const remaining = license.expires_at - Date.now();
          if (remaining > 0 && remaining < 48 * 60 * 60 * 1e3) {
            const sentKey = `trial-reminder-sent:${license.email}`;
            if (!await env.LICENSES.get(sentKey)) {
              await env.LICENSES.put(sentKey, "1");
              await sendTrialReminderEmail(env, license.email, key, license.expires_at);
            }
          }
        }
      }
      return json({
        valid,
        plan: license.plan,
        trial: isTrial,
        expires_at: license.expires_at || null,
        reason: expired ? "trial_expired" : void 0
      });
    }
    if (url.pathname === "/trial/start" && request.method === "POST") {
      return handleTrialStart(request, env);
    }
    if (url.pathname === "/license" && request.method === "GET") {
      return handleGetLicense(url, env);
    }
    if (url.pathname === "/success" && request.method === "GET") {
      const sessionId = url.searchParams.get("session_id") || "";
      return serveSuccessPage(sessionId);
    }
    if (url.pathname === "/track" && request.method === "POST") {
      return handleTrack(request, env);
    }
    if (url.pathname === "/subscribe" && request.method === "POST") {
      return handleSubscribe(request, env);
    }
    return new Response("Not Found", { status: 404 });
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
