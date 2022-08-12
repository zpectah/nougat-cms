// Get also all files from config folder
import { themeKeyType } from './types';

export const LANGUAGE = {
    default: 'en-US',
    list: [ 'en-US', 'cs-CZ' ],
};
export const THEME: { default: themeKeyType, list: themeKeyType[] } = {
    default: 'light',
    list: [ 'light', 'dark' ],
};
