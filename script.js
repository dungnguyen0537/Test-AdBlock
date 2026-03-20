(() => {
    'use strict';

    const DATA = cloneData(window.AD_BLOCK_TEST_DATA);
    const CATEGORY_ORDER = ['ads', 'tracking', 'malware', 'adult', 'spam', 'telemetry'];
    const CONTROL_TIMEOUT = 4000;
    const PROBE_TIMEOUT = 5000;
    const CONCURRENCY = 1; // Khách hàng yêu cầu chạy tuần tự thay vì song song
    const AUTO_PROBE_PREFIX = 'live';
    const AUTO_DATA_CACHE_KEY = 'adblock-live-feed-cache-v2';
    const AUTO_DATA_CACHE_VERSION = 2;
    const AUTO_DATA_TIMEOUT = 12000;

    const AUTO_FEEDS = [
        {
            category: 'ads',
            label: 'EasyList',
            url: 'https://cdn.jsdelivr.net/gh/easylist/easylist@master/easylist/easylist.txt',
            parser: 'adblock',
            maxItems: 10,
        },
        {
            category: 'tracking',
            label: 'EasyPrivacy',
            url: 'https://cdn.jsdelivr.net/gh/easylist/easylist@master/easyprivacy/easyprivacy.txt',
            parser: 'adblock',
            maxItems: 8,
        },
        {
            category: 'ads',
            label: 'AdGuard DNS Filter',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'ads',
            label: '1Hosts (Lite)',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_24.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'ads',
            label: 'AWAvenue Ads Rule',
            url: 'https://cdn.jsdelivr.net/gh/TG-Twilight/AWAvenue-Ads-Rule@main/AWAvenue-Ads-Rule.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'ads',
            label: 'Dan Pollock\'s List',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_4.txt',
            parser: 'mixed',
            maxItems: 3,
        },
        {
            category: 'tracking',
            label: 'OISD Blocklist Small',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_5.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'tracking',
            label: 'HaGeZi\'s Pro Blocklist',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_48.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'tracking',
            label: 'ShadowWhisperer\'s Tracking List',
            url: 'https://cdn.jsdelivr.net/gh/ShadowWhisperer/BlockLists@master/Lists/Tracking',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'spam',
            label: 'AdGuard DNS Popup Hosts filter',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_59.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'spam',
            label: 'Dandelion Sprout\'s Anti Push Notifications',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_39.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'malware',
            label: 'StevenBlack Hosts',
            url: 'https://cdn.jsdelivr.net/gh/StevenBlack/hosts@master/hosts',
            parser: 'hosts',
            maxItems: 5,
        },
        {
            category: 'malware',
            label: 'Phishing URL Blocklist',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_30.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'malware',
            label: 'Dandelion Sprout\'s Anti-Malware List',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_12.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'malware',
            label: 'HaGeZi\'s Threat Intelligence Feeds',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_44.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'malware',
            label: 'Phishing Army',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_18.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'malware',
            label: 'Malicious URL Blocklist (URLHaus)',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_11.txt',
            parser: 'mixed',
            maxItems: 4,
        },
        {
            category: 'malware',
            label: 'Stalkerware Indicators List',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_31.txt',
            parser: 'mixed',
            maxItems: 3,
        },
        {
            category: 'malware',
            label: 'NoCoin Filter List',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_8.txt',
            parser: 'mixed',
            maxItems: 3,
        },
        {
            category: 'malware',
            label: 'uBlock0 filters - Badware risks',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_50.txt',
            parser: 'mixed',
            maxItems: 3,
        },
        {
            category: 'adult',
            label: 'StevenBlack Porn',
            url: 'https://cdn.jsdelivr.net/gh/StevenBlack/hosts@master/alternates/porn/hosts',
            parser: 'hosts',
            maxItems: 5,
        },
        {
            category: 'adult',
            label: 'ShadowWhisperer\'s Dating List',
            url: 'https://cdn.jsdelivr.net/gh/ShadowWhisperer/BlockLists@master/Lists/Dating',
            parser: 'mixed',
            maxItems: 3,
        },
        {
            category: 'telemetry',
            label: 'WindowsSpyBlocker',
            url: 'https://cdn.jsdelivr.net/gh/crazy-max/WindowsSpyBlocker@master/data/hosts/spy.txt',
            parser: 'hosts',
            maxItems: 4,
        },
        {
            category: 'telemetry',
            label: 'Perflyst and Dandelion Sprout\'s Smart-TV Blocklist',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_7.txt',
            parser: 'mixed',
            maxItems: 3,
        },
        {
            category: 'telemetry',
            label: 'HaGeZi\'s Apple Tracker Blocklist',
            url: 'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@main/adblock/native.apple.txt',
            parser: 'mixed',
            maxItems: 3,
        },
        {
            category: 'telemetry',
            label: 'HaGeZi\'s Samsung Tracker Blocklist',
            url: 'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@main/adblock/native.samsung.txt',
            parser: 'mixed',
            maxItems: 3,
        },
        {
            category: 'telemetry',
            label: 'HaGeZi\'s Windows/Office Tracker Blocklist',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_63.txt',
            parser: 'mixed',
            maxItems: 3,
        },
        {
            category: 'telemetry',
            label: 'HaGeZi\'s Xiaomi Tracker Blocklist',
            url: 'https://adguardteam.github.io/HostlistsRegistry/assets/filter_60.txt',
            parser: 'mixed',
            maxItems: 3,
        },
    ];

    let autoDataPromise = null;

    const CATEGORY_ICONS = {
        ads: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
        tracking: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
        malware: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
        adult: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
        spam: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l16 16"/><path d="M4 20L20 4"/><circle cx="12" cy="12" r="10"/></svg>`,
        telemetry: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`
    };

    const state = {
        isRunning: false,
        controlsHealthy: false,
        controlsPassed: 0,
        results: {},
        abortControllers: [],
        progress: { total: 0, done: 0 },
        startTime: 0,
        resultsReady: false,
        autoDataMeta: {
            mode: 'static',
            totalAuto: 0,
        },
    };

    const TEXT = {
        pending: 'Chờ kiểm tra',
        testing: 'Đang kiểm tra',
        blocked: 'Bị chặn',
        partial: 'Chặn một phần',
        passed: 'Đi qua được',
        uncertain: 'Không chắc chắn',
    };

    /* ─── Utilities ─── */

    function cloneData(value) {
        if (!value) return null;
        if (typeof window.structuredClone === 'function') {
            return window.structuredClone(value);
        }
        return JSON.parse(JSON.stringify(value));
    }

    function escapeHtml(v) {
        return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    }

    function getCategoryItems(cat) { return DATA.probes[cat] || []; }

    function getAllProbeCount() {
        return CATEGORY_ORDER.reduce((t, c) => t + getCategoryItems(c).length, 0);
    }

    function $(id) { return document.getElementById(id); }

    function setText(id, v) { const el = $(id); if (el) el.textContent = v; }

    function isAutoProbe(probe) {
        return typeof probe?.id === 'string' && probe.id.startsWith(`${AUTO_PROBE_PREFIX}-`);
    }

    function getTodayKey() {
        return new Date().toISOString().slice(0, 10);
    }

    function setRunStatus(text, mode) {
        const chip = $('runStatus');
        const label = $('runStatusLabel');
        if (chip) chip.className = `chip status-chip ${mode || 'is-idle'}`;
        if (label) label.textContent = text;
    }

    function getDatasetLabel() {
        const suffixByMode = {
            syncing: ' • đang đồng bộ',
            live: ' • live',
            cache: ' • cache',
            'stale-cache': ' • cache cũ',
        };
        const suffix = suffixByMode[state.autoDataMeta.mode] || '';
        return `Dữ liệu: ${DATA?.refreshedAt || '-'}${suffix}`;
    }

    function formatRunTime(v) {
        if (!v) return '-';
        return new Date(v).toLocaleString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' });
    }

    function detectBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes('Firefox/')) return 'Firefox';
        if (ua.includes('Edg/')) return 'Microsoft Edge';
        if (ua.includes('OPR/') || ua.includes('Opera/')) return 'Opera';
        if (ua.includes('Chrome/')) return 'Google Chrome';
        if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
        return 'Trình duyệt khác';
    }

    function appendNonce(url) {
        const glue = url.includes('?') ? '&' : '?';
        return `${url}${glue}_nocache=${Date.now()}-${Math.random().toString(16).slice(2,7)}`;
    }

    function hashString(value) {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            hash = ((hash << 5) - hash + value.charCodeAt(i)) >>> 0;
        }
        return hash >>> 0;
    }

    function slugifyHost(host) {
        return String(host).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
    }

    function normalizeHostname(rawValue) {
        if (!rawValue) return '';

        let candidate = String(rawValue).trim().toLowerCase();
        if (!candidate) return '';

        candidate = candidate
            .replace(/^\|\|/, '')
            .replace(/^\*\./, '')
            .replace(/\^.*$/, '')
            .replace(/[/?#].*$/, '')
            .replace(/:+$/, '')
            .replace(/\.$/, '')
            .trim();

        if (candidate.startsWith('http://') || candidate.startsWith('https://')) {
            try {
                candidate = new URL(candidate).hostname;
            } catch {
                return '';
            }
        }

        if (!candidate || candidate.includes('*')) return '';
        if (!/^[a-z0-9.-]+$/.test(candidate)) return '';
        if (!candidate.includes('.')) return '';
        if (candidate.startsWith('.') || candidate.endsWith('.')) return '';
        if (candidate.split('.').some(part => !part || part.length > 63)) return '';
        if (/^\d+\.\d+\.\d+\.\d+$/.test(candidate)) return '';

        return candidate;
    }

    function extractHostnamesFromAdblock(text) {
        const hostnames = new Set();
        const lines = text.split(/\r?\n/);

        lines.forEach(rawLine => {
            const line = rawLine.trim();
            if (!line || line.startsWith('!') || line.startsWith('[') || line.startsWith('@@')) return;

            const matches = line.matchAll(/\|\|([a-z0-9*_.-]+\.[a-z0-9.-]+)\^/gi);
            for (const match of matches) {
                const hostname = normalizeHostname(match[1]);
                if (hostname) hostnames.add(hostname);
            }
        });

        return [...hostnames];
    }

    function extractHostnamesFromHosts(text) {
        const hostnames = new Set();
        const lines = text.split(/\r?\n/);

        lines.forEach(rawLine => {
            const line = rawLine.trim();
            if (!line || line.startsWith('#')) return;

            const match = line.match(/^(?:0\.0\.0\.0|127\.0\.0\.1|::1)\s+([^\s#]+)/i);
            if (!match) return;

            const hostname = normalizeHostname(match[1]);
            if (hostname) hostnames.add(hostname);
        });

        return [...hostnames];
    }

    function extractHostnamesFromRawDomains(text) {
        const hostnames = new Set();
        const lines = text.split(/\r?\n/);

        lines.forEach(rawLine => {
            const line = rawLine.trim();
            if (!line || line.startsWith('#') || line.startsWith('!') || line.startsWith('[')) return;
            if (/\s/.test(line)) return;

            const hostname = normalizeHostname(line);
            if (hostname) hostnames.add(hostname);
        });

        return [...hostnames];
    }

    function extractFeedHostnames(text, parser) {
        if (parser === 'mixed') {
            return [...new Set([
                ...extractHostnamesFromAdblock(text),
                ...extractHostnamesFromHosts(text),
                ...extractHostnamesFromRawDomains(text),
            ])];
        }
        if (parser === 'hosts') return extractHostnamesFromHosts(text);
        if (parser === 'rawdomains') return extractHostnamesFromRawDomains(text);
        return extractHostnamesFromAdblock(text);
    }

    function pickRotatingSample(hostnames, maxItems, seedKey, usedTargets) {
        const uniqueHosts = [...new Set(hostnames)]
            .filter(host => host && !usedTargets.has(host))
            .sort();

        if (!uniqueHosts.length || maxItems <= 0) return [];

        const offset = hashString(seedKey) % uniqueHosts.length;
        const picked = [];

        for (let step = 0; step < uniqueHosts.length && picked.length < maxItems; step++) {
            const host = uniqueHosts[(offset + step) % uniqueHosts.length];
            if (usedTargets.has(host)) continue;
            usedTargets.add(host);
            picked.push(host);
        }

        return picked;
    }

    function readAutoDataCache() {
        try {
            const raw = window.localStorage.getItem(AUTO_DATA_CACHE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (parsed.version !== AUTO_DATA_CACHE_VERSION || !parsed.autoProbes) return null;
            return parsed;
        } catch {
            return null;
        }
    }

    function writeAutoDataCache(bundle) {
        try {
            window.localStorage.setItem(AUTO_DATA_CACHE_KEY, JSON.stringify({
                version: AUTO_DATA_CACHE_VERSION,
                day: bundle.day,
                totalAuto: bundle.totalAuto,
                autoProbes: bundle.autoProbes,
            }));
        } catch {
            // Bỏ qua nếu localStorage bị chặn hoặc đầy
        }
    }

    async function fetchTextFeed(url, timeout = AUTO_DATA_TIMEOUT) {
        const controller = new AbortController();
        const timerId = window.setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(appendNonce(url), {
                method: 'GET',
                cache: 'no-store',
                credentials: 'omit',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.text();
        } finally {
            window.clearTimeout(timerId);
        }
    }

    function buildAutoProbe(feed, host) {
        return {
            id: `${AUTO_PROBE_PREFIX}-${feed.category}-${slugifyHost(host)}`,
            kind: 'hostname',
            target: host,
            name: `[Auto] ${host}`,
            desc: `Tự động đồng bộ từ ${feed.label}.`,
        };
    }

    function mergeAutoProbes(autoProbesByCategory) {
        CATEGORY_ORDER.forEach(cat => {
            const manualProbes = (DATA.probes[cat] || []).filter(probe => !isAutoProbe(probe));
            const liveProbes = autoProbesByCategory[cat] || [];
            DATA.probes[cat] = [...manualProbes, ...liveProbes];
        });
    }

    async function loadLiveAutoProbeBundle() {
        const todayKey = getTodayKey();
        const autoProbes = Object.fromEntries(CATEGORY_ORDER.map(cat => [cat, []]));
        const usedTargetsByCategory = new Map(
            CATEGORY_ORDER.map(cat => [
                cat,
                new Set(
                    (DATA.probes[cat] || [])
                        .filter(probe => !isAutoProbe(probe))
                        .map(probe => normalizeHostname(probe.target))
                        .filter(Boolean)
                ),
            ])
        );

        const results = await Promise.all(AUTO_FEEDS.map(async feed => {
            try {
                const text = await fetchTextFeed(feed.url, feed.timeout || AUTO_DATA_TIMEOUT);
                const hostnames = extractFeedHostnames(text, feed.parser);
                const pickedHosts = pickRotatingSample(
                    hostnames,
                    feed.maxItems,
                    `${todayKey}:${feed.category}:${feed.url}`,
                    usedTargetsByCategory.get(feed.category)
                );

                return {
                    feed,
                    probes: pickedHosts.map(host => buildAutoProbe(feed, host)),
                    ok: true,
                };
            } catch (error) {
                return {
                    feed,
                    probes: [],
                    ok: false,
                    error,
                };
            }
        }));

        let totalAuto = 0;
        let feedsOk = 0;

        results.forEach(result => {
            if (result.ok) feedsOk++;
            totalAuto += result.probes.length;
            autoProbes[result.feed.category].push(...result.probes);
        });

        return {
            day: todayKey,
            totalAuto,
            feedsOk,
            autoProbes,
        };
    }

    function applyAutoProbeBundle(bundle, mode) {
        mergeAutoProbes(bundle.autoProbes || {});
        if (bundle.day) DATA.refreshedAt = bundle.day;
        state.autoDataMeta = {
            mode,
            totalAuto: bundle.totalAuto || 0,
        };
    }

    async function ensureAutoDataLoaded() {
        if (autoDataPromise) return autoDataPromise;

        state.autoDataMeta.mode = 'syncing';
        setText('datasetVersion', getDatasetLabel());

        autoDataPromise = (async () => {
            const cache = readAutoDataCache();
            const todayKey = getTodayKey();

            if (cache && cache.day === todayKey) {
                applyAutoProbeBundle(cache, 'cache');
                return cache;
            }

            try {
                const liveBundle = await loadLiveAutoProbeBundle();
                if (liveBundle.feedsOk > 0) {
                    writeAutoDataCache(liveBundle);
                    applyAutoProbeBundle(liveBundle, 'live');
                    return liveBundle;
                }
            } catch {
                // Sẽ fallback sang cache hoặc dữ liệu tĩnh bên dưới
            }

            if (cache) {
                applyAutoProbeBundle(cache, 'stale-cache');
                return cache;
            }

            state.autoDataMeta = { mode: 'static', totalAuto: 0 };
            return {
                day: DATA.refreshedAt || todayKey,
                totalAuto: 0,
                autoProbes: Object.fromEntries(CATEGORY_ORDER.map(cat => [cat, []])),
            };
        })().finally(() => {
            setText('datasetVersion', getDatasetLabel());

            if (!state.isRunning) {
                initState();
                renderCategories();
                resetResults();
                setText('probeCount', getAllProbeCount());
            }
        });

        return autoDataPromise;
    }

    /* ─── State Init ─── */

    function initState() {
        CATEGORY_ORDER.forEach(cat => {
            state.results[cat] = {};
            getCategoryItems(cat).forEach(p => {
                state.results[cat][p.id] = { status: 'pending', latency: 0, note: 'Chưa chạy' };
            });
        });
    }

    /* ─── Render ─── */

    function renderSources() {
        const el = $('sourceList');
        if (!el) return;
        el.innerHTML = DATA.sources.map(s => `
            <a class="source-pill" href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(s.note)}">
                <span class="source-dot"></span>${escapeHtml(s.name)}
            </a>
        `).join('');
    }

    function renderCategories() {
        const grid = $('categoryGrid');
        if (!grid) return;

        grid.innerHTML = CATEGORY_ORDER.map((cat, catIdx) => {
            const meta = DATA.categories[cat];
            const items = getCategoryItems(cat);
            const icon = CATEGORY_ICONS[cat] || '';

            return `
                <article class="category-card tone-${meta.tone}" id="card-${cat}" style="animation-delay:${catIdx * 0.08}s">
                    <div class="category-card-head category-toggle ${state.resultsReady ? '' : 'is-disabled'}" id="toggle-${cat}" role="button" tabindex="${state.resultsReady ? '0' : '-1'}" aria-expanded="false" aria-controls="body-${cat}" aria-disabled="${state.resultsReady ? 'false' : 'true'}">
                        <div class="category-head-left">
                            <div class="category-icon-wrap tone-${meta.tone}">${icon}</div>
                            <div>
                                <span class="category-kicker">${escapeHtml(meta.label)}</span>
                                <h3>${escapeHtml(meta.summary)}</h3>
                            </div>
                        </div>
                        <div class="category-head-right">
                            <div class="category-score-wrap">
                                <div class="category-score" id="score-${cat}">0<small>%</small></div>
                                <div class="category-count" id="count-${cat}">0/${items.length}</div>
                            </div>
                            <div class="category-toggle-icon" aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="category-body" id="body-${cat}" hidden>
                        <div class="category-progress-shell">
                            <div class="category-progress-fill tone-${meta.tone}" id="catprog-${cat}"></div>
                        </div>
                        <div class="category-stats" id="stats-${cat}">0 bị chặn • 0 một phần • 0 đi qua</div>
                        <div class="probe-list">
                            ${items.map((probe, idx) => `
                                <div class="probe-item" id="probe-${probe.id}" style="animation-delay:${(catIdx * items.length + idx) * 0.015}s">
                                    <div class="probe-copy">
                                        <strong>${escapeHtml(probe.name)}</strong>
                                        <span>${escapeHtml(probe.kind === 'hostname' ? probe.target : probe.desc)}</span>
                                    </div>
                                    <div class="probe-meta">
                                        <span class="status-pill status-pending" id="pill-${probe.id}">${TEXT.pending}</span>
                                        <span class="latency-pill" id="latency-${probe.id}">-</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        bindCategoryAccordionInteractions();
    }

    function setCategoryExpanded(cat, expanded) {
        const card = $(`card-${cat}`);
        const toggle = $(`toggle-${cat}`);
        const body = $(`body-${cat}`);
        if (!card || !toggle || !body) return;

        body.hidden = !expanded;
        card.classList.toggle('is-open', expanded);
        toggle.setAttribute('aria-expanded', String(expanded));
    }

    function closeAllCategoryAccordions() {
        CATEGORY_ORDER.forEach(cat => setCategoryExpanded(cat, false));
    }

    function updateCategoryAccordionAvailability() {
        CATEGORY_ORDER.forEach(cat => {
            const toggle = $(`toggle-${cat}`);
            if (!toggle) return;

            toggle.classList.toggle('is-disabled', !state.resultsReady);
            toggle.setAttribute('aria-disabled', String(!state.resultsReady));
            toggle.tabIndex = state.resultsReady ? 0 : -1;
        });

        if (!state.resultsReady) {
            closeAllCategoryAccordions();
        }
    }

    function bindCategoryAccordionInteractions() {
        CATEGORY_ORDER.forEach(cat => {
            const toggle = $(`toggle-${cat}`);
            if (!toggle) return;

            toggle.onclick = () => {
                if (!state.resultsReady) return;
                const body = $(`body-${cat}`);
                setCategoryExpanded(cat, !!body?.hidden);
            };

            toggle.onkeydown = (event) => {
                if (!state.resultsReady) return;
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    const body = $(`body-${cat}`);
                    setCategoryExpanded(cat, !!body?.hidden);
                }
            };
        });

        updateCategoryAccordionAvailability();
    }

    function updateProbeItem(probeId, status, latency, note) {
        const pill = $(`pill-${probeId}`);
        const latEl = $(`latency-${probeId}`);
        const row = $(`probe-${probeId}`);

        if (pill) {
            pill.className = `status-pill status-${status}`;
            pill.textContent = TEXT[status] || TEXT.pending;
            pill.title = note || '';
        }
        if (latEl) {
            latEl.textContent = latency > 0 ? `${latency} ms` : '-';
            latEl.title = note || '';
        }
        if (row && (status === 'blocked' || status === 'passed' || status === 'partial')) {
            row.classList.add('probe-done');
        }
    }

    /* ─── Stats & Scoring ─── */

    function getCategoryStats(cat) {
        const items = getCategoryItems(cat);
        const s = { total: items.length, tested: 0, blocked: 0, partial: 0, passed: 0, uncertain: 0 };
        items.forEach(p => {
            const r = state.results[cat][p.id];
            if (!r) return;
            if (r.status === 'blocked')       { s.blocked++; s.tested++; }
            else if (r.status === 'partial')   { s.partial++; s.tested++; }
            else if (r.status === 'passed')    { s.passed++; s.tested++; }
            else if (r.status === 'uncertain') { s.uncertain++; }
        });
        return s;
    }

    function getEffectiveScore(s) {
        if (!s.tested) return 0;
        return Math.round(((s.blocked + s.partial * 0.5) / s.tested) * 100);
    }

    function collectOverview() {
        const o = { blocked: 0, partial: 0, passed: 0, uncertain: 0, tested: 0, total: 0 };
        CATEGORY_ORDER.forEach(cat => {
            const s = getCategoryStats(cat);
            o.blocked += s.blocked; o.partial += s.partial;
            o.passed += s.passed; o.uncertain += s.uncertain;
            o.tested += s.tested; o.total += s.total;
        });
        return o;
    }

    function classifyProfile(scores) {
        const { ads, tracking, malware, adult, spam, telemetry } = scores;
        const avg = (ads + tracking + malware + spam + (telemetry || 0)) / 5;

        if (avg >= 75 && ads >= 70 && tracking >= 70) {
            return { title: 'Bộ lọc cực mạnh — Nhiều lớp chặn', summary: 'Thiết bị có DNS filter mạnh kết hợp browser blocker rất tốt. Hầu hết quảng cáo, tracker, malware và spam đều bị chặn.', grade: 'S' };
        }
        if (adult >= 70 && (malware >= 40 || spam >= 35)) {
            return { title: 'Family Filter / Parental DNS', summary: 'Nội dung nhạy cảm bị chặn mạnh, thường thấy ở Family DNS hoặc parental control. Có thể kết hợp chặn ads/malware.', grade: 'A' };
        }
        if (malware >= 65 && ads < 50 && tracking < 50) {
            return { title: 'Web Security Filter', summary: 'Tập trung vào URL filtering / anti-phishing, chưa chặn mạnh quảng cáo và tracking. Phù hợp web gateway hoặc antivirus.', grade: 'B' };
        }
        if (ads >= 60 && tracking >= 60 && spam >= 40) {
            return { title: 'Privacy DNS Filter', summary: 'Quảng cáo, tracking và spam đều bị xử lý rộng. DNS filter thiên về quyền riêng tư (AdGuard, NextDNS, Pi-hole).', grade: 'A' };
        }
        if (ads >= 55 && tracking >= 55 && spam < 35 && adult < 35) {
            return { title: 'Browser Ad Blocker', summary: 'Quảng cáo và tracking bị chặn rõ nhưng chỉ ở tầng trình duyệt. Spam, adult và telemetry chưa bị ảnh hưởng.', grade: 'B' };
        }
        if (telemetry >= 60 && avg >= 40) {
            return { title: 'DNS Filter chuyên sâu', summary: 'Thiết bị chặn cả telemetry hệ thống — dấu hiệu dùng DNS filter cấp hệ thống (Pi-hole, AdGuard Home).', grade: 'A' };
        }
        if (avg >= 35) {
            return { title: 'Cấu hình chặn hỗn hợp', summary: 'Có tín hiệu chặn nhưng chưa nghiêng hẳn về một kiểu bộ lọc cụ thể. Có thể thiếu một số danh sách filter.', grade: 'C' };
        }
        if (avg < 15) {
            return { title: 'Chưa phát hiện bộ lọc', summary: 'Hầu hết request đều đi qua. Thiết bị chưa cài bộ lọc quảng cáo hoặc DNS filter nào đáng kể.', grade: 'F' };
        }
        return { title: 'Bộ lọc yếu', summary: 'Một số domain bị chặn nhưng phần lớn vẫn đi qua. Nên cân nhắc bổ sung thêm danh sách filter.', grade: 'D' };
    }

    /* ─── Animated Score Counter ─── */

    function animateNumber(elementId, targetValue, duration = 800) {
        const el = $(elementId);
        if (!el) return;
        const start = parseInt(el.textContent) || 0;
        const diff = targetValue - start;
        if (diff === 0) return;
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(start + diff * eased);
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    /* ─── Dashboard Update ─── */

    function updateDashboard() {
        const scores = {};
        CATEGORY_ORDER.forEach(cat => {
            const stats = getCategoryStats(cat);
            const score = getEffectiveScore(stats);
            scores[cat] = score;

            const scoreEl = $(`score-${cat}`);
            if (scoreEl) scoreEl.innerHTML = `${score}<small>%</small>`;

            setText(`stats-${cat}`, `${stats.blocked} bị chặn • ${stats.partial} một phần • ${stats.passed} đi qua`);
            setText(`count-${cat}`, `${stats.tested}/${stats.total}`);

            const catProg = $(`catprog-${cat}`);
            if (catProg && stats.total) {
                catProg.style.width = `${Math.round(((stats.tested + stats.uncertain) / stats.total) * 100)}%`;
            }
        });

        const overview = collectOverview();
        const overallScore = overview.tested
            ? Math.round(((overview.blocked + overview.partial * 0.5) / overview.tested) * 100)
            : 0;
        const profile = classifyProfile(scores);

        animateNumber('scoreNumber', overallScore);
        setText('blockedCount', overview.blocked);
        setText('partialCount', overview.partial);
        setText('passedCount', overview.passed);
        setText('profileTitle', profile.title);
        setText('profileSummary', profile.summary);

        const gradeEl = $('gradeBadge');
        if (gradeEl) {
            gradeEl.textContent = profile.grade;
            gradeEl.className = `grade-badge grade-${profile.grade.toLowerCase()}`;
        }

        const confidence = Math.max(10, Math.min(95, Math.round(
            30 + (state.controlsHealthy ? 20 : -5) + overview.tested * 0.5 - overview.uncertain * 3
        )));
        setText('confidenceText', `Độ tin cậy ${confidence}%`);

        const progress = state.progress.total
            ? Math.round((state.progress.done / state.progress.total) * 100)
            : 0;
        const pf = $('progressFill');
        if (pf) pf.style.width = `${progress}%`;

        updateScoreRing(overallScore);
    }

    function updateScoreRing(score) {
        const circle = $('scoreRingCircle');
        if (!circle) return;
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (score / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    /* ─── Probe Engine ─── */

    async function fetchProbe(url, timeout) {
        const controller = new AbortController();
        state.abortControllers.push(controller);
        const t0 = performance.now();
        let timerId = 0;

        try {
            const request = fetch(appendNonce(url), {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-store',
                credentials: 'omit',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                signal: controller.signal,
            });

            const timeoutPromise = new Promise((_, reject) => {
                timerId = window.setTimeout(() => reject(new Error('timeout')), timeout);
            });

            const response = await Promise.race([request, timeoutPromise]);
            return {
                ok: true,
                latency: Math.round(performance.now() - t0),
                reason: response.type === 'opaque'
                    ? 'Request đi qua mạng (opaque response)'
                    : `HTTP ${response.status}`,
                responseType: response.type || 'unknown',
            };
        } catch (err) {
            const latency = Math.round(performance.now() - t0);
            return {
                ok: false,
                latency,
                reason: err.message === 'timeout' ? 'Quá thời gian chờ'
                      : err.name === 'AbortError'  ? 'Bị hủy'
                      : 'Lỗi mạng / DNS bị chặn',
                isTimeout: err.message === 'timeout',
                isAbort: err.name === 'AbortError',
            };
        } finally {
            if (timerId) window.clearTimeout(timerId);
        }
    }

    function imageProbe(url, timeout) {
        return new Promise(resolve => {
            const finalUrl = appendNonce(url);
            const t0 = performance.now();
            const img = new Image();
            let done = false;

            const finish = (result) => {
                if (done) return;
                done = true;
                resolve({
                    reachable: result !== 'timeout',
                    state: result,
                    latency: Math.round(performance.now() - t0),
                });
            };

            const timer = window.setTimeout(() => finish('timeout'), timeout);
            img.referrerPolicy = 'no-referrer';
            img.onload = () => { clearTimeout(timer); finish('loaded'); };
            img.onerror = () => {
                clearTimeout(timer);
                const elapsed = performance.now() - t0;
                finish(elapsed < 2000 ? 'error-fast' : 'error-slow');
            };
            img.src = finalUrl;
        });
    }

    function classifyHostnameProbe(fetchResult, imgResult) {
        if (fetchResult.ok) {
            if (imgResult.state === 'loaded') {
                return { status: 'passed', latency: imgResult.latency, note: 'Favicon tải được — host reachable qua DNS hiện tại' };
            }
            if (imgResult.state === 'error-fast') {
                return { status: 'passed', latency: fetchResult.latency, note: 'Fetch thành công, host reachable nhưng favicon không hợp lệ hoặc không tồn tại' };
            }
            if (imgResult.state === 'error-slow') {
                return { status: 'partial', latency: imgResult.latency, note: 'Host có phản hồi nhưng không ổn định hoặc bị lọc một phần' };
            }
            return { status: 'partial', latency: imgResult.latency, note: 'Fetch thành công nhưng tải ảnh bị timeout — có thể bị lọc một phần' };
        }

        if (imgResult.state === 'loaded') {
            return { status: 'partial', latency: imgResult.latency, note: 'Ảnh vẫn tải được dù fetch thất bại — kết quả chưa hoàn toàn chắc chắn' };
        }
        if (fetchResult.isTimeout || imgResult.state === 'timeout') {
            return { status: 'partial', latency: Math.max(fetchResult.latency, imgResult.latency), note: 'Timeout khi truy cập host — có thể bị chặn hoặc mạng phản hồi chậm' };
        }

        return { status: 'blocked', latency: Math.max(fetchResult.latency, imgResult.latency), note: 'Fetch thất bại và ảnh lỗi nhanh — nhiều khả năng domain đã bị DNS/filter chặn' };
    }

    async function runSingleProbe(probe) {
        const baseUrl = probe.kind === 'hostname'
            ? `https://${probe.target}/favicon.ico`
            : probe.target;

        const fetchResult = await fetchProbe(baseUrl, PROBE_TIMEOUT);

        if (probe.kind === 'url') {
            if (fetchResult.ok) {
                return { status: 'passed', latency: fetchResult.latency, note: fetchResult.reason };
            }
            if (!state.controlsHealthy) {
                return { status: 'uncertain', latency: fetchResult.latency, note: 'Control probes chưa ổn định' };
            }
            if (fetchResult.isTimeout) {
                return { status: 'partial', latency: fetchResult.latency, note: 'Timeout — có thể bị chặn hoặc server chậm' };
            }
            return { status: 'blocked', latency: fetchResult.latency, note: fetchResult.reason };
        }

        if (!state.controlsHealthy) {
            return { status: 'uncertain', latency: fetchResult.latency, note: 'Control probes chưa ổn định' };
        }

        const imgResult = await imageProbe(baseUrl, PROBE_TIMEOUT - 800);
        return classifyHostnameProbe(fetchResult, imgResult);
    }

    /* ─── Control Probes ─── */

    async function runControls() {
        const results = await Promise.all(
            DATA.controls.map(c => fetchProbe(c.url, CONTROL_TIMEOUT))
        );
        state.controlsPassed = results.filter(r => r.ok).length;
        state.controlsHealthy = state.controlsPassed >= 2;
        setText('controlStatus', `${state.controlsPassed}/${DATA.controls.length}`);

        const controlEl = $('controlIndicator');
        if (controlEl) {
            controlEl.className = state.controlsHealthy
                ? 'control-indicator healthy'
                : 'control-indicator unhealthy';
        }
        return state.controlsHealthy;
    }

    /* ─── Run & Reset ─── */

    function resetResults() {
        state.controlsHealthy = false;
        state.controlsPassed = 0;
        state.resultsReady = false;
        CATEGORY_ORDER.forEach(cat => {
            getCategoryItems(cat).forEach(p => {
                state.results[cat][p.id] = { status: 'pending', latency: 0, note: 'Chưa chạy' };
                updateProbeItem(p.id, 'pending', 0, 'Chưa chạy');
            });
        });
        state.progress.total = getAllProbeCount();
        state.progress.done = 0;
        setText('controlStatus', '-');
        setRunStatus('Sẵn sàng', 'is-idle');

        const controlEl = $('controlIndicator');
        if (controlEl) controlEl.className = 'control-indicator';

        const passedSummaryCard = $('passedSummaryCard');
        if (passedSummaryCard) {
            passedSummaryCard.classList.remove('is-active');
            passedSummaryCard.setAttribute('aria-expanded', 'false');
        }

        const scoreWrap = document.querySelector('.score-ring-wrap');
        if (scoreWrap) scoreWrap.classList.remove('score-complete');

        updateCategoryAccordionAvailability();
        updateDashboard();

        // Hide report
        const report = $('reportSection');
        if (report) report.style.display = 'none';

        const content = $('reportContent');
        if (content) content.innerHTML = '';
    }

    function setRunningState(running) {
        state.isRunning = running;
        const btn = $('btnRun');
        const label = $('btnRunLabel');
        if (!btn || !label) return;
        btn.disabled = running;
        btn.classList.toggle('is-running', running);
        label.textContent = running ? 'Đang đánh giá...' : 'Chạy lại bài test';
    }

    async function runCategory(cat) {
        const probes = getCategoryItems(cat);
        let cursor = 0;

        const card = $(`card-${cat}`);
        if (card) card.classList.add('is-active');

        async function worker() {
            while (cursor < probes.length) {
                const i = cursor++;
                const probe = probes[i];

                state.results[cat][probe.id] = { status: 'testing', latency: 0, note: 'Đang gửi request' };
                updateProbeItem(probe.id, 'testing', 0, 'Đang gửi request');

                const result = await runSingleProbe(probe);
                state.results[cat][probe.id] = result;
                updateProbeItem(probe.id, result.status, result.latency, result.note);
                state.progress.done++;
                setText('phaseText', `${state.progress.done}/${state.progress.total} probe đã kiểm tra`);
                updateDashboard();
            }
        }

        const workers = Array.from(
            { length: Math.min(CONCURRENCY, probes.length) },
            () => worker()
        );
        await Promise.all(workers);

        if (card) {
            card.classList.remove('is-active');
            card.classList.add('is-done');
        }
    }

    function getProbeExportValue(probe) {
        return probe.kind === 'hostname' ? probe.target : probe.target;
    }

    function collectPassedGroups() {
        return CATEGORY_ORDER.map(cat => {
            const meta = DATA.categories[cat];
            const lines = getCategoryItems(cat)
                .filter(probe => state.results[cat][probe.id]?.status === 'passed')
                .map(probe => getProbeExportValue(probe));

            return {
                category: cat,
                label: meta.label,
                tone: meta.tone,
                items: lines,
            };
        }).filter(group => group.items.length > 0);
    }

    function buildPassedCopyText(groups) {
        return groups.map(group => `[${group.label}]\n${group.items.join('\n')}`).join('\n\n');
    }

    async function copyText(text) {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    function bindPassedDomainInteractions(groups) {
        const report = $('reportSection');
        const passedCard = $('reportPassedToggle');
        const passedPanel = $('reportPassedPanel');
        const copyBtn = $('copyPassedDomainsBtn');
        const summaryCard = $('passedSummaryCard');
        if (!passedCard || !passedPanel) return;

        const setOpenState = (open, shouldScroll = false) => {
            passedPanel.hidden = !open;
            passedCard.classList.toggle('is-open', open);
            passedCard.setAttribute('aria-expanded', String(open));

            if (summaryCard) {
                summaryCard.classList.toggle('is-active', open);
                summaryCard.setAttribute('aria-expanded', String(open));
            }

            if (open && shouldScroll) {
                passedPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        };

        const togglePanel = (shouldScroll = false) => {
            setOpenState(passedPanel.hidden, shouldScroll);
        };

        const onKeyboardToggle = (event, shouldScroll = false) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                togglePanel(shouldScroll);
            }
        };

        passedCard.addEventListener('click', () => togglePanel(false));
        passedCard.addEventListener('keydown', event => onKeyboardToggle(event, false));

        if (summaryCard) {
            summaryCard.onclick = () => {
                if (report) {
                    report.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                setOpenState(true, true);
            };
            summaryCard.onkeydown = event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    if (report) {
                        report.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    setOpenState(true, true);
                }
            };
        }

        if (copyBtn) {
            copyBtn.disabled = groups.length === 0;
            copyBtn.addEventListener('click', async () => {
                const originalLabel = copyBtn.textContent;
                try {
                    await copyText(buildPassedCopyText(groups));
                    copyBtn.textContent = 'Đã copy';
                } catch {
                    copyBtn.textContent = 'Copy lỗi';
                }

                window.setTimeout(() => {
                    copyBtn.textContent = originalLabel;
                }, 1600);
            });
        }
    }

    /* ─── Report Generation ─── */

    function generateReport() {
        const report = $('reportSection');
        const content = $('reportContent');
        if (!report || !content) return;

        const overview = collectOverview();
        const overallScore = overview.tested
            ? Math.round(((overview.blocked + overview.partial * 0.5) / overview.tested) * 100)
            : 0;

        const scores = {};
        CATEGORY_ORDER.forEach(cat => {
            scores[cat] = getEffectiveScore(getCategoryStats(cat));
        });
        const profile = classifyProfile(scores);
        const passedGroups = collectPassedGroups();

        const elapsed = ((Date.now() - state.startTime) / 1000).toFixed(1);

        // Build per-category breakdown
        let categoryBreakdown = '';
        CATEGORY_ORDER.forEach(cat => {
            const meta = DATA.categories[cat];
            const stats = getCategoryStats(cat);
            const score = scores[cat];
            const items = getCategoryItems(cat);

            // Lists of blocked and passed items
            const blockedItems = [];
            const passedItems = [];
            const partialItems = [];

            items.forEach(p => {
                const r = state.results[cat][p.id];
                if (!r) return;
                if (r.status === 'blocked') blockedItems.push(p);
                else if (r.status === 'passed') passedItems.push(p);
                else if (r.status === 'partial') partialItems.push(p);
            });

            const scoreClass = score >= 70 ? 'score-high' : score >= 40 ? 'score-mid' : 'score-low';

            categoryBreakdown += `
                <div class="report-category">
                    <div class="report-cat-header">
                        <div class="report-cat-left">
                            <div class="category-icon-wrap tone-${meta.tone}">${CATEGORY_ICONS[cat] || ''}</div>
                            <div>
                                <h4>${escapeHtml(meta.label)}</h4>
                                <span class="report-cat-summary">${stats.blocked} bị chặn · ${stats.partial} một phần · ${stats.passed} đi qua · Tổng ${stats.total}</span>
                            </div>
                        </div>
                        <div class="report-cat-score ${scoreClass}">${score}%</div>
                    </div>

                    <div class="report-bar-wrap">
                        <div class="report-bar">
                            <div class="report-bar-blocked" style="width:${stats.total ? (stats.blocked/stats.total*100) : 0}%"></div>
                            <div class="report-bar-partial" style="width:${stats.total ? (stats.partial/stats.total*100) : 0}%"></div>
                            <div class="report-bar-passed" style="width:${stats.total ? (stats.passed/stats.total*100) : 0}%"></div>
                        </div>
                    </div>

                    ${blockedItems.length > 0 ? `
                        <div class="report-list-group">
                            <div class="report-list-label blocked-label">✓ Đã chặn (${blockedItems.length})</div>
                            <div class="report-domain-list">
                                ${blockedItems.map(p => `<span class="report-domain blocked-domain">${escapeHtml(p.kind === 'hostname' ? p.target : p.name)}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${partialItems.length > 0 ? `
                        <div class="report-list-group">
                            <div class="report-list-label partial-label">◐ Chặn một phần (${partialItems.length})</div>
                            <div class="report-domain-list">
                                ${partialItems.map(p => `<span class="report-domain partial-domain">${escapeHtml(p.kind === 'hostname' ? p.target : p.name)}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${passedItems.length > 0 ? `
                        <div class="report-list-group">
                            <div class="report-list-label passed-label">✗ Chưa bị chặn (${passedItems.length})</div>
                            <div class="report-domain-list">
                                ${passedItems.map(p => `<span class="report-domain passed-domain">${escapeHtml(p.kind === 'hostname' ? p.target : p.name)}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        });

        // Recommendations
        let recommendations = '';
        const recList = [];
        if (scores.ads < 50) recList.push('Cài extension chặn quảng cáo (uBlock Origin) hoặc dùng DNS filter (AdGuard DNS, NextDNS).');
        if (scores.tracking < 50) recList.push('Bật chế độ chống theo dõi mạnh trong trình duyệt hoặc cài uBlock Origin.');
        if (scores.malware < 40) recList.push('Sử dụng DNS có tính năng bảo mật (Cloudflare Family, Quad9) hoặc antivirus có web protection.');
        if (scores.adult < 30 && scores.ads > 40) recList.push('Nếu cần chặn nội dung nhạy cảm, chuyển sang Family DNS (CleanBrowsing, AdGuard Family).');
        if (scores.spam < 40) recList.push('Bổ sung danh sách filter cho spam domains (OISD, HaGeZi lists).');
        if ((scores.telemetry || 0) < 30) recList.push('Để chặn telemetry hệ thống, cần DNS filter cấp thiết bị (Pi-hole, AdGuard Home, NextDNS).');
        if (overallScore >= 80) recList.push('Bộ lọc đang hoạt động rất hiệu quả! Tiếp tục cập nhật danh sách filter thường xuyên.');

        if (recList.length) {
            recommendations = `
                <div class="report-recommendations">
                    <h4>💡 Đề xuất cải thiện</h4>
                    <ul>${recList.map(r => `<li>${r}</li>`).join('')}</ul>
                </div>
            `;
        }

        const passedPanelMarkup = `
            <div class="report-passed-panel" id="reportPassedPanel" hidden>
                <div class="report-passed-head">
                    <div>
                        <h4>Danh sách domain đi qua</h4>
                        <p>Mỗi domain nằm trên một dòng và được chia theo từng nhóm để tiện kiểm tra hoặc copy.</p>
                    </div>
                    <button class="report-copy-button" id="copyPassedDomainsBtn" type="button">Copy all</button>
                </div>
                ${passedGroups.length > 0 ? `
                    <div class="report-passed-groups">
                        ${passedGroups.map(group => `
                            <div class="report-passed-group tone-${group.tone}">
                                <div class="report-passed-group-head">
                                    <strong>${escapeHtml(group.label)}</strong>
                                    <span>${group.items.length} domain</span>
                                </div>
                                <div class="report-passed-lines">
                                    ${group.items.map(item => `<div class="report-passed-line">${escapeHtml(item)}</div>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="report-passed-empty">Không có domain nào ở trạng thái Đi qua.</div>
                `}
            </div>
        `;

        content.innerHTML = `
            <div class="report-header">
                <div class="report-title-area">
                    <h3>📊 Báo cáo đánh giá bộ lọc</h3>
                    <span class="report-time">Hoàn tất trong ${elapsed}s · ${formatRunTime(Date.now())} · ${overview.total} domain đã kiểm tra</span>
                </div>
                <div class="report-overall">
                    <div class="report-overall-score ${overallScore >= 70 ? 'score-high' : overallScore >= 40 ? 'score-mid' : 'score-low'}">
                        ${overallScore}%
                    </div>
                    <div class="report-overall-info">
                        <strong>${escapeHtml(profile.title)}</strong>
                        <span>Grade: <b class="grade-badge grade-${profile.grade.toLowerCase()}" style="display:inline-flex;width:28px;height:28px;font-size:0.9rem;border-radius:8px;">${profile.grade}</b></span>
                    </div>
                </div>
            </div>

            <div class="report-overview-stats">
                <div class="report-stat-card stat-blocked">
                    <div class="report-stat-number">${overview.blocked}</div>
                    <div class="report-stat-label">Bị chặn</div>
                    <div class="report-stat-pct">${overview.tested ? Math.round(overview.blocked/overview.tested*100) : 0}%</div>
                </div>
                <div class="report-stat-card stat-partial">
                    <div class="report-stat-number">${overview.partial}</div>
                    <div class="report-stat-label">Một phần</div>
                    <div class="report-stat-pct">${overview.tested ? Math.round(overview.partial/overview.tested*100) : 0}%</div>
                </div>
                <div class="report-stat-card stat-passed stat-clickable" id="reportPassedToggle" role="button" tabindex="0" aria-expanded="false" aria-controls="reportPassedPanel">
                    <div class="report-stat-number">${overview.passed}</div>
                    <div class="report-stat-label">Đi qua được</div>
                    <div class="report-stat-pct">${overview.tested ? Math.round(overview.passed/overview.tested*100) : 0}%</div>
                    <div class="report-stat-action">${overview.passed > 0 ? 'Bấm để xem list' : 'Không có domain đi qua'}</div>
                </div>
                <div class="report-stat-card stat-control">
                    <div class="report-stat-number">${state.controlsPassed}/${DATA.controls.length}</div>
                    <div class="report-stat-label">Control OK</div>
                    <div class="report-stat-pct">${state.controlsHealthy ? 'Ổn định' : 'Bất ổn'}</div>
                </div>
            </div>

            ${passedPanelMarkup}

            <p class="report-verdict">${escapeHtml(profile.summary)}</p>

            ${recommendations}

            <div class="report-breakdown">
                <h4>Chi tiết theo từng nhóm</h4>
                ${categoryBreakdown}
            </div>
        `;

        bindPassedDomainInteractions(passedGroups);
        report.style.display = 'block';
        report.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ─── Main Run ─── */

    window.runFullAssessment = async function () {
        if (state.isRunning) return;

        setRunningState(true);
        setRunStatus('Đang đồng bộ dữ liệu', 'is-active');
        setText('phaseText', 'Đang đồng bộ danh sách filter mới nhất...');
        await ensureAutoDataLoaded();

        state.resultsReady = false;
        initState();
        renderCategories();
        setText('probeCount', getAllProbeCount());
        setText('datasetVersion', getDatasetLabel());

        state.abortControllers = [];
        state.startTime = Date.now();
        resetResults();
        setRunningState(true);
        setRunStatus('Đang kiểm tra', 'is-active');

        setText('lastRunAt', formatRunTime(state.startTime));
        setText('phaseText', 'Đang xác minh đường mạng...');

        await runControls();
        updateDashboard();

        for (const cat of CATEGORY_ORDER) {
            setText('phaseText', `Đang kiểm tra: ${DATA.categories[cat].label}`);
            await runCategory(cat);
        }

        setRunningState(false);
        setRunStatus(
            state.controlsHealthy ? 'Hoàn tất' : 'Hoàn tất — cần xem lại',
            state.controlsHealthy ? 'is-complete' : 'is-warning'
        );
        setText('phaseText', `Đã hoàn tất ${getAllProbeCount()} probe.`);
        updateDashboard();

        const scoreWrap = document.querySelector('.score-ring-wrap');
        if (scoreWrap) scoreWrap.classList.add('score-complete');

        state.resultsReady = true;
        updateCategoryAccordionAvailability();
        closeAllCategoryAccordions();

        // Generate report
        generateReport();
    };

    /* ─── Init ─── */

    function init() {
        if (!DATA) return;

        initState();
        renderSources();
        renderCategories();
        resetResults();

        setText('browserName', detectBrowser());
        setText('probeCount', getAllProbeCount());
        setText('datasetVersion', getDatasetLabel());
        setText('lastRunAt', '-');
        setText('controlStatus', '-');
        setText('requestMode', 'Request thật qua DNS / filter');
        setRunStatus('Sẵn sàng', 'is-idle');
        updateDashboard();

        const circle = $('scoreRingCircle');
        if (circle) {
            const circumference = 2 * Math.PI * 54;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
        }

        void ensureAutoDataLoaded();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
