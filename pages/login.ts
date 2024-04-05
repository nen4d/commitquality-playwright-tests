import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {

        this.page = page;
        this.usernameField = page.locator('[data-testid="username-textbox"]');
        this.passwordField = page.locator('[data-testid="password-textbox"]');
        this.loginButton = page.locator('[data-testid="login-button"]');

    }

    async goToLoginPage() {
        await this.page.goto('/login');
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

}