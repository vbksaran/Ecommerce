import { Page, expect, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly checkoutCartLink: Locator;
  readonly checkoutHeading: Locator;
  readonly checkoutButton: Locator;
  readonly proceedHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutCartLink = page.getByRole('link', { name: 'Checkout cart' });
    this.checkoutHeading = page.getByRole('heading', { name: 'Checkout Cart' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.proceedHeading = page.getByRole('heading', { name: 'Proceed to Checkout' });
  }

  async addProductsToCart(products: string[]) {
    for (const productName of products) {
      const productCard = this.page.locator('div.bg-white.h-64', { hasText: productName });
      await productCard.waitFor({ state: 'visible', timeout: 30000 });
      const addToCartButton = productCard.getByRole('button', { name: 'Add to cart' });
      await addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
      await addToCartButton.click({ force: true });
    }
  }

  async goToCheckout() {
    await this.checkoutCartLink.click();
    await expect(this.checkoutHeading).toBeVisible();
  }

  async expectProductsInCart(products: string[]) {
    for (const productName of products) {
      await expect(this.page.getByText(productName)).toBeVisible();
    }
  }

  // async checkout() {
  //   await this.page.getByRole('button', { name: 'Checkout' }).click();
  // }

  async checkoutAndExpectProceed() {
    await this.checkoutButton.click();
    await expect(this.proceedHeading).toBeVisible({ timeout: 10000 });
  }
}