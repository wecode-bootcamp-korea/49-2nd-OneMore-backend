const { routineService } = require("../services");

const getExerciseByRoutineId = async (req, res) => {
  try {
    const { id } = req.params;

    const routineStart = await routineService.getExerciseByRoutineId(id);

    return res.status(200).json({
      message: "Routine Success",
      data: routineStart,
    });
  } catch (err) {
    console.log(err);
  }
};

const createRoutine = async (req, res, next) => {
  try {
    const { userId } = req;
    const body = req.body;
    const routineId = await routineService.createRoutine(userId, body);
    return res.status(201).json({
      message: "SUCCESS",
      routineId: routineId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExerciseByRoutineId,
  createRoutine,
};
