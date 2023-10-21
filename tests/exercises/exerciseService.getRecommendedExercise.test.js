const { log } = require("console");

const { AppDataSource } = require("../../src/models/dataSource");
const { exerciseService } = require("../../src/services");

describe("TEST exerciseService", () => {
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
    await AppDataSource.query(`TRUNCATE exercise_categories`);
    await AppDataSource.query(`SET foreign_key_checks = 1`);
    await AppDataSource.destroy();
  });

  test("SUCCESS: getRandomExercises without subscription", async () => {
    const result = await exerciseService.getRecommendedExercises(1);
    expect(result.exercises.length).toBe(3);
    result.exercises.map((item) => {
      expect(item.isPremium).toBe(0);
    });
  });

  test("SUCCESS: getRandomExercises with subscription", async () => {
    const result = await exerciseService.getRecommendedExercises(2);
    expect(result.exercises.length).toBe(3);
    result.exercises.map((item) => {
      expect([0, 1]).toContain(item.isPremium);
    });
  });
});
