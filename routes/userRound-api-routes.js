var db = require("../models");

db.UserRound.findAndCountAll({}).then(function(result) {
    if(result.count===0) {
        db.UserRound.create({
            score: "+4",
            tosses: 60,
            CourseId: 1,
            UserInfoId: 1 
        });
        db.UserRound.create({
            score: "-1",
            tosses: 55,
            CourseId: 1,
            UserInfoId: 1
        });
    }
});



module.exports = function(app) {
    app.get("/user_round", function(req,res) {
        // Retrieving all database records
        db.UserRound.findAll({}).then(function(dbUserRound) {
            // Passing handlebars the data from findAll
            var userRoundObj = {
                usersRounds: dbUserRound,
                partial: function() {
                  return "user_round";
                }
            };
            console.log(userRoundObj);
            // Rendering courses and passing the data to be parsed on the handlebars page
            res.render("user_round", userRoundObj);
        });
    });
  };
  