const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const passportG = require('../services/auth/google');
const passportY = require('../services/auth/yahoo');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/user-controllers');



// google version
authRouter.get('/google', passport.authenticate('google', {
  // do I need profiles.read if all I want them to do is log in? I'm not building an inbox of any kind
  scope: ['https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.profile.emails.read']
}))

authRouter.get('/google/callback',
  passport.authenticate('google', {failureRedirect: '/login'}),
  function(req,res){
    return res.status(200).json({
      message: 'logged in with google',
      auth: true,
      data: {
        user: req.user
      }
    })
  }
)
// yahoo version
// authRouter.get('/yahoo',
//   passport.authenticate('yahoo'));

// authRouter.get('/yahoo/callback',
//   passport.authenticate('yahoo', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Is this the right place to return the information? How would registering work with this if it's just looking for the email and password?

//     // and where do I save the tokens to be used by nodemailer?
//     return res.status(200).json({
//       message: 'logged in with yahoo',
//       auth: true,
//       data: {
//         user:req.user,
//       }
//     });
//   });


// local version
authRouter.post('/register', usersController.create);

authRouter.post('/login', passport.authenticate('local',{
  successRedirect: '/api/auth/verify',
  failureRedirect: '/api/auth/verify',
  failureFlash: false,
  })
);

authRouter.get('/verify', (req, res) => {
  if (req.user){
     return res.status(200).json({
      message: 'ok',
      auth: true,
      data: {
        user:req.user,
      }
    });
   }else{
      return res.status(400).json({
         message: 'Login failed',
         auth: false,
         data: {
           user:null,
         }
       })
   }
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.json({
    message: 'logged out',
    auth: false,
    data: {
      user: null,
    }
  })
});

module.exports = authRouter;
