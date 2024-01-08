const { log } = require("console");

const { routineDao } = require("../../src/models");
const { AppDataSource } = require("../../src/models/dataSource");
const utils = require("../../src/utils");

describe("TEST: routineDao getRoutineHistoryByDate", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.query(`
      INSERT INTO users
        (nickname, email, subscriptionState)
      VALUES
        ('testUserWithoutSubscription', 'testUser1@email.com', 0),
        ('testUserWithSubscription', 'testUser2@email.com', 1)
      ;
    `);
    await AppDataSource.query(`
      INSERT INTO exercise_categories
        (name)
      VALUES
        ('testCategory1'),
        ('testCategory2'),
        ('testCategory3'),
        ('testCategory4')
      ;
    `);
    await AppDataSource.query(`
      INSERT INTO exercises
        (name, videoUrl, thumbnailUrl, isPremium, exerciseCategoryId, durationInSecondsPerSet, setCounts)
      VALUES
        ('testExercise1', 'testVideoUrl', 'testThumbnailUrl', 0, 1, 60, 1),
        ('testExercise2', 'testVideoUrl', 'testThumbnailUrl', 0, 1, 60, 2),
        ('testExercise3', 'testVideoUrl', 'testThumbnailUrl', 0, 1, 60, 3),
        ('testExercise4', 'testVideoUrl', 'testThumbnailUrl', 0, 1, 60, 4),
        ('testExercise5', 'testVideoUrl', 'testThumbnailUrl', 0, 1, 60, 5),
        ('testExercise6', 'testVideoUrl', 'testThumbnailUrl', 1, 1, 60, 6),
        ('testExercise7', 'testVideoUrl', 'testThumbnailUrl', 1, 1, 60, 7),
        ('testExercise8', 'testVideoUrl', 'testThumbnailUrl', 1, 1, 60, 8),
        ('testExercise9', 'testVideoUrl', 'testThumbnailUrl', 1, 1, 60, 9)
      ;
    `);
    await AppDataSource.query(`
      INSERT INTO routines
        (id, userId, isCustom, name, createdAt)
      VALUES
        (1, 1, 0, '루틴', '2023-09-18 09:00:00'),
        (2, 1, 0, '루틴', '2023-09-19 23:00:00'),
        (3, 1, 0, '루틴', '2023-09-20 09:00:00')
      ;
    `);
    await AppDataSource.query(`
      INSERT INTO routine_exercises
        (id, routineId, exerciseId, completed, createdAt)
      VALUES
        (1, 1, 1, 1, '2023-09-18 09:00:00'),
        (2, 1, 2, 1, '2023-09-18 09:00:00'),
        (3, 1, 3, 1, '2023-09-18 09:00:00'),
        (4, 2, 4, 1, '2023-09-19 23:00:00'),
        (5, 2, 5, 1, '2023-09-19 23:00:00'),
        (6, 2, 6, 1, '2023-09-19 23:00:00'),
        (7, 3, 1, 1, '2023-09-20 09:00:00'),
        (8, 3, 2, 1, '2023-09-20 09:00:00'),
        (9, 3, 3, 1, '2023-09-20 09:00:00')
    `);
    log("database initialized for test");
  });

  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE exercises`);
    await AppDataSource.query(`TRUNCATE routines`);
    await AppDataSource.query(`TRUNCATE routine_exercises`);
    await AppDataSource.query(`TRUNCATE exercise_categories`);
    await AppDataSource.query(`SET foreign_key_checks = 1`);
    await AppDataSource.destroy();
  });

  test("SUCCESS: today's routine exists", async () => {
    const today = utils.formatDate(new Date("2023-09-20"));
    const tomorrow = utils.formatDate(new Date("2023-09-21"));

    const result = await routineDao.getRoutineHistoryByDate(1, today, tomorrow);

    expect(result.routineId).toBe(3);
    expect(result.exercises).toEqual([1, 2, 3]);
  });

  test("SUCCESS: today's routine not exists", async () => {
    const today = utils.formatDate(new Date("2023-09-20"));
    const tomorrow = utils.formatDate(new Date("2023-09-21"));

    const result = await routineDao.getRoutineHistoryByDate(2, today, tomorrow);

    expect(result).toBe(undefined);
  });
});
