const express = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");

const userRouter = express.Router();
const {kakaoStrategy} = require("../middleware/passport");

passport.use('kakao', kakaoStrategy)

userRouter.post("/", userController.signUp);
userRouter.get('/oauth/kakao', passport.authenticate('kakao', {session: false}));
userRouter.get('/oauth/kakao/callback',passport.authenticate('kakao', {session:false}), userController.socialLogin);

module.exports = {
  userRouter,
};
