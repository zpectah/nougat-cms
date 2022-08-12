import React from 'react';
import { Box } from '@mui/material';

import {
    TOASTS_DESKTOP_WIDTH,
    TOASTS_TABLET_WIDTH,
    TOASTS_WRAPPER_ZINDEX,
} from '../../const';
import { useToasts } from '../../hooks';
import { ToastItem } from './ToastItem';

const Toasts = () => {
    const { toasts, removeToast } = useToasts();

    return (
        <Box
            sx={{
                width: {
                    xs: '90%',
                    md: TOASTS_TABLET_WIDTH,
                    lg: TOASTS_DESKTOP_WIDTH,
                },
                height: 'auto',
                position: 'fixed',
                overflow: 'visible',
                left: {
                    xs: '5%',
                    md: `calc(50% - (${TOASTS_TABLET_WIDTH} / 2))`,
                    lg: `calc(50% - (${TOASTS_DESKTOP_WIDTH} / 2))`,
                },
                bottom: 1,
                zIndex: TOASTS_WRAPPER_ZINDEX,
            }}
        >
            {toasts.map(({ id, onRemove, ...rest}) => (
                <ToastItem
                    key={id}
                    id={id as string}
                    onRemove={(id) => removeToast(id)}
                    {...rest}
                />
            ))}
        </Box>
    );
};

export default Toasts;
