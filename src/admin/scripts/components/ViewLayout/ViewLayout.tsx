import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container } from '@mui/material';

import {
    HEADER_HEIGHT,
    SIDEBAR_WIDTH,
    TRANSITION_DEFAULT_SUFFIX,
} from '../../const';
import { viewLayoutKeyType, routeItemType } from '../../types';
import {
    useSidebar,
    useBreadcrumbs,
    useRoutes,
} from '../../hooks';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { AnnouncementBanner } from './AnnouncementBanner';

type ViewLayoutBaseProps = {
    name: string,
    children?: React.ReactNode,
    variant?: viewLayoutKeyType,
    onLoad?: (name: string, route: routeItemType ) => void,
}
export type ViewLayoutProps = ViewLayoutBaseProps

const ViewLayout: React.FC<ViewLayoutProps> = (props) => {
    const {
        name,
        children,
        variant = 'default',
        onLoad,
    } = props;

    const [ loaded, setLoaded ] = useState(false);

    const isNotMinimal = variant !== 'minimal';

    const { t } = useTranslation('views');
    const { sidebarOpen } = useSidebar();
    const { setDocumentMeta } = useBreadcrumbs();
    const { routes, setRoute } = useRoutes();

    const onLayoutLoad = () => {
        const route = routes[name];
        setDocumentMeta(t(`${name}.meta.title`));
        setRoute(routes[name]);
        setLoaded(true);
        if (onLoad) onLoad(name, route);
    };

    useEffect(() => onLayoutLoad(), []);

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
                    <Container
                        sx={{ py: 2 }}
                    >
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
