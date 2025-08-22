import { Page, Locator ,expect} from '@playwright/test';

export class CommonSupplierPage {
  readonly page: Page;
  readonly uploadItemLink: Locator;
  readonly browseProductsLink: Locator;
  readonly itemsSoldLink: Locator;
  readonly uploadedItemsLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uploadItemLink = page.getByRole('link', { name: 'Upload item' });
    this.browseProductsLink = page.getByRole('link', { name: 'Browse products' });
    this.itemsSoldLink = page.getByRole('link', { name: 'Items sold' });
    this.uploadedItemsLink = page.getByRole('link', { name: 'Uploaded Items' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async goToUploadItem() {
    await this.uploadItemLink.click();
    await this.page.waitForURL('**/upload-item/create');
  }

  async goToBrowseProducts() {
    await this.browseProductsLink.click();
    await this.page.waitForURL('**/');
  }

  async goToItemsSold() {
    await this.itemsSoldLink.click();
    await this.page.waitForURL('**/items-sold');
  }

  async goToUploadedItems() {
    await this.uploadedItemsLink.click();
    await this.page.waitForURL('**/uploaded-items');
  }
    async logout() {
    await this.page.getByRole('link', { name: 'Logout' }).click();
    await expect(this.page).toHaveURL('http://localhost:9021/#');
  }
  async expectLinksVisible() {
    await expect(this.page.getByRole('link', { name: 'Browse products' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Upload item' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Items sold' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Uploaded items' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Logout' })).toBeVisible();
  }
}