import { themeKeyType } from './types';

export const TOAST_DEFAULT_TIMEOUT = 3500;

export const API_BASE_PATH = '/api/';

export const KEYS = {
    APP_SIDEBAR: 'APP.SIDEBAR',
    APP_LANGUAGE: 'APP.LANGUAGE',
    APP_THEME: 'APP.THEME',
};

export const LANGUAGE = {
    default: 'en-US',
    list: [ 'en-US', 'cs-CZ' ],
};
export const THEME: { default: themeKeyType, list: themeKeyType[] } = {
    default: 'light',
    list: [ 'light', 'dark' ],
};
