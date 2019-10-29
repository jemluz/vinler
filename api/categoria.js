const bcrypt = require('bcrypt-nodejs') 

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const salvar = async (req, res) => {
        const categoria = { ...req.body }

        if (req.params.id) categoria.id = req.params.id

        try {
            existsOrError(categoria.nome, 'Nome não inserido.')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (categoria.id) {
            app.db('categorias')
                .update(categoria)
                .where({ id: categoria.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categorias')
                .insert(categoria)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const visualizar = (req, res) => {
        app.db('categorias')
        .select('id', 'nome')
        .then(categorias => res.json(categorias))
        .catch(err => res.status(500).send(err))
    }

    const visualizarPorId = (req, res) => {
        app.db('categorias')
        .select('id', 'nome')
        .where({ id: req.params.id })
        .first()
        .then(categoria => res.json(categoria))
        .catch(err => res.status(500).send(err))
    }

    const excluir = async (req, res) => {
        try {
            const rowsDeleted = await 
            app.db('categorias')
                .where({ id: req.params.id })
                .del()
            
            existsOrError(req.params.id, 'Id do livro não informado.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const visualizarVinculados = (req, res) => {
        app.db('livros')
            .select('id', 'titulo')
            .where({ categoriaId: req.params.id })
            .then(vinculados => res.json(vinculados))
            .catch(err => res.status(500).send(err))
    }

    return { salvar, visualizar, visualizarPorId, excluir, visualizarVinculados }
}