import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { ViewHeading } from '../../components';

const LostPassword = () => {
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
                title={t('views:LostPassword.title')}
                subtitle={t('views:LostPassword.subtitle')}
                centered
            />
            <Box>
                LostPassword form
                <p>
                    Odio leo rhoncus, ligula urna mauris nunc ut enim et tincidunt rhoncus at sem, dolor ut tellus sed porttitor dui vel. Ullamcorper varius, consectetur ornare id consequat id dolor id lacinia, venenatis a dui vel dolor auctor. Mauris ipsum, nibh maximus egestas consequat congue nulla cras dictum nec placerat, ut venenatis elit posuere nibh maximus. Ut venenatis placerat, sit amet elit libero sed suspendisse libero dui duis id, quis ut hendrerit donec dolor quis. Curabitur sem, metus vestibulum interdum commodo hendrerit in donec cursus, luctus mauris eu elementum luctus maximus. Dolor quis a lacinia, adipiscing et nullam fermentum imperdiet convallis nam, et condimentum pellentesque neque.
                </p>
            </Box>
        </Box>
    );
};

export default LostPassword;
