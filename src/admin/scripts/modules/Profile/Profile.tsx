import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { ViewHeading } from '../../components';

const Profile = () => {
    const { t } = useTranslation([ 'views' ]);

    return (
        <>
            <ViewHeading
                title={t('views:Profile.title')}
                subtitle={t('views:Profile.subtitle')}
            />
            <Box>
                Profile
            </Box>
        </>
    );
};

export default Profile;
