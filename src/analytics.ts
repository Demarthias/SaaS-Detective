declare const process: { env: { POSTHOG_PROJECT_TOKEN: string; POSTHOG_HOST: string } };

const TRACK_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/track';
const POSTHOG_KEY = process.env.POSTHOG_PROJECT_TOKEN;
const POSTHOG_URL = process.env.POSTHOG_HOST + '/capture/';

export async function getClientId(): Promise<string> {
  const result = await chrome.storage.local.get('ga_client_id');
  const ga_client_id = (result['ga_client_id'] as string) || '';
  if (ga_client_id) return ga_client_id;
  const newId = `${Math.random().toString(36).slice(2)}.${Date.now()}`;
  await chrome.storage.local.set({ ga_client_id: newId });
  return newId;
}

export function withClientRef(url: string, clientId: string): string {
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

export async function trackEvent(name: string, params: Record<string, unknown> = {}): Promise<void> {
  try {
    const clientId = await getClientId();

    // PostHog — primary analytics
    fetch(POSTHOG_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event: name,
        distinct_id: clientId,
        properties: { ...params, $lib: 'chrome-extension' },
      }),
    });

    // GA4 — kept only for Google Ads conversion tracking
    fetch(TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, events: [{ name, params }] }),
    });
  } catch (_) {
    // fail silently
  }
}
