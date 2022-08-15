import React, {useMemo, useState} from 'react';
import { merge } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import {
    Drawer,
    Button,
    DrawerProps,
    ConfirmDialog,
} from '../../ui';

type DetailDrawerBaseProps = {
    detailType?: any, // TODO #types
    detailId?: string,
    widthMd?: string | number,
    widthLg?: string | number,
    widthXl?: string | number,
    onSubmit?: () => void,
    submitText?: string,
    submitDisabled?: boolean,
    onDelete?: (id: string) => void,
    deleteText?: string,
    deleteDisabled?: boolean,
    formProps?: React.HTMLProps<HTMLFormElement> & React.HTMLAttributes<HTMLFormElement>,
}
export type DetailDrawerProps = DrawerProps & DetailDrawerBaseProps

const DetailDrawer: React.FC<DetailDrawerProps> = (props) => {
    const {
        detailType = 'User', // TODO
        detailId,
        widthMd = 'calc(100% - 100px)',
        widthLg = 1000,
        widthXl = 1200,
        onSubmit,
        submitText,
        submitDisabled,
        onDelete,
        deleteText,
        deleteDisabled,
        formProps,
        children,
        onClose,
        sx,
        ...rest
    } = props;

    const [ confirmOpen, setConfirmOpen ] = useState(false);
    const [ confirmData, setConfirmData ] = useState<any | null>(null); // TODO

    const { t } = useTranslation('common');

    const width = {
        xs: '100%',
        md: widthMd,
        lg: widthLg,
        xl: widthXl,
    };
    const submitButtonText = submitText ? submitText : t('btn.submit');
    const deleteButtonText = deleteText ? deleteText : t('btn.delete');

    const openConfirmHandler = (id: string) => {
        setConfirmOpen(true);
        setConfirmData({ id });
    };
    const closeConfirmHandler = () => {
        setConfirmOpen(false);
        setTimeout(() => setConfirmData(null), 350);
    };
    const deleteDetailHandler = () => {
        if (detailId) openConfirmHandler(detailId);
    };
    const confirmDeleteDetailHandler = () => {
        closeConfirmHandler();
        if (detailId && onDelete) onDelete(detailId);
    };

    const renderActions = () => (
        <>
            <Button
                secondary
                onClick={onClose}
            >
                {t('btn.cancel')}
            </Button>
            {(onDelete && deleteButtonText) && (
                <Button
                    warning
                    onClick={deleteDetailHandler}
                    disabled={deleteDisabled}
                >
                    {deleteButtonText}
                </Button>
            )}
            {(onSubmit && submitButtonText) && (
                <Button
                    submit={!!formProps?.name}
                    primary={!(!!formProps?.name)}
                    onClick={onSubmit}
                    form={formProps?.name}
                    disabled={submitDisabled}
                >
                    {submitButtonText}
                </Button>
            )}
        </>
    );

    const renderContent = useMemo(() => {
        const node = <>{children}</>;

        if (formProps) {
            return (
                <form
                    {...formProps}
                >
                    {node}
                </form>
            );
        }

        return node;
    }, [ children, formProps ]);

    return (
        <>
            <Drawer
                anchor="right"
                onClose={onClose}
                actions={renderActions()}
                sx={merge(sx, {
                    width,
                    '& .MuiDrawer-paper': {
                        width,
                    },
                })}
                scrollable
                {...rest}
            >
                <Box
                    sx={{ p: 2 }}
                    children={renderContent}
                />
            </Drawer>
            <ConfirmDialog
                open={confirmOpen}
                onClose={closeConfirmHandler}
                onConfirm={confirmDeleteDetailHandler}
                title="Delete item"
                content={
                    <>
                        Do you want to delete this {confirmData?.id} {detailType}?
                    </>
                }
            />
        </>
    );
};

export default DetailDrawer;
