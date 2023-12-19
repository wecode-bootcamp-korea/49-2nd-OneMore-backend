const { EntitySchema } = require("typeorm");

const ExerciseCategory = new EntitySchema({
  name: "ExerciseCategory",
  tableName: "exercise_categories",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 100,
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

module.exports = {
  ExerciseCategory,
};