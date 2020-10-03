---
to: admin/cypress/integration/00-<%= h.changeCase.camel(name) %>.spec.ts
---
import '@testing-library/cypress';
import { v4 as uuid } from 'uuid';

describe('00 <%= h.changeCase.pascal(name) %>', () => {
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

  it.only('01 Add & Edit <%= h.changeCase.pascal(name) %>', () => {
    const <%= h.changeCase.camel(name) %>One = `Test <%= h.changeCase.pascal(name) %> ${uuid()}`;
    const <%= h.changeCase.camel(name) %>Two = `Updated Test <%= h.changeCase.pascal(name) %> ${uuid()}`;

    cy.visit('http://localhost:3001/<%= h.changeCase.camel(name) %>');
    cy.get('.ej').click(); // cy.findByText('Add <%= h.changeCase.pascal(name) %>').click();
    cy.get('.bi > :nth-child(1) > .bd > .ae > .cq').type(<%= h.changeCase.camel(name) %>One); //cy.findByLabelText('<%= h.changeCase.pascal(name) %> Name').type(<%= h.changeCase.camel(name) %>One);
    cy.get('.rdw-editor-main').type(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum felis nec lacus varius, sit amet maximus nunc suscipit.',
    );
    cy.findByText('Create <%= h.changeCase.pascal(name) %>').click();

    const tableId = 'div.bj > .ai > .cx';
    cy.get(tableId)
      .contains(<%= h.changeCase.camel(name) %>One)
      .should('exist');
    cy.findByText(<%= h.changeCase.camel(name) %>One).click();
    cy.get('.bi > :nth-child(1) > .bd > .ae > .cq')
      .clear()
      .type(<%= h.changeCase.camel(name) %>Two); //cy.findByLabelText('<%= h.changeCase.pascal(name) %> Name').type(<%= h.changeCase.camel(name) %>One);
    cy.get('.ay > .e8').click(); // cy.findByText('Update <%= h.changeCase.pascal(name) %>').click();
    cy.get(tableId)
      .contains(<%= h.changeCase.camel(name) %>Two)
      .should('exist');
    cy.get(tableId)
      .contains(<%= h.changeCase.camel(name) %>One)
      .should('not.exist');
    cy.findByText(<%= h.changeCase.camel(name) %>Two).click();
    cy.findByText('Active').click();
    cy.findByText('Inactive').click();
    cy.get('.ay > .e8').click(); // cy.findByText('Update <%= h.changeCase.pascal(name) %>').click();
    cy.get(tableId)
      .contains('INACTIVE')
      .should('exist');
  });

  it('02 List, Filter & Search Existing <%= h.changeCase.pascal(name) %>', () => {
    cy.visit('http://localhost:3001/<%= h.changeCase.camel(name) %>');
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
