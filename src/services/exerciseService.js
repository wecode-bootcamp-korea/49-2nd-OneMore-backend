const { exerciseDao } = require("../models");

const getRecommendedExercises = async (userId, subscriptionState) => {
  // TODO: apply customized recommendation logic
  // TODO: change to getRecommended after implementing recommendation logic
  const exercises = await exerciseDao.getRandomExercises(subscriptionState);
  let totalDurationInSeconds = 0;
  let totalCalories = 0;
  exercises.map(item => {
    totalCalories += item.calories;
    totalDurationInSeconds += item.durationInSecondsPerSet;
  });
  const totalDurationInMinute = Math.floor(totalDurationInSeconds / 60);
  return {exercises, totalDurationInMinute, totalCalories};
};

module.exports = {
  getRecommendedExercises,
};
