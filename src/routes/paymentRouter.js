const express = require("express");
const { tokenValidation } = require("../middleware/tokenValidation")

const { paymentController } = require("../controllers");

const paymentRouter = express.Router();

paymentRouter.post("/", tokenValidation ,paymentController.subscribePayment);

module.exports = {
    paymentRouter,
};
