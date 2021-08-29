require("dotenv").config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "angular_tasks",
    host: DB_HOST,
    port: 5431,
    dialect: "postgres"
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "angular_tasks",
    host: DB_HOST,
    port: 5431,
    dialect: "postgres"
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "angular_tasks",
    host: DB_HOST,
    port: 5431,
    dialect: "postgres"
  }
};
