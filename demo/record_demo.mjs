import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const DASHBOARD_URL = process.env.DASHBOARD_URL || 'http://127.0.0.1:5174/';
const TARGET_WIDTH = Number(process.env.VIDEO_WIDTH || 1280);
const TARGET_HEIGHT = Number(process.env.VIDEO_HEIGHT || 720);

await fs.rm('demo/videos', { recursive: true, force: true });
await fs.mkdir('demo/videos', { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: TARGET_WIDTH, height: TARGET_HEIGHT },
  recordVideo: {
    dir: 'demo/videos',
    size: { width: TARGET_WIDTH, height: TARGET_HEIGHT },
  },
});

const page = await context.newPage();
await page.goto(DASHBOARD_URL, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('#run-agent');
await page.waitForTimeout(3000);
await page.click('#run-agent');

const proofSelector = '#proof a[href*="testnet.cspr.live/transaction"]';
await page.locator(proofSelector).first().waitFor({ timeout: 120000 });
await page.waitForFunction(() => {
  const proof = document.querySelector('#proof')?.textContent || '';
  return proof.includes('live') && !proof.includes('pending live transaction');
}, { timeout: 120000 });
await page.locator(proofSelector).first().scrollIntoViewIfNeeded();
await page.waitForTimeout(5000);

  // We skip clicking the explorer link to avoid getting stuck on the Cloudflare challenge page in headless mode.
  // The transaction link and hash are already clearly visible on the dashboard panel.
  await page.waitForTimeout(10000);

await context.close();
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
try {
  execSync(`ffmpeg -y -i ${JSON.stringify(source)} -vf "scale=${TARGET_WIDTH}:${TARGET_HEIGHT}:force_original_aspect_ratio=decrease,pad=${TARGET_WIDTH}:${TARGET_HEIGHT}:(ow-iw)/2:(oh-ih)/2" -r 30 -c:v libx264 -preset fast -crf 23 -c:a aac -movflags +faststart ${JSON.stringify(outputPath)}`, { stdio: 'inherit' });
} catch {
  await fs.copyFile(source, outputPath);
  console.warn('ffmpeg conversion failed; saved raw WebM as demo_recording.mp4');
}

console.log(`Created ${outputPath}`);
