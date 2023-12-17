const { EntitySchema } = require("typeorm");

const Routine = new EntitySchema({
  name: "Routine", // relations에서 target 의 이름으로 사용됨
  tableName: "routine", // 실제 데이터베이스에 생성되는 테이블 이름
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
    },
    isCustom: {
      type: "boolean",
      default: false,
    },
    createdAt: {
      createDate: true,
    },
    updatedAt: {
      updateDate: true,
      nullable: true,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
    },
  },
});

module.exports = { Routine };
