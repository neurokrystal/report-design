import { test, expect } from '@playwright/test';

// Key sections of the report, by anchor id (see src/app/App.tsx).
const SECTIONS = [
  'orientation',
  'your-domains',
  'your-shape',
  'safety',
  'play',
  'challenge',
  'foundations-together',
  'direction',
  'when-ready',
];

test('report renders and key sections are captured', async ({ page }) => {
  await page.goto('/');

  // App has mounted once an early section is present.
  await expect(page.locator('#your-shape')).toBeVisible({ timeout: 30_000 });

  for (const id of SECTIONS) {
    const section = page.locator(`#${id}`);
    await expect(section, `section #${id} should exist`).toHaveCount(1);
    await section.scrollIntoViewIfNeeded();
    // Let scroll-triggered motion settle before capturing.
    await page.waitForTimeout(800);
    await section.screenshot({ path: `screenshots/${id}.png` });
  }

  // Full-page reference capture.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'screenshots/_full-page.png', fullPage: true });
});
