var browsersync = require("browser-sync").create();
var config = { browsersync: require("./browsersync") };

module.exports = {
  // Log each step as it finishes
  step: function(message) {
    console.log("- " + message);
  },
  // Throw error or log build completion
  serve: function(error) {
    browsersync.init(config.browsersync);
    if (error) {
      // Reports any build errors on initial build
      console.log("Oops, there was a problem!");
      console.log(error.message);
    }
  }
}
