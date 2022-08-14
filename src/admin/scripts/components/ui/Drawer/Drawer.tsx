import React, {useEffect, useMemo, useState} from 'react';
import {
    Drawer as MuiDrawer,
    Box,
    Typography,
    DrawerProps as MuiDrawerProps,
    SxProps,
} from '@mui/material';

import { CloseButton } from '../IconButton';
import { Scrollable } from '../Scrollable';

type DrawerBaseProps = {
    children?: React.ReactNode,
    onClose?: () => void,
    disableClose?: boolean,
    title?: React.ReactNode,
    bodySx?: SxProps,
    headerSx?: SxProps,
    contentSx?: SxProps,
    width?: string | number,
    scrollable?: boolean,
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
        width,
        scrollable,
        open,
        sx,
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
            open={isOpen}
            onClose={closeHandler}
            PaperProps={{
                variant: 'elevation',
                elevation: 0,
            }}
            sx={{
                width: width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: width,
                    boxSizing: 'border-box',
                },
                ...sx,
            }}
            {...rest}
        >
            {!disableClose && (
                <CloseButton
                    onClick={closeHandler}
                    sx={{
                        position: 'absolute',
                        top: '.5rem',
                        right: '.5rem',
                    }}
                    iconProps={{
                        fontSize: 'small',
                    }}
                />
            )}
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    ...bodySx,
                }}
            >
                {title && (
                    <Box
                        sx={{
                            width: '100%',
                            p: 2,
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            ...headerSx,
                        }}
                    >
                        <Typography
                            component="header"
                            variant="h4"
                        >
                            {title}
                        </Typography>
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
            </Box>
        </MuiDrawer>
    );
};

export default Drawer;
