const { defineConfig } = require("cypress");

var PUBLIC_URL = process.env.PUBLIC_URL;

module.exports = defineConfig({
  e2e: {
    baseUrl: PUBLIC_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
