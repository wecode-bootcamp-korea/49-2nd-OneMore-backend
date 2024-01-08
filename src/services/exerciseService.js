const {
  exerciseDao,
  routineDao,
  userDao,
  exerciseCategoryDao,
} = require("../models");
const utils = require("../utils");
const ExerciseQueryBuilder = require("../models/ExerciseQueryBuilder");
const { addAbortListener } = require("supertest/lib/test");
const { format } = require("morgan");

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
  // todayDatetime.setHours(todayDatetime.getHours() + 4);
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
    exercises = todayRoutineHistory.routineExercises.map(
      (routineExercise) => routineExercise.exercise
    );
    // exercises = await exerciseDao.getExercisesDetailsByIds(todayRoutineHistory.exercises);
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

  const exerciseFormatChange = exercises.map((exercise) => ({
    exerciseId: exercise.id,
    thumbnailURL: exercise.thumbnailUrl,
    name: exercise.name,
    isPremium: exercise.isPremium,
    calories: exercise.caloriesUsed,
    durationInSecondsPerSet: exercise.durationInSecondsPerSet,
    categoryId: exercise.exerciseCategory.id,
    categoryName: exercise.exerciseCategory.name,
  }));

  return {
    // exercises,
    exercises: exerciseFormatChange,
    totalDurationInMinute,
    totalCalories,
    mostFrequent,
    routineCompleted,
  };
};

const getExercises = async (queryParams, userId) => {
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

  const userState = await userDao.findById(userId);
  const subscriptionState = userState.subscriptionState;
  const exercisesInRoutine = await exerciseDao.getExercisesListByRoutineId(
    routineId
  );

  exercises.map((item) => {
    item["durationInMinute"] = item.durationInSecondsPerSet * item.setCounts;
  });

  const exerciseFormatChange = exercises.map((exercise) => ({
    exerciseId: exercise.id,
    name: exercise.name,
    description: exercise.description,
    category: exercise.exerciseCategory.id,
    equipRequired: exercise.equipRequired,
    thumbnailURL: exercise.thumbnailUrl,
    durationInSecondsPerSet: exercise.durationInSecondsPerSet,
    isPremium: exercise.isPremium,
    caloriesUsed: exercise.caloriesUsed,
    setCounts: exercise.setCounts,
    durationInMinute: exercise.durationInMinute,
  }));

  return {
    // exercises: exercises,
    exercises: exerciseFormatChange,
    selected: exercisesInRoutine.map((item) => item.exercise.id),
    // selected: exercisesInRoutine.map((item) => item.exerciseId),
    subscriptionState: subscriptionState,
  };
};

module.exports = {
  getRecommendedExercises,
  getExercises,
};
