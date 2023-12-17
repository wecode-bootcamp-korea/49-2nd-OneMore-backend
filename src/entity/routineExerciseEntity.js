const { EntitySchema } = require("typeorm");

const RoutineExercise = new EntitySchema({
  name: "RoutineExercise",
  tableName: "routine_exercise",
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
    },
    isCompleted: {
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
