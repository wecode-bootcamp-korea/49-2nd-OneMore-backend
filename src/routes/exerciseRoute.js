const express = require("express");
const { tokenValidation } = require("../middleware/tokenValidation");

const { exerciseController } = require("../controllers");

const exerciseRouter = express.Router();

exerciseRouter.get(
  "/recommended",
  tokenValidation,
  exerciseController.getRecommendedExercises
);

module.exports = {
  exerciseRouter,
};
