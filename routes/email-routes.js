const express = require('express');
const emailControllers = require('../controllers/email-controllers')
const emailRouter = express.Router({mergeParams: true})

// the templates will have to be inserted into the text area via state.
// how to ensure the proper string interpolation of the required data?
// in the proper places: {this.props.recipient.name} or whatever?

emailRouter.get("/", emailControllers.getAllTemplates)
emailRouter.get("/:templateId", emailControllers.getTemplate)
emailRouter.post("/send", emailControllers.sendEmails)

module.exports = emailRouter;
