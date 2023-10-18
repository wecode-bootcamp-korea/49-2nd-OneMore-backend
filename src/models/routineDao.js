const { AppDataSource } = require("./dataSource");

const createRoutineInTransaction = async (userId, isCustom, exerciseIds) => {
  let result;
  try {
    await AppDataSource.query(`START TRANSACTION;`);
    result = await AppDataSource.query(`
      INSERT INTO routines
        (user_id, is_custom)
      VALUES
        (?,?)
      ;
    `,
      [userId, isCustom]
    );
    const values = exerciseIds.map((exerciseId) => `${result.insertId},${exerciseId}`);
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

const getTodayRoutineHistory = async (userId) => {
  const [routine] = await AppDataSource.query(`
    SELECT
      routines.id AS routineId,
      JSON_ARRAYAGG(
        routine_exercises.exercise_id
      ) AS exercises
    FROM
      routines
    LEFT JOIN routine_exercises ON routine_exercises.exercise_id = routines.id
    WHERE
      routines.user_id = ?
      AND
      routines.created_at >= CURDATE()
      AND 
      routines.created_at < CURDATE() + INTERVAL 1 DAY
    GROUP BY routines.id
  ;
  `, [userId]);
  return routine;
}

module.exports = {
  createRoutineInTransaction,
  getTodayRoutineHistory,
};

