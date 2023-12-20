const BaseColumnSchemaPart = {
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
};

module.exports = { BaseColumnSchemaPart };
