const { exerciseService } = require("../services");

const getRecommendedExercises = async (req, res, next) => {
  try {
    const { userId, subscriptionState } = req;
    const data = await exerciseService.getRecommendedExercises(userId, subscriptionState);
    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendedExercises,
};
