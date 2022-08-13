import config from './config';
import { routesType } from './types';

const adminPrefix = config.constants.APP.admin.path;
const routes: routesType = {
    Error404: {
        key: 'error-404',
        i18n_key: 'Error404',
        match: `${adminPrefix}/*`,
        path: null,
        auth: false,
        level: 0,
    },
    Login: {
        key: 'login',
        i18n_key: 'Login',
        match: `${adminPrefix}/login/`,
        path: `${adminPrefix}/login/`,
        auth: false,
        level: 0,
    },
    LostPassword: {
        key: 'lost-password',
        i18n_key: 'LostPassword',
        match: `${adminPrefix}/lost-password/`,
        path: `${adminPrefix}/lost-password/`,
        auth: false,
        level: 0,
    },
    Dashboard: {
        key: 'dashboard',
        i18n_key: 'Dashboard',
        match: `${adminPrefix}/`,
        path: `${adminPrefix}/`,
        auth: true,
        level: 3,
    },
    Settings: {
        key: 'settings',
        i18n_key: 'Settings',
        match: `${adminPrefix}/settings/*`,
        path: `${adminPrefix}/settings/`,
        auth: true,
        level: 7,
    },
    Profile: {
        key: 'profile',
        i18n_key: 'Profile',
        match: `${adminPrefix}/profile/*`,
        path: `${adminPrefix}/profile/`,
        auth: true,
        level: 3,
    },
};

export default routes;
