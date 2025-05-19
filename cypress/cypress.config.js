// Develop/cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}"
  },

  e2e: {
    baseUrl: "http://localhost:3000",         // or 5173 if that’s where you serve your client
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/commands.ts"
  }
});
