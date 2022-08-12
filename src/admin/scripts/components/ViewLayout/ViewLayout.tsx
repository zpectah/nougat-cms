import React from 'react';
import { Box, Container } from '@mui/material';

import { useSidebar } from '../../hooks';
import {
    HEADER_HEIGHT,
    SIDEBAR_WIDTH,
    TRANSITION_DEFAULT_SUFFIX,
} from '../../const';
import { viewLayoutKeyType } from '../../types';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { AnnouncementBanner } from './AnnouncementBanner';

type ViewLayoutBaseProps = {
    children?: React.ReactNode,
    variant?: viewLayoutKeyType,
}
export type ViewLayoutProps = ViewLayoutBaseProps

const ViewLayout: React.FC<ViewLayoutProps> = (props) => {
    const {
        children,
        variant = 'default',
    } = props;
    const isNotMinimal = variant !== 'minimal';

    const { sidebarOpen } = useSidebar();

    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            {isNotMinimal && (<Header />)}
            <Box
                component="main"
                sx={{
                    width: '100%',
                    paddingTop: isNotMinimal ? HEADER_HEIGHT : 0,
                    flex: 'auto',
                }}
            >
                <Box
                    sx={{
                        width: {
                            xs: '100%',
                            md: (sidebarOpen && isNotMinimal) ? `calc(100% - ${SIDEBAR_WIDTH})` : '100%',
                        },
                        left: {
                            xs: 0,
                            md: (sidebarOpen && isNotMinimal) ? SIDEBAR_WIDTH : 0,
                        },
                        position: 'relative',
                        transition: `width ${TRANSITION_DEFAULT_SUFFIX}, left ${TRANSITION_DEFAULT_SUFFIX}`,
                    }}
                >
                    <Container>
                        <AnnouncementBanner />
                        {children}
                    </Container>
                </Box>
                {isNotMinimal && (<Sidebar />)}
            </Box>
            <Footer variant={variant} />
        </Box>
    );
};

export default ViewLayout;
