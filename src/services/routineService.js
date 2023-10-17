const { routineDao } = require("../models");
const { throwError } = require("../utils");

const getExerciseByRoutineId = async (id) => {
  try {
    if (!id) {
      throwError(400, "not input routine id(path parameter)");
    }

    const existingRoutineId = await routineDao.findRoutineByRoutineId(id);

    if (!existingRoutineId[0]) {
      throwError(400, "not exist routine id in DB");
    }

    const result = await routineDao.getExerciseByRoutineId(id);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getExerciseByRoutineId,
};
