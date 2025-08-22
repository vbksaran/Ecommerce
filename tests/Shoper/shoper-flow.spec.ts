import { test, expect } from '../../fixture/fixture';
import { generateUniqueUser, waitForToast } from '../../utils/helper';

test.describe('Shoper Flow', () => {

  test('Successful registration', async ({ registrationPage }) => {
    // const timestamp = Date.now();
    // const username = `shopper${timestamp}`;
    // const email = `shopper${timestamp}@mp.com`;
    // const password = 'Password123!';
const { username, email, password } = generateUniqueUser();
    await registrationPage.goto();
    await registrationPage.registerShoper(username, email, password, password);

    //const toast = await registrationPage.waitForToast();
    const toast = await waitForToast(registrationPage.page, 150000);
    await expect(toast).toContainText('Succesful registration');
  });
  test('unsucessfull Registration', async ({ registrationPage }) => {
    await registrationPage.goto();
    await registrationPage.registerShoper('shoper4', 'shoper4@mp.com', 'shoper4@mp.com', 'shoper4@mp.com');
    //const toast = await registrationPage.waitForToast();
    const toast = await waitForToast(registrationPage.page, 150000);
    await expect(toast).toContainText('Unsuccesful registration');

  });

  test('Successful login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.SHOPPER_EMAIL!, process.env.SHOPPER_PASSWORD!);

    //const toast = await loginPage.waitForToast();
    const toast= await waitForToast(loginPage.page, 150000);
    await expect(toast).toContainText('Succesful login');

    await loginPage.expectGreeting('shoper3');
  });

  test('Add multiple products to cart', async ({ loginPage, productsPage }) => {
   
    await loginPage.goto();
    await loginPage.login(process.env.SHOPPER_EMAIL!, process.env.SHOPPER_PASSWORD!);
   // await loginPage.waitForToast();
    await waitForToast(loginPage.page, 150000);
    const productsToAdd = [
      'Ms. Domenica Walker II',
      'Emilie Daugherty'
    ];


    await productsPage.addProductsToCart(productsToAdd);



    await productsPage.goToCheckout();


    await productsPage.expectProductsInCart(productsToAdd);
    if (!(await productsPage.proceedHeading.isVisible({ timeout: 10000 }))) {
      throw new Error('Proceed to Checkout heading not found');
    }


  });

});