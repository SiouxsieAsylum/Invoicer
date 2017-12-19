const bcrypt = require('bcryptjs');
const User = require('../models/User');


const usersController = {};

usersController.create = (req, res, next) => {
  // debugger;

  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password_digest, salt);
  User.create({
    name: req.body.name,
    email: req.body.email,
    password_digest: hash,
    company: req.body.company,
    icon: req.body.icon,
    signature: req.body.signature
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/')
    });
  }).catch(console.log(req.body));
}

usersController.show = (req,res,next) => {
  console.log(req.user)
  User.findById(req.user.id)
  .then(user => {
    res.render('users/show',{
      auth: true,
      user: user
    })
  })
  .catch(next)
}

usersController.update = (req,res,next) => {
  User.update({
    username: req.body.username,
    password_hash: hash,
    name: req.body.name,
    company: req.body.company,
    icon: req.body.icon,
    signature: req.body.signature
  },req.user.id).then(user => {
    // res.json({
    //   message: `${user.name} updated!`,
    //   data: { user }
    // })
    res.render('users/show',{contacts,
      auth: true,
      user: req.user
    })
  })
  .catch(next)
}

module.exports = usersController;
