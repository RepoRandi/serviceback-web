import '@testing-library/cypress';

describe('01 Authentication', () => {
  it('01 Log In and Out Successfully', () => {
    cy.loginAdmin();
    cy.get(
      '#layout-header > .right-menustyle__RightMenuBox-xt5m3h-0 > .popoverstyle__PopoverWrapper-sc-1rdppnn-0 > .popover-handler > img',
    ).click();
    cy.get(':nth-child(8) > a').click();
  });

  it.skip('02 Sign up and login Successfully', () => {
    // SKIP BECAUSE FIREBASE SIGNUP
    const email = `anttyc+${Date.now()}@gmail.com`;
    cy.visit('http://localhost:3000');
    cy.get(
      '#layout-header > .right-menustyle__RightMenuBox-xt5m3h-0 > .button__StyledButton-vnxdd1-0',
    ).click();
    cy.get(
      '.authentication-formstyle__Container-sc-1vxauh6-2 > .authentication-formstyle__Offer-sc-1vxauh6-7 > .authentication-formstyle__LinkButton-sc-1vxauh6-10',
    ).click();
    cy.findByPlaceholderText('Ex: John.Doe@email.com').type(email);
    cy.findByPlaceholderText('Password (min 6 characters)').type('asdQWE123');
    cy.get('form > .button__StyledButton-vnxdd1-0').click();
  });
});
