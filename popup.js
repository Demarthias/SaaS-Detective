(() => {
    "use strict";

    const STRIPE_LINKS = {
        'monthly':   'https://buy.stripe.com/aFaaEZ76edBi8aQ5wD1Jm00',
        '3mo':       'https://buy.stripe.com/3cIdRb76e9l28aQcZ51Jm04',
        '6mo':       'https://buy.stripe.com/6oU00lduC54M0Io5wD1Jm05',
        'yearly':    'https://buy.stripe.com/8x2bJ3bmu8gYgHm1gn1Jm06'
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

    let linkTable = {};

    function resolveLink(toolName) {
        const entry = linkTable[toolName];
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
        if (!resultsEl) return;
        resultsEl.innerHTML = '';

        const banner = document.getElementById('upgrade-banner');
        const bannerCount = document.getElementById('upgrade-count');
        if (banner && bannerCount) {
            if (locked > 0) {
                bannerCount.textContent = `+${locked} pro tool${locked === 1 ? '' : 's'} hidden on this page`;
                banner.style.display = '';
            } else {
                banner.style.display = 'none';
            }
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

            const toolCount = response.tools?.length ?? 0;
            const lockedCount = response.locked ?? 0;
            renderTools(response.tools || [], lockedCount);
            setStatus(`${toolCount} tool${toolCount === 1 ? '' : 's'} detected.`);
            trackEvent('scan_complete', { count: toolCount, locked: lockedCount });
        } catch (e) {
            setStatus('Scan failed. Refresh page.', true);
        }
    }

    document.addEventListener('DOMContentLoaded', async () => {
        trackEvent('popup_opened');

        try {
            const r = await fetch(chrome.runtime.getURL('affiliates.json'));
            linkTable = await r.json();
        } catch (_) {}
        scanPage();

        document.getElementById('rescanBtn')?.addEventListener('click', () => {
            trackEvent('rescan_clicked');
            scanPage();
        });

        document.getElementById('onboardingLink')?.addEventListener('click', () => chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') }));
        document.getElementById('optionsLink')?.addEventListener('click', () => chrome.runtime.openOptionsPage());
        document.getElementById('upgradeBannerBtn')?.addEventListener('click', () => {
            trackEvent('upgrade_clicked', { plan: 'monthly', location: 'popup_banner' });
            chrome.tabs.create({ url: STRIPE_LINKS['monthly'] });
        });
    });
})();