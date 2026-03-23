<?php
$title = "Монтаж винтовых свай";
$meta_description = "Как производится монтаж винтовых свай.";
$canonical = "https://zavodsvay.ru/articles/montazh-svay/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
