class ExerciseQueryBuilder {
  /**
   *
   * @param {number} category
   * @param {number} equipRequired
   * @param {string} sort
   * @param {number} offset
   * @param {number} limit
   */
  constructor(category, equipRequired, sort, offset, limit) {
    this.category = category;
    this.equipRequired = equipRequired;
    this.sort = sort;
    this.offset = offset;
    this.limit = limit;
  }

  buildWhereClause() {
    const whereStrings = [];
    if (this.category)
      whereStrings.push(`exercises.exerciseCategoryId = ${this.category}`);
    if (this.equipRequired)
      whereStrings.push(`exercises.equipRequired = ${this.equipRequired}`);

    return whereStrings.length > 0 ? `WHERE ${whereStrings.join(" AND ")}` : ``;
  }

  buildOrderByClause() {
    return `ORDER BY exercises.id ASC`;
  }

  buildOffsetLimitClause() {
    return `LIMIT ${this.limit} OFFSET ${this.offset}`;
  }

  build() {
    let exerciseQueryStrings = [
      this.buildWhereClause(),
      this.buildOrderByClause(),
      this.buildOffsetLimitClause(),
    ];
    return exerciseQueryStrings.join(` `);
  }
}

module.exports = ExerciseQueryBuilder;
