const { subscriptionService } = require("../services");

const createSubscription = async (req, res, next) => {
    try {
        const { userId, amount, provider, status } = req.body;
        console.log("userId: ", userId)
        if (!userId) throwError(400, 'KEY_ERROR_UID');
        if (!amount) throwError(400, 'KEY_ERROR_AMOUNT');
        if (!provider) throwError(400, 'KEY_ERROR_PROVIDER');
        if (!status) throwError(400, 'KEY_ERROR_STATUS');
        console.log("C->createSubscription: ", createSubscription)
        return res.status(201).json({
            message: 'SUCCESS_SUBSCRIPTION',
            data: await subscriptionService.createSubscription(userId, amount, provider, status),
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};

module.exports = {
    createSubscription,
};