import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import {
    ViewHeading,
    DataTable,
} from '../../components';

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

                <DataTable />

            </Box>
        </>
    );
};

export default Users;
