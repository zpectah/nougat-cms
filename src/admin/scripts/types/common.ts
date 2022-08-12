export type themeKeyType = 'light' | 'dark';

export type toastItemType = {
    id?: string | number;
    title: string;
    content?: string;
    context?: 'info' | 'success' | 'error';
    timeout?: number;
    onRemove?: (id: string) => void;
};
