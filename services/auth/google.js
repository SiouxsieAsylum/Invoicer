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
    User.findByEmail(profile.email)
    .then(user => {
      if(!user){
        User.create({
          name: profile.displayName,
          email: profile.email,
          icon: profile.icon,
          accessToken: accessToken,
          refreshToken: refreshToken
        })
        .then(user => {
          done(null,user)
        })
      } else {
        console.log(accessToken)
        if (refreshToken){
          return User.updateRefreshToken(refreshToken,profile.email)
        }
        User.updateAccessToken(accessToken,profile.email)
        .then(accessed_user=>{
          done(null,user)
        })
        .catch(err => console.log(err))
      }
    })
    .catch(profile => console.log(profile))
  }
))
// thirdtimeisthedamncharm@gmail.com
module.exports = passport;
