import '@testing-library/cypress';
import { v4 as uuid } from 'uuid';
import { paramCase } from 'change-case';

describe('04 Service', () => {
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

  it('01 Add & Edit Service', () => {
    const serviceOne = `Test Service ${uuid()}`;
    const serviceTwo = `Updated Test Service ${uuid()}`;

    cy.visit('http://localhost:3001/service');
    cy.get('.ej').click(); // cy.findByText('Add Service').click();
    cy.get('.bi > :nth-child(1) > .bd > .ae > .cq').type(serviceOne); //cy.findByLabelText('Service Name').type(serviceOne);
    cy.get('.bi > :nth-child(2) > .bd > .ae > .cq').type(paramCase(serviceOne)); //cy.findByLabelText('Service Name').type(serviceOne);
    cy.get(':nth-child(3) > .bt > .d2 > .dy').click(); // Category
    cy.get('#bui-8 > .b3').click(); // Select Category
    cy.get(':nth-child(4) > .ae > .cq').type(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum felis nec lacus varius, sit amet maximus nunc suscipit.',
    );
    cy.get('.rdw-editor-main').type(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum felis nec lacus varius, sit amet maximus nunc suscipit.',
    );
    cy.get(':nth-child(6) > .bd > .ae > .cq').type('29.00'); // Price
    cy.get(':nth-child(7) > .bd > .ae > .cq').type('10.00'); // Cashback Percent
    cy.get(':nth-child(8) > .bd > .ae > .cq').type('60'); // Duration Minutes
    cy.get(':nth-child(9) > .bd > .ae > .cq').type('1 Room'); // Duration Minutes
    cy.findByText('Create Service').click();

    const tableId = 'div.bj > .ai > .cx';
    cy.get(tableId)
      .contains(serviceOne)
      .should('exist');
    cy.findByText(serviceOne).click();
    cy.get('.bi > :nth-child(1) > .bd > .ae > .cq')
      .clear()
      .type(serviceTwo); //cy.findByLabelText('Service Name').type(serviceOne);
    cy.get('.ay > .e8').click(); // cy.findByText('Update Service').click();
    cy.get(tableId)
      .contains(serviceTwo)
      .should('exist');
    cy.get(tableId)
      .contains(serviceOne)
      .should('not.exist');
    cy.findByText(serviceTwo).click();
    cy.findByText('Active').click();
    cy.findByText('Inactive').click();
    cy.get('.ay > .e8').click(); // cy.findByText('Update Service').click();
    cy.get(tableId)
      .contains('INACTIVE')
      .should('exist');
  });

  it('02 List, Filter & Search Existing Service', () => {
    cy.visit('http://localhost:3001/service');
    cy.findByPlaceholderText('Ex: Search By Name').type('Service');
    cy.get('div.bj > .ai > .cx')
      .contains('Car')
      .should('not.exist');
    cy.get('div.bj > .ai > .cx')
      .contains('Test Service')
      .should('exist');
    cy.get('.df > .ae > .b3').click(); // Clear Search
    cy.get('div.bj > .ai > .cx')
      .contains('Test Service')
      .should('exist');
    cy.get('div.bj > .ai > .cx')
      .contains('Car')
      .should('exist');
    cy.get('.d2 > .be').click();
    cy.get('#bui-5').click(); // cy.findByText('Inactive').click();
    cy.get('div.bj > .ai > .cx')
      .contains('INACTIVE')
      .should('exist');
  });
});
