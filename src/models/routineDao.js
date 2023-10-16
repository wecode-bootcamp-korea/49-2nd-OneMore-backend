const { AppDataSource } = require("./dataSource");

const routineStartDao = async (id) => {
  try {
    const result = await AppDataSource.query(
      `SELECT routine_exercises.routine_id AS routineId, SUM(duration_in_seconds_per_set * set_counts) AS totalDuration, SUM(calories_used * set_counts) AS totalCaloriesUsed, JSON_ARRAYAGG(exercises.id) AS completed, JSON_ARRAYAGG(JSON_OBJECT( 
        'id', exercises.id,
        'name', name,
        'videoURL', video_url,
        'thumbnailURL', thumbnail_url,
        'caloriesUsed', calories_used,
        'description', description,
        'isPremium', is_premium,
        'exerciseCategory', exercise_category,
        'durationInSecondsPerSet', duration_in_seconds_per_set,
        'countsPerSet', counts_per_set,
        'setCounts', set_counts,
        'createdAt', exercises.created_at)) AS exercises
    FROM exercises 
    LEFT JOIN routine_exercises ON exercises.id = routine_exercises.exercise_id
    WHERE routine_exercises.id = ?
    GROUP BY routine_exercises.routine_id`,
      [id]
    );

    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  routineStartDao,
};
