/*
    BACKEND - MIDDLEWARES 

    bodyParser - interpretador de requisições / usando json
    cors - permite o acesso da api local atráves de outras aplicações externas

    "app" se refere a instancia do express criada no arquivo index.js

    use() é um metodo para aplicar middlewares, esse módulo é responsável por receber uma istancia e injetar os middlewares nela (é um padrão do consign)

    OBS: mesmo que você não tenha interesse de disponibilizar a api para aplicações externas, esse middleware é necessário por já se tratar de um ecossistema composto por 2 aplicações (backend, e frontend)

    A aplicação backend precisa do node para produção. E a aplicação frontend, por gerar arquivos estáticos, só precisa do node em desenvolvimento

*/

const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}