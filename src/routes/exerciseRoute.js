const express = require("express");

const { exerciseController } = require("../controllers");

const exerciseRouter = express.Router();

exerciseRouter.use("/recommended", exerciseController.getRecommendedExercises);

module.exports = {
  exerciseRouter,
};
