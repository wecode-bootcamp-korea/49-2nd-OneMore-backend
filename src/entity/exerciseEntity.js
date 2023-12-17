const { EntitySchema } = require("typeorm");

const Exercise = new EntitySchema({
  name: "Exercise",
  tableName: "exercises",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    is_premium: {
      type: "boolean",
      default: false,
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

module.exports = { Exercise };
