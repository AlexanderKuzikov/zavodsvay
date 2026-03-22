<?php
$title = "Монтаж свай своими руками";
$meta_description = "Можно ли установить винтовые сваи самостоятельно.";
$canonical = "https://zavodsvay.ru/articles/svoi-rukami/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
