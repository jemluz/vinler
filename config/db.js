/*
  BACKEND - COONFIGURAÇÃO DO KNEX

  Instancia o arquivo de configuração 
  Instancia o knex, passando o arquivo de config instanciado anteriormente como parâmetro

*/

const knexfile = require('../knexfile.js')
const knex = require('knex')(config.development)

knex.migrate.latest([config.knexfile])
module.exports = knex 