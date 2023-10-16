const { routineStartDao } = require("../models");

const routineStartService = async (id) => {
  try {
    const result = await routineStartDao(id);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  routineStartService,
};
