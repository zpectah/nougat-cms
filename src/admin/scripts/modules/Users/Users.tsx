import React from 'react';
import { useTranslation } from 'react-i18next';

import { Model } from '../../enums';
import { useEntity } from '../../hooks';
import {
    ViewHeading,
    DataTable,
    CreateButton,
} from '../../components';

const Users = () => {
    const { t } = useTranslation([ 'views' ]);
    const { entity } = useEntity();

    const model = Model['Users'];
    const actions = entity.availableActions[model];

    return (
        <>
            <ViewHeading
                title={t('views:Users.title')}
                subtitle={t('views:Users.subtitle')}
                withBreadcrumbs
                actions={(
                    <CreateButton
                        model={model}
                        disabled={!actions.create}
                    />
                )}
            />
            <DataTable
                model={model}
                availableActions={actions}
            />
        </>
    );
};

export default Users;
