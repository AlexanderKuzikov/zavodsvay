/**
 * init-structure.js
 * Создание структуры проекта zavodsvay
 * Запуск: node init-structure.js
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = __dirname;

// === Структура папок ===
const directories = [
  'layouts',
  'partials/components',
  'data/components',
  'pages/catalog',
  'pages/prices',
  'pages/document',
  'pages/montage',
  'pages/map',
  'pages/contacts',
  'pages/articles/texnologiya',
  'pages/articles/vintovye-svai',
  'pages/articles/fundament-na-svayah',
  'pages/articles/montazh-svay',
  'pages/articles/svai-dlya-zabora',
  'pages/articles/stroitelstvo-fundamenta',
  'pages/articles/raschet-svay',
  'pages/articles/vidy-svay',
  'pages/articles/preimushchestva-svay',
  'pages/articles/svoi-rukami',
  'pages/articles/stoimost-svay',
  'pages/articles/dostavka-svay',
  'pages/404',
  'assets/css',
  'assets/js',
  'assets/fonts',
  'assets/img/start',
  'tools/tinymce',
];

// === Файлы и их содержимое ===
const files = {
  // === КОРНЕВЫЕ ФАЙЛЫ ===
  '.gitignore': `/tools/tinymce/
/static/
*.log
.DS_Store
Thumbs.db
node_modules/
`,

  '.htaccess': `RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [L]

# Gzip сжатие
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# Кэширование статики
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>

# Защита файлов
<FilesMatch "\\.(json|md)$">
  Require all denied
</FilesMatch>
`,

  'index.php': `<?php
/**
 * Точка входа - роутер
 * Перенаправляет запросы на соответствующие страницы в /pages/
 */

$uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

// Убираем возможные query параметры
$uri = explode('?', $uri)[0];

// Главная страница
if ($uri === '' || $uri === 'index.php') {
    $page = __DIR__ . '/pages/index/index.php';
} else {
    $page = __DIR__ . '/pages/' . $uri . '/index.php';
}

if (file_exists($page)) {
    require $page;
} else {
    http_response_code(404);
    require __DIR__ . '/pages/404/index.php';
}
`,

  // === LAYOUTS ===
  'layouts/home.php': `<?php
/**
 * Layout для главной страницы (с splash screen)
 */
if (!isset($title)) $title = '';
if (!isset($meta_description)) $meta_description = '';
if (!isset($canonical)) $canonical = '';
if (!isset($content)) $content = '';
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title) ?></title>
    <link rel="stylesheet" href="/assets/css/template.css">
    <link rel="stylesheet" href="/assets/css/splash.css">
    <?php if (!empty($canonical)): ?>
    <link rel="canonical" href="<?= htmlspecialchars($canonical) ?>">
    <?php endif; ?>
    <?php if (!empty($meta_description)): ?>
    <meta name="description" content="<?= htmlspecialchars($meta_description) ?>">
    <?php endif; ?>
</head>
<body>

<?php include __DIR__ . '/../partials/splash.php'; ?>
<?php include __DIR__ . '/../partials/components/icons-svg.php'; ?>
<?php include __DIR__ . '/../partials/header.php'; ?>

<div class="main-layout-container">
    <?php include __DIR__ . '/../partials/sidebar.php'; ?>
    <main class="content-area">
        <?= $content ?>
    </main>
</div>

<?php include __DIR__ . '/../partials/footer.php'; ?>
<?php include __DIR__ . '/../partials/back-to-top.php'; ?>

<script src="/assets/js/template.js"></script>
</body>
</html>
`,

  'layouts/main.php': `<?php
/**
 * Основной layout (с sidebar)
 */
if (!isset($title)) $title = '';
if (!isset($meta_description)) $meta_description = '';
if (!isset($canonical)) $canonical = '';
if (!isset($content)) $content = '';
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title) ?></title>
    <link rel="stylesheet" href="/assets/css/template.css">
    <?php if (!empty($canonical)): ?>
    <link rel="canonical" href="<?= htmlspecialchars($canonical) ?>">
    <?php endif; ?>
    <?php if (!empty($meta_description)): ?>
    <meta name="description" content="<?= htmlspecialchars($meta_description) ?>">
    <?php endif; ?>
