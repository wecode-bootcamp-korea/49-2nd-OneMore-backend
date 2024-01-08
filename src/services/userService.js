const { userDao } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (email, password, nickname, phoneNumber) => {
  if (!email || !password || !nickname) {
    const err = new Error("KEY_ERROR");
    err.status = 400;
    throw err;
  }

  // 이메일 ., @ 포함 필수, 2자 이상
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  if (!emailRegex.test(email)) {
    const err = new Error("EMAIL_INVALID");
    err.status = 400;
    throw err;
  }

  // 비밀번호 숫자, 소문자, 대문자, 특수문자, 4자 이상
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{4,16}$/;
  if (!passwordRegex.test(password)) {
    const err = new Error("PASSWORD_INVALID");
    err.status = 400;
    throw err;
  }

  const userByEmail = await userDao.existingUser(email);
  if (userByEmail) {
    const err = new Error("ALREADY_REGISTERED");
    err.status = 400;
    throw err;
  }

  const encodedPassword = await bcrypt.hash(password, 10);
  await userDao.signUp(email, encodedPassword, nickname, phoneNumber);
};

const signIn = async (email, password) => {
  if (!email || !password) {
    const err = new Error("KEY_ERROR");
    err.status = 400;
    throw err;
  }

  const existingUser = await userDao.existingUser(email);
  if (!existingUser) {
    const err = new Error("NOT_REGISTERED");
    err.status = 400;
    throw err;
  }

  const isPasswordRight = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordRight) {
    const err = new Error("WRONG_PASSWORD");
    err.status = 400;
    throw err;
  }

  const token = jwt.sign(
    {
      userId: existingUser.id,
    },
    process.env.JWT_SECRET_KEY
  );

  return { token: token, nickname: existingUser.nickname };
};

module.exports = {
  signUp,
  signIn,
};
