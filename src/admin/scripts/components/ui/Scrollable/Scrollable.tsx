import React from 'react';
import { Box, SxProps } from '@mui/material';

import { SCROLLBAR_DEFAULT_WIDTH } from '../../../const';

export type ScrollableProps = {
    children?: React.ReactNode,
    sx?: SxProps,
}

const Scrollable: React.FC<ScrollableProps> = (props) => {
    const {
        children,
        sx,
    } = props;

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                ...sx,
            }}
        >
            <Box
                sx={{
                    width: `calc(100% + ${SCROLLBAR_DEFAULT_WIDTH})`,
                    height: '100%',
                    position: 'relative',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}
            >
                <Box
                    sx={{
                        width: `calc(100% - ${SCROLLBAR_DEFAULT_WIDTH})`,
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Scrollable;
