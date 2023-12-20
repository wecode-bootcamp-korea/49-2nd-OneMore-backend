const { AppDataSource } = require("./dataSource");
const { In } = require("typeorm");
const { Exercise } = require("../entity/exerciseEntity");

const getRandomExercises = async (subscriptionState, limit = 3) => {
  const limitedContentsQuery = !subscriptionState
    ? `WHERE exercises.is_premium = false`
    : ``;
  const exercises = await AppDataSource.manager.find(Exercise, {
    select: {
      id: true,
      thumbnail_url: true,
      name: true,
      is_premium: true,
      calories_used: true,
      duration_in_seconds_per_set: true,
      exercise_category: {
        id: true,
        name: true,
      },
    },
    relations: {
      exercise_category: true,
    },
    // where: { limitedContentsQuery },
    order: {},
  });

  //   ORDER BY RAND()
  //   LIMIT ?
  //   ;
  // ,
  //   [limit]
  // );
  return exercises;
};

// const getRandomExercises = async (subscriptionState, limit = 3) => {
//   const limitedContentsQuery = !subscriptionState
//     ? `WHERE exercises.is_premium = false`
//     : ``;
//   const exercises = await AppDataSource.query(
//     `
//     SELECT
//       exercises.id AS exerciseId,
//       exercises.thumbnail_url AS thumbnailURL,
//       exercises.name,
//       exercises.is_premium AS isPremium,
//       exercises.calories_used AS calories,
//       exercises.duration_in_seconds_per_set AS durationInSecondsPerSet,
//       exercises.exerciseCategoryId AS categoryId,
//       exercise_categories.name AS categoryName
//     From
//       exercises
//     LEFT JOIN exercise_categories ON exercise_categories.id = exercises.exerciseCategoryId
//     ${limitedContentsQuery}
//     ORDER BY RAND()
//     LIMIT ?
//     ;
//   `,
//     [limit]
//   );
//   return exercises;
// };

const getExercisesDetailsByIds = async (exerciseIds) => {
  const exercises = await AppDataSource.manager.find(Exercise, {
    select: {
      id: true,
      thumbnail_url: true,
      name: true,
      is_premium: true,
      calories_used: true,
      duration_in_seconds_per_set: true,
      exerciseCategoryId: true,
      // exercise_category: { name: true },
    },
    // // relations: {
    // //   exercise_category: {
    // //     name: true,
    // //   },
    // },
    where: {
      id: In(exerciseIds),
    },
  });

  return exercises;
};

// const getExercisesDetailsByIds = async (exerciseIds) => {
//   const exercises = await AppDataSource.query(
//     `
//     SELECT
//       exercises.id AS exerciseId,
//       exercises.thumbnail_url AS thumbnailURL,
//       exercises.name,
//       exercises.is_premium AS isPremium,
//       exercises.calories_used AS calories,
//       exercises.duration_in_seconds_per_set AS durationInSecondsPerSet,
//       exercises.exerciseCategoryId AS categoryId,
//       exercise_categories.name AS categoryName
//     From
//       exercises
//     LEFT JOIN exercise_categories ON exercise_categories.id = exercises.exerciseCategoryId
//     WHERE exercises.id IN (?)
//     ;
//   `,
//     [exerciseIds]
//   );
//   return exercises;
// };

const getRecommended = () => {
  // TODO: implement recommendation logic later
  return [];
};

const getExercisesListByIds = async (exerciseIds) => {
  const exercises = await AppDataSource.query(
    `
    SELECT 
      id,
      is_premium AS isPremium
    FROM
      exercises
    WHERE id IN (?)
    ;
  `,
    [exerciseIds]
  );
  return exercises;
};

const getExercisesListByRoutineId = async (routineId) => {
  const exercises = await AppDataSource.query(
    `
    SELECT DISTINCT
      exerciseId
    FROM
      routine_exercises
    WHERE routineId = ?
    ;
  `,
    [routineId]
  );
  return exercises;
};

const getExercises = async (exerciseQueryString = ``) => {
  const exercises = await AppDataSource.manager.find(Exercise, {
    select: {
      id: true,
      name: true,
      description: true,
      equip_required: true,
      thumbnail_url: true,
      duration_in_seconds_per_set: true,
      is_premium: true,
      calories_used: true,
      set_counts: true,
      exercise_category: {
        id: true,
        name: true,
      },
    },
    relations: {
      exercise_category: true,
    },
  });

  return exercises;
};

// const getExercises = async (exerciseQueryString = ``) => {
//   const exercises = await AppDataSource.query(`
//     SELECT
//       id AS exerciseId,
//       name,
//       description,
//       exercise_category AS category,
//       equip_required AS equipRequired,
//       thumbnail_url AS thumbnailURL,
//       duration_in_seconds_per_set AS durationInSecondsPerSet,
//       is_premium AS isPremium,
//       calories_used AS caloriesUsed,
//       set_counts AS setCounts
//     FROM
//       exercises
//     ${exerciseQueryString}
//     ;
//   `);
//   return exercises;
// }; // exerciseQueryString  :  where, orderby, limit&offset

module.exports = {
  getRecommended,
  getRandomExercises,
  getExercisesListByIds,
  getExercisesListByRoutineId,
  getExercises,
  getExercisesDetailsByIds,
};
