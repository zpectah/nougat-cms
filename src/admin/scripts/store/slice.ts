import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import config from '../config';
import { KEYS } from '../const';
import {
    storeProps,
    themeKeyType,
    toastItemType,
    routeItemType,
} from '../types';

const initialState: storeProps = {
    sidebar: localStorage.getItem(KEYS.APP_SIDEBAR) === 'true',
    language: localStorage.getItem(KEYS.APP_LANGUAGE) || config.constants.CMS.languages.default,
    theme: ((localStorage.getItem(KEYS.APP_THEME) === 'light' || localStorage.getItem(KEYS.APP_THEME) === 'dark') && localStorage.getItem(KEYS.APP_THEME) as themeKeyType) || config.constants.CMS.themes.default as themeKeyType,
    toasts: [],
    announcementBanner: null,
    route: null,
    meta: {}, // TODO
    // entity: {}, // TODO
};

const slice = createSlice({
    name: 'rootReducer',
    initialState,
    reducers: {
        sidebarToggle(state, action: PayloadAction<boolean>) {
            state.sidebar = action.payload;
        },
        languageToggle(state, action: PayloadAction<string>) {
            state.language = action.payload;
        },
        themeToggle(state, action: PayloadAction<themeKeyType>) {
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
        setMeta(state, action: PayloadAction<any>) {
            state.meta = action.payload;
        },
        setRoute(state, action: PayloadAction<routeItemType>) {
            state.route = action.payload;
        },
    },
});

export default slice;
