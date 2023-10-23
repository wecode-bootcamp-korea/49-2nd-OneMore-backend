const express = require("express");
const { tokenValidation } = require("../middleware/tokenValidation");
const { subscriptionController } = require("../controllers");

const subscriptionRouter = express.Router();

// subscriptionRouter.post("/", tokenValidation, subscriptionController.createSubscription);
// subscriptionRouter.get("/", tokenValidation, subscriptionController.createSubscription);
subscriptionRouter.post("/", subscriptionController.createSubscription);
subscriptionRouter.get("/:userId", subscriptionController.getSubscriptionByUser);
module.exports = {
    subscriptionRouter,
};