const { AppDataSource } = require("./dataSource");

const getRandomExercises = async (subscriptionState, limit = 3) => {
  const limitedContentsQuery = !subscriptionState
    ? `WHERE exercises.is_premium = false`
    : ``;
  const exercises = await AppDataSource.query(
    `
    SELECT
      exercises.id AS exerciseId,
      exercises.thumbnail_url AS thumbnailURL,
      exercises.name,
      exercises.is_premium AS isPremium,
      exercises.calories_used AS calories,
      exercises.duration_in_seconds_per_set AS durationInSecondsPerSet,
      exercises.exercise_category AS categoryId,
      exercise_categories.name AS categoryName
    From
      exercises
    LEFT JOIN exercise_categories ON exercise_categories.id = exercises.exercise_category
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
  const exercises = await AppDataSource.query(
    `
    SELECT
      exercises.id AS exerciseId,
      exercises.thumbnail_url AS thumbnailURL,
      exercises.name,
      exercises.is_premium AS isPremium,
      exercises.calories_used AS calories,
      exercises.duration_in_seconds_per_set AS durationInSecondsPerSet,
      exercises.exercise_category AS categoryId,
      exercise_categories.name AS categoryName
    From
      exercises
    LEFT JOIN exercise_categories ON exercise_categories.id = exercises.exercise_category
    WHERE exercises.id IN (?)
    ;
  `,
    [exerciseIds]
  );
  return exercises;
};

const getRecommended = () => {
  // TODO: implement recommendation logic later
  return [];
};

const getExercisesListByIds = async (exerciseIds) => {
  const values = exerciseIds.join(",");
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
    [values]
  );
  return exercises;
};

const getExercisesListByRoutineId = async (routineId) => {
  const exercises = await AppDataSource.query(
    `
    SELECT DISTINCT
      exercise_id AS exerciseId
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
      exercise_category AS category,
      equip_required AS equipRequired,
      thumbnail_url AS thumbnailURL,
      duration_in_seconds_per_set AS durationInSecondsPerSet,
      is_premium AS isPremium,
      calories_used AS caloriesUsed,
      set_counts AS setCounts
    FROM
      exercises
    ${exerciseQueryString}
    ;
  `);
  return exercises;
}

module.exports = {
  getRecommended,
  getRandomExercises,
  getExercisesListByIds,
  getExercisesListByRoutineId,
  getExercises,
  getExercisesDetailsByIds,
};
