import React from 'react';
import { useTranslation } from 'react-i18next';

import { Model } from '../../enums';
import { useEntity } from '../../hooks';
import {
    ViewHeading,
    ModelWrapper,
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
                        availableActions={actions}
                        disabled={!actions.create}
                    />
                )}
            />
            <ModelWrapper
                modelKey={model}
                availableActions={actions}
            />
        </>
    );
};

export default Users;
