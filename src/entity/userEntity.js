const { EntitySchema } = require("typeorm");
const { BaseColumnSchemaPart } = require("./BaseColumnSchemaPart");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    ...BaseColumnSchemaPart,
    email: {
      type: "varchar",
      length: 255,
      unique: true,
    },
    password: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    nickname: {
      type: "varchar",
      length: 255,
    },
    subscription_state: {
      type: "boolean",
      default: false,
    },
    phone_number: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    social_account_provider: {
      type: "int",
      nullable: true,
    },
    social_account_uid: {
      type: "varchar",
      length: 500,
      nullable: true,
    },
    profile_image: {
      type: "varchar",
      length: 2000,
      nullable: true,
    },
  },
});

module.exports = { User };
