const { userService } = require("../services");

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
  const user = req.user
  res.status(201).json({
    message: "SOCIAL_LOGIN_SUCCESS",
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    nickname: user.nickname
  })
}

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userInfo = await userService.signIn(email, password);

    res.status(200).json({
      message: "LOGIN_SUCCESS",
      token: userInfo.token,
      nickname: userInfo.nickname,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, socialLogin };
