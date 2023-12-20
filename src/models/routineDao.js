const { In } = require("typeorm");
const { Routine } = require("../entity/routineEntity");
const { User } = require("../entity/userEntity");
const { AppDataSource } = require("./dataSource");
const { Exercise } = require("../entity/exerciseEntity");
const { RoutineExercise } = require("../entity/routineExerciseEntity");

const getExerciseByRoutineId = async (id) => {
  const result = await AppDataSource.manager.find(RoutineExercise, {
    where: {
      routine: {
        id: id,
      },
    },
    relations: {
      exercise: true,
    },
    select: {
      exercise: true,
    },
  });
  return result;
};

const findRoutineExercisesByRoutineId = async (id) => {
  const result = await AppDataSource.manager.find(RoutineExercise, {
    where: {
      routine: {
        id: id,
      },
    },
    relations: {
      exercise: true,
    },
    select: { id: true, exercise: { id: true } },
  });
  return result;
};

const findRoutineByRoutineId = async (id) => {
  const result = await AppDataSource.manager.findOne(Routine, {
    where: {
      id: id,
    },
  });
  return result;
};

const createRoutine = async (userId, isCustom, exerciseIds, routineName) => {
  const user = await AppDataSource.manager.findOneBy(User, { id: userId });
  const routine = {
    name: routineName,
    user: user,
    is_custom: isCustom,
  };

  const createdRoutine = await AppDataSource.transaction(
    async (transactionalEntityManager) => {
      const createdRoutine = await transactionalEntityManager.save(
        Routine,
        routine
      );
      const exercises = await transactionalEntityManager.find(Exercise, {
        where: {
          id: In(exerciseIds),
        },
      });
      const routineExercises = exercises.map((exercise, idx) => ({
        routine: createdRoutine,
        exercise: exercise,
        completed: false,
      }));
      await transactionalEntityManager.save(RoutineExercise, routineExercises);
      return createdRoutine;
    }
  );

  return createdRoutine;
};

const getRoutineHistoryByDate = async (userId, startDate, endDate) => {
  const [routine] = await AppDataSource.query(
    `
    SELECT
      routines.id AS routineId,
      JSON_ARRAYAGG(
        routine_exercises.exercise_id
      ) AS exercises
    FROM
      routines
    LEFT JOIN routine_exercises ON routine_exercises.routine_id = routines.id
    WHERE
      routines.user_id = ?
      AND
      routines.created_at >= ?
      AND
      routines.created_at < ?
    GROUP BY routines.id
    ;
  `,
    [userId, startDate, endDate]
  );
  return routine;
};

const checkExerciseIdsInRoutine = async (id, exerciseIds) => {
  const result = await AppDataSource.manager.find(RoutineExercise, {
    where: {
      routine: {
        id: id,
      },
      exercise: {
        id: In(exerciseIds),
      },
    },
    select: {
      id: true,
      routine: {
        id: true,
      },
      exercise: {
        id: true,
      },
    },
    relations: {
      routine: true,
      exercise: true,
    },
  });
  // const result = await AppDataSource.query(
  //   `SELECT id, routine_id, exercise_id
  //   FROM routine_exercises
  //   WHERE routine_id = ? AND exercise_id IN (?)`,
  //   [id, exerciseIds]
  // );

  return result;
};

const routinesByUser = async (userId, limit, offset) => {
  const result = await AppDataSource.manager.find(Routine, {
    where: {
      user: {
        id: userId,
      },
    },
    order: {
      created_at: "DESC",
    },
    skip: offset,
    take: limit,
  });
  // const result = await AppDataSource.query(
  //   `SELECT
  //     routines.id AS routineId,
  //     routines.name AS routineName,
  //     JSON_ARRAYAGG(exercises.name) AS exerciseNames,
  //     JSON_ARRAYAGG(exercises.set_counts) AS setCounts,
  //     TIME_FORMAT(
  //       SEC_TO_TIME(
  //         SUM(exercises.duration_in_seconds_per_set * exercises.set_counts)
  //         ),
  //         "%i:%s")
  //       AS totalDuration,
  //     IF(ISNULL(routines.updated_at), routines.created_at, routines.updated_at)
  //       AS createDate
  //   FROM
  //     routines
  //   JOIN routine_exercises ON routines.id = routine_exercises.routine_id
  //   JOIN exercises ON routine_exercises.exercise_id = exercises.id
  //   WHERE
  //     routines.user_id = ? AND routines.is_custom = 1
  //   GROUP BY
  //     routine_exercises.routine_id
  //   ORDER BY
  //     createDate DESC
  //   LIMIT ? OFFSET ?`,
  //   [userId, limit, offset]
  // );
  return result;
};

const getRoutineExercisesListByRoutineIds = async (routineIds) => {
  const queryBuilder =
    AppDataSource.getRepository(RoutineExercise).createQueryBuilder(
      "routineExercise"
    );
  const routineExercises = await queryBuilder
    .leftJoin("routineExercise.routine", "routine")
    .addSelect(["routine.id", "routine.name", "routine.created_at"])
    .leftJoin("routineExercise.exercise", "exercise")
    .addSelect([
      "exercise.id",
      "exercise.name",
      "exercise.set_counts",
      "exercise.duration_in_seconds_per_set",
    ])
    .getMany();
  return routineExercises;
};

const toCustom = async (userId, routineId) => {
  const recommendedToCustom = await AppDataSource.query(
    `UPDATE routines
    SET is_custom = 1
    WHERE user_id = ? AND id = ?`,
    [userId, routineId]
  );
};

const customCheck = async (userId, routineId) => {
  const [customRoutineCheck] = await AppDataSource.query(
    `SELECT is_custom
    FROM routines
    WHERE user_id = ? AND id = ?`,
    [userId, routineId]
  );
  return customRoutineCheck;
};

const updateCompletedExerciseStatusbyRoutineId = async (id, exerciseIds) => {
  await AppDataSource.manager.update(
    RoutineExercise,
    {
      routine: {
        id: id,
      },
      exercise: {
        id: In(exerciseIds),
      },
    },
    {
      completed: true,
    }
  );
};

module.exports = {
  getExerciseByRoutineId,
  findRoutineByRoutineId,
  findRoutineExercisesByRoutineId,
  createRoutine,
  getRoutineHistoryByDate,
  checkExerciseIdsInRoutine,
  updateCompletedExerciseStatusbyRoutineId,
  routinesByUser,
  getRoutineExercisesListByRoutineIds,
  toCustom,
  customCheck,
};
