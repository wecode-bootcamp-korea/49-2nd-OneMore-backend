const { AppDataSource } = require("./dataSource");

const getRandomExercises = async (subscriptionState, limit = 5) => {
  const limitedContentsQuery = !subscriptionState
    ? `WHERE exercises.is_premium = false`
    : ``;
  const exercises = await AppDataSource.query(`
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
  `, [limit]);
  return exercises;
};

const getRecommended = () => {
  // TODO: implement recommendation logic later
  return [];
}

module.exports = {
  getRecommended,
  getRandomExercises,
};
