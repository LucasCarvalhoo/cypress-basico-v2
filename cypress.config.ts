const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //teste desktop
  viewportHeight: 880,
  viewportWidth: 1280,
  //teste mobile
  //viewportHeight: 370,
  //viewportWidth: 660,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
