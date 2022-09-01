<?php
const ROOT_PATH = '../../';
require ROOT_PATH . 'core/index.php';

$wvc = new \core\controller\web\WebViewController();
$document = $wvc -> get_document_data();
$no_js_text = __CONSTANTS['DEFAULTS']['no_js_text'];
?>
<!DOCTYPE html>
<html lang="<?=($document['meta']['lang'])?>">
<head>
    <meta charset="<?=($document['meta']['charset'])?>" />
    <title><?=($document['meta']['title'])?></title>
    <meta name="viewport" content="<?=($document['meta']['viewport'])?>" />
    <meta name="description" content="<?=($document['meta']['description'])?>"/>
    <meta name="keywords" content="<?=($document['meta']['keywords']) ?>" />
    <meta name="robots" content="<?=($document['meta']['robots']) ?>" />
    <meta name="og:url" content="<?=($document['meta']['url']) ?>" />
    <meta name="theme-color" content="<?=($document['meta']['theme_color']) ?>" />
    <meta name="url" content="<?=(BASE_PATH)?>"/>
    <link rel="stylesheet" href="<?=($document['styles'])?>?v=<?=(TIMESTAMP)?>" />
    <link rel="manifest" href="./manifest.json" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.5/dist/cookieconsent.css" media="print" onload="this.media='all'" />

</head>
<body>
<div id="root">
    <noscript><?=($no_js_text)?></noscript>
    <?php $wvc -> render(); ?>
</div>


<script src="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.5/dist/cookieconsent.js" defer></script>
<script>
    window.addEventListener('load', function(){

        // obtain plugin
        var cc = initCookieConsent();

        // run plugin with your configuration
        cc.run({
            current_lang: 'en',
            autoclear_cookies: true,                   // default: false
            page_scripts: true,                        // default: false

            // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
            // delay: 0,                               // default: 0
            // auto_language: '',                      // default: null; could also be 'browser' or 'document'
            // autorun: true,                          // default: true
            // force_consent: false,                   // default: false
            // hide_from_bots: false,                  // default: false
            // remove_cookie_tables: false             // default: false
            // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
            // cookie_expiration: 182,                 // default: 182 (days)
            // cookie_necessary_only_expiration: 182   // default: disabled
            // cookie_domain: location.hostname,       // default: current domain
            // cookie_path: '/',                       // default: root
            // cookie_same_site: 'Lax',                // default: 'Lax'
            // use_rfc_cookie: false,                  // default: false
            // revision: 0,                            // default: 0

            onFirstAction: function(user_preferences, cookie){
                // callback triggered only once on the first accept/reject action
                console.log('onFirstAction', user_preferences, cookie);
            },

            onAccept: function (cookie) {
                // callback triggered on the first accept/reject action, and after each page load
                console.log('onAccept', cookie);
            },

            onChange: function (cookie, changed_categories) {
                // callback triggered when user changes preferences after consent has already been given
                console.log('onChange', changed_categories, cookie);
            },

            languages: {
                'en': {
                    consent_modal: {
                        title: 'We use cookies!',
                        description: 'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
                        primary_btn: {
                            text: 'Accept all',
                            role: 'accept_all'              // 'accept_selected' or 'accept_all'
                        },
                        secondary_btn: {
                            text: 'Reject all',
                            role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                        }
                    },
                    settings_modal: {
                        title: 'Cookie preferences',
                        save_settings_btn: 'Save settings',
                        accept_all_btn: 'Accept all',
                        reject_all_btn: 'Reject all',
                        close_btn_label: 'Close',
                        cookie_table_headers: [
                            {col1: 'Name'},
                            {col2: 'Domain'},
                            {col3: 'Expiration'},
                            {col4: 'Description'}
                        ],
                        blocks: [
                            {
                                title: 'Cookie usage 📢',
                                description: 'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#" class="cc-link">privacy policy</a>.'
                            }, {
                                title: 'Strictly necessary cookies',
                                description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
                                toggle: {
                                    value: 'necessary',
                                    enabled: true,
                                    readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
                                }
                            }, {
                                title: 'Performance and Analytics cookies',
                                description: 'These cookies allow the website to remember the choices you have made in the past',
                                toggle: {
                                    value: 'analytics',     // your cookie category
                                    enabled: false,
                                    readonly: false
                                },
                                cookie_table: [             // list of all expected cookies
                                    {
                                        col1: '^_ga',       // match all cookies starting with "_ga"
                                        col2: 'google.com',
                                        col3: '2 years',
                                        col4: 'description ...',
                                        is_regex: true
                                    },
                                    {
                                        col1: '_gid',
                                        col2: 'google.com',
                                        col3: '1 day',
                                        col4: 'description ...',
                                    }
                                ]
                            }, {
                                title: 'Advertisement and Targeting cookies',
                                description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
                                toggle: {
                                    value: 'targeting',
                                    enabled: false,
                                    readonly: false
                                }
                            }, {
                                title: 'More information',
                                description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="#yourcontactpage">contact us</a>.',
                            }
                        ]
                    }
                }
            }
        });
    });
</script>


<!-- CookieConsentScope -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>
<script src="http://cdn.cms23/js/CookieConsentLayer.js"></script>
<script>
    window.addEventListener('load', function(){

        const customOptions = {
            consent: {
                force: false,
            },
            meta: {
                revision: 7,
            },
            onAcceptAll: function (cookie, preferences) {
                console.log('custom onAcceptAll callback:', cookie, preferences);
            },
            onAcceptNecessary: function (cookie, preferences) {
                console.log('custom onAcceptNecessary callback:', cookie, preferences);
            },
            onSave: function (cookie, preferences) {
                console.log('custom onSave callback:', cookie, preferences);
            },
            whenChange: function (preferences) {
                // This is 'auto event trigger', when value of consent has changed, but not saved
                console.log('custom whenChange callback:', preferences);
            },
        };

        new CookieConsentLayer(
            customOptions,
            'demo',
            'sd2fg1sd2fg3sd12g3d',
        );

    });
</script>
<!-- // CookieConsentScope -->


<script src="<?=($document['scripts'])?>?v=<?=(TIMESTAMP)?>"></script>
</body>
</html>
