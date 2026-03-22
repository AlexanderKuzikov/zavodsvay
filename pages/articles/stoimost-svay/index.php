<?php
$title = "Стоимость винтовых свай";
$meta_description = "От чего зависит цена на винтовые сваи.";
$canonical = "https://zavodsvay.ru/articles/stoimost-svay/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
