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
  { type: 'sucess', icon: 'check'}
) 

Vue.toasted.register(
  'defaultError',
  payload => !payload.msg ? 'Oops.. Erro inesperado!' : payload.msg,
  { type: 'error', icon: 'times'}
) 