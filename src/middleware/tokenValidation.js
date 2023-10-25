const jwt = require("jsonwebtoken");
const { userDao } = require("../models");

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const err = new Error("NO_TOKEN");
      err.status = 401;
      throw err;
    }
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userIdToken = tokenInfo.userId;
    const foundUser = await userDao.findById(userIdToken);

    if (!foundUser) {
      const error = new Error("USER_NOT_FOUND");
      error.status = 404;
      throw error;
    }

    req.userId = userIdToken;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { tokenValidation };
