const { AppDataSource } = require("./dataSource");

//구독신청(주문)
const createSubscription = async (userId, amount, provider, status) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        await queryRunner.query(
            `INSERT INTO subscription_orders (
                user_id, 
                amount, 
                provider, 
                status
            ) VALUES (?, ?, ?, ?)`,
            [userId, amount, provider, status]
        );

        const updateSubscriptionState = await queryRunner.query(
            `
            UPDATE users
            SET subscription_state = 1
            WHERE id = ? AND subscription_state = 0;
            `,
            [userId]
        );

        await queryRunner.commitTransaction();
        return updateSubscriptionState;
    } catch (err) {
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    };
};

const subscribeUser = async (userId) => {
    const [subscribingUser] = await AppDataSource.query(
        `SELECT id
         FROM users
         WHERE subscription_state = 1;`,
        [userId])
    console.log("D:", subscribingUser)
    return subscribingUser
}

//유저정보 불러오기
const getSubscriptionByUser = async (userId) => {
    const subscriptionState = 0
    const [user] = await AppDataSource.query(
        `SELECT id, nickname
        FROM users
        WHERE id = ? AND  subscription_state = ?`,
        [userId, subscriptionState])
    console.log("D:", user)
    return user
}

module.exports = {
    createSubscription,
    subscribeUser,
    getSubscriptionByUser,
};


