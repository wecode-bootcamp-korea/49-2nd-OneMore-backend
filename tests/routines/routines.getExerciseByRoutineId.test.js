const request = require("supertest");
const { app } = require("../../app");
const { AppDataSource } = require("../../src/models/dataSource");

describe("getExerciseByRoutineId", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  test("SUCCESS: get exercise by routine id", async () => {
    await request(app)
      .get("/routines/3")
      .expect(200)
      .expect({
        message: "Routine Success",
        data: [
          {
            routineId: 3,
            totalDuration: "840",
            totalCaloriesUsed: "300",
            completedExerciseIds: [5],
            exercises: [
              {
                id: 5,
                name: "Running",
                videoURL: "https://www.youtube.com/watch?v=9CPrrmusOuQ",
                createdAt: "2023-10-17 22:19:07.000000",
                isPremium: 0,
                setCounts: 1,
                description: "달리기",
                caloriesUsed: 300,
                countsPerSet: 1,
                thumbnailURL:
                  "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTVfMTAz%2FMDAxNjc2NDMwNzE1OTQz.AONqot_moGXaoMZteCiTr4Q2QQZ5HpPBY-0ks3R5_lEg.-qzTc7WykgA6xoL5bpKcY3gPGiDuDHHjJGxoXThPSAQg.JPEG.swchoi624%2FIMG_8741.jpg&type=sc960_832",
                exerciseCategory: 4,
                durationInSecondsPerSet: 840,
              },
            ],
          },
        ],
      });

    // test("FAILED: equal completed exercise in routine", async () => {
    //   // 1. 동일운동 포함, 2. 불러오기 실패(옳지 않은 id를 받았을 때)
    //   await request(app)
    // .get("/routine")
    // .send();
  });
});
