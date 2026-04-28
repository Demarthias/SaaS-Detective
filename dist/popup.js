(() => {
(() => {
    "use strict";

    const STRIPE_LINKS = {
        'monthly': 'https://buy.stripe.com/aFaaEZ76edBi8aQ5wD1Jm00',
        '3mo': 'https://buy.stripe.com/your_3mo_id',
        '6mo': 'https://buy.stripe.com/your_6mo_id',
        'yearly': 'https://buy.stripe.com/your_yearly_id'
    };

    window.buy = function(plan) {
        trackEvent('upgrade_clicked', { plan: plan });
        const url = STRIPE_LINKS[plan] || STRIPE_LINKS['monthly'];
        chrome.tabs.create({ url: url });
    };

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

    function resolveLink(toolName) {
        const entry = affiliateTable[toolName];
        if (entry && entry.status === 'active') return entry.url;
        return `https://www.google.com/search?q=${encodeURIComponent(toolName + ' software')}`;
    }

    function setStatus(msg, isError = false) {
        const el = document.getElementById('status');
        if (el) {
            el.textContent = msg;
            el.classList.toggle('error', Boolean(isError));
        }
    }

    function renderTools(tools, locked = 0) {
        const resultsEl = document.getElementById('results');
        const proTitle = document.getElementById('pro-title');
        if (!resultsEl) return;
        resultsEl.innerHTML = '';

        if (proTitle && locked > 0) {
            proTitle.innerHTML = `🔓 Unlock ${locked} More Pro Insights`;
        }

        if (!tools || tools.length === 0) {
            resultsEl.innerHTML = '<div class="empty">No common SaaS tools detected on this page.</div>';
            return;
        }

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
                
                let altsHtml = '';
                if (tool.alternatives?.length > 0) {
                    altsHtml = `<div class="alternatives"><span class="alt-label">vs:</span>`;
                    tool.alternatives.forEach(alt => {
                        altsHtml += `<button class="alt-chip" data-alt="${alt}">${alt}</button>`;
                    });
                    altsHtml += `</div>`;
                }

                card.innerHTML = `
                    <div class="card-info">
                        <h4>${tool.name}</h4>
                        <div class="tool-description">${tool.description || ''}</div>
                        ${altsHtml}
                    </div>
                    <button class="visit-btn">Visit</button>
                `;

                card.querySelector('.visit-btn').onclick = () => {
                    chrome.tabs.create({ url: resolveLink(tool.name) });
                    trackEvent('tool_visit_clicked', { tool: tool.name });
                };

                card.querySelectorAll('.alt-chip').forEach(btn => {
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        const alt = btn.getAttribute('data-alt');
                        chrome.tabs.create({ url: resolveLink(alt) });
                        trackEvent('alternative_clicked', { from_tool: tool.name, to_tool: alt });
                    };
                });

                fragment.appendChild(card);
            }
        }
        resultsEl.appendChild(fragment);
    }

    async function scanPage() {
        setStatus('Scanning current tab...');
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.url?.startsWith('http')) {
            setStatus('Open a website to scan.', true);
            return;
        }

        try {
            const response = await chrome.tabs.sendMessage(tab.id, { action: 'SCAN_PAGE' }).catch(async () => {
                await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
                return chrome.tabs.sendMessage(tab.id, { action: 'SCAN_PAGE' });
            });

            renderTools(response.tools || [], response.locked || 0);
            setStatus('Scan complete.');
            trackEvent('scan_complete', { count: response.tools?.length });
        } catch (e) {
            setStatus('Scan failed. Refresh page.', true);
        }
    }

    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const r = await fetch(chrome.runtime.getURL('affiliates.json'));
            affiliateTable = await r.json();
        } catch (_) {}
        scanPage();
        
        document.getElementById('onboardingLink')?.onclick = () => chrome.tabs.create({ url: chrome.runtime.getURL("onboarding.html") });
        document.getElementById('optionsLink')?.onclick = () => chrome.runtime.openOptionsPage();
    });
})();