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
    } = props;

    const showHeading = title || subtitle || actions;

    console.log('actionBarProps', actionBarProps);
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
                            {...actionBarProps}
                        />
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
