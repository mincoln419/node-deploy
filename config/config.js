require('dotenv').config();

module.exports =
{
  "development": {
    "username": "scott",
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": "nodebirds",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "scott",
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "scott",
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": "nodebirds",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
