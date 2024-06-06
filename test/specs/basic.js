const assert = require('assert');

class LoginPage {
    constructor() {
        this.usernameInput = $('#user-name');
        this.passwordInput = $('#password');
        this.loginButton = $('#login-button');
    }

    async login(username, password) {
        await this.usernameInput.waitForDisplayed({ timeout: 5000 });
        await this.usernameInput.clearValue();
        await this.usernameInput.setValue(username);
        await this.passwordInput.waitForDisplayed({ timeout: 5000 });
        await this.passwordInput.setValue(password);
        await this.loginButton.waitForClickable({ timeout: 5000 });
        await this.loginButton.click();
    }  
}

class InventoryPage {
    constructor() {
        this.inventoryContainer = $('#inventory_container');
        this.shoppingCartContainer = $('#shopping_cart_container');
    }

    async isDisplayed() {
        await this.inventoryContainer.waitForDisplayed({ timeout: 5000 });
        await this.shoppingCartContainer.waitForDisplayed({ timeout: 5000 });
        return await this.inventoryContainer.isDisplayed() && await this.shoppingCartContainer.isDisplayed();
    }
}

describe('SwagLabsLoginTests', function() {
    let loginPage;
    let inventoryPage;

    before(async () => {
        loginPage = new LoginPage();
        inventoryPage = new InventoryPage();
    });

    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com/');
    });

    it('ValidLogin', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        assert(await inventoryPage.isDisplayed(), 'Inventory page and shopping cart should be displayed after login');
    });

    it('LoginWithInvalidPassword', async () => {
        await loginPage.login('standard_user', 'invalid_password');
        await browser.pause(1000);  // Adding a pause to allow the URL to potentially change
        assert.strictEqual(await browser.getUrl(), 'https://www.saucedemo.com/', 'URL should remain the same after invalid login');
    });

    it('LoginWithInvalidLogin', async () => {
        await loginPage.login('invalid_user', 'secret_sauce');
        await browser.pause(1000);  // Adding a pause to allow the URL to potentially change
        assert.strictEqual(await browser.getUrl(), 'https://www.saucedemo.com/', 'URL should remain the same after invalid login');
    });

    it('Logout', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        assert(await inventoryPage.isDisplayed(), 'Inventory page and shopping cart should be displayed after login');
        await $('#react-burger-menu-btn').waitForClickable({ timeout: 5000 });
        await $('#react-burger-menu-btn').click();
        await $('#logout_sidebar_link').waitForClickable({ timeout: 5000 });
        await $('#logout_sidebar_link').click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    });
    it('SavingTheCartAfterLogout', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        assert(await inventoryPage.isDisplayed(), 'Inventory page and shopping cart should be displayed after login');
        
        const cartItem = '#add-to-cart-sauce-labs-backpack';
        const cartBadge = '#shopping_cart_badge';
        
        await $(cartItem).waitForClickable({ timeout: 5000 });
        await $(cartItem).click();
        
       
        await $(cartBadge).waitForDisplayed({ timeout: 5000 });
        let itemCount = await $(cartBadge).getText();
        assert.strictEqual(itemCount, '1', 'Item count should be 1 in the cart');
        
    
        await $('#react-burger-menu-btn').click();
        await $('#logout_sidebar_link').click();
        
        await loginPage.login('standard_user', 'secret_sauce');
        
       
        await $(cartBadge).waitForDisplayed({ timeout: 5000 });
        itemCount = await $(cartBadge).getText();
        assert.strictEqual(itemCount, '1', 'Item count should be 1 in the cart after re-login');
    });
    
    

    it('Sorting', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        assert(await inventoryPage.isDisplayed(), 'Inventory page and shopping cart should be displayed after login');
        const selectElement = await $('.product_sort_container');
        await selectElement.waitForDisplayed({ timeout: 5000 });
        await selectElement.selectByVisibleText('Name (A to Z)');
        let selectedValue = await selectElement.getValue();
        assert.strictEqual(selectedValue, 'az', 'Selected value should be "az"');
        await selectElement.selectByVisibleText('Name (Z to A)');
        selectedValue = await selectElement.getValue();
        assert.strictEqual(selectedValue, 'za', 'Selected value should be "za"');
        await selectElement.selectByVisibleText('Price (low to high)');
        selectedValue = await selectElement.getValue();
        assert.strictEqual(selectedValue, 'lohi', 'Selected value should be "lohi"');
        await selectElement.selectByVisibleText('Price (high to low)');
        selectedValue = await selectElement.getValue();
        assert.strictEqual(selectedValue, 'hilo', 'Selected value should be "hilo"');
    });

    it('FooterLinks', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        assert(await inventoryPage.isDisplayed(), 'Inventory page and shopping cart should be displayed after login');
        async function testLink(linkText, expectedUrl) {
            const link = await $(`=${linkText}`);
            await link.waitForExist();
            await link.waitForDisplayed();
            await link.click();
            await browser.waitUntil(
                async () => (await browser.getWindowHandles()).length === 2,
                {
                    timeout: 10000,
                    timeoutMsg: `New window should open after clicking on ${linkText}`
                }
            );
            const allWindowHandles = await browser.getWindowHandles();
            await browser.switchToWindow(allWindowHandles[1]);
            await expect(browser).toHaveUrlContaining(expectedUrl);
            await browser.closeWindow();
            await browser.switchToWindow(allWindowHandles[0]);
        }
        await testLink('Twitter', 'https://x.com/saucelabs');
        await testLink('Facebook', 'https://www.facebook.com/saucelabs');
        await testLink('LinkedIn', 'https://www.linkedin.com/company/sauce-labs/');
    });

    it('ValidCheckout', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        assert(await inventoryPage.isDisplayed(), 'Inventory page and shopping cart should be displayed after login');
        await $('#add-to-cart-sauce-labs-backpack').click();
        await $('#shopping_cart_container').click();
        await $('#checkout').click();
        await $('#first-name').setValue('Viktoriia');
        await $('#last-name').setValue('Secret');
        await $('#postal-code').setValue('2345');
        await $('#continue').click();
        await expect($('#finish')).toBeClickable();
        await $('#finish').click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
    });

    it('CheckoutWithoutProducts', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        assert(await inventoryPage.isDisplayed(), 'Inventory page and shopping cart should be displayed after login');
        await $('#shopping_cart_container').click();
        await $('#checkout').click();
        await expect($('#continue')).toBeClickable();
    });
});
