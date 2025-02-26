// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Automatically visits the base URL before every test

// Cypress custom command to visit the homepage globally before each test
// cypress/support/commands.ts
// cypress/support/commands.ts

// cypress/support/commands.ts
// cypress/support/commands.ts

// Add the custom command here
Cypress.Commands.add('visitHomePage', () => {
  cy.visit('https://www.airbnb.com/',{failOnStatusCode:true});
});

// Set up beforeEach() to call the custom command before each test
beforeEach(() => {
  cy.visitHomePage(); // Automatically visits the site before each test
});
