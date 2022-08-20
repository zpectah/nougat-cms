import React, { useMemo } from 'react';
import { merge } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

import { modelKeyType, availableActionsProps } from '../../../types';
import { Breadcrumbs } from '../../Breadcrumbs';
import {
    Drawer,
    Button,
    Form,
    Chip,
    DrawerProps,
    MenuItemProps,
    FormProps,
} from '../../ui';

type DetailDrawerBaseProps = {
    uid: string,
    modelKey: modelKeyType,
    detailId?: number | 'new',
    detailActive?: boolean,
    wmd?: string | number,
    wlg?: string | number,
    wxl?: string | number,
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
        uid,
        modelKey,
        detailId,
        detailActive,
        wmd = 'calc(100% - 100px)',
        wlg = 1000,
        wxl = 1200,
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
        md: wmd,
        lg: wlg,
        xl: wxl,
    };
    const submitButtonText = submitText ? submitText : t('btn.submit');
    const deleteButtonText = deleteText ? deleteText : t('btn.delete');

    const toggleDetailHandler = () => {
        if (detailId && onToggle) onToggle();
    };
    const deleteDetailHandler = () => {
        if (detailId && onDelete) onDelete();
    };

    const showSubmitButton = useMemo(() => (submitButtonText && (availableActions.create || availableActions.update)), [
        submitButtonText,
        availableActions,
    ]);
    const showDisabledChip = useMemo(() => (detailId !== 'new' && !detailActive), [ detailId, detailActive ]);
    const renderHeading = useMemo(() => {
        return (
            <>
                <Breadcrumbs
                    withDetailLink
                    onlyDesktop
                    sx={{
                        mb: 2,
                    }}
                />
                <Typography
                    component="header"
                    variant="h3"
                >
                    {title}
                    {showDisabledChip && (
                        <Chip
                            label={t('status.disabled')}
                            size="small"
                            sx={{ ml: 2 }}
                        />
                    )}
                </Typography>
            </>
        );
    }, [ title, showDisabledChip ]);
    const renderContent = useMemo(() => {
        return (
            <Box
                sx={{ p: 2 }}
            >
                <Form
                    key={`${uid}_form`}
                    {...formProps}
                >
                    {children}
                </Form>
            </Box>
        );
    }, [ children, formProps, uid ]);
    const actionBarMenu = useMemo(() => {
        const menu: MenuItemProps[] = [
            {
                key: 'toggle',
                children: detailActive ? t('btn.disable') : t('btn.active'),
                disabled: !availableActions.toggle || detailId === 'new',
                onClick: toggleDetailHandler,
            },
        ];
        if (onDelete && deleteButtonText && (availableActions.update && availableActions.delete)) {
            menu.push({
                key: 'delete',
                children: deleteButtonText,
                disabled: deleteDisabled || detailId === 'new',
                onClick: deleteDetailHandler,
            });
        }

        return menu;
    }, [
        onDelete,
        deleteButtonText,
        deleteDisabled,
        availableActions,
        detailActive,
    ]);
    const renderActions = useMemo(() => {
        return (
            <>
                <Button
                    secondary
                    onClick={onClose}
                    sx={{
                        width: {
                            xs: '50%',
                            md: '10rem',
                        },
                    }}
                >
                    {t('btn.cancel')}
                </Button>
                {showSubmitButton && (
                    <Button
                        submit={!!formProps?.name}
                        primary={!(!!formProps?.name)}
                        onClick={onSubmit && onSubmit}
                        form={formProps?.name}
                        disabled={submitDisabled}
                        sx={{
                            width: {
                                xs: '50%',
                                md: '10rem',
                            },
                        }}
                    >
                        {submitButtonText}
                    </Button>
                )}
            </>
        );
    }, [
        onClose,
        showSubmitButton,
        formProps,
        onSubmit,
        submitDisabled,
        submitButtonText,
    ]);

    return (
        <>
            <Drawer
                id={`${uid}-detailDrawer`}
                anchor="right"
                onClose={onClose}
                actions={renderActions}
                headerNode={renderHeading}
                actionBarProps={{
                    id: `${modelKey}-${detailId}-detailDrawer-actionBar`,
                    menu: actionBarMenu
                }}
                sx={merge(sx, {
                    width,
                    '& .MuiDrawer-paper': {
                        width,
                    },
                })}
                actionsSx={{
                    py: {
                        xs: 2,
                        md: 3,
                    },
                }}
                headerSx={{
                    flexDirection: 'column',
                }}
                scrollable
                {...rest}
            >
                {renderContent}
            </Drawer>
        </>
    );
};

export default DetailDrawer;
