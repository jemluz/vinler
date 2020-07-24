/*
  BACKEND - COONFIGURAÇÃO DO KNEX

  Instancia o arquivo de configuração 
  Instancia o knex, passando o arquivo de config instanciado anteriormente como parâmetro

*/

const knexfile = require('../knexfile.js')
// const knex = require('knex')(config.development)
const knex = require('knex')(knexfile.production)

knex.migrate.latest([knexfile.knexfile])
module.exports = knex 