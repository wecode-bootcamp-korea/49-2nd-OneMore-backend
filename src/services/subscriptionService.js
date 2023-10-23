const { subscriptionDao } = require("../models");
const utils = require("../utils");

const createSubscription = async (userId, amount, provider, status) => {
    const subscribingUser = await subscriptionDao.subscribeUser(userId)
    console.log("S -> subscribingUser:", subscribingUser)
    if (subscribingUser) {
        utils.throwError(400, "User is already subscribed");
    } return await subscriptionDao.createSubscription(userId, amount, provider, status)
}

module.exports = {
    createSubscription,
};