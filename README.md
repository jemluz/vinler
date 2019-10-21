## BACKEND / api

## [auth.js](https://github.com/jemluz/vinler/blob/master/api/auth.js)

O arquivo .env não deve ser mapeado pelo repositório, por questões de segurança. Apesar do authSecret ser um código aleátorio, se ele é exposto a aplicação fica sujeita a falhas graves de segurança.

O token terá um tempo de expiração que irá controlar a duração da sessão do usuário.

## signin( )

```javascript
const signin = async (req, res) => { }
```

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


## validarToken( )

```javascript
const validarToken = async (req, res) => { }
```

A variável dadosUsuario recebe os dados do formulário, caso não haja nada é setado como nulo.

Um try usa um if para verificar se a variavel acima tem algum valor, em caso positivo ele atribui a variavel token a decodificação do token do usuario pelo authSecret encontrado no .env do projeto. 
Em seguida é verificado se já passou da data de expiração do token para retornar valido ou não.

## [validation.js](https://github.com/jemluz/vinler/blob/master/api/validation.js)

API de validação, utilizada principalmente pelas APIs de Dados

## existsOrError( )

```javascript
const existsOrError = (value, msg) => { }
```

Verifica se o valor recebido existe, se não existe retorna uma mensagem de erro
> verifica que o valor está setado
> verifica se é um array vazio
> verifica se é uma string vazia

## notExistsOrError( )

```javascript
const notEexistsOrError = (value, msg) => { }
```

Verifica se o valor recebido não existe, se existe retorna uma mensagem de erro
    > testa o existsOrError
    > se passar no teste, retorna a mensagem de erro
    > se não passar no teste, retorna ok

## [categoria.js](https://github.com/jemluz/vinler/blob/master/api/categoria.js) / [usuario.js](https://github.com/jemluz/vinler/blob/master/api/usuario.js) / [livro.js] (https://github.com/jemluz/vinler/blob/master/api/usuario.js)

APIs de Dados

## salvar( )

```javascript
const salvar = async (req, res) => { }
```


## signup( )

```javascript
const signup = async (req, res) => { }
```