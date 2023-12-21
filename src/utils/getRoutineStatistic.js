function getRoutineStatistic(exercises) {
  let totalDurationInSeconds = 0;
  let totalCalories = 0;
  let mostFrequent = { count: 0 };
  let categoryCounts = {};
  exercises.map((item) => {
    totalCalories += item.caloriesUsed;
    totalDurationInSeconds += item.durationInSecondsPerSet;
    let itemCategoryCount = categoryCounts[item.categoryName];
    categoryCounts[item.categoryName] =
      itemCategoryCount !== undefined ? itemCategoryCount + 1 : 1;
    let updatedCategoryCount = categoryCounts[item.categoryName];
    mostFrequent =
      mostFrequent.count > updatedCategoryCount
        ? mostFrequent
        : { count: updatedCategoryCount, category: item.categoryName };
  });
  return { totalDurationInSeconds, totalCalories, mostFrequent };
}

module.exports = {
  getRoutineStatistic,
};
