import React from 'react';

import {
    themeKeyType,
    toastItemType,
    routeItemType,
    entityItemProps,
} from '../types';

export type storeProps = {
    sidebar: boolean,
    language: string,
    theme: themeKeyType,
    toasts: toastItemType[],
    announcementBanner: React.ReactNode | null,
    route: routeItemType | null,
    entity: entityItemProps | null,
};
