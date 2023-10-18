const request = require("supertest");

const { log } = require("console");

const { app } = require("../../app");
const { routineService } = require("../../src/services");
const { routineDao } = require("../../src/models");
const { AppDataSource } = require("../../src/models/dataSource");
const utils = require("../../src/utils");

describe("TEST routineService", () => {
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

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
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

  test("SUCCESS: routineService create", async () => {
    const userId = 1;
    const subscriptionState = 0;
    const body = {
      exercises: [1, 2, 3, 4, 5],
      isCustom: false,
    };

    const routineDaoCreateRoutineSpy = jest.spyOn(routineDao, "createRoutineInTransaction");
    routineDaoCreateRoutineSpy.mockReturnValue({ insertId: 3 });
    const getIsIntegersSpy = jest.spyOn(utils, "getIsIntegers");
    const getIsPremiumContentSpy = jest.spyOn(utils, "getIsPremiumContent");

    const result = await routineService.createRoutine(
      userId,
      body,
      subscriptionState
    );

    expect(result).toBe(3);
    expect(routineDaoCreateRoutineSpy).toHaveBeenCalled();
    expect(getIsIntegersSpy).toHaveBeenCalled();
    expect(getIsPremiumContentSpy).toHaveBeenCalled();
  });

  test("FAILURE: transaction query failed", async () => {
    const userId = 1;
    const subscriptionState = 0;
    const body = {
      exercises: [1, 2, 3, 4, "string"],
      isCustom: false,
    };

    const routineDaoCreateRoutineSpy = jest.spyOn(routineDao, "createRoutineInTransaction");
    routineDaoCreateRoutineSpy.mockReturnValue(false);

    const throwErrorSpy = jest.spyOn(utils, "throwError");
    throwErrorSpy.mockReturnValue();

    const getIsIntegersSpy = jest.spyOn(utils, "getIsIntegers");
    const getIsPremiumContentSpy = jest.spyOn(utils, "getIsPremiumContent");

    await routineService.createRoutine(
      userId,
      body,
      subscriptionState
    );

    expect(getIsIntegersSpy).toHaveBeenCalled();
    expect(getIsPremiumContentSpy).toHaveBeenCalled();
    expect(routineDaoCreateRoutineSpy).toHaveBeenCalled();
    expect(throwErrorSpy).toHaveBeenCalled();
  });
});
