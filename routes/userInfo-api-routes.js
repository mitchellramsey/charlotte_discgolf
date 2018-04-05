var db = require("../models");

module.exports = function(app) {
  app.post("/new", function (req, res) {
    db.UserInfo.create({
      user_name: req.body.name,
      email: req.body.email,
      password: req.body.psw
    })
    res.redirect("/");
  })
};
