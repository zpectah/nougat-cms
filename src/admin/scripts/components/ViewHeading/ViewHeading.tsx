import React from 'react';
import {
    Box,
    Stack,
    Typography,
    SxProps,
} from '@mui/material';

type ViewHeadingBaseProps = {
    title?: string,
    subtitle?: string,
    actions?: React.ReactNode,
    sx?: SxProps,
    centered?: boolean,
}
export type ViewHeadingProps = ViewHeadingBaseProps

const ViewHeading = (props: ViewHeadingProps) => {
    const {
        title,
        subtitle,
        actions,
        sx,
        centered,
    } = props;

    return (
        <Box
            sx={{
                width: '100%',
                mb: 3,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: centered ? 'center' : 'space-between',
                gap: 2,
                textAlign: centered ? 'center' : 'inherit',
                ...sx,
            }}
        >
            <Stack
                direction="column"
                gap={1}
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
        </Box>
    );
};

export default ViewHeading;
