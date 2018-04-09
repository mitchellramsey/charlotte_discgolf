
var passport = require("passport");

module.exports = function (app) {
    // Auth Sign-in route
    app.get("/", function (req, res) {
        // Method to load the sign-in partial
        res.render("index", {
            partial: function () {
                return "signin";
            }
        });
    });

    // Auth Log-out
    app.get("/auth/logout", function (req, res) {
        // Handle with passport
        res.send("Logging out");
    });

    //  Auth with Google
    // Using Passport use the Google stategy
    // To redirect to the consent screen
    app.get("/auth/google", passport.authenticate("google", {
        // Looking for profile contents
        scope: ["profile"]    
    }));

    // Callback that Passport uses to exchange the URL params
    // For the users information
    app.get("/auth/google/redirect", passport.authenticate("google"), function (req, res) {
        // Redirect after log-in
        res.redirect("/userprofile");
    });
    
};