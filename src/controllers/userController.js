const { MongoNetworkError } = require("typeorm");
const userService = require("../services/userService");

const signUp = async (req, res, next) => {
  try {
    const { email, password, nickname, phoneNumber } = req.body;

    await userService.signUp(email, password, nickname, phoneNumber);

    res.status(201).json({
      message: "USER_CREATED",
    });
  } catch (error) {
    next(error);
  }
};

const socialLogin = async (req, res) => {
  const token = req.user
  res.status(201).json({
    message: "SOCIAL_LOGIN_SUCCESS",
    accessToken: token.accessToken,
    refreshToken: token.refreshToken
  })
}

module.exports = {
  signUp,
  socialLogin,
};
