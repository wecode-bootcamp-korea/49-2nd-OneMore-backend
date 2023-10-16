const { exerciseDao } = require("../models");
const { throwError, getIsInputEmpty } = require("../utils");

const getRecommendedExercises = async (userId, subscriptionState) => {
  // TODO: apply customized recommendation logic
  // TODO: change to getRecommended after implementing recommendation logic
  const data = await exerciseDao.getRandomExercises(subscriptionState);

  return data;
};

module.exports = {
  getRecommendedExercises,
};
