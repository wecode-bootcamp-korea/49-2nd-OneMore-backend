const express = require("express");

const { routineController } = require("../controllers");

const routineRouter = express.Router();

routineRouter.post("/", routineController.createRoutine);

module.exports = {
  routineRouter,
};
