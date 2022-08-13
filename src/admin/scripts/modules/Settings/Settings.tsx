import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { ViewHeading } from '../../components';

const Settings = () => {
    const { t } = useTranslation([ 'views' ]);

    return (
        <>
            <ViewHeading
                title={t('views:Settings.title')}
                subtitle={t('views:Settings.subtitle')}
            />
            <Box>
                Settings
            </Box>
        </>
    );
};

export default Settings;
