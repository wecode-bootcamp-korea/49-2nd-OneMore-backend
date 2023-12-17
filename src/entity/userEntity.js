const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
      length: 255,
      unique: true,
    },
    password: {
      type: "varchar",
      length: 255,
      default: true,
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
    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
      nullable: true,
    }
  },
});

module.exports = { User };
