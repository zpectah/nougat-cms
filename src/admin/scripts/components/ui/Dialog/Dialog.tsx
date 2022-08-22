import React, { useEffect, useState } from 'react';
import { merge } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
    Dialog as MuiDialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    DialogProps as MuiDialogProps,
    DialogTitleProps,
    DialogContentProps,
    DialogActionsProps,
} from '@mui/material';

import { Button } from '../Button';
import { ActionBar, ActionBarProps } from '../ActionBar';

type DialogBaseProps = {
    children?: React.ReactNode,
    title?: React.ReactNode,
    actions?: React.ReactNode,
    headerNode?: React.ReactNode,
    actionsNode?: React.ReactNode,
    titleProps?: DialogTitleProps,
    contentProps?: DialogContentProps,
    actionsProps?: DialogActionsProps,
    onClose?: () => void,
    forceActionsClose?: boolean,
    secondary?: React.ReactNode,
    secondaryContentProps?: DialogContentProps,
    dividers?: boolean,
    actionBarProps?: ActionBarProps,
    disableActionsClose?: boolean,
}
export type DialogProps = MuiDialogProps & DialogBaseProps

const Dialog: React.FC<DialogProps> = (props) => {
    const {
        children,
        title,
        actions,
        headerNode,
        actionsNode,
        titleProps,
        contentProps,
        actionsProps,
        onClose,
        forceActionsClose,
        secondary,
        secondaryContentProps,
        dividers,
        actionBarProps,
        disableActionsClose,
        open,
        maxWidth = 'md',
        id,
        ...rest
    } = props;

    const [ isOpen, setIsOpen ] = useState(false);

    const { t } = useTranslation();

    const closeHandler = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };

    useEffect(() => setIsOpen(open), [ open ]);

    return (
        <MuiDialog
            open={isOpen}
            onClose={closeHandler}
            fullWidth
            maxWidth={maxWidth}
            id={id}
            {...rest}
        >
            <ActionBar
                id={`${id}-actionBar`}
                onClose={closeHandler}
                {...merge({
                    sx: {
                        position: 'absolute',
                        top: '.5rem',
                        right: '.5rem',
                    },
                }, actionBarProps)}
            />
            {title && (
                <DialogTitle
                    component="header"
                    {...titleProps}
                >
                    <Typography
                        variant="h4"
                    >
                        {title}
                    </Typography>
                </DialogTitle>
            )}
            {headerNode && headerNode}
            <DialogContent
                dividers={dividers}
                {...contentProps}
            >
                {children}
            </DialogContent>
            {secondary && (
                <DialogContent
                    dividers={dividers}
                    {...merge({
                        sx: {
                            marginTop: dividers ? '-1px' : 0
                        },
                    }, contentProps, secondaryContentProps)}
                >
                    {secondary}
                </DialogContent>
            )}
            {(actions || forceActionsClose) && (
                <DialogActions
                    {...merge({
                        sx: { gap: 1 },
                    }, actionsProps)}
                >
                    {actions && actions}
                    {!disableActionsClose && (
                        <Button
                            onClick={closeHandler}
                            secondary
                        >
                            {t('btn.close')}
                        </Button>
                    )}
                </DialogActions>
            )}
            {actionsNode && actionsNode}
        </MuiDialog>
    );
};

export default Dialog;
