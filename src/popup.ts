let affiliateTable: Record<string, { status: string; url: string }> = {};
let sdOptions: Record<string, unknown> = {};

async function loadOptions(): Promise<void> {
  const DEFAULT_OPTIONS = {};
  const { sd_options } = await chrome.storage.sync.get({ sd_options: DEFAULT_OPTIONS });
  sdOptions = { ...DEFAULT_OPTIONS, ...(sd_options || {}) };
}

async function loadAffiliates(): Promise<void> {
  try {
    const response = await fetch(chrome.runtime.getURL('affiliates.json'));
    affiliateTable = await response.json();
  } catch (_) {
    affiliateTable = {};
  }
}

function resolveLink(toolName: string, fallbackLink?: string): string {
  const entry = affiliateTable[toolName];
  if (entry && entry.status === 'active') {
    return entry.url;
  }
  if (fallbackLink && fallbackLink !== '#') {
    return fallbackLink;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(toolName)}`;
}

function setStatus(message: string, isError = false): void {
  const statusEl = document.getElementById('status');
  if (!statusEl) {
    return;
  }
  statusEl.textContent = message;
  statusEl.classList.toggle('error', Boolean(isError));
}

function renderTools(tools: Array<{ name: string; category: string; link?: string }>): void {
  const resultsEl = document.getElementById('results');
  if (!resultsEl) {
    return;
  }
  resultsEl.innerHTML = '';

  if (!tools || tools.length === 0) {
    resultsEl.innerHTML = '<div class="empty">No common SaaS tools detected on this page.</div>';
    return;
  }

  const fragment = document.createDocumentFragment();

  tools.forEach((tool) => {
    const card = document.createElement('div');
    card.className = 'card';

    const info = document.createElement('div');
    const name = document.createElement('h4');
    name.textContent = tool.name;
    const category = document.createElement('div');
    category.className = 'category';
    category.textContent = tool.category;
    info.appendChild(name);
    info.appendChild(category);

    const link = resolveLink(tool.name, tool.link);
    const button = document.createElement('button');
    button.className = 'visit-btn';
    button.textContent = 'Visit';
    button.addEventListener('click', () => {
      chrome.tabs.create({ url: link });
    });

    card.appendChild(info);
    card.appendChild(button);
    fragment.appendChild(card);
  });

  resultsEl.appendChild(fragment);
}

function sendMessageToTab(
  tabId: number
): Promise<{ tools?: Array<{ name: string; category: string; link?: string }> }> {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { action: 'SCAN_PAGE' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        reject(chrome.runtime.lastError || new Error('No response from content script'));
        return;
      }
      resolve(response);
    });
  });
}

async function sendScan(
  tabId: number
): Promise<{ tools?: Array<{ name: string; category: string; link?: string }> }> {
  try {
    return await sendMessageToTab(tabId);
  } catch (error) {
    if (chrome.scripting?.executeScript) {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ['dist/content.js'],
      });
      return await sendMessageToTab(tabId);
    }
    throw error;
  }
}

function isHttpUrl(url?: string): boolean {
  return Boolean(url && (url.startsWith('http://') || url.startsWith('https://')));
}

async function scanPage(): Promise<void> {
  setStatus('Scanning current tab...');
  const resultsEl = document.getElementById('results');
  if (resultsEl) {
    resultsEl.innerHTML = '';
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !isHttpUrl(tab.url)) {
    setStatus('Open a website tab to scan.', true);
    return;
  }

  try {
    const response = await sendScan(tab.id!);
    const tools = response.tools || [];
    renderTools(tools);
    setStatus(tools.length ? 'Scan complete.' : 'Scan complete. Nothing detected.');
  } catch (_) {
    setStatus('Unable to scan this page. Please refresh and try again.', true);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadOptions();
  await loadAffiliates();
  scanPage();

  document.getElementById('onboardingLink')?.addEventListener('click', (event) => {
    event.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  });

  document.getElementById('optionsLink')?.addEventListener('click', (event) => {
    event.preventDefault();
    chrome.runtime.openOptionsPage();
  });
});
