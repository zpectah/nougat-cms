<?php

namespace core\controller\web;

class WebRouteController {

    public function get_path (): array {
        $path_trimmed_request = ltrim($_SERVER['REDIRECT_URL'], "/");
        $path_array = explode( "/", $path_trimmed_request );
        unset($path_array[0]); // unset 'web/'
        unset($path_array[1]); // unset 'www/'
        $path_listed = array_values($path_array);
        $path_parsed = '/' . implode('/', $path_listed);

        return [
            'path' => [
                'raw' => $path_array,
                'listed' => $path_listed,
                'parsed' => $path_parsed,
            ],
        ];
    }

    public function get_location (): array {
        $path = self::get_path();

        $type = 'default'; // TODO
        $model = 'unknown'; // TODO
        $context = 'unknown'; // TODO

        return [
            'path' => $path['path'],
            'type' => $type,
            'model' => $model,
            'context' => $context,
        ];
    }

    public function get_route (): array {
        $location = self::get_location();

        $route = ROUTES['page']['default']; // TODO
        $layout = ROUTES['layout']['default']; // TODO
        $page = null; // TODO
        $detail = null; // TODO

        // Get route path
        // Returns route object by path ...

        return [
            'location' => $location,
            'route' => $route,
            'layout' => $layout,
            'page' => $page,
            'detail' => $detail,
        ];
    }

}