</head>
<body>

<?php include __DIR__ . '/../partials/components/icons-svg.php'; ?>
<?php include __DIR__ . '/../partials/header.php'; ?>

<div class="main-layout-container">
    <?php include __DIR__ . '/../partials/sidebar.php'; ?>
    <main class="content-area">
        <?= $content ?>
    </main>
</div>

<?php include __DIR__ . '/../partials/footer.php'; ?>
<?php include __DIR__ . '/../partials/back-to-top.php'; ?>

<script src="/assets/js/template.js"></script>
</body>
</html>
`,

  'layouts/wide.php': `<?php
/**
 * Layout без sidebar (для карты работ и других широких страниц)
 */
if (!isset($title)) $title = '';
if (!isset($meta_description)) $meta_description = '';
if (!isset($canonical)) $canonical = '';
if (!isset($content)) $content = '';
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title) ?></title>
    <link rel="stylesheet" href="/assets/css/template.css">
    <?php if (!empty($canonical)): ?>
    <link rel="canonical" href="<?= htmlspecialchars($canonical) ?>">
    <?php endif; ?>
    <?php if (!empty($meta_description)): ?>
    <meta name="description" content="<?= htmlspecialchars($meta_description) ?>">
    <?php endif; ?>
</head>
<body>

<?php include __DIR__ . '/../partials/components/icons-svg.php'; ?>
<?php include __DIR__ . '/../partials/header.php'; ?>

<div class="main-layout-container wide">
    <main class="content-area">
        <?= $content ?>
    </main>
</div>

<?php include __DIR__ . '/../partials/footer.php'; ?>
<?php include __DIR__ . '/../partials/back-to-top.php'; ?>

<script src="/assets/js/template.js"></script>
</body>
</html>
`,

  // === PARTIALS ===
  'partials/splash.php': `<?php
/**
 * Splash screen - только для главной страницы
 */
$splashCompany1 = $splashCompany1 ?? 'Завод винтовых свай';
$splashCompany2 = $splashCompany2 ?? '«Гефест»';
$splashSlogan = $splashSlogan ?? 'Производство и монтаж винтовых свай в Перми';
?>
<div id="splash-screen">
    <picture class="background-picture">
        <source media="(min-width: 1201px)"
                srcset="/assets/img/start/start-1600.webp 1600w,
                        /assets/img/start/start-1920.webp 1920w"
                sizes="100vw" type="image/webp">
        <source srcset="/assets/img/start/start-480.webp 480w,
                        /assets/img/start/start-600.webp 600w,
                        /assets/img/start/start-800.webp 800w,
                        /assets/img/start/start-1200.webp 1200w"
                sizes="100vw" type="image/webp">
        <img src="/assets/img/start/start-fallback.jpg" alt="" sizes="100vw">
    </picture>
    <img src="/assets/img/logocircletrans360.webp" alt="" class="logo">
    <div class="company-name-container">
        <p class="company-name-part1"><?= htmlspecialchars($splashCompany1) ?></p>
        <p class="company-name-part2"><?= htmlspecialchars($splashCompany2) ?></p>
    </div>
    <p class="slogan"><?= htmlspecialchars($splashSlogan) ?></p>
</div>
`,

  'partials/header.php': `<?php
/**
 * Шапка сайта с логотипом и навигацией
 */
