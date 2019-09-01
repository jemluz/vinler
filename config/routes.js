module.exports = app => {
    app.route('/usuarios')
        .post(app.api.usuario.salvar)
}