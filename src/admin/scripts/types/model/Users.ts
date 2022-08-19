export interface UsersItemProps {
    id: number | 'new',
    type: 'default',
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
