/* Dependencies */
const _ = window._;


/* Helpers */
const isClientIsBot = () => {
    // https://github.com/monperrus/crawler-user-agents
    let isBot = false;
    const botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
    const re = new RegExp(botPattern, 'i');
    const userAgent = navigator.userAgent;
    if (re.test(userAgent)) isBot = true;

    return isBot;
};
const getTimestamp = () => Math.round(new Date().getTime()/1000);
const getToken = (length = 12) => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
const cookies = {
    get: function (cname) {
        let name = cname + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
    set: function (cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    },
};
const createElement = ({
    tag = 'div',
    type = null,
    id = null,
    className = null,
    css = null,
    text = null,
    html = null,
    cclData = null,
    cclTarget = null,
    cclSource = null,
    cclToggle = null,
    cclControl = null,
    arias = {
        label: null,
        labeledBy: null,
        modal: null,
        hidden: null,
        describedBy: null,
    },
    on = {
        click: null,
        hover: null,
        focus: null,
        change: null,
        blur: null,
        dblclick: null,
    },
}) => {
    const element = document.createElement(tag);
    if (type) element.type = type;
    if (id) element.id = id;
    if (className) element.className = className;
    if (css) element.style.cssText = css;
    if (text) element.innerText = text;
    if (html) element.innerHTML = html;
    if (cclData) element.dataset['ccl'] = cclData;
    if (cclTarget) element.dataset['ccl-target'] = cclTarget;
    if (cclSource) element.dataset['ccl-source'] = cclSource;
    if (cclToggle) element.dataset['ccl-toggle'] = cclToggle;
    if (cclControl) element.dataset['ccl-control'] = cclControl;
    if (arias) {
        if (arias.label) element.ariaLabel = arias.label;
        if (arias.labeledBy) element.ariaLabelledBy = arias.labeledBy;
        if (arias.modal) element.ariaModal = arias.modal;
        if (arias.hidden) element.ariaHidden = String(arias.hidden);
        if (arias.describedBy) element.ariaDescribedBy = arias.describedBy;
    }
    if (on) {
        if (on.click) element.onclick = on.click;
        if (on.hover) element.onmouseover = on.hover;
        if (on.focus) element.onfocus = on.focus;
        if (on.change) element.onchange = on.change;
        if (on.blur) element.onblur = on.blur;
        if (on.dblclick) element.ondblclick = on.dblclick;
    }

    return element;
};
const createButtonElement = (id, className, text, cclData) => {
    return createElement({
        id,
        className,
        text,
        cclData,
        tag: 'button',
        type: 'button',
        arias: {
            label: `button`,
        },
    });
};


/* Default values */
const defaultState = {
    init: false, // When service is initialized
    revisionChanged: false, // When revision version is different from options
    history: [ 'pending' ], // History of events [pending,init,all,necessary,custom,...]
    banner: {
        render: false, // When banner is rendered in DOM
        show: false, // When banner is visible for user
        destroyed: false, // When banner is removed from DOM
    },
    dialog: {
        render: false, // When dialog is rendered in DOM
        show: false, // When dialog is visible for user
        destroyed: false, // When dialog is removed from DOM
    },
    language: 'en-US', // Default selected language, will be set from options
    languages: [ 'en-US' ], // Current available language list, will be generated by locales object
    cookie: null, // Saved cookie from browser
    preferences: {
        timestamp: null, // Timestamp when cookie is set
        event: null, // Triggered event [all,necessary,custom]
        accepted: [], // Accepted categories
        declined: [], // Declined categories
        changed: [], // Categories what was changed, if any
    },
};
const defaultOptions = {
    meta: {
        name: 'CookieConsentLayer', // Will be used as global service name, eg: window.CookieConsentLayer
        revision: 0, // Instance revision, if value is changed and user have already accepted, banner will trigger again
        debug: false, // If true, it wil display console logs with events for easier debugging
        delay: 0, // When set, banner will show after this value in ms
        classPrefix: 'ccl-', // Global class prefix used also in styles. Be sure you know, why changing this value
        hideFromBots: false, // If you want to hide service from bot/crawler/webdriver. If set to true and service detects one of bot, will be not initialized
        ltr: true, // TODO: If you want to keep text right-to-left, set to false
    },
    cookie: {
        name: 'CCLAYER', // Name of a cookie which be save in browser
        domain: '.your-domain.some', // Cookie domain
        expiration: 365, // Expiration of consent, if expires, banner will be showed again
        path: '/', // Cookie path
        sameSite: 'Lax', // Cookie on same site
        rfc: false, // RFC format of cookie, otherwise is json as string
    },
    scripts: {
        autoload: true, // TODO: If true, check all scripts elements on page with: 'data-cc-scope="true"' ... or something similar
        mode: 'opt-in', // TODO: ['opt-in', 'opt-out']
    },
    consent: {
        force: false, // TODO: User will be forced to select consent, displays transparent layer above the page
        categories: [ 'necessary', 'analytics', 'marketing', 'functional', 'personalization' ], // These categories will be rendered as options and also will be matched with locales[].categories
        staticCategories: [ 'necessary' ], // These categories will be set as unchangeable
        showCategory: true, // If set to true category article will be rendered
        showCategoryTable: true, // If set to true cookie tables is rendered in category
        cookies: {
            necessary: [
                {
                    name: 'CookieConsentScope',
                    domain: '.your-domain.some',
                    expiration: 365,
                    description: 'Cookie description',
                    regex: false,
                },
                {
                    name: 'CookieConsentScope',
                    domain: '.your-domain.some',
                    expiration: 365,
                    description: 'Cookie description',
                    regex: false,
                },
            ],
            analytics: [
                {
                    name: 'CookieConsentScope',
                    domain: '.your-domain.some',
                    expiration: 365,
                    description: 'Cookie description',
                    regex: false,
                },
                {
                    name: 'CookieConsentScope',
                    domain: '.your-domain.some',
                    expiration: 365,
                    description: 'Cookie description',
                    regex: false,
                },
            ],
            marketing: [
                {
                    name: 'CookieConsentScope',
                    domain: '.your-domain.some',
                    expiration: 365,
                    description: 'Cookie description',
                    regex: false,
                },
                {
                    name: 'CookieConsentScope',
                    domain: '.your-domain.some',
                    expiration: 365,
                    description: 'Cookie description',
                    regex: false,
                },
            ],
            functional: [
                {
                    name: 'CookieConsentScope',
                    domain: '.your-domain.some',
                    expiration: 365,
                    description: 'Cookie description',
                    regex: false,
                },
                {
                    name: 'CookieConsentScope',
                    domain: '.your-domain.some',
                    expiration: 365,
                    description: 'Cookie description',
                    regex: false,
                },
            ],
            personalization: [
                {
                    name: 'CookieConsentScope',
                    domain: '.your-domain.some',
                    expiration: 365,
                    description: 'Cookie description',
                    regex: false,
                },
                {
                    name: 'CookieConsentScope',
                    domain: '.your-domain.some',
                    expiration: 365,
                    description: 'Cookie description',
                    regex: false,
                },
            ],
        },
    },
    banner: {
        id: 'CookieConsentLayerBanner',
        btnAcceptAllId: 'CookieConsentLayerBannerBtnAcceptAll',
        btnAcceptNecessaryId: 'CookieConsentLayerBannerBtnAcceptNecessary',
        layout: 'cloud', // TODO: box/cloud/bar
        position: 'bottom center', // TODO: bottom/middle/top + left/center/right
        transition: 'default', // TODO: default/slide/zoom
    },
    dialog: {
        id: 'CookieConsentLayerDialog',
        btnAcceptAllId: 'CookieConsentLayerDialogBtnAcceptAll',
        btnAcceptNecessaryId: 'CookieConsentLayerDialogBtnAcceptNecessary',
        btnSaveId: 'CookieConsentLayerDialogBtnSave',
        layout: 'box', // TODO: box/bar
        position: 'middle', // TODO: bottom/middle/top
        transition: 'default', // TODO: default/slide/zoom
    },
    language: 'en-US', // Default language
    locales: {
        'en-US': {
            common: {
                buttonAcceptAll: 'Accept all',
                buttonAcceptNecessary: 'Accept necessary',
                buttonSave: 'Save settings',
                buttonClose: 'Close',
            },
            banner: {
                title: 'We use cookies!',
                content: `Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-ccl="show_dialog">Let me choose</button>`,
            },
            dialog: {
                title: 'Cookie preferences',
                primary: `I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#">privacy policy</a>.`,
                secondary: `This is secondary content block ... for some reasons ... with <a href="#" target="_blank">outer link</a> or <button type="button" data-ccl="hide_dialog">close dialog</button>`
            },
            revisionAlert: 'Sorry, but we changed our policy or whatever, so you must accept cookies again.',
            table: {
                colName: 'Name',
                colDomain: 'Domain',
                colExpiration: 'Expiration',
                colDescription: 'Description',
            },
            categories: {
                necessary: {
                    title: 'Strictly necessary cookies',
                    description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
                },
                analytics: {
                    title: 'Analytics and performance cookies',
                    description: 'These cookies allow the website to remember the choices you have made in the past',
                },
                marketing: {
                    title: 'Marketing and advertisement cookies',
                    description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
                },
                functional: {
                    title: 'Functional cookies',
                    description: 'Functional and not specified cookies',
                },
                personalization: {
                    title: 'Personalization cookies',
                    description: 'Personalization and not specified cookies',
                },
            },
        },
        'cs-CZ': {
            common: {
                buttonAcceptAll: 'Přimout vše',
                buttonAcceptNecessary: 'Přimout nezbytné',
                buttonSave: 'Uložit změny',
                buttonClose: 'Zavřít',
            },
            banner: {
                title: 'My používáme cookies!',
                content: `Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-ccl="show_dialog">Let me choose</button>`,
            },
            dialog: {
                title: 'Preference koláčků',
                primary: `I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#">privacy policy</a>.`,
                secondary: `This is secondary content block ... for some reasons ... with <a href="#" target="_blank">outer link</a> or <button type="button" data-ccl="hide_dialog">close dialog</button>`
            },
            revisionAlert: 'Omlouváme se, ale došlo ke změně v našich pravidlech cookies a proto to musíte potvrdit znovu.',
            table: {
                colName: 'Název',
                colDomain: 'Doména',
                colExpiration: 'Expirace',
                colDescription: 'Poznámka',
            },
            categories: {
                necessary: {
                    title: 'Nezbytné cookies pro provoz',
                    description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
                },
                analytics: {
                    title: 'Analytické cookies',
                    description: 'These cookies allow the website to remember the choices you have made in the past',
                },
                marketing: {
                    title: 'Marketingové cookies',
                    description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
                },
                functional: {
                    title: 'Functional cookies',
                    description: 'Functional and not specified cookies',
                },
                personalization: {
                    title: 'Personalization cookies',
                    description: 'Personalization and not specified cookies',
                },
            },
        },
    },
    onAcceptAll: function (cookie, preferences) {}, // When user clicks on 'Accept all' button
    onAcceptNecessary: function (cookie, preferences) {}, // When user clicks on 'Accept necessary' or 'Decline' button
    onChange: function (cookie, preferences) {}, // When user click on 'Save' button in dialog
    onInit: function (cookie, preferences) {}, // Triggers only when cookie is found on page load and users action is not needed
    onToggle: function (preferences) {}, // Triggers when user trigger toggle button, but not save yet
};


/* Class */
class CookieConsentLayer {


    /* Static constants */
    tokens = {
        // Keep these constants unchanged -->
        BTN_ACCEPT_ALL_CCL: 'button_acceptAll',
        BTN_ACCEPT_NECESSARY_CCL: 'button_acceptNecessary',
        BTN_SAVE_CCL: 'button_save',
        REVISION_ALERT_CCL: 'revision_alert',
        BTN_SHOW_DIALOG_CCL: 'show_dialog',
        BTN_HIDE_DIALOG_CCL: 'hide_dialog',
        BTN_SHOW_BANNER_CCL: 'show_banner',
        BTN_HIDE_BANNER_CCL: 'hide_banner',
        CATEGORIES_TABLE_CCL: 'categories_table',
        CATEGORY_TOGGLE_PFX_CCL: 'category_',
        // <--
    };
    banner = {
        show: (delay = 0) => {
            const elem = document.getElementById(this.options.banner.id);
            const runner = () => {
                elem.style.display = 'block';
                elem.ariaHidden = 'false';

                this.state.banner.show = true;
            };

            if (delay > 0) {
                setTimeout(runner, delay);
            } else {
                runner();
            }
        },
        hide: () => {
            const elem = document.getElementById(this.options.banner.id);

            elem.style.display = 'none';
            elem.ariaHidden = 'true';

            this.state.banner.show = false;
        },
        init: () => {
            if (!this.state.dialog.destroyed) {
                this.renderBannerElement();
                this.state.banner.render = true;
            } else {
                console.warn('Banner has been removed from DOM, try reload page or re-init the service');
            }
        },
        destroy: () => {
            const elem = document.getElementById(this.options.banner.id);
            elem.remove();
            this.state.banner.render = false;
            this.state.banner.show = false;
            this.state.banner.destroyed = true;
        },
    };
    dialog = {
        show: (delay = 0) => {
            const elem = document.getElementById(this.options.dialog.id);
            const runner = () => {
                elem.style.display = 'block';
                elem.ariaHidden = 'false';

                this.state.dialog.show = true;
            };

            if (delay > 0) {
                setTimeout(runner, delay);
            } else {
                runner();
            }
        },
        hide: () => {
            const elem = document.getElementById(this.options.dialog.id);

            elem.style.display = 'none';
            elem.ariaHidden = 'true';

            this.state.dialog.show = false;
        },
        init: () => {
            if (!this.state.dialog.destroyed) {
                this.renderDialogElement();
                this.state.dialog.render = true;
            } else {
                console.warn('Dialog has been removed from DOM, try reload page or re-init the service');
            }
        },
        destroy: () => {
            const elem = document.getElementById(this.options.dialog.id);
            elem.remove();
            this.state.dialog.render = false;
            this.state.dialog.show = false;
            this.state.dialog.destroyed = true;
        },
    };
    layout = {
        bannerBody: (title, content, revision = null) => {
            const _title = `<div class="${this.selectors.banner.bodyTitleClassName}">${title}</div>`;
            const _content = `<div class="${this.selectors.banner.bodyContentClassName}">${content}</div>`;
            const _revision = revision && `<div id="${this.tokens.REVISION_ALERT_CCL}" class="${this.selectors.banner.bodyRevisionClassName}">${revision}</div>`;

            return `${_title}${_revision}${_content}`;
        },
        dialogBody: (title, primary, secondary, close) => {
            const _close = `<button type="button" data-ccl="${this.tokens.BTN_HIDE_DIALOG_CCL}" class="${this.selectors.dialog.bodyCloseClassName}">${close}</button>`;
            const _title = `<div class="${this.selectors.dialog.bodyTitleClassName}">${title}</div>`;
            const _primary = `<div class="${this.selectors.dialog.bodyPrimaryClassName}">${primary}</div>`;
            const _secondary = secondary && `<div class="${this.selectors.dialog.bodySecondaryClassName}">${secondary}</div>`;
            const _table = `<div data-ccl-target="${this.tokens.CATEGORIES_TABLE_CCL}" class="${this.selectors.dialog.bodyTableClassName}">Loading table, please wait</div>`;

            return `${_close}${_title}${_primary}${_table}${_secondary}`;
        },
    };


    /* Class constructor */
    constructor(
        options = {}, // Custom options
        scope = 'default', // Scope name
        uuid = null, // Static instance UUID
    ) {
        this.uuid = uuid || getToken(6); // Instance UUID
        this.state = _.cloneDeep(defaultState); // Inner component state
        this.options = _.merge(defaultOptions, options); // Merged options object

        /* Constants */
        this.selectors = {
            btn: {
                acceptAllClassName: `${this.options.meta.classPrefix}button ${this.options.meta.classPrefix}button-primary`,
                acceptNecessaryClassName: `${this.options.meta.classPrefix}button ${this.options.meta.classPrefix}button-secondary`,
                saveChangesClassName: `${this.options.meta.classPrefix}button ${this.options.meta.classPrefix}button-secondary`,
            },
            banner: {
                wrapperId: this.options.banner.id,
                wrapperClassName: `${this.options.meta.classPrefix}banner-wrapper`,
                bodyId: `${this.options.banner.id}_body`,
                bodyClassName: `${this.options.meta.classPrefix}banner-body`,
                bodyTitleClassName: `${this.options.meta.classPrefix}banner-body-title`,
                bodyRevisionClassName: `${this.options.meta.classPrefix}banner-body-revision`,
                bodyContentClassName: `${this.options.meta.classPrefix}banner-body-content`,
                actionsId: `${this.options.banner.id}_actions`,
                actionsClassName: `${this.options.meta.classPrefix}banner-actions`,
            },
            dialog: {
                wrapperId: this.options.dialog.id,
                wrapperClassName: `${this.options.meta.classPrefix}dialog-wrapper`,
                bodyId: `${this.options.dialog.id}_body`,
                bodyClassName: `${this.options.meta.classPrefix}dialog-body`,
                bodyCloseClassName: `${this.options.meta.classPrefix}dialog-body-close`,
                bodyTitleClassName: `${this.options.meta.classPrefix}dialog-body-title`,
                bodyTableClassName: `${this.options.meta.classPrefix}dialog-body-table`,
                bodyPrimaryClassName: `${this.options.meta.classPrefix}dialog-body-primary`,
                bodySecondaryClassName: `${this.options.meta.classPrefix}dialog-body-secondary`,
                actionsId: `${this.options.dialog.id}_actions`,
                actionsClassName: `${this.options.meta.classPrefix}dialog-actions`,
            },
            table: {},
        };
        this.nodes = {
            btn: {
                showDialog: () => document.querySelectorAll(`[data-ccl="${this.tokens.BTN_SHOW_DIALOG_CCL}"]`),
                hideDialog: () => document.querySelectorAll(`[data-ccl="${this.tokens.BTN_HIDE_DIALOG_CCL}"]`),
                showBanner: () => document.querySelectorAll(`[data-ccl="${this.tokens.BTN_SHOW_BANNER_CCL}"]`),
                hideBanner: () => document.querySelectorAll(`[data-ccl="${this.tokens.BTN_HIDE_BANNER_CCL}"]`),
                acceptAll: () => document.querySelectorAll(`[data-ccl="${this.tokens.BTN_ACCEPT_ALL_CCL}"]`),
                acceptNecessary: () => document.querySelectorAll(`[data-ccl="${this.tokens.BTN_ACCEPT_NECESSARY_CCL}"]`),
                saveChanges: () => document.querySelectorAll(`[data-ccl="${this.tokens.BTN_SAVE_CCL}"]`),
            },
        };
        this.events = {
            showBanner: (e) => {
                e.preventDefault();
                this.banner.show();
            },
            hideBanner: (e) => {
                e.preventDefault();
                this.banner.hide();
            },
            showDialog: (e) => {
                e.preventDefault();
                this.dialog.show();
            },
            hideDialog: (e) => {
                e.preventDefault();
                this.dialog.hide();
            },
            acceptNecessary: (e) => {
                e.preventDefault();
                this.onAcceptNecessaryHandler();
            },
            acceptAll: (e) => {
                e.preventDefault();
                this.onAcceptAllHandler();
            },
            saveChanges: (e) => {
                e.preventDefault();
                this.onChangeHandler();
            },
            toggleCategory: (e, category) => {
                e.preventDefault();
                this.toggleCategoryHandler(category);
            },
        };

        this.init(); // Triggered once when class is loaded
    }


    /* References, utils, common */
    getState() {
        return this.state;
    }
    getPreferences() {
        return this.state.preferences;
    }
    getOptions() {
        return this.options;
    }
    log(...args) {
        if (this.options.meta.debug) console.log(...args);
    }
    pushHistory(arg) {
        this.state.history.push(arg);
    }


    /* Languages and locales */
    changeLanguage(lang = this.options.language, changeLanguage = true) {
        this.state.language = lang;
        changeLanguage && this.setLocalesContent(lang);
    }
    getLocales(lang = this.state.language) {
        return this.options.locales[lang];
    }
    setLocalesContent(lang = this.state.language) {
        const cookieData = this.getCookieData();
        const locales = this.getLocales(lang);
        const elBannerBodyHtml = document.getElementById(this.selectors.banner.bodyId);
        const elDialogBodyHtml = document.getElementById(this.selectors.dialog.bodyId);
        this.nodes.btn.acceptAll().forEach((node) => {
            node.innerText = `${locales.common.buttonAcceptAll}`;
        });
        this.nodes.btn.acceptNecessary().forEach((node) => {
            node.innerText = `${locales.common.buttonAcceptNecessary}`;
        });
        this.nodes.btn.saveChanges().forEach((node) => {
            node.innerText = `${locales.common.buttonSave}`;
        });
        elBannerBodyHtml.innerHTML = this.layout.bannerBody(locales.banner.title, locales.banner.content, cookieData.isExpiredRevision && locales.revisionAlert);
        elDialogBodyHtml.innerHTML = this.layout.dialogBody(locales.dialog.title, locales.dialog.primary, locales.dialog.secondary, locales.common.buttonClose);
        this.renderCategoryTable();
    }


    /* Cookie handlers */
    getCookie(name = this.options.cookie.name) {
        const value = cookies.get(name);

        return value && (this.options.cookie.rfc ? JSON.parse(decodeURIComponent(value)) : JSON.parse(value));
    }
    setCookie(value, name = this.options.cookie.name, expiration = this.options.cookie.expiration) {
        const parsedValue = this.options.cookie.rfc ? encodeURIComponent(JSON.stringify(value)) : JSON.stringify(value);
        cookies.set(name, parsedValue, expiration);
    }
    destroyCookie(name = this.options.cookie.name) {
        this.setCookie(null, name, -1);
    }
    getCookieData() {
        const cookie = this.getCookie();
        const today = new Date();
        const updated = cookie.dateUpdated;
        console.log('compare two dates, if date is expired ... (updated + expiration) >= today ... ', today.toISOString(), updated)
        return {
            current: cookie,
            createdDate: updated || today.toISOString(),
            updatedDate: today.toISOString(),
            isExpiredDate: false, // TODO: compare dates with cookie expiration
            isExpiredRevision: cookie && (cookie.revision !== this.options.meta.revision),
        };
    }


    /* Main callback handlers */
    getCallbackData(event) {
        const cookieData = this.getCookieData();
        let categoriesAccepted, categoriesDeclined, categoriesChanged;
        switch (event) {

            case 'custom':
                categoriesAccepted = this.state.preferences.accepted;
                categoriesDeclined = this.state.preferences.declined;
                categoriesChanged = this.state.preferences.changed;
                break;

            case 'all':
                categoriesAccepted = [ 'necessary', 'analytics', 'marketing', 'functional', 'personalization' ];
                categoriesDeclined = [];
                categoriesChanged = this.state.preferences.accepted.filter(x => categoriesAccepted.includes(x));
                break;

            case 'necessary':
            default:
                categoriesAccepted = [ 'necessary' ];
                categoriesDeclined = [ 'analytics', 'marketing', 'functional', 'personalization' ];
                categoriesChanged = this.state.preferences.accepted.filter(x => categoriesAccepted.includes(x));
                break;

        }

        return {
            preferences: {
                event,
                timestamp: getTimestamp(),
                accepted: categoriesAccepted,
                declined: categoriesDeclined,
                changed: categoriesChanged,
            },
            cookie: {
                categories: categoriesAccepted,
                uuid: this.uuid,
                revision: this.options.meta.revision,
                rfc: this.options.cookie.rfc,
                dateCreated: cookieData.createdDate,
                dateUpdated: cookieData.updatedDate,
                data: null,
            },
        };
    }
    eventCallbackHelper(event, callback) {
        const data = this.getCallbackData(event);
        const preferences = data.preferences;
        const cookie = data.cookie;
        this.banner.hide();
        this.dialog.hide();
        this.state.preferences = preferences;
        this.state.cookie = cookie;
        this.setCookie(cookie);
        this.checkToggleStates();
        this.pushHistory(event);
        if (callback && typeof callback === 'function') callback(cookie, preferences);
    }
    onAcceptAllHandler() {
        this.eventCallbackHelper('all', this.options.onAcceptAll);
    }
    onAcceptNecessaryHandler() {
        this.eventCallbackHelper('necessary', this.options.onAcceptNecessary);
    }
    onChangeHandler() {
        this.eventCallbackHelper('custom', this.options.onChange);
    }


    /* Toggle handlers */
    toggleCategoryHandler(ctg) {
        const categories = this.options.consent.categories || [];
        const accepted = this.state.preferences.accepted ? _.cloneDeep(this.state.preferences.accepted) : [];
        let declined, changed;
        const acceptedIndex = _.indexOf(accepted, ctg);
        if (acceptedIndex > -1) {
            accepted.splice(acceptedIndex, 1);
        } else {
            accepted.push(ctg);
        }
        declined = categories.filter(x => !accepted.includes(x));
        changed = categories.filter(x => accepted.includes(x));
        this.state.preferences.accepted = accepted;
        this.state.preferences.declined = declined;
        this.state.preferences.changed = changed;
        this.pushHistory(`toggle:${ctg}`);
        if (this.options.onToggle && typeof this.options.onToggle === 'function') {
            this.options.onToggle(this.state.preferences);
        }
        this.log('toggleCategoryHandler', accepted, declined, changed);
    }
    checkToggleStates() {
        const categories = this.options.consent.categories || [];
        const list = this.state.preferences.accepted || [];
        categories.map((ctg) => {
            const key = `${this.tokens.CATEGORY_TOGGLE_PFX_CCL}${ctg}`;
            const nodes = document.querySelectorAll(`[data-ccl-toggle="${key}"]`);
            nodes.forEach((node) => node.checked = list.indexOf(ctg) > -1);
        });
    }


    /* Event listeners */
    initButtonEvents() {
        this.nodes.btn.showDialog().forEach((node) => { node.addEventListener('click', this.events.showDialog) });
        this.nodes.btn.hideDialog().forEach((node) => { node.addEventListener('click', this.events.hideDialog) });
        this.nodes.btn.showBanner().forEach((node) => { node.addEventListener('click', this.events.showBanner) });
        this.nodes.btn.hideBanner().forEach((node) => { node.addEventListener('click', this.events.hideBanner) });
        this.nodes.btn.acceptAll().forEach((node) => { node.addEventListener('click', this.events.acceptAll) });
        this.nodes.btn.acceptNecessary().forEach((node) => { node.addEventListener('click', this.events.acceptNecessary) });
        this.nodes.btn.saveChanges().forEach((node) => { node.addEventListener('click', this.events.saveChanges) });
    }
    initToggleEvents() {
        const categories = this.options.consent.categories || [];
        categories.map((ctg) => {
            const key = `${this.tokens.CATEGORY_TOGGLE_PFX_CCL}${ctg}`;
            const nodes = document.querySelectorAll(`[data-ccl-toggle="${key}"]`);
            nodes.forEach((node) => {
                node.addEventListener('change', (e) => this.events.toggleCategory(e, ctg));
            });
        });
    }
    removeButtonEvents() {
        this.nodes.btn.showDialog().forEach((node) => { node.removeEventListener('click', this.events.showDialog) });
        this.nodes.btn.hideDialog().forEach((node) => { node.removeEventListener('click', this.events.hideDialog) });
        this.nodes.btn.showBanner().forEach((node) => { node.removeEventListener('click', this.events.showBanner) });
        this.nodes.btn.hideBanner().forEach((node) => { node.removeEventListener('click', this.events.hideBanner) });
        this.nodes.btn.acceptAll().forEach((node) => { node.removeEventListener('click', this.events.acceptAll) });
        this.nodes.btn.acceptNecessary().forEach((node) => { node.removeEventListener('click', this.events.acceptNecessary) });
        this.nodes.btn.saveChanges().forEach((node) => { node.removeEventListener('click', this.events.saveChanges) });
    }
    removeToggleEvents() {
        const categories = this.options.consent.categories || [];
        categories.map((ctg) => {
            const key = `${this.tokens.CATEGORY_TOGGLE_PFX_CCL}${ctg}`;
            const nodes = document.querySelectorAll(`[data-ccl-toggle="${key}"]`);
            nodes.forEach((node) => {
                node.removeEventListener('change', (e) => this.events.toggleCategory(e, ctg));
            });
        });
    }


    /* Renderers */
    renderCategoryTable(showTable = true) {
        const locales = this.getLocales();
        const targets = document.querySelectorAll(`[data-ccl-target="${this.tokens.CATEGORIES_TABLE_CCL}"]`);
        const categories = this.options.consent.categories || [];
        const getCategoryToggle = (category) => {
            const key = `${this.tokens.CATEGORY_TOGGLE_PFX_CCL}${category}`;
            const disabled = _.indexOf(this.options.consent.staticCategories, category) > -1;

            return `<input type="checkbox" value="${category}" data-ccl-toggle="${key}" ${disabled && 'disabled'} />`;
        };
        const getCategoryContent = (ctg) => {
            const _title = `<div>${locales.categories[ctg].title ? locales.categories[ctg].title : `no-value-set:locales.categories[${ctg}].title`}</div>`;
            const _description = `<div>${locales.categories[ctg].description ? locales.categories[ctg].description : `no-value-set:locales.categories[${ctg}].description`}</div>`;
            const _checkbox = `<div>${getCategoryToggle(ctg)}</div>`;

            return `<div>${_title}${_description}</div>${_checkbox}`;
        };
        const getCategoryTableContent = (ctg) => {
            const list = this.options.consent.cookies[ctg] || [];
            const _headingColName = `<th>${locales.table.colName}</th>`;
            const _headingColDomain = `<th>${locales.table.colDomain}</th>`;
            const _headingColExpiration = `<th>${locales.table.colExpiration}</th>`;
            const _headingColDescription = `<th>${locales.table.colDescription}</th>`;
            const _heading = `<thead><tr>${_headingColName}${_headingColDomain}${_headingColExpiration}${_headingColDescription}</tr></thead>`;
            const _bodyStart = `<tbody>`;
            let _bodyRows = ``;
            list.map((row) => {
                const _name = `<th>${row.name}</th>`;
                const _domain = `<td>${row.domain}</td>`;
                const _expiration = `<td>${row.expiration}</td>`;
                const _description = `<td>${row.description}</td>`;
                _bodyRows += `<tr>${_name}${_domain}${_expiration}${_description}</tr>`;
            });
            const _bodyEnd = `</tbody>`;
            const _body = `${_bodyStart}${_bodyRows}${_bodyEnd}`;
            const _colgroup = `<colgroup><col style="width:auto;" /><col style="width:auto;" /><col style="width:150px;" /><col style="width:auto;" /></colgroup>`;

            return `${_colgroup}${_heading}${_body}`;
        };
        const _table = createElement({
            css: `width:100%;`,
        });
        categories.map((ctg) => {
            const _ctg = createElement({ tag: 'article' });
            _ctg.appendChild(createElement({
                css: `width:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;`,
                html: getCategoryContent(ctg),
            }));
            showTable && _ctg.appendChild(createElement({
                tag: 'table',
                css: `width:100%;`,
                html: getCategoryTableContent(ctg),
            }));
            _table.appendChild(_ctg);
        });
        targets && targets.forEach((node) => {
            node.innerHTML = ``; // Clear before append to prevent content duplicities
            node.appendChild(_table);
        });
        this.initToggleEvents();
        this.checkToggleStates();
    }
    renderBannerElement() {
        const cookieData = this.getCookieData();
        const locales = this.getLocales();
        const _wrapper = createElement({
            id: this.selectors.banner.wrapperId,
            className: this.selectors.banner.wrapperClassName,
            css: `width:250px;min-height:100px;padding:1rem;background-color:gray;color:black;display:none;position:fixed;z-index:999;bottom:1rem;left:1rem;`,
            arias: {
                hidden: true,
            },
        });
        const _body = createElement({
            id: this.selectors.banner.bodyId,
            className: this.selectors.banner.bodyClassName,
            html: this.layout.bannerBody(locales.banner.title, locales.banner.content, cookieData.isExpiredRevision && locales.revisionAlert),
        });
        const _actions = createElement({
            id: this.selectors.banner.actionsId,
            className: this.selectors.banner.actionsClassName,
        });
        const _btnAcceptAll = createButtonElement(
            this.options.banner.btnAcceptAllId,
            this.selectors.btn.acceptAllClassName,
            locales.common.buttonAcceptAll,
            this.tokens.BTN_ACCEPT_ALL_CCL,
        );
        const _btnAcceptNecessary = createButtonElement(
            this.options.banner.btnAcceptNecessaryId,
            this.selectors.btn.acceptNecessaryClassName,
            locales.common.buttonAcceptNecessary,
            this.tokens.BTN_ACCEPT_NECESSARY_CCL,
        );
        _actions.appendChild(_btnAcceptAll);
        _actions.appendChild(_btnAcceptNecessary);
        _wrapper.appendChild(_body);
        _wrapper.appendChild(_actions);
        document.body.appendChild(_wrapper);
    }
    renderDialogElement() {
        const locales = this.getLocales();
        const _wrapper = createElement({
            id: this.selectors.dialog.wrapperId,
            className: this.selectors.dialog.wrapperClassName,
            css: `width:50vw;height:auto;min-height:300px;max-height:50vh;overflow:scroll;padding:1rem;background-color:grey;color:black;display:none;position:fixed;z-index:999;top:10rem;left:25vw;`,
            arias: {
                hidden: true,
            },
        });
        const _body = createElement({
            id: this.selectors.dialog.bodyId,
            className: this.selectors.dialog.bodyClassName,
            html: this.layout.dialogBody(locales.dialog.title, locales.dialog.primary, locales.dialog.secondary, locales.common.buttonClose),
        });
        const _actions = createElement({
            id: this.selectors.dialog.actionsId,
            className: this.selectors.dialog.actionsClassName,
        });
        const _btnAcceptAll = createButtonElement(
            this.options.dialog.btnAcceptAllId,
            this.selectors.btn.acceptAllClassName,
            locales.common.buttonAcceptAll,
            this.tokens.BTN_ACCEPT_ALL_CCL,
        );
        const _btnAcceptNecessary = createButtonElement(
            this.options.dialog.btnAcceptNecessaryId,
            this.selectors.btn.acceptNecessaryClassName,
            locales.common.buttonAcceptNecessary,
            this.tokens.BTN_ACCEPT_NECESSARY_CCL,
        );
        const _btnSave = createButtonElement(
            this.options.dialog.btnSaveId,
            this.selectors.btn.saveChangesClassName,
            locales.common.buttonSave,
            this.tokens.BTN_SAVE_CCL,
        );
        _actions.appendChild(_btnAcceptAll);
        _actions.appendChild(_btnAcceptNecessary);
        _actions.appendChild(_btnSave);
        _wrapper.appendChild(_body);
        _wrapper.appendChild(_actions);
        document.body.appendChild(_wrapper);
        this.options.consent.showCategory && this.renderCategoryTable(this.options.consent.showCategoryTable);
    }


    /* Presenters & controllers */
    presenter() {
        const cookieData = this.getCookieData();

        // Initializing elements,but keep them hide until logic decides
        this.banner.init();
        this.dialog.init();

        // Check browser for current cookie
        if (!cookieData.current) {
            this.log('Cookie not found');

            // Show banner
            this.banner.show(this.options.meta.delay);

            // Set all preferences when no cookie is found and update state for category toggle
            this.state.preferences.accepted = this.options.consent.categories;
            this.checkToggleStates();

        } else {
            this.log('Cookie was found:', cookieData);

            // Set found cookie to state
            this.state.cookie = cookieData.current;

            // Set preference state from cookie data and update state for category toggle
            if (cookieData.current.categories) {
                this.state.preferences.accepted = cookieData.current.categories;
                this.state.preferences.declined = this.options.consent.categories.filter(x => !cookieData.current.categories.includes(x));
                this.checkToggleStates();
            }

            // Check when revision has changed
            if (cookieData.isExpiredRevision) {
                this.state.revisionChanged = true;
                this.banner.show(this.options.meta.delay);
            }

            // Check if date is expired
            if (cookieData.isExpiredDate) {
                this.banner.show(this.options.meta.delay);
            }

            // Triggers callback, if is set
            if (this.options.onInit && typeof this.options.onInit === 'function') {
                this.options.onInit(this.state.cookie, this.state.preferences);
            }
        }

        // Prepare available languages and set to state
        if (this.options.locales) {
            this.state.languages = [];
            for (const lang in this.options.locales) {
                this.state.languages.push(lang);
            }
        }

        // Change locales when calling re-init()
        if (this.state.init && (this.state.language !== this.options.language)) {
            this.state = _.cloneDeep(defaultState);
            this.changeLanguage(this.options.language);
        }

    }


    init() {
        const windowsProps = {
            init: this.init.bind(this), // For re-initialize service (reset)
            getOptions: this.getOptions.bind(this), // Returns options object
            getState: this.getState.bind(this), // Returns current layer state
            getPreferences: this.getPreferences.bind(this), // Returns current preferences
            initButtonEvents: this.initButtonEvents.bind(this), // Initialize button events
            initToggleEvents: this.initToggleEvents.bind(this), // Initialize category toggle events
            removeButtonEvents: this.removeButtonEvents.bind(this), // Remove button events
            removeToggleEvents: this.removeToggleEvents.bind(this), // Remove category toggle events
            changeLanguage: this.changeLanguage.bind(this), // Change language scope + setLocalesContent as default
            setLocalesContent: this.setLocalesContent.bind(this), // Changes locales and replace content in banner & dialog, also render category table
            showBanner: this.banner.show.bind(this), // Shows banner
            hideBanner: this.banner.hide.bind(this), // Hides banner
            destroyBanner: this.banner.destroy.bind(this), // Remove banner from DOM
            showDialog: this.dialog.show.bind(this), // Shows dialog
            hideDialog: this.dialog.hide.bind(this), // Hides dialog
            destroyDialog: this.dialog.destroy.bind(this), // Remove dialog from DOM
            getCookie: this.setCookie.bind(this), // Returns cookie value
            destroyCookie: this.destroyCookie.bind(this), // Destroys cookie row with consent
        };
        const bot = isClientIsBot();
        const shouldInit = (!(this.options.meta.hideFromBots && bot));
        const runner = () => {
            this.presenter();
            this.initButtonEvents();
            this.pushHistory('init');
            this.state.init = true;
            this.state.preferences.timestamp = getTimestamp();
            this.state.preferences.event = 'init';
            window[this.options.meta.name] = windowsProps;
            this.log(`${this.options.meta.name}: init`, windowsProps);
        };
        if (shouldInit) runner();
    }

}

/* Initializer */
const initCookieConsentLayer = (options, scope, uuid) => { new CookieConsentLayer(options, scope, uuid); };
window.initCookieConsentLayer = initCookieConsentLayer;
