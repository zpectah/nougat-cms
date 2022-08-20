import { UsersTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type UsersTypesProps = keyof typeof UsersTypeKeys;

export interface UsersItemProps {
    id: modelIdType,
    type: UsersTypesProps,
    email: string,
    password?: string,
    firstname: string,
    lastname: string,
    nickname: string,
    user_group: string,
    user_meta: string,
    user_level: number,
    active: boolean,
    deleted?: boolean,
}
