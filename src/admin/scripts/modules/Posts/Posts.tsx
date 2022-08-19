import React from 'react';
import { useTranslation } from 'react-i18next';

import { Model } from '../../enums';
import { useEntity } from '../../hooks';
import {
    ViewHeading,
    ModelWrapper,
    CreateButton,
} from '../../components';

const Posts = () => {
    const { t } = useTranslation([ 'views' ]);
    const { entity } = useEntity();

    const model = Model['Posts'];
    const actions = entity.availableActions[model];

    return (
        <>
            <ViewHeading
                title={t('views:Posts.title')}
                subtitle={t('views:Posts.subtitle')}
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

export default Posts;
