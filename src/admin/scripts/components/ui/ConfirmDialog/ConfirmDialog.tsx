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

    const [ dialogOpen, setDialogOpen ] = useState(false);

    const { t } = useTranslation();

    const closeHandler = () => {
        setDialogOpen(false);
        if (onClose) onClose();
    };

    useEffect(() => setDialogOpen(open), [ open ]);

    return (
        <Dialog
            open={dialogOpen}
            onClose={closeHandler}
            maxWidth="xs"
            {...rest}
        >
            <Box
                sx={{
                    p: 2,
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
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-evenly"
                >
                    <Button
                        onClick={closeHandler}
                        secondary
                        large
                    >
                        {t('btn.close')}
                    </Button>
                    {onConfirm && (
                        <Button
                            onClick={() => onConfirm()}
                            primary
                            large
                        >
                            {confirmText ? confirmText : t('btn.confirm')}
                        </Button>
                    )}
                </Stack>
            </Box>
        </Dialog>
    );
};

export default ConfirmDialog;
