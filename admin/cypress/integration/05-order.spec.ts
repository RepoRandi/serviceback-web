import '@testing-library/cypress';
import { v4 as uuid } from 'uuid';

describe('00 Order', () => {
  before(() => {
    cy.loginAdmin();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it.skip('01 Add & Edit Order', () => {
    cy.visit('http://localhost:3001/order');
    cy.get('.cx > :nth-child(7)').click();
  });

  it.skip('02 List, Filter & Search Existing Order', () => {
    cy.visit('http://localhost:3001/order');
    cy.findByPlaceholderText('Ex: Search By Name').type('Air');
    cy.get('div.bj > .ai > .cx')
      .contains('Painting')
      .should('not.exist');
    cy.get('div.bj > .ai > .cx')
      .contains('Aircon')
      .should('exist');
    cy.get('.df > .ae > .b3').click(); // Clear Search
    cy.findByText('Electrical').should('exist');
    cy.findByText('Handyman').should('exist');
    cy.get('.d2 > .be').click();
    cy.get('#bui-5').click(); // cy.findByText('Inactive').click();
    cy.get('div.bj > .ai > .cx')
      .contains('INACTIVE')
      .should('exist');
  });
});
