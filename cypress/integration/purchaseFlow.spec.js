import { inventoryPage } from "../models/pages/inventoryPage";
import { cartPage } from "../models/pages/cartPage";
import { headerPage } from "../models/pages/headerPage";
import { productDetailsPage } from "../models/pages/productDetailsPage";
import { checkoutPage } from "../models/pages/checkoutInformationPage";
import { summaryPage } from "../models/pages/checkoutSummaryPage";


describe('Feature: Purchase flow', () => {

    beforeEach(() => {
        cy.login({login: Cypress.env('valid_user').login, password: Cypress.env('valid_user').password, shouldSucceed: true});
        cy.resetAppState();
    });

    afterEach(() => {
        cy.logout();
    });

    it('Add products from inventory to cart', function() {

        cy.log('☑️ get details for product A');
        cy.get(inventoryPage.product.lblName).eq(0).invoke('text').as('productNameA');
        cy.get(inventoryPage.product.lblDescription).eq(0).invoke('text').as('productDescriptionA');
        cy.get(inventoryPage.product.lblPrice).eq(0).invoke('text').as('productPriceA');

        cy.log('☑️ get details for product B');
        cy.get(inventoryPage.product.lblName).eq(1).invoke('text').as('productNameB');
        cy.get(inventoryPage.product.lblDescription).eq(1).invoke('text').as('productDescriptionB');
        cy.get(inventoryPage.product.lblPrice).eq(1).invoke('text').as('productPriceB');

        cy.log('☑️ add products to cart');
        cy.get(inventoryPage.btnAddToCart).first().click();
        cy.get(inventoryPage.btnAddToCart).first().click();

        cy.log('☑️ assert cart');
        cy.get(headerPage.shoppingCartCount).should('have.text', '2');    
        cy.get(headerPage.btnShoppingCart).click();
        cy.get(cartPage.cartItem).should('have.length', 2);
        cy.get(cartPage.cartItem).eq(0).find(cartPage.lblCartQuantity).should('have.text', '1')
        cy.get(cartPage.cartItem).eq(0).find(cartPage.product.lblName).invoke('text').then(productName =>{
            cy.get('@productNameA').should('eq', productName)
        });
        cy.get(cartPage.cartItem).eq(0).find(cartPage.product.lblDescription).invoke('text').then(productDescription =>{
            cy.get('@productDescriptionA').should('eq', productDescription)
        });
        cy.get(cartPage.cartItem).eq(0).find(cartPage.product.lblPrice).invoke('text').then(productPrice =>{
            cy.get('@productPriceA').should('eq', productPrice)
        });
        cy.get(cartPage.cartItem).eq(1).find(cartPage.lblCartQuantity).should('have.text', '1')
        cy.get(cartPage.cartItem).eq(1).find(cartPage.product.lblName).invoke('text').then(productName =>{
            cy.get('@productNameB').should('eq', productName)
        });
        cy.get(cartPage.cartItem).eq(1).find(cartPage.product.lblDescription).invoke('text').then(productDescription =>{
            cy.get('@productDescriptionB').should('eq', productDescription)
        });
        cy.get(cartPage.cartItem).eq(1).find(cartPage.product.lblPrice).invoke('text').then(productPrice =>{
            cy.get('@productPriceB').should('eq', productPrice)
        });
    });

    it('Add a product from product page to cart', function() {

        cy.log('☑️ get details for product');
        cy.get(inventoryPage.product.lblName).first().click();
        cy.get(productDetailsPage.lblProductName).invoke('text').as('productName');
        cy.get(productDetailsPage.lblProductDescription).invoke('text').as('productDescription');
        cy.get(productDetailsPage.lblProductPrice).invoke('text').as('productPrice');

        cy.log('☑️ add product to cart');
        cy.get(productDetailsPage.btnAddToCart).click();

        cy.log('☑️ assert cart');
        cy.get(headerPage.shoppingCartCount).should('have.text', '1');    
        cy.get(headerPage.btnShoppingCart).click();
        cy.get(cartPage.cartItem).should('have.length', 1);
        cy.get(cartPage.cartItem).find(cartPage.lblCartQuantity).should('have.text', '1')
        cy.get(cartPage.cartItem).find(cartPage.product.lblName).invoke('text').then(productName =>{
            cy.get('@productName').should('eq', productName)
        })
        cy.get(cartPage.cartItem).find(cartPage.product.lblDescription).invoke('text').then(productDescription =>{
            cy.get('@productDescription').should('eq', productDescription)
        })
        cy.get(cartPage.cartItem).find(cartPage.product.lblPrice).invoke('text').then(productPrice =>{
            cy.get('@productPrice').should('eq', productPrice)
        })
    });

    it('Remove products from cart', function() {

        cy.log('☑️ get details for product B');
        cy.get(inventoryPage.product.lblName).eq(1).invoke('text').as('productNameB');
        cy.get(inventoryPage.product.lblDescription).eq(1).invoke('text').as('productDescriptionB');
        cy.get(inventoryPage.product.lblPrice).eq(1).invoke('text').as('productPriceB');

        cy.log('☑️ add products to cart');
        cy.get(inventoryPage.btnAddToCart).first().click();
        cy.get(inventoryPage.btnAddToCart).first().click();

        cy.log('☑️ open cart');
        cy.get(headerPage.btnShoppingCart).click();
        cy.get(cartPage.cartItem).should('have.length', 2);

        cy.log('☑️ remove product A from cart and assert other one was not affected');
        cy.get(cartPage.btnRemove).first().click();
        cy.get(cartPage.cartItem).find(cartPage.lblCartQuantity).should('have.text', '1')
        cy.get(cartPage.cartItem).find(cartPage.product.lblName).invoke('text').then(productName =>{
            cy.get('@productNameB').should('eq', productName)
        });
        cy.get(cartPage.cartItem).find(cartPage.product.lblDescription).invoke('text').then(productDescription =>{
            cy.get('@productDescriptionB').should('eq', productDescription)
        });
        cy.get(cartPage.cartItem).find(cartPage.product.lblPrice).invoke('text').then(productPrice =>{
            cy.get('@productPriceB').should('eq', productPrice)
        });

        cy.log('☑️ remove remaining product from cart and assert cart is empty');
        cy.get(cartPage.btnRemove).first().click();
        cy.get(cartPage.cartItem).should('not.exist');
    });

    it('Successful checkout', function() {

        cy.log('☑️ get details for product');
        cy.get(inventoryPage.product.lblName).eq(0).invoke('text').as('productName');
        cy.get(inventoryPage.product.lblDescription).eq(0).invoke('text').as('productDescription');
        cy.get(inventoryPage.product.lblPrice).eq(0).invoke('text').as('productPrice');

        cy.log('☑️ add product to cart');
        cy.get(inventoryPage.btnAddToCart).first().click();

        cy.log('☑️ open cart');
        cy.get(headerPage.btnShoppingCart).click();
        cy.get(cartPage.cartItem).should('have.length', 1);

        cy.log('☑️ checkout');
        cy.get(cartPage.btnCheckout).click();
        cy.get(checkoutPage.txtFirstName).type(Cypress.env('valid_user').firstName);
        cy.get(checkoutPage.txtLastName).type(Cypress.env('valid_user').lastName);
        cy.get(checkoutPage.txtPostalCode).type(Cypress.env('valid_user').postalCode);
        cy.get(checkoutPage.btnContinue).click();

        cy.log('☑️ assert the summary');
        cy.get(summaryPage.cartItem).should('have.length', 1);
        cy.get(summaryPage.cartItem).first().find(summaryPage.lblCartQuantity).should('have.text', '1')
        cy.get(summaryPage.cartItem).first().find(summaryPage.product.lblName).invoke('text').then(productName => {
            cy.get('@productName').should('eq', productName)
        });
        cy.get(summaryPage.cartItem).first().find(summaryPage.product.lblDescription).invoke('text').then(productDescription => {
            cy.get('@productDescription').should('eq', productDescription)
        });
        cy.get(summaryPage.cartItem).first().find(summaryPage.product.lblPrice).invoke('text').then(productPrice => {
            cy.get('@productPrice').should('eq', productPrice)
        });
        cy.get(summaryPage.lblSummaryValue).eq(0).invoke('text').should('equal', 'SauceCard #31337');
        cy.get(summaryPage.lblSummaryValue).eq(1).invoke('text').should('equal', 'FREE PONY EXPRESS DELIVERY!');
        
        cy.get(summaryPage.lblItemTotal).then((e) => {
            expect(e.text()).to.eq(`Item total: ` + this.productPrice);
        });
        cy.get('@productPrice').then(fullPrice => fullPrice.substring(1)).then(el => cy.wrap(Number(el))).as("rawProductPrice");
        cy.get(summaryPage.lblTax).invoke('text').then(rawTax => rawTax.substring(6)).then(el => cy.wrap(Number(el))).as("rawTax");
        cy.get(summaryPage.lblSummaryTotal).then((e) => {
            expect(e.text()).to.eq(`Total: $` + (Number(this.rawTax) + this.rawProductPrice));
        });
    });

    // Note: I would also like to automate negative cases like checkout with no items added to cart and similar, but unfortunately there are no interesting enough validations in saucedemo that would throw errors.

});
