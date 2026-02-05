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

function renderTools(tools) {
  const resultsEl = document.getElementById('results');
  resultsEl.innerHTML = '';

  if (!tools || tools.length === 0) {
    resultsEl.innerHTML = '<div class="empty">No common SaaS tools detected on this page.</div>';
    return;
  }

  const fragment = document.createDocumentFragment();

  tools.forEach(tool => {
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
    const response = await sendScan(tab.id);
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

  // Wire footer links
  document.getElementById('onboardingLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  });

  document.getElementById('optionsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
});