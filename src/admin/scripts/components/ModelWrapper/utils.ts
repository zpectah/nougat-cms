import { cloneDeep } from 'lodash';

import { modelKeyType } from '../../types';
import { newUsersModel } from '../../modules/Users/meta';
import { newPostsModel } from '../../modules/Posts/meta';

export const getEmptyModel = (modelKey: modelKeyType) => {
    const lib = {
        Users: newUsersModel,
        Posts: newPostsModel,
    };

    return cloneDeep(lib[modelKey]);
};
