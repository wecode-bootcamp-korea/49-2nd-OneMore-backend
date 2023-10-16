const { AppDataSource } = require("./dataSource");

const getRandomExercises = async (subscriptionState) => {
  const limitedContentsQuery = !subscriptionState
    ? `WHERE exercises.is_premium = false`
    : ``;
  const exercises = await AppDataSource.query(`
    SELECT
      id AS exerciseId,
      thumbnail_url AS thumbnailURL,
      name,
      is_premium AS isPremium
    From
      exercises
    ${limitedContentsQuery}
    ORDER BY RAND()
    LIMIT 5
    ;
  `);
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
