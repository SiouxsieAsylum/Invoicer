const passport = require('passport')
const googleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../../models/User')

passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //what exactly is this url supposed to be? Is the user ever supposed to interact with this?
  callbackURL: "http://localhost:3001/api/auth/google/callback"
},
  function(accessToken,refreshToken,profile,done){
    debugger;
    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)
    // is this just find the user email in my database, and if it doesn't exist, insert it as a user? Is that what this does?
    // User.findOrCreate({googleId: profile.id},function(err,user){
    //   return done(err,user)
    // })
    User.findByEmail(profile.email)
    .then(user => {
      if(!user){
        User.create({
          name: profile.name,
          email: profile.email,
          icon: profile.icon,
          accessToken: accessToken,
          refreshToken: refreshToken
        })
      } else {
        if (refreshToken){
          return User.updateRefreshToken(refreshToken)
        }
        User.updateAccessToken(accessToken)
        .then(accessed_user=>{
          done(null,user)
        })
      }
    })
    .catch(profile => console.log(profile))
  }
))

module.exports = passport;
