/*
  BACKEND - API de Autenticação

  O arquivo .env não deve ser mapeado pelo repositório, por questões de segurança. Apesar do authSecret ser um código aleátorio, se ele é exposto a aplicação fica sujeita a falhas graves de segurança.

  O token terá um tempo de expiração que irá controlar a duração da sessão do usuário.

  função singin - 
    Um if verifica se todos os campos do formulário de login foram preenchidos.
    
    A variável usuário utiliza da função await para que o servidor express possa buscar o usuário correspondente ao login no banco de dados. Um if verifica se a variável foi resolvida, caso contrario ele retorna um erro 400 (lado do cliente).

    Como os hashs de senhas iguais são diferentes, para fazer o match entre a senha inserida e a presente no sistema criamos uma variável que irá usar a função compareSync do bcrypt para fazer a validação. isMatch então verifica se a senha do fornecida pelo cliente é correspondente à que está presente no banco de dados. 
    
    Se tudo ocorreu bem o resto da função irá gerar o token e junto com ele o tempo de expiração, para isso precisamos saber em que momento o login foi realizado e a partir dele adicionar o tempo de expiração do token:

    A variável now armazena a o momento do login em segundos baseada na função Date.now(). 
    OBS: Date.now() no console javascript retorna a data de hj em milisegungos, contando a partir de 1 de janeiro de 1970, dividimos por mil para converter os milisegundos para segundos.
    A variável payload irá armazenar os dados da sessão. Iat corresponde à "issued at" ou "emitido em". Exp corresponde ao valor da emissão acrescido de 2 dias ( segundos * minutos * horas * dias )

    O usuário então recebe como resposta da sua requisição os dados da sessão e um token de expiração. O JSON Web Token irá usar o payload junto com o authSecret para gerar o token.

    Apos um token ser criado, qualquer nova requisição precisará de um cabeçalho chamado autorization para fazer a validação do token:
    A variável dadosUsuário, se o não houver nada no corpo da requisição assume nulo.

    Um try irá fazer algumas verificações para decodificar o token. 
    Um if verifica se dadosUsuário foi setado, se sim, ele instancia a variavel token resolvendo ela com o metodo decode da biblioteca jwt, a fim de decodificar o token existente no payload da requisição. Um outro if verifica se o token ainda é válido comparando a data de expiração com a data atual. Se sim, a função é resolvida como TRUE. 
    Caso haja algum erro nas validações, um catch irá retorna-lo e a função é resolvida como FALSE.

  função validarToken() - 
    A variael dadosUduario recebe os dados do formulário, caso não haja nada é setado como nulo

    Um try usa um if para verificar se a variavel acima tem algum valor, em caso positivo ele atribui a variavel token a decodificação do token do usuario pelo authSecret encontrado no .env do projeto. 
    Em seguida é verificado se já passou da data de expiração do token para retornar valido ou não.

  função singup() - 

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
      login: usuario.login,
      nome: usuario.nome,
      iat: now,
      exp: now + (60 * 60 * 24 * 3)
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