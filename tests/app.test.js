const request = require("supertest");

const { app } = require("../app");

describe("health test", () => {
  beforeAll(() => {}); // 테스트 시작 전에 가장 처음 실행 할 코드
  afterAll(() => {}); // 모든 테스트가 끝난 후에 실행 할 코드

  test("success", async () => {
    await request(app).get("/").expect(200);
  });

  test("fail with invalid HTTP method", async () => {
    await request(app).post("/").expect(404);
  });
});
