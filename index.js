/*
    BACKEND - ARQUIVO DE ENTRADA DA APLICAÇÃO

    express - 
    consign - organiza e injeta depêndencias no servidor (express) da aplicação 
    db - 
*/

const app = require('express')()
const consign = require('consign') 
const db = require('./config/db')

app.db = db

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.get('/', function (req, res) {
    res.send('uia');
});

app.listen(3000, () => {
    console.log('backend rodando...')
})