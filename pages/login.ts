import { expect, type Locator, type Page } from '@playwright/test';
import Collection from '@lariat/playwright';

export class LoginPage extends Collection<Page> {

    readonly usernameField = this.getByTestId('username-textbox');
    readonly passwordField = this.getByTestId('password-textbox');
    readonly loginButton = this.getByTestId('login-button');

    async goToLoginPage() {
        await this.page.goto('/login');
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

}