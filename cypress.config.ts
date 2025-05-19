// Develop/cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  // 🔨 Component Testing
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    // where your component specs live:
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
  },

  // 🌐 End‑to‑End Testing
  e2e: {
    // point at your running front‑end
    baseUrl: "http://127.0.0.1:3001",       // ← match your `npm run client:dev` URL
    // where your E2E specs live:
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    // (optional) if you have custom commands:
    supportFile: "cypress/support/commands.ts",
    setupNodeEvents(on, config) {
      // keep any existing event hooks here
      return config;
    },
  },
});
