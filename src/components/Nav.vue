<template lang="pug">
  nav.main_nav.row  
    //- div(class="logo")
    //-   <svg-transition :size="{ height: 48, width: 48 }" ref="transition" :trigger="trigger">
    //-     <svg slot="initial"><use href="#bell" /></svg>
    //-     <svg><use href="#bell2" /></svg>
    //-   </svg-transition>

    
    router-link(to="/vitrine" class="nav-link") Livros              
    router-link(to="/dados" class="nav-link") Categorias              
   
    a(class='nav-link' v-if='user') #[font-awesome-icon(alt="Logout" title='Logout' @click.prevent="logout" icon="door-open" )] 
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
      this.$router.push({ name: 'Login' })
    },
    // updateCart(id) {
    //   this.cart.push(id)
    // }
  } 
};
</script>

<style lang="scss">
  nav { 
    display: grid; 
    text-align: center; 

    a { 
      color: grey; 
      &:hover { color: black; }
    }

    @media only screen and (max-width: 900px) {

    }

    @media only screen and (min-width: 901px) {
      align-itens: flex-end;

      .router-link-active { 
        color: white; 
        background-color: #FFB600;
        border-radius: 5px;
      }
    }
  }

  // svg mutate
  .logo { 
    display: flex; 
    flex-direction: column; 
    text-align: center; 
  }

</style>