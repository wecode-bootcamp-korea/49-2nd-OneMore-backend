const BaseColumnSchemaPart = {
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
  }
};

module.exports = { BaseColumnSchemaPart };
