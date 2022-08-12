<?php

namespace core\controller\admin;

class AdminViewController {

    public function get_document_data (): array {

        return [
            'scripts' => '/' . __CONSTANTS['APP']['admin']['folder'] . '/' . __CONSTANTS['APP']['admin']['scripts'] . '/index.js',
            'meta' => [
                'title' => __CONSTANTS['CMS']['document']['meta']['title'],
                'description' => __CONSTANTS['CMS']['document']['meta']['description'],
                'robots' => __CONSTANTS['CMS']['document']['meta']['robots'],
                'keywords' => __CONSTANTS['CMS']['document']['meta']['keywords'],
                'author' => __CONSTANTS['CMS']['document']['meta']['author'],
                'charset' => __CONSTANTS['CMS']['document']['meta']['charset'],
                'viewport' => __CONSTANTS['CMS']['document']['meta']['viewport'],
                'lang' => __CONSTANTS['CMS']['document']['meta']['lang'],
                'url' => BASE_PATH,
                'theme_color' => __CONSTANTS['CMS']['color'],
            ],
        ];
    }

}

