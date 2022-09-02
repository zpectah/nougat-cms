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
    if (cclData) element.dataset.ccl = cclData;
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
const getBannerBodyLayout = (title, content) => {
    return `<p>${title}</p><p>${content}</p>`;
};
const getDialogBodyLayout = (title, primary, secondary = null) => {
    return `<p>${title}</p><p>${primary}</p><div class=""> some tables here ... </div>` + secondary && `<p>${secondary}</p>`;
};

const defaultState = {
    banner: {
        init: false,
        show: false,
        destroyed: false,
    },
    dialog: {
        init: false,
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

/* Class */
class CookieConsentLayer {
    constructor(
        options = {},
        scope = 'default',
        token = null,
    ) {
        this.uuid = token || getToken(6);
        this.state = {
            loaded: false,
            banner: {
                init: false,
                show: false,
                destroyed: false,
            },
            dialog: {
                init: false,
                show: false,
                destroyed: false,
            },
            language: 'en-US',
            cookie: null,
            preferences: {
                event: 'pending',
                allowed: [],
                declined: [],
                timestamp: null,
            },
        };
        this.options = _.merge({
            meta: {
                token: this.uuid,
                scope: scope,
                revision: 0,
                debug: true,
                classPrefix: 'ccl_',
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
                autoload: true, // If true, check all scripts elements on page with: 'data-cc-scope="true"' ... or something similar
                mode: 'opt-in', // ['opt-in', 'opt-out']
            },
            consent: {
                force: true, // Display transparent layer above page
                categories: [ 'necessary', 'analytics', 'marketing', 'functional', 'personalization' ],
            },
            banner: {
                id: 'CookieConsentScope_Banner',
                button: {
                    acceptAll: {
                        id: 'CookieConsentScope_Banner_btnAcceptAll',
                    },
                    acceptNecessary: {
                        id: 'CookieConsentScope_Banner_btnAcceptNecessary',
                    },
                },
            },
            dialog: {
                id: 'CookieConsentScope_Dialog',
                button: {
                    acceptAll: {
                        id: 'CookieConsentScope_Dialog_btnAcceptAll',
                    },
                    acceptNecessary: {
                        id: 'CookieConsentScope_Dialog_btnAcceptNecessary',
                    },
                    save: {
                        id: 'CookieConsentScope_Dialog_btnSave',
                    },
                },
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
                    category: {
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
                    category: {
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


            onAcceptAll: function (cookie, preferences) { console.log('ccl callback onAcceptAll()', cookie, preferences) },
            onAcceptNecessary: function (cookie, preferences) { console.log('ccl callback onAcceptNecessary()', cookie, preferences) },
            onChange: function (cookie, preferences) { console.log('ccl callback onChange()', cookie, preferences) },


        }, options);

        this.init();
    }

    tokens = {
        btnAcceptAllId: 'button-acceptAll',
        btnAcceptNecessaryId: 'button-acceptNecessary',
        btnSaveId: 'button-save',
        btnShowBannerCCL: 'show_dialog',
        btnHideBannerCCL: 'hide_dialog',
        btnShowDialogCCL: 'show_banner',
        btnHideDialogCCL: 'hide_banner',        
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
        show: () => {
            const elem = document.getElementById(this.options.banner.id);

            elem.style.display = 'block';
            elem.ariaHidden = 'false';

            this.state.banner.show = true;
        },
        hide: () => {
            const elem = document.getElementById(this.options.banner.id);

            elem.style.display = 'none';
            elem.ariaHidden = 'true';

            this.state.banner.show = false;
        },
        init: () => {
            if (!this.state.dialog.destroyed) {
                this.createBannerElement();
                this.state.banner.init = true;
            } else {
                console.warn('Banner has been removed from DOM, try reload page');
            }
        },
        destroy: () => {
            const elem = document.getElementById(this.options.banner.id);
            elem.remove();
            this.state.banner.init = false;
            this.state.banner.show = false;
            this.state.banner.destroyed = true;
        },
    };
    dialog = {
        show: () => {
            const elem = document.getElementById(this.options.dialog.id);

            elem.style.display = 'block';
            elem.ariaHidden = 'false';

            this.state.dialog.show = true;
        },
        hide: () => {
            const elem = document.getElementById(this.options.dialog.id);

            elem.style.display = 'none';
            elem.ariaHidden = 'true';

            this.state.dialog.show = false;
        },
        init: () => {
            if (!this.state.dialog.destroyed) {
                this.createDialogElement();
                this.state.dialog.init = true;
            } else {
                console.warn('Dialog has been removed from DOM, try reload page');
            }
        },
        destroy: () => {
            const elem = document.getElementById(this.options.dialog.id);
            elem.remove();
            this.state.dialog.init = false;
            this.state.dialog.show = false;
            this.state.dialog.destroyed = true;
        },
    };

    getState() {
        return this.state;
    }
    getPreferences() {
        return this.state.preferences;
    }

    // setPreferences(event, allowed = [], declined = [], timestamp = null) {
    //     this.state.preferences = {
    //         event,
    //         allowed,
    //         declined,
    //         timestamp: timestamp || this.getTimestamp(),
    //     };
    // }

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
        const elBtnAcceptAll = body.querySelectorAll(`[data-ccl="${this.tokens.btnAcceptAllId}"]`);
        const elBtnAcceptNecessary = body.querySelectorAll(`[data-ccl="${this.tokens.btnAcceptNecessaryId}"]`);
        const elBtnSave = body.querySelectorAll(`[data-ccl="${this.tokens.btnSaveId}"]`);
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
        elBannerBodyHtml.innerHTML = getBannerBodyLayout(locales.banner.title, locales.banner.content);
        elDialogBodyHtml.innerHTML = getDialogBodyLayout(locales.dialog.title, locales.dialog.primary, locales.dialog.secondary);
    }

    getCookie(name = this.options.cookie.name) {
        return cookies.get(name);
    }
    setCookie(value, name = this.options.cookie.name, expiration = this.options.cookie.expiration) {
        return cookies.set(name, value, expiration);
    }
    destroyCookie() {
        // clear cookie row
    }

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





    initGlobalEvents() {
        const openDialogButton = document.querySelector(`[data-ccl="${this.tokens.btnShowBannerCCL}"]`);
        const closeDialogButton = document.querySelector(`[data-ccl="${this.tokens.btnHideBannerCCL}"]`);
        const openBannerButton = document.querySelector(`[data-ccl="${this.tokens.btnShowDialogCCL}"]`);
        const closeBannerButton = document.querySelector(`[data-ccl="${this.tokens.btnHideDialogCCL}"]`);

        openDialogButton && openDialogButton.addEventListener('click', this.eventHandlers.showDialog);
        closeDialogButton && closeDialogButton.addEventListener('click', this.eventHandlers.hideDialog);
        openBannerButton && openBannerButton.addEventListener('click', this.eventHandlers.showBanner);
        closeBannerButton && closeBannerButton.addEventListener('click', this.eventHandlers.hideBanner);
    }
    removeGlobalEvents() {
        const openDialogButton = document.querySelector(`[data-ccl="${this.tokens.btnShowBannerCCL}"]`);
        const closeDialogButton = document.querySelector(`[data-ccl="${this.tokens.btnHideBannerCCL}"]`);
        const openBannerButton = document.querySelector(`[data-ccl="${this.tokens.btnShowDialogCCL}"]`);
        const closeBannerButton = document.querySelector(`[data-ccl="${this.tokens.btnHideDialogCCL}"]`);

        openDialogButton && openDialogButton.removeEventListener('click', this.eventHandlers.showDialog);
        closeDialogButton && closeDialogButton.removeEventListener('click', this.eventHandlers.hideDialog);
        openBannerButton && openBannerButton.removeEventListener('click', this.eventHandlers.showBanner);
        closeBannerButton && closeBannerButton.removeEventListener('click', this.eventHandlers.hideBanner);
    }


    createBannerElement() {
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
            html: getBannerBodyLayout(locales.banner.title, locales.banner.content),
        });
        const _actions = createElement({
            id: `${this.options.banner.id}_actions`,
            className: `${this.options.meta.classPrefix}banner-actions`,
        });
        const _btnAcceptAll = createElement({
            tag: 'button',
            id: this.options.banner.button.acceptAll.id,
            className: `${this.options.meta.classPrefix}button ${this.options.meta.classPrefix}button-primary`,
            text: `${locales.common.buttonAcceptAll}`,
            cclData: this.tokens.btnAcceptAllId,
            arias: {
                label: `button`,
            },
            on: {
                click: this.eventHandlers.acceptAll,
            },
        });
        const _btnAcceptNecessary = createElement({
            tag: 'button',
            id: this.options.banner.button.acceptNecessary.id,
            className: `${this.options.meta.classPrefix}button`,
            text: `${locales.common.buttonAcceptNecessary}`,
            cclData: this.tokens.btnAcceptNecessaryId,
            arias: {
                label: `button`,
            },
            on: {
                click: this.eventHandlers.acceptNecessary,
            },
        });

        _actions.appendChild(_btnAcceptAll);
        _actions.appendChild(_btnAcceptNecessary);
        _wrapper.appendChild(_body);
        _wrapper.appendChild(_actions);
        document.body.appendChild(_wrapper);
    }
    createDialogElement() {
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
            html: getDialogBodyLayout(locales.dialog.title, locales.dialog.primary, locales.dialog.secondary),
        });
        const _actions = createElement({
            id: `${this.options.dialog.id}_actions`,
            className: `${this.options.meta.classPrefix}dialog-actions`,
        });
        const _btnAcceptAll = createElement({
            tag: 'button',
            id: this.options.dialog.button.acceptAll.id,
            className: `${this.options.meta.classPrefix}button ${this.options.meta.classPrefix}button-primary`,
            text: `${locales.common.buttonAcceptAll}`,
            cclData: this.tokens.btnAcceptAllId,
            arias: {
                label: `button`,
            },
            on: {
                click: this.eventHandlers.acceptAll,
            },
        });
        const _btnAcceptNecessary = createElement({
            tag: 'button',
            id: this.options.dialog.button.acceptNecessary.id,
            className: `${this.options.meta.classPrefix}button`,
            text: `${locales.common.buttonAcceptNecessary}`,
            cclData: this.tokens.btnAcceptNecessaryId,
            arias: {
                label: `button`,
            },
            on: {
                click: this.eventHandlers.acceptNecessary,
            },
        });
        const _btnSave = createElement({
            tag: 'button',
            id: this.options.dialog.button.save.id,
            className: `${this.options.meta.classPrefix}button`,
            text: `${locales.common.buttonChange}`,
            cclData: this.tokens.btnSaveId,
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







    getWindowProps() {
        return {
            init: this.init.bind(this), // For re-initialize service (reset)
            getOptions: () => this.options, // Returns options object
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
            this.banner.show();
        } else {
            this.state.cookie = JSON.parse(cookie);
        }

        // Prepare available languages and set to state
        if (this.options.locales) {
            this.state.languages = [];
            for (const lang in this.options.locales) {
                this.state.languages.push(lang);
            }
        }

        // Change locales when calling re-init()
        if (this.state.loaded && (this.state.language !== this.options.language)) {
            this.state = _.cloneDeep(defaultState);
            this.changeLanguage(this.options.language);
        }

    }
    init() {
        const windowsProps = this.getWindowProps();
        window['CookieConsentLayer'] = windowsProps;


        //
        console.log('initialized ...', windowsProps);
        //


        this.presenter();
        this.initGlobalEvents();

        this.state.preferences.event = 'init';
        this.state.loaded = true;
    }

}

/* Initializer */
const initCookieConsentLayer = (
    options,
    scope,
    token,
) => {
    new CookieConsentLayer(
        options,
        scope,
        token,
    );
};
window.initCookieConsentLayer = initCookieConsentLayer;
