const express = require('express');
const contactRouter = express.Router();
const contactControllers = require('../controllers/contacts-controller')


contactRouter.get("/", contactControllers.index)
contactRouter.post("/", contactControllers.create)

contactRouter.get("/:id", contactControllers.show)
contactRouter.put("/:id", contactControllers.update)
contactRouter.delete("/:id", contactControllers.delete)

module.exports = contactRouter;
