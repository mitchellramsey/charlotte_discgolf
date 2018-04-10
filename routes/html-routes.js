var db = require("../models");

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

  // User Registration route
  app.get("/registration", function (req, res) {
    // Handlebars object for the user-registration form
    var personObj = {
      users: req,

      // Renders the courses partial
      partial: function () {
        return "registration-page";
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
    var user = req.user.dataValues.username;
    db.UserInfo.findOne({
      where: {
        username: user
      }
    }).then(function(dbUserInfo) {
      var id = dbUserInfo.id;
      console.log("Id: " + id);
      db.UserRound.findAll({
        where: {
          UserInfoId: id

        },
        include: [db.Course]
        
      }).then(function(dbUserRounds) {
          console.log(dbUserRounds);
          console.log("Look Above");
            var userMainInfo = {
              users: req.user.dataValues.username,
              userId : id,
              userRoundsObj: dbUserRounds,
              partial: function() {
                return "user_main";
              }
            }
            res.render("index", userMainInfo);

        
      });
    });

  });
};

