import React from 'react';
import {
    Box,
    Stack,
    Typography,
    Divider,
    SxProps,
} from '@mui/material';

type SectionBaseProps = {
    children?: React.ReactNode,
    title?: string,
    subtitle?: string,
    actions?: React.ReactNode,
    sx?: SxProps,
    contentSx?: SxProps,
    id?: string,
}
export type SectionProps = SectionBaseProps

const Section: React.FC<SectionProps> = (props) => {
    const {
        children,
        title,
        subtitle,
        actions,
        sx,
        contentSx,
        id,
    } = props;

    const showHeading = title || subtitle || actions;

    return (
        <Box
            component="section"
            id={id}
            sx={{
                mb: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                ...sx
            }}
        >
            {showHeading && (
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                >
                    <Stack
                        direction="column"
                        spacing={1}
                        sx={{
                            flex: 'auto',
                        }}
                    >
                        {title && (
                            <Typography
                                variant="h2"
                            >
                                {title}
                            </Typography>
                        )}
                        {subtitle && (
                            <Typography
                                variant="subtitle2"
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Stack>
                    {actions && (
                        <Stack
                            direction="row"
                            spacing={1}
                        >
                            actions
                        </Stack>
                    )}
                </Stack>
            )}
            {(showHeading && children) && <Divider />}
            <Box
                sx={{ ...contentSx }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Section;
