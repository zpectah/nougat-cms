import React, { useMemo } from 'react';
import { merge } from 'lodash';
import { isDesktop } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

import { modelKeyType, availableActionsProps } from '../../../types';
import { Breadcrumbs } from '../../Breadcrumbs';
import {
    Drawer,
    Button,
    Form,
    DrawerProps,
    MenuItemProps,
    FormProps,
} from '../../ui';

type DetailDrawerBaseProps = {
    modelKey: modelKeyType,
    detailId?: string,
    widthMd?: string | number,
    widthLg?: string | number,
    widthXl?: string | number,
    onSubmit?: () => void,
    submitText?: string,
    submitDisabled?: boolean,
    onToggle?: () => void,
    onDelete?: () => void,
    deleteText?: string,
    deleteDisabled?: boolean,
    formProps?: FormProps,
    availableActions: availableActionsProps,
}
export type DetailDrawerProps = DrawerProps & DetailDrawerBaseProps

const DetailDrawer: React.FC<DetailDrawerProps> = (props) => {
    const {
        modelKey,
        detailId,
        widthMd = 'calc(100% - 100px)',
        widthLg = 1000,
        widthXl = 1200,
        onSubmit,
        submitText,
        submitDisabled,
        onToggle,
        onDelete,
        deleteText,
        deleteDisabled,
        formProps,
        availableActions,
        children,
        onClose,
        sx,
        title,
        ...rest
    } = props;

    const { t } = useTranslation('common');

    const width = {
        xs: '100%',
        md: widthMd,
        lg: widthLg,
        xl: widthXl,
    };
    const submitButtonText = submitText ? submitText : t('btn.submit');
    const deleteButtonText = deleteText ? deleteText : t('btn.delete');

    const toggleDetailHandler = () => {
        if (detailId && onToggle) onToggle();
    };
    const deleteDetailHandler = () => {
        if (detailId && onDelete) onDelete();
    };

    const renderActions = () => (
        <>
            <Button
                secondary
                onClick={onClose}
            >
                {t('btn.cancel')}
            </Button>
            {(onSubmit && submitButtonText && (availableActions.create || availableActions.update)) && (
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

    const actionBarMenu = useMemo(() => {
        const menu: MenuItemProps[] = [
            {
                key: 'toggle',
                children: t('btn.disable'),
                disabled: !availableActions.toggle,
                onClick: toggleDetailHandler,
            },
        ];
        if (onDelete && deleteButtonText && (availableActions.update && availableActions.delete)) {
            menu.push({
                key: 'delete',
                children: deleteButtonText,
                disabled: deleteDisabled,
                onClick: deleteDetailHandler,
            });
        }

        return menu;
    }, [ onDelete, deleteButtonText, deleteDisabled, availableActions ]);
    const renderContent = useMemo(() => {
        const node = <>{children}</>;
        if (formProps) {
            return (
                <Form
                    {...formProps}
                >
                    {node}
                </Form>
            );
        }

        return node;
    }, [ children, formProps ]);

    return (
        <>
            <Drawer
                id={`${modelKey}-${detailId}-detailDrawer`}
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
                actionBarProps={{
                    id: `${modelKey}-${detailId}-detailDrawer-actionBar`,
                    menu: actionBarMenu
                }}
                headerNode={
                    <>
                        {isDesktop && (
                            <Breadcrumbs
                                withDetailLink
                                sx={{
                                    mb: 2,
                                }}
                            />
                        )}
                        <Typography
                            component="header"
                            variant="h3"
                        >
                            {title}
                        </Typography>
                    </>
                }
                headerSx={{
                    flexDirection: 'column',
                }}
                {...rest}
            >
                <Box
                    sx={{ p: 2 }}
                    children={renderContent}
                />
            </Drawer>
        </>
    );
};

export default DetailDrawer;
