const bcrypt = require('bcryptjs');
const User = require('../models/User');
const

const usersController = {};

usersController.create = (req, res, next) => {
  // debugger;
  // console.log(req)

  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    password_hash: hash,
    name: req.body.name,
    company: req.body.company,
    icon: req.body.icon,
    signature: req.body.signature
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.json({
        message: 'user sucessfully created',
        auth: true,
        data: { user }
      })
    });
  }).catch(next);
}

usersController.show = (req,res,next) => {
  User.findById(req.user.id)
  .then(user => {
    res.json({
      message: `${user.name} found`,
      data: { user }
    })
  })
  .catch(next)
}

users.Controller.update = (req,res,next) => {
  User.update({
    username: req.body.username,
    password_hash: hash,
    name: req.body.name,
    company: req.body.company,
    icon: req.body.icon,
    signature: req.body.signature
  }).then(user => {
    res.json({
      message: `${user.name} updated!`,
      data: { user }
    })
  })
  .catch(next)
}

module.exports = usersController;
