const { AppDataSource } = require("./dataSource");

const getCategoryId = async (category) => {
  const [categoryId] = await AppDataSource.query(
    `
    SELECT
      id
    FROM
      exercise_categories
    WHERE name = ?
    ;
  `,
    [category]
  );
  return categoryId;
};

module.exports = {
  getCategoryId,
};
