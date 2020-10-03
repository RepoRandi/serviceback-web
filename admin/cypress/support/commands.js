// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3001/login');
  cy.findAllByText('Email')
    .siblings()
    .type(email);
  cy.findAllByText('Password')
    .siblings()
    .type(password);
  cy.findAllByText('Submit').click();
  cy.findByAltText('user').should('exist');
  cy.wait(2000);
});

Cypress.Commands.add('loginAdmin', () => {
  cy.login('anttyc+sb001@gmail.com', 'asdQWE123');
});

Cypress.Commands.add('clickSideMenuIcon', () => {
  cy.get('.bl > svg').click(); // Click Hambuger Menu
});

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
