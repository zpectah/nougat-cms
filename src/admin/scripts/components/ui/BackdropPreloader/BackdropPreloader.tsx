import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

import palette from '../../../styles/palette';

const BackdropPreloader = () => (
    <>
        <Backdrop
            sx={{
                color: palette.light,
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open
        >
            <CircularProgress
                color="inherit"
            />
        </Backdrop>
    </>
);

export default BackdropPreloader;
