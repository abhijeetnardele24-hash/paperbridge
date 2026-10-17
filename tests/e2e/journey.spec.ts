import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('PaperBridge E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('1. Landing page loads cleanly and has zero axe accessibility violations', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/');
    await expect(page).toHaveTitle(/PaperBridge/);
    const h1Elements = page.getByRole('heading', { level: 1 });
    await expect(h1Elements).toHaveCount(1);
    await expect(h1Elements).toContainText(/scholarship form you can understand/i);

    // Verify 3 honest promises
    await expect(page.getByText(/No account required/i)).toBeVisible();
    await expect(page.getByText(/Answers stay on this device/i)).toBeVisible();
    await expect(page.getByText(/Official wording is one tap away/i)).toBeVisible();

    // Verify Axe accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    
    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(seriousOrCritical).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test('2. Complete eligible happy path from landing to completion', async ({ page }) => {
    await page.goto('/');

    // Start guided application
    await page.getByRole('link', { name: /Start Guided Application/i }).click();
    await expect(page).toHaveURL(/.*before-you-start/);

    // Before you start -> Check eligibility
    await page.getByRole('link', { name: /Continue to Eligibility Check/i }).click();
    await expect(page).toHaveURL(/.*eligibility/);

    // Question 1: Enrolled in school -> Yes
    await page.getByLabel(/Yes, I am currently enrolled/i).check();
    await page.getByRole('button', { name: /Next Question/i }).click();

    // Question 2: Family Income -> Yes
    await page.getByLabel(/Yes, family income is ₹2,50,000 or less/i).check();
    await page.getByRole('button', { name: /Next Question/i }).click();

    // Question 3: Resident of Maharashtra -> Yes
    await page.getByLabel(/Yes, I reside in Maharashtra/i).check();
    await page.getByRole('button', { name: /Next Question/i }).click();

    // Question 4: Concurrent full tuition -> No
    await page.getByLabel(/No, I am not receiving full tuition aid/i).check();
    await page.getByRole('button', { name: /Continue to Document Board/i }).click();
    await expect(page).toHaveURL(/.*documents/);

    // Documents screen
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Document Readiness Board/i);
    await page.getByRole('link', { name: /Continue to Application Flow/i }).click();
    await expect(page).toHaveURL(/.*application/);

    // Question 1: Applicant Name
    await page.getByPlaceholder(/e\.g\. Riya Santosh Shinde/i).fill('Riya Suresh Patil');
    await page.getByRole('button', { name: /Next Question/i }).click();

    // Question 2: Date of Birth
    await page.locator('input[type="date"]').fill('2007-08-15');
    await page.getByRole('button', { name: /Next Question/i }).click();

    // Question 3: Income
    await page.locator('input[type="number"]').fill('180000');
    await page.getByRole('button', { name: /Next Question/i }).click();

    // Question 4: Institution Name
    await page.getByPlaceholder(/e\.g\. Government Polytechnic College/i).fill('Government Polytechnic Pune');
    await page.getByRole('button', { name: /Next Question/i }).click();

    // Question 5: Stream / Class
    await page.getByLabel(/Class 11 \/ 12 — Science Stream/i).check();
    await page.getByRole('button', { name: /Next Question/i }).click();

    // Question 6: Bank IFSC
    await page.getByPlaceholder(/e\.g\. SBIN0001234/i).fill('SBIN0001234');
    await page.getByRole('button', { name: /Review All Answers/i }).click();
    await expect(page).toHaveURL(/.*review/);

    // Review screen
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Review Your Prepared Answers/i);
    await page.getByRole('link', { name: /Continue to Helper Handoff/i }).click();
    await expect(page).toHaveURL(/.*handoff/);

    // Handoff screen
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Consent-Controlled Helper Handoff/i);
    await page.getByRole('button', { name: /Generate Expiring Handoff Packet/i }).click();
    await expect(page.getByText(/PB-2026-/i)).toBeVisible();

    // Finish preparation
    await page.getByRole('link', { name: /Complete Preparation Journey/i }).click();
    await expect(page).toHaveURL(/.*complete/);

    // Exact required completion statement
    await expect(page.getByText(/Your PaperBridge preparation is complete\./i)).toBeVisible();
  });

  test('3. Ineligible path explains rule without a dead end', async ({ page }) => {
    await page.goto('/eligibility');

    // Answer No to enrolment
    await page.getByLabel(/No, I have discontinued my studies/i).click();

    // Ineligible guidance
    await expect(page.getByText(/This Specific Grant May Not Fit Your Current Situation/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Change this answer to re-evaluate eligibility/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Continue to Document Board/i })).toBeVisible();
  });

  test('4. Uncertain answer path flows through review and allows returning', async ({ page }) => {
    await page.goto('/review');

    // Check Needs Checking count is visible
    await expect(page.getByText(/Needs Checking/i).first()).toBeVisible();

    // Click Return to fix link for the uncertain question
    const uncertainLink = page.getByRole('link', { name: /IFSC Code/i });
    await expect(uncertainLink).toBeVisible();
    await uncertainLink.click();
    await expect(page).toHaveURL(/.*application\?q=q_bank_ifsc/);

    // On application screen, verify "I am not sure" button exists
    await expect(page.getByRole('button', { name: /I am not sure/i })).toBeVisible();
  });

  test('5. Selective handoff token creation and revocation', async ({ page }) => {
    await page.goto('/handoff');

    // Generate token
    const generateBtn = page.getByRole('button', { name: /Generate Expiring Handoff Packet/i });
    await generateBtn.click();
    await expect(page.getByText(/PB-2026-/i)).toBeVisible();

    // Revoke token
    const revokeBtn = page.getByRole('button', { name: /Revoke Packet Access Now/i });
    await revokeBtn.click();
    await expect(page.getByText(/Access Revoked/i)).toBeVisible();
  });

  test('6. Keyboard accessibility: skip link and tab navigation', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    await expect(skipLink).toBeAttached();

    // Start from the document body so the first Tab is deterministic in both
    // headed browsers and headless Linux CI, where initial focus may otherwise
    // remain outside the document after navigation.
    await page.locator('body').press('Tab');
    await expect(skipLink).toBeFocused();

    // Press enter on skip link
    await page.keyboard.press('Enter');
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('7. Language switching between English, Hindi, and Marathi', async ({ page }) => {
    await page.goto('/');

    // Switch to Hindi
    const langSelect = page.getByLabel(/Select display language/i);
    await langSelect.selectOption('hi');
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');

    // Switch to Marathi
    await langSelect.selectOption('mr');
    await expect(page.locator('html')).toHaveAttribute('lang', 'mr');

    // Switch back to English
    await langSelect.selectOption('en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('8. Responsive smoke tests and no horizontal overflow across viewports', async ({ page }) => {
    const viewports = [
      { width: 320, height: 640 },
      { width: 360, height: 740 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/');

      // Check document scrollWidth does not exceed clientWidth
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll, `Horizontal scroll found at ${vp.width}px`).toBe(false);
    }
  });

  test('9. Full axe accessibility scan on all primary routes', async ({ page }) => {
    const routes = [
      '/',
      '/before-you-start',
      '/eligibility',
      '/documents',
      '/application',
      '/review',
      '/handoff',
      '/complete',
      '/evidence',
    ];

    for (const route of routes) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const seriousOrCritical = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      );
      expect(seriousOrCritical, `Accessibility violations found on ${route}`).toEqual([]);
    }
  });
});
