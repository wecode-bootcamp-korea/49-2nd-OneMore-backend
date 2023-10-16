const express = require("express");

const { exerciseRouter } = require("./exerciseRoute");
const { validateToken } = require("../middleware/validateToken");

const router = express.Router();

router.use(validateToken);
router.use("/exercises", exerciseRouter);

module.exports = {
  router,
};
