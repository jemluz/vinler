<template lang='pug'>
  div.container
    div.row.profile
      div.col-md-3
        div.profile-sidebar

          <!-- SIDEBAR USERPIC -->
          div.profile-userpic
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
              

      div.col-md-9
        
        h3 Meus Livros
        div.profile-content.row

          <!-- Lista de Livros -->
          div(
            class="livro"
            v-for='(vinculado, index) in vinculados'
            )

            div.livro_foto
              router-link(to='/livro-detalhe')    
                img(:src='vinculado.fotoUrl' width='100px' height='100px' @click='func(index)')

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

<style>
/* Profile container */
.profile {
  margin: 20px 0;

}

/* Profile sidebar */
.profile-sidebar {
  padding: 20px 0 10px 0;
  background: #fff;
}

.profile-userpic img {
  display: flex;  
  margin: 0px auto;
  width: 50%;
  height: 50%;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}

.profile-usertitle {
  text-align: center;
  margin-top: 20px;
}

.profile-usertitle-name {
  color: #5a7391;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;
}

.profile-usertitle-job {
  text-transform: uppercase;
  color: #5b9bd1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.profile-userbuttons {
  text-align: center;
  margin-top: 10px;
}

.profile-userbuttons .btn {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 15px;
  margin-right: 5px;
}

.profile-userbuttons .btn:last-child {
  margin-right: 0px;
}
    
.profile-usermenu {
  margin-top: 30px;
}

.profile-usermenu ul li {
  border-bottom: 1px solid #f0f4f7;
}

.profile-usermenu ul li:last-child {
  border-bottom: none;
}

.profile-usermenu ul li a {
  color: #93a3b5;
  font-size: 14px;
  font-weight: 400;
}

.profile-usermenu ul li a i {
  margin-right: 8px;
  font-size: 14px;
}

.profile-usermenu ul li a:hover {
  background-color: #fafcfd;
  color: #5b9bd1;
}

.profile-usermenu ul li.active {
  border-bottom: none;
}

.profile-usermenu ul li.active a {
  color: #5b9bd1;
  background-color: #f6f9fb;
  border-left: 2px solid #5b9bd1;
  margin-left: -2px;
}

/* Profile Content */
.profile-content {
  padding: 20px;
  background: #fff;
  min-height: 460px;
}
</style>