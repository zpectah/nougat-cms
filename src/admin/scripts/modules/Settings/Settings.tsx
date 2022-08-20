import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { commonItemModelProps } from '../../types';
import { useSettings } from '../../hooks';
import { ViewHeading } from '../../components';
import SettingsForm from './SettingsForm';

const Settings = () => {
    const { t } = useTranslation([ 'views' ]);
    const { Settings, loadSettings, updateSettings } = useSettings();

    const loadHandler = () => {
        console.log('Settings: loadHandler');
        loadSettings();
    };
    const updateHandler = (payload: commonItemModelProps) => {
        console.log('Settings: updateHandler', payload);
        updateSettings();
    };

    useEffect(() => {
        loadHandler();
    }, []);

    return (
        <>
            <ViewHeading
                title={t('views:Settings.title')}
                subtitle={t('views:Settings.subtitle')}
                withBreadcrumbs
            />
            <SettingsForm
                data={Settings}
                onReload={loadHandler}
                onUpdate={updateHandler}
            />
        </>
    );
};

export default Settings;
