var path = require("path");

module.exports = function(app) {
  // Homepage route
  app.get("/", function(req, res) {
    // Handlebars object for homepage content
    var hbsObject = {
      homepage: res
    };
    res.render("index", hbsObject);
  });

  // Course route
  app.get("/courses", function(req, res) {
    // Handlebars object for courses content
    var courseObject = {
      courses: res
    };
    res.render("courses", courseObject);
  });

  // Course info route
  app.get("/courseinfo", function(req, res) {
    // Handlebars object for course info content
    var courseInfoObject = {
      courseInfo: res
    };
    res.render("course-info", courseInfoObject);
  });

  // Course info route
  app.get("/registration", function(req, res) {
    // Handlebars object for course info content
    var registrationObj = {
      register: res
    };
    res.render("registration", registrationObj);
  });
};