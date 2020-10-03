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
  cy.visit('http://localhost:3000');
  cy.get(
    '#layout-header > .right-menustyle__RightMenuBox-xt5m3h-0 > .button__StyledButton-vnxdd1-0',
  ).click(); // cy.findByText('Login').click();
  cy.findByPlaceholderText('Ex: John.Doe@email.com').type(email);
  cy.findByPlaceholderText('Password (min 6 characters)').type(password);
  cy.findByText('Continue').click();
  cy.wait(2000); // Wait for Firebase to send token
});

Cypress.Commands.add('loginAdmin', () => {
  cy.login('anttyc+sb001@gmail.com', 'asdQWE123');
});

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
