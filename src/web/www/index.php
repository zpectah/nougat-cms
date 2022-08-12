<?php
const ROOT_PATH = '../../';
require ROOT_PATH . 'core/index.php';

$wvc = new \core\controller\web\WebViewController();
$document = $wvc -> get_document_data();
$no_js_text = __CONSTANTS['DEFAULTS']['no_js_text'];
?>
<!DOCTYPE html>
<html lang="<?=($document['meta']['lang'])?>">
<head>
    <meta charset="<?=($document['meta']['charset'])?>" />
    <title><?=($document['meta']['title'])?></title>
    <meta name="viewport" content="<?=($document['meta']['viewport'])?>" />
    <meta name="description" content="<?=($document['meta']['description'])?>"/>
    <meta name="keywords" content="<?=($document['meta']['keywords']) ?>" />
    <meta name="robots" content="<?=($document['meta']['robots']) ?>" />
    <meta name="og:url" content="<?=($document['meta']['url']) ?>" />
    <meta name="theme-color" content="<?=($document['meta']['theme_color']) ?>" />
    <meta name="url" content="<?=(BASE_PATH)?>"/>
    <link rel="stylesheet" href="<?=($document['styles'])?>?v=<?=(TIMESTAMP)?>" />
    <link rel="manifest" href="./manifest.json" />
</head>
<body>
<div id="root">
    <noscript><?=($no_js_text)?></noscript>
    <?php $wvc -> render(); ?>
</div>
<script src="<?=($document['scripts'])?>?v=<?=(TIMESTAMP)?>"></script>
</body>
</html>
