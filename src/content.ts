import { signatures } from './core/src.signatures';

const DEFAULT_OPTIONS = {
  enabledCategories: {
    'CMS': true,
    'E-Commerce': true,
    'Builder': true,
    'No-Code': true,
    'Analytics': true,
    'Data Platform': true,
    'Heatmap': true,
    'Session Replay': true,
    'Observability': true,
    'Error Tracking': true,
    'Chat': true,
    'CRM': true,
    'Marketing Auto': true,
    'Email': true,
    'Push Notifications': true,
    'Support': true,
    'Ads': true,
    'Native Ads': true,
    'Retargeting': true,
    'Framework': true,
    'Library': true,
    'CSS': true,
    'Payments': true,
    'CDN': true,
    'Storage': true,
    'Hosting': true,
    'Security': true,
    'Compliance': true,
    'Icons': true,
    'Fonts': true,
    'Comments': true,
  },
};

type Options = typeof DEFAULT_OPTIONS;

async function getEnabledCategories(): Promise<Record<string, boolean>> {
  const { sd_options } = await chrome.storage.sync.get({
    sd_options: DEFAULT_OPTIONS,
  }) as { sd_options: Options };
  return sd_options?.enabledCategories || DEFAULT_OPTIONS.enabledCategories;
}

function detectTools(enabledCategories: Record<string, boolean>) {
  const html = document.documentElement?.innerHTML || '';
  const htmlLower = html.toLowerCase();
  const seen = new Set<string>();
  const tools: Array<{ id: string; name: string; category: string }> = [];

  signatures.forEach((signature) => {
    if (!enabledCategories[signature.category]) {
      return;
    }

    const matches = signature.patterns.some((pattern) =>
      htmlLower.includes(pattern.toLowerCase())
    );

    if (matches && !seen.has(signature.id)) {
      seen.add(signature.id);
      tools.push({
        id: signature.id,
        name: signature.name,
        category: signature.category,
      });
    }
  });

  return tools;
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action !== 'SCAN_PAGE') {
    return false;
  }

  getEnabledCategories()
    .then((enabledCategories) => {
      const tools = detectTools(enabledCategories);
      sendResponse({ tools });
    })
    .catch(() => {
      sendResponse({ tools: [], error: 'scan_failed' });
    });

  return true;
});
