
module.exports = function (passport, UserInfo) {
    // Passport set-up

    // Requiring passport
    var passport = require("passport");
    // Loading the Google log-in Strategy
    var GoogleStrategy = require("passport-google-oauth20");
    // Loading the Github log-in Strategy
    var GithubStrategy = require("passport-github2");
    // Requiring keys.js
    var keys = require("./keys");

    // Serializing the User
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

     // Deserializing the User
     passport.deserializeUser(function(id, done) {
        UserInfo.findById(id).then(function(user) {
            done(null, user);
        })
    });

    // Configuring and using the Google Strategy
    passport.use(
        new GoogleStrategy({
            // Client ID and secret
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            // Callback
            callbackURL: keys.google.callbackURL,
            passReqToCallback: true
        }, 
        function(accessToken, refreshToken, profile, done) {

                // Searching for an existing googleId
                UserInfo.findOrCreate({
                    where: {
                        // Google display name
                        username: profile.displayName,
                        // Google ID
                        googleId: profile.id
                    }
                    }).spread(function(user) {
                    // If Google ID exists..
                    if (user) {
                        console.log("You already have an account:" + profile.displayName);
                        return done(null, user);
                    }
                });
        })
    )

    // --------------------------------- GITHUB AUTH ------------------------- //

    // Configuring and using the Github Strategy
    passport.use(
        new GithubStrategy({
            // Client ID and secret
            clientID: keys.github.clientID,
            clientSecret: keys.github.clientSecret,
            // Callback
            callbackURL: keys.github.callbackURL,
            passReqToCallback: true
        }, 
        function(accessToken, refreshToken, profile, done) {

                // Searching for an existing googleId
                UserInfo.findOrCreate({
                    where: {
                        // Google display name
                        username: profile.displayName,
                        // Google ID
                        githubId: profile.id
                    }
                    }).spread(function(user) {
                    // If Google ID exists..
                    if (user) {
                        console.log("You already have an account:" + profile.displayName);
                        return done(null, user);
                    }
                });
        })
    )
};