const request = require("supertest");
const { app } = require("../../app");
const { AppDataSource } = require("../../src/models/dataSource")

describe("userSignUp", () => {

beforeAll(async () => {
    await AppDataSource.initialize();
  });
  afterAll(async () => {
    await AppDataSource.query(`DELETE FROM users`);
    await AppDataSource.destroy();
  });

  test("SUCCESS: created user", async () => {
    await request(app)
    .post("/users/")
    .send({email: "agjjj@mail.com", password: "jdjA!12", nickname: "dana", phoneNumber: "1234"})
    .expect(201)
    .expect({ message: "USER_CREATED" })
  });

  test("FAIL: already registered", async () => {
    await request(app)
    .post("/users/")
    .send({email: "agjjj@mail.com", password: "jdjA!12", nickname: "dana", phoneNumber: "1234"})
    .expect({ error: "400 ALREADY_REGISTERED" })
  })
});
 