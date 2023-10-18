const express = require("express");

const { userRouter } = require("./userRouter");
const { exerciseRouter } = require("./exerciseRoute");
const { routineRouter } = require("./routineRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/exercises", exerciseRouter);
router.use("/routines", routineRouter);

module.exports = {
  router,
};
