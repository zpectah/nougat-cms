import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { ViewHeading } from '../../components';

const Users = () => {
    const { t } = useTranslation([ 'views' ]);

    return (
        <>
            <ViewHeading
                title={t('views:Users.title')}
                subtitle={t('views:Users.subtitle')}
                withBreadcrumbs
            />
            <Box>
                Users
            </Box>
        </>
    );
};

export default Users;
