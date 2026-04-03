const FREE_TOOL_LIMIT = 5;
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_eVqbJ1g5m3Gm2X97uJ9fW01'; // Monthly $8.99/mo
const WORKER_URL = 'https://saas-detective-license.YOUR_SUBDOMAIN.workers.dev'; // Replace after deploying worker

let affiliateTable = {};
let sdOptions = {};

async function loadOptions() {
  const DEFAULT_OPTIONS = {};
  const { sd_options } = await chrome.storage.sync.get({ sd_options: DEFAULT_OPTIONS });
  sdOptions = { ...DEFAULT_OPTIONS, ...(sd_options || {}) };
}

async function loadAffiliates() {
  try {
    const response = await fetch(chrome.runtime.getURL('affiliates.json'));
    affiliateTable = await response.json();
  } catch (_) {
    affiliateTable = {};
  }
}

async function checkProStatus() {
  const { sd_license: key, sd_pro_cache: cache } = await chrome.storage.sync.get({
    sd_license: null,
    sd_pro_cache: 0,
  });
  if (!key) return false;
  if (cache > Date.now()) return true;
  try {
    const resp = await fetch(`${WORKER_URL}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
    const data = await resp.json();
    if (data.valid) {
      await chrome.storage.sync.set({ sd_pro_cache: Date.now() + 86400000 });
      return true;
    }
  } catch (_) {}
  return false;
}

function resolveLink(toolName, fallbackLink) {
  const entry = affiliateTable[toolName];
  if (entry && entry.status === 'active') {
    return entry.url;
  }
  if (fallbackLink && fallbackLink !== '#') {
    return fallbackLink;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(toolName)}`;
}

function setStatus(message, isError = false) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.classList.toggle('error', Boolean(isError));
}

function renderTools(tools, isPro) {
  const resultsEl = document.getElementById('results');
  resultsEl.innerHTML = '';

  if (!tools || tools.length === 0) {
    resultsEl.innerHTML = '<div class="empty">No common SaaS tools detected on this page.</div>';
    return;
  }

  const visibleTools = isPro ? tools : tools.slice(0, FREE_TOOL_LIMIT);
  const hiddenCount = isPro ? 0 : Math.max(0, tools.length - visibleTools.length);
  const fragment = document.createDocumentFragment();

  visibleTools.forEach(tool => {
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

  if (hiddenCount > 0) {
    const banner = document.createElement('div');
    banner.className = 'upgrade-banner';
    banner.innerHTML = `
      <div class="upgrade-count">+${hiddenCount} more tool${hiddenCount > 1 ? 's' : ''} detected</div>
      <div class="upgrade-sub">Upgrade to Pro to unlock all detections</div>
      <button class="upgrade-btn" id="upgradeBtn">Upgrade to Pro &mdash; $4.99/mo</button>
    `;
    fragment.appendChild(banner);
  }

  resultsEl.appendChild(fragment);

  document.getElementById('upgradeBtn')?.addEventListener('click', () => {
    chrome.tabs.create({ url: STRIPE_PAYMENT_LINK });
  });
}

function sendMessageToTab(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { action: 'SCAN_PAGE' }, response => {
      if (chrome.runtime.lastError || !response) {
        reject(chrome.runtime.lastError || new Error('No response from content script'));
        return;
      }
      resolve(response);
    });
  });
}

async function sendScan(tabId) {
  try {
    return await sendMessageToTab(tabId);
  } catch (error) {
    if (chrome.scripting?.executeScript) {
      await chrome.scripting.executeScript({ target: { tabId }, files: ['dist/content.js'] });
      return await sendMessageToTab(tabId);
    }
    throw error;
  }
}

function isHttpUrl(url) {
  return Boolean(url && (url.startsWith('http://') || url.startsWith('https://')));
}

async function scanPage() {
  setStatus('Scanning current tab...');
  const resultsEl = document.getElementById('results');
  resultsEl.innerHTML = '';

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !isHttpUrl(tab.url)) {
    setStatus('Open a website tab to scan.', true);
    return;
  }

  try {
    const [response, isPro] = await Promise.all([sendScan(tab.id), checkProStatus()]);
    const tools = response.tools || [];
    renderTools(tools, isPro);
    setStatus(tools.length ? 'Scan complete.' : 'Scan complete. Nothing detected.');
  } catch (_) {
    setStatus('Unable to scan this page. Please refresh and try again.', true);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadOptions();
  await loadAffiliates();
  scanPage();

  document.getElementById('onboardingLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  });

  document.getElementById('optionsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
});
