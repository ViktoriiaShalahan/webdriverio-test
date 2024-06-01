const assert = require('assert');

describe('Swag Labs Login Tests', function() {
    before(async () => {
        await browser.url('https://www.saucedemo.com/');
    });

// 001 Valid Login
    xit('Valid Login', async () => {
        try {
            const loginValid = await $('#user-name');
            await loginValid.setValue('standard_user');
            await browser.pause(2000);
            const loginValue = await loginValid.getValue();
            assert.strictEqual(loginValue, 'standard_user');

            const passwordValid = await $('#password');
            await passwordValid.setValue('secret_sauce');
            await browser.pause(2000);
            const passwordValue = await passwordValid.getValue();
            assert.strictEqual(passwordValue, 'secret_sauce');

            await $('#login-button').click();

            await browser.waitUntil(async () => {
                const url = await browser.getUrl();
                return url.includes('inventory.html');
            }, {
                timeout: 10000,
                timeoutMsg: 'Expected to be redirected to inventory page'
            });

            assert((await browser.getUrl()).includes('inventory.html'));
            assert(await $('#inventory_container').isDisplayed());
            assert(await $('#shopping_cart_container').isDisplayed());

            await browser.pause(5000);
        } catch (error) {
            console.error('Error during test execution:', error.message);
            throw error;
        }
    });

// 002 Login with invalid password
    xit('Login with invalid password', async () => {
        try {
            const loginValid = await $('#user-name');
            await loginValid.setValue('standard_user');
            await browser.pause(2000);
            const loginValue = await loginValid.getValue();
            assert.strictEqual(loginValue, 'standard_user');

            const passwordField = await $('#password');
            await passwordField.setValue('any random value');
            await browser.pause(2000);
            const passwordValue = await passwordField.getValue();
            assert.strictEqual(passwordValue, 'any random value');

            await $('#login-button').click();


        await browser.pause(5000); 

            } catch (error) {
                console.error('Error during test execution:', error.message);
                throw error;
    }
    });

 // 003 Login with invalid login
    xit('Login with invalid login', async () => {
        try {
            const loginField = await $('#user-name');
            await loginField.setValue('standarD_user');
            await browser.pause(2000);
            const loginValue = await loginField.getValue();
            assert.strictEqual(loginValue, 'standarD_user');

            const passwordValid = await $('#password');
            await passwordValid.setValue('secret_sauce');
            await browser.pause(2000);
            const passwordValue = await passwordValid.getValue();
            assert.strictEqual(passwordValue, 'secret_sauce');

            await $('#login-button').click();


        await browser.pause(5000); 

            } catch (error) {
                console.error('Error during test execution:', error.message);
                throw error;
    }
    });
// 004 Logout
    xit('Logout', async () => {
        try {
            const loginValid = await $('#user-name');
            await loginValid.setValue('standard_user');
            await browser.pause(2000);
            const loginValue = await loginValid.getValue();
            assert.strictEqual(loginValue, 'standard_user');

            const passwordValid = await $('#password');
            await passwordValid.setValue('secret_sauce');
            await browser.pause(2000);
            const passwordValue = await passwordValid.getValue();
            assert.strictEqual(passwordValue, 'secret_sauce');

            await $('#login-button').click();
            await browser.pause(2000);
            await $('#react-burger-menu-btn').click();
            await browser.pause(2000);
            await $('#logout_sidebar_link').click();
            await browser.pause(2000); 

            } catch (error) {
                console.error('Error during test execution:', error.message);
                throw error;
    }
    });

// 005 Saving the card after logout 
    xit('Saving the card after logout ', async () => {
        try {
            let loginValid = await $('#user-name');
            await loginValid.setValue('standard_user');
            await browser.pause(2000);
            let loginValue = await loginValid.getValue();
            assert.strictEqual(loginValue, 'standard_user');

            let passwordValid = await $('#password');
            await passwordValid.setValue('secret_sauce');
            await browser.pause(2000);
            let passwordValue = await passwordValid.getValue();
            assert.strictEqual(passwordValue, 'secret_sauce');

            await $('#login-button').click();
            await browser.pause(2000);

            await $('#add-to-cart-sauce-labs-backpack').click();
            await browser.pause(2000);

            await $('#react-burger-menu-btn').click();
            await browser.pause(2000);
            await $('#logout_sidebar_link').click();
            await browser.pause(2000);

            loginValid = await $('#user-name');
            await loginValid.setValue('standard_user');
            await browser.pause(2000);
            loginValue = await loginValid.getValue();
            assert.strictEqual(loginValue, 'standard_user');

            passwordValid = await $('#password');
            await passwordValid.setValue('secret_sauce');
            await browser.pause(2000);
            passwordValue = await passwordValid.getValue();
            assert.strictEqual(passwordValue, 'secret_sauce');

            await $('#login-button').click();
            await browser.pause(2000);

            await $('#product_sort_container').click();
            await browser.pause(2000);
            } catch (error) {
                console.error('Error during test execution:', error.message);
                throw error;
    }
    });

//006 Sorting
    xit('Sorting ', async () => {
        try {
            const loginValid = await $('#user-name');
            await loginValid.setValue('standard_user');
            await browser.pause(2000);
            const loginValue = await loginValid.getValue();
            assert.strictEqual(loginValue, 'standard_user');

            const passwordValid = await $('#password');
            await passwordValid.setValue('secret_sauce');
            await browser.pause(2000);
            const passwordValue = await passwordValid.getValue();
            assert.strictEqual(passwordValue, 'secret_sauce');

            await $('#login-button').click();
            await browser.pause(2000);
            const selectElement = await $('.product_sort_container');

            // Select "Name (A to Z)"
            await selectElement.selectByVisibleText('Name (A to Z)');
            await browser.pause(2000); 
            let selectedValue = await selectElement.getValue();
            assert.strictEqual(selectedValue, 'az', 'Selected value should be "az"');
            // Select "Name (Z to A)"
            await selectElement.selectByVisibleText('Name (Z to A)');
            await browser.pause(2000); 
            selectedValue = await selectElement.getValue();
            assert.strictEqual(selectedValue, 'za', 'Selected value should be "za"');
    
            // Select "Price (low to high)"
            await selectElement.selectByVisibleText('Price (low to high)');
            await browser.pause(2000); 
            selectedValue = await selectElement.getValue();
            assert.strictEqual(selectedValue, 'lohi', 'Selected value should be "lohi"');
    
            // Select "Price (high to low)"
            await selectElement.selectByVisibleText('Price (high to low)');
            await browser.pause(2000); 
            selectedValue = await selectElement.getValue();
            assert.strictEqual(selectedValue, 'hilo', 'Selected value should be "hilo"');
           

            } catch (error) {
                console.error('Error during test execution:', error.message);
                throw error;
    }
    });

//007 Footer Links
    xit('Footer Links', async () => {
        try {
            const loginValid = await $('#user-name');
            await loginValid.setValue('standard_user');
            await browser.pause(2000);
            const loginValue = await loginValid.getValue();
            assert.strictEqual(loginValue, 'standard_user');

            const passwordValid = await $('#password');
            await passwordValid.setValue('secret_sauce');
            await browser.pause(2000);
            const passwordValue = await passwordValid.getValue();
            assert.strictEqual(passwordValue, 'secret_sauce');

            await $('#login-button').click();
            await browser.pause(2000);

          
            async function testLink(linkText, expectedUrl) {
                const link = await $(`=${linkText}`);
                await link.waitForExist({ timeout: 5000 });
                await link.waitForDisplayed({ timeout: 5000 });
                await link.click();
                await browser.pause(5000);

                
                const originalWindowHandle = await browser.getWindowHandle();

                
                const allWindowHandles = await browser.getWindowHandles();

                
                await browser.switchToWindow(allWindowHandles[1]);

               
                await browser.waitUntil(
                    async () => (await browser.getUrl()).includes(expectedUrl),
                    {
                        timeout: 10000,
                        timeoutMsg: `Expected URL to contain "${expectedUrl}"`
                    }
                );

                const newUrl = await browser.getUrl();
                assert(newUrl.includes(expectedUrl), `New window should navigate to ${linkText}`);

               
                await browser.closeWindow();

                
                await browser.switchToWindow(originalWindowHandle);
                await browser.pause(5000);
            }

            
            await testLink('Twitter', 'https://x.com/saucelabs');
            await testLink('Facebook', 'https://www.facebook.com/saucelabs');
            await testLink('LinkedIn', 'https://www.linkedin.com/company/sauce-labs/');

        } catch (error) {
            console.error('Error during test execution:', error.message);
            throw error;
        }
    });

    // 008 Valid Checkout 
    xit('Valid Checkout ', async () => {
        try {
            let loginValid = await $('#user-name');
            await loginValid.setValue('standard_user');
            await browser.pause(2000);
            let loginValue = await loginValid.getValue();
            assert.strictEqual(loginValue, 'standard_user');

            let passwordValid = await $('#password');
            await passwordValid.setValue('secret_sauce');
            await browser.pause(2000);
            let passwordValue = await passwordValid.getValue();
            assert.strictEqual(passwordValue, 'secret_sauce');

            await $('#login-button').click();
            await browser.pause(2000);

            await $('#add-to-cart-sauce-labs-backpack').click();
            await browser.pause(2000);

            await $('#shopping_cart_container').click();
            await browser.pause(2000);
            await $('#checkout').click();
            await browser.pause(2000);

            let FirstNameValid = await $('#first-name');
            await FirstNameValid.setValue('Viktoriia');
            await browser.pause(2000);
            let FirstNameValue = await FirstNameValid.getValue();
            assert.strictEqual(FirstNameValue, 'Viktoriia');
            
            let lastNameValid = await $('#last-name');
            await lastNameValid.setValue('Secret');
            await browser.pause(2000);
            let lastNameValue = await lastNameValid.getValue();
            assert.strictEqual(lastNameValue, 'Secret');

            let postalCodeValid = await $('#postal-code');
            await postalCodeValid.setValue('2345');
            await browser.pause(2000);
            let postalCodeValue = await postalCodeValid.getValue();
            assert.strictEqual(postalCodeValue, '2345');

            await $('#continue').click();
            await browser.pause(2000);

            await $('#finish').click();
            await browser.pause(2000);

            await $('#back-to-products').click();
            await browser.pause(2000);

            } catch (error) {
                console.error('Error during test execution:', error.message);
                throw error;
    }
    });

    // 009 Checkout without products
    it('Checkout without products ', async () => {
        try {
            let loginValid = await $('#user-name');
            await loginValid.setValue('standard_user');
            await browser.pause(2000);
            let loginValue = await loginValid.getValue();
            assert.strictEqual(loginValue, 'standard_user');

            let passwordValid = await $('#password');
            await passwordValid.setValue('secret_sauce');
            await browser.pause(2000);
            let passwordValue = await passwordValid.getValue();
            assert.strictEqual(passwordValue, 'secret_sauce');

            await $('#login-button').click();
            await browser.pause(2000);

            await $('#shopping_cart_container').click();
            await browser.pause(2000);
            await $('#checkout').click();
            await browser.pause(2000);

            } catch (error) {
                console.error('Error during test execution:', error.message);
                throw error;
    }
    });

});
