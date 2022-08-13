export type themeKeyType = 'light' | 'dark';

export type viewLayoutKeyType = 'default' | 'minimal';

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
