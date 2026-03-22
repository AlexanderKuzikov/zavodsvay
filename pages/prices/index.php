<?php
$title = "Цены на винтовые сваи и монтаж — Гефест";
$meta_description = "Актуальные цены на винтовые сваи и услуги монтажа. Прайс-лист 2026.";
$canonical = "https://zavodsvay.ru/prices/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/main.php';
