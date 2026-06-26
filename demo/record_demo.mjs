import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const DASHBOARD_URL = process.env.DASHBOARD_URL || 'http://127.0.0.1:5174/';
const TARGET_WIDTH = Number(process.env.VIDEO_WIDTH || 1280);
const TARGET_HEIGHT = Number(process.env.VIDEO_HEIGHT || 720);
const EXPLORER_SECONDS = Number(process.env.EXPLORER_SECONDS || 18);
const FINAL_SECONDS = Number(process.env.FINAL_SECONDS || 92);

await fs.rm('demo/videos', { recursive: true, force: true });
await fs.mkdir('demo/videos', { recursive: true });

const browser = await chromium.launch({ headless: true });
const dashboardContext = await browser.newContext({
  viewport: { width: TARGET_WIDTH, height: TARGET_HEIGHT },
  recordVideo: {
    dir: 'demo/videos',
    size: { width: TARGET_WIDTH, height: TARGET_HEIGHT },
  },
});

const page = await dashboardContext.newPage();
await page.goto(DASHBOARD_URL, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('#run-agent');
const oldExplorerHref = await page
  .locator('#proof a[href*="testnet.cspr.live/transaction"]')
  .first()
  .getAttribute('href')
  .catch(() => undefined);
await page.waitForTimeout(3000);
await page.click('#run-agent');

const proofSelector = '#proof a[href*="testnet.cspr.live/transaction"]';
await page.locator(proofSelector).first().waitFor({ timeout: 120000 });
await page.waitForFunction(() => {
  const proof = document.querySelector('#proof')?.textContent || '';
  return proof.includes('live') && !proof.includes('pending live transaction');
}, { timeout: 120000 });
if (oldExplorerHref) {
  await page.waitForFunction(
    (previousHref) => {
      const link = document.querySelector('#proof a[href*="testnet.cspr.live/transaction"]');
      return link && link.getAttribute('href') !== previousHref;
    },
    oldExplorerHref,
    { timeout: 120000 },
  );
}
await page.locator(proofSelector).first().scrollIntoViewIfNeeded();
const explorerHref = await page.locator(proofSelector).first().getAttribute('href');
await page.waitForTimeout(5000);

await dashboardContext.close();

if (!explorerHref) {
  throw new Error('No explorer URL found after agent run.');
}

const explorerContext = await browser.newContext({
  viewport: { width: TARGET_WIDTH, height: TARGET_HEIGHT },
});
const explorerPage = await explorerContext.newPage();
const explorerHash = explorerHref.split('/').filter(Boolean).at(-1);
await explorerPage.goto(explorerHref, { waitUntil: 'domcontentloaded', timeout: 60000 });
if (explorerHash) {
  await explorerPage.waitForFunction(
    (hash) => document.body?.innerText.includes(hash) || document.body?.innerText.includes(`${hash.slice(0, 5)}...${hash.slice(-5)}`),
    explorerHash,
    { timeout: 60000 },
  ).catch(() => undefined);
}
await explorerPage.waitForTimeout(6000);
await explorerPage.screenshot({
  path: 'demo/videos/explorer-loaded.png',
  fullPage: false,
});
await explorerContext.close();
await browser.close();

const entries = await fs.readdir('demo/videos');
const candidates = [];
for (const name of entries) {
  const full = path.join('demo/videos', name);
  const st = await fs.stat(full);
  if (name.endsWith('.webm') && st.size > 0) {
    candidates.push({ full, size: st.size, mtimeMs: st.mtimeMs });
  }
}

if (!candidates.length) {
  throw new Error('No non-empty recorded WebM files found in demo/videos');
}

candidates.sort((a, b) => b.mtimeMs - a.mtimeMs || b.size - a.size);
const source = candidates[0].full;
console.log(`Using source video: ${source} (${candidates[0].size} bytes)`);

const outputPath = path.resolve('demo_recording.mp4');
const dashboardMp4 = path.resolve('demo/videos/dashboard.mp4');
const explorerMp4 = path.resolve('demo/videos/explorer.mp4');
const concatList = path.resolve('demo/videos/concat.txt');
try {
  execSync(`ffmpeg -y -i ${JSON.stringify(source)} -vf "scale=${TARGET_WIDTH}:${TARGET_HEIGHT}:force_original_aspect_ratio=decrease,pad=${TARGET_WIDTH}:${TARGET_HEIGHT}:(ow-iw)/2:(oh-ih)/2" -r 30 -c:v libx264 -preset fast -crf 23 -an ${JSON.stringify(dashboardMp4)}`, { stdio: 'inherit' });
  execSync(`ffmpeg -y -loop 1 -t ${EXPLORER_SECONDS + FINAL_SECONDS} -i demo/videos/explorer-loaded.png -vf "scale=${TARGET_WIDTH}:${TARGET_HEIGHT}:force_original_aspect_ratio=decrease,pad=${TARGET_WIDTH}:${TARGET_HEIGHT}:(ow-iw)/2:(oh-ih)/2,format=yuv420p" -r 30 -c:v libx264 -preset fast -crf 23 -an ${JSON.stringify(explorerMp4)}`, { stdio: 'inherit' });
  await fs.writeFile(concatList, `file '${dashboardMp4}'\nfile '${explorerMp4}'\n`);
  execSync(`ffmpeg -y -f concat -safe 0 -i ${JSON.stringify(concatList)} -c copy -movflags +faststart ${JSON.stringify(outputPath)}`, { stdio: 'inherit' });
} catch {
  await fs.copyFile(source, outputPath);
  console.warn('ffmpeg conversion failed; saved raw WebM as demo_recording.mp4');
}

console.log(`Created ${outputPath}`);
