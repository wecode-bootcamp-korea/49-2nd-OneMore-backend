const express = require("express");
const { tokenValidation } = require("../middleware/tokenValidation")

const { exerciseController } = require("../controllers");

const exerciseRouter = express.Router();

exerciseRouter.get("/recommended", tokenValidation, exerciseController.getRecommendedExercises);
exerciseRouter.get("/", exerciseController.getExercises);

module.exports = {
  exerciseRouter,
};
