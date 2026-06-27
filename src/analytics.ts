declare const process: { env: { POSTHOG_PROJECT_TOKEN: string; POSTHOG_HOST: string } };

const TRACK_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/track';
const POSTHOG_KEY = process.env.POSTHOG_PROJECT_TOKEN;
const POSTHOG_CAPTURE_URL = process.env.POSTHOG_HOST + '/capture/';

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
    if (email && !u.searchParams.get('prefilled_email')) {
      u.searchParams.set('prefilled_email', email);
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
