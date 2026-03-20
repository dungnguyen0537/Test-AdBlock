window.AD_BLOCK_TEST_DATA = Object.freeze({
    refreshedAt: '2026-03-20',
    sources: [
        { id: 'easylist', name: 'EasyList / EasyPrivacy', url: 'https://easylist.to/easylist/easylist.txt', note: 'Nguồn nền cho nhiều browser blocker hiện nay.' },
        { id: 'ublock', name: 'uBlock Origin', url: 'https://github.com/gorhill/ublock', note: 'Trình chặn quảng cáo phổ biến nhất.' },
        { id: 'adguard', name: 'AdGuard DNS', url: 'https://adguard.com/en/blog/what-is-dns-filtering.html', note: 'DNS filtering chặn quảng cáo, theo dõi và nội dung nhạy cảm.' },
        { id: 'oisd', name: 'OISD', url: 'https://oisd.nl/', note: 'Blocklist DNS phổ biến cho quảng cáo, telemetry và spam.' },
        { id: 'hagezi', name: 'HaGeZi DNS Blocklists', url: 'https://github.com/hagezi/dns-blocklists', note: 'Nguồn dữ liệu DNS được cập nhật liên tục.' },
        { id: 'amtso', name: 'AMTSO', url: 'https://www.amtso.org/', note: 'Trang kiểm tra an toàn cho URL filtering / web security.' },
        { id: 'phishtank', name: 'PhishTank / OpenPhish', url: 'https://www.phishtank.com/', note: 'Cơ sở dữ liệu phishing cộng đồng.' },
        { id: 'urlhaus', name: 'URLhaus / abuse.ch', url: 'https://urlhaus.abuse.ch/', note: 'Cơ sở dữ liệu URL phát tán malware.' },
        { id: 'stevenblack', name: 'Steven Black Hosts', url: 'https://github.com/StevenBlack/hosts', note: 'Tổng hợp hosts file chặn quảng cáo & malware.' }
    ],
    controls: [
        { id: 'control-example', name: 'Example.com', url: 'https://example.com/', desc: 'Kiểm tra đường mạng cơ bản.' },
        { id: 'control-cloudflare', name: 'Cloudflare', url: 'https://www.cloudflare.com/cdn-cgi/trace', desc: 'Kiểm tra đường Internet trung tính.' },
        { id: 'control-microsoft', name: 'Microsoft', url: 'https://www.microsoft.com/favicon.ico', desc: 'Mốc đối chiếu để giảm false positive.' }
    ],
    categories: {
        ads: { label: 'Quảng cáo', icon: 'megaphone', summary: 'Các máy chủ quảng cáo, mạng RTB và ad exchange phổ biến.', tone: 'ads' },
        tracking: { label: 'Theo dõi & Analytics', icon: 'eye', summary: 'Analytics, pixel, fingerprint và telemetry từ nhiều nền tảng.', tone: 'tracking' },
        malware: { label: 'Phishing & Mã độc', icon: 'shield', summary: 'Domain phát tán malware, lừa đảo, cryptojacking và C&C.', tone: 'malware' },
        adult: { label: 'Nội dung người lớn', icon: 'lock', summary: 'Nhận diện family filter hoặc parental DNS.', tone: 'adult' },
        spam: { label: 'Spam & Junk Ads', icon: 'zap', summary: 'Popup, popunder, push notification spam và redirect ads.', tone: 'spam' },
        telemetry: { label: 'Telemetry & Phần mềm', icon: 'cpu', summary: 'Thu thập dữ liệu từ hệ điều hành, app và phần mềm.', tone: 'telemetry' }
    },
    probes: {
        ads: [
            // Google Ads ecosystem
            { id: 'ads-adsense', kind: 'hostname', target: 'pagead2.googlesyndication.com', name: 'Google AdSense', desc: 'Mạng quảng cáo lớn nhất web.' },
            { id: 'ads-adservices', kind: 'hostname', target: 'pagead2.googleadservices.com', name: 'Google Ad Services', desc: 'Máy chủ quảng cáo Google.' },
            { id: 'ads-dc-pub', kind: 'hostname', target: 'securepubads.g.doubleclick.net', name: 'DoubleClick Publisher', desc: 'Hạ tầng phân phối quảng cáo Google.' },
            { id: 'ads-dc-core', kind: 'hostname', target: 'googleads.g.doubleclick.net', name: 'DoubleClick Core', desc: 'Máy chủ quảng cáo cốt lõi.' },
            { id: 'ads-dc-main', kind: 'hostname', target: 'ad.doubleclick.net', name: 'DoubleClick Ad', desc: 'Domain quảng cáo DoubleClick chính.' },
            { id: 'ads-dc-static', kind: 'hostname', target: 's0.2mdn.net', name: 'DoubleClick CDN', desc: 'CDN phân phối creative quảng cáo.' },
            { id: 'ads-admob', kind: 'hostname', target: 'media.admob.com', name: 'Google AdMob', desc: 'Quảng cáo trong ứng dụng mobile.' },
            { id: 'ads-fundingchoices', kind: 'hostname', target: 'fundingchoicesmessages.google.com', name: 'Funding Choices', desc: 'Google anti-adblock message.' },
            // Amazon
            { id: 'ads-amazon', kind: 'hostname', target: 'aax.amazon-adsystem.com', name: 'Amazon Ads', desc: 'Hạ tầng quảng cáo Amazon.' },
            { id: 'ads-amazon-aps', kind: 'hostname', target: 'c.amazon-adsystem.com', name: 'Amazon APS', desc: 'Amazon Publisher Services.' },
            // Programmatic / RTB
            { id: 'ads-pubmatic', kind: 'hostname', target: 'ads.pubmatic.com', name: 'PubMatic', desc: 'Máy chủ quảng cáo programmatic.' },
            { id: 'ads-adnxs', kind: 'hostname', target: 'ib.adnxs.com', name: 'AppNexus / Xandr', desc: 'Host RTB rất phổ biến.' },
            { id: 'ads-rubicon', kind: 'hostname', target: 'fastlane.rubiconproject.com', name: 'Magnite / Rubicon', desc: 'Exchange quảng cáo quy mô lớn.' },
            { id: 'ads-criteo', kind: 'hostname', target: 'static.criteo.net', name: 'Criteo', desc: 'RTB và retargeting ads.' },
            { id: 'ads-criteo-bidder', kind: 'hostname', target: 'bidder.criteo.com', name: 'Criteo Bidder', desc: 'Header bidding Criteo.' },
            { id: 'ads-openx', kind: 'hostname', target: 'rtb.openx.net', name: 'OpenX', desc: 'RTB exchange quảng cáo.' },
            { id: 'ads-indexexchange', kind: 'hostname', target: 'htlb.casalemedia.com', name: 'Index Exchange', desc: 'Programmatic ad exchange.' },
            { id: 'ads-sharethrough', kind: 'hostname', target: 'btlr.sharethrough.com', name: 'Sharethrough', desc: 'Native ad exchange.' },
            { id: 'ads-triplelift', kind: 'hostname', target: 'tlx.3lift.com', name: 'TripleLift', desc: 'Native programmatic.' },
            { id: 'ads-medianet', kind: 'hostname', target: 'static.media.net', name: 'Media.net', desc: 'Contextual ads (Yahoo/Bing).' },
            // Native / Discovery
            { id: 'ads-taboola', kind: 'hostname', target: 'trc.taboola.com', name: 'Taboola', desc: 'Native ads / discovery.' },
            { id: 'ads-outbrain', kind: 'hostname', target: 'widgets.outbrain.com', name: 'Outbrain', desc: 'Content recommendation.' },
            // Social Ads
            { id: 'ads-fb-audience', kind: 'hostname', target: 'an.facebook.com', name: 'Facebook Audience Network', desc: 'Quảng cáo Facebook ngoài nền tảng.' },
            { id: 'ads-twitter', kind: 'hostname', target: 'ads-api.twitter.com', name: 'Twitter/X Ads', desc: 'Quảng cáo trên X.' },
            // Video Ads
            { id: 'ads-teads', kind: 'hostname', target: 'a.teads.tv', name: 'Teads', desc: 'Video outstream ads.' },
            { id: 'ads-spotx', kind: 'hostname', target: 'search.spotxchange.com', name: 'SpotX', desc: 'Video ad exchange.' },
            // Asian ad networks
            { id: 'ads-inmobi', kind: 'hostname', target: 'config.inmobi.com', name: 'InMobi', desc: 'Mạng quảng cáo mobile Ấn Độ.' },
            { id: 'ads-unity', kind: 'hostname', target: 'auction.unityads.unity3d.com', name: 'Unity Ads', desc: 'Quảng cáo trong game.' },
            { id: 'ads-applovin', kind: 'hostname', target: 'd.applvn.com', name: 'AppLovin', desc: 'Mobile ad network.' },
            { id: 'ads-ironsource', kind: 'hostname', target: 'outcome-ssp.supersonicads.com', name: 'ironSource', desc: 'Mobile ad mediation.' },
            { id: 'ads-vungle', kind: 'hostname', target: 'ads.api.vungle.com', name: 'Vungle / Liftoff', desc: 'Video ads cho mobile.' },
            { id: 'ads-mopub', kind: 'hostname', target: 'ads.mopub.com', name: 'MoPub', desc: 'Mobile ad exchange (AppLovin).' },
            { id: 'ads-smaato', kind: 'hostname', target: 'soma.smaato.net', name: 'Smaato', desc: 'Real-time mobile ad platform.' },
            { id: 'ads-adcolony', kind: 'hostname', target: 'adc3-launch.adcolony.com', name: 'AdColony', desc: 'Video quảng cáo HD mobile.' },
            // Vietnam local ads
            { id: 'ads-adtima', kind: 'hostname', target: 'ad.adtima.vn', name: 'Zalo Ads (Adtima)', desc: 'Mạng quảng cáo Zalo / Zing.' },
            { id: 'ads-vccorp', kind: 'hostname', target: 'admicro.vn', name: 'Admicro', desc: 'Mạng quảng cáo VCcorp.' },
            { id: 'ads-eclick', kind: 'hostname', target: 'eclick.vn', name: 'eClick', desc: 'Mạng quảng cáo FPT.' },
            { id: 'ads-novaads', kind: 'hostname', target: 'novaon.net', name: 'Novaon', desc: 'Mạng quảng cáo Novaon.' },
            { id: 'ads-coccoc', kind: 'hostname', target: 'qc.coccoc.com', name: 'Cốc Cốc Ads', desc: 'Mạng quảng cáo Cốc Cốc.' }
        ],
        tracking: [
            // Google
            { id: 'trk-ga', kind: 'hostname', target: 'www.google-analytics.com', name: 'Google Analytics', desc: 'Analytics phổ biến nhất.' },
            { id: 'trk-ga4', kind: 'hostname', target: 'region1.google-analytics.com', name: 'Google Analytics 4', desc: 'GA4 endpoint mới.' },
            { id: 'trk-gtm', kind: 'hostname', target: 'www.googletagmanager.com', name: 'Google Tag Manager', desc: 'Trình tải tag phổ biến.' },
            { id: 'trk-ga-ssl', kind: 'hostname', target: 'ssl.google-analytics.com', name: 'GA SSL', desc: 'Google Analytics qua SSL.' },
            { id: 'trk-google-ads-conv', kind: 'hostname', target: 'www.googleadservices.com', name: 'Google Ads Conversion', desc: 'Tracking chuyển đổi Google Ads.' },
            // Meta / Facebook
            { id: 'trk-fb-connect', kind: 'hostname', target: 'connect.facebook.net', name: 'Facebook Connect', desc: 'SDK và pixel Meta.' },
            { id: 'trk-fb-graph', kind: 'hostname', target: 'graph.facebook.com', name: 'Facebook Graph', desc: 'API thường đi cùng pixel.' },
            { id: 'trk-fb-pixel', kind: 'hostname', target: 'www.facebook.com', name: 'Facebook Pixel Host', desc: 'Host chính của FB Pixel.' },
            // Microsoft
            { id: 'trk-bing', kind: 'hostname', target: 'bat.bing.com', name: 'Microsoft UET', desc: 'Tracking Microsoft Ads.' },
            { id: 'trk-clarity', kind: 'hostname', target: 'clarity.ms', name: 'Microsoft Clarity', desc: 'Heatmap và session recording.' },
            // Social tracking
            { id: 'trk-tiktok', kind: 'hostname', target: 'analytics.tiktok.com', name: 'TikTok Analytics', desc: 'Pixel và event collection.' },
            { id: 'trk-tiktok-log', kind: 'hostname', target: 'mon.tiktokv.com', name: 'TikTok Telemetry', desc: 'Thu thập dữ liệu TikTok.' },
            { id: 'trk-linkedin', kind: 'hostname', target: 'snap.licdn.com', name: 'LinkedIn Insight', desc: 'Theo dõi chuyển đổi LinkedIn.' },
            { id: 'trk-snapchat', kind: 'hostname', target: 'tr.snapchat.com', name: 'Snapchat Pixel', desc: 'Tracking / conversion pixel.' },
            { id: 'trk-pinterest', kind: 'hostname', target: 'ct.pinterest.com', name: 'Pinterest Tag', desc: 'Theo dõi và retargeting.' },
            { id: 'trk-twitter', kind: 'hostname', target: 'analytics.twitter.com', name: 'Twitter/X Analytics', desc: 'Tracking chuyển đổi X.' },
            { id: 'trk-reddit', kind: 'hostname', target: 'events.reddit.com', name: 'Reddit Pixel', desc: 'Theo dõi sự kiện Reddit.' },
            // Product Analytics
            { id: 'trk-segment', kind: 'hostname', target: 'api.segment.io', name: 'Segment', desc: 'Event tracking pipeline.' },
            { id: 'trk-mixpanel', kind: 'hostname', target: 'api.mixpanel.com', name: 'Mixpanel', desc: 'Product analytics.' },
            { id: 'trk-amplitude', kind: 'hostname', target: 'api2.amplitude.com', name: 'Amplitude', desc: 'Product analytics platform.' },
            { id: 'trk-heap', kind: 'hostname', target: 'heapanalytics.com', name: 'Heap', desc: 'Auto-capture analytics.' },
            { id: 'trk-fullstory', kind: 'hostname', target: 'rs.fullstory.com', name: 'FullStory', desc: 'Session replay & analytics.' },
            // Heatmap & Behavior
            { id: 'trk-hotjar', kind: 'hostname', target: 'script.hotjar.com', name: 'Hotjar', desc: 'Heatmap và behavior.' },
            { id: 'trk-mouseflow', kind: 'hostname', target: 'o2.mouseflow.com', name: 'Mouseflow', desc: 'Session replay.' },
            { id: 'trk-crazyegg', kind: 'hostname', target: 'script.crazyegg.com', name: 'Crazy Egg', desc: 'Heatmap và A/B testing.' },
            { id: 'trk-luckyorange', kind: 'hostname', target: 'w1.luckyorange.com', name: 'Lucky Orange', desc: 'Session recordings.' },
            // Tag management & CDP
            { id: 'trk-app-measurement', kind: 'hostname', target: 'app-measurement.com', name: 'App Measurement', desc: 'Telemetry Firebase/GA.' },
            { id: 'trk-branch', kind: 'hostname', target: 'api2.branch.io', name: 'Branch.io', desc: 'Deep linking & attribution.' },
            { id: 'trk-adjust', kind: 'hostname', target: 'app.adjust.com', name: 'Adjust', desc: 'Mobile attribution.' },
            { id: 'trk-appsflyer', kind: 'hostname', target: 'launches.appsflyer.com', name: 'AppsFlyer', desc: 'Mobile attribution & analytics.' },
            { id: 'trk-kochava', kind: 'hostname', target: 'control.kochava.com', name: 'Kochava', desc: 'Mobile measurement.' },
            // Fingerprinting
            { id: 'trk-fingerprintjs', kind: 'hostname', target: 'api.fpjs.io', name: 'FingerprintJS', desc: 'Browser fingerprinting.' },
            // Other
            { id: 'trk-newrelic', kind: 'hostname', target: 'bam.nr-data.net', name: 'New Relic Browser', desc: 'Browser monitoring.' },
            { id: 'trk-sentry', kind: 'hostname', target: 'o0.ingest.sentry.io', name: 'Sentry', desc: 'Error tracking.' },
            { id: 'trk-hubspot', kind: 'hostname', target: 'js.hs-analytics.net', name: 'HubSpot Analytics', desc: 'Marketing analytics HubSpot.' },
            { id: 'trk-intercom', kind: 'hostname', target: 'api-iam.intercom.io', name: 'Intercom', desc: 'User tracking & messaging.' },
            { id: 'trk-optimizely', kind: 'hostname', target: 'logx.optimizely.com', name: 'Optimizely', desc: 'A/B testing & experimentation.' },
            { id: 'trk-chartbeat', kind: 'hostname', target: 'static.chartbeat.com', name: 'Chartbeat', desc: 'Real-time content analytics.' },
            { id: 'trk-comscore', kind: 'hostname', target: 'sb.scorecardresearch.com', name: 'Comscore', desc: 'Internet analytics & measurement.' },
            { id: 'trk-quantcast', kind: 'hostname', target: 'pixel.quantserve.com', name: 'Quantcast', desc: 'Audience measurement.' },
            { id: 'trk-nielsen', kind: 'hostname', target: 'secure-dcr.imrworldwide.com', name: 'Nielsen DCR', desc: 'Digital content ratings.' },
            // Vietnam tracking
            { id: 'trk-adtima', kind: 'hostname', target: 'log.adtima.vn', name: 'Adtima Tracking', desc: 'Tracking của hệ sinh thái Zalo.' },
            { id: 'trk-vccorp', kind: 'hostname', target: 'log.admicro.vn', name: 'Admicro Tracking', desc: 'Tracking của Admicro.' }
        ],
        malware: [
            // AMTSO Test URLs
            { id: 'sec-phishing', kind: 'url', target: 'https://www.amtso.org/check-desktop-phishing-page/', name: 'AMTSO Phishing', desc: 'Test URL anti-phishing.' },
            { id: 'sec-cloud', kind: 'url', target: 'https://www.amtso.org/feature-settings-check-cloud-lookups/', name: 'AMTSO Cloud Lookup', desc: 'Cloud lookup URL reputation.' },
            { id: 'sec-download', kind: 'url', target: 'https://www.amtso.org/feature-settings-check-download-of-malware/', name: 'AMTSO Download', desc: 'Download protection test.' },
            { id: 'sec-driveby', kind: 'url', target: 'https://www.amtso.org/feature-settings-check-drive-by-download/', name: 'AMTSO Drive-by', desc: 'Drive-by download test.' },
            { id: 'sec-wicar', kind: 'url', target: 'https://www.wicar.org/test-malware.html', name: 'WICAR Malware Test', desc: 'Test page cho web protection.' },
            // Known malware/phishing domains (commonly blacklisted)
            { id: 'mal-coin-hive', kind: 'hostname', target: 'coin-hive.com', name: 'CoinHive', desc: 'Cryptojacking nổi tiếng.' },
            { id: 'mal-coinhive-ws', kind: 'hostname', target: 'ws001.coinhive.com', name: 'CoinHive WS', desc: 'WebSocket cryptomining.' },
            { id: 'mal-jsecoin', kind: 'hostname', target: 'load.jsecoin.com', name: 'JSECoin', desc: 'JavaScript cryptominer.' },
            { id: 'mal-cryptoloot', kind: 'hostname', target: 'apis.cryptoloot.pro', name: 'CryptoLoot', desc: 'Cryptomining alternative.' },
            { id: 'mal-minero', kind: 'hostname', target: 'minero.cc', name: 'Minero.cc', desc: 'Web mining pool.' },
            { id: 'mal-webmine', kind: 'hostname', target: 'webmine.pro', name: 'WebMine Pro', desc: 'Browser mining service.' },
            { id: 'mal-2giga', kind: 'hostname', target: '2giga.link', name: '2Giga Link', desc: 'URL shortener phát tán malware.' },
            // Known C&C / Malware distribution
            { id: 'mal-malware-test', kind: 'hostname', target: 'malware.testcategory.com', name: 'Test Malware Domain', desc: 'Domain thường có trong blocklist.' },
            { id: 'mal-ioc-test', kind: 'hostname', target: 'urlhaus.abuse.ch', name: 'URLhaus Test', desc: 'Kiểm tra kết nối tới abuse.ch tracker.' },
            // Push notification scam domains
            { id: 'mal-push1', kind: 'hostname', target: 'pushnott.com', name: 'PushNott', desc: 'Push notification spam/scam.' },
            { id: 'mal-push2', kind: 'hostname', target: 'pushwelcome.com', name: 'PushWelcome', desc: 'Push notification abuse.' },
            { id: 'mal-push3', kind: 'hostname', target: 'notifpush.com', name: 'NotifPush', desc: 'Push notification scam.' },
            // Scam / Fraud domains commonly blacklisted
            { id: 'mal-dating-scam', kind: 'hostname', target: 'juicydates.com', name: 'JuicyDates', desc: 'Dating scam domain.' },
            { id: 'mal-survey-scam', kind: 'hostname', target: 'surveyjunkie.com', name: 'Survey Scam', desc: 'Survey scam thường thấy.' },
            // Phishing infrastructure
            { id: 'mal-bit-ly-abuse', kind: 'hostname', target: 'grabify.link', name: 'Grabify', desc: 'IP logger / phishing tool.' },
            { id: 'mal-iplogger', kind: 'hostname', target: 'iplogger.org', name: 'IP Logger', desc: 'Thu thập IP / phishing.' },
            { id: 'mal-blasze', kind: 'hostname', target: 'blasze.tk', name: 'Blasze', desc: 'IP grabbing service.' },
            // Exploit kits & redirectors
            { id: 'mal-adf-ly', kind: 'hostname', target: 'adf.ly', name: 'Adf.ly', desc: 'URL shortener nhiều malware.' },
            { id: 'mal-shorte-st', kind: 'hostname', target: 'shorte.st', name: 'Shorte.st', desc: 'Monetized shortener với script độc.' },
            { id: 'mal-bc-vc', kind: 'hostname', target: 'bc.vc', name: 'bc.vc', desc: 'URL shortener spam.' }
        ],
        adult: [
            { id: 'adult-pornhub', kind: 'hostname', target: 'pornhub.com', name: 'Pornhub', desc: 'Mốc nhận diện family filter.' },
            { id: 'adult-xvideos', kind: 'hostname', target: 'xvideos.com', name: 'XVideos', desc: 'Host nội dung người lớn phổ biến.' },
            { id: 'adult-xnxx', kind: 'hostname', target: 'xnxx.com', name: 'XNXX', desc: 'Hay bị chặn bởi family DNS.' },
            { id: 'adult-xhamster', kind: 'hostname', target: 'xhamster.com', name: 'xHamster', desc: 'Host phổ biến.' },
            { id: 'adult-redtube', kind: 'hostname', target: 'redtube.com', name: 'RedTube', desc: 'Host phổ biến.' },
            { id: 'adult-youporn', kind: 'hostname', target: 'youporn.com', name: 'YouPorn', desc: 'Host phổ biến.' },
            { id: 'adult-chaturbate', kind: 'hostname', target: 'chaturbate.com', name: 'Chaturbate', desc: 'Live streaming platform.' },
            { id: 'adult-stripchat', kind: 'hostname', target: 'stripchat.com', name: 'Stripchat', desc: 'Streaming platform.' },
            { id: 'adult-bongacams', kind: 'hostname', target: 'bongacams.com', name: 'BongaCams', desc: 'Live cam platform.' },
            { id: 'adult-livejasmin', kind: 'hostname', target: 'livejasmin.com', name: 'LiveJasmin', desc: 'Live cam site.' },
            { id: 'adult-spankbang', kind: 'hostname', target: 'spankbang.com', name: 'SpankBang', desc: 'Video platform.' },
            { id: 'adult-eporner', kind: 'hostname', target: 'eporner.com', name: 'Eporner', desc: 'Video platform HD.' },
            { id: 'adult-tube8', kind: 'hostname', target: 'tube8.com', name: 'Tube8', desc: 'MindGeek network.' },
            { id: 'adult-brazzers', kind: 'hostname', target: 'brazzers.com', name: 'Brazzers', desc: 'Premium platform.' },
            { id: 'adult-hentaihaven', kind: 'hostname', target: 'hentaihaven.xxx', name: 'HentaiHaven', desc: 'Anime adult content.' },
            { id: 'adult-rule34', kind: 'hostname', target: 'rule34.xxx', name: 'Rule34', desc: 'Anime/game adult content.' }
        ],
        spam: [
            // Popup / Popunder networks
            { id: 'spam-popads', kind: 'hostname', target: 'popads.net', name: 'PopAds', desc: 'Popup network lớn nhất.' },
            { id: 'spam-popcash', kind: 'hostname', target: 'popcash.net', name: 'PopCash', desc: 'Popunder network.' },
            { id: 'spam-popunder-net', kind: 'hostname', target: 'popunder.net', name: 'Popunder.net', desc: 'Popunder ads.' },
            { id: 'spam-propeller', kind: 'hostname', target: 'propellerads.com', name: 'PropellerAds', desc: 'Popunder / push spam.' },
            { id: 'spam-exoclick', kind: 'hostname', target: 'exoclick.com', name: 'ExoClick', desc: 'Traffic ads nhiều spam.' },
            // Adult ad networks
            { id: 'spam-juicyads', kind: 'hostname', target: 'juicyads.com', name: 'JuicyAds', desc: 'Adult / spam ad network.' },
            { id: 'spam-trafficjunky', kind: 'hostname', target: 'trafficjunky.net', name: 'TrafficJunky', desc: 'Ads network nhiều redirect.' },
            { id: 'spam-trafficstars', kind: 'hostname', target: 'tsyndicate.com', name: 'TrafficStars', desc: 'Adult traffic network.' },
            { id: 'spam-ero-advertising', kind: 'hostname', target: 'ero-advertising.com', name: 'EroAdvertising', desc: 'Adult advertising.' },
            // Push notification spam
            { id: 'spam-clickadu', kind: 'hostname', target: 'clickadu.com', name: 'Clickadu', desc: 'Push / pop traffic.' },
            { id: 'spam-richads', kind: 'hostname', target: 'richads.com', name: 'RichAds', desc: 'Push notification ads.' },
            { id: 'spam-datspush', kind: 'hostname', target: 'datspush.com', name: 'DatsPush', desc: 'Push notification network.' },
            { id: 'spam-megapush', kind: 'hostname', target: 'megapush.com', name: 'MegaPush', desc: 'Push ads platform.' },
            // Clickbait / Content spam
            { id: 'spam-hilltop', kind: 'hostname', target: 'hilltopads.net', name: 'HilltopAds', desc: 'Push / pop ads.' },
            { id: 'spam-revcontent', kind: 'hostname', target: 'revcontent.com', name: 'Revcontent', desc: 'Content ads / clickbait.' },
            { id: 'spam-mgid', kind: 'hostname', target: 'mgid.com', name: 'MGID', desc: 'Native ads / clickbait.' },
            { id: 'spam-contentad', kind: 'hostname', target: 'api.content-ad.net', name: 'Content.ad', desc: 'Content recommendation spam.' },
            { id: 'spam-zergnet', kind: 'hostname', target: 'zergnet.com', name: 'ZergNet', desc: 'Content recommendation clickbait.' },
            // URL shortener spam / redirect
            { id: 'spam-linkvertise', kind: 'hostname', target: 'linkvertise.com', name: 'Linkvertise', desc: 'Chuyển hướng có quảng cáo.' },
            { id: 'spam-shrinkme', kind: 'hostname', target: 'shrinkme.io', name: 'ShrinkMe', desc: 'Monetized URL shortener.' },
            { id: 'spam-ouo', kind: 'hostname', target: 'ouo.io', name: 'Ouo.io', desc: 'URL shortener spam.' },
            { id: 'spam-exe-io', kind: 'hostname', target: 'exe.io', name: 'Exe.io', desc: 'Monetized shortener.' },
            { id: 'spam-cuturl', kind: 'hostname', target: 'cutt.ly', name: 'Cutt.ly', desc: 'URL shortener dùng cho spam.' },
            // Redirect / Interstitial  
            { id: 'spam-adsterra', kind: 'hostname', target: 'adsterra.com', name: 'Adsterra', desc: 'Pop/push/banner ads.' },
            { id: 'spam-trafficforce', kind: 'hostname', target: 'trafficforce.com', name: 'TrafficForce', desc: 'Pop traffic force.' },
            { id: 'spam-ad-maven', kind: 'hostname', target: 'ad-maven.com', name: 'AdMaven', desc: 'Pop traffic network.' },
            { id: 'spam-bidvertiser', kind: 'hostname', target: 'bidvertiser.com', name: 'BidVertiser', desc: 'Low-quality ad network.' }
        ],
        telemetry: [
            // Microsoft / Windows
            { id: 'tel-ms-telemetry', kind: 'hostname', target: 'vortex.data.microsoft.com', name: 'Windows Telemetry', desc: 'Thu thập dữ liệu Windows.' },
            { id: 'tel-ms-compat', kind: 'hostname', target: 'compat.telemetry.microsoft.com', name: 'Windows Compat', desc: 'Compatibility telemetry.' },
            { id: 'tel-ms-watson', kind: 'hostname', target: 'watson.telemetry.microsoft.com', name: 'Watson Telemetry', desc: 'Crash reporting Microsoft.' },
            { id: 'tel-ms-settings', kind: 'hostname', target: 'settings-win.data.microsoft.com', name: 'Windows Settings', desc: 'Settings sync telemetry.' },
            { id: 'tel-ms-diagnostics', kind: 'hostname', target: 'v10.events.data.microsoft.com', name: 'MS Diagnostics', desc: 'Event-based telemetry.' },
            // Apple
            { id: 'tel-apple-metrics', kind: 'hostname', target: 'metrics.icloud.com', name: 'Apple Metrics', desc: 'Thu thập dữ liệu Apple.' },
            { id: 'tel-apple-xp', kind: 'hostname', target: 'xp.apple.com', name: 'Apple XP', desc: 'Apple experience metrics.' },
            // Adobe
            { id: 'tel-adobe', kind: 'hostname', target: 'cc-api-data.adobe.io', name: 'Adobe Telemetry', desc: 'Thu thập dữ liệu Creative Cloud.' },
            { id: 'tel-adobe-2', kind: 'hostname', target: 'ic.adobe.io', name: 'Adobe IC', desc: 'Adobe interaction telemetry.' },
            // Samsung / Xiaomi
            { id: 'tel-samsung', kind: 'hostname', target: 'analytics.samsungknox.com', name: 'Samsung Knox', desc: 'Telemetry thiết bị Samsung.' },
            { id: 'tel-xiaomi', kind: 'hostname', target: 'tracking.intl.miui.com', name: 'Xiaomi MIUI', desc: 'Telemetry MIUI.' },
            { id: 'tel-xiaomi-2', kind: 'hostname', target: 'data.mistat.intl.xiaomi.com', name: 'Xiaomi Stats', desc: 'Statistics Xiaomi.' },
            // Huawei
            { id: 'tel-huawei', kind: 'hostname', target: 'metrics.data.hicloud.com', name: 'Huawei Metrics', desc: 'Telemetry Huawei.' },
            // Game / App telemetry
            { id: 'tel-epic', kind: 'hostname', target: 'tracking.epicgames.com', name: 'Epic Games', desc: 'Telemetry Epic Games.' },
            { id: 'tel-ea', kind: 'hostname', target: 'telemetry.api.ea.com', name: 'EA Telemetry', desc: 'Thu thập dữ liệu EA.' },
            // Firefox
            { id: 'tel-firefox', kind: 'hostname', target: 'incoming.telemetry.mozilla.org', name: 'Firefox Telemetry', desc: 'Thu thập dữ liệu Firefox.' },
            // Spotify
            { id: 'tel-spotify', kind: 'hostname', target: 'spclient.wg.spotify.com', name: 'Spotify Telemetry', desc: 'Analytics Spotify.' }
        ]
    }
});
