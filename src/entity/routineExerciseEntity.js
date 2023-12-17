const { EntitySchema } = require("typeorm");

const RoutineExercise = new EntitySchema({
  name: "RoutineExercise",
  tableName: "routine_exercises",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
      nullable: true,
    },
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
