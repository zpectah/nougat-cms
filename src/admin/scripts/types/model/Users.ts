import {
    UsersTypeKeys,
    UsersGroupKeys,
} from '../../enums';
import { modelIdType } from './common';

export type UsersTypesProps = keyof typeof UsersTypeKeys;
export type UsersGroupProps = keyof typeof UsersGroupKeys;

export interface UsersItemProps {
    id: modelIdType,
    type: UsersTypesProps,
    email: string,
    password?: string,
    firstname: string,
    lastname: string,
    nickname: string,
    user_group: UsersGroupProps,
    user_meta: string,
    user_level: number,
    active: boolean,
    deleted?: boolean,
}
