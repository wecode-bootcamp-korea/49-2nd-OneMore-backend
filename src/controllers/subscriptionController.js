const { subscriptionService } = require("../services");
const utils = require("../utils");

const createSubscription = async (req, res, next) => {
    try {
        const { userId, amount, provider } = req.body;
        if (!userId) utils.throwError(400, 'KEY_ERROR_UID');
        if (!amount) utils.throwError(400, 'KEY_ERROR_AMOUNT');
        if (!provider) utils.throwError(400, 'KEY_ERROR_PROVIDER');
        const createdSubscription = await subscriptionService.createSubscription(userId, amount, provider)
        return res.status(201).json({
            message: 'SUCCESS_SUBSCRIPTION_AND_PAYMENT',
            createdSubscription: createdSubscription
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};

module.exports = {
    createSubscription,
};