import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Zoom } from '@mui/material';

import { TOAST_HIDE_TIMEOUT } from '../../../const';
import { toastItemType } from '../../../types';

type ToastItemBaseProps = {}
export type ToastItemProps = ToastItemBaseProps & toastItemType

const ToastItem = (props: ToastItemProps) => {
    const {
        onRemove,
        id,
        title,
        content,
        context = 'info',
        timeout,
    } = props;

    const [ open, setOpen ] = useState(true);

    const closeHandler = () => {
        setOpen(false);
        if (onRemove && id) setTimeout(() => onRemove(id as string), TOAST_HIDE_TIMEOUT);
    };

    useEffect(() => {
        if (timeout && onRemove && id) setTimeout(() => closeHandler(), timeout);

    }, [ id, timeout ]);

    return (
        <Zoom in={open}>
            <Alert
                severity={context}
                icon={false}
                action={
                    <button
                        onClick={closeHandler}
                        // size="small"
                        color="inherit"
                        // iconProps={{ fontSize: 'small' }}
                    />
                }
                sx={{ mb: 1 }}
            >
                <AlertTitle>
                    {title}
                </AlertTitle>
                {content}
            </Alert>
        </Zoom>
    );
};

export default ToastItem;
