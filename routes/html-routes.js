var db = require("../models");

module.exports = function (app) {

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

  // Hompage route
  app.get("/homepage", authCheck, function (req, res) {
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
        order:[ ['id', 'DESC']],
        include: [db.Course]
        
      }).then(function(dbUserRounds) {
            var userMainInfo = {
              users: req,
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

  app.get("/user_round", authCheck, function(req,res) {
    // console.log(req.user);
    db.Course.findAll({
      include: [db.Hole]
    }).then(function(dbCourseInfo) {
    
      var playRoundObj = {
        courseInfo: dbCourseInfo,
        users: req,
        partial: function() {
          return "user_round";
        }
      }
      // console.log(playRoundObj.users);
      res.render("index", playRoundObj);
    }); 
  });
};

