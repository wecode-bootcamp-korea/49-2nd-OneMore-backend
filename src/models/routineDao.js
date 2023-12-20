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
    select: { id: true, exercise: { id: true }, completed: true },
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
  const routine = await AppDataSource.getRepository(Routine)
    .createQueryBuilder("routine")
    .leftJoin("routine.user", "user")
    .leftJoin("routine.routineExercises", "routineExercise")
    .addSelect(["routineExercise.id"])
    .leftJoinAndSelect("routineExercise.exercise", "exercise")
    .where("user.id = :userId", {userId: userId})
    .andWhere("routine.createdAt >= :startDate", {startDate: startDate})
    .andWhere("routine.createdAt < :endDate", {endDate: endDate})
    .getOne();
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
      "exercise.setCounts",
      "exercise.durationInSecondsPerSet",
    ])
    .where(`routine.id IN ?`, [routineIds])
    .getMany();
  return routineExercises;
};

const toCustom = async (userId, routineId) => {
  await AppDataSource.manager.update(
    Routine,
    {
      id: routineId,
      user: {
        id: userId,
      },
    },
    {
      is_custom: 1,
    }
  );
};

const customCheck = async (routineId) => {
  const customRoutineCheck = await AppDataSource.manager.findOne(Routine, {
    where: {
      id: routineId,
    },
    select: {
      is_custom: true,
    },
  });
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
