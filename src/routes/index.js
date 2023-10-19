const express = require("express");

const { exerciseRouter } = require("./exerciseRoute");
const { routineRouter } = require("./routineRouter");
const { userRouter } = require("./userRouter");

const router = express.Router();

router.use("/exercises", exerciseRouter);
router.use("/routines", routineRouter);
router.use("/users", userRouter);

module.exports = {
  router,
};
