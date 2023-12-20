const { In } = require("typeorm");
const { Exercise } = require("../entity/exerciseEntity");
const { AppDataSource } = require("./dataSource");
const { RoutineExercise } = require("../entity/routineExerciseEntity");

const getRandomExercises = async (subscriptionState, limit = 3) => {
  const limitedContentsQuery = !subscriptionState
    ? `WHERE exercises.is_premium = false`
    : ``;
  const exercises = await AppDataSource.query(
    `
    SELECT
      exercises.id AS exerciseId,
      exercises.thumbnailUrl AS thumbnailURL,
      exercises.name,
      exercises.isPremium AS isPremium,
      exercises.caloriesUsed AS calories,
      exercises.durationInSecondsPerSet AS durationInSecondsPerSet,
      exercises.exerciseCategoryId AS categoryId,
      exercise_categories.name AS categoryName
    From
      exercises
    LEFT JOIN exercise_categories ON exercise_categories.id = exercises.exerciseCategoryId
    ${limitedContentsQuery}
    ORDER BY RAND()
    LIMIT ?
    ;
  `,
    [limit]
  );
  return exercises;
};

const getExercisesDetailsByIds = async (exerciseIds) => {
  const exercises = await AppDataSource.manager.find(Exercise, {
    where: {
      id: In(exerciseIds),
    },
    relations: {
      exercise_category: true,
    },
    select: true
  });
  return exercises;
};

const getRecommended = () => {
  // TODO: implement recommendation logic later
  return [];
};

const getExercisesListByIds = async (exerciseIds) => {
  const exercises = await AppDataSource.query(
    `
    SELECT 
      id,
      is_premium AS isPremium
    FROM
      exercises
    WHERE id IN (?)
    ;
  `,
    [exerciseIds]
  );
  return exercises;
};

const getExercisesListByRoutineId = async (routineId) => {
  const exercises = await AppDataSource.query(
    `
    SELECT DISTINCT
      exerciseId
    FROM
      routine_exercises
    WHERE routine_id = ?
    ;
  `,
    [routineId]
  );
  return exercises;
};

const getExercises = async (exerciseQueryString = ``) => {
  const exercises = await AppDataSource.query(`
    SELECT
      id AS exerciseId,
      name,
      description,
      exerciseCategory AS category,
      equipRequired AS equipRequired,
      thumbnailUrl AS thumbnailURL,
      durationInSecondsPerSet AS durationInSecondsPerSet,
      isPremium AS isPremium,
      caloriesUsed AS caloriesUsed,
      setCounts AS setCounts
    FROM
      exercises
    ${exerciseQueryString}
    ;
  `);
  return exercises;
};

module.exports = {
  getRecommended,
  getRandomExercises,
  getExercisesListByIds,
  getExercisesListByRoutineId,
  getExercises,
  getExercisesDetailsByIds,
};
