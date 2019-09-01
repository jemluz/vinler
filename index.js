const app = require('express')()
const consign = require('consign') 
const db = require('./config/db')

app.db = db

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.get('/', function (req, res) {
    res.send('uia');
});

app.listen(3000, () => {
    console.log('backend rodando...')
})