import { paths } from './config';
import { routesType } from './types';

const routes: routesType = {
    Error404: {
        key: 'error-404',
        name: 'Error404',
        match: `${paths.root}/*`,
        path: null,
        auth: false,
        level: 0,
    },
    Login: {
        key: 'login',
        name: 'Login',
        match: `${paths.root}/login`,
        path: `${paths.root}/login`,
        auth: false,
        level: 0,
    },
    LostPassword: {
        key: 'lost-password',
        name: 'LostPassword',
        match: `${paths.root}/lost-password/*`,
        path: `${paths.root}/lost-password`,
        auth: false,
        level: 0,
    },
    UiDemo: {
        key: 'ui-demo',
        name: 'UiDemo',
        match: `${paths.root}/ui-demo/*`,
        path: `${paths.root}/ui-demo`,
        auth: true,
        level: 3,
    },
    Dashboard: {
        key: 'dashboard',
        name: 'Dashboard',
        match: `${paths.root}/`,
        path: `${paths.root}/`,
        auth: true,
        level: 3,
    },
    Settings: {
        key: 'settings',
        name: 'Settings',
        match: `${paths.root}/settings/*`,
        path: `${paths.root}/settings`,
        auth: true,
        level: 7,
    },
    Profile: {
        key: 'profile',
        name: 'Profile',
        match: `${paths.root}/profile`,
        path: `${paths.root}/profile`,
        auth: true,
        level: 3,
    },
    Users: {
        key: 'users',
        name: 'Users',
        match: `${paths.root}/users/*`,
        path: `${paths.root}/users`,
        auth: true,
        detail: true,
        level: 7,
    },
    Posts: {
        key: 'posts',
        name: 'Posts',
        match: `${paths.root}/posts/*`,
        path: `${paths.root}/posts`,
        auth: true,
        detail: true,
        level: 3,
    },
};

export default routes;
