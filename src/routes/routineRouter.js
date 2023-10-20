const express = require("express");

const { routineController } = require("../controllers");
const { tokenValidation } = require("../middleware/tokenValidation")

const routineRouter = express.Router();

routineRouter.get("/:id", routineController.getExerciseByRoutineId);
routineRouter.post("/", tokenValidation, routineController.createRoutine);

module.exports = {
  routineRouter,
};
