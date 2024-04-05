import { expect, type Locator, type Page } from '@playwright/test';

export class MyAccount {

    readonly page: Page;
    // Inputs
    readonly nameField: Locator;
    readonly youtubeChannelField: Locator;
    // Buttons
    readonly submitButton: Locator;
    readonly toggleUpdateButton: Locator;
    // Pages
    readonly myAccountNavMenu: Locator;
    // Elements
    readonly accountName: Locator;
    readonly youtubeName: Locator;
    readonly channelName: Locator;

    constructor(page: Page) {

        this.page = page;
        // Inputs
        this.nameField = page.locator('[data-testid="name-textbox"]');
        this.youtubeChannelField = page.locator('[data-testid="yotuube-channel-textbox"]');
        // Buttons
        this.submitButton = page.locator('[data-testid="submit-data"]');
        this.toggleUpdateButton = page.locator('.toggle-details-button');
        // Pages
        this.myAccountNavMenu = page.locator('[data-testid="navbar-account"]');
        // Elements
        this.accountName = page.locator('[data-testid="saved-name-info"]');
        this.youtubeName = page.locator('[data-testid="saved-youtube-name-info"]');
        this.channelName = page.locator('[data-testid="saved-youtube-channel-info"]');

    }

    async newDetails(newName, newYoutubeName) {
        await this.nameField.fill(newName);
        await this.youtubeChannelField.fill(newYoutubeName);
        await this.submitButton.click();
    }

    async pressMyAccountNavMenu() {
        await this.myAccountNavMenu.click();
    }

}