$nav = json_decode(file_get_contents(__DIR__ . '/../data/components/nav.json'), true);
$currentUrl = $_SERVER['REQUEST_URI'] ?? '/';
?>
<header>
    <div class="header-content-wrapper">
        <div class="header-logo">
            <img src="/assets/img/logocircletrans180.webp" alt="Завод винтовых свай Гефест">
            <span>Завод винтовых свай<br>«Гефест»</span>
        </div>
        <button class="hamburger-menu-toggle" aria-label="Открыть меню">
            <span class="hamburger-icon"></span>
            <span class="hamburger-icon"></span>
            <span class="hamburger-icon"></span>
        </button>
        <nav>
            <ul>
                <?php foreach ($nav['items'] as $item): ?>
                <li>
                    <a href="<?= htmlspecialchars($item['url']) ?>"
                       <?= (isset($currentUrl) && $currentUrl === $item['url']) ? 'class="active"' : '' ?>>
                        <?= htmlspecialchars($item['label']) ?>
                    </a>
                </li>
                <?php endforeach; ?>
            </ul>
        </nav>
    </div>
</header>
`,

  'partials/sidebar.php': `<?php
/**
 * Сайдбар с контактами и меню статей
 */
?>
<aside class="sidebar">
    <?php include __DIR__ . '/components/icons-container.php'; ?>
    <?php include __DIR__ . '/components/contact-block.php'; ?>
    <?php include __DIR__ . '/components/sidebar-menu.php'; ?>
</aside>
`,

  'partials/footer.php': `<?php
/**
 * Подвал сайта
 */
$contacts = json_decode(file_get_contents(__DIR__ . '/../data/components/contacts.json'), true);
$footer = json_decode(file_get_contents(__DIR__ . '/../data/components/footer.json'), true);
?>
<footer>
    <div class="footer-content-wrapper">
        <div class="footer-nav">
            <ul>
                <?php foreach ($footer['links'] as $link): ?>
                <li><a href="<?= htmlspecialchars($link['url']) ?>"><?= htmlspecialchars($link['label']) ?></a></li>
                <?php endforeach; ?>
            </ul>
        </div>
        <div class="footer-social footer-info">
            <?php include __DIR__ . '/components/icons-container.php'; ?>
            <p>
                <a href="tel:<?= htmlspecialchars($contacts['phone']['href']) ?>"><?= htmlspecialchars($contacts['phone']['label']) ?></a><br>
                <a href="mailto:<?= htmlspecialchars($contacts['email']) ?>"><?= htmlspecialchars($contacts['email']) ?></a><br>
                <?= htmlspecialchars($contacts['address']) ?>
            </p>
        </div>
        <div class="footer-copyright">
            <p><?= htmlspecialchars($footer['copyright']) ?></p>
        </div>
    </div>
