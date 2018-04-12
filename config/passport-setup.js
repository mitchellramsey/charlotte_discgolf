
module.exports = function (passport, UserInfo) {
    // Importing UserInfo model
    var db = require("../models");

    // Passport set-up

    // Requiring passport
    var passport = require("passport");
    // Loading the Google log-in Strategy
    var GoogleStrategy = require("passport-google-oauth20");
    // Requiring keys.js
    var keys = require("./keys");

    // Serializing the User
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

     // Deserializing the User
     passport.deserializeUser(function(id, done) {
        db.UserInfo.findById(id).then(function(user) {
            done(null, user);
        })
    });

    // Configuring and using the Google Strategy
    passport.use(
        new GoogleStrategy({
            // Client ID and secret
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            // options for the strategy
            callbackURL: "/auth/google/redirect",
        }, (accessToken, refreshToken, profile, done) => {

            // If user has a Google account already
            db.UserInfo.findOne({
                where: {
                    googleId: profile.id
                }
            }).then(function(googleId) {
                // If Google ID exists..
                if (googleId) {
                    console.log("You already have an account:" + profile.displayName);
                    done(null, googleId);
                } else {
                    // Creating a new user and putting it into the User-Info table
                    db.UserInfo.create({
                        // Google display name
                        username: profile.displayName,
                        // Google ID
                        googleId: profile.id
                    }).then(function (req, res) {
                        // console.log("I made it to this point");
                        // console.log(res);
                        // console.log(req);
                        done(null, req.UserInfo)
                    });
                }
            });
        })
    )
};