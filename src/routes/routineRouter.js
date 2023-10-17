const express = require("express");

const { routineController } = require("../controllers");

const routineRouter = express.Router();

routineRouter.get("/:id", routineController.getExerciseByRoutineId);

module.exports = { routineRouter };
