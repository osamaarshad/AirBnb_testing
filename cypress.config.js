const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // Include spec pattern for test files
    specPattern: "cypress/integration/e2e/**/*.spec.ts",  // Match .spec.ts files in the e2e folder
  },
});
