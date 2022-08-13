import React from 'react';

import { themeKeyType, toastItemType, routeItemType } from '../types';

export type storeProps = {
    sidebar: boolean,
    language: string,
    theme: themeKeyType,
    toasts: toastItemType[],
    announcementBanner: React.ReactNode | null,
    meta: any, // TODO
    route: routeItemType | null,
};
