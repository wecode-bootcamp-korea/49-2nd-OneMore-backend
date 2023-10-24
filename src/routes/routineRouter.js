const express = require("express");
const { tokenValidation } = require("../middleware/tokenValidation")

const { routineController } = require("../controllers");

const routineRouter = express.Router();

routineRouter.get("/my", tokenValidation, routineController.myRoutines);
routineRouter.get("/:routineId/isCustom", tokenValidation, routineController.recommendedToCustom);
routineRouter.get("/:id", routineController.getExerciseByRoutineId);
routineRouter.post("/", routineController.createRoutine);

module.exports = {
  routineRouter,
};
