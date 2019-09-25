/*
    BACKEND - ROTAS com REST

    modelo:
    app.route(endereço).metodoDeRequisição(funçãoUtilizada)

    respostas:
    1XX – Informações Gerais
    2XX – Sucesso
    3XX – Redirecionamento
    4XX – Erro no cliente
    5XX – Erro no servidor
    
    .all() é um filtro que chama o metodo autenticate do arquivo passport para validar a sessão e a partir disso permitir ou negar o acesso aos serviços/rotas especificas da aplicação.

    .post() vai associar qual metodo será chamado quando ele receber uma requisição nessa rota usando post. Assim também é com .get(), .put() e .delete()

    o método .save serve tanto para inserir/POST quanto para alterar/PUT um usuário, por isso a diferença entre o POST e o PUT está no parâmetro fornecido na url (no caso o :id ou a ausencia dele), é assim que o método descobre qual tipo de requisição está sendo feita.

    O consign (instanciado lá no index.js) usa o caminho app.api.cliente.save para chamar a instancia, acessar a api, entrar no arquivo cliente e pegar a função save retornada pelo modulo. Um exemplo da mesma configuração, sem usar o consign:

        const cliente = require('../api.cliente')
        module.exports = app => {app.route('/clientes').post(cliente.save)}
        
*/

module.exports = app => {
    // publicas ocultas, disponiveis para qualquer usuário, mas não inclusas nas rotas do frontend
    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.usuario.salvar)
    app.post('/validateToken', app.api.auth.validarToken)
    app.get('/livros', app.api.livro.visualizar)
    app.get('/livros/:id', app.api.livro.visualizarPorId)

    // protegidas
    app.route('/usuarios')
        // .all(app.config.passport.authenticate())
        .post(app.api.usuario.salvar)
        .get(app.api.usuario.visualizar)

    app.route('/usuarios/:login')
        // .all(app.config.passport.authenticate())
        .put(app.api.usuario.salvar)
        .get(app.api.usuario.visualizarPorId)
        .delete(app.api.usuario.excluir)
    
    app.route('/livros')
        // .all(app.config.passport.authenticate())
        .post(app.api.livro.salvar)

    app.route('/livros/:id')
        // .all(app.config.passport.authenticate())
        .delete(app.api.livro.excluir)

}