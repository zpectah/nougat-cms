import React from 'react';
import { Drawer } from '@mui/material';

import { useSidebar } from '../../../hooks';
import { SIDEBAR_WIDTH } from '../../../const';

const Sidebar = () => {
    const { sidebarOpen, toggleSidebar } = useSidebar();

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
                },
            }}
        >
            sidebar
            <br />
            <button
                onClick={() => toggleSidebar()}
            >
                toggle
            </button>
        </Drawer>
    );
};

export default Sidebar;
