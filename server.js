const { app } = require("./app");
const { AppDataSource } = require("./src/models/dataSource");

const start = async () => {
  await AppDataSource.initialize();

  app.listen(3000, () => {
    console.log(`server is running`);
  });
};

start();
