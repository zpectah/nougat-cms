<?php

const WEB_VIEWS_ROOT = ROOT_PATH . __CONSTANTS['APP']['web']['folder'] . '/' . __CONSTANTS['APP']['web']['views'];
const WEB_VIEWS_COMPILED = __CONSTANTS['APP']['web']['views_compiled'];
const ROUTES = [
    'layout' => [
        'default' => [
            'key' => 'layoutDefault',
            'template' => 'layout.default',
        ],
        'minimal' => [
            'key' => 'layoutMinimal',
            'template' => 'layout.minimal',
        ],
    ],
    'page' => [
        'default' => [
            'key' => 'pageDefault',
            'template' => 'page.default',
            'layout' => 'default',
        ],
        'error.404' => [
            'key' => 'pageError404',
            'template' => 'page.error404',
            'layout' => 'minimal',
        ],
        'home' => [
            'key' => 'pageHome',
            'template' => 'page.home',
            'layout' => 'default',
        ],
        'category' => [
            'key' => 'pageCategory',
            'template' => 'page.category',
            'layout' => 'default',
        ],
        'detail' => [
            'key' => 'pageDetail',
            'template' => 'page.detail',
            'layout' => 'default',
        ],
        'results' => [
            'key' => 'pageResults',
            'template' => 'page.results',
            'layout' => 'default',
        ],
        'profile' => [
            'key' => 'pageProfile',
            'template' => 'page.profile',
            'layout' => 'default',
        ],
        'registration' => [
            'key' => 'pageRegistration',
            'template' => 'page.registration',
            'layout' => 'default',
        ],
        'lost-password' => [
            'key' => 'pageLostPassword',
            'template' => 'page.lost-password',
            'layout' => 'default',
        ],
    ],
];
