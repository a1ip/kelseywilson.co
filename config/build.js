// Inform that the site build has started
(function(){
  console.log("========================");
  console.log("Build process started...");
  console.log("========================");
})();

module.exports = {
  // Log each step as it finishes
  step: function(message) {
    console.log(">> " + message);
  },
  // Throw error or log build completion
  status: function(error) {
    if (error) {
      // Reports any build errors on initial build
      console.log("Oops, there was a problem!");
      console.log(error.message);
    } else {
      console.log("========================");
      console.log("Build process completed!");
      console.log("========================");
    }
  }
}
