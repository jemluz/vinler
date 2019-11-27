<template lang="pug">
  div.minhas_curtidas

    div.livros

      div.livro_grid

        <!-- Livros -->
        div(
          class="livro row"
          v-for='(livroCurtido, index) in livrosCurtidos'
          )
          div.livro_img
            router-link(:to='{ name: "livro", params: { id: livroCurtido.id } }')    
              img(:src=`livroCurtido.fotoUrl`)

          div.livro_info
            h5.mt-3 {{ livroCurtido.titulo }}
            p {{ livroCurtido.descricao.slice(0,50)+'...' }}
            h6 #[img.ml-2.mr-2(src='../assets/book.svg' width='20px') ] {{ livroCurtido.nPaginas }} Páginas
            h6 #[img.mr-2(src='../assets/shelf.svg' width='30px') ] {{ livroCurtido.tempoVida }}  

          div.livro_actions
            div(class="bt-categoria" v-for='categoria in categorias' v-if='categoria.id === livroCurtido.categoriaId ')
              a(href="/" v-if='categoria.id === livroCurtido.categoriaId ')  #[p {{ categoria.nome }}]

            a(@click='descurtir(index)' class='bt-deslike') #[font-awesome-icon(icon="heart-broken")] Descurtir 
          
</template>

<script>
import { mapState } from "vuex";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "MinhasCurtidas",
  computed: mapState(["user"]),
  data: function() {
    return {
      curtidas: [],
      minhasCurtidas: [],
      livrosCurtidos: [],
      categorias: [],
      livros: [],
      descurtida: {}
    };
  },
  methods: {
    loadCategorias() {
      // utiliza uma url pra fazer uma requisição com o axios e carregar um array de clientes
      axios.get(`${baseApiUrl}/categorias`).then(resposta => {
        this.categorias = resposta.data;
      });
    },
    loadCurtidas() {
      // utiliza uma url pra fazer uma requisição com o axios e carregar um array de clientes
      axios.get(`${baseApiUrl}/curtidas`).then(resposta => {
        this.curtidas = resposta.data;

        for (let i = 0; i < this.curtidas.length; i++) {
          if (this.curtidas[i].usuarioInteressadoId === this.user.id) {
            this.minhasCurtidas.push(this.curtidas[i]);
          }
        }
      });
    },
    loadLivros() {
      // utiliza uma url pra fazer uma requisição com o axios e carregar um array de clientes
      axios.get(`${baseApiUrl}/livros`).then(resposta => {
        this.livros = resposta.data;

        for (let i = 0; i < this.minhasCurtidas.length; i++) {
          for (let j = 0; j < this.livros.length; j++) {
            if (this.minhasCurtidas[i].livroCurtidoId === this.livros[j].id) {
              this.livrosCurtidos.push(this.livros[j]);
            }
          }
        }
      });
    },
    descurtir(index) {
      for(let i = 0; i < this.curtidas.length; i++ ) {
        if ( this.curtidas[i].usuarioInteressadoId === this.user.id && this.curtidas[i].livroCurtidoId === this.livrosCurtidos[index].id) {
          this.descurtida.id = this.curtidas[i].id
          this.descurtida.livroDescurtidoId = this.curtidas[i].livroCurtidoId
        }
      }
      this.descurtida.nCurtidas = this.livrosCurtidos[index].nCurtidas

      axios
        .delete(`${baseApiUrl}/descurtir`, { data: this.descurtida })
        .then(this.$toasted.global.defaultSucess())
        .catch(showError);
    }
  },
  mounted() {
    this.loadCategorias();
    this.loadCurtidas();
    this.loadLivros();

    // console.log(this.curtidas)
    // console.log(this.livros)
  }
};
</script>

<style lang='scss'>
div.minhas_curtidas {
  display: grid;
  padding: 0px;

  .livros {
    grid-column: 2/ 3;
    grid-row: 1/ 2;

    .livro_grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

      height: initial;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .livro {
      margin-bottom: 20px;
      text-align: center;
    }

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
    .bt-like,
    .bt-deslike {
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

    .bt-deslike {
      background-color: #ff000020;
      color: #ff0000;
      &:visited {
        color: #ff0000;
      }
      &:hover {
        color: #ff0000;
        box-shadow: 0px 0px 15px 2px #ff000070;
      }
    }
  }

  // MOBILE
  @media only screen and (max-width: 900px) {
    grid-template-columns: 0.5fr 3fr 0.5fr;

    .livro_grid {
      margin-top: 50px;
    }

    .livro {
      margin: 0 auto;
      .livro_img {
        width: 200px;
      }

      .livro_actions {
        width: 80vw;
        justify-content: flex-start;
        margin: 40px auto;

        .bt-categoria,
        .bt-like {
          width: 80%;
          min-height: 50px;
          font-size: 22px;

          border-radius: 10px;
          padding: 5px 15px;
          display: inline-block;
          cursor: pointer;
          p {
            margin: 0px !important;
          }
        }

        .bt-like {
          margin-top: 20px;
        }
      }
    }
  }

  // DESKTOP
  @media only screen and (min-width: 901px) {
    .livros {
      padding: 50px 50px;
    }

    .livro {
      max-width: 200px;
      text-align: left;
      display: flex;
      margin: 10px 20px;

      .livro_img img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }

      .livro_info {
        max-width: 80%;
      }

      .livro_actions {
        font-size: 14px;
        align-self: flex-end;

        svg {
          opacity: 0.7;
          &:hover {
            opacity: 1;
          }
        }

        .bt-like,  .bt-deslike{
          margin-left: 10px;
        }
      }
    }
  }
}
</style>