import React from 'react';

import { themeKeyType, toastItemType } from '../types';

export type storeProps = {
    sidebar: boolean,
    language: string,
    theme: themeKeyType,
    toasts: toastItemType[],
    announcementBanner: React.ReactNode | null,
};
