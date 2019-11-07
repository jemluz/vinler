/*
    BACKEND - API DE PESSOA
*/

const bcrypt = require('bcrypt-nodejs') 

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptSenha = senha => {
        const salt = bcrypt.genSaltSync(5)
        return bcrypt.hashSync(senha, salt)
    }

    const salvar = async (req, res) => {
        const usuario = { ...req.body }

        if (req.params.id) usuario.id = req.params.id

        try {
            existsOrError(usuario.nome, 'Nome não inserido.')
            existsOrError(usuario.email, 'E-mail não inserido.')
            existsOrError(usuario.login, 'Login não inserido.')
            existsOrError(usuario.senha, 'Senha não inserida.')
            existsOrError(usuario.confirmarSenha, 'Confirme a senha.')
            equalsOrError(usuario.senha, usuario.confirmarSenha, 'Senhas não conferem.')

            const usuarioFromDB = await app.db('usuarios').where({ email: usuario.email }).first()
            if(!usuario.id) { notExistsOrError(usuarioFromDB, 'Usuário já cadastrado com esse e-mail.') }

        } catch (msg) {
            return res.status(400).send(msg)
        }

        usuario.senha = encryptSenha(usuario.senha)
        delete usuario.confirmarSenha

        if (usuario.id) {
            app.db('usuarios')
                .update(usuario)
                .where({ id: usuario.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('usuarios')
                .insert(usuario)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const visualizar = (req, res) => {
        app.db('usuarios')
        .select('id', 'email', 'login', 'nome', 'senha')
        .then(usuarios => res.json(usuarios))
        .catch(err => res.status(500).send(err))
    }

    const visualizarPorId = (req, res) => {
        app.db('usuarios')
        .select('id', 'email', 'login', 'nome', 'senha')
        .where({ id: req.params.id })
        .first()
        .then(usuario => res.json(usuario))
        .catch(err => res.status(500).send(err))
    }

    const excluir = async (req, res) => {
        try{
            const rowsDeleted = await 
            app.db('usuarios')
                .where({ id: req.params.id })
                .del()
            
            existsOrError(req.params.id, 'Login do usuário não informado.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const visualizarVinculados = (req, res) => {
        app.db('livros')
            .select('id', 'titulo', 'descricao', 'fotoUrl', 'proprietarioId', 'categoriaId')
            .where({ proprietarioId: req.params.id })
            .then(vinculados => res.json(vinculados))
            .catch(err => res.status(500).send(err))
    }

    return { salvar, visualizar, visualizarPorId, excluir, visualizarVinculados }
}