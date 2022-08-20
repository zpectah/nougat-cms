import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { RouteParamKeys } from '../../../enums';
import { useRoutes } from '../../../hooks';
import { modelKeyType, commonItemModelProps } from '../../../types';

type DataTableBaseProps = {
    pathPrefix: string,
    modelKey: modelKeyType,
    onRowDelete?: (payload: number) => void,
    rowActions?: any,
    items?: commonItemModelProps[],
    onReload: () => void,
}
export type DataTableProps = DataTableBaseProps

const DataTable = (props: DataTableProps) => {
    const {
        pathPrefix,
        modelKey,
        onRowDelete,
        rowActions,
        items = [],
        onReload,
    } = props;

    const { t } = useTranslation([ 'common' ]);
    const { navigate } = useRoutes();

    const openDetailHandler = (id: number) => navigate(`${pathPrefix}${RouteParamKeys['detail']}/${id}`);
    const deleteRowHandler = (id: number) => {
        if (onRowDelete && id) onRowDelete(id);
    };
    
    return (
        <>
            <button
                onClick={() => onReload && onReload()}
            >
                {t('btn.reload')}
            </button>
            <div>
                DataTable with routing to detail as drawer ... {modelKey}
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
                    {JSON.stringify(items, null, 2)}
                </div>
                <div>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <button
                            onClick={() => openDetailHandler(3)}
                        >
                            go to detail #3
                        </button>
                        <button
                            onClick={() => deleteRowHandler(3)}
                        >
                            delete #3
                        </button>
                    </Box>
                    <br />
                    <button
                        onClick={() => openDetailHandler(77)}
                    >
                        go to detail #77
                    </button>
                    <br />
                    <button
                        onClick={() => openDetailHandler(100)}
                    >
                        go to detail #100
                    </button>
                </div>
            </div>
        </>
    );
};

export default DataTable;
