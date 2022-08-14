<?php
require_once ROOT_PATH . 'vendor/autoload.php';

require_once ROOT_PATH . 'config/index.php';
require_once ROOT_PATH . 'config/constants.php';

// core:controller:web
require ROOT_PATH . 'core/controller/web/WebRouteController.php';
require ROOT_PATH . 'core/controller/web/WebViewController.php';

// core:controller:admin
require ROOT_PATH . 'core/controller/admin/AdminViewController.php';

// core:model
require ROOT_PATH . 'core/model/Users.php';

// core:provider
require ROOT_PATH . 'core/provider/DataProvider.php';
require ROOT_PATH . 'core/provider/GraphQlProvider.php';

// core:service

