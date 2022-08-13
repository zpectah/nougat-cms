import React from 'react';
import { Alert } from '@mui/material';

import { useAnnouncementBanner } from '../../../hooks';
import { CloseButton } from '../../ui';

const AnnouncementBanner = () => {
    const { banner, removeBanner } = useAnnouncementBanner();

    if (!banner) return null;

    return (
        <>
            {banner && (
                <Alert
                    severity="info"
                    action={
                        <CloseButton
                            onClick={removeBanner}
                            size="small"
                            color="inherit"
                            iconProps={{ fontSize: 'small' }}
                        />
                    }
                    sx={{
                        width: '100%',
                        mb: 2,
                    }}
                >
                    {banner}
                </Alert>
            )}
        </>
    );
};

export default AnnouncementBanner;
