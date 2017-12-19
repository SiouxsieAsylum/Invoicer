const Contact = require('../models/Contact');
const contactsControllers = {}

contactsControllers.index = (req,res,next) =>{
  console.log("contacts")
  Contact.findAll(req.user.id)
  .then(contacts => {
    console.log(contacts)
    res.render('contacts/index', {
      contacts: contacts,
      auth: true,
      user: req.user
    })
  })
  .catch(err => console.log(err))
}
contactsControllers.show = (req,res,next) =>{
  Contact.findById(req.params.contactid)
  .then(contact => {
    res.render('contacts/show',{contact: contact,
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
    res.render('contacts/show',{
      contact: contact,
      auth: true,
      user: req.user
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
  }, req.params.contactId)
  .then(contact => {
    res.render('contacts/show',{contact: contact,
      auth: true,
      user: req.user
    })
  })
  .catch(next)
}
contactsControllers.delete = (req,res,next) =>{
  Contact.destroy(req.params.contactId)
  .then(() => {
    res.redirect('/api/contacts')
  })
  .catch(next)
}

module.exports = contactsControllers;
