const userDao = require("../models/userDao");
const bcrypt = require("bcrypt")

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

  const existingEmail = await userDao.findByEmail(email)
  if (existingEmail) {
    const err = new Error("ALREADY_REGISTERED");
    err.status = 400;
    throw err;
  }

  const encodedPassword = await bcrypt.hash(password, 10)
  await userDao.signUp(email, encodedPassword, nickname, phoneNumber);

};

module.exports = {
  signUp,
};
