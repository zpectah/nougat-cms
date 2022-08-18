import React from 'react';
import {
    Box,
    Stack,
    Typography,
    SxProps,
} from '@mui/material';

import { Breadcrumbs } from '../Breadcrumbs';

type ViewHeadingBaseProps = {
    title?: string,
    subtitle?: string,
    actions?: React.ReactNode,
    sx?: SxProps,
    centered?: boolean,
    withBreadcrumbs?: boolean,
}
export type ViewHeadingProps = ViewHeadingBaseProps

const ViewHeading = (props: ViewHeadingProps) => {
    const {
        title,
        subtitle,
        actions,
        sx,
        centered,
        withBreadcrumbs,
    } = props;

    return (
        <Box
            sx={{
                width: '100%',
                mb: 3,
                display: 'flex',
                justifyContent: centered ? 'center' : 'space-between',
                gap: 2,
                textAlign: centered ? 'center' : 'inherit',
                flexDirection: 'column',
                ...sx,
            }}
        >
            {withBreadcrumbs && <Breadcrumbs />}
            <Stack
                direction="row"
                alignItems={centered ? 'center' : 'flex-start'}
                justifyContent="space-between"
                gap={1}
            >
                <Stack
                    direction="column"
                    gap={1}
                    alignItems={centered ? 'center' : 'flex-start'}
                    sx={{ width: '100%' }}
                >
                    {title && (
                        <Typography
                            variant="h1"
                        >
                            {title}
                        </Typography>
                    )}
                    {subtitle && (
                        <Typography
                            variant="subtitle1"
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Stack>
                {actions && (
                    <Stack
                        direction="row"
                        gap={1}
                    >
                        {actions}
                    </Stack>
                )}
            </Stack>
        </Box>
    );
};

export default ViewHeading;
