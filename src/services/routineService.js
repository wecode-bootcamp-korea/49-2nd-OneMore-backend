const { userDao, exerciseDao, routineDao } = require("../models");
const utils = require("../utils");

const createRoutine = async (userId, body) => {
  const exerciseIds = body.exercises;
  const isCustom = body.isCustom;
  const user = await userDao.findById(userId);
  const subscriptionState = user.subscriptionState;

  if (utils.getIsInputEmpty(exerciseIds)) utils.throwError(400, "KEY_ERROR");
  // check if exercise id exists
  if (exerciseIds.length === 0) utils.throwError(400, "EMPTY_INPUT: exercises");

  // check if exercise id is integer
  const isIntegers = utils.getIsIntegers(exerciseIds);
  if (!isIntegers) utils.throwError(400, "KEY_ERROR");

  // check if user subscriptionState === 0 and queried content is premium
  const exercises = await exerciseDao.getExercisesListByIds(exerciseIds);
  const isPremiumContent = utils.getIsPremiumContent(exercises);
  if (subscriptionState === 0 && isPremiumContent) {
    utils.throwError(403, "UNAUTHORIZED");
  }

  // create new routine
  const result = await routineDao.createRoutineInTransaction(
    userId,
    isCustom,
    exerciseIds
  );
  if (!result) utils.throwError(400, "ERROR");
  return result.insertId;
};

module.exports = {
  createRoutine,
};
