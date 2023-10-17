const { routineService } = require("../services");

const createRoutine = async (req, res, next) => {
  try {
    const { userId, subscriptionState } = req;
    const body = req.body;
    const routineId = await routineService.createRoutine(userId, body, subscriptionState);
    return res.status(201).json({
      message: "SUCCESS",
      routineId: routineId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoutine,
};
