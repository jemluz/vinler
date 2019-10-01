<template lang="pug">
  nav(class="site-navbar js-sticky-header site-navbar-target" role="banner")
    div(class="header_container")
      div(class="container")
        div(class="header_content d-flex flex-row align-items-center justify-content-start")
      
          div(class="logo")
            router-link(to="/vitrine") Loljinha;)

          nav(class="main_nav" role="navigation")
            ul
              li(class="hassubs active")
                router-link(to="/vitrine" class="nav-link") Vitrine 
                ul
                  li
                    router-link(to="categories.html") Categories

      div(class="header_social user-dropdown")
        p Login
        router-link(to="/auth" title="Login" class="fa fa-sign-in fa-lg" aria-hidden="true" alt="Login")
        p Logout
        div(@click="logOut")
          router-link(to="/vitrine" title="Logout" class="fa fa-sign-out fa-lg" aria-hidden="true" alt="Logout")


</template>

<script>
import { mapState } from "vuex";
import { userKey } from '@/global'
export default {
  name: "Menu",
  computed: mapState(["isMenuVisible"]),
  data() {
    return {
      generic: 'Login / Cadastro ',
      welcome: 'Olá, ',
      user: {}
    };
  },
  methods: {
    toggleLineHome(e) {
      // this.isHome = !this.isHome
      // console.log('isHome = ' + this.isHome)
      // console.log('isQuem = ' + this.isQuem)
      console.log(e);
    },
    logOut(){
      localStorage.removeItem(userKey)
    },
    updateCart(id) {
      this.cart.push(id)
    }
  },
  computed: {
    updateCart() {
      // return localStorage.getItem('carrinho').length
    }
  }
};
</script>

<style lang="scss">
.user-dropdown { display: flex;  
  // a { margin: 7px 0px 0px 10px;   }
}
.sticky-wrapper .site-navbar .site-menu > li > router-link {
  border-bottom: 4px solid #fff;
  transition: all 1s ease-in;
  &.router-link-exact-active {
    border-bottom: 4px solid #fff;
    position: relative;
  }
}
.site-navbar .site-navigation .site-menu { 
  border-bottom: 3px solid transparent;
  padding: 50px 20px;
  transition: all 1s ease-in;
  .router-link-exact-active {
    border-bottom: 3px solid #7971ea;
    display: inline-block;
    // padding: 5px 20px;
  }
}
.shopping_cart { width: 150px;}
.main_nav, .header_social, .header_extra { margin-top: 10px; }
</style>