// Requiring models
var db = require("../models");

// Creating a new user
module.exports = function(app) {
  app.post("/new", function (req, res) {
    db.UserInfo.create({
      name: req.body.name,
      user_name: req.body.username,
      email: req.body.email,
      password: req.body.psw
    })
    // Redirecting to homepage after creation
    res.redirect("/homepage/:user_name");
  });


  app.get("/homepage/:user_name", function(req,res) {
      // Retrieving all database records
      db.UserInfo.findOne({
        where: {
          user_name: req.params.user_name
        }
      }).then(function(dbUserInfo) {
          // Passing handlebars the data from findAll
          var userObj = {
              usersList: dbUserInfo,
              partial: function() {
                return "homepage";
              }
          };
          console.log(userObj);
          // Rendering courses and passing the data to be parsed on the handlebars page
          res.render("index", userObj);
      });
  });

  app.get("/user", function(req,res) {
    // Retrieving all database records
    db.UserInfo.findAll({}).then(function(dbUserInfo) {
        // Passing handlebars the data from findAll
        var userObj = {
          usersList: dbUserInfo,
          partial: function() {
            return "user_main";
          }
      };
      console.log(userObj);
      // Rendering courses and passing the data to be parsed on the handlebars page
      res.render("user_main", userObj);
  });
});
};

