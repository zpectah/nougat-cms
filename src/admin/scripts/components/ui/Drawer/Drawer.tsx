import React, { useEffect, useState } from 'react';
import { merge } from 'lodash';
import {
    Drawer as MuiDrawer,
    Box,
    Typography,
    DrawerProps as MuiDrawerProps,
    SxProps,
} from '@mui/material';

import { Scrollable } from '../Scrollable';
import { ActionBar, ActionBarProps } from '../ActionBar';

type DrawerBaseProps = {
    children?: React.ReactNode,
    onClose?: () => void,
    disableClose?: boolean,
    title?: React.ReactNode,
    bodySx?: SxProps,
    headerSx?: SxProps,
    contentSx?: SxProps,
    scrollable?: boolean,
    actions?: React.ReactNode,
    actionsSx?: SxProps,
    spacing?: number,
    actionBarProps?: ActionBarProps,
    headerNode?: React.ReactNode,
}
export type DrawerProps = MuiDrawerProps & DrawerBaseProps

const Drawer: React.FC<DrawerProps> = (props) => {
    const {
        children,
        onClose,
        disableClose,
        title,
        bodySx,
        headerSx,
        contentSx,
        scrollable,
        actions,
        actionsSx,
        spacing = 2,
        actionBarProps,
        headerNode,
        open,
        sx,
        id,
        ...rest
    } = props;

    const [ isOpen, setIsOpen ] = useState(false);

    const closeHandler = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };
    const renderContent = () => {
        if (scrollable) return (
            <Scrollable>
                {children}
            </Scrollable>
        );

        return children;
    };

    useEffect(() => setIsOpen(!!open), [ open ]);

    return (
        <MuiDrawer
            id={id}
            open={isOpen}
            onClose={closeHandler}
            PaperProps={{
                variant: 'elevation',
                elevation: 0,
            }}
            sx={merge(sx, {
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                    },
                }
            )}
            {...rest}
        >
            <ActionBar
                id={`${id}-actionBar`}
                onClose={!disableClose && closeHandler}
                sx={{
                    position: 'absolute',
                    top: '.5rem',
                    right: '.5rem',
                }}
                {...actionBarProps}
            />
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    ...bodySx,
                }}
            >
                {(title || headerNode) && (
                    <Box
                        sx={{
                            width: '100%',
                            p: spacing,
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            ...headerSx,
                        }}
                    >
                        {title && (
                            <Typography
                                component="header"
                                variant="h4"
                            >
                                {title}
                            </Typography>
                        )}
                        {headerNode && (
                            <>
                                {headerNode}
                            </>
                        )}
                    </Box>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flex: 'auto',
                        flexDirection: 'column',
                        position: 'relative',
                        ...contentSx,
                    }}
                >
                    {renderContent()}
                </Box>
                {actions && (
                    <Box
                        sx={{
                            width: '100%',
                            p: spacing,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: spacing,
                            ...actionsSx,
                        }}
                    >
                        {actions}
                    </Box>
                )}
            </Box>
        </MuiDrawer>
    );
};

export default Drawer;
