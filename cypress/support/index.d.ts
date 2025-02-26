// cypress/support/index.d.ts

// This is type augmentation for Cypress to recognize the custom command

declare namespace Cypress {
    interface Chainable {
      visitHomePage(): Chainable<void>;
    }
  }
  