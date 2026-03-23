<?php
$title = "Винтовые сваи — виды и применение";
$meta_description = "Виды винтовых свай и области их применения.";
$canonical = "https://zavodsvay.ru/articles/vintovye-svai/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
