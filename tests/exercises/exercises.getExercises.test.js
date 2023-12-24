const request = require("supertest");
const bcrypt = require("bcrypt");

const { app } = require("../../app");
const { AppDataSource } = require("../../src/models/dataSource");

jest.mock("../../src/middleware/tokenValidation");

const tokenMiddleware = require("../../src/middleware/tokenValidation");
const middlewareSpy = jest
  .spyOn(tokenMiddleware, "tokenValidation")
  .mockImplementation((req, res, next) => {
    req.userId = 1;
    next();
  });

describe("TEST exercises.getExercises", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.query(`
      INSERT INTO users
        (id, nickname, email, subscriptionState, password)
      VALUES
        (1, "Park-KJ", "rudwos6@naver.com", 1, '${bcrypt.hashSync(
          "password001.",
          10
        )}'),
        (2, "Hong-JS", "jisu@naver.com", 1, '${bcrypt.hashSync(
          "password001.",
          10
        )}'),
        (3, "Sim-AY", "AY@gmail.com", 0, '${bcrypt.hashSync(
          "password001.",
          10
        )}'),
        (4, "PMJ", "soccer@yahoo.com", 1, '${bcrypt.hashSync(
          "password001.",
          10
        )}'),
        (5, "K-SW", "software@samsung.com", 1, '${bcrypt.hashSync(
          "password001.",
          10
        )}'),
        (6, "PIK", "pick@apple.com", 0, '${bcrypt.hashSync(
          "password001.",
          10
        )}'),
        (7, "DANA", "DN@naver.com", 1, '${bcrypt.hashSync(
          "password001.",
          10
        )}'),
        (8, "SHJ", "SHJ@daum.net", 1, '${bcrypt.hashSync("password001.", 10)}'),
        (9, "LSH", "mentor@wecode.co.kr", 0, '${bcrypt.hashSync(
          "password001.",
          10
        )}'),
        (10, "wecoder", "omg@naver.com", 1, '${bcrypt.hashSync(
          "password001.",
          10
        )}')
      ;
    `);

    await AppDataSource.query(`
      INSERT INTO routines
        (id, userId, isCustom, name)
      VALUES
        (1, 1, 1, "루틴1"),
        (2, 2, 0, "루틴2"),
        (3, 3, 1, "루틴3"),
        (4, 4, 0, "루틴4"),
        (5, 5, 1, "루틴5"),
        (6, 6, 0, "루틴6"),
        (7, 7, 0, "루틴7"),
        (8, 8, 1, "루틴8"),
        (9, 9, 1, "루틴9"),
        (10, 10, 1, "루틴10")
      ;
    `);

    await AppDataSource.query(`
      INSERT INTO exercise_categories
        (id, name)
      VALUES
        (1, "전신"),
        (2, "상체"),
        (3, "하체"),
        (4, "유산소")
      ;
    `);

    await AppDataSource.query(`
      INSERT INTO exercises
        (id, name, videoUrl, thumbnailUrl, caloriesUsed, description, isPremium, exerciseCategoryId, durationInSecondsPerSet, countsPerSet, setCounts)
      VALUES 
        (1, 'Leg raise','https://www.youtube.com/watch?v=tObWHCnLkKg','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-ios-16-glyph/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-90.png',100,'레그 레이즈',0,3,352,15,3),
        (2, 'Squat','https://www.youtube.com/watch?v=q6hBSSfokzY','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-squats-ios-16-filled/icons8-squats-100.png',150,'스쿼트',0,3,700,20,3),
        (3, 'Bicycle Crunch', "https://www.youtube.com/watch?v=-0sqJcNO098", 'https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png',256,'바이시클 크런치',1,2,111,15,3),
        (4, 'Push Up', "https://www.youtube.com/watch?v=-_DUjHxgmWk", 'https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pushups-ios-16-glyph/icons8-pushups-90.png',175,'푸시 업',0,2,257,17,6),
        (5, 'Running','https://www.youtube.com/watch?v=9CPrrmusOuQ','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-running-ios-16-filled/icons8-running-100.png',300,'달리기',0,4,840,1,1),
        (6, 'Plank','https://www.youtube.com/watch?v=v54Jtmi2BwU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-plank-ios-16-filled/icons8-plank-100.png',56,'플랭크',1,1,268,1,1),
        (7, 'Back Extension','https://www.youtube.com/watch?v=WhZ1Qzfp9So','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%83%E1%85%B1%E1%84%85%E1%85%A9-51.png',33,'백 인스텐션',1,2,60,1,3),
        (8, 'Cycling','https://www.youtube.com/watch?v=weOd8r9JHdU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-cycling-ios-16-filled/icons8-cycling-100.png',1300,'자전거 타기',0,4,1320,1,1),
        (9, 'Reverse Lunge', "https://www.youtube.com/shorts/HiryqMG-qlU", 'https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-stretching-ios-16-filled/icons8-stretching-100.png',212,'리버스 런지',1,1,56,12,3),
        (10, 'Burpee','https://www.youtube.com/watch?v=Uly8jUuscOw','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-jumping-ios-16-glyph/icons8-jumping-90.png',15000,'버피',1,1,714,100,1)
      ;
    `);

    await AppDataSource.query(`
      INSERT INTO routine_exercises
        (id, routineId, exerciseId, completed)
      VALUES
        (1, 1,1,1),
        (2, 2,3,1),
        (3, 4,5,0),
        (4, 4,4,1),
        (5, 5,7,1),
        (6, 6,9,0),
        (7, 7,2,1),
        (8, 8,6,0),
        (9, 9,10,1),
        (10, 10,8,0),
        (11, 1,2,0),
        (12, 1,3,1),
        (13, 3,5,1),
        (14, 4,8,1),
        (15, 4,7,0),
        (16, 4,9,1),
        (17, 6,2,0),
        (18, 6,4,1),
        (19, 6,6,1),
        (20, 6,10,1),
        (21, 5,1,0),
        (22, 2,8,1),
        (23, 7,6,1),
        (24, 7,7,0),
        (25, 8,2,1),
        (26, 8,7,1),
        (27, 9,5,1),
        (28, 9,1,1),
        (29, 10,2,0),
        (30, 10,6,0),
        (31, 10,3,1)
      ;
    `);
  });

  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE TABLE routine_exercises;`);
    await AppDataSource.query(`TRUNCATE TABLE exercises;`);
    await AppDataSource.query(`TRUNCATE TABLE exercise_categories;`);
    await AppDataSource.query(`TRUNCATE TABLE routines;`);
    await AppDataSource.query(`TRUNCATE TABLE users;`);
    await AppDataSource.query(`SET foreign_key_checks = 1;`);
    await AppDataSource.destroy();
  });

  test("SUCCESS: get exercises", async () => {
    const response = await request(app).get("/exercises");
    expect(response.body).toEqual({
      message: "SUCCESS",
      data: {
        exercises: [
          {
            caloriesUsed: 100,
            category: 3,
            description: "레그 레이즈",
            durationInMinute: 1056,
            durationInSecondsPerSet: 352,
            equipRequired: false,
            exerciseId: 1,
            isPremium: false,
            name: "Leg raise",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-ios-16-glyph/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-90.png",
          },
          {
            caloriesUsed: 150,
            category: 3,
            description: "스쿼트",
            durationInMinute: 2100,
            durationInSecondsPerSet: 700,
            equipRequired: false,
            exerciseId: 2,
            isPremium: false,
            name: "Squat",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-squats-ios-16-filled/icons8-squats-100.png",
          },
          {
            caloriesUsed: 256,
            category: 2,
            description: "바이시클 크런치",
            durationInMinute: 333,
            durationInSecondsPerSet: 111,
            equipRequired: false,
            exerciseId: 3,
            isPremium: true,
            name: "Bicycle Crunch",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png",
          },
          {
            caloriesUsed: 175,
            category: 2,
            description: "푸시 업",
            durationInMinute: 1542,
            durationInSecondsPerSet: 257,
            equipRequired: false,
            exerciseId: 4,
            isPremium: false,
            name: "Push Up",
            setCounts: 6,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pushups-ios-16-glyph/icons8-pushups-90.png",
          },
          {
            caloriesUsed: 300,
            category: 4,
            description: "달리기",
            durationInMinute: 840,
            durationInSecondsPerSet: 840,
            equipRequired: false,
            exerciseId: 5,
            isPremium: false,
            name: "Running",
            setCounts: 1,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-running-ios-16-filled/icons8-running-100.png",
          },
          {
            caloriesUsed: 56,
            category: 1,
            description: "플랭크",
            durationInMinute: 268,
            durationInSecondsPerSet: 268,
            equipRequired: false,
            exerciseId: 6,
            isPremium: true,
            name: "Plank",
            setCounts: 1,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-plank-ios-16-filled/icons8-plank-100.png",
          },
          {
            caloriesUsed: 33,
            category: 2,
            description: "백 인스텐션",
            durationInMinute: 180,
            durationInSecondsPerSet: 60,
            equipRequired: false,
            exerciseId: 7,
            isPremium: true,
            name: "Back Extension",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%83%E1%85%B1%E1%84%85%E1%85%A9-51.png",
          },
          {
            caloriesUsed: 1300,
            category: 4,
            description: "자전거 타기",
            durationInMinute: 1320,
            durationInSecondsPerSet: 1320,
            equipRequired: false,
            exerciseId: 8,
            isPremium: false,
            name: "Cycling",
            setCounts: 1,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-cycling-ios-16-filled/icons8-cycling-100.png",
          },
          {
            caloriesUsed: 212,
            category: 1,
            description: "리버스 런지",
            durationInMinute: 168,
            durationInSecondsPerSet: 56,
            equipRequired: false,
            exerciseId: 9,
            isPremium: true,
            name: "Reverse Lunge",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-stretching-ios-16-filled/icons8-stretching-100.png",
          },
          {
            caloriesUsed: 15000,
            category: 1,
            description: "버피",
            durationInMinute: 714,
            durationInSecondsPerSet: 714,
            equipRequired: false,
            exerciseId: 10,
            isPremium: true,
            name: "Burpee",
            setCounts: 1,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-jumping-ios-16-glyph/icons8-jumping-90.png",
          },
        ],
        selected: [],
      },
    });
  });

  test("SUCCESS: get exercises with category", async () => {
    const response = await request(app).get(`/exercises?category=2`);
    expect(response.body).toEqual({
      message: "SUCCESS",
      data: {
        exercises: [
          {
            caloriesUsed: 256,
            category: 2,
            description: "바이시클 크런치",
            durationInMinute: 333,
            durationInSecondsPerSet: 111,
            equipRequired: false,
            exerciseId: 3,
            isPremium: true,
            name: "Bicycle Crunch",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png",
          },
          {
            caloriesUsed: 175,
            category: 2,
            description: "푸시 업",
            durationInMinute: 1542,
            durationInSecondsPerSet: 257,
            equipRequired: false,
            exerciseId: 4,
            isPremium: false,
            name: "Push Up",
            setCounts: 6,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pushups-ios-16-glyph/icons8-pushups-90.png",
          },
          {
            caloriesUsed: 33,
            category: 2,
            description: "백 인스텐션",
            durationInMinute: 180,
            durationInSecondsPerSet: 60,
            equipRequired: false,
            exerciseId: 7,
            isPremium: true,
            name: "Back Extension",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%83%E1%85%B1%E1%84%85%E1%85%A9-51.png",
          },
        ],
        selected: [],
      },
    });
  });

  test("SUCCESS: get exercises with equip requirement", async () => {
    const response = await request(app).get(`/exercises?equipReqired=true`);
    expect(response.body).toEqual({
      message: "SUCCESS",
      data: {
        exercises: [
          {
            caloriesUsed: 100,
            category: 3,
            description: "레그 레이즈",
            durationInMinute: 1056,
            durationInSecondsPerSet: 352,
            equipRequired: false,
            exerciseId: 1,
            isPremium: false,
            name: "Leg raise",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-ios-16-glyph/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-90.png",
          },
          {
            caloriesUsed: 150,
            category: 3,
            description: "스쿼트",
            durationInMinute: 2100,
            durationInSecondsPerSet: 700,
            equipRequired: false,
            exerciseId: 2,
            isPremium: false,
            name: "Squat",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-squats-ios-16-filled/icons8-squats-100.png",
          },
          {
            caloriesUsed: 256,
            category: 2,
            description: "바이시클 크런치",
            durationInMinute: 333,
            durationInSecondsPerSet: 111,
            equipRequired: false,
            exerciseId: 3,
            isPremium: true,
            name: "Bicycle Crunch",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png",
          },
          {
            caloriesUsed: 175,
            category: 2,
            description: "푸시 업",
            durationInMinute: 1542,
            durationInSecondsPerSet: 257,
            equipRequired: false,
            exerciseId: 4,
            isPremium: false,
            name: "Push Up",
            setCounts: 6,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pushups-ios-16-glyph/icons8-pushups-90.png",
          },
          {
            caloriesUsed: 300,
            category: 4,
            description: "달리기",
            durationInMinute: 840,
            durationInSecondsPerSet: 840,
            equipRequired: false,
            exerciseId: 5,
            isPremium: false,
            name: "Running",
            setCounts: 1,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-running-ios-16-filled/icons8-running-100.png",
          },
          {
            caloriesUsed: 56,
            category: 1,
            description: "플랭크",
            durationInMinute: 268,
            durationInSecondsPerSet: 268,
            equipRequired: false,
            exerciseId: 6,
            isPremium: true,
            name: "Plank",
            setCounts: 1,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-plank-ios-16-filled/icons8-plank-100.png",
          },
          {
            caloriesUsed: 33,
            category: 2,
            description: "백 인스텐션",
            durationInMinute: 180,
            durationInSecondsPerSet: 60,
            equipRequired: false,
            exerciseId: 7,
            isPremium: true,
            name: "Back Extension",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%83%E1%85%B1%E1%84%85%E1%85%A9-51.png",
          },
          {
            caloriesUsed: 1300,
            category: 4,
            description: "자전거 타기",
            durationInMinute: 1320,
            durationInSecondsPerSet: 1320,
            equipRequired: false,
            exerciseId: 8,
            isPremium: false,
            name: "Cycling",
            setCounts: 1,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-cycling-ios-16-filled/icons8-cycling-100.png",
          },
          {
            caloriesUsed: 212,
            category: 1,
            description: "리버스 런지",
            durationInMinute: 168,
            durationInSecondsPerSet: 56,
            equipRequired: false,
            exerciseId: 9,
            isPremium: true,
            name: "Reverse Lunge",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-stretching-ios-16-filled/icons8-stretching-100.png",
          },
          {
            caloriesUsed: 15000,
            category: 1,
            description: "버피",
            durationInMinute: 714,
            durationInSecondsPerSet: 714,
            equipRequired: false,
            exerciseId: 10,
            isPremium: true,
            name: "Burpee",
            setCounts: 1,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-jumping-ios-16-glyph/icons8-jumping-90.png",
          },
        ],
        selected: [],
      },
    });
  });

  test("SUCCESS: get exercises with limit offset", async () => {
    const response = await request(app).get(`/exercises?limit=3&offset=0`);
    expect(response.body).toEqual({
      message: "SUCCESS",
      data: {
        exercises: [
          {
            caloriesUsed: 100,
            category: 3,
            description: "레그 레이즈",
            durationInMinute: 1056,
            durationInSecondsPerSet: 352,
            equipRequired: false,
            exerciseId: 1,
            isPremium: false,
            name: "Leg raise",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-ios-16-glyph/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-90.png",
          },
          {
            caloriesUsed: 150,
            category: 3,
            description: "스쿼트",
            durationInMinute: 2100,
            durationInSecondsPerSet: 700,
            equipRequired: false,
            exerciseId: 2,
            isPremium: false,
            name: "Squat",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-squats-ios-16-filled/icons8-squats-100.png",
          },
          {
            caloriesUsed: 256,
            category: 2,
            description: "바이시클 크런치",
            durationInMinute: 333,
            durationInSecondsPerSet: 111,
            equipRequired: false,
            exerciseId: 3,
            isPremium: true,
            name: "Bicycle Crunch",
            setCounts: 3,
            thumbnailURL:
              "https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png",
          },
        ],
        selected: [],
      },
    });
  });
});
