const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/", userController.signUp);
userRouter.post("/login", userController.signIn);

module.exports = {
  userRouter,
};
