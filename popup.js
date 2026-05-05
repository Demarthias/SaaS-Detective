(() => {
    "use strict";

    // trackEvent comes from shared.js — do not redefine here

    const STRIPE_LINKS = {
        'monthly': 'https://buy.stripe.com/aFaaEZ76edBi8aQ5wD1Jm00',
        '3mo':     'https://buy.stripe.com/3cIdRb76e9l28aQcZ51Jm04',
        '6mo':     'https://buy.stripe.com/6oU00lduC54M0Io5wD1Jm05',
        'yearly':  'https://buy.stripe.com/8x2bJ3bmu8gYgHm1gn1Jm06'
    };

    window.buy = function(plan) {
        trackEvent('upgrade_clicked', { plan });
        chrome.tabs.create({ url: STRIPE_LINKS[plan] || STRIPE_LINKS['monthly'] });
    };

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

    function buildCard(tool) {
        const card = document.createElement('div');
        card.className = 'card';

        const cardInfo = document.createElement('div');
        cardInfo.className = 'card-info';

        const h4 = document.createElement('h4');
        h4.textContent = tool.name;
        cardInfo.appendChild(h4);

        const desc = document.createElement('div');
        desc.className = 'tool-description';
        desc.textContent = tool.description || '';
        cardInfo.appendChild(desc);

        if (tool.alternatives?.length > 0) {
            const altsDiv = document.createElement('div');
            altsDiv.className = 'alternatives';
            const label = document.createElement('span');
            label.className = 'alt-label';
            label.textContent = 'vs:';
            altsDiv.appendChild(label);
            tool.alternatives.forEach(alt => {
                const chip = document.createElement('button');
                chip.className = 'alt-chip';
                chip.textContent = alt;
                chip.dataset.alt = alt;
                chip.onclick = (e) => {
                    e.stopPropagation();
                    chrome.tabs.create({ url: resolveLink(alt) });
                    trackEvent('alternative_clicked', { from_tool: tool.name, to_tool: alt });
                };
                altsDiv.appendChild(chip);
            });
            cardInfo.appendChild(altsDiv);
        }

        const visitBtn = document.createElement('button');
        visitBtn.className = 'visit-btn';
        visitBtn.textContent = 'Visit';
        visitBtn.onclick = () => {
            chrome.tabs.create({ url: resolveLink(tool.name) });
            trackEvent('tool_visit_clicked', { tool: tool.name });
        };

        card.appendChild(cardInfo);
        card.appendChild(visitBtn);
        return card;
    }

    function buildLockedCard(tool) {
        const card = document.createElement('div');
        card.className = 'card locked';

        const cardInfo = document.createElement('div');
        cardInfo.className = 'card-info';

        const h4 = document.createElement('h4');
        h4.className = 'locked-name';
        h4.textContent = tool.name;
        cardInfo.appendChild(h4);

        const desc = document.createElement('div');
        desc.className = 'tool-description locked-desc';
        desc.textContent = tool.description || 'Pro tool — upgrade to reveal';
        cardInfo.appendChild(desc);

        const badge = document.createElement('button');
        badge.className = 'pro-badge';
        badge.textContent = '🔒 Pro';
        badge.onclick = () => {
            trackEvent('upgrade_clicked', { plan: 'monthly', location: 'locked_card' });
            chrome.tabs.create({ url: STRIPE_LINKS['monthly'] });
        };

        card.appendChild(cardInfo);
        card.appendChild(badge);
        return card;
    }

    function renderTools(tools, lockedTools = []) {
        const resultsEl = document.getElementById('results');
        if (!resultsEl) return;
        resultsEl.innerHTML = '';

        const banner = document.getElementById('upgrade-banner');
        const bannerCount = document.getElementById('upgrade-count');
        const bannerSub = document.getElementById('upgrade-sub');
        if (banner) {
            if (lockedTools.length > 0) {
                const cats = [...new Set(lockedTools.map(t => t.category))].slice(0, 3).join(' · ');
                if (bannerCount) bannerCount.textContent = `+${lockedTools.length} Pro tool${lockedTools.length === 1 ? '' : 's'} detected on this page`;
                if (bannerSub) bannerSub.textContent = `Hidden in: ${cats}`;
                banner.style.display = '';
            } else {
                banner.style.display = 'none';
            }
        }

        if (!tools.length && !lockedTools.length) {
            const empty = document.createElement('div');
            empty.className = 'empty';
            empty.textContent = 'No common SaaS tools detected on this page.';
            resultsEl.appendChild(empty);
            return;
        }

        // Merge free and locked tools into shared category groups
        const groups = new Map();
        for (const tool of tools) {
            if (!groups.has(tool.category)) groups.set(tool.category, { free: [], locked: [] });
            groups.get(tool.category).free.push(tool);
        }
        for (const tool of lockedTools) {
            if (!groups.has(tool.category)) groups.set(tool.category, { free: [], locked: [] });
            groups.get(tool.category).locked.push(tool);
        }

        const fragment = document.createDocumentFragment();
        for (const [cat, { free, locked }] of groups) {
            const header = document.createElement('div');
            header.className = 'category-header';
            header.textContent = `${cat} · ${free.length + locked.length}`;
            fragment.appendChild(header);
            for (const tool of free)   fragment.appendChild(buildCard(tool));
            for (const tool of locked) fragment.appendChild(buildLockedCard(tool));
        }
        resultsEl.appendChild(fragment);
    }

    async function incrementScanCount() {
        const { scan_count = 0 } = await chrome.storage.local.get({ scan_count: 0 });
        const next = scan_count + 1;
        await chrome.storage.local.set({ scan_count: next });
        return next;
    }

    async function maybeShowScanNudge(lockedCount) {
        // Show nudge only if no upgrade banner visible AND user has scanned enough
        if (lockedCount > 0) return;
        const { scan_count = 0 } = await chrome.storage.local.get({ scan_count: 0 });
        if (scan_count < 5) return;
        const nudge = document.getElementById('scan-nudge');
        if (nudge) {
            nudge.textContent = `You've scanned ${scan_count} sites — Pro unlocks 150+ tool signatures across every category.`;
            nudge.style.display = '';
        }
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
            const lockedTools = response.lockedTools || [];
            renderTools(response.tools || [], lockedTools);
            setStatus(`${toolCount} tool${toolCount === 1 ? '' : 's'} detected.`);
            trackEvent('scan_complete', { count: toolCount, locked: lockedTools.length });
            await incrementScanCount();
            await maybeShowScanNudge(lockedTools.length);
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

        document.getElementById('onboardingLink')?.addEventListener('click', () =>
            chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') }));
        document.getElementById('optionsLink')?.addEventListener('click', () =>
            chrome.runtime.openOptionsPage());
        document.getElementById('upgradeBannerBtn')?.addEventListener('click', () => {
            trackEvent('upgrade_clicked', { plan: 'yearly', location: 'popup_banner' });
            chrome.tabs.create({ url: STRIPE_LINKS['yearly'] });
        });
        document.getElementById('upgradeBannerMonthly')?.addEventListener('click', () => {
            trackEvent('upgrade_clicked', { plan: 'monthly', location: 'popup_banner_monthly' });
            chrome.tabs.create({ url: STRIPE_LINKS['monthly'] });
        });
    });
})();
