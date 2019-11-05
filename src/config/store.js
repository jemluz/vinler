import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // variavel para exigencia de token, e usuario logado no momento
    user: null,
    isLoged: false, 

    // variavel para encaminhar um clique na vitrine para uma pagina de livro
    livroId: null,

    // variaveis para botoes mobile do menu
    isMenuVisible: false,
    isCloseMenu: false,   
    isNotifyVisible: false,
    isCloseNotify: false
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
    setLivroId(state, livroId) {
      state.livroId = livroId
    },
    toggleMenu (state, isVisible) {
      // se isVisible ainda não foi definida
      if(isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible
        state.isCloseMenu = !state.isCloseMenu
        // modifica os estados alternadamente
      } else {
        // se já tem um valor atribuido
        state.isMenuVisible = isVisible
        state.isCloseMenu = isVisible
        // alterne para o valor oposto
      }
    },
    toggleMinhaConta (state, isVisible) {
      // se isVisible ainda não foi definida
      if(isVisible === undefined) {
        state.isMinhaContaVisible = !state.isMinhaContaVisible
        state.isCloseMinhaConta = !state.isCloseMinhaConta
        // modifica os estados alternadamente
      } else {
        // se já tem um valor atribuido
        state.isMinhaContaVisible = isVisible
        state.isCloseMinhaConta = isVisible
        // alterne para o valor oposto
      }
    },
    toggleNotify (state, isVisible) {
      // se isVisible ainda não foi definida
      if(isVisible === undefined) {
        state.isNotifyVisible = !state.isNotifyVisible
        state.isCloseNotify = !state.isCloseNotify
        // modifica os estados alternadamente
      } else {
        // se já tem um valor atribuido
        state.isNotifyVisible = isVisible
        state.isCloseNotify = isVisible
        // alterne para o valor oposto
      }
    }
  }
}) 
