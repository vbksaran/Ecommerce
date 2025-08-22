import { test, expect } from '../../fixture/fixture';
import { generateUniqueUser,waitForToast } from '../../utils/helper';

test.describe('Supplier Flow', () => {

  test.skip('Successful Supplier registration', async ({ registrationPage }) => {
    // const timestamp = Date.now();
    // const username = `supplier${timestamp}`;
    // const email = `supplier${timestamp}@mp.com`;
    // const password = 'Password123!';
    const { username, email, password } = generateUniqueUser();
    const supplierName = `supplier1`;
    const supplierAddress = 'supplieraddress';
    const supplierDescription = 'description';      

    await registrationPage.goto();
    await registrationPage.registerSupplier(username, email, password, password, supplierName, supplierAddress, supplierDescription);

    //const toast = await registrationPage.waitForToast();
    const toast = await waitForToast(registrationPage.page, 150000);
    await expect(toast).toContainText('Succesful registration');
  });
  test.skip('unsucessfull Supplier Registration', async ({ registrationPage }) => {
    await registrationPage.goto();
    await registrationPage.registerSupplier('shoper4', 'shoper4@mp.com', 'shoper4@mp.com', 'shoper4@mp.com', 'supplier1', 'supplieraddress', 'description');
    //const toast = await registrationPage.waitForToast();
    const toast = await waitForToast(registrationPage.page, 150000);
    await expect(toast).toContainText('Unsuccesful registration');

  });
  test.only('Successful Supplier login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.SUPPLIER_EMAIL!, process.env.SUPPLIER_PASSWORD!);

    //const toast = await loginPage.waitForToast();
    const toast = await waitForToast(loginPage.page, 150000);
    await expect(toast).toContainText('Succesful login');

    await loginPage.expectGreeting('shoper5');
  });
  test('Login and check common menu links', async ({ loginPage, commonSupplierPage }) => {
  await loginPage.goto();
     await loginPage.login(process.env.SUPPLIER_EMAIL!, process.env.SUPPLIER_PASSWORD!);
  //await loginPage.waitForToast();
    await waitForToast(loginPage.page, 150000);
  await commonSupplierPage.expectLinksVisible();
    await commonSupplierPage.logout();
});
test('Navigate to upload a item page', async ({ loginPage, commonSupplierPage }) => {
  await loginPage.goto();
  await loginPage.login(process.env.SUPPLIER_EMAIL!, process.env.SUPPLIER_PASSWORD!);
  //await loginPage.waitForToast();
    await waitForToast(loginPage.page, 150000);
  await commonSupplierPage.goToUploadItem();
});
   
});
import dotenv from 'dotenv';        