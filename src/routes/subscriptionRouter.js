const express = require("express");
const { tokenValidation } = require("../middleware/tokenValidation");
const { subscriptionController } = require("../controllers");

const subscriptionRouter = express.Router();

subscriptionRouter.post("/", tokenValidation, subscriptionController.createSubscription);

module.exports = {
    subscriptionRouter,
};