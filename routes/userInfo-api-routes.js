// Requiring models
var db = require("../models");

// Creating a new user
module.exports = function(app) {
  app.post("/new", function (req, res) {
    db.UserInfo.create({
      user_name: req.body.name,
      email: req.body.email,
      password: req.body.psw
    })
    // Redirecting to homepage after creation
    res.redirect("/homepage");
  });


  app.get("/user", function(req,res) {
      // Retrieving all database records
      db.UserInfo.findAll({}).then(function(dbUserInfo) {
          // Passing handlebars the data from findAll
          var userObj = {
              usersList: dbUserInfo
          };
          // Rendering courses and passing the data to be parsed on the handlebars page
          res.render("index", userObj);
      });
  });
};
