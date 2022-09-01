const lodash = window._;

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

class CookieConsentLayer {

    constructor(
        options = {},
        scope = 'default',
        token = null,
    ) {
        this.uuid = token || getToken(6);
        this.state = {
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
            language: options.language || 'en-US',
            cookie: null,
        };
        this.preferences = {
            event: 'pending',
            allowed: [],
            declined: [],
            timestamp: null,
        };
        this.options = lodash.merge({
            meta: {
                token: this.uuid,
                scope: scope,
                revision: 0,
                debug: true,
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
                categories: [ 'necessary', 'analytics', 'marketing', 'others' ],
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
                        buttonSave: 'Save settings',
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
                        buttonSave: 'Uložit změny',
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


            onAcceptAll: function (cookie, preferences) {},
            onAcceptNecessary: function (cookie, preferences) {},
            onSave: function (cookie, preferences) {},
            whenChange: function (preferences) {},


        }, options);

        this.init();
    }

    c = {
        btnAcceptAllId: 'button-acceptAll',
        btnAcceptNecessaryId: 'button-acceptNecessary',
        btnSaveId: 'button-save',
        classPfx: 'ccl_',
    };

    getState() {
        return this.state;
    }
    getPreferences() {
        return this.preferences;
    }

    // setPreferences(event, allowed = [], declined = [], timestamp = null) {
    //     this.preferences = {
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
        const elBtnAcceptAll = body.querySelectorAll(`[data-ccl="${this.c.btnAcceptAllId}"]`);
        const elBtnAcceptNecessary = body.querySelectorAll(`[data-ccl="${this.c.btnAcceptNecessaryId}"]`);
        const elBtnSave = body.querySelectorAll(`[data-ccl="${this.c.btnSaveId}"]`);
        const elBannerBodyHtml = document.getElementById(`${this.options.banner.id}_body`);
        const elDialogBodyHtml = document.getElementById(`${this.options.dialog.id}_body`);

        elBtnAcceptAll.forEach((elem) => {
            elem.innerText = `${locales.common.buttonAcceptAll}`;
        });
        elBtnAcceptNecessary.forEach((elem) => {
            elem.innerText = `${locales.common.buttonAcceptNecessary}`;
        });
        elBtnSave.forEach((elem) => {
            elem.innerText = `${locales.common.buttonSave}`;
        });

        elBannerBodyHtml.innerHTML = `<p>${locales.banner.title}</p><p>${locales.banner.content}</p>`;
        elDialogBodyHtml.innerHTML = `<p>${locales.dialog.title}</p><p>${locales.dialog.primary}</p><div> some tables here ... </div><p>${locales.dialog.secondary}</p>`;

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
        const allowed_cat = [ 'necessary', 'analytics', 'marketing', 'others' ]; // TODO
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
        this.preferences = preferences;
        this.state.cookie = cookie;
        this.setCookie(JSON.stringify(cookie));
        if (this.options.onAcceptAll) this.options.onAcceptAll(cookie, preferences);
    }
    onAcceptNecessary() {
        const allowed_cat = [ 'necessary' ]; // TODO
        const declined_cat = [ 'analytics', 'marketing', 'others' ]; // TODO
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
        this.preferences = preferences;
        this.state.cookie = cookie;
        this.setCookie(JSON.stringify(cookie));
        if (this.options.onAcceptNecessary) this.options.onAcceptNecessary(cookie, preferences);
    }
    onSave() {
        const allowed_cat = [ 'necessary' ]; // TODO
        const declined_cat = []; // TODO
        const timestamp = getTimestamp();
        const preferences = {
            event: 'save',
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
        this.preferences = preferences;
        this.state.cookie = cookie;
        this.setCookie(JSON.stringify(cookie));
        if (this.options.onSave) this.options.onSave(cookie, preferences);
    }
    whenChange() {
        /* Triggers when some values is changed */

        // TODO: ... onChange ... must be updated value
        // console.log('onChange() ... triggered', cookie, preferences);

        if (this.options.onChange) this.options.whenChange(this.preferences);

    }


    initGlobalEvents() {
        const openDialogButton = document.querySelector('[data-ccl="show_dialog"]');
        const closeDialogButton = document.querySelector('[data-ccl="hide_dialog"]');
        const openBannerButton = document.querySelector('[data-ccl="show_banner"]');
        const closeBannerButton = document.querySelector('[data-ccl="hide_banner"]');

        openDialogButton && openDialogButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.dialog.show();
        });
        closeDialogButton && closeDialogButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.dialog.hide();
        });
        openBannerButton && openBannerButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.banner.show();
        });
        closeBannerButton && closeBannerButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.banner.hide();
        });
    }
    // removeGlobalEvents() {
    //     const openDialogButton = document.querySelector('[data-ccs="open_dialog"]');
    //     openDialogButton.removeEventListener('click');
    // }


    getCreatedElement(
        tagName,
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
    ) {
        const element = document.createElement(tagName);
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

        return element;
    }
    createBannerElement() {
        const locales = this.getLocales();
        const elWrapper = this.getCreatedElement(
            'div',
            this.options.banner.id,
            `ccl_banner-wrapper`,
            'width:250px;height:200px;padding:1rem;background-color:gray;color:black;display:none;position:fixed;z-index:999;bottom:1rem;left:1rem;',
            null,
            null,
            null,
            {
                hidden: true,
            },
        );
        const elBody = this.getCreatedElement(
            'div',
            `${this.options.banner.id}_body`,
            `${this.c.classPfx}banner-body`,
            null,
            null,
            `<p>${locales.banner.title}</p><p>${locales.banner.content}</p>`,
        );
        const elActions = this.getCreatedElement(
            'div',
            `${this.options.banner.id}_actions`,
            `${this.c.classPfx}banner-actions`,
        );
        const btnAcceptAll = this.getCreatedElement(
            'button',
            this.options.banner.button.acceptAll.id,
            `${this.c.classPfx}button ${this.c.classPfx}button-primary`,
            null,
            `${locales.common.buttonAcceptAll}`,
            null,
            this.c.btnAcceptAllId,
        );
        const btnAcceptNecessary = this.getCreatedElement(
            'button',
            this.options.banner.button.acceptNecessary.id,
            `${this.c.classPfx}button`,
            null,
            `${locales.common.buttonAcceptNecessary}`,
            null,
            this.c.btnAcceptNecessaryId,
        );

        btnAcceptAll.onclick = (e) => {
            e.preventDefault();
            this.onAcceptAll();
        };
        btnAcceptNecessary.onclick = (e) => {
            e.preventDefault();
            this.onAcceptNecessary();
        };

        elActions.appendChild(btnAcceptAll);
        elActions.appendChild(btnAcceptNecessary);
        elWrapper.appendChild(elBody);
        elWrapper.appendChild(elActions);
        document.body.appendChild(elWrapper);
    }
    createDialogElement() {
        const locales = this.getLocales();
        const elWrapper = this.getCreatedElement(
            'div',
            this.options.dialog.id,
            `${this.c.classPfx}dialog-wrapper`,
            'width:500px;height:auto;min-height:300px;padding:1rem;background-color:grey;color:black;display:none;position:fixed;z-index:999;top:10rem;left:10rem;',
            null,
            null,
            null,
            {
                hidden: true,
            },
        );
        const elBody = this.getCreatedElement(
            'div',
            `${this.options.dialog.id}_body`,
            `${this.c.classPfx}dialog-body`,
            null,
            null,
            `<p>${locales.dialog.title}</p><p>${locales.dialog.primary}</p><div> some tables here ... </div><p>${locales.dialog.secondary}</p>`,
        );
        const elActions = this.getCreatedElement(
            'div',
            `${this.options.dialog.id}_actions`,
            `${this.c.classPfx}dialog-actions`,
        );
        const btnAcceptAll = this.getCreatedElement(
            'button',
            this.options.dialog.button.acceptAll.id,
            `${this.c.classPfx}button ${this.c.classPfx}button-primary`,
            null,
            `${locales.common.buttonAcceptAll}`,
            null,
            this.c.btnAcceptAllId,
        );
        const btnAcceptNecessary = this.getCreatedElement(
            'button',
            this.options.dialog.button.acceptNecessary.id,
            `${this.c.classPfx}button`,
            null,
            `${locales.common.buttonAcceptNecessary}`,
            null,
            this.c.btnAcceptNecessaryId,
        );
        const btnSave = this.getCreatedElement(
            'button',
            this.options.dialog.button.save.id,
            `${this.c.classPfx}button`,
            null,
            `${locales.common.buttonSave}`,
            null,
            this.c.btnSaveId,
        );

        btnAcceptAll.onclick = (e) => {
            e.preventDefault();
            this.onAcceptAll();
        };
        btnAcceptNecessary.onclick = (e) => {
            e.preventDefault();
            this.onAcceptNecessary();
        };
        btnSave.onclick = (e) => {
            e.preventDefault();
            this.onSave();
        };

        elActions.appendChild(btnAcceptAll);
        elActions.appendChild(btnAcceptNecessary);
        elActions.appendChild(btnSave);
        elWrapper.appendChild(elBody);
        elWrapper.appendChild(elActions);
        document.body.appendChild(elWrapper);
    }


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




    getWindowProps() {
        return {
            options: this.options,

            getState: this.getState.bind(this), // Returns current layer state
            getPreferences: this.getPreferences.bind(this), // Returns current preferences
            initGlobalEvents: this.initGlobalEvents.bind(this), // Initialize button events
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

        this.banner.init();
        this.dialog.init();

        if (!cookie) {
            this.banner.show();
        } else {
            this.state.cookie = JSON.parse(cookie);
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

        this.preferences.event = 'init';
    }

}


