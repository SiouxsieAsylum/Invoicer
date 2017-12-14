const passport = require('passport')
const yahooStrategy = require('passport-yahoo-oauth2').Strategy;
const User = require('../../models/User')

passport.use(new yahooStrategy({
    consumerKey: process.env.YAHOO_CONSUMER_ID,
    consumerSecret: process.env.YAHOO_CONSUMER_SECRET,
      //what exactly is this url supposed to be? Is the user ever supposed to interact with this?
    callbackURL: "http://localhost:3001/auth/yahoo/callback"
  },
  function(token, tokenSecret, profile, done) {
     // is this just find the user email in my database, and if it doesn't exist, insert it as a user? Is that what this does?
    User.findOrCreate({ yahooId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;
