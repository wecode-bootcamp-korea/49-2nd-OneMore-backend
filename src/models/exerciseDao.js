const { AppDataSource } = require("./dataSource");

const getRandomExercises = async (subscriptionState, limit = 5) => {
  const limitedContentsQuery = !subscriptionState
    ? `WHERE exercises.is_premium = false`
    : ``;
  const exercises = await AppDataSource.query(`
    SELECT
      id AS exerciseId,
      thumbnail_url AS thumbnailURL,
      name,
      is_premium AS isPremium,
      calories_used AS calories,
      duration_in_seconds_per_set AS durationInSecondsPerSet
    From
      exercises
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
