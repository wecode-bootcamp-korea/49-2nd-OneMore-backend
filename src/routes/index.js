const express = require("express");

const { routineRouter } = require("./routineRouter");

const router = express.Router();

router.use("/routines", routineRouter);

module.exports = {
  router,
};
