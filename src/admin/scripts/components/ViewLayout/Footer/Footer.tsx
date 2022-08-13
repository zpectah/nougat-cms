import React from 'react';
import { Box, Typography } from '@mui/material';

import { useSidebar, useBreadcrumbs } from '../../../hooks';
import {
    FOOTER_HEIGHT,
    SIDEBAR_WIDTH,
    TRANSITION_DEFAULT_SUFFIX,
} from '../../../const';
import { viewLayoutKeyType } from '../../../types';

type FooterBaseProps = {
    variant?: viewLayoutKeyType,
}
export type FooterProps = FooterBaseProps

const Footer = (props: FooterProps) => {
    const { variant } = props;
    const isNotMinimal = variant !== 'minimal';

    const { sidebarOpen } = useSidebar();
    const { cms, copyright } = useBreadcrumbs();

    return (
        <Box
            component="footer"
            sx={{
                width: {
                    xs: '100%',
                    md: (sidebarOpen && isNotMinimal) ? `calc(100% - ${SIDEBAR_WIDTH})` : '100%',
                },
                left: {
                    xs: 0,
                    md: (sidebarOpen && isNotMinimal) ? `calc(${SIDEBAR_WIDTH} / 2)` : 0,
                },
                position: 'relative',
                transition: `width ${TRANSITION_DEFAULT_SUFFIX}, left ${TRANSITION_DEFAULT_SUFFIX}`,
                minHeight: FOOTER_HEIGHT,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
            }}
        >
            <Typography
                variant="caption"
            >
               &copy; {copyright} {cms.name} | All right reserved
            </Typography>
        </Box>
    );
};

export default Footer;
