const lodash = window._;

class CookieConsentLayer {

    constructor(
        options = {},
        scope = 'default',
        token = '6sd5f4g6sd5f4g',
    ) {
        this.state = {
            banner: {
                init: false,
                show: false,
            },
            dialog: {
                init: false,
                show: false,
            },
            language: options.language || 'en-US',
        };
        this.preferences = {
            event: 'pending',
            allowed: [],
            declined: [],
            timestamp: null,
        };
        this.options = lodash.merge({
            meta: {
                token,
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
            },
            scripts: {
                autoload: true, // If true, check all scripts elements on page with: 'data-cc-scope="true"' ... or something similar
                mode: 'opt-in', // ['opt-in', 'opt-out']
            },
            consent: {
                force: true, // Display transparent layer above page
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
            language: 'en-US',
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

    getTimestamp = () => Math.round(new Date().getTime()/1000);

    getState() {
        return this.state;
    }
    getPreferences() {
        return this.preferences;
    }

    setPreferences(event, allowed = [], declined = [], timestamp = null) {
        this.preferences = {
            event,
            allowed,
            declined,
            timestamp: timestamp || this.getTimestamp(),
        };
    }


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


    onAcceptAll() {
        /* Triggers when user accept all */

        // TODO: ... onAcceptAll
        // console.log('onAcceptAll() ... triggered', cookie, preferences);

        const cookie = {};
        const preferences = {
            event: 'all',
            allowed: [ 'necessary' ],
            declined: [ 'analytics', 'marketing', 'others' ],
            timestamp: this.getTimestamp(),
        };

        this.preferences = preferences;
        this.banner.hide();
        this.dialog.hide();

        if (this.options.onAcceptAll) this.options.onAcceptAll(cookie, preferences);
    }
    onAcceptNecessary() {
        /* Triggers when user accept only necessary */

        // TODO: ... onAcceptNecessary
        // console.log('onAcceptNecessary() ... triggered', cookie, preferences);

        const cookie = {};
        const preferences = {
            event: 'all',
            allowed: [ 'necessary', 'analytics', 'marketing', 'others' ],
            declined: [],
            timestamp: this.getTimestamp(),
        };

        this.preferences = preferences;
        this.banner.hide();
        this.dialog.hide();

        if (this.options.onAcceptNecessary) this.options.onAcceptNecessary(cookie, preferences);
    }
    onSave() {
        /* Triggers when user triggers save button */

        // TODO: ... onSave
        // console.log('onSave() ... triggered', cookie, preferences);

        const cookie = {};
        const preferences = {
            event: 'all',
            // allowed: [ 'necessary', 'analytics', 'marketing', 'others' ],
            allowed: [], // TODO
            declined: [], // TODO
            timestamp: this.getTimestamp(),
        };

        this.preferences = preferences;
        this.banner.hide();
        this.dialog.hide();

        if (this.options.onSave) this.options.onSave(cookie, preferences);
    }
    whenChange(cookie, preferences) {
        /* Triggers when some values is changed */

        // TODO: ... onChange
        // console.log('onChange() ... triggered', cookie, preferences);

        if (this.options.onChange) this.options.whenChange(cookie, preferences);

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


    getCreatedElement(tagName, id = null, className = null, css = null, text = null, html = null, cclData = null) {
        const element = document.createElement(tagName);
        if (id) element.id = id;
        if (className) element.className = className;
        if (css) element.style.cssText = css;
        if (text) element.innerText = text;
        if (html) element.innerHTML = html;
        if (cclData) element.dataset.ccl = cclData;

        return element;
    }

    createBannerElement() {
        const locales = this.getLocales();
        const elWrapper = this.getCreatedElement(
            'div',
            this.options.banner.id,
            `ccl_banner-wrapper`,
            'width:250px;height:200px;padding:1rem;background-color:gray;color:black;display:none;position:fixed;z-index:999;bottom:1rem;left:1rem;',
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

            this.state.banner.show = true;
        },
        hide: () => {
            const elem = document.getElementById(this.options.banner.id);

            elem.style.display = 'none';

            this.state.banner.show = false;
        },
        init: () => {
            this.createBannerElement();

            this.state.banner.init = true;
        },
        destroy: () => {
            const elem = document.getElementById(this.options.banner.id);

            elem.remove();

            this.state.banner.init = false;
            this.state.banner.show = false;
        },
    };
    dialog = {
        show: () => {
            const elem = document.getElementById(this.options.dialog.id);

            elem.style.display = 'block';

            this.state.dialog.show = true;
        },
        hide: () => {
            const elem = document.getElementById(this.options.dialog.id);

            elem.style.display = 'none';

            this.state.dialog.show = false;
        },
        init: () => {
            this.createDialogElement();

            this.state.dialog.init = true;
        },
        destroy: () => {
            const elem = document.getElementById(this.options.dialog.id);

            elem.remove();

            this.state.dialog.init = false;
            this.state.dialog.show = false;
        },
    };




    getWindowProps() {
        // const options = this.options;
        // options.onAcceptAll = this.onAcceptAll.bind(this);
        // options.onAcceptNecessary = this.onAcceptNecessary.bind(this);
        // options.onSave = this.onSave.bind(this);
        // options.onChange = this.onChange.bind(this);

        return {
            options: this.options,

            getState: this.getState.bind(this),
            getPreferences: this.getPreferences.bind(this),
            // changeLanguage: this.changeLanguage.bind(this),
            initGlobalEvents: this.initGlobalEvents.bind(this), // If you want to bind button events after you added new button later
            changeLanguage: this.changeLanguage.bind(this),
            setLocalesContent: this.setLocalesContent.bind(this),

            showBanner: this.banner.show.bind(this),
            hideBanner: this.banner.hide.bind(this),
            destroyBanner: this.banner.destroy.bind(this),
            showDialog: this.dialog.show.bind(this),
            hideDialog: this.dialog.hide.bind(this),
            destroyDialog: this.dialog.destroy.bind(this),

        };
    }

    presenter() {

        // TODO: logic, when creates ... and set some data

        this.banner.init();
        this.dialog.init();

    }




    init() {
        const windowsProps = this.getWindowProps();



        //
        console.log('initialized ...', windowsProps);
        //



        window['CookieConsentLayer'] = windowsProps;

        this.presenter();
        this.initGlobalEvents();

        this.preferences.event = 'init';
    }

}


