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
    video_url: {
      type: "varchar",
      length: 2000,
    },
    thumbnail_url: {
      type: "varchar",
      length: 2000,
    },
    calories_used: {
      type: "int",
      nullable: true,
    },
    description: {
      type: "varchar",
      length: 1000,
      nullable: true,
    },
    is_premium: {
      type: "boolean",
      default: false,
    },
    duration_in_seconds_per_set: {
      type: "int",
    },
    counts_per_set: {
      type: "int",
      default: 1,
      nullable: true,
    },
    set_counts: {
      type: "int",
      default: 1,
    },
    equip_required: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    exercise_category: {
      target: "ExerciseCategory",
      type: "many-to-one",
      jointable: true,
    },
  },
});

module.exports = { Exercise };
