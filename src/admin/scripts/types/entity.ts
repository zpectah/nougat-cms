import { UsersItemProps } from './model';

export interface entityItemProps extends UsersItemProps {
    user_meta: any, // TODO #type JSON object
    fullname: string,
}
