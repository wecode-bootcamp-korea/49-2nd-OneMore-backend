const { AppDataSource } = require("./dataSource");

const createRoutine = async (userId, isCustom, exerciseIds) => {
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
      [
        userId,
        isCustom,
      ]
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

module.exports = {
  createRoutine,
};
