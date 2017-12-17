const Contact = require('../models/Contact');
const contactsControllers = {}

contactsControllers.index = (req,res,next) =>{
  Contact.findAll(req.user.id)
  .then(contacts => {
    // res.json({
    //   message: 'contact created',
    //   data: { contacts }
    // })
    res.render('contacts/index',{contacts,
      auth: true,
      user: req.user
    })
  })
  .catch(next)
}
contactsControllers.show = (req,res,next) =>{
  Contact.findById(req.params.id)
  .then(contact => {
    // res.json({
    //   message: 'contact created',
    //   data: { contact }
    // })
    res.render('contacts/show',{contact,
      auth: true,
      user: req.user
    })
  })
  .catch(next)
}
contactsControllers.create = (req,res,next) =>{
  Contact.create({
    name: req.body.name,
    email: req.body.email,
    owed: req.body.owed,
    service: req.body.service,
    date_of_service: req.body.date_of_service,
    contractor: req.user.id
  })
  .then(contact => {
    res.json({
      message: 'contact created',
      data: { contact }
    })
  })
  .catch(next)
}
contactsControllers.update = (req,res,next) =>{
  Contact.update({
    name: req.body.name,
    email: req.body.email,
    owed: req.body.owed,
    service: req.body.service,
    date_of_service: req.body.date_of_service,
    contractor: req.user.id
  }, req.user.id)
  .then(contact => {
    res.json({
      message: 'contact created',
      data: { contact }
    })
  })
  .catch(next)
}
contactsControllers.delete = (req,res,next) =>{
  Contact.destroy(req.params.id)
  .then(() => {
    res.json({
      message: 'contact created',
    })
  })
  .catch(next)
}

module.exports = contactsControllers;
