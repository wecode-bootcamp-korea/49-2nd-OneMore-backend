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
    subscriptionState: {
      type: "tinyint",
      default: 0,
    },
    phoneNumber: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    socialAccountProvider: {
      type: "int",
      nullable: true,
    },
    socialAccountUid: {
      type: "varchar",
      length: 500,
      nullable: true,
    },
    profileImage: {
      type: "varchar",
      length: 2000,
      nullable: true,
    },
  },
});

module.exports = { User };
