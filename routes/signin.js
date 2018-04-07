var db = require("../models");

module.exports = function(app) {

app.post("/api/models/user_info/", function(req, res) {
  // console.log(req.body)
db.UserInfo.findOne({
  where: {
    email: req.body.email,
    password: req.body.password,
  }
  
})
  .then(function (result) {
    console.log(result.id);
    if(result){
      // console.log("Access Granted!!")
      res.redirect("/homepage/" + result.user_name);
    } else {
      // console.log("Username or Password was incorrect.")
    }
  });
})
}

