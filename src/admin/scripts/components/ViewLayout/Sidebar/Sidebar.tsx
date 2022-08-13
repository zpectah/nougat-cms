import React from 'react';
import {
    Drawer,
    Box,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { useSidebar } from '../../../hooks';
import {
    SIDEBAR_WIDTH,
    HEADER_HEIGHT,
} from '../../../const';
import palette from '../../../styles/palette';
import { Scrollable } from '../../ui';
import { SidebarToggle } from '../SidebarToggle';
import { Navbar } from './Navbar';

type SidebarBaseProps = {
    actions?: React.ReactNode,
}
export type SidebarProps = SidebarBaseProps

const Sidebar = (props: SidebarProps) => {
    const { actions } = props;

    const { sidebarOpen } = useSidebar();

    return (
        <Drawer
            anchor="left"
            variant="persistent"
            open={sidebarOpen}
            PaperProps={{
                variant: 'elevation',
                elevation: 0,
            }}
            sx={{
                width: {
                    xs: '100%',
                    md: SIDEBAR_WIDTH,
                },
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: {
                        xs: '100%',
                        md: SIDEBAR_WIDTH,
                    },
                    boxSizing: 'border-box',
                    borderRight: 0,
                    backgroundColor: palette.primary, // TODO
                    color: palette.light, // TODO
                },
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        height: HEADER_HEIGHT,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <SidebarToggle>
                        <MenuOpenIcon />
                    </SidebarToggle>
                    <>
                        cms logo
                    </>
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        flex: 'auto',
                    }}
                >
                    <Scrollable>
                        <Box
                            sx={{
                                py: 1,
                                px: 2,
                            }}
                        >
                            <Navbar />
                        </Box>
                    </Scrollable>
                </Box>
                {actions && (
                    <Box
                        sx={{
                            height: HEADER_HEIGHT,
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                        }}
                    >
                        {actions}
                    </Box>
                )}
            </Box>
        </Drawer>
    );
};

export default Sidebar;
