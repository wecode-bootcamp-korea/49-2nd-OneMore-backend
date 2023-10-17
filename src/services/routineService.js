const { routineDao } = require("../models");

const getExerciseByRoutineId = async (id) => {
  try {
    const result = await routineDao.getExerciseByRoutineId(id);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getExerciseByRoutineId,
};
