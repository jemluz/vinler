/*
    BACKEND - API DE USUÁRIO

    encryptSenha - 
    salvar - 
*/

const bcrypt = require('bcrypt-nodejs') 

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptSenha = senha => {
        const salt = bcrypt.genSaltSync(5)
        return bcrypt.hashSync(senha, salt)
    }

    const salvar = (req, res) => {
        res.send('user save')
    }

    return { salvar }
}