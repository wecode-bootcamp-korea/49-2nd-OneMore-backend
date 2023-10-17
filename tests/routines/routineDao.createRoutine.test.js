const request = require("supertest");

const { log } = require("console");

const { routineDao } = require("../../src/models");
const { AppDataSource } = require("../../src/models/dataSource");

describe("TEST: routineDao createRoutine", () => {
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

  test("SUCCESS: routineDao", async () => {
    const result = await routineDao.createRoutine(1, false, [1,2,3,4,5]);
    expect(result.insertId).toBe(1);
  });

  test("FAILURE: routineDao with invalid data", async () => {
    const result = await routineDao.createRoutine(1, false, [1,2,3,4,'string']);
    expect(result).toBe(false);
  });

  test("FAILURE: routineDao with non-existing user", async () => {
    const result = await routineDao.createRoutine(3, false, [1,2,3,4,'string']);
    expect(result).toBe(false);
  });
});