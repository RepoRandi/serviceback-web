declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    loginAdmin(): Chainable<Element>;
    saveLocalStorage(): Chainable<Element>;
    restoreLocalStorage(): Chainable<Element>;
  }
}
