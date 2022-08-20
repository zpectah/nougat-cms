import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';
import { cloneDeep } from 'lodash';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import {
    modelKeyType,
    availableActionsProps,
    commonItemModelProps,
    formProps,
    modelIdType,
} from '../../types';
import {
    useBreadcrumbs,
    useRoutes,
    useToasts,
} from '../../hooks';
import { ConfirmDialog, ConfirmDialogProps } from '../ui';
import { DetailDrawer, DetailDrawerProps } from './DetailDrawer';
import { DataTable, DataTableProps } from './DataTable';
import { UsersDetail } from '../../modules/Users';
import { PostsDetail } from '../../modules/Posts';

type ModelWrapperBaseProps = {
    modelKey: modelKeyType,
    id?: string,
    items?: commonItemModelProps[],
    availableActions?: availableActionsProps,
    detailDrawerProps?: DetailDrawerProps,
    confirmDialogProps?: ConfirmDialogProps,
    defaultValues?: commonItemModelProps,
    formProps?: formProps,
    dataTableProps?: DataTableProps,
    onReload: () => void,
    onCreate: (payload: commonItemModelProps) => void,
    onUpdate: (payload: commonItemModelProps) => void,
    onToggle: (payload: number[]) => void,
    onDelete: (payload: number[]) => void,
}
export type ModelWrapperProps = ModelWrapperBaseProps

const ModelWrapper = (props: ModelWrapperProps) => {
    const {
        modelKey,
        id = 'ModelWrapper',
        items = [],
        availableActions = {
            toggle: false,
            create: false,
            update: false,
            delete: false,
        },
        detailDrawerProps,
        confirmDialogProps,
        defaultValues,
        formProps,
        dataTableProps,
        onReload,
        onCreate,
        onUpdate,
        onToggle,
        onDelete,
    } = props;

    const form = useForm({
        mode: 'all',
        defaultValues,
        ...formProps,
    });
    const { t } = useTranslation([ 'common', 'messages', 'components' ]);
    const { detail } = useBreadcrumbs();
    const { routes, navigate } = useRoutes();
    const {
        createSuccessToast,
        createErrorToast,
    } = useToasts();

    const formValues = form.watch();
    const control = form.control;
    const handleSubmit = form.handleSubmit;

    const [ detailOpen, setDetailOpen ] = useState(false);
    const [ detailData, setDetailData ] = useState<commonItemModelProps | null>(null);
    const [ confirmOpen, setConfirmOpen ] = useState(false);
    const [ confirmData, setConfirmData ] = useState<number[] | null>(null);

    /* Detail handler */
    const openDetailHandler = (id: modelIdType) => {
        // const master = cloneDeep({});
        let detail = null;
        if (id === 'new') {

        } else {
            // TODO: find
            items.map((item) => {});
        }

        // TODO ... check if detail exist in array, else show error toast and return to list ...
        setDetailData({
            id,
            name: 'detail-item-name',
        });

        setDetailOpen(true);

    };
    const closeDetailHandler = () => {
        setDetailOpen(false);
        navigate(routes[modelKey].path as string);
        setTimeout(() => setDetailData(null), 250);
    };
    const submitDetailHandler = (formData: commonItemModelProps) => {
        const master = cloneDeep(formData);
        if (detailData?.id === 'new') {
            onCreate(master);
            createSuccessToast({
                title: t('messages:createItemSuccess', { item: t(`plurals.${modelKey}`, { count: 1 }) }),
            });
        } else if (detailData?.id) {
            onUpdate(master);
            createSuccessToast({
                title: t('messages:updateItemSuccess', { item: t(`plurals.${modelKey}`, { count: 1 }) }),
            });
        } else {
            createErrorToast({
                title: t('messages:submitDetailError'),
            });
        }
        closeDetailHandler();
    };
    const toggleDetailHandler = (payload: number[]) => {
        const master = cloneDeep(payload);
        onToggle(master);
        createSuccessToast({
            title: t('messages:updateItemSuccess', { item: t(`plurals.${modelKey}`, { count: master.length }) }),
        });
    };
    const openConfirmHandler = (payload?: any[]) => {
        if (payload) {
            setConfirmData(payload);
        } else {
            setConfirmData([ detailData?.id ]);
        }
        setConfirmOpen(true);
    };
    const closeConfirmHandler = () => {
        setConfirmOpen(false);
        setConfirmData(null);
    };
    const confirmDeleteDetailHandler = () => {
        const master = cloneDeep(confirmData) as number[];
        onDelete(master);
        createSuccessToast({
            title: t('messages:deleteItemSuccess', { item: t(`plurals.${modelKey}`, { count: master.length }) }),
        });
        closeConfirmHandler();
        if (confirmOpen) closeDetailHandler();
    };

    const detailMeta = useMemo(() => {
        let title;
        if (detailData?.id === 'new') {
            title = t(`plurals.newItem`, { item: t(`plurals.${modelKey}`, { count: 1 }).toLowerCase(), count: 1 });
        } else {
            title = detailData?.name ? detailData?.name : `${modelKey} #${detailData?.id}`;
        }

        return {
            title,
        };
    }, [ modelKey, detailData ]);
    const confirmMeta = useMemo(() => {
        return {
            title: t('components:ModelWrapper.deleteConfirm.title', { item: t(`plurals.${modelKey}`, { count: 1 }).toLowerCase()}),
            content: t('components:ModelWrapper.deleteConfirm.content', { item: t('plurals.thisItem', { count: confirmData?.length })}),
        };
    }, [ modelKey, confirmData ]);
    const renderDetailForm = useMemo(() => {
        const commonDetailProps = {
            form,
        };
        switch (modelKey) {

            case 'Users':
                return (
                    <UsersDetail
                        {...commonDetailProps}
                    />
                );

            case 'Posts':
                return (
                    <PostsDetail
                        {...commonDetailProps}
                    />
                );

            default:
                return (
                    <>{t('messages.noModelSelected')}</>
                );
        }
    }, [ modelKey, control, formValues ]);
    const renderFormError = useMemo(() => {
        return (
            <>{t('messages:noDataError')}</>
        );
    }, []);

    const formInitialProps = {
        id,
        name: id,
        onSubmit: handleSubmit(submitDetailHandler),
    };

    useEffect(() => {
        if (detail) openDetailHandler(detail);
    }, [ detail ]);

    return (
        <Box>
            <DataTable
                modelKey={modelKey}
                pathPrefix={`${routes[modelKey].path}/`}
                items={items}
                onRowDelete={(id) => openConfirmHandler([ id ])}
                onReload={onReload}
                {...dataTableProps}
            />
            <DetailDrawer
                uid={`${modelKey}-${detailData?.id}`}
                modelKey={modelKey}
                open={detailOpen}
                detailId={detailData?.id}
                detailActive={detailData?.active}
                onClose={closeDetailHandler}
                onDelete={openConfirmHandler}
                onToggle={() => toggleDetailHandler([ detailData?.id ])}
                title={detailMeta.title}
                formProps={formInitialProps}
                availableActions={availableActions}
                {...detailDrawerProps}
            >
                {detailData ? renderDetailForm : renderFormError}
            </DetailDrawer>
            <ConfirmDialog
                open={confirmOpen}
                onClose={closeConfirmHandler}
                onConfirm={confirmDeleteDetailHandler}
                title={confirmMeta.title}
                content={confirmMeta.content}
                {...confirmDialogProps}
            />
        </Box>
    );
};

export default ModelWrapper;
