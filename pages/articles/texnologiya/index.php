<?php
$title = "Технология производства винтовых свай — Гефест";
$meta_description = "Как производятся винтовые сваи. Технология и контроль качества.";
$canonical = "https://zavodsvay.ru/articles/texnologiya/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
