import React from 'react';
import { Box, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useSidebar } from '../../../hooks';
import {
    HEADER_HEIGHT,
    SIDEBAR_WIDTH,
    TRANSITION_DEFAULT_SUFFIX,
    HEADER_ZINDEX,
} from '../../../const';
import { SidebarToggle } from '../SidebarToggle';

const Header = () => {
    const { sidebarOpen } = useSidebar();
    const { palette } = useTheme();

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
                backgroundColor: {
                    xs: palette.background.paper,
                    lg: 'transparent',
                },
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
                    <SidebarToggle
                        sx={{
                            backgroundColor: {
                                xs: 'inherit',
                                lg: palette.primary.main,
                            },
                            color: {
                                xs: 'inherit',
                                lg: palette.primary.contrastText,
                            },
                            '&:hover': {
                                backgroundColor: {
                                    xs: 'inherit',
                                    lg: palette.primary.dark,
                                },
                                color: {
                                    xs: 'inherit',
                                    lg: palette.primary.contrastText,
                                },
                            },
                        }}
                    >
                        <MenuIcon />
                    </SidebarToggle>
                )}
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
