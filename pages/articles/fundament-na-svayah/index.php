<?php
$title = "Фундамент на винтовых сваях";
$meta_description = "Преимущества фундамента на винтовых сваях.";
$canonical = "https://zavodsvay.ru/articles/fundament-na-svayah/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