</footer>
`,

  'partials/back-to-top.php': `<button id="back-to-top" aria-label="Наверх">&#8679;</button>`,

  // === COMPONENTS ===
  'partials/components/icons-svg.php': `<!-- SVG Sprite с иконками -->
<svg style="display: none;">
    <symbol id="icon-phone" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </symbol>
    <symbol id="icon-telegram" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </symbol>
    <symbol id="icon-whatsapp" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </symbol>
    <symbol id="icon-vk" viewBox="0 0 24 24">
        <path d="M15.073 2H8.937C5.103 2 2 5.103 2 8.937v6.125C2 18.897 5.103 22 8.937 22h6.125C18.897 22 22 18.897 22 15.062V8.937C22 5.103 18.897 2 15.073 2zM17.88 15.82c.406.406.875.5 1.156.5h1.563c.469 0 .719-.25.75-.594.031-.313-.156-.656-.656-.906-.438-.219-1.344-.875-1.594-1.125-.219-.219-.188-.375 0-.75.188-.375 1.219-2.094 1.344-2.344.125-.25.063-.5-.313-.5h-1.75c-.438 0-.656.219-.813.469-.281.5-.75 1.281-1.062 1.594-.219.219-.313.281-.594.281-.125 0-.531-.063-1.031-.531-.469-.438-1.281-1.469-1.531-2.094-.125-.313-.25-.469-.594-.469h-1.75c-.5 0-.594.25-.594.5 0 .531.688 3.156 3.188 5.281 1.688 1.438 4.031 1.438 4.031 1.438h.5c.406 0 .625.125.75.25z"/>
    </symbol>
</svg>
`,

  'partials/components/icons-container.php': `<?php
/**
 * Контейнер с иконками мессенджеров
 */
$contacts = json_decode(file_get_contents(__DIR__ . '/../../data/components/contacts.json'), true);
?>
<div class="icons-container">
    <?php if (!empty($contacts['phone'])): ?>
    <a href="tel:<?= htmlspecialchars($contacts['phone']['href']) ?>" class="icon-link" aria-label="Позвонить">
        <svg aria-hidden="true"><use href="#icon-phone"></use></svg>
    </a>
    <?php endif; ?>
    <?php if (!empty($contacts['telegram'])): ?>
    <a href="<?= htmlspecialchars($contacts['telegram']['url']) ?>" class="icon-link" aria-label="Telegram" target="_blank" rel="noopener">
        <svg aria-hidden="true"><use href="#icon-telegram"></use></svg>
    </a>
    <?php endif; ?>
    <?php if (!empty($contacts['whatsapp'])): ?>
    <a href="<?= htmlspecialchars($contacts['whatsapp']['url']) ?>" class="icon-link" aria-label="WhatsApp" target="_blank" rel="noopener">
        <svg aria-hidden="true"><use href="#icon-whatsapp"></use></svg>
    </a>
    <?php endif; ?>
    <?php if (!empty($contacts['vk'])): ?>
    <a href="<?= htmlspecialchars($contacts['vk']['url']) ?>" class="icon-link" aria-label="VK" target="_blank" rel="noopener">
        <svg aria-hidden="true"><use href="#icon-vk"></use></svg>
    </a>
    <?php endif; ?>
</div>
`,

  'partials/components/contact-block.php': `<?php
/**
 * Блок контактов для сайдбара
 */
$contacts = json_decode(file_get_contents(__DIR__ . '/../../data/components/contacts.json'), true);
?>
<div class="contact-block">
    <p>
        <a href="tel:<?= htmlspecialchars($contacts['phone']['href']) ?>">
            <?= htmlspecialchars($contacts['phone']['label']) ?>
        </a>
    </p>
    <?php if (!empty($contacts['email'])): ?>
    <p>
        <a href="mailto:<?= htmlspecialchars($contacts['email']) ?>">
            <?= htmlspecialchars($contacts['email']) ?>
        </a>
    </p>
    <?php endif; ?>
    <p><?= htmlspecialchars($contacts['address']) ?></p>
</div>
`,

  'partials/components/sidebar-menu.php': `<?php
/**
 * Меню статей в сайдбаре
 */
$menu = json_decode(file_get_contents(__DIR__ . '/../../data/components/sidebar-menu.json'), true);
?>
<div class="sidebar-menu-title">
    <?= htmlspecialchars($menu['title']) ?>
</div>
<div class="sidebar-menu-list">
    <ul>
        <?php foreach ($menu['items'] as $item): ?>
        <li>
            <a href="<?= htmlspecialchars($item['url']) ?>">
                <?= htmlspecialchars($item['label']) ?>
            </a>
        </li>
        <?php endforeach; ?>
    </ul>
</div>
`,

  // === DATA / JSON ===
  'data/components/nav.json': `{
  "items": [
    { "label": "Каталог свай", "url": "/catalog/" },
    { "label": "Цены", "url": "/prices/" },
    { "label": "Техническая документация", "url": "/document/" },
    { "label": "Услуги монтажа", "url": "/montage/" },
    { "label": "Карта работ", "url": "/map/" },
    { "label": "Для новичков", "url": "/articles/" },
    { "label": "Контакты", "url": "/contacts/" }
  ]
}
`,

  'data/components/contacts.json': `{
  "phone": {
    "label": "+7 (342) 000-00-00",
    "href": "+73420000000"
  },
  "email": "info@zavodsvay.ru",
  "address": "г. Пермь, ул. Примерная, 1",
  "telegram": { "url": "https://t.me/zavodsvay" },
  "whatsapp": { "url": "https://wa.me/73420000000" },
  "vk": { "url": "https://vk.com/zavodsvay" }
}
`,

  'data/components/sidebar-menu.json': `{
  "title": "Статьи",
  "items": [
    { "label": "Технология производства", "url": "/articles/texnologiya/" },
    { "label": "Винтовые сваи", "url": "/articles/vintovye-svai/" },
    { "label": "Фундамент на сваях", "url": "/articles/fundament-na-svayah/" },
    { "label": "Монтаж свай", "url": "/articles/montazh-svay/" },
    { "label": "Сваи для забора", "url": "/articles/svai-dlya-zabora/" }
  ]
}
`,

  'data/components/footer.json': `{
  "links": [
    { "label": "Главная", "url": "/" },
    { "label": "Каталог", "url": "/catalog/" },
    { "label": "Цены", "url": "/prices/" },
    { "label": "Контакты", "url": "/contacts/" }
  ],
  "copyright": "© 2026 Завод винтовых свай «Гефест». Все права защищены."
}
`,

  // === PAGES ===
  'pages/index/index.php': `<?php
/**
 * Главная страница
 */
$title = "Винтовые сваи в Перми — Завод Гефест";
$meta_description = "Производство и монтаж винтовых свай в Перми. Фундаменты под ключ. Собственное производство. Гарантия качества.";
$canonical = "https://zavodsvay.ru/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/home.php';
`,

  'pages/index/content.html': `<h1>Завод винтовых свай «Гефест»</h1>

<p>Производство и монтаж винтовых свай в Перми и Пермском крае.</p>

<h2>Наши преимущества</h2>
<ul>
    <li>Собственное производство</li>
    <li>Монтаж в день доставки</li>
    <li>Гарантия на все виды работ</li>
    <li>Бесплатный выезд на объект</li>
</ul>

<h2>Продукция</h2>
<p>Мы производим винтовые сваи различных диаметров и длин для любых типов фундаментов.</p>
`,

  'pages/catalog/index.php': `<?php
$title = "Каталог винтовых свай — Гефест";
$meta_description = "Каталог винтовых свай от производителя. Все диаметры и длины. Доставка и монтаж.";
$canonical = "https://zavodsvay.ru/catalog/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/main.php';
`,

  'pages/catalog/content.html': `<h1>Каталог винтовых свай</h1>

<p>В нашем каталоге представлены винтовые сваи различных типоразмеров.</p>

<h2>Сваи серии ВСГ</h2>
<p>Винтовые сваи для фундаментов малоэтажных зданий.</p>

<h2>Сваи для заборов</h2>
<p>Оптимальное решение для установки ограждений.</p>
`,

  'pages/prices/index.php': `<?php
$title = "Цены на винтовые сваи и монтаж — Гефест";
$meta_description = "Актуальные цены на винтовые сваи и услуги монтажа. Прайс-лист 2026.";
$canonical = "https://zavodsvay.ru/prices/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/main.php';
`,

  'pages/prices/content.html': `<h1>Цены на винтовые сваи</h1>

<p>Стоимость свай и работ по монтажу.</p>

<h2>Прайс-лист</h2>
<table>
    <tr><th>Наименование</th><th>Цена</th></tr>
    <tr><td>ВСГ-1 89мм</td><td>от 1500 ₽</td></tr>
    <tr><td>ВСГ-1 108мм</td><td>от 2000 ₽</td></tr>
</table>
`,

  'pages/document/index.php': `<?php
$title = "Техническая документация — Гефест";
$meta_description = "Техническая документация на винтовые сваи. Сертификаты, ГОСТ, чертежи.";
$canonical = "https://zavodsvay.ru/document/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/main.php';
`,

  'pages/document/content.html': `<h1>Техническая документация</h1>

<p>Сертификаты, чертежи и техническая информация.</p>
`,

  'pages/montage/index.php': `<?php
$title = "Услуги монтажа винтовых свай — Гефест";
$meta_description = "Профессиональный монтаж винтовых свай. Монтаж в день доставки. Гарантия.";
$canonical = "https://zavodsvay.ru/montage/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/main.php';
`,

  'pages/montage/content.html': `<h1>Услуги монтажа</h1>

<p>Профессиональная установка винтовых свай.</p>

<h2>Этапы работ</h2>
<ol>
    <li>Выезд на объект</li>
    <li>Разметка и подготовка</li>
    <li>Монтаж свай</li>
    <li>Обвязка</li>
</ol>
`,

  'pages/map/index.php': `<?php
$title = "Карта выполненных работ — Гефест";
$meta_description = "Карта объектов с выполненными работами по монтажу винтовых свай.";
$canonical = "https://zavodsvay.ru/map/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/wide.php';
`,

  'pages/map/content.html': `<h1>Карта выполненных работ</h1>

<p>Раздел в разработке. Скоро здесь появится интерактивная карта наших объектов.</p>
`,

  'pages/contacts/index.php': `<?php
$title = "Контакты — Завод винтовых свай Гефест";
$meta_description = "Контактная информация завода винтовых свай Гефест. Адрес, телефон, мессенджеры.";
$canonical = "https://zavodsvay.ru/contacts/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/main.php';
`,

  'pages/contacts/content.html': `<h1>Контакты</h1>

<p>Свяжитесь с нами любым удобным способом.</p>

<h2>Адрес</h2>
<p>г. Пермь, ул. Примерная, 1</p>

<h2>Телефон</h2>
<p><a href="tel:+73420000000">+7 (342) 000-00-00</a></p>

<h2>Мессенджеры</h2>
<ul>
    <li><a href="https://t.me/zavodsvay">Telegram</a></li>
    <li><a href="https://wa.me/73420000000">WhatsApp</a></li>
    <li><a href="https://vk.com/zavodsvay">VK</a></li>
</ul>
`,

  'pages/articles/index.php': `<?php
$title = "Статьи о винтовых сваях — Гефест";
$meta_description = "Полезные статьи о винтовых сваях, фундаментах и монтаже.";
$canonical = "https://zavodsvay.ru/articles/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/main.php';
`,

  'pages/articles/content.html': `<h1>Статьи</h1>

<p>Полезная информация о винтовых сваях и фундаментах.</p>

<ul>
    <li><a href="/articles/texnologiya/">Технология производства</a></li>
    <li><a href="/articles/vintovye-svai/">Винтовые сваи</a></li>
    <li><a href="/articles/fundament-na-svayah/">Фундамент на сваях</a></li>
    <li><a href="/articles/montazh-svay/">Монтаж свай</a></li>
</ul>
`,

  'pages/articles/texnologiya/index.php': `<?php
$title = "Технология производства винтовых свай — Гефест";
$meta_description = "Как производятся винтовые сваи. Технология и контроль качества.";
$canonical = "https://zavodsvay.ru/articles/texnologiya/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/texnologiya/content.html': `<h1>Технология производства</h1>

