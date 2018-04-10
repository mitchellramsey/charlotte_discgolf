
module.exports = function (app) {

  // Hompage route
  app.get("/homepage", function (req, res) {
    // Method to load the homepage partial
    var personObj = {
      users: req,

      // Renders the courses partial
      partial: function () {
        return "homepage";
      }
    };
    // Rending user_main
    res.render("index", personObj);
  });

  // Checking to see if the user is logged in or not
  var authCheck = function (req, res, next) {
    // If user is not logged in..
    if (!req.user) {
      // Re-directs to the main page
      // Which is sign-in/sign-up
      res.redirect("/");
    } else {
      next();
    }
  }

  // User profile route
  app.get("/userprofile", authCheck, function (req, res) {
    // Temp HTML
    var personObj = {
      users: req,

      // Renders the courses partial
      partial: function () {
        return "user_main";
      }
    };
    // Rending user_main
    res.render("index", personObj);
  });
};

