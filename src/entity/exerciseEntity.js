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
      type: "tinyint",
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
      type: "tinyint",
      default: 0,
    },
    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
      nullable: true,
    }
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
