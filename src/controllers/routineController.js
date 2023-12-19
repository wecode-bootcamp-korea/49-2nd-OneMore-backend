const { routineService } = require("../services");

const getExerciseByRoutineId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const routine = await routineService.getExerciseByRoutineId(id);

    return res.status(200).json({
      message: "Routine Success",
      data: routine,
    });
  } catch (error) {
    next(error);
  }
};

const createRoutine = async (req, res, next) => {
  try {
    const userId = req.userId;
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

const updateCompletedExerciseStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { exerciseIds } = req.body;

    await routineService.updateCompletedExerciseStatus(id, exerciseIds);

    return res.status(200).json({
      message: "EXERCISE UPDATE SUCCESS",
    });
  } catch (error) {
    next(error);
  }
};

const myRoutines = async (req, res, next) => {
  try {
    const { userId } = req;
    const { limit = 10, offset = 0} = req.query

    const myRoutines = await routineService.routinesByUser(userId, parseInt(limit), parseInt(offset));
    return res.status(200).json({
      message: "MY_ROUTINES_SUCCESS",
      data: myRoutines,
    });
  } catch (error) {
    next(error);
  }
};

const recommendedToCustom = async (req, res, next) => {
  try {
    const { userId } = req;
    const { routineId } = req.params;

    const toCustom = await routineService.saveToCustom(userId, routineId);

    return res.status(200).json({
      message: "SAVE_TO_CUSTOM_SUCCESS"
    });
  } catch(error) {
    next(error);
  }
}

module.exports = {
  getExerciseByRoutineId,
  createRoutine,
  updateCompletedExerciseStatus,
  myRoutines,
  recommendedToCustom
};
