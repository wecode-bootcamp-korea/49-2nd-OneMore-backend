const { exerciseService } = require("../services");

const getRecommendedExercises = async (req, res, next) => {
  try {
    const { userId } = req;
    const data = await exerciseService.getRecommendedExercises(userId);
    res.status(200).json({
      message: "SUCCESS",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getExercises = async (req, res, next) => {
  try {
    const { userId } = req
    const queryParams = req.query;
    const data = await exerciseService.getExercises(queryParams, userId);
    console.log("data ", data)
    res.status(200).json({
      message: "SUCCESS",
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRecommendedExercises,
  getExercises,
};
