<?php
const ROOT_PATH = '../';
require ROOT_PATH . 'core/index.php';

print_r(
    json_encode(
        [
            'meta' => __ENV_META,
        ], // TODO: create response by request
        JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    )
);
