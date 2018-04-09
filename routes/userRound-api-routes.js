var db = require("../models");

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
  