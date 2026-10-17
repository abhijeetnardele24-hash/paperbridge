import { test, expect } from '@playwright/test';

test.describe('Offline-First PWA Verification', () => {
  test('PWA manifest and installability metadata exist and are valid', async ({ page }) => {
    await page.goto('/');

    // Check manifest link in head
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', '/manifest.webmanifest');

    // Fetch and validate manifest content
    const response = await page.request.get('/manifest.webmanifest');
    expect(response.status()).toBe(200);
    const manifest = await response.json();
    expect(manifest.name).toBe('PaperBridge — Public forms that explain themselves');
    expect(manifest.short_name).toBe('PaperBridge');
    expect(manifest.display).toBe('standalone');
    expect(manifest.theme_color).toBe('#176B4D');
    expect(manifest.background_color).toBe('#F6F2EA');
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
  });

  test('Service worker precaches assets and serves application offline without external requests', async ({ page, context }) => {
    const failedRequests: string[] = [];
    const consoleErrors: string[] = [];

    page.on('requestfailed', (req) => {
      failedRequests.push(req.url());
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // 1. Load online once
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/scholarship form you can understand/i);

    // 2. Wait for service worker to register and control
    await page.waitForFunction(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const reg = await navigator.serviceWorker.ready;
      return Boolean(reg && reg.active);
    }, { timeout: 10000 });

    // 3. Save test journey data to localStorage
    await page.evaluate(() => {
      const state = {
        locale: 'en',
        eligibilityAnswers: { q_enrolled: 'yes', q_income: 'yes' },
        eligibilityStatus: 'passed',
        answers: {
          q_legal_name: { field: 'legal_name', value: 'Offline Test Student', isUncertain: false },
          q_annual_income: { field: 'annual_income', value: '180000', isUncertain: false },
        },
        documents: {},
        accessibility: { focusMode: false, readingSupport: false, readAloud: false, highContrast: false },
        handoff: { selectedSections: ['Personal Details'], includePersonalIdentifiers: false },
      };
      localStorage.setItem('paperbridge_journey_v1', JSON.stringify(state));
    });

    // Reset tracking lists before going offline
    failedRequests.length = 0;
    consoleErrors.length = 0;

    // 4. Switch context offline
    await context.setOffline(true);

    try {
      // 5. Cold navigate directly to /application offline and reload
      await page.goto('/application');
      await page.reload();
      await expect(page).toHaveURL(/.*application/);
      await expect(page.locator('input[value="Offline Test Student"]')).toBeVisible();

      // 6. Navigate directly to /documents offline and reload
      await page.goto('/documents');
      await page.reload();
      await expect(page).toHaveURL(/.*documents/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(/Document Readiness Board/i);

      // 7. Navigate directly to /review offline and reload
      await page.goto('/review');
      await page.reload();
      await expect(page).toHaveURL(/.*review/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(/Review Your Prepared Answers/i);
      await expect(page.getByText('Offline Test Student')).toBeVisible();

      // Verify connectivity banner shows offline message
      await expect(page.getByText(/Currently Offline/i)).toBeVisible();

      // 8. Assert ZERO failed requests (everything served from SW cache) and ZERO console errors
      expect(failedRequests, `Failed requests detected offline: ${failedRequests.join(', ')}`).toEqual([]);
      expect(consoleErrors, `Console errors detected: ${consoleErrors.join(', ')}`).toEqual([]);
    } finally {
      // 9. Return online and verify normal behavior
      await context.setOffline(false);
    }

    // Reload online and verify online indicator returns
    await page.reload();
    await expect(page.getByText(/Ready for offline preparation/i)).toBeVisible();
  });
});
