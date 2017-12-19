const express = require('express');
const contactRouter = express.Router();
const emailRouter = require('./email-routes')
const contactControllers = require('../controllers/contacts-controller')

contactRouter.use("/:contactid/emails", emailRouter)

contactRouter.get("/", contactControllers.index)
contactRouter.post("/", contactControllers.create)

contactRouter.get("/new", function(req,res){
  res.render("contacts/new", { auth: true, user: req.user, contact: false })
})

contactRouter.get("/:contactid", contactControllers.show)
contactRouter.put("/:contactid", contactControllers.update)
contactRouter.delete("/:contactid", contactControllers.delete)



module.exports = contactRouter;
