const express = require('express');
const authRouter = express.Router();
const fetch = require('isomorphic-fetch');
const bodyParser = require('body-parser')
const passport = require('../services/auth/local');
const passportG = require('../services/auth/google');

const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/user-controllers');


// google version
authRouter.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.profile.emails.read',
          'https://www.googleapis.com/auth/gmail.send'],
    accessType: 'offline', prompt: 'consent'})

authRouter.get('/google/callback',
  passportG.authenticate('google', {failureRedirect: '/login'}),
  function(req,res){
    res.redirect("/")
    // res.render("index",{auth:true, user:req.user})
  }
)


// authRouter.get('/login', function(req,res,next){

//     fetch('http://localhost:3001/api/auth/google')
//     // .then(res => res.json()) // let's think about how OAuth takes us back to a page where we put our info and then redirects us somewhere else, this is the page we're recieving here
//     .then(stuff => {
//       // this is where we are gonna do things
//       console.log('--> ',stuff.text);
//       // res.json(stuff.url)
//       //res.literallyWhatDoIDoHere
//     })
//     .catch(err => console.log(err));
//   })


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
