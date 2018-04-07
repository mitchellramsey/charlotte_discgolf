var path = require("path");

module.exports = function(app) {
  // Homepage route
  app.get("/", function(req, res) {
    // Method to load the homepage partial
    res.render("index", {
      partial: function() {
        return "homepage";
      }
    });
  });

  // User Registration route
  app.get("/registration", function(req, res) {
    // Handlebars object for the user-registration form
    res.render("index", {
      // Method to load the registration partial
      partial: function() {
        return "registration-page";
      }
    });
  });
};