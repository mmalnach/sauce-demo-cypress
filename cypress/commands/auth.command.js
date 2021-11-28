import { loginPage } from "../models/pages/loginPage"
import { headerPage } from "../models/pages/headerPage"

export const login = (user) => {
    Cypress.log({
        name: 'login',
        displayName: 'LOGIN',
        message: [`🔓 Logging in | 📧 ${user.login}`]
    });

    cy.visit('');
    cy.get(loginPage.txtUsername).type(user.login);
    cy.get(loginPage.txtPassword).type(user.password);
    cy.get(loginPage.btnLogin).click();

    if (user.shouldSucceed) {
        cy.url().should('include', Cypress.env('inventory_url'));
    } else {
        cy.get(loginPage.lblError).should('exist');
    }
};

export const logout = () => {
    Cypress.log({
        name: 'logout',
        displayName: 'LOGOUT',
        message: [`🔐 Logging out`]
    });

    cy.get(headerPage.btnMainMenuBurger).click();
    cy.get(headerPage.btnSideBarLogout).click();
    cy.get(loginPage.btnLogin).should('be.visible');

};

export const resetAppState = () => {
    Cypress.log({
        name: 'resetAppState',
        displayName: 'RESET',
        message: [`🔄 Resetting app state`]
    });

    cy.get(headerPage.btnMainMenuBurger).click();
    cy.get(headerPage.btnSideBarReset).click();
    cy.get(headerPage.btnMainMenuClose).click();
    cy.get(headerPage.imgShoppingBadge).should('not.exist');

};
