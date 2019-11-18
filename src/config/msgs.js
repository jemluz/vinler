import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  duration: 3000,
  iconPack: 'fontawesome',
  position: "bottom-center", 
  theme: "bubble"
})

Vue.toasted.register(
  'defaultSucess',
  payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
  // msg,
  { type: 'sucess', icon: 'check'}
) 

Vue.toasted.register(
  'defaultError',
  payload => !payload.err ? 'Oops.. Erro inesperado' : payload.err,
  { type: 'error', icon: 'times'}
) 

Vue.toasted.register(
  'bookRegisterSucess',
  'Seu livro foi cadastrado!',
  { type: 'sucess', icon: 'times'}
) 

Vue.toasted.register(
  'likeNotify',
  'Seu livro foi curtido por ',
  { type: 'sucess', icon: 'times'}
) 

Vue.toasted.register(
  'likeNotify',
  'Você deu um match com ',
  { type: 'sucess', icon: 'times'}
) 