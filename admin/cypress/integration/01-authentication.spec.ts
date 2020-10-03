import '@testing-library/cypress';

describe('01 Authentication', () => {
  it('01 Log In and Out Successfully', () => {
    cy.loginAdmin();
    cy.findByAltText('user').click();
    cy.get('.b2 > .b4 > .cj').click(); // cy.findByText('Logout').click();
    cy.findByText('Log in to admin').should('exist');
  });
});
