import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { KEYS } from '../const';
import { LANGUAGE, THEME } from '../config';
import {
    storeProps,
    themeKeyType,
    toastItemType,
} from '../types';

const initialState: storeProps = {
    sidebar: localStorage.getItem(KEYS.APP_SIDEBAR) === 'true',
    language: localStorage.getItem(KEYS.APP_LANGUAGE) || LANGUAGE.default,
    theme: ((localStorage.getItem(KEYS.APP_THEME) === 'light' || localStorage.getItem(KEYS.APP_THEME) === 'dark') && localStorage.getItem(KEYS.APP_THEME) as themeKeyType) || THEME.default,
    toasts: [],
    announcementBanner: null,
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
    },
});

export default slice;
