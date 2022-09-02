/* Dependencies */
const _ = window._;

/* Helpers */
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
    id = null,
    className = null,
    css = null,
    text = null,
    html = null,
    cclData = null,
    cclTarget = null,
    cclSource = null,
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
    if (id) element.id = id;
    if (className) element.className = className;
    if (css) element.style.cssText = css;
    if (text) element.innerText = text;
    if (html) element.innerHTML = html;
    if (cclData) element.dataset['ccl'] = cclData;
    if (cclTarget) element.dataset['ccl-target'] = cclTarget;
    if (cclSource) element.dataset['ccl-source'] = cclSource;
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

/* Default values */
const defaultState = {
    init: false,
    revisionChanged: false,
    banner: {
        render: false,
        show: false,
        destroyed: false,
    },
    dialog: {
        render: false,
        show: false,
        destroyed: false,
    },
    language: 'en-US',
    languages: [ 'en-US' ],
    cookie: null,
    preferences: {
        event: 'pending',
        allowed: [],
        declined: [],
        timestamp: null,
    },
};
const defaultOptions = {
    meta: {
        revision: 0, // Instance revision, if value is changed and user have already accepted, banner will trigger again
        debug: false, // If true, it wil display console logs with events for easier debugging
        delay: 0, // When set, banner will show after this value in ms
        classPrefix: 'ccl_', // Global class prefix used also in styles. Be sure you know, why changing this value
    },
    cookie: {
        name: 'CookieConsentScope',
        domain: '.your-domain.some',
        expiration: 365,
        path: '/',
        sameSite: 'Lax',
        rfc: false,
    },
    scripts: {
        autoload: true, // If true, check all scripts elements on page with: 'data-cc-scope="true"' ... or something similar // TODO
        mode: 'opt-in', // ['opt-in', 'opt-out']
    },
    consent: {
        force: false, // Display transparent layer above page
        categories: [ 'necessary', 'analytics', 'marketing', 'functional', 'personalization' ], // These categories will be rendered as options and also will be matched with locales[].categories
        showTables: true, // If set to true, cookie tables is rendered by category
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
        id: 'CookieConsentScope_Banner',
        btnAcceptAllId: 'CookieConsentScope_Banner_btnAcceptAll',
        btnAcceptNecessaryId: 'CookieConsentScope_Banner_btnAcceptNecessary',
    },
    dialog: {
        id: 'CookieConsentScope_Dialog',
        btnAcceptAllId: 'CookieConsentScope_Dialog_btnAcceptAll',
        btnAcceptNecessaryId: 'CookieConsentScope_Dialog_btnAcceptNecessary',
        btnSaveId: 'CookieConsentScope_Dialog_btnSave',
    },
    language: 'en-US', // Default language
    locales: {
        'en-US': {
            common: {
                buttonAcceptAll: 'Accept all',
                buttonAcceptNecessary: 'Accept necessary',
                buttonChange: 'Save settings',
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
                others: {
                    title: 'Other cookies',
                    description: 'Other and not specified cookies',
                },
            },
        },
        'cs-CZ': {
            common: {
                buttonAcceptAll: 'Přimout vše',
                buttonAcceptNecessary: 'Přimout nezbytné',
                buttonChange: 'Uložit změny',
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
                others: {
                    title: 'Ostatní cookies',
                    description: 'Other and not specified cookies',
                },
            },
        },
    },
    onAcceptAll: function (cookie, preferences) { console.log('CCL Callback onAcceptAll()', cookie, preferences) },
    onAcceptNecessary: function (cookie, preferences) { console.log('CCL Callback onAcceptNecessary()', cookie, preferences) },
    onChange: function (cookie, preferences) { console.log('CCL Callback onChange()', cookie, preferences) },
};

/* Class */
class CookieConsentLayer {
    constructor(
        options = {}, // Custom options
        scope = 'default', // Scope name
        uuid = null, // Static instance UUID
    ) {
        this.uuid = uuid || getToken(6); // Instance UUID
        this.state = _.cloneDeep(defaultState); // Inner component state
        this.options = _.merge(defaultOptions, options); // Merged options object
        this.init(); // Triggered when class is loaded
    }



