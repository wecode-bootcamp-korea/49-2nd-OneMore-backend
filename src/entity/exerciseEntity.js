const { EntitySchema } = require("typeorm");

const Exercise = new EntitySchema({
  name: "Exercise",
  tableName: "exercise",
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

module.exports = { Exercise };
