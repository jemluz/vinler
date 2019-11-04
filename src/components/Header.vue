<template lang="pug">
  header
    <!-- Botão Menu -->
    a(class="toggle bt-menu" @click="toggleMenu" v-if="!hideToggle")
      div(v-show="isCloseMenu")
        include ../assets/close-menu.svg
      div(v-show="!isCloseMenu")
        include ../assets/botao-menu.svg

    <!-- Logo -->
    a(href='/vitrine' class='logo') Vinler

    Nav

    <!-- Botão Minha Conta -->
    a(href='/minha-conta' class="toggle bt-minha-conta" @click="toggleMinhaConta" v-if="!hideToggle")
      div(v-show="isCloseMinhaConta")
        include ../assets/close-menu.svg
      div(v-show="!isCloseMinhaConta")
        include ../assets/user.svg

    <!-- Botão Notificações -->
    a(class="toggle bt-notify" @click="toggleNotify" v-if="!hideToggle")
      div(v-show="isCloseNotify")
        include ../assets/close-menu.svg
      div(v-show="!isCloseNotify")
        include ../assets/notifications.svg

    <!-- Barra de pesquisa -->
    input(
      id="inline-form-input-name"
      class="barra-pesquisa"
      placeholder="Encontrar livros"
    )

    <!-- Botão pesquisar -->
    button(
      type='button'     
      class="btn btn-primary btn-sm bt-pesquisa" 
      @click=""
      value="buscar"
    ) #[font-awesome-icon(icon="search")] 

</template>

<script>
import { mapState } from 'vuex'
import Nav from "@/components/Nav";

export default {
  name: "Header",
  components: { Nav },
  props: {
    hideToggle: Boolean,
  },
  computed: mapState(['isCloseMenu', 'isCloseMinhaConta', 'isCloseNotify']),
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu")
    },
    toggleMinhaConta() {
      this.$store.commit("toggleMinhaConta")
    },
    toggleNotify() {
      this.$store.commit("toggleNotify")
    }
  }
}
</script>

<style lang='scss'>
  header {
    width: 100vw;
    display: grid !important;
    top: -2px;
    align-items: center;

    @media only screen and (max-width: 900px) {
    
      grid-template-columns: .5fr .5fr 1fr 1fr 1fr .5fr; 
      grid-template-rows: .5fr 1fr .5fr 1fr .5fr; 
      height: 150px;

      nav { display: none !important; }

      .bt-menu {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
      }
      .logo {
        grid-column: 3 / 4;
        grid-row: 2 / 3;
      }

      .bt-minha-conta {
        grid-column: 4 / 5;
        grid-row: 2 / 3;

        justify-self: flex-end;
        align-self: flex-end;
      }

      .bt-notify {
        grid-column: 5 / 6;
        grid-row: 2 / 3;

        justify-self: flex-end;
      }

      .barra-pesquisa {
        grid-column: 2 / 5;
        grid-row: 4 / 5;
        
        border-radius: 5px 0px 0px 5px;
        outline-color: transparent;
        border-style: none;
        background-color: #f5f5f5;
        height: 40px;

        padding: 5px 15px;
      }

      .bt-pesquisa {
        grid-column: 5 / 6;
        grid-row: 4 / 5;

        border-radius: 0px 5px 5px 0px;
        background-color: #00ABC8;
        border: none;
        height: 40px;
      }

    }
    
    @media only screen and (min-width: 901px) {
      grid-template-columns: 15vw 1fr 1fr 1fr 5vw 5vw 5vw 15vw; 
      grid-template-rows: .5fr 1fr .5fr; 

      .bt-menu {  display: none; }

      .logo {
        grid-column: 2 / 3;
        grid-row: 2 / 3;

        justify-self: flex-start;
      }

      nav { 
        grid-column: 3 / 4;
        grid-row: 2 / 3; 
      }

      .barra-pesquisa {
        grid-column: 4 / 5;
        grid-row: 2 / 3;
        
        border-radius: 5px 0px 0px 5px;
        outline-color: transparent;
        border-style: none;
        background-color: #f5f5f5;
        height: 40px; 
        width: 15vw;

        padding: 5px 15px;
        justify-self: flex-end; 
      }

      .bt-pesquisa {
        grid-column: 5 / 6;
        grid-row: 2 / 3;

        border-radius: 0px 5px 5px 0px;
        background-color: #00ABC8;
        border: none;
        height: 40px;
      }

      .bt-minha-conta {
        grid-column: 7 / 8;
        grid-row: 2 / 3;

        justify-self: flex-start;  
        align-self: flex-end;
      }

      .bt-notify {
        grid-column: 7 / 8;
        grid-row: 2 / 3;

        justify-self: flex-end;
        align-self: flex-end;
      }

    }
  }
</style>