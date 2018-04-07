var db = require("../models");

module.exports = function(app) {

app.post("/api/models/user_info/", function(req, res) {
  console.log(req.body)
db.UserInfo.find({
  where: {
    email: req.body.email,
    password: req.body.password,
  }
  
})
  .then(function (result) {
    console.log(result);
    if(result){
      console.log("Access Granted!!")
      res.redirect("/homepage");
    } else {
      console.log("Username or Password was incorrect.")
    }
  });
})
}

