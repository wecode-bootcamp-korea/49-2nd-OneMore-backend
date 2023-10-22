const {log} = require("console");

const { throwError } = require("../../src/utils");


describe("TEST throwError", () => {
  test("SUCCESS: 400 KEY_ERROR", () => {
    try {
      throwError(400, "KEY_ERROR");
    } catch (error) {
      expect(error.message).toBe("KEY_ERROR");
      expect(error.status).toBe(400);
    }
  });

  test("SUCCESS: string status code", () => {
    try {
      throwError("string", "KEY_ERROR");
    } catch (error) {
      expect(error.message).toBe("KEY_ERROR");
      expect(error.status).toBe(500);
    }
  });

  test("SUCCESS: string type integer status code", () => {
    try {
      throwError("400", "KEY_ERROR");
    } catch (error) {
      expect(error.message).toBe("KEY_ERROR");
      expect(error.status).toBe(400);
    }
  });
});