<p>Описание процесса производства винтовых свай.</p>
`,

  'pages/articles/vintovye-svai/index.php': `<?php
$title = "Винтовые сваи — виды и применение";
$meta_description = "Виды винтовых свай и области их применения.";
$canonical = "https://zavodsvay.ru/articles/vintovye-svai/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/vintovye-svai/content.html': `<h1>Винтовые сваи</h1>

<p>Информация о видах винтовых свай.</p>
`,

  'pages/articles/fundament-na-svayah/index.php': `<?php
$title = "Фундамент на винтовых сваях";
$meta_description = "Преимущества фундамента на винтовых сваях.";
$canonical = "https://zavodsvay.ru/articles/fundament-na-svayah/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/fundament-na-svayah/content.html': `<h1>Фундамент на сваях</h1>

<p>Преимущества свайного фундамента.</p>
`,

  'pages/articles/montazh-svay/index.php': `<?php
$title = "Монтаж винтовых свай";
$meta_description = "Как производится монтаж винтовых свай.";
$canonical = "https://zavodsvay.ru/articles/montazh-svay/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/montazh-svay/content.html': `<h1>Монтаж свай</h1>

<p>Процесс установки винтовых свай.</p>
`,

  'pages/articles/svai-dlya-zabora/index.php': `<?php
