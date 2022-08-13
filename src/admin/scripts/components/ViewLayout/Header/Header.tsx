import React from 'react';
import { Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useSidebar } from '../../../hooks';
import {
    HEADER_HEIGHT,
    SIDEBAR_WIDTH,
    TRANSITION_DEFAULT_SUFFIX,
    HEADER_ZINDEX,
} from '../../../const';
import palette from '../../../styles/palette';
import { SidebarToggle } from '../SidebarToggle';
import { Breadcrumbs } from './Breadcrumbs';

const Header = () => {
    const { sidebarOpen } = useSidebar();

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
                px: 2,
                top: 0,
                zIndex: HEADER_ZINDEX,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                backgroundColor: palette.light, // TODO
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                {!sidebarOpen && (
                    <SidebarToggle>
                        <MenuIcon />
                    </SidebarToggle>
                )}
                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'block',
                        },
                    }}
                >
                    <Breadcrumbs />
                </Box>
            </Box>
            <Box>
                settings
                &nbsp;
                entity dropdown
            </Box>
        </Box>
    );
};

export default Header;
