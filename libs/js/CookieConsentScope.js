class CookieConsentScope {

    constructor(
        options = {},
        scope = 'default',
        token = '6sd5f4g6sd5f4g',
    ) {
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
        };
        this.options = {
            meta: {
                token,
                name: scope,
                revision: 0,
            },
            consent_force: true, // Display transparent layer above page
            cookie: {
                name: 'CookieConsentScope',
                domain: '.your-domain.some',
                expiration: 365,
                path: '/',
                sameSite: 'Lax',
            },
            scripts: {
                autoload: true, // If true, check all scripts elements on page with: 'data-cc-scope="true"' ... or something similar
            },
            mode: 'opt-in', // ['opt-in', 'opt-out']

            // Callbacks

            onBannerShow: () => { /* Triggers when banner shows */ },
            onBannerHide: () => { /* Triggers when banner hides */ },

            onDialogShow: () => { /* Triggers when dialog shows */ },
            onDialogHide: () => { /* Triggers when dialog hides */ },

            onAcceptAll: () => { /* Triggers when user accept all */ },
            onAcceptNecessary: () => { /* Triggers when user accept only necessary */ },
            onSave: () => { /* Triggers when user triggers save button */ },
            onChange: () => { /* Triggers when some values is changed */ },

            ...options // Overrides ... make it with lodash -> merge
        };
        this.preferences = {
            event: 'pending',
            categories_allowed: [],
            categories_declined: [],
        };

        this.init();
    }


    getState() {
        return this.state;
    }

    getPreferences() {
        return this.preferences;
    }




    showBanner() {

        // TODO: shows banner
        console.log('showBanner() ... triggered');

        const elem = document.getElementById('my-cc-banner');

        elem.style.display = 'block';
        this.state.banner.show = true;
    }

    hideBanner() {

        // TODO: hides banner
        console.log('hideBanner() ... triggered');

        const elem = document.getElementById('my-cc-banner');

        elem.style.display = 'none';
        this.state.banner.show = false;
    }

    createBanner() {
        const elem = document.createElement('div');
        elem.id = 'my-cc-banner';
        elem.style.cssText = 'width:250px;height:200px;padding: 1rem;background-color:red;color: white;display:none;';
        elem.innerText = 'Some text content ...';

        document.body.appendChild(elem);
        this.state.banner.init = true;
    }

    destroyBanner() {
        const elem = document.getElementById('my-cc-banner');

        elem.remove();
        this.state.banner.init = false;
        this.state.banner.destroyed = true;
    }





    showDialog() {

        // TODO: shows dialog
        console.log('showDialog() ... triggered');

    }

    hideDialog() {

        // TODO: hides dialog
        console.log('hideDialog() ... triggered');

    }

    createDialog() {

        // TODO: creates dialog
        console.log('createDialog() ... triggered');

    }

    destroyDialog() {

        // TODO: destroys dialog
        console.log('destroyDialog() ... triggered');

    }




    presenter() {

        // TODO: logic, when creates ...

        this.createBanner();
        this.createDialog();

    }




    init() {
        const options = this.options;
        const windowsProps = {
            options,

            getState: this.getState.bind(this),
            getPreferences: this.getPreferences.bind(this),

            showBanner: this.showBanner.bind(this),
            hideBanner: this.hideBanner.bind(this),
            destroyBanner: this.destroyBanner.bind(this),

            showDialog: this.showDialog.bind(this),
            hideDialog: this.hideDialog.bind(this),
            destroyDialog: this.destroyDialog.bind(this),

        };


        //
        console.log('initialized ...', windowsProps);
        //


        this.preferences.event = 'init';

        this.presenter();

        window['CookieConsentScope'] = windowsProps;

    }

}