$title = "Винтовые сваи для забора";
$meta_description = "Применение винтовых свай для установки заборов.";
$canonical = "https://zavodsvay.ru/articles/svai-dlya-zabora/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/svai-dlya-zabora/content.html': `<h1>Сваи для забора</h1>

<p>Оптимальное решение для ограждений.</p>
`,

  'pages/articles/stroitelstvo-fundamenta/index.php': `<?php
$title = "Строительство фундамента";
$meta_description = "Этапы строительства фундамента на винтовых сваях.";
$canonical = "https://zavodsvay.ru/articles/stroitelstvo-fundamenta/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/stroitelstvo-fundamenta/content.html': `<h1>Строительство фундамента</h1>

<p>Этапы работ.</p>
`,

  'pages/articles/raschet-svay/index.php': `<?php
$title = "Расчёт количества свай";
$meta_description = "Как рассчитать количество винтовых свай для фундамента.";
$canonical = "https://zavodsvay.ru/articles/raschet-svay/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/raschet-svay/content.html': `<h1>Расчёт свай</h1>

<p>Методика расчёта.</p>
`,

  'pages/articles/vidy-svay/index.php': `<?php
$title = "Виды винтовых свай";
$meta_description = "Обзор видов винтовых свай.";
$canonical = "https://zavodsvay.ru/articles/vidy-svay/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/vidy-svay/content.html': `<h1>Виды свай</h1>

