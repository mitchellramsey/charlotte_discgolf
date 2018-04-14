
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
        req.logout();
        // Redirecting to homepage after logging out
        res.redirect("/");
    });

    //  Auth with Google
    // Using Passport use the Google stategy
    // To redirect to the consent screen
    app.get("/auth/google", passport.authenticate("google", {
        // Looking for profile contents
        scope: ["profile"],
        // Google prompt to choose which email/account
        // Doing this so upon log out, youre not automatically using the same email address again
        // Incase user would like to switch
        prompt: "select_account"
    }));

    // Callback that Passport uses to exchange the URL params
    // For the users information
    app.get('/auth/google/redirect',
        passport.authenticate('google', {
            // On sucess redirect to the user-profile
            successRedirect: '/userprofile',
            // Else return to the log-in screen
            failureRedirect: '/'
        }
    ));

    // ------------------------------- GITHUB AUTH ------------------------------------ //

    //  Auth with Github
    // Using Passport use the Github stategy
    // To redirect to the consent screen
    app.get("/auth/github", passport.authenticate("github", {
        // Looking for profile contents
        scope: ["profile"],
        // Google prompt to choose which email/account
        // Doing this so upon log out, youre not automatically using the same email address again
        // Incase user would like to switch
        prompt: "select_account"
    }));

    // Callback that Passport uses to exchange the URL params
    // For the users information
    app.get('/auth/github/callback',
        passport.authenticate('github', {
            // On sucess redirect to the user-profile
            successRedirect: '/homepage',
            // Else return to the log-in screen
            failureRedirect: '/'
        }
    ));
};