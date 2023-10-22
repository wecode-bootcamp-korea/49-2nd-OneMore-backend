const { log } = require("console");

const { AppDataSource } = require("../../src/models/dataSource");
const { exerciseService } = require("../../src/services");

describe("TEST exerciseDao.getExercises", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.query(`
      INSERT INTO users
        (id, nickname, email, subscription_state)
      VALUES
        (1, 'testUserWithoutSubscription', 'testUser1@email.com', 0),
        (2, 'testUserWithSubscription', 'testUser2@email.com', 1)
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
        (name, video_url, thumbnail_url, is_premium, exercise_category, duration_in_seconds_per_set, set_counts, equip_required)
      VALUES
        ('testExercise1', 'testVideoUrl', 'testThumbnailUrl', 1, 1, 60, 1, 0),
        ('testExercise2', 'testVideoUrl', 'testThumbnailUrl', 0, 1, 60, 2, 0),
        ('testExercise3', 'testVideoUrl', 'testThumbnailUrl', 1, 1, 60, 3, 0),
        ('testExercise4', 'testVideoUrl', 'testThumbnailUrl', 0, 1, 60, 4, 1),
        ('testExercise5', 'testVideoUrl', 'testThumbnailUrl', 1, 1, 60, 5, 1),
        ('testExercise6', 'testVideoUrl', 'testThumbnailUrl', 0, 2, 60, 6, 1),
        ('testExercise7', 'testVideoUrl', 'testThumbnailUrl', 1, 2, 60, 7, 1),
        ('testExercise8', 'testVideoUrl', 'testThumbnailUrl', 0, 2, 60, 8, 0),
        ('testExercise9', 'testVideoUrl', 'testThumbnailUrl', 1, 2, 60, 9, 0),
        ('testExercise10', 'testVideoUrl', 'testThumbnailUrl', 0, 3, 60, 9, 0),
        ('testExercise11', 'testVideoUrl', 'testThumbnailUrl', 1, 3, 60, 1, 0),
        ('testExercise12', 'testVideoUrl', 'testThumbnailUrl', 0, 3, 60, 2, 0),
        ('testExercise13', 'testVideoUrl', 'testThumbnailUrl', 1, 3, 60, 3, 0),
        ('testExercise14', 'testVideoUrl', 'testThumbnailUrl', 0, 3, 60, 4, 1),
        ('testExercise15', 'testVideoUrl', 'testThumbnailUrl', 1, 3, 60, 5, 1),
        ('testExercise16', 'testVideoUrl', 'testThumbnailUrl', 0, 4, 60, 6, 1),
        ('testExercise17', 'testVideoUrl', 'testThumbnailUrl', 1, 4, 60, 7, 1),
        ('testExercise18', 'testVideoUrl', 'testThumbnailUrl', 0, 4, 60, 8, 0),
        ('testExercise19', 'testVideoUrl', 'testThumbnailUrl', 1, 4, 60, 9, 0),
        ('testExercise20', 'testVideoUrl', 'testThumbnailUrl', 0, 4, 60, 9, 0)
      ;
    `);

    await AppDataSource.query(`
      INSERT INTO routines
        (id, user_id, is_custom, created_at)
      VALUES
        (4, 1, 0, '2023-09-18 09:00:00'),
        (5, 1, 0, '2023-09-19 23:00:00'),
        (6, 1, 0, '2023-09-20 09:00:00')
      ;
    `);
    await AppDataSource.query(`
      INSERT INTO routine_exercises
        (id, routine_id, exercise_id, completed, created_at)
      VALUES
        (1, 4, 1, 1, '2023-09-18 09:00:00'),
        (2, 4, 2, 1, '2023-09-18 09:00:00'),
        (3, 4, 3, 1, '2023-09-18 09:00:00'),
        (4, 5, 4, 1, '2023-09-19 23:00:00'),
        (5, 5, 5, 1, '2023-09-19 23:00:00'),
        (6, 5, 6, 1, '2023-09-19 23:00:00'),
        (7, 6, 1, 1, '2023-09-20 09:00:00'),
        (8, 6, 2, 1, '2023-09-20 09:00:00'),
        (9, 6, 3, 1, '2023-09-20 09:00:00')
    `)
    console.log("database initialized for test");
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE exercises`);
    await AppDataSource.query(`TRUNCATE exercise_categories`);
    await AppDataSource.query(`TRUNCATE routines`);
    await AppDataSource.query(`TRUNCATE routine_exercises`);
    await AppDataSource.query(`SET foreign_key_checks = 1`);
    await AppDataSource.destroy();
  });

  test("SUCCESS: getExercises without queryParams", async () => {
    const queryParams = {
      category: undefined,
      equipRequired: undefined,
      sort: undefined,
      offset: 0,
      limit: 20,
      routineId: undefined,
    };
    const result = await exerciseService.getExercises(queryParams);
    expect(result.exercises.length).toBe(20);
  });

  test("SUCCESS: getExercises with category", async () => {
    const queryParams = {
      category: 'testCategory1',
      equipRequired: undefined,
      sort: undefined,
      offset: 0,
      limit: 20,
      routineId: undefined,
    };
    const result = await exerciseService.getExercises(queryParams);
    expect(result.exercises.length).toBe(5);
    result.exercises.map(item => {
      expect(item.category).toBe(1);
    })
  });

  test("SUCCESS: getExercises with equip reqired", async () => {
    const queryParams = {
      category: undefined,
      equipRequired: true,
      sort: undefined,
      offset: 0,
      limit: 20,
      routineId: undefined,
    };
    const result = await exerciseService.getExercises(queryParams);
    expect(result.exercises.length).toBe(8);
    result.exercises.map(item => {
      expect(item.equipRequired).toBe(1);
    })
  });
  
  test("SUCCESS: getExercises with routineId", async () => {
    const queryParams = {
      category: undefined,
      equipRequired: undefined,
      sort: undefined,
      offset: 0,
      limit: 20,
      routineId: 4,
    };
    const result = await exerciseService.getExercises(queryParams);
    expect(result.exercises.length).toBe(20);
    expect(result.selected).toContain(1);
    expect(result.selected).toContain(2);
    expect(result.selected).toContain(3);
  });

  test("SUCCESS: getExercises with limit 5 offset 5", async () => {
    const queryParams = {
      category: undefined,
      equipRequired: undefined,
      sort: undefined,
      offset: 5,
      limit: 5,
      routineId: undefined,
    };
    const result = await exerciseService.getExercises(queryParams);
    expect(result.exercises.length).toBe(5);
    expect(result.exercises[0].exerciseId).toBe(6);
    expect(result.exercises[4].exerciseId).toBe(10);
  });
});
