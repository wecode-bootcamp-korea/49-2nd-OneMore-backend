const { userDao, exerciseDao, routineDao } = require("../models");
const utils = require("../utils");

const getExerciseByRoutineId = async (id) => {
  const existingRoutine = await routineDao.findRoutineByRoutineId(id);

  if (!existingRoutine) {
    utils.throwError(400, "ROUTINE_NOT_FOUND");
  }

  const routineExercises = await routineDao.findRoutineExercisesByRoutineId(id);
  const completedExerciseIds = [];
  const exerciseIds = routineExercises.map((item) => {
    if (item.completed) completedExerciseIds.push(item.exercise.id)
    return item.exercise.id;
  });
  const exercises = await exerciseDao.getExercisesDetailsByIds(exerciseIds);

  const result = {
    routineId: existingRoutine.id,
    exercises: exercises,
    isCustom: existingRoutine.isCustom,
    completedExerciseIds: completedExerciseIds,
    totalDutation: 0,
    totalCaloriesUsed: 0,
  };
  exercises.forEach(exercise => {
    result.totalDutation += exercise.durationInSecondsPerSet * exercise.setCounts;
    result.totalCaloriesUsed += exercise.caloriesUsed;
  });
  return result;
};

const createRoutine = async (userId, body) => {
  const exerciseIds = body.exercises;
  const isCustom = body.isCustom;
  let routineName = body.name;
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

  routineName = routineName
    ? routineName
    : `${utils.formatDate(new Date())}의 루틴`;
  // create new routine
  const result = await routineDao.createRoutine(
    userId,
    isCustom,
    exerciseIds,
    routineName
  );
  if (!result) utils.throwError(400, "ERROR");
  return result.id;
};

const updateCompletedExerciseStatus = async (id, exerciseIds) => {
  if (utils.getIsInputEmpty(exerciseIds)) utils.throwError(400, "KEY_ERROR");

  const checkIncludedExercise = await routineDao.checkExerciseIdsInRoutine(
    id,
    exerciseIds
  );

  if (checkIncludedExercise.length !== exerciseIds.length)
    utils.throwError(400, "INVALID_INPUT");

  await routineDao.updateCompletedExerciseStatusbyRoutineId(id, exerciseIds);
};

const routinesByUser = async (userId, limit, offset) => {
  const userRoutines = await routineDao.routinesByUser(userId, limit, offset);
  const routineIds = userRoutines.map((routine) => routine.id);
  const routineExercises = await routineDao.getRoutineExercisesListByRoutineIds(
    routineIds
  );
  const result = {};
  routineExercises.forEach((item) => {
    const routine = item.routine;
    const exercise = item.exercise;
    const routineId = routine.id;
    if (result[routineId]) {
      result[routineId].exerciseNames.push(exercise.name);
      result[routineId].setCounts.push(exercise.setCounts);
      result[routineId].totalDutation +=
        exercise.setCounts * exercise.durationInSecondsPerSet;
    } else {
      result[routineId] = {
        routineId: routineId,
        routineName: routine.name,
        totalDutation: 0,
        exerciseNames: [],
        setCounts: [],
        createDate: routine.createdAt,
      };
    }
  });
  return Object.values(result);
};

const saveToCustom = async (userId, routineId) => {
  await routineDao.toCustom(userId, routineId);
  const customRoutineCheck = await routineDao.customCheck(routineId);
  if (customRoutineCheck.isCustom === 0) {
    const error = new Error("NOT_SAVED");
    error.status = 400;
    throw error;
  }
};

module.exports = {
  getExerciseByRoutineId,
  createRoutine,
  updateCompletedExerciseStatus,
  routinesByUser,
  saveToCustom,
};
