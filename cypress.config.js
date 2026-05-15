const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://walkdog.vercel.app/signup",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  projectId: "2mkvht",
});
