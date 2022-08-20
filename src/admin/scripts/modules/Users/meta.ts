import {
    Common,
    UsersTypeKeys,
    UsersGroupKeys,
    UsersLevelKeys,
} from '../../enums';
import { UsersItemProps } from '../../types';

export const newUsersModel: UsersItemProps = {
    id: Common['new'],
    type: UsersTypeKeys['default'],
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    nickname: '',
    user_group: UsersGroupKeys['default'],
    user_meta: '{}',
    user_level: UsersLevelKeys['redactor'],
    active: true,
};
