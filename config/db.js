/*
  BACKEND - COONFIGURAÇÃO DO KNEX

  Instancia o arquivo de configuração 
  Instancia o knex, passando o arquivo de config instanciado anteriormente como parâmetro

*/

const config = require('../knexfile.js')
const knex = require('knex')(config)

module.exports = knex 