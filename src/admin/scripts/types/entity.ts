import { UsersItemProps } from './model';

export type availableActionsProps = {
    toggle: boolean,
    create: boolean,
    update: boolean,
    delete: boolean,
}

export type entityAvailableActionsProps = {
    common: availableActionsProps,
    Users: availableActionsProps,
    Posts: availableActionsProps,
}

export interface entityItemProps extends UsersItemProps {
    user_meta: any, // TODO #type JSON object
    fullname: string,
    availableActions: entityAvailableActionsProps,
}
