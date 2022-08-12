<?php

namespace core\controller\web;

use eftec\bladeone\BladeOne;

class WebViewController {

    private function get_view_data (): array {
        $view_layout = 'layout.default';
        $view_data = [
            'page' => [
                'template' => 'page.default',
            ],
        ];

        return [
            'layout' => $view_layout,
            'data' => $view_data,
        ];
    }


    public function get_document_data (): array {

        return [
            'styles' => '/' . __CONSTANTS['APP']['web']['folder'] . '/' . __CONSTANTS['APP']['web']['styles'] . '/index.css',
            'scripts' => '/' . __CONSTANTS['APP']['web']['folder'] . '/' . __CONSTANTS['APP']['web']['scripts'] . '/index.js',
            'meta' => [
                'title' => __META['document']['meta']['title'], // Depends on ROUTE
                'description' => __META['document']['meta']['description'], // Depends on ROUTE
                'robots' => __META['document']['meta']['robots'], // Depends on ROUTE
                'keywords' => __META['document']['meta']['keywords'], // Depends on ROUTE
                'author' => __META['document']['meta']['author'], // Depends on ROUTE
                'charset' => __META['document']['meta']['charset'], // Depends on ROUTE
                'viewport' => __META['document']['meta']['viewport'], // Depends on ROUTE
                'lang' => __META['document']['meta']['lang'], // Depends on ROUTE
                'url' => '/', // Depends on ROUTE
                'theme_color' => __META['color'],
            ],
        ];
    }

    public function render () {
        $blade = new BladeOne(
            WEB_VIEWS_ROOT,
            WEB_VIEWS_COMPILED,
        );

        $view = self::get_view_data();

        echo $blade -> run(
            $view['layout'],
            $view['data'],
        );
    }

}
