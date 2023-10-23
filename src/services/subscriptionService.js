const { subscriptionDao } = require("../models");
const utils = require("../utils");

const createSubscription = async (userId, amount, provider, status) => {
    const subscribingUser = await subscriptionDao.subscribeUser(userId)
    console.log("S -> subscribingUser:", subscribingUser)
    if (subscribingUser) {
        utils.throwError(400, "User is already subscribed");
    } return await subscriptionDao.createSubscription(userId, amount, provider, status)
}

const getSubscriptionByUser = async (userId) => {
    console.log("S:", subscriptionDao.getSubscriptionByUser)
    return await subscriptionDao.getSubscriptionByUser(userId)
}
module.exports = {
    createSubscription,
    getSubscriptionByUser,
};