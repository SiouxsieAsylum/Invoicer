const express = require("express");
const userController = require('../controllers/user-controllers')
const authHelpers = require('../services/auth/auth-helpers');
const userRouter = express.Router();

// also need an edit route
userRouter.get("/",userController.show)
userRouter.get("/:id",userController.show)
userRouter.post("/",userController.create)
userRouter.put("/",userController.update)


module.exports = userRouter;
