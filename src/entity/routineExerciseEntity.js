const { EntitySchema } = require("typeorm");
const { BaseColumnSchemaPart } = require("./BaseColumnSchemaPart");

const RoutineExercise = new EntitySchema({
  name: "RoutineExercise",
  tableName: "routine_exercises",
  columns: {
    ...BaseColumnSchemaPart,
    completed: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    routine: {
      target: "Routine",
      type: "many-to-one",
      joinTable: true,
    },
    exercise: {
      target: "Exercise",
      type: "many-to-one",
      joinTable: true,
    }
  },
});

module.exports = { RoutineExercise };
