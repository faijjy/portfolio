import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'screenshots');

const projects = [
  { slug: 'denaroclub', url: 'https://denaroclub.com' },
  { slug: 'wekynd', url: 'https://wekynd.in' },
  { slug: 'firmwearpro', url: 'https://firmwearpro.com' },
  { slug: 'ecojay', url: 'https://ecojay.eco' },
  { slug: 'supasac', url: 'https://supasac.com' },
  { slug: 'serumluxeclinics', url: 'https://serumluxeclinics.com' },
  { slug: 'trustcohealth', url: 'https://trustcohealth.com' },
  { slug: 'ceramicprohome', url: 'https://ceramicprohome.in' },
  { slug: 'primeinvestrade', url: 'https://primeinvestrade.com' },
  { slug: 'ovolite', url: 'https://ovolite.com' },
  { slug: 'terrabloomdesigns', url: 'https://terrabloomdesigns.com' },
  { slug: 'shrikrushnatmt', url: 'https://shrikrushnatmt.com' },
  { slug: 'gopinathsteels', url: 'https://gopinathsteels.com' },
  { slug: 'sindhukuber', url: 'https://sindhukuber.com' },
  { slug: 'holoman', url: 'https://holoman.in' },
  { slug: 'donatello', url: 'https://donatello.in' },
  { slug: 'kalaniofficial', url: 'https://kalaniofficial.com' },
  { slug: 'amishilondon', url: 'https://amishilondon.co.uk' },
  { slug: 'liltort', url: 'https://liltort.com' },
  { slug: 'balajihosieryxlu', url: 'https://balajihosieryxlu.com' },
  { slug: 'themaddash', url: 'https://themaddash.in' },
  { slug: 'myneperfumes', url: 'https://myneperfumes.com' },
  { slug: 'gonutriline', url: 'https://gonutriline.com' },
  { slug: 'ambrosenaturals', url: 'https://ambrosenaturals.com' },
  { slug: 'robomatic', url: 'https://robomatic.in' },
  { slug: 'alenkamedia', url: 'https://alenkamedia.com' },
  { slug: 'mhenterprise', url: 'https://mhenterprise.co' },
  { slug: 'shahizaika', url: 'https://shahizaika.com.au' },
];

async function dismissOverlays(page) {
  await page.evaluate(() => {
    const selectors = [
      '[class*="cookie"] button',
      '[id*="cookie"] button',
      '.cc-btn',
      '#onetrust-accept-btn-handler',
      '[aria-label*="Accept"]',
      'button:has-text("Accept")',
      'button:has-text("Got it")',
    ];
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        if (el instanceof HTMLElement && el.offsetParent !== null) el.click();
      });
    }
  }).catch(() => {});
}

async function capture(page, project) {
  const file = path.join(outDir, `${project.slug}.png`);
  await page.setViewportSize({ width: 1440, height: 900 });
  try {
    await page.goto(project.url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch {
    await page.goto(project.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);
  await dismissOverlays(page);
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: file,
    clip: { x: 0, y: 0, width: 1440, height: 810 },
    type: 'png',
  });
  return file;
}

async function main() {
  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  let ok = 0;
  for (const project of projects) {
    try {
      await capture(page, project);
      ok += 1;
      console.log(`OK  ${project.slug}`);
    } catch (err) {
      console.error(`FAIL ${project.slug}: ${err.message || err}`);
    }
  }

  await browser.close();
  console.log(`\nDone: ${ok}/${projects.length} hero screenshots saved`);
  process.exit(ok === projects.length ? 0 : 1);
}

main();
