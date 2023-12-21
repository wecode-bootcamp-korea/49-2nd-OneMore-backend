const request = require("supertest");

const { log } = require("console");

const { app } = require("../../app");
const { routineService } = require("../../src/services");
const { routineDao, userDao } = require("../../src/models");
const { AppDataSource } = require("../../src/models/dataSource");
const utils = require("../../src/utils");

describe("TEST routineService", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    log("database initialized for test");
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  test("SUCCESS: routineService create", async () => {
    const userId = 1;
    const body = {
      exercises: [1, 2, 3, 4, 5],
      isCustom: false,
    };
    const userDaoFindByIdSpy = jest.spyOn(userDao, "findById");
    userDaoFindByIdSpy.mockReturnValue({id: 1, subscriptionState: 0});

    const routineDaoCreateRoutineSpy = jest.spyOn(routineDao, "createRoutine");
    routineDaoCreateRoutineSpy.mockReturnValue({ insertId: 3 });

    const getIsIntegersSpy = jest.spyOn(utils, "getIsIntegers");
    const getIsPremiumContentSpy = jest.spyOn(utils, "getIsPremiumContent");

    const result = await routineService.createRoutine(
      userId,
      body
    );
    console.log(result)
    expect(result).toBe(3);
    expect(userDaoFindByIdSpy).toHaveBeenCalled();
    expect(routineDaoCreateRoutineSpy).toHaveBeenCalled();
    expect(getIsIntegersSpy).toHaveBeenCalled();
    expect(getIsPremiumContentSpy).toHaveBeenCalled();
  });

  test("FAILURE: transaction query failed", async () => {
    const userId = 1;
    const subscriptionState = 0;
    const body = {
      exercises: [1, 2, 3, 4, "string"],
      isCustom: false,
    };

    const userDaoFindByIdSpy = jest.spyOn(userDao, "findById");
    userDaoFindByIdSpy.mockReturnValue({id: 1, subscriptionState: 0});

    const routineDaoCreateRoutineSpy = jest.spyOn(routineDao, "createRoutine");
    routineDaoCreateRoutineSpy.mockReturnValue(false);

    const throwErrorSpy = jest.spyOn(utils, "throwError");
    throwErrorSpy.mockReturnValue();

    const getIsIntegersSpy = jest.spyOn(utils, "getIsIntegers");
    const getIsPremiumContentSpy = jest.spyOn(utils, "getIsPremiumContent");

    await routineService.createRoutine(
      userId,
      body,
      subscriptionState
    );

    expect(userDaoFindByIdSpy).toHaveBeenCalled();
    expect(getIsIntegersSpy).toHaveBeenCalled();
    expect(getIsPremiumContentSpy).toHaveBeenCalled();
    expect(routineDaoCreateRoutineSpy).toHaveBeenCalled();
    expect(throwErrorSpy).toHaveBeenCalled();
  });
});
