import React from 'react';
import {
    Box,
    Stack,
    Typography,
    Divider,
    SxProps,
} from '@mui/material';

import { ActionBar, ActionBarProps } from '../ActionBar';

type SectionBaseProps = {
    children?: React.ReactNode,
    title?: string,
    subtitle?: string,
    actions?: React.ReactNode,
    sx?: SxProps,
    contentSx?: SxProps,
    id?: string,
    actionBarProps?: ActionBarProps,
    withYOffset?: boolean,
    withXOffset?: boolean,
    disableDivider?: boolean,
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
        actionBarProps,
        withYOffset,
        withXOffset,
        disableDivider,
    } = props;

    const showHeading = title || subtitle || actions;
    const showDivider = disableDivider ? false : (showHeading && children);

    return (
        <Box
            component="section"
            id={id}
            sx={{
                my: 2,
                pb: 2,
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
                    alignItems="flex-start"
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
                    {(actions || actionBarProps) && (
                        <ActionBar
                            children={actions}
                            id={`${id}-actionBar`}
                            {...actionBarProps}
                        />
                    )}
                </Stack>
            )}
            {showDivider && <Divider />}
            <Box
                sx={{
                    py: withYOffset ? 2 : 0,
                    px: withXOffset ? 2 : 0,
                    ...contentSx
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Section;
