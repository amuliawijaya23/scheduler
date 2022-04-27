const { CYCLIC_KEY } = require("@storybook/addon-actions")

describe('Navigation', () => {

  it("should visit root", () => {
    cy.visit('/');
  });
});