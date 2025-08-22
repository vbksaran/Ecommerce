import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { RegistrationPage } from '../pages/registrationPage';
import { CommonSupplierPage } from '../pages/commonSupplierPage';

type MyFixtures = {
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  commonSupplierPage: CommonSupplierPage;

};

export const test = base.extend<MyFixtures>({
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  commonSupplierPage: async ({ page }, use) => {
    await use(new CommonSupplierPage(page));
  },
});

export { expect } from '@playwright/test';