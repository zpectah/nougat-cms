import { Themes, ViewTypes, RouteParamKeys } from '../enums';

export type themeKeyType = keyof typeof Themes;
export type viewLayoutKeyType = keyof typeof ViewTypes;
export type routeParamKeyType = keyof typeof RouteParamKeys;

export type toastItemType = {
    id?: string | number;
    title: string;
    content?: string;
    context?: 'info' | 'success' | 'error';
    timeout?: number;
    onRemove?: (id: string) => void;
};

export type routeItemType = {
    key: string,
    i18n_key?: string,
    match: string,
    path: string | null,
    auth: boolean,
    level?: number,
};

export type routesType = { [k: string]: routeItemType };
