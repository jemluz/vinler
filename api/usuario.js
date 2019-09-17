/*
    BACKEND - API DE PESSOA

    função encryptSenha - 
        salt: 
        Hashs que são geradas a partir da senha.
        Quando chamado em momentos diferentes são geradas hashs diferentes, mesmo que para uma mesma senha.

        retorna a senha criptografada.

    const função = async (requisição, resposta) => {}
    implementação de metodos assincronos

    função salvar - 
        No body da requisição há um json, que é interceptado pelo bodyparse, gerando um objeto pessoa.

        Um if verifica se um id foi passado aos parametros da requisição e o atribui para o id de funcionario, para determinar que se trata de metodo PUT ou POST.

        Em um try as funções de validação são usadas para os dados recebidos através dos formulários. Caso haja algum problema nesse processo, o catch irá retornar 400 como resposta da requisição. 
        O erro 400 é associado a quem está fazendo a requisição (lado do client), no caso o usuário que não inseriu os dados corretamente.

        Se os dados recebidos passaram nos testes de validação do try, agora poderão ser manipulados de acordo com a natureza do método.

        A senha recebida é criptografada e salva como propriedade do objeto pessoa.
        A propriedade confirmarSenha é apagada, como seu uso era apenas para fins de validação, não será inserida no banco de dados.

        É feita uma varredura no banco de dados para atribuir ao objeto pessoaFromDB o primeiro objeto do banco cujo o ID corresponda ao ID do objeto pessoa (proveniente do formulário). 
        A expressão await (que só pode ser usada em funções assincronas) congela a execução da função até que a promisse seja entregue.

        Um if verifica o objeto pessoaFromDb para determinar se a requisição é um PUT ou POST e proceder com a operação correspondente no banco de dados. 
        Caso pessoaFromDB exista: trata-se de um put. A função entao chama o servidor express para realizar um update no banco de dados onde o ID do objeto no banco corresponder ao id do objeto pessoa. Se deu tudo certo ela retorna 204, que é uma confirmação de sucesso sem conteúdo. Caso dê algo errado no update, ele retorna o erro 500, nesse caso provavelmente é algum problema interno no servidor.
        Caso pessoaFromDB não exista: trata-se de um post. A função chama o express para realizar um insert no banco utilizando os dados do objeto pessoa.

    função visualizar - 
        Chama o servidor express e faz um select na tabela de pessoas retornando id nome e login. Se tudo der certo ele retorna o objeto json contendo todos objetos da tabela no banco.

    função visualizarPorId - 
        Mermingual a de visualizar, porem ela usa o id da url para filtrar a o select e retorna apenas um único objeto da tabela no banco.

    função excluir -

*/

const bcrypt = require('bcrypt-nodejs') 

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptSenha = senha => {
        const salt = bcrypt.genSaltSync(5)
        return bcrypt.hashSync(senha, salt)
    }

    const salvar = async (req, res) => {
        // res.send('pessoa salva')
        const pessoa = { ...req.body }

        if (req.params.login) pessoa.login = req.params.login

        try {
            existsOrError(pessoa.nome, 'Nome não inserido.')
            existsOrError(pessoa.login, 'Login não inserido.')
            existsOrError(pessoa.senha, 'Senha não inserida.')
            existsOrError(pessoa.confirmarSenha, 'Confirmação de senha inválida.')
            equalsOrError(pessoa.senha, pessoa.confirmarSenha, 'Senhas não conferem.')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        pessoa.senha = encryptSenha(pessoa.senha)
        delete pessoa.confirmarSenha

        const pessoaFromDB = await app.db('pessoas').where({ login: pessoa.login }).first()

        if (pessoaFromDB) {
            app.db('pessoas')
                .update(pessoa)
                .where({ login: pessoa.login })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('pessoas')
                .insert(pessoa)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const visualizar = (req, res) => {
        app.db('pessoas')
        .select('id', 'login', 'nome', 'senha')
        .then(pessoa => res.json(pessoa))
        .catch(err => res.status(500).send(err))
    }

    const visualizarPorId = (req, res) => {
        app.db('pessoas')
        .select('id', 'login', 'nome', 'senha')
        .where({ login: req.params.login })
        .first()
        .then(pessoa => res.json(pessoa))
        .catch(err => res.status(500).send(err))
    }

    const excluir = async (req, res) => {
        try{
            const rowsDeleted = await 
            app.db('pessoas')
                .where({ login: req.params.login })
                .del()
            
            existsOrError(req.params.login, 'Login do usuário não informado.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { salvar, visualizar, visualizarPorId, excluir }
}