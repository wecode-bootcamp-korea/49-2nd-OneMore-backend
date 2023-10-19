const { userDao, exerciseDao, routineDao } = require("../models");
const utils = require("../utils");

const getExerciseByRoutineId = async (id) => {
  if (!id) {
    utils.throwError(400, "not input routine id(path parameter)");
  }

  const existingRoutineId = await routineDao.findRoutineByRoutineId(id);

  if (!existingRoutineId[0]) {
    utils.throwError(400, "not exist routine id in DB");
  }

  const result = await routineDao.getExerciseByRoutineId(id);
  return result;
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

const checkExercisesIdInRoutine = async (routineId, exercisesId) => {
  const result = routineDao.checkExercisesIdInRoutine(routineId, exercisesId);

  return result;
};

const updateCompletedExerciseStatus = async (id, routineId, exercisesId) => {
  if (!routineId) utils.throwError(400, "KEY_ERROR");
  if (utils.getIsInputEmpty(exercisesId)) utils.throwError(400, "KEY_ERROR");
  if (id != routineId) utils.throwError(400, "INVALID_INPUT"); // path parameter 사용여부 확인 후 삭제 가능

  const checkIncludedExercise = await routineDao.checkExercisesIdInRoutine(
    routineId,
    exercisesId
  );
  console.log(
    "checkIncludedExercise.length:::::::::::",
    await checkIncludedExercise.length
  );
  console.log("checkIncludedExercise:::::::::::", await checkIncludedExercise);

  console.log("exercisesId.length:::::::::", exercisesId.length);

  if (checkIncludedExercise.length !== exercisesId.length)
    utils.throwError(400, "INVALID_INPUT");

  await routineDao.updateCompletedExerciseStatusbyRoutineId(
    routineId,
    exercisesId
  );
};

module.exports = {
  getExerciseByRoutineId,
  createRoutine,
  checkExercisesIdInRoutine,
  updateCompletedExerciseStatus,
};
