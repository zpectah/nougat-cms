import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import config from '../config';
import { KEYS, ROOT_REDUCER_KEY } from '../const';
import {
    storeProps,
    themeKeyType,
    toastItemType,
    routeItemType,
    entityItemProps,
} from '../types';

const initialState: storeProps = {
    sidebar: localStorage.getItem(KEYS.APP_SIDEBAR) === 'true',
    language: localStorage.getItem(KEYS.APP_LANGUAGE) || config.constants.CMS.languages.default,
    theme: ((localStorage.getItem(KEYS.APP_THEME) === 'light' || localStorage.getItem(KEYS.APP_THEME) === 'dark') && localStorage.getItem(KEYS.APP_THEME) as themeKeyType) || config.constants.CMS.themes.default as themeKeyType,
    toasts: [],
    announcementBanner: null,
    route: null,
    entity: null,
};

const slice = createSlice({
    name: ROOT_REDUCER_KEY,
    initialState,
    reducers: {
        sidebarToggle(state, action: PayloadAction<boolean>) {
            state.sidebar = action.payload;
        },
        languageToggle(state, action: PayloadAction<string>) {
            state.language = action.payload;
        },
        setTheme(state, action: PayloadAction<themeKeyType>) {
            state.theme = action.payload;
        },
        addToast(state, action: PayloadAction<toastItemType>) {
            state.toasts = [ action.payload, ...state.toasts ];
        },
        removeToast(state, action: PayloadAction<{ id: string }>) {
            state.toasts = state.toasts.filter((item: any) => {
                return item.id !== action.payload.id;
            });
        },
        setAnnouncement(state, action: PayloadAction<React.ReactNode | null>) {
            state.announcementBanner = action.payload;
        },
        setRoute(state, action: PayloadAction<routeItemType>) {
            state.route = action.payload;
        },
        setEntity(state, action: PayloadAction<entityItemProps>) {
            state.entity = action.payload;
        },
    },
});

export default slice;
