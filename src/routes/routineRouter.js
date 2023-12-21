const express = require("express");

const { routineController } = require("../controllers");
const { tokenValidation } = require("../middleware/tokenValidation")

const routineRouter = express.Router();

routineRouter.use(tokenValidation);

routineRouter.patch("/:routineId/isCustom", routineController.recommendedToCustom);
routineRouter.post("/", routineController.createRoutine);
routineRouter.get("/my", routineController.myRoutines);
routineRouter.get("/:routineId", routineController.getExerciseByRoutineId);
routineRouter.patch("/:routineId", routineController.updateCompletedExerciseStatus);

module.exports = {
  routineRouter,
};
