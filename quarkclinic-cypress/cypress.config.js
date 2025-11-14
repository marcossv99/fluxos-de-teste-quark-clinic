import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://agendamento.quarkclinic.com.br/index/363622206",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    defaultCommandTimeout: 10000,
    retries: 2,
    watchForFileChanges: true,
  },
});
