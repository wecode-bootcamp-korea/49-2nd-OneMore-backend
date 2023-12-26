function getRoutineStatistic(exercises) {
  let totalDurationInSeconds = 0;
  let totalCalories = 0;
  let mostFrequent = { count: 0 };
  let categoryCounts = {};
  exercises.map((item) => {
    totalCalories += item.caloriesUsed;
    totalDurationInSeconds += item.durationInSecondsPerSet;
    let itemCategoryCount = categoryCounts[item.exerciseCategory.name];
    categoryCounts[item.exerciseCategory.name] =
      itemCategoryCount !== undefined ? itemCategoryCount + 1 : 1;
    let updatedCategoryCount = categoryCounts[item.exerciseCategory.name];
    mostFrequent =
      mostFrequent.count > updatedCategoryCount
        ? mostFrequent
        : { count: updatedCategoryCount, category: item.exerciseCategory.name };
  });
  return { totalDurationInSeconds, totalCalories, mostFrequent };
}

module.exports = {
  getRoutineStatistic,
};
