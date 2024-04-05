import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/login.ts';

test('Successful Login', async ({ page }) => {

    const Login = new LoginPage(page);
    await Login.goToLoginPage();

    await Login.login('test', 'test');

    await expect(page.getByTestId('navbar-account')).toContainText(['My Account']);

})

test('Unsuccessful Login', async ({ page }) => {

    const Login = new LoginPage(page);
    await Login.goToLoginPage();

    await Login.login('wronguserame', 'wrongpassowrd');

    await expect(page.locator('css=.error')).toHaveText('Invalid username or password');

})