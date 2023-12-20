const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: process.env.TYPEORM_PORT,
  entities: [__dirname + "/../entity/*.js"],
  synchronize: true, // true 변경시 테이블 자동 생성 : 테이블 전체 삭제 후 true로 테스트 진행 예정
  // logging: ["query"],
});

module.exports = { AppDataSource };
