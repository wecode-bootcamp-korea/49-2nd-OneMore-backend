const request = require("supertest");
const { app } = require("../../app");
const { AppDataSource } = require("../../src/models/dataSource");

describe("userSignUp", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.query(
      `INSERT INTO users (
        email,
        password,
        nickname,
        phone_number
        ) VALUES (
        "abcd@mail.com",
        "jdjA!12",
        "dana",
        "1234")`
    );
  });
  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`SET foreign_key_checks = 1`);
    await AppDataSource.destroy();
  });

  test("SUCCESS: created user", async () => {
    await request(app)
      .post("/users/")
      .send({
        email: "agjjj@mail.com",
        password: "jdjA!12",
        nickname: "dana",
        phoneNumber: "1234",
      })
      .expect(201)
      .expect({ message: "USER_CREATED" });
  });

  test("FAIL: key error", async () => {
    await request(app)
      .post("/users/")
      .send({ password: "jdjA!12", nickname: "dana", phoneNumber: "1234" })
      .expect(400)
      .expect({ error: "400 KEY_ERROR" });
  });

  test("FAIL: already registered", async () => {
    await request(app)
      .post("/users/")
      .send({
        email: "abcd@mail.com",
        password: "jdjA!12",
        nickname: "dana",
        phoneNumber: "1234",
      })
      .expect(400)
      .expect({ error: "400 ALREADY_REGISTERED" });
  });

  test("FAIL: invalid email", async () => {
    await request(app)
      .post("/users/")
      .send({
        email: "agjjjmail.com",
        password: "jdjA!12",
        nickname: "dana",
        phoneNumber: "1234",
      })
      .expect(400)
      .expect({ error: "400 EMAIL_INVALID" });
  });

  test("FAIL: invalid password", async () => {
    await request(app)
      .post("/users/")
      .send({
        email: "agjjj@mail.com",
        password: "jdjA!",
        nickname: "dana",
        phoneNumber: "1234",
      })
      .expect(400)
      .expect({ error: "400 PASSWORD_INVALID" });
  });
});
