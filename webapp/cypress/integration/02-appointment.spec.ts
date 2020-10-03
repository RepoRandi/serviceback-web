import '@testing-library/cypress';

describe('02 Appointment', () => {
  it('01 Book Appointment - Logged in', () => {
    cy.loginAdmin();
    cy.findByText('Aircon').click();
    cy.get(':nth-child(1) > .service-gridstyle__ServiceItem-irkfyw-2').click();
    cy.findByText('Choose Quantity').click();
    cy.findByText('Book Appointment').click();
    cy.findByText('Proceed to Checkout').click();
  });

  it('02 Amend Appointment', () => {
    cy.loginAdmin();
    cy.visit('http://localhost:3000/current-appointments');
    cy.get(
      '.orderstyle__OrderList-sc-1rtomvy-4 > :nth-child(1) > .order-cardstyle__OrderListHeader-sc-1lfy59m-8',
    ).click();
  });
});
