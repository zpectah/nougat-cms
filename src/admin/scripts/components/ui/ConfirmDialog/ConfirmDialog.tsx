import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Stack,
    Typography,
} from '@mui/material';

import { Dialog, DialogProps } from '../Dialog';
import { Button } from '../Button';

type ConfirmDialogBaseProps = {
    content?: React.ReactNode,
    onConfirm?: () => void,
    confirmText?: string,
}
export type ConfirmDialogProps = DialogProps & ConfirmDialogBaseProps

const ConfirmDialog = (props: ConfirmDialogProps) => {
    const {
        content,
        onConfirm,
        confirmText,
        onClose,
        title,
        open,
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
        <Dialog
            open={isOpen}
            onClose={closeHandler}
            maxWidth="xs"
            actions={
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                    sx={{ width: '100%' }}
                >
                    <Button
                        onClick={closeHandler}
                        secondary
                        large
                        sx={{
                            width: '50%',
                        }}
                    >
                        {t('btn.cancel')}
                    </Button>
                    {onConfirm && (
                        <Button
                            onClick={() => onConfirm()}
                            primary
                            large
                            sx={{
                                width: '50%',
                            }}
                        >
                            {confirmText ? confirmText : t('btn.confirm')}
                        </Button>
                    )}
                </Stack>
            }
            disableActionsClose
            {...rest}
        >
            <Box
                sx={{
                    p: 2,
                    pt: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    {title}
                </Typography>
                <Typography>
                    {content}
                </Typography>
            </Box>
        </Dialog>
    );
};

export default ConfirmDialog;
