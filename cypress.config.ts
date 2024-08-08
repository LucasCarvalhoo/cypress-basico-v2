const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //teste desktop
  viewportHeight: 880,
  viewportWidth: 1280,
  
  //teste mobile
  // viewportHeight: 410,
  // viewportWidth: 860,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
