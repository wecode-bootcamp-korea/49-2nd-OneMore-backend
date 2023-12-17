const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    createdAt: {
      createDate: true,
    },
    updatedAt: {
      updateDate: true,
      nullable: true,
    }
  },
});

module.exports = { User };
