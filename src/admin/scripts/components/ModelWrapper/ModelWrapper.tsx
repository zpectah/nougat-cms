import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';

import {
    modelKeyType,
    availableActionsProps,
    commonItemModelProps,
    formProps,
} from '../../types';
import {
    useBreadcrumbs,
    useRoutes,
} from '../../hooks';
import { ConfirmDialog, ConfirmDialogProps } from '../ui';
import { DetailDrawer, DetailDrawerProps } from './DetailDrawer';
import { DataTable, DataTableProps } from './DataTable';
import { UsersDetailForm } from '../../modules/Users';
import { PostsDetailForm } from '../../modules/Posts';

type ModelWrapperBaseProps = {
    modelKey: modelKeyType,
    items?: commonItemModelProps[],
    availableActions?: availableActionsProps,
    detailDrawerProps?: DetailDrawerProps,
    confirmDialogProps?: ConfirmDialogProps,
    defaultValues?: commonItemModelProps,
    formProps?: formProps,
    dataTableProps?: DataTableProps,
}
export type ModelWrapperProps = ModelWrapperBaseProps

const ModelWrapper = (props: ModelWrapperProps) => {
    const {
        modelKey,
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
    } = props;

    const form = useForm({
        mode: 'all',
        defaultValues,
        ...formProps,
    });
    const { detail } = useBreadcrumbs();
    const { routes, navigate } = useRoutes();

    const formValues = form.watch();
    const control = form.control;

    const [ detailOpen, setDetailOpen ] = useState(false);
    const [ detailData, setDetailData ] = useState<commonItemModelProps | null>(null);
    const [ confirmOpen, setConfirmOpen ] = useState(false);
    const [ confirmData, setConfirmData ] = useState<number[] | null>(null);

    /* Detail handler */
    const openDetailHandler = (id: string) => {

        // TODO ... check if detail exist in array, else show error toast and return to list ...
        setDetailData({
            id,
        });

        setDetailOpen(true);

    };
    const closeDetailHandler = () => {
        setDetailOpen(false);
        navigate(routes[modelKey].path as string);
        setTimeout(() => setDetailData(null), 300);
    };
    const submitDetailHandler = () => {
        closeDetailHandler();
    };

    /* Confirm delete handler */
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

        closeConfirmHandler();
        // ... confirmed action from drawer
        // TODO ... proceed delete request

    };

    const renderDetailForm = useMemo(() => {
        switch (modelKey) {

            case 'Users':
                return (
                    <UsersDetailForm
                        form={form}
                    />
                );

            case 'Posts':
                return (
                    <PostsDetailForm
                        form={form}
                    />
                );

            default:
                return (
                    <>no model selected</>
                );
        }
    }, [ modelKey, control, formValues ]);

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
                {...dataTableProps}
            />
            <DetailDrawer
                modelKey={modelKey}
                open={detailOpen}
                detailId={detailData?.id}
                onClose={closeDetailHandler}
                onSubmit={submitDetailHandler}
                onDelete={openConfirmHandler}
                title="Some detail title"
                formProps={{
                    id: 'FormDetailName',
                    name: 'FormDetailName',
                }}
                availableActions={availableActions}
                {...detailDrawerProps}
            >
                {detailData ? (
                    <>{renderDetailForm}</>
                ) : (
                    <>error message (no data)</>
                )}
            </DetailDrawer>
            <ConfirmDialog
                open={confirmOpen}
                onClose={closeConfirmHandler}
                onConfirm={confirmDeleteDetailHandler}
                title={`Delete ${modelKey}`}
                content={
                    <>
                        Do you want to delete this {JSON.stringify(confirmData, null, 2)}?
                    </>
                }
                {...confirmDialogProps}
            />
        </Box>
    );
};

export default ModelWrapper;
