const { EntitySchema } = require('typeorm');
const { BaseColumnSchemaPart } = require("./BaseColumnSchemaPart");

const SubscriptionOrder = new EntitySchema({
    name: "SubscrptionOrder",
    tableName: "subscription_orders",
    columns: {
        ...BaseColumnSchemaPart,
        amount: {
            type: "int"
        },
        provider: {
            type: "varchar",
            length: 255,
        },
        status: {
            type: "tinyint",
            default: 1,
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
        },
    }
});

module.exports = { SubscriptionOrder };