const { routineStartService } = require("../services");

const routineStartController = async (req, res) => {
  try {
    const { routineId } = req.params;
    console.log("req.params:::::::::", req.params);
    console.log("routineId::::::::::::", routineId);
    const routineStart = await routineStartService(routineId);

    return res.status(200).json({
      message: "Routine Success",
      data: routineStart,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { routineStartController };
