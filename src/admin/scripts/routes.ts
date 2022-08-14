import { paths } from './config';
import { routesType } from './types';

const routes: routesType = {
    Error404: {
        key: 'error-404',
        i18n_key: 'Error404',
        match: `${paths.root}/*`,
        path: null,
        auth: false,
        level: 0,
    },
    Login: {
        key: 'login',
        i18n_key: 'Login',
        match: `${paths.root}/login/`,
        path: `${paths.root}/login/`,
        auth: false,
        level: 0,
    },
    LostPassword: {
        key: 'lost-password',
        i18n_key: 'LostPassword',
        match: `${paths.root}/lost-password/`,
        path: `${paths.root}/lost-password/`,
        auth: false,
        level: 0,
    },
    Dashboard: {
        key: 'dashboard',
        i18n_key: 'Dashboard',
        match: `${paths.root}/`,
        path: `${paths.root}/`,
        auth: true,
        level: 3,
    },
    Settings: {
        key: 'settings',
        i18n_key: 'Settings',
        match: `${paths.root}/settings/*`,
        path: `${paths.root}/settings/`,
        auth: true,
        level: 7,
    },
    Profile: {
        key: 'profile',
        i18n_key: 'Profile',
        match: `${paths.root}/profile/`,
        path: `${paths.root}/profile/`,
        auth: true,
        level: 3,
    },
    Users: {
        key: 'users',
        i18n_key: 'Users',
        match: `${paths.root}/users/*`,
        path: `${paths.root}/users/`,
        auth: true,
        level: 7,
    },
};

export default routes;
