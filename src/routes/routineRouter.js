const express = require("express");
const { tokenValidation } = require("../middleware/tokenValidation")

const { routineController } = require("../controllers");
const { tokenValidation } = require("../middleware/tokenValidation")

const routineRouter = express.Router();

routineRouter.use(tokenValidation);

routineRouter.post("/", routineController.createRoutine);
routineRouter.get("/my", routineController.myRoutines);
routineRouter.get("/:id", routineController.getExerciseByRoutineId);

module.exports = {
  routineRouter,
};
