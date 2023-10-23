const express = require("express");
const passport = require("passport");
const { userController } = require("../controllers");

const userRouter = express.Router();
const { kakaoStrategy } = require("../middleware/passport");

passport.use('kakao', kakaoStrategy)

userRouter.post("/", userController.signUp);
userRouter.get('/oauth/kakao', passport.authenticate('kakao', { session: false }), userController.socialLogin);
userRouter.get('/oauth/kakao/callback', passport.authenticate('kakao', { session: false }), userController.socialLogin);
userRouter.post("/login", userController.signIn);

module.exports = {
  userRouter,
};
