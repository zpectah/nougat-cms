import { SettingsProps } from '../types';

const useSettings = () => {
    const Settings: SettingsProps = {
        app_language_default: 'en-US',
        app_language_installed: [ 'en-US' ],
        app_language_active: [ 'en-US', 'cs-CZ' ],

        company_name: 'YOUR COMPANY NAME',
        company_id: 'COMPANY ID',

        app_meta_title: 'APP TITLE',
        app_meta_description: 'APP DESCRIPTION',
        app_meta_robots: 'noindex,nofollow',
        app_meta_keywords: [ 'tag1', 'tag2', 'tag3' ],

        app_revision_token: 'sdlkfgjldskfjgl',
    };

    return {
        Settings,
        loadSettings: () => { console.log('loadSettings') },
        updateSettings: () => { console.log('updateSettings') },
    };
};

export default useSettings;
