const express = require("express");
const { tokenValidation } = require("../middleware/tokenValidation")

const { routineController } = require("../controllers");
const { tokenValidation } = require("../middleware/tokenValidation")

const routineRouter = express.Router();

routineRouter.get("/my", tokenValidation, routineController.myRoutines);
routineRouter.get("/:id", routineController.getExerciseByRoutineId);
routineRouter.post("/", tokenValidation, routineController.createRoutine);

module.exports = {
  routineRouter,
};
