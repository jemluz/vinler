/*
    BACKEND - ROTAS

    app.route(endereço)
        .metodoDeRequisição(funçãoUtilizada)
        
*/

module.exports = app => {
    app.route('/usuarios')
        .post(app.api.usuario.salvar)
}