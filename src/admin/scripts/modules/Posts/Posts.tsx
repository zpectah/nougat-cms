import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Model } from '../../enums';
import { commonItemModelProps } from '../../types';
import { useEntity, usePosts } from '../../hooks';
import {
    ViewHeading,
    ModelWrapper,
    CreateButton,
} from '../../components';

const Posts = () => {
    const { t } = useTranslation([ 'views' ]);
    const { entity } = useEntity();
    const {
        Posts,
        loadPosts,
        createPosts,
        updatePosts,
        togglePosts,
        deletePosts,
    } = usePosts();

    const modelKey = Model['Posts'];
    const actions = entity.availableActions[modelKey];

    const loadItemsHandler = () => {
        console.log('loadItemsHandler');
        loadPosts();
    };
    const createDetailHandler = (payload: commonItemModelProps) => {
        console.log('createDetailHandler', payload);
        createPosts();
    };
    const updateDetailHandler = (payload: commonItemModelProps) => {
        console.log('updateDetailHandler', payload);
        updatePosts();
    };
    const toggleDetailHandler = (payload: number[]) => {
        console.log('toggleDetailHandler', payload);
        togglePosts();
    };
    const deleteDetailHandler = (payload: number[]) => {
        console.log('deleteDetailHandler', payload);
        deletePosts();
    };

    useEffect(() => {
        loadItemsHandler();
    }, []);

    return (
        <>
            <ViewHeading
                title={t('views:Posts.title')}
                subtitle={t('views:Posts.subtitle')}
                withBreadcrumbs
                actions={(
                    <CreateButton
                        modelKey={modelKey}
                        availableActions={actions}
                        disabled={!actions.create}
                    />
                )}
            />
            <ModelWrapper
                modelKey={modelKey}
                availableActions={actions}
                items={Posts}
                onReload={loadItemsHandler}
                onCreate={createDetailHandler}
                onUpdate={updateDetailHandler}
                onToggle={toggleDetailHandler}
                onDelete={deleteDetailHandler}
            />
        </>
    );
};

export default Posts;
