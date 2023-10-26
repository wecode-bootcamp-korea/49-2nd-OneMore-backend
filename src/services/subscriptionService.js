const { subscriptionDao } = require("../models");
const utils = require("../utils");

const createSubscription = async (userId, amount, provider) => {
  const subscribingUser = await subscriptionDao.subscribeUser(userId);
  if (subscribingUser) {
    utils.throwError(400, "USER_ALREADY_SUBSCRIBING");
  }
  return await subscriptionDao.createSubscription(userId, amount, provider);
};

module.exports = {
  createSubscription,
};
