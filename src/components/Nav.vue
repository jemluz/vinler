<template lang="pug">
  nav(class="site-navbar js-sticky-header site-navbar-target" role="banner")
    div(class="header_container")
      div(class="container")
        div(class="header_content d-flex flex-row align-items-center justify-content-start")
      
          //- div(class="logo")
          //-   <svg-transition :size="{ height: 48, width: 48 }" ref="transition" :trigger="trigger">
          //-     <svg slot="initial"><use href="#bell" /></svg>
          //-     <svg><use href="#bell2" /></svg>
          //-   </svg-transition>

          nav(class="main_nav" role="navigation")
            ul
              li(class="hassubs active")
                router-link(to="/vitrine" class="nav-link") Vitrine 
              li(class="hassubs active")
                router-link(to="/dados" class="nav-link") Amostra de dados

            ul(v-if='!user')
              li(class="hassubs")                
                router-link(to="/auth" class="nav-link" alt="Login" ) #[font-awesome-icon(icon='sign-in-alt')] Login

            ul(v-else :class="{ 'hide-element': !user }")
              li(class="hassubs" )                
                router-link(to="/minha-conta" class="nav-link nav-link-welcome" alt="Login") Bem vindo, {{ user ? (user.nome.charAt(0).toUpperCase() + user.nome.slice(1)) : null }}!
              li(class="hassubs")                
                font-awesome-icon(icon='book-open' class='icon-menu' alt='Notificações' title='Notificações')
              li(class="hassubs")                
                font-awesome-icon(alt="Logout" title='Logout' class='icon-menu' @click.prevent="logout" icon="door-open")
                //- ul
                //-   li
                //-     router-link(to="categories.html") a


</template>

<script>
import { mapState } from 'vuex';
import { userKey } from '@/global'

import bookshelfIcon from '../assets/bookshelfIcon'

export default {
  name: "Nav",
  computed: mapState(["isLoged", "user"]),
  // updateCart() {
    //   return localStorage.getItem('carrinho').length
    // }
  // }
  components: { bookshelfIcon },
  data() {
    return {
      size: { width: 48, height: 48 },
      generic: 'Login / Cadastro ',
      welcome: 'Olá, '
    };
  },
  methods: {
    logout(){
      localStorage.removeItem(userKey)
      this.$store.commit('setUser', null)
      this.$router.push({ name: 'auth' })
    },
    // updateCart(id) {
    //   this.cart.push(id)
    // }
  } 
};
</script>

<style lang="scss">
.logo { display: flex; flex-direction: column; text-align: center; }
.main_nav { display: flex; flex-direction: row; text-align: center; justify-content: space-between; width: 90vw;
  ul { display: flex; flex-direction: row;}
}
.hide-element { display: none; }
.nav-link-welcome { color: black; }

.icon-menu { 
  margin: 12px 8px; color: grey; 
  &:hover { color: red; }
}



</style>