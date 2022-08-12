import React from 'react';
import { Alert } from '@mui/material';

import { useAnnouncementBanner } from '../../../hooks';

const AnnouncementBanner = () => {
    const { banner, removeBanner } = useAnnouncementBanner();

    if (!banner) return null;

    return (
        <>
            {banner && (
                <Alert
                    severity="info"
                    action={
                        <button
                            onClick={removeBanner}
                            // size="small"
                            color="inherit"
                        />
                    }
                    sx={{
                        width: '100%',
                        mb: 1,
                    }}
                >
                    {banner}
                </Alert>
            )}
        </>
    );
};

export default AnnouncementBanner;
