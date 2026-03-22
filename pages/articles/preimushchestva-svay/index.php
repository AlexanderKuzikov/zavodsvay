<?php
$title = "Преимущества винтовых свай";
$meta_description = "Почему стоит выбрать винтовые сваи.";
$canonical = "https://zavodsvay.ru/articles/preimushchestva-svay/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
