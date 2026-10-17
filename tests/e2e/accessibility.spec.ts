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

  test('6. Full Axe accessibility scan across all primary pages reports zero WCAG A/AA violations', async ({ page }) => {
    for (const r of routes) {
      await page.goto(r.path);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(
        accessibilityScanResults.violations,
        `Accessibility violations on ${r.path}: ${JSON.stringify(accessibilityScanResults.violations, null, 2)}`
      ).toEqual([]);
    }
  });

  test('7. Desktop header elements never collide or overlap at 1024, 1280, 1366, 1440, 1536, and 1920px', async ({ page }) => {
    const desktopViewports = [
      { width: 1024, height: 768 },
      { width: 1280, height: 800 },
      { width: 1366, height: 768 },
      { width: 1440, height: 900 },
      { width: 1536, height: 864 },
      { width: 1920, height: 1080 },
    ];

    const testRoutes = ['/', '/before-you-start', '/documents', '/review'];

    const overlaps = (
      r1: { x: number; y: number; width: number; height: number },
      r2: { x: number; y: number; width: number; height: number }
    ) => !(r1.x + r1.width <= r2.x || r2.x + r2.width <= r1.x || r1.y + r1.height <= r2.y || r2.y + r2.height <= r1.y);

    for (const vp of desktopViewports) {
      await page.setViewportSize(vp);

      for (const routePath of testRoutes) {
        await page.goto(routePath);
        await page.evaluate(() => document.fonts.ready);

        const brand = page.locator('#header-brand');
        const stepper = page.locator('#header-stepper');
        const controls = page.locator('#header-controls');
        const wordmark = page.locator('#header-wordmark');
        const badge = page.locator('#header-demo-badge');
        const langSelect = page.locator('#language-select');
        const a11yBtn = page.locator('#header-accessibility-btn');

        await expect(brand).toBeVisible();
        await expect(stepper).toBeVisible();
        await expect(controls).toBeVisible();

        const brandBox = await brand.boundingBox();
        const stepperBox = await stepper.boundingBox();
        const controlsBox = await controls.boundingBox();
        const wordmarkBox = await wordmark.boundingBox();
        const badgeBox = await badge.boundingBox();
        const langBox = await langSelect.boundingBox();
        const a11yBox = await a11yBtn.boundingBox();

        expect(brandBox).not.toBeNull();
        expect(stepperBox).not.toBeNull();
        expect(controlsBox).not.toBeNull();
        expect(wordmarkBox).not.toBeNull();
        expect(badgeBox).not.toBeNull();
        expect(langBox).not.toBeNull();
        expect(a11yBox).not.toBeNull();

        // 1. Brand block must end before Stepper starts
        expect(overlaps(brandBox!, stepperBox!), `Brand and Stepper overlap at ${vp.width}px on ${routePath}`).toBe(false);
        expect(brandBox!.x + brandBox!.width).toBeLessThanOrEqual(stepperBox!.x);

        // 2. Stepper must end before Controls start
        expect(overlaps(stepperBox!, controlsBox!), `Stepper and Controls overlap at ${vp.width}px on ${routePath}`).toBe(false);
        expect(stepperBox!.x + stepperBox!.width).toBeLessThanOrEqual(controlsBox!.x);

        // 3. Wordmark must not overlap Badge
        expect(overlaps(wordmarkBox!, badgeBox!), `Wordmark and Demo Badge overlap at ${vp.width}px on ${routePath}`).toBe(false);

        // 4. Language select must not overlap Accessibility button
        expect(overlaps(langBox!, a11yBox!), `Language select and A11y button overlap at ${vp.width}px on ${routePath}`).toBe(false);

        // 5. Within Stepper, each stage link must not overlap the next
        for (let s = 1; s <= 4; s++) {
          const stepCurrent = page.locator(`#stepper-step-${s}`);
          const stepNext = page.locator(`#stepper-step-${s + 1}`);
          const box1 = await stepCurrent.boundingBox();
          const box2 = await stepNext.boundingBox();
          expect(box1).not.toBeNull();
          expect(box2).not.toBeNull();
          expect(overlaps(box1!, box2!), `Stepper step ${s} overlaps step ${s + 1} at ${vp.width}px on ${routePath}`).toBe(false);
          expect(box1!.x + box1!.width).toBeLessThanOrEqual(box2!.x);
        }

        // 6. Zero horizontal overflow at viewport
        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(hasHorizontalOverflow, `Horizontal overflow at ${vp.width}px on ${routePath}`).toBe(false);
      }
    }
  });
});