    tokens = {
        // Keep these tokens unchanged
        ROOT: 'CookieConsentLayer',
        BTN_ACCEPT_ALL_ID: 'button-acceptAll',
        BTN_ACCEPT_NECESSARY_ID: 'button-acceptNecessary',
        BTN_SAVE_ID: 'button-save',
        BTN_SHOW_DIALOG_CCL: 'show_dialog',
        BTN_HIDE_DIALOG_CCL: 'hide_dialog',
        BTN_SHOW_BANNER_CCL: 'show_banner',
        BTN_HIDE_BANNER_CCL: 'hide_banner',
        CATEGORIES_TABLE_CCL: 'categories_table',
        REVISION_WRAPPER_CCL: 'revision_wrapper',        
    };
    eventHandlers = {
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
            this.onAcceptNecessary();
        },
        acceptAll: (e) => {
            e.preventDefault();
            this.onAcceptAll();
        },
        change: (e) => {
            e.preventDefault();
            this.onChange();
        },
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
        bannerBody: (title, content) => {
            return `<div>${title}</div><div data-ccl-target="${this.tokens.REVISION_WRAPPER_CCL}"></div><div>${content}</div>`;
        },
        dialogBody: (title, primary, secondary = null) => {
            return `<button type="button" data-ccl="${this.tokens.BTN_HIDE_BANNER_CCL}">close</button><div>${title}</div><div data-ccl-target="${this.tokens.REVISION_WRAPPER_CCL}"></div><div>${primary}</div><div data-ccl-target="${this.tokens.CATEGORIES_TABLE_CCL}"> Loading table, please wait </div>${secondary && `<div>${secondary}</div>`}`;
        },
    };


    /* References to window object */
    getState() {
        return this.state;
    }
    getPreferences() {
        return this.state.preferences;
    }
    getOptions() {
        return this.options;
    }


    /* Languages and locales */
    changeLanguage(lang = this.options.language, changeLanguage = true) {
        this.state.language = lang;
        changeLanguage && this.setLocalesContent(lang);
    }
    getLocales(lang = this.options.language) {
        return this.options.locales[lang];
    }
    setLocalesContent(lang = this.state.language) {
        const locales = this.getLocales(lang);
        const body = document.body;
        const elBtnAcceptAll = body.querySelectorAll(`[data-ccl="${this.tokens.BTN_ACCEPT_ALL_ID}"]`);
        const elBtnAcceptNecessary = body.querySelectorAll(`[data-ccl="${this.tokens.BTN_ACCEPT_NECESSARY_ID}"]`);
        const elBtnSave = body.querySelectorAll(`[data-ccl="${this.tokens.BTN_SAVE_ID}"]`);
        const elBannerBodyHtml = document.getElementById(`${this.options.banner.id}_body`);
        const elDialogBodyHtml = document.getElementById(`${this.options.dialog.id}_body`);

        elBtnAcceptAll.forEach((elem) => {
            elem.innerText = `${locales.common.buttonAcceptAll}`;
        });
        elBtnAcceptNecessary.forEach((elem) => {
            elem.innerText = `${locales.common.buttonAcceptNecessary}`;
        });
        elBtnSave.forEach((elem) => {
            elem.innerText = `${locales.common.buttonChange}`;
        });
        elBannerBodyHtml.innerHTML = this.layout.bannerBody(locales.banner.title, locales.banner.content);
        elDialogBodyHtml.innerHTML = this.layout.dialogBody(locales.dialog.title, locales.dialog.primary, locales.dialog.secondary);
    }


    /* Cookie handlers */
    getCookie(name = this.options.cookie.name) {
        return cookies.get(name);
    }
    setCookie(value, name = this.options.cookie.name, expiration = this.options.cookie.expiration) {
        return cookies.set(name, value, expiration);
    }
    destroyCookie() {
        // clear cookie row
    }


    /* Main callback handlers */
    onAcceptAll() {
        const allowed_cat = [ 'necessary', 'analytics', 'marketing', 'functional', 'personalization' ]; // TODO
        const declined_cat = []; // TODO
        const timestamp = getTimestamp();
        const preferences = {
            event: 'all',
            allowed: allowed_cat,
            declined: declined_cat,
            timestamp,
        };
        const cookie = {
            categories: allowed_cat,
            consent_uuid: this.uuid,
            revision: this.options.meta.revision,
            rfc_cookie: this.options.cookie.rfc,
            consent_date: "2022-09-01T20:48:54.496Z", // TODO
            last_consent_update: "2022-09-01T20:48:54.496Z", // TODO
        };

        this.banner.hide();
        this.dialog.hide();
        this.state.preferences = preferences;
        this.state.cookie = cookie;
        this.setCookie(JSON.stringify(cookie));
        if (this.options.onAcceptAll) this.options.onAcceptAll(cookie, preferences);
    }
    onAcceptNecessary() {
        const allowed_cat = [ 'necessary' ]; // TODO
        const declined_cat = [ 'analytics', 'marketing', 'functional', 'personalization' ]; // TODO
        const timestamp = getTimestamp();
        const preferences = {
            event: 'necessary',
            allowed: allowed_cat,
            declined: declined_cat,
            timestamp,
        };
        const cookie = {
            categories: allowed_cat,
            consent_uuid: this.uuid,
            revision: this.options.meta.revision,
            rfc_cookie: this.options.cookie.rfc,
            consent_date: "2022-09-01T20:48:54.496Z", // TODO
            last_consent_update: "2022-09-01T20:48:54.496Z", // TODO
        };

        this.banner.hide();
        this.dialog.hide();
        this.state.preferences = preferences;
        this.state.cookie = cookie;
        this.setCookie(JSON.stringify(cookie));
        if (this.options.onAcceptNecessary) this.options.onAcceptNecessary(cookie, preferences);
    }
    onChange() {
        const allowed_cat = [ 'necessary' ]; // TODO
        const declined_cat = [ 'analytics', 'marketing', 'functional', 'personalization' ]; // TODO
        const timestamp = getTimestamp();
        const preferences = {
            event: 'change',
            allowed: allowed_cat,
            declined: declined_cat,
            timestamp,
        };
        const cookie = {
            categories: allowed_cat,
            consent_uuid: this.uuid,
            revision: this.options.meta.revision,
            rfc_cookie: this.options.cookie.rfc,
            consent_date: "2022-09-01T20:48:54.496Z", // TODO
            last_consent_update: "2022-09-01T20:48:54.496Z", // TODO
        };

        this.banner.hide();
        this.dialog.hide();
        this.state.preferences = preferences;
        this.state.cookie = cookie;
        this.setCookie(JSON.stringify(cookie));
        if (this.options.onChange) this.options.onChange(cookie, preferences);
    }


    /* Button events */
    initGlobalEvents() {
        const openDialogButton = document.querySelector(`[data-ccl="${this.tokens.BTN_SHOW_DIALOG_CCL}"]`);
        const closeDialogButton = document.querySelector(`[data-ccl="${this.tokens.BTN_HIDE_DIALOG_CCL}"]`);
        const openBannerButton = document.querySelector(`[data-ccl="${this.tokens.BTN_SHOW_BANNER_CCL}"]`);
        const closeBannerButton = document.querySelector(`[data-ccl="${this.tokens.BTN_HIDE_BANNER_CCL}"]`);

        openDialogButton && openDialogButton.addEventListener('click', this.eventHandlers.showDialog);
        closeDialogButton && closeDialogButton.addEventListener('click', this.eventHandlers.hideDialog);
        openBannerButton && openBannerButton.addEventListener('click', this.eventHandlers.showBanner);
        closeBannerButton && closeBannerButton.addEventListener('click', this.eventHandlers.hideBanner);
    }
    removeGlobalEvents() {
        const openDialogButton = document.querySelector(`[data-ccl="${this.tokens.BTN_SHOW_DIALOG_CCL}"]`);
        const closeDialogButton = document.querySelector(`[data-ccl="${this.tokens.BTN_HIDE_DIALOG_CCL}"]`);
        const openBannerButton = document.querySelector(`[data-ccl="${this.tokens.BTN_SHOW_BANNER_CCL}"]`);
        const closeBannerButton = document.querySelector(`[data-ccl="${this.tokens.BTN_HIDE_BANNER_CCL}"]`);

        openDialogButton && openDialogButton.removeEventListener('click', this.eventHandlers.showDialog);
        closeDialogButton && closeDialogButton.removeEventListener('click', this.eventHandlers.hideDialog);
        openBannerButton && openBannerButton.removeEventListener('click', this.eventHandlers.showBanner);
        closeBannerButton && closeBannerButton.removeEventListener('click', this.eventHandlers.hideBanner);
    }


    /* Renderers */
    renderBannerElement() {
        const locales = this.getLocales();
        const _wrapper = createElement({
            id: this.options.banner.id,
            className: 'ccl_banner-wrapper',
            css: `width:250px;height:200px;padding:1rem;background-color:gray;color:black;display:none;position:fixed;z-index:999;bottom:1rem;left:1rem;`,
            arias: {
                hidden: true,
            },
        });
        const _body = createElement({
            id: `${this.options.banner.id}_body`,
            className: `${this.options.meta.classPrefix}banner-body`,
            html: this.layout.bannerBody(locales.banner.title, locales.banner.content),
        });
        const _actions = createElement({
            id: `${this.options.banner.id}_actions`,
            className: `${this.options.meta.classPrefix}banner-actions`,
        });
        const _btnAcceptAll = createElement({
            tag: 'button',
            id: this.options.banner.btnAcceptAllId,
            className: `${this.options.meta.classPrefix}button ${this.options.meta.classPrefix}button-primary`,
            text: `${locales.common.buttonAcceptAll}`,
            cclData: this.tokens.BTN_ACCEPT_ALL_ID,
            arias: {
                label: `button`,
            },
            on: {
                click: this.eventHandlers.acceptAll,
            },
        });
        const _btnAcceptNecessary = createElement({
            tag: 'button',
            id: this.options.banner.btnAcceptNecessaryId,
            className: `${this.options.meta.classPrefix}button`,
            text: `${locales.common.buttonAcceptNecessary}`,
            cclData: this.tokens.BTN_ACCEPT_NECESSARY_ID,
            arias: {
                label: `button`,
            },
            on: {
                click: this.eventHandlers.acceptNecessary,
            },
        });
        // const _revisionAlert = createElement({
        //     id: `${this.options.banner.id}_revision`,
        //     className: 'revision-alert',
        //     html: locales.revisionAlert,
        // });

        _actions.appendChild(_btnAcceptAll);
        _actions.appendChild(_btnAcceptNecessary);
        _wrapper.appendChild(_body);
        _wrapper.appendChild(_actions);
        document.body.appendChild(_wrapper);
    }
    renderDialogElement() {
        const locales = this.getLocales();
        const _wrapper = createElement({
            id: this.options.dialog.id,
            className: `${this.options.meta.classPrefix}dialog-wrapper`,
            css: `width:500px;height:auto;min-height:300px;padding:1rem;background-color:grey;color:black;display:none;position:fixed;z-index:999;top:10rem;left:10rem;`,
            arias: {
                hidden: true,
            },
        });
        const _body = createElement({
            id: `${this.options.dialog.id}_body`,
            className: `${this.options.meta.classPrefix}dialog-body`,
            html: this.layout.dialogBody(locales.dialog.title, locales.dialog.primary, locales.dialog.secondary),
        });
        const _actions = createElement({
            id: `${this.options.dialog.id}_actions`,
            className: `${this.options.meta.classPrefix}dialog-actions`,
        });
        const _btnAcceptAll = createElement({
            tag: 'button',
            id: this.options.dialog.btnAcceptAllId,
            className: `${this.options.meta.classPrefix}button ${this.options.meta.classPrefix}button-primary`,
            text: `${locales.common.buttonAcceptAll}`,
            cclData: this.tokens.BTN_ACCEPT_ALL_ID,
            arias: {
                label: `button`,
            },
            on: {
                click: this.eventHandlers.acceptAll,
            },
        });
        const _btnAcceptNecessary = createElement({
            tag: 'button',
            id: this.options.dialog.btnAcceptNecessaryId,
            className: `${this.options.meta.classPrefix}button`,
            text: `${locales.common.buttonAcceptNecessary}`,
            cclData: this.tokens.BTN_ACCEPT_NECESSARY_ID,
            arias: {
                label: `button`,
            },
            on: {
                click: this.eventHandlers.acceptNecessary,
            },
        });
        const _btnSave = createElement({
            tag: 'button',
            id: this.options.dialog.btnSaveId,
            className: `${this.options.meta.classPrefix}button`,
            text: `${locales.common.buttonChange}`,
            cclData: this.tokens.BTN_SAVE_ID,
            arias: {
                label: `button`,
            },
            on: {
                click: this.eventHandlers.change,
            },
        });

        _actions.appendChild(_btnAcceptAll);
        _actions.appendChild(_btnAcceptNecessary);
        _actions.appendChild(_btnSave);
        _wrapper.appendChild(_body);
        _wrapper.appendChild(_actions);
        document.body.appendChild(_wrapper);
    }


    /* Presenters */
    getWindowProps() {
        return {
            init: this.init.bind(this), // For re-initialize service (reset)
            getOptions: this.getOptions.bind(this), // Returns options object
            getState: this.getState.bind(this), // Returns current layer state
            getPreferences: this.getPreferences.bind(this), // Returns current preferences
            initGlobalEvents: this.initGlobalEvents.bind(this), // Initialize button events
            removeGlobalEvents: this.removeGlobalEvents.bind(this), // Remove button events
            changeLanguage: this.changeLanguage.bind(this), // Change language scope + setLocalesContent as default
            setLocalesContent: this.setLocalesContent.bind(this), // Changes locales and replace content in banner & dialog
            showBanner: this.banner.show.bind(this), // Shows banner
            hideBanner: this.banner.hide.bind(this), // Hides banner
            destroyBanner: this.banner.destroy.bind(this), // Remove banner from DOM
            showDialog: this.dialog.show.bind(this), // Shows dialog
            hideDialog: this.dialog.hide.bind(this), // Hides dialog
            destroyDialog: this.dialog.destroy.bind(this), // Remove dialog from DOM
        };
    }
    presenter() {
        const cookie = this.getCookie();

        // Initializing banner and dialog elements
        this.banner.init();
        this.dialog.init();

        // Check browser for current cookie
        if (!cookie) {
            this.banner.show(this.options.meta.delay);
        } else {
            const json = JSON.parse(cookie);
            this.state.cookie = json;

            // Check when revision has changed
            if (json.revision !== this.options.meta.revision) {
                this.state.revisionChanged = true;
                this.banner.show(this.options.meta.delay);
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
        const windowsProps = this.getWindowProps();
        window[this.tokens.ROOT] = windowsProps;

        //
        console.log(`${this.tokens.ROOT}: init(): `, windowsProps);
        //

        this.presenter();
        this.initGlobalEvents();

        this.state.preferences.event = 'init';
        this.state.preferences.timestamp = getTimestamp();
        this.state.init = true;
    }

}

/* Initializer */
const initCookieConsentLayer = (options, scope, uuid) => { new CookieConsentLayer(options, scope, uuid); };
window.initCookieConsentLayer = initCookieConsentLayer;
