module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

  const salvar = async (req, res) => {
    const curtida = { ...req.body }

    try {
      existsOrError(curtida.usuarioInteressadoId, 'Você não pode curtir sem fazer login.')
      existsOrError(curtida.livroCurtidoId, 'Não existe um livro com esse id.')
      existsOrError(curtida.proprietarioId, 'Não existe um usuário com esse id.')
    
      const curtidaFromDB = await app.db('curtidas').where({ usuarioInteressadoId: curtida.usuarioInteressadoId }).andWhere({ proprietarioId: curtida.proprietarioId }).first()
      
      notExistsOrError(curtidaFromDB, 'Você já curtiu esse livro.')

    } catch(msg) { return res.status(400).send(msg) }

    app.db('curtidas')
      .insert(curtida)
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err))

    // if(newCurtida) {
    //   const isBoth = await app.db('curtidas').where({ proprietarioId: curtida.usuarioInteressadoId}).andWhere({ usuarioInteressadoId: curtida.proprietarioId })

    //   console.log(isBoth)
    // } 
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
  
  return { salvar, visualizar, visualizarPorId, excluir }
}

