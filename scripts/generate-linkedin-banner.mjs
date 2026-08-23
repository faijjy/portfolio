import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'linkedin-banner.html');
const outPath = path.join(__dirname, '..', 'assets', 'linkedin-banner.png');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1584, height: 396 } });
await page.goto(`file://${htmlPath}`);
await page.screenshot({ path: outPath, type: 'png' });
await browser.close();
console.log('Saved', outPath);
