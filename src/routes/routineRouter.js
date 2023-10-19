const express = require("express");

const { routineController } = require("../controllers");

const routineRouter = express.Router();

routineRouter.get("/:id", routineController.getExerciseByRoutineId);
routineRouter.post("/", routineController.createRoutine);
routineRouter.patch("/:id", routineController.updateCompletedExerciseStatus);

module.exports = {
  routineRouter,
};
