var db = require("../models");
// var userInfo = require("../models").UserInfo;
module.exports = function(app) {
  app.post("/new", function (req, res) {
    console.log(req);
    db.UserInfo.create({
      name: req.body.name,
      user_name: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
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
        res.json(userObj);
    });
  });
};


