/*
  BACKEND - CREDENCIAIS DO BANCO DE DADOS
*/

const { db } = require('./.env')

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'vinler',
      user: 'root',
      password: 'admin'
    },
    pool: {
      min: 2,
      max: 7
    },
    migrations: {
      directoru: 'knex_migrations'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'mysql669.umbler.com',
      database: 'vinler',
      user: 'vinler_user',
      password: 'Ea8c6hGb?PY)E'
    },
    pool: {
      min: 2,
      max: 7
    },
    migrations: {
      directoru: 'knex_migrations'
    }
  }
};
