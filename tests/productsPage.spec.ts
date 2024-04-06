import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/login.ts';
import { Products } from '../pages/products.ts';


test('Show more button', async ({ page }) => {

    const Product = new Products(page);
    await Product.goToProductsPage();

    const isButtonVisible = await Product.showMoreButton.isVisible()
    test.skip(!isButtonVisible , 'There is no "Show more" button');

    // Counting all current products showed on the page
    const numberOfProducts = await Product.productsList.count();

    // Loading more products
    await Product.showMoreButton.click();

    // Counting products after loading more
    const newNumberOfProducts = await Product.productsList.count();

    // Assertion
    expect(newNumberOfProducts).toBeGreaterThan(numberOfProducts);

})

test('Checking search field', async ({ page }) => {

    const Product = new Products(page);
    await Product.goToProductsPage();

    // UNABLE TO SEARCH SPECIFIC DATA BECAUSE OF NO UNIQUE PRODUCT !!!
    // // Searching for the product that exist
    // await Product.searchAction('Product 6');
    // // Confirming its there
    // await expect(page.getByText('Product 2')).toBeVisible();
    // await expect(page.getByText('15')).toBeVisible();
    // await expect(page.getByText('2021-02-01')).toBeVisible();

    // Searching for the product that does not exist
    await Product.searchAction('Not existing product');
    await expect(page.getByText('No products found')).toBeVisible();

    // Checking the reset button
    await Product.resetAction('Trying reset button');

    // Confirming the search field is empty and product page opened with 10 products
    const numberOfProducts = await Product.productsList.count();
    await expect(Product.searchInput).toBeEmpty();
    await expect(page.locator('css=.product-list-table')).toBeVisible();
    expect(numberOfProducts).toEqual(10);

})

test('Editing products', async ({ page }) => {

    const Login = new LoginPage(page);
    const Product = new Products(page);

    await Login.goToLoginPage();
    await Login.login('test', 'test');

    // Locating the product with ID 5
    const productID = page.locator('tr[data-testid="product-row-5"]');
    
    // Clicking the edit button
    const productEditButton = page.locator('tr[data-testid="product-row-5"] .edit-button');
    await productEditButton.click();

    // New data for that product
    const newProdName = 'NewTestName';
    const newProdPrice = '3';
    const newProdDate = '2024-02-03';

    await Product.updateProducts(newProdName, newProdPrice, newProdDate);

    // Getting the data after updating
    const productName = await productID.locator('[data-testid="name"]').innerText();
    const productPrice = await productID.locator('[data-testid="price"]').innerText();
    const productDate = await productID.locator('[data-testid="dateStocked"]').innerText();

    // Assertion
    expect(productName).toEqual(newProdName);
    expect(productPrice).toEqual(newProdPrice);
    expect(productDate).toEqual(newProdDate);

})

test('Add products', async ({ page }) => {

    const Product = new Products(page);

    await Product.goToAddProductPage();

    // Fill product data > name, price, date
    await Product.addProducts('PW Testing product name', '100', '2024-02-02');

    // Searching for the product ive previously added
    await Product.searchAction('PW Testing product name');

    // Confirming its there
    await expect(page.getByText('PW Testing product name')).toBeVisible();
    await expect(page.getByText('100')).toBeVisible();
    await expect(page.getByText('2024-02-02')).toBeVisible();
    
})

test('Canceling Adding Products', async ({ page }) => {

    const Product = new Products(page);

    await Product.goToAddProductPage();

    Product.cancelAddingProducts('Product name canceling', '10', '2024-01-02');

    await expect(Product.searchInput).toBeVisible();
    
})