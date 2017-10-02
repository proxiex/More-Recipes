const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'postgres',
    password: '#101bootcamp',
    database: 'morerecipes',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '',
    database: 'test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'root',
    password: '#101bootcamp',
    database: 'hello_book',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};