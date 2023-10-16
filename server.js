const { app } = require("./app");
// TODO: 나중에 datasource 파일 만들면 불러오기
const { AppDataSource } = require("./src/models/dataSource")

const start = async () => {
  // TODO :  
  await AppDataSource.initialize();

  app.listen(8000, () => {
    console.log(`server is running`);
  });
};

start();
