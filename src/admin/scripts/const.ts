import { themeKeyType } from './types';

export const API_BASE = '/api/';

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

export const TRANSITION_DURATION = '.225s';
export const TRANSITION_TRANSITION = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const TRANSITION_DEFAULT_SUFFIX = `${TRANSITION_DURATION} ${TRANSITION_TRANSITION} 0s`;

export const HEADER_HEIGHT = '60px';
export const HEADER_ZINDEX = 1100;
export const SIDEBAR_WIDTH = '250px';
export const FOOTER_HEIGHT = '60px';

export const TOASTS_DESKTOP_WIDTH = '250px';
export const TOASTS_TABLET_WIDTH = '325px';
export const TOASTS_WRAPPER_ZINDEX = 1990;
export const TOAST_DEFAULT_TIMEOUT = 3500;
export const TOAST_HIDE_TIMEOUT = 300;

export const EMAIL_REGEX = /^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|"[a-zA-Z0-9.+!% -]{1,64}")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]+)$/;
