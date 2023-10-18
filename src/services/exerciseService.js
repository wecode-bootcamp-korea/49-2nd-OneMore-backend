const { exerciseDao, routineDao, userDao } = require("../models");
const utils = require("../utils");

const getRecommendedExercises = async (userId) => {
  const user = await userDao.findById(userId);
  const subscriptionState = user.subscriptionState;

  let exercises;
  let routineCompleted = false;
  const todayRoutineHistory = await routineDao.getTodayRoutineHistory(userId);
  if (todayRoutineHistory) {
    // in case user finished today's routine
    exercises = todayRoutineHistory.exercises;
    routineCompleted = true;
  } else {
    // TODO: apply customized recommendation logic
    // TODO: change to getRecommended after implementing recommendation logic
    exercises = await exerciseDao.getRandomExercises(subscriptionState);
    const isPremiumContent = utils.getIsPremiumContent(exercises);
    if (subscriptionState === 0 && isPremiumContent) utils.throwError(403, "UNAUTHORIZED");
  }
  let totalDurationInSeconds = 0;
  let totalCalories = 0;
  let mostFrequent = { count: 0 };
  let categoryCounts = {};
  exercises.map((item) => {
    totalCalories += item.calories;
    totalDurationInSeconds += item.durationInSecondsPerSet;
    let itemCategoryCount = categoryCounts[item.categoryName];
    categoryCounts[item.categoryName] =
      itemCategoryCount !== undefined ? itemCategoryCount + 1 : 1;
    let updatedCategoryCount = categoryCounts[item.categoryName];
    mostFrequent =
      mostFrequent.count > updatedCategoryCount
        ? mostFrequent
        : { count: updatedCategoryCount, category: item.categoryName };
  });
  const totalDurationInMinute = Math.floor(totalDurationInSeconds / 60);
  return {
    exercises,
    totalDurationInMinute,
    totalCalories,
    mostFrequent,
    routineCompleted,
  };
};

module.exports = {
  getRecommendedExercises,
};
