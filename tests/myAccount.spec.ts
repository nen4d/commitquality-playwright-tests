import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/login.ts';
import { MyAccount } from '../pages/myaccount.ts';

test('My Account Page', async ({ page }) => {

    const Login = new LoginPage(page);
    const myAccountPage = new MyAccount(page);

    await Login.goToLoginPage();
    await Login.login('test', 'test');

    await myAccountPage.pressMyAccountNavMenu();

    await expect(page.getByRole('heading', { name: 'My Account'})).toBeVisible();
    await expect(page.getByRole('heading', { name: 'My Details'})).toBeVisible();
    await expect(myAccountPage.accountName).toHaveText('Name:');
    await expect(myAccountPage.youtubeName).toHaveText('Youtube Name:');
    await expect(myAccountPage.channelName).toHaveText('Youtube Link');

})

test('Update details', async ({ page }) => {

    const Login = new LoginPage(page);
    const myAccountPage = new MyAccount(page);

    await Login.goToLoginPage();
    await Login.login('test', 'test');

    await myAccountPage.pressMyAccountNavMenu();

    await myAccountPage.toggleUpdateButton.click();

    const newName = 'NewNameTest';
    const newYoutubeName = 'NewYoutubeName';

    myAccountPage.newDetails(newName, newYoutubeName);

    const nameElement = page.locator('css=.details-list > li:nth-of-type(1)');
    const youtubeElement = page.locator('css=.details-list > li:nth-of-type(2)');

    await expect(nameElement).toHaveText(`Name: ${newName}`);
    await expect(youtubeElement).toHaveText(`Youtube Name: ${newYoutubeName}`);

})