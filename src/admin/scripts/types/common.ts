import {
    Themes,
    ViewTypes,
    RouteParamKeys,
    ToastContextKeys,
} from '../enums';

export type themeKeyType = keyof typeof Themes;

export type viewLayoutKeyType = keyof typeof ViewTypes;

export type routeParamKeyType = keyof typeof RouteParamKeys;

export type toastItemContextType = keyof typeof ToastContextKeys;
export type toastItemType = {
    id?: string | number;
    title: string;
    content?: string;
    context?: toastItemContextType;
    timeout?: number;
    onRemove?: (id: string) => void;
};

export type routeItemType = {
    key: string,
    name?: string,
    match: string,
    path: string | null,
    auth: boolean,
    level?: number,
    detail?: boolean,
};

export type routesType = { [k: string]: routeItemType };
