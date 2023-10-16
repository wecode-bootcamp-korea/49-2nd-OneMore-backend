// const express = require("express");
// const router = express.Router();

// const { routineStartController } = require("../controllers");

// router.get("/", routineStartController);

// module.exports = { routineStartController };

const express = require("express");
const router = express.Router();

const { routineStartController } = require("../controllers");

router.get("/:routineId", routineStartController);

module.exports = router;
