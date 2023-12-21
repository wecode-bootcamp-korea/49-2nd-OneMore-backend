const { EntitySchema } = require("typeorm");
const { BaseColumnSchemaPart } = require("./BaseColumnSchemaPart");

const ExerciseCategory = new EntitySchema({
  name: "ExerciseCategory",
  tableName: "exercise_categories",
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: "varchar",
      length: 100,
    },
  },
});

module.exports = {
  ExerciseCategory,
};
