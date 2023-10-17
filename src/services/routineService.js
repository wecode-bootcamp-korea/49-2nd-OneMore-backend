const { exerciseDao, routineDao } = require("../models");
const { throwError, getIsIntegers, getIsPremiumContent } = require("../utils");

const createRoutine = async (userId, body, subscriptionState) => {
  const exerciseIds = body.exercises;
  const isCustom = body.isCustom;
  // check if exercise id exists
  if (exerciseIds.length === 0) throwError(400, "KEY_ERROR");

  // check if exercise id is integer
  const isIntegers = getIsIntegers(exerciseIds);
  if (!isIntegers) throwError(400, "KEY_ERROR");

  // check if user subscriptionState === 0 and queried content is premium
  const exercises = await exerciseDao.getExercisesListByIds(exerciseIds);
  const isPremiumContent = getIsPremiumContent(exercises);
  if (subscriptionState === 0 && isPremiumContent) {
    throwError(403, "UNAUTHORIZED");
  }

  // create new routine
  const result = await routineDao.createRoutine(userId, isCustom, exerciseIds); 
  if (!result) throwError(400, "ERROR");
  return result.insertId;
};

module.exports = {
  createRoutine,
};
