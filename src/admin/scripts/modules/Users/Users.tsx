import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';

import { Model } from '../../enums';
import { commonItemModelProps } from '../../types';
import { useEntity, useUsers } from '../../hooks';
import {
    ViewHeading,
    ModelWrapper,
    CreateButton,
} from '../../components';

const Users = () => {
    const { t } = useTranslation([ 'views' ]);
    const { entity } = useEntity();
    const {
        Users,
        loadUsers,
        createUsers,
        updateUsers,
        toggleUsers,
        deleteUsers,
    } = useUsers();

    const modelKey = Model['Users'];
    const actions = entity.availableActions[modelKey];

    const loadItemsHandler = () => {
        console.log('loadItemsHandler');
        loadUsers();
    };
    const createDetailHandler = (payload: commonItemModelProps) => {
        console.log('createDetailHandler', payload);
        createUsers();
    };
    const updateDetailHandler = (payload: commonItemModelProps) => {
        console.log('updateDetailHandler', payload);
        updateUsers();
    };
    const toggleDetailHandler = (payload: number[]) => {
        console.log('toggleDetailHandler', payload);
        toggleUsers();
    };
    const deleteDetailHandler = (payload: number[]) => {
        console.log('deleteDetailHandler', payload);
        deleteUsers();
    };

    useEffect(() => {
        loadItemsHandler();
    }, []);

    return (
        <>
            <ViewHeading
                title={t('views:Users.title')}
                subtitle={t('views:Users.subtitle')}
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
                items={Users}
                onReload={loadItemsHandler}
                onCreate={createDetailHandler}
                onUpdate={updateDetailHandler}
                onToggle={toggleDetailHandler}
                onDelete={deleteDetailHandler}
            />
        </>
    );
};

export default Users;
