<template lang="pug">
  div.profile
    div.profile-sidebar

      <!-- SIDEBAR USERPIC -->
      div.profile-userpic.row
        img(:src="dono.fotoUrl" width='100px' height='100px' alt="")

        <!-- SIDEBAR USER TITLE -->
        div.profile-usertitle.ml-4
          h3.profile-usertitle-name {{ dono.nome }}
          h6.profile-usertitle-local {{ dono.local }} #[br] {{ dono.celular }}
          h6.profile-usertitle-vinculados {{ vinculados.length }} Livros cadastrados
      
    <!-- SIDEBAR BUTTONS -->
    h3 Livros publicados

    div.livro_grid.mt-3.row

      div(
        class="livro row"
        v-for='(vinculado, index) in vinculados'
        )
        div.livro_img
          router-link(:to='{ name: "livro", params: { id: vinculado.id } }')    
            img(:src=`vinculado.fotoUrl`)

        div.livro_info
          h5.mt-3 {{ vinculado.titulo }}
          p {{ vinculado.descricao.slice(0,30)+'...' }}
          h6 #[img.ml-2.mr-2(src='../assets/book.svg' width='20px') ] {{ vinculado.nPaginas }} Páginas
          h6 #[img.mr-2(src='../assets/shelf.svg' width='30px') ] {{ vinculado.tempoVida }}  

        div.livro_actions.mt-3
          div(class="bt-categoria" v-for='categoria in categorias' v-if='categoria.id === vinculado.categoriaId ')
            a.mb-3(href="/" v-if='categoria.id === vinculado.categoriaId ')  #[p {{ categoria.nome }}]

          a(@click='curtir(index)' class='bt-like ml-3') #[font-awesome-icon(icon="heart")] Curtir
      


</template>

<script>
import { mapState } from "vuex";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Dono",
  props: ["id"],
  computed: mapState(["user"]),
  data: () => {
    return {
      dono: {},
      categorias: [],
      vinculados: [],
      livros: [],
      donos: []
    };
  },
  methods: {
    loadVinculados() {
      const url = `${baseApiUrl}/usuarios/vinculados/${this.id}`;
      axios
        .get(url)
        .then(resposta => {
          this.vinculados = resposta.data;
        })
        .catch(showError);
    },
    loadDono() {
      const url = `${baseApiUrl}/usuarios/${this.id}`;
      axios
        .get(url)
        .then(resposta => {
          this.dono = resposta.data;
        })
        .catch(showError);
    },
    loadCategorias() {
      axios.get(`${baseApiUrl}/categorias`).then(resposta => {
        this.categorias = resposta.data;
      });
    },
    loadDonos() {
      axios.get(`${baseApiUrl}/usuarios`).then(resposta => {
        this.donos = resposta.data;
      });
    },
    curtir(index) {
      this.curtida.usuarioInteressadoId = this.$store.state.user.id;
      this.curtida.livroCurtidoId = this.objetos[index].id;
      this.curtida.proprietarioId = this.objetos[index].proprietarioId;
      this.curtida.nCurtidas = this.objetos[index].nCurtidas;

      axios
        .post(`${baseApiUrl}/curtidas`, this.curtida)
        .then(this.$toasted.global.defaultSucess())
        .catch(showError);

      this.curtida = {};
    }
  },
  mounted() {
    this.loadCategorias();
    this.loadDonos();
    this.loadDono();
    this.loadVinculados();
  }
};
</script>

<style scoped lang='scss'>
h3 { color: grey; }

.row { margin: auto 0px auto 0px; }

.livro_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background-color: #f9f9f9;
  border-top: 1px solid grey;

  .livro_info {
    display: inline-block;
    text-align: left;
    color: #00000090;
    cursor: default;

    h6 {
      color: #00abc8;
    }
  }

  .bt-categoria,
  .bt-like {
    border-radius: 10px;
    padding: 5px 15px;
    display: inline-block;
    cursor: pointer;
    p {
      margin: 0px !important;
    }
  }

  .bt-categoria {
    background-color: #00abc820;
    a {
      color: #00abc8;
    }
    &:hover {
      box-shadow: 0px 0px 15px 2px #00abc870;
    }
  }

  .bt-like {
    background-color: #ffb60020;
    color: #ffb600;
    &:visited {
      color: #ffb600;
    }
    &:hover {
      color: #ffb600;
      box-shadow: 0px 0px 15px 2px #ffb60070;
    }
  }

  .flag-disponivel {
    background-color: #32bf3040;
    color: #207b55;
    padding: 10px;
    width: 50%;
    text-align: center;
    border-radius: 0px 00px 10px 10px;
    margin: 10px auto 10px auto;
  }

  .flag-indisponivel {
    background-color: #bf5e3040;
    color: #7b2020;
    padding: 10px;
    width: 50%;
    text-align: center;
    border-radius: 0px 00px 10px 10px;
    margin: 10px auto 10px auto;
  }

  .dono {
    display: flex;
  }

  @media only screen and (max-width: 900px) {
  }

  // DESKTOP
  @media only screen and (min-width: 901px) {
    padding: 50px 0 100px 0;

    .livro_img {
      grid-column: 2/ 3;
      justify-self: flex-end;
    }

    .livro_info {
      grid-column: 4/ 5;

      .livro_actions {
        display: flex;
        align-items: center;
      }
    }
  }
}

// MOBILE
</style>