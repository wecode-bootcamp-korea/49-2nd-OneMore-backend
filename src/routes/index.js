const express = require("express");

const { exerciseRouter } = require("./exerciseRoute");
const { userRouter } = require("./userRouter");
const { routineRouter } = require("./routineRouter");

const router = express.Router();

router.use("/exercises", exerciseRouter);
router.use("/users", userRouter);
router.use("/routines", routineRouter);

module.exports = {
  router,
};
