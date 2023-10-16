const express = require("express");

const { exerciseRouter } = require("./exerciseRoute");
const { userRouter } = require("./userRouter");

const router = express.Router();

router.use("/exercises", exerciseRouter);
router.use("/users", userRouter);

module.exports = {
  router,
};
