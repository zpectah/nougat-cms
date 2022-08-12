<?php
const ROOT_PATH = '../../';
require ROOT_PATH . 'core/index.php';

$avc = new \core\controller\admin\AdminViewController();
$document = $avc -> get_document_data();
$meta = $document['meta'];
$no_js_text = __CONSTANTS['DEFAULTS']['no_js_text'];
$admin_root = __CONSTANTS['APP']['admin']['folder'] . '/';
?>
<!DOCTYPE html>
<html lang="<?=($meta['lang'])?>">
<head>
    <meta charset="<?=($meta['charset'])?>" />
    <title><?=($meta['title'])?></title>
    <meta name="viewport" content="<?=($meta['viewport'])?>" />
    <meta name="description" content="<?=($meta['description'])?>"/>
    <meta name="keywords" content="<?=($meta['keywords']) ?>" />
    <meta name="robots" content="<?=($meta['robots']) ?>" />
    <meta name="og:url" content="<?=($meta['url']) ?>" />
    <meta name="theme-color" content="<?=($meta['theme_color']) ?>" />
    <meta name="url" content="<?=(BASE_PATH)?><?=($admin_root)?>"/>
    <style>
        @media only screen and (max-width: 899px) {
            body.sidebar-open{ overflow: hidden !important; }
        }
    </style>
</head>
<body>
<noscript><?=($no_js_text)?></noscript>
<div id="root" style="width: 100%; height: 100%;"></div>
<script src="<?=($document['scripts'])?>?v=<?=(TIMESTAMP)?>"></script>
</body>
</html>
