// generate-reports1-json.js
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, 'reports');
const OUTPUT_FILE = path.join(__dirname, 'reports.json');

const result = {};

function slugify(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
}

fs.readdirSync(ROOT_DIR, { withFileTypes: true }).forEach(modulDir => {
    if (!modulDir.isDirectory()) return;
    const modul = modulDir.name;
    const modulPath = path.join(ROOT_DIR, modul);

    fs.readdirSync(modulPath, { withFileTypes: true }).forEach(typDir => {
        if (!typDir.isDirectory()) return;
        const typ = typDir.name;
        const typPath = path.join(modulPath, typ);
        const files = fs.readdirSync(typPath).filter(f => f.endsWith('.csv'));

        const modulSlug = slugify(modul);
        const typSlug = slugify(typ);

        if (!result[modulSlug]) result[modulSlug] = {};
        result[modulSlug][typSlug] = files;
    });
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf-8');
console.log(`✅ Vygenerováno do ${OUTPUT_FILE}`);