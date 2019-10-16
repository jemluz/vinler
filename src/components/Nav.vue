<template lang="pug">
  nav(class="site-navbar js-sticky-header site-navbar-target" role="banner")
    div(class="header_container")
      div(class="container")
        div(class="header_content d-flex flex-row align-items-center justify-content-start")
      
          div(class="logo")
            router-link(to="/vitrine") Vinler  
            bookshelfIcon(width='50px' height='20px')
            //- <svg-transition :size="{ height: 48, width: 48 }" ref="transition" :trigger="trigger">
            //-   <svg slot="initial"><use href="#bell" /></svg>
            //-   <svg><use href="#bell2" /></svg>
            //- </svg-transition>

          nav(class="main_nav" role="navigation")
            ul
              li(class="hassubs active")
                router-link(to="/vitrine" class="nav-link") Vitrine 
              li(class="hassubs active")
                router-link(to="/dados" class="nav-link") Amostra de dados

            ul  
              li(class="hassubs")                
                router-link(to="/auth" class="nav-link" alt="Login")  Login
              li(class="hassubs")                
                //- router-link(to="/vitrine" class="nav-link" alt="Logout" @click="logOut")  Logout
              li(class="hassubs")                
                router-link(to="/notificacoes" class="nav-link")  Notificações
              li(class="hassubs")              
                router-link(to="/minha-conta" class="nav-link")  Minha conta
                //- ul
                //-   li
                //-     router-link(to="categories.html") a


</template>

<script>
import { mapState } from "vuex";
import { userKey } from '@/global'

import bookshelfIcon from '../assets/bookshelfIcon'

export default {
  name: "Menu",
  computed: mapState(["isMenuVisible"]),
  components: { bookshelfIcon },
  data() {
    return {
      size: { width: 48, height: 48 },
      generic: 'Login / Cadastro ',
      welcome: 'Olá, ',
      user: {}
    };
  },
  methods: {
    // toggleLineHome(e) {
    //   this.isHome = !this.isHome
    //   console.log('isHome = ' + this.isHome)
    //   console.log('isQuem = ' + this.isQuem)
    //   console.log(e);
    // },
    logOut(){
      localStorage.removeItem(userKey)
    },
    // updateCart(id) {
    //   this.cart.push(id)
    // }
  },
  // computed: {
  //   updateCart() {
  //     return localStorage.getItem('carrinho').length
  //   }
  // }
};
</script>

<style lang="scss">
.logo { display: flex; flex-direction: column; text-align: center; }
.main_nav { display: flex; flex-direction: row; text-align: center; justify-content: space-between; width: 90vw;
  ul { display: flex; flex-direction: row;}
}
</style>