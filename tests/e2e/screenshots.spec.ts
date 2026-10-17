import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test.describe('PaperBridge Screenshot Capture', () => {
  const screenshotsDir = path.resolve(process.cwd(), 'docs/assets/screenshots');

  test.beforeAll(async () => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test('Capture high-resolution evidence screenshots', async ({ page }) => {
    // 1. Landing page with signature interaction (Desktop 1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.screenshot({
      path: path.join(screenshotsDir, '01_landing_hero.png'),
      fullPage: false,
    });

    // 2. Document readiness board
    await page.goto('/documents');
    await page.screenshot({
      path: path.join(screenshotsDir, '02_document_board.png'),
      fullPage: false,
    });

    // 3. Plain/Official question screen
    await page.goto('/application?q=q_legal_name');
    await page.screenshot({
      path: path.join(screenshotsDir, '03_plain_official_question.png'),
      fullPage: false,
    });

    // 4. Review map
    await page.goto('/review');
    await page.screenshot({
      path: path.join(screenshotsDir, '04_review_map.png'),
      fullPage: false,
    });

    // 5. Consent-controlled helper handoff
    await page.goto('/handoff');
    await page.getByRole('button', { name: /Generate Expiring Handoff Packet/i }).click();
    await page.screenshot({
      path: path.join(screenshotsDir, '05_consent_handoff.png'),
      fullPage: false,
    });

    // 6. Mobile view (360x740)
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/');
    await page.screenshot({
      path: path.join(screenshotsDir, '06_mobile_view.png'),
      fullPage: false,
    });

    // 7. Accessibility preference panel
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('button', { name: /Accessibility & Display/i }).first().click();
    await page.screenshot({
      path: path.join(screenshotsDir, '07_accessibility_drawer.png'),
      fullPage: false,
    });
  });
});
