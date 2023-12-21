const { EntitySchema } = require("typeorm");
const { BaseColumnSchemaPart } = require("./BaseColumnSchemaPart");

const Exercise = new EntitySchema({
  name: "Exercise",
  tableName: "exercises",
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: "varchar",
      length: 300,
    },
    videoUrl: {
      type: "varchar",
      length: 2000,
    },
    thumbnailUrl: {
      type: "varchar",
      length: 2000,
    },
    caloriesUsed: {
      type: "int",
      nullable: true,
    },
    description: {
      type: "varchar",
      length: 1000,
      nullable: true,
    },
    isPremium: {
      type: "boolean",
      default: false,
    },
    durationInSecondsPerSet: {
      type: "int",
    },
    countsPerSet: {
      type: "int",
      default: 1,
      nullable: true,
    },
    setCounts: {
      type: "int",
      default: 1,
    },
    equipRequired: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    exerciseCategory: {
      target: "ExerciseCategory",
      type: "many-to-one",
      jointable: true,
    },
  },
});

module.exports = { Exercise };
