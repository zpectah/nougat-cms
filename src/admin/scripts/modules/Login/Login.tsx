import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { ViewHeading } from '../../components';

const Login = () => {
    const { t } = useTranslation([ 'views' ]);

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ViewHeading
                title={t('views:Login.title')}
                subtitle={t('views:Login.subtitle')}
                centered
            />
            <Box>
                Login form
            </Box>
        </Box>
    );
};

export default Login;
