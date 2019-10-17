import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    produtoId: null,
    isLoged: false, 
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      if(user) {
        axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
        this.isLoged = true
      } else {
        delete axios.defaults.headers.common['Authorization'] 
        this.isLoged = false
      }
    },
    setProdutoId(state, produtoId) {
      state.produtoId = produtoId
    }
  }
}) 
