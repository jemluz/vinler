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

const app = require('express')()
const consign = require('consign') 
const db = require('./config/db')
const multer = require('multer')

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Arquivo Inválido!')
        error.code = "INCORRECT_FILETYPE"
        return cb(error, false)
    }
    cb(null, true)
}

const upload = multer({
    dest: './uploads',
    fileFilter,
    limits: {
        fileSize: 500000
    }
})

app.get('/', function (req, res) {
    res.send('uia');
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

app.use((err, req, res, next) => {
    if(err.code === "INCORRECT_FILETYPE") {
        res.status(422).json({ error: "Apenas imagens são aceitas."})
        return
    }
    if(err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({ error: "Tamanho máximo do arquivo é de 500KB."})
        return
    }
})

app.listen(3000, () => {
    console.log('backend rodando...')
})