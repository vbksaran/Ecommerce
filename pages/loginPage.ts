import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toastMessage = page.locator('div.z-50.fixed');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Login' }).click();
  }

  async login(email: string, password: string) {
    await this.page.locator('input[type="text"]').fill(email);
    await this.page.locator('input[type="password"]').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async waitForToast() {
    await this.toastMessage.waitFor({ state: 'visible', timeout: 150000 });
    return this.toastMessage;
  }

  async expectGreeting(username: string) {
    await expect(this.page.getByText(`Hello ${username}`)).toBeVisible();
  }
}
