const { In } = require("typeorm");
const { Exercise } = require("../entity/exerciseEntity");
const { RoutineExercise } = require("../entity/routineExerciseEntity");
const { ExerciseCategory } = require("../entity/exerciseCategoryEntity");
const { AppDataSource } = require("./dataSource");

const getRandomExercises = async (subscriptionState, limit = 3) => {
  const limitedContentsQuery = !subscriptionState
    ? "exercise.isPremium = false"
    : ``;

  const exercises = await AppDataSource.getRepository(Exercise)
    .createQueryBuilder("exercise")
    .select("exercise.id")
    .addSelect("exercise.thumbnailUrl")
    .addSelect("exercise.name")
    .addSelect("exercise.isPremium")
    .addSelect("exercise.caloriesUsed")
    .addSelect("exercise.durationInSecondsPerSet")
    .leftJoinAndSelect("exercise.exerciseCategory", "exerciseCategory")
    .where(limitedContentsQuery)
    .orderBy("RAND()")
    .take(limit)
    .getMany();

  return exercises;
};

const getExercisesDetailsByIds = async (exerciseIds) => {
  const exercises = await AppDataSource.manager.find(Exercise, {
    select: {
      id: true,
      thumbnailUrl: true,
      name: true,
      isPremium: true,
      caloriesUsed: true,
      durationInSecondsPerSet: true,
      exerciseCategoryId: true,
      exerciseCategory: {
        name: true,
      },
    },
    relations: {
      exerciseCategory: true,
    },
    where: {
      id: In(exerciseIds),
    },
  });

  return exercises;
};

const getRecommended = () => {
  // TODO: implement recommendation logic later
  return [];
};

const getExercisesListByIds = async (exerciseIds) => {
  const exercises = await AppDataSource.manager.find(Exercise, {
    select: {
      id: true,
      isPremium: true,
    },
    where: {
      id: In(exerciseIds),
    },
  });
  return exercises;
};

const getExercisesListByRoutineId = async (routineId) => {
  const exercises = await AppDataSource.getRepository(RoutineExercise)
    .createQueryBuilder("routineExercise")
    .where("routineExercise.routineId = :routineId", { routineId: routineId })
    .leftJoinAndSelect("routineExercise.routine", "routine")
    .leftJoinAndSelect("routineExercise.exercise", "exercise")
    .getMany();

  return exercises;
};

const getExercises = async (category, equipRequired, sort, offset, limit) => {
  const exercises = await AppDataSource.manager.find(Exercise, {
    select: {
      id: true,
      name: true,
      description: true,
      equipRequired: true,
      thumbnailUrl: true,
      durationInSecondsPerSet: true,
      isPremium: true,
      caloriesUsed: true,
      setCounts: true,
      exerciseCategory: {
        id: true,
        name: true,
      },
    },
    where: {
      exerciseCategory: { id: category }, // 전체(null), 전신(1), 상체(2), 하체(3)
      equipRequired: equipRequired, // 전체(null), 맨몸(0), 기구(1)
    },
    relations: {
      exerciseCategory: true,
    },
    skip: offset,
    take: limit,
    order: {
      id: "ASC",
    },
  });

  return exercises;
};

module.exports = {
  getRecommended,
  getRandomExercises,
  getExercisesListByIds,
  getExercisesListByRoutineId,
  getExercises,
  getExercisesDetailsByIds,
};
