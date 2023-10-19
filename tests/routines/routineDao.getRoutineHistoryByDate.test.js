const { log } = require("console");

const { routineDao } = require("../../src/models");
const { AppDataSource } = require("../../src/models/dataSource");
const utils = require("../../src/utils");

describe("TEST: routineDao getRoutineHistoryByDate", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.query(`
      INSERT INTO users
        (nickname, email, subscription_state)
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
        (name, video_url, thumbnail_url, is_premium, exercise_category, duration_in_seconds_per_set, set_counts)
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
        (id, user_id, is_custom, created_at)
      VALUES
        (1, 1, 0, '2023-09-18 09:00:00'),
        (2, 1, 0, '2023-09-19 23:00:00'),
        (3, 1, 0, '2023-09-20 09:00:00'),
        (4, 1, 0, NOW())
      ;
    `);
    await AppDataSource.query(`
      INSERT INTO routine_exercises
        (id, routine_id, exercise_id, completed, created_at)
      VALUES
        (1, 1, 1, 1, '2023-09-18 09:00:00'),
        (2, 1, 2, 1, '2023-09-18 09:00:00'),
        (3, 1, 3, 1, '2023-09-18 09:00:00'),
        (4, 2, 4, 1, '2023-09-19 23:00:00'),
        (5, 2, 5, 1, '2023-09-19 23:00:00'),
        (6, 2, 6, 1, '2023-09-19 23:00:00'),
        (7, 3, 1, 1, '2023-09-20 09:00:00'),
        (8, 3, 2, 1, '2023-09-20 09:00:00'),
        (9, 3, 3, 1, '2023-09-20 09:00:00'),
        (10, 4, 3, 1, NOW()),
        (11, 4, 4, 1, NOW()),
        (12, 4, 5, 1, NOW())
    `)
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
    const todayDatetime = new Date();
    const tomorrowDatetime = new Date();
    tomorrowDatetime.setDate(todayDatetime.getDate() +1);
    const today = utils.formatDate(todayDatetime);
    const tomorrow = utils.formatDate(tomorrowDatetime);

    const result = await routineDao.getRoutineHistoryByDate(1, today, tomorrow);
    
    expect(result.routineId).toBe(4);
    expect(result.exercises.length).toEqual(3);
  });

  test("SUCCESS: today's routine not exists", async () => {
    const todayDatetime = new Date();
    const tomorrowDatetime = new Date();
    tomorrowDatetime.setDate(todayDatetime.getDate() +1);
    const today = utils.formatDate(todayDatetime);
    const tomorrow = utils.formatDate(tomorrowDatetime);

    const result = await routineDao.getRoutineHistoryByDate(2, today, tomorrow);
    
    expect(result).toBe(undefined);
  });
});