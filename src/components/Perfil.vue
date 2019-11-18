<template lang='pug'>
    div.profile
      div.profile-sidebar

        <!-- SIDEBAR USERPIC -->
        div.profile-userpic.row
          img(:src="user.fotoUrl" width='100px' height='100px' alt="")

          <!-- SIDEBAR USER TITLE -->
          div.profile-usertitle
            div.profile-usertitle-name {{ user.nome }}
            div.profile-usertitle-job {{ vinculados.length }} Livros cadastrados
        
        <!-- SIDEBAR BUTTONS -->
        div.profile-userbuttons
          button(type="button" class="btn btn-success btn-sm") Novo Livro 
          button(type="button" class="btn btn-danger btn-sm") Configurações
        
        <!-- SIDEBAR MENU -->
        //- div.profile-usermenu
        //-   ul.nav
        //-     li.active
        //-       a(href="#") #[i(class="glyphicon glyphicon-home")] Meus dados
            
        //-     li
        //-       a(href="#") #[i(class="glyphicon glyphicon-user")] Meus Livros
            
        //-     li
        //-       a(href="#" target="_blank") #[i(class="glyphicon glyphicon-ok")] Matches
              

      div.profile_painel
        
        h3 Meus Livros
        div.profile-content.row

          <!-- Lista de Livros -->
          div(
            class="livro mr-5 "
            v-for='(vinculado, index) in vinculados'
            )
 
            div.livro_foto
              router-link(to='/livro-detalhe')    
                img(:src='vinculado.fotoUrl' width='150px' height='150px' @click='func(index)')

            div.livro_titulo
              div.product_title 
                a(href="/") {{ vinculado.titulo }}

            div(class="categoria" v-for='categoria in categorias')
              a(href="/" v-if='categoria.id === vinculado.categoriaId ')  {{ categoria.nome }}

            

</template>

<script>
import { mapState } from 'vuex';
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
  name: 'Perfil',
  computed: mapState(["user"]),
  data: function() {
    return {
      mainProps: { blank: true, blankColor: 'red', width: 75, height: 75, class: 'm1' },
      vinculados: [],
      categorias: []
    }
  },
  methods: {
    loadVinculados() {
      const url = `${baseApiUrl}/usuarios/vinculados/${this.user.id}`
      axios.get(url).then(resposta => { this.vinculados = resposta.data }).catch(showError)
    },
    loadCategorias() {
      // utiliza uma url pra fazer uma requisição com o axios e carregar um array de clientes
      axios.get(`${baseApiUrl}/categorias`).then(resposta => {
          this.categorias = resposta.data
      })
    },
    func(index) {
      this.$store.commit('setLivroId', this.produtos[index].id)
    }
  },
  mounted() {
    this.loadVinculados()
    this.loadCategorias()
  }
}
</script>

<style lang='scss'>
/* Profile container */
.profile {
  background-color: #f5f5f5;
  margin: 20px 0px;
  justify-content: center;
  display: grid;
  padding: 0px;
  margin: 0px;
  flex-direction: row;

  .profile-userpic img {
    display: flex;  
    -webkit-border-radius: 50% !important;
    -moz-border-radius: 50% !important;
    border-radius: 50% !important;
  }

  @media only screen and (max-width: 900px) {

      grid-template-columns: .5fr 1fr 2fr .5fr;
      grid-template-rows: .5fr .5fr 2fr;

      .profile-sidebar {
        grid-column: 2 / 4;
        grid-row: 1 / 2;

        flex-direction: column;

        .profile-userpic { 
          grid-column: 2 / 3;
          grid-row: 1 / 2;

          
        }

        .profile-usertitle {
          grid-column: 2 / 3;
          grid-row: 1 / 2;

          margin: 0px;
          padding: 0px;

          width: 100px;

          text-align: left;
        }

        .profile-usertitle {
          grid-column: 2 / 3;
          grid-row: 1 / 2;

          margin: 0px;
          padding: 0px;

          width: 100px;

          text-align: left;
        }

      }


      .profile_painel  {
        grid-column: 2 / 4;
        grid-row: 2 / 3;
      }

  }

  @media only screen and (min-width: 901px) {
    
    .profile-sidebar {
      padding: 20px 0 10px 0;

      .profile-userpic img {
      }
    }

    

  }
}
</style>