const express = require('express');
const emailControllers = require('../controllers/email-controllers')
const emailRouter = express.Router({mergeParams: true})

emailRouter.get("/", emailControllers.getAllTemplates)
emailRouter.get("/new-template", emailControllers.new)
emailRouter.get("/:templateId", emailControllers.getTemplate)


emailRouter.post("/send", emailControllers.sendEmails)
emailRouter.post("/", emailControllers.create)

module.exports = emailRouter;
