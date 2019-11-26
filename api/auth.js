/*
  BACKEND - API de Autenticação
*/

const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
  const signin = async (req, res) => {
    if(!req.body.login || !req.body.senha) {
      return res.status(400).send('Informe o login e senha.')
    }

    const usuario = await 
      app.db('usuarios')
        .where({ login: req.body.login })
        .first()

    if(!usuario) return res.status(400).send('Usuário não encontrado.')

    const isMatch = bcrypt.compareSync(req.body.senha, usuario.senha)
    if(!isMatch) return res.status(401).send('Login ou senha Inválidos.')

    const now = Math.floor(Date.now() / 1000)
    const payload = {
      id: usuario.id,
      email: usuario.email,
      login: usuario.login,
      nome: usuario.nome,
      local: usuario.local,
      celular: usuario.celular,
      fotoUrl: usuario.fotoUrl,
      iat: now,
      exp: now + (60 * 60 * 24 * 30)
    }

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret)
    })
  }

  const validarToken = async (req, res) => {
    const dadosUsuario = req.body || null

    try {
      if(dadosUsuario) {
        const token = jwt.decode(dadosUsuario.token, authSecret)

        if(new Date(token.exp * 1000) > new Date()) return res.send(true)
      }
    } catch(e) { res.send(e) }
    
    res.send(false)
  }

  return { signin, validarToken }
}