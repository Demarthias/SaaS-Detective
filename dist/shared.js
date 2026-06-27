// Shared constants and utilities
// Loaded by popup.html, options.html, onboarding.html via <script src="shared.js">
// Do NOT include in content_scripts — content.js runs in web page context

const TRACK_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/track';
const VALIDATE_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/validate';
const POSTHOG_KEY = 'phc_tiu7QvVMRHTEanqn8DtzdMd524u78aGmCnAbMWYxfHkJ';
const POSTHOG_CAPTURE_URL = 'https://api.venom-industries.com/capture/';
const LICENSE_TTL_MS = 48 * 60 * 60 * 1000;
const LICENSE_GRACE_MS = 7 * 24 * 60 * 60 * 1000;

let _cachedClientId = null;
let _clientIdPromise = null;
let _superPropsCache = null;

function ensureClientId() {
  if (_cachedClientId) return Promise.resolve(_cachedClientId);
  if (_clientIdPromise) return _clientIdPromise;
  _clientIdPromise = (async () => {
    let id = (await chrome.storage.local.get('ga_client_id')).ga_client_id;
    if (!id) {
      id = `${Math.random().toString(36).slice(2)}.${Date.now()}`;
      await chrome.storage.local.set({ ga_client_id: id });
    }
    _cachedClientId = id;
    return id;
  })();
  return _clientIdPromise;
}

async function getSuperProps() {
  if (_superPropsCache) return _superPropsCache;
  try {
    const { sd_license } = await chrome.storage.sync.get({ sd_license: null });
    _superPropsCache = {
      extension_version: chrome.runtime?.getManifest?.()?.version || '',
      plan: sd_license?.plan || 'free',
      is_licensed: Boolean(sd_license?.valid),
      is_trial: Boolean(sd_license?.trial),
    };
  } catch (_) {
    _superPropsCache = { extension_version: chrome.runtime?.getManifest?.()?.version || '' };
  }
  return _superPropsCache;
}

function invalidatePropsCache() {
  _superPropsCache = null;
}

function appendClientRef(url, clientId) {
  try {
    const u = new URL(url);
    if (!u.searchParams.get('client_reference_id')) {
      u.searchParams.set('client_reference_id', clientId);
    }
    return u.toString();
  } catch (_) {
    return url;
  }
}

function attachClientRef(anchorEl) {
  ensureClientId().then((id) => {
    try { anchorEl.href = appendClientRef(anchorEl.href, id); } catch (_) {}
  });
}

ensureClientId();

async function identifyUser(email, plan, isTrial) {
  try {
    const clientId = await ensureClientId();
    fetch(POSTHOG_CAPTURE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event: '$identify',
        distinct_id: clientId,
        timestamp: new Date().toISOString(),
        properties: {
          $set: { email, plan, is_trial: isTrial },
          $lib: 'chrome-extension',
          $lib_version: chrome.runtime?.getManifest?.()?.version || '',
        },
      }),
    }).catch(() => {});
    invalidatePropsCache();
  } catch (_) {}
}

async function trackEvent(name, params = {}) {
  try {
    const [clientId, superProps] = await Promise.all([ensureClientId(), getSuperProps()]);
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
          $lib_version: superProps.extension_version || '',
        },
      }),
    }).catch(() => {});

    // GA4 — kept only for Google Ads conversion tracking
    fetch(TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, events: [{ name, params }] }),
    }).catch(() => {});
  } catch (_) {}
}
