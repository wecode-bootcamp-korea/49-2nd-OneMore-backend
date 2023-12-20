const { EntitySchema } = require("typeorm");
const { BaseColumnSchemaPart } = require("./BaseColumnSchemaPart");

const Routine = new EntitySchema({
  name: "Routine", // relations에서 target 의 이름으로 사용됨
  tableName: "routines", // 실제 데이터베이스에 생성되는 테이블 이름
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: "text",
    },
    is_custom: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    user: {
      target: "User",
      // name: "user_id", // 테스트중  :  columns의 userId로 가능
      type: "many-to-one",
      joinTable: true,
    },
  },
});

module.exports = { Routine };
