/*
    BACKEND - ARQUIVO DE ENTRADA DA APLICAÇÃO

    Para rodar o servidor Expres basta executar o comando 'npm start' da pasta backend.

    express - servidor
    consign - organiza e injeta depêndencias no servidor (express) da aplicação, como um intermediário que irá mapea-las
    db - é o knex já configurado para o banco de dados a ser utilizado
    multer - auxiliar para gerenciamento de uploads

    Atenção: 
    Verifique se não há nenhum outro processo em paralelo a ser rodado na mesma porta, do contrario o beckend n irá startar.
    Se houver, aloque para outra porta que esteja livre.
    Se vc rodar 2x é provavel que dê erro tbm pois já tem uma versão rodando.
*/

const express = require('express')
const app = express()
const consign = require('consign') 
const db = require('./config/db')
const path = require('path')

const favicon = require('express-favicon');
var history = require('connect-history-api-fallback');
const port = process.env.PORT || 3000;

app.db = db
// var port = process.env.PORT || 3000

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

    app.listen(port, () => {
        console.log('backend rodando...')
    })

    
    app.use(history({ 
        verbose: true,
        // logger: console.log.bind(console),
        // disableDotRule: true,
        rewrites: [
            {from: /\./, to: '/'}
        ]
    }));

    app.use(express.static(__dirname + '/dist'));
    app.use(express.static(path.join(__dirname + '/dist', 'build')));

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname + '/dist', 'build', 'index.html'));
    });

    // app.use('/image', express.static(__dirname + '/uploads'));
    app.use("/image", express.static(path.join(__dirname, "uploads")));

