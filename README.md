## BACKEND / api

# [auth.js](https://github.com/jemluz/vinler/blob/master/api/auth.js)

#### O arquivo .env não deve ser mapeado pelo repositório, por questões de segurança. Apesar do authSecret ser um código aleatório, se ele é exposto a aplicação fica sujeita a falhas graves de segurança.

#### O token terá um tempo de expiração que irá controlar a duração da sessão do usuário.

## ``` const signin = async (req, res) => { } ```

> Um if verifica se todos os campos do formulário de login foram preenchidos.

> A variável usuário utiliza da função await para que o servidor express possa buscar o usuário correspondente ao login no banco de dados. Um if verifica se a variável foi resolvida, caso contrario ele retorna um erro 400 (lado do cliente).

> Como os hashs de senhas iguais são diferentes, para fazer o match entre a senha inserida e a presente no sistema criamos uma variável que irá usar a função compareSync do bcrypt para fazer a validação. isMatch então verifica se a senha do fornecida pelo cliente é correspondente à que está presente no banco de dados. 

> Se tudo ocorreu bem o resto da função irá gerar o token e junto com ele o tempo de expiração, para isso precisamos saber em que momento o login foi realizado e a partir dele adicionar o tempo de expiração do token:

> A variável now armazena a o momento do login em segundos baseada na função Date.now(). 
OBS: Date.now() no console javascript retorna a data de hoje em milissegundos, contando a partir de 1 de janeiro de 1970, dividimos por mil para converter os milissegundos para segundos.
A variável payload irá armazenar os dados da sessão. Iat corresponde à "issued at" ou "emitido em". Exp corresponde ao valor da emissão acrescido de 2 dias ( segundos * minutos * horas * dias )

> O usuário então recebe como resposta da sua requisição os dados da sessão e um token de expiração. O JSON Web Token irá usar o payload junto com o authSecret para gerar o token.

> Apos um token ser criado, qualquer nova requisição precisará de um cabeçalho chamado autorization para fazer a validação do token:
A variável dadosUsuário, se o não houver nada no corpo da requisição assume nulo.

> Um try irá fazer algumas verificações para decodificar o token. 
Um if verifica se dadosUsuário foi setado, se sim, ele instancia a variável token resolvendo ela com o método decode() da biblioteca jwt, a fim de decodificar o token existente no payload da requisição. Um outro if verifica se o token ainda é válido comparando a data de expiração com a data atual. Se sim, a função é resolvida como TRUE. 
Caso haja algum erro nas validações, um catch irá retorna-lo e a função é resolvida como FALSE.


## ``` const validarToken = async (req, res) => { } ```

> A variável dadosUsuario recebe os dados do formulário, caso não haja nada é setado como nulo.

> Um try usa um if para verificar se a variável acima tem algum valor, em caso positivo ele atribui a variável token a decodificação do token do usuário pelo authSecret encontrado no .env do projeto. 
Em seguida é verificado se já passou da data de expiração do token para retornar valido ou não.

# [validation.js](https://github.com/jemluz/vinler/blob/master/api/validation.js)

## ``` const existsOrError = (value, msg) => { } ```

> Verifica se o valor recebido existe, se não existe retorna uma mensagem de erro
> verifica que o valor está setado, se é um array vazio e se é uma string vazia

## ``` const notEexistsOrError = (value, msg) => { } ```

> Verifica se o valor recebido não existe, se existe retorna uma mensagem de erro

> testa o existsOrError, se passar no teste, retorna a mensagem de erro. Se não passar no teste, retorna ok.

## ```const equalsOrError= (valueA, valueB, msg) => { } ```

> Verifica se dois valores são iguais, se não forem, retorna uma mensagem de erro


# [categoria.js](https://github.com/jemluz/vinler/blob/master/api/categoria.js) / [usuario.js](https://github.com/jemluz/vinler/blob/master/api/usuario.js) / [livro.js](https://github.com/jemluz/vinler/blob/master/api/livro.js)

APIs de Dados

### salvar( )

```javascript
const salvar = async (req, res) => { }
```
> No body da requisição há um json, que é interceptado pelo bodyparse, gerando um objeto referente ao seu modelo de dados.

> Um if verifica se um id foi passado aos parâmetros da requisição e o atribui para o id do objeto, para ser usado futuramente para determinar qual o tipo de requisição.

> Em um try as funções de validação são usadas para os dados recebidos através dos formulários. Caso haja algum problema nesse processo, o catch irá retornar 400 como resposta da requisição. O erro 400 é associado a quem está fazendo a requisição (client side), no caso o usuário que não inseriu os dados corretamente.

> Se os dados recebidos passaram nos testes de validação do try, agora poderão ser manipulados de acordo com a natureza do método (POST ou PUT).

> No caso de haver processo de criptografia, a senha recebida é criptografada e salva como propriedade do objeto.
A propriedade confirmarSenha é apagada, como seu uso era apenas para fins de validação, não será inserida no banco de dados.

> É feita uma varredura no banco de dados para atribuir ao objeto objetoFromDB o primeiro objeto do banco cujo o ID corresponda ao ID do objeto (proveniente do formulário). A expressão await (que só pode ser usada em funções assíncronas) congela a execução da função até que a promisse seja entregue.

> Um if verifica o objeto objetoFromDb para determinar se a requisição é um PUT ou POST e proceder com a operação correspondente no banco de dados. 
Caso objetoFromDb exista: trata-se de um PUT. A função então chama o servidor express para realizar um update no banco de dados onde o ID do objeto no banco corresponder ao id do objeto fornecido no corpo da requisição. Se deu tudo certo ela retorna 204, que é uma confirmação de sucesso sem conteúdo. Caso dê algo errado no update, ele retorna o erro 500, nesse caso provavelmente é algum problema interno no servidor.
Caso objetoFromDb não exista: trata-se de um POST. A função chama o express para realizar um insert no banco utilizando os dados do objeto.

### visualizar( )

```javascript
const visualizar = (req, res) => { }
```
> Chama o servidor express e faz um select na tabela correspondente ao objeto em questão retornando seus dados. Se tudo der certo ele retorna o objeto json contendo todos objetos da tabela existentes no banco. Caso dê algo errado no select, ele retorna o erro 500, nesse caso provavelmente é algum problema interno no servidor.

### visualizarPorId( )

```javascript
const visualizarPorId = (req, res) => { }
```
> Mermingual a de visualizar, porem ela usa o id da url para filtrar a o select e retorna apenas um único objeto da tabela no banco.


### excluir( )

```javascript
const excluir = async (req, res) => { }
```



### signup( )

```javascript
const signup = async (req, res) => { }
```
