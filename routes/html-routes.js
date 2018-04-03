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

  app.get("/courses", function(req, res) {
    // Handlebars object for homepage content
    var courseObject = {
      courses: res
    };
    res.render("courses", courseObject);
  });

  app.get("/registration", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });

  app.get("/course_info", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/course_info.html"));
  });

};