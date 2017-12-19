const passport = require('passport')
const googleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../../models/User')

passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // callbackURL: 'https://template-mailer-oauth2.herokuapp.com/auth/google/callback'
  callbackURL:'http://localhost:5000/api/auth/google/callback'
},
  function(accessToken1,refreshToken1,profile,done){
    console.log("**********************")
    console.log("access =" + accessToken1)
    console.log("refresh =" + refreshToken1)
    console.log("**********************")
    User.findByEmail(profile.email)
    .then(user => {
      if(!user){
        User.create({
          name: profile.displayName,
          email: profile.email,
          icon: profile.image,
          accessToken: accessToken1,
          refeshToken: refreshToken1
        })
        .then(user => {
          done(null,user)
        })
      } else {
        Promise.all([User.updateAccessToken(accessToken1,profile.email),User.updateRefreshToken(refreshToken1,profile.email)])
        .then(user_data=>{
          done(null,user)
        })
        .catch(err => console.log(err))
      }
    })
    .catch(profile => console.log(profile))
  }
))
module.exports = passport;
