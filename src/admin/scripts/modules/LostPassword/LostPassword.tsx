import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { ViewHeading } from '../../components';

const LostPassword = () => {
    const { t } = useTranslation([ 'views' ]);

    return (
        <>
            <ViewHeading
                title={t('views:LostPassword.title')}
                subtitle={t('views:LostPassword.subtitle')}
                centered
            />
            <Box>
                LostPassword form
            </Box>
        </>
    );
};

export default LostPassword;
