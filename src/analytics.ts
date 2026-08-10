// Only TRUST_CHECK_SHARED_SECRET still comes through webpack's DefinePlugin.
// The PostHog values below are hardcoded deliberately (see next comment); this
// one cannot be, because it is an actual secret rather than a public client id.
declare const process: { env: { TRUST_CHECK_SHARED_SECRET: string } };

const TRACK_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/track';
// Hardcoded to match shared.js exactly (loaded by popup.html/options.html/
// onboarding.html) rather than sourced from process.env.POSTHOG_HOST/
// POSTHOG_PROJECT_TOKEN. Those env vars had no committed .env file and no
// non-empty default, so an ordinary `npm run build` silently produced a
// build that sent every analytics event (including post-activation emails
// via identifyUser) straight to us.i.posthog.com instead of through the
// api.venom-industries.com proxy — a build-time footgun with no warning.
// This is the extension-side analytics identifier (PostHog project token),
// not a secret: it's meant to be embedded in client code.
const POSTHOG_KEY = 'phc_tiu7QvVMRHTEanqn8DtzdMd524u78aGmCnAbMWYxfHkJ';
// Sent as X-SD-Trust-Key on /trust-check requests — raises the bar on that
// endpoint from "anyone can curl it" to "must extract this from the packed
// extension." Not a substitute for real auth, just closes the zero-effort case.
// Unlike POSTHOG_KEY this is a genuine shared secret, so it stays in .env and
// is injected at build time; an empty value fails every trust check closed.
export const TRUST_CHECK_SHARED_SECRET = process.env.TRUST_CHECK_SHARED_SECRET;
// Routed through our own domain, not us.i.posthog.com directly — matches
// shared.js's POSTHOG_CAPTURE_URL. Posting straight to a posthog.com domain
// gets silently dropped by uBlock/Brave/Privacy Badger, which is exactly the
// demographic likely to install this extension; this proxy exists specifically
// to keep checkout/trial/scan events out of ad-blocker denylists.
const POSTHOG_CAPTURE_URL = 'https://api.venom-industries.com/capture/';

// Cached per-session to avoid a storage read on every event
let _superPropsCache: Record<string, unknown> | null = null;

async function getSuperProps(): Promise<Record<string, unknown>> {
  if (_superPropsCache) return _superPropsCache;
  try {
    const result = await chrome.storage.sync.get({ sd_license: null });
    const lic = result['sd_license'] as { plan?: string; valid?: boolean; trial?: boolean } | null;
    _superPropsCache = {
      extension_version: chrome.runtime?.getManifest?.()?.version || '',
      plan: lic?.plan || 'free',
      is_licensed: Boolean(lic?.valid),
      is_trial: Boolean(lic?.trial),
    };
  } catch (_) {
    _superPropsCache = { extension_version: chrome.runtime?.getManifest?.()?.version || '' };
  }
  return _superPropsCache;
}

export function invalidateLicenseCache(): void {
  _superPropsCache = null;
}

export async function getClientId(): Promise<string> {
  const result = await chrome.storage.local.get('ga_client_id');
  const ga_client_id = (result['ga_client_id'] as string) || '';
  if (ga_client_id) return ga_client_id;
  const newId = `${Math.random().toString(36).slice(2)}.${Date.now()}`;
  await chrome.storage.local.set({ ga_client_id: newId });
  return newId;
}

export function withClientRef(url: string, clientId: string, email?: string): string {
  try {
    const u = new URL(url);
    if (!u.searchParams.get('client_reference_id')) {
      u.searchParams.set('client_reference_id', clientId);
    }
    // clientId here IS the ga_client_id value (same chrome.storage.local key
    // as shared.js's ensureClientId) — without this, popup-originated upgrade
    // clicks reach checkout.html with no ga_client_id, and the webhook falls
    // back to customerId/sessionId instead of the real GA4 client id.
    if (!u.searchParams.get('ga_client_id')) {
      u.searchParams.set('ga_client_id', clientId);
    }
    if (email && !u.searchParams.get('email')) {
      u.searchParams.set('email', email);
    }
    return u.toString();
  } catch (_) {
    return url;
  }
}

export async function identifyUser(
  distinctId: string,
  email: string,
  plan: string,
  isTrial: boolean
): Promise<void> {
  if (!POSTHOG_KEY) return;
  fetch(POSTHOG_CAPTURE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: POSTHOG_KEY,
      event: '$identify',
      distinct_id: distinctId,
      timestamp: new Date().toISOString(),
      properties: {
        $set: {
          email,
          plan,
          is_trial: isTrial,
        },
        $lib: 'chrome-extension',
        $lib_version: chrome.runtime?.getManifest?.()?.version || '',
      },
    }),
  }).catch(() => {});
  // Bust the cache so subsequent events reflect the new plan
  invalidateLicenseCache();
}

export async function trackEvent(name: string, params: Record<string, unknown> = {}): Promise<void> {
  try {
    const [clientId, superProps] = await Promise.all([getClientId(), getSuperProps()]);
    const ts = new Date().toISOString();

    // PostHog — primary analytics
    fetch(POSTHOG_CAPTURE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event: name,
        distinct_id: clientId,
        timestamp: ts,
        properties: {
          ...superProps,
          ...params,
          $lib: 'chrome-extension',
          $lib_version: (superProps['extension_version'] as string) || '',
        },
      }),
    }).catch(() => {});

    // GA4 — kept only for Google Ads conversion tracking
    fetch(TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, events: [{ name, params }] }),
    }).catch(() => {});
  } catch (_) {
    // fail silently
  }
}
