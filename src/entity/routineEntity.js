const { EntitySchema } = require("typeorm");

const Routine = new EntitySchema({
  name: "Routine", // relations에서 target 의 이름으로 사용됨
  tableName: "routines", // 실제 데이터베이스에 생성되는 테이블 이름
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
    },
    is_custom: {
      type: "boolean",
      default: false,
    },
    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
      nullable: true,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinTable: true,
    },
  },
});

module.exports = { Routine };
