import '@testing-library/cypress';
import { v4 as uuid } from 'uuid';
import { paramCase } from 'change-case';

describe('02 Service Category', () => {
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

  it('01 Add & Edit Category', () => {
    const categoryOne = `Test Category ${uuid()}`;
    const categoryTwo = `Updated Test Category ${uuid()}`;

    cy.visit('http://localhost:3001/category');
    cy.get('.ej').click(); // cy.findByText('Add Category').click();
    cy.get('.bi > :nth-child(1) > .bd > .ae > .cq').type(categoryOne); //cy.findByLabelText('Category Name').type(categoryOne);
    cy.get('.bi > :nth-child(2) > .bd > .ae > .cq').type(
      paramCase(categoryOne),
    );
    cy.get('.h0').click();
    cy.get('.rdw-editor-main').type(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum felis nec lacus varius, sit amet maximus nunc suscipit.',
    );
    cy.findByText('Create Category').click();

    const tableId = 'div.bj > .ai > .cx';
    cy.get(tableId)
      .contains(categoryOne)
      .should('exist');
    cy.findByText(categoryOne).click();
    cy.get('.bi > :nth-child(1) > .bd > .ae > .cq')
      .clear()
      .type(categoryTwo); //cy.findByLabelText('Category Name').type(categoryOne);
    cy.get('.ay > .e8').click(); // cy.findByText('Update Category').click();
    cy.get(tableId)
      .contains(categoryTwo)
      .should('exist');
    cy.get(tableId)
      .contains(categoryOne)
      .should('not.exist');
    cy.findByText(categoryTwo).click();
    cy.findByText('Active').click();
    cy.findByText('Inactive').click();
    cy.get('.ay > .e8').click(); // cy.findByText('Update Category').click();
    cy.get(tableId)
      .contains('INACTIVE')
      .should('exist');
  });

  it('02 List, Filter & Search Existing Categories', () => {
    cy.visit('http://localhost:3001/category');
    cy.findByText('Aircon').should('exist');
    cy.findByText('Cleaning').should('exist');
    cy.findByText('Electrical').should('exist');
    cy.findByText('Handyman').should('exist');
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
    cy.get('div.bj > .ai > .cx')
      .contains('Handyman') // TOFIX: ACTIVE is a substring of INACTIVE and can't be tested
      .should('not.exist');
  });
});
