const express = require("express");
const { tokenValidation } = require("../middleware/tokenValidation")

const { paymentController } = require("../controllers");

const paymentRouter = express.Router();

// paymentRouter.get("/:userId", tokenValidation, paymentController.);
paymentRouter.get("/:userId", paymentController.getPaymentByUser);

module.exports = {
    paymentRouter,
};
