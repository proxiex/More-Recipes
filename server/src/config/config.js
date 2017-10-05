module.exports ={
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
    use_env_variable: 'DATABASE_URL'
  }
};
