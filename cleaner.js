const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

// Конфигурация
const TARGET_DIR = path.join(__dirname, '_Old', 'uploads');
const WEBP_QUALITY = 75;
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// Регулярное выражение для поиска миниатюр типа -300x200 или -1024x768
const THUMBNAIL_PATTERN = /-\d{3,4}x\d{3,4}(?=\.[a-z]+$)/i;

async function processDirectory(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            // Рекурсивный вход в подпапку
            await processDirectory(fullPath);
            
            // После обработки содержимого проверяем, не стала ли папка пустой
            const remainingFiles = await fs.readdir(fullPath);
            if (remainingFiles.length === 0) {
                await fs.rmdir(fullPath);
                console.log(`[Удалена пустая папка]: ${fullPath}`);
            }
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();

            // 1. Проверка на миниатюру (удаляем сразу)
            if (THUMBNAIL_PATTERN.test(entry.name)) {
                await fs.unlink(fullPath);
                console.log(`[Миниатюра удалена]: ${entry.name}`);
                continue;
            }

            // 2. Проверка на оригинал изображения (конвертируем)
            if (IMAGE_EXTENSIONS.includes(ext)) {
                const webpName = entry.name.replace(ext, '.webp');
                const webpPath = path.join(directory, webpName);

                try {
                    await sharp(fullPath)
                        .webp({ quality: WEBP_QUALITY })
                        .toFile(webpPath);
                    
                    // Удаляем исходник после успешной конвертации
                    await fs.unlink(fullPath);
                    console.log(`[Готово]: ${entry.name} -> ${webpName}`);
                } catch (err) {
                    console.error(`[Ошибка обработки ${entry.name}]:`, err.message);
                }
            }
        }
    }
}

async function main() {
    console.log('--- Начало процесса очистки ---');
    try {
        // Проверяем существование директории
        await fs.access(TARGET_DIR);
        await processDirectory(TARGET_DIR);
        console.log('--- Обработка успешно завершена ---');
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Ошибка: Папка ${TARGET_DIR} не найдена. Проверьте путь.`);
        } else {
            console.error('Критическая ошибка:', err);
        }
    }
}

main();