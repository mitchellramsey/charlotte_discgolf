// Passport set-up

// Requiring passport
var passport = require("passport");
// Loading the Google log-in Strategy
var GoogleStrategy = require("passport-google-oauth20");
// Requiring keys.js
var keys = require("./keys");
// Configuring and using the Google Strategy
passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: "/auth/google/redirect",
        // Client ID and secret
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },() => {
        // Callback
    })
)