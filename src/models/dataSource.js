const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: process.env.TYPEORM_PORT,
  entities: [__dirname + '/../entity/*.js'],
  synchronize: true,
});

module.exports = { AppDataSource };
