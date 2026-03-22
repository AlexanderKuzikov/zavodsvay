<?php
$title = "Статьи о винтовых сваях — Гефест";
$meta_description = "Полезные статьи о винтовых сваях, фундаментах и монтаже.";
$canonical = "https://zavodsvay.ru/articles/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/main.php';
