var db = require("../models");
var path = require("path");

//Course Data
db.Course.findAndCountAll({}).then(function(result) {
    if(result.count === 0) {
        db.Course.create({
            name: "Robert L. Smith Park",
            address: "1604 Little Rock Rd, Charlotte, NC 28214",
            holes: 18,
            rating: 4.14,
            
        });
        db.Course.create({
            name: "Nevin Park DGC",
            address: "6000 Statesville Rd, Charlotte, NC 28269",
            holes: 18,
            rating: 4.28
            //There has been 55 reviews
        });
        db.Course.create({
            name: "Hornets Nest Park",
            address: "6301 Beatties Ford Rd, Charlotte, NC 28216",
            holes: 18,
            rating: 4.25
            //There has been 10 reviews
        });
    }
    
});

// Exporting the function
module.exports = function(app) {

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

    app.get("/courses", function(req,res) {
        // Retrieving all database records
        db.Course.findAll({}).then(function(dbCourse) {
            // Passing handlebars the data from findAll
            var coursesObj = {
                coursesList: dbCourse,
                users: req,

                // Renders the courses partial
                partial: function() {
                    return "courses-page";
                }
            };
            console.log(coursesObj);
            // Rendering courses and passing the data to be parsed on the handlebars page
            res.render("index", coursesObj);
        });
    });
};