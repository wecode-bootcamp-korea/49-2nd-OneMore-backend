const request = require("supertest");
const { app } = require("../../app");
const { AppDataSource } = require("../../src/models/dataSource");

describe("updateCompletedExerciseStatus", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.query(`SET foreign_key_checks = 0`);
    await AppDataSource.query(`TRUNCATE TABLE users`);
    await AppDataSource.query(`SET foreign_key_checks = 1`);
    await AppDataSource.query(`
    INSERT INTO users(id, nickname, email, subscription_state)
    VALUES(1, "Park-KJ", "rudwos6@naver.com", 1),
    (2, "Hong-JS", "jisu@naver.com", 1),
    (3, "Sim-AY", "AY@gmail.com", 0),
    (4, "PMJ", "soccer@yahoo.com", 1),
    (5, "K-SW", "software@samsung.com", 1),
    (6, "PIK", "pick@apple.com", 0),
    (7, "DANA", "DN@naver.com", 1),
    (8, "SHJ", "SHJ@daum.net", 1),
    (9, "LSH", "mentor@wecode.co.kr", 0),
    (10, "wecoder", "omg@naver.com", 1)
    `);

    await AppDataSource.query(`
    INSERT INTO routines(id, user_id, is_custom)
    VALUES(1, 1, 1),
    (2, 2, 0),
    (3, 3, 1),
    (4, 4, 0),
    (5, 5, 1),
    (6, 6, 0),
    (7, 7, 0),
    (8, 8, 1),
    (9, 9, 1),
    (10, 10, 1)
    `);

    await AppDataSource.query(`
    INSERT INTO exercise_categories(id, name)
    VALUES(1, "전신"),
    (2, "상체"),
    (3, "하체"),
    (4, "유산소")
    `);

    await AppDataSource.query(`
    INSERT INTO exercises(id, name, video_url, thumbnail_url, calories_used, description, is_premium, exercise_category, duration_in_seconds_per_set, counts_per_set, set_counts)
    VALUES (1, '레그 레이즈','https://www.youtube.com/watch?v=tObWHCnLkKg','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-ios-16-glyph/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-90.png',100,'당신도 복근 슈퍼스타',0,3,352,15,3),
    (2, '스쿼트','https://www.youtube.com/watch?v=q6hBSSfokzY','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-squats-ios-16-filled/icons8-squats-100.png',150,'Shut Up And Squat!!!!',0,3,700,20,3),
    (3, '바이시클 크런치','https://www.youtube.com/watch?v=-0sqJcNO098','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png',256,'하복부에 특히 좋아요',1,2,111,15,3),
    (4, '푸시 업','https://www.youtube.com/watch?v=-_DUjHxgmWk','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pushups-ios-16-glyph/icons8-pushups-90.png',175,'실은 만능운동',0,2,257,17,6),
    (5, '달리기','https://www.youtube.com/watch?v=9CPrrmusOuQ','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-running-ios-16-filled/icons8-running-100.png',300,'봄, 가을에 하기 좋아요',0,4,840,1,1),
    (6, '플랭크','https://www.youtube.com/watch?v=v54Jtmi2BwU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-plank-ios-16-filled/icons8-plank-100.png',56,'시간이 안가요',1,1,268,1,1),
    (7, '백 인스텐션','https://www.youtube.com/watch?v=WhZ1Qzfp9So','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%83%E1%85%B1%E1%84%85%E1%85%A9-51.png',33,'허리근육 예술',1,2,60,1,3),
    (8, '자전거 타기','https://www.youtube.com/watch?v=weOd8r9JHdU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-cycling-ios-16-filled/icons8-cycling-100.png',1300,'살 빼는데 특효(허벅지 만들기도 특효)',0,4,1320,1,1),
    (9, '리버스 런지','https://www.youtube.com/shorts/HiryqMG-qlU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-stretching-ios-16-filled/icons8-stretching-100.png',212,'힘든 값 합니다',1,1,56,12,3),
    (10, '버피','https://www.youtube.com/watch?v=Uly8jUuscOw','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-jumping-ios-16-glyph/icons8-jumping-90.png',15000,'죽어봐라',1,1,714,100,1)
    `);

    await AppDataSource.query(`
    INSERT INTO routine_exercises(id, routine_id, exercise_id, completed)
    VALUES(1, 1,1,1),
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
    `);
  });

  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE TABLE routine_exercises`);
    await AppDataSource.query(`TRUNCATE TABLE exercises`);
    await AppDataSource.query(`TRUNCATE TABLE exercise_categories`);
    await AppDataSource.query(`TRUNCATE TABLE routines`);
    await AppDataSource.query(`TRUNCATE TABLE users`);
    await AppDataSource.destroy();
  });

  test("SUCCESS: update completed exercise status", async () => {
    await request(app)
      .patch("/routines/6")
      .send({ routineId: 6, exercisesId: [2, 9] })
      .expect(200)
      .expect({ message: "EXERCISE UPDATE SUCCESS" });
  });
});
