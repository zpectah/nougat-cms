import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { ViewHeading } from '../../components';

const Error404 = () => {
    const { t } = useTranslation([ 'views' ]);

    return (
        <>
            <ViewHeading
                title={t('views:Error404.title')}
                subtitle={t('views:Error404.subtitle')}
                centered
            />
            <Box>
                Error404 ... only button back to dashboard
            </Box>
        </>
    );
};

export default Error404;
