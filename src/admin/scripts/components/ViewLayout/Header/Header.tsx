import React from 'react';
import { Box } from '@mui/material';

import { useSidebar } from '../../../hooks';
import {
    HEADER_HEIGHT,
    SIDEBAR_WIDTH,
    TRANSITION_DEFAULT_SUFFIX,
} from '../../../styles/const';

const Header = () => {
    const { sidebarOpen, toggleSidebar } = useSidebar();

    return (
        <Box
            component="header"
            sx={{
                width: {
                    xs: '100%',
                    md: sidebarOpen ? `calc(100% - ${SIDEBAR_WIDTH})` : '100%',
                },
                left: {
                    xs: 0,
                    md: sidebarOpen ? SIDEBAR_WIDTH : 0,
                },
                position: 'fixed',
                transition: `width ${TRANSITION_DEFAULT_SUFFIX}, left ${TRANSITION_DEFAULT_SUFFIX}`,
                height: HEADER_HEIGHT,
                top: 0,
                zIndex: 1100,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
            }}
        >
            <div>
                <button
                    onClick={() => toggleSidebar()}
                >
                    menu
                </button>
            </div>
            <div>
                b
            </div>
            <div>
                c
            </div>
        </Box>
    );
};

export default Header;
