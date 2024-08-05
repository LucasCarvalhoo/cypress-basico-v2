// cypress/support/index.d.ts

declare namespace Cypress {
    interface Chainable<Subject> {
      fillMandatoryFieldsAndSubmit(): Chainable<Subject>;
    }
  }
  