
import { Page, Locator, expect } from '@playwright/test';

export function generateUniqueUser(prefix = 'shopper') {
  const timestamp = Date.now();
  return {
    username: `${prefix}${timestamp}`,
    email: `${prefix}${timestamp}@mp.com`,
    password: 'Password123!',
  };
}

export async function waitForToast(page: Page, timeout = 10000) {
  const toast = page.locator('div.z-50.fixed');
  await toast.waitFor({ state: 'visible', timeout });
  return toast;
}

export async function expectHeadingVisible(locator: Locator, headingText: string, timeout = 10000) {
  await expect(locator, `${headingText} heading not found`).toBeVisible({ timeout });
}