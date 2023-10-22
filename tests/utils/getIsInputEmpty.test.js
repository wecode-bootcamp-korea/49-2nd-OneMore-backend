const { getIsInputEmpty } = require("../../src/utils");

describe("TEST getIsInputEmpty", () => {
  test("SUCCESS: all input exists", () => {
    const result = getIsInputEmpty(1, "string", [], {});
    expect(result).toBe(false);
  });

  test("SUCCESS: undefined pushed", () => {
    const result = getIsInputEmpty(1, "string", [], {}, undefined);
    expect(result).toBe(true);
  });
});
