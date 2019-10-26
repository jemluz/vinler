/*
    BACKEND - PASSATORTE

  A função estrategia usa os parametros obtidos da requisição como referência e realiza um acesso ao banco de dados que, se bem sucedido, retorna o payload do usuário.
  Caso a aplicação da estratégia não dê certo retorna false.

*/

const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  const estrategia = new Strategy(params, (payload, done) => {
    app.db('usuarios')
      .where({ login: payload.login })
      .first()
      .then(usuario => done(null, usuario ? { ...payload } : false ))
      .catch(err => done(err, false))

  })

  passport.use(estrategia)

  return {
    authenticate: () => passport.authenticate('jwt', { session: false })
  }
}