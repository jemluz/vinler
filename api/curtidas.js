module.exports = app => {
  const { existsOrError, notExistsOrError, notEqualsOrError } = app.api.validation

  const salvar = async (req, res) => {
    const curtida = { ...req.body }

    delete curtida.nCurtidas
    
    try {
      const curtidaFromDB = await app.db('curtidas').where({ livroCurtidoId: curtida.livroCurtidoId }).first()
      notExistsOrError(curtidaFromDB, 'Você já curtiu esse livro.')

      existsOrError(curtida.usuarioInteressadoId, 'Você não pode curtir sem fazer login.')
      existsOrError(curtida.livroCurtidoId, 'Não existe um livro com esse id.')
      existsOrError(curtida.proprietarioId, 'Não existe um usuário com esse id.')
      notEqualsOrError(curtida.usuarioInteressadoId, curtida.proprietarioId, 'Você não pode curtir um livro seu.')

    } catch(msg) { return res.status(400).send(msg) }
    

    app.db('curtidas').insert(curtida)
      .then(await setCurtida(curtida, res))
      .then(await isBoth(curtida, res))
      .then(await makeMatch(curtida, res))
      .then(result => res.status(204).send(result))
      .catch(err => res.status(500).send(err))

    console.log(curtida)

  }

  const visualizar = (req, res) => {
    app.db('curtidas')
        .select('id', 'usuarioInteressadoId', 'livroCurtidoId', 'proprietarioId')
        .then(curtida => res.json(curtida))
        .catch(err => res.status(500).send(err))
  }

  const visualizarPorId = (req, res) => {
    app.db('curtidas')
    .select('id', 'usuarioInteressadoId', 'livroCurtidoId', 'proprietarioId')
    .where({ id: req.params.id })
    .first()
    .then(curtida => res.json(curtida))
    .catch(err => res.status(500).send(err))
  }

  const excluir = async (req, res) => {
    try{
      const rowsDeleted = await 
      app.db('curtidas')
        .where({ id: req.params.id })
        .del()
      
      existsOrError(req.params.id, 'Login da curtida não especificado')

      res.status(204).send()
    } catch (msg) {
      res.status(400).send(msg)
    }
  }
  
  const setCurtida = async (c1, n, res) => {
    await app.db('livros')
      .where({ id: c1.livroCurtidoId })
      .update({ nCurtidas: app.db.raw('nCurtidas + 1') })
      .catch(err => res.sendStatus(500).send(err))

  }

  const isBoth = (c1, res) => {

    app.db('curtidas')
      .where({ usuarioInteressadoId: c1.proprietarioId })
      .andWhere({ proprietarioId: c1.usuarioInteressadoId })
      .catch(err => res.status(500).send(err))
  }

  const makeMatch = async (c1, res) => {
    
    const matched = { 
      usuario1: c1.usuarioInteressadoId,
      usuario2: c1.proprietarioId
    }

    try {
      const matchFromDB = await app.db('matches')
        .where({ usuario1: matched.usuario1 })
        .andWhere({ usuario2: matched.usuario2 })
        .first()

      const matchInverseFromDB = await app.db('matches')
        .where({ usuario1: matched.usuario2 })
        .andWhere({ usuario2: matched.usuario1 })
        .first()

      notExistsOrError(matchFromDB, 'Match redundante.') 
      notExistsOrError(matchInverseFromDB, 'Match inverso redundante.') 

    } catch (msg) {
      return res.status(400).send(msg)
    }
    
    app.db('matches')
      .insert(matched)
      .catch(err => res.status(501).send(err))
  }

  const deleteMatch = async (req, res) => {
    try {
      const rowsDeleted = await               
        app.db('matches')
          .where({ id: req.params.id })
          .del()
        
        existsOrError(req.params.id, 'Id do match não informado.')

        res.status(204).send()
    } catch (msg) {
        res.status(400).send(msg)
    }
  }

  return { salvar, visualizar, visualizarPorId, excluir, deleteMatch }
}

