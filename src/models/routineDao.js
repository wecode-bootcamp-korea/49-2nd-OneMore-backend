const { AppDataSource } = require("./dataSource");

const getExerciseByRoutineId = async (id) => {
  try {
    const result = await AppDataSource.query(
      `SELECT 
      routine_exercises.routine_id AS routineId, 
      SUM(duration_in_seconds_per_set * set_counts) AS totalDuration, 
      SUM(calories_used * set_counts) AS totalCaloriesUsed, 
      JSON_ARRAYAGG(exercises.id) AS completedExerciseIds, 
      JSON_ARRAYAGG(
        JSON_OBJECT(
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
          'setCounts', set_counts
        )
      ) AS exercises
    FROM exercises 
    LEFT JOIN routine_exercises ON exercises.id = routine_exercises.exercise_id
    WHERE (routine_exercises.routine_id = ?)
    GROUP BY routine_exercises.routine_id`,
      [id]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

const findRoutineByRoutineId = async (id) => {
  const result = await AppDataSource.query(
    `SELECT * 
    FROM routine_exercises
    WHERE routine_id = ?`,
    [id]
  );

  return result;
};

const createRoutineInTransaction = async (userId, isCustom, exerciseIds) => {
  let result;
  try {
    await AppDataSource.query(`START TRANSACTION;`);
    result = await AppDataSource.query(
      `
      INSERT INTO routines
        (user_id, is_custom)
      VALUES
        (?,?)
      ;
    `,
      [userId, isCustom]
    );
    const values = exerciseIds.map(
      (exerciseId) => `${result.insertId},${exerciseId}`
    );
    await AppDataSource.query(`
      INSERT INTO routine_exercises
        (routine_id, exercise_id)
      VALUES
        (${values.join("),(")})
      ;
    `);
    await AppDataSource.query(`COMMIT;`);
  } catch (error) {
    console.log(error);
    await AppDataSource.query(`ROLLBACK;`);
    result = false;
  }
  return result;
};

const getRoutineHistoryByDate = async (userId, startDate, endDate) => {
  const [routine] = await AppDataSource.query(
    `
    SELECT
      routines.id AS routineId,
      JSON_ARRAYAGG(
        routine_exercises.exercise_id
      ) AS exercises
    FROM
      routines
    LEFT JOIN routine_exercises ON routine_exercises.routine_id = routines.id
    WHERE
      routines.user_id = ?
      AND
      routines.created_at >= ?
      AND
      routines.created_at < ?
    GROUP BY routines.id
    ;
  `,
    [userId, startDate, endDate]
  );
  return routine;
};

const routinesByUser = async (userId) => {
  const result = await AppDataSource.query(
    `SELECT 
      routines.id AS routine_id, 
      routines.name AS routine_name,
      JSON_ARRAYAGG(exercises.name) 
        AS exercise_names,
      SUM(exercises.duration_in_seconds_per_set * exercises.set_counts) 
        AS total_duration,
      IF(ISNULL(routines.updated_at), routines.created_at, routines.updated_at) 
        AS createDate
    FROM 
      routines
    JOIN routine_exercises ON routines.id = routine_exercises.routine_id
    JOIN exercises ON routine_exercises.exercise_id = exercises.id
    WHERE 
      routines.user_id = ? AND routines.is_custom = 1
    GROUP BY 
      routine_exercises.routine_id
    ORDER BY 
      createDate DESC`,
    [userId]
  );
  return result;
};

const toCustom = async (userId, routineId) => {
  const recommendedToCustom = await AppDataSource.query(
    `UPDATE routines
    SET is_custom = 1
    WHERE user_id = ? AND id = ?`,
    [userId, routineId]
  );
};

const customCheck = async (userId, routineId) => {
  const [customRoutineCheck] = await AppDataSource.query(
    `SELECT is_custom
    FROM routines
    WHERE user_id = ? AND id = ?`,
    [userId, routineId]
  );
  return customRoutineCheck;
}


module.exports = {
  getExerciseByRoutineId,
  findRoutineByRoutineId,
  createRoutineInTransaction,
  getRoutineHistoryByDate,
  routinesByUser,
  toCustom,
  customCheck
};
