const { AppDataSource } = require("./dataSource");

const getExerciseByRoutineId = async (id) => {
  const result = await AppDataSource.query(
    `SELECT 
      routine_exercises.routineId, 
      SUM(duration_in_seconds_per_set * set_counts) AS totalDuration, 
      SUM(calories_used * set_counts) AS totalCaloriesUsed, 
      JSON_ARRAYAGG(exercises.id) AS exerciseIds, 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', exercises.id,
          'name', exercises.name,
          'videoURL', video_url,
          'thumbnailURL', thumbnail_url,
          'caloriesUsed', calories_used,
          'description', description,
          'isPremium', is_premium,
          'exerciseCategory', exercise_category,
          'durationInSecondsPerSet', duration_in_seconds_per_set,
          'countsPerSet', counts_per_set,
          'setCounts', set_counts,
          'isCompleted', routine_exercises.completed
        )
      ) AS exercises,
      routines.is_custom AS isCustom
    FROM exercises 
    LEFT JOIN routine_exercises ON exercises.id = routine_exercises.exerciseId
    LEFT JOIN routines ON routine_exercises.routineId = routines.id
    WHERE (routine_exercises.routineId = ?)
    GROUP BY routine_exercises.routineId`,
    [id]
  );

  return result;
};

const findRoutineByRoutineId = async (id) => {
  const result = await AppDataSource.query(
    `SELECT * 
    FROM routine_exercises
    WHERE routineId = ?`,
    [id]
  );

  return result;
};

const createRoutineInTransaction = async (
  userId,
  isCustom,
  exerciseIds,
  routineName
) => {
  let result;
  try {
    await AppDataSource.query(`START TRANSACTION;`);
    result = await AppDataSource.query(
      `
      INSERT INTO routines
        (userId, is_custom, name)
      VALUES
        (?, ?, ?)
      ;
    `,
      [userId, isCustom, routineName]
    );
    const values = exerciseIds.map(
      (exerciseId) => `${result.insertId},${exerciseId}`
    );
    await AppDataSource.query(`
      INSERT INTO routine_exercises
        (routineId, exerciseId)
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
        routine_exercises.exerciseId
      ) AS exercises
    FROM
      routines
    LEFT JOIN routine_exercises ON routine_exercises.routineId = routines.id
    WHERE
      routines.userId = ?
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

const checkExerciseIdsInRoutine = async (id, exerciseIds) => {
  const result = await AppDataSource.query(
    `SELECT id, routineId, exerciseId
    FROM routine_exercises
    WHERE routineId = ? AND exerciseId IN (?)`,
    [id, exerciseIds]
  );

  return result;
};

const routinesByUser = async (userId) => {
  const result = await AppDataSource.query(
    `SELECT 
      routines.id AS routineId, 
      routines.name AS routineName,
      JSON_ARRAYAGG(exercises.name) AS exerciseNames,
      JSON_ARRAYAGG(exercises.set_counts) AS setCounts, 
      TIME_FORMAT(
        SEC_TO_TIME(
          SUM(exercises.duration_in_seconds_per_set * exercises.set_counts)
          ), 
          "%i:%s") 
        AS totalDuration,
      DATE_FORMAT(
        IF(ISNULL(routines.updated_at), routines.created_at, routines.updated_at),
        "%Y-%c-%d" )
        AS createDate
    FROM 
      routines
    JOIN routine_exercises ON routines.id = routine_exercises.routineId
    JOIN exercises ON routine_exercises.exerciseId = exercises.id
    WHERE 
      routines.userId = ? AND routines.is_custom = 1
    GROUP BY 
      routine_exercises.routineId
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
    WHERE userId = ? AND id = ?`,
    [userId, routineId]
  );
};

const customCheck = async (userId, routineId) => {
  const [customRoutineCheck] = await AppDataSource.query(
    `SELECT is_custom
    FROM routines
    WHERE userId = ? AND id = ?`,
    [userId, routineId]
  );
  return customRoutineCheck;
};

const updateCompletedExerciseStatusbyRoutineId = async (id, exerciseIds) => {
  const exerciseStatus = {
    COMPLETED: 1,
    NOT_COMPLETED: 0,
  };

  await AppDataSource.query(
    `UPDATE routine_exercises
      SET completed = IF(exerciseId IN (?), ${exerciseStatus.COMPLETED}, ${exerciseStatus.NOT_COMPLETED})
    WHERE routineId = ?`,
    [exerciseIds, id]
  );
};

module.exports = {
  getExerciseByRoutineId,
  findRoutineByRoutineId,
  createRoutineInTransaction,
  getRoutineHistoryByDate,
  checkExerciseIdsInRoutine,
  updateCompletedExerciseStatusbyRoutineId,
  routinesByUser,
  toCustom,
  customCheck,
};
