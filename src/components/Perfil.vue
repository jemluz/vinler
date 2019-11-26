<template lang='pug'>
    div.profile
      div.profile-sidebar

        <!-- SIDEBAR USERPIC -->
        div.profile-userpic
          img(:src="user.fotoUrl" width='100px' height='100px' alt="")

          <!-- SIDEBAR USER TITLE -->
          div.profile-usertitle
            h3.profile-usertitle-name {{ user.nome }}
            h6.profile-usertitle-local {{ user.local }} #[br] {{ user.celular | celular }}
            h6.profile-usertitle-vinculados {{ vinculados.length }} Livros cadastrados

          div.profile-logout
            a(class='nav-link btn btn-light bt-logout' v-if='user') #[font-awesome-icon(alt="Logout" title='Logout' @click.prevent="logout" icon="door-open" )] Sair 
            

      <!-- SIDEBAR BUTTONS -->
      b-tabs(class="perfil-tabs-desktop mt-3") 
        b-tab(title="Novo Livro")
          NovoLivro.mt-5

        b-tab(title="Meus Livros" active)
          MeusLivros

        b-tab(title="Meus Dados")
          MeusDados.mt-4

        b-tab(title="Minhas Curtidas")
          MinhasCurtidas

      <!-- SIDEBAR BUTTONS -->
      b-tabs(class="perfil-tabs-mobile mt-3" nav-wrapper-class="w-25") 
        b-tab(title="Novo Livro")
          NovoLivro.mt-5

        b-tab(title="Meus Livros" active)
          MeusLivros

        b-tab(title="Meus Dados")
          MeusDados.mt-4

        b-tab(title="Minhas Curtidas")
          MinhasCurtidas

</template>

<script>
import { mapState } from 'vuex';
import { userKey } from '@/global'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

import MeusLivros from '@/components/PerfilLivros'
import MeusDados from '@/components/PerfilDados'
import MinhasCurtidas from '@/components/PerfilCurtidas'
import NovoLivro from '@/components/PerfilNovoLivro'

export default {
  name: 'Perfil',
  components: { MeusLivros, MeusDados, NovoLivro, MinhasCurtidas },
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
    },
    logout(){
      localStorage.removeItem(userKey)
      this.$store.commit('setUser', null)
      this.$router.push({ name: 'Login' })
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

  .profile-userpic img {
    display: flex;  
    -webkit-border-radius: 50% !important;
    -moz-border-radius: 50% !important;
    border-radius: 50% !important;
  }

  .profile-logout {
    .bt-logout {
      color: white;
      background-color: #00ABC8;
    }
  }

  .profile-usertitle-name { color: #00ABC8; }
  .profile-usertitle-local { color: #767676; }
  .profile-usertitle-vinculados { color: #3d3d3d; }

  @media only screen and (max-width: 900px) {

    grid-template-columns: .5fr 1fr 2fr .5fr;
    grid-template-rows: .5fr auto;
    flex-direction: column;

    padding: 70px 0;

    .profile-sidebar {
      grid-column: 2 / 4;
      grid-row: 1 / 2;

      justify-content: center;

      .profile-userpic { 
        grid-column: 2 / 4;
        display: flex;
        flex-direction: column;

        img {
          margin: 0px auto 30px auto;
        }

        .profile-usertitle {
          width: 250px;
          text-align: center;
          margin: 0px auto 0px auto;

        }

        .profile-logout {
          margin: 40px auto 60px auto;
          width: 150px;
          justify-self: center;

        }
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

    #__BVID__153 {
      border-bottom: 1px solid #00ABC8;

    }

    .perfil-tabs-mobile {
      display: grid;
      grid-column: 1 / 5 ;
      grid-row: 2 / 4 ;

      flex-direction: row;

      .nav-tabs {
        flex-wrap: nowrap;
        padding: 5px 30px;
      }

      .nav-tabs, .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
        // border: none;
      }
    }

    .perfil-tabs-desktop { display: none; }
  }

  @media only screen and (min-width: 901px) {
    
    .profile-sidebar {
      padding: 100px 0 50px 0;

      .profile-userpic {
        display: flex;
        flex-direction: row;
        align-self: auto;

        .profile-usertitle {
          margin-left: 50px;
        }

        .profile-logout {
          align-self: center;
          margin-left: 70px;
        }
      }
    }

    .perfil-tabs-mobile { display: none;}
  }
}
</style>