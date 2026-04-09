(()=>{"use strict";

async function trackEvent(name, params = {}) {
  try {
    let clientId = (await chrome.storage.local.get('ga_client_id')).ga_client_id;
    if (!clientId) {
      clientId = `${Math.random().toString(36).slice(2)}.${Date.now()}`;
      await chrome.storage.local.set({ ga_client_id: clientId });
    }
    await fetch('https://saas-detective-licensing.kubegrayson.workers.dev/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, events: [{ name, params }] }),
    });
  } catch (_) {}
}

let affiliateTable = {};

function resolveLink(toolName, fallback) {
  const entry = affiliateTable[toolName];
  if (entry && entry.status === 'active') return entry.url;
  if (fallback && fallback !== '#') return fallback;
  return `https://www.google.com/search?q=${encodeURIComponent(toolName + ' software')}`;
}

function setStatus(msg, isError = false) {
  const el = document.getElementById('status');
  if (!el) return;
  el.textContent = msg;
  el.classList.toggle('error', Boolean(isError));
}

function renderTools(tools, locked = 0) {
  const resultsEl = document.getElementById('results');
  if (!resultsEl) return;
  resultsEl.innerHTML = '';

  if (!tools || tools.length === 0) {
    resultsEl.innerHTML = '<div class="empty">No common SaaS tools detected on this page.</div>';
    if (locked > 0) appendUpgradeBanner(resultsEl, locked);
    return;
  }

  // Group by category
  const groups = new Map();
  for (const tool of tools) {
    if (!groups.has(tool.category)) groups.set(tool.category, []);
    groups.get(tool.category).push(tool);
  }

  const fragment = document.createDocumentFragment();

  for (const [cat, catTools] of groups) {
    const header = document.createElement('div');
    header.className = 'category-header';
    header.textContent = `${cat} · ${catTools.length}`;
    fragment.appendChild(header);

    for (const tool of catTools) {
      const card = document.createElement('div');
      card.className = 'card';

      const info = document.createElement('div');
      info.className = 'card-info';

      const name = document.createElement('h4');
      name.textContent = tool.name;
      info.appendChild(name);

      if (tool.description) {
        const desc = document.createElement('div');
        desc.className = 'tool-description';
        desc.textContent = tool.description;
        info.appendChild(desc);
      }

      if (tool.alternatives && tool.alternatives.length > 0) {
        const altRow = document.createElement('div');
        altRow.className = 'alternatives';
        const altLabel = document.createElement('span');
        altLabel.className = 'alt-label';
        altLabel.textContent = 'vs:';
        altRow.appendChild(altLabel);
        for (const alt of tool.alternatives) {
          const chip = document.createElement('button');
          chip.className = 'alt-chip';
          chip.textContent = alt;
          chip.title = `Open ${alt}`;
          chip.addEventListener('click', (e) => {
            e.stopPropagation();
            chrome.tabs.create({ url: resolveLink(alt) });
            trackEvent('alternative_clicked', { from_tool: tool.name, to_tool: alt });
          });
          altRow.appendChild(chip);
        }
        info.appendChild(altRow);
      }

      const link = resolveLink(tool.name);
      const btn = document.createElement('button');
      btn.className = 'visit-btn';
      btn.textContent = 'Visit';
      btn.addEventListener('click', () => {
        chrome.tabs.create({ url: link });
        trackEvent('tool_visit_clicked', { tool: tool.name });
      });

      card.appendChild(info);
      card.appendChild(btn);
      fragment.appendChild(card);
    }
  }

  resultsEl.appendChild(fragment);
  if (locked > 0) appendUpgradeBanner(resultsEl, locked);
}

function appendUpgradeBanner(container, locked) {
  const banner = document.createElement('div');
  banner.className = 'upgrade-banner';

  const count = document.createElement('div');
  count.className = 'upgrade-count';
  count.textContent = `+${locked} more tool${locked !== 1 ? 's' : ''} detected`;

  const sub = document.createElement('div');
  sub.className = 'upgrade-sub';
  sub.textContent = 'Upgrade to Pro to reveal all 200+ signatures';

  const btn = document.createElement('button');
  btn.className = 'upgrade-btn';
  btn.textContent = 'Upgrade — from $7.99/mo';
  btn.addEventListener('click', () => {
    trackEvent('upgrade_clicked', { location: 'popup_banner' });
    chrome.tabs.create({ url: 'https://buy.stripe.com/aFaaEZ76edBi8aQ5wD1Jm00' });
  });

  banner.appendChild(count);
  banner.appendChild(sub);
  banner.appendChild(btn);
  container.appendChild(banner);
}

function sendMessageToTab(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { action: 'SCAN_PAGE' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        reject(chrome.runtime.lastError || new Error('No response'));
        return;
      }
      resolve(response);
    });
  });
}

async function sendScan(tabId) {
  try {
    return await sendMessageToTab(tabId);
  } catch (e) {
    if (chrome.scripting?.executeScript) {
      await chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] });
      return await sendMessageToTab(tabId);
    }
    throw e;
  }
}

const SCAN_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedScan(url) {
  const key = `sd_scan_${url}`;
  const result = await chrome.storage.local.get(key);
  const cached = result[key];
  if (cached && Date.now() - cached.ts < SCAN_CACHE_TTL) return cached.data;
  return null;
}

async function setCachedScan(url, data) {
  const key = `sd_scan_${url}`;
  await chrome.storage.local.set({ [key]: { ts: Date.now(), data } });
}

async function scanPage() {
  setStatus('Scanning current tab...');
  const resultsEl = document.getElementById('results');
  if (resultsEl) resultsEl.innerHTML = '';

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url || (!tab.url.startsWith('http://') && !tab.url.startsWith('https://'))) {
    setStatus('Open a website tab to scan.', true);
    return;
  }

  const cached = await getCachedScan(tab.url);
  if (cached) {
    renderTools(cached.tools, cached.locked);
    setStatus('Scan complete.');
    return;
  }

  try {
    const response = await sendScan(tab.id);
    const tools = response.tools || [];
    const locked = response.locked || 0;
    renderTools(tools, locked);
    setStatus(tools.length || locked ? 'Scan complete.' : 'Scan complete. Nothing detected.');
    await setCachedScan(tab.url, { tools, locked });
    trackEvent('scan_complete', { tools_detected: tools.length, tools_locked: locked });
  } catch (_) {
    setStatus('Unable to scan this page. Please refresh and try again.', true);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // load affiliates
  try {
    const r = await fetch(chrome.runtime.getURL('affiliates.json'));
    affiliateTable = await r.json();
  } catch (_) { affiliateTable = {}; }

  trackEvent('popup_opened');
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

})();
