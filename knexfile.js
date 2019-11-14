/*
  BACKEND - CREDENCIAIS DO BANCO DE DADOS
*/

const { db } = require('./.env')

module.exports = {
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
};
