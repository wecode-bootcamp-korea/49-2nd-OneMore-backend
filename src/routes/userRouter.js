const express = require("express");
const passport = require("passport");
const { userController } = require("../controllers");

const userRouter = express.Router();
const { kakaoStrategy, googleStrategy } = require("../middleware/passport");

passport.use("kakao", kakaoStrategy);
passport.use("google", googleStrategy);

userRouter.get(
  "/oauth/google",
  passport.authenticate(
    "google",
    { scope: ["profile", "email"] },
    { session: false }
  ),
  userController.socialLogin
);
userRouter.get(
  "/oauth/google/callback",
  passport.authenticate("google", { session: false }),
  userController.socialLogin
);
userRouter.post("/", userController.signUp);
userRouter.get(
  "/oauth/kakao",
  passport.authenticate("kakao", { session: false }),
  userController.socialLogin
);
userRouter.get(
  "/oauth/kakao/callback",
  passport.authenticate("kakao", { session: false }),
  userController.socialLogin
);
userRouter.post("/login", userController.signIn);

module.exports = {
  userRouter,
};
