// const { In, EntityManager } = require("typeorm");
const { User } = require("../entity/userEntity");
const { SubscriptionOrder } = require("../entity/subscriptionOrderEntity")
const { AppDataSource } = require("./dataSource");

//구독신청(주문)
const createSubscription = async (userId, amount, provider) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const status = 1
        const subscriptionOrder = {
            userId: userId,
            amount: amount,
            provider: provider,
            status: status
        };
        await queryRunner.manager.save(SubscriptionOrder, subscriptionOrder)
        const updateSubscriptionState = await queryRunner.manager.update(User,
            { id: userId, subscriptionState: 0 },
            { subscriptionState: 1 })
        await queryRunner.commitTransaction();
        return updateSubscriptionState;
    } catch (err) {
        console.log(err)
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    };
};

const subscribeUser = async (userId) => {
    const subscribingUser = await AppDataSource.manager.findOne(User, {
        where: {
            id: userId,
            subscriptionState: 1
        },
    })
    return subscribingUser;

};

module.exports = {
    createSubscription,
    subscribeUser,
};


