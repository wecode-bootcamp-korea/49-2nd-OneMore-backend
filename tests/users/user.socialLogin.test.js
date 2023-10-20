const request = require("supertest");
const { app } = require("../../app");
const { AppDataSource } = require("../../src/models/dataSource");
const jwt = require("jsonwebtoken");

describe("userLoginBySocial", () => {
    beforeAll(async () => {
      await AppDataSource.initialize();
      await AppDataSource.query(
        `INSERT INTO users (
            email, 
            nickname, 
            social_account_uid, 
            social_account_provider
            ) VALUES (?, ?, ?, ?)`,
            ["charlie@test.com", "찰리", "12345667", 1]
      );
    })
  })
  
  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`SET foreign_key_checks = 1`);
    await AppDataSource.destroy();
  });

  test("SUCCESS: Sociallogin", async () => {
    const token = jwt.sign({ id: "1" });
    await request(app)
      .get("/users/oauth/kakao/")
      .send({
        email: "abcdffff@mail.com",
        password: "jdjA!12",
      })
      .expect(200)
      .expect({ message: "SOCIAL_LOGIN_SUCCESS", token });
  });