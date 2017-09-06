module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: 'dev.db'
    }
  },

  test: {
      client: 'sqlite3',
      connection: {
          filename: 'test.db'
      }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'dbname',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'dbname',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
