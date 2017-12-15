const passport = require('passport')
const googleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../../models/User')

passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/api/auth/google/callback",
  // accessType: "offline"
},
  function(accessToken1,refreshToken1,profile,done){
    console.log("access =" + accessToken1)
    // console.log("refresh =" + refreshToken1)
    User.findByEmail(profile.email)
    .then(user => {
      if(!user){
        User.create({
          name: profile.displayName,
          email: profile.email,
          icon: profile.image,
          accessToken: accessToken1,
          // refreshToken: refreshToken1
        })
        .then(user => {
          done(null,user)
        })
      } else {
        // if (refreshToken1){
        //   return User.updateRefreshToken(refreshToken1,profile.email)
        // }
        User.updateAccessToken(accessToken1,profile.email)
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
