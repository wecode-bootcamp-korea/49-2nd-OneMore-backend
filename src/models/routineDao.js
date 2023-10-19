const { AppDataSource } = require("./dataSource");

const getExerciseByRoutineId = async (id) => {
  try {
    const result = await AppDataSource.query(
      `SELECT 
      routine_exercises.routine_id AS routineId, 
      SUM(duration_in_seconds_per_set * set_counts) AS totalDuration, 
      SUM(calories_used * set_counts) AS totalCaloriesUsed, 
      JSON_ARRAYAGG(exercises.id) AS exerciseIds, 
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
          'setCounts', set_counts,
          'isCompleted', routine_exercises.completed
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

const checkExercisesIdInRoutine = async (routineId, exercisesId) => {
  const result = await AppDataSource.query(
    `SELECT * 
    FROM routine_exercises
    WHERE routine_id = ? AND exercise_id IN (?)`,
    [routineId, exercisesId]
  );

  return result;
};

// 아래 내용  -  회의 후 변경 예정 : 무조건 상태완료로 변경하는 게 아닌, 완료 체크 후 보내준 것에 대해서만 상태완료로 변경하는 쪽으로
//  →  기존에 완료한 운동도 체크 해제하면 미완료로 변경 가능하게
const updateCompletedExerciseStatusbyRoutineId = async (
  routineId,
  exercisesId
) => {
  await AppDataSource.query(
    `UPDATE routine_exercises
    SET completed = 1
    WHERE routine_id = ? AND exercise_id IN (?)`,
    [routineId, exercisesId]
  );
};

module.exports = {
  getExerciseByRoutineId,
  findRoutineByRoutineId,
  createRoutineInTransaction,
  getRoutineHistoryByDate,
  checkExercisesIdInRoutine,
  updateCompletedExerciseStatusbyRoutineId,
};
