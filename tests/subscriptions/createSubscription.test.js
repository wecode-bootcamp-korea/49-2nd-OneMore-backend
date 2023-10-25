const request = require("supertest");
const { app } = require("../../app");
const { AppDataSource } = require("../../src/models/dataSource");
const jwt = require("jsonwebtoken");

describe("TEST: createSubscription", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();

    await AppDataSource.query(`
      INSERT INTO users
        (email, nickname, subscription_state)
      VALUES
        ('test1', 'test1@email.com', 0),
        ('test2', 'test2@email.com', 0)
    `);
    await AppDataSource.query(`
      INSERT INTO subscription_orders
      (user_id, amount, provider, status)
      VALUES
      (?, ?, ?, ?)
    `, [1, 3900, "신용카드", 1]);
  });

  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE subscription_orders`); // 추가: subscription_orders 테이블도 비우기
    await AppDataSource.query(`SET foreign_key_checks = 1`);
    await AppDataSource.destroy();
  });

  test("SUCCESS: PAYMENT_AND_SUBSCRIPTION", async () => {
    const token = jwt.sign({
      userId: 2,
    }, process.env.JWT_SECRET_KEY);
    await request(app)
      .post("/subscription_orders")
      .send({
        userId: 2,
        amount: 3900,
        provider: "신용카드",
        // status: 1
      })
      .set("Authorization", token)
      .expect(201)
      .expect({
        message: 'SUCCESS_SUBSCRIPTION_AND_PAYMENT',
        createdSubscription: {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: 'Rows matched: 1  Changed: 1  Warnings: 0',
          serverStatus: 3,
          warningStatus: 0,
          changedRows: 1
        }
      });
  });

  test("FAIL: KEY_ERROR_UID", async () => {
    const token = jwt.sign({
      userId: 2,
    }, process.env.JWT_SECRET_KEY);
    const response = await request(app)
      .post("/subscription_orders")
      .send({
        amount: 3900,
        provider: "신용카드",
      })
      .set("Authorization", token)
      .expect(400)
      .expect({"error": "400 KEY_ERROR_UID"})
  });
});






