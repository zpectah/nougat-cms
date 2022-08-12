<?php
require_once ROOT_PATH . 'config/db.php';

$CFG_ENV = json_decode(file_get_contents(ROOT_PATH . 'config/env.json'), true);
$CFG_ENVIRONMENTAL = json_decode(file_get_contents(ROOT_PATH . 'config/environmental.json'), true);
$CFG_GLOBAL = json_decode(file_get_contents(ROOT_PATH . 'config/global.json'), true);
$CFG_LOCALES = json_decode(file_get_contents(ROOT_PATH . 'config/locales.json'), true);
$CFG_OPTIONS = json_decode(file_get_contents(ROOT_PATH . 'config/options.json'), true);


/* ==== Environment constants ==== */
define("VERSION", $CFG_ENV['version']);
define("ENV", $CFG_ENV['environment']);
define("TIMESTAMP", $CFG_ENV['timestamp']);
define("DEBUG", $CFG_ENV['debug']);


/* ==== Configuration files ==== */
define("__META", $CFG_ENV['_meta']);
define("__CONSTANTS", $CFG_ENV['_constants']);
define("__ENV_META", $CFG_ENV); // Whole generated 'env.json' file
define("__ENVIRONMENTAL", $CFG_ENVIRONMENTAL[ENV]);
define("__GLOBAL", $CFG_GLOBAL);
define("__LOCALES", $CFG_LOCALES);
define("__OPTIONS", $CFG_OPTIONS);


/* ==== Common ==== */
const BASE_PATH = __ENVIRONMENTAL['base_path'];
const __PATHS = [
    'uploads' => ROOT_PATH . __CONSTANTS['APP']['uploads'],
    'logs' => ROOT_PATH . __CONSTANTS['APP']['logs'],
    'assets' => ROOT_PATH . __CONSTANTS['APP']['assets'],
];
const __LOCATIONS = [
    'uploads' => '/' . __CONSTANTS['APP']['uploads'],
    'logs' => '/' . __CONSTANTS['APP']['logs'],
];
const __KEYS = [
    'SESSION' => [],
    'COOKIES' => [],
];
const __TOKEN = [
    'SESSION' => [],
    'COOKIES' => [],
];


/* ==== Database ==== */
const __SQL = DB_ENV[ENV]['SQL'];
const __SQL_CONN = [
    __SQL['server'],
    __SQL['user'],
    __SQL['password'],
    __SQL['name'],
    __SQL['port'],
];


/* ==== Security ==== */
const PASSWORD_CRYPT_TYPE = PASSWORD_ARGON2ID;
const PASSWORD_CRYPT_OPTIONS = [
    'memory_cost' => 2048,
    'time_cost' => 4,
    'threads' => 3,
];


/* ==== Uploads ==== */


/* ==== Images ==== */


/* ==== GraphQl ==== */



