const express = require("express");

const { userRouter } = require("./userRouter");
const { exerciseRouter } = require("./exerciseRoute");

const router = express.Router();

router.use("/users", userRouter);
router.use("/exercises", exerciseRouter);

module.exports = {
  router,
};
