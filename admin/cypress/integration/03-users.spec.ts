import '@testing-library/cypress';
import { v4 as uuid } from 'uuid';

describe('03 Users', () => {
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

  it.skip('01 Add & Edit User', () => {
    // SKIP BECAUSE FIREBASE
    const userOneUuid = uuid();
    const userOne = `Test User ${userOneUuid}`;
    const userTwo = `Update Test ${userOneUuid}`;

    cy.visit('http://localhost:3001/user');
    cy.get('.cq').click(); // cy.findByText('Add User').click();
    cy.get(':nth-child(1) > .bd > .ae > .gh').type(userOne); //cy.findByLabelText('User Name').type(userOne);
    cy.get('.bi > :nth-child(2) > .bd > .ae > .gh').type(
      `test+${userOneUuid}@serviceback.sg`,
    );
    cy.findByText('Create User').click();

    const tableId = '.du';
    cy.get(tableId)
      .contains(userOne)
      .should('exist');
    cy.findByText(userOne).click();
    cy.get(':nth-child(1) > .bd > .ae > .gh')
      .clear()
      .type(userTwo); //cy.findByLabelText('User Name').type(userOne);
    cy.get('.ay > .db').click(); // cy.findByText('Update User').click();
    cy.get(tableId)
      .contains(userTwo)
      .should('exist');
    cy.get(tableId)
      .contains(userOne)
      .should('not.exist');
    cy.findByText(userTwo).click();
    cy.get(':nth-child(5) > .bt > .f7 > .h3') // Verified Field
      .click();
    cy.get('#bui-21').click();
    cy.get('.ay > .db').click(); // cy.findByText('Update User').click();
  });

  //   it('02 List, Filter & Search Existing Users', () => {
  //     cy.visit('http://localhost:3000/user');
  // cy.findByPlaceholderText('Ex: Search By Email').type('anttyc');
  //     cy.get('div.bj > .ai > .cx')
  //       .contains('Painting')
  //       .should('not.exist');
  //     cy.get('div.bj > .ai > .cx')
  //       .contains('Aircon')
  //       .should('exist');
  //     cy.get('.df > .ae > .b3').click(); // Clear Search
  //     cy.findByText('Electrical').should('exist');
  //     cy.findByText('Handyman').should('exist');
  //     cy.get('.d2 > .be').click();
  //     cy.get('#bui-5').click(); // cy.findByText('Inactive').click();
  //     cy.get('div.bj > .ai > .cx')
  //       .contains('INACTIVE')
  //       .should('exist');
  //     cy.get('div.bj > .ai > .cx')
  //       .contains('Handyman') // TOFIX: ACTIVE is a substring of INACTIVE and can't be tested
  //       .should('not.exist');
  //   });
});
