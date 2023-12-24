const {
  exerciseDao,
  routineDao,
  userDao,
  exerciseCategoryDao,
} = require("../models");
const utils = require("../utils");
const ExerciseQueryBuilder = require("../models/ExerciseQueryBuilder");

const getRecommendedExercises = async (userId) => {
  const user = await userDao.findById(userId);
  let subscriptionState;
  if (!user) {
    subscriptionState = 0;
  } else {
    subscriptionState = user.subscriptionState;
  }
  let exercises;
  let routineCompleted = false;

  const todayDatetime = new Date();
  todayDatetime.setDate(todayDatetime.getHours() + 4);
  const tomorrowDatetime = new Date();
  tomorrowDatetime.setDate(todayDatetime.getDate() + 1);
  const today = utils.formatDate(todayDatetime);
  const tomorrow = utils.formatDate(tomorrowDatetime);

  const todayRoutineHistory = await routineDao.getRoutineHistoryByDate(
    userId,
    today,
    tomorrow
  );

  if (todayRoutineHistory) {
    // in case user finished today's routine
    exercises = await exerciseDao.getExercisesDetailsByIds(
      todayRoutineHistory.exercises
    );
    routineCompleted = true;
  } else {
    // TODO: apply customized recommendation logic
    // TODO: change to getRecommended after implementing recommendation logic
    exercises = await exerciseDao.getRandomExercises(subscriptionState);
    const isPremiumContent = utils.getIsPremiumContent(exercises);
    if (subscriptionState === 0 && isPremiumContent)
      utils.throwError(403, "UNAUTHORIZED");
  }
  const { totalDurationInSeconds, totalCalories, mostFrequent } =
    utils.getRoutineStatistic(exercises);
  const totalDurationInMinute = Math.floor(totalDurationInSeconds / 60);
  return {
    exercises,
    totalDurationInMinute,
    totalCalories,
    mostFrequent,
    routineCompleted,
  };
};

const getExercises = async (queryParams) => {
  let {
    category,
    equipRequired,
    sort,
    offset = 0,
    limit = 20,
    routineId,
  } = queryParams;

  // const exerciseQueryString = new ExerciseQueryBuilder(
  //   category,
  //   equipRequired,
  //   sort,
  //   offset,
  //   limit
  // ).build();

  // const exercises = await exerciseDao.getExercises(exerciseQueryString);

  const exercises = await exerciseDao.getExercises(
    category,
    equipRequired,
    sort,
    offset,
    limit
  );

  const exercisesInRoutine = await exerciseDao.getExercisesListByRoutineId(
    routineId
  );

  exercises.map((item) => {
    item["durationInMinute"] = item.durationInSecondsPerSet * item.setCounts;
  });

  return {
    exercises: exercises,
    selected: exercisesInRoutine.map((item) => item.exercise.id),
    // selected: exercisesInRoutine.map((item) => item.exerciseId),
  };
};

module.exports = {
  getRecommendedExercises,
  getExercises,
};
