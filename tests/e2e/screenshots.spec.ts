import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test.describe('PaperBridge Deterministic Screenshot Capture', () => {
  const screenshotsDir = path.resolve(process.cwd(), 'docs/assets/screenshots');

  test.beforeAll(async () => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test('Capture complete 12-stage high-resolution evidence screenshots', async ({ page }) => {
    const snap = async (filename: string) => {
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: path.join(screenshotsDir, filename),
        fullPage: false,
      });
    };

    // 1. Landing Hero (Desktop 1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await snap('01_landing_hero.png');

    // 2. Preparation Contract (/before-you-start)
    await page.goto('/before-you-start');
    await snap('02_preparation_contract.png');

    // 3. Eligibility Triage (/eligibility)
    await page.goto('/eligibility');
    await snap('03_eligibility_triage.png');

    // 4. Document Readiness Board (/documents)
    await page.goto('/documents');
    await snap('04_document_readiness_board.png');

    // 5. Dual-Layer Plain & Official Question (/application?q=q_legal_name)
    await page.goto('/application?q=q_legal_name');
    await snap('05_plain_official_dual_layer.png');

    // 6. Normal Uncertainty Modal (Click "I am not sure")
    await page.getByRole('button', { name: /I am not sure/i }).click();
    await page.waitForTimeout(300);
    await snap('06_uncertainty_modal.png');
    // Dismiss modal
    await page.keyboard.press('Escape');

    // 7. Review Map (/review)
    await page.goto('/review');
    await snap('07_review_map.png');

    // 8. Consent-Controlled Helper Handoff (/handoff with generated QR)
    await page.goto('/handoff');
    await page.getByRole('button', { name: /Generate Expiring Handoff Packet/i }).click();
    await page.waitForTimeout(500);
    await snap('08_consent_handoff_qr.png');

    // 9. Helper Redemption View (/handoff/view#...)
    // Click the redemption link to open helper view
    const redemptionLink = page.getByRole('link', { name: /Open Helper Redemption View/i });
    if (await redemptionLink.isVisible()) {
      const href = await redemptionLink.getAttribute('href');
      if (href) {
        await page.goto(href);
        await page.waitForTimeout(500);
        await snap('09_helper_redemption_view.png');
      }
    }

    // 10. Complete Dossier (/complete)
    await page.goto('/complete');
    await snap('10_complete_dossier.png');

    // 11. Accessibility & Reading Drawer
    await page.goto('/');
    await page.getByRole('button', { name: /Accessibility/i }).first().click();
    await page.waitForTimeout(400);
    await snap('11_accessibility_drawer.png');
    await page.keyboard.press('Escape');

    // 12. Mobile Responsive (360x740)
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/documents');
    await snap('12_mobile_responsive_360.png');
  });
});
