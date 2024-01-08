const request = require("supertest");
const { app } = require("../../app");
const { AppDataSource } = require("../../src/models/dataSource");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken", () => {
  return {
    sign: jest.fn(() => "TOKEN"),
    verify: jest.fn(() => "verify"),
  };
});

describe("userLogin", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    const encryptedPassword = await bcrypt.hash("jdjA!12", 10);
    await AppDataSource.query(
      `INSERT INTO users (
        email,
        password,
        nickname,
        phoneNumber
        ) VALUES (?, ?, ?, ?)`,
      ["abcdffff@mail.com", encryptedPassword, "dana", "1234"]
    );
  });
  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`SET foreign_key_checks = 1`);
    await AppDataSource.destroy();
  });

  test("SUCCESS: login", async () => {
    const token = jwt.sign({ id: "1" });
    await request(app)
      .post("/users/login")
      .send({
        email: "abcdffff@mail.com",
        password: "jdjA!12",
      })
      .expect(200)
      .expect({ message: "LOGIN_SUCCESS", token, nickname: "dana" });
  });

  test("FAIL: key error", async () => {
    await request(app)
      .post("/users/login")
      .send({ email: "abcdffff@mail.com" })
      .expect(400)
      .expect({ error: "400 KEY_ERROR" });
  });

  test("FAIL: not registered", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: "aaaaaa@mail.com",
        password: "jdjA!12",
      })
      .expect(400)
      .expect({ error: "400 NOT_REGISTERED" });
  });

  test("FAIL: wrong password", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: "abcdffff@mail.com",
        password: "jdjgggff!234",
      })
      .expect(400)
      .expect({ error: "400 WRONG_PASSWORD" });
  });
});
