const GA_MEASUREMENT_ID = 'G-HVECKYG478';
const GA_API_SECRET = 'kEY9SzVPS-OtwXuN-ofsEA';

async function getClientId(): Promise<string> {
  const result = await chrome.storage.local.get('ga_client_id');
  const ga_client_id = (result['ga_client_id'] as string) || '';
  if (ga_client_id) return ga_client_id;
  const newId = `${Math.random().toString(36).slice(2)}.${Date.now()}`;
  await chrome.storage.local.set({ ga_client_id: newId });
  return newId;
}

export async function trackEvent(name: string, params: Record<string, unknown> = {}): Promise<void> {
  try {
    const clientId = await getClientId();
    await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name, params }],
      }),
    });
  } catch (_) {
    // fail silently
  }
}
