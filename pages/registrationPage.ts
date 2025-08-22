import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirmInput: Locator;
  readonly registerButton: Locator;
  readonly toastMessage: Locator;
  readonly supplierCheckbox: Locator;
  readonly supplierNameInput: Locator; 
  readonly supplierAddressInput: Locator;
  readonly supplierDescriptionInput: Locator;
  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
    this.emailInput = page.locator('div').filter({ hasText: /^Email$/ }).getByRole('textbox');
    this.passwordInput = page.locator('div').filter({ hasText: /^Password$/ }).getByRole('textbox');
    this.passwordConfirmInput = page.locator('div').filter({ hasText: /^Password confirmation$/ }).getByRole('textbox');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.toastMessage = page.locator('div.z-50.fixed'); 
    this.supplierCheckbox = page.locator('.rounded-sm');
    this.supplierNameInput = page.locator('div').filter({ hasText: /^Supplier name$/ }).getByRole('textbox');
    this.supplierAddressInput = page.locator('div').filter({ hasText: /^Supplier address$/ }).getByRole('textbox');
    this.supplierDescriptionInput = page.locator('div').filter({ hasText: /^Supplier description$/ }).getByRole('textbox');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Register' }).click();
    await this.page.waitForURL('**/register');
  }

  async registerShoper(name: string, email: string, password: string, confirmPassword: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.passwordConfirmInput.fill(confirmPassword);
    await this.registerButton.click();
  }
  async registerSupplier(name: string, email: string, password: string, confirmPassword: string, supplierName: string, supplierAddress: string, supplierDescription: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.passwordConfirmInput.fill(confirmPassword);
    await this.supplierCheckbox.click();
    await this.supplierNameInput.fill(supplierName);
    await this.supplierAddressInput.fill(supplierAddress);
    await this.supplierDescriptionInput.fill(supplierDescription);
    
    await this.registerButton.click();
  }



  async waitForToast() {
    await this.toastMessage.waitFor({ state: 'visible', timeout: 100000 });
    return this.toastMessage;
  }
}