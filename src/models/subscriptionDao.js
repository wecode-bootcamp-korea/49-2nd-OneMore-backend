const { AppDataSource } = require("./dataSource");

//구독신청(주문)
const createSubscription = async (userId, amount, provider) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const status = 1
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
        console.log(err)
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    };
};

const subscribeUser = async (userId) => {
    const [subscribingUser] = await AppDataSource.query(
        `SELECT id
         FROM users
         WHERE id = ? AND subscription_state = 1;`,
        [userId])
    return subscribingUser
}

module.exports = {
    createSubscription,
    subscribeUser,
};


