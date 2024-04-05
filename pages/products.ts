import { expect, type Locator, type Page } from '@playwright/test';

export class Products {

    readonly page: Page;

    // Inputs
    readonly productNameInput: Locator;
    readonly priceInput: Locator;
    readonly dateInput: Locator;
    readonly searchInput: Locator;

    // Buttons
    readonly updateDataButton: Locator;
    readonly cancelAddProductsButton: Locator;
    readonly showMoreButton: Locator;
    readonly searchSubmitButton: Locator;
    readonly searchResetButton: Locator;

    // Product list
    readonly productsList: Locator;

    constructor(page: Page) {

        this.page = page;

        //Inputs
        this.productNameInput = page.locator('[data-testid="product-textbox"]');
        this.priceInput = page.locator('[data-testid="price-textbox"]');
        this.dateInput = page.locator('[data-testid="date-stocked"]');
        this.searchInput = page.locator('[class="filter-textbox"]');

        // Buttons
        this.updateDataButton = page.locator('[data-testid="submit-form"]');
        this.cancelAddProductsButton = page.locator('[data-testid="cancel-button"]');
        this.showMoreButton = page.locator('[data-testid="show-more-button"]');
        this.searchSubmitButton = page.locator('[data-testid="filter-button"]');
        this.searchResetButton = page.locator('[data-testid="reset-filter-button"]');

        // Product list
        this.productsList = page.locator('css=.product-list-table > tbody > tr');

    }

    async goToProductsPage() {
        await this.page.goto('/');
    }

    async goToAddProductPage() {
        await this.page.goto('/add-product');
    }

    async searchAction(keyword) {
        await this.searchInput.fill(keyword);
        await this.searchSubmitButton.click();
    }

    async resetAction(keyword) {
        await this.searchInput.fill(keyword);
        await this.searchResetButton.click();
    }

    async updateProducts(newName, newPrice, newDate) {
        await this.productNameInput.fill(newName);
        await this.priceInput.fill(newPrice);
        await this.dateInput.fill(newDate);
        await this.updateDataButton.click();
    }

    async addProducts(prodName, prodPrice, prodDate) {
        await this.productNameInput.fill(prodName);
        await this.priceInput.fill(prodPrice);
        await this.dateInput.fill(prodDate);
        await this.updateDataButton.click();
    }

    async cancelAddingProducts(prodName, prodPrice, prodDate) {
        await this.productNameInput.fill(prodName);
        await this.priceInput.fill(prodPrice);
        await this.dateInput.fill(prodDate);
        await this.cancelAddProductsButton.click();
    }

}