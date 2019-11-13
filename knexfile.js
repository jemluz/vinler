/*
  BACKEND - CREDENCIAIS DO BANCO DE DADOS
*/

const { db } = require('./.env')

module.exports = {
  client: 'mysql',
  connection: db,
  pool: {
    min: 2,
    max: 7
  },
  migrations: {
    directoru: 'knex_migrations'
  }
};
