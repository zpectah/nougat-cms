import { cloneDeep } from 'lodash';

import { modelKeyType } from '../../types';
import { newUsersModel } from '../../modules/Users/meta';
import { newPostsModel } from '../../modules/Posts/meta';

export const getEmptyModel = (modelKey: modelKeyType) => {
    const lib = {
        Blacklist: {},
        Categories: {},
        Comments: {},
        Members: {},
        Menu: {},
        MenuItems: {},
        Messages: {},
        Pages: {},
        Posts: newPostsModel,
        Requests: {},
        Tags: {},
        Translations: {},
        Uploads: {},
        Users: newUsersModel,
    };

    return cloneDeep(lib[modelKey]);
};
