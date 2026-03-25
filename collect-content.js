// collect-content.js
// Сборка всех content.html в один DOCX
//
// Установка: npm install docx node-html-parser
// Запуск:    node collect-content.js

'use strict';

const fs   = require('fs');
const path = require('path');

const {
  Document, Packer, Paragraph, TextRun,
  HeadingLevel, PageBreak, AlignmentType, UnderlineType,
} = require('docx');
const { parse } = require('node-html-parser');

// ─────────────────────────────────────────────────────
// Конфиг — измени пути если нужно
// ─────────────────────────────────────────────────────
const PAGES_DIR   = path.resolve('./pages');
const OUTPUT_FILE = path.resolve('./content-export.docx');

// ─────────────────────────────────────────────────────
// 1. Сбор файлов в правильном порядке
// ─────────────────────────────────────────────────────
function collectFiles() {
  const result = [];

  // Прямые подпапки pages/, кроме articles/, по алфавиту
  const dirs = fs.readdirSync(PAGES_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && e.name !== 'articles')
    .sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  for (const entry of dirs) {
    const file = path.join(PAGES_DIR, entry.name, 'content.html');
    if (fs.existsSync(file)) {
      result.push({ file, slug: entry.name });
    }
  }

  // pages/articles/content.html — сводный раздел статей
  const articlesIndex = path.join(PAGES_DIR, 'articles', 'content.html');
  if (fs.existsSync(articlesIndex)) {
    result.push({ file: articlesIndex, slug: 'articles' });
  }

  // pages/articles/*/content.html — каждая статья по алфавиту
  const articlesDir = path.join(PAGES_DIR, 'articles');
  if (fs.existsSync(articlesDir)) {
    const articleDirs = fs.readdirSync(articlesDir, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name, 'ru'));

    for (const entry of articleDirs) {
      const file = path.join(articlesDir, entry.name, 'content.html');
      if (fs.existsSync(file)) {
        result.push({ file, slug: `articles/${entry.name}` });
      }
    }
  }

  return result;
}

// ─────────────────────────────────────────────────────
// 2. Конвертер HTML → DOCX-параграфы
// ─────────────────────────────────────────────────────

function toRuns(node, opts = {}) {
  if (!node) return [];

  if (node.nodeType === 3) {
    const text = node.text.replace(/\s+/g, ' ');
    if (!text.trim()) return [];
    return [new TextRun({ text, ...opts })];
  }

  const tag = (node.rawTagName || '').toLowerCase();
  if (['script', 'style', 'img', 'noscript'].includes(tag)) return [];

  const o = { ...opts };
  if (tag === 'strong' || tag === 'b')  o.bold     = true;
  if (tag === 'em'     || tag === 'i')  o.italics  = true;
  if (tag === 'u')                       o.underline = { type: UnderlineType.SINGLE };

  return node.childNodes.flatMap(child => toRuns(child, o));
}

const HEADING_MAP = {
  h1: HeadingLevel.HEADING_1,
  h2: HeadingLevel.HEADING_2,
  h3: HeadingLevel.HEADING_3,
  h4: HeadingLevel.HEADING_4,
  h5: HeadingLevel.HEADING_5,
};

function toParagraphs(node) {
  if (!node) return [];

  const tag = (node.rawTagName || '').toLowerCase();

  if (['script', 'style', 'img', 'noscript', 'head'].includes(tag)) return [];

  if (HEADING_MAP[tag]) {
    const runs = toRuns(node);
    return runs.length ? [new Paragraph({ heading: HEADING_MAP[tag], children: runs })] : [];
  }

  if (tag === 'p') {
    const runs = toRuns(node);
    return runs.length ? [new Paragraph({ children: runs })] : [];
  }

  if (tag === 'ul') {
    return node.querySelectorAll(':scope > li').flatMap(li => {
      const runs = toRuns(li);
      return runs.length
        ? [new Paragraph({ bullet: { level: 0 }, children: runs })]
        : [];
    });
  }

  if (tag === 'ol') {
    return node.querySelectorAll(':scope > li').flatMap(li => {
      const runs = toRuns(li);
      return runs.length
        ? [new Paragraph({
            numbering: { reference: 'default-numbering', level: 0 },
            children: runs,
          })]
        : [];
    });
  }

  if (tag === 'table') {
    return node.querySelectorAll('tr').flatMap(row => {
      const text = row.querySelectorAll('td, th')
        .map(c => c.text.trim())
        .filter(Boolean)
        .join(' | ');
      return text ? [new Paragraph({ children: [new TextRun(text)] })] : [];
    });
  }

  if (tag === 'hr') {
    return [new Paragraph({ children: [new TextRun('')] })];
  }

  return node.childNodes.flatMap(child => {
    if (child.nodeType === 3) {
      const text = child.text.replace(/\s+/g, ' ').trim();
      return text ? [new Paragraph({ children: [new TextRun(text)] })] : [];
    }
    return toParagraphs(child);
  });
}

// ─────────────────────────────────────────────────────
// 3. Парсинг одного content.html
// ─────────────────────────────────────────────────────
function parseFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const root = parse(html, { blockTextElements: { script: false, style: false } });

  root.querySelectorAll('script, style, noscript').forEach(n => n.remove());

  const body = root.querySelector('body') || root;
  return toParagraphs(body).filter(Boolean);
}

// ─────────────────────────────────────────────────────
// 4. Сборка DOCX
// ─────────────────────────────────────────────────────
async function build() {
  const files = collectFiles();
  console.log(`Найдено страниц: ${files.length}\n`);

  const children = [];

  for (let i = 0; i < files.length; i++) {
    const { file, slug } = files[i];
    console.log(`[${String(i + 1).padStart(2)}] ${slug}`);

    let paras;
    try {
      paras = parseFile(file);
    } catch (err) {
      console.warn(`     ⚠ Ошибка чтения: ${err.message}`);
      continue;
    }

    if (!paras.length) {
      console.warn(`     ⚠ Пустой файл, пропускаем`);
      continue;
    }

    if (i > 0) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }

    children.push(...paras);
  }

  const doc = new Document({
    numbering: {
      config: [{
        reference: 'default-numbering',
        levels: [{
          level: 0,
          format: 'decimal',
          text: '%1.',
          alignment: AlignmentType.LEFT,
        }],
      }],
    },
    sections: [{ children }],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUTPUT_FILE, buffer);

  const kb = (buffer.length / 1024).toFixed(1);
  console.log(`\n✓ Готово: ${OUTPUT_FILE} (${kb} KB)`);
}

build().catch(err => {
  console.error('\n✗ Ошибка:', err);
  process.exit(1);
});
