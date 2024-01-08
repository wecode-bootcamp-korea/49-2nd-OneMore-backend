const { AppDataSource } = require("../../src/models/dataSource");
const { app } = require("../../app");
const request = require("supertest");
const jwt = require("jsonwebtoken");

describe("getExerciseByRoutineId", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.query(`SET foreign_key_checks = 0`);
    await AppDataSource.query(`TRUNCATE TABLE routine_exercises`);
    await AppDataSource.query(`TRUNCATE TABLE exercise_categories`);
    await AppDataSource.query(`TRUNCATE TABLE routines`);
    await AppDataSource.query(`TRUNCATE TABLE exercises`);
    await AppDataSource.query(`TRUNCATE TABLE users`);
    await AppDataSource.query(`SET foreign_key_checks = 1`);
    await AppDataSource.query(`
        INSERT INTO users
          (id, nickname, email, subscriptionState)
        VALUES
          (1, "Park-KJ", "rudwos6@naver.com", 1),
          (2, "Hong-JS", "jisu@naver.com", 1),
          (3, "Sim-AY", "AY@gmail.com", 0)
        `);
    await AppDataSource.query(`
    INSERT INTO routines
      (id, userId, isCustom, name, createdAt)
    VALUES
      (1, 1, 1, "my", "2023-10-23 01:00:00"),
      (2, 2, 0, "routine", "2023-10-24 01:00:00"),
      (3, 3, 1, "three", "2023-10-25 01:00:00")
    `);

    await AppDataSource.query(`
    INSERT INTO exercise_categories
      (id, name)
    VALUES
      (1, "전신"),
      (2, "상체"),
      (3, "하체"),
      (4, "유산소")
    `);

    await AppDataSource.query(`
    INSERT INTO exercises
      (id, name, videoUrl, thumbnailUrl, caloriesUsed, description, isPremium, exerciseCategoryId, durationInSecondsPerSet, countsPerSet, setCounts)
    VALUES
      (1, '레그 레이즈','https://www.youtube.com/embed/tObWHCnLkKg','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-ios-16-glyph/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-90.png',100,'당신도 복근 슈퍼스타',0,3,352,15,3),
      (2, '스쿼트','https://www.youtube.com/embed/q6hBSSfokzY','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-squats-ios-16-filled/icons8-squats-100.png',150,'Shut Up And Squat!!!!',0,3,700,20,3),
      (3, '바이시클 크런치','https://www.youtube.com/embed/-0sqJcNO098','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png',256,'하복부에 특히 좋아요',1,2,111,15,3),
      (4, '푸시 업','https://www.youtube.com/embed/-_DUjHxgmWk','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pushups-ios-16-glyph/icons8-pushups-90.png',175,'실은 만능운동',0,2,257,17,6),
      (5, '달리기','https://www.youtube.com/embed/9CPrrmusOuQ','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-running-ios-16-filled/icons8-running-100.png',300,'봄, 가을에 하기 좋아요',0,4,840,1,1),
      (6, '플랭크','https://www.youtube.com/embed/v54Jtmi2BwU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-plank-ios-16-filled/icons8-plank-100.png',56,'시간이 안가요',1,1,268,1,1),
      (7, '백 인스텐션','https://www.youtube.com/embed/WhZ1Qzfp9So','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%83%E1%85%B1%E1%84%85%E1%85%A9-51.png',33,'허리근육 예술',1,2,60,1,3),
      (8, '자전거 타기','https://www.youtube.com/embed/weOd8r9JHdU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-cycling-ios-16-filled/icons8-cycling-100.png',1300,'살 빼는데 특효(허벅지 만들기도 특효)',0,4,1320,1,1),
      (9, '리버스 런지','https://www.youtube.com/embed/HiryqMG-qlU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-stretching-ios-16-filled/icons8-stretching-100.png',212,'힘든 값 합니다',1,1,56,12,3),
      (10, '버피','https://www.youtube.com/embed/Uly8jUuscOw','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-jumping-ios-16-glyph/icons8-jumping-90.png',15000,'죽어봐라',1,1,714,100,1)
    `);

    await AppDataSource.query(`
    INSERT INTO routine_exercises
      (id, routineId, exerciseId, completed)
    VALUES
      (1,1,1,1),
      (2,2,3,1),
      (3,1,2,0),
      (4,1,3,1),
      (5,3,5,1),
      (6,2,8,1)
    `);
  });

  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0`);
    await AppDataSource.query(`TRUNCATE TABLE routine_exercises`);
    await AppDataSource.query(`TRUNCATE TABLE exercise_categories`);
    await AppDataSource.query(`TRUNCATE TABLE exercises`);
    await AppDataSource.query(`TRUNCATE TABLE routines`);
    await AppDataSource.query(`TRUNCATE TABLE users`);
    await AppDataSource.query(`SET foreign_key_checks = 1`);
    await AppDataSource.destroy();
  });

  const token = jwt.sign({ userId: "1" }, process.env.JWT_SECRET_KEY);

  test("SUCCESS: get my routines", async () => {
    await request(app)
      .get("/routines/my")
      .send()
      .set("Authorization", token)
      .expect({
        message: "MY_ROUTINES_SUCCESS",
        data: [
          {
            routineId: 1,
            routineName: "my",
            exerciseNames: ["레그 레이즈", "스쿼트", "바이시클 크런치"],
            setCounts: [3, 3, 3],
            totalDuration: "58:09",
            createDate: "2023-10-23",
          },
        ],
      });
  });
});
