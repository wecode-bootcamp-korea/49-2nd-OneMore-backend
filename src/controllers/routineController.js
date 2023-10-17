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

module.exports = { getExerciseByRoutineId };
