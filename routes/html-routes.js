var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  app.get("/registration", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });

  app.get("/courses", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/courses.html"));
  });

  app.get("/course_info", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/course_info.html"));
  });

};