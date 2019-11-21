<template lang='pug'>
    div.profile
      div.profile-sidebar

        <!-- SIDEBAR USERPIC -->
        div.profile-userpic.row
          img(:src="user.fotoUrl" width='100px' height='100px' alt="")

          <!-- SIDEBAR USER TITLE -->
          div.profile-usertitle.ml-4
            h3.profile-usertitle-name {{ user.nome }}
            h6.profile-usertitle-local {{ user.local }} #[br] {{ user.celular }}
            h6.profile-usertitle-vinculados {{ vinculados.length }} Livros cadastrados
        
      <!-- SIDEBAR BUTTONS -->
      b-tabs(class="mt-3")
        b-tab(title="Novo Livro")
          NovoLivro.mt-5

        b-tab(title="Meus Livros" active)
          MeusLivros

        b-tab(title="Meus Dados")
          MeusDados.mt-4

        b-tab(title="Minhas Curtidas")

        <!-- SIDEBAR MENU -->
</template>

<script>
import { mapState } from 'vuex';
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

import MeusLivros from '@/components/PerfilLivros'
import MeusDados from '@/components/PerfilDados'
import NovoLivro from '@/components/PerfilNovoLivro'

export default {
  name: 'Perfil',
  components: { MeusLivros, MeusDados, NovoLivro },
  computed: mapState(["user"]),
  data: function() {
    return {
      vinculados: [],
      categorias: [],
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
  background-color: #f9f9f9;
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

  .profile-usertitle-name { color: #00ABC8; }
  .profile-usertitle-local { color: #767676; }
  .profile-usertitle-vinculados { color: #3d3d3d; }

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
      padding: 100px 0 50px 0;

      .profile-userpic img {

      }

      .profile-userbuttons {
        margin-top: 40px;
      }
    }

    

  }
}
</style>