<p>Классификация свай.</p>
`,

  'pages/articles/preimushchestva-svay/index.php': `<?php
$title = "Преимущества винтовых свай";
$meta_description = "Почему стоит выбрать винтовые сваи.";
$canonical = "https://zavodsvay.ru/articles/preimushchestva-svay/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/preimushchestva-svay/content.html': `<h1>Преимущества свай</h1>

<p>Основные плюсы технологии.</p>
`,

  'pages/articles/svoi-rukami/index.php': `<?php
$title = "Монтаж свай своими руками";
$meta_description = "Можно ли установить винтовые сваи самостоятельно.";
$canonical = "https://zavodsvay.ru/articles/svoi-rukami/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/svoi-rukami/content.html': `<h1>Монтаж своими руками</h1>

<p>Рекомендации для самостоятельного монтажа.</p>
`,

  'pages/articles/stoimost-svay/index.php': `<?php
$title = "Стоимость винтовых свай";
$meta_description = "От чего зависит цена на винтовые сваи.";
$canonical = "https://zavodsvay.ru/articles/stoimost-svay/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/stoimost-svay/content.html': `<h1>Стоимость свай</h1>

<p>Факторы ценообразования.</p>
`,

  'pages/articles/dostavka-svay/index.php': `<?php
$title = "Доставка винтовых свай";
$meta_description = "Условия доставки винтовых свай.";
$canonical = "https://zavodsvay.ru/articles/dostavka-svay/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../../layouts/main.php';
`,

  'pages/articles/dostavka-svay/content.html': `<h1>Доставка свай</h1>

<p>Информация о доставке.</p>
`,

  'pages/404/index.php': `<?php
/**
 * Страница 404
 */
http_response_code(404);
$title = "Страница не найдена — Завод винтовых свай Гефест";
$meta_description = "Страница не найдена. Вернитесь на главную или воспользуйтесь меню.";
$canonical = "https://zavodsvay.ru/404/";

ob_start();
readfile(__DIR__ . '/content.html');
$content = ob_get_clean();

include __DIR__ . '/../../layouts/main.php';
`,

  'pages/404/content.html': `<h1>Страница не найдена</h1>

<p>Возможно, страница была перемещена или удалена.</p>

<p><a href="/">Вернуться на главную</a></p>
`,

  // === ASSETS (заглушки) ===
  'assets/css/template.css': `/* Template CSS - заглушка */
/* Перенесите сюда content из svai-gefest.ru */

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Open Sans', sans-serif; line-height: 1.6; }
a { color: #333; text-decoration: none; }
header, footer { background: #f5f5f5; padding: 20px; }
main { padding: 20px; }
`,

  'assets/css/splash.css': `/* Splash Screen CSS - заглушка */
/* Перенесите сюда content из svai-gefest.ru */

#splash-screen { 
    position: fixed; 
    top: 0; left: 0; 
    width: 100%; height: 100%; 
    background: #000; 
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
`,

  'assets/js/template.js': `// Template JS - заглушка
// Перенесите сюда content из svai-gefest.ru

document.addEventListener('DOMContentLoaded', function() {
    console.log('Template loaded');
});
`,

  // === TOOLS ===
  'tools/editor.html': `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Редактор контента</title>
    <script src="tinymce/tinymce.min.js"></script>
    <script>
    tinymce.init({
        selector: '#editor',
        language: 'ru',
        plugins: 'lists link image table code',
        toolbar: 'undo redo | blocks | bold italic | bullist numlist | link image table | code',
        block_formats: 'Параграф=p; Заголовок 1=h1; Заголовок 2=h2; Заголовок 3=h3',
        content_css: '../assets/css/template.css',
        body_class: 'content-area',
        width: '100%',
        height: 600,
        menubar: false
    });

    function copyHTML() {
        const html = tinymce.activeEditor.getContent();
        navigator.clipboard.writeText(html);
        document.getElementById('status').textContent = 'Скопировано!';
        setTimeout(() => document.getElementById('status').textContent = '', 2000);
    }

    function loadFile() {
        const input = document.getElementById('fileInput');
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => tinymce.activeEditor.setContent(e.target.result);
        reader.readAsText(file);
    }
    </script>
</head>
<body>
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
        <div style="margin-bottom:10px; display:flex; gap:10px; align-items:center;">
            <button onclick="copyHTML()">Скопировать HTML</button>
            <span id="status" style="color:green; font-size:0.9em;"></span>
            <input type="file" id="fileInput" accept=".html" onchange="loadFile()" style="margin-left:auto;">
        </div>
        <textarea id="editor"></textarea>
    </div>
</body>
</html>
`,

  'tools/README.md': `# Инструменты разработки

## TinyMCE
Скачайте TinyMCE и разместите в папке \`tinymce/\`.
Эта папка добавлена в \`.gitignore\` и не попадает в репозиторий.

## Использование
1. Откройте \`editor.html\` в браузере
2. Редактируйте контент визуально
3. Нажмите "Скопировать HTML"
4. Вставьте в \`content.html\` нужной страницы
`,
};

// === Функции ===
function createDirectory(dirPath) {
  const fullPath = path.join(PROJECT_ROOT, dirPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Создана папка: ${dirPath}`);
  }
}

function createFile(filePath, content) {
  const fullPath = path.join(PROJECT_ROOT, filePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✓ Создан файл: ${filePath}`);
}

// === Основной запуск ===
console.log('🚀 Создание структуры проекта zavodsvay...\n');

// Создаём папки
console.log('📁 Создание папок...');
directories.forEach(dir => createDirectory(dir));

// Создаём файлы
console.log('\n📄 Создание файлов...');
Object.entries(files).forEach(([filePath, content]) => {
  createFile(filePath, content);
});

console.log('\n✅ Структура проекта создана успешно!');
console.log('\n📋 Следующие шаги:');
console.log('1. Скопируйте CSS/JS/fonts/img из svai-gefest.ru в /assets/');
console.log('2. Скачайте TinyMCE в /tools/tinymce/');
console.log('3. Откройте http://zavodsvay.test в браузере');
console.log('4. Наполните страницы контентом через editor.html');
