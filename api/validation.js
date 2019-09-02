/*
  BACKEND - FUNÇÕES DE VALIDAÇÃO UTILIZADAS PELA API

  existsOrError - verifica se o valor recebido existe, se não existe retorna uma mensagem de erro
    > verifica que o valor está setado
    > verifica se é um array vazio
    > verifica se é uma string vazia

  notExistsOrError - verifica se o valor recebido não existe, se existe retorna uma mensagem de erro
    > testa o existsOrError
    > se passar no teste, retorna a mensagem de erro
    > se não passar no teste, retorna ok

  equalsOrError - verifica se dois valores são iguais, se não forem, retorna uma mensagem de erro
*/

module.exports = app => {
  function existsOrError(value, msg) {
    if(!value) throw msg
    if(Array.isArray(value) && value.length === 0) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
  }
  
  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg)
    } catch(msg) {
      return 
    }
    throw msg
  } 
  
  function equalsOrError(valueA, valueB, msg) {
    if(valueA !== valueB) throw msg
  }

  return { existsOrError, notExistsOrError, equalsOrError }
}

