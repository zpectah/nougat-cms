import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';

import { RouteParamKeys } from '../../enums';
import { modelKeyType, availableActionsProps } from '../../types';
import {
    useBreadcrumbs,
    useRoutes,
} from '../../hooks';
import { ConfirmDialog, ConfirmDialogProps } from '../ui';
import { DetailDrawer, DetailDrawerProps } from './DetailDrawer';
import { UsersDetailForm } from '../../modules/Users';
import { PostsDetailForm } from '../../modules/Posts';

type DataTableBaseProps = {
    model: modelKeyType,
    availableActions?: availableActionsProps,
    detailDrawerProps?: DetailDrawerProps,
    confirmDialogProps?: ConfirmDialogProps,
}
export type DataTableProps = DataTableBaseProps

const DataTable = (props: DataTableProps) => {
    const {
        model,
        availableActions = {
            toggle: false,
            create: false,
            update: false,
            delete: false,
        },
        detailDrawerProps,
        confirmDialogProps,
    } = props;

    const [ detailOpen, setDetailOpen ] = useState(false);
    const [ detailData, setDetailData ] = useState<any | null>(null); // TODO
    const [ confirmOpen, setConfirmOpen ] = useState(false);
    const [ confirmData, setConfirmData ] = useState<any[] | null>(null); // TODO

    const { detail } = useBreadcrumbs();
    const { routes, navigate } = useRoutes();

    const openDetailHandler = (id: string) => {

        // TODO ... check if detail exist in array, else show error toast and return to list ...
        setDetailData({
            id,
        });

        setDetailOpen(true);

    };
    const closeDetailHandler = () => {
        setDetailOpen(false);
        navigate(routes[model].path as string);
        setTimeout(() => setDetailData(null), 300);
    };
    const submitDetailHandler = () => {
        closeDetailHandler();
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

        closeConfirmHandler();
        // ... confirmed action from drawer
        // TODO ... proceed delete request

    };

    const renderDetailForm = useMemo(() => {
        switch (model) {

            case 'Users':
                return (
                    <UsersDetailForm />
                );

            case 'Posts':
                return (
                    <PostsDetailForm />
                );

            default:
                return (
                    <>no model selected</>
                );
        }
    }, []);

    useEffect(() => {
        if (detail) openDetailHandler(detail);
    }, [ detail ]);

    return (
        <Box>
            <div>
                DataTable with routing to detail as drawer ...
                <br />
                <p>
                    Odio leo rhoncus, ligula urna mauris nunc ut enim et tincidunt rhoncus at sem, dolor ut tellus sed porttitor dui vel. Ullamcorper varius, consectetur ornare id consequat id dolor id lacinia, venenatis a dui vel dolor auctor. Mauris ipsum, nibh maximus egestas consequat congue nulla cras dictum nec placerat, ut venenatis elit posuere nibh maximus. Ut venenatis placerat, sit amet elit libero sed suspendisse libero dui duis id, quis ut hendrerit donec dolor quis. Curabitur sem, metus vestibulum interdum commodo hendrerit in donec cursus, luctus mauris eu elementum luctus maximus. Dolor quis a lacinia, adipiscing et nullam fermentum imperdiet convallis nam, et condimentum pellentesque neque.
                    <br />
                    Porttitor condimentum, dolor sit amet cursus sollicitudin nunc mauris et elit condimentum, quis orci fusce nulla vitae. Lacinia quis, porttitor sapien euismod et elit ut id ante bibendum vel arcu, nunc quam metus ut. Non libero vitae, pellentesque curabitur hendrerit semper auctor ipsum potenti, auctor congue fringilla metus. Fusce dui, bibendum erat id sapien molestie aliquam at sem ornare, et vehicula finibus dui et tempus sed. Pulvinar nec commodo, vivamus elit nulla a nulla rhoncus phasellus luctus, dui adipiscing ut nisl mauris mi orci. Ac nibh semper, odio leo vestibulum bibendum sed felis scelerisque integer varius, curabitur proin imperdiet nibh.
                </p>
                <p>
                    Odio leo rhoncus, ligula urna mauris nunc ut enim et tincidunt rhoncus at sem, dolor ut tellus sed porttitor dui vel. Ullamcorper varius, consectetur ornare id consequat id dolor id lacinia, venenatis a dui vel dolor auctor. Mauris ipsum, nibh maximus egestas consequat congue nulla cras dictum nec placerat, ut venenatis elit posuere nibh maximus. Ut venenatis placerat, sit amet elit libero sed suspendisse libero dui duis id, quis ut hendrerit donec dolor quis. Curabitur sem, metus vestibulum interdum commodo hendrerit in donec cursus, luctus mauris eu elementum luctus maximus. Dolor quis a lacinia, adipiscing et nullam fermentum imperdiet convallis nam, et condimentum pellentesque neque.
                    <br />
                    Porttitor condimentum, dolor sit amet cursus sollicitudin nunc mauris et elit condimentum, quis orci fusce nulla vitae. Lacinia quis, porttitor sapien euismod et elit ut id ante bibendum vel arcu, nunc quam metus ut. Non libero vitae, pellentesque curabitur hendrerit semper auctor ipsum potenti, auctor congue fringilla metus. Fusce dui, bibendum erat id sapien molestie aliquam at sem ornare, et vehicula finibus dui et tempus sed. Pulvinar nec commodo, vivamus elit nulla a nulla rhoncus phasellus luctus, dui adipiscing ut nisl mauris mi orci. Ac nibh semper, odio leo vestibulum bibendum sed felis scelerisque integer varius, curabitur proin imperdiet nibh.
                </p>
                <br />
                <div>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <button
                            onClick={() => navigate(`${routes[model].path}/${RouteParamKeys['detail']}/3`)}
                        >
                            go to detail #3
                        </button>
                        <button
                            onClick={() => openConfirmHandler([ 3 ])}
                        >
                            delete #3
                        </button>
                    </Box>
                    <br />
                    <button
                        onClick={() => navigate(`${routes[model].path}/${RouteParamKeys['detail']}/77`)}
                    >
                        go to detail #77
                    </button>
                    <br />
                    <button
                        onClick={() => navigate(`${routes[model].path}/${RouteParamKeys['detail']}/100`)}
                    >
                        go to detail #100
                    </button>
                </div>
            </div>
            <DetailDrawer
                model={model}
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
                {detailData && (
                    <>
                        {/* render form by data model type */}
                        <pre>
                            <code>
                            {JSON.stringify(detailData, null, 2)}
                            </code>
                        </pre>
                        {renderDetailForm}
                    </>
                )}
            </DetailDrawer>
            <ConfirmDialog
                open={confirmOpen}
                onClose={closeConfirmHandler}
                onConfirm={confirmDeleteDetailHandler}
                title={`Delete ${model}`}
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

export default DataTable;
