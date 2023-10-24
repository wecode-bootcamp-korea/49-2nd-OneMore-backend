const express = require("express");

const { exerciseRouter } = require("./exerciseRoute");
const { routineRouter } = require("./routineRouter");
const { userRouter } = require("./userRouter");
const { subscriptionRouter } = require("./subscriptionRouter");
const { paymentRouter } = require("./paymentRouter")

const router = express.Router();

router.use("/exercises", exerciseRouter);
router.use("/routines", routineRouter);
router.use("/users", userRouter);
router.use("/subscription_orders", subscriptionRouter)
// router.use("/payments",paymentRouter)

module.exports = {
  router,
};
