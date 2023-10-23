const { userDao, exerciseDao, routineDao } = require("../models");
// const { throwError } = require("../utils");
const utils = require("../utils");

const getExerciseByRoutineId = async (id) => {
  try {
    if (!id) {
      utils.throwError(400, "not input routine id(path parameter)");
    }

    const existingRoutineId = await routineDao.findRoutineByRoutineId(id);

    if (!existingRoutineId[0]) {
      utils.throwError(400, "not exist routine id in DB");
    }

    const result = await routineDao.getExerciseByRoutineId(id);
    return result;
  } catch (err) {
    console.log(err);
  }
};

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

const routinesByUser = async (userId) => {
  const findUserRoutines = await routineDao.routinesByUser(userId);

  if (!findUserRoutines) {
    const error = new Error("NO_CUSTOM_ROUTINES");
    error.status = 400;
    throw error;
  }

  return findUserRoutines;
};

module.exports = {
  getExerciseByRoutineId,
  createRoutine,
  routinesByUser,
};
