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
      is_premium AS isPremium
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
};

const getExercisesListByIds = async (exerciseIds) => {
  const values = exerciseIds.join(",");
  const exercises = await AppDataSource.query(`
    SELECT 
      id,
      is_premium AS isPremium
    FROM
      exercises
    WHERE id IN (?)
    ;
  `, [values]);
  return exercises;
}

module.exports = {
  getRecommended,
  getRandomExercises,
  getExercisesListByIds,
};
