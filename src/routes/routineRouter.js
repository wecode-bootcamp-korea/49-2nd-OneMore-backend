const express = require("express");
const { tokenValidation } = require("../middleware/tokenValidation")

const { routineController } = require("../controllers");

const routineRouter = express.Router();

routineRouter.use(tokenValidation);

routineRouter.get("/my", routineController.myRoutines);
routineRouter.get("/:id", routineController.getExerciseByRoutineId);
routineRouter.post("/", routineController.createRoutine);
routineRouter.patch("/:id", routineController.updateCompletedExerciseStatus);

module.exports = {
  routineRouter,
};
