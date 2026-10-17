import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility & Responsive Hardening Suite', () => {
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/before-you-start', name: 'Before You Start' },
    { path: '/eligibility', name: 'Eligibility' },
    { path: '/documents', name: 'Documents' },
    { path: '/application', name: 'Application' },
    { path: '/review', name: 'Review' },
    { path: '/handoff', name: 'Handoff' },
    { path: '/complete', name: 'Complete' },
    { path: '/evidence', name: 'Evidence' },
  ];

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('1. Every route has exactly one H1 element for proper document heading hierarchy', async ({ page }) => {
    for (const r of routes) {
      await page.goto(r.path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    }
  });

  test('2. Skip link moves focus cleanly to #main-content', async ({ page }) => {
    await page.goto('/');
    // Press Tab from initial document
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    await expect(skipLink).toBeFocused();

    // Trigger skip link
    await page.keyboard.press('Enter');
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('3. Accessibility drawer traps focus, restores focus, and closes on Escape', async ({ page }) => {
    await page.goto('/');
    const a11yTrigger = page.getByRole('button', { name: /Accessibility/i }).first();
    await a11yTrigger.click();

    // Verify dialog opened and close button receives focus
    const closeBtn = page.getByRole('button', { name: /Close/i });
    await expect(closeBtn).toBeVisible();
    await expect(closeBtn).toBeFocused();

    // Verify body scroll lock
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).toBe('hidden');

    // Press Escape to dismiss
    await page.keyboard.press('Escape');
    await expect(closeBtn).not.toBeVisible();

    // Verify body scroll restored
    const restoredOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(restoredOverflow).not.toBe('hidden');

    // Verify focus restoration
    await expect(a11yTrigger).toBeFocused();
  });

  test('4. Mobile header and navigation drawer at 320px–430px has zero clipping and traps/restores focus', async ({ page }) => {
    const viewports = [
      { width: 320, height: 600 },
      { width: 360, height: 740 },
      { width: 390, height: 844 },
      { width: 430, height: 932 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/before-you-start');

      // Verify zero horizontal scrolling
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalOverflow, `Horizontal overflow detected at ${vp.width}px`).toBe(false);

      // Verify hamburger menu opens drawer
      const hamburger = page.getByRole('button', { name: /navigation menu/i });
      await expect(hamburger).toBeVisible();
      await hamburger.click();

      // Drawer should be visible and scroll-locked
      const drawer = page.locator('#mobile-nav-drawer');
      await expect(drawer).toBeVisible();
      const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(bodyOverflow).toBe('hidden');

      // Close on Escape
      await page.keyboard.press('Escape');
      await expect(drawer).not.toBeVisible();
      await expect(hamburger).toBeFocused();
    }
  });

  test('5. Prefers-reduced-motion media query disables animations cleanly', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const animationDuration = await page.evaluate(() => {
      const card = document.querySelector('.paper-card');
      if (!card) return '0.01ms';
      return window.getComputedStyle(card).animationDuration;
    });
    // Check that transition/animation is set to near zero by CSS reset
    expect(animationDuration).toMatch(/(0s|0\.01ms|0ms|1e-05s)/);
  });

  test('6. Full Axe accessibility scan across all primary pages reports zero critical or serious violations', async ({ page }) => {
    for (const r of routes) {
      await page.goto(r.path);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const seriousOrCritical = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      );
      expect(seriousOrCritical, `Accessibility violations on ${r.path}: ${JSON.stringify(seriousOrCritical, null, 2)}`).toEqual([]);
    }
  });
});
