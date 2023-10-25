const express = require("express");

const { routineController } = require("../controllers");
const { tokenValidation } = require("../middleware/tokenValidation")

const routineRouter = express.Router();

routineRouter.use(tokenValidation);

routineRouter.patch("/:routineId/isCustom", routineController.recommendedToCustom);
routineRouter.post("/", routineController.createRoutine);
routineRouter.get("/my", routineController.myRoutines);
routineRouter.get("/:id", routineController.getExerciseByRoutineId);
routineRouter.patch("/:id", routineController.updateCompletedExerciseStatus);

module.exports = {
  routineRouter,
};
