<?php
$title = "Винтовые сваи для забора";
$meta_description = "Применение винтовых свай для установки заборов.";
$canonical = "https://zavodsvay.ru/articles/svai-dlya-zabora